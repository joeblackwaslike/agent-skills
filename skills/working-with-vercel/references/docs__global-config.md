---
title: Vercel Global Config
product: vercel
url: /docs/global-config
canonical_url: "https://vercel.com/docs/global-config"
last_updated: 2026-07-29
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "31d56dcb627e9dda68a77821a882cf9d80e70f5d8443b12b63faf3802757289c"
---

# Vercel Global Config

> **🔒 Permissions Required**: Global Config


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Implementing Blue-Green Deployments on Vercel](https://vercel.com/kb/guide/blue_green_deployments_on_vercel?from=related) — This guide outlines how to implement blue-green deployments on Vercel, leveraging GitHub Actions for seamless and contro
- [Deploy a Node.js Fastify app on Vercel with Docker](https://vercel.com/kb/guide/deploy-nodejs-on-vercel-with-docker?from=related) — Build a Node.js application with Fastify and Docker, then deploy it to Vercel Functions. Learn how to configure environm
- [Deploy PHP on Vercel with Docker](https://vercel.com/kb/guide/deploy-php-on-vercel-with-docker?from=related) — Build a PHP application with FrankenPHP and Docker, then deploy it to Vercel Functions with managed configuration, stora
- [Deploy Rust on Vercel with Docker](https://vercel.com/kb/guide/deploy-rust-on-vercel-with-docker?from=related) — Build a Rust application with Axum and Docker, then deploy it to Vercel Functions. Learn how to configure environment va
- [How Docker Compose concepts map to Vercel](https://vercel.com/kb/guide/docker-compose-concepts-on-vercel?from=related) — Translate your Docker Compose file to Vercel: Compose services become Vercel Services, networks become bindings, and vol
- [Create a Global Config](https://vercel.com/docs/rest-api/global-config/create-a-global-config?from=related)
- [vercel global-config](https://vercel.com/docs/cli/global-config?from=related) — Manage Global Config stores from the Vercel CLI: list, create, inspect, update, remove, and manage items, read tokens, a
- [Audit Logs](https://vercel.com/docs/audit-log?from=related) — Learn how to track and analyze your team members' activities.
- [Marketplace](https://vercel.com/docs/flags/marketplace?from=related) — Connect your preferred feature flag provider through the Vercel Marketplace for a unified flags experience.
- [Incremental Migration](https://vercel.com/docs/incremental-migration?from=related) — Learn how to migrate your app or website to Vercel with minimal risk and high impact.

Full cross-link map for this page: [/docs/global-config.graph.md](/docs/global-config.graph.md)
<!-- /docsgraph:related -->

A [Global Config](/docs/global-config) is a global data store that [enables experimentation with feature flags, A/B testing, critical redirects, and IP blocking](#use-cases). It enables you to read data in the region closest to the user without querying an external database or hitting upstream servers.

> **💡 Note:** Global Config was previously called **Edge Config**. The store itself is
> unchanged, and existing projects require no action. See [Migrating from Edge
> Config to Global Config](/docs/global-config/migration-guide) for details.

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
