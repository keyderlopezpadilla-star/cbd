# 🌿 CBD SaaS Platform

Premium multi-store management platform designed specifically for CBD franchises.

## 🚀 Overview

A modern, scalable SaaS platform for managing CBD retail operations across multiple stores. Built with cutting-edge technology stack featuring Next.js 14+, TypeScript, PostgreSQL, Prisma, and AI-powered features.

## ✨ Key Features

- **Multi-Store Management** - Centralized dashboard for managing 5+ retail locations
- **Smart Inventory** - AI-powered stock tracking with predictive analytics
- **Point of Sale** - Fast, compliance-ready POS system
- **Customer CRM** - Complete relationship management with loyalty programs
- **Advanced Analytics** - Real-time insights and performance metrics
- **AI Assistant** - Intelligent business assistant for data queries
- **GDPR Compliance** - Full data privacy and consent management
- **Role-Based Access Control** - Granular permissions for different user roles
- **Stock Transfers** - Seamless inventory transfers between stores
- **Marketing & Campaigns** - Integrated promotional tools

## 🚀 Quick Start

### Development Setup

1. **Clone and install**
```bash
cd cbd-saas
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your database URL and secrets
```

3. **Setup database**
```bash
npm run db:push
npm run db:seed
```

4. **Run development server**
```bash
npm run dev
```

5. **Access the application**
- Landing: http://localhost:3000/landing
- Login: http://localhost:3000/login
- Dashboard: http://localhost:3000/dashboard (requires login)

### Demo Credentials

```
Email: admin@example.com
Password: password123
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Premium component library
- **Framer Motion** - Smooth animations
- **GSAP** - Advanced animation timelines
- **React Three Fiber** - 3D graphics and WebGL
- **Zustand** - State management
- **React Query** - Server state management

### Backend
- **Next.js API Routes** - Serverless functions
- **Prisma ORM** - Type-safe database queries
- **PostgreSQL** - Relational database
- **NextAuth.js v5** - Authentication
- **Zod** - Runtime validation

### Infrastructure
- **Vercel** - Hosting and deployment
- **PostgreSQL** - Managed database
- **Redis** - Caching (optional)

## 📦 Installation

### Prerequisites

- Node.js 18+ or 20+
- npm or pnpm
- PostgreSQL database

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd cbd-saas
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` and configure:
- `DATABASE_URL` - Your PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your application URL
- Other API keys as needed

4. **Setup database**
```bash
npm run db:push
npm run db:seed
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
cbd-saas/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── landing/           # Public landing page
│   │   ├── login/             # Authentication
│   │   └── dashboard/         # Protected dashboard
│   ├── components/            # Shared components
│   │   ├── ui/               # Base UI components (shadcn)
│   │   ├── layout/           # Layout components
│   │   ├── forms/            # Form components
│   │   ├── charts/           # Chart components
│   │   └── 3d/               # Three.js components
│   ├── features/             # Feature modules
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── stores/
│   │   ├── products/
│   │   ├── inventory/
│   │   ├── sales/
│   │   ├── orders/
│   │   ├── customers/
│   │   └── analytics/
│   ├── lib/                  # Utilities and helpers
│   │   ├── constants/
│   │   ├── validations/
│   │   └── api/
│   ├── server/               # Server-side code
│   │   ├── actions/         # Server actions
│   │   ├── api/             # API utilities
│   │   ├── db/              # Database utilities
│   │   └── auth/            # Auth configuration
│   ├── hooks/               # Custom React hooks
│   ├── stores/              # Zustand stores
│   ├── types/               # TypeScript types
│   └── styles/              # Global styles
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed data
├── public/                   # Static assets
├── tests/                    # Test files
├── docs/                     # Documentation
└── config/                   # Configuration files
```

## 🎨 Design System

### Colors

**Primary Palette**
- Black: `#050505`, `#0A0A0A`, `#111111`
- Green: `#00FF66`, `#00D95F`, `#00B94A`
- Gray: `#777777`, `#A0A0A0`, `#F5F5F5`

### Component Library

Built on **shadcn/ui** with custom CBD-themed styling. All components support:
- Dark mode (default)
- Glassmorphism effects
- Smooth animations
- Accessibility (WCAG 2.2 AA)

## 👥 User Roles

- **SUPER_ADMIN** - Platform-wide access
- **ADMIN** - Full franchise access
- **MANAGER** - Single store management
- **EMPLOYEE** - Limited store operations
- **ACCOUNTING** - Financial data access
- **MARKETING** - Marketing and campaigns

## 🔐 Security

- HTTPS enforced
- Bcrypt password hashing
- CSRF protection
- XSS prevention
- SQL injection protection via Prisma
- Rate limiting
- Audit logging
- GDPR compliance

## 📊 Database Schema

30+ models including:
- User & Authentication
- Organizations & Stores
- Products & Inventory
- Sales & Orders
- Customers & Loyalty
- Transfers & Movements
- Marketing & Campaigns
- Audit Logs
- CMS Content

See `prisma/schema.prisma` for full schema.

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Type checking
npm run type-check
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run migrations
- `npm run db:seed` - Seed database
- `npm run db:studio` - Open Prisma Studio

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker (Optional)

```bash
docker-compose up -d
```

## 📚 Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [Database Schema](./docs/DATABASE.md)
- [API Reference](./docs/API.md)
- [Security](./docs/SECURITY.md)
- [Deployment](./docs/DEPLOYMENT.md)

## 🤝 Contributing

This is a proprietary platform. For internal development guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## 📄 License

Proprietary - All rights reserved

## 🆘 Support

For support, contact: support@example.com

---

Built with ❤️ using Next.js, TypeScript, and cutting-edge web technologies.
