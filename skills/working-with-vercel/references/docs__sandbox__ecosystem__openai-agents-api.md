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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/ecosystem/openai-agents-api.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "e365aeed2e0e6f805c4cf63a27824de96f39229d2248531815e469edbc2806d1"
---

# OpenAI Agents API

Use [Vercel Sandbox](/docs/sandbox) as the execution environment for
[OpenAI Agents API](https://developers.openai.com/api/docs/guides/agents-api/overview)
sessions. OpenAI manages the agent loop and session state. Sandbox gives each
session an isolated workspace to run commands and read and write files.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [Running OpenCode securely with the Vercel Sandbox](https://vercel.com/kb/guide/running-opencode-securely-with-the-vercel-sandbox) — Run OpenCode in an isolated Vercel Sandbox MicroVM with controlled egress, using the SDK to restrict network access so t
- [Run untrusted code with Vercel Sandbox, now generally available](https://vercel.com/blog/vercel-sandbox-is-now-generally-available)
- [Build with OpenAI Agents API on Vercel](https://vercel.com/changelog/build-with-openai-agents-api-on-vercel)
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [Vercel Sandbox vs CodeSandbox](https://vercel.com/kb/guide/vercel-sandbox-vs-codesandbox) — A detailed guide to Vercel Sandbox vs CodeSandbox: compute isolation, credential brokering, Active CPU billing, Docker s
- [Gemini API Managed Agents](https://vercel.com/docs/sandbox/ecosystem/gemini-api) — Connect a Gemini API self-hosted environment to Vercel Sandbox so agent file and shell tools run in your own microVM.

Full cross-link map for this page: [/docs/sandbox/ecosystem/openai-agents-api.graph.md](/docs/sandbox/ecosystem/openai-agents-api.graph.md)
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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
