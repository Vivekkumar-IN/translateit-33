import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, Save, Timer } from 'lucide-react';
import { languageService } from '@/services/languageService';

interface ProgressIndicatorProps {
  translated: number;
  total: number;
  currentIndex: number;
  language: string;
  lastSaved?: Date;
  autoSaveEnabled?: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  translated,
  total,
  currentIndex,
  language,
  lastSaved,
  autoSaveEnabled = true
}) => {
  const percentage = Math.round((translated / total) * 100);
  const remaining = total - translated;
  const estimated = remaining * 1.5; // Estimate 1.5 minutes per translation
  const languageName = languageService.getLanguageName(language);

  const formatTime = (minutes: number) => {
    if (minutes < 1) return '< 1m';
    if (minutes < 60) return `${Math.round(minutes)}m`;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
    if (hours > 0) return `${hours}h`;
    return `${mins}m`;
  };

  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Translation Progress</h3>
            <Badge variant="secondary">{languageName} ({language.toUpperCase()})</Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{translated} of {total} completed</span>
              <span>{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-2 [&>div]:bg-green-500" />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span className="text-xs font-medium">Done</span>
              </div>
              <p className="text-lg font-bold text-green-600">{translated}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-orange-500" />
                <span className="text-xs font-medium">Left</span>
              </div>
              <p className="text-lg font-bold text-orange-600">{remaining}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <Timer className="w-3 h-3 text-blue-500" />
                <span className="text-xs font-medium">ETA</span>
              </div>
              <p className="text-lg font-bold text-blue-600">
                {remaining === 0 ? 'Done!' : formatTime(estimated)}
              </p>
            </div>
          </div>

          {autoSaveEnabled && lastSaved && (
            <div className="flex items-center justify-center gap-2 pt-2 border-t">
              <Save className="w-3 h-3 text-green-500" />
              <span className="text-xs text-muted-foreground">
                Auto-saved {formatLastSaved(lastSaved)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressIndicator;
