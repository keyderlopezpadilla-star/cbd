# API Documentation

## Overview

The CBD SaaS Platform exposes RESTful API endpoints via Next.js API routes. All endpoints require authentication unless noted otherwise.

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

## Authentication

All API routes require a valid session cookie or Bearer token. Authentication is handled by NextAuth.js v5.

```
Authorization: Bearer <token>
Cookie: next-auth.session-token=<session>
```

## Response Format

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 100
  }
}
```

Error responses:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [...]
  }
}
```

## Rate Limiting

| Endpoint Category | Limit | Window |
|-------------------|-------|--------|
| General API | 100 requests | 1 minute |
| Authentication | 5 attempts | 15 minutes |
| File Upload | 10 requests | 1 minute |

Rate limit headers are included in all responses:
- `X-RateLimit-Remaining`: Requests remaining in window
- `X-RateLimit-Reset`: Timestamp when window resets
- `Retry-After`: Seconds to wait (on 429 responses)

## Endpoints

### Authentication

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| POST | /api/auth/signin | Sign in with credentials | No |
| POST | /api/auth/signout | Sign out | Yes |
| GET | /api/auth/session | Get current session | No |
| GET | /api/auth/providers | List auth providers | No |

### Products

| Method | Path | Description | Roles |
|--------|------|-------------|-------|
| GET | /api/products | List products (paginated) | All authenticated |
| GET | /api/products/:id | Get product details | All authenticated |
| POST | /api/products | Create product | ADMIN, MANAGER |
| PUT | /api/products/:id | Update product | ADMIN, MANAGER |
| DELETE | /api/products/:id | Soft-delete product | ADMIN |

**Query Parameters (GET /api/products):**
- `page` (number): Page number (default: 1)
- `pageSize` (number): Items per page (default: 20, max: 100)
- `categoryId` (string): Filter by category
- `search` (string): Search by name or SKU
- `status` (string): Filter by active status
- `sort` (string): Sort field (name, price, createdAt)
- `order` (string): Sort direction (asc, desc)

### Sales

| Method | Path | Description | Roles |
|--------|------|-------------|-------|
| GET | /api/sales | List sales | All authenticated |
| GET | /api/sales/:id | Get sale details | All authenticated |
| POST | /api/sales | Create sale (POS) | ADMIN, MANAGER, EMPLOYEE |
| POST | /api/sales/:id/void | Void a sale | ADMIN, MANAGER |

**Create Sale Request Body:**
```json
{
  "storeId": "store_id",
  "customerId": "customer_id (optional)",
  "items": [
    {
      "productId": "product_id",
      "quantity": 2,
      "discount": 0
    }
  ],
  "paymentMethod": "CARD",
  "discount": 0,
  "notes": "Optional note"
}
```

### Inventory

| Method | Path | Description | Roles |
|--------|------|-------------|-------|
| GET | /api/inventory | List inventory items | All authenticated |
| GET | /api/inventory/:id | Get inventory details | All authenticated |
| POST | /api/inventory/adjust | Adjust stock | ADMIN, MANAGER |
| GET | /api/inventory/movements | List movements | ADMIN, MANAGER |

### Stock Transfers

| Method | Path | Description | Roles |
|--------|------|-------------|-------|
| GET | /api/transfers | List transfers | ADMIN, MANAGER |
| POST | /api/transfers | Create transfer request | MANAGER |
| PUT | /api/transfers/:id/approve | Approve transfer | ADMIN, MANAGER |
| PUT | /api/transfers/:id/status | Update transfer status | ADMIN, MANAGER |

### Customers

| Method | Path | Description | Roles |
|--------|------|-------------|-------|
| GET | /api/customers | List customers | All authenticated |
| GET | /api/customers/:id | Get customer details | All authenticated |
| POST | /api/customers | Create customer | All authenticated |
| PUT | /api/customers/:id | Update customer | ADMIN, MANAGER |

### Orders

| Method | Path | Description | Roles |
|--------|------|-------------|-------|
| GET | /api/orders | List orders | All authenticated |
| GET | /api/orders/:id | Get order details | All authenticated |
| POST | /api/orders | Create order | ADMIN, MANAGER, EMPLOYEE |
| PUT | /api/orders/:id/status | Update order status | ADMIN, MANAGER |

### Analytics

| Method | Path | Description | Roles |
|--------|------|-------------|-------|
| GET | /api/analytics/sales | Sales analytics | ADMIN, MANAGER, ACCOUNTING |
| GET | /api/analytics/inventory | Inventory analytics | ADMIN, MANAGER |
| GET | /api/analytics/customers | Customer analytics | ADMIN, MANAGER |
| GET | /api/analytics/performance | Employee performance | ADMIN, MANAGER |

### Users (Admin)

| Method | Path | Description | Roles |
|--------|------|-------------|-------|
| GET | /api/users | List users | ADMIN |
| POST | /api/users | Create user | ADMIN |
| PUT | /api/users/:id | Update user | ADMIN |
| DELETE | /api/users/:id | Deactivate user | SUPER_ADMIN |

### Organizations (Super Admin)

| Method | Path | Description | Roles |
|--------|------|-------------|-------|
| GET | /api/organizations | List all orgs | SUPER_ADMIN |
| GET | /api/organizations/:id | Get org details | SUPER_ADMIN |
| PUT | /api/organizations/:id | Update org | SUPER_ADMIN |

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| UNAUTHORIZED | 401 | Not authenticated |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION_ERROR | 422 | Invalid request data |
| RATE_LIMITED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Server error |

## Webhooks

The platform supports webhooks for:
- `sale.created` - New sale completed
- `order.status_changed` - Order status update
- `stock.low` - Stock below threshold
- `transfer.completed` - Transfer received

## CORS

API routes support CORS for allowed origins configured via the `ALLOWED_ORIGINS` environment variable.
