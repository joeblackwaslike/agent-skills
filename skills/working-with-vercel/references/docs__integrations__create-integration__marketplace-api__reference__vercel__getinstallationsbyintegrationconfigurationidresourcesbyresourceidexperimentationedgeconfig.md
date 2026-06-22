---
title: getinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationedgeconfig
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/getinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationedgeconfig
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/getinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationedgeconfig"
last_updated: 2026-06-22
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about getinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationedgeconfig on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/getinstallationsbyintegrationconfigurationidresourcesbyresourceidexperimentationedgeconfig.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "b441e11d417e8e009c28c251ec2751ed28a031167dd6b0aa12073181a13626d9"
---

# Get the data of a user-provided Edge Config

```http
GET /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/edge-config
```

When the user enabled Edge Config syncing, then this endpoint can be used by the partner to fetch the contents of the Edge Config.

## Authentication

**bearerToken**: Default authentication mechanism

## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationConfigurationId` | string | ✓ |  |
| `resourceId` | string | ✓ |  |

## Responses

### 200

The Edge Config data

**Content-Type**: `application/json`

```json
{
  "items": "object" // required,
  "updatedAt": "number" // required,
  "digest": "string" // required,
  "purpose": "string"
}
```

### 304

Success

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
