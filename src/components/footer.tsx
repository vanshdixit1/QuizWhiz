'use client';

import { useState, useEffect } from 'react';
import Logo from './logo';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-card">
      <div className="container flex items-center justify-between py-6">
        <Logo className="text-base" />
        <p className="text-sm text-muted-foreground">
          © {currentYear || '2024'} QuizWhiz. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
