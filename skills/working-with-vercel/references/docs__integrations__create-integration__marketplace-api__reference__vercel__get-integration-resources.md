---
title: get-integration-resources
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resources
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resources"
last_updated: 2026-09-21
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about get-integration-resources on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resources.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "809c7794b8c9d3f18fa848adae6d7235554cd89215daeaf2cb5de39ef82f458a"
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
    "billingPlanId": "string" // The ID of the billing plan the resource is subscribed to, if applicable,
    "internalId": "string" // required // The ID assigned by Vercel for the given resource,
    "metadata": "object" // The configured metadata for the resource as defined by its product's Metadata Schema,
    "name": "string" // required // The name of the resource as it is recorded in Vercel,
    "notification": {
      "href": "string",
      "level": "string" // required,
      "message": "string",
      "title": "string" // required
    },
    "partnerId": "string" // required // The ID provided by the partner for the given resource,
    "productId": "string" // required // The ID of the product the resource is derived from,
    "protocolSettings": {
      "authentication": {
        "appUrls": [
          "target": "string" // required,
          "url": "string" // required
        ]
      },
      "experimentation": {
        "edgeConfigId": "string",
        "edgeConfigSyncingEnabled": "boolean",
        "edgeConfigTokenId": "string",
        "globalConfigId": "string",
        "globalConfigSyncingEnabled": "boolean"
      }
    },
    "status": "string" // The current status of the resource
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
