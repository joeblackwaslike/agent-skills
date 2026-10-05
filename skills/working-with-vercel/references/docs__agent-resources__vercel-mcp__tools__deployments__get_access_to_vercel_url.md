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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "0b988962cbe2679453edbaafaa09626098cd4a9ec00f911522703503333356ed"
---

# get_access_to_vercel_url

Create a temporary [shareable link](/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links) that grants access to protected Vercel deployments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [web_fetch_vercel_url](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_access_to_vercel_url&source_site=vercel-docs&relationship=related) — Use web_fetch_vercel_url with Vercel MCP.
- [Agents can now access protected deployments via Vercel’s MCP server](https://vercel.com/changelog/give-agents-access-to-protected-deployments-via-vercels-mcp-server?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_access_to_vercel_url&source_site=vercel-docs&relationship=related)
- [Accessing Deployments through Generated URLs](https://vercel.com/docs/deployments/generated-urls?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_access_to_vercel_url&source_site=vercel-docs&relationship=related) — When you create a new deployment, Vercel will automatically generate a unique URL which you can use to access that parti
- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_access_to_vercel_url&source_site=vercel-docs&relationship=related) — Use get_deployment with Vercel MCP.
- [use_vercel_cli](https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/use_vercel_cli?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_access_to_vercel_url&source_site=vercel-docs&relationship=related) — Use use_vercel_cli with Vercel MCP.
- [get_deployment_file_contents](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_access_to_vercel_url&source_site=vercel-docs&relationship=related) — Use get_deployment_file_contents with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/get_access_to_vercel_url.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/get_access_to_vercel_url.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_access_to_vercel_url&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Parameter | Type   | Required | Default | Description                                                              |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------ |
| `url`     | string | Yes      | -       | The full URL of the Vercel deployment (e.g., 'https://myapp.vercel.app') |

**Sample prompt:** "myapp.vercel.app is protected by auth. Please create a shareable link for it"


---

[View full sitemap](/docs/sitemap)
