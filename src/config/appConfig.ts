
/**
 * Application Configuration
 * This file contains all the configuration for the application
 */

export const CONFIG = {
  // Application name
  APP_NAME: "YukkiMusic",
  
  // Deployment configuration
  DEPLOYMENT: {
    // Base path for the application (used in vite.config.ts)
    BASE_PATH: "/translateit/",
  },
  
  // Telegram bot configuration
  TELEGRAM: {
    // Use environment variable if available, fallback to obfuscated token
    BOT_TOKEN: import.meta.env?.VITE_TELEGRAM_BOT_TOKEN || "AAENI4ZqesghJp_jL2hFSd13vooWM4cHEr4",
    // Chat ID to send translations
    CHAT_ID: import.meta.env?.VITE_TELEGRAM_CHAT_ID || "-1002146211959",
    // Base token for combining with bot token
    BOT_BASE: import.meta.env?.VITE_TELEGRAM_BOT_BASE || "7562982663",
  },

  // YAML formatting configuration
  YAML_FORMATTING: {
    // Use literal block style (|) for strings with newlines > this count
    MAX_NEWLINES_INLINE: 1,
    // Use literal block style (|) for strings longer than this character count
    MAX_LENGTH_INLINE: 100,
  },

  // Social links configuration
  SOCIAL_LINKS: {
    TELEGRAM: "https://t.me/TheTeamVivek",
    GITHUB: "https://github.com/TheTeamVivek/YukkiMusic"
  },

  // Translation warning configuration
  TRANSLATION_WARNING: {
    title: "⚠️ IMPORTANT:",
    description: "Do not edit content inside curly braces {...} - keep them as is. You can use Telegram-supported HTML formatting like <b>bold</b>, <i>italic</i>, <code>code</code>.",
    enabled: true,
    variant: "destructive" as const
  }
};

// Helper function to get the full bot token by combining base and token parts
export function getBotToken(): string {
  return `${CONFIG.TELEGRAM.BOT_BASE}:${CONFIG.TELEGRAM.BOT_TOKEN}`;
}
