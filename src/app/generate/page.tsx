
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Loader2, Lock, Sparkles, Mail } from 'lucide-react';
import GenerateForm from '@/components/generate/generate-form';
import { Button } from '@/components/ui/button';

export default function GeneratePage() {
    const { user, isAuthenticated, isLoading, allowFreeGeneration } = useAuth() as any;
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
    
    // Allow access if user is premium OR if they haven't used their free generation yet
    if (user && !user.isPremium && user.hasUsedFreeGeneration) {
        return (
            <div className="container text-center py-20">
                <Lock className="h-20 w-20 mx-auto text-muted-foreground mb-4" />
                <h1 className="text-3xl font-bold">Access AI-Powered Quizzes</h1>
                <p className="text-muted-foreground text-lg mt-2 max-w-md mx-auto">
                    You've used your initial free quiz generation. Choose an option below to continue.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button onClick={allowFreeGeneration} className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Use One-Time Free Trial
                    </Button>
                    <a href="mailto:dixitvansh140@gmail.com">
                        <Button variant="outline">
                            <Mail className="mr-2 h-4 w-4" /> 
                            Contact for Premium
                        </Button>
                    </a>
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
                {user && !user.isPremium && !user.hasUsedFreeGeneration && (
                    <div className="mt-4 inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-2 font-semibold">
                        <Sparkles className="h-5 w-5" />
                        You have 1 free quiz generation available!
                    </div>
                )}
            </div>
            <GenerateForm />
        </div>
    );
}
