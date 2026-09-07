---
title: createinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitems
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/createinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitems
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/createinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitems"
last_updated: 2026-09-07
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about createinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitems on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/createinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitems.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "d5e72dead9a371a831ab136806a13325471fed3b56fa3eea1cf55a6a65d7fb51"
---

# Create one or multiple experimentation items

```http
POST /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items
```

Create one or multiple experimentation items

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
  "items": [ // required
    "id": "string" // required,
    "slug": "string" // required,
    "origin": "string" // required,
    "category": "string",
    "name": "string",
    "description": "string",
    "isArchived": "boolean",
    "createdAt": "number",
    "updatedAt": "number"
  ]
}
```

## Responses

### 204

The items were created

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
