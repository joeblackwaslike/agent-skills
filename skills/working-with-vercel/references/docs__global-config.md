---
title: Vercel Global Config
product: vercel
url: /docs/global-config
canonical_url: "https://vercel.com/docs/global-config"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  []
related:
  - /docs/speed-insights/metrics
  - /docs/routing-middleware
  - /docs/functions
  - /docs/functions/runtimes
  - /docs/global-config/global-config-limits
summary: A Global Config is a global data store that enables experimentation with feature flags, A/B testing, critical redirects, and more.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/global-config.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "3eadbd11f3bdb0be00fd0166694794c558f5c5b18fff59d9cacd200f87f60502"
---

# Vercel Global Config

> **🔒 Permissions Required**: Global Config

A [Global Config](/docs/global-config) is a global data store that [enables experimentation with feature flags, A/B testing, critical redirects, and IP blocking](#use-cases). It enables you to read data in the region closest to the user without querying an external database or hitting upstream servers.

With Vercel's optimizations, you can read Global Config data at negligible latency. The vast majority of your reads will complete within 15ms [at P99](/docs/speed-insights/metrics#how-the-percentages-are-calculated "P99 latency"), or often less than 1ms.

You can use a Global Config in [Middleware](/docs/routing-middleware) and [Vercel Functions](/docs/functions).

> **💡 Note:** Vercel's Global Config read optimizations are **only available on the Edge and
> Node.js runtimes**. Optimizations can be enabled for other runtimes, [such as
> Ruby, Go, and Python](/docs/functions/runtimes) upon request. See [our Edge
> Config limits docs](/docs/global-config/global-config-limits) to learn more.

## Use cases

Global Configs are great for data that is accessed frequently and updated infrequently. Here are some examples of storage data suitable for Global Config:

- : When you need to redirect a URL urgently,
  Global Configs offer a fast solution that doesn't require you to redeploy your
  website. With Middleware, you can read from your Global Config to redirect users
  visiting incorrect URLs. For an example, see the [Maintenance Page
  template](https://vercel.com/templates/next.js/maintenance-page).

* : Store a set of
  malicious IPs in your Global Config, then block them upon detection without
  invoking upstream servers

## Getting started

You can create and manage your Global Config from either [Vercel REST API](/docs/global-config/vercel-api) or [Dashboard](/docs/global-config/global-config-dashboard). You can scope your Global Configs to your Hobby team or [team](/docs/accounts/create-a-team), and connect them to as many projects as you want.

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
| **Global Config**                 | **Ultra-low**  | **Varies**  | **No**                             | **No**             |
| Remote JSON files               | Varies                                | Varies                                                                                                                      | No       | Yes  |
| Embedded JSON files             | Lowest                                                                                                                     | Highest               | Yes         | No                                                                                                                                            |
| Environment Variables           | Lowest                                                                                                                     | Highest                           | Yes  | No                                                                                                                                            |

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
