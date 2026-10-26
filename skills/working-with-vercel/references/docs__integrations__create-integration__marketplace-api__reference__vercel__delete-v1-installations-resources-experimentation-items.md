---
title: delete-v1-installations-resources-experimentation-items
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/delete-v1-installations-resources-experimentation-items
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/delete-v1-installations-resources-experimentation-items"
last_updated: 2026-10-26
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about delete-v1-installations-resources-experimentation-items on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/delete-v1-installations-resources-experimentation-items.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "2ee09a3a2654485598c08940e3a3167215a25f15e5d2c33d730b87cabe0b72c9"
---

# Delete an existing experimentation item

```http
DELETE /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items/{itemId}
```

Delete an existing experimentation item

## Authentication

**bearerToken**: Default authentication mechanism

## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationConfigurationId` | string | ✓ |  |
| `resourceId` | string | ✓ |  |
| `itemId` | string | ✓ |  |

## Responses

### 204

The item was deleted

### 400

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
