---
title: list_sessions
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/list_sessions
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_sessions"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_sessions with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_sessions.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "cf3300e089f75348d0c1119ce24dcb3f279db3ef5bc0eec4485f3cc1ddd9cba7"
---

# list_sessions

List sessions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List sessions](https://vercel.com/docs/rest-api/sandboxes/list-sessions) — GET /v2/sandboxes/sessions — Retrieves a paginated list of sessions belonging to a specific sandbox. Results are sorted
- [list_session_snapshots](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_snapshots) — Use list_session_snapshots with Vercel MCP.
- [list_session_commands](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_session_commands) — Use list_session_commands with Vercel MCP.
- [list_named_sandboxes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/list_named_sandboxes) — Use list_named_sandboxes with Vercel MCP.
- [get_session](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/get_session) — Use get_session with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/list_sessions.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/list_sessions.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                                                                                        |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `project`   | string | Yes      | The unique identifier or name of the project to list sessions for.                                                 |
| `name`      | string | No       | Filter sessions by sandbox name. Only sessions belonging to the specified sandbox are returned.                    |
| `limit`     | number | No       | Maximum number of sessions to return in the response. Used for pagination. Minimum: 1. Maximum: 50. Default: `20`. |
| `cursor`    | string | No       | Opaque pagination cursor from a previous response.                                                                 |
| `sortOrder` | string | No       | Sort direction for results by creation time. Allowed values: `"asc"`, `"desc"`. Default: `"desc"`.                 |
| `teamId`    | string | No       | Team ID to use for this operation.                                                                                 |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId.                                                        |

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
