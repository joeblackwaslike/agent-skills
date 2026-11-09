---
title: Actions
product: vercel
url: /docs/platforms/platform-elements/actions
canonical_url: "https://vercel.com/docs/platforms/platform-elements/actions"
last_updated: 2026-06-26
type: reference
prerequisites:
  - /docs/platforms/platform-elements
  - /docs/platforms
related:
  - /docs/platforms/platform-elements/actions/add-custom-domain
  - /docs/platforms/platform-elements/actions/deploy-files
summary: Server actions you can install to run common platform tasks against the Vercel API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/platform-elements/actions.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "9bc8ba5a91a7ccae23a04df765fb31e7795f9114e6461385189836c598ae8574"
---

# Actions

Actions are server-side functions that wrap common Vercel API calls so you can add them to your platform without writing the integration yourself.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can I use GitHub Enterprise Server with Vercel?](https://vercel.com/kb/guide/can-i-use-github-enterprise-server-with-vercel) — You can use GitHub Enterprise Server and GitHub Actions to deploy your application to Vercel.
- [Deployment integration actions](https://vercel.com/docs/integrations/create-integration/deployment-integration-action) — These actions allow integration providers to set up automated tasks with Vercel deployments.
- [Update deployment integration action](https://vercel.com/docs/rest-api/deployments/update-deployment-integration-action) — PATCH /v1/deployments/{deploymentId}/integrations/{integrationConfigurationId}/resources/{resourceId}/actions/{action} —
- [Products](https://vercel.com/docs/products) — Browse Vercel products for building, deploying, securing, observing, and scaling web applications.
- [Invoice Actions](https://vercel.com/docs/rest-api/marketplace/invoice-actions) — POST /v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}/actions — This endpoint allows the part
- [Add an existing domain to the Vercel platform](https://vercel.com/docs/rest-api/domains/add-an-existing-domain-to-the-vercel-platform) — POST /v7/domains — This endpoint is used for adding a new apex domain name with Vercel for the authenticating user. Note

Full cross-link map for this page: [/docs/platforms/platform-elements/actions.graph.md](/docs/platforms/platform-elements/actions.graph.md)
<!-- /docsgraph:related -->

**Add custom domain**: Programmatically add a custom domain to a project and check its status. [Learn more →](/docs/platforms/platform-elements/actions/add-custom-domain)

**Deploy files**: Deploy files to a Vercel project on behalf of a user. [Learn more →](/docs/platforms/platform-elements/actions/deploy-files)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
