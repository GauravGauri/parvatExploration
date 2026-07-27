'use client';

import React, { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 digits').regex(/^\d+$/, 'OTP must contain only numbers'),
});

function VerifyOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const { login } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema)
  });

  const onSubmit = async (data: z.infer<typeof otpSchema>) => {
    // Simulate API call to verify OTP
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock login success after OTP verify
    login({
      _id: 'usr_123',
      name: 'New User',
      email: email || 'user@example.com',
      role: 'user',
    }, 'mock_jwt_token_abc123');
    
    toast.success('Account created successfully!');
    router.push('/dashboard');
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-heading text-slate-900 mb-2">Verify Email</h1>
        <p className="text-slate-500">
          We've sent a 6-digit code to <br />
          <span className="font-bold text-slate-700">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input 
          label="Verification Code" 
          placeholder="123456"
          maxLength={6}
          {...register('otp')}
          error={errors.otp?.message}
          className="text-center text-2xl tracking-widest font-mono"
        />
        
        <Button type="submit" size="lg" className="w-full mt-4" isLoading={isSubmitting}>
          Verify & Continue
        </Button>
      </form>

      <p className="text-center text-slate-600 mt-8 text-sm">
        Didn't receive the code?{' '}
        <button className="text-rose-600 hover:text-rose-700 font-bold">
          Resend
        </button>
      </p>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyOTPContent />
      </Suspense>
    </div>
  );
}
