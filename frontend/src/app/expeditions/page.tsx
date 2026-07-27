'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, MapPin, Star, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const expeditions = [
  {
    id: 1,
    title: 'Mt. Everest Expedition',
    altitude: '8,848m',
    duration: '65 Days',
    difficulty: 'Extreme',
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'The ultimate mountaineering challenge. A full-scale expedition to the highest point on Earth, led by record-holding Sherpas.'
  },
  {
    id: 2,
    title: 'Mt. Ama Dablam',
    altitude: '6,812m',
    duration: '28 Days',
    difficulty: 'Technical',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Often called the "Matterhorn of the Himalayas", Ama Dablam is a technical marvel and a dream for mountaineers.'
  },
  {
    id: 3,
    title: 'Manaslu Expedition',
    altitude: '8,163m',
    duration: '50 Days',
    difficulty: 'Extreme',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'An 8,000m peak known for its beautiful ridge and spiritual surroundings. Perfect for those looking to join the 8,000m club.'
  }
];

export default function ExpeditionsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover" 
            alt="Expeditions"
          />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold font-heading text-white mb-6"
          >
            Extreme <span className="text-rose-500">Expeditions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-200 max-w-2xl mx-auto font-medium"
          >
            Beyond trekking, into the realm of technical mountaineering and 8,000m peaks.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16">
          {expeditions.map((exp, i) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl h-[400px] relative group">
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute top-6 right-6 bg-rose-600 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-xl">
                  {exp.altitude}
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="flex items-center gap-3 text-rose-600 font-bold tracking-widest uppercase text-sm">
                  <ShieldCheck className="w-5 h-5" /> Expert-Led Expedition
                </div>
                <h2 className="text-4xl font-bold font-heading text-slate-900">{exp.title}</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="flex items-center gap-2 text-slate-700 font-semibold bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                    <Clock className="w-5 h-5 text-rose-500" /> {exp.duration}
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 font-semibold bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                    <Mountain className="w-5 h-5 text-rose-500" /> {exp.difficulty}
                  </div>
                </div>
                <div className="pt-8">
                  <Button size="lg" className="px-10 gap-3 group">
                    Inquire for Details <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Safety Banner */}
      <section className="bg-slate-900 py-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-8">Safety is Our Highest Priority</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Oxygen Systems', value: 'Latest Tech' },
              { label: 'Sherpa Ratio', value: '1:1 for 8k peaks' },
              { label: 'Weather Monitoring', value: 'Real-time Sat' },
              { label: 'Medical Kits', value: 'Comprehensive' },
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <p className="text-rose-500 font-bold text-xl mb-1">{stat.value}</p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
