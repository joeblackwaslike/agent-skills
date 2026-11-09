---
title: updateinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/updateinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/updateinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid"
last_updated: 2026-11-09
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about updateinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/updateinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitemsbyitemid.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "0b23553229cf768e8c52edb595747aafaf5d1af0f11da0c70fc553460f6c8b50"
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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
