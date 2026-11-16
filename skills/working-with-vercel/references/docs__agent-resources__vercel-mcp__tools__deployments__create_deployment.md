---
title: create_deployment
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/create_deployment
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/deployments
summary: Use create_deployment with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "af59fc83c0b47cfda958d95efbd1c217b38f369a26d9130b1f99fcf70fedb885"
---

# create_deployment

Create a [deployment](/docs/deployments) from a Git source or files. Put `name`, `project`, `gitSource` or `files`, and `projectSettings` inside `requestBody`. Use `requestBody.target: "production"` for production, or omit `target` for a preview. Follow the tool's input schema for file formats and build settings.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [deploy_to_vercel](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/deploy_to_vercel) — Use deploy_to_vercel with Vercel MCP.
- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment) — Use get_deployment with Vercel MCP.
- [cancel_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/cancel_deployment) — Use cancel_deployment with Vercel MCP.
- [Managing Deployments](https://vercel.com/docs/deployments/managing-deployments) — Learn how to manage your current and previously deployed projects to Vercel through the dashboard. You can redeploy at a
- [list_deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments) — Use list_deployments with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment.graph.md)
<!-- /docsgraph:related -->

**Sample prompt:** "Create a preview deployment of my project's main branch"

## Parameters

| Parameter                       | Type   | Required | Description                                                                                                                                                                                                                                                                                         |
| ------------------------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `forceNew`                      | string | No       | Forces a new deployment even if there is a previous similar deployment. Set to `1` to bypass deployment deduplication and always trigger a fresh build. Allowed values: `"0"`, `"1"`.                                                                                                               |
| `skipAutoDetectionConfirmation` | string | No       | Set to `1` to skip framework auto-detection and proceed without confirmation. By default, if Vercel detects a framework that differs from the project setting, the API returns a `400` asking you to confirm. Use this to suppress that check in automated pipelines. Allowed values: `"0"`, `"1"`. |
| `teamId`                        | string | No       | Team ID to use for this operation.                                                                                                                                                                                                                                                                  |
| `slug`                          | string | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                                                                                                                                         |
| `requestBody`                   | object | Yes      | Request body for this tool.                                                                                                                                                                                                                                                                         |

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
