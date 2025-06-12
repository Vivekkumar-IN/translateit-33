
import React from 'react';
import { CONFIG } from '@/config/appConfig';
import { Globe, Music, Star } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-border bg-gradient-to-r from-background via-background/95 to-background backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto max-w-4xl px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Music className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Globe className="w-2 h-2 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {CONFIG.APP_NAME}
              </h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Star className="w-3 h-3" />
                Translation Hub
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
