
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserQuizHistory = {
    quizId: string;
    quizTitle: string;
    score: number;
    totalQuestions: number;
    date: string;
    category: string;
};

type User = {
  name: string;
  email: string;
  isPremium: boolean;
  hasUsedFreeGeneration: boolean;
  quizHistory: UserQuizHistory[];
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (name: string, email: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  goPremium: () => void;
  useFreeGeneration: () => void;
  addQuizAttempt: (attempt: Omit<UserQuizHistory, 'date'>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('quizwhiz_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (typeof parsedUser.hasUsedFreeGeneration === 'undefined') {
          parsedUser.hasUsedFreeGeneration = false;
        }
        if (!parsedUser.quizHistory) {
          parsedUser.quizHistory = [];
        }
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('quizwhiz_user');
    } finally {
        setIsLoading(false);
    }
  }, []);

  const updateUserInStateAndStorage = (updatedUser: User | null) => {
    if (updatedUser) {
        localStorage.setItem('quizwhiz_user', JSON.stringify(updatedUser));
    } else {
        localStorage.removeItem('quizwhiz_user');
    }
    setUser(updatedUser);
  };

  const login = (name: string, email: string) => {
    const newUser: User = {
      name,
      email,
      isPremium: false,
      hasUsedFreeGeneration: false,
      quizHistory: [],
    };
    updateUserInStateAndStorage(newUser);
  };
  
  const signup = (name: string, email: string) => {
    const newUser: User = { name, email, isPremium: false, hasUsedFreeGeneration: false, quizHistory: [] };
    updateUserInStateAndStorage(newUser);
  };

  const logout = () => {
    updateUserInStateAndStorage(null);
  };
  
  const goPremium = () => {
    if (user) {
      updateUserInStateAndStorage({ ...user, isPremium: true });
    }
  };

  const useFreeGeneration = () => {
    if (user && !user.isPremium) {
      updateUserInStateAndStorage({ ...user, hasUsedFreeGeneration: true });
    }
  };

  const addQuizAttempt = (attempt: Omit<UserQuizHistory, 'date'>) => {
    if (user) {
        const newAttempt = { ...attempt, date: new Date().toISOString() };
        const updatedHistory = [newAttempt, ...user.quizHistory];
        updateUserInStateAndStorage({ ...user, quizHistory: updatedHistory });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout, goPremium, useFreeGeneration, addQuizAttempt }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
