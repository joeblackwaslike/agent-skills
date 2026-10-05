---
title: update_sandbox
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/update_sandbox
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/update_sandbox"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_sandbox with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/update_sandbox.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "5082e7f07e6135d4637690b944b93122c37e766eceacf18152498050b62519bd"
---

# update_sandbox

Update a sandbox.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_named_sandbox](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_named_sandbox?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fupdate_sandbox&source_site=vercel-docs&relationship=related) — Use get_named_sandbox with Vercel MCP.
- [create_sandboxes_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_v2?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fupdate_sandbox&source_site=vercel-docs&relationship=related) — Use create_sandboxes_v2 with Vercel MCP.
- [create_sandboxes_v3](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_v3?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fupdate_sandbox&source_site=vercel-docs&relationship=related) — Use create_sandboxes_v3 with Vercel MCP.
- [create_sandboxes_v4](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_v4?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fupdate_sandbox&source_site=vercel-docs&relationship=related) — Use create_sandboxes_v4 with Vercel MCP.
- [update_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fupdate_sandbox&source_site=vercel-docs&relationship=related) — Use update_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/update_sandbox.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/update_sandbox.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fupdate_sandbox&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type    | Required | Description                                                                                                                                |
| ------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`        | string  | Yes      | The sandbox to update.                                                                                                                     |
| `projectId`   | string  | No       | The project ID that owns the named sandbox. When provided, takes precedence over OIDC project context.                                     |
| `resume`      | boolean | No       | Whether to automatically resume a stopped named sandbox by creating a new instance from its snapshot. Defaults to false. Default: `false`. |
| `teamId`      | string  | No       | Team ID.                                                                                                                                   |
| `slug`        | string  | No       | Team slug.                                                                                                                                 |
| `requestBody` | object  | No       | Request body for this tool.                                                                                                                |


---

[View full sitemap](/docs/sitemap)
