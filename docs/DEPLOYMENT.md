# Deployment Guide

## Overview

The CBD SaaS Platform can be deployed to Vercel (recommended), Docker, or any Node.js hosting environment.

## Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Redis 7+ (optional, for caching)
- npm 9+

## Environment Variables

See `.env.example` for a complete list. Critical variables:

| Variable | Required | Description |
|----------|----------|-------------|
| DATABASE_URL | Yes | PostgreSQL connection string |
| NEXTAUTH_SECRET | Yes | Random 32+ character secret |
| NEXTAUTH_URL | Yes | Application base URL |
| REDIS_URL | No | Redis connection for caching |
| CSRF_SECRET | Yes | CSRF token signing secret |

## Vercel Deployment (Recommended)

### 1. Connect Repository

Install Vercel CLI and link the project:

```bash
npm i -g vercel
vercel link
```

### 2. Configure Environment Variables

Set all required environment variables in the Vercel dashboard under Project Settings > Environment Variables.

### 3. Database Setup

Use one of: Vercel Postgres (recommended), Supabase, Neon, or PlanetScale.

### 4. Deploy

```bash
vercel --prod
```

### 5. Run Migrations

```bash
npx prisma migrate deploy
npx tsx prisma/seed.ts
```

## Docker Deployment

### 1. Build Image

```bash
docker build -t cbd-saas .
```

### 2. Run with Docker Compose

```bash
docker compose up -d
docker compose exec app npx prisma migrate deploy
docker compose exec app npx tsx prisma/seed.ts
```

### 3. Production Considerations

- Set strong passwords for PostgreSQL
- Configure SSL for database connections
- Set proper NEXTAUTH_SECRET
- Configure a reverse proxy (nginx/traefik)

## DNS Configuration

1. Point your domain to the hosting provider
2. For Vercel: Add a CNAME record pointing to cname.vercel-dns.com
3. For Docker: Point A record to your server IP
4. Enable SSL (automatic on Vercel, use Lets Encrypt for Docker)

## Database Management

### Migrations

```bash
npx prisma migrate dev --name description
npx prisma migrate deploy
npx prisma migrate reset
```

## Monitoring

The application exposes `/api/health` for monitoring.

## Scaling

- Vercel: Automatic scaling with serverless functions
- Docker: Horizontal scaling with Docker Swarm or Kubernetes
- Use connection pooling (PgBouncer) for database
- Redis cluster for distributed caching

## Security Checklist

- Strong NEXTAUTH_SECRET (32+ random chars)
- SSL/TLS enabled
- Database credentials rotated
- Rate limiting configured
- CORS origins restricted
- Security headers enabled
- Regular dependency updates
- Automated backups configured
