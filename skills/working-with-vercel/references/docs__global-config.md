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
  - /docs/speed-insights/metrics
  - /docs/routing-middleware
  - /docs/functions
  - /docs/functions/runtimes
summary: A Global Config is a global data store that enables experimentation with feature flags, A/B testing, critical redirects, and more.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/global-config.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "d09a5dfc093f55bc97cda7506e5765312ac7fedcafe65437fe284065d150d111"
---

# Vercel Global Config

> **🔒 Permissions Required**: Global Config

A [Global Config](/docs/global-config) is a global data store that [enables experimentation with feature flags, A/B testing, critical redirects, and IP blocking](#use-cases). It enables you to read data in the region closest to the user without querying an external database or hitting upstream servers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Global Config](https://flags-sdk.dev/docs/providers/global-config?from=related&source_path=%2Fdocs%2Fglobal-config&source_site=vercel-docs&relationship=related)
- [GrowthBook](https://flags-sdk.dev/docs/providers/growthbook?from=related&source_path=%2Fdocs%2Fglobal-config&source_site=vercel-docs&relationship=related)
- [Hypertune](https://flags-sdk.dev/docs/providers/hypertune?from=related&source_path=%2Fdocs%2Fglobal-config&source_site=vercel-docs&relationship=related)
- [Statsig](https://flags-sdk.dev/docs/providers/statsig?from=related&source_path=%2Fdocs%2Fglobal-config&source_site=vercel-docs&relationship=related)
- [Edge Config is now Global Config](https://vercel.com/changelog/edge-config-is-now-global-config?from=related&source_path=%2Fdocs%2Fglobal-config&source_site=vercel-docs&relationship=related)
- [LaunchDarkly is now available on the Vercel Marketplace](https://vercel.com/changelog/launchdarkly-is-now-available-on-the-vercel-marketplace?from=related&source_path=%2Fdocs%2Fglobal-config&source_site=vercel-docs&relationship=related)
- [Implementing Blue-Green Deployments on Vercel](https://vercel.com/kb/guide/blue_green_deployments_on_vercel?from=related&source_path=%2Fdocs%2Fglobal-config&source_site=vercel-docs&relationship=related) — This guide outlines how to implement blue-green deployments on Vercel, leveraging GitHub Actions for seamless and contro
- [Deploy PHP on Vercel with Docker](https://vercel.com/kb/guide/deploy-php-on-vercel-with-docker?from=related&source_path=%2Fdocs%2Fglobal-config&source_site=vercel-docs&relationship=related) — Build a PHP application with FrankenPHP and Docker, then deploy it to Vercel Functions with managed configuration, stora
- [How Docker Compose concepts map to Vercel](https://vercel.com/kb/guide/docker-compose-concepts-on-vercel?from=related&source_path=%2Fdocs%2Fglobal-config&source_site=vercel-docs&relationship=related) — Translate your Docker Compose file to Vercel: Compose services become Vercel Services, networks become bindings, and vol
- [Dynamic redirects with Global Config and Next.js proxy](https://vercel.com/kb/guide/dynamic-redirects-with-global-config-and-next-js-proxy?from=related&source_path=%2Fdocs%2Fglobal-config&source_site=vercel-docs&relationship=related) — Learn how to create redirects that update instantly without redeploying by storing rules in Global Config and reading th
- [How to build and maintain HIPAA-compliant applications on Vercel](https://vercel.com/kb/guide/hipaa-compliance-guide-vercel?from=related&source_path=%2Fdocs%2Fglobal-config&source_site=vercel-docs&relationship=related) — Deploy HIPAA-compliant healthcare apps on Vercel with built-in security, BAAs, and scalable serverless infrastructure.
- [Introducing Edge Config: Globally distributed, instant configuration](https://vercel.com/blog/edge-config-public-beta?from=related&source_path=%2Fdocs%2Fglobal-config&source_site=vercel-docs&relationship=related)

Full cross-link map for this page: [/docs/global-config.graph.md](/docs/global-config.graph.md?from=related&source_path=%2Fdocs%2Fglobal-config&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** Global Config was previously called **Edge Config**. The store itself is
> unchanged, and existing projects require no action. See [Migrating from Edge
> Config to Global Config](/docs/global-config/migration-guide) for details.

With Vercel's optimizations, you can read Global Config data at negligible latency. The vast majority of your reads will complete within 15ms [at P99](/docs/speed-insights/metrics#how-the-percentages-are-calculated "P99 latency"), or often less than 1ms.

You can use a Global Config in [Middleware](/docs/routing-middleware) and [Vercel Functions](/docs/functions).

> **💡 Note:** Vercel's Global Config read optimizations are **only available on the Edge and
> Node.js runtimes**. Optimizations can be enabled for other runtimes, [such as
> Ruby, Go, and Python](/docs/functions/runtimes) upon request. See [our Global
> Config limits docs](/docs/global-config/global-config-limits) to learn more.

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
| **Global Config**                 | **Ultra-low** (Reads from your Global Configs will complete within 15ms at P99, or often less than 1ms) | **Varies** (Global Config is optimized for frequent, high-speed reads and infrequent, variable writes.) | **No** (Global Config updates propagate globally with no redeployment required.)                            | **No** (Global Config is hosted by Vercel, and has nearly identical uptime characteristics to your deployment)            |
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
