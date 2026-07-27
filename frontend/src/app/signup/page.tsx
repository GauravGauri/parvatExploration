'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

import api from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const response = await api.post('/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      const { token, ...user } = response.data;
      
      login(user, token);
      
      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create account');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-heading text-slate-900 mb-2">Create an Account</h1>
          <p className="text-slate-500">Join us to book your next adventure</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input 
            label="Full Name" 
            placeholder="John Doe"
            {...register('name')}
            error={errors.name?.message}
          />
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
          <Input 
            label="Confirm Password" 
            type="password" 
            placeholder="••••••••"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          
          <Button type="submit" size="lg" className="w-full mt-4" isLoading={isSubmitting}>
            Create Account
          </Button>
        </form>

        <p className="text-center text-slate-600 mt-8 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-rose-600 hover:text-rose-700 font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
