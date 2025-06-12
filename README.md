
# YukkiMusic Translation Tool

A web-based translation tool for YukkiMusic language files built with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or later
- npm or yarn package manager

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/Vivekkumar-IN/translateit
cd translateit

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

## 🔧 Environment Variables

The application supports the following environment variables for secure configuration:

### Required for Telegram Integration
- `VITE_TELEGRAM_BOT_TOKEN` - Your complete Telegram bot token
- `VITE_TELEGRAM_CHAT_ID` - Telegram chat ID where translations will be sent

### Optional Configuration
- `VITE_BASE_PATH` - Base path for deployment (default: "/translateit/" for GitHub Pages, use "/" for root deployment)

### Setting Environment Variables

#### For Local Development
Create a `.env.local` file in the project root:
```env
VITE_TELEGRAM_BOT_TOKEN=your_complete_bot_token
VITE_TELEGRAM_CHAT_ID=your_chat_id
VITE_BASE_PATH=/
```

#### For GitHub Actions Deployment
1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Add the following repository secrets:
   - `VITE_TELEGRAM_BOT_TOKEN`
   - `VITE_TELEGRAM_CHAT_ID`
   - `VITE_BASE_PATH` (set to "/" for deployment)

#### For Other Hosting Platforms
- **Vercel**: Add environment variables in the Vercel dashboard
- **Netlify**: Add environment variables in site settings
- **Other platforms**: Consult your platform's documentation for environment variable configuration

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── YamlTranslator.tsx   # Main translation interface
│   ├── TranslationCard.tsx  # Individual translation card
│   ├── LanguageSelection.tsx # Language picker screen
│   └── ...             # Other components
├── hooks/              # Custom React hooks
│   ├── useTranslationState.ts    # Translation state management
│   ├── useBackButtonHandler.ts   # Browser back button handling
│   └── ...             # Other hooks
├── services/           # API and external service integrations
│   ├── yamlService.ts  # YAML file loading/processing
│   ├── telegramService.ts # Telegram bot integration
│   ├── languageService.ts # Language detection and management
│   └── storageService.ts  # Local storage management
├── config/             # Application configuration
│   └── appConfig.ts    # Main configuration file
├── types/              # TypeScript type definitions
├── data/               # Language data
│   ├── iso639-1.json   # ISO language codes
│   └── langs/          # Translated language JSON files (auto-updated)
└── pages/              # Route components
```

## 🌐 Deployment Options

### Option 1: Lovable Platform (Recommended)
1. Open your project in [Lovable](https://lovable.dev)
2. Click "Share" → "Publish"
3. Your app will be deployed automatically

### Option 2: Vercel
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variables in Vercel dashboard:
   - `VITE_BASE_PATH=/`
   - Other required variables
4. Deploy automatically on every push

### Option 3: Netlify
1. Connect your GitHub repository to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variables in site settings:
   - `VITE_BASE_PATH=/`
   - Other required variables
4. Enable automatic deployments

### Option 4: GitHub Pages
1. Add environment variables as GitHub repository secrets:
   - `VITE_BASE_PATH=/` (important for GitHub Pages deployment)
   - Other required variables
2. Build the project using GitHub Actions (automatic with provided workflow)
3. Pages will be deployed automatically

### Option 5: Self-Hosted
1. Set environment variables in your hosting environment:
   - `VITE_BASE_PATH=/`
   - Other required variables
2. Build the project: `npm run build`
3. Upload the `dist/` folder contents to your web server
4. Configure your web server to serve the `index.html` for all routes

## ⚙️ Configuration

The application can be configured by editing the `src/config/appConfig.ts` file:

```typescript
export const CONFIG = {
  APP_NAME: "YukkiMusic",
  
  DEPLOYMENT: {
    BASE_PATH: import.meta.env.VITE_BASE_PATH || "/translateit/",
  },
  
  TELEGRAM: {
    BOT_TOKEN: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "fallback_token",
    CHAT_ID: import.meta.env.VITE_TELEGRAM_CHAT_ID || "fallback_chat_id",
  },

  YAML_FORMATTING: {
    MAX_NEWLINES_INLINE: 1,    # Use block style for strings with >1 newlines
    MAX_LENGTH_INLINE: 100,    # Use block style for strings >100 characters
  },

  SOCIAL_LINKS: {
    TELEGRAM: "https://t.me/YourChannel",
    GITHUB: "https://github.com/YourUsername/YourRepo"
  }
};
```

## 📱 Features

- **Dynamic Language Detection**: Automatically detects available translations from JSON files
- **Translation Interface**: Easy-to-use translation cards with original text and translation input
- **Smart YAML Formatting**: Automatically uses block literal style (|) for multiline content and long strings
- **Advanced Search & Filter**: Search with key-based filtering and translation status
- **Progress Tracking**: Real-time progress indicators and statistics
- **Auto-save**: Automatic saving of translation progress with timestamps
- **Browser Navigation**: Smart back button handling with double-tap exit confirmation
- **Export Options**: Download YAML files or send to Telegram
- **Collaboration Features**: Real-time collaboration support
- **Environment Variable Support**: Secure configuration for production deployments

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React hooks and context
- **YAML Processing**: js-yaml library with intelligent formatting
- **Icons**: Lucide React

## 🔄 Automated Language Updates

The project includes a GitHub Action that automatically updates language data:
- **ISO 639-1 codes**: Updated from official sources
- **Translation files**: Synced from YukkiMusic repository
- **Runs**: Daily at midnight and on every push to main branch

## 🔒 Security Notes

- Never commit actual bot tokens or API keys to the repository
- Use environment variables for all sensitive configuration
- The fallback tokens in the config file should be placeholder values only
- Always use repository secrets for GitHub Actions deployment

## 📄 License

This project is open source and available under the MIT License.
