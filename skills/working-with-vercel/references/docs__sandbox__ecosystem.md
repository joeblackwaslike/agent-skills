---
title: Ecosystem
product: vercel
url: /docs/sandbox/ecosystem
canonical_url: "https://vercel.com/docs/sandbox/ecosystem"
last_updated: 2026-08-04
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
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "709c4a9cd2034234891071cb4dddcbe210c6c2a8b6b3b8fbd0b944ab564f244c"
---

# Ecosystem

Vercel Sandbox integrates with the agent frameworks, model SDKs, and coding
agents you already use. Give your agent a tool that executes code inside a
sandbox, and model-generated code runs in an isolated Firecracker microVM
instead of on your host.

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
