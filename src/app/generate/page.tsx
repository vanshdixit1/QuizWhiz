"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Loader2, Lock } from 'lucide-react';
import GenerateForm from '@/components/generate/generate-form';

export default function GeneratePage() {
    const { user, isAuthenticated, isLoading } = useAuth() as any;
    const router = useRouter();

    useEffect(() => {
        if (typeof isLoading !== 'undefined' && !isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    if (typeof isLoading !== 'undefined' && (isLoading || !isAuthenticated)) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        );
    }
    
    if (user && !user.isPremium) {
        return (
            <div className="container text-center py-20">
                <Lock className="h-20 w-20 mx-auto text-muted-foreground mb-4" />
                <h1 className="text-3xl font-bold">Premium Feature</h1>
                <p className="text-muted-foreground text-lg mt-2">
                    Quiz generation is a premium feature. Please upgrade your plan to get access.
                </p>
                <div className="mt-8">
                    <button onClick={() => router.push('/pricing')} className="bg-primary text-primary-foreground px-6 py-2 rounded-md">
                        View Pricing
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">
                    AI Quiz Generator
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
                    Create custom quizzes in seconds. Choose your method and let our AI do the work.
                </p>
            </div>
            <GenerateForm />
        </div>
    );
}
