# ValCard - Valentine's Card Creator 💝

A modern web application for creating and sharing personalized Valentine's Day cards. Built with React, TypeScript, and Firebase.

## ✨ Features

- 🎨 Multiple beautiful card templates
- ✍️ AI-powered message generation
- 🔒 Secure user authentication
- 🔗 Shareable card links
- 📱 Responsive design
- 🖨️ PDF export functionality
- 🎯 Privacy controls for shared cards

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.0.0 or higher)
- npm or yarn
- Firebase account
- OpenAI API key

#### Node.js Setup

We recommend using [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) to manage your Node.js versions:

```bash
# Install nvm (if you haven't already)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js 20
nvm install 20

# Use Node.js 20
nvm use 20

# Verify installation
node --version # Should output v20.x.x
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/val-card.git
cd val-card
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Update the `.env` file with your credentials:

- Add your OpenAI API key
- Add your Firebase configuration

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 🛠️ Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Shadcn/ui
- **Animation**: Framer Motion
- **Form Handling**: React Hook Form + Zod
- **Backend**: Firebase
  - Authentication
  - Firestore Database
- **AI Integration**: OpenAI API
- **Build Tool**: Vite

## 📝 Project Structure

```
src/
├── components/        # React components
├── contexts/         # React contexts
├── hooks/           # Custom hooks
├── lib/             # Utility functions and configurations
│   ├── firebase.ts
│   ├── openai.ts
│   └── validations/
├── styles/          # Global styles
└── types/           # TypeScript type definitions
```

## 🔐 Security

- Environment variables are used for sensitive data
- Firebase Security Rules protect user data
- Input validation using Zod
- Protected routes for authenticated users

## 🚥 Environment Variables

Required environment variables:

```env
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide Icons](https://lucide.dev/) for the icon set
- [Unsplash](https://unsplash.com/) for background images
