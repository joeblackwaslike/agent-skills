---
title: CLI Workflows
product: vercel
url: /docs/agent-resources/workflows
canonical_url: "https://vercel.com/docs/agent-resources/workflows"
last_updated: 2026-05-25
type: conceptual
prerequisites:
  - /docs/agent-resources
related:
  - /docs/observability/debug-production-errors
  - /docs/deployments/rollback-production-deployment
  - /docs/functions/debug-slow-functions
  - /docs/caching/cdn-cache/debug-cache-issues
  - /docs/projects/deploy-from-cli
summary: End-to-end workflows that show how to compose Vercel CLI commands into complete debugging, deployment, and recovery sessions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/workflows.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "79f6152ae3c9f1ffbe196655c145845bd9da532220cf2054b98875a35c4c9bcf"
---

# CLI Workflows

These workflows show how to compose multiple Vercel CLI commands into complete work sessions. Each workflow walks through a real task from start to finish, including the reasoning between steps.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a durable AI code agent on Vercel](https://vercel.com/kb/guide/how-to-build-a-durable-ai-code-agent-on-vercel?from=related) — Build an AI agent that generates code, writes its own tests, and executes them in an isolated microVM with automatic ret
- [How can I use the Vercel CLI for custom workflows?](https://vercel.com/kb/guide/using-vercel-cli-for-custom-workflows?from=related) — You can use the Vercel CLI to deploy any application, including custom git providers and restricted source code.
- [Observability](https://workflow-sdk.dev/docs/observability?from=related) — Inspect and debug workflow runs using the CLI and Web UI.
- [Building stateful Slack bots with Vercel Workflow](https://vercel.com/kb/guide/stateful-slack-bots-with-vercel-workflow?from=related) — Learn how to build Slack bots that maintain state and handle long-running processes without managing queues, databases,
- [Building Durable AI Agents](https://workflow-sdk.dev/docs/ai?from=related) — Convert a basic AI chat app into a durable, resumable agent using Workflow SDK.
- [Python](https://workflow-sdk.dev/docs/getting-started/python?from=related) — Set up the Workflow Python SDK in your Python application.
- [Build AI agents with AI Gateway and AI SDK](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk?from=related) — Build AI agents on Vercel with AI Gateway and AI SDK, then make them reliable, capable, and durable with Sandbox, Chat S
- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations?from=related) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Testing](https://workflow-sdk.dev/docs/testing?from=related) — Unit test individual steps and integration test entire workflows using Vitest.
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Python](https://vercel.com/docs/workflows/python?from=related) — Build durable workflows and AI agents in Python with the Vercel SDK.
- [Concepts](https://vercel.com/docs/workflows/concepts?from=related) — Learn how workflows, steps, sleeps, and hooks work together to build durable applications.

Full cross-link map for this page: [/docs/agent-resources/workflows.graph.md](/docs/agent-resources/workflows.graph.md)
<!-- /docsgraph:related -->

Workflows are distributed throughout the docs, colocated with the features they use. This page links to all available workflows.

## Debugging and recovery

| Workflow                                                                                 | Description                                                                              | Entry point   |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------- |
| [Debugging production 500 errors](/docs/observability/debug-production-errors)           | Find, fix, and verify production 500 errors using logs, inspect, and preview deployments | Observability |
| [Rolling back a production deployment](/docs/deployments/rollback-production-deployment) | Recover from a bad production deployment with rollback, investigation, and redeployment  | Deployments   |
| [Debugging slow Vercel Functions](/docs/functions/debug-slow-functions)                  | Diagnose and fix slow functions using timing analysis, logs, and configuration tuning    | Functions     |
| [Diagnosing and fixing cache issues](/docs/caching/cdn-cache/debug-cache-issues)                 | Identify and fix stale CDN cache, data cache, and build cache problems                   | CDN Cache     |

## Setup and deployment

| Workflow                                                                                                     | Description                                                                             | Entry point           |
| ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | --------------------- |
| [Deploying a project from the CLI](/docs/projects/deploy-from-cli)                                           | Set up and deploy a project end-to-end, from linking to production with a custom domain | Projects              |
| [Setting up a custom domain](/docs/domains/set-up-custom-domain)                                             | Add a custom domain, configure DNS records, and verify SSL certificates                 | Domains               |
| [Managing environment variables across environments](/docs/environment-variables/manage-across-environments) | Add, sync, and verify environment variables across development, preview, and production | Environment Variables |
| [Promoting a preview deployment to production](/docs/deployments/promote-preview-to-production)              | Test a preview deployment and promote it to production without rebuilding               | Deployments           |
| [Performing a rolling release deployment](/docs/rolling-releases/rolling-release-deployment)                 | Gradually roll out a production deployment with traffic stages and monitoring           | Rolling Releases      |

## Content and storage management

| Workflow                                                                           | Description                                                            | Entry point |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------- |
| [Managing redirects at scale](/docs/routing/redirects/manage-redirects-at-scale)           | Add, bulk upload, version, and roll back project-level redirects       | Redirects   |
| [Managing Vercel Blob storage from the CLI](/docs/vercel-blob/manage-blob-storage) | Create blob stores, upload files, organize content, and manage storage | Vercel Blob |

## Isolated environments

| Workflow                                                                             | Description                                                                    | Entry point    |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | -------------- |
| [Running commands in a Vercel Sandbox](/docs/sandbox/run-commands-in-sandbox) | Create isolated sandbox environments to run builds, tests, and commands safely | Vercel Sandbox |

## Feature flags

| Workflow                                                                                | Description                                                                                     | Entry point  |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------ |
| [Rolling out a new feature](/docs/flags/vercel-flags/cli/roll-out-feature)              | Create a feature flag, wire it into your app, and progressively enable it across environments   | Vercel Flags |
| [Running an A/B test](/docs/flags/vercel-flags/cli/run-ab-test)                         | Set up an A/B test, track results through Web Analytics, and clean up afterward                 | Vercel Flags |
| [Cleaning up after a full rollout](/docs/flags/vercel-flags/cli/clean-up-after-rollout) | Audit active flags, remove a fully rolled-out flag from code, and archive it                    | Vercel Flags |
| [Setting up Flags Explorer](/docs/flags/vercel-flags/cli/set-up-flags-explorer)         | Add Flags Explorer to the Vercel Toolbar so you can override flag values on preview deployments | Vercel Flags |

## Agent quickstarts

These guides help you delegate code-generation tasks to a coding agent like Claude Code, Cursor, or Cline. Each one provides prompts you can copy into your agent to scaffold a full integration.

| Guide                                                                              | Description                                                                   | Entry point         |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------- |
| [AI Gateway agent quickstart](/docs/ai-gateway/getting-started)                   | Set up AI Gateway with the AI SDK using prompts and cURL verification         | AI Gateway          |
| [Sign in with Vercel agent quickstart](/docs/sign-in-with-vercel/getting-started) | Scaffold the full OAuth flow with PKCE, token handling, and a profile page    | Sign in with Vercel |
| [Routing Middleware agent quickstart](/docs/routing-middleware/getting-started)   | Create routing middleware for redirects, auth checks, or geolocation rewrites | Routing Middleware  |

## How these workflows help AI agents

These workflows are designed as composition patterns. Each one shows a complete sequence of CLI commands with the reasoning that connects them. AI coding agents can use these patterns to:

- Learn when to reach for each Vercel CLI command
- Understand the investigation flow for common problems
- Compose commands into multi-step sessions for novel situations
- Follow the same debugging methodology that experienced Vercel users follow


---

[View full sitemap](/docs/sitemap)
