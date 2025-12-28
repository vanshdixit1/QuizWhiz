'use client';

import { firebaseConfig as clientFirebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

export function initializeFirebase() {
  if (getApps().length) {
    return getSdks(getApp());
  }

  const isServer = typeof window === 'undefined';
  
  let firebaseConfig: FirebaseOptions;

  if (isServer) {
    // Server-side: Use environment variables prefixed with NEXT_PUBLIC_
    firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
  } else {
    // Client-side: Use the imported config object, which Next.js populates
    // from .env.local or environment variables at build time.
    firebaseConfig = clientFirebaseConfig;
  }

  // Final check to ensure configuration is not empty
  if (!firebaseConfig.projectId) {
     throw new Error('Firebase configuration is missing. Ensure environment variables are set for server-side rendering or the firebase/config.ts is correct for client-side.');
  }

  const firebaseApp = initializeApp(firebaseConfig);
  return getSdks(firebaseApp);
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
