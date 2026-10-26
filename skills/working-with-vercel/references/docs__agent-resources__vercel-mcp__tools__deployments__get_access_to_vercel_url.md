---
title: get_access_to_vercel_url
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/get_access_to_vercel_url
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_access_to_vercel_url"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links
summary: Use get_access_to_vercel_url with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_access_to_vercel_url.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "96efe70fd4236879cd717f03ec770c56df3c72ede595cf47350708d5f419f84b"
---

# get_access_to_vercel_url

Create a temporary [shareable link](/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links) that grants access to protected Vercel deployments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [web_fetch_vercel_url](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url) — Use web_fetch_vercel_url with Vercel MCP.
- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment) — Use get_deployment with Vercel MCP.
- [get_deployment_file_contents](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents) — Use get_deployment_file_contents with Vercel MCP.
- [get_project_deployment_protection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_deployment_protection) — Use get_project_deployment_protection with Vercel MCP.
- [get_project_deletion_link](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_deletion_link) — Use get_project_deletion_link with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/get_access_to_vercel_url.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/get_access_to_vercel_url.graph.md)
<!-- /docsgraph:related -->

| Parameter | Type   | Required | Default | Description                                                              |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------ |
| `teamId`  | string | No       | -       | The team ID or slug. Use the team that owns the resource.                |
| `url`     | string | Yes      | -       | The full URL of the Vercel deployment (e.g. "https://myapp.vercel.app"). |

**Sample prompt:** "myapp.vercel.app is protected by auth. Please create a shareable link for it"


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
