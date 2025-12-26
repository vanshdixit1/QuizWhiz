import Image from 'next/image';
import Link from 'next/link';
import { Book, Globe, History, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Quiz } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '../ui/badge';

type QuizCardProps = {
  quiz: Quiz;
};

const categoryIcons: { [key: string]: React.ElementType } = {
  'Geography': Globe,
  'History': History,
  'English': Book,
  'General Knowledge': Brain,
};

const QuizCard = ({ quiz }: QuizCardProps) => {
  const quizImage = PlaceHolderImages.find(img => img.id === quiz.imageId);
  const Icon = categoryIcons[quiz.category] || Brain;

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all hover:shadow-lg hover:-translate-y-1">
      {quizImage && (
        <div className="relative h-48 w-full">
          <Image
            src={quizImage.imageUrl}
            alt={quiz.title}
            fill
            className="object-cover"
            data-ai-hint={quizImage.imageHint}
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-xl mb-2">{quiz.title}</CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1.5 shrink-0">
                <Icon className="h-3.5 w-3.5" />
                {quiz.category}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow"></CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/quiz/${quiz.id}`}>Start Quiz</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
