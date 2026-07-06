---
title: createinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitems
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/createinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitems
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/createinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitems"
last_updated: 2026-07-06
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about createinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitems on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/createinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitems.md"
fetched_at: "2026-07-06T05:40:24.878Z"
sha256: "42e5117c31f9049df6b9615f307e5ca4e031cebe39338feafb9de43a52b408e0"
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


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)
