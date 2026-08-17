---
title: head-v1-installations-resources-experimentation-global-config
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/head-v1-installations-resources-experimentation-global-config
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/head-v1-installations-resources-experimentation-global-config"
last_updated: 2026-08-17
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about head-v1-installations-resources-experimentation-global-config on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/head-v1-installations-resources-experimentation-global-config.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "4a2b24fad7232be9e8904e1e98cb60b322d96a423e623d69168bc82c3086124d"
---

# Get the data of a user-provided Global Config

```http
HEAD /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/global-config
```

When the user enabled Global Config syncing, then this endpoint can be used by the partner to fetch the contents of the Global Config.

## Authentication

**bearerToken**: Default authentication mechanism

## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationConfigurationId` | string | ✓ |  |
| `resourceId` | string | ✓ |  |

## Responses

### 200

The Global Config data

**Content-Type**: `application/json`

```json
{
  "items": "object" // required,
  "updatedAt": "number" // required,
  "digest": "string" // required,
  "purpose": "string"
}
```

### 304

Success

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
