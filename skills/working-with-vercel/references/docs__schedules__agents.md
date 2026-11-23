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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/schedules/agents.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "7a8e30bc5e7855d34d439b8f8cc0c6e12f4f052b6e507960762e9808e3c86990"
---

# Scheduling Work for Agents

An agent can promise to do something later, like "every weekday at 9am, summarize my open pull requests", and keep that promise with a [dynamic schedule](/docs/schedules#static-and-dynamic-schedules). eve has this built in. With other harnesses, you write two pieces, a tool and a consumer:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Schedules](https://eve.dev/docs/schedules) — Run an agent on a cron cadence, either a fire-and-forget prompt or a handler that hands work off to a channel.
- [Schedules Concepts](https://vercel.com/docs/schedules/concepts) — Learn how Vercel Schedules handles environments, deployments, jitter, one-time schedules, late runs, and duplicate deliv
- [Managing Schedules](https://vercel.com/docs/schedules/manage) — View, enable, disable, and run schedules across environments, and check their execution history from the dashboard, CLI,
- [Vercel Schedules: API Reference](https://vercel.com/docs/schedules/http-api) — Reference for the Vercel Schedules HTTP API: authenticate, choose an environment, and create, list, update, enable, disa
- [vercel schedules](https://vercel.com/docs/cli/schedules) — Inspect and manage schedules in production, a custom environment, a Preview branch, CLI deployments by a user, or a loca
- [Starting Workflows from Schedules](https://vercel.com/docs/schedules/workflows) — Start a durable Vercel Workflow each time a schedule fires, so long or multi-step scheduled jobs retry failed steps and

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

## Frequently asked questions

### How does an AI agent schedule a task to run later on Vercel?

Give the agent a tool that calls `Schedules.create()` from [`@vercel/schedules`](/docs/schedules/sdk). The tool creates a [dynamic schedule](/docs/schedules#static-and-dynamic-schedules) that targets a [Vercel Queues](/docs/queues) topic and stores the prompt in the schedule's payload. The schedule takes effect immediately, without a deployment. When it fires, Vercel publishes a message to the topic, and your consumer sends the prompt back to the agent. With [eve](/docs/schedules/agents/eve), `defineDynamicSchedules` adds the scheduling tools for you and calls your `run` callback each time a schedule fires.

### Can an agent schedule both one-time and recurring tasks?

Yes. For a recurring task, pass `{ type: 'cron', cron }` with a five-field [cron expression](/docs/schedules/configuration#cron-expressions). For a one-time task, pass `{ type: 'single', at }` with a local date and time in `YYYY-MM-DDTHH:mm` format. Vercel evaluates both in the schedule's `timezone`, an IANA name such as `America/New_York` that defaults to UTC. One-time schedules are only available as dynamic schedules, which is the kind of schedule that `Schedules.create()` creates. eve's scheduling tools also accept `{ type: 'delay', minutes }` for a task that runs a set number of minutes from now. See [One-time expressions](/docs/schedules/configuration#one-time-expressions).

### Does a scheduled task continue the conversation that created it?

It depends on the harness. [libfx](/docs/schedules/agents/libfx) and [Pi on `durable-harness`](/docs/schedules/agents/pi) keep each session in a durable log, so the consumer sends the scheduled prompt into the session that created the schedule. With the [AI SDK](/docs/schedules/agents/ai-sdk), the consumer runs the prompt as a new turn with no chat history. [eve](/docs/schedules/agents/eve) starts a new session through one of your channels each time a schedule fires. Ask the model to write the scheduled prompt as a complete instruction, so the task doesn't depend on earlier messages.

### How do I keep one user's scheduled tasks separate from another's?

Create each user's schedules in their own namespace. Schedule names are unique within a namespace, and `Schedules.list()`, `Schedules.update()`, and `Schedules.delete()` act on the namespace you pass. Set the namespace in the tool's code from the signed-in user's ID instead of reading it from the model's input, so the model can't reach another user's schedules. A namespace is 1 to 256 ASCII letters, digits, `.`, `_`, and `-`, and starts with a letter or digit. See [Multi-tenant schedules](/docs/schedules/multi-tenant).

### How many schedules can an agent create?

Schedules that an agent creates count toward your team's schedule limit, which is 1,000 on Hobby, 10,000 on Pro, and 100,000 on Enterprise. The limit covers static and dynamic schedules across all projects, environments, and branches. When your team reaches it, `Schedules.create()` fails with `schedule_limit_exceeded`. A one-time schedule stops counting after Vercel dispatches its run. A Hobby team can also create up to 500 dynamic schedules each billing period. After that, creating a schedule fails with `feature_blocked` until the next billing period starts. Schedules are in beta, and these limits may change. See [Limits](/docs/schedules/limits).

## Related

- [Running agent harnesses durably](/docs/agent-harnesses)
- [SDK reference](/docs/schedules/sdk)
- [Local development](/docs/schedules/local-development)

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
