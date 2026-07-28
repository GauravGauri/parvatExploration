'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, CreditCard, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { Loader } from '@/components/ui/Loader';

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadScript(src: string) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function CheckoutContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [trip, setTrip] = useState<any>(null);

  const date = searchParams.get('date');
  const guests = parseInt(searchParams.get('guests') || '1');

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to complete booking');
      router.push(`/login?redirect=/checkout/${params.id}?date=${date}&guests=${guests}`);
    }
  }, [isAuthenticated, router, params.id, date, guests]);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data } = await api.get(`/treks/${params.id}`);
        setTrip(data);
      } catch (error) {
        toast.error('Failed to load trip details');
      }
    };
    if (params.id) {
      fetchTrip();
    }
  }, [params.id]);

  if (!trip) {
    return <Loader message="Loading trip details..." fullScreen />;
  }

  const numericPrice = parseInt(trip.price.replace(/[^0-9]/g, ''), 10) || 0;
  const totalAmount = numericPrice * guests * 1.05;

  const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      return;
    }

    if (!date) {
      toast.error('Please select a date for your trip.');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Create booking order on our backend
      const bookingRes = await api.post('/bookings', {
        trekId: trip._id,
        date: date,
        guests: guests
      });

      const { booking, orderId, amount } = bookingRes.data;

      // 2. Open Razorpay Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_YourTestKeyHere', // Fallback, must be in env!
        amount: amount.toString(),
        currency: 'INR',
        name: 'Parvat Exploration',
        description: `Booking for ${trip.title}`,
        image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&w=100&q=80',
        order_id: orderId,
        handler: async function (response: any) {
          try {
            // 3. Verify Payment
            await api.post(`/bookings/${booking._id}/pay`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            
            setIsSuccess(true);
            toast.success('Payment successful! Booking confirmed.');
            
            setTimeout(() => {
              router.push('/dashboard');
            }, 2000);
          } catch (error) {
            toast.error('Payment verification failed.');
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: '#e11d48', // rose-600
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on('payment.failed', function (response: any) {
        toast.error('Payment failed: ' + response.error.description);
      });
      
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to initialize payment');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center max-w-md w-full">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold font-heading text-slate-900 mb-4">Payment Successful!</h2>
          <p className="text-slate-600 mb-8">Your booking for {trip.title} has been confirmed. You will be redirected to your dashboard.</p>
          <div className="animate-pulse flex space-x-2 justify-center">
            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Trip Details
        </button>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Payment Details */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold font-heading text-slate-900 mb-8">Complete your Booking</h1>
            
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8">
              <h2 className="text-xl font-bold font-heading text-slate-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-rose-500" /> Payment Details
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 p-4 rounded-xl">
                  <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <p>Your payment will be securely processed by Razorpay. Click below to open the payment gateway.</p>
                </div>
                
                <Button onClick={displayRazorpay} size="lg" className="w-full h-14 text-lg" isLoading={isProcessing}>
                  Pay ₹{totalAmount.toLocaleString('en-IN')}
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 sticky top-28">
              <h2 className="text-xl font-bold font-heading text-slate-900 mb-6">Order Summary</h2>
              
              <div className="flex gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight mb-1">{trip.title}</h3>
                  <p className="text-sm text-slate-500">{guests} Guests • {trip.days}</p>
                  <p className="text-sm text-slate-500">{date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select Date'}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-slate-600">
                  <span>{trip.price} x {guests} adults</span>
                  <span>₹{(numericPrice * guests).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Taxes (5%)</span>
                  <span>₹{((numericPrice * guests) * 0.05).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6 mb-6">
                <div className="flex justify-between items-center font-bold text-xl text-slate-900">
                  <span>Total (INR)</span>
                  <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-emerald-50 text-emerald-800 p-4 rounded-xl text-sm">
                <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600" />
                <p><strong>Safe and secure payment.</strong> Free cancellation up to 30 days before the trip starts.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
