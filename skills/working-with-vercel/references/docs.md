---
title: Vercel Documentation
product: vercel
url: /docs
canonical_url: "https://vercel.com/docs"
last_updated: 2026-09-03
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
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "86612698bf7caa15c07b90a34c5c53aa3e940c1737f8d21b93fced0e44d27df1"
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

# Skills for any other agent
npx skills add vercel-labs/agent-skills

# Let your agent manage projects, deployments, and logs
npx -y add-mcp https://mcp.vercel.com -g

# Route your agent's model calls through AI Gateway
vercel ai-gateway coding-agents setup
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

Set up the agent you code with, and the platform for the agents you ship. This prompt installs the Vercel Plugin or Agent Skills, connects the Vercel MCP server, and deploys your project:

**Agent prompt**

```text
Help me set up this project on Vercel. Read https://vercel.com/docs/getting-started-with-vercel first. Then: 1. Install the Vercel CLI globally (`npm i -g vercel`) and log in with `vercel login`. 2. If you are Claude Code, OpenAI Codex, Grok Build, Cursor, GitHub Copilot, or Kimi Code, install the Vercel Plugin with `npx plugins add vercel/vercel-plugin`. Otherwise, install Vercel Skills with `npx skills add vercel-labs/agent-skills`. 3. Connect the Vercel MCP server with `npx -y add-mcp https://mcp.vercel.com -g`. 4. Deploy with `vercel` and share the preview URL. 5. Suggest next steps based on my project, such as adding a custom domain, setting environment variables, or configuring Vercel Functions.
```

**Vercel Plugin**: Give your coding agent deployment skills, framework best practices, and slash commands. Works with Claude Code, OpenAI Codex, Grok Build, Cursor, GitHub Copilot, and Kimi Code. [Learn more →](/docs/agent-resources/vercel-plugin)

**Agent Skills**: Install skills for any agent that supports them, covering Next.js, the AI SDK, Turborepo, and deploying to Vercel. [Learn more →](/docs/agent-resources/skills)

**Vercel MCP** (Beta): Let your agent search the docs, manage projects and deployments, and query Web Analytics through the Vercel MCP server. [Learn more →](/docs/agent-resources/vercel-mcp)

**Vercel Connect**: Give your agent short-lived tokens to call Slack, GitHub, Microsoft, Snowflake, or any OAuth or API-key service, and act on behalf of users, without storing provider secrets. [Learn more →](/docs/connect)

**Claim Deployments**: Let your agent deploy apps for users, then transfer ownership with a claim URL so each deployment lands in the user's own Vercel account. [Learn more →](/docs/deployments/claim-deployments)

**Containers**: Run your agent's runtime and tools from a Docker image on Vercel Functions, or give Sandbox a custom image for the code your agent executes. [Learn more →](/docs/container-registry)

## What's new

The latest changes across the Vercel platform. Browse the full [changelog](https://vercel.com/changelog) for everything that shipped.

- Sep 4, 2026: [Ling 3.0 Flash Sante is now available on AI Gateway for free](https://vercel.com/changelog/ling-3-0-flash-sante-is-now-available-on-ai-gateway-for-free). Ling 3.0 Flash Sante from Inclusion AI is free on Vercel AI Gateway through October 4 through a -free model ID or regular ID.
- Sep 4, 2026: [GPT 6 Astra now available on Vercel AI Gateway](https://vercel.com/changelog/gpt-6-astra-now-available-on-vercel-ai-gateway). GPT 6 Astra from OpenAI is now available on Vercel AI Gateway for coding, computer use, research, and multi-step professional workflows.
- Sep 3, 2026: [Cursor Cloud Agents can now run in Vercel Sandbox](https://vercel.com/changelog/run-cursor-cloud-agents-vercel-sandbox). Run Cursor Cloud Agents on infrastructure you control with Vercel Sandbox, using scale-to-zero workers, isolated microVMs, and durable orchestration.
- Sep 3, 2026: [Basic build machines are now available on Pro and Enterprise](https://vercel.com/changelog/basic-build-machines). Pro and Enterprise teams can now select Basic build machines, 2 vCPU and 8 GB, a lower-cost option for smaller apps. New projects still default to Elastic.

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
