---
title: submit-billing-data
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/submit-billing-data
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/submit-billing-data"
last_updated: 2026-06-29
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about submit-billing-data on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/submit-billing-data.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "13deb84f4bfa420529a4e7f51d42e45642fdd652807e69d93221e10f48dfc326"
---

# Submit Billing Data

```http
POST /v1/installations/{integrationConfigurationId}/billing
```

Sends the billing and usage data. The partner should do this at least once a day and ideally once per hour. <br/> Use the `credentials.access_token` we provided in the [Upsert Installation](#upsert-installation) body to authorize this request.

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
  "eod": "string" // required // End of Day, the UTC datetime for when the end of the billing/usage day is in UTC time. This tells us which day the usage data is for, and also allows for your "end of day" to be different from UTC 00:00:00. eod must be within the period dates, and cannot be older than 24h earlier from our server's current time.,
  "period": { // required
    "start": "string" // required,
    "end": "string" // required
  },
  "billing": "value" // required // Billing data (interim invoicing data).,
  "usage": [ // required
    "resourceId": "string" // Partner's resource ID.,
    "name": "string" // required // Metric name.,
    "type": "string" // required // 
              Type of the metric.
              - total: measured total value, such as Database size
              - interval: usage during the period, such as i/o or number of queries.
              - rate: rate of usage, such as queries per second.
            ,
    "units": "string" // required // Metric units. Example: "GB",
    "dayValue": "number" // required // Metric value for the day. Could be a final or an interim value for the day.,
    "periodValue": "number" // required // Metric value for the billing period. Could be a final or an interim value for the period.,
    "planValue": "number" // The limit value of the metric for a billing period, if a limit is defined by the plan.
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
