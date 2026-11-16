---
title: list_vercel_ci_invocations
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_invocations
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_invocations"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/vercel-ci
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_vercel_ci_invocations with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_invocations.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "3417eac571820b40f3e8a1b72716d7be74e8f454a3075b15de7c3a61ec0a5538"
---

# list_vercel_ci_invocations

List Vercel CI invocations for your team. Filter by repository, branch, status, or conclusion.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_vercel_ci_invocation_attempts](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_invocation_attempts) — Use list_vercel_ci_invocation_attempts with Vercel MCP.
- [List invocations for a team, optionally filtered by repository and invocation metadata](https://vercel.com/docs/rest-api/vercel-ci/list-invocations-for-a-team-optionally-filtered-by-repository-and-invocation-metadata) — GET /v2/vercel-ci/invocations — List Invocations
- [List Vercel CI branch suggestions for a team](https://vercel.com/docs/rest-api/vercel-ci/list-vercel-ci-branch-suggestions-for-a-team) — GET /v2/vercel-ci/branches — List branches
- [get_vercel_ci_invocation](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation) — Use get_vercel_ci_invocation with Vercel MCP.
- [get_vercel_ci_invocation_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci/get_vercel_ci_invocation_logs) — Use get_vercel_ci_invocation_logs with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_invocations.graph.md](/docs/agent-resources/vercel-mcp/tools/vercel-ci/list_vercel_ci_invocations.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter        | Type             | Required | Description                                                                                                                                                                                                                                                                   |
| ---------------- | ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`       | string           | No       | Repository provider (e.g., "github"). Allowed values: `"github"`, `"gitlab"`, `"bitbucket"`, `"vercel"`.                                                                                                                                                                      |
| `repository`     | string           | No       | Repository slug (e.g., "vercel/next.js").                                                                                                                                                                                                                                     |
| `branchName`     | string           | No       | Branch name (e.g., "main").                                                                                                                                                                                                                                                   |
| `snapshot`       | string           | No       | Snapshot/commit hash.                                                                                                                                                                                                                                                         |
| `status`         | Array\<string> | No       | Allowed values: `"new"`, `"skipped"`, `"bootstrapping"`, `"bootstrapping_failed"`, `"snapshotted"`, `"sandbox_named"`, `"jobs_on_hive_clone_dispatched"`, `"jobs_on_hive_dispatched"`, `"jobs_on_hive_completed"`, `"jobs_on_hive_failed"`, `"awaiting_jobs"`, `"completed"`. |
| `conclusion`     | Array\<string> | No       | Allowed values: `"succeeded"`, `"failed"`, `"skipped"`.                                                                                                                                                                                                                       |
| `source`         | Array\<string> | No       | Allowed values: `"vercel-ci"`, `"vercel-native-checks"`.                                                                                                                                                                                                                      |
| `authorGitHubId` | string           | No       | -                                                                                                                                                                                                                                                                             |
| `author`         | string           | No       | GitHub author login.                                                                                                                                                                                                                                                          |
| `createdAfter`   | number           | No       | -                                                                                                                                                                                                                                                                             |
| `createdBefore`  | number           | No       | -                                                                                                                                                                                                                                                                             |
| `limit`          | number           | No       | Number of results per page (default: 20, max: 100).                                                                                                                                                                                                                           |
| `cursor`         | string           | No       | Pagination cursor from a previous response.                                                                                                                                                                                                                                   |
| `teamId`         | string           | No       | Team ID to use for this operation.                                                                                                                                                                                                                                            |
| `slug`           | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                                                                                                                   |

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
