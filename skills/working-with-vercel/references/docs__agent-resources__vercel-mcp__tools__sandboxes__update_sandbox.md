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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "5ccad1cc9d4a08c99760c18a7e9ad42c01f5d2dace30c1046cdefcdfcdcfde53"
---

# update_sandbox

Update a sandbox.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_named_sandbox](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_named_sandbox) — Use get_named_sandbox with Vercel MCP.
- [create_sandboxes_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_v2) — Use create_sandboxes_v2 with Vercel MCP.
- [create_sandboxes_v3](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_v3) — Use create_sandboxes_v3 with Vercel MCP.
- [create_sandboxes_v4](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_v4) — Use create_sandboxes_v4 with Vercel MCP.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/update_sandbox.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/update_sandbox.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type    | Required | Description                                                                                                             |
| ------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `name`        | string  | Yes      | The sandbox to update.                                                                                                  |
| `projectId`   | string  | No       | The project ID that owns the named sandbox. When provided, takes precedence over OIDC project context.                  |
| `resume`      | boolean | No       | Whether to automatically resume a stopped named sandbox by creating a new instance from its snapshot. Default: `false`. |
| `teamId`      | string  | No       | Team ID to use for this operation.                                                                                      |
| `slug`        | string  | No       | Team slug to use for this operation. Use instead of teamId.                                                             |
| `requestBody` | object  | No       | Request body for this tool.                                                                                             |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
