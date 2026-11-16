---
title: get_git_deployment_context
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/get_git_deployment_context
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_git_deployment_context"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_git_deployment_context with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_git_deployment_context.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "69ff14fb85ceb272bbc8831e683917cf42936be7148aad40486c0ff05add30ef"
---

# get_git_deployment_context

List your teams, their plans, linked Git projects, and connected Cursor Origin workspaces. This tool takes no parameters and is available on the root MCP connection.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment) — Use get_deployment with Vercel MCP.
- [get_deployment_file_contents](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents) — Use get_deployment_file_contents with Vercel MCP.
- [list_deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments) — Use list_deployments with Vercel MCP.
- [open_deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/open_deployments) — Use open_deployments with Vercel MCP.
- [list_deployment_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files) — Use list_deployment_files with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/get_git_deployment_context.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/get_git_deployment_context.graph.md)
<!-- /docsgraph:related -->

**Sample prompt:** "Which of my Git repositories already have Vercel projects?"

This tool is available on the root connection. Project-scoped connections already bind a team and project and do not register this discovery tool.

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
