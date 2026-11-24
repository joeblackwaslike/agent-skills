---
title: patch-v1-installations-resources-experimentation-items
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/patch-v1-installations-resources-experimentation-items
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/patch-v1-installations-resources-experimentation-items"
last_updated: 2026-11-23
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about patch-v1-installations-resources-experimentation-items on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/patch-v1-installations-resources-experimentation-items.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "2d60046327aa2397b4b84d96cf67efb850e43e0fb769aea21bc7b7c230755913"
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
