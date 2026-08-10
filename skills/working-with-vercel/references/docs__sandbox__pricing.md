---
title: Vercel Sandbox pricing and limits
product: vercel
url: /docs/sandbox/pricing
canonical_url: "https://vercel.com/docs/sandbox/pricing"
last_updated: 2026-08-04
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
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "4978c88d5cdba9cf7f7fab57996d0bbc045dac2336d5f5392ff3d62c948a4fc4"
---

# Vercel Sandbox pricing and quotas

Vercel Sandbox usage is metered across several dimensions. This page explains how billing works for each plan, what quotas apply, and how to estimate costs.

## Pricing

|  | **Hobby** (Included) | **Pro** (Per month) | **Enterprise** (Per month) |
| --- | --- | --- | --- |
| Sandbox Active CPU | 5 hours/month | $0.128/hour | $0.128/hour |
| Sandbox Provisioned Memory | 420 GB-hours/month | $0.0212/GB-hour | $0.0212/GB-hour |
| Sandbox Creations | 5,000/month | $0.60/1M | $0.60/1M |
| Sandbox Data Transfer | 20 GB/month | $0.15/GB | $0.15/GB |
| Snapshot Storage | 15 GB (lifetime) | $0.08/GB-month | $0.08/GB-month |
| Concurrent Sandboxes | 10 | 10,000 | 10,000 |
| Max Runtime Duration | 45 minutes | 24 hours | 24 hours |
| vCPU Allocation Rate | 20-40/min | 5,000/min | 5,000/min |


On each billing cycle, Hobby plans receive a monthly allotment of Sandbox usage at no cost. Pro and Enterprise plans are charged based on usage.

Once you exceed your included limit on Hobby, sandbox creation is [paused](#hobby) until the next billing cycle. Pro and Enterprise usage is charged against your account.

## Billing information

### Hobby

Sandbox is free for Hobby users within the usage quotas detailed above.

Vercel sends you [notifications](/docs/notifications#on-demand-usage-notifications) as you approach your usage quotas. You **will not be charged** for any additional usage. Once you exceed the quotas, sandbox creation is paused until 30 days have passed since you first used the feature.

To continue using Sandbox after exceeding your quotas, [upgrade to Pro](/docs/plans/hobby#upgrading-to-pro).

### Pro

All Sandbox usage on Pro plans is charged against your [$20/month credit](/docs/plans/pro-plan#credit-and-usage-allocation). After the credit is exhausted, usage is billed at the rates shown above.

To control costs, configure [Spend Management](/docs/spend-management) to receive alerts or pause projects when you reach a specified amount.

### Enterprise

Enterprise plans have custom pricing and quotas. [Contact sales](/contact/sales) to discuss your usage requirements.

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

Data your sandbox sends to the internet, plus all traffic to and from exposed ports, is billable and measured in GB. Data your sandbox downloads from the internet, such as packages, Git repositories, artifacts, and datasets, is free.

For example, downloading an npm package is free. If you run a web server on an exposed port, both the request it receives and the response it sends are billable.

### Snapshot Storage

The storage used by [snapshots](/docs/sandbox/concepts/snapshots), measured in GB per month.

Use a smaller [managed image](/docs/sandbox/concepts/images#vercel-managed-images) like `vercel/sandbox/ubuntu` or your own [custom image](/docs/sandbox/concepts/images#custom-images) to reduce individual snapshot sizes. Set an appropriate [snapshot retention period](/docs/sandbox/concepts/snapshots#snapshot-retention) to avoid storing snapshots longer than needed.

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

## Quotas and limits

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
| Pro        | 24 hours         |
| Enterprise | 24 hours         |

### Concurrency quota

The number of concurrently running sandboxes is limited by plan.

[Contact sales](/contact/sales) if you need higher concurrency quotas on Enterprise.

| Plan       | Concurrent sandboxes |
| ---------- | -------------------- |
| Hobby      | 10                   |
| Pro        | 10,000               |
| Enterprise | 10,000               |

### API quotas

The rate at which you can allocate vCPUs to new sandboxes increases with sustained usage instead of being a fixed cap. The initial value is your plan's starting rate, and sustained usage increases the allowed rate toward the maximum at the quota shown below. After 10 minutes without creating sandboxes, the rate goes back to the starting rate. See [dynamic quotas](/docs/limits#dynamic-quotas) for more details.

For example, with a Pro team that was idle, the initial rate is 150 vCPUs per minute, which covers 18 sandboxes with 8 vCPUs each. The team can keep creating sandboxes and the allowed rate increases to a maximum of 500 vCPUs per minute until it reaches 5,000.

[Contact sales](/contact/sales) if you need higher allocation quotas on Enterprise.

| Plan       | Starting vCPU rate   | Ramp                 | Maximum vCPU rate      |
| ---------- | -------------------- | -------------------- | ---------------------- |
| Hobby      | 20 vCPUs per minute  | 20 vCPUs per minute  | 40 vCPUs per minute    |
| Pro        | 150 vCPUs per minute | 500 vCPUs per minute | 5,000 vCPUs per minute |
| Enterprise | 150 vCPUs per minute | 500 vCPUs per minute | 5,000 vCPUs per minute |

Control plane operations such as running commands or reading files use a fixed per-minute quota instead of a dynamic quota.

Deleting a sandbox, snapshot, or drive is limited to 20 requests per second per team on all plans. Deletions count against your control plane quota as well.

| Plan       | Control plane quota         | Deletion quota         |
| ---------- | --------------------------- | ---------------------- |
| Hobby      | 1,000 requests per minute   | 20 requests per second |
| Pro        | 10,000 requests per minute  | 20 requests per second |
| Enterprise | 100,000 requests per minute | 20 requests per second |

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
