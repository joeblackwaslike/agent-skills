---
title: Pricing and Limits
product: vercel
url: /docs/eve/pricing
canonical_url: "https://vercel.com/docs/eve/pricing"
last_updated: 2026-06-19
type: reference
prerequisites:
  - /docs/eve
related:
  - /docs/functions/usage-and-pricing
  - /docs/workflows/pricing
  - /docs/sandbox/pricing
  - /docs/ai-gateway/pricing
  - /docs/tracing/always-on-tracing
summary: Understand how eve usage maps to Vercel resources and inherited platform limits.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/eve/pricing.md"
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "301ebf40e05a504d12bb25ae7f73fb50d04b18c8e998bbd2be62bd01cdddfef0"
---

# Pricing and Limits

eve usage is billed through the Vercel resources and third-party services your agent uses. An eve
deployment can use Vercel Functions for compute, Vercel Workflows for durable sessions, Vercel
Sandbox for isolated command execution, and AI Gateway or model providers for model calls.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway?from=related&source_path=%2Fdocs%2Feve%2Fpricing&source_site=vercel-docs&relationship=related) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [Give your eve agent secure access to your private AWS RDS database](https://vercel.com/kb/guide/give-eve-agent-secure-access-to-aws-rds-database?from=related&source_path=%2Fdocs%2Feve%2Fpricing&source_site=vercel-docs&relationship=related) — Connect an eve agent to a private AWS RDS database using Vercel Secure Compute and VPC peering, with a read-only query t
- [How to add tools to your eve agent](https://vercel.com/kb/guide/how-to-add-eve-tools?from=related&source_path=%2Fdocs%2Feve%2Fpricing&source_site=vercel-docs&relationship=related) — Add tools to an eve agent by creating a TypeScript file under agent/tools/ with defineTool, and gate sensitive ones on h
- [How I use OpenCode with Vercel AI Gateway to build features fast](https://vercel.com/kb/guide/how-i-use-opencode-with-vercel-ai-gateway-to-build-features-fast?from=related&source_path=%2Fdocs%2Feve%2Fpricing&source_site=vercel-docs&relationship=related) — How to route different AI models to different coding tasks automatically, cutting token costs by ~70% without losing qua
- [Vercel Agent Pricing](https://vercel.com/docs/agent/pricing?from=related&source_path=%2Fdocs%2Feve%2Fpricing&source_site=vercel-docs&relationship=related) — Understand Vercel Agent pricing and how to track costs
- [Pricing on Vercel](https://vercel.com/docs/pricing?from=related&source_path=%2Fdocs%2Feve%2Fpricing&source_site=vercel-docs&relationship=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Manage and optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related&source_path=%2Fdocs%2Feve%2Fpricing&source_site=vercel-docs&relationship=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Pricing and Limits](https://vercel.com/docs/queues/pricing?from=related&source_path=%2Fdocs%2Feve%2Fpricing&source_site=vercel-docs&relationship=related) — Understand how Vercel Queues billing works, what's included, and which service limits apply.
- [Legacy Usage & Pricing for Functions](https://vercel.com/docs/functions/usage-and-pricing/legacy-pricing?from=related&source_path=%2Fdocs%2Feve%2Fpricing&source_site=vercel-docs&relationship=related) — Learn about legacy usage and pricing for Vercel Functions.

Full cross-link map for this page: [/docs/eve/pricing.graph.md](/docs/eve/pricing.graph.md?from=related&source_path=%2Fdocs%2Feve%2Fpricing&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** Pricing depends on the features your agent uses, the Vercel plan for the project, and any model or
> third-party provider usage. Review the linked product pricing pages for current rates.

## Billable resources

| Resource | When eve uses it | Learn more |
| -------- | ---------------- | ---------- |
| Vercel Functions | Serving the compiled agent routes, session requests, stream attachments, channel webhooks, and tool execution. | [Functions usage and pricing](/docs/functions/usage-and-pricing) |
| Vercel Workflows | Persisting session, turn, and subagent progress so runs can pause, resume, and survive redeploys. | [Workflow pricing and limits](/docs/workflows/pricing) |
| Vercel Sandbox | Running isolated filesystem and command execution when your agent uses the Vercel sandbox backend. | [Sandbox pricing and limits](/docs/sandbox/pricing) |
| AI Gateway | Resolving model strings such as `openai/gpt-5.4-mini` and routing model requests. | [AI Gateway pricing](/docs/ai-gateway/pricing) |
| Model providers | Processing input, cached, and output tokens for the models your agent calls. | [AI Gateway model list](/ai-gateway/models) |
| Always-on Tracing | Indexing spans for Agent Runs after sampling. | [Always-on Tracing usage and pricing](/docs/tracing/always-on-tracing#usage-and-pricing) |

## Common cost drivers

- **Session volume**: Each session and turn invokes agent routes and creates Workflow events.
- **Model usage**: Prompt length, tool results, reasoning, cached tokens, and output length affect
  model costs.
- **Tool calls**: External API calls can increase Function duration, Workflow event count, and
  third-party usage.
- **Streaming**: Stream writes are persisted by Workflows and count toward Workflow data written and
  retained.
- **Sandbox usage**: Command execution, provisioned resources, network transfer, snapshot storage,
  and sandbox creation can add Vercel Sandbox usage.

## Limits

eve inherits limits from the platform products behind the agent:

- **Function limits**: Agent route runtime, memory, bundle size, request body size, concurrency, and
  regional behavior follow [Vercel Functions limits](/docs/functions/limitations).
- **Workflow limits**: Session durability, event creation, stream chunks, hook tokens, replay
  duration, payload size, and run storage follow [Workflow run limits](/docs/workflows/pricing#workflow-run-limits).
- **Sandbox limits**: Sandbox runtime, vCPU, memory, network, snapshot, and tag limits follow
  [Sandbox pricing and limits](/docs/sandbox/pricing).
- **Model limits**: Context windows, rate limits, output limits, and provider availability depend on
  the selected model and provider.
- **Channel limits**: Slack, HTTP clients, and other channel platforms can impose their own request,
  payload, retry, and rate limits.

## Estimate usage

To estimate production usage, start with one representative agent task and record:

1. How many turns the session takes.
2. How many model calls and tool calls each turn makes.
3. The input, cached, and output tokens per model call.
4. The amount of data streamed to the client.
5. Whether the task uses sandbox execution, snapshots, network access, or long-lived persistence.

Then map those measurements to the resources above. Agent Runs shows token counts, timing, tool
calls, and turn breakdowns, making it a practical starting point for real usage estimates.

## Cost controls

- Use smaller or cheaper models for low-risk turns, and reserve larger models for tasks that need
  them.
- Keep tool results and message history concise so the model receives only relevant context.
- Move repeatable instructions into skills so they load only when relevant.
- Use sandbox network policies and lifecycle hooks to limit unnecessary network and compute usage.
- Break very large or long-running jobs into smaller sessions or subagents when they approach
  Workflow replay or storage limits.
- Configure [Spend Management](/docs/spend-management) and project alerts for production agents.

## Next steps

- [Concepts](/docs/eve/concepts): learn how eve's runtime pieces fit together.
- [Agent Runs](/docs/eve/agent-runs): inspect agent sessions and configure trace collection.
- [Observability](/docs/eve/observability): configure OpenTelemetry exports and policies.


---

[View full sitemap](/docs/sitemap)
