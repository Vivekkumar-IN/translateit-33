
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
    // Full bot token in format: BOT_ID:BOT_TOKEN
    BOT_TOKEN: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "7562982663:AAENI4ZqesghJp_jL2hFSd13vooWM4cHEr4",
    // Chat ID to send translations
    CHAT_ID: import.meta.env.VITE_TELEGRAM_CHAT_ID || "-1002146211959",
    // Telegram API base URL
    API_BASE: "https://api.telegram.org",
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
