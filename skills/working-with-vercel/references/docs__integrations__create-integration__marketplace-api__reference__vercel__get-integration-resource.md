---
title: get-integration-resource
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resource
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resource"
last_updated: 2026-06-22
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about get-integration-resource on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resource.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "0c0601ee5ccac4225020849eb024ef4b051e99a28911ddb6998bf22915926591"
---

# Get Integration Resource

```http
GET /v1/installations/{integrationConfigurationId}/resources/{resourceId}
```

Get a resource by its partner ID.

## Authentication

**bearerToken**: Default authentication mechanism

## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationConfigurationId` | string | ✓ | The ID of the integration configuration (installation) the resource belongs to |
| `resourceId` | string | ✓ | The ID provided by the 3rd party provider for the given resource |

## Responses

### 200

Success

**Content-Type**: `application/json`

```json
{
  "id": "string" // required // The ID provided by the 3rd party provider for the given resource,
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
