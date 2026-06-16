---
title: Integration Approval Checklist
product: vercel
url: /docs/integrations/create-integration/approval-checklist
canonical_url: "https://vercel.com/docs/integrations/create-integration/approval-checklist"
last_updated: 2026-04-07
type: reference
prerequisites:
  - /docs/integrations/create-integration
  - /docs/integrations
related:
  - /docs/integrations/create-integration/native-integration
  - /docs/integrations/create-integration/marketplace-api
  - /docs/integrations/create-integration
summary: Review this checklist before submitting your native or connectable account integration for approval on the Vercel Marketplace.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/approval-checklist.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "2ba41da972dcebce8ce124c54309018e4fb3c39c672363fdf1ecd1e8045fe66d"
---

# Integration Approval Checklist

Before submitting your integration for review, work through the checklist that matches your integration type:

- [Native integration](#native-integrations): Uses the Marketplace API and an integration server.
- [Connectable account integration](#connectable-account-integrations): Uses a redirect URL and OAuth flow.

Complete the relevant checklist, then email integrations@vercel.com with your request to be reviewed.

## Native integrations

Use this checklist if you're building a [native integration](/docs/integrations/create-integration/native-integration) that uses the [Marketplace API](/docs/integrations/create-integration/marketplace-api).

### Authentication and setup

### Product listing

### Installation and configuration

### Feature functionality

### Billing and usage tracking

### Documentation and support

### Edge cases and scalability

### Next steps for providers

Once you've completed this checklist:

1. Email integrations@vercel.com with your request to be reviewed for listing.
2. Vercel reviews your integration and provides feedback or requests additional testing.
3. Schedule a final walkthrough call to address any remaining questions.

## Connectable account integrations

Use this checklist if you're building a [connectable account integration](/docs/integrations/create-integration#connectable-account-integrations) that uses a redirect URL and OAuth flow.

### Marketplace listing

Navigate to `/integrations/:slug` to view the listing for your integration.

**Examples:**

- [MongoDB Atlas](https://vercel.com/marketplace/mongodbatlas)
- [Sanity](https://vercel.com/marketplace/sanity)

### Overview and instructions

### Installation flow

From clicking the install button, a wizard pops up to guide the user through setup.

### Deploy button flow

Using  allows users to install an integration together with an example repository on GitHub.

### Post-installation

After a user installs your integration through the Marketplace, they should see the details of their installation.


---

[View full sitemap](/docs/sitemap)
