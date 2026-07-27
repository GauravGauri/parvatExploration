'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MapPin, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-4">Get in Touch</h1>
          <p className="text-slate-600 text-lg">Have questions about a trek? Want to customize an expedition? Drop us a message and our experts will help you out.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">Head Office</h3>
              <p className="text-slate-600 leading-relaxed">123 Adventure Lane, Mall Road, Manali, Himachal Pradesh 175131</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">Phone</h3>
              <p className="text-slate-600 leading-relaxed">+91 98765 43210<br/>+91 98765 43211</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">Email</h3>
              <p className="text-slate-600 leading-relaxed">info@summitseekers.com<br/>booking@summitseekers.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
              <h2 className="text-3xl font-bold font-heading text-slate-900 mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="First Name" placeholder="John" required />
                  <Input label="Last Name" placeholder="Doe" required />
                </div>
                <Input label="Email Address" type="email" placeholder="john@example.com" required />
                <Input label="Phone Number" type="tel" placeholder="+91 98765 43210" required />
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Message</label>
                  <textarea 
                    rows={5}
                    className="flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell us about your plans..."
                    required
                  ></textarea>
                </div>

                <Button type="submit" size="lg" className="w-full">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
