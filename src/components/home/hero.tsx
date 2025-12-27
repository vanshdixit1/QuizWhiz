"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="container relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center py-20">
        <div>
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 bg-secondary/80 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium">AI-Powered Quizzes at Your Fingertips</span>
            </div>
          </div>
          
          <h1
            className="text-5xl md:text-7xl font-black text-foreground tracking-tighter mb-6 font-headline"
          >
            Unleash Your Inner{' '}
            <span className="bg-gradient-to-r from-primary to-purple-400 text-transparent bg-clip-text">
              Genius
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
          >
            Explore diverse quizzes, challenge yourself with a timer, or create your own with our premium AI tools. Learning has never been this exciting!
          </p>
          
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" asChild className="shadow-lg shadow-primary/20">
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
      </div>
    </section>
  );
};

export default Hero;
