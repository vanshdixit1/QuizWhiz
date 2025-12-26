'use server';

/**
 * @fileOverview Generates a quiz from a PDF document.
 *
 * - generateQuizFromPdf - A function that handles the quiz generation process from a PDF.
 * - GenerateQuizFromPdfInput - The input type for the generateQuizFromPdf function.
 * - GenerateQuizFromPdfOutput - The return type for the generateQuizFromPdf function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizFromPdfInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      'The PDF document content as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
});
export type GenerateQuizFromPdfInput = z.infer<typeof GenerateQuizFromPdfInputSchema>;

const QuestionSchema = z.object({
    question: z.string(),
    options: z.array(z.string()),
    correctAnswer: z.string(),
});

const GenerateQuizFromPdfOutputSchema = z.object({
  title: z.string(),
  description: z.string(),
  questions: z.array(QuestionSchema),
});

export type GenerateQuizFromPdfOutput = z.infer<typeof GenerateQuizFromPdfOutputSchema> & { id: string; category: string; imageId: string };

export async function generateQuizFromPdf(input: GenerateQuizFromPdfInput): Promise<GenerateQuizFromPdfOutput> {
    const quizData = await generateQuizFromPdfFlow(input);
    return {
        ...quizData,
        id: `ai-pdf-${Date.now()}`,
        category: 'PDF Quiz',
        imageId: 'english', // Default image for PDF quizzes
    };
}

const prompt = ai.definePrompt({
  name: 'generateQuizFromPdfPrompt',
  input: {schema: GenerateQuizFromPdfInputSchema},
  output: {schema: GenerateQuizFromPdfOutputSchema},
  prompt: `You are a quiz generator expert. Please generate a quiz with 10 questions based on the content of the PDF document.
    The quiz should include:
    - A short, engaging title for the quiz based on the PDF content.
    - A brief, one-sentence description.
    - Exactly 10 multiple-choice questions.
    - Each question must have exactly 4 options.
    - One of the options must be the correct answer.

    Return the output as a valid JSON object matching the requested schema. Ensure the 'correctAnswer' string is one of the strings present in the 'options' array for each question.

PDF Content: {{media url=pdfDataUri}}`,
});

const generateQuizFromPdfFlow = ai.defineFlow(
  {
    name: 'generateQuizFromPdfFlow',
    inputSchema: GenerateQuizFromPdfInputSchema,
    outputSchema: GenerateQuizFromPdfOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
