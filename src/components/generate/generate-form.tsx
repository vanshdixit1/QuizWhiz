"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateQuizFromTopic, GenerateQuizFromTopicInput } from '@/ai/flows/generate-quiz-from-topic';
import { generateQuizFromPdf, GenerateQuizFromPdfInput } from '@/ai/flows/generate-quiz-from-pdf';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';

const topicSchema = z.object({
  topic: z.string().min(3, { message: 'Topic must be at least 3 characters.' }),
});

const pdfSchema = z.object({
  pdf: z.instanceof(File).refine(file => file.size > 0, 'A PDF file is required.').refine(file => file.type === 'application/pdf', 'File must be a PDF.'),
});

export default function GenerateForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<string | null>(null);
  const { toast } = useToast();

  const topicForm = useForm<z.infer<typeof topicSchema>>({
    resolver: zodResolver(topicSchema),
    defaultValues: { topic: '' },
  });

  const pdfForm = useForm<z.infer<typeof pdfSchema>>({
    resolver: zodResolver(pdfSchema),
  });

  const onTopicSubmit = async (values: z.infer<typeof topicSchema>) => {
    setIsLoading(true);
    setGeneratedQuiz(null);
    try {
      const input: GenerateQuizFromTopicInput = { topic: values.topic };
      const result = await generateQuizFromTopic(input);
      setGeneratedQuiz(result.quiz);
      toast({ title: 'Quiz Generated!', description: 'Your quiz from the topic is ready.' });
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to generate quiz from topic.' });
    } finally {
      setIsLoading(false);
    }
  };

  const onPdfSubmit = async (values: z.infer<typeof pdfSchema>) => {
    setIsLoading(true);
    setGeneratedQuiz(null);

    const reader = new FileReader();
    reader.readAsDataURL(values.pdf);
    reader.onload = async () => {
      try {
        const pdfDataUri = reader.result as string;
        const input: GenerateQuizFromPdfInput = { pdfDataUri };
        const result = await generateQuizFromPdf(input);
        setGeneratedQuiz(result.quiz);
        toast({ title: 'Quiz Generated!', description: 'Your quiz from the PDF is ready.' });
      } catch (error) {
        console.error(error);
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to generate quiz from PDF.' });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to read the PDF file.' });
        setIsLoading(false);
    };
  };

  return (
    <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="topic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="topic">From Topic</TabsTrigger>
                <TabsTrigger value="pdf">From PDF</TabsTrigger>
            </TabsList>
            <TabsContent value="topic">
                <Card>
                    <CardHeader>
                        <CardTitle>Generate from Topic</CardTitle>
                        <CardDescription>Enter a topic and let AI create a quiz for you.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...topicForm}>
                        <form onSubmit={topicForm.handleSubmit(onTopicSubmit)} className="space-y-4">
                            <FormField
                            control={topicForm.control}
                            name="topic"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Topic</FormLabel>
                                <FormControl><Input placeholder="e.g., The Solar System" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                                Generate Quiz
                            </Button>
                        </form>
                        </Form>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="pdf">
                <Card>
                    <CardHeader>
                        <CardTitle>Generate from PDF</CardTitle>
                        <CardDescription>Upload a PDF document to generate a quiz.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...pdfForm}>
                        <form onSubmit={pdfForm.handleSubmit(onPdfSubmit)} className="space-y-4">
                            <FormField
                            control={pdfForm.control}
                            name="pdf"
                            render={({ field: { onChange, value, ...rest } }) => (
                                <FormItem>
                                    <FormLabel>PDF Document</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="file" 
                                            accept="application/pdf"
                                            onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
                                            {...rest}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                                Generate Quiz
                            </Button>
                        </form>
                        </Form>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>

        {isLoading && (
            <div className="mt-8 text-center">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Generating your quiz... This might take a moment.</p>
            </div>
        )}

        {generatedQuiz && (
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Your Generated Quiz</CardTitle>
                    <CardDescription>Here is the quiz generated by AI. You can copy and use it.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea readOnly value={generatedQuiz} className="h-96 font-mono text-sm" />
                </CardContent>
            </Card>
        )}
    </div>
  );
}
