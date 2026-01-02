
import { z } from "zod"

// We're keeping a simple non-relational schema here.
// A real app might be more complex and database-driven.

export const quizSchema = z.object({
  id: z.string(),
  title: z.string(),
  score: z.number().nullable(),
  correctQuestions: z.number().nullable(),
  incorrectQuestions: z.number().nullable(),
})

export type Quiz = z.infer<typeof quizSchema>
