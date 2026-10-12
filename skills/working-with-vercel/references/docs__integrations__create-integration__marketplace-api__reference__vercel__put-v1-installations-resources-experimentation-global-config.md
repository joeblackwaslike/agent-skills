---
title: put-v1-installations-resources-experimentation-global-config
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/put-v1-installations-resources-experimentation-global-config
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/put-v1-installations-resources-experimentation-global-config"
last_updated: 2026-10-12
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about put-v1-installations-resources-experimentation-global-config on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/put-v1-installations-resources-experimentation-global-config.md"
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "07531c056363a0a1c7ccd347a611a3bd59677507cf7788b2cc650a5528b91ac6"
---

# Push data into a user-provided Global Config

```http
PUT /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/global-config
```

When the user enabled Global Config syncing, then this endpoint can be used by the partner to push their configuration data into the relevant Global Config.

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

The Global Config was updated

**Content-Type**: `application/json`

```json
{
  "digest": "string" // required,
  "items": "object" // required,
  "purpose": "string",
  "updatedAt": "number" // required
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

### 410

Success

### 412

Success


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)
