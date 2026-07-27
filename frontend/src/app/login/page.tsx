'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

import api from '@/lib/api';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await api.post('/auth/login', {
        email: data.email,
        password: data.password,
      });

      const { token, ...user } = response.data;
      
      login(user, token);
      
      toast.success('Successfully logged in!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-rose-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
            <span className="font-bold text-2xl font-heading">P</span>
          </div>
          <h1 className="text-3xl font-bold font-heading text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-500">Sign in to manage your bookings</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="you@example.com"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
          />
          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-600" />
              <span className="text-slate-600 group-hover:text-slate-900">Remember me</span>
            </label>
            <a href="#" className="text-rose-600 hover:text-rose-700 font-medium">Forgot password?</a>
          </div>

          <Button type="submit" size="lg" className="w-full mt-2" isLoading={isSubmitting}>
            Sign In
          </Button>
        </form>

        <p className="text-center text-slate-600 mt-8 text-sm">
          Don't have an account?{' '}
          <Link href="/signup" className="text-rose-600 hover:text-rose-700 font-bold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
