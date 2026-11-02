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
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "c4b042762fb193cb97426ba60082e7840232629e7f4cbeb37740406a68abe68e"
---

# Agent Harnesses You Can Run Durably on Vercel

Each guide gets one harness running durably on Vercel: the agent, a chat route, and the route that resumes a turn after a crash. Pick the harness your agent uses:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Making every harness durable](https://vercel.com/blog/making-every-harness-durable)
- [Program Claude Code, Codex, Pi and other agent harnesses with AI SDK](https://vercel.com/changelog/program-agent-harnesses-with-ai-sdk)
- [Coding Agents and Chat Platforms with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents) — Connect coding agents and chat platforms to AI Gateway. Configure Claude Code, Codex, Chatbox, Open WebUI, and more.
- [Agent Frameworks on Vercel](https://vercel.com/docs/frameworks/agents) — Build AI agents with eve, Mastra, Flue, and Vercel. Learn how each framework connects to Vercel compute, models, and sto
- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem) — Use Vercel Sandbox with the agent frameworks, model SDKs, and agents you already work with.

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
