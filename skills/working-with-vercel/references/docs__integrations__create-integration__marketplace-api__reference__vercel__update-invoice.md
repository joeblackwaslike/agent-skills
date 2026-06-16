---
title: update-invoice
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/update-invoice
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/update-invoice"
last_updated: 2026-06-15
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about update-invoice on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/update-invoice.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "487edea5d6a40e9f6341c06c2d78e2231060d0e21824cee36ebe5a9203e0fe94"
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
