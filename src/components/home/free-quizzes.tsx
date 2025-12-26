import { quizzes } from '@/lib/data';
import QuizCard from '@/components/quiz/quiz-card';

const FreeQuizzes = () => {
  const featuredQuizzes = quizzes.slice(0, 4);

  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-4 font-headline">Test Your Knowledge</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Dive into our collection of free quizzes covering a wide range of subjects. Perfect for a quick brain workout!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredQuizzes.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreeQuizzes;
