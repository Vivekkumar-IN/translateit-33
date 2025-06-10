
class LanguageDetectionService {
  detectUserLanguage(): string {
    // Get language from browser
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    
    // Extract language code (first 2 characters)
    const langCode = browserLang.toLowerCase().slice(0, 2);
    
    // Common language mappings
    const supportedLanguages = [
      'hi', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'ar', 'tr',
      'nl', 'sv', 'da', 'no', 'fi', 'pl', 'cs', 'sk', 'hu', 'bg', 'ro', 'hr',
      'sl', 'et', 'lv', 'lt', 'mt', 'cy', 'ga', 'is', 'mk', 'sq', 'sr', 'bs',
      'me', 'az', 'ka', 'hy', 'be', 'uk', 'kk', 'ky', 'uz', 'tg', 'mn', 'my'
    ];
    
    // Return detected language if supported, otherwise return empty
    return supportedLanguages.includes(langCode) ? langCode : '';
  }

  getLanguageName(code: string): string {
    const languageNames: { [key: string]: string } = {
      'hi': 'Hindi', 'es': 'Spanish', 'fr': 'French', 'de': 'German',
      'it': 'Italian', 'pt': 'Portuguese', 'ru': 'Russian', 'ja': 'Japanese',
      'ko': 'Korean', 'zh': 'Chinese', 'ar': 'Arabic', 'tr': 'Turkish',
      'nl': 'Dutch', 'sv': 'Swedish', 'da': 'Danish', 'no': 'Norwegian',
      'fi': 'Finnish', 'pl': 'Polish', 'cs': 'Czech', 'sk': 'Slovak'
    };
    
    return languageNames[code] || code.toUpperCase();
  }
}

export const languageDetectionService = new LanguageDetectionService();
