'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const blogPosts = [
  {
    id: 1,
    title: '10 Essential Items for Your First Himalayan Trek',
    excerpt: 'Packing for a trek in the Himalayas can be daunting. Here are the top 10 items you absolutely cannot forget...',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'May 10, 2026',
    author: 'Rahul Sharma',
    category: 'Guides'
  },
  {
    id: 2,
    title: 'Why Winter is the Best Time to Trek to Kedarkantha',
    excerpt: 'While many prefer summer, winter offers a unique and magical experience in the mountains. From snow-covered trails to frozen lakes...',
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'May 5, 2026',
    author: 'Priya Verma',
    category: 'Winter Treks'
  },
  {
    id: 3,
    title: 'Sustainable Trekking: How to Leave No Trace',
    excerpt: 'Preserving the beauty of our mountains is our shared responsibility. Learn the principles of sustainable trekking...',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'April 28, 2026',
    author: 'Amit Bisht',
    category: 'Environment'
  },
  {
    id: 4,
    title: 'Training for High Altitude: A Complete Guide',
    excerpt: 'Physical preparation is key to a successful and enjoyable high-altitude trek. Follow our 8-week training program...',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'April 15, 2026',
    author: 'Vikram Singh',
    category: 'Fitness'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-heading text-slate-900 mb-6"
          >
            Our <span className="text-rose-600">Blog</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 max-w-2xl mx-auto text-lg"
          >
            Insights, guides, and stories from the heart of the Himalayas.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {blogPosts.map((post, i) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-rose-600 flex items-center gap-1.5 shadow-sm">
                    <Tag className="w-3.5 h-3.5" /> {post.category}
                  </div>
                </div>
                <div className="md:w-1/2 p-8 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.author}</span>
                  </div>
                  <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4 group-hover:text-rose-600 transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <Button variant="outline" className="w-fit gap-2 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600">
                    Read More <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="rounded-full px-12">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  );
}
