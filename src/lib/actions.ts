
"use server";

import { promises as fs } from "fs";
import path from "path";
import { quizSchema, type Quiz } from "@/components/dashboard/data/schema";

const quizzesFilePath = path.join(process.cwd(), "src/components/dashboard/data/quizzes.json");

async function getQuizzes(): Promise<Quiz[]> {
  try {
    const data = await fs.readFile(quizzesFilePath);
    // Handle empty file case
    if (data.length === 0) {
        return [];
    }
    const quizzes = JSON.parse(data.toString());
    return quizSchema.array().parse(quizzes);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    if (error.code === 'ENOENT') {
        return [];
    }
    console.error("Failed to read or parse quizzes file:", error);
    throw error; // Re-throw other errors
  }
}

export async function saveQuizResult(newResult: {
    id: string;
    title: string;
    score: number;
    correctQuestions: number;
    incorrectQuestions: number;
}) {
    const quizzes = await getQuizzes();

    const existingQuizIndex = quizzes.findIndex(quiz => quiz.id === newResult.id);

    if (existingQuizIndex !== -1) {
        // Update existing quiz result
        quizzes[existingQuizIndex] = {
            ...quizzes[existingQuizIndex],
            ...newResult,
        };
    } else {
        // Add new quiz result
        quizzes.push(newResult);
    }

    try {
        await fs.writeFile(quizzesFilePath, JSON.stringify(quizzes, null, 2));
    } catch (error) {
        console.error("Failed to save quiz result:", error);
    }
}
