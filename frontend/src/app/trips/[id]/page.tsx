'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { MapPin, Calendar, Clock, Mountain, CheckCircle2, XCircle, ChevronDown, ChevronUp, Star, Users } from 'lucide-react';
import api from '@/lib/api';
import { Loader } from '@/components/ui/Loader';

export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [guests, setGuests] = useState(1);
  const [activeItineraryDay, setActiveItineraryDay] = useState<number | null>(1);

  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data } = await api.get(`/treks/${params.id}`);
        setTrip(data);
      } catch (error) {
        console.error('Failed to fetch trek details', error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      fetchTrip();
    }
  }, [params.id]);

  if (loading) {
    return <Loader message="Loading trip details..." fullScreen />;
  }

  if (!trip) {
    return <div className="min-h-screen flex items-center justify-center">Trek not found.</div>;
  }

  // Parse price from string like "₹8,500" to number
  const numericPrice = parseInt(trip.price.replace(/[^0-9]/g, ''), 10) || 0;

  const handleBookNow = () => {
    router.push(`/checkout/${trip._id}?date=${new Date(trip.date).toISOString()}&guests=${guests}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Image Gallery */}
      <div className="h-[35vh] md:h-[60vh] flex gap-2 p-2">
        <div className="w-full md:w-2/3 h-full rounded-2xl overflow-hidden relative">
          <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> {trip.rating}
          </div>
        </div>
        {trip.images && trip.images.length > 0 ? (
          <div className="hidden md:flex flex-col w-1/3 gap-2 h-full">
            {trip.images.length === 1 && (
              <div className="h-full rounded-2xl overflow-hidden relative">
                <img src={trip.images[0]} alt="Gallery 1" className="w-full h-full object-cover" />
              </div>
            )}
            {trip.images.length === 2 && (
              <>
                <div className="h-1/2 rounded-2xl overflow-hidden relative">
                  <img src={trip.images[0]} alt="Gallery 1" className="w-full h-full object-cover" />
                </div>
                <div className="h-1/2 rounded-2xl overflow-hidden relative">
                  <img src={trip.images[1]} alt="Gallery 2" className="w-full h-full object-cover" />
                </div>
              </>
            )}
            {trip.images.length >= 3 && (
              <>
                <div className="h-1/2 rounded-2xl overflow-hidden relative">
                  <img src={trip.images[0]} alt="Gallery 1" className="w-full h-full object-cover" />
                </div>
                <div className="h-1/2 flex gap-2">
                  <div className="w-1/2 rounded-2xl overflow-hidden relative">
                    <img src={trip.images[1]} alt="Gallery 2" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-1/2 rounded-2xl overflow-hidden relative">
                    <img src={trip.images[2]} alt="Gallery 3" className="w-full h-full object-cover" />
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="hidden md:flex flex-col w-1/3 gap-2 h-full">
            <div className="h-1/2 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
               <span className="text-slate-400">More images coming soon</span>
            </div>
            <div className="h-1/2 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
               <span className="text-slate-400">More images coming soon</span>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-4">{trip.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-rose-500" /> Himalayas, India</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-rose-500" /> {trip.days}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="font-medium text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">{trip.diff}</span>
              </div>
            </div>

            <div className="border-t border-slate-100 py-8">
              <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">Overview</h2>
              <p className="text-slate-600 leading-relaxed text-lg">{trip.description || "A breathtaking trek through the pristine Himalayan landscapes."}</p>
            </div>

            <div className="border-t border-slate-100 py-8">
              <h2 className="text-2xl font-bold font-heading text-slate-900 mb-6">Itinerary</h2>
              <div className="space-y-4">
                {(trip.itinerary && trip.itinerary.length > 0 ? trip.itinerary : []).map((day: any) => (
                  <div key={day.day} className="border border-slate-200 rounded-2xl overflow-hidden">
                    <button 
                      onClick={() => setActiveItineraryDay(activeItineraryDay === day.day ? null : day.day)}
                      className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                    >
                      <span className="font-bold text-slate-900">Day {day.day}: {day.title}</span>
                      {activeItineraryDay === day.day ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                    </button>
                    {activeItineraryDay === day.day && (
                      <div className="p-5 bg-white border-t border-slate-100 text-slate-600 leading-relaxed">
                        {day.details}
                      </div>
                    )}
                  </div>
                ))}
                {(!trip.itinerary || trip.itinerary.length === 0) && (
                  <p className="text-slate-500">Detailed itinerary will be shared soon.</p>
                )}
              </div>
            </div>

            <div className="border-t border-slate-100 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold font-heading text-slate-900 mb-6">Inclusions</h2>
                <ul className="space-y-3">
                  {(trip.inclusions && trip.inclusions.length > 0 ? trip.inclusions : ['Accommodation in tents/homestays', 'All meals during the trek', 'Trekking permits']).map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold font-heading text-slate-900 mb-6">Exclusions</h2>
                <ul className="space-y-3">
                  {(trip.exclusions && trip.exclusions.length > 0 ? trip.exclusions : ['Transport to base camp', 'Offloading of backpack']).map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600"><XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="w-full lg:w-96 shrink-0 relative">
            <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-6 lg:sticky top-28 mt-8 lg:mt-0">
              <div className="mb-6">
                <span className="text-3xl font-bold text-slate-900">{trip.price}</span>
                <span className="text-slate-500"> / person</span>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">Trek Date</label>
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{trip.date ? new Date(trip.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) : 'Date not set'}</p>
                      <p className="text-xs text-slate-500">Fixed departure</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">Guests</label>
                  <div className="flex items-center justify-between border border-slate-200 rounded-xl p-2 bg-slate-50">
                    <button 
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50"
                      disabled={guests <= 1}
                    >
                      -
                    </button>
                    <div className="flex items-center gap-2 font-semibold text-slate-900">
                      <Users className="w-4 h-4 text-slate-400" />
                      {guests}
                    </div>
                    <button 
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                      className="w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50"
                      disabled={guests >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <div className="flex justify-between items-center mb-4 text-slate-600">
                    <span>{trip.price} x {guests} adults</span>
                    <span>₹{(numericPrice * guests).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center mb-6 text-slate-600">
                    <span>Taxes & Fees (5%)</span>
                    <span>₹{((numericPrice * guests) * 0.05).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center mb-6 pt-4 border-t border-slate-200 font-bold text-xl text-slate-900">
                    <span>Total</span>
                    <span>₹{((numericPrice * guests) * 1.05).toLocaleString('en-IN')}</span>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full text-lg h-14" 
                    onClick={handleBookNow}
                  >
                    Proceed to Book
                  </Button>
                  <p className="text-center text-sm text-slate-500 mt-4">You won't be charged yet</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
