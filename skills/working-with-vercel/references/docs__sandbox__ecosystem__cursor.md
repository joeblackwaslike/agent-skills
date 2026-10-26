---
title: Cursor Cloud Agents
product: vercel
url: /docs/sandbox/ecosystem/cursor
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/cursor"
last_updated: 2026-09-22
type: conceptual
prerequisites:
  - /docs/sandbox/ecosystem
  - /docs/sandbox
related:
  - /docs/sandbox
  - /docs/cli
  - /docs/functions
  - /docs/workflows
  - /docs/sandbox/pricing
summary: Run Cursor Cloud Agents on Vercel Sandbox by backing a Cursor Self-Hosted Machines Team Pool with one isolated microVM per request.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem/cursor.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "83445f039be6b15c873869d7ef285692f2685e5cca7d8b84543891330add6e94"
---

# Cursor Cloud Agents

Run [Cursor Cloud Agents](https://cursor.com/docs/cloud-agent) in isolated
[Vercel Sandbox](/docs/sandbox) microVMs. Cursor handles the agent loop and
model inference, while each Sandbox provides the environment where the agent
clones code, runs commands, edits files, and executes tests.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Cursor Cloud Agents can now run in Vercel Sandbox](https://vercel.com/changelog/run-cursor-cloud-agents-vercel-sandbox)
- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [How to run Herdr coding agents in isolated Vercel Sandboxes](https://vercel.com/kb/guide/run-herdr-coding-agents-isolated-vercel-sandboxes) — Install the vercel.sandbox plugin for Herdr, approve an upload manifest, run each AI coding agent in its own isolated Ve
- [Cursor](https://ai-sdk.dev/providers/ai-sdk-harnesses/cursor) — Learn how to use the Cursor harness adapter.
- [How to build an on-demand voice agent with Vercel Sandbox](https://vercel.com/kb/guide/how-to-build-an-on-demand-voice-agent-with-vercel-sandbox) — Build a voice AI application that creates isolated LiveKit agent environments using Vercel Sandbox, enabling real-time c
- [Using TanStack AI with Vercel Sandbox](https://vercel.com/kb/guide/tanstack-ai-vercel-sandbox) — Run coding agents in isolated Vercel Sandbox microVMs with the @tanstack/ai-sandbox-vercel provider, with durable resume
- [Cursor with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/cursor) — Connect Cursor to AI Gateway with its OpenAI base URL override. Configure the Cursor compatibility endpoint, API key, an
- [AgentEnv by Scale AI](https://vercel.com/docs/sandbox/ecosystem/agentenv) — Run evaluations with AgentEnv by Scale AI using separate Vercel sandboxes for the environment and agent.

Full cross-link map for this page: [/docs/sandbox/ecosystem/cursor.graph.md](/docs/sandbox/ecosystem/cursor.graph.md)
<!-- /docsgraph:related -->

This page covers what the integration needs, how the pieces fit together, and
where each part lives in the reference implementation. For the complete source,
follow [Run Cursor Cloud Agents on Vercel
Sandbox](/kb/guide/cursor-vercel-sandbox).

> **💡 Note:** Team Pools need a Cursor Enterprise plan. A personal Cursor API key cannot
> authenticate a Team Pool worker.

## Requirements

### Setup

One person sets up the integration for the team. After that, team members only
select the pool when they start an agent.

| Who                               | What they do                                                                                                                | Access they need                                       |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Person setting up the integration | Enables Self-Hosted Machines, creates the service account, deploys the Vercel controller, and maintains the worker snapshot | Cursor Enterprise team admin and Vercel project access |
| Cursor team member                | Selects the pool and starts a Cloud Agent                                                                                   | Access to the Cursor team and target repository        |

### Application

- A Cursor Enterprise plan
- **Allow Self-Hosted Machines** turned on by a Cursor team administrator in
  the Cloud Agents dashboard, so users can opt in to self-hosted runs
- An [agent-scoped team service account API
  key](https://cursor.com/docs/account/enterprise/service-accounts#creating-a-service-account)
  created by a Cursor team administrator
- A team-level Cursor GitHub integration with the target repositories
  authorized
- A Vercel account with Sandbox access
- Node.js 22 or later and the [Vercel CLI](/docs/cli)

The worker snapshot needs the Cursor Agent CLI, `git` on `PATH`, and the
workspace directory you pass to `--worker-dir`. The Cursor CLI requires that
directory to exist before the worker starts.

## How it works

A [Vercel Function](/docs/functions) starts a durable [Workflow](/docs/workflows)
that acts as the pool's controller. The controller watches the Cursor Team Pool
for pending requests. For each one it creates a Sandbox from a prebuilt
snapshot, starts a Cursor worker inside it, and stops the Sandbox when the agent
finishes. The worker token Cursor issues for each request sets the ceiling on
how long a session runs, and the controller's polling cadence sets how quickly
an idle pool responds.

### Session duration

The controller mints a [user-scoped worker
token](https://cursor.com/docs/cloud-agent/api/endpoints#worker-tokens) for each
request. That token expires after one hour and cannot refresh itself, so it (not
the plan limit) sets how long an uninterrupted session can run.

The [maximum session duration](/docs/sandbox/pricing#runtime-limits) is 45 minutes on
Hobby and 24 hours on Pro and Enterprise. The 45-minute timeout in the
reference implementation fits inside both the Hobby limit and the token
lifetime. To run longer than an hour on Pro or Enterprise, mint a new token
with the service account API key when you need to refresh a running worker. The
guide's [Production
considerations](/kb/guide/cursor-vercel-sandbox#production-considerations) cover
how the reference implementation delivers the refreshed token to the worker.

### Agent and sandbox process

1. Register a Cursor Team Pool with no workers attached. Users can select the
   pool while no Sandbox compute is running.
2. The parent Workflow polls the pending-request queue and claims each request
   with a deterministic worker ID.
3. The parent starts a child Workflow for every claimed request.
4. The child retrieves or creates a named Sandbox from a snapshot with the
   Cursor Agent CLI preinstalled, then starts the request-scoped worker.
5. The child monitors the agent and stops the Sandbox when the agent becomes
   idle or reaches its timeout.

The Team Pool stays registered when it has no workers. The controller creates
capacity only after a request arrives, so the pool scales to zero.

Scaling to zero costs the first user of an idle pool some waiting time. A
request that arrives right after the controller backs off to its five-minute
interval waits up to five minutes for the next poll, plus the time to create the
Sandbox and connect the worker. Shorten the idle interval when that wait matters
more than the compute it saves.

## Getting started

[Run Cursor Cloud Agents on Vercel Sandbox](/kb/guide/cursor-vercel-sandbox)
has the complete code for each file in the reference implementation and walks
through the setup in order. The sections below summarize what each stage does,
the limits and defaults that shape it, and where it lives in the guide.

### Integration setup

Follow the guide's [Getting
started](/kb/guide/cursor-vercel-sandbox#getting-started) in this order:

1. Enable Self-Hosted Machines and create the agent-scoped service account API
   key.
2. Create and link the Vercel project, then store the key as
   `CURSOR_SERVICE_ACCOUNT_API_KEY`. See [Set up the
   project](/kb/guide/cursor-vercel-sandbox#set-up-the-project).
3. Build a Sandbox snapshot with the Cursor Agent CLI installed. See [Build the
   worker snapshot](/kb/guide/cursor-vercel-sandbox#build-the-worker-snapshot).
4. Register the `vercel-sandbox` Team Pool with no workers attached. See
   [Register a scale-to-zero Team
   Pool](/kb/guide/cursor-vercel-sandbox#register-a-scale-to-zero-team-pool).
5. Deploy the controller and start its durable Workflow. See [Expose the
   controller
   endpoint](/kb/guide/cursor-vercel-sandbox#expose-the-controller-endpoint).

The service account API key stays in Vercel Functions and Workflow. The
controller uses it to inspect and claim work and to mint worker tokens. Only the
short-lived worker token enters the Sandbox.

### Run the controller

The controller is the parent Workflow, which the guide builds in [Run the
discovery workflow](/kb/guide/cursor-vercel-sandbox#run-the-discovery-workflow).
It polls the Team Pool for pending requests and adjusts how often based on what
it finds: every five seconds while it is dispatching work, every minute once it
goes idle, and every five minutes after five empty checks in a row. Workflow
sleeps do not consume compute while the controller is suspended.

A single Workflow run is capped at [10,000 steps and 25,000
events](/docs/workflows/pricing#workflow-run-limits), so the controller does not
run as one endless loop. It polls for a fixed number of cycles, then exits, and
a [cron job](/docs/cron-jobs) starts the next run. Together they behave like one
controller that never stops.

Only one controller runs per pool at a time. If a second one starts, it exits
right away instead of competing for requests.

### Start a worker in Sandbox

For each claim, the child Workflow mints a worker token for the requesting
Cursor user, creates the request's named Sandbox from the worker snapshot with
[`Sandbox.getOrCreate()`](/docs/sandbox/sdk-reference#sandbox.getorcreate),
writes the token to a file with mode `0600`, and starts the Cursor worker as a
detached process. The reference implementation uses `persistent: false` and a
45-minute timeout. See [Provision a worker
sandbox](/kb/guide/cursor-vercel-sandbox#provision-a-worker-sandbox) for the
source.

The worker command takes these options and environment variables:

| Option                               | Purpose                                                                                                                                                                                                                                                          |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--auth-token-file`                  | Path to the worker token file. The CLI re-reads it when it reconnects.                                                                                                                                                                                           |
| `--pool`                             | The Team Pool to join, `vercel-sandbox` in the reference implementation.                                                                                                                                                                                         |
| `--worker-dir`                       | Workspace directory. It has to exist before the worker starts.                                                                                                                                                                                                   |
| `CURSOR_AGENT_WORKER_ID`             | Worker ID for the claim. Pass it in the `runCommand` environment so it reaches the worker process, and match the ID the controller used to claim the request, or Cursor routes the agent somewhere else.                                                         |
| `CURSOR_WORKER_IDLE_RELEASE_TIMEOUT` | Seconds to hold the worker open after a session ends so follow-up messages reach the same Sandbox. The reference implementation uses `600`; Cursor's default is `3600`. The CLI exits with code 0 when the timer fires, which is the signal to stop the Sandbox. |

Each Cursor request gets one Sandbox, named after the request, so a Workflow
retry reuses the same Sandbox instead of creating a second one.
[`Sandbox.getOrCreate()`](/docs/sandbox/sdk-reference#sandbox.getorcreate)
returns that existing Sandbox as it was first created and ignores any new
settings you pass.

### Start an agent

After the controller is running, team members open Cursor's Cloud Agents
interface and select `vercel-sandbox` for the run. To start the run through the
Cloud Agents API instead, see [Start an agent on the team
pool](/kb/guide/cursor-vercel-sandbox#start-an-agent-on-the-team-pool) for the
request body.

For cleanup, network access, capacity limits, and token refresh in production,
see [Production
considerations](/kb/guide/cursor-vercel-sandbox#production-considerations).


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
