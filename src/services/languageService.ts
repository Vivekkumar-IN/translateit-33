
class LanguageService {
  private languageNames: Record<string, string> = {};
  
  constructor() {
    try {
      // Import the simplified ISO 639-1 data
      this.languageNames = require('@/data/iso/iso-639-1.json');
    } catch (error) {
      console.warn('Failed to load ISO language data');
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
}

export const languageService = new LanguageService();
