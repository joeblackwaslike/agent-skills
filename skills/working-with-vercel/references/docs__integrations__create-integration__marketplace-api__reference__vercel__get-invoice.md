---
title: get-invoice
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/get-invoice
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-invoice"
last_updated: 2026-10-26
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about get-invoice on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-invoice.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "926059d6c78d02c7846d264f54af01e6da690fed9aba8b3f367778e98352289a"
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
  "created": "string" // required // System creation date. ISO 8601 timestamp.,
  "discounts": [
    "amount": "string" // required // Discount amount. A dollar-based decimal string.,
    "billingPlanId": "string" // required // Partner's billing plan ID.,
    "details": "string" // Additional discount details.,
    "end": "string" // Start and end are only needed if different from the period's start/end. ISO 8601 timestamp.,
    "name": "string" // required // Discount name.,
    "resourceId": "string" // Partner's resource ID. If not specified, indicates installation-wide discount.,
    "start": "string" // Start and end are only needed if different from the period's start/end. ISO 8601 timestamp.
  ],
  "externalId": "string" // Partner-supplied Invoice ID, if applicable.,
  "invoiceDate": "string" // required // Invoice date. ISO 8601 timestamp.,
  "invoiceId": "string" // required // Vercel Marketplace Invoice ID.,
  "invoiceNumber": "string" // User-readable invoice number.,
  "items": [ // required
    "billingPlanId": "string" // required // Partner's billing plan ID.,
    "details": "string" // Additional item details.,
    "end": "string" // Start and end are only needed if different from the period's start/end. ISO 8601 timestamp.,
    "name": "string" // required // Invoice item name.,
    "price": "string" // required // Item price. A dollar-based decimal string.,
    "quantity": "number" // required // Item quantity.,
    "resourceId": "string" // Partner's resource ID. If not specified, indicates installation-wide item.,
    "start": "string" // Start and end are only needed if different from the period's start/end. ISO 8601 timestamp.,
    "total": "string" // required // Item total. A dollar-based decimal string.,
    "units": "string" // required // Units for item's quantity.
  ],
  "memo": "string" // Additional memo for the invoice.,
  "outstandingTotal": "string" // Amount still owed on the invoice, per the payment processor. Can be positive even for states "refunded" or "refund_requested", since a refund does not settle an unpaid remainder. A dollar-based decimal string. Absent when no payment data is available yet.,
  "paidAt": "string" // Moment the invoice was paid. ISO 8601 timestamp.,
  "paidTotal": "string" // Total amount paid and retained: payments received minus refunds applied. A dollar-based decimal string. Absent when no payment data is available yet.,
  "pendingRefundTotal": "string" // Requested refund amount not yet applied by the payment processor: "refundTotal" minus "refundedTotal". A dollar-based decimal string. Only present when a refund was requested or applied.,
  "period": { // required
    "end": "string" // required,
    "start": "string" // required
  },
  "refundedAt": "string" // Most recent moment the invoice was refunded. ISO 8601 timestamp.,
  "refundedTotal": "string" // Total refund amount applied by the payment processor, on the same pre-tax basis as "refundTotal". Counts both money returned and debt cancelled on unpaid invoices. May be lower than "refundTotal", which is the requested amount. A dollar-based decimal string. Only present when a refund was requested or applied.,
  "refundReason": "string" // The reason for refund. Only present when a refund has been requested.,
  "refundTotal": "string" // Total refund amount requested. Only present when a refund has been requested. A dollar-based decimal string.,
  "state": "string" // required // Invoice state. Reports the payment state of the invoice; refund progress is reported separately via "refundedTotal" and "pendingRefundTotal". The states "refunded" and "refund_requested" only appear when the payment state cannot be determined.,
  "test": "boolean" // Whether the invoice is in the testmode (no real transaction created).,
  "total": "string" // required // Invoice total amount. A dollar-based decimal string.,
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

### 410

Success

### 429

Success


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
