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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "b65c0af2343d7a2707caa0d8c745e3ffd5bd4a7ba7e86dae5a9ad5345f3ca634"
---

# Tools

Vercel MCP tools let your AI assistant work with your projects, deployments, logs, and other Vercel resources. Describe what you want to do, and your assistant selects the tools and supplies their parameters.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Runs now available in the Vercel MCP and CLI](https://vercel.com/changelog/agent-runs-vercel-mcp-cli)
- [Tools](https://ai-sdk.dev/docs/foundations/tools) — Learn about tools with the AI SDK.
- [@v0-sdk/ai-tools](https://v0.app/docs/api/v1/packages/ai-tools) — AI SDK tools for the v0 API
- [AI Tools Example](https://v0.app/docs/api/v1/examples/ai-tools) — Using v0-sdk with AI SDK for programmatic interaction
- [AI Tools](https://v0.app/docs/api/v1/adapters/ai-tools) — Integrate v0 API with AI SDK to build autonomous agents and intelligent workflows
- [Interact with Integrations using Agent Tools](https://vercel.com/docs/integrations/install-an-integration/agent-tools) — Use Agent Tools to query, debug, and manage your installed integrations through a chat interface with natural language.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [AI Gateway Tool Use and Function Calling](https://vercel.com/docs/ai-gateway/inputs-and-tools/tool-use) — Connect AI Gateway models to application tools with AI SDK 7, Python, Chat Completions, Messages, and Responses examples
- [Products](https://vercel.com/docs/products) — Browse Vercel products for building, deploying, securing, observing, and scaling web applications.
- [Vercel Toolbar](https://vercel.com/docs/vercel-toolbar) — Learn how to use the Vercel Toolbar to leave feedback, navigate through important dashboard pages, share deployments, us

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

Your connection's tool list shows the tools you can call and their current parameters. This reference covers 217 catalog tools and 30 workflow or widget tools. Availability depends on server configuration, client support, and team or project scope. Some connections expose a smaller workflow tool list. Tools with the same name can have different parameters on those connections. Follow the schema returned by your connection.

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

[Access Groups
5 tools](/docs/agent-resources/vercel-mcp/tools/access-groups)[Agent Runs
4 tools](/docs/agent-resources/vercel-mcp/tools/agent-runs)[Billing and Purchases
5 tools](/docs/agent-resources/vercel-mcp/tools/billing)[Caching
6 tools](/docs/agent-resources/vercel-mcp/tools/caching)[Checks
1 tool](/docs/agent-resources/vercel-mcp/tools/checks)[Deployments
17 tools](/docs/agent-resources/vercel-mcp/tools/deployments)[Documentation and CLI
2 tools](/docs/agent-resources/vercel-mcp/tools/documentation)[Domains and DNS
28 tools](/docs/agent-resources/vercel-mcp/tools/domains)[Drains
5 tools](/docs/agent-resources/vercel-mcp/tools/drains)[Environment Variables
7 tools](/docs/agent-resources/vercel-mcp/tools/environment-variables)[Feature Flags
16 tools](/docs/agent-resources/vercel-mcp/tools/feature-flags)[Firewall and Security
6 tools](/docs/agent-resources/vercel-mcp/tools/firewall)[Global Config
13 tools](/docs/agent-resources/vercel-mcp/tools/global-config)[Integrations
6 tools](/docs/agent-resources/vercel-mcp/tools/integrations)[Key Management
9 tools](/docs/agent-resources/vercel-mcp/tools/key-management)[Microfrontends
2 tools](/docs/agent-resources/vercel-mcp/tools/microfrontends)[Networking
7 tools](/docs/agent-resources/vercel-mcp/tools/networking)[Observability
7 tools](/docs/agent-resources/vercel-mcp/tools/observability)[Projects
17 tools](/docs/agent-resources/vercel-mcp/tools/projects)[Rolling Releases
10 tools](/docs/agent-resources/vercel-mcp/tools/rolling-releases)[Routing
17 tools](/docs/agent-resources/vercel-mcp/tools/routing)[Sandboxes
23 tools](/docs/agent-resources/vercel-mcp/tools/sandboxes)[Storage
2 tools](/docs/agent-resources/vercel-mcp/tools/storage)[Teams and Users
6 tools](/docs/agent-resources/vercel-mcp/tools/teams)[Toolbar
6 tools](/docs/agent-resources/vercel-mcp/tools/toolbar)[Vercel CI
15 tools](/docs/agent-resources/vercel-mcp/tools/vercel-ci)[Web Analytics
5 tools](/docs/agent-resources/vercel-mcp/tools/web-analytics)


---

[View full sitemap](/docs/sitemap)
