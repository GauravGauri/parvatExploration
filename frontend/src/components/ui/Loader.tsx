import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export function Loader({ message = 'Loading...', fullScreen = false }: LoaderProps) {
  const containerClasses = fullScreen 
    ? "fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50"
    : "flex flex-col items-center justify-center p-8 w-full h-full min-h-[200px]";

  return (
    <div className={containerClasses}>
      <Loader2 className="w-10 h-10 text-rose-500 animate-spin mb-4" />
      {message && (
        <p className="text-slate-600 font-medium animate-pulse">{message}</p>
      )}
    </div>
  );
}
