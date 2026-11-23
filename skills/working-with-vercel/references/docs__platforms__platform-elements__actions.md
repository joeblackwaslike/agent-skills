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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/platforms/platform-elements/actions.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "7191c34ab3e0dfdd56e49d25e74596cf57d634a96f0f341873d24424eecfb53d"
---

# Actions

Actions are server-side functions that wrap common Vercel API calls so you can add them to your platform without writing the integration yourself.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deployment integration actions](https://vercel.com/docs/integrations/create-integration/deployment-integration-action) — These actions allow integration providers to set up automated tasks with Vercel deployments.
- [Update deployment integration action](https://vercel.com/docs/rest-api/deployments/update-deployment-integration-action) — PATCH /v1/deployments/{deploymentId}/integrations/{integrationConfigurationId}/resources/{resourceId}/actions/{action} —
- [Invoice Actions](https://vercel.com/docs/rest-api/marketplace/invoice-actions) — POST /v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}/actions — This endpoint allows the part
- [Read Firewall Actions by Project](https://vercel.com/docs/rest-api/security/read-firewall-actions-by-project) — GET /v1/security/firewall/events — Retrieve firewall actions for a project Rule names are resolved against the project's
- [Products](https://vercel.com/docs/products) — Browse Vercel products for building, deploying, securing, observing, and scaling web applications.

Full cross-link map for this page: [/docs/platforms/platform-elements/actions.graph.md](/docs/platforms/platform-elements/actions.graph.md)
<!-- /docsgraph:related -->

**Add custom domain**: Programmatically add a custom domain to a project and check its status. [Learn more →](/docs/platforms/platform-elements/actions/add-custom-domain)

**Deploy files**: Deploy files to a Vercel project on behalf of a user. [Learn more →](/docs/platforms/platform-elements/actions/deploy-files)

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
