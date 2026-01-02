
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function QuizResults({ quiz, results }) {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Results for {quiz.title}</CardTitle>
          <p className="text-muted-foreground">You scored</p>
          <p className="text-5xl font-bold">{results.correct} / {results.questions.length}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
              <p className="text-lg font-semibold">Correct: <span className="font-bold text-green-500">{results.correct}</span></p>
              <p className="text-lg font-semibold">Incorrect: <span className="font-bold text-red-500">{results.incorrect}</span></p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {results.questions.map((question, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>
                    <div className="flex justify-between items-center w-full pr-4">
                        <p className="text-left font-semibold">{index + 1}. {question.text}</p>
                        <Badge variant={question.correct ? "default" : "destructive"}>
                            {question.correct ? "Correct" : "Incorrect"}
                        </Badge>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-2">
                        <p className="font-medium">Your answer: <span className="font-normal">{question.userAnswer || "Not answered"}</span></p>
                        {!question.correct && (
                            <p className="font-medium">Correct answer: <span className="font-normal">{question.options.find(o => o.correct)?.text}</span></p>
                        )}
                        <div className="mt-4 pt-4 border-t">
                            <h4 className="font-semibold mb-2">Options:</h4>
                            <ul className="space-y-2">
                                {question.options.map((option, i) => (
                                <li key={i} className={`p-3 rounded-lg border text-sm 
                                    ${option.correct ? "border-green-600 bg-green-500 text-white font-bold" : "border-gray-200"} 
                                    ${option.userAnswer && !option.correct ? "border-red-300 bg-red-100" : ""}`}>
                                    {option.text}
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
        <CardFooter className="flex justify-center mt-6">
          <Button asChild size="lg">
            <Link href="/quizzes">Take Another Quiz</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
