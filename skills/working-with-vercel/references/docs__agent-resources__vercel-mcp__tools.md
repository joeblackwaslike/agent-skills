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
  - /docs/agent-resources/vercel-mcp/tools/deployments/list_deployments
  - /docs/agent-resources/vercel-mcp/tools/deployments/get_deployment
  - /docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url
  - /docs/agent-resources/vercel-mcp/tools/observability/get_runtime_logs
summary: Explore Vercel MCP tools for projects, deployments, domains, sandboxes, and more.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "8ae8f2704670a8c74de79b9e37669dab89e1881ae1ebe63d07b148fa64d2960d"
---

# Tools

Vercel MCP tools let your AI assistant work with your projects, deployments, logs, and other Vercel resources. Describe what you want to do, and your assistant selects the tools and supplies their parameters.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Runs now available in the Vercel MCP and CLI](https://vercel.com/changelog/agent-runs-vercel-mcp-cli?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools&source_site=vercel-docs&relationship=related)
- [Tools](https://ai-sdk.dev/docs/foundations/tools?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools&source_site=vercel-docs&relationship=related) — Learn about tools with the AI SDK.
- [@v0-sdk/ai-tools](https://v0.app/docs/api/v1/packages/ai-tools?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools&source_site=vercel-docs&relationship=related) — AI SDK tools for the v0 API
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools&source_site=vercel-docs&relationship=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [Vercel CLI Overview](https://vercel.com/docs/cli?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools&source_site=vercel-docs&relationship=related) — Learn how to use the Vercel command-line interface \\(CLI\\) to manage and configure your Vercel Projects from the command
- [Interact with Integrations using Agent Tools](https://vercel.com/docs/integrations/install-an-integration/agent-tools?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools&source_site=vercel-docs&relationship=related) — Use Agent Tools to query, debug, and manage your installed integrations through a chat interface with natural language.
- [Products](https://vercel.com/docs/products?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools&source_site=vercel-docs&relationship=related) — Browse Vercel products for building, deploying, securing, observing, and scaling web applications.
- [Vercel Toolbar](https://vercel.com/docs/vercel-toolbar?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools&source_site=vercel-docs&relationship=related) — Learn how to use the Vercel Toolbar to leave feedback, navigate through important dashboard pages, share deployments, us

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools.graph.md](/docs/agent-resources/vercel-mcp/tools.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Sign in and grant team access

Before using tools that access your Vercel resources:

1. [Connect your AI client to Vercel MCP](/docs/agent-resources/vercel-mcp#setup).
2. Complete the sign-in flow in your browser with the Vercel account you want to use.
3. Authorize your AI client and grant access to the teams you want it to work with.

Adding the server to your client does not complete authorization. Your assistant needs access to the team that owns a project before it can work with that project's deployments or logs. Your existing Vercel permissions still apply.

Ask your assistant to list your teams and projects to check its access. If a team is missing, check that you're signed in to the right account and have granted the connection access to that team.

## Frequently used tools

Start with these tools to find your resources, inspect deployments, and troubleshoot errors:

| Tool | What you can do |
| --- | --- |
| [`list_deployments`](/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments) | List deployments for a project. |
| [`get_deployment`](/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment) | Inspect a deployment's status and details. |
| [`web_fetch_vercel_url`](/docs/agent-resources/vercel-mcp/tools/deployments/web_fetch_vercel_url) | Fetch content from a deployment URL, including protected deployments you can access. |
| [`get_runtime_logs`](/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_logs) | Read and filter runtime logs for a project or deployment. |
| [`list_projects`](/docs/agent-resources/vercel-mcp/tools/projects/list_projects) | Find projects in a team. |
| [`list_teams`](/docs/agent-resources/vercel-mcp/tools/teams/list_teams) | Find the teams you can access. |
| [`get_project`](/docs/agent-resources/vercel-mcp/tools/projects/get_project) | Inspect a project's configuration and details. |
| [`get_runtime_errors`](/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_errors) | Investigate grouped runtime errors and affected routes. |

For example, ask: "Find my project's latest deployment and check its runtime errors." Your assistant can use several tools to complete the request. Include the team and project name so it can find the right resources.

## Tools by category

Browse the categories below, or expand a category in the sidebar to find a tool.

[Access Groups
4 tools](/docs/agent-resources/vercel-mcp/tools/access-groups)[Agent Runs
4 tools](/docs/agent-resources/vercel-mcp/tools/agent-runs)[AI Gateway
2 tools](/docs/agent-resources/vercel-mcp/tools/ai-gateway)[Authentication
2 tools](/docs/agent-resources/vercel-mcp/tools/authentication)[Billing and Purchases
9 tools](/docs/agent-resources/vercel-mcp/tools/billing)[Caching
6 tools](/docs/agent-resources/vercel-mcp/tools/caching)[Checks
10 tools](/docs/agent-resources/vercel-mcp/tools/checks)[Deployments
12 tools](/docs/agent-resources/vercel-mcp/tools/deployments)[Documentation and CLI
2 tools](/docs/agent-resources/vercel-mcp/tools/documentation)[Domains and DNS
19 tools](/docs/agent-resources/vercel-mcp/tools/domains)[Drains
5 tools](/docs/agent-resources/vercel-mcp/tools/drains)[Environment Variables
8 tools](/docs/agent-resources/vercel-mcp/tools/environment-variables)[Feature Flags
11 tools](/docs/agent-resources/vercel-mcp/tools/feature-flags)[Firewall and Security
6 tools](/docs/agent-resources/vercel-mcp/tools/firewall)[Global Config
7 tools](/docs/agent-resources/vercel-mcp/tools/global-config)[Integrations
6 tools](/docs/agent-resources/vercel-mcp/tools/integrations)[Key Management
9 tools](/docs/agent-resources/vercel-mcp/tools/key-management)[Microfrontends
3 tools](/docs/agent-resources/vercel-mcp/tools/microfrontends)[Networking
3 tools](/docs/agent-resources/vercel-mcp/tools/networking)[Observability
5 tools](/docs/agent-resources/vercel-mcp/tools/observability)[Projects
12 tools](/docs/agent-resources/vercel-mcp/tools/projects)[Rolling Releases
10 tools](/docs/agent-resources/vercel-mcp/tools/rolling-releases)[Routing
15 tools](/docs/agent-resources/vercel-mcp/tools/routing)[Sandboxes
23 tools](/docs/agent-resources/vercel-mcp/tools/sandboxes)[Storage
2 tools](/docs/agent-resources/vercel-mcp/tools/storage)[Teams and Users
8 tools](/docs/agent-resources/vercel-mcp/tools/teams)[Toolbar
6 tools](/docs/agent-resources/vercel-mcp/tools/toolbar)[Web Analytics
4 tools](/docs/agent-resources/vercel-mcp/tools/web-analytics)


---

[View full sitemap](/docs/sitemap)
