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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "e72e2f5bfc3fd1e604b51476b28782296d8fe9e818256201c46d5845d0c8539e"
---

# Actions

Actions are server-side functions that wrap common Vercel API calls so you can add them to your platform without writing the integration yourself.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deployment integration actions](https://vercel.com/docs/integrations/create-integration/deployment-integration-action?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions&source_site=vercel-docs&relationship=related) — These actions allow integration providers to set up automated tasks with Vercel deployments.
- [Update deployment integration action](https://vercel.com/docs/rest-api/deployments/update-deployment-integration-action?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions&source_site=vercel-docs&relationship=related) — PATCH /v1/deployments/{deploymentId}/integrations/{integrationConfigurationId}/resources/{resourceId}/actions/{action} —
- [Products](https://vercel.com/docs/products?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions&source_site=vercel-docs&relationship=related) — Browse Vercel products for building, deploying, securing, observing, and scaling web applications.
- [Invoice Actions](https://vercel.com/docs/rest-api/marketplace/invoice-actions?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions&source_site=vercel-docs&relationship=related) — POST /v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}/actions — This endpoint allows the part
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions&source_site=vercel-docs&relationship=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.

Full cross-link map for this page: [/docs/platforms/platform-elements/actions.graph.md](/docs/platforms/platform-elements/actions.graph.md?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

**Add custom domain**: Programmatically add a custom domain to a project and check its status. [Learn more →](/docs/platforms/platform-elements/actions/add-custom-domain)

**Deploy files**: Deploy files to a Vercel project on behalf of a user. [Learn more →](/docs/platforms/platform-elements/actions/deploy-files)


---

[View full sitemap](/docs/sitemap)
