
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';
import { enhancedLanguageService } from '../services/enhancedLanguageService';

interface LanguageInputProps {
  onStart: (data: { languageCode: string }) => void;
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
  const [validation, setValidation] = useState<{
    isValid: boolean;
    isDeprecated: boolean;
    suggestion?: string;
    name?: string;
  } | null>(null);

  useEffect(() => {
    const detected = enhancedLanguageService.detectUserLanguage();
    if (detected) {
      setDetectedLanguage(detected);
    }
  }, []);

  useEffect(() => {
    if (languageCode.trim()) {
      const result = enhancedLanguageService.validateLanguageCode(languageCode.trim());
      setValidation(result);
    } else {
      setValidation(null);
    }
  }, [languageCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (languageCode.trim() && validation?.isValid) {
      onStart({ 
        languageCode: languageCode.trim().toLowerCase()
      });
    }
  };

  const handleLanguageSelect = (code: string) => {
    setLanguageCode(code);
  };

  const useDetectedLanguage = () => {
    setLanguageCode(detectedLanguage);
  };

  const useSuggestion = () => {
    if (validation?.suggestion) {
      setLanguageCode(validation.suggestion);
    }
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
                Detected language: <strong>{enhancedLanguageService.getLanguageName(detectedLanguage)}</strong> ({detectedLanguage})
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
        
        {/* Validation feedback */}
        {validation && (
          <div className="space-y-2">
            {validation.isValid ? (
              <Alert className="border-green-200 bg-green-50 dark:bg-green-950/30">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-sm text-green-800 dark:text-green-200">
                  Valid language: <strong>{validation.name}</strong>
                </AlertDescription>
              </Alert>
            ) : validation.isDeprecated ? (
              <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/30">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <AlertDescription className="text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-orange-800 dark:text-orange-200">
                      Deprecated code. {validation.suggestion && (
                        <>Use <strong>{validation.suggestion}</strong> instead.</>
                      )}
                    </span>
                    {validation.suggestion && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={useSuggestion}
                        className="ml-2"
                      >
                        Use {validation.suggestion}
                      </Button>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-red-200 bg-red-50 dark:bg-red-950/30">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <AlertDescription className="text-sm text-red-800 dark:text-red-200">
                  Invalid language code. Please use a valid ISO 639-1 code.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
        
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

      <Button 
        type="submit" 
        disabled={!languageCode.trim() || loading || !validation?.isValid} 
        className="w-full"
      >
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
