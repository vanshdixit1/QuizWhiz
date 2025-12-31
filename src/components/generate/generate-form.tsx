
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
import { Loader2, Wand2, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Quiz } from '@/lib/data';
import QuizPlayer from '../quiz/quiz-player';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '@/components/ui/label';

const topicSchema = z.object({
  topic: z.string().min(3, { message: 'Topic must be at least 3 characters.' }),
  timerEnabled: z.boolean().default(true),
  timerDuration: z.number().default(15),
});

const pdfSchema = z.object({
  pdf: z.instanceof(File).refine(file => file.size > 0, 'A PDF file is required.').refine(file => file.type === 'application/pdf', 'File must be a PDF.'),
  timerEnabled: z.boolean().default(true),
  timerDuration: z.number().default(15),
});

type GenerateFormProps = {
  isFreeTrial: boolean;
};

export default function GenerateForm({ isFreeTrial }: GenerateFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<Quiz | null>(null);
  const [quizSettings, setQuizSettings] = useState<{timerEnabled: boolean, timerDuration: number} | null>(null);
  const { toast } = useToast();

  const topicForm = useForm<z.infer<typeof topicSchema>>({
    resolver: zodResolver(topicSchema),
    defaultValues: { topic: '', timerEnabled: true, timerDuration: 15 },
  });

  const pdfForm = useForm<z.infer<typeof pdfSchema>>({
    resolver: zodResolver(pdfSchema),
    defaultValues: { timerEnabled: true, timerDuration: 15 },
  });

  const onTopicSubmit = async (values: z.infer<typeof topicSchema>) => {
    setIsLoading(true);
    setGeneratedQuiz(null);
    try {
      const input: GenerateQuizFromTopicInput = { topic: values.topic };
      const result = await generateQuizFromTopic(input);
      setGeneratedQuiz(result);
      setQuizSettings({ timerEnabled: values.timerEnabled, timerDuration: values.timerDuration });
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
        setGeneratedQuiz(result);
        setQuizSettings({ timerEnabled: values.timerEnabled, timerDuration: values.timerDuration });
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

  const renderTimerOptions = (form: any) => (
    <>
      <div className="flex items-center justify-between mt-4">
        <Label htmlFor="timer-switch" className="flex items-center gap-2 text-base">
          <Clock className="h-5 w-5" /> Include Timer
        </Label>
        <FormField
          control={form.control}
          name="timerEnabled"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Switch
                  id="timer-switch"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      {form.watch('timerEnabled') && (
        <div className="flex items-center justify-between mt-4">
          <Label htmlFor="timer-duration" className="text-base">Timer Duration (seconds)</Label>
          <FormField
            control={form.control}
            name="timerDuration"
            render={({ field }) => (
                <FormItem>
                    <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)}>
                        <FormControl>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Time" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="15">15</SelectItem>
                            <SelectItem value="30">30</SelectItem>
                            <SelectItem value="60">60</SelectItem>
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
          />
        </div>
      )}
    </>
  );
  
  if (isLoading) {
    return (
        <div className="mt-8 text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Generating your quiz... This might take a moment.</p>
        </div>
    );
  }

  if (generatedQuiz) {
      return <QuizPlayer quiz={generatedQuiz} isGenerated={true} timerSettings={quizSettings!} isFreeTrialQuiz={isFreeTrial} />;
  }

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
                            {renderTimerOptions(topicForm)}
                            <Button type="submit" className="w-full !mt-6">
                                <Wand2 className="mr-2 h-4 w-4" />
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
                            {renderTimerOptions(pdfForm)}
                            <Button type="submit" className="w-full !mt-6">
                                <Wand2 className="mr-2 h-4 w-4" />
                                Generate Quiz
                            </Button>
                        </form>
                        </Form>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}

