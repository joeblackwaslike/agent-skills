---
title: update-resource
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/update-resource
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/update-resource"
last_updated: 2026-06-15
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about update-resource on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/update-resource.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "e427729f79cd3abd33ad859d1ce811a516e524657410018634850552401e59f7"
---

# Update Resource

```http
PATCH /v1/installations/{integrationConfigurationId}/resources/{resourceId}
```

This endpoint updates an existing resource in the installation. All parameters are optional, allowing partial updates.

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
  "name": "string",
  "status": "string",
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
  "notification": "value",
  "extras": "object",
  "secrets": "value"
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


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)
