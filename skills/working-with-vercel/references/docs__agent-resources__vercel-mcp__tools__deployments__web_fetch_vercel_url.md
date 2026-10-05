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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "f0560d999c962d823db1ef052c39607d601ba0418630abf4b4f3bf9b25d0f9f8"
---

# web_fetch_vercel_url

Fetch content directly from a Vercel deployment URL (with [authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) if required).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_access_to_vercel_url](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_access_to_vercel_url?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fweb_fetch_vercel_url&source_site=vercel-docs&relationship=related) — Use get_access_to_vercel_url with Vercel MCP.
- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fweb_fetch_vercel_url&source_site=vercel-docs&relationship=related) — Use get_deployment with Vercel MCP.
- [get_deployment_file_contents](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fweb_fetch_vercel_url&source_site=vercel-docs&relationship=related) — Use get_deployment_file_contents with Vercel MCP.
- [Get Deployment File Contents](https://vercel.com/docs/rest-api/deployments/get-deployment-file-contents?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fweb_fetch_vercel_url&source_site=vercel-docs&relationship=related) — GET /v8/deployments/{id}/files/{fileId} — Allows to retrieve the content of a file by supplying the file identifier and
- [use_vercel_cli](https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/use_vercel_cli?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fweb_fetch_vercel_url&source_site=vercel-docs&relationship=related) — Use use_vercel_cli with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fweb_fetch_vercel_url&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Parameter | Type   | Required | Default | Description                                                                                         |
| --------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------------- |
| `url`     | string | Yes      | -       | The full URL of the Vercel deployment including the path (e.g., 'https://myapp.vercel.app/my-page') |

**Sample prompt:** "Make sure the content from my-app.vercel.app/api/status looks right"


---

[View full sitemap](/docs/sitemap)
