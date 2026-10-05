---
title: get_project_check
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/checks/get_project_check
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/get_project_check"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/checks
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_project_check with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/get_project_check.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "f0c5e36dc535f216f9854158d1340045c903ec0c6daffb0a8c19fc75ab95ee9e"
---

# get_project_check

Get a check.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/get_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fget_project_check&source_site=vercel-docs&relationship=related) — Use get_check with Vercel MCP.
- [update_project_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/update_project_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fget_project_check&source_site=vercel-docs&relationship=related) — Use update_project_check with Vercel MCP.
- [list_check_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/list_check_runs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fget_project_check&source_site=vercel-docs&relationship=related) — Use list_check_runs with Vercel MCP.
- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fget_project_check&source_site=vercel-docs&relationship=related) — Use get_project with Vercel MCP.
- [get_deployment_check_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/get_deployment_check_run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fget_project_check&source_site=vercel-docs&relationship=related) — Use get_deployment_check_run with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/checks/get_project_check.graph.md](/docs/agent-resources/vercel-mcp/tools/checks/get_project_check.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fget_project_check&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type   | Required | Description             |
| ----------------- | ------ | -------- | ----------------------- |
| `projectIdOrName` | string | Yes      | The project ID or name. |
| `checkId`         | string | Yes      | The check ID.           |
| `teamId`          | string | No       | Team ID.                |
| `slug`            | string | No       | Team slug.              |


---

[View full sitemap](/docs/sitemap)
