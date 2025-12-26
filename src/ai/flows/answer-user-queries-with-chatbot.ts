'use server';
/**
 * @fileOverview An AI chatbot for answering user queries and providing guidance on the website.
 *
 * - answerUserQueriesWithChatbot - A function that handles user queries and returns helpful answers.
 * - AnswerUserQueriesWithChatbotInput - The input type for the answerUserQueriesWithChatbot function.
 * - AnswerUserQueriesWithChatbotOutput - The return type for the answerUserQueriesWithChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerUserQueriesWithChatbotInputSchema = z.object({
  query: z.string().describe('The user query.'),
});
export type AnswerUserQueriesWithChatbotInput = z.infer<typeof AnswerUserQueriesWithChatbotInputSchema>;

const AnswerUserQueriesWithChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type AnswerUserQueriesWithChatbotOutput = z.infer<typeof AnswerUserQueriesWithChatbotOutputSchema>;

export async function answerUserQueriesWithChatbot(input: AnswerUserQueriesWithChatbotInput): Promise<AnswerUserQueriesWithChatbotOutput> {
  return answerUserQueriesWithChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerUserQueriesWithChatbotPrompt',
  input: {schema: AnswerUserQueriesWithChatbotInputSchema},
  output: {schema: AnswerUserQueriesWithChatbotOutputSchema},
  prompt: `You are a helpful chatbot assistant for the QuizWhiz website. Your goal is to answer user queries and provide guidance on how to use the website.

User Query: {{{query}}}

Answer: `,
});

const answerUserQueriesWithChatbotFlow = ai.defineFlow(
  {
    name: 'answerUserQueriesWithChatbotFlow',
    inputSchema: AnswerUserQueriesWithChatbotInputSchema,
    outputSchema: AnswerUserQueriesWithChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
