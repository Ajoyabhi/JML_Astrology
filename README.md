# 🌟 AstroMystic - Astrology Consultation Platform

A modern, full-stack astrology consultation platform that brings cosmic wisdom to the digital age. AstroMystic offers users horoscope readings, astrology calculators, professional astrologer consultations, and educational content through a beautiful, responsive web interface.

![AstroMystic Banner](https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&h=400&fit=crop)

## ✨ Features

### 🔮 Core Functionality
- **Daily Horoscopes** - Personalized horoscope readings for all zodiac signs
- **Astrologer Consultations** - Book sessions with certified astrologers via chat, voice, or video
- **Astrology Calculators** - Interactive tools for love compatibility, numerology, and birth charts
- **Educational Blog** - Rich content library with astrology articles and guides
- **Multi-language Support** - Available in English, Hindi, and Bengali
- **Dark Mode** - Cosmic-themed UI with elegant dark interface

### 🎨 User Experience
- **Smooth Animations** - Beautiful slide-in animations and micro-interactions using Framer Motion
- **Responsive Design** - Seamlessly works across desktop, tablet, and mobile devices
- **Loading States** - Professional skeleton loaders and progress indicators
- **Page Transitions** - Smooth navigation between different sections
- **Toast Notifications** - User-friendly feedback for all actions

### 🔐 Authentication & Security
- **Replit Auth Integration** - Secure OAuth2/OIDC authentication
- **Session Management** - Persistent user sessions with PostgreSQL storage
- **Protected Routes** - Role-based access control for premium features

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with functional components and hooks
- **TypeScript** - Full type safety across the application
- **Vite** - Lightning-fast development and optimized production builds
- **TailwindCSS** - Utility-first CSS framework with custom cosmic theme
- **Shadcn/UI** - Beautiful, accessible component library built on Radix UI
- **Framer Motion** - Advanced animations and micro-interactions
- **TanStack Query** - Powerful data fetching and state management
- **Wouter** - Lightweight client-side routing
- **React Hook Form** - Performance-focused forms with Zod validation

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, minimalist web framework
- **TypeScript** - Type-safe server-side development
- **Drizzle ORM** - Modern, TypeScript-first database ORM
- **PostgreSQL** - Robust relational database with Neon hosting
- **Passport.js** - Authentication middleware with OpenID Connect

### Development Tools
- **ESBuild** - Fast JavaScript bundler for production
- **Drizzle Kit** - Database migrations and schema management
- **PostCSS** - CSS processing with Autoprefixer
- **Hot Module Replacement** - Instant development feedback

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed on your system
- PostgreSQL database (or use provided Neon database)
- Replit account for authentication setup

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/astromystic.git
   cd astromystic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   The application uses Replit's built-in environment variables:
   - `DATABASE_URL` - PostgreSQL connection string (auto-configured)
   - `SESSION_SECRET` - Session encryption key (auto-configured)
   - `REPL_ID` - Replit application ID (auto-configured)
   - `REPLIT_DOMAINS` - Allowed domains for OAuth (auto-configured)

4. **Database Setup**
   ```bash
   npm run db:push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Access the Application**
   Open your browser to `http://localhost:5000` (or your Replit URL)

## 📁 Project Structure

```
astromystic/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AstrologersSection.tsx
│   │   │   ├── BlogSection.tsx
│   │   │   ├── CalculatorsSection.tsx
│   │   │   └── BookingModal.tsx
│   │   ├── pages/           # Page components
│   │   │   ├── home.tsx
│   │   │   ├── landing.tsx
│   │   │   ├── astrologers.tsx
│   │   │   ├── blog.tsx
│   │   │   ├── calculators.tsx
│   │   │   ├── horoscope.tsx
│   │   │   └── not-found.tsx
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── use-toast.ts
│   │   │   └── use-mobile.tsx
│   │   ├── contexts/        # React contexts
│   │   │   └── LanguageContext.tsx
│   │   ├── lib/            # Utility functions
│   │   │   ├── queryClient.ts
│   │   │   ├── authUtils.ts
│   │   │   └── utils.ts
│   │   ├── App.tsx         # Main app component
│   │   ├── main.tsx        # App entry point
│   │   └── index.css       # Global styles
│   └── index.html          # HTML template
├── server/                   # Backend Express application
│   ├── db.ts               # Database connection
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Data access layer
│   ├── replitAuth.ts       # Authentication setup
│   └── vite.ts             # Vite integration
├── shared/                  # Shared types and schemas
│   └── schema.ts           # Database schema & TypeScript types
├── components.json         # Shadcn/UI configuration
├── drizzle.config.ts       # Database configuration
├── tailwind.config.ts      # TailwindCSS configuration
├── vite.config.ts          # Vite build configuration
├── package.json            # Project dependencies
└── README.md              # This file
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:

### Core Tables
- **users** - User profiles and authentication data
- **sessions** - User session storage for authentication
- **astrologers** - Astrologer profiles, specializations, and pricing
- **consultations** - Booking records and session details
- **reviews** - User reviews and ratings for astrologers
- **blog_posts** - Educational content and articles
- **horoscopes** - Daily, weekly, and monthly horoscope content

### Schema Management
```bash
# Push schema changes to database
npm run db:push

# Force push (use with caution)
npm run db:push --force
```

## 🎯 API Endpoints

### Authentication
- `GET /api/auth/user` - Get current user profile
- `GET /api/login` - Initiate OAuth login flow
- `GET /api/logout` - User logout and session cleanup
- `GET /api/callback` - OAuth callback handler

### Core Features
- `GET /api/astrologers` - List all available astrologers
- `GET /api/astrologers/:id` - Get specific astrologer details
- `POST /api/consultations` - Book a new consultation
- `GET /api/consultations` - Get user's consultation history
- `GET /api/blog` - Fetch blog articles
- `GET /api/horoscopes/:sign` - Get horoscope for zodiac sign

### Protected Routes
All API endpoints require authentication except for:
- Public astrologer listings
- Blog content
- General horoscope readings

## 🎨 Theming & Customization

### Custom CSS Variables
The application uses a cosmic theme with customizable CSS variables:

```css
:root {
  --primary: 258 100% 70%;        /* Cosmic purple */
  --accent: 280 100% 85%;         /* Mystic pink */
  --gold-400: 45 100% 70%;        /* Golden highlights */
  --cosmic-900: 240 23% 9%;       /* Deep space background */
}
```

### TailwindCSS Extensions
- Custom color palette with cosmic theme
- Extended animations for smooth interactions
- Responsive breakpoints for all device sizes
- Glass morphism effects for modern UI

## 🔧 Development

### Available Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run check      # TypeScript type checking
npm run db:push    # Update database schema
```

### Code Quality
- **TypeScript** - Strict mode enabled for maximum type safety
- **ESLint** - Code linting with React and TypeScript rules
- **Prettier** - Consistent code formatting
- **Hot Reload** - Instant feedback during development

### Development Workflow
1. Make changes to React components in `client/src/`
2. Add API routes in `server/routes.ts`
3. Update database schema in `shared/schema.ts`
4. Test changes with hot reload
5. Push schema changes with `npm run db:push`

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
Ensure these variables are set in production:
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Secure session encryption key
- `REPL_ID` - Application identifier
- `REPLIT_DOMAINS` - Allowed OAuth domains
- `NODE_ENV=production` - Production mode flag

### Replit Deployment
The application is optimized for Replit deployment with:
- Automatic environment variable configuration
- Built-in PostgreSQL database
- OAuth authentication setup
- Zero-configuration deployment

## 🌍 Internationalization

AstroMystic supports multiple languages:
- **English** - Default language
- **Hindi** - Hindi language support
- **Bengali** - Bengali language support

### Adding New Languages
1. Update `client/src/contexts/LanguageContext.tsx`
2. Add translation keys for new language
3. Update language selector in navigation

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow the existing code style
   - Add TypeScript types for all new code
   - Write descriptive commit messages
4. **Test your changes**
   ```bash
   npm run check    # Type checking
   npm run dev      # Test in development
   ```
5. **Submit a pull request**

### Code Style Guidelines
- Use TypeScript for all new code
- Follow React best practices with functional components
- Use Tailwind classes for styling
- Add proper error handling and loading states
- Include data-testid attributes for testing

### Feature Requests
- Use GitHub Issues to request new features
- Provide detailed descriptions and use cases
- Include mockups or examples when helpful

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Replit** - Platform and authentication services
- **Neon** - PostgreSQL database hosting
- **Shadcn/UI** - Beautiful component library
- **Radix UI** - Accessible UI primitives
- **Framer Motion** - Smooth animations
- **TailwindCSS** - Utility-first styling

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation and examples

---

Made with ⭐ and cosmic energy by the AstroMystic team