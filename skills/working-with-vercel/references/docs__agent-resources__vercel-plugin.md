---
title: Vercel Plugin for AI Coding Agents
product: vercel
url: /docs/agent-resources/vercel-plugin
canonical_url: "https://vercel.com/docs/agent-resources/vercel-plugin"
last_updated: 2026-06-01
type: reference
prerequisites:
  - /docs/agent-resources
related:
  []
summary: Install the Vercel plugin to give supported AI coding tools Vercel context, skills, specialist agents, slash commands, and lightweight session-start...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-plugin.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "455d04b128d580dd7b27fbf13c60e4d210b777c1bcbabd74cd2758a662d4fad0"
---

# Vercel Plugin for AI Coding Agents

The Vercel plugin gives [supported AI coding tools](#supported-tools) Vercel-specific context, skills, agents, and slash commands. The default installation keeps automation lightweight and activates session-start context only in empty directories and detected Vercel or Next.js projects.

## Getting started

### Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [OpenAI Codex](https://openai.com/codex), [Grok Build](https://x.ai/news/grok-build-cli), [Cursor](https://www.cursor.com), or [GitHub Copilot](https://github.com/features/copilot)
- Node.js 18 or later
- [Bun](https://bun.sh)

### Installation

```bash
npx plugins add vercel/vercel-plugin
```

The plugin installs Vercel context, skills, and a lightweight default hook profile.

### Usage

After installation, session context is injected automatically only for empty directories and detected Vercel or Next.js projects. You can invoke skills and commands directly when you want targeted guidance:

```text
/vercel-plugin:nextjs
/vercel-plugin:ai-sdk
/vercel-plugin:deploy prod
```

## What the plugin provides

| Component               | Description                                                                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Ecosystem graph**     | A relational knowledge graph covering every Vercel product, library, CLI, API, and service, with decision matrices and cross-product workflows |
| **[25 skills](#available-skills)**           | Deep-dive guidance for specific Vercel products, libraries, and workflows                                                                      |
| **3 specialist agents** | Purpose-built agents for deployment, performance optimization, and AI architecture                                                             |
| **5 slash commands**    | Quick actions for deploying, managing environment variables, bootstrapping projects, and more                                                  |

## Supported tools

| Tool                                                          | Status      |
| ------------------------------------------------------------- | ----------- |
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | Supported   |
| [OpenAI Codex](https://openai.com/codex)               | Supported   |
| [Grok Build](https://x.ai/news/grok-build-cli)                 | Supported   |
| [Cursor](https://www.cursor.com)                              | Supported   |
| [GitHub Copilot](https://github.com/features/copilot)          | Supported   |

## How it works

After installation, the plugin keeps automatic behavior lightweight. Session-start activation runs only in empty directories and detected Vercel or Next.js projects, and Vercel skills are not auto-injected on every prompt or every tool call by default.

The skills remain available on demand, and the plugin includes the injection engine for targeted or future opt-in workflows.

### Default hooks

- **Session start context injection**: Injects a thin Vercel session context plus `knowledge-update` guidance for empty directories and detected Vercel or Next.js projects
- **Session start repo profiler**: Scans config files and dependencies to set likely-skill hints after the same activation check passes

## Available skills

The plugin includes 25 skills covering the Vercel ecosystem:

| Skill                   | Covers                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| `ai-gateway`            | Unified model API, provider routing, failover, cost tracking, 100+ models                               |
| `ai-sdk`                | AI SDK v6, including text and object generation, streaming, tool calling, agents, MCP, and embeddings  |
| `auth`                  | Authentication integrations for Clerk, Descope, and Auth0 with Marketplace provisioning                 |
| `bootstrap`             | Project bootstrapping, including linking, environment provisioning, database setup, and first-run tasks |
| `chat-sdk`              | Multi-platform chat bots for Slack, Telegram, Teams, Discord, Google Chat, GitHub, and Linear          |
| `deployments-cicd`      | Deployment and CI/CD workflows, including deploy, promote, rollback, `--prebuilt`, and CI files        |
| `env-vars`              | Environment variable management, including `.env` files, `vercel env`, and OIDC tokens                 |
| `knowledge-update`      | Knowledge update guidance for the plugin                                                                 |
| `marketplace`           | Integration discovery and installation with `vercel install`, auto-provisioned environment variables, and unified billing |
| `next-cache-components` | Next.js 16 Cache Components, including PPR, `use cache`, cacheLife, cacheTag, and updateTag            |
| `next-forge`            | The production SaaS monorepo starter with Turborepo, Clerk, Prisma or Neon, Stripe, and shadcn/ui      |
| `next-upgrade`          | Next.js upgrades, codemods, migration guides, and dependency updates                                    |
| `nextjs`                | App Router, Server Components, Server Actions, Cache Components, routing, and rendering strategies      |
| `react-best-practices`  | React and Next.js performance guidance across component, data, and rendering patterns                   |
| `routing-middleware`    | Request interception before cache, rewrites, redirects, and personalization for Edge, Node.js, and Bun |
| `runtime-cache`         | Ephemeral per-region key-value cache with tag-based invalidation across Vercel Functions, Routing Middleware, and Builds |
| `shadcn`                | shadcn/ui CLI usage, component installation, custom registries, theming, and Tailwind CSS integration  |
| `turbopack`             | The Next.js bundler, including configuration, HMR, and Turbopack versus Webpack guidance               |
| `vercel-agent`          | AI-powered code review, incident investigation, SDK installation, and pull request analysis             |
| `vercel-cli`            | Vercel CLI commands for deploy, env, dev, domains, cache management, MCP integration, and Marketplace provisioning with `vercel install` |
| `vercel-functions`      | Vercel Functions, including Serverless, Edge, Fluid Compute, streaming, and Cron Jobs                  |
| `vercel-sandbox`        | Ephemeral Firecracker microVMs for running untrusted or AI-generated code safely                        |
| `vercel-storage`        | Blob, Edge Config, Neon Postgres, Upstash Redis, one-command Marketplace provisioning with `vercel install`, and migration from sunset packages |
| `verification`          | End-to-end verification across browser, API, data, and response flows                                  |
| `workflow`              | Workflow SDK, including durable execution, DurableAgent, steps, Worlds, and pause or resume flows   |

## Specialist agents

The plugin includes three specialist agents:

| Agent                   | Expertise                                                                       |
| ----------------------- | ------------------------------------------------------------------------------- |
| `deployment-expert`     | CI/CD pipelines, deploy strategies, troubleshooting, environment variables      |
| `performance-optimizer` | Core Web Vitals, rendering strategies, caching, asset optimization              |
| `ai-architect`          | AI application design, model selection, streaming architecture, MCP integration |

## Slash commands

Use slash commands directly in your AI coding tool:

| Command                      | Purpose                                                           |
| ---------------------------- | ----------------------------------------------------------------- |
| `/vercel-plugin:bootstrap`   | Bootstrap a project with linking, env provisioning, and db setup  |
| `/vercel-plugin:deploy`      | Deploy to Vercel (preview or production)                          |
| `/vercel-plugin:env`         | Manage environment variables (list, pull, add, remove, diff)      |
| `/vercel-plugin:status`      | View project status, recent deployments, and environment overview |
| `/vercel-plugin:marketplace` | Discover and install Vercel Marketplace integrations              |

To deploy to production, pass `prod` as an argument:

```text
/vercel-plugin:deploy prod
```

## Telemetry

Prompt text and bash and tool-call telemetry are not collected.

Telemetry behavior:

- If `VERCEL_PLUGIN_TELEMETRY` is unset, the plugin sends a once-per-day `dau:active_today` event
- `VERCEL_PLUGIN_TELEMETRY=off` disables all telemetry, including the daily active event

To disable telemetry in shells that launch your AI coding tool:

```bash
export VERCEL_PLUGIN_TELEMETRY=off
```

```powershell
setx VERCEL_PLUGIN_TELEMETRY off
```

## Debugging

If the plugin is not behaving as expected, enable debug logging with `VERCEL_PLUGIN_LOG_LEVEL`:

```bash
export VERCEL_PLUGIN_LOG_LEVEL=debug
```

Available log levels:

| Level     | Description                                 |
| --------- | ------------------------------------------- |
| `off`     | No logging (default)                        |
| `summary` | High-level injection summaries              |
| `debug`   | Detailed matching and dedup information     |
| `trace`   | Full pipeline traces with timing breakdowns |

You can also run the built-in doctor command:

```bash
npx vercel-plugin doctor
```

The doctor command validates manifest parity, checks hook timeout risk, verifies dedup health, and reports skill map issues.

## Reporting issues

If a skill gives incorrect advice or injection does not fire when expected, file an issue on [GitHub](https://github.com/vercel/vercel-plugin/issues). Include:

- What you were building
- What the plugin injected, or did not inject. Enable debug logs with `VERCEL_PLUGIN_LOG_LEVEL=debug`
- What was wrong about it


---

[View full sitemap](/docs/sitemap)
