---
title: submit-prepayment-balances
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/submit-prepayment-balances
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/submit-prepayment-balances"
last_updated: 2026-06-22
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about submit-prepayment-balances on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/submit-prepayment-balances.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "5e587374e543302557eb22ccec04e3b81209ff500a5a06fb928bb98cf7520b95"
---

# Submit Prepayment Balances

```http
POST /v1/installations/{integrationConfigurationId}/billing/balance
```

Sends the prepayment balances. The partner should do this at least once a day and ideally once per hour. <br/> Use the `credentials.access_token` we provided in the [Upsert Installation](#upsert-installation) body to authorize this request.

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
  "timestamp": "string" // required // Server time of your integration, used to determine the most recent data for race conditions & updates. Only the latest usage data for a given day, week, and month will be kept.,
  "balances": [ // required
    "resourceId": "string" // Partner's resource ID, exclude if credits are tied to the installation and not an individual resource.,
    "credit": "string" // A human-readable description of the credits the user currently has, e.g. "2,000 Tokens",
    "nameLabel": "string" // The name of the credits, for display purposes, e.g. "Tokens",
    "currencyValueInCents": "number" // required // The dollar value of the credit balance, in USD and provided in cents, which is used to trigger automatic purchase thresholds.
  ]
}
```

## Responses

### 201

Success

### 400

One of the provided values in the request body is invalid.
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
