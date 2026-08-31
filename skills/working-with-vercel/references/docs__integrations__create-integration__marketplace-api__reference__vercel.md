---
title: Marketplace Vercel API Reference
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel"
last_updated: 2026-08-31
type: reference
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference/vercel/update-installation
  - /docs/integrations/create-integration/marketplace-api/reference/vercel/get-account-info
  - /docs/integrations/create-integration/marketplace-api/reference/vercel/get-member
  - /docs/integrations/create-integration/marketplace-api/reference/vercel/rotate-installation-credential
  - /docs/integrations/create-integration/marketplace-api/reference/vercel/revoke-installation-credential
summary: Learn how to call Vercel API endpoints to interact with Vercel resources
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "604e0227f0eb2135bc3c44503e6abc33ba178aac0ba0a3e35719c7ef7b4142fb"
---

# Vercel API Reference

Vercel combines the best developer experience with an obsessive focus on end-user performance. Our platform enables frontend teams to do their best work.

## Authentication

**bearerToken**: Default authentication mechanism

## Endpoints

### Marketplace

| Method | Endpoint | Description |
|--------|----------|-------------|
| **PATCH** | [`/v1/installations/{integrationConfigurationId}`](/docs/integrations/create-integration/marketplace-api/reference/vercel/update-installation) | Update Installation |
| **GET** | [`/v1/installations/{integrationConfigurationId}/account`](/docs/integrations/create-integration/marketplace-api/reference/vercel/get-account-info) | Get Account Information |
| **GET** | [`/v1/installations/{integrationConfigurationId}/member/{memberId}`](/docs/integrations/create-integration/marketplace-api/reference/vercel/get-member) | Get Member Information |
| **POST** | [`/v1/installations/{integrationConfigurationId}/credentials/rotate`](/docs/integrations/create-integration/marketplace-api/reference/vercel/rotate-installation-credential) | Rotate Installation Credential |
| **POST** | [`/v1/installations/{integrationConfigurationId}/credentials/revoke`](/docs/integrations/create-integration/marketplace-api/reference/vercel/revoke-installation-credential) | Revoke Installation Credential |
| **POST** | [`/v1/installations/{integrationConfigurationId}/events`](/docs/integrations/create-integration/marketplace-api/reference/vercel/create-event) | Create Event |
| **GET** | [`/v1/installations/{integrationConfigurationId}/resources`](/docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resources) | Get Integration Resources |
| **GET** | [`/v1/installations/{integrationConfigurationId}/resources/{resourceId}`](/docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resource) | Get Integration Resource |
| **PUT** | [`/v1/installations/{integrationConfigurationId}/resources/{resourceId}`](/docs/integrations/create-integration/marketplace-api/reference/vercel/import-resource) | Import Resource |
| **PATCH** | [`/v1/installations/{integrationConfigurationId}/resources/{resourceId}`](/docs/integrations/create-integration/marketplace-api/reference/vercel/update-resource) | Update Resource |
| **DELETE** | [`/v1/installations/{integrationConfigurationId}/resources/{resourceId}`](/docs/integrations/create-integration/marketplace-api/reference/vercel/delete-integration-resource) | Delete Integration Resource |
| **POST** | [`/v1/installations/{integrationConfigurationId}/billing`](/docs/integrations/create-integration/marketplace-api/reference/vercel/submit-billing-data) | Submit Billing Data |
| **POST** | [`/v1/installations/{integrationConfigurationId}/billing/invoices`](/docs/integrations/create-integration/marketplace-api/reference/vercel/submit-invoice) | Submit Invoice |
| **POST** | [`/v1/installations/{integrationConfigurationId}/billing/finalize`](/docs/integrations/create-integration/marketplace-api/reference/vercel/finalize-installation) | Finalize Installation |
| **GET** | [`/v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}`](/docs/integrations/create-integration/marketplace-api/reference/vercel/get-invoice) | Get Invoice |
| **POST** | [`/v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}/actions`](/docs/integrations/create-integration/marketplace-api/reference/vercel/update-invoice) | Invoice Actions |
| **POST** | [`/v1/installations/{integrationConfigurationId}/billing/balance`](/docs/integrations/create-integration/marketplace-api/reference/vercel/submit-prepayment-balances) | Submit Prepayment Balances |
| **PUT** | [`/v1/installations/{integrationConfigurationId}/resources/{resourceId}/secrets`](/docs/integrations/create-integration/marketplace-api/reference/vercel/update-resource-secrets-by-id) | Update Resource Secrets |
| **POST** | [`/v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items`](/docs/integrations/create-integration/marketplace-api/reference/vercel/post-v1-installations-resources-experimentation-items) | Create one or multiple experimentation items |
| **PATCH** | [`/v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items/{itemId}`](/docs/integrations/create-integration/marketplace-api/reference/vercel/patch-v1-installations-resources-experimentation-items) | Patch an existing experimentation item |
| **DELETE** | [`/v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items/{itemId}`](/docs/integrations/create-integration/marketplace-api/reference/vercel/delete-v1-installations-resources-experimentation-items) | Delete an existing experimentation item |
| **GET** | [`/v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/global-config`](/docs/integrations/create-integration/marketplace-api/reference/vercel/get-v1-installations-resources-experimentation-global-config) | Get the data of a user-provided Global Config |
| **PUT** | [`/v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/global-config`](/docs/integrations/create-integration/marketplace-api/reference/vercel/put-v1-installations-resources-experimentation-global-config) | Push data into a user-provided Global Config |
| **HEAD** | [`/v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/global-config`](/docs/integrations/create-integration/marketplace-api/reference/vercel/head-v1-installations-resources-experimentation-global-config) | Get the data of a user-provided Global Config |

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | [`/v1/integrations/sso/token`](/docs/integrations/create-integration/marketplace-api/reference/vercel/exchange-sso-token) | SSO Token Exchange |

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)
- [Native Integration Flows](/docs/integrations/marketplace-flows)
- [Partner API Reference](/docs/integrations/create-integration/marketplace-api/reference/partner)


---

[View full sitemap](/docs/sitemap)
