
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
│   └── storageService.ts  # Local storage management
├── types/              # TypeScript type definitions
├── config/             # Application configuration
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
3. Deploy automatically on every push

### Option 3: Netlify
1. Connect your GitHub repository to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Enable automatic deployments

### Option 4: GitHub Pages
1. Build the project: `npm run build`
2. Copy contents of `dist/` folder to your GitHub Pages repository
3. Enable GitHub Pages in repository settings

### Option 5: Self-Hosted
1. Build the project: `npm run build`
2. Upload the `dist/` folder contents to your web server
3. Configure your web server to serve the `index.html` for all routes

## 🔧 Configuration

The application can be configured by editing the `src/config/appConfig.ts` file:

```typescript
export const CONFIG = {
  APP_NAME: "Translate YukkiMusic",
  
  DEPLOYMENT: {
    BASE_PATH: "/",
  },
  
  TELEGRAM: {
    BOT_TOKEN_PARTS: ["part1", "part2"],
    CHAT_ID: "your_chat_id",
  },

  SOCIAL_LINKS: {
    TELEGRAM: "https://t.me/YourChannel",
    GITHUB: "https://github.com/YourUsername/YourRepo"
  }
};
```

### Custom Domain
- **Lovable**: Go to Project → Settings → Domains
- **Vercel/Netlify**: Configure custom domain in platform settings
- **Self-hosted**: Configure your DNS and web server accordingly

## 📱 Features

- **Translation Interface**: Easy-to-use translation cards with original text and translation input
- **Search & Filter**: Advanced search with key-based filtering and translation status
- **Progress Tracking**: Real-time progress indicators and statistics
- **Auto-save**: Automatic saving of translation progress
- **Browser Navigation**: Smart back button handling with double-tap exit confirmation
- **Export Options**: Download YAML files or send to Telegram

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
- **Routing**: React Router
- **Icons**: Lucide React

## 📄 License

This project is open source and available under the MIT License.
