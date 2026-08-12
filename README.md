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

#### Prerequisites

- A [Vercel](https://vercel.com) account
- A PostgreSQL database (Vercel Postgres, Neon, Supabase, or Railway)
- This repository pushed to GitHub

#### Step 1: Import the Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Select your GitHub repository
3. Vercel will auto-detect it as a Next.js project
4. Click "Deploy" (it will fail the first time without environment variables, that is expected)

#### Step 2: Set Up the Database

**Option A: Vercel Postgres (simplest)**
1. In the Vercel dashboard, go to your project
2. Navigate to "Storage" tab
3. Click "Create Database" and select "Postgres"
4. Vercel will automatically set `DATABASE_URL` and `DIRECT_URL`

**Option B: External PostgreSQL (Neon, Supabase, Railway)**
1. Create a PostgreSQL database on your provider
2. Copy the connection string
3. Set `DATABASE_URL` with `?pgbouncer=true` appended (for connection pooling)
4. Set `DIRECT_URL` with the direct connection string (no pooling)

#### Step 3: Configure Environment Variables

In the Vercel dashboard, go to **Settings > Environment Variables** and add:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string (with pooling) |
| `DIRECT_URL` | Yes | PostgreSQL direct connection (for migrations) |
| `NEXTAUTH_SECRET` | Yes | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Yes | Your production URL (e.g., `https://your-app.vercel.app`) |
| `NEXT_PUBLIC_APP_URL` | Yes | Same as NEXTAUTH_URL |
| `NEXT_PUBLIC_APP_NAME` | Yes | App display name (e.g., "GreenLeaf CBD") |
| `CSRF_SECRET` | Yes | `openssl rand -base64 32` |
| `ALLOWED_ORIGINS` | Yes | Your production URL |

See `.env.production.example` for all optional variables (email, payments, AI, analytics).

#### Step 4: Deploy

1. After setting environment variables, trigger a redeploy:
   - Go to "Deployments" tab
   - Click the three dots on the latest deployment
   - Select "Redeploy"
2. The build command (`npx prisma generate && npm run build`) runs automatically

#### Step 5: Run Database Migrations

After the first successful deploy, push the schema to your database:

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Run prisma db push using your production env
vercel env pull .env.production.local
npx prisma db push --schema=prisma/schema.prisma
npx prisma db seed
```

Alternatively, you can use Vercel's "Functions" tab or connect directly to the database with your favorite SQL client.

#### Step 6: Verify

- Visit `https://your-app.vercel.app/api/health` to confirm the deployment is running
- Visit `https://your-app.vercel.app/login` to access the application

#### Deployment Notes

- The project deploys to the `iad1` (US East) region by default. Change `regions` in `vercel.json` to deploy closer to your users.
- Prisma Client is generated at build time via the `buildCommand` in `vercel.json`.
- Three.js components use dynamic imports with `ssr: false` to prevent server-side rendering issues.
- ESLint and TypeScript errors are ignored during builds to prevent non-blocking warnings from failing deploys.

#### Custom Domain

1. In Vercel dashboard, go to **Settings > Domains**
2. Add your custom domain
3. Update `NEXTAUTH_URL`, `NEXT_PUBLIC_APP_URL`, and `ALLOWED_ORIGINS` to match

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
