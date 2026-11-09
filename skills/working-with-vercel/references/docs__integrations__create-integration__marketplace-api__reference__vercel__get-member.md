---
title: get-member
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/get-member
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-member"
last_updated: 2026-11-09
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about get-member on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-member.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "f1bce7a7cfe96f82118b10e00299231e5e5299b722709dc3bfec827212607f0d"
---

# Get Member Information

```http
GET /v1/installations/{integrationConfigurationId}/member/{memberId}
```

Returns the member role and other information for a given member ID ("user_id" claim in the SSO OIDC token).

## Authentication

**bearerToken**: Default authentication mechanism

## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationConfigurationId` | string | ✓ |  |
| `memberId` | string | ✓ |  |

## Responses

### 200

Success

**Content-Type**: `application/json`

```json
{
  "globalUserId": "string",
  "id": "string" // required,
  "role": "string" // required // "The `ADMIN` role, by default, is provided to users capable of installing integrations, while the `USER` role can be granted to Vercel users with the Vercel `Billing` or Vercel `Viewer` role, which are considered to be Read-Only roles.",
  "userEmail": "string"
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

### 410

Success


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
