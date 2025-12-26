import QuizCard from '@/components/quiz/quiz-card';
import { quizzes } from '@/lib/data';

export default function AllQuizzesPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold text-center mb-4 font-headline">Explore Our Quizzes</h1>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        Challenge yourself with our diverse collection of quizzes. Pick a category and start learning!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {quizzes.map(quiz => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}
