---
title: Global Config Limits and pricing
product: vercel
url: /docs/global-config/global-config-limits
canonical_url: "https://vercel.com/docs/global-config/global-config-limits"
last_updated: 2026-07-29
type: reference
prerequisites:
  - /docs/global-config
related:
  - /docs/global-config
  - /docs/global-config/global-config-dashboard
  - /docs/global-config/using-global-config
  - /docs/global-config/vercel-api
  - /docs/global-config/global-config-sdk
summary: Learn about the Global Configs limits and pricing based on account plans.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/global-config/global-config-limits.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "5707ddeace9cde1df2d0657279147653a0f47120aae9f2a4bb5a4b04cadbf023"
---

# Global Config Limits and pricing

A [Global Config](/docs/global-config) is a global data store that [enables experimentation with feature flags, A/B testing, critical redirects, and IP blocking](/docs/global-config#use-cases). It enables you to read data in the region closest to the user without querying an external database or hitting upstream servers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Dynamic redirects with Global Config and Next.js proxy](https://vercel.com/kb/guide/dynamic-redirects-with-global-config-and-next-js-proxy?from=related) — Learn how to create redirects that update instantly without redeploying by storing rules in Global Config and reading th
- [Migration Guide](https://vercel.com/docs/global-config/migration-guide?from=related) — Learn what changed when Edge Config was renamed to Global Config, and how to migrate your connection strings, SDK, and e
- [Getting Started](https://vercel.com/docs/global-config/get-started?from=related) — Learn how to create a Global Config store and read from it in your project.
- [vercel global-config](https://vercel.com/docs/cli/global-config?from=related) — Manage Global Config stores from the Vercel CLI: list, create, inspect, update, remove, and manage items, read tokens, a
- [DevCycle](https://vercel.com/docs/global-config/global-config-integrations/devcycle-global-config?from=related) — Learn how to use Global Config with Vercel's DevCycle integration.
- [Statsig](https://vercel.com/docs/global-config/global-config-integrations/statsig-global-config?from=related) — Learn how to use Global Config with Vercel's Statsig integration.

Full cross-link map for this page: [/docs/global-config/global-config-limits.graph.md](/docs/global-config/global-config-limits.graph.md)
<!-- /docsgraph:related -->

Keep the number of stores to a minimum. Fewer large stores improve your overall latency.

## Pricing

The following table outlines the price for each resource according to the plan you are on:

| Resource | Pro Price |
| --- | --- |
| Global Config Reads (formerly known as Edge Config Reads) | $3.00 |
| Global Config Writes (formerly known as Edge Config Writes) | $5.00 |


## Limits by plan

The following table outlines the limits for each resource according to the plan you are on:

|                                                                                                         | Hobby                     | Pro                       | Enterprise                                                                                                        |
| ------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [**Maximum store size**](#maximum-store-size)                                                           | 1 MB                      | 1 MB                      | 1 MB                                                                                                              |
| [**Maximum number of stores (total)**](#maximum-number-of-stores)                                       | 1                         | Unlimited                 | Unlimited                                                                                                         |
| [**Maximum number of stores connected to a project**](#maximum-number-of-stores-connected-to-a-project) | 1                         | 3                         | 3                                                                                                                 |
| [**Maximum item key name length**](#maximum-item-key-name-length)                                       | 256 characters            | 256 characters            | 256 characters                                                                                                    |
| [**Write propagation**](#write-propagation)                                            | Up to 10 seconds globally | Up to 10 seconds globally | Up to 10 seconds globally                                                                                         |
| [**Backup retention**](#backup-retention)                                                               | 7 days                    | 90 days                   | 365 days                                                                                                          |

## Usage

The table below shows the metrics for the [**Global Config**](/docs/global-config/global-config-limits) section of the **Usage** dashboard.

To view information on managing each resource, select the resource link in the **Metric** column. To jump straight to guidance on optimization, select the corresponding resource link in the **Optimize** column.

See the [manage and optimize Global Config usage](/docs/global-config/global-config-limits) section for more information on how to optimize your usage.

### Reads

Reads indicate how often your project has requested access to Global Config to retrieve data through the SDK or the REST API. Vercel counts it as one read, regardless of whether you retrieve one or all items.

### Writes

Writes represent how often you updated your Global Config through the SDK or the REST API.

### Maximum store size

The maximum store size represents the total size limit of **each** Global Config store, including all keys and values of the document.

### Maximum number of stores

The maximum number of stores represents the total number of Global Config stores that you can create for your account or team.

### Maximum number of stores connected to a project

The maximum number of stores connected to a project represents the total number of Global Config stores that you can connect to a single project. Exceeding this amount will result in an [error](/docs/global-config/global-config-limits#global-config-limit-reached).

### Maximum item key name length

Each key name in your Global Config can be up to 256 characters long. The key name must adhere to the regex pattern `^[\w-]+$`, which is equivalent to `/^[A-Za-z0-9_-]+$/`, and allows A-Z, a-z, 0-9, `_`, and `-`.

### Write propagation

When updating an item in your Global Config, it may take up to 10 seconds for the update to be globally propagated. You should avoid using Global Configs for frequently updated data or data that needs to be accessed immediately after updating.

### Backup retention

Backups are automatically saved when you make any changes, allowing you to [restore](/docs/global-config/global-config-dashboard#restoring-global-config-backups) to a previous version. See the table above to learn about how long backups are saved for.

To learn more about backups, see [Global Config backups](/docs/global-config/using-global-config#global-config-backups)

## Reviewing Global Config reads

The **Reads** chart shows the number of times your [Global Config](/docs/global-config) has been read. You can filter the data by **Count** or **Projects**.

### Optimizing Global Config reads

- Open **Project** in the sidebar to identify which project has the most Global Config reads
- Review how you access the stores through both the [REST API](/docs/global-config/vercel-api) and the [SDK](/docs/global-config/global-config-sdk). They both count toward your reads
- Where possible, use [`getAll()`](/docs/global-config/global-config-sdk#read-multiple-values) instead of separate [`get(key)`](/docs/global-config/global-config-sdk#read-a-single-value) calls with the SDK, ensuring they count as a single read.

## Managing Global Config writes

The **Writes** chart shows the number of times your [Global Configs](/docs/global-config) were updated. You can filter the data by **Count** or **Global Configs**.

### Optimizing Global Config writes

- Open **Global Configs** in the sidebar to identify which Global Config has the most Global Config writes
- Review your points of updating the stores through the [REST API](/docs/global-config/vercel-api) as they count towards your writes

## Troubleshooting

If reading from your Global Config seems slower than expected, ensure that the following are true:

- You've set [the connection string](/docs/global-config/using-global-config#using-a-connection-string) as an environment variable
- You are using the [SDK](/docs/global-config/global-config-sdk) to read from your Global Config
- You see the Global Config icon on the row for the connected environment variable
  on the Environment Variables page of your project settings
- You are testing on your Vercel deployment, as the optimizations happen only
  when you deploy to Vercel

![Image](https://vercel.com/docs-assets/static/docs/storage/global-config/global-config-env-icon-light.png)

*Global Config icon with connected environment variable*

### Global Config Limit reached

**Error**: `Tried to attach 4 Global Configs. Only 3 can be attached to one Deployment at a time.`

You are limited to a maximum of 3 Global Config stores connected to any single project.

If you get this error, review your storage by visiting [the Vercel Dashboard](/dashboard), selecting your project, and selecting the **Storage** section in the sidebar. You can use the search filter to see only your Global Configs. You will have to disconnect one of the stores and redeploy your project.

To learn how to prevent this error, see [best practices](#global-config-best-practices).

### Global Config update rejected

Updates to items in your Global Config will be rejected if the resulting size of your Global Config would exceed your account plan's limits. When this happens, all members of your team will receive a [notification](/docs/notifications) from Vercel, whether the error originated in the dashboard, an API request, or an [Integration](/docs/global-config/global-config-integrations). The Global Config editor in your dashboard can detect many cases where the final size would exceed the limit and warn you upfront without triggering the notification.

To resolve this issue, you can:

- Delete unused entries from your Global Config to free up space
- Split data across multiple stores

## Global Config best practices

- Where possible, having fewer large stores is better than having multiple small stores, as having fewer Global Config stores requested more often leads to lower overall latency.

## Security

If you are developing locally or self-hosting, your Global Config is loaded through the public internet network. In this case, you may wonder if it's safe to have the token as a parameter in the connection string.

- **It is safe to have the token as a parameter in the connection string**, because the SDK parses the passed string, then sends the token through an `Authorization` header instead


---

[View full sitemap](/docs/sitemap)
