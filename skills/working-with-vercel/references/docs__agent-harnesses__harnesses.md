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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-harnesses/harnesses.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "4b3e2938990267bf9f88129da87e524d07a254b37bdd1f10d0e02b7c7e6796ad"
---

# Agent Harnesses You Can Run Durably on Vercel

Each guide gets one harness running durably on Vercel: the agent, a chat route, and the route that resumes a turn after a crash. Pick the harness your agent uses:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Making every harness durable](https://vercel.com/blog/making-every-harness-durable)
- [Program Claude Code, Codex, Pi and other agent harnesses with AI SDK](https://vercel.com/changelog/program-agent-harnesses-with-ai-sdk)
- [Use ACP-compatible harnesses with the AI SDK harness layer](https://vercel.com/changelog/use-acp-compatible-harnesses-with-the-ai-sdk-harness-layer)
- [Scheduling Work for Agents](https://vercel.com/docs/schedules/agents) — Give an agent a tool that creates dynamic schedules, so it can do work for a user later or on a recurring basis.
- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem) — Use Vercel Sandbox with the agent frameworks, model SDKs, and agents you already work with.
- [Scheduling Work with Pi](https://vercel.com/docs/schedules/agents/pi) — Give a Pi agent on durable-harness a tool that creates schedules, and send each run back into the session that created i

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
