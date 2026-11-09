---
title: Tools
product: vercel
url: /docs/agent-resources/vercel-mcp/tools
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools"
last_updated: 2026-09-15
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp
  - /docs/agent-resources
related:
  - /docs/agent-resources/vercel-mcp
  - /docs/cli
  - /docs/agent-resources/vercel-mcp/tools/deployments/list_deployments
  - /docs/agent-resources/vercel-mcp/tools/deployments/get_deployment
  - /docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url
summary: Explore Vercel MCP tools for projects, deployments, domains, sandboxes, and more.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "ad8f910dbae96b81e353581eb78dc2d3ad3f8a13f785dadf8ebd37cfee0478ef"
---

# Tools

Vercel MCP tools let your AI assistant work with your projects, deployments, logs, and other Vercel resources. Describe what you want to do, and your assistant selects the tools and supplies their parameters.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Runs now available in the Vercel MCP and CLI](https://vercel.com/changelog/agent-runs-vercel-mcp-cli)
- [Tools](https://ai-sdk.dev/docs/foundations/tools) — Learn about tools with the AI SDK.
- [Introducing Vercel MCP: Connect Vercel to your AI tools](https://vercel.com/blog/introducing-vercel-mcp-connect-vercel-to-your-ai-tools)
- [Introducing new developer tools in the Vercel Toolbar](https://vercel.com/blog/introducing-new-developer-tools-in-the-vercel-toolbar)
- [Addressing security and quality issues with MCP tools in AI Agent](https://vercel.com/blog/generate-static-ai-sdk-tools-from-mcp-servers-with-mcp-to-ai-sdk)
- [Interact with Integrations using Agent Tools](https://vercel.com/docs/integrations/install-an-integration/agent-tools) — Use Agent Tools to query, debug, and manage your installed integrations through a chat interface with natural language.
- [AI Gateway Tool Use and Function Calling](https://vercel.com/docs/ai-gateway/inputs-and-tools/tool-use) — Connect AI Gateway models to application tools with AI SDK 7, Python, Chat Completions, Messages, and Responses examples
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [Vercel Toolbar](https://vercel.com/docs/vercel-toolbar) — Learn how to use the Vercel Toolbar to leave feedback, navigate through important dashboard pages, share deployments, us
- [Deploy MCP servers to Vercel](https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel) — Learn how to deploy Model Context Protocol \\(MCP\\) servers on Vercel with OAuth authentication and efficient scaling.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools.graph.md](/docs/agent-resources/vercel-mcp/tools.graph.md)
<!-- /docsgraph:related -->

## Sign in and grant team access

Before using tools that access your Vercel resources:

1. [Connect your AI client to Vercel MCP](/docs/agent-resources/vercel-mcp#setup).
2. Complete the sign-in flow in your browser with the Vercel account you want to use.
3. Authorize your AI client and grant access to the teams you want it to work with.

Adding the server to your client does not complete authorization. Your assistant needs access to the team that owns a project before it can work with that project's deployments or logs. Your existing Vercel permissions still apply.

Ask your assistant to list your teams and projects to check its access. If a team is missing, check that you're signed in to the right account and have granted the connection access to that team.

## Tool availability

Your connection's tool list shows the tools you can call and their current parameters. This reference covers catalog tools and workflow or widget tools. Availability depends on server configuration, client support, and team or project scope. Some connections expose a smaller workflow tool list. Tools with the same name can have different parameters on those connections. Follow the schema returned by your connection.

A listed tool still requires the relevant OAuth grant and Vercel permissions. Tools available in one AI client might not be available in another. This reference does not guarantee that every listed tool has approval for every client.

## Unavailable tools

The MCP catalog excludes endpoints that require unsupported credentials or permissions. It does not create AI Gateway API keys, exchange SSO tokens, import KMS private keys, or sign KMS messages or tokens. Use the relevant Vercel dashboard or [CLI](/docs/cli) workflow when MCP does not expose the action.

MCP and CLI use separate authentication. Keep the same team, project, and resource when switching. After an uncertain write, inspect the resource before retrying. A successful CLI request does not prove that your MCP OAuth connection has the same access.

## Frequently used tools

Start with these tools to find your resources, inspect deployments, and troubleshoot errors:

| Tool                                                                                              | What you can do                                                                      |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [`list_deployments`](/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments)         | List deployments for a project.                                                      |
| [`get_deployment`](/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment)             | Inspect a deployment's status and details.                                           |
| [`web_fetch_vercel_url`](/docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url) | Fetch content from a deployment URL, including protected deployments you can access. |
| [`get_runtime_logs`](/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_logs)       | Read and filter runtime logs for a project or deployment.                            |
| [`list_projects`](/docs/agent-resources/vercel-mcp/tools/projects/list_projects)                  | Find projects in a team.                                                             |
| [`list_teams`](/docs/agent-resources/vercel-mcp/tools/teams/list_teams)                           | Find the teams you can access.                                                       |
| [`get_project`](/docs/agent-resources/vercel-mcp/tools/projects/get_project)                      | Inspect a project's configuration and details.                                       |
| [`get_runtime_errors`](/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_errors)   | Investigate grouped runtime errors and affected routes.                              |

For example, ask: "Find my project's latest deployment and check its runtime errors." Your assistant can use several tools to complete the request. Include the team and project name so it can find the right resources.

## Tools by category

Browse the categories below, or expand a category in the sidebar to find a tool.

[Access Groups](/docs/agent-resources/vercel-mcp/tools/access-groups)[Agent Runs](/docs/agent-resources/vercel-mcp/tools/agent-runs)[Billing and Purchases](/docs/agent-resources/vercel-mcp/tools/billing)[Caching](/docs/agent-resources/vercel-mcp/tools/caching)[Checks](/docs/agent-resources/vercel-mcp/tools/checks)[Deployments](/docs/agent-resources/vercel-mcp/tools/deployments)[Documentation, CLI, and Feedback](/docs/agent-resources/vercel-mcp/tools/documentation)[Domains and DNS](/docs/agent-resources/vercel-mcp/tools/domains)[Drains](/docs/agent-resources/vercel-mcp/tools/drains)[Environment Variables](/docs/agent-resources/vercel-mcp/tools/environment-variables)[Feature Flags](/docs/agent-resources/vercel-mcp/tools/feature-flags)[Firewall and Security](/docs/agent-resources/vercel-mcp/tools/firewall)[Global Config](/docs/agent-resources/vercel-mcp/tools/global-config)[Integrations](/docs/agent-resources/vercel-mcp/tools/integrations)[Key Management](/docs/agent-resources/vercel-mcp/tools/key-management)[Microfrontends](/docs/agent-resources/vercel-mcp/tools/microfrontends)[Networking](/docs/agent-resources/vercel-mcp/tools/networking)[Observability](/docs/agent-resources/vercel-mcp/tools/observability)[Projects](/docs/agent-resources/vercel-mcp/tools/projects)[Rolling Releases](/docs/agent-resources/vercel-mcp/tools/rolling-releases)[Routing](/docs/agent-resources/vercel-mcp/tools/routing)[Sandboxes](/docs/agent-resources/vercel-mcp/tools/sandboxes)[Storage](/docs/agent-resources/vercel-mcp/tools/storage)[Teams and Users](/docs/agent-resources/vercel-mcp/tools/teams)[Toolbar](/docs/agent-resources/vercel-mcp/tools/toolbar)[Vercel CI](/docs/agent-resources/vercel-mcp/tools/vercel-ci)[Web Analytics](/docs/agent-resources/vercel-mcp/tools/web-analytics)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
