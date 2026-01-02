
"use client";

import { useParams, useSearchParams, notFound, useRouter } from 'next/navigation';
import { quizzes as staticQuizzes } from '@/lib/data';
import QuizResults from '@/components/quiz/quiz-results';
import { Suspense, useEffect, useMemo } from 'react';
import { saveQuizResult } from '@/lib/actions';
import type { Quiz, QuizQuestion } from '@/lib/data';

function QuizResultsPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const quizId = params.id as string;
  const isGenerated = searchParams.get('isGenerated') === 'true';
  const quizDataParam = searchParams.get('quizData');
  const answersParam = searchParams.get('answers');

  const quiz: Quiz | undefined = useMemo(() => {
    if (isGenerated && quizDataParam) {
        try {
            const parsedQuiz = JSON.parse(quizDataParam);
            // Add a type property to distinguish it if needed later
            parsedQuiz.type = 'ai';
            return parsedQuiz;
        } catch (e) {
            console.error("Error parsing quiz data from query params:", e);
            return undefined;
        }
    } else {
        return staticQuizzes.find(q => q.id === quizId);
    }
  }, [quizId, isGenerated, quizDataParam]);

  if (!quiz) {
    return notFound();
  }

  let userAnswers: { [key: string]: string } = {};
  if (answersParam) {
    try {
      userAnswers = JSON.parse(answersParam);
    } catch (e) {
      console.error("Error parsing answers from query params:", e);
    }
  }

  const getCorrectAnswer = (question: QuizQuestion): string => {
    if (isGenerated) {
        const correctOption = question.options.find(o => (o as any).correct);
        return (correctOption as any)?.text || '';
    }
    return question.correctAnswer || '';
  };

  let correctCount = 0;
  const questionsWithAnswers = quiz.questions.map(question => {
    const userAnswer = userAnswers[question.question];
    const correctAnswer = getCorrectAnswer(question);
    const isCorrect = userAnswer === correctAnswer;
    if (isCorrect) {
      correctCount++;
    }

    return {
      text: question.question,
      options: question.options.map(o => {
          const optionText = (o as any).text || o;
          return {
              text: optionText,
              correct: optionText === correctAnswer,
              userAnswer: userAnswer === optionText
          };
      }),
      correct: isCorrect
    };
  });

  const results = {
    correct: correctCount,
    incorrect: quiz.questions.length - correctCount,
    questions: questionsWithAnswers,
  };

  useEffect(() => {
    if (quiz) {
        const score = Math.round((results.correct / quiz.questions.length) * 100);
        saveQuizResult({
            id: quiz.id,
            title: quiz.title,
            score,
            correctQuestions: results.correct,
            incorrectQuestions: results.incorrect,
        });
    }
  }, [quiz, results]);

  return <QuizResults quiz={quiz} results={results} />;
}

export default function QuizResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <QuizResultsPageContent />
    </Suspense>
  );
}
