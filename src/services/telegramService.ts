
import { CONFIG, getBotToken } from "@/config/appConfig";

class TelegramService {
  private get API_URL(): string {
    return `https://api.telegram.org/bot${getBotToken()}`;
  }

  async sendTranslations(translations: { [key: string]: string }, languageCode: string): Promise<void> {
    try {
      const yamlContent = Object.entries(translations)
        .map(([key, value]) => `${key}: "${value.replace(/"/g, '\\"')}"`)
        .join('\n');
      
      const blob = new Blob([yamlContent], { type: 'text/plain' });
      const formData = new FormData();
      formData.append('chat_id', CONFIG.TELEGRAM.CHAT_ID);
      formData.append('document', blob, `${languageCode}.yml`);
      formData.append('caption', `🌍 Translation file for ${languageCode.toUpperCase()}\n📊 ${Object.keys(translations).length} translations`);

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
