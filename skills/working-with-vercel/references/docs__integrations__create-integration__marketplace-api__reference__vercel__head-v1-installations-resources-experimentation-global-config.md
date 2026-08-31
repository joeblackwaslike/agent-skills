---
title: head-v1-installations-resources-experimentation-global-config
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/head-v1-installations-resources-experimentation-global-config
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/head-v1-installations-resources-experimentation-global-config"
last_updated: 2026-08-31
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about head-v1-installations-resources-experimentation-global-config on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/head-v1-installations-resources-experimentation-global-config.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "55b4b95dffeb41eb22aeaa5a9c04ddeb93a795f31e1924fc35a9e333aa895be9"
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
