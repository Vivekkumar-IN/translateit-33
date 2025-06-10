import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Lightbulb } from 'lucide-react';
import { languageDetectionService } from '../services/languageDetectionService';

interface LanguageInputProps {
  onStart: (languageCode: string) => void;
  loading: boolean;
}

const popularLanguages = [
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'tr', name: 'Turkish' }
];

const LanguageInput: React.FC<LanguageInputProps> = ({ onStart, loading }) => {
  const [languageCode, setLanguageCode] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');

  useEffect(() => {
    // Auto-detect user's language
    const detected = languageDetectionService.detectUserLanguage();
    if (detected) {
      setDetectedLanguage(detected);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (languageCode.trim()) {
      onStart(languageCode.trim().toLowerCase());
    }
  };

  const handleLanguageSelect = (code: string) => {
    setLanguageCode(code);
  };

  const useDetectedLanguage = () => {
    setLanguageCode(detectedLanguage);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Auto-detection suggestion */}
      {detectedLanguage && detectedLanguage !== languageCode && (
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/30">
          <Lightbulb className="w-4 h-4 text-blue-600" />
          <AlertDescription className="text-sm">
            <div className="flex items-center justify-between">
              <span>
                Detected language: <strong>{languageDetectionService.getLanguageName(detectedLanguage)}</strong> ({detectedLanguage})
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={useDetectedLanguage}
                className="ml-2"
              >
                Use this
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="langCode">Enter your language code (ISO 639-1)</Label>
        <Input
          id="langCode"
          type="text"
          placeholder="e.g., hi, fr, es, de..."
          value={languageCode}
          onChange={(e) => setLanguageCode(e.target.value)}
          className="text-center"
          disabled={loading}
        />
        <p className="text-xs text-muted-foreground text-center">
          Use 2-letter ISO codes like 'hi' for Hindi, 'fr' for French, etc.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-center">Popular languages:</p>
        <div className="grid grid-cols-2 gap-2">
          {popularLanguages.map((lang) => (
            <Badge
              key={lang.code}
              variant={languageCode === lang.code ? "default" : "outline"}
              className={`cursor-pointer justify-center py-2 transition-colors ${
                languageCode === lang.code 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-accent hover:text-accent-foreground border-border"
              }`}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              {lang.code.toUpperCase()} - {lang.name}
            </Badge>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={!languageCode.trim() || loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Loading YAML...
          </>
        ) : (
          'Start Translating'
        )}
      </Button>
    </form>
  );
};

export default LanguageInput;
