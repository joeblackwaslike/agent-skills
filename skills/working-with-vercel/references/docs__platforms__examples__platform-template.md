---
title: Platform Template
product: vercel
url: /docs/platforms/examples/platform-template
canonical_url: "https://vercel.com/docs/platforms/examples/platform-template"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/platforms/examples
  - /docs/platforms
related:
  []
summary: Learn about platform template on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/examples/platform-template.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "f4b945fe648019d2a1bf6d4f6fea8a45071b83dd3580cd921db471afd9263dda"
---

# Platform Template

The Platform Template serves as a comprehensive reference for constructing an AI application builder on Vercel. It integrates multiple platform capabilities including sandboxed code execution, LLM routing through AI Gateway, live app previewing, production deployment, and user project ownership transfer.

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
