---
title: Scheduling Work for Agents
product: vercel
url: /docs/schedules/agents
canonical_url: "https://vercel.com/docs/schedules/agents"
last_updated: 2026-11-04
type: how-to
prerequisites:
  - /docs/schedules
related:
  - /docs/schedules
  - /docs/queues
  - /docs/schedules/agents/eve
  - /docs/schedules/agents/libfx
  - /docs/schedules/agents/ai-sdk
summary: Give an agent a tool that creates dynamic schedules, so it can do work for a user later or on a recurring basis.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/agents.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "f41e3703e05db403eb951b6e06867383e66e08d9dd26174f95c85cff2f08dd1f"
---

# Scheduling Work for Agents

An agent can promise to do something later, like "every weekday at 9am, summarize my open pull requests", and keep that promise with a [dynamic schedule](/docs/schedules#static-and-dynamic-schedules). eve has this built in. With other harnesses, you write two pieces, a tool and a consumer:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Schedules](https://eve.dev/docs/schedules) — Run an agent on a cron cadence, either a fire-and-forget prompt or a handler that hands work off to a channel.
- [Dynamic Scheduling](https://eve.dev/docs/patterns/dynamic-scheduling) — Compose one minute-level eve schedule, proactive channel handoff, and CRUD tools into application-managed schedules.
- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Schedules Concepts](https://vercel.com/docs/schedules/concepts) — Learn how Vercel Schedules handles environments, deployments, jitter, one-time schedules, late runs, and duplicate deliv
- [Schedules Configuration Reference](https://vercel.com/docs/schedules/configuration) — Reference for static schedules in vercel.json and the Build Output API, including targets, function identifiers, cron sy
- [Agent Harnesses You Can Run Durably on Vercel](https://vercel.com/docs/agent-harnesses/harnesses) — Guides for running Pi, fx, OpenCode, eve, Claude Code, and Codex durably on Vercel, so a crash or a timeout resumes the

Full cross-link map for this page: [/docs/schedules/agents.graph.md](/docs/schedules/agents.graph.md)
<!-- /docsgraph:related -->

1. **A tool creates the schedule.** The model calls it with a time and a prompt. The tool calls `Schedules.create()` with a [Vercel Queue](/docs/queues) topic as the target, the user's ID as the namespace, and the prompt in the payload.
2. **The schedule fires.** Vercel publishes a message to the topic with the payload.
3. **A consumer wakes the agent.** It sends the prompt back to the agent, as if the user had just asked. With a durable harness, it can send the prompt into the same conversation.

## Choose a harness

| Harness                                    | How it schedules work                                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| [eve](/docs/schedules/agents/eve)          | Built in. `defineDynamicSchedules` gives the agent tools to create and manage schedules.         |
| [libfx](/docs/schedules/agents/libfx)      | A tool you write. The consumer prompts the session that created the schedule.                    |
| [AI SDK](/docs/schedules/agents/ai-sdk)    | A tool you write. The consumer runs the prompt as a new agent turn.                              |
| [Pi](/docs/schedules/agents/pi)            | A tool you write, on `durable-harness`. The consumer sends the prompt into the same session.     |

## Tips

- **Use a namespace per user.** The tool decides the namespace, not the model, so a user can only list and cancel their own schedules. See [Multi-tenant schedules](/docs/schedules/multi-tenant).
- **Name schedules after the tool call.** If a harness retries a tool call, the same name returns `schedule_already_exists` instead of creating a second schedule.
- **Write a standalone prompt.** Tell the model to write the scheduled prompt as a complete instruction, and give it the user's current time and time zone so it can resolve "tomorrow at 9".
- **Return errors to the model.** Return a `SchedulesApiError`'s message from the tool, such as an invalid cron expression, so the model can fix the call.
- **Expect retries.** Queue messages can be delivered more than once. Use the message's `executionId` to deduplicate. See [Handling scheduled runs](/docs/schedules/handle-runs#queue-targets).

## Related

- [Running agent harnesses durably](/docs/agent-harnesses)
- [SDK reference](/docs/schedules/sdk)
- [Local development](/docs/schedules/local-development)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
