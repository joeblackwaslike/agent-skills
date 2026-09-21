---
title: OpenAI Agents API
product: vercel
url: /docs/sandbox/ecosystem/openai-agents-api
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/openai-agents-api"
last_updated: 2026-09-17
type: conceptual
prerequisites:
  - /docs/sandbox/ecosystem
  - /docs/sandbox
related:
  - /docs/sandbox
  - /docs/queues
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/cli
  - /docs/sandbox/ecosystem/openai-sdk
summary: Connect OpenAI Agents API sessions to Vercel Sandbox for isolated code execution and persistent workspace files.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem/openai-agents-api.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "26eb16e67f9a57225f34811c543a56519bbe38ea8af75183631b29bad14915d7"
---

# OpenAI Agents API

Use [Vercel Sandbox](/docs/sandbox) as the execution environment for
[OpenAI Agents API](https://developers.openai.com/api/docs/guides/agents-api/overview)
sessions. OpenAI manages the agent loop and session state. Sandbox gives each
session an isolated workspace to run commands and read and write files.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fopenai-agents-api&source_site=vercel-docs&relationship=related) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [Build with OpenAI Agents API on Vercel](https://vercel.com/changelog/build-with-openai-agents-api-on-vercel?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fopenai-agents-api&source_site=vercel-docs&relationship=related)
- [Build an agentic app in FastAPI with OpenAI Agents API and Vercel Sandbox](https://vercel.com/kb/guide/fastapi-openai-agents-api-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fopenai-agents-api&source_site=vercel-docs&relationship=related) — Learn how to build a repository Q&A app using FastAPI, OpenAI Agents API, and Vercel Sandbox, with isolated code inspect
- [Build an agent with OpenAI Agents API on Vercel](https://vercel.com/kb/guide/openai-agents-api-vercel?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fopenai-agents-api&source_site=vercel-docs&relationship=related) — Build and deploy an agent with OpenAI Agents API, Vercel Functions, Queues, and Sandbox for isolated code execution.
- [Using TanStack AI with Vercel Sandbox](https://vercel.com/kb/guide/tanstack-ai-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fopenai-agents-api&source_site=vercel-docs&relationship=related) — Run coding agents in isolated Vercel Sandbox microVMs with the @tanstack/ai-sandbox-vercel provider, with durable resume
- [How to build an on-demand voice agent with Vercel Sandbox](https://vercel.com/kb/guide/how-to-build-an-on-demand-voice-agent-with-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fopenai-agents-api&source_site=vercel-docs&relationship=related) — Build a voice AI application that creates isolated LiveKit agent environments using Vercel Sandbox, enabling real-time c
- [Quickstart](https://vercel.com/docs/sandbox/quickstart?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fopenai-agents-api&source_site=vercel-docs&relationship=related) — Learn how to run your first code in a Vercel Sandbox.

Full cross-link map for this page: [/docs/sandbox/ecosystem/openai-agents-api.graph.md](/docs/sandbox/ecosystem/openai-agents-api.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Fopenai-agents-api&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

The [sample application](https://github.com/vercel-labs/openai-agents-api-vercel)
hosts the interface and API routes on Vercel. Signed OpenAI webhooks and
[Vercel Queues](/docs/queues) coordinate Sandbox creation and reconnection.

## How it works

1. Your application creates an OpenAI session with a self-hosted environment
   and submits a task.
2. OpenAI sends a signed webhook when the session needs an executor.
3. The webhook handler places the session ID on a Vercel Queue.
4. A Queue consumer reads the current session state and creates or resumes its
   named [persistent sandbox](/docs/sandbox/concepts/persistent-sandboxes).
5. `codex exec-server` connects outbound from the Sandbox to OpenAI. The agent
   runs commands in the workspace and streams its response to your application.

## Prerequisites

Before deploying the sample, you need:

- An OpenAI project with Agents API access and permission to create an
  application key and an environment key for the same user or service account
  in the same organization and project
- `api.webhooks.write` permission in that OpenAI project to register the
  webhook, or someone with that permission to register it for you
- A Vercel project with Sandbox and Queues access
- Node.js 24 or later and the [Vercel CLI](/docs/cli) for local setup

The application key manages OpenAI sessions. The environment key connects the
executor and is the only OpenAI credential passed into the Sandbox. Keep the
application key and webhook signing secret in your application server.

## Get started

Follow [Build an agent with OpenAI Agents API on
Vercel](/kb/guide/openai-agents-api-vercel) to configure the credentials,
deploy the sample, and register its webhook. After registration, add the
issued signing secret to the Vercel project and redeploy.

Test the deployed app by asking the agent to write a file, then read it in a
follow-up task. Deleting the session through the sample also deletes its
Sandbox.

For a function-calling loop that your application runs through the Responses
API, see the [OpenAI SDK integration](/docs/sandbox/ecosystem/openai-sdk).


---

[View full sitemap](/docs/sitemap)
