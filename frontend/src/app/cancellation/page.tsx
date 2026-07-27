'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, RefreshCcw, Calendar, AlertTriangle } from 'lucide-react';

export default function CancellationPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center">
              <XCircle className="w-8 h-8 text-rose-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-heading text-slate-900">Cancellation Policy</h1>
              <p className="text-slate-500">How we handle trip cancellations and refunds.</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-12 text-slate-600 leading-relaxed">
            
            {/* Standard Cancellation Table */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-rose-500" /> Standard Cancellation Timeline
              </h2>
              <div className="overflow-hidden rounded-2xl border border-slate-100">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="p-4 font-bold text-slate-900 border-b border-slate-100">Cancellation Period</th>
                      <th className="p-4 font-bold text-slate-900 border-b border-slate-100">Refund Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 border-b border-slate-50">45+ days before departure</td>
                      <td className="p-4 border-b border-slate-50 text-emerald-600 font-bold">Full Refund (minus 5% fee)</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-slate-50">30-44 days before departure</td>
                      <td className="p-4 border-b border-slate-50 font-bold">75% Refund</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-slate-50">15-29 days before departure</td>
                      <td className="p-4 border-b border-slate-50 font-bold">50% Refund</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-slate-50">Less than 15 days</td>
                      <td className="p-4 border-b border-slate-50 text-rose-600 font-bold">No Refund</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <RefreshCcw className="w-5 h-5 text-rose-500" /> Rescheduling Policy
              </h2>
              <p>
                You can reschedule your trek to any other date or trek within 1 year of your original departure date. 
                Rescheduling requests must be made at least 20 days prior to the original departure date. A 10% rescheduling fee will apply.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-500" /> Force Majeure
              </h2>
              <p>
                In case of cancellations due to unforeseen government restrictions, natural disasters, or pandemics, we will provide a <strong>Credit Voucher</strong> for the full amount paid, valid for 2 years from the date of issue.
              </p>
            </section>

            <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">How to Cancel?</h3>
              <p className="text-sm mb-4">
                To cancel your booking, please send an email to <strong>cancel@summitseekers.com</strong> with your Booking ID and reason for cancellation. Refunds are processed within 7-10 business days.
              </p>
              <div className="text-xs text-slate-500 italic">
                *Note: Convenience fees paid at the time of booking are non-refundable.
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
