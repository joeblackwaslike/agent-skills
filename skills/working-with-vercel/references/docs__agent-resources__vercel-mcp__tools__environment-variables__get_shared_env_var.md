---
title: get_shared_env_var
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/environment-variables/get_shared_env_var
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_shared_env_var"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/environment-variables
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_shared_env_var with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_shared_env_var.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "3b841d7c077d545a789d66ef12d2427f8ca45a6acf49f601365ab3c0edbf8567"
---

# get_shared_env_var

Retrieve the decrypted value of a Shared Environment Variable by id.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env) — Use get_project_env with Vercel MCP.
- [Retrieve the decrypted value of a Shared Environment Variable by id.](https://vercel.com/docs/rest-api/environment/retrieve-the-decrypted-value-of-a-shared-environment-variable-by-id) — GET /v1/env/{id} — Retrieve the decrypted value of a Shared Environment Variable by id.
- [get_custom_environment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_custom_environment) — Use get_custom_environment with Vercel MCP.
- [Shared environment variables](https://vercel.com/docs/environment-variables/shared-environment-variables) — Learn how to use Shared environment variables, which are environment variables that you define at the Team level and can
- [get_access_to_vercel_url](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_access_to_vercel_url) — Use get_access_to_vercel_url with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/environment-variables/get_shared_env_var.graph.md](/docs/agent-resources/vercel-mcp/tools/environment-variables/get_shared_env_var.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                                   |
| --------- | ------ | -------- | ----------------------------------------------------------------------------- |
| `id`      | string | Yes      | The unique ID for the Shared Environment Variable to get the decrypted value. |
| `teamId`  | string | No       | Team ID to use for this operation.                                            |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId.                   |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
