---
title: provision-resource
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/partner/provision-resource
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/provision-resource"
last_updated: 2026-06-29
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-flows
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about provision-resource on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/provision-resource.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "108008a1e4961ade9008a9e2f2033198a1457c73e180bd87dbcec6f2612c5ca0"
---

# Provision Resource

**Status**: Required

**When to implement**: Vercel calls this endpoint when a customer [creates a resource](/docs/integrations/create-integration/marketplace-flows#create-a-storage-product-flow). Return secrets and connection info immediately, even if full provisioning is async. This is the only resource endpoint whose response includes secrets, which become environment variables on connected projects.

```http
POST /v1/installations/{installationId}/resources
```

Provisions a Resource. This is a synchronous operation but the provisioning can be asynchronous as the Resource does not need to be immediately available however the secrets must be known ahead of time.

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

## Header Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `X-Vercel-Auth` | string |  | The auth style used in the request (system, user, etc) |
| `Idempotency-Key` | string |  | A unique key to identify a request across multiple retries |

## Request Body

**Content-Type**: `application/json`

```json
{
  "productId": "string" // required // The partner-specific ID/slug of the product. Example: "redis",
  "name": "string" // required // User-inputted name for the resource.,
  "metadata": "object" // required // User-inputted metadata based on the registered metadata schema.,
  "billingPlanId": "string" // required // Partner-provided billing plan. Example: "pro200",
  "externalId": "string" // An partner-provided identifier used to indicate the source of the resource provisioning. In the Deploy Button flow, the `externalId` will equal the `external-id` query parameter.,
  "protocolSettings": {
    "experimentation": {
      "edgeConfigId": "string" // An Edge Config selected by the user for partners to push data into.
    }
  }
}
```

## Responses

### 200

Return the newly provisioned resource

**Content-Type**: `application/json`

```json
{
  "id": "string" // required // The partner-specific ID of the resource,
  "productId": "string" // required // The partner-specific ID/slug of the product. Example: "redis",
  "protocolSettings": {
    "experimentation": {
      "edgeConfigSyncingEnabled": "boolean" // Set to true when the user enabled the syncing.,
      "edgeConfigId": "string" // An Edge Config selected by the user for partners to push data into.,
      "edgeConfigTokenId": "string" // The ID of the token used to access the Edge Config.
    }
  },
  "billingPlan": {
    "id": "string" // required // Partner-provided billing plan. Example: "pro200",
    "type": "string" // required,
    "name": "string" // required // Name of the plan. Example: "Hobby",
    "scope": "string" // Plan scope. To use `installation` level billing plans, Installation-level Billing Plans must be enabled on your integration,
    "description": "string" // required // Example: "Use all you want up to 20G",
    "paymentMethodRequired": "boolean" // Only used if plan type is `subscription`. Set this field to `false` if this plan is completely free.,
    "preauthorizationAmount": "number" // Only used if plan type is `subscription` and `paymentMethodRequired` is `true`. The amount will be used to test if the user's payment method can handle the charge. Example: 10.53 for $10.53 USD. This amount will not be charged to the user, nor will it be reserved for later completion.,
    "initialCharge": "string" // Only used if plan type is `subscription` and `paymentMethodRequired` is `true`. The amount that the partner will invoice immediately at sign-up. Example: 20.00 for $20.00 USD.,
    "minimumAmount": "string" // Optional, ignored unless plan type is `prepayment`. The minimum amount of credits a user can purchase at a time. The value is a decimal string representation of the USD amount, e.g. "4.39" for $4.39 USD as the minumum amount.,
    "maximumAmount": "string" // Optional, ignored unless plan type is `prepayment`. The maximum amount of credits a user can purchase at a time. The value is a decimal string representation of the USD amount, e.g. "86.82" for $86.82 USD as the maximum amount.,
    "maximumAmountAutoPurchasePerPeriod": "string" // Optional, ignored unless plan type is `prepayment`. The maximum amount of credits the system can auto-purchase in any period (month). The value is a decimal string representation of the USD amount, e.g. "86.82" for $86.82 USD as the maximum amount.,
    "cost": "string" // Plan's cost, if available. Only relevant for fixed-cost plans. Example: "$20.00/month",
    "details": [
      "label": "string" // required,
      "value": "string"
    ],
    "highlightedDetails": [
      "label": "string" // required,
      "value": "string"
    ],
    "quote": [
      "line": "string" // required,
      "amount": "string" // required
    ],
    "effectiveDate": "string" // Date/time when the plan becomes effective. Important for billing plan changes.,
    "disabled": "boolean" // If true, the plan is disabled and cannot be selected. Example: "disabled": true` for "Hobby" plan.
  },
  "name": "string" // required // User-inputted name for the resource.,
  "metadata": "object" // required // User-inputted metadata based on the registered metadata schema.,
  "status": "string" // required,
  "notification": {
    "level": "string" // required,
    "title": "string" // required,
    "message": "string",
    "href": "string" // Absolute or SSO URL. Allowed schemes: http://, https://, sso:. SSO URLs start with "sso:".
  },
  "secrets": [ // required
    "name": "string" // required // Name of the secret,
    "value": "string" // required // Value of the secret,
    "prefix": "string" // Deprecated,
    "environmentOverrides": {
      "development": "string" // Value for development environment,
      "preview": "string" // Value for preview environment,
      "production": "string" // Value for production environment
    }
  ]
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


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)
