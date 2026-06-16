---
title: Vercel Sandbox pricing and limits
product: vercel
url: /docs/sandbox/pricing
canonical_url: "https://vercel.com/docs/sandbox/pricing"
last_updated: 2026-05-29
type: reference
prerequisites:
  - /docs/sandbox
related:
  - /docs/notifications
  - /docs/plans/hobby
  - /docs/plans/pro-plan
  - /docs/spend-management
  - /docs/sandbox/concepts/snapshots
summary: "Understand how Vercel Sandbox billing works, what's included in each plan, and the limits that apply."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/pricing.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "067f309af616f26b202c9cedf70771ecd4d30e8c9736b738171035086bbfc7b8"
---

# Vercel Sandbox pricing and limits

Vercel Sandbox usage is metered across several dimensions. This page explains how billing works for each plan, what limits apply, and how to estimate costs.

## Pricing

|  | **Hobby** (Included) | **Pro** (Per month) | **Enterprise** (Per month) |
| --- | --- | --- | --- |
| Sandbox Active CPU | 5 hours/month | $0.128/hour | $0.128/hour |
| Sandbox Provisioned Memory | 420 GB-hours/month | $0.0212/GB-hour | $0.0212/GB-hour |
| Sandbox Creations | 5,000/month | $0.60/1M | $0.60/1M |
| Sandbox Data Transfer | 20 GB/month | $0.15/GB | $0.15/GB |
| Sandbox Storage | 15 GB (lifetime) | $0.08/GB-month | $0.08/GB-month |
| Concurrent Sandboxes | 10 | 2,000 | 2,000 |
| Max Runtime Duration | 45 minutes | 5 hours | 5 hours |
| vCPU Allocation Rate | 40/10 min | 200/min | 400/min |


On each billing cycle, Hobby plans receive a monthly allotment of Sandbox usage at no cost. Pro and Enterprise plans are charged based on usage.

Once you exceed your included limit on Hobby, sandbox creation is [paused](#hobby) until the next billing cycle. Pro and Enterprise usage is charged against your account.

## Billing information

### Hobby

Sandbox is free for Hobby users within the usage limits detailed above.

Vercel sends you [notifications](/docs/notifications#on-demand-usage-notifications) as you approach your usage limits. You **will not be charged** for any additional usage. Once you exceed the limits, sandbox creation is paused until 30 days have passed since you first used the feature.

To continue using Sandbox after exceeding your limits, [upgrade to Pro](/docs/plans/hobby#upgrading-to-pro).

### Pro

All Sandbox usage on Pro plans is charged against your [$20/month credit](/docs/plans/pro-plan#credit-and-usage-allocation). After the credit is exhausted, usage is billed at the rates shown above.

To control costs, configure [Spend Management](/docs/spend-management) to receive alerts or pause projects when you reach a specified amount.

### Enterprise

Enterprise plans use the same list pricing as Pro. Contact your account team for volume discounts or higher limits.

[Contact sales](/contact/sales) for custom pricing.

## Understanding the metrics

Vercel tracks Sandbox usage across five metrics. Select a metric in the pricing table above to jump to its description.

### Active CPU

The amount of time your code actively uses the CPU, measured in hours. Time spent waiting for I/O (such as network requests, database queries, or AI model calls) does not count toward Active CPU.

You can provision 1 or an even number of vCPUs between 2 and 32 [depending on your plan](/docs/sandbox/pricing#resource-limits). The default is 2 vCPUs.

### Provisioned Memory

The memory allocated to your sandbox (in GB) multiplied by the time it runs (in hours). Each vCPU includes 2 GB of memory. Provisioned memory is billed in 1 minute minimum increments to account for sandbox lifecycle management. For example, a 4 vCPU sandbox with 8 GB of memory running for 30 minutes uses:

```
8 GB × 0.5 hours = 4 GB-hours
```

### Sandbox Creations

The number of times you call `Sandbox.create()`. Each creation counts as one, regardless of how long the sandbox runs.

### Network

The total data transferred in and out of your sandbox, measured in GB. This includes package downloads, API calls, and traffic through exposed ports.

### Snapshot Storage

The storage used by [snapshots](/docs/sandbox/concepts/snapshots), measured in GB per month.

## Example calculations

The following examples show estimated costs for common scenarios on Pro/Enterprise plans.

| Scenario           | Duration | vCPUs | Memory | Active CPU Cost | Memory Cost | Total  |
| ------------------ | -------- | ----- | ------ | --------------- | ----------- | ------ |
| Quick test         | 2 min    | 1     | 2 GB   | $0.004          | $0.001      | ~$0.01 |
| AI code validation | 5 min    | 2     | 4 GB   | $0.02           | $0.007      | ~$0.03 |
| Build and test     | 30 min   | 4     | 8 GB   | $0.26           | $0.08       | ~$0.34 |
| Long-running task  | 2 hr     | 8     | 16 GB  | $2.05           | $0.68       | ~$2.73 |

> **💡 Note:** These estimates assume 100% CPU utilization. Actual Active CPU costs are often lower because time spent waiting for I/O is not billed.

Sandbox creation costs are minimal at $0.60 per million creations ($0.0000006 per creation).

## Limits

### Resource limits

Each sandbox is automatically provisioned 32 GB of ephemeral NVMe storage. You can use [persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes) or manually create [snapshots](/docs/sandbox/concepts/snapshots) to persist data across sandboxes.

| Plan       | Maximum vCPUs | Maximum memory | Maximum open ports | Disk size |
| ---------- | ------------- | -------------- | ------------------ | --------- |
| Hobby      | 4             | 8GB            | 15                 | 32 GB     |
| Pro        | 8             | 16GB           | 15                 | 32 GB     |
| Enterprise | 32            | 64GB           | 15                 | 32 GB     |

### Runtime limits

The default timeout is 5 minutes. You can configure this using the `timeout` option when creating a sandbox, and extend it using `sandbox.extendTimeout()`. See [Working with Sandbox](/docs/sandbox/working-with-sandbox#execute-long-running-tasks) for details.

| Plan       | Maximum duration |
| ---------- | ---------------- |
| Hobby      | 45 minutes       |
| Pro        | 5 hours          |
| Enterprise | 5 hours          |

### Concurrency limits

The number of concurrently running sandboxes is limited by plan.

[Contact sales](/contact/sales) if you need higher concurrency limits on Enterprise.

| Plan       | Concurrent sandboxes |
| ---------- | -------------------- |
| Hobby      | 10                   |
| Pro        | 2,000                |
| Enterprise | 2,000                |

### Rate limits

The number of vCPUs you can allocate to new sandboxes is rate-limited by plan. For example, with the Pro plan limit of 200 vCPUs per minute, you can create 25 sandboxes with 8 vCPUs each, or 100 sandboxes with 2 vCPUs each, every minute. All other control plane operations such as running commands or reading files are also subject to rate limits.

[Contact sales](/contact/sales) if you need higher rate limits on Enterprise.

| Plan       | vCPU allocation limit   | Control plane limit         |
| ---------- | ----------------------- | --------------------------- |
| Hobby      | 40 vCPUs per 10 minutes | 1,000 requests per minute   |
| Pro        | 200 vCPUs per minute    | 10,000 requests per minute  |
| Enterprise | 400 vCPUs per minute    | 100,000 requests per minute |

### Snapshot expiration

Snapshots expire **30 days after their last use by default**. You can configure the [expiration time](/docs/sandbox/concepts/snapshots#snapshot-limits) to control how long snapshots are retained.

### Regions

Currently, Vercel Sandbox is only available in the `iad1` region.

## Managing costs

To optimize your Sandbox costs:

- **Set appropriate timeouts**: Use the shortest timeout that works for your task
- **Right-size resources**: Start with fewer vCPUs and scale up only if needed
- **Stop sandboxes promptly**: Call `sandbox.stop()` when done rather than waiting for timeout
- **Monitor usage**: Check the [Usage dashboard](https://vercel.com/d?to=%2Fdashboard%2F%5Bteam%5D%2Fusage\&title=Show+Usage+Page) to track your sandbox consumption

For more details on sandbox lifecycle management, see [Working with Sandbox](/docs/sandbox/working-with-sandbox).


---

[View full sitemap](/docs/sitemap)
