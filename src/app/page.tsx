import Hero from '@/components/home/hero';
import FreeQuizzes from '@/components/home/free-quizzes';
import PremiumFeatures from '@/components/home/premium-features';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FreeQuizzes />
      <PremiumFeatures />
    </div>
  );
}
