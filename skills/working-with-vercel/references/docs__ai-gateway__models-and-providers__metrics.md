---
title: Metrics
product: vercel
url: /docs/ai-gateway/models-and-providers/metrics
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/metrics"
last_updated: 2026-05-22
type: conceptual
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/uptime
  - /docs/ai-gateway/sdks-and-apis/rest-api
  - /docs/ai-gateway/authentication-and-byok
summary: Understand how AI Gateway measures throughput and latency per provider.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/metrics.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "055990ed4cbef32abe92fe4dd7b5cb29bf4f130813a3de05c0e357c362976030"
---

# Metrics

AI Gateway tracks **throughput** and **latency** for each model and provider, measured from live AI Gateway traffic. For provider availability, see [uptime](/docs/ai-gateway/models-and-providers/uptime).

## Throughput

Throughput is the rate at which a provider returns output tokens, measured in tokens per second. Higher throughput means a provider returns output tokens faster.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/light-gpt-oss-120b-throughput)

## Latency

Latency is time to first token (TTFT), measured in milliseconds. It's the duration between the request reaching the provider and the first response token arriving. Lower latency means a faster perceived response.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/light-gpt-oss-120b-latency)

## Where to find metrics

You can find metrics in the following places:

- The [AI Gateway model catalog](https://vercel.com/ai-gateway/models): each model row shows the best metrics across all providers (highest throughput, lowest latency).
- The [**AI Gateway** > **Models**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fmodels\&title=Go+to+AI+Gateway+Models) tab in your project: same view as the catalog, scoped to your team.

To see metrics broken down by provider, click any model to open its detail page. For each provider, the detail page shows the live values from the last hour and a chart of how each metric has trended over time.

## Sharing a snapshot

Select **Share** in the top-right corner to export the current view as an image. The export captures the selected model, metric, and time range so you can share a snapshot in tickets, postmortems, or status updates.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/gpt-oss-120b-throughput-1d.png)

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/gpt-oss-120b-latency-1d.png)

## Accessing metrics via the API

Each endpoint returned by the [model endpoints API](/docs/ai-gateway/sdks-and-apis/rest-api#get-model-endpoints) includes rolling one-hour metrics for that provider:

```bash
curl -i https://ai-gateway.vercel.sh/v1/models/anthropic/claude-opus-4.7/endpoints \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY"
```

Replace `anthropic/claude-opus-4.7` with the model ID you want to inspect, and set `AI_GATEWAY_API_KEY` to a valid [AI Gateway API key](/docs/ai-gateway/authentication-and-byok#api-keys). Each endpoint object includes:

| Field                    | Type   | Description                                         |
| ------------------------ | ------ | --------------------------------------------------- |
| `throughput_last_1h.p50` | number | Median throughput in tokens per second              |
| `throughput_last_1h.p95` | number | 95th-percentile throughput in tokens per second     |
| `latency_last_1h.p50`    | number | Median time to first token in milliseconds          |
| `latency_last_1h.p95`    | number | 95th-percentile time to first token in milliseconds |

Example response excerpt:

```json
{
  "data": {
    "id": "anthropic/claude-opus-4.7",
    "endpoints": [
      {
        "provider_name": "anthropic",
        "throughput_last_1h": { "p50": 67, "p95": 69.85 },
        "latency_last_1h": { "p50": 2292, "p95": 2685 }
      }
    ]
  }
}
```

## Scope

Throughput and latency are measured from requests that run directly through AI Gateway. Bring Your Own Key (BYOK) requests aren't included since their performance depends on your own provider credentials, not AI Gateway's.

These numbers reflect what AI Gateway observes when serving live traffic. They may differ from what providers report directly due to factors specific to AI Gateway, like account tiering, regions, or routing decisions.


---

[View full sitemap](/docs/sitemap)
