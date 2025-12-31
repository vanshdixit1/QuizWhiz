
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  name: string;
  email: string;
  isPremium: boolean;
  hasUsedFreeGeneration: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  goPremium: () => void;
  useFreeGeneration: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('quizwhiz_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // Ensure hasUsedFreeGeneration property exists
        if (typeof parsedUser.hasUsedFreeGeneration === 'undefined') {
          parsedUser.hasUsedFreeGeneration = false;
        }
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('quizwhiz_user');
    }
  }, []);

  const login = (email: string) => {
    // For existing users, we check if they already have used the feature.
    // A simple approach is to check if the flag is already set in their localStorage data.
    // If not, we can assume they haven't. This logic would be more robust with a backend.
    const storedUser = localStorage.getItem('quizwhiz_user');
    const existingUser = storedUser ? JSON.parse(storedUser) : {};
    
    const newUser: User = { 
      name: email.split('@')[0], 
      email, 
      isPremium: existingUser.email === email ? existingUser.isPremium : false,
      hasUsedFreeGeneration: existingUser.email === email ? existingUser.hasUsedFreeGeneration : false,
    };
    localStorage.setItem('quizwhiz_user', JSON.stringify(newUser));
    setUser(newUser);
  };
  
  const signup = (name: string, email: string) => {
    const newUser: User = { name, email, isPremium: false, hasUsedFreeGeneration: false };
    localStorage.setItem('quizwhiz_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('quizwhiz_user');
    setUser(null);
  };
  
  const goPremium = () => {
    if (user) {
      const premiumUser = { ...user, isPremium: true };
      localStorage.setItem('quizwhiz_user', JSON.stringify(premiumUser));
      setUser(premiumUser);
    }
  };

  const useFreeGeneration = () => {
    if (user) {
      const updatedUser = { ...user, hasUsedFreeGeneration: true };
      localStorage.setItem('quizwhiz_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, goPremium, useFreeGeneration }}>
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
