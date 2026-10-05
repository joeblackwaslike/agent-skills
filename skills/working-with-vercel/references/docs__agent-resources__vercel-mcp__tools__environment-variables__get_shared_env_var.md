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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "c273d0623dec8d771bbacae54674570e11c105306349e788d50a9065231e65fb"
---

# get_shared_env_var

Retrieve the decrypted value of a Shared Environment Variable by id.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fget_shared_env_var&source_site=vercel-docs&relationship=related) — Use get_project_env with Vercel MCP.
- [update_shared_env_variable](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/update_shared_env_variable?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fget_shared_env_var&source_site=vercel-docs&relationship=related) — Use update_shared_env_variable with Vercel MCP.
- [get_custom_environment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_custom_environment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fget_shared_env_var&source_site=vercel-docs&relationship=related) — Use get_custom_environment with Vercel MCP.
- [Retrieve the decrypted value of a Shared Environment Variable by id.](https://vercel.com/docs/rest-api/environment/retrieve-the-decrypted-value-of-a-shared-environment-variable-by-id?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fget_shared_env_var&source_site=vercel-docs&relationship=related) — GET /v1/env/{id} — Retrieve the decrypted value of a Shared Environment Variable by id.
- [Shared environment variables](https://vercel.com/docs/environment-variables/shared-environment-variables?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fget_shared_env_var&source_site=vercel-docs&relationship=related) — Learn how to use Shared environment variables, which are environment variables that you define at the Team level and can

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/environment-variables/get_shared_env_var.graph.md](/docs/agent-resources/vercel-mcp/tools/environment-variables/get_shared_env_var.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables%2Fget_shared_env_var&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                                   |
| --------- | ------ | -------- | ----------------------------------------------------------------------------- |
| `id`      | string | Yes      | The unique ID for the Shared Environment Variable to get the decrypted value. |
| `teamId`  | string | No       | Team ID.                                                                      |
| `slug`    | string | No       | Team slug.                                                                    |


---

[View full sitemap](/docs/sitemap)
