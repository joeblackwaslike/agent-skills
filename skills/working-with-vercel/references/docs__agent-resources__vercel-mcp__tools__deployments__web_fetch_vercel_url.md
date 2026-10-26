---
title: web_fetch_vercel_url
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
summary: Use web_fetch_vercel_url with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "0ae9fb7aa9e90e9fa18e5b26dc1645a38b2fdcdd5567a5d98d0b1e36a832d53b"
---

# web_fetch_vercel_url

Fetch content directly from a Vercel deployment URL (with [authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) if required).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_access_to_vercel_url](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_access_to_vercel_url) — Use get_access_to_vercel_url with Vercel MCP.
- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment) — Use get_deployment with Vercel MCP.
- [get_deployment_file_contents](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents) — Use get_deployment_file_contents with Vercel MCP.
- [Get Deployment File Contents](https://vercel.com/docs/rest-api/deployments/get-deployment-file-contents) — GET /v8/deployments/{id}/files/{fileId} — Allows to retrieve the content of a file by supplying the file identifier and
- [get_auth_user](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_auth_user) — Use get_auth_user with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url.graph.md)
<!-- /docsgraph:related -->

| Parameter | Type   | Required | Default | Description                                                                                         |
| --------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------------- |
| `url`     | string | Yes      | -       | The full URL of the Vercel deployment including the path (e.g. "https://myapp.vercel.app/my-page"). |

**Sample prompt:** "Make sure the content from my-app.vercel.app/api/status looks right"


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
