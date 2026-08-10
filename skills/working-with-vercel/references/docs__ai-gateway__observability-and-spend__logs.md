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
  - /docs/ai-gateway/authentication-and-byok/oidc
summary: Search, filter, and follow individual AI Gateway requests, inspect provider routing for one request, and export the results as CSV or JSON.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/observability-and-spend/logs.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "5c6a69e8a5dd7dbfa04efa5874060e1abfc0a01a30ea409085251c84b859b4a7"
---

# Logs

The Logs page lists every request your team sends through AI Gateway, newest first. Use it to find one request by ID, narrow to a model or a status code, watch traffic as it arrives, and open a single request to see how it was routed and what it cost.

For aggregate charts and spend totals, see [Observability](/docs/ai-gateway/observability-and-spend/observability). For usage grouped by model, user, or tag, see [Custom Reporting](/docs/ai-gateway/observability-and-spend/custom-reporting).

## Open the logs

Open the [**Logs** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Flogs\&title=AI+Gateway+Logs) in the AI Gateway sidebar. It's available at two scopes:

- **Team**: every request across your team, at `/[team]/~/ai-gateway/logs`
- **Project**: only that project's requests, at [`/[team]/[project]/ai-gateway/logs`](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fai-gateway%2Flogs\&title=Project+AI+Gateway+Logs)

The two views behave identically. The project view is the team view with a project filter applied.

## Read the log table

Each row is one request. The table scrolls horizontally.

| Column       | What it shows                                                      |
| ------------ | ------------------------------------------------------------------ |
| **Time**     | When the request started. Hover for the full timestamp             |
| **Status**   | HTTP status code, colored by class: 2xx green, 4xx amber, 5xx red  |
| **Model**    | The model that served the request                                  |
| **Provider** | The provider it was served by                                      |
| **Usage**    | What the request consumed, in the unit that suits its modality     |
| **Cost**     | Total cost of the request in dollars                               |
| **Duration** | Total request duration in seconds                                  |
| **Region**   | The region that served the request, for region-scoped routing only |

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

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/light-gateway-logs-table)

## Filter requests

The filter bar sits above the table.

**Search** matches the model, the provider, or the request ID. Pasting a request ID from your logs or an error report takes you straight to that request.

**Dropdowns** each accept multiple values:

| Filter          | Options                                                          |
| --------------- | ---------------------------------------------------------------- |
| **Providers**   | Any provider your team has used                                  |
| **Models**      | Any model your team has used                                     |
| **Modalities**  | Any modality your team has used, such as Language or Embedding   |
| **Credentials** | System, BYOK, or Virtual Models                                  |
| **Statuses**    | `2xx`, `4xx`, `5xx`, or an exact code you type in, such as `429` |

**Date range** offers presets from the last 5 minutes to the last 30 days. You can look back at most 36 days.

Every filter is stored in the URL, so you can share a filtered view by copying the address. **Clear filters** resets the search and all five dropdowns.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/light-gateway-logs-filters)

> **💡 Note:** The Providers, Models, and Modalities dropdowns list what your team used in the last 30 days, regardless of the date range you have selected. A provider you last called two months ago won't appear as an option.

The chart above the table shows request counts over the selected range under the same filters. Drag across it to zoom into a narrower window.

## Follow requests live

Turn on **Live** to tail requests as they arrive. New rows appear at the top, refreshing every 5 seconds.

Live mode has three limits worth knowing:

- It only works with a relative range. Turning it on while an absolute range is selected switches you to the last hour.
- Scrolling back through history is disabled while live. Pause to load older requests.
- Requests take about 90 seconds to fully ingest, so the newest rows lag real time by roughly that much.

With Live off, the list loads 50 more requests each time you scroll to the bottom.

## Inspect a single request

Click any row to open its details beside the list. The panel is resizable by dragging its left edge. Opening a request's URL directly, or refreshing the page, shows the same details full width instead.

The header carries the request's generation ID with a copy button, followed by a badge naming where the request came from. That's the API key if it used one, or the project if it was authenticated with an [OIDC token](/docs/ai-gateway/authentication-and-byok/oidc) and has no key. Either one links to its own page. A region badge follows for region-scoped routing, then how long ago the request ran.

**Stats** cover Total Cost, Input, Output, Reasoning, Cache Read, Cache Write, Duration, time to first token, and whether Zero Data Retention applied.

**Fallback Path** lists every provider attempt for the request in order, with failures first. Each attempt shows the model and provider, the status code, whether it used system or BYOK credentials, and how long it took. Failed attempts include the reason, such as a provider timeout or an exhausted routing budget. This is the fastest way to see why a request was slow or which provider actually served it after a failover.

**Usage** and **Cost** break the request down line by line, so you can see which tokens and which charges made up the total.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/light-gateway-logs-request-details)

## Export logs

**Export** downloads the current view as CSV or JSON. Both respect your active filters and time range, and both are capped at 1,000,000 rows.

## Retention and limits

Request details, including the fallback path, are kept for **30 days**. Older requests still appear in the list but open with a message saying their details are no longer available.

The date range picker allows up to 36 days, which is longer than the 30-day detail retention. Requests in that 6-day gap are listed without details.

## Roles and permissions

Viewing logs requires read access to your team's usage. Team roles without it see a permission message in place of the table rather than an empty list.


---

[View full sitemap](/docs/sitemap)
