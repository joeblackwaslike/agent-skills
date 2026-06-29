---
title: get-account-info
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/get-account-info
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-account-info"
last_updated: 2026-06-29
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about get-account-info on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-account-info.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "299b95ea813e024cb2c1f104b4f1a4d05c139fc6949adb7d5b77519ac8cd5b80"
---

# Get Account Information

```http
GET /v1/installations/{integrationConfigurationId}/account
```

Fetches the best account or user’s contact info

## Authentication

**bearerToken**: Default authentication mechanism

## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationConfigurationId` | string | ✓ |  |

## Responses

### 200

Success

**Content-Type**: `application/json`

```json
{
  "name": "string" // The name of the team the installation is tied to.,
  "url": "string" // required // A URL linking to the installation in the Vercel Dashboard.,
  "contact": { // required
    "email": "string" // required,
    "name": "string"
  }
}
```

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
