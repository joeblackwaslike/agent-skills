---
title: Vercel Documentation
product: vercel
url: /docs
canonical_url: "https://vercel.com/docs"
last_updated: 2026-09-13
type: conceptual
prerequisites:
  []
related:
  - /docs/agent-resources/vercel-plugin
  - /docs/agent-resources/skills
  - /docs/agent-resources/vercel-mcp
  - /docs/connect
  - /docs/deployments/claim-deployments
summary: Find guides and reference documentation for building, deploying, and managing applications with Vercel, including the CLI, SDKs, and APIs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs.md"
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "ebca344645fb7dff3068e3aaa27e934f3e4749aac24a709ddd16ad2e6ff29eb2"
---

# Vercel Documentation

## Ship anything with Vercel

Deploy your first app, set up your coding agent to build and deploy on Vercel, or call any AI model through AI Gateway.

#### Deploy an app

```bash filename="terminal"
npm i -g vercel
vercel login
vercel
```

#### Set up your agent

```bash filename="terminal"
# Plugin for Claude Code, Codex, Grok Build, Cursor, Copilot, Kimi Code
npx plugins add vercel/vercel-plugin

# Plugin for OpenCode
opencode plugin add github:vercel/vercel-plugin

# Skills for any other agent
npx skills add vercel-labs/agent-skills

# Let your agent manage projects, deployments, and logs
npx -y add-mcp https://mcp.vercel.com -g

# Route your agent's model calls through AI Gateway
npx vercel ai-gateway setup
```

#### Call a model

```bash filename="terminal"
# Create an API key and export the key it prints
vercel ai-gateway api-keys create
export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"

# Call any model through one endpoint
curl https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "messages": [{ "role": "user", "content": "Why is the sky blue?" }]
  }'
```

## Set up your coding agent

Set up the agent you code with, and the platform for the agents you ship. This prompt hands your agent the [Vercel agent setup playbook](https://vercel.com/get-started.md), the same one the Onboard your agent button uses:

**Agent prompt**

```text
Set up Vercel for me. Fetch https://vercel.com/get-started.md and follow it.
```

**Vercel Plugin**: Give your coding agent deployment skills, framework best practices, and slash commands. Works with Claude Code, OpenAI Codex, Grok Build, Cursor, GitHub Copilot, Kimi Code, and OpenCode. [Learn more →](/docs/agent-resources/vercel-plugin)

**Agent Skills**: Install skills for any agent that supports them, covering Next.js, the AI SDK, Turborepo, and deploying to Vercel. [Learn more →](/docs/agent-resources/skills)

**Vercel MCP**: Let your agent search the docs, manage projects and deployments, and query Web Analytics through the Vercel MCP server. [Learn more →](/docs/agent-resources/vercel-mcp)

**Vercel Connect**: Give your agent short-lived tokens to call Slack, GitHub, Microsoft, Snowflake, or any OAuth or API-key service, and act on behalf of users, without storing provider secrets. [Learn more →](/docs/connect)

**Claim Deployments**: Let your agent deploy apps for users, then transfer ownership with a claim URL so each deployment lands in the user's own Vercel account. [Learn more →](/docs/deployments/claim-deployments)

**Containers**: Run your agent's runtime and tools from a Docker image on Vercel Functions, or give Sandbox a custom image for the code your agent executes. [Learn more →](/docs/container-registry)

## What's new

The latest changes across the Vercel platform. Browse the full [changelog](https://vercel.com/changelog) for everything that shipped.

- Oct 9, 2026: [Agents can now buy domains with the Vercel CLI](https://vercel.com/changelog/agents-can-now-buy-domains-with-the-vercel-cli). Agents can now use the Vercel CLI to purchase domains.
- Oct 9, 2026: [New Pro teams now default to 30-day deployment retention](https://vercel.com/changelog/new-pro-teams-now-default-to-30-day-deployment-retention). New Pro teams use 30-day deployment retention by default, with the option to keep longer history.
- Oct 9, 2026: [Deployment Storage billing begins for existing Pro teams](https://vercel.com/changelog/deployment-storage-pricing-expands-to-existing-teams). Existing Pro teams will pay $0.10 per GB-month for Deployment Storage and Functions Storage, and the retention window moves to 30 days on October 23.
- Oct 9, 2026: [Microsoft Decision-1 now available on AI Gateway](https://vercel.com/changelog/microsoft-decision-1-now-available-on-ai-gateway). Call Microsoft's Decision-1 through Vercel AI Gateway with one API key to classify text, route requests, and track usage and spend

## Build with AI

**AI Gateway**: Call hundreds of models through one endpoint with the AI SDK, any OpenAI-compatible SDK, or cURL, with budgets, fallbacks, and usage monitoring. [Learn more →](/docs/ai-gateway)

**AI SDK**: Build chat, agents, and structured output in TypeScript with streaming and tool calling across React, Next.js, Vue, Svelte, and Node.js. [Learn more →](/docs/ai-sdk)

**eve**: Deploy and run durable backend AI agents built with eve, an open-source, filesystem-first agent framework. [Learn more →](/docs/eve)

**Sandbox**: Run untrusted or agent-generated code in isolated, ephemeral execution environments. [Learn more →](/docs/sandbox)

**Workflows**: Build durable, observable applications and AI agents with the Workflow SDK on a fully managed platform. [Learn more →](/docs/workflows)

**MCP Servers**: Build and deploy Model Context Protocol servers so agents can call your APIs and systems as tools. [Learn more →](/docs/mcp)

## Build your app

**Next.js**: Deploy Next.js with zero configuration, or bring one of 40+ supported frameworks. [Learn more →](/docs/frameworks/full-stack/nextjs)

**Functions**: Run server-side code on demand with Fluid compute, which scales concurrency for AI and I/O-heavy workloads. [Learn more →](/docs/functions)

**Routing Middleware**: Run code before a request completes to rewrite, redirect, or personalize responses. [Learn more →](/docs/routing-middleware)

**Incremental Static Regeneration**: Regenerate static pages on a schedule or on demand without rebuilding your whole site. [Learn more →](/docs/incremental-static-regeneration)

**Image Optimization**: Resize and convert images on demand and serve them from the CDN in modern formats. [Learn more →](/docs/image-optimization)

**Environments**: Manage local, preview, production, and custom environments and the variables each one uses. [Learn more →](/docs/deployments/environments)

## Secure your app

**Web Application Firewall**: Block attacks, scrapers, and unwanted traffic with custom rules, IP blocking, and managed rulesets. [Learn more →](/docs/vercel-firewall/vercel-waf)

**Bot Management**: Detect automated traffic and decide which bots can reach your app. [Learn more →](/docs/bot-management)

**BotID**: Protect sensitive routes from sophisticated bots with an invisible check instead of a CAPTCHA. [Learn more →](/docs/botid)

**Deployment Protection**: Control who can open your preview and production URLs with Vercel Authentication, passwords, or trusted IPs. [Learn more →](/docs/deployment-protection)

## Deploy and operate

**Deploy from Git**: Connect GitHub, GitLab, or Bitbucket to deploy on every push, with a preview URL for every branch. [Learn more →](/docs/git)

**Domains**: Add a custom domain, manage DNS records, and get SSL certificates automatically. [Learn more →](/docs/domains)

**CDN**: Cache responses close to your users and control routing, compression, and revalidation for every deployment. [Learn more →](/docs/cdn)

**Rolling Releases** (Pro and Enterprise): Send a new deployment to a percentage of traffic first, then promote it or roll back. [Learn more →](/docs/rolling-releases)

**Instant Rollback**: Revert production to a previous deployment without a rebuild when something breaks. [Learn more →](/docs/instant-rollback)

**Observability**: Monitor traffic, function performance, and errors with framework-aware insights across your apps and AI workflows. [Learn more →](/docs/observability)

## Guides and tutorials

Go deeper with guides, videos, and tutorials from the [Vercel Knowledge Base](/kb):

**Agent Stack**: Build AI agents, integrate language models, and deploy AI-powered apps. [Learn more →](/kb/agent-stack)

**Backend**: Server-side patterns, API routes, database connections, and compute. [Learn more →](/kb/backend)

**Services**: Deploy multiple frontends and backends within a single Vercel project. [Learn more →](/kb/vercel-services)

**Security**: Protect your apps with authentication, firewall rules, and compliance guides. [Learn more →](/kb/security)

**Integrations**: Connect third-party tools, CMSs, and services to your Vercel project. [Learn more →](/kb/integrations)

**Migrations**: Bring your existing apps, agents, and workflows to Vercel. [Learn more →](/kb/migrations)


---

[View full sitemap](/docs/sitemap)
