---
title: Vercel Global Config
product: vercel
url: /docs/global-config
canonical_url: "https://vercel.com/docs/global-config"
last_updated: 2026-08-17
type: conceptual
prerequisites:
  []
related:
  - /docs/global-config/migration-guide
  - /docs/routing-middleware
  - /docs/functions
  - /docs/functions/runtimes
  - /docs/global-config/global-config-limits
summary: A Global Config is a global data store that enables experimentation with feature flags, A/B testing, critical redirects, and more.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/global-config.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "1744c1c7789c21a35d506c52f3256a677b526ece01ad6fc265f2a3f7d0adeec6"
---

# Vercel Global Config

> **Availability**: Global Config is available on all plans

A [Global Config](/docs/global-config) is a global data store that [enables experimentation with feature flags, A/B testing, critical redirects, and IP blocking](#use-cases). It enables you to read data in the region closest to the user without querying an external database or hitting upstream servers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Global Config](https://flags-sdk.dev/docs/providers/global-config)
- [GrowthBook](https://flags-sdk.dev/docs/providers/growthbook)
- [Hypertune](https://flags-sdk.dev/docs/providers/hypertune)
- [Statsig](https://flags-sdk.dev/docs/providers/statsig)
- [Edge Config is now Global Config](https://vercel.com/changelog/edge-config-is-now-global-config)
- [LaunchDarkly is now available on the Vercel Marketplace](https://vercel.com/changelog/launchdarkly-is-now-available-on-the-vercel-marketplace)
- [Implementing Blue-Green Deployments on Vercel](https://vercel.com/kb/guide/blue_green_deployments_on_vercel) — This guide outlines how to implement blue-green deployments on Vercel, leveraging GitHub Actions for seamless and contro
- [Deploy a Node.js Fastify app on Vercel with Docker](https://vercel.com/kb/guide/deploy-nodejs-on-vercel-with-docker) — Build a Node.js application with Fastify and Docker, then deploy it to Vercel Functions. Learn how to configure environm
- [How Docker Compose concepts map to Vercel](https://vercel.com/kb/guide/docker-compose-concepts-on-vercel) — Translate your Docker Compose file to Vercel: Compose services become Vercel Services, networks become bindings, and vol
- [Dynamic redirects with Global Config and Next.js proxy](https://vercel.com/kb/guide/dynamic-redirects-with-global-config-and-next-js-proxy) — Learn how to create redirects that update instantly without redeploying by storing rules in Global Config and reading th
- [A/B testing on ecommerce storefronts without hurting Core Web Vitals](https://vercel.com/kb/guide/ecommerce-ab-testing-core-web-vitals) — Client-side A/B tools can worsen LCP and CLS on the pages you're testing. Run ecommerce A/B tests at the edge with Routi
- [Introducing Edge Config: Globally distributed, instant configuration](https://vercel.com/blog/edge-config-public-beta)

Full cross-link map for this page: [/docs/global-config.graph.md](/docs/global-config.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** Global Config was previously called **Edge Config**. The store itself is
> unchanged, and existing projects require no action. See [Migrating from Edge
> Config to Global Config](/docs/global-config/migration-guide) for details.

Global Config is optimized for frequent reads, which typically complete in less than a millisecond on Vercel. Read latency depends on your application's [usage patterns](#read-latency).

You can use a Global Config in [Middleware](/docs/routing-middleware) and [Vercel Functions](/docs/functions).

> **💡 Note:** Vercel's Global Config read optimizations are **only available on the Edge and
> Node.js runtimes**. Optimizations can be enabled for other runtimes, [such as
> Ruby, Go, and Python](/docs/functions/runtimes) upon request. See [our Global
> Config limits docs](/docs/global-config/global-config-limits) to learn more.

## Read latency

Vercel actively replicates Global Config alongside your function's code, so even cold starts can read the latest replicated configuration without a network request. Reading configuration that's already available locally is instant.

Global Config uses active cache invalidation. Vercel injects the configuration version into a request header, so your function can immediately determine whether its local data is current for that request.

When the header identifies a newer version, Global Config serves the local value and fetches the update in the background. If the local version is too far behind, the read becomes blocking.

This gives you the ideal balance of local read speed and global update propagation.

Your application's observed read latency depends on its usage patterns:

- How many functions read the config.
- How reads are distributed over time.
- How reads are distributed geographically.
- How often the config changes.

### Production example: vercel.com/docs

The [Vercel documentation site](/docs) uses Global Config in production. It reads Global Config for every request, globally, with the following observed read latencies:

| Metric | Observed latency |
| --- | --- |
| Fastest reads | 0.01 ms |
| Median (p50) | 0.34 ms |
| p75 | 0.57 ms |
| p99 | 1.50 ms |

P50 is the median: half of reads complete at or below that latency. P75 and p99 are the 75th and 99th percentiles: 75% and 99% of reads in a measurement complete at or below those latencies, respectively. About 0.1% of reads in this workload involved cold starts.

These measurements reflect this application's traffic and configuration update patterns, rather than a latency guarantee for every workload. Measure your own reads with representative traffic, including cold starts and configuration updates, to understand your application's latency.

## Use cases

Global Configs are great for data that is accessed frequently and updated infrequently. Here are some examples of storage data suitable for Global Config:

- **Critical redirects**: When you need to redirect a URL urgently,
  Global Configs offer a fast solution that doesn't require you to redeploy your
  website. With Middleware, you can read from your Global Config to redirect users
  visiting incorrect URLs. For an example, see the [Maintenance Page
  template](https://vercel.com/templates/next.js/maintenance-page).

* **Malicious IP and User Agent blocking**: Store a set of
  malicious IPs in your Global Config, then block them upon detection without
  invoking upstream servers

## Getting started

You can create and manage your Global Config from either [Vercel REST API](/docs/global-config/vercel-api) or [Dashboard](/docs/global-config/global-config-dashboard). You can scope your Global Configs to your Hobby team or [team](/docs/accounts#creating-a-team), and connect them to as many projects as you want.

To get started, see [our quickstart](/docs/global-config/get-started).

## Using Global Config in your workflow

If you'd like to know whether or not Global Config can be integrated into your workflow, it's worth knowing the following:

- You can have one or more Global Configs per Vercel account, depending on your plan as explained in [Limits](/docs/global-config/global-config-limits)
- You can use multiple Global Configs in one Vercel project
- Each Global Config can be accessed by multiple Vercel projects
- Global Configs can be scoped to different environments within projects using environment variables
- **Global Config access is secure by default**. A [read access token](/docs/global-config/using-global-config#creating-a-read-access-token) is required to read from them, and an [API token](/docs/rest-api#creating-an-access-token) is required to write to them

See [our Global Config limits docs to learn more](/docs/global-config/global-config-limits)

## Why use Global Config instead of alternatives?

There are alternative solutions to Global Config for handling A/B testing, feature flags, and IP blocking. The following table lays out how those solutions compare to Global Config:

| **Global Config vs alternatives** | **Read latency**                                                                                                           | **Write latency**                                                                                                           | **Redeployment required**                                                                                                       | **Added risk of downtime**                                                                                                                    |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Global Config**                 | **Ultra-low** (Reads typically complete in less than a millisecond. Latency depends on function count, read frequency, geographic distribution, and configuration updates.) | **Varies** (Global Config is optimized for frequent, high-speed reads and infrequent, variable writes.) | **No** (Global Config updates propagate globally with no redeployment required.)                            | **No** (Global Config is hosted by Vercel, and has nearly identical uptime characteristics to your deployment)            |
| Remote JSON files               | Varies (Potentially hundreds of milliseconds slower tha Global Config.)                               | Varies                                                                                                                      | No (Latency for propagation of changes varies based on host, but no redeployment would be required.)      | Yes (Relying on an external provider means your data has different uptime characteristics from your Vercel deployment.) |
| Embedded JSON files             | Lowest                                                                                                                     | Highest (Changes to this data can't propagate globally without merging and redeploying.)              | Yes (Embedded files are part of your build, so redeployments are required to incorporate changes.)        | No                                                                                                                                            |
| Environment Variables           | Lowest                                                                                                                     | Highest (Changes to this data can't propagate globally without redeploying.)                          | Yes (Environment Variables are part of your build, so redeployments are required to incorporate changes.) | No                                                                                                                                            |

## Limits

To learn about Global Config limits and pricing, see [our Global Config limits docs](/docs/global-config/global-config-limits).

## More resources

- [Quickstart](/docs/global-config/get-started)
- [Read with the SDK](/docs/global-config/global-config-sdk)
- [Use the Dashboard](/docs/global-config/global-config-dashboard)
- [Manage with the API](/docs/global-config/vercel-api)
- [Global Config Limits](/docs/global-config/global-config-limits)


---

[View full sitemap](/docs/sitemap)
