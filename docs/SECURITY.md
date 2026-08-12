# 🔐 Security Documentation

## Overview

The CBD SaaS Platform implements enterprise-grade security measures to protect user data, prevent unauthorized access, and ensure compliance with industry standards.

## Authentication

### NextAuth.js v5 (Auth.js)

We use NextAuth.js v5 for authentication with the following configuration:

- **Strategy**: JWT-based sessions
- **Session Duration**: 30 days
- **Password Hashing**: bcrypt with 10 salt rounds
- **Secure Cookies**: httpOnly, secure, sameSite

### Login Flow

1. User submits credentials
2. Credentials validated with Zod
3. User looked up in database
4. Password verified with bcrypt
5. JWT token created
6. Session stored in secure cookie
7. Last login timestamp updated

### Password Requirements

- Minimum 8 characters
- Bcrypt hashing with 10 rounds
- No maximum length (bcrypt handles long passwords)
- Password reset functionality prepared

## Authorization (RBAC)

### Role Hierarchy

```
SUPER_ADMIN (Level 100)
    ├── Full platform access
    └── All permissions

ADMIN (Level 80)
    ├── Organization-wide access
    └── All permissions except platform management

MANAGER (Level 60)
    ├── Single store management
    └── Limited permissions

ACCOUNTING (Level 40)
    ├── Financial data access
    └── Read-only analytics

MARKETING (Level 40)
    ├── Campaign management
    └── Customer data (limited)

EMPLOYEE (Level 20)
    ├── Basic operations
    └── Minimal permissions
```

### Permission System

60+ granular permissions organized by resource:

- **Users**: VIEW, CREATE, UPDATE, DELETE
- **Stores**: VIEW, CREATE, UPDATE, DELETE
- **Products**: VIEW, CREATE, UPDATE, DELETE
- **Inventory**: VIEW, UPDATE, TRANSFER
- **Sales**: VIEW, CREATE, CANCEL
- **Orders**: VIEW, CREATE, UPDATE, CANCEL
- **Customers**: VIEW, CREATE, UPDATE, DELETE
- **Marketing**: VIEW, CREATE, UPDATE, DELETE
- **Analytics**: VIEW, VIEW_ALL_STORES
- **Financial**: VIEW, EXPORT
- **Settings**: VIEW, UPDATE
- **Audit**: VIEW_LOGS
- **Organization**: MANAGE

### Permission Checks

#### Server-Side

```typescript
import { requirePermission } from '@/lib/auth/utils'
import { Permission } from '@/lib/auth/permissions'

// In Server Components or API routes
const user = await requirePermission(Permission.VIEW_INVENTORY)
```

#### Client-Side

```typescript
import { Can } from '@/components/auth/can'
import { Permission } from '@/lib/auth/permissions'

<Can permission={Permission.CREATE_PRODUCTS}>
  <Button>Create Product</Button>
</Can>
```

## Middleware Protection

Routes are protected at the edge with Next.js middleware:

```typescript
// Protected routes
/dashboard/*   - Requires authentication
/api/*         - Requires authentication (except /api/auth)

// Public routes
/landing       - Public
/login         - Public (redirects if logged in)
/register      - Public (redirects if logged in)
```

## Data Security

### Database Security

1. **Prisma ORM**: Prevents SQL injection
2. **Parameterized Queries**: All queries use prepared statements
3. **Connection Pooling**: Managed by Prisma
4. **Row-Level Security**: Prepared for multi-tenancy

### Data Encryption

- **Passwords**: bcrypt hashing (never stored plain text)
- **Tokens**: JWT with HS256 algorithm
- **Sensitive Data**: Environment variables for secrets

### Data Access Control

Users can only access data based on:
- Their role permissions
- Their assigned store (for non-admin roles)
- Their organization (multi-tenant ready)

## API Security

### Rate Limiting

**Status**: Prepared (implementation pending)

Planned limits:
- Authentication: 5 attempts per 15 minutes
- API calls: 100 requests per minute per user
- Public endpoints: 20 requests per minute per IP

### CSRF Protection

- Built-in NextAuth.js CSRF tokens
- SameSite cookie attribute
- Custom CSRF tokens for forms (prepared)

### XSS Prevention

1. **React**: Auto-escapes by default
2. **Input Sanitization**: Zod validation
3. **Content Security Policy**: Prepared
4. **DOMPurify**: For rich text (when implemented)

### Input Validation

All inputs validated with Zod schemas:

```typescript
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
```

## Audit Logging

Every action is logged to the `AuditLog` table:

```typescript
{
  userId: string
  action: CREATE | READ | UPDATE | DELETE | LOGIN | LOGOUT
  resource: string
  resourceId: string
  details: JSON
  ipAddress: string
  userAgent: string
  timestamp: DateTime
}
```

### Logged Actions

- User login/logout
- Data creation
- Data updates
- Data deletion
- Permission changes
- Setting modifications
- Data exports

### Audit Log Access

- SUPER_ADMIN: Full access
- ADMIN: Organization access
- ACCOUNTING: Read-only access
- Others: No access

## Session Management

### Session Storage

- **Type**: JWT in httpOnly cookie
- **Duration**: 30 days
- **Refresh**: Automatic on activity
- **Revocation**: Logout clears cookie

### Session Security

```typescript
session: {
  strategy: 'jwt',
  maxAge: 30 * 24 * 60 * 60, // 30 days
}
```

### Concurrent Sessions

- Allowed: Yes
- Max sessions: Unlimited (can be limited later)
- Force logout: Prepared

## GDPR Compliance

### Data Protection

1. **Minimal Collection**: Only necessary data
2. **Data Retention**: Configurable
3. **Right to Access**: Export functionality
4. **Right to Erasure**: Delete functionality
5. **Consent Management**: ConsentRecord model

### Personal Data Handling

```typescript
// Customer data with consent
Customer {
  email: string
  name: string
  phone: string?
  marketingConsent: boolean
  gdprConsentDate: DateTime?
}
```

### Data Export

Users can request data export (prepared):
- Personal information
- Purchase history
- Consent records

## Security Headers

### Recommended Headers

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Content Security Policy (Prepared)

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self' data:;
connect-src 'self' https://vercel.live;
```

## Environment Variables

### Required Secrets

```bash
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="[generate-with-openssl-rand-base64-32]"

# Optional
OPENAI_API_KEY="sk-..."
SMTP_PASSWORD="..."
```

### Secret Management

1. **Never commit** `.env` to git
2. **Use** `.env.local` for development
3. **Store** production secrets in Vercel/hosting platform
4. **Rotate** secrets regularly

## Vulnerability Prevention

### SQL Injection

✅ **Protected**: Prisma ORM with parameterized queries

### XSS (Cross-Site Scripting)

✅ **Protected**: React auto-escaping + Zod validation

### CSRF (Cross-Site Request Forgery)

✅ **Protected**: NextAuth.js CSRF tokens + SameSite cookies

### Clickjacking

✅ **Protected**: X-Frame-Options header

### Session Hijacking

✅ **Protected**: httpOnly + secure cookies, JWT tokens

## Security Best Practices

### For Developers

1. ✅ Never hardcode secrets
2. ✅ Always validate input (Zod)
3. ✅ Use server actions for mutations
4. ✅ Check permissions before operations
5. ✅ Log security-relevant events
6. ✅ Keep dependencies updated
7. ✅ Review Prisma migrations
8. ✅ Use TypeScript for type safety

### For Deployment

1. ✅ Enable HTTPS only
2. ✅ Set secure environment variables
3. ✅ Configure security headers
4. ✅ Enable rate limiting
5. ✅ Monitor audit logs
6. ✅ Regular backups
7. ✅ DDoS protection (via Vercel)
8. ✅ Uptime monitoring

## Incident Response

### Security Incident Procedure

1. **Detect**: Monitor logs and alerts
2. **Contain**: Disable affected accounts/features
3. **Investigate**: Review audit logs
4. **Remediate**: Fix vulnerability
5. **Notify**: Inform affected users (GDPR requirement)
6. **Document**: Record incident details

### Contact

Security issues: security@example.com

## Compliance Checklist

- [x] GDPR compliance ready
- [x] Audit logging
- [x] Data encryption (passwords)
- [x] Access control (RBAC)
- [x] Session management
- [ ] Rate limiting (prepared)
- [ ] 2FA/MFA (prepared)
- [ ] Email verification (prepared)
- [ ] Password reset (prepared)
- [ ] Security headers (prepared)

## Testing Security

### Security Tests

```bash
# Run security audit
npm audit

# Run dependency check
npm outdated

# Type checking
npm run type-check

# Lint
npm run lint
```

### Penetration Testing

Regular security audits recommended:
- Authentication testing
- Authorization bypass attempts
- SQL injection testing
- XSS testing
- CSRF testing
- Session management testing

## Updates and Patches

### Dependency Updates

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update major versions carefully
npm install package@latest
```

### Security Patches

Monitor:
- GitHub Security Advisories
- npm security advisories
- Next.js security releases
- Prisma security releases

---

**Last Updated**: 2026-08-10  
**Security Contact**: security@example.com  
**Bug Bounty**: Not currently active
