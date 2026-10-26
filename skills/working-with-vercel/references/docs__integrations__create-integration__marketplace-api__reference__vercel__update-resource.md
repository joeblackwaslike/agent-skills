---
title: update-resource
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/update-resource
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/update-resource"
last_updated: 2026-10-26
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about update-resource on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/update-resource.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "cad1e0f99b030881de0540b7ac7f3a7a9b535882cf1c8f33b9614932d51e688c"
---

# Update Resource

```http
PATCH /v1/installations/{integrationConfigurationId}/resources/{resourceId}
```

This endpoint updates an existing resource in the installation. All parameters are optional, allowing partial updates.

## Authentication

**bearerToken**: Default authentication mechanism

## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationConfigurationId` | string | ✓ |  |
| `resourceId` | string | ✓ |  |

## Request Body

**Content-Type**: `application/json`

```json
{
  "ownership": "string",
  "name": "string",
  "status": "string",
  "metadata": "object",
  "billingPlan": {
    "id": "string" // required,
    "type": "string" // required,
    "name": "string" // required,
    "description": "string",
    "paymentMethodRequired": "boolean",
    "cost": "string",
    "details": [
      "label": "string" // required,
      "value": "string"
    ],
    "highlightedDetails": [
      "label": "string" // required,
      "value": "string"
    ],
    "effectiveDate": "string"
  },
  "notification": "value",
  "extras": "object",
  "secrets": "value",
  "customClaims": {
    "roles": [
"string"
    ],
    "defaultRole": "string" // Role used when the deployment does not request one. Required when `roles` is set.,
    "claimRules": [
      "when": {
        "role": [
"string"
        ],
        "environment": [
"string"
        ]
      },
      "claims": "object" // required // Claims to set (string, number, boolean, or array of strings), shallow-merged over earlier rules and over the default claims. `null` removes a claim. Reserved claims cannot be set; `aud` and `sub` can be overridden with a string but not removed.
    ]
  }
}
```

## Responses

### 200

Success

**Content-Type**: `application/json`

```json
{
  "name": "string" // required
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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
