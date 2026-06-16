---
title: replaceinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationedgeconfig
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/replaceinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationedgeconfig
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/replaceinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationedgeconfig"
last_updated: 2026-06-15
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about replaceinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationedgeconfig on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/replaceinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationedgeconfig.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "36498d8c98c79404bc94696ba7f78d27d86438c446dec9e6b1f6a88e5c7b5adf"
---

# Push data into a user-provided Edge Config

```http
PUT /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/edge-config
```

When the user enabled Edge Config syncing, then this endpoint can be used by the partner to push their configuration data into the relevant Edge Config.

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
  "data": "object" // required
}
```

## Responses

### 200

The Edge Config was updated

**Content-Type**: `application/json`

```json
{
  "items": "object" // required,
  "updatedAt": "number" // required,
  "digest": "string" // required,
  "purpose": "string"
}
```

### 400

One of the provided values in the request body is invalid.
One of the provided values in the request query is invalid.

### 401

The request is not authorized.

### 403

You do not have permission to access this resource.

### 404

Success

### 409

Success

### 412

Success


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)
