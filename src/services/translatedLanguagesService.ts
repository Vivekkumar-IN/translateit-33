
class TranslatedLanguagesService {
  private translatedLanguages: string[] = [
    'ar', 'as', 'en', 'hi', 'ku', 'tr'
  ];

  getTranslatedLanguages(): string[] {
    return this.translatedLanguages;
  }

  isLanguageTranslated(code: string): boolean {
    return this.translatedLanguages.includes(code.toLowerCase());
  }

  getUntranslatedLanguages(allLanguages: { code: string; name: string }[]): { code: string; name: string }[] {
    return allLanguages.filter(lang => !this.isLanguageTranslated(lang.code));
  }

  getTranslatedLanguageDetails(allLanguages: { code: string; name: string }[]): { code: string; name: string }[] {
    return allLanguages.filter(lang => this.isLanguageTranslated(lang.code));
  }
}

export const translatedLanguagesService = new TranslatedLanguagesService();
