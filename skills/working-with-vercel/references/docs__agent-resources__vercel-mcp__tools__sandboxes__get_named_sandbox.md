---
title: get_named_sandbox
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/get_named_sandbox
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_named_sandbox"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_named_sandbox with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_named_sandbox.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "9055391a3e7c8e40be9500db59847f814703a537bbb0e4db5bd2a9b859ae6ec0"
---

# get_named_sandbox

Get a named sandbox.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_sandbox](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/update_sandbox) — Use update_sandbox with Vercel MCP.
- [Vercel Sandboxes now allow unique, customizable names](https://vercel.com/changelog/vercel-sandboxes-now-allow-unique-customizable-names)
- [How to reconnect to a running Sandbox](https://vercel.com/kb/guide/how-to-reconnect-to-a-running-sandbox) — Learn how to use \\`Sandbox.get\\(\\)\\` to reconnect to an existing sandbox from a different process or after a script rest
- [create_sandboxes_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_v2) — Use create_sandboxes_v2 with Vercel MCP.
- [create_sandboxes_v3](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_v3) — Use create_sandboxes_v3 with Vercel MCP.
- [create_sandboxes_v4](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_v4) — Use create_sandboxes_v4 with Vercel MCP.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/get_named_sandbox.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/get_named_sandbox.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type    | Required | Description                                                                                                             |
| ----------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `name`      | string  | Yes      | Name for the sandbox. Must be unique per project and URL-safe (alphanumeric, hyphens, underscores).                     |
| `projectId` | string  | No       | The project ID or name (required when not using OIDC token).                                                            |
| `resume`    | boolean | No       | Whether to automatically resume a stopped named sandbox by creating a new instance from its snapshot. Default: `false`. |
| `teamId`    | string  | No       | Team ID to use for this operation.                                                                                      |
| `slug`      | string  | No       | Team slug to use for this operation. Use instead of teamId.                                                             |


---

[View full sitemap](/docs/sitemap)
