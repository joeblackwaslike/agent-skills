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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "6f30d57a9b3577d8bdd902b183c2746db7d62ef30bf015871b9e7eb3f35f4302"
---

# get_named_sandbox

Get a named sandbox.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_sandbox](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/update_sandbox?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_named_sandbox&source_site=vercel-docs&relationship=related) — Use update_sandbox with Vercel MCP.
- [Vercel Sandboxes now allow unique, customizable names](https://vercel.com/changelog/vercel-sandboxes-now-allow-unique-customizable-names?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_named_sandbox&source_site=vercel-docs&relationship=related)
- [Vercel Sandbox](https://eve.dev/docs/sandbox/vercel?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_named_sandbox&source_site=vercel-docs&relationship=related) — Create snapshot-backed persistent sandboxes on Vercel.
- [How to reconnect to a running Sandbox](https://vercel.com/kb/guide/how-to-reconnect-to-a-running-sandbox?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_named_sandbox&source_site=vercel-docs&relationship=related) — Learn how to use \\`Sandbox.get\\(\\)\\` to reconnect to an existing sandbox from a different process or after a script rest
- [create_sandboxes_v2](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_v2?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_named_sandbox&source_site=vercel-docs&relationship=related) — Use create_sandboxes_v2 with Vercel MCP.
- [create_sandboxes_v3](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_sandboxes_v3?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_named_sandbox&source_site=vercel-docs&relationship=related) — Use create_sandboxes_v3 with Vercel MCP.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_named_sandbox&source_site=vercel-docs&relationship=related) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Delete a sandbox](https://vercel.com/docs/rest-api/sandboxes/delete-a-sandbox?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_named_sandbox&source_site=vercel-docs&relationship=related) — DELETE /v2/sandboxes/{name} — Deletes a sandbox by name. If sandboxes are currently running, they will be stopped first.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/get_named_sandbox.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/get_named_sandbox.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fget_named_sandbox&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type    | Required | Description                                                                                                                                |
| ----------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`      | string  | Yes      | Name for the sandbox. Must be unique per project and URL-safe (alphanumeric, hyphens, underscores).                                        |
| `projectId` | string  | No       | The project ID or name (required when not using OIDC token).                                                                               |
| `resume`    | boolean | No       | Whether to automatically resume a stopped named sandbox by creating a new instance from its snapshot. Defaults to false. Default: `false`. |
| `teamId`    | string  | No       | Team ID.                                                                                                                                   |
| `slug`      | string  | No       | Team slug.                                                                                                                                 |


---

[View full sitemap](/docs/sitemap)
