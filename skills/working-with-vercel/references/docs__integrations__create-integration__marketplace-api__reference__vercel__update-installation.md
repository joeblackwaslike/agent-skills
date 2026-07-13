---
title: update-installation
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/update-installation
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/update-installation"
last_updated: 2026-07-13
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about update-installation on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/update-installation.md"
fetched_at: "2026-07-13T07:00:47.058Z"
sha256: "1a0cf619660a2f15b219af5ba390f8da93565db1842964e120d7193fcebe9077"
---

# Update Installation

```http
PATCH /v1/installations/{integrationConfigurationId}
```

This endpoint updates an integration installation.

## Authentication

**bearerToken**: Default authentication mechanism

## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationConfigurationId` | string | ✓ |  |

## Request Body

**Content-Type**: `application/json`

```json
{
  "status": "string",
  "externalId": "string",
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
  "notification": "value" // A notification to display to your customer. Send `null` to clear the current notification.
}
```

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


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)
