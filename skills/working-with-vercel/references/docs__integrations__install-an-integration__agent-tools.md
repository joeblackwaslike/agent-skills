---
title: Interact with Integrations using Agent Tools
product: vercel
url: /docs/integrations/install-an-integration/agent-tools
canonical_url: "https://vercel.com/docs/integrations/install-an-integration/agent-tools"
last_updated: 2026-02-27
type: how-to
prerequisites:
  - /docs/integrations/install-an-integration
  - /docs/integrations
related:
  - /docs/integrations/install-an-integration/product-integration
summary: Use Agent Tools to query, debug, and manage your installed integrations through a chat interface with natural language.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/install-an-integration/agent-tools.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "d2f5ab348ba53924a8ae86f708d73796ed112a233710b25dc5d65ec235d2af2a"
---

# Interact with Integrations using Agent Tools

> **🔒 Permissions Required**: Agent Tools

With Agent Tools, you can interact with your installed integrations through a chat interface in the Vercel Dashboard. Instead of navigating through settings and forms, ask questions and run commands in natural language.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Chat with Vercel Marketplace integrations using Vercel Agent](https://vercel.com/changelog/chat-with-vercel-marketplace-integrations-using-vercel-agent?from=related&source_path=%2Fdocs%2Fintegrations%2Finstall-an-integration%2Fagent-tools&source_site=vercel-docs&relationship=related)
- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations?from=related&source_path=%2Fdocs%2Fintegrations%2Finstall-an-integration%2Fagent-tools&source_site=vercel-docs&relationship=related) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Vercel CLI for Marketplace integrations optimized for agents](https://vercel.com/changelog/vercel-cli-for-marketplace-integrations-optimized-for-agents?from=related&source_path=%2Fdocs%2Fintegrations%2Finstall-an-integration%2Fagent-tools&source_site=vercel-docs&relationship=related)
- [MCP Integrations](https://v0.app/docs/MCP?from=related&source_path=%2Fdocs%2Fintegrations%2Finstall-an-integration%2Fagent-tools&source_site=vercel-docs&relationship=related) — Connect and use MCP servers directly in v0
- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent?from=related&source_path=%2Fdocs%2Fintegrations%2Finstall-an-integration%2Fagent-tools&source_site=vercel-docs&relationship=related) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [Build with AI agents on Vercel](https://vercel.com/docs/agent-resources/integrations-for-agents?from=related&source_path=%2Fdocs%2Fintegrations%2Finstall-an-integration%2Fagent-tools&source_site=vercel-docs&relationship=related) — Install AI agents and services through the Vercel Marketplace to automate workflows and build custom AI systems.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel?from=related&source_path=%2Fdocs%2Fintegrations%2Finstall-an-integration%2Fagent-tools&source_site=vercel-docs&relationship=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Installation](https://vercel.com/docs/agent/installation?from=related&source_path=%2Fdocs%2Fintegrations%2Finstall-an-integration%2Fagent-tools&source_site=vercel-docs&relationship=related) — Let AI automatically install Web Analytics and Speed Insights in your app
- [Build with AI on Vercel](https://vercel.com/docs/agent-resources/integrations-for-models?from=related&source_path=%2Fdocs%2Fintegrations%2Finstall-an-integration%2Fagent-tools&source_site=vercel-docs&relationship=related) — Integrate powerful AI services and models seamlessly into your Vercel projects.
- [Storage on Vercel Marketplace](https://vercel.com/docs/marketplace-storage?from=related&source_path=%2Fdocs%2Fintegrations%2Finstall-an-integration%2Fagent-tools&source_site=vercel-docs&relationship=related) — Connect Postgres, Redis, NoSQL, and other storage solutions through the Vercel Marketplace. Run SQL queries, edit data,

Full cross-link map for this page: [/docs/integrations/install-an-integration/agent-tools.graph.md](/docs/integrations/install-an-integration/agent-tools.graph.md?from=related&source_path=%2Fdocs%2Fintegrations%2Finstall-an-integration%2Fagent-tools&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

When you install an integration from the Marketplace, any tools that the provider has enabled via MCP (Model Context Protocol) become available automatically. Vercel handles the authentication and configuration, so you can start querying your services immediately.

## What you can do with Agent Tools

You can use the chat interface to:

- Query databases and view table structures
- Run SQL queries on your data
- Inspect cache contents and performance metrics
- Fetch logs for debugging
- Trigger test events in your services
- Manage media assets and check processing status

This works with installed native integrations that provide tools through the MCP standard, including Neon, Prisma, Supabase, Dash0, Stripe, and Mux.

## Access Agent Tools

To use Agent Tools:

1. From the [Vercel Dashboard](/dashboard), make sure you have at least one native integration installed. See [Add a Native Integration](/docs/integrations/install-an-integration/product-integration) to install integrations.
2. Open [**Integrations**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fintegrations\&title=Go+to+Integrations) in your dashboard.
3. Select an integration that supports Agent Tools.
4. Click on **Agent Tools** in the left navigation to open the chat interface.
5. Your installed integration's tools load automatically and are ready to use.

## Read-Only Mode

Agent Tools includes a **Read-Only Mode** toggle that is enabled by default. When enabled, you can query and view data, but cannot perform any actions that modify your services (such as creating, updating, or deleting resources).

This is useful for:

- Safely exploring your data without risk of accidental changes
- Allowing team members to investigate issues without write access
- Demonstrating integrations without modifying production data

To disable Read-Only Mode, click the toggle at the bottom of the Agent Tools interface. Be aware that this will allow the agent to create, modify, or delete resources within your connected projects.

## Interact with your integrations

Type natural language questions or commands in the chat interface. The agent understands what you're trying to do and routes your request to the appropriate integration.

Here are some examples of queries you can try:

- "Show me all my tables in this Neon database"
- "Run my Supabase SQL query"
- "Fetch my Dash0 logs"
- "Trigger a Stripe test event"

The specific tools and capabilities available depend on what each provider has enabled. You can ask questions about your data, run queries, check statuses, and manage your services directly through the chat interface.

## Supported integrations

Agent Tools is currently enabled for the following integrations: [Neon](https://vercel.com/marketplace/neon), [Prisma](https://vercel.com/marketplace/prisma), [Supabase](https://vercel.com/marketplace/supabase), [Dash0](https://vercel.com/marketplace/dash0), [Stripe](https://vercel.com/marketplace/stripe), and [Mux](https://vercel.com/marketplace/mux).

## Next steps

- [Learn how to add a native integration](/docs/integrations/install-an-integration/product-integration) to your project


---

[View full sitemap](/docs/sitemap)
