---
title: get_deployment_feature_flags
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_feature_flags
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_feature_flags"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_deployment_feature_flags with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_feature_flags.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "8ea1d8560f52cedea5ee4e9629b71664cba1187d7904a160e12983c30716ca84"
---

# get_deployment_feature_flags

Retrieve the feature flags of a deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Retrieve the feature flags of a deployment](https://vercel.com/docs/rest-api/feature-flags/retrieve-the-feature-flags-of-a-deployment) — GET /v1/deployments/{deploymentId}/feature-flags — Retrieve the feature flags of a deployment.
- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment) — Use get_deployment with Vercel MCP.
- [list_deployment_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files) — Use list_deployment_files with Vercel MCP.
- [get_deployment_file_contents](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents) — Use get_deployment_file_contents with Vercel MCP.
- [get_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_settings) — Use get_flag_settings with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_feature_flags.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_feature_flags.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `deploymentId` | string | Yes      | The deployment ID.                                          |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
