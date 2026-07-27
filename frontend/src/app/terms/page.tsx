'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Scale, AlertCircle, CheckCircle2, Gavel } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center">
              <Scale className="w-8 h-8 text-rose-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-heading text-slate-900">Terms & Conditions</h1>
              <p className="text-slate-500">Effective Date: May 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Gavel className="w-5 h-5 text-rose-500" /> Booking Policy
              </h2>
              <p>
                By booking a trek with Parvat Exploration, you agree to the following terms. A booking is confirmed only upon receipt of the initial deposit (25% of the total trip cost) and a signed medical disclaimer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-500" /> Assumption of Risk
              </h2>
              <p>
                Trekking and mountaineering in the Himalayas involve inherent risks including, but not limited to, altitude sickness, extreme weather, and difficult terrain. Participants must understand and voluntarily assume these risks.
              </p>
              <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 mt-4">
                <p className="text-rose-900 text-sm font-medium">
                  <strong>Important:</strong> Parvat Exploration and its guides reserve the right to modify or cancel any itinerary for the safety of the group due to weather, health issues, or local disturbances.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-rose-500" /> Fitness Requirements
              </h2>
              <p>
                Each trek has a designated difficulty level. It is the responsibility of the participant to ensure they meet the physical fitness standards required for the chosen trek. We reserve the right to deny participation if a trekker is deemed physically unfit at the base camp.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Insurance</h2>
              <p>
                High-altitude travel insurance including emergency helicopter evacuation is <strong>mandatory</strong> for all participants on treks above 4,000 meters. Proof of insurance must be provided before the trip starts.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of Himachal Pradesh, India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Manali.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
