
"use client";

import { useParams, notFound } from 'next/navigation';
import { quizzes } from '@/lib/data';
import QuizPlayer from '@/components/quiz/quiz-player';
import { useEffect, useState } from 'react';

export default function QuizPage() {
  const params = useParams();
  const quizId = params.id as string;
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const foundQuiz = quizzes.find(q => q.id === quizId);
    if (foundQuiz) {
      setQuiz(foundQuiz);
    }
  }, [quizId]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return <QuizPlayer quiz={quiz} />;
}
