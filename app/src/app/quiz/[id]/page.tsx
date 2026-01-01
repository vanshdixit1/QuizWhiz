
"use client";

import { useEffect } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import { quizzes } from '@/lib/data';
import QuizPlayer from '@/components/quiz/quiz-player';
import { useAuth } from '@/contexts/auth-context';
import { Loader2 } from 'lucide-react';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  
  const quizId = params.id as string;
  const quiz = quizzes.find(q => q.id === quizId);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (!quiz) {
    notFound();
  }

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return <QuizPlayer quiz={quiz} />;
}
