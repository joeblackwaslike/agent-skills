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
  []
summary: Monitor queue throughput, message age, and consumer performance to optimize your queue-based workflows.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/queues/observability.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "e38b5aad0118d14e915d4ceeb76b6aa3016d73fcab756f4d11c64c69f0b3518a"
---

# Queues Observability

The **Queues** observability tab provides visibility into your queue operations, helping you monitor message throughput, consumer performance, and message age across all your queues.

## Finding Queues observability

You can access Queues observability at the project level through the Observability tab:

1. Navigate to your [project dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fqueues\&title=Vercel+Queues)
2. Click on the **Observability** tab in the left sidebar
3. Select **Queues** from the horizontal tabs at the top

The Queues tab shows all queues in your project with real-time metrics and historical trends.

## Available metrics

### Project-level metrics

When viewing the Queues tab at the project level, you can see:

| Metric         | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| **Messages/s** | Number of messages sent to the queue per second                 |
| **Queued**     | Total number of messages sent to the queue over the time period |
| **Received**   | Total number of messages received by consumers                  |
| **Deleted**    | Total number of messages successfully processed and deleted     |

Each row in the table includes sparkline charts showing how these metrics have changed over time. You can click on any queue to view detailed metrics for that specific queue.

### Queue-level metrics

When you click on a specific queue, you can see detailed charts and breakdowns:

**Throughput per second**: Line chart showing message processing rate over time, broken down by consumer group. This helps you understand:

- Which consumer groups are actively processing messages
- Peak processing times and traffic patterns
- Whether consumers are keeping up with incoming messages

**Max message age**: Line chart showing the oldest unprocessed message in the queue over time, broken down by consumer group. This metric helps you identify:

- Consumer lag or backlog issues
- Whether messages are being processed in a timely manner
- Potential problems with specific consumer groups

**Consumers table**: A detailed table showing all consumer groups for the queue with the following columns:

| Column             | Description                                              |
| ------------------ | -------------------------------------------------------- |
| **Consumer Group** | Name of the consumer group                               |
| **Processed/s**    | Messages processed per second by this consumer group     |
| **Received**       | Total messages received with sparkline chart             |
| **Deleted**        | Total messages successfully deleted with sparkline chart |


---

[View full sitemap](/docs/sitemap)
