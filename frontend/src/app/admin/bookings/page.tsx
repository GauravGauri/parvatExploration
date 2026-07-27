'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { CheckCircle2, Clock } from 'lucide-react';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/bookings');
      setBookings(data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading bookings...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold font-heading text-slate-900 mb-8">Manage Bookings</h1>
      
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-4 font-semibold text-slate-600">ID</th>
                <th className="p-4 font-semibold text-slate-600">User</th>
                <th className="p-4 font-semibold text-slate-600">Trek</th>
                <th className="p-4 font-semibold text-slate-600">Date</th>
                <th className="p-4 font-semibold text-slate-600">Guests</th>
                <th className="p-4 font-semibold text-slate-600">Amount</th>
                <th className="p-4 font-semibold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((b) => (
                <tr key={b._id} className="hover:bg-slate-50/50">
                  <td className="p-4 text-xs font-mono text-slate-500">{b._id.slice(-6)}</td>
                  <td className="p-4">
                    <p className="font-medium text-slate-900">{b.user?.name}</p>
                    <p className="text-sm text-slate-500">{b.user?.email}</p>
                  </td>
                  <td className="p-4 font-medium text-slate-900">{b.trek?.title || 'Unknown Trek'}</td>
                  <td className="p-4 text-slate-600">{new Date(b.date).toLocaleDateString()}</td>
                  <td className="p-4 text-slate-600">{b.guests}</td>
                  <td className="p-4 font-medium text-slate-900">₹{b.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      b.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {b.paymentStatus === 'Paid' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {b.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">No bookings found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
