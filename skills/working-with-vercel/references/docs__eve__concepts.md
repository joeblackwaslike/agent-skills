---
title: Concepts
product: vercel
url: /docs/eve/concepts
canonical_url: "https://vercel.com/docs/eve/concepts"
last_updated: 2026-09-21
type: conceptual
prerequisites:
  - /docs/eve
related:
  - /docs/ai-gateway
  - /docs/workflows
  - /docs/functions
  - /docs/fluid-compute
  - /docs/environment-variables
summary: Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/eve/concepts.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "53d846d4c7808010c7b6b6a53dc45d4fe520b8f6bc2ef02e000116d579c65685"
---

# Concepts

eve turns a filesystem project into a durable backend AI agent. You author the agent under an
`agent/` directory, and eve discovers those files, validates them, compiles a manifest, and serves
the runtime as a deployable app.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [Build your first Slack agent with eve](https://vercel.com/kb/guide/eve-slack-agent-starter) — Deploy the eve Slack agent template: a starter Slack bot built on the eve framework with an example tool and skill.
- [Terminal UI](https://eve.dev/docs/guides/dev-tui) — Use eve locally or connect to a deployed agent from an interactive terminal UI.
- [How to add skills to your eve agent](https://vercel.com/kb/guide/how-to-add-eve-skills) — Add skills to an eve agent by creating a file under agent/skills/ or installing a published skill with the npx skills ad
- [How to build a GitHub agent with eve and GitHub Tools](https://vercel.com/kb/guide/github-agent-eve) — Build a GitHub agent with eve, GitHub Tools, and Vercel Connect. Register AI-callable GitHub tools, gate writes behind d
- [Give your eve agent secure access to your private AWS RDS database](https://vercel.com/kb/guide/give-eve-agent-secure-access-to-aws-rds-database) — Connect an eve agent to a private AWS RDS database using Vercel Secure Compute and VPC peering, with a read-only query t
- [Introducing eve, an open-source agent framework](https://vercel.com/changelog/introducing-eve-an-open-source-agent-framework)
- [Get started with eve: durable AI agents in TypeScript](https://eve.dev/docs/getting-started) — Create an eve project, configure model credentials, and run your first agent.
- [Ship It](https://eve.dev/docs/tutorial/ship-it) — Part 8 of the Build an Agent tutorial. Put a web dashboard on the agent with useEveAgent, replace placeholderAuth, and d
- [Security Model](https://eve.dev/docs/concepts/security-model) — eve's trust boundaries, where secrets live, how credentials reach hosts, and what fails closed by default.
- [The Agent Stack](https://vercel.com/blog/agent-stack)
- [How Software Factories Work](https://vercel.com/docs/eve/software-factory) — Understand what software factories are, when to use them, and how eve coordinates agents from work item to reviewed chan

Full cross-link map for this page: [/docs/eve/concepts.graph.md](/docs/eve/concepts.graph.md)
<!-- /docsgraph:related -->

## Agent project

An eve agent is a set of named files and directories under `agent/`. Directories are
auto-discovered by name, so adding a capability is usually as simple as adding a file:

- `agent/instructions.md`: the always-on system prompt.
- `agent/agent.ts`: runtime config, such as model and options, through `defineAgent`.
- `agent/tools/*.ts`: one typed tool per file; the filename becomes the runtime tool name.
- `agent/skills/*`: optional, on-demand procedures the model loads only when relevant.
- `agent/subagents/*`: optional child agents the model delegates focused subtasks to.
- `agent/channels/*`: platform entry points such as HTTP and Slack.
- `agent/connections/*`: typed integrations with external services.
- `agent/sandbox/*`: the agent's isolated compute environment.
- `agent/instrumentation.ts`: optional OpenTelemetry setup for AI SDK spans.

## Runtime config

The `agent/agent.ts` file defines the agent runtime. The most important setting is the model:

```ts filename="agent/agent.ts"
import { defineAgent } from 'eve';

export default defineAgent({
  model: 'openai/gpt-5.4-mini',
});
```

Model strings resolve through [AI Gateway](/docs/ai-gateway) on Vercel, so deployed agents can use
Vercel OIDC instead of managing provider API keys directly.

## Sessions and turns

A session is the durable conversation or task started by a channel or HTTP request. Each user
message or external event creates a turn. During a turn, the agent can call tools, load skills, read
or write sandbox files, delegate to [subagents](#subagents), and stream lifecycle events back to the
client.

eve exposes HTTP routes for creating a session and attaching to its stream:

```bash
curl -X POST http://127.0.0.1:3000/eve/v1/session \
  -H 'content-type: application/json' \
  -d '{"message":"Summarize this repository"}'
```

The response includes an `x-eve-session-id` header. Use that id to reattach to the stream:

```bash
curl http://127.0.0.1:3000/eve/v1/session/<sessionId>/stream
```

## Durability

eve sessions run on top of [Vercel Workflows](/docs/workflows). Workflows persist progress as an
event log and deterministically replay it to reconstruct state, so a session can survive cold
starts, redeploys, and long pauses while it waits for the next message or a tool result.

On Vercel, the compiled agent runs from [Vercel Functions](/docs/functions). Because agent turns are
long-running and stream incrementally, eve benefits from [Fluid Compute](/docs/fluid-compute),
which is enabled by default for new projects.

## Channels

Channels are entry points into the same agent runtime. A channel can start sessions, route platform
events into turns, and apply platform-specific authentication or formatting. eve agents can expose
HTTP routes and can add channel files for platforms such as Slack.

Route-auth secrets, preview-protection bypass secrets, and other channel-specific configuration live
in project [environment variables](/docs/environment-variables).

## Tools and skills

Tools are typed actions the model can call during a turn. Each file in `agent/tools/` defines one
tool, and the filename becomes the tool name the model sees. Learn more about
[adding tools to your eve agent](/kb/guide/how-to-add-eve-tools).

You can use Jev to review proposed tool calls against your approval criteria before they run.
Calls classified as `clear` run automatically, while `caution` calls pause for human approval.
Follow [Automatically approve tool calls in eve with Jev](/kb/guide/auto-approve-tool-calls-eve-jev)
to configure the policy and test its failure paths.

Skills are larger procedures or reference material that the model loads on demand. Use skills for
repeatable workflows, multi-step instructions, or domain knowledge that should not be part of the
always-on prompt. Keeping skills separate helps the model use the right context only when it is
relevant.

Install skills into `agent/skills/` with the [skills CLI](/docs/agent-resources/skills#eve) from your eve project directory.

## Subagents

A subagent is a child agent that the model delegates a focused subtask to. Use one to run work in
parallel, give a child a narrower set of tools, or give a specialist its own identity. Unlike a
skill, which adds instructions to the running agent, a subagent runs as a separate agent with fresh
conversation history and state. eve offers two kinds: the built-in `agent` tool delegates to a copy
of the current agent, and declared subagents live under `agent/subagents/*` with their own config.

Learn more about [using subagents with eve](/kb/guide/how-to-use-eve-subagents).

## Connections

Connections describe typed integrations with external services. Use them to keep provider-specific
configuration and credential access outside the model prompt and tool implementation details.

For delegated user or team credentials, [authorize eve connections with Vercel
Connect](/docs/connect/frameworks/eve). For model access, use [AI
Gateway](/docs/ai-gateway) model strings in the agent config.

## Sandbox

Every eve agent has one sandbox: an isolated, bash-style compute environment with its own
filesystem. Framework tools such as `bash`, `read_file`, and `write_file` target it, and authored
tools can target it too.

On Vercel, the sandbox can run on [Vercel Sandbox](/docs/sandbox), using ephemeral microVMs for
untrusted or model-generated commands.

## Observability

Every eve project gets [Agent Runs](/docs/eve/agent-runs) in the Vercel dashboard. Agent Runs shows
sessions, turns, tool calls, reasoning, timing, and token usage without an instrumentation file.

New eve deployments automatically configure tracing to sample at 100%. Existing deployments must
configure sampling. See [Agent Runs](/docs/eve/agent-runs) for setup, pricing, retention, and
trace-content controls.

See [eve observability](/docs/eve/observability) for process-wide OpenTelemetry settings, built-in
exports, and third-party destinations.

## Next steps

- [Getting started](/docs/eve): create your first eve project.
- [Pricing and Limits](/docs/eve/pricing): understand the Vercel resources eve uses.
- [Agent Runs](/docs/eve/agent-runs): inspect agent sessions and configure trace collection.
- [Observability](/docs/eve/observability): configure OpenTelemetry exports and policies.


---

[View full sitemap](/docs/sitemap)
