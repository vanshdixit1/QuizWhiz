import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Repeat, LayoutDashboard } from 'lucide-react';

type QuizResultsProps = {
  score: number;
  totalQuestions: number;
  quizTitle: string;
};

const QuizResults = ({ score, totalQuestions, quizTitle }: QuizResultsProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getFeedback = () => {
    if (percentage === 100) return "Perfect Score! You're a true genius!";
    if (percentage >= 80) return "Excellent work! You really know your stuff.";
    if (percentage >= 60) return "Good job! A little more practice and you'll be an expert.";
    if (percentage >= 40) return "Not bad! Keep trying and you'll improve.";
    return "Keep practicing! Every attempt is a step forward.";
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
            <Award className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
          <CardDescription>Results for "{quizTitle}"</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Your Score</p>
            <p className="text-5xl font-bold text-primary">{percentage}%</p>
            <p className="text-muted-foreground mt-2">You answered {score} out of {totalQuestions} questions correctly.</p>
          </div>
          <p className="text-lg font-medium">{getFeedback()}</p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="w-full" variant="outline">
            <Link href="/quiz">
              <Repeat className="mr-2 h-4 w-4" />
              Take Another Quiz
            </Link>
          </Button>
          <Button asChild className="w-full">
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizResults;
