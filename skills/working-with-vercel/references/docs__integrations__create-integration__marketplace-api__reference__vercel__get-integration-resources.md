---
title: get-integration-resources
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resources
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resources"
last_updated: 2026-06-29
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about get-integration-resources on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resources.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "eff9438a82723edc36e5c2fd25f74e5d2f5fe09fffafab3ce55f97db1a8de82d"
---

# Get Integration Resources

```http
GET /v1/installations/{integrationConfigurationId}/resources
```

Get all resources for a given installation ID.

## Authentication

**bearerToken**: Default authentication mechanism

## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationConfigurationId` | string | ✓ |  |

## Responses

### 200

Success

**Content-Type**: `application/json`

```json
{
  "resources": [ // required
    "partnerId": "string" // required // The ID provided by the partner for the given resource,
    "internalId": "string" // required // The ID assigned by Vercel for the given resource,
    "name": "string" // required // The name of the resource as it is recorded in Vercel,
    "status": "string" // The current status of the resource,
    "productId": "string" // required // The ID of the product the resource is derived from,
    "protocolSettings": {
      "experimentation": {
        "edgeConfigSyncingEnabled": "boolean",
        "edgeConfigId": "string",
        "edgeConfigTokenId": "string"
      }
    },
    "notification": {
      "level": "string" // required,
      "title": "string" // required,
      "message": "string",
      "href": "string"
    },
    "billingPlanId": "string" // The ID of the billing plan the resource is subscribed to, if applicable,
    "metadata": "object" // The configured metadata for the resource as defined by its product's Metadata Schema
  ]
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
