---
title: resource-repl
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/partner/resource-repl
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/resource-repl"
last_updated: 2026-06-29
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about resource-repl on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/resource-repl.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "04b2f7b7e588da420e48a8b988a5e08ea81751e61b1e833cdc567bce5b29fbde"
---

# Resource REPL

**Status**: Optional

**When to implement**: Needed if your integration provides an interactive console or REPL experience. Vercel calls this endpoint to run commands or queries against a resource from the dashboard.

```http
POST /v1/installations/{installationId}/resources/{resourceId}/repl
```

The REPL is a command-line interface on the Store Details page that allows customers to directly interact with their resource. This endpoint is used to run commands on a specific resource.

## Authentication

**User Authentication**: 
This authentication uses the [OpenID Connect Protocol (OIDC)](https://auth0.com/docs/authenticate/protocols/openid-connect-protocol). Vercel sends a JSON web token (JWT) signed with Vercel’s private key and verifiable using Vercel’s public [JSON Web Key Sets](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets) (JWKS) available [here](https://marketplace.vercel.com/.well-known/jwks).

User Auth OIDC token claims schema:

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
    "account_id": {
      "type": "string"
    },
    "sub": {
      "type": "string",
      "description": "Denotes the User who is making the change (matches `/^account:[0-9a-fA-F]+:user:[0-9a-fA-F]+$/`)"
    },
    "installation_id": {
      "type": "string",
      "description": "The ID of the installation. Example: \"icfg_9bceb8ccT32d3U417ezb5c8p\""
    },
    "user_id": {
      "type": "string"
    },
    "user_role": {
      "type": "string",
      "enum": [
        "ADMIN",
        "USER"
      ],
      "description": "The `ADMIN` role, by default, is provided to users capable of installing integrations, while the `USER` role can be granted to Vercel users with the Vercel `Billing` or Vercel `Viewer` role, which are considered to be Read-Only roles."
    },
    "user_email": {
      "type": "string",
      "description": "The user's verified email address. This is included for all Marketplace integrations by default."
    },
    "user_name": {
      "type": "string",
      "description": "The user's real name"
    },
    "user_avatar_url": {
      "type": "string",
      "description": "The user's public avatar URL"
    }
  },
  "required": [
    "iss",
    "aud",
    "account_id",
    "sub",
    "installation_id",
    "user_id",
    "user_role"
  ],
  "additionalProperties": false
}
```


## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `installationId` | string | ✓ |  |
| `resourceId` | string | ✓ |  |

## Header Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `X-Vercel-Auth` | string |  | The auth style used in the request (system, user, etc) |
| `Idempotency-Key` | string |  | A unique key to identify a request across multiple retries |

## Request Body

**Content-Type**: `application/json`

```json
{
  "input": "string" // required,
  "readOnly": "boolean"
}
```

## Responses

### 200

Return result of running REPL command

**Content-Type**: `application/json`

  "value"
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


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)
