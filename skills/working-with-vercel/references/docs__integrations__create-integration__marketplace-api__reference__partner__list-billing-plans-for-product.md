---
title: list-billing-plans-for-product
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/partner/list-billing-plans-for-product
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/list-billing-plans-for-product"
last_updated: 2026-06-22
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-flows
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about list-billing-plans-for-product on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/list-billing-plans-for-product.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "75f26a1121536383dfd03202398b702f283970fc8ce2c90414ea0b64b8cf30f2"
---

# List Billing Plans For Product

**Status**: Required

**When to implement**: Vercel calls this endpoint to [display available plans](/docs/integrations/create-integration/marketplace-flows#select-billing-plan) when a customer creates a resource. Vercel may call it before any installation exists, so the OIDC token may not include an account ID. Return the list of plans with their pricing, features, and any usage limits.

```http
GET /v1/products/{productSlug}/plans
```

Vercel sends a request to the partner to return quotes for different billing plans for a specific Product.

Note: You can have this request triggered by Vercel before the integration is installed when the Product is created for the first time. In this case, OIDC will be incomplete and will not contain an account ID.

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
| `productSlug` | string | ✓ |  |

## Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `metadata` | string |  |  |

## Header Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `X-Vercel-Auth` | string |  | The auth style used in the request (system, user, etc) |

## Responses

### 200

Return a list of billing plans

**Content-Type**: `application/json`

```json
{
  "plans": [ // required
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
