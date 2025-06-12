
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertTriangle, Globe, Languages, Star } from 'lucide-react';
import { languageService } from '../services/languageService';

interface LanguageInputProps {
  onStart: (data: { languageCode: string }) => void;
  loading: boolean;
}

const LanguageInput: React.FC<LanguageInputProps> = ({ onStart, loading }) => {
  const [languageCode, setLanguageCode] = useState('');
  const [validation, setValidation] = useState<{
    isValid: boolean;
    name?: string;
  } | null>(null);

  // Get language categories synchronously (fast loading)
  const translatedLanguages = languageService.getTranslatedLanguageDetails();
  const popularUntranslatedLanguages = languageService.getPopularUntranslatedLanguages();
  const allLanguagesWithStatus = languageService.getAllLanguagesWithStatus();

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

  const truncateName = (name: string, maxLength: number = 12) => {
    return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
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

      {/* Currently Translated Languages */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <p className="text-sm font-medium">Currently Translated Languages ({translatedLanguages.length}):</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {translatedLanguages.map((lang) => (
            <Badge
              key={lang.code}
              variant={languageCode === lang.code ? "default" : "secondary"}
              className={`cursor-pointer justify-center py-2 text-xs transition-colors ${
                languageCode === lang.code 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 border-green-200 dark:border-green-800 hover:bg-green-200 dark:hover:bg-green-800/50"
              }`}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              {lang.code.toUpperCase()} - {truncateName(lang.name, 8)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Popular Languages Available for Translation */}
      {popularUntranslatedLanguages.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-600" />
            <p className="text-sm font-medium">Popular Languages Available ({popularUntranslatedLanguages.length}):</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {popularUntranslatedLanguages.map((lang) => (
              <Badge
                key={lang.code}
                variant={languageCode === lang.code ? "default" : "outline"}
                className={`cursor-pointer justify-center py-2 text-xs transition-colors ${
                  languageCode === lang.code 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "hover:bg-accent hover:text-accent-foreground border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                }`}
                onClick={() => handleLanguageSelect(lang.code)}
              >
                {lang.code.toUpperCase()} - {truncateName(lang.name, 8)}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* All Available Languages */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-gray-600" />
          <p className="text-sm font-medium">All Available Languages ({allLanguagesWithStatus.length}):</p>
        </div>
        <div className="max-h-48 overflow-y-auto rounded-md border border-border bg-muted/30 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {allLanguagesWithStatus.map((lang) => (
              <div
                key={lang.code}
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                  languageCode === lang.code 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => handleLanguageSelect(lang.code)}
              >
                {lang.isTranslated && (
                  <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                )}
                <span className="text-xs font-mono">{lang.code.toUpperCase()}</span>
                <span className="text-xs truncate">{lang.name}</span>
              </div>
            ))}
          </div>
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
