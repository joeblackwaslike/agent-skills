---
title: create-resource-transfer
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/partner/create-resource-transfer
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/create-resource-transfer"
last_updated: 2026-06-29
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-flows
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about create-resource-transfer on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/create-resource-transfer.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "8a3a611687e81a574167be15aa28a621409570b6df8e00ebf202253eb699980f"
---

# Create Resources Transfer Request

**Status**: Optional

**When to implement**: Needed if your integration supports [transferring resources](/docs/integrations/create-integration/marketplace-flows#transfer-request-creation-flow) between Vercel teams. Vercel calls this endpoint when a user initiates a resource transfer. Update ownership records on your side.

```http
POST /v1/installations/{installationId}/resource-transfer-requests
```

Prepares to transfer resources from the current installation to a new one. The target installation to transfer resources to will not be known until the verify & accept steps.

## Authentication

**System Authentication**: 
This authentication uses the [OpenID Connect Protocol (OIDC)](https://auth0.com/docs/authenticate/protocols/openid-connect-protocol). Vercel sends a JSON web token (JWT) signed with Vercel’s private key and verifiable using Vercel’s public [JSON Web Key Sets](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets) (JWKS) available [here](https://marketplace.vercel.com/.well-known/jwks).

System Auth OIDC token claims schema:

```json type=jsonschema
{
  "type": "object",
  "properties": {
    "iss": {
      "type": "string",
      "enum": [
        "https://marketplace.vercel.com"
      ]
    },
    "sub": {
      "type": "string",
      "description": "Denotes the Account (or Team) who is making the change (matches `/^account:[0-9a-fA-F]+$/`), possibly null"
    },
    "aud": {
      "type": "string",
      "description": "The integration ID. Example: \"oac_9f4YG9JFjgKkRlxoaaGG0y05\""
    },
    "type": {
      "type": "string",
      "enum": [
        "access_token",
        "id_token"
      ],
      "description": "The type of the token: id_token or access_token."
    },
    "installation_id": {
      "type": "string",
      "nullable": true,
      "description": "The ID of the installation. Example: \"icfg_9bceb8ccT32d3U417ezb5c8p\""
    },
    "account_id": {
      "type": "string"
    }
  },
  "required": [
    "iss",
    "sub",
    "aud",
    "installation_id",
    "account_id"
  ],
  "additionalProperties": false
}
```


## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `installationId` | string | ✓ |  |

## Header Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `X-Vercel-Auth` | string |  | The auth style used in the request (system, user, etc) |
| `Idempotency-Key` | string |  | A unique key to identify a request across multiple retries |

## Request Body

The installation ID parameter is the source installation ID which owns the resources to be transferred.

**Content-Type**: `application/json`

```json
{
  "resourceIds": [ // required
"string"
  ],
  "expiresAt": "number" // required // The timestamp in milliseconds when the transfer claim expires. After this time, the transfer cannot be claimed.
}
```

## Responses

### 200

Claim created successfully

**Content-Type**: `application/json`

```json
{
  "providerClaimId": "string" // required // The provider-specific claim ID for the resource transfer.
}
```

### 400

Input has failed validation

**Content-Type**: `application/json`

```json
{
  "error": { // required
    "code": "string" // required,
    "message": "string" // required // System error message,
    "user": {
      "message": "string" // User-facing error message, if applicable,
      "url": "string" // URL to a user-facing help article, or a dashboard page for resolution, if applicable
    },
    "fields": [
      "key": "string" // required,
      "message": "string"
    ]
  }
}
```

### 403

Operation failed because the authentication is not allowed to perform this operation

**Content-Type**: `application/json`

```json
{
  "error": { // required
    "code": "string" // required,
    "message": "string" // required // System error message,
    "user": {
      "message": "string" // User-facing error message, if applicable,
      "url": "string" // URL to a user-facing help article, or a dashboard page for resolution, if applicable
    }
  }
}
```

### 409

Operation failed because of a conflict with the current state of the resource

**Content-Type**: `application/json`

```json
{
  "error": { // required
    "code": "string" // required,
    "message": "string" // required // System error message,
    "user": {
      "message": "string" // User-facing error message, if applicable,
      "url": "string" // URL to a user-facing help article, or a dashboard page for resolution, if applicable
    }
  }
}
```

### 422

Operation is well-formed, but cannot be executed due to semantic errors

**Content-Type**: `application/json`

```json
{
  "error": { // required
    "code": "string" // required,
    "message": "string" // required // System error message,
    "user": {
      "message": "string" // User-facing error message, if applicable,
      "url": "string" // URL to a user-facing help article, or a dashboard page for resolution, if applicable
    }
  }
}
```


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)
