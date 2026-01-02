
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { updateUserFreeGeneration } from '@/firebase/firestore/users';
import { Clock, Check, X } from 'lucide-react';
import type { Quiz } from '@/lib/data';

type QuizPlayerProps = {
  quiz: Quiz;
  isGenerated?: boolean;
  timerSettings?: {
    timerEnabled: boolean;
    timerDuration: number;
  };
  isFreeTrialQuiz?: boolean;
};

export default function QuizPlayer({ quiz, isGenerated = false, timerSettings = { timerEnabled: true, timerDuration: 15 }, isFreeTrialQuiz = false }: QuizPlayerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState(timerSettings.timerEnabled ? timerSettings.timerDuration : null);
  const { user } = useAuth();
  const router = useRouter();

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (!timerSettings.timerEnabled || timeLeft === null) return;

    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, currentQuestionIndex, timerSettings.timerEnabled]);
  
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div>Quiz data is not available.</div>;
  }

  const handleAnswerSelect = (questionText: string, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionText]: answer }));
  };

  const handleShowResults = async () => {
    if (isFreeTrialQuiz && user) {
        try {
            await updateUserFreeGeneration(user.uid, true);
        } catch (error) {
            console.error("Failed to update user's free generation status:", error);
        }
    }
    const params = new URLSearchParams();
    params.set('answers', JSON.stringify(selectedAnswers));

    if (isGenerated) {
        params.set('isGenerated', 'true');
        params.set('quizData', JSON.stringify(quiz));
    }
    router.push(`/quiz/${quiz.id}/results?${params.toString()}`);
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const questionText = currentQuestion.question;

  const getOptionText = (option: any): string => {
    return typeof option === 'string' ? option : option.text;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">{quiz.title}</CardTitle>
            {timerSettings.timerEnabled && timeLeft !== null && (
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Clock className="h-6 w-6" />
                <span>{timeLeft}s</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-lg font-semibold">
            {questionText}
          </div>
          <ul className="space-y-2">
            {currentQuestion.options.map((option, i) => {
              const optionText = getOptionText(option);
              const isSelected = selectedAnswers[questionText] === optionText;

              return (
                <li key={i}>
                  <Button
                    variant={isSelected ? "default" : "outline"}
                    className="w-full justify-start h-auto whitespace-normal text-left"
                    onClick={() => handleAnswerSelect(questionText, optionText)}
                  >
                    {optionText}
                  </Button>
                </li>
              );
            })}
          </ul>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <p className="text-muted-foreground">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
            <div className="flex space-x-2">
                <Button onClick={handleShowResults} variant="outline" size="lg">Submit</Button>
                {currentQuestionIndex < quiz.questions.length - 1 && (
                    <Button onClick={handleNextQuestion} size="lg">Next</Button>
                )}
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
