---
title: Checks API Reference
product: vercel
url: /docs/checks/checks-api
canonical_url: "https://vercel.com/docs/checks/checks-api"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/checks
related:
  []
summary: The Vercel Checks API let you create tests and assertions that run after each deployment has been built, and are powered by Vercel Integrations.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/checks/checks-api.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "787841a6a830000228cf5e9e44f120d74d697004e3c7b16df9368af82492c391"
---

# Checks API Reference

API endpoints allow integrations to interact with the Vercel platform. Integrations can run checks every time you create a deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Checks API support added for Marketplace integration providers](https://vercel.com/changelog/checks-api-support-added-for-marketplace-integration-providers?from=related&source_path=%2Fdocs%2Fchecks%2Fchecks-api&source_site=vercel-docs&relationship=related)
- [Get a check](https://vercel.com/docs/rest-api/checks-v2/get-a-check?from=related&source_path=%2Fdocs%2Fchecks%2Fchecks-api&source_site=vercel-docs&relationship=related) — GET /v2/projects/{projectIdOrName}/checks/{checkId} — Return a detailed response for a single check.
- [Create a check](https://vercel.com/docs/rest-api/checks-v2/create-a-check?from=related&source_path=%2Fdocs%2Fchecks%2Fchecks-api&source_site=vercel-docs&relationship=related) — POST /v2/projects/{projectIdOrName}/checks — Creates a new check for a project.
- [Update a check](https://vercel.com/docs/rest-api/checks-v2/update-a-check?from=related&source_path=%2Fdocs%2Fchecks%2Fchecks-api&source_site=vercel-docs&relationship=related) — PATCH /v2/projects/{projectIdOrName}/checks/{checkId} — Update an existing check.
- [Get a check run](https://vercel.com/docs/rest-api/checks-v2/get-a-check-run?from=related&source_path=%2Fdocs%2Fchecks%2Fchecks-api&source_site=vercel-docs&relationship=related) — GET /v2/deployments/{deploymentId}/check-runs/{checkRunId} — Return a detailed response for a single check run.
- [List all checks for a project](https://vercel.com/docs/rest-api/checks-v2/list-all-checks-for-a-project?from=related&source_path=%2Fdocs%2Fchecks%2Fchecks-api&source_site=vercel-docs&relationship=related) — GET /v2/projects/{projectIdOrName}/checks — List all checks for a project, optionally filtered by target.

Full cross-link map for this page: [/docs/checks/checks-api.graph.md](/docs/checks/checks-api.graph.md?from=related&source_path=%2Fdocs%2Fchecks%2Fchecks-api&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** The `post` and `patch` endpoints
> must be called with an OAuth2, or it will produce a
> `400` error.


---

[View full sitemap](/docs/sitemap)
