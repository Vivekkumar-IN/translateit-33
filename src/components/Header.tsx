
import React from 'react';
import { CONFIG } from '@/config/appConfig';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-4xl px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">
            {CONFIG.APP_NAME}
          </h1>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
