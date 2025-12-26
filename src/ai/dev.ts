import { config } from 'dotenv';
config();

import '@/ai/flows/answer-user-queries-with-chatbot.ts';
import '@/ai/flows/generate-quiz-from-topic.ts';
import '@/ai/flows/generate-quiz-from-pdf.ts';