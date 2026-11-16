---
title: rotate-installation-credential
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/rotate-installation-credential
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/rotate-installation-credential"
last_updated: 2026-11-16
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about rotate-installation-credential on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/rotate-installation-credential.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "4a365cd88f157d43c98ad77b8b93d1f77cd3eeb89de366aacb3105c205d149e3"
---

# Rotate Installation Credential

```http
POST /v1/installations/{integrationConfigurationId}/credentials/rotate
```

Issues a replacement access token for an installation, so a partner can rotate a credential it believes is compromised without the customer having to reinstall. Authenticated by the credential being replaced plus the integration's client secret: a leaked access token on its own cannot rotate itself, which would otherwise let an attacker take over the installation and lock the partner out. The previous credential intentionally stays valid so in-flight requests keep working. Retiring it is a separate, explicit operation — a partner is never left mid-rotation without a working credential.

## Authentication

**bearerToken**: Default authentication mechanism

## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationConfigurationId` | string | ✓ |  |

## Request Body

**Content-Type**: `application/json`

```json
{
  "client_secret": "string" // required,
  "client_id": "string"
}
```

## Responses

### 200

Success

**Content-Type**: `application/json`

```json
{
  "access_token": "string" // required,
  "expires_in": "number" // required,
  "scope": "string" // required,
  "token_type": "string" // required
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
