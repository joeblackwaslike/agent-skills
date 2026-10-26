---
title: CLI Workflows
product: vercel
url: /docs/agent-resources/workflows
canonical_url: "https://vercel.com/docs/agent-resources/workflows"
last_updated: 2026-08-11
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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "a4c4e798b6a33010084afbd88d48f6061c4aa1da0a0e4e185e176500cb20a96d"
---

# CLI Workflows

These workflows show how to compose multiple Vercel CLI commands into complete work sessions. Each workflow walks through a real task from start to finish, including the reasoning between steps.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a durable AI code agent on Vercel](https://vercel.com/kb/guide/how-to-build-a-durable-ai-code-agent-on-vercel) — Build an AI agent that generates code, writes its own tests, and executes them in an isolated microVM with automatic ret
- [How can I use the Vercel CLI for custom workflows?](https://vercel.com/kb/guide/using-vercel-cli-for-custom-workflows) — You can use the Vercel CLI to deploy any application, including custom git providers and restricted source code.
- [How to migrate from Cloudflare Workflows to Vercel Workflows](https://vercel.com/kb/guide/migrate-cloudflare-workflows-to-vercel-workflows) — Migrate from Cloudflare Workflows to Vercel Workflows by mapping WorkflowEntrypoint, step.do, and waitForEvent to workfl
- [Running Durable Agents on Vercel](https://vercel.com/kb/guide/durable-ai-agents) — Design durable AI agents on Vercel with patterns for execution recovery, human approval, safe retries, deployment change
- [Python](https://workflow-sdk.dev/docs/getting-started/python) — Set up the Workflow Python SDK in your Python application.
- [How to migrate from DurableAgent to WorkflowAgent](https://vercel.com/kb/guide/durableagent-to-workflowagent) — Switch your app from \\`DurableAgent\\` \\(@workflow/ai\\) to \\`WorkflowAgent\\` \\(@ai-sdk/workflow\\) by updating imports, st
- [Observability](https://workflow-sdk.dev/docs/observability) — Inspect and debug workflow runs using the CLI and web UI.
- [CLI and Web UI](https://workflow-sdk.dev/docs/configuration/cli-and-web-ui) — Configure workflow inspect, workflow cancel, workflow web, workflow health, and observability tooling.
- [A new programming model for durable execution](https://vercel.com/blog/a-new-programming-model-for-durable-execution)
- [Workflow Concepts](https://vercel.com/docs/workflows/concepts) — Learn how workflows, steps, sleeps, and hooks work together to build durable applications.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [Coding Agents and Chat Platforms with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents) — Connect coding agents and chat platforms to AI Gateway. Configure Claude Code, Codex, Chatbox, Open WebUI, and more.

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
