'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Trash2, Droplets, Heart } from 'lucide-react';

export default function EnvironmentalPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <Leaf className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-heading text-slate-900">Environmental Policy</h1>
              <p className="text-slate-500">Our commitment to preserving the Himalayas.</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-12 text-slate-600 leading-relaxed">
            
            <p className="text-lg italic text-slate-700 font-medium border-l-4 border-emerald-500 pl-6">
              "Take nothing but pictures, leave nothing but footprints, kill nothing but time."
            </p>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-emerald-500" /> Waste Management
              </h2>
              <p>
                We follow a strict "Carry In, Carry Out" policy. Every piece of non-biodegradable waste generated during our treks is carried back to base camp and disposed of in municipal bins. We also conduct monthly "Clean-up Treks" to remove trash left by other groups.
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>No single-use plastics allowed on treks</li>
                <li>Biodegradable toilets used in all camps</li>
                <li>Regular waste audits for every expedition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-emerald-500" /> Water Conservation
              </h2>
              <p>
                We use eco-friendly soaps and detergents at all our camps. We ensure that no washing happens directly in the streams or lakes to prevent contamination of mountain water sources.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-emerald-500" /> Supporting Local Communities
              </h2>
              <p>
                Sustainability isn't just about nature; it's about people. We prioritize hiring local guides, porters, and cooks, and we source 80% of our trek supplies from village markets to ensure that tourism revenue stays within the mountain communities.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                <h3 className="font-bold text-emerald-900 mb-2">Solar Powered</h3>
                <p className="text-sm text-emerald-800">
                  Our base camps and mountain lodges utilize solar energy for lighting and water heating wherever possible.
                </p>
              </div>
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                <h3 className="font-bold text-emerald-900 mb-2">Carbon Offset</h3>
                <p className="text-sm text-emerald-800">
                  We plant 5 trees for every person who treks with us in our dedicated reforestation plot in the Parvati Valley.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
