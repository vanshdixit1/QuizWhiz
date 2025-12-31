"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import AttemptedQuizzes from '@/components/dashboard/attempted-quizzes';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated || !user || !user.profile) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  const userName = user.profile.username;

  return (
    <div className="container py-12 space-y-8">
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${userName}`} alt={userName} />
          <AvatarFallback className="text-3xl">{userName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome back, {userName}!</h1>
          <p className="text-muted-foreground text-lg">Here's a summary of your quizzing journey.</p>
          {user.profile.premium && (
            <div className="flex items-center gap-2 mt-2 text-yellow-600 dark:text-yellow-400 font-semibold">
              <Crown className="h-5 w-5 fill-current" />
              <span>Premium Member</span>
            </div>
          )}
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Quiz History</CardTitle>
          <CardDescription>Review your past performance and see how you've improved over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <AttemptedQuizzes />
        </CardContent>
      </Card>
    </div>
  );
}
