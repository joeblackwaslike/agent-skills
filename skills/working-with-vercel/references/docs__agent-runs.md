---
title: Agent Runs
product: vercel
url: /docs/agent-runs
canonical_url: "https://vercel.com/docs/agent-runs"
last_updated: 2018-10-20
type: how-to
prerequisites:
  []
related:
  - /docs/tracing/always-on-tracing
  - /docs/cli/traces
  - /docs/cli/agent-runs
  - /docs/agent-resources/vercel-mcp
  - /docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_run_projects
summary: Inspect eve agent sessions, configure trace sampling, and control the content Agent Runs receives.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-runs.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "2de873730a0dfa2681f6c6257ee5eab32c26078c6678d15c3541a537201952bc"
---

# Agent Runs

Agent Runs lets you inspect eve sessions, turns, tools, reasoning, timing, and token usage in the
Vercel dashboard. It appears automatically for eve projects, with no instrumentation file required.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Runs](https://eve.dev/docs/observability/agent-runs) — Inspect eve sessions in Vercel and configure the Agent Runs destination.
- [Trace and debug eve agent sessions with Vercel Observability](https://vercel.com/changelog/eve-agent-observability)
- [Agent Runs now available in the Vercel MCP and CLI](https://vercel.com/changelog/agent-runs-vercel-mcp-cli)
- [Agent Runs now show subagent activity on eve projects](https://vercel.com/changelog/agent-runs-now-show-subagent-activity-on-eve-projects)
- [Observability for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/observability) — See each durable agent session in Vercel Agent Runs, with its turns, model and tool calls, timing, and token usage, and
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [Agent Runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs) — Vercel MCP tools for agent runs.
- [eve on Vercel](https://vercel.com/docs/frameworks/agents/eve) — Create and deploy an eve agent on Vercel with AI Gateway model access, durable sessions, and authenticated requests.
- [Build a Software Factory with eve](https://vercel.com/docs/agent-resources/software-factory/eve) — Customize an eve software factory on Vercel with GitHub access, sandbox execution, and reviewed draft pull requests.

Full cross-link map for this page: [/docs/agent-runs.graph.md](/docs/agent-runs.graph.md)
<!-- /docsgraph:related -->

> Agent Runs are available in Beta on Enterprise, Pro, and Hobby plans

Agent Runs usage is billed at
[Always-on Tracing rates](/docs/tracing/always-on-tracing#usage-and-pricing) during beta. All plans
include 30-day Agent Runs retention during beta.

Open your project in the Vercel dashboard and go to
[**Agent Runs**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fagent-runs\&title=Agent+Runs).

## What Agent Runs shows

The overview shows:

- **Runs** over time, broken down by trigger, such as Slack and HTTP.
- **Token usage** over the same window, split into input, output, and cached tokens.
- A **table of runs** with the triggering message, trigger type, tokens in and out, turn count,
  duration, and time.

Select a run to see its model, trigger, and deployment, followed by a per-turn breakdown with:

- **Timings** for each step in the turn, including skill loads and individual tool calls.
- **Input** and **Output** for the turn.
- **Reasoning** the model produced along the way.
- **Tool Calls** made during the turn, with their arguments and results.
- Input, cached, and output token counts for the turn.

Agent Runs is eve's built-in OpenTelemetry integration for Vercel. Configure it with `agentRuns()`.
New eve deployments automatically configure tracing to sample at 100%. Existing deployments must
configure sampling.

To investigate an agent's actions, connect its tool calls with the initiating identity, approval records, and changes recorded by downstream systems. Agent Runs captures execution traces; your application and connected systems must supply the approval and outcome records. Read [How do you audit what an AI agent did?](/i/how-to-audit-ai-agents) for guidance on reconstructing a run and handling gaps in the evidence.

## Configure tracing for existing deployments

New eve deployments automatically configure tracing to sample at 100%. Existing deployments must
add a tracing rule before Vercel collects traces. We recommend sampling at 100% to collect all of the
spans related to the run.

For an existing deployment, select your team and project, then open
[**Settings → Tracing**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ftracing\&title=Go+to+Tracing+settings):

1. Select **Add Sampling Rule**.
2. Choose **All Environments**, **Production**, or **Preview**.
3. Set **Rate** to `100%`.
4. Select **Save**.

Tracing starts when you save the rule. You can also manage sampling rules with
[`vercel traces config`](/docs/cli/traces#manage-trace-sampling-rules). The CLI accepts rates from
1% to 100%. Add a 0% rule from the dashboard.

## Configure Agent Runs trace content

If your agent processes personal, sensitive, or regulated data, you may need to disclose this
capture under applicable laws and in your privacy materials.

The process-wide `otel({ tracePolicy })` setting controls the maximum content available to every
OpenTelemetry destination. Use `recordInputs` and `recordOutputs` to control content capture. Agent
Runs cannot restore content excluded by this policy. See
[Configure process-wide trace content](https://eve.dev/docs/observability/otel#configure-opentelemetry)
for an example.

Use `agent/instrumentation/agent-runs.ts` to further narrow what Agent Runs receives. For example,
retain spans for private sessions while redacting their inputs and outputs:

```ts filename="agent/instrumentation/agent-runs.ts"
import { agentRuns } from 'eve/instrumentation/otel';

export default agentRuns({
  exportPolicy: {
    span: ({ audience }) =>
      audience === 'public'
        ? { emit: true }
        : { redact: true, inputs: true, outputs: true },
  },
});
```

Input redaction removes eve's known prompt, instruction, document, and tool-argument attributes.
Output redaction removes response, reasoning, tool-result, exception, and status attributes.
Redaction affects only Agent Runs and does not mutate spans sent to another destination.

## Inspect runs with Vercel CLI

Use [`vercel agent-runs`](/docs/cli/agent-runs) to inspect runs from your terminal or a coding agent with shell access:

```bash filename="terminal"
vercel agent-runs projects --scope my-team
vercel agent-runs list --scope my-team --project my-app
vercel agent-runs inspect run_1234567890 --scope my-team --project my-app
vercel agent-runs trace run_1234567890 --scope my-team --project my-app
```

Replace the example team, project, and run ID with your own. Commands default to production; add `--environment preview` for preview runs. Every subcommand supports `--json`. The default trace view summarizes conversation turns as Markdown and truncates long content. Use `--json --max-field-length 0` to read untruncated field values from a trace page. See the [CLI reference](/docs/cli/agent-runs) for time filters, pagination, and output details.

## Inspect runs with Vercel MCP

Connect a supported client to [Vercel MCP](/docs/agent-resources/vercel-mcp) to investigate agent activity from your coding assistant. The Agent Runs tools let you find projects, select a run, and inspect its metadata and trace:

| Tool                                                                                                 | Use it to                                                          |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [list\_agent\_run\_projects](/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_run_projects) | Find projects in a team that have Agent Runs data.                 |
| [list\_agent\_runs](/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_runs)                 | Find runs for a project and time window.                           |
| [get\_agent\_run](/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run)                     | Inspect a run's metadata, events, usage, and subagent information. |
| [get\_agent\_run\_trace](/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run_trace)         | Read the conversation trace, including messages and tool calls.    |

For example, ask your client: "Find recent Agent Runs for my project, then inspect the tool calls in the latest run." Specify the team, project, environment, and time window when you need to narrow the results.

Trace results can be paginated or unavailable. Follow the [trace response and pagination guidance](/docs/agent-resources/vercel-mcp/tools/agent-runs/get_agent_run_trace#response-and-pagination) before treating an empty result as evidence that a run had no activity.

## Next steps

For an end-to-end investigation, follow [Trace and debug eve agent runs](/kb/guide/trace-and-debug-eve-agent-runs). Inspect a run, control captured content, export traces to an observability service, and add a regression eval for the fix.

- [Observability](https://eve.dev/docs/observability/otel): configure process-wide OpenTelemetry settings and
  third-party destinations.
- [Concepts](https://eve.dev/docs/concepts/execution-model-and-durability): learn how eve's runtime pieces fit together.
- [Vercel Observability](/docs/observability): inspect traces alongside logs and metrics.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
