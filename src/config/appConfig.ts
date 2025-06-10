
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
    BOT_TOKEN: "AAENI4ZqesghJp_jL2hFSd13vooWM4cHEr4",
    // Chat ID to send translations
    CHAT_ID: "-1002146211959",
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

// Helper function to get the full bot token
export function getBotToken(): string {
  return `7562982663:${CONFIG.TELEGRAM.BOT_TOKEN}`;
}
