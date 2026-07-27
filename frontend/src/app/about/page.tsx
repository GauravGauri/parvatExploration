'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1522346513757-54c552451fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="About Us" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold font-heading text-white mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-200"
          >
            We are passionate mountaineers, explorers, and nature lovers dedicated to providing safe and unforgettable adventures in the Himalayas.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold font-heading text-slate-900 mb-6">Why Choose Parvat Exploration?</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>
                Founded by a group of passionate trekkers, Parvat Exploration has grown into a trusted name for high-altitude expeditions and treks in India. We believe that the mountains have the power to transform people, and our mission is to make these transformative experiences accessible, safe, and sustainable.
              </p>
              <p>
                Our team consists of certified mountaineers, experienced local guides, and emergency responders. We keep our groups small to ensure personalized attention and minimize our environmental footprint.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <div className="text-4xl font-bold text-rose-600 mb-2">10+</div>
                <div className="font-medium text-slate-900">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-rose-600 mb-2">5000+</div>
                <div className="font-medium text-slate-900">Happy Trekkers</div>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Team" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
