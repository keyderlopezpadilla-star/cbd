# Compliance Documentation

## Overview

The CBD SaaS Platform implements comprehensive compliance measures for CBD retail regulations and GDPR data protection requirements applicable in Spain and the European Union.

## CBD Regulations

### Product Compliance

All CBD products in the platform must comply with:

1. **THC Content**: Maximum 0.2% THC (EU regulation)
2. **Labeling Requirements**: Proper concentration, batch number, and certifications
3. **Age Verification**: Products require age verification (18+)
4. **Laboratory Testing**: Each batch must have documented lab results
5. **Territorial Restrictions**: Products may be restricted in certain regions

### Product Data Fields

The platform tracks compliance-specific data for each product:

| Field | Description | Required |
|-------|-------------|----------|
| concentration | CBD/THC content (e.g., "10% CBD") | Yes |
| composition | Extract type (Full Spectrum, Isolate) | Yes |
| batchNumber | Manufacturing batch reference | Yes |
| certifications | Quality certifications (GMP, Organic) | Yes |
| laboratoryTests | Link to lab analysis results | Yes |
| regulatoryStatus | Legal status description | Yes |
| territorialRestrictions | Regions where product is restricted | No |
| requiresAgeVerification | Whether age check is needed | Yes (default: true) |

### Audit Trail

All product changes are logged in the audit system:
- Product creation/modification
- Price changes
- Stock adjustments
- Compliance field updates

## GDPR Implementation

### Data Protection Principles

The platform follows GDPR principles:

1. **Lawfulness**: Data processed with valid legal basis
2. **Purpose Limitation**: Data collected for specific purposes only
3. **Data Minimization**: Only necessary data collected
4. **Accuracy**: Data kept up to date
5. **Storage Limitation**: Data deleted when no longer needed
6. **Integrity & Confidentiality**: Data protected against unauthorized access

### Consent Management

The ConsentRecord model tracks customer consent:

```
Types: MARKETING, ANALYTICS, COOKIES
Fields: customerId, consentType, granted, source, ipAddress, timestamp
```

**Consent Collection Points:**
- Account registration
- Checkout process
- Cookie banner
- Account settings page
- Marketing opt-in forms

### Data Subject Rights

The platform supports all GDPR data subject rights:

| Right | Implementation |
|-------|---------------|
| Right to Access | Export customer data via admin panel |
| Right to Rectification | Edit customer profile |
| Right to Erasure | Delete/anonymize customer data |
| Right to Restriction | Disable marketing communications |
| Right to Portability | Export data in JSON/CSV format |
| Right to Object | Opt-out of profiling/marketing |

### Data Retention Policy

| Data Type | Retention Period | Basis |
|-----------|-----------------|-------|
| Sales Records | 5 years | Legal obligation (tax) |
| Customer Profiles | Active + 2 years | Legitimate interest |
| Consent Records | Duration of consent + 5 years | Legal obligation |
| Audit Logs | 3 years | Legitimate interest |
| Session Data | 30 days | Contract performance |
| Analytics Data | 26 months | Consent |

### Technical Measures

1. **Encryption at Rest**: Database encryption enabled
2. **Encryption in Transit**: TLS 1.3 for all connections
3. **Access Control**: Role-based access with least privilege
4. **Pseudonymization**: Customer IDs instead of personal data in analytics
5. **Logging**: All data access logged in audit trail
6. **Breach Detection**: Anomaly detection on login attempts

### Cookie Policy

| Cookie | Type | Duration | Purpose |
|--------|------|----------|---------|
| next-auth.session-token | Essential | Session | Authentication |
| next-auth.csrf-token | Essential | Session | CSRF protection |
| consent_preferences | Functional | 1 year | Remember consent choices |
| analytics_id | Analytics | 26 months | Usage tracking (with consent) |

### Data Processing Agreements

For third-party integrations:
- Cloud hosting (Vercel/AWS): DPA in place
- Email service: DPA required
- Payment processor: PCI-DSS compliant
- AI services: No PII shared

## Spanish Regulations (LOPD-GDD)

Additional requirements under Spanish law:
- AEPD registration not required (less than 250 employees)
- Data Protection Officer (DPO) recommended
- Privacy policy in Spanish
- Consent forms in clear language
- Double opt-in for marketing communications

## Compliance Reporting

The super admin dashboard provides:
- Consent statistics overview
- Data processing activities log
- Pending data subject requests
- Compliance audit trail
- Cookie consent rates
