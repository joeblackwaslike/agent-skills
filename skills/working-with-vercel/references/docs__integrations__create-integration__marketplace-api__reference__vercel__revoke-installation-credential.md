---
title: revoke-installation-credential
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/revoke-installation-credential
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/revoke-installation-credential"
last_updated: 2026-08-31
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about revoke-installation-credential on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/revoke-installation-credential.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "1a2a70d8363a382171c1c67e2cc4e7249e8386eaade83248e04a0c404b134e8e"
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
  "revoked": "boolean" // required,
  "already_revoked": "boolean" // required
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
