---
title: revoke-installation-credential
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/revoke-installation-credential
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/revoke-installation-credential"
last_updated: 2026-11-23
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about revoke-installation-credential on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/revoke-installation-credential.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "ba1fabafdfc5f49f599ec6548d9bac3f494332dbce9a8efed9f211ea9a4abec0"
---

# Revoke Installation Credential

```http
POST /v1/installations/{integrationConfigurationId}/credentials/revoke
```

Retires a superseded installation credential, so a partner can complete a rotation it started with `POST /credentials/rotate` — the leaked credential stops working without the customer having to reinstall. Authenticated by a live installation credential plus the integration's client secret. The credential to retire is named in the body rather than being the one that authenticates, so the ordinary flow is: rotate, store the replacement, then authenticate with the replacement and revoke the old one. Refuses to retire an installation's last live credential. Rotation exists so remediation is not customer-visible; revoking the only credential would undo that and leave the install needing a reinstall.

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
  "token": "string" // required,
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
  "already_revoked": "boolean" // required,
  "revoked": "boolean" // required
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
