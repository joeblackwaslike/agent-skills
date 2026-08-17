---
title: Platform Template
product: vercel
url: /docs/platforms/examples/platform-template
canonical_url: "https://vercel.com/docs/platforms/examples/platform-template"
last_updated: 2026-06-26
type: tutorial
prerequisites:
  - /docs/platforms/examples
  - /docs/platforms
related:
  []
summary: Build an AI app builder on Vercel with sandboxes, AI Gateway, deployments, and project transfers.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/examples/platform-template.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "e8f6dde757115e3bb7463383c448013da7ca5579d40cca20d999a7f78e173674"
---

# Platform Template

The Platform Template serves as a comprehensive reference for constructing an AI application builder on Vercel. It integrates multiple platform capabilities including sandboxed code execution, LLM routing through AI Gateway, live app previewing, production deployment, and user project ownership transfer.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build with a Nitro starter template](https://vercel.com/kb/guide/build-with-a-nitro-starter-template?from=related) — Deploy a Nitro app to Vercel from a starter template. Compare the Nitro Starter, route rules, cached HTTP handler, plugi
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel?from=related) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [How to ship a NestJS app on Vercel](https://vercel.com/kb/guide/ship-a-nestjs-app-on-vercel?from=related) — Deploy a NestJS app to Vercel with zero configuration. Learn how to ship from a template, the Nest CLI, or Git, and conf
- [Run and track deploys from Slack](https://vercel.com/kb/guide/run-and-track-deploys-from-slack?from=related) — Build a Slack deploy bot with Chat SDK and Vercel Workflows. Dispatch GitHub Actions from a slash command, gate producti
- [Migrate a TanStack Start app from Cloudflare to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-cloudflare-to-vercel?from=related) — Move your TanStack Start app off Cloudflare Workers and onto Vercel Functions, where Fluid compute scales it automatical
- [Build with a FastAPI starter template](https://vercel.com/kb/guide/build-with-a-fastapi-starter-template?from=related) — Browse FastAPI starter templates for Vercel and deploy one in a few steps. Compare minimal, AI, agent, and full-stack Fa
- [OSS Coding Agent](https://vercel.com/docs/platforms/examples/oss-coding-agent?from=related) — Build and deploy your own AI-powered coding platform with Vercel Sandboxes.
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Quickstart](https://vercel.com/docs/platforms/multi-project-platforms/quickstart?from=related) — Programmatically host code for user-generated or AI-generated applications on Vercel.
- [Concepts](https://vercel.com/docs/platforms/multi-project-platforms/concepts?from=related) — Understand projects, deployments, domains, and architecture for multi-project platforms on Vercel.
- [Multi-Tenant Template](https://vercel.com/docs/platforms/examples/multi-tenant-template?from=related) — Build SaaS applications that serve multiple domains from a single Next.js codebase.

Full cross-link map for this page: [/docs/platforms/examples/platform-template.graph.md](/docs/platforms/examples/platform-template.graph.md)
<!-- /docsgraph:related -->

## Core Components

The template demonstrates five key Vercel platform features working together:

- **Vercel Sandbox**: Agents generate code and run development servers for app previews.
- **AI Gateway**: Secure LLM access using OIDC authentication, proxied from sandboxes that lack credential storage.
- **Vercel Deployments**: Push sandbox contents to production using the Vercel SDK.
- **Vercel Apps**: OAuth installation that lets users maintain app updates through the claim flow.
- **Project Transfers**: Let users receive deployed websites and later assume ownership.

## Architecture

The application is built as a Next.js system with five major subsystems: a Chat UI (React), a Preview UI (iframe), an oRPC Router, an AI Proxy Route, and a Sandbox containing the Agent CLI plus a Dev Server. These components interact with AI Gateway (OIDC authentication) and the Vercel API (deployment and claim operations).

## Operational Flow

### Initial steps

Users enter prompts through the chat interface, triggering `rpc.chat.send`, a streaming oRPC procedure that manages the complete workflow. For new sessions, Vercel Sandbox provisioning occurs, installing bun, scaffolding the selected template (Next.js, Vite, TanStack Start), installing the agent CLI, and launching the development server.

### Agent execution

Native agent coding CLIs execute within the sandbox environment. The configuration redirects API calls to the platform's proxy using short-lived session identifiers instead of persistent credentials.

### LLM integration

Agent CLI base URLs target the platform's proxy route, which validates sessions, obtains Vercel OIDC tokens, and forwards requests to AI Gateway. This proxy layer enables user token spend tracking and other monitoring features.

### User workflow

The sandbox development server displays through an iframe. Deployment involves reading sandbox files and creating a Vercel deployment. For unsigned users, deployments initially belong to the partner team until the user completes the claim process through OAuth.

## Security Architecture

The AI Gateway proxy pattern addresses sandbox credential constraints through short-lived capability tokens. Sandboxes never access actual OIDC tokens or API keys. Redis stores proxy sessions with a one-hour TTL. The proxy forwards only `accept`, `content-type`, and `anthropic-version` headers while rejecting cross-origin requests.

## Deployment Authorization

Three authorization tiers exist:

- **Partner tier**: Unsigned users deploy to the partner team using `VERCEL_PARTNER_TOKEN`.
- **User tier**: Signed-in users deploy to their accounts via OAuth session.
- **Project tier**: Post-claim users deploy to their account using stored per-project tokens (in Redis, JWE-encrypted).

Priority follows this order: project tokens override user sessions, which override partner tokens. Users claiming projects deploy to their accounts even across different browser sessions.

## Claim Flow Integration

The claim process merges OAuth authorization with project transfer:

1. The user initiates a claim on a partner-owned deployment.
2. The platform requests a transfer code via `projects.createProjectTransferRequest()`.
3. The user authorizes at Vercel OAuth with the `transfer_code` parameter.
4. Vercel transfers the project and returns an authorization code.
5. The callback exchanges the code for tokens, storing them encrypted in Redis.
6. The user returns with `?sandboxId=xxx` for session restoration.

The `usePersistedChat()` hook restores messages, preview URL, and deployment state from Redis automatically.

## Setup Instructions

### Installation

Clone the repository and install dependencies:

```bash filename="Terminal"
git clone https://github.com/vercel/platform-template
cd platform-template
pnpm install
```

### Technology Stack

- Next.js 16 with App Router
- oRPC for type-safe streaming RPC
- Vercel Sandbox for code execution
- Vercel SDK for deployments
- Zustand and SWR for state management
- Upstash Redis for session persistence

### Configuration

Required environment variables include:

- `PROXY_BASE_URL`: Proxy endpoint
- `VERCEL_PARTNER_TOKEN` and `VERCEL_PARTNER_TEAM_ID`: Deployment credentials
- `VERCEL_CLIENT_ID` and `VERCEL_CLIENT_SECRET`: OAuth configuration
- `SESSION_SECRET`: Session encryption
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`: Session storage

### Development

Start the server with `pnpm dev` and navigate to <http://localhost:3000>. The interface includes chat, agent selection, template selection, live preview, file explorer, and deployment controls.

## Design Patterns

### Stream protocol normalization

Claude Code and Codex generate different output formats. A unified `StreamChunk` protocol standardizes both, allowing new agents to integrate without UI modifications by implementing the `AgentProvider` interface.

### Streaming RPC implementation

The RPC layer employs `async function*` generators for streaming, providing typed chunks to clients as they're yielded and enabling progressive updates throughout the workflow.

### Template architecture

Each template provides setup generators and framework-specific agent instructions. Setup handles scaffolding via `create-next-app` and `create-vite`, component installation, styling configuration, and server initialization. Agents receive framework-targeted instructions for idiomatic code generation.

## Summary

The Platform Template shows integrated use of Vercel's infrastructure, including sandboxes, AI Gateway, deployments, and project transfers, to create a cohesive platform where AI generates code, users preview it live, and deploy to production.


---

[View full sitemap](/docs/sitemap)
