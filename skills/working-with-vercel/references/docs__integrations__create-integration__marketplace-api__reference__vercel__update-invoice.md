---
title: update-invoice
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/update-invoice
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/update-invoice"
last_updated: 2026-07-20
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about update-invoice on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/update-invoice.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "7a7104348ba9adb486de5b557968f175433870e43a96ef9d91bf1a2132f51426"
---

# Invoice Actions

```http
POST /v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}/actions
```

This endpoint allows the partner to request a refund for an invoice to Vercel. The invoice is created using the [Submit Invoice API](#submit-invoice-api).

## Authentication

**bearerToken**: Default authentication mechanism

## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationConfigurationId` | string | ✓ |  |
| `invoiceId` | string | ✓ |  |

## Request Body

**Content-Type**: `application/json`

"value"
## Responses

### 204

Success

### 400

One of the provided values in the request body is invalid.
One of the provided values in the request query is invalid.

### 401

The request is not authorized.

### 403

You do not have permission to access this resource.

### 404

Success

### 409

Success


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)
