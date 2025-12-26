// This file is used to generate a quiz from a given topic.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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

const GenerateQuizFromTopicOutputSchema = z.object({
  quiz: z.string().describe('The generated quiz questions and answers.'),
});

export type GenerateQuizFromTopicOutput = z.infer<
  typeof GenerateQuizFromTopicOutputSchema
>;

export async function generateQuizFromTopic(
  input: GenerateQuizFromTopicInput
): Promise<GenerateQuizFromTopicOutput> {
  return generateQuizFromTopicFlow(input);
}

const generateQuizPrompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizFromTopicInputSchema},
  output: {schema: GenerateQuizFromTopicOutputSchema},
  prompt: `You are a quiz generator. Generate a quiz with 10 questions and answers based on the following topic: {{{topic}}}. Return the questions and answer in JSON format. The keys of JSON should be questions and answers.`,
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
