---
title: get-invoice
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/get-invoice
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-invoice"
last_updated: 2026-06-15
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about get-invoice on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-invoice.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "6db74e1333bc645d6c61510db0465398225bb671b40af882d6130cdfc5027993"
---

# Get Invoice

```http
GET /v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}
```

Get Invoice details and status for a given invoice ID.<br/> <br/> See [Billing Events with Webhooks documentation](https://vercel.com/docs/integrations/create-integration/marketplace-api#working-with-billing-events-through-webhooks) on how to receive invoice events. This endpoint is used to retrieve the invoice details.

## Authentication

**bearerToken**: Default authentication mechanism

## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationConfigurationId` | string | ✓ |  |
| `invoiceId` | string | ✓ |  |

## Responses

### 200

Success

**Content-Type**: `application/json`

```json
{
  "test": "boolean" // Whether the invoice is in the testmode (no real transaction created).,
  "invoiceId": "string" // required // Vercel Marketplace Invoice ID.,
  "externalId": "string" // Partner-supplied Invoice ID, if applicable.,
  "state": "string" // required // Invoice state.,
  "invoiceNumber": "string" // User-readable invoice number.,
  "invoiceDate": "string" // required // Invoice date. ISO 8601 timestamp.,
  "period": { // required
    "start": "string" // required,
    "end": "string" // required
  },
  "paidAt": "string" // Moment the invoice was paid. ISO 8601 timestamp.,
  "refundedAt": "string" // Most recent moment the invoice was refunded. ISO 8601 timestamp.,
  "memo": "string" // Additional memo for the invoice.,
  "items": [ // required
    "billingPlanId": "string" // required // Partner's billing plan ID.,
    "resourceId": "string" // Partner's resource ID. If not specified, indicates installation-wide item.,
    "start": "string" // Start and end are only needed if different from the period's start/end. ISO 8601 timestamp.,
    "end": "string" // Start and end are only needed if different from the period's start/end. ISO 8601 timestamp.,
    "name": "string" // required // Invoice item name.,
    "details": "string" // Additional item details.,
    "price": "string" // required // Item price. A dollar-based decimal string.,
    "quantity": "number" // required // Item quantity.,
    "units": "string" // required // Units for item's quantity.,
    "total": "string" // required // Item total. A dollar-based decimal string.
  ],
  "discounts": [
    "billingPlanId": "string" // required // Partner's billing plan ID.,
    "resourceId": "string" // Partner's resource ID. If not specified, indicates installation-wide discount.,
    "start": "string" // Start and end are only needed if different from the period's start/end. ISO 8601 timestamp.,
    "end": "string" // Start and end are only needed if different from the period's start/end. ISO 8601 timestamp.,
    "name": "string" // required // Discount name.,
    "details": "string" // Additional discount details.,
    "amount": "string" // required // Discount amount. A dollar-based decimal string.
  ],
  "total": "string" // required // Invoice total amount. A dollar-based decimal string.,
  "refundReason": "string" // The reason for refund. Only applicable for states "refunded" or "refund_request".,
  "refundTotal": "string" // Refund amount. Only applicable for states "refunded" or "refund_request". A dollar-based decimal string.,
  "created": "string" // required // System creation date. ISO 8601 timestamp.,
  "updated": "string" // required // System update date. ISO 8601 timestamp.
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
