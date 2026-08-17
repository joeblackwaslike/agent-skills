---
title: get-integration-resources
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resources
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resources"
last_updated: 2026-08-17
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about get-integration-resources on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resources.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "ae32473fc4b69c0c817f0701413e50ff192c30d18b5f4616fda3fd95003011f7"
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
        "globalConfigId": "string",
        "globalConfigSyncingEnabled": "boolean",
        "edgeConfigTokenId": "string"
      },
      "authentication": {
        "appUrls": [
          "url": "string" // required,
          "target": "string" // required
        ]
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

### 410

Success


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)
