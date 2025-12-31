
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import {
  Auth,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, collection } from 'firebase/firestore';
import { useFirebase } from '@/firebase/provider';
import { useDoc } from '@/firebase/firestore/use-doc';
import { useCollection } from '@/firebase/firestore/use-collection';

// Type for a single quiz attempt history item
export type UserQuizHistory = {
  quizId: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  date: string;
  category: string;
};

// Type for the user profile stored in Firestore
export type UserProfile = {
  id: string;
  username: string;
  email: string;
  premium: boolean;
  hasUsedFreeGeneration: boolean;
};

// Combined user type for the context
export type AppUser = {
  firebaseUser: FirebaseUser;
  profile: UserProfile | null;
  quizHistory: UserQuizHistory[];
  isPremium: boolean;
  hasUsedFreeGeneration: boolean;
};

type AuthContextType = {
  user: AppUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signup: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  addQuizAttempt: (attempt: Omit<UserQuizHistory, 'date'>) => Promise<void>;
  useFreeGeneration: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { auth, firestore, isUserLoading: isFirebaseUserLoading, user: firebaseUser } = useFirebase();
  const [appUser, setAppUser] = useState<AppUser | null>(null);

  // Firestore hook to get the user's profile
  const userProfileRef = useMemo(
    () => (firestore && firebaseUser ? doc(firestore, 'users', firebaseUser.uid) : null),
    [firestore, firebaseUser]
  );
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  // Firestore hook to get the user's quiz history
  const quizHistoryRef = useMemo(
    () => (firestore && firebaseUser ? collection(firestore, 'users', firebaseUser.uid, 'quizAttempts') : null),
    [firestore, firebaseUser]
  );
  const { data: quizHistory, isLoading: isHistoryLoading } = useCollection<UserQuizHistory>(quizHistoryRef);


  useEffect(() => {
    if (isFirebaseUserLoading || isProfileLoading || isHistoryLoading) return;

    if (firebaseUser && userProfile) {
        setAppUser({
            firebaseUser,
            profile: userProfile,
            quizHistory: quizHistory || [],
            isPremium: userProfile.premium,
            hasUsedFreeGeneration: userProfile.hasUsedFreeGeneration,
        });
    } else {
        setAppUser(null);
    }
  }, [firebaseUser, userProfile, isFirebaseUserLoading, isProfileLoading, quizHistory, isHistoryLoading]);

  const signup = async (username: string, email: string, password: string) => {
    if (!auth || !firestore) throw new Error('Firebase not initialized');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const newUserProfile: UserProfile = {
      id: user.uid,
      username,
      email,
      premium: false,
      hasUsedFreeGeneration: false,
    };
    await setDoc(doc(firestore, 'users', user.uid), newUserProfile);
  };

  const login = async (email: string, password: string) => {
    if (!auth) throw new Error('Firebase not initialized');
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    if (!auth) throw new Error('Firebase not initialized');
    await signOut(auth);
  };

  const addQuizAttempt = async (attempt: Omit<UserQuizHistory, 'date'>) => {
    if (!appUser || !firestore) return;
    const newAttempt = { ...attempt, date: new Date().toISOString() };
    const attemptRef = doc(collection(firestore, `users/${appUser.firebaseUser.uid}/quizAttempts`));
    await setDoc(attemptRef, newAttempt);
  };

  const useFreeGeneration = async () => {
    if (!appUser || !appUser.profile || !firestore) return;
    if (appUser.profile.premium) return; // Premium users don't use up a free generation

    const userDocRef = doc(firestore, 'users', appUser.firebaseUser.uid);
    await setDoc(userDocRef, { hasUsedFreeGeneration: true }, { merge: true });
  };
  
  const isLoading = isFirebaseUserLoading || isProfileLoading || isHistoryLoading;

  return (
    <AuthContext.Provider
      value={{
        user: appUser,
        isAuthenticated: !!appUser,
        isLoading,
        signup,
        login,
        logout,
        addQuizAttempt,
        useFreeGeneration,
      }}
    >
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
}
