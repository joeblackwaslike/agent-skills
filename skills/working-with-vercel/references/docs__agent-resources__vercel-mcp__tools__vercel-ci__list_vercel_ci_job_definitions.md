---
title: list_vercel_ci_job_definitions
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_job_definitions
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_job_definitions"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/vercel-ci
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_vercel_ci_job_definitions with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_job_definitions.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "9fe1e8e652764df0be6f65ca88f55a4a9bd7412189c6f6d2c381c63282b0d556"
---

# list_vercel_ci_job_definitions

List job definitions for a Vercel CI invocation attempt.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_vercel_ci_job_definition](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_definition) — Use get_vercel_ci_job_definition with Vercel MCP.
- [list_vercel_ci_task_definitions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_task_definitions) — Use list_vercel_ci_task_definitions with Vercel MCP.
- [list_vercel_ci_job_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_job_runs) — Use list_vercel_ci_job_runs with Vercel MCP.
- [List job definitions for an invocation attempt](https://vercel.com/docs/rest-api/vercel-ci/list-job-definitions-for-an-invocation-attempt) — GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/job-definitions — List Job Definitions
- [get_vercel_ci_job_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run) — Use get_vercel_ci_job_run with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_job_definitions.graph.md](/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_job_definitions.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `invocationId` | string | Yes      | The Vercel CI invocation ID.                                |
| `attempt`      | string | Yes      | The invocation attempt number.                              |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |

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
