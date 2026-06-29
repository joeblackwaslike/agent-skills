---
title: get-v1-installations-resources-experimentation-edge-config
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/get-v1-installations-resources-experimentation-edge-config
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-v1-installations-resources-experimentation-edge-config"
last_updated: 2026-06-29
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about get-v1-installations-resources-experimentation-edge-config on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-v1-installations-resources-experimentation-edge-config.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "64e0a2bdeef80a6aacc8e5990da17555fb8ad09949a6856320444b77aa771170"
---

# Get the data of a user-provided Edge Config

```http
GET /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/edge-config
```

When the user enabled Edge Config syncing, then this endpoint can be used by the partner to fetch the contents of the Edge Config.

## Authentication

**bearerToken**: Default authentication mechanism

## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationConfigurationId` | string | ✓ |  |
| `resourceId` | string | ✓ |  |

## Responses

### 200

The Edge Config data

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


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)
