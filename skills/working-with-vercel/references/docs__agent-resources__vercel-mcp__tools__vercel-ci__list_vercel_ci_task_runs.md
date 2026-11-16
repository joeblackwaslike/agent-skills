---
title: list_vercel_ci_task_runs
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_task_runs
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_task_runs"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/vercel-ci
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_vercel_ci_task_runs with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_task_runs.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "8152d96df9733c54fd1c842abb66ecec4cbbe6f72e09e25b059ab3bd7bb2b385"
---

# list_vercel_ci_task_runs

List task runs within a Vercel CI job run.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_vercel_ci_job_runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_job_runs) — Use list_vercel_ci_job_runs with Vercel MCP.
- [get_vercel_ci_task_run_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_task_run_logs) — Use get_vercel_ci_task_run_logs with Vercel MCP.
- [list_vercel_ci_task_definitions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_task_definitions) — Use list_vercel_ci_task_definitions with Vercel MCP.
- [get_vercel_ci_job_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run) — Use get_vercel_ci_job_run with Vercel MCP.
- [get_vercel_ci_job_run_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_job_run_logs) — Use get_vercel_ci_job_run_logs with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_task_runs.graph.md](/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_task_runs.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `invocationId`    | string | Yes      | The Vercel CI invocation ID.                                |
| `attempt`         | string | Yes      | The invocation attempt number.                              |
| `jobDefinitionId` | string | Yes      | The job definition ID.                                      |
| `runAttempt`      | string | Yes      | The job run attempt number.                                 |
| `taskRunAttempt`  | string | No       | The task run attempt number.                                |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |

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
