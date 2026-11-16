---
title: finalize-installation
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/finalize-installation
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/finalize-installation"
last_updated: 2026-11-16
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about finalize-installation on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/finalize-installation.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "814f172821b0b493632a70ac68d5305f73db4b646f6de7fd3b8626f9bb264bb8"
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
