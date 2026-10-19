---
title: Ecosystem
product: vercel
url: /docs/sandbox/ecosystem
canonical_url: "https://vercel.com/docs/sandbox/ecosystem"
last_updated: 2026-09-23
type: conceptual
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/cli-reference
  - /docs/sandbox/ecosystem/cursor
  - /docs/sandbox/ecosystem/devin
  - /docs/sandbox/ecosystem/herdr
  - /docs/sandbox/ecosystem/hermes
summary: Use Vercel Sandbox with the agent frameworks, model SDKs, and agents you already work with.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "a44fdb38a640332e686c64308a6f675de8b947d2ec7263c0c3251ad3f3402508"
---

# Ecosystem

Run a coding agent from your terminal, or add isolated code execution to an
agent you build. Choose an [agent](#agents), a
[framework or SDK](#framework-and-sdk-integrations), or a
[hosted agent API](#hosted-agent-apis).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [How to run Herdr coding agents in isolated Vercel Sandboxes](https://vercel.com/kb/guide/run-herdr-coding-agents-isolated-vercel-sandboxes) — Install the vercel.sandbox plugin for Herdr, approve an upload manifest, run each AI coding agent in its own isolated Ve
- [Running OpenCode securely with the Vercel Sandbox](https://vercel.com/kb/guide/running-opencode-securely-with-the-vercel-sandbox) — Run OpenCode in an isolated Vercel Sandbox MicroVM with controlled egress, using the SDK to restrict network access so t
- [Run untrusted code with Vercel Sandbox, now generally available](https://vercel.com/blog/vercel-sandbox-is-now-generally-available)
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [Using TanStack AI with Vercel Sandbox](https://vercel.com/kb/guide/tanstack-ai-vercel-sandbox) — Run coding agents in isolated Vercel Sandbox microVMs with the @tanstack/ai-sandbox-vercel provider, with durable resume
- [Run isolated AI agents in one sandbox](https://vercel.com/docs/sandbox/concepts/multi-agent) — Give each AI agent an isolated Linux user in a Vercel Sandbox with the @vercel/sandbox createUser, createGroup, and asUs

Full cross-link map for this page: [/docs/sandbox/ecosystem.graph.md](/docs/sandbox/ecosystem.graph.md)
<!-- /docsgraph:related -->

## Agents

### Start from your terminal

Run OpenCode, Pi, Claude Code, or Codex inside a Vercel Sandbox while using its
interactive interface in your local terminal. Commands, file edits, and tests
run in the sandbox.

With Sandbox CLI 4.8.0 or later, start an agent without a global CLI installation:

```bash filename="Terminal"
npx sandbox@latest create opencode
```

Replace `opencode` with the agent you want to use:

| Agent       | Argument   |
| ----------- | ---------- |
| OpenCode    | `opencode` |
| Pi          | `pi`       |
| Claude Code | `claude`   |
| Codex       | `codex`    |

The CLI prompts you to sign in to Vercel if needed. Authenticate with your
chosen agent separately. Your local project files aren't uploaded automatically.

Exiting the agent leaves the sandbox running. Use the reconnect or stop command
printed in your terminal. See [Run a coding agent](/docs/sandbox/cli-reference#run-a-coding-agent)
for setup, authentication, and lifecycle details.

### Agent integrations

The CLI launches an agent in a sandbox from your terminal. These integrations
let you use Sandbox through your coding agent or agent manager's own interface.

| Integration                              | Type          | Use case                                       |
| ---------------------------------------- | ------------- | ---------------------------------------------- |
| [Cursor](/docs/sandbox/ecosystem/cursor) | Coding agent  | Cursor Cloud Agents on Self-Hosted Machines    |
| [Devin](/docs/sandbox/ecosystem/devin)   | Coding agent  | Devin Outposts sessions in Sandbox microVMs    |
| [Herdr](/docs/sandbox/ecosystem/herdr)   | Agent manager | Terminal coding agents in persistent Sandboxes |
| [Hermes](/docs/sandbox/ecosystem/hermes) | Coding agent  | Hermes terminal commands in Sandbox microVMs   |
| [OpenCode](/docs/sandbox/ecosystem/opencode) | Coding agent | Sandbox-backed tools and remote workspaces |

## Eval harnesses

Use evaluation harness integrations to run and score agent tasks in isolated
sandboxes.

| Integration                              | Type         | Use case                                                |
| ---------------------------------------- | ------------ | ------------------------------------------------------- |
| [Harbor](/docs/sandbox/ecosystem/harbor) | Eval harness | Terminal-Bench and benchmark trials in Sandbox microVMs |
| [Scale AI's AgentEnv](/docs/sandbox/ecosystem/agentenv) | Eval harness | Evaluate agents in separate environment and agent sandboxes |

## Framework and SDK integrations

Use your preferred framework or SDK to run AI-generated code in Sandbox.
Your application calls a model, runs its generated code in an isolated sandbox,
and uses the results to continue the task.

The model API examples route requests through [AI Gateway](/docs/ai-gateway),
which gives you access to multiple model providers with
[no markup on provider token prices](/docs/ai-gateway/pricing).
You can also [bring your own provider API keys](/docs/ai-gateway/authentication-and-byok/byok)
through AI Gateway.

| Integration                                            | Type            | Use case                                    |
| ------------------------------------------------------ | --------------- | ------------------------------------------- |
| [AI SDK](/docs/sandbox/working-with-sandbox)           | AI SDK          | Tool calling with the AI SDK                |
| [LangChain](/docs/sandbox/ecosystem/langchain)         | Agent framework | Agents with a sandboxed code execution tool |
| [OpenAI SDK](/docs/sandbox/ecosystem/openai-sdk)       | Model SDK       | Function calling through the Responses API  |
| [Anthropic SDK](/docs/sandbox/ecosystem/anthropic-sdk) | Model SDK       | Tool use through the Messages API           |
| [TanStack AI](/docs/sandbox/ecosystem/tanstack-ai)     | Agent framework | Coding agents with sandboxed workspaces     |

## Hosted agent APIs

Build a [v0-style app builder](/kb/guide/v0-clone-openai-agents-vercel-sandbox)
that turns a prompt into a Next.js app with a live preview. Users can refine
the app through follow-up messages.

OpenAI Agents API manages the agent session, while Vercel Sandbox provides
an isolated workspace to edit files and run the app. These integrations use
the provider's API credentials.

| Integration                                                    | Type             | Use case                                                            |
| -------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------- |
| [OpenAI Agents API](/docs/sandbox/ecosystem/openai-agents-api) | Hosted agent API | OpenAI-managed sessions with Sandbox execution and persistent files |

## Content and storage

These integrations give an agent a filesystem view of a content or object
store, so it reads and writes through standard file operations instead of
calling a storage API. Files stay on the provider's platform and outlive the
sandbox. The provider's permissions control what the agent can access.

| Integration                                    | Type             | Use case                                              |
| ---------------------------------------------- | ---------------- | ----------------------------------------------------- |
| [Box Mount](/docs/sandbox/ecosystem/box-mount) | Content platform | Agents reading and writing Box content as local files |


---

[View full sitemap](/docs/sitemap)
