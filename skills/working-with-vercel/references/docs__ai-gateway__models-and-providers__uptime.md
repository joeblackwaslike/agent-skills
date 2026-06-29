---
title: Uptime and Status
product: vercel
url: /docs/ai-gateway/models-and-providers/uptime
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/uptime"
last_updated: 2026-06-04
type: conceptual
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/rest-api
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
summary: See how uptime and status track AI Gateway provider health and end-to-end request success.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/uptime.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "58059ddbc236a461538592837aca7681055dae8420ea74afc661b6803696fafb"
---

# Uptime and Status

When a provider has an outage, AI Gateway falls back to a healthy provider so your requests still go through. The model detail page surfaces this in two views, **Uptime** and **Status**, both calculated from live AI Gateway traffic.

Both views share the same time-range toggle in the top-right corner. Each window uses a different bucket size:

| Toggle | Window | Bucket size |
| ------ | ------ | ----------- |
| `1H`   | 1 hour | Per-minute  |
| `1D`   | 1 day  | 15-minute   |
| `1W`   | 1 week | Per-hour    |

## Uptime

The uptime view charts the percentage of successful requests over time, with one line for AI Gateway and one line for each upstream provider. Use it to compare providers, watch trends, and measure how much fallback is helping.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/opus-4.7-uptime-1-week)

If a provider has no recent activity, AI Gateway can't measure its uptime, so the chart shows it at 100%. The 100% line is a placeholder, not a trend. It doesn't mean the provider was fully available.

### Where to find uptime

You can open the uptime view from:

- The [AI Gateway model catalog](https://vercel.com/ai-gateway/models). Select a model, then choose **Uptime**.
- The [**AI Gateway** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in your project. Go to **Models**, select a model, then choose **Uptime**.

You can also link directly at `vercel.com/ai-gateway/models/<model-id>/uptime`, replacing `<model-id>` with the model you want to inspect. For example, see [uptime for Claude Opus 4.7](https://vercel.com/ai-gateway/models/claude-opus-4.7/uptime).

### Accessing uptime via the API

You can query uptime programmatically through the [model endpoints API](/docs/ai-gateway/sdks-and-apis/rest-api#get-model-endpoints). Each endpoint in the response exposes three rolling uptime windows:

| Field             | Window          |
| ----------------- | --------------- |
| `uptime_last_15m` | Last 15 minutes |
| `uptime_last_1h`  | Last 1 hour     |
| `uptime_last_1d`  | Last 1 day      |

```bash
curl -i https://ai-gateway.vercel.sh/v1/models/anthropic/claude-opus-4.7/endpoints \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY"
```

Replace `anthropic/claude-opus-4.7` with the model ID you want to inspect, and set `AI_GATEWAY_API_KEY` to a valid [AI Gateway API key](/docs/ai-gateway/authentication-and-byok#api-keys).

The response returns one entry per provider serving the model, each with the three uptime windows:

```json
{
  "data": {
    "id": "anthropic/claude-opus-4.7",
    "endpoints": [
      {
        "provider_name": "anthropic",
        "uptime_last_15m": 100,
        "uptime_last_1h": 99.8,
        "uptime_last_1d": 99.6
      },
      {
        "provider_name": "bedrock",
        "uptime_last_15m": 100,
        "uptime_last_1h": 100,
        "uptime_last_1d": 99.9
      },
      {
        "provider_name": "vertex",
        "uptime_last_15m": 100,
        "uptime_last_1h": 100,
        "uptime_last_1d": 99.1
      }
    ]
  }
}
```

## Status

The status view shows a row of health bars across the selected window, giving you a glanceable read on whether a provider is healthy. Each bar covers one time bucket. The color shows the success rate in that bucket:

| Color | Range   | Meaning  |
| ----- | ------- | -------- |
| Green | 95–100% | Healthy  |
| Amber | 75–95%  | Degraded |
| Red   | 0–75%   | Down     |

If a provider has no activity in a bucket, the bar reads "No activity" instead of a color.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/opus-4.7-status)

### Where to find status

You can open the status view from:

- The [AI Gateway model catalog](https://vercel.com/ai-gateway/models). Select a model, then choose **Status**.
- The [**AI Gateway** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in your project. Go to **Models**, select a model, then choose **Status**.

You can also link directly at `vercel.com/ai-gateway/models/<model-id>/status`, replacing `<model-id>` with the model you want to inspect. For example, see [status for Claude Opus 4.7](https://vercel.com/ai-gateway/models/claude-opus-4.7/status).

## Sharing a snapshot

Select **Share** in the top-right corner of either view to export the current view as an image. The export captures the selected model, view, and time range so you can share a snapshot in tickets, postmortems, or status updates.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/claude-opus-4.7-uptime-1w.png)

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/opus-4.7-share-status)

## Scope

Bring Your Own Key (BYOK) requests aren't included, since their success depends on your own provider credentials rather than AI Gateway's.

These numbers reflect what AI Gateway observes, not a provider's overall availability. They may differ from a provider's own reported uptime due to factors specific to AI Gateway, like account tiering, regions, or routing decisions.

## How success is defined

A provider attempt counts as successful when the provider returns a valid response. Uptime is calculated as:

```
uptime % = (successes / total) × 100
```

The following are excluded from the calculation entirely:

- **`4xx` responses**, since they don't reflect provider uptime issues. Receiving a `4xx` means the provider was reachable and responded.
- **Requests using the [`only` filter](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering#restrict-providers-with-the-only-filter)**, for AI Gateway uptime only. The `only` filter restricts routing to a subset of providers, which limits how AI Gateway can fall back. These requests still count toward provider uptime.

## Provider uptime vs. AI Gateway uptime

AI Gateway reports two uptime metrics, which differ in what they count as successes and totals:

- **Provider uptime** reflects the success rate of every individual attempt to a given provider.
- **AI Gateway uptime** only considers the final attempt in each request, capturing the end-to-end outcome after any fallbacks.

| Metric            | Successes                      | Total                     |
| ----------------- | ------------------------------ | ------------------------- |
| Provider uptime   | Provider's successful attempts | Provider's total attempts |
| AI Gateway uptime | Successful final attempts      | Total requests            |

A request that fails on its first provider but succeeds on a fallback counts as a success for AI Gateway uptime. This is why AI Gateway uptime can be higher than any individual provider's uptime, since fallback logic can recover from single-provider failures.


---

[View full sitemap](/docs/sitemap)
