---
title: Logs
product: vercel
url: /docs/ai-gateway/observability-and-spend/logs
canonical_url: "https://vercel.com/docs/ai-gateway/observability-and-spend/logs"
last_updated: 2026-07-30
type: how-to
prerequisites:
  - /docs/ai-gateway/observability-and-spend
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/ai-gateway/observability-and-spend/custom-reporting
summary: Search, filter, and follow individual AI Gateway requests, inspect provider routing for one request, and export the results as CSV or JSON.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/observability-and-spend/logs.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "7e1cfad4147b8ab377dba6c05e8211e4225466a9da36b29c33a8e9c7a6a343ec"
---

# Logs

The Logs page lists every request and asynchronous job your team sends through AI Gateway, newest first. Use it to find one operation by ID, narrow the list by model or outcome, watch traffic as it arrives, and inspect routing, usage, and cost.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Add structured application logs to Vercel Functions](https://vercel.com/kb/guide/add-structured-application-logs-to-vercel-functions?from=related) — Learn how to add structured application logs to Vercel Functions to help troubleshoot function issues in real time.
- [Runtime](https://vercel.com/docs/logs/runtime?from=related) — Learn how to search, inspect, and share your runtime logs with the Logs tab.
- [Logs](https://vercel.com/docs/logs?from=related) — Use logs to find information on deployment builds, function executions, and more.
- [vercel logs](https://vercel.com/docs/cli/logs?from=related) — View and filter request logs for your Vercel project, or stream live runtime logs from a deployment.
- [Insights](https://vercel.com/docs/observability/insights?from=related) — List of available data sources that you can view and monitor with Observability on Vercel.
- [Usage & Billing](https://vercel.com/docs/ai-gateway/observability-and-spend/usage?from=related) — Monitor your AI Gateway credit balance, usage, and generation details.

Full cross-link map for this page: [/docs/ai-gateway/observability-and-spend/logs.graph.md](/docs/ai-gateway/observability-and-spend/logs.graph.md)
<!-- /docsgraph:related -->

For aggregate charts and spend totals, see [Observability](/docs/ai-gateway/observability-and-spend/observability). For usage grouped by model, user, or tag, see [Custom Reporting](/docs/ai-gateway/observability-and-spend/custom-reporting).

## Open the logs

Open the [**Logs** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Flogs\&title=AI+Gateway+Logs) in the AI Gateway sidebar. It's available at two scopes:

- **Team**: every request and asynchronous job across your team, at `/[team]/~/ai-gateway/logs`
- **Project**: only that project's logs, at [`/[team]/[project]/ai-gateway/logs`](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fai-gateway%2Flogs\&title=Project+AI+Gateway+Logs)

The two views behave identically. The project view is the team view with a project filter applied.

## Read the log table

Each row is one request or asynchronous job. The table scrolls horizontally when the available width can't fit every column, including when request details are open.

| Column             | What it shows                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| **Time**           | When the request started or job was submitted. Hover for the full timestamp                    |
| **Status**         | HTTP status code for a request, or lifecycle state such as Completed or Cancelled for a job     |
| **Model**          | The model that served the request, including its speed tier                                     |
| **Provider**       | The provider that served the request                                                             |
| **Usage**          | What the request consumed, in the unit that suits its modality                                  |
| **Cost**           | Total cost in dollars                                                                           |
| **Duration**       | Total request duration, or elapsed job time from submission to completion                       |
| **Authentication** | The AI Gateway API key, project, app token, or personal access token that authenticated the call |

**Usage** holds one slot per row and changes what it reports based on the model's modality:

| Modality              | Usage reads                                       |
| --------------------- | ------------------------------------------------- |
| Language              | `1.7K → 233 tokens`, everything read then written |
| Embedding             | `23 tokens in`, since embeddings return vectors   |
| Image                 | `4 images`                                        |
| Video                 | Count, duration, and resolution                   |
| Speech, Transcription | Audio duration                                    |
| Realtime              | Session duration and client message count         |
| Reranking             | Query count                                       |

Hover a Usage cell for the long form, which names the components. For language models that means the input and cache-read halves of the left figure, and the reasoning and output halves of the right.

A dash means the request reported nothing for that column. A request that failed before reaching a provider shows one for both Usage and Cost.

The list is always ordered newest first and can't be re-sorted. To narrow it, use the filters below.

> **💡 Note:** Token splits, the cost breakdown, whether the request was billed to AI Gateway or BYOK, Zero Data Retention, and the full video measures all live in the request details panel rather than the table. Click any row to see them.

## Filter logs

The filter bar sits above the table.

**Search** matches the model, provider, or request ID. Enter an exact job ID to find an asynchronous job.

**Dropdowns** each accept multiple values:

| Filter             | Options                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| **Status**         | `2xx`, `4xx`, `5xx`, or an exact code you enter, such as `429`                                                               |
| **Model**          | Any model your team has used                                                                                                  |
| **Provider**       | Any provider your team has used                                                                                               |
| **Authentication** | API keys, projects that used OIDC tokens, app tokens, and personal access tokens                                              |
| **Routing**        | AI Gateway system credentials, BYOK credentials, Virtual Models, or Private Inference                                         |
| **Modality**       | Any modality your team has used, such as Language or Embedding                                                               |
| **Request Mode**   | Synchronous requests or asynchronous jobs                                                                                     |
| **Latency**        | Minimum request duration or time to first token                                                                               |
| **Tokens**         | Minimum input or output token count                                                                                           |
| **Cost**           | Minimum inference cost                                                                                                        |

**Date range** offers presets from the last 5 minutes to the last 30 days. You can look back at most 36 days.

Every filter is stored in the URL, so you can share a filtered view by copying the address. **Reset** clears the search and filters.

> **💡 Note:** The Provider, Model, and Modality dropdowns list what your team used in the last 30 days, regardless of the selected date range. A provider you last called two months ago won't appear as an option.

The chart above the table shows token volume under the same filters. When matching operations report no token usage, the chart shows request volume instead. If the range contains no requests, the chart shows an empty state. Drag across a populated chart to select that time range and zoom into a finer granularity.

## Follow logs live

Turn on **Live** to tail logs as they arrive. New rows appear at the top, refreshing every 5 seconds.

Live mode has three limits worth knowing:

- It only works with a relative range. Turning it on while an absolute range is selected switches you to the last hour.
- Scrolling back through history is disabled while live. Pause to load older logs.
- Requests take about 90 seconds to fully ingest, so the newest rows lag real time by roughly that much.

With Live off, the list loads 50 more rows each time you scroll to the bottom.

## Inspect a log

Click any row to open its details beside the list. The panel is resizable by dragging its left edge. The selected log ID is stored in the URL, so you can copy the address to share the same log and filtered list.

The header carries the generation or job ID with a copy button. **Request started** identifies the authentication input, inference region, and whether Zero Data Retention applied. OIDC-authenticated requests name their project because the token itself has no API key name. App tokens and personal access tokens appear as team-scoped authentication.

**Routing** describes what happened after AI Gateway received the request. A single provider attempt appears in one Routing card. A request that needed multiple attempts shows one **Routed to \[provider]** card per attempt. Each card can include the provider, provider region, served model, credential source, time to first token, compact timing spans, status, and provider response.

Timing spans use green for successful work, amber for a 4xx response, and red for a 5xx response or timeout. A recovered request also has a refresh icon in the table's Status cell.

**Transcript** shows captured inputs and outputs when content capture is available. Structured JSON uses an expandable JSON view, while chat and tool calls use their modality-specific presentation. Zero Data Retention, privacy settings, size limits, or capture failures can make transcript content unavailable.

**Usage** and **Cost** break the request down line by line, so you can see which tokens and which charges made up the total.

## Export logs

**Copy visible logs** copies every loaded row, including job-only rows, to your clipboard. **Export to CSV** and **Export to JSON** include loaded request rows under the active filters and time range. The menu discloses job-only rows that the file export omits because those jobs don't have a flat request record yet.

## Retention and limits

Routing attempt details are kept for **30 days**. Older requests still appear in the list but open with a message saying their routing details are no longer available.

The date range picker allows up to 36 days, which is longer than the 30-day detail retention. Requests in that 6-day gap are listed without details.

## Roles and permissions

Viewing logs requires read access to your team's usage. Team roles without it see a permission message in place of the table rather than an empty list.


---

[View full sitemap](/docs/sitemap)
