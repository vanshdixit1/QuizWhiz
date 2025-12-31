
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { FileQuestion } from 'lucide-react';

export default function AttemptedQuizzes() {
  const { user } = useAuth();
  const quizHistory = user?.quizHistory || [];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700";
    if (score >= 60) return "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700";
    if (score >= 40) return "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700";
    return "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700";
  }

  if (quizHistory.length === 0) {
    return (
        <div className="text-center py-16 border rounded-lg bg-card">
            <FileQuestion className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">No Quizzes Attempted</h3>
            <p className="text-muted-foreground mt-2">Your quiz history will appear here once you take a few.</p>
        </div>
    )
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quiz Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quizHistory.map((item) => (
            <TableRow key={`${item.quizId}-${item.date}`}>
              <TableCell className="font-medium">{item.quizTitle}</TableCell>
              <TableCell>
                <Badge variant="secondary">{item.category}</Badge>
              </TableCell>
              <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <span className={cn("font-bold px-2 py-1 rounded-md", getScoreColor(item.score))}>
                    {item.score}%
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
