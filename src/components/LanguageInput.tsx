
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { languageService } from '../services/languageService';
import languageData from '@/data/iso639-1.json';

interface LanguageInputProps {
  onStart: (data: { languageCode: string }) => void;
  loading: boolean;
}

/*const popularLanguages = [
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
];*/


const popularLanguages = Object.entries(languageData).map(([code, name]) => ({
  code,
  name,
}));


const LanguageInput: React.FC<LanguageInputProps> = ({ onStart, loading }) => {
  const [languageCode, setLanguageCode] = useState('');
  const [validation, setValidation] = useState<{
    isValid: boolean;
    name?: string;
  } | null>(null);

  useEffect(() => {
    if (languageCode.trim()) {
      const result = languageService.validateLanguageCode(languageCode.trim());
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        <p className="text-sm font-medium text-centre">Available languages:</p>
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
