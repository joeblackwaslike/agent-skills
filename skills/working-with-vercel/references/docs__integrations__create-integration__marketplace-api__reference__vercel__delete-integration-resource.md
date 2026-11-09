---
title: delete-integration-resource
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/delete-integration-resource
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/delete-integration-resource"
last_updated: 2026-11-09
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about delete-integration-resource on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/delete-integration-resource.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "4f59c8a3c87057f70181021ce97468e19b93981b3534c2772c21d0c1fda3dec7"
---

# Delete Integration Resource

```http
DELETE /v1/installations/{integrationConfigurationId}/resources/{resourceId}
```

Delete a resource owned by the selected installation ID.

## Authentication

**bearerToken**: Default authentication mechanism

## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationConfigurationId` | string | ✓ |  |
| `resourceId` | string | ✓ |  |

## Responses

### 204

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
