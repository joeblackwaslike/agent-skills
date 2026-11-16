---
title: rerequest_check
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/checks/rerequest_check
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/rerequest_check"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/checks
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use rerequest_check with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/rerequest_check.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "56f80abb2cc2c7c84549fe9bb93dd54ed0fbdcc6b3e0550df51ac4a31386ba9b"
---

# rerequest_check

Rerequest a check.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Delete a check](https://vercel.com/docs/rest-api/checks-v2/delete-a-check) — DELETE /v2/projects/{projectIdOrName}/checks/{checkId} — Delete an existing check and all of its runs.
- [List runs for a check](https://vercel.com/docs/rest-api/checks-v2/list-runs-for-a-check) — GET /v2/projects/{projectIdOrName}/checks/{checkId}/runs — List all runs associated with a given check.
- [Update a check](https://vercel.com/docs/rest-api/checks-v2/update-a-check) — PATCH /v2/projects/{projectIdOrName}/checks/{checkId} — Update an existing check.
- [Get a check](https://vercel.com/docs/rest-api/checks-v2/get-a-check) — GET /v2/projects/{projectIdOrName}/checks/{checkId} — Return a detailed response for a single check.
- [List check runs for a deployment](https://vercel.com/docs/rest-api/checks-v2/list-check-runs-for-a-deployment) — GET /v2/deployments/{deploymentId}/check-runs — List all check runs for a deployment.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/checks/rerequest_check.graph.md](/docs/agent-resources/vercel-mcp/tools/checks/rerequest_check.graph.md)
<!-- /docsgraph:related -->

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
