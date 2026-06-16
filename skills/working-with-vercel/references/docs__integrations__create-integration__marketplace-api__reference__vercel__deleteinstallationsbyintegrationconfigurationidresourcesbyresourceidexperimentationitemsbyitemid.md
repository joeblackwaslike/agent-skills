---
title: deleteinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/deleteinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/deleteinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid"
last_updated: 2026-06-15
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about deleteinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/deleteinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "587135e086c9654970e7ceea6f66930910dacd9f8564ed17ff85b1bd6028758b"
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
