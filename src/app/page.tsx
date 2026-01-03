
"use client";

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import Hero from '@/components/home/hero';
import { WebGLAnimation } from '@/components/home/webgl-animation';
import FreeQuizzes from '@/components/home/free-quizzes';
import PremiumFeatures from '@/components/home/premium-features';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading, please wait...</p>
      </div>
    );
  }

  return (
    <>
      <Hero />
      <WebGLAnimation />
      <FreeQuizzes />
      <PremiumFeatures />
    </>
  );
}
