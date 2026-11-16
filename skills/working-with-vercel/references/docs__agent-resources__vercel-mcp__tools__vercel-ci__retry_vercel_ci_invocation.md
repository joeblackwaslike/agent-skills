---
title: retry_vercel_ci_invocation
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/vercel-ci/retry_vercel_ci_invocation
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/retry_vercel_ci_invocation"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/vercel-ci
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use retry_vercel_ci_invocation with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/retry_vercel_ci_invocation.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "e096eb885a1da3c0c4cf6601ececce15131ca199ddbcfea2569d0e619d9d1358"
---

# retry_vercel_ci_invocation

Retry a terminal Vercel CI invocation attempt identified by invocationId and attempt. Starts another attempt. inspect its state to determine whether it completes successfully.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Retry a terminal Vercel CI invocation attempt](https://vercel.com/docs/rest-api/vercel-ci/retry-a-terminal-vercel-ci-invocation-attempt) — POST /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/retry — Retry Invocation
- [get_vercel_ci_invocation](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation) — Use get_vercel_ci_invocation with Vercel MCP.
- [list_vercel_ci_invocation_attempts](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_invocation_attempts) — Use list_vercel_ci_invocation_attempts with Vercel MCP.
- [get_vercel_ci_invocation_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_logs) — Use get_vercel_ci_invocation_logs with Vercel MCP.
- [get_vercel_ci_invocation_tree](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_tree) — Use get_vercel_ci_invocation_tree with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/vercel-ci/retry_vercel_ci_invocation.graph.md](/docs/agent-resources/vercel-mcp/tools/vercel-ci/retry_vercel_ci_invocation.graph.md)
<!-- /docsgraph:related -->

Retry support depends on the invocation source and terminal state. Native-check invocations can return `retry_not_supported`. A successful retry starts another attempt. Inspect its status and logs before reporting the outcome.

## Parameters

| Parameter      | Type    | Required | Description                                                 |
| -------------- | ------- | -------- | ----------------------------------------------------------- |
| `invocationId` | string  | Yes      | The Vercel CI invocation ID.                                |
| `attempt`      | string  | Yes      | The invocation attempt number.                              |
| `teamId`       | string  | No       | Team ID to use for this operation.                          |
| `slug`         | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`  | unknown | No       | Request body for this tool.                                 |

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
