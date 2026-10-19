---
title: Daemons Limits
product: vercel
url: /docs/daemons/limits
canonical_url: "https://vercel.com/docs/daemons/limits"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/daemons
related:
  - /docs/daemons/config-reference
  - /docs/plans/hobby
  - /docs/plans/pro-plan
  - /docs/plans/enterprise
  - /docs/daemons
summary: Limits on the configuration, size, and capabilities of Vercel Daemons during the beta.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/daemons/limits.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "0fb5d916c911c7461c251c2cf32d4d62edddf6f669886ad4da0c634fe4f3a816"
---

# Daemons Limits

The following limits apply to Vercel Daemons during the beta. Vercel may raise limits as the beta progresses.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Daemons](https://vercel.com/kb/guide/vercel-daemons) — Run background workers with Vercel Daemons. Learn how to deploy container images, configure resources, handle shutdowns,
- [Vercel Daemons is now in public beta](https://vercel.com/changelog/vercel-daemons-is-now-in-public-beta)
- [Daemons](https://vercel.com/docs/build-output-api/daemons) — Learn how Vercel Daemons are represented in the Build Output API.
- [Multi-tenant Limits](https://vercel.com/docs/platforms/multi-tenant-platforms/limits) — Understand the limits and features available for Vercel for Platforms.
- [Limits](https://vercel.com/docs/limits) — Look up account limits, usage summaries, rate limits, and resource constraints for every Vercel plan.
- [Vercel Functions Limits](https://vercel.com/docs/functions/limitations) — Learn about the limits and restrictions of using Vercel Functions.
- [Pricing and Limits](https://vercel.com/docs/queues/pricing) — Understand how Vercel Queues billing works, what's included, and which service limits apply.

Full cross-link map for this page: [/docs/daemons/limits.graph.md](/docs/daemons/limits.graph.md)
<!-- /docsgraph:related -->

## Configuration limits

| Limit                          | Value                                  |
| ------------------------------ | -------------------------------------- |
| Daemon name length             | 64 characters                          |
| `root` and `entrypoint` length | 512 characters each                    |
| `command` items                | 128 items, up to 4,096 characters each |
| Instances per region           | 100 per daemon                         |

See the [Daemon configuration reference](/docs/daemons/config-reference) for the naming rules and allowed values of each field.

## Instance limits

| Limit                 | Value                                             |
| --------------------- | ------------------------------------------------- |
| Memory per instance   | 1 GiB, 2 GiB, 4 GiB, or 8 GiB (default 2 GiB)     |
| vCPUs per instance    | 1, 1, 2, or 4, based on memory                    |
| Shutdown grace period | 10 seconds after `SIGTERM` by default, configurable up to 3,600 seconds with [`terminationGracePeriodSeconds`](/docs/daemons/config-reference#terminationgraceperiodseconds) |
| CPU architecture      | Linux `amd64`                                     |
| Image source          | A `Dockerfile` or `Containerfile` in your project |

## Default quotas

Each team has default quotas for daemons during the beta. The quotas apply across all of the team's projects. To raise a quota, contact [Vercel Support](/help) or your account team.

| Plan                                 | Instance sizes          | Quota per team                                |
| ------------------------------------ | ----------------------- | --------------------------------------------- |
| [Hobby](/docs/plans/hobby)           | 1 GiB or 2 GiB (1 vCPU) | 10 Active CPU-hours per month                 |
| [Pro](/docs/plans/pro-plan)          | All sizes               | 16 vCPUs and 32 GiB of memory running at once |
| [Enterprise](/docs/plans/enterprise) | All sizes               | Custom. Contact your account team             |

On Hobby, the quota counts Active CPU. Time spent waiting, such as long-polling an empty queue or waiting on a network call, doesn't count toward the quota. So, a daemon that is mostly waiting for work will use less of your monthly quota. When a Hobby team reaches the allowance, Vercel stops all of the team's daemon instances and logs an error. The daemons start again at the beginning of the next month, or when you upgrade the team to Pro.

## Unsupported features

Daemons don't support the following features during the beta:

| Feature                         | Alternative                                                                                                                                               |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Preview deployments             | Daemons run only in the production environment. Test changes by running the daemon's image locally. See [Local development](/docs/daemons#local-development). |
| Inbound HTTP or TCP traffic     | Use [Services](/docs/services) or [Vercel Functions](/docs/functions) for workloads that respond to requests.                                              |
| Autoscaling                     | Set instance counts in your configuration or from the dashboard. See [Scaling a daemon](/docs/daemons/managing-daemons#scaling-a-daemon). Scaling from the Vercel CLI and API is coming soon. |
| Persistent local storage        | Store state in [Vercel Blob](/docs/vercel-blob) or a database from the [Marketplace](/docs/marketplace-storage).                                           |
| Running in `vercel dev`         | Run the daemon's image locally with Docker. See [Local development](/docs/daemons#local-development).                                                      |
| Service bindings and rewrites   | Daemons can't be the target of a [service binding](/docs/services/bindings) or a rewrite.                                                                  |
| Builds without a Dockerfile     | Add a `Dockerfile` or `Containerfile` to the daemon's `root`.                                                                                              |
| Root directory set to a subfolder | Projects with a [root directory](/docs/builds/configure-a-build#root-directory) such as `apps/web` can't add daemons yet.                                |


---

[View full sitemap](/docs/sitemap)
