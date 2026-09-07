---
title: patch-v1-installations-resources-experimentation-items
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/patch-v1-installations-resources-experimentation-items
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/patch-v1-installations-resources-experimentation-items"
last_updated: 2026-09-07
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about patch-v1-installations-resources-experimentation-items on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/patch-v1-installations-resources-experimentation-items.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "7a4c7a7c404a18ea42d4edb0f8a826a34c566dd438cf3cb1efd617bd4ddfcbb6"
---

# Patch an existing experimentation item

```http
PATCH /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items/{itemId}
```

Patch an existing experimentation item

## Authentication

**bearerToken**: Default authentication mechanism

## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationConfigurationId` | string | ✓ |  |
| `resourceId` | string | ✓ |  |
| `itemId` | string | ✓ |  |

## Request Body

**Content-Type**: `application/json`

```json
{
  "slug": "string" // required,
  "origin": "string" // required,
  "name": "string",
  "category": "string",
  "description": "string",
  "isArchived": "boolean",
  "createdAt": "number",
  "updatedAt": "number"
}
```

## Responses

### 204

The item was updated

### 400

One of the provided values in the request body is invalid.
One of the provided values in the request query is invalid.

### 401

The request is not authorized.

### 403

You do not have permission to access this resource.

### 404

Success

### 410

Success


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)
