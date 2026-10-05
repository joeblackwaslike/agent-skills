---
title: list_check_runs
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/checks/list_check_runs
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/list_check_runs"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/checks
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_check_runs with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/list_check_runs.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "d17101f199f655c669495d7d6cc8b2b5d133b22eef2207b2c9429f78adb755ff"
---

# list_check_runs

List runs for a check.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_project_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/get_project_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Flist_check_runs&source_site=vercel-docs&relationship=related) — Use get_project_check with Vercel MCP.
- [List runs for a check](https://vercel.com/docs/rest-api/checks-v2/list-runs-for-a-check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Flist_check_runs&source_site=vercel-docs&relationship=related) — GET /v2/projects/{projectIdOrName}/checks/{checkId}/runs — List all runs associated with a given check.
- [get_deployment_check_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/get_deployment_check_run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Flist_check_runs&source_site=vercel-docs&relationship=related) — Use get_deployment_check_run with Vercel MCP.
- [List check runs for a deployment](https://vercel.com/docs/rest-api/checks-v2/list-check-runs-for-a-deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Flist_check_runs&source_site=vercel-docs&relationship=related) — GET /v2/deployments/{deploymentId}/check-runs — List all check runs for a deployment.
- [get_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/get_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Flist_check_runs&source_site=vercel-docs&relationship=related) — Use get_check with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/checks/list_check_runs.graph.md](/docs/agent-resources/vercel-mcp/tools/checks/list_check_runs.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Flist_check_runs&source_site=vercel-docs&relationship=graph)
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
