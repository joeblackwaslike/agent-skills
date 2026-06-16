---
title: import-resource
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/import-resource
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/import-resource"
last_updated: 2026-06-15
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about import-resource on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/import-resource.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "be5808ddbc694bd4b8da2806d2c48c7d2423f26df611ce4cf31f3169ad3131fb"
---

# Import Resource

```http
PUT /v1/installations/{integrationConfigurationId}/resources/{resourceId}
```

This endpoint imports (upserts) a resource to Vercel's installation. This may be needed if resources can be independently created on the partner's side and need to be synchronized to Vercel. When importing as part of the user-initiated import flow, call this endpoint before redirecting the user back to Vercel. See the [Import existing resources flow](https://vercel.com/docs/integrations/create-integration/marketplace-flows#import-existing-resources-flow) for the full contract.

## Authentication

**bearerToken**: Default authentication mechanism

## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationConfigurationId` | string | ✓ |  |
| `resourceId` | string | ✓ |  |

## Request Body

**Content-Type**: `application/json`

```json
{
  "ownership": "string",
  "productId": "string" // required,
  "name": "string" // required,
  "status": "string" // required,
  "metadata": "object",
  "billingPlan": {
    "id": "string" // required,
    "type": "string" // required,
    "name": "string" // required,
    "description": "string",
    "paymentMethodRequired": "boolean",
    "cost": "string",
    "details": [
      "label": "string" // required,
      "value": "string"
    ],
    "highlightedDetails": [
      "label": "string" // required,
      "value": "string"
    ],
    "effectiveDate": "string"
  },
  "notification": {
    "level": "string" // required,
    "title": "string" // required,
    "message": "string",
    "href": "string"
  },
  "extras": "object",
  "secrets": [
    "name": "string" // required,
    "value": "string" // required,
    "prefix": "string",
    "environmentOverrides": {
      "development": "string" // Value used for development environment.,
      "preview": "string" // Value used for preview environment.,
      "production": "string" // Value used for production environment.
    }
  ]
}
```

## Responses

### 200

Success

**Content-Type**: `application/json`

```json
{
  "name": "string" // required
}
```

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

### 422

Success

### 429

Success


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)
