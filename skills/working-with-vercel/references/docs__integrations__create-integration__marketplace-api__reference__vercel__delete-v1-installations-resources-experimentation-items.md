---
title: delete-v1-installations-resources-experimentation-items
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/delete-v1-installations-resources-experimentation-items
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/delete-v1-installations-resources-experimentation-items"
last_updated: 2026-06-29
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about delete-v1-installations-resources-experimentation-items on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/delete-v1-installations-resources-experimentation-items.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "c80abec0631f1b6124174dc26d4f9497b7b4529b4684cbe3caf1e3726cc7474a"
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


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)
