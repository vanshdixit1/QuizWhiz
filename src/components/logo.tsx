import { BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-xl font-bold text-foreground", className)}>
      <BrainCircuit className="h-7 w-7 text-primary" />
      <span>QuizWhiz</span>
    </Link>
  );
};

export default Logo;
