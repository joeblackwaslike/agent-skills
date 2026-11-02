---
title: rotate-installation-credential
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/rotate-installation-credential
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/rotate-installation-credential"
last_updated: 2026-11-02
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about rotate-installation-credential on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/rotate-installation-credential.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "d7119ed2b9057fb1bbe9ee6170b2186543fb2b62b88e300e1de65c0e934b9d11"
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


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
