---
title: update_project_check
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/checks/update_project_check
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/update_project_check"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/checks
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_project_check with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/update_project_check.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "31bb41433674024a3fde9fbae3064fe9914b4ca6acd8442bf3a0241d70f38887"
---

# update_project_check

Update a check.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/update_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fupdate_project_check&source_site=vercel-docs&relationship=related) — Use update_check with Vercel MCP.
- [get_project_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/get_project_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fupdate_project_check&source_site=vercel-docs&relationship=related) — Use get_project_check with Vercel MCP.
- [update_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fupdate_project_check&source_site=vercel-docs&relationship=related) — Use update_project with Vercel MCP.
- [update_deployment_check_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/update_deployment_check_run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fupdate_project_check&source_site=vercel-docs&relationship=related) — Use update_deployment_check_run with Vercel MCP.
- [create_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/create_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fupdate_project_check&source_site=vercel-docs&relationship=related) — Use create_check with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/checks/update_project_check.graph.md](/docs/agent-resources/vercel-mcp/tools/checks/update_project_check.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fupdate_project_check&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type   | Required | Description                 |
| ----------------- | ------ | -------- | --------------------------- |
| `projectIdOrName` | string | Yes      | The project ID or name.     |
| `checkId`         | string | Yes      | The check ID.               |
| `teamId`          | string | No       | Team ID.                    |
| `slug`            | string | No       | Team slug.                  |
| `requestBody`     | object | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
