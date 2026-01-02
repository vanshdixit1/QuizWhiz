
"use client";

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

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
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
      {user ? (
        <>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-100'>
            Welcome back!
          </h1>
          <p className='mt-4 text-lg text-gray-600 dark:text-gray-300'>
            You can now proceed to your dashboard.
          </p>
          <Link href={'/dashboard'}>
            <Button className='mt-8'>Go to Dashboard</Button>
          </Link>
        </>
      ) : (
        <>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-100'>
            Welcome to the Quiz App
          </h1>
          <p className='mt-4 text-lg text-gray-600 dark:text-gray-300'>
            Please log in to continue.
          </p>
          <Link href={'/auth/login'}>
            <Button className='mt-8'>Go to Login</Button>
          </Link>
        </>
      )}
    </div>
  );
}
