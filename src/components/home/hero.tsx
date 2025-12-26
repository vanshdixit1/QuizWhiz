import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');

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
        <div className="relative h-64 lg:h-auto lg:self-stretch">
          {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover rounded-2xl shadow-xl"
                data-ai-hint={heroImage.imageHint}
              />
          )}
           <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent lg:bg-gradient-to-r"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
