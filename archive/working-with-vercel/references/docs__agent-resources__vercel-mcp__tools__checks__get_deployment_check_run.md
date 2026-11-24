---
title: get_deployment_check_run
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/checks/get_deployment_check_run
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/get_deployment_check_run"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/checks
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_deployment_check_run with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/get_deployment_check_run.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "5dd30e8a36981a9d3aecbac58b70cb6b458c142212a1c3edf5db9fa9329690d6"
---

# get_deployment_check_run

Get a check run.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_deployment_check_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/create_deployment_check_run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fget_deployment_check_run&source_site=vercel-docs&relationship=related) — Use create_deployment_check_run with Vercel MCP.
- [update_deployment_check_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/update_deployment_check_run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fget_deployment_check_run&source_site=vercel-docs&relationship=related) — Use update_deployment_check_run with Vercel MCP.
- [get_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/get_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fget_deployment_check_run&source_site=vercel-docs&relationship=related) — Use get_check with Vercel MCP.
- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fget_deployment_check_run&source_site=vercel-docs&relationship=related) — Use get_deployment with Vercel MCP.
- [list_check_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/list_check_runs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fget_deployment_check_run&source_site=vercel-docs&relationship=related) — Use list_check_runs with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/checks/get_deployment_check_run.graph.md](/docs/agent-resources/vercel-mcp/tools/checks/get_deployment_check_run.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fget_deployment_check_run&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type   | Required | Description        |
| -------------- | ------ | -------- | ------------------ |
| `deploymentId` | string | Yes      | The deployment ID. |
| `checkRunId`   | string | Yes      | The check run ID.  |
| `teamId`       | string | No       | Team ID.           |
| `slug`         | string | No       | Team slug.         |


---

[View full sitemap](/docs/sitemap)
