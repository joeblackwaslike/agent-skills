---
title: deleteinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/deleteinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/deleteinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid"
last_updated: 2026-09-14
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about deleteinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/deleteinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "61978587452c8c43b5bfdebec9c42c624fad40ae4104b53ced432f5fe731b59c"
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
