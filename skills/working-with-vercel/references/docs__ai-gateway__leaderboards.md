---
title: Leaderboards
product: vercel
url: /docs/ai-gateway/leaderboards
canonical_url: "https://vercel.com/docs/ai-gateway/leaderboards"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/ecosystem/app-attribution
summary: Learn about leaderboards on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/leaderboards.md"
fetched_at: "2026-07-06T05:40:24.878Z"
sha256: "5fbaa69f7afd289d2611cd0139326276aba5388abc692b8355598a2634735871"
---

# Leaderboards

The [AI Gateway leaderboards](/ai-gateway/leaderboards) show which models, labs, apps, and providers developers use most on AI Gateway. Use them to see what's gaining traction, compare options before you build, and track how usage shifts over time.

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

| Parameter  | Values                                | Default  | Notes                                |
| ---------- | ------------------------------------- | -------- | ------------------------------------ |
| `dataset`  | `models`, `labs`, `apps`, `providers` | `models` | Which leaderboard to export.         |
| `modality` | `all`, `text`, `image`, `video`       | `all`    | Applies to `models` and `labs` only. |
| `format`   | `json`, `csv`                         | `json`   | `csv` returns a file download.       |

```bash
# Daily share of the top models for text, as JSON
curl "https://vercel.com/api/ai/leaderboard-export?dataset=models&modality=text"

# The same data saved as a CSV file
curl "https://vercel.com/api/ai/leaderboard-export?dataset=models&modality=text&format=csv" -o ai-gateway-models-text.csv

# Top providers, ranked by token volume and by spend
curl "https://vercel.com/api/ai/leaderboard-export?dataset=providers"
```

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
