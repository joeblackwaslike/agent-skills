---
title: get-member
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/get-member
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-member"
last_updated: 2026-06-15
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about get-member on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-member.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "b519c4a73718aa2a3420872bd5805adc37d0459ffffe95a57bea1b4d30a862c3"
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
  "id": "string" // required,
  "role": "string" // required // "The `ADMIN` role, by default, is provided to users capable of installing integrations, while the `USER` role can be granted to Vercel users with the Vercel `Billing` or Vercel `Viewer` role, which are considered to be Read-Only roles.",
  "globalUserId": "string",
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


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)
