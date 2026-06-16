---
title: Marketplace Partner API
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/partner
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner"
last_updated: 2026-06-15
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference/partner/get-installation
  - /docs/integrations/create-integration/marketplace-api/reference/partner/upsert-installation
  - /docs/integrations/create-integration/marketplace-api/reference/partner/update-installation
  - /docs/integrations/create-integration/marketplace-api/reference/partner/delete-installation
  - /docs/integrations/create-integration/marketplace-api/reference/partner/provision-resource
summary: Learn about marketplace partner api on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "46876d1668e8dc74c4ba45d1af9d0eff4545ec2f68c2b65eabebc75ed892f01e"
---

# Partner API Reference

The API Vercel Marketplace Partner's must implement to become a Marketplace Integration. See [our documentation](https://vercel-site-git-marketplace-product.vercel.sh/docs/integrations/marketplace-api#submit-invoice-response) for more help

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


## Endpoints

### Installations

API related to Installation operations

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| **GET** | [`/v1/installations/{installationId}`](/docs/integrations/create-integration/marketplace-api/reference/partner/get-installation) | Optional | Get Installation |
| **PUT** | [`/v1/installations/{installationId}`](/docs/integrations/create-integration/marketplace-api/reference/partner/upsert-installation) | Required | Upsert Installation |
| **PATCH** | [`/v1/installations/{installationId}`](/docs/integrations/create-integration/marketplace-api/reference/partner/update-installation) | Optional | Update Installation |
| **DELETE** | [`/v1/installations/{installationId}`](/docs/integrations/create-integration/marketplace-api/reference/partner/delete-installation) | Required | Delete Installation |

### Resources

API related to Resource operations

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| **POST** | [`/v1/installations/{installationId}/resources`](/docs/integrations/create-integration/marketplace-api/reference/partner/provision-resource) | Required | Provision Resource |
| **GET** | [`/v1/installations/{installationId}/resources/{resourceId}`](/docs/integrations/create-integration/marketplace-api/reference/partner/get-resource) | Required | Get Resource |
| **PATCH** | [`/v1/installations/{installationId}/resources/{resourceId}`](/docs/integrations/create-integration/marketplace-api/reference/partner/update-resource) | Optional | Update Resource |
| **DELETE** | [`/v1/installations/{installationId}/resources/{resourceId}`](/docs/integrations/create-integration/marketplace-api/reference/partner/delete-resource) | Required | Delete Resource |
| **POST** | [`/v1/installations/{installationId}/resources/{resourceId}/secrets/rotate`](/docs/integrations/create-integration/marketplace-api/reference/partner/request-secrets-rotation) | Optional | Request Secrets Rotation |
| **POST** | [`/v1/installations/{installationId}/resources/{resourceId}/repl`](/docs/integrations/create-integration/marketplace-api/reference/partner/resource-repl) | Optional | Resource REPL |

### Billing

API related to Billing operations

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| **GET** | [`/v1/products/{productSlug}/plans`](/docs/integrations/create-integration/marketplace-api/reference/partner/list-billing-plans-for-product) | Required | List Billing Plans For Product |
| **GET** | [`/v1/installations/{installationId}/resources/{resourceId}/plans`](/docs/integrations/create-integration/marketplace-api/reference/partner/list-billing-plans-for-resource) | Optional | List Billing Plans For Resource |
| **GET** | [`/v1/installations/{installationId}/plans`](/docs/integrations/create-integration/marketplace-api/reference/partner/list-billing-plans-for-installation) | Optional | List Billing Plans For Installation |
| **POST** | [`/v1/installations/{installationId}/billing/provision`](/docs/integrations/create-integration/marketplace-api/reference/partner/provision-purchase) | Optional | Provision Purchase |

### Transfers

API related to Transfer operations

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| **POST** | [`/v1/installations/{installationId}/resource-transfer-requests`](/docs/integrations/create-integration/marketplace-api/reference/partner/create-resource-transfer) | Optional | Create Resources Transfer Request |
| **GET** | [`/v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/verify`](/docs/integrations/create-integration/marketplace-api/reference/partner/verify-resource-transfer) | Unknown | Validate Resources Transfer Request |
| **POST** | [`/v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/accept`](/docs/integrations/create-integration/marketplace-api/reference/partner/accept-resource-transfer) | Unknown | Accept Resources Transfer Request |

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)
- [Native Integration Flows](/docs/integrations/marketplace-flows)
- [Vercel API Reference](/docs/integrations/create-integration/marketplace-api/reference/vercel)


---

[View full sitemap](/docs/sitemap)
