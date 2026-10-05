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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "ab69c46624735b8ffe12ef6476ebeb16bdc4f865414e62137d2ff6b9f8351477"
---

# Checks API Reference

API endpoints allow integrations to interact with the Vercel platform. Integrations can run checks every time you create a deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Checks](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks?from=related&source_path=%2Fdocs%2Fchecks%2Fchecks-api&source_site=vercel-docs&relationship=related) — Vercel MCP tools for checks.
- [Create a check](https://vercel.com/docs/rest-api/checks-v2/create-a-check?from=related&source_path=%2Fdocs%2Fchecks%2Fchecks-api&source_site=vercel-docs&relationship=related) — POST /v2/projects/{projectIdOrName}/checks — Creates a new check for a project.
- [Get a check](https://vercel.com/docs/rest-api/checks-v2/get-a-check?from=related&source_path=%2Fdocs%2Fchecks%2Fchecks-api&source_site=vercel-docs&relationship=related) — GET /v2/projects/{projectIdOrName}/checks/{checkId} — Return a detailed response for a single check.
- [Anatomy of the Checks API](https://vercel.com/docs/checks/creating-checks?from=related&source_path=%2Fdocs%2Fchecks%2Fchecks-api&source_site=vercel-docs&relationship=related) — Learn how to create your own Checks with Vercel Integrations. You can build your own Integration to register any arbitra
- [Update a check](https://vercel.com/docs/rest-api/checks-v2/update-a-check?from=related&source_path=%2Fdocs%2Fchecks%2Fchecks-api&source_site=vercel-docs&relationship=related) — PATCH /v2/projects/{projectIdOrName}/checks/{checkId} — Update an existing check.

Full cross-link map for this page: [/docs/checks/checks-api.graph.md](/docs/checks/checks-api.graph.md?from=related&source_path=%2Fdocs%2Fchecks%2Fchecks-api&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** The `post` and `patch` endpoints
> must be called with an OAuth2, or it will produce a
> `400` error.

Create a new checkAllows the integration to create and register checks. When the "deployment" event triggers, the endpoint registers new checks. It runs until the "deployment.succeeded" event. The endpoint will then set the check "status" to "running".ActionEndpointRead/Write POST \[/v1/deployments/{deploymentId}/checks]\(/docs/rest-api#endpoints/checks/creates-a-new-check)Update a checkAllows the integration to update existing checks with a new status or conclusion. This endpoint sets the status to “completed”. The value for the conclusion can be "canceled", "failed", "neutral", "succeeded", or "skipped".ActionEndpointRead/Write PATCH \[/v1/deployments/{deploymentId}/checks/{checkId}]\(/docs/rest-api#endpoints/checks/update-a-check)Get all checksAllows integration to fetch all existing checks with all their attributes. For comparison purposes, you can use it to get information from a previous deployment.ActionEndpointRead GET \[/v1/deployments/{deploymentId}/checks]\(/docs/rest-api#endpoints/checks/retrieve-a-list-of-all-checks)Get one checkAllows integration to fetch only a single check with all the attributes. For comparison purposes, you can use it to get information from a previous deployment.ActionEndpointRead GET \[/v1/deployments/{deploymentId}/checks/{checkId}]\(/docs/rest-api#endpoints/checks/get-a-single-check)Rerequest a failed checkAllows integration to return a new outcome or rewrite an existing check result. This endpoint is used for check reruns.ActionEndpointRead/Write POST \[/v1/deployments/{deploymentId}/checks/{checkId}/rerequest]\(/docs/rest-api#endpoints/checks/rerequest-a-check)


---

[View full sitemap](/docs/sitemap)
