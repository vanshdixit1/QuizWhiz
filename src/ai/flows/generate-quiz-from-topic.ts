// This file is used to generate a quiz from a given topic.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { Quiz } from '@/lib/data';

/**
 * @fileOverview This file defines a Genkit flow for generating a quiz from a given topic.
 *
 * - generateQuizFromTopic - A function that generates a quiz based on the provided topic.
 * - GenerateQuizFromTopicInput - The input type for the generateQuizFromTopic function.
 * - GenerateQuizFromTopicOutput - The output type for the generateQuizFromTopic function.
 */

const GenerateQuizFromTopicInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate the quiz.'),
});

export type GenerateQuizFromTopicInput = z.infer<
  typeof GenerateQuizFromTopicInputSchema
>;

const QuestionSchema = z.object({
    question: z.string(),
    options: z.array(z.string()),
    correctAnswer: z.string(),
});

const GenerateQuizFromTopicOutputSchema = z.object({
    title: z.string(),
    description: z.string(),
    questions: z.array(QuestionSchema),
});

export type GenerateQuizFromTopicOutput = z.infer<
  typeof GenerateQuizFromTopicOutputSchema
> & { id: string; category: string; imageId: string };


export async function generateQuizFromTopic(
  input: GenerateQuizFromTopicInput
): Promise<GenerateQuizFromTopicOutput> {
    const quizData = await generateQuizFromTopicFlow(input);
    return {
        ...quizData,
        id: `ai-${Date.now()}`,
        category: input.topic,
        imageId: 'general_knowledge',
    };
}

const generateQuizPrompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizFromTopicInputSchema},
  output: {schema: GenerateQuizFromTopicOutputSchema},
  prompt: `You are an expert quiz generator. Generate a quiz based on the following topic: {{{topic}}}.

  The quiz should include:
  - A short, engaging title for the quiz.
  - A brief, one-sentence description.
  - Exactly 10 multiple-choice questions.
  - Each question must have exactly 4 options.
  - One of the options must be the correct answer.

  Return the output as a valid JSON object matching the requested schema. Ensure the 'correctAnswer' string is one of the strings present in the 'options' array for each question.`,
});

const generateQuizFromTopicFlow = ai.defineFlow(
  {
    name: 'generateQuizFromTopicFlow',
    inputSchema: GenerateQuizFromTopicInputSchema,
    outputSchema: GenerateQuizFromTopicOutputSchema,
  },
  async input => {
    const {output} = await generateQuizPrompt(input);
    return output!;
  }
);
