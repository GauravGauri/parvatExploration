'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-rose-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-heading text-slate-900">Privacy Policy</h1>
              <p className="text-slate-500">Last Updated: May 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-rose-500" /> Information We Collect
              </h2>
              <p>
                We collect personal information that you provide directly to us when you book a trek, subscribe to our newsletter, or contact us. This may include your name, email address, phone number, passport details (for permits), and medical history relevant to trekking.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-rose-500" /> How We Use Your Information
              </h2>
              <p>
                Your information is used primarily to process your bookings, obtain necessary government permits, and ensure your safety during treks. We also use your contact details to send important trip updates and occasional marketing communications.
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Processing and managing your trip bookings</li>
                <li>Obtaining trekking and forest permits from government authorities</li>
                <li>Ensuring safety and medical readiness for high-altitude activities</li>
                <li>Improving our website and customer service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-rose-500" /> Information Sharing
              </h2>
              <p>
                We do not sell your personal data. We only share information with third parties necessary for your trip, such as hotels, transport providers, and government forest departments for permit issuance.
              </p>
            </section>

            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">Data Security</h3>
              <p className="text-sm">
                We implement a variety of security measures to maintain the safety of your personal information. Your sensitive data is encrypted via SSL and stored behind secure networks.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal information at any time. If you wish to exercise these rights, please contact us at info@summitseekers.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
