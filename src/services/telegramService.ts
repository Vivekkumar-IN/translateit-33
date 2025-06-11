
import { CONFIG, getBotToken } from "@/config/appConfig";
import { yamlService } from "./yamlService";
import { languageDetectionService } from "./languageDetectionService";

class TelegramService {
  private get API_URL(): string {
    return `https://api.telegram.org/bot${getBotToken()}`;
  }

  async sendTranslations(
    translations: { [key: string]: string }, 
    languageCode: string, 
    username?: string
  ): Promise<void> {
    try {
      // Use the yamlService to generate proper YAML with multiline support
      const yamlContent = yamlService.generateYamlString(translations);
      
      const blob = new Blob([yamlContent], { type: 'text/plain' });
      const formData = new FormData();
      
      const languageName = languageDetectionService.getLanguageName(languageCode);
      
      let caption = `🌍 Translation file for ${languageName} (${languageCode.toUpperCase()})\n📊 ${Object.keys(translations).length} translations`;
      
      if (username) {
        caption += `\n👤 Translated by: @${username}`;
      }
      
      formData.append('chat_id', CONFIG.TELEGRAM.CHAT_ID);
      formData.append('document', blob, `${languageCode}.yml`);
      formData.append('caption', caption);

      const response = await fetch(`${this.API_URL}/sendDocument`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      if (!result.ok) {
        throw new Error(result.description || 'Failed to send to Telegram');
      }
    } catch (error) {
      console.error('Telegram send error:', error);
      throw new Error(`Failed to send to Telegram: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const telegramService = new TelegramService();
