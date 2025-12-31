
"use client";

import { useState, useEffect } from 'react';
import type { Quiz, Question } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import QuizResults from './quiz-results';
import { cn } from '@/lib/utils';
import { Timer, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

type QuizPlayerProps = {
  quiz: Quiz;
  isGenerated?: boolean;
  timerSettings?: { timerEnabled: boolean, timerDuration: number };
  isFreeTrialQuiz?: boolean;
};

type GameState = 'settings' | 'playing' | 'finished';

export default function QuizPlayer({ quiz, isGenerated = false, timerSettings, isFreeTrialQuiz = false }: QuizPlayerProps) {
  const { addQuizAttempt, useFreeGeneration } = useAuth();
  const [gameState, setGameState] = useState<GameState>(isGenerated ? 'playing' : 'settings');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);

  // Settings
  const [timerEnabled, setTimerEnabled] = useState(timerSettings?.timerEnabled ?? true);
  const [timerDuration, setTimerDuration] = useState(timerSettings?.timerDuration ?? 15);
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  useEffect(() => {
    if (gameState !== 'playing' || !timerEnabled) return;

    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameState, timerEnabled]);
  
  useEffect(() => {
    if (isGenerated && timerSettings) {
        setTimerEnabled(timerSettings.timerEnabled);
        setTimerDuration(timerSettings.timerDuration);
        setTimeLeft(timerSettings.timerDuration);
        setGameState('playing');
    }
  }, [isGenerated, timerSettings, quiz]);


  const handleStartQuiz = () => {
    setTimeLeft(timerDuration);
    setGameState('playing');
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const finishQuiz = (finalScore: number) => {
    addQuizAttempt({
        quizId: quiz.id,
        quizTitle: quiz.title,
        score: Math.round((finalScore / quiz.questions.length) * 100),
        totalQuestions: quiz.questions.length,
        category: quiz.category,
    });
    // If this was a free trial quiz, mark it as used now.
    if (isFreeTrialQuiz) {
        useFreeGeneration();
    }
    setGameState('finished');
  }

  const handleNextQuestion = () => {
    let currentScore = score;
    const isCorrect = selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer;
    if (isCorrect) {
      currentScore = score + 1;
      setScore(currentScore);
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(timerDuration);
    } else {
      finishQuiz(currentScore);
    }
  };
  
  if (gameState === 'finished') {
    return <QuizResults score={score} totalQuestions={quiz.questions.length} quizTitle={quiz.title} />;
  }

  if (gameState === 'settings' && !isGenerated) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{quiz.title}</CardTitle>
            <CardDescription>{quiz.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="timer-switch" className="flex items-center gap-2 text-base">
                <Clock className="h-5 w-5" /> Enable Timer
              </Label>
              <Switch id="timer-switch" checked={timerEnabled} onCheckedChange={setTimerEnabled} />
            </div>
            {timerEnabled && (
              <div className="flex items-center justify-between">
                <Label htmlFor="timer-duration" className="text-base">Timer Duration (seconds)</Label>
                <Select value={String(timerDuration)} onValueChange={(val) => setTimerDuration(Number(val))}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="60">60</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <Button onClick={handleStartQuiz} className="w-full" size="lg">
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
            <div className='flex justify-between items-center mb-4'>
                <CardTitle>{quiz.title}</CardTitle>
                {timerEnabled && (
                    <div className="flex items-center gap-2 font-mono text-lg text-primary">
                        <Timer className="h-6 w-6" />
                        <span>{timeLeft}s</span>
                    </div>
                )}
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground text-center mt-2">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </p>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg bg-muted/50 mb-8">
            <p className="text-lg font-semibold text-center">{currentQuestion.question}</p>
          </div>
          <RadioGroup
            value={selectedAnswers[currentQuestionIndex]}
            onValueChange={handleAnswerSelect}
            className="space-y-4"
          >
            {currentQuestion.options.map((option, index) => (
              <Label
                key={index}
                htmlFor={`option-${index}`}
                className={cn(
                    "flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors",
                    selectedAnswers[currentQuestionIndex] === option 
                        ? "border-primary bg-primary/10" 
                        : "hover:bg-muted"
                )}
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <span className="text-base">{option}</span>
              </Label>
            ))}
          </RadioGroup>
          <Button 
            onClick={handleNextQuestion} 
            className="w-full mt-8" 
            size="lg"
            disabled={!selectedAnswers[currentQuestionIndex]}
          >
            {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
