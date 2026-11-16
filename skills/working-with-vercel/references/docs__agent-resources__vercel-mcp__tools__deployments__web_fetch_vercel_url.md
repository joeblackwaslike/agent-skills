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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "019ae8790b623790ce447c7f23675a25f1010b5e281bd487a0d5c06ac2d497fc"
---

# web_fetch_vercel_url

Fetch content directly from a Vercel deployment URL (with [authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) if required).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_access_to_vercel_url](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_access_to_vercel_url) — Use get_access_to_vercel_url with Vercel MCP.
- [Get Deployment File Contents](https://vercel.com/docs/rest-api/deployments/get-deployment-file-contents) — GET /v8/deployments/{id}/files/{fileId} — Allows to retrieve the content of a file by supplying the file identifier and
- [get_deployment_file_contents](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents) — Use get_deployment_file_contents with Vercel MCP.
- [search_vercel_documentation](https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/search_vercel_documentation) — Use search_vercel_documentation with Vercel MCP.
- [Get microfrontends config for a deployment](https://vercel.com/docs/rest-api/microfrontends/get-microfrontends-config-for-a-deployment) — GET /v1/microfrontends/{deploymentId}/config — Get the microfrontends config for a deployment.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url.graph.md)
<!-- /docsgraph:related -->

| Parameter | Type   | Required | Default | Description                                                                                         |
| --------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------------- |
| `url`     | string | Yes      | -       | The full URL of the Vercel deployment including the path (e.g. "https://myapp.vercel.app/my-page"). |

**Sample prompt:** "Make sure the content from my-app.vercel.app/api/status looks right"

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
