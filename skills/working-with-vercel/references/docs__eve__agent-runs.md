---
title: Agent Runs
product: vercel
url: /docs/eve/agent-runs
canonical_url: "https://vercel.com/docs/eve/agent-runs"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/eve
related:
  - /docs/tracing/always-on-tracing
  - /docs/cli/traces
  - /docs/eve/observability
  - /docs/eve/concepts
  - /docs/observability
summary: Inspect eve agent sessions, configure trace sampling, and control the content Agent Runs receives.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/eve/agent-runs.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "c926445d22e1dffe1dc317c207b45093034590a4a511eee443a5092717c20f2c"
---

# Agent Runs

Agent Runs lets you inspect eve sessions, turns, tools, reasoning, timing, and token usage in the
Vercel dashboard. It appears automatically for eve projects, with no instrumentation file required.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Runs](https://eve.dev/docs/observability/agent-runs) — Inspect eve sessions in Vercel and configure the Agent Runs destination.
- [Private enterprise agents on Vercel](https://vercel.com/kb/guide/private-enterprise-agents-vercel) — Design private enterprise agents that call internal APIs and databases with Vercel Functions, Secure Compute, AI Gateway
- [Trace and debug eve agent sessions with Vercel Observability](https://vercel.com/changelog/eve-agent-observability)
- [OpenTelemetry](https://eve.dev/docs/observability/otel) — Configure OpenTelemetry destinations, content capture, and third-party exports.
- [Agent Runs now available in the Vercel MCP and CLI](https://vercel.com/changelog/agent-runs-vercel-mcp-cli)
- [Agent Runs now show subagent activity on eve projects](https://vercel.com/changelog/agent-runs-now-show-subagent-activity-on-eve-projects)
- [Observability for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/observability) — See each durable agent session in Vercel Agent Runs, with its turns, model and tool calls, timing, and token usage, and
- [Agent Runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs) — Vercel MCP tools for agent runs.
- [Pricing and Limits](https://vercel.com/docs/eve/pricing) — Understand how eve usage maps to Vercel resources and inherited platform limits.
- [How Software Factories Work](https://vercel.com/docs/eve/software-factory) — Understand what software factories are, when to use them, and how eve coordinates agents from work item to reviewed chan

Full cross-link map for this page: [/docs/eve/agent-runs.graph.md](/docs/eve/agent-runs.graph.md)
<!-- /docsgraph:related -->

> **Availability**: Agent Runs (Beta) are available on Enterprise and Pro and Hobby plans

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
[Configure process-wide trace content](/docs/eve/observability#configure-process-wide-trace-content)
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

## Next steps

- [Observability](/docs/eve/observability): configure process-wide OpenTelemetry settings and
  third-party destinations.
- [Concepts](/docs/eve/concepts): learn how eve's runtime pieces fit together.
- [Vercel Observability](/docs/observability): inspect traces alongside logs and metrics.


---

[View full sitemap](/docs/sitemap)
