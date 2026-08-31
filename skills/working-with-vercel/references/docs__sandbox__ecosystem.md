---
title: Ecosystem
product: vercel
url: /docs/sandbox/ecosystem
canonical_url: "https://vercel.com/docs/sandbox/ecosystem"
last_updated: 2026-08-09
type: conceptual
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/sdk-reference
  - /docs/ai-gateway
  - /docs/sandbox/ecosystem/langchain
  - /docs/sandbox/ecosystem/openai-sdk
  - /docs/sandbox/ecosystem/anthropic-sdk
summary: Use Vercel Sandbox with the agent frameworks, model SDKs, and coding agents you already work with.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "b6acf4573f5b77b2517ef210b3e9af137a26105073bdc9ea0b1c4723ac6e3620"
---

# Ecosystem

Vercel Sandbox integrates with the agent frameworks, model SDKs, and coding
agents you already use. Give your agent a tool that executes code inside a
sandbox, and model-generated code runs in an isolated Firecracker microVM
instead of on your host.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem&source_site=vercel-docs&relationship=related) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [Run untrusted code with Vercel Sandbox, now generally available](https://vercel.com/blog/vercel-sandbox-is-now-generally-available?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem&source_site=vercel-docs&relationship=related)
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem&source_site=vercel-docs&relationship=related) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [How to run Herdr coding agents in isolated Vercel Sandboxes](https://vercel.com/kb/guide/run-herdr-coding-agents-isolated-vercel-sandboxes?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem&source_site=vercel-docs&relationship=related) — Install the vercel.sandbox plugin for Herdr, approve an upload manifest, run each AI coding agent in its own isolated Ve
- [The Agent Stack](https://vercel.com/blog/agent-stack?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem&source_site=vercel-docs&relationship=related)
- [Run isolated AI agents in one sandbox](https://vercel.com/docs/sandbox/concepts/multi-agent?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem&source_site=vercel-docs&relationship=related) — Give each AI agent an isolated Linux user in a Vercel Sandbox with the @vercel/sandbox createUser, createGroup, and asUs
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem&source_site=vercel-docs&relationship=related) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [Quickstart](https://vercel.com/docs/sandbox/quickstart?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem&source_site=vercel-docs&relationship=related) — Learn how to run your first code in a Vercel Sandbox.
- [eve](https://vercel.com/docs/eve?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem&source_site=vercel-docs&relationship=related) — Learn how to deploy and run durable backend AI agents built with the open-source eve framework on Vercel.

Full cross-link map for this page: [/docs/sandbox/ecosystem.graph.md](/docs/sandbox/ecosystem.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Framework and SDK integrations

These guides show the same pattern in each framework: define a `run_code`
tool backed by
[`sandbox.runCommand()`](/docs/sandbox/sdk-reference#sandboxruncommand),
pass it to the framework's tool-calling loop, and return the command output
to the model. Model requests route through [AI Gateway](/docs/ai-gateway),
while Vercel credentials authenticate the sandbox.

| Integration                                            | Type            | Use case                                    |
| ------------------------------------------------------ | --------------- | ------------------------------------------- |
| [LangChain](/docs/sandbox/ecosystem/langchain)         | Agent framework | Agents with a sandboxed code execution tool |
| [OpenAI SDK](/docs/sandbox/ecosystem/openai-sdk)       | Model SDK       | Function calling through the Responses API  |
| [Anthropic SDK](/docs/sandbox/ecosystem/anthropic-sdk) | Model SDK       | Tool use through the Messages API           |
| [AI SDK](/docs/sandbox/working-with-sandbox)           | AI SDK          | Tool calling with the AI SDK                |

## Coding agents

| Integration                            | Type          | Use case                                    |
| -------------------------------------- | ------------- | ------------------------------------------- |
| [Devin](/docs/sandbox/ecosystem/devin) | Coding agent  | Devin Outposts sessions in Sandbox microVMs |
| [Herdr](/docs/sandbox/ecosystem/herdr) | Agent manager | Terminal coding agents in persistent Sandboxes |
| [Hermes](/docs/sandbox/ecosystem/hermes) | Coding agent | Hermes terminal commands in Sandbox microVMs |


---

[View full sitemap](/docs/sitemap)
