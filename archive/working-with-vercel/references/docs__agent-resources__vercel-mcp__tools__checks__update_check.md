---
title: update_check
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/checks/update_check
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/update_check"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/checks
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_check with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/update_check.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "3124d156b50a8fc8755e9b0d6683ade15615be625b6b6f81f8ac0b9529ae71ce"
---

# update_check

Update a check.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_project_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/update_project_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fupdate_check&source_site=vercel-docs&relationship=related) — Use update_project_check with Vercel MCP.
- [update_deployment_check_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/update_deployment_check_run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fupdate_check&source_site=vercel-docs&relationship=related) — Use update_deployment_check_run with Vercel MCP.
- [rerequest_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/rerequest_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fupdate_check&source_site=vercel-docs&relationship=related) — Use rerequest_check with Vercel MCP.
- [create_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/create_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fupdate_check&source_site=vercel-docs&relationship=related) — Use create_check with Vercel MCP.
- [create_deployment_check_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/create_deployment_check_run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fupdate_check&source_site=vercel-docs&relationship=related) — Use create_deployment_check_run with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/checks/update_check.graph.md](/docs/agent-resources/vercel-mcp/tools/checks/update_check.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fchecks%2Fupdate_check&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type   | Required | Description                             |
| -------------- | ------ | -------- | --------------------------------------- |
| `deploymentId` | string | Yes      | The deployment to update the check for. |
| `checkId`      | string | Yes      | The check being updated                 |
| `teamId`       | string | No       | Team ID.                                |
| `slug`         | string | No       | Team slug.                              |
| `requestBody`  | object | Yes      | Request body for this tool.             |


---

[View full sitemap](/docs/sitemap)
