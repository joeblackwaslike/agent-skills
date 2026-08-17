---
title: Queues Observability
product: vercel
url: /docs/queues/observability
canonical_url: "https://vercel.com/docs/queues/observability"
last_updated: 2026-03-03
type: how-to
prerequisites:
  - /docs/queues
related:
  - /docs/queues/sdk
summary: Monitor queue throughput, message age, and consumer performance to optimize your queue-based workflows.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/queues/observability.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "5d9030edc495d9f57b33a666c499b10f178e0287b8334909ccf96e70bf6be01c"
---

# Queues Observability

The **Queues** observability tab provides visibility into your queue operations, helping you monitor message throughput, consumer performance, message age, and retries across all your queues.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Insights](https://vercel.com/docs/observability/insights?from=related) — List of available data sources that you can view and monitor with Observability on Vercel.
- [Concepts](https://vercel.com/docs/queues/concepts?from=related) — Learn delivery, retries, visibility timeouts, and deployment isolation in Vercel Queues.
- [Pricing and Limits](https://vercel.com/docs/queues/pricing?from=related) — Understand how Vercel Queues billing works, what's included, and which service limits apply.
- [Overview](https://vercel.com/docs/observability?from=related) — Observability on Vercel provides framework-aware insights enabling you to optimize infrastructure and application perfor
- [API Reference](https://vercel.com/docs/queues/api?from=related) — HTTP API reference for Vercel Queues. Publish, consume, acknowledge, and manage messages.

Full cross-link map for this page: [/docs/queues/observability.graph.md](/docs/queues/observability.graph.md)
<!-- /docsgraph:related -->

## Finding Queues observability

You can access Queues observability at the project level through the Observability tab:

1. Navigate to your [project dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fqueues\&title=Vercel+Queues)
2. Click on the **Observability** tab in the left sidebar
3. Select **Queues** from the horizontal tabs at the top

The Queues tab shows all queues in your project with real-time metrics and historical trends.

## Available metrics

### Project-level metrics

When viewing the Queues tab at the project level, you can see:

| Metric           | Description                                                     |
| ---------------- | --------------------------------------------------------------- |
| **Messages/s**   | Number of messages sent to the queue per second                 |
| **Queued**       | Total number of messages sent to the queue over the time period |
| **Received**     | Total number of messages received by consumers                  |
| **Deleted**      | Total number of messages successfully processed and deleted     |
| **Redeliveries** | Receives beyond a message's first attempt                       |

Each row in the table includes sparkline charts showing how these metrics have changed over time. You can click on any queue to view detailed metrics for that specific queue.

### Queue-level metrics

When you click on a specific queue, you can see detailed charts and breakdowns:

**Queue Activity per Second**: Line chart comparing the rate at which messages are published, received, and deleted. This helps you understand:

- Peak processing times and traffic patterns
- Whether consumers are keeping up with incoming messages
- Whether consumers delete the messages they receive, or leave them to expire and redeliver

**Max Message Age**: Line chart showing how long the oldest message waited before a consumer received it, broken down by consumer group. This metric helps you identify:

- Consumer lag or backlog issues
- Whether messages are being processed in a timely manner
- Potential problems with specific consumer groups

**Retry Depth**: Line chart showing the highest receive count any message reached, broken down by consumer group. A queue whose messages are each received once stays at 1. Use this chart to find which consumer group is retrying, then correlate the climb with a deploy or a downstream outage.

**Consumers table**: A detailed table showing all consumer groups for the queue with the following columns:

| Column             | Description                                                        |
| ------------------ | ------------------------------------------------------------------ |
| **Consumer Group** | Name of the consumer group                                         |
| **Processed/s**    | Messages processed per second by this consumer group               |
| **Received**       | Total messages received with sparkline chart                       |
| **Deleted**        | Total messages successfully deleted with sparkline chart           |
| **Redeliveries**   | Receives by this consumer group beyond a message's first attempt   |

## Reading redelivery metrics

The queue redelivers a message when a consumer receives it but never deletes it. The lease expires and the next consumer to poll receives the message again, counting one more receive. Returning `{ afterSeconds: n }` from the SDK's [retry callback](/docs/queues/sdk#custom-retry-behavior) sets the remaining lease to `n` seconds, and the receive that follows counts the same way.

**Redeliveries** counts those repeat receives. **Retry Depth** reports the highest attempt number any single message reached, so the two answer different questions:

| Pattern                            | What it means                                                       |
| ---------------------------------- | ------------------------------------------------------------------- |
| Retry Depth of 1                   | No message has been received more than once                         |
| High Redeliveries, low Retry Depth | Failures spread across many messages rather than concentrated in one |
| Rising Retry Depth                 | At least one message keeps failing and the queue keeps retrying it   |

A Retry Depth that climbs over time points to a poison message: one payload your consumer cannot process, taking one more receive on every cycle. Fix the handler, or return `{ acknowledge: true }` from the [retry callback](/docs/queues/sdk#custom-retry-behavior) so the message stops recirculating.

Both metrics are also available under **Queue Actions** on the Observability **Query** tab, where you can group them by queue name, consumer group, or event type.


---

[View full sitemap](/docs/sitemap)
