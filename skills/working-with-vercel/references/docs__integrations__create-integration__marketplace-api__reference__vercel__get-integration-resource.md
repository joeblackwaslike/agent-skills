---
title: get-integration-resource
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resource
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resource"
last_updated: 2026-09-21
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about get-integration-resource on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resource.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "d07240cdf3d13480f52474a7cc5a1006dd6f571d052d1441bfe0814f9b9162b1"
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
  "billingPlanId": "string" // The ID of the billing plan the resource is subscribed to, if applicable,
  "id": "string" // required // The ID provided by the 3rd party provider for the given resource,
  "internalId": "string" // required // The ID assigned by Vercel for the given resource,
  "metadata": "object" // The configured metadata for the resource as defined by its product's Metadata Schema,
  "name": "string" // required // The name of the resource as it is recorded in Vercel,
  "notification": {
    "href": "string",
    "level": "string" // required,
    "message": "string",
    "title": "string" // required
  },
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
      "globalConfigId": "string"
    }
  },
  "status": "string" // The current status of the resource
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
