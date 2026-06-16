---
title: createinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitems
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/createinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitems
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/createinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitems"
last_updated: 2026-06-15
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about createinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitems on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/createinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationitems.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "2200c1277f051ac35498ac0194f52cc7001b35918131a71832bfa8aceb21219e"
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
