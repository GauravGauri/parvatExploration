import { Request, Response } from 'express';
import Booking from '../models/bookingModel';
import Trek from '../models/trekModel';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Helper to get initialized Razorpay (prevents undefined env vars during import)
const getRazorpay = () => new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

// @desc    Create new booking and Razorpay order
// @route   POST /api/bookings
// @access  Private
export const addBookingItems = async (req: Request, res: Response) => {
  const { trekId, date, guests } = req.body;

  try {
    const trek = await Trek.findById(trekId);
    
    if (!trek) {
      return res.status(404).json({ message: 'Trek not found' });
    }

    // Basic price parsing assuming price is like '₹8,500' -> 8500
    const rawPrice = trek.price.replace(/[^0-9]/g, '');
    const unitPrice = parseInt(rawPrice, 10);
    const totalAmount = Math.round(unitPrice * guests * 1.05);

    // Create a Razorpay order
    const options = {
      amount: totalAmount * 100, // Razorpay works in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create(options);

    const booking = new Booking({
      user: (req as any).user._id,
      trek: trek._id,
      date,
      guests,
      totalAmount,
      razorpayOrderId: order.id,
    });

    const createdBooking = await booking.save();

    res.status(201).json({
      booking: createdBooking,
      orderId: order.id,
      amount: order.amount,
    });
  } catch (error: any) {
    console.error("Add Booking Error:", error);
    res.status(500).json({ message: error?.error?.description || error?.description || error.message || 'Internal Server Error' });
  }
};

// @desc    Verify Razorpay payment
// @route   POST /api/bookings/:id/pay
// @access  Private
export const verifyPayment = async (req: Request, res: Response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const bookingId = req.params.id;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET as string;

    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      booking.paymentStatus = 'Paid';
      booking.razorpayPaymentId = razorpay_payment_id;
      
      const updatedBooking = await booking.save();
      res.json({ message: 'Payment verified successfully', booking: updatedBooking });
    } else {
      res.status(400).json({ message: 'Invalid payment signature' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({}).populate('user', 'id name email').populate('trek', 'id title');
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get admin stats for dashboard
// @route   GET /api/bookings/admin/stats
// @access  Private/Admin
export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const paidBookings = await Booking.find({ paymentStatus: 'Paid' });
    const totalRevenue = paidBookings.reduce((acc, curr) => acc + curr.totalAmount, 0);

    // Group bookings by month for chart
    const bookingsByMonth = await Booking.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
          revenue: {
            $sum: {
              $cond: [{ $eq: ["$paymentStatus", "Paid"] }, "$totalAmount", 0]
            }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const chartData = bookingsByMonth.map(item => ({
      name: months[item._id - 1] || 'Unknown',
      bookings: item.count,
      revenue: item.revenue
    }));

    res.json({
      totalBookings,
      totalRevenue,
      chartData
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
