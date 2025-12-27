
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const WebGLAnimation = dynamic(() => import('@/components/home/webgl-animation').then(mod => mod.WebGLAnimation), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-card" />,
});

const Hero = () => {
  return (
    <section className="relative bg-card overflow-hidden">
      <div className="container grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)] py-20">
        <div className="z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tighter mb-6 font-headline">
            Unleash Your Inner Genius with QuizWhiz
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-prose">
            Explore diverse quizzes, challenge yourself with a timer, or create your own quizzes with our premium AI-powered tools. Learning has never been this exciting!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/quiz">
                Explore Free Quizzes <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">
                Go Premium
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="absolute inset-0 z-0 h-full w-full">
          <Suspense fallback={null}>
            <WebGLAnimation />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Hero;
