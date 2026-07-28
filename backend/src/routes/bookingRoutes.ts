import express from 'express';
import { addBookingItems, verifyPayment, getAllBookings, getAdminStats, getMyBookings } from '../controllers/bookingController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, addBookingItems)
  .get(protect, admin, getAllBookings);

router.get('/mybookings', protect, getMyBookings);

router.get('/admin/stats', protect, admin, getAdminStats);
router.post('/:id/pay', protect, verifyPayment);

export default router;
