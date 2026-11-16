---
title: Checks
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/checks
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for checks.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "866719c778ca1e1eabca375da74fc8f7991e166ba553d2d2463ceb976a2d4344"
---

# Checks

Request another run of a legacy deployment check. MCP does not create checks or manage the newer deployment check-run API.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Checks API Reference](https://vercel.com/docs/checks/checks-api) — The Vercel Checks API lets you create tests and assertions that run after each deployment has been built, and are powere
- [Anatomy of the Checks API](https://vercel.com/docs/checks/creating-checks) — Learn how to create your own Checks with Vercel Integrations. You can build your own Integration to register any arbitra
- [List runs for a check](https://vercel.com/docs/rest-api/checks-v2/list-runs-for-a-check) — GET /v2/projects/{projectIdOrName}/checks/{checkId}/runs — List all runs associated with a given check.
- [List check runs for a deployment](https://vercel.com/docs/rest-api/checks-v2/list-check-runs-for-a-deployment) — GET /v2/deployments/{deploymentId}/check-runs — List all check runs for a deployment.
- [Delete a check](https://vercel.com/docs/rest-api/checks-v2/delete-a-check) — DELETE /v2/projects/{projectIdOrName}/checks/{checkId} — Delete an existing check and all of its runs.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/checks.graph.md](/docs/agent-resources/vercel-mcp/tools/checks.graph.md)
<!-- /docsgraph:related -->

## `rerequest_check`

Rerequest a check.

## Parameters

| Parameter      | Type    | Required | Description                                                 |
| -------------- | ------- | -------- | ----------------------------------------------------------- |
| `deploymentId` | string  | Yes      | The deployment to rerun the check for.                      |
| `checkId`      | string  | Yes      | The check to rerun                                          |
| `autoUpdate`   | boolean | No       | Mark the check as running                                   |
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
