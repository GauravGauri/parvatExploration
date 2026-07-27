'use client';

import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming a cn utility exists or I'll define a simple one
import 'react-day-picker/style.css';

interface DatePickerProps {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({ selected, onSelect, placeholder = 'Select date', className }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col w-full text-left outline-none bg-transparent"
      >
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</span>
        <span className={cn(
          "font-medium transition-colors",
          selected ? "text-slate-900" : "text-slate-400"
        )}>
          {selected ? format(selected, 'PPP') : placeholder}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 md:left-1/2 md:-translate-x-1/2 mt-2 z-50 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3"
          >
            <div className="flex justify-between items-center mb-4 md:hidden">
              <span className="font-bold text-slate-900">Select Date</span>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-100 rounded-full">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={(date) => {
                onSelect(date);
                setIsOpen(false);
              }}
              disabled={{ before: new Date() }}
              classNames={{
                root: 'rdp-root !text-slate-900',
                months: 'flex flex-col',
                month: 'space-y-4',
                month_caption: 'flex justify-center pt-1 relative items-center h-10 mb-4',
                caption_label: 'text-sm font-bold text-slate-900',
                nav: 'flex items-center gap-1 absolute right-0 top-0',
                button_previous: 'p-1 hover:bg-slate-100 rounded-full text-slate-500 transition-colors',
                button_next: 'p-1 hover:bg-slate-100 rounded-full text-slate-500 transition-colors',
                month_grid: 'w-full border-collapse',
                weekdays: 'flex mb-2',
                weekday: 'text-slate-400 w-10 font-medium text-[0.8rem] text-center',
                week: 'flex w-full mt-2',
                day: 'h-10 w-10 text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
                day_button: 'h-10 w-10 p-0 font-normal !text-slate-900 aria-selected:opacity-100 hover:bg-rose-50 rounded-lg transition-colors flex items-center justify-center',
                selected: 'bg-rose-600 !text-white hover:bg-rose-700 hover:text-white focus:bg-rose-600 focus:text-white rounded-lg font-bold',
                today: 'text-rose-600 font-bold underline decoration-2 underline-offset-4',
                outside: 'text-slate-300 opacity-50',
                disabled: 'text-slate-300 opacity-50',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
