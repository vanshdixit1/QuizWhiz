
'use client';

import { useSearchParams } from 'next/navigation';
import { quizzes } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { Suspense } from 'react';

function QuizResultsContent() {
  const searchParams = useSearchParams();
  const quizId = searchParams.get('quizId');
  const answersParam = searchParams.get('answers');

  if (!quizId || !answersParam) {
    return (
        <div className="max-w-4xl mx-auto p-4 text-center">
            <h1 className="text-xl font-bold">Could not load results</h1>
            <p className="text-muted-foreground">It seems there was an error displaying your results.</p>
            <Button asChild size="lg" className="mt-4">
                <Link href="/quizzes">Back to Quizzes</Link>
            </Button>
        </div>
    );
  }

  const userAnswers = JSON.parse(answersParam);
  const quiz = quizzes.find(q => q.id === quizId);

  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  let score = 0;
  quiz.questions.forEach(question => {
    if (userAnswers[question.question] === question.correctAnswer) {
      score++;
    }
  });

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Results for {quiz.title}</CardTitle>
          <p className="text-muted-foreground">You scored</p>
          <p className="text-5xl font-bold">{score} / {quiz.questions.length}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {quiz.questions.map((question, index) => {
              const userAnswer = userAnswers[question.question];
              const isCorrect = userAnswer === question.correctAnswer;
              return (
                <div key={index} className={`p-4 rounded-lg border ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <h3 className="font-semibold text-lg">{index + 1}. {question.question}</h3>
                  <div className={`flex items-center mt-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect ? <Check className="mr-2 h-5 w-5 flex-shrink-0" /> : <X className="mr-2 h-5 w-5 flex-shrink-0" />}
                    <span className="font-medium">Your answer: </span>
                    <span className="ml-1">{userAnswer || 'Not answered'}</span>
                  </div>
                  {!isCorrect && (
                    <div className="flex items-center mt-1 text-green-700">
                      <Check className="mr-2 h-5 w-5 flex-shrink-0" />
                      <span className="font-medium">Correct answer: </span>
                      <span className="ml-1">{question.correctAnswer}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild size="lg">
            <Link href="/quizzes">Take Another Quiz</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// It's a good practice to wrap components that use `useSearchParams` in a Suspense boundary.
export default function QuizResultsPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading results...</div>}>
            <QuizResultsContent />
        </Suspense>
    )
}
