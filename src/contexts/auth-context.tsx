"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  name: string;
  email: string;
  isPremium: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  goPremium: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('quizwhiz_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('quizwhiz_user');
    }
  }, []);

  const login = (email: string) => {
    const newUser: User = { name: email.split('@')[0], email, isPremium: user?.isPremium || false };
    localStorage.setItem('quizwhiz_user', JSON.stringify(newUser));
    setUser(newUser);
  };
  
  const signup = (name: string, email: string) => {
    const newUser: User = { name, email, isPremium: false };
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

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, goPremium }}>
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
