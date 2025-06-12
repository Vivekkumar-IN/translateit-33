
import languageData from '@/data/iso639-1.json';

class LanguageService {
  private languageNames: Record<string, string> = {};
  
  constructor() {
    try {
      this.languageNames = languageData;
    } catch (error) {
      console.warn('Failed to load ISO language data');
      // Provide a minimal fallback for critical languages
      this.languageNames = {
        'en': 'English',
        'hi': 'Hindi',
        'es': 'Spanish',
        'fr': 'French',
        'de': 'German',
        'ja': 'Japanese',
        'zh': 'Chinese',
        'ru': 'Russian',
        'ar': 'Arabic'
      };
    }
  }

  getLanguageName(code: string): string {
    const lowerCode = code.toLowerCase();
    return this.languageNames[lowerCode] || code.toUpperCase();
  }

  isValidLanguageCode(code: string): boolean {
    return Object.keys(this.languageNames).includes(code.toLowerCase());
  }

  getAllSupportedLanguages(): { code: string; name: string }[] {
    return Object.entries(this.languageNames)
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  searchLanguages(query: string): { code: string; name: string }[] {
    const lowerQuery = query.toLowerCase();
    
    return this.getAllSupportedLanguages().filter(lang => 
      lang.name.toLowerCase().includes(lowerQuery) ||
      lang.code.toLowerCase().includes(lowerQuery)
    );
  }

  validateLanguageCode(code: string): { 
    isValid: boolean;
    name?: string 
  } {
    const lowerCode = code.toLowerCase();
    const isValid = this.isValidLanguageCode(lowerCode);
    
    return {
      isValid,
      name: isValid ? this.getLanguageName(lowerCode) : undefined
    };
  }

  // Dynamically get translated languages from available JSON files
  async getTranslatedLanguages(): Promise<string[]> {
    const translatedLanguages: string[] = [];
    
    // Try to import all known language files to check which ones exist
    const allLanguageCodes = Object.keys(this.languageNames);
    
    for (const code of allLanguageCodes) {
      try {
        await import(`@/data/langs/${code}.json`);
        translatedLanguages.push(code);
      } catch (error) {
        // File doesn't exist, skip
      }
    }
    
    return translatedLanguages;
  }

  async isLanguageTranslated(code: string): Promise<boolean> {
    const translatedLanguages = await this.getTranslatedLanguages();
    return translatedLanguages.includes(code.toLowerCase());
  }

  async getUntranslatedLanguages(): Promise<{ code: string; name: string }[]> {
    const translatedLanguages = await this.getTranslatedLanguages();
    const allLanguages = this.getAllSupportedLanguages();
    
    return allLanguages.filter(lang => !translatedLanguages.includes(lang.code));
  }

  async getTranslatedLanguageDetails(): Promise<{ code: string; name: string }[]> {
    const translatedLanguages = await this.getTranslatedLanguages();
    const allLanguages = this.getAllSupportedLanguages();
    
    return allLanguages.filter(lang => translatedLanguages.includes(lang.code));
  }
}

export const languageService = new LanguageService();
