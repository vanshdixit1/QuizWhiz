
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
  login: (email: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  goPremium: () => void;
  useFreeGeneration: () => void;
  addQuizAttempt: (attempt: Omit<UserQuizHistory, 'date'>) => void;
  allowFreeGeneration: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('quizwhiz_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // Ensure necessary properties exist
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
    }
  }, []);

  const updateUserInStateAndStorage = (updatedUser: User) => {
    localStorage.setItem('quizwhiz_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const login = (email: string) => {
    const storedUser = localStorage.getItem('quizwhiz_user');
    let existingUser: Partial<User> = {};
    if (storedUser) {
        try {
            const parsed = JSON.parse(storedUser);
            if (parsed.email === email) {
                existingUser = parsed;
            }
        } catch (e) { console.error(e) }
    }
    
    const newUser: User = { 
      name: email.split('@')[0], 
      email, 
      isPremium: existingUser.isPremium ?? false,
      hasUsedFreeGeneration: existingUser.hasUsedFreeGeneration ?? false,
      quizHistory: existingUser.quizHistory ?? [],
    };
    updateUserInStateAndStorage(newUser);
  };
  
  const signup = (name: string, email: string) => {
    const newUser: User = { name, email, isPremium: false, hasUsedFreeGeneration: false, quizHistory: [] };
    updateUserInStateAndStorage(newUser);
  };

  const logout = () => {
    localStorage.removeItem('quizwhiz_user');
    setUser(null);
  };
  
  const goPremium = () => {
    if (user) {
      updateUserInStateAndStorage({ ...user, isPremium: true });
    }
  };

  const useFreeGeneration = () => {
    if (user) {
      updateUserInStateAndStorage({ ...user, hasUsedFreeGeneration: true });
    }
  };

  const allowFreeGeneration = () => {
    if (user) {
      updateUserInStateAndStorage({ ...user, hasUsedFreeGeneration: false });
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
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, goPremium, useFreeGeneration, addQuizAttempt, allowFreeGeneration }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
