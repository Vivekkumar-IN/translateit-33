
import isoData from '@/data/iso/iso-639.json';
import macroData from '@/data/iso/iso-639_macro.json';

interface ISOLanguage {
  name: string;
  pt1?: string;
  pt2b?: string;
  pt2t?: string;
  pt3?: string;
  pt5?: string;
}

interface MacroLanguageData {
  macro: Record<string, string[]>;
  individual: Record<string, string>;
}

class EnhancedLanguageService {
  private isoLanguages: Record<string, ISOLanguage> = {};
  private codeMap: Record<string, string> = {};
  private macroLanguages: MacroLanguageData = { macro: {}, individual: {} };
  private fallbackLanguages: Record<string, string> = {
    'hi': 'Hindi', 'es': 'Spanish', 'fr': 'French', 'de': 'German',
    'it': 'Italian', 'pt': 'Portuguese', 'ru': 'Russian', 'ja': 'Japanese',
    'ko': 'Korean', 'zh': 'Chinese', 'ar': 'Arabic', 'tr': 'Turkish',
    'nl': 'Dutch', 'sv': 'Swedish', 'da': 'Danish', 'no': 'Norwegian',
    'fi': 'Finnish', 'pl': 'Polish', 'cs': 'Czech', 'sk': 'Slovak',
    'hu': 'Hungarian', 'bg': 'Bulgarian', 'ro': 'Romanian', 'hr': 'Croatian',
    'sl': 'Slovenian', 'et': 'Estonian', 'lv': 'Latvian', 'lt': 'Lithuanian',
    'mt': 'Maltese', 'cy': 'Welsh', 'ga': 'Irish', 'is': 'Icelandic',
    'mk': 'Macedonian', 'sq': 'Albanian', 'sr': 'Serbian', 'bs': 'Bosnian',
    'me': 'Montenegrin', 'az': 'Azerbaijani', 'ka': 'Georgian', 'hy': 'Armenian',
    'be': 'Belarusian', 'uk': 'Ukrainian', 'kk': 'Kazakh', 'ky': 'Kyrgyz',
    'uz': 'Uzbek', 'tg': 'Tajik', 'mn': 'Mongolian', 'my': 'Myanmar',
    'th': 'Thai', 'vi': 'Vietnamese', 'id': 'Indonesian', 'ms': 'Malay',
    'bn': 'Bengali', 'ur': 'Urdu', 'fa': 'Persian', 'he': 'Hebrew',
    'sw': 'Swahili', 'am': 'Amharic', 'yo': 'Yoruba', 'ig': 'Igbo',
    'ha': 'Hausa', 'zu': 'Zulu', 'af': 'Afrikaans'
  };

  constructor() {
    this.initializeLanguageData();
  }

  private initializeLanguageData() {
    try {
      // Process ISO data if available
      if (isoData && Object.keys(isoData).length > 0) {
        this.isoLanguages = isoData as Record<string, ISOLanguage>;
        
        // Build code mapping
        Object.entries(this.isoLanguages).forEach(([key, lang]) => {
          if (lang.pt1) this.codeMap[lang.pt1.toLowerCase()] = key;
          if (lang.pt2b) this.codeMap[lang.pt2b.toLowerCase()] = key;
          if (lang.pt2t) this.codeMap[lang.pt2t.toLowerCase()] = key;
          if (lang.pt3) this.codeMap[lang.pt3.toLowerCase()] = key;
          // Also map the key itself
          this.codeMap[key.toLowerCase()] = key;
        });
      }

      // Process macro language data
      if (macroData) {
        this.macroLanguages = macroData as MacroLanguageData;
      }
    } catch (error) {
      console.warn('Failed to load ISO language data, using fallback');
    }
  }

  detectUserLanguage(): string {
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    const langCode = browserLang.toLowerCase().slice(0, 2);
    
    return this.isValidLanguageCode(langCode) ? langCode : '';
  }

  getLanguageName(code: string): string {
    const lowerCode = code.toLowerCase();
    
    // Try ISO data first
    if (Object.keys(this.isoLanguages).length > 0) {
      // Direct lookup
      if (this.isoLanguages[lowerCode]) {
        return this.isoLanguages[lowerCode].name;
      }
      
      // Lookup by code mapping
      const isoKey = this.codeMap[lowerCode];
      if (isoKey && this.isoLanguages[isoKey]) {
        return this.isoLanguages[isoKey].name;
      }
    }
    
    // Fallback to static data
    return this.fallbackLanguages[lowerCode] || code.toUpperCase();
  }

  isValidLanguageCode(code: string): boolean {
    const lowerCode = code.toLowerCase();
    
    // Check ISO data first
    if (Object.keys(this.isoLanguages).length > 0) {
      // Check if it's a direct match or in code mapping
      if (this.isoLanguages[lowerCode] || this.codeMap[lowerCode]) {
        return true;
      }
      
      // Check macro languages
      if (this.macroLanguages.individual && this.macroLanguages.individual[lowerCode]) {
        return true;
      }
      
      if (this.macroLanguages.macro && this.macroLanguages.macro[lowerCode]) {
        return true;
      }
    }
    
    // Fallback to static validation
    return Object.keys(this.fallbackLanguages).includes(lowerCode);
  }

  validateLanguageCode(code: string): { 
    isValid: boolean; 
    isDeprecated: boolean; 
    suggestion?: string; 
    name?: string 
  } {
    const lowerCode = code.toLowerCase();
    const isValid = this.isValidLanguageCode(lowerCode);
    
    return {
      isValid,
      isDeprecated: false,
      name: isValid ? this.getLanguageName(lowerCode) : undefined
    };
  }

  getAllSupportedLanguages(): { code: string; name: string }[] {
    if (Object.keys(this.isoLanguages).length > 0) {
      return Object.entries(this.isoLanguages)
        .filter(([_, lang]) => lang.pt1) // Only include languages with ISO 639-1 codes
        .map(([_, lang]) => ({ 
          code: lang.pt1!, 
          name: lang.name 
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return Object.entries(this.fallbackLanguages)
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
}

export const enhancedLanguageService = new EnhancedLanguageService();
