---
title: get-v1-installations-resources-experimentation-global-config
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/get-v1-installations-resources-experimentation-global-config
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-v1-installations-resources-experimentation-global-config"
last_updated: 2026-11-16
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about get-v1-installations-resources-experimentation-global-config on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-v1-installations-resources-experimentation-global-config.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "a8b0c84b5223731c9b7b0af841cf1d3441b86e4f6fd92f0c1893eedb5cee9af6"
---

# Get the data of a user-provided Global Config

```http
GET /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/global-config
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
  "digest": "string" // required,
  "items": "object" // required,
  "purpose": "string",
  "updatedAt": "number" // required
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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
