import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Sparkles, FileText, BrainCircuit } from 'lucide-react';
import { AnimateOnScroll } from '../animate-on-scroll';

const features = [
    {
        icon: BrainCircuit,
        title: "Generate from Topic",
        description: "Simply provide a topic, and our AI will instantly create a challenging quiz for you.",
    },
    {
        icon: FileText,
        title: "Generate from PDF",
        description: "Upload any PDF document and watch as our AI transforms it into an interactive quiz.",
    },
    {
        icon: Sparkles,
        title: "Unlimited Access",
        description: "Enjoy all quizzes, track your progress, and access exclusive features with a premium account.",
    }
];

const PremiumFeatures = () => {
  const premiumImage = PlaceHolderImages.find(p => p.id === 'premium');
  
  return (
    <AnimateOnScroll>
      <section className="py-20 bg-card">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 font-headline">Unlock Your Full Potential</h2>
            <p className="text-muted-foreground mb-8">
              Supercharge your learning experience with QuizWhiz Premium. Gain access to powerful AI tools and unlock a world of personalized knowledge.
            </p>
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full p-3">
                          <feature.icon className="h-6 w-6" />
                      </div>
                      <div>
                          <h3 className="font-semibold text-lg">{feature.title}</h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                  </div>
              ))}
            </div>
            <Button asChild size="lg" variant="default">
              <Link href="/pricing">View Premium Plans</Link>
            </Button>
          </div>
          <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-xl">
            {premiumImage && (
              <Image
                src={premiumImage.imageUrl}
                alt="Premium Features"
                fill
                className="object-cover"
                data-ai-hint={premiumImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent"></div>
          </div>
        </div>
      </section>
    </AnimateOnScroll>
  );
};

export default PremiumFeatures;
