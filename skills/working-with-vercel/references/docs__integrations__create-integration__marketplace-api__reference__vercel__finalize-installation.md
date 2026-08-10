---
title: finalize-installation
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/finalize-installation
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/finalize-installation"
last_updated: 2026-08-10
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about finalize-installation on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/finalize-installation.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "4cd6763830c29cdbeed926a59b285f0f68ff16eb0be9b9fb341bd4c9fb4dfe8a"
---

# Finalize Installation

```http
POST /v1/installations/{integrationConfigurationId}/billing/finalize
```

This endpoint allows the partner to mark an installation as finalized. This means you will not send any more invoices for the installation. Use this after a customer has requested uninstall and you have sent any remaining invoices. This will allow the uninstall process to proceed immediately after all invoices have been paid. <br/> Use the `credentials.access_token` we provided in the [Upsert Installation](#upsert-installation) body to authorize this request.

## Authentication

**bearerToken**: Default authentication mechanism

## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationConfigurationId` | string | ✓ |  |

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
