---
title: deleteinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/deleteinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/deleteinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid"
last_updated: 2026-08-24
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about deleteinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/deleteinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "1581cdfb7924b4f84c6fc5764e3fdd97dfb50352faf5b03742cb565652c8d787"
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
