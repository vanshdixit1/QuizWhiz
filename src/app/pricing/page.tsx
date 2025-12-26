import PricingCards from '@/components/pricing/pricing-cards';

export default function PricingPage() {
  return (
    <div className="container py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">
          Unlock the Full Power of QuizWhiz
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
          Choose a plan that fits your needs and gain access to exclusive AI-powered features to supercharge your learning.
        </p>
      </div>
      <PricingCards />
    </div>
  );
}
