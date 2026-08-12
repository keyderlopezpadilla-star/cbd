# Environment Variables Reference

## Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://user:pass@host:5432/dbname |
| NEXTAUTH_SECRET | Secret for signing tokens (32+ chars) | openssl rand -base64 32 |
| NEXTAUTH_URL | Full application URL | https://your-domain.com |
| CSRF_SECRET | CSRF token signing secret | openssl rand -base64 32 |

## Optional Variables

### Redis

| Variable | Description | Default |
|----------|-------------|---------|
| REDIS_URL | Redis connection string | (none - in-memory fallback) |

### Application

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| NEXT_PUBLIC_APP_URL | Public app URL | http://localhost:3000 |
| NEXT_PUBLIC_APP_NAME | Display name | CBD SaaS Platform |
| ALLOWED_ORIGINS | CORS allowed origins (comma-separated) | http://localhost:3000 |

### Email (SMTP)

| Variable | Description | Default |
|----------|-------------|---------|
| SMTP_HOST | SMTP server host | (none) |
| SMTP_PORT | SMTP server port | 587 |
| SMTP_USER | SMTP username | (none) |
| SMTP_PASSWORD | SMTP password | (none) |
| SMTP_FROM | Sender email address | noreply@greenleafcbd.es |

### File Storage

| Variable | Description | Default |
|----------|-------------|---------|
| STORAGE_PROVIDER | Storage backend (local/s3) | local |
| S3_BUCKET | S3 bucket name | (none) |
| S3_REGION | AWS region | (none) |
| S3_ACCESS_KEY | AWS access key | (none) |
| S3_SECRET_KEY | AWS secret key | (none) |

### AI Features

| Variable | Description | Default |
|----------|-------------|---------|
| OPENAI_API_KEY | OpenAI API key | (none - AI disabled) |
| OPENAI_MODEL | Model to use | gpt-4 |
| AI_MAX_TOKENS | Max tokens per request | 2000 |

### Analytics

| Variable | Description | Default |
|----------|-------------|---------|
| NEXT_PUBLIC_GA_ID | Google Analytics ID | (none) |
| NEXT_PUBLIC_POSTHOG_KEY | PostHog project key | (none) |

### Payments

| Variable | Description | Default |
|----------|-------------|---------|
| STRIPE_SECRET_KEY | Stripe secret key | (none) |
| STRIPE_WEBHOOK_SECRET | Stripe webhook signing secret | (none) |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | Stripe publishable key | (none) |

### Deployment

| Variable | Description | Default |
|----------|-------------|---------|
| VERCEL_ORG_ID | Vercel organization ID | (none) |
| VERCEL_PROJECT_ID | Vercel project ID | (none) |

## Security Notes

- Never commit `.env` or `.env.local` files to version control
- Use different secrets for each environment
- Rotate secrets regularly
- Use environment-specific database credentials
- Restrict ALLOWED_ORIGINS in production
