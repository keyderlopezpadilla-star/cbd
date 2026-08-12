# Database Documentation

## Overview

The CBD SaaS Platform uses PostgreSQL as its primary database, managed through Prisma ORM. The schema supports multi-tenant architecture with organization-scoped data isolation.

## Entity Relationship Diagram

```
Organization 1---* Store 1---* User
     |                |           |
     |                |           +---* Sale
     |                |           +---* AuditLog
     |                |           +---* Notification
     |                |
     |                +---* InventoryItem ---* InventoryMovement
     |                +---* Sale ---* SaleItem
     |                +---* Order ---* OrderItem
     |                +---* StockTransfer ---* StockTransferItem
     |                +---* EmployeePerformance
     |
     +--- OrganizationSettings

Category 1---* Product 1---* InventoryItem
                  |
                  +---* SaleItem
                  +---* OrderItem
                  +---* StockTransferItem
                  +---* SupplierProduct

Customer 1---* Sale
    |     1---* Order
    |     1---* LoyaltyTransaction
    |     1---* CustomerSegment
    +--- ConsentRecord
```

## Models

### Authentication & Authorization

| Model | Description | Key Fields |
|-------|-------------|------------|
| User | Platform users (employees, managers, admins) | email, role, storeId, mfaEnabled |
| Account | OAuth provider accounts | provider, providerAccountId |
| Session | Active user sessions | sessionToken, expires |
| VerificationToken | Email verification tokens | token, expires |

### Organization & Stores

| Model | Description | Key Fields |
|-------|-------------|------------|
| Organization | Top-level tenant entity | name, slug, subscriptionPlan |
| OrganizationSettings | Per-org configuration | currency, locale, timezone, taxRate |
| Store | Physical retail locations | name, city, managerId, coordinates |

### Products & Inventory

| Model | Description | Key Fields |
|-------|-------------|------------|
| Category | Product categorization (hierarchical) | name, slug, parentId |
| Product | CBD products with compliance fields | sku, price, cost, concentration, batchNumber |
| InventoryItem | Stock per product per store | quantity, minStock, status |
| InventoryMovement | Stock change audit trail | type, quantity, previousStock, newStock |

### Sales & Orders

| Model | Description | Key Fields |
|-------|-------------|------------|
| Sale | POS transactions | saleNumber, total, paymentMethod |
| SaleItem | Line items in a sale | productId, quantity, price |
| Order | Online/supplier orders | orderNumber, status, trackingNumber |
| OrderItem | Line items in an order | productId, quantity, price |

### Stock Transfers

| Model | Description | Key Fields |
|-------|-------------|------------|
| StockTransfer | Inter-store transfers | fromStoreId, toStoreId, status |
| StockTransferItem | Items being transferred | productId, quantity |

### Customers & CRM

| Model | Description | Key Fields |
|-------|-------------|------------|
| Customer | Customer profiles | email, loyaltyTier, totalSpent |
| LoyaltyTransaction | Points history | points, type, description |
| CustomerSegment | Marketing segments | customerId, segmentName |

### Marketing

| Model | Description | Key Fields |
|-------|-------------|------------|
| Campaign | Marketing campaigns | name, type, status, targetSegment |
| Coupon | Discount codes | code, discountType, discountValue |

### Content

| Model | Description | Key Fields |
|-------|-------------|------------|
| BlogPost | Blog articles | title, slug, status, publishedAt |
| FAQ | Frequently asked questions | question, answer, category |

### Compliance

| Model | Description | Key Fields |
|-------|-------------|------------|
| ConsentRecord | GDPR consent tracking | customerId, consentType, granted |
| AuditLog | Action audit trail | userId, action, resource, details |

## Enums

| Enum | Values |
|------|--------|
| UserRole | SUPER_ADMIN, ADMIN, MANAGER, EMPLOYEE, ACCOUNTING, MARKETING |
| SubscriptionPlan | FREE, PRO, BUSINESS, ENTERPRISE |
| StockStatus | NORMAL, LOW, CRITICAL, OUT_OF_STOCK |
| OrderStatus | PENDING, CONFIRMED, PREPARING, SHIPPED, DELIVERED, CANCELLED, REFUNDED |
| TransferStatus | REQUESTED, APPROVED, PREPARING, IN_TRANSIT, RECEIVED, CANCELLED |
| LoyaltyTier | STARTER, PREMIUM, VIP, BLACK |
| MovementType | IN, OUT, ADJUSTMENT, TRANSFER_IN, TRANSFER_OUT |
| NotificationType | INFO, SUCCESS, WARNING, ERROR, STOCK_ALERT, ORDER_UPDATE, TRANSFER_UPDATE, SECURITY_ALERT |
| AuditAction | CREATE, READ, UPDATE, DELETE, LOGIN, LOGOUT, EXPORT |

## Indexes

Key indexes for query performance:

- `users`: email, storeId
- `stores`: organizationId, managerId, [organizationId, slug] (unique)
- `products`: sku (unique), categoryId
- `inventory_items`: [productId, storeId] (unique), status
- `sales`: saleNumber (unique), storeId, employeeId, customerId, createdAt
- `orders`: orderNumber (unique), storeId, customerId, status
- `audit_logs`: userId, resource, createdAt

## Migration Strategy

1. **Development**: Use `prisma db push` for rapid iteration
2. **Staging/Production**: Use `prisma migrate dev` to create migration files
3. **Deployment**: Use `prisma migrate deploy` in CI/CD pipeline

```bash
# Development
npm run db:push

# Create migration
npm run db:migrate

# Deploy migrations
npx prisma migrate deploy

# Seed database
npm run db:seed
```

## Backup Strategy

- Automated daily backups via cloud provider (Vercel Postgres / Supabase)
- Point-in-time recovery enabled
- 30-day retention for backups
- Manual backups before major migrations
