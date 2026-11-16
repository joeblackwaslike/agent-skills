---
title: get_deployment
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/get_deployment
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/deployments
summary: Use get_deployment with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "99596ae199706b36cc6a2deae1e3c270631659906c65e1e26cf9c567d06dd09c"
---

# get_deployment

Get a [deployment](/docs/deployments) by ID or hostname.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_deployment_file_contents](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents) — Use get_deployment_file_contents with Vercel MCP.
- [list_deployment_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files) — Use list_deployment_files with Vercel MCP.
- [list_deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments) — Use list_deployments with Vercel MCP.
- [Get Deployment File Contents](https://vercel.com/docs/rest-api/deployments/get-deployment-file-contents) — GET /v8/deployments/{id}/files/{fileId} — Allows to retrieve the content of a file by supplying the file identifier and
- [get_git_deployment_context](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_git_deployment_context) — Use get_git_deployment_context with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment.graph.md)
<!-- /docsgraph:related -->

| Parameter         | Type   | Required | Description                                                                                                                                         |
| ----------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idOrUrl`         | string | Yes      | The unique identifier or hostname of the deployment.                                                                                                |
| `withGitRepoInfo` | string | No       | When `true`, the response includes the `gitSource` object with the commit SHA, branch name, and connected repository metadata. Defaults to `false`. |
| `teamId`          | string | No       | Team ID to use for this operation.                                                                                                                  |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId.                                                                                         |

**Sample prompt:** "Get details about my latest production deployment"

## Workflow connection parameters

If your connection exposes the smaller workflow tool list, use these parameters instead. Follow your connection's tool schema.

| Parameter | Type   | Required | Default | Description                                               |
| --------- | ------ | -------- | ------- | --------------------------------------------------------- |
| `idOrUrl` | string | Yes      | -       | The unique identifier or hostname of the deployment.      |
| `teamId`  | string | Yes      | -       | The team ID or slug. Use the team that owns the resource. |

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
