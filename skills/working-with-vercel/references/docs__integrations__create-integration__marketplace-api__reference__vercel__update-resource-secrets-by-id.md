---
title: update-resource-secrets-by-id
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/update-resource-secrets-by-id
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/update-resource-secrets-by-id"
last_updated: 2026-06-15
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about update-resource-secrets-by-id on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/update-resource-secrets-by-id.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "80f9362f3cb42c6812c32e45f8315cbc3bb9a5b4772186e4e56280c877c4c37f"
---

# Update Resource Secrets

```http
PUT /v1/installations/{integrationConfigurationId}/resources/{resourceId}/secrets
```

This endpoint updates the secrets of a resource. If a resource has projects connected, the connected secrets are updated with the new secrets. The old secrets may still be used by existing connected projects because they are not automatically redeployed. Redeployment is a manual action and must be completed by the user. All new project connections will use the new secrets.<br/> <br/> Use cases for this endpoint:<br/> <br/> - Resetting the credentials of a database in the partner. If the user requests the credentials to be updated in the partner’s application, the partner post the new set of secrets to Vercel, the user should redeploy their application and the expire the old credentials.<br/>

## Authentication

**bearerToken**: Default authentication mechanism

## Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationConfigurationId` | string | ✓ |  |
| `resourceId` | string | ✓ |  |

## Request Body

**Content-Type**: `application/json`

```json
{
  "secrets": [ // required
    "name": "string" // required,
    "value": "string" // required,
    "prefix": "string",
    "environmentOverrides": {
      "development": "string" // Value used for development environment.,
      "preview": "string" // Value used for preview environment.,
      "production": "string" // Value used for production environment.
    }
  ],
  "partial": "boolean" // If true, will only overwrite the provided secrets instead of replacing all secrets.
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

### 409

Success

### 422

Success


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)
