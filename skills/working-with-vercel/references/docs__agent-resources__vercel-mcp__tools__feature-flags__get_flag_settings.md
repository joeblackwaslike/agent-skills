---
title: get_flag_settings
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_settings
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_settings"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/feature-flags
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_flag_settings with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_settings.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "d4939a25d239a651487553fbf7e7aab91457732cef6c668ef51d0ded2e50b9be"
---

# get_flag_settings

Get project flag settings.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_settings?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fget_flag_settings&source_site=vercel-docs&relationship=related) — Use update_flag_settings with Vercel MCP.
- [get_flag](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fget_flag_settings&source_site=vercel-docs&relationship=related) — Use get_flag with Vercel MCP.
- [create_flag](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/create_flag?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fget_flag_settings&source_site=vercel-docs&relationship=related) — Use create_flag with Vercel MCP.
- [Get project flag settings](https://vercel.com/docs/rest-api/feature-flags/get-project-flag-settings?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fget_flag_settings&source_site=vercel-docs&relationship=related) — GET /v1/projects/{projectIdOrName}/feature-flags/settings — Retrieve feature flag settings for a project.
- [List team project flag settings](https://vercel.com/docs/rest-api/feature-flags/list-team-project-flag-settings?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fget_flag_settings&source_site=vercel-docs&relationship=related) — GET /v1/teams/{teamId}/feature-flags/settings — Retrieve feature flag settings for projects in a team.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_settings.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_settings.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffeature-flags%2Fget_flag_settings&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type   | Required | Description            |
| ----------------- | ------ | -------- | ---------------------- |
| `projectIdOrName` | string | Yes      | The project id or name |
| `teamId`          | string | No       | Team ID.               |
| `slug`            | string | No       | Team slug.             |


---

[View full sitemap](/docs/sitemap)
