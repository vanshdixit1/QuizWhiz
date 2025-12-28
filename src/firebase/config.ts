// This file is for client-side Firebase configuration.
// Server-side configuration is handled by environment variables.

export const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "studio-9140941627-7b8e1",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:610127403146:web:5a28b229f6a534c185b573",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDoP_YhOpy9apjobFq0CTsIvRT1QJX0bKk",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "studio-9140941627-7b8e1.firebaseapp.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "610127403146",
};
