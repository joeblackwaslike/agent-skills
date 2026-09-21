---
title: MCP Integrations
product: vercel
url: /docs/mcp/integrations
canonical_url: "https://vercel.com/docs/mcp/integrations"
last_updated: 2026-09-15
type: conceptual
prerequisites:
  - /docs/mcp
related:
  - /docs/mcp
  - /docs/mcp/integrations/eve
  - /docs/mcp/integrations/ai-sdk
  - /docs/mcp/integrations/tanstack-ai
  - /docs/ai-gateway
summary: Connect AI SDK, TanStack AI, and eve applications to MCP servers to discover and call tools.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/mcp/integrations.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "63b69e1fc49c2a6f56dbb2ed2e14abf11eaad4085037efd974c30e47c044a416"
---

# MCP Integrations

Connect your application or agent to a [Model Context Protocol (MCP)](/docs/mcp) server to use its tools. Choose an integration based on how you build your agent:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [MCP Integrations](https://v0.app/docs/MCP?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations&source_site=vercel-docs&relationship=related) — Connect and use MCP servers directly in v0
- [Introducing Vercel MCP: Connect Vercel to your AI tools](https://vercel.com/blog/introducing-vercel-mcp-connect-vercel-to-your-ai-tools?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations&source_site=vercel-docs&relationship=related)
- [MCP server support on Vercel](https://vercel.com/changelog/mcp-server-support-on-vercel?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations&source_site=vercel-docs&relationship=related)
- [MCP Server](https://v0.app/docs/api/v1/adapters/mcp-server?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations&source_site=vercel-docs&relationship=related) — The v0 MCP (Model Context Protocol) server allows you to integrate v0's capabilities directly into your IDE, providing s
- [MCP Connections](https://eve.dev/docs/connections/mcp?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations&source_site=vercel-docs&relationship=related) — Connect an eve agent to a remote MCP server, authorize it with Vercel Connect or static credentials, and control which t
- [How to build an MCP server with Nuxt](https://vercel.com/kb/guide/how-to-build-an-mcp-server-with-nuxt?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations&source_site=vercel-docs&relationship=related) — Add an MCP server to your Nuxt app with the Nuxt MCP Toolkit. Create tools, resources, and prompt templates that AI assi
- [Frameworks and Adapters](https://vercel.com/docs/connect/frameworks?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations&source_site=vercel-docs&relationship=related) — Use Vercel Connect with AI SDK, TanStack AI, MCP clients, eve, Chat SDK, Better Auth, and Auth.js.

Full cross-link map for this page: [/docs/mcp/integrations.graph.md](/docs/mcp/integrations.graph.md?from=related&source_path=%2Fdocs%2Fmcp%2Fintegrations&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Integration | Use it when | Connection setup |
| --- | --- | --- |
| [eve](/docs/mcp/integrations/eve) | You build durable backend agents with eve. | Define a connection under `agent/connections/` and configure authentication. |
| [AI SDK](/docs/mcp/integrations/ai-sdk) | You build agents and model calls with the AI SDK. | Create an MCP client and pass its tools to the model. |
| [TanStack AI](/docs/mcp/integrations/tanstack-ai) | You use TanStack AI's chat and streaming APIs. | Pass an MCP client to `chat()` for managed tool discovery and cleanup. |

The AI SDK and TanStack AI examples connect to a server hosted on Vercel and send model requests through [AI Gateway](/docs/ai-gateway). The eve guide connects to an OAuth-protected MCP server through [Vercel Connect](/docs/connect).

## Connect to a server

Each integration needs the MCP server's endpoint and any credentials that server requires. Model credentials and MCP credentials authenticate separate requests.

For OAuth-protected servers, see the Vercel Connect guides for [AI SDK](/docs/connect/frameworks/ai-sdk-and-mcp) and [eve](/docs/connect/frameworks/eve#authorize-an-mcp-connection).

## More resources

- [Deploy an MCP server on Vercel](/docs/mcp/deploy-mcp-servers-to-vercel) to expose your application's tools.
- [Use Vercel's MCP server](/docs/agent-resources/vercel-mcp) to work with Vercel projects, deployments, and documentation.


---

[View full sitemap](/docs/sitemap)
