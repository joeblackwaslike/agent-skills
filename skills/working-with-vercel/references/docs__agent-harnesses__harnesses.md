---
title: Agent Harnesses You Can Run Durably on Vercel
product: vercel
url: /docs/agent-harnesses/harnesses
canonical_url: "https://vercel.com/docs/agent-harnesses/harnesses"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/agent-harnesses
related:
  - /docs/agent-harnesses/pi
  - /docs/agent-harnesses/fx
  - /docs/agent-harnesses/opencode
  - /docs/agent-harnesses/eve
  - /docs/agent-harnesses/claude-code
summary: Guides for running Pi, fx, OpenCode, eve, Claude Code, and Codex durably on Vercel, so a crash or a timeout resumes the agent instead of losing its...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-harnesses/harnesses.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "8f85765e11a0936041db48b6715bd310601ae6bdefbe335b976c5744a47491b5"
---

# Agent Harnesses You Can Run Durably on Vercel

Each guide gets one harness running durably on Vercel: the agent, a chat route, and the route that resumes a turn after a crash. Pick the harness your agent uses:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI SDK Harnesses](https://ai-sdk.dev/providers/ai-sdk-harnesses) — Learn how to use AI SDK harness adapters.
- [Pi](https://ai-sdk.dev/providers/ai-sdk-harnesses/pi) — Learn how to use the Pi harness adapter.
- [Program Claude Code, Codex, Pi and other agent harnesses with AI SDK](https://vercel.com/changelog/program-agent-harnesses-with-ai-sdk)
- [Coding Agents and Chat Platforms with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents) — Connect coding agents and chat platforms to AI Gateway. Configure Claude Code, Codex, Chatbox, Open WebUI, and more.
- [eve](https://vercel.com/docs/eve) — Build and deploy durable backend AI agents with eve, an open-source, filesystem-first framework.

Full cross-link map for this page: [/docs/agent-harnesses/harnesses.graph.md](/docs/agent-harnesses/harnesses.graph.md)
<!-- /docsgraph:related -->

| Harness                                                         | Package                               | Runs in                                                       |
| --------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------- |
| [Pi](/docs/agent-harnesses/pi)                                  | `durable-harness/pi-durable` or `/pi` | Your function, with files in a virtual workspace or a Sandbox |
| [fx](/docs/agent-harnesses/fx)                                  | `libfx`                               | Your function, with files in a virtual workspace or a Sandbox |
| [OpenCode](/docs/agent-harnesses/opencode)                      | `durable-harness/opencode`            | Your function, with files in a virtual workspace or a Sandbox |
| [eve](/docs/agent-harnesses/eve)                                | `eve`                                 | An eve app, durable by default                                |
| [Claude Code](/docs/agent-harnesses/claude-code) (experimental) | `durable-harness/claude-code`         | A Vercel Sandbox                                              |
| [Codex](/docs/agent-harnesses/codex) (experimental)             | `durable-harness/codex`               | A Vercel Sandbox                                              |

The `durable-harness` guides share one setup, and each shows it for Next.js and for other frameworks. fx and eve are durable on their own, so their guides use `libfx` and `eve` directly. To learn how durability works, see [Running Agent Harnesses Durably](/docs/agent-harnesses).

These pages apply to every `durable-harness` guide:

- [Tools, files, and documents](/docs/agent-harnesses/tools): what tools do after a crash, where an agent's files live, and typed state with a session.
- [Observability](/docs/agent-harnesses/observability): each session in Vercel Agent Runs.
- [Security](/docs/agent-harnesses/security): what may run in your function, and where commands and files the model picks run instead.
- [Self-hosting](/docs/agent-harnesses/self-hosting): sessions in another World, such as Postgres, on your own servers.


---

[View full sitemap](/docs/sitemap)
