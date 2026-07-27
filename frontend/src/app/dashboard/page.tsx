'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, ChevronRight, Settings, LogOut, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('bookings');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const upcomingBookings = [
    {
      id: 'BK-7829',
      tripTitle: 'Kedarkantha Trek',
      date: 'Jan 15, 2027',
      guests: 2,
      status: 'Confirmed',
      totalPaid: '₹17,850',
      image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    }
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold text-xl">
                  {user?.name.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight">{user?.name}</h3>
                  <p className="text-sm text-slate-500">{user?.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === 'bookings' ? 'bg-rose-50 text-rose-600' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Calendar className="w-4 h-4" />
                    My Bookings
                  </span>
                  {activeTab === 'bookings' && <ChevronRight className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === 'settings' ? 'bg-rose-50 text-rose-600' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Settings className="w-4 h-4" />
                    Profile Settings
                  </span>
                  {activeTab === 'settings' && <ChevronRight className="w-4 h-4" />}
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 min-h-[500px]">
                <h2 className="text-2xl font-bold font-heading text-slate-900 mb-6">Upcoming Trips</h2>
                
                {upcomingBookings.length > 0 ? (
                  <div className="space-y-6">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                          <img src={booking.image} alt={booking.tripTitle} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-bold font-heading text-slate-900">{booking.tripTitle}</h3>
                              <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> {booking.status}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> {booking.date}</span>
                              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> {booking.guests} Guests</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-end border-t border-slate-100 pt-4">
                            <div>
                              <p className="text-xs text-slate-500">Booking ID</p>
                              <p className="font-medium text-slate-900">{booking.id}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-slate-500">Total Paid</p>
                              <p className="font-bold text-rose-600">{booking.totalPaid}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-500 text-lg mb-6">You have no upcoming trips.</p>
                    <Link href="/trips">
                      <Button variant="primary">Explore Destinations</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 min-h-[500px]">
                <h2 className="text-2xl font-bold font-heading text-slate-900 mb-6">Profile Settings</h2>
                <p className="text-slate-500">Update your personal information and preferences here.</p>
                {/* Profile form goes here */}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
