---
title: create_deployment_check_run
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/checks/create_deployment_check_run
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/create_deployment_check_run"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/checks
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use create_deployment_check_run with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/create_deployment_check_run.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "ff2ffda629e49da8418899c87d1a63cab6c53d772e75c8e5f6fc0d2580e3c2a1"
---

# create_deployment_check_run

Create a check run.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_deployment_check_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/update_deployment_check_run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fcreate_deployment_check_run&source_site=vercel-docs&relationship=related) — Use update_deployment_check_run with Vercel MCP.
- [get_deployment_check_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/get_deployment_check_run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fcreate_deployment_check_run&source_site=vercel-docs&relationship=related) — Use get_deployment_check_run with Vercel MCP.
- [create_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/create_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fcreate_deployment_check_run&source_site=vercel-docs&relationship=related) — Use create_check with Vercel MCP.
- [update_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/update_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fcreate_deployment_check_run&source_site=vercel-docs&relationship=related) — Use update_check with Vercel MCP.
- [create_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fcreate_deployment_check_run&source_site=vercel-docs&relationship=related) — Use create_deployment with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/checks/create_deployment_check_run.graph.md](/docs/agent-resources/vercel-mcp/tools/checks/create_deployment_check_run.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fcreate_deployment_check_run&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type   | Required | Description                 |
| -------------- | ------ | -------- | --------------------------- |
| `deploymentId` | string | Yes      | The deployment ID.          |
| `teamId`       | string | No       | Team ID.                    |
| `slug`         | string | No       | Team slug.                  |
| `requestBody`  | object | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
