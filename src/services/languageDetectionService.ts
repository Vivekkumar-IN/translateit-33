
class LanguageDetectionService {
  private readonly languageNames: { [key: string]: string } = {
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

  detectUserLanguage(): string {
    // Get language from browser
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    
    // Extract language code (first 2 characters)
    const langCode = browserLang.toLowerCase().slice(0, 2);
    
    // Return detected language if supported, otherwise return empty
    return this.isValidLanguageCode(langCode) ? langCode : '';
  }

  getLanguageName(code: string): string {
    return this.languageNames[code.toLowerCase()] || code.toUpperCase();
  }

  isValidLanguageCode(code: string): boolean {
    return Object.keys(this.languageNames).includes(code.toLowerCase());
  }

  getAllSupportedLanguages(): { code: string; name: string }[] {
    return Object.entries(this.languageNames).map(([code, name]) => ({ code, name }));
  }
}

export const languageDetectionService = new LanguageDetectionService();
