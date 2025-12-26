"use client";

import { useParams, notFound } from 'next/navigation';
import { quizzes } from '@/lib/data';
import QuizPlayer from '@/components/quiz/quiz-player';

export default function QuizPage() {
  const params = useParams();
  const quizId = params.id as string;
  const quiz = quizzes.find(q => q.id === quizId);

  if (!quiz) {
    notFound();
  }

  return <QuizPlayer quiz={quiz} />;
}
