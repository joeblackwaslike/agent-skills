---
title: Leaderboards
product: vercel
url: /docs/ai-gateway/leaderboards
canonical_url: "https://vercel.com/docs/ai-gateway/leaderboards"
last_updated: 2026-08-24
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/ecosystem/app-attribution
summary: See which AI models, labs, apps, and providers are most used on AI Gateway, share a chart as an image, and download the underlying data.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/leaderboards.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "6efe3e3af94525171c869e82a721f71a41671008b5b2bf07c60fef0011ebb831"
---

# Leaderboards

The [AI Gateway leaderboards](/ai-gateway/leaderboards) show which models, labs, apps, and providers developers use most on AI Gateway. Use them to see what's gaining traction, compare options before you build, and track how usage shifts over time.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Access and share AI Gateway leaderboard data](https://vercel.com/changelog/open-data-and-shareable-charts-for-ai-gateway-leaderboards?from=related&source_path=%2Fdocs%2Fai-gateway%2Fleaderboards&source_site=vercel-docs&relationship=related)
- [AI Gateway production index](https://vercel.com/blog/ai-gateway-production-index?from=related&source_path=%2Fdocs%2Fai-gateway%2Fleaderboards&source_site=vercel-docs&relationship=related)
- [Open-weight models surge to 29% of volume, price per token flattens](https://vercel.com/blog/ai-gateway-production-index-july-2026?from=related&source_path=%2Fdocs%2Fai-gateway%2Fleaderboards&source_site=vercel-docs&relationship=related)
- [Live model performance metrics accessible via AI Gateway](https://vercel.com/changelog/live-model-performance-metrics-accessible-via-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fleaderboards&source_site=vercel-docs&relationship=related)
- [DeepSeek enters the fight for token volume, Anthropic continues to dominate spend](https://vercel.com/blog/ai-gateway-production-index-june-2026?from=related&source_path=%2Fdocs%2Fai-gateway%2Fleaderboards&source_site=vercel-docs&relationship=related)
- [Logs](https://vercel.com/docs/ai-gateway/observability-and-spend/logs?from=related&source_path=%2Fdocs%2Fai-gateway%2Fleaderboards&source_site=vercel-docs&relationship=related) — Search, filter, and follow individual AI Gateway requests, inspect provider routing for one request, and export the resu
- [Query Web Analytics with the API](https://vercel.com/docs/analytics/web-analytics-api?from=related&source_path=%2Fdocs%2Fai-gateway%2Fleaderboards&source_site=vercel-docs&relationship=related) — Learn how Web Analytics concepts map to API queries for custom reports, dashboards, and insights.
- [vercel ai-gateway](https://vercel.com/docs/cli/ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fleaderboards&source_site=vercel-docs&relationship=related) — Manage AI Gateway resources from the Vercel CLI: API keys, budgets, routing rules, models, leaderboards, and coding agen
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fleaderboards&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/ai-gateway/leaderboards.graph.md](/docs/ai-gateway/leaderboards.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fleaderboards&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## What's ranked

| Leaderboard     | Ranks                                | Modalities         | Metrics                                                    |
| --------------- | ------------------------------------ | ------------------ | --------------------------------------------------------- |
| **Models**      | Individual models                    | Text, image, video | Requests, token volume, spend, images or videos generated |
| **Labs**        | Model creators (OpenAI, Anthropic…)  | Text, image, video | Requests, token volume, spend, images or videos generated |
| **Apps**        | Opted-in apps built on AI Gateway    | All                | Token volume, spend                                       |
| **Providers**   | Inference providers                  | All                | Token volume, spend                                       |

Models and labs show a daily percentage share over time. Apps and providers show a ranked top list. The share figures beside each model or lab reflect the most recent day by default; hover over any day on the chart to see that day's numbers.

## Where the data comes from

The leaderboards are built from real AI Gateway usage, aggregated daily. The data is anonymized: it shows each model, lab, app, or provider's percentage share or rank, never absolute volumes, customer names, or team and project identifiers.

Apps only appear if their owner opts in. To add or remove your app, see [App attribution](/docs/ai-gateway/ecosystem/app-attribution).

## Share a chart

Each chart has a share button that turns the current view into an image:

- **Download** the chart as a PNG.
- **Copy** the image to your clipboard.
- **Choose an aspect ratio** (landscape, square, or portrait) for the platform you're posting to.

The image includes the legend, headline, and AI Gateway branding, so it stays clear when shared on its own.

## Open data

The data behind the leaderboards is open. Download it as CSV or read it programmatically.

### License

The data is published under [Creative Commons Attribution 4.0 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). You're free to use, share, and adapt it, including commercially, as long as you give appropriate credit and link to the license.

> © 2026 Vercel. "AI Gateway Leaderboard Data" is licensed under CC BY 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0/

### Download from the leaderboards

Every chart and ranked list has a **Download CSV** button that exports exactly what it shows. CSV files include a final row with the attribution notice above.

### Export endpoint

For programmatic access, use the export endpoint. It returns the same anonymized data and is cached for 24 hours.

```http
GET https://vercel.com/api/ai/leaderboard-export
```

| Parameter  | Values                                | Default          | Notes                                                        |
| ---------- | ------------------------------------- | ---------------- | ------------------------------------------------------------ |
| `dataset`  | `models`, `labs`, `apps`, `providers` | `models`         | Which leaderboard to export.                                   |
| `modality` | `all`, `text`, `image`, `video`       | `all`            | Applies to `models` and `labs` only.                           |
| `format`   | `json`, `csv`                         | `json`           | `csv` returns a file download.                                 |
| `from`     | `YYYY-MM-DD`                          | rolling 2 months | Start of a fixed date range. `models` and `labs` only.         |
| `to`       | `YYYY-MM-DD`                          | today            | End of the range. Requires `from`; `models` and `labs` only.   |

```bash
# Daily share of the top models for text, as JSON
curl "https://vercel.com/api/ai/leaderboard-export?dataset=models&modality=text"

# The same data saved as a CSV file
curl "https://vercel.com/api/ai/leaderboard-export?dataset=models&modality=text&format=csv" -o ai-gateway-models-text.csv

# A fixed historical range instead of the default rolling window
curl "https://vercel.com/api/ai/leaderboard-export?dataset=models&from=2025-10-01&to=2025-12-31"

# Top providers, ranked by token volume and by spend
curl "https://vercel.com/api/ai/leaderboard-export?dataset=providers"
```

#### Date ranges

Without `from`, the export covers a rolling two-month window. Pass `from` (and
optionally `to`) to request a fixed range instead. The earliest queryable date
is **2025-10-01** — the point from which the daily rollups are complete. An
earlier `from`, a `to` without a `from`, an inverted range, or a range on
`dataset=apps`/`providers` (which are ranked all-time lists with no day
dimension) returns `400`. Ranged responses echo the resolved `from`, `to`, and
`earliest_available_date`.

For `models` and `labs`, each row is one entity's share on one day for one metric. For `apps` and `providers`, each row is one ranked entity:

```json
{
  "dataset": "providers",
  "license": "CC-BY-4.0",
  "license_url": "https://creativecommons.org/licenses/by/4.0/",
  "rows": [
    {
      "rank": 1,
      "name": "OpenAI",
      "ranked_by": "Token Volume",
      "url": "https://openai.com",
      "description": ""
    }
  ]
}
```

Field values:

- `group`: `model` or `lab` (models and labs only).
- `metric`: `requests`, `tokens`, `spend`, `imageCount`, or `videoCount`.
- `modality`: `all`, `text`, `image`, or `video`.
- `share_percent`: the entity's percentage share of that metric on that day.
- `rank` and `ranked_by`: position (starting at `1`) and `Token Volume` or `Spend` (apps and providers only).

The `csv` format returns the same columns as a `text/csv` attachment, with a final row carrying the CC BY 4.0 attribution notice.


---

[View full sitemap](/docs/sitemap)
