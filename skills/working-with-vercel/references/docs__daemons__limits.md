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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "54788baa0ac021bc6a7b1c1c10d0d6f30480dda61797ba36bb1207bd283671ac"
---

# Daemons Limits

The following limits apply to Vercel Daemons during the beta. Vercel may raise limits as the beta progresses.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Migrate from Google Cloud Run to Vercel](https://vercel.com/kb/guide/migrate-cloud-run-to-vercel) — Move a Cloud Run service or worker to Vercel. Compare runtimes, preserve Google Cloud access, and plan jobs, validation,
- [Migrate self-hosted Next.js and containers from AWS to Vercel](https://vercel.com/kb/guide/migrate-containers-from-aws-to-vercel) — Migrate Next.js apps and HTTP containers from AWS to Vercel. Configure AWS access, assess background workers, and plan t
- [Migrate Fly.io worker processes to Vercel Daemons](https://vercel.com/kb/guide/migrate-fly-io-workers-to-vercel-daemons) — Migrate Fly.io workers to Vercel Daemons with your existing Dockerfile. Map process settings, preserve queue state, and
- [Migrate Railway workers to Vercel Daemons](https://vercel.com/kb/guide/migrate-railway-workers-to-vercel-daemons) — Move Railway workers to Vercel Daemons with Docker configuration, broker migration, shutdown testing, a gradual queue ha
- [Migrate from Render to Vercel](https://vercel.com/kb/guide/migrate-render-to-vercel) — Migrate from Render to Vercel: map web services, cron jobs, and containers to their equivalents, and handle what doesn't
- [Vercel Daemons is now in public beta](https://vercel.com/changelog/vercel-daemons-is-now-in-public-beta)
- [Daemons](https://vercel.com/docs/build-output-api/daemons) — Learn how Vercel Daemons are represented in the Build Output API.
- [Multi-tenant Limits](https://vercel.com/docs/platforms/multi-tenant-platforms/limits) — Understand the limits and features available for Vercel for Platforms.
- [Vercel Functions Limits](https://vercel.com/docs/functions/limitations) — Learn about the limits and restrictions of using Vercel Functions.
- [Get project daemons](https://vercel.com/docs/rest-api/daemons/get-project-daemons) — GET /v1/projects/{idOrName}/daemons — List the daemons of a project.
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
| Daemons per project            | 100                                    |

See the [Daemon configuration reference](/docs/daemons/config-reference) for the naming rules and allowed values of each field.

## Instance limits

| Limit                 | Value                                             |
| --------------------- | ------------------------------------------------- |
| Memory per instance   | 1 GiB, 2 GiB, 4 GiB, or 8 GiB (default 2 GiB)     |
| vCPUs per instance    | 1, 1, 2, or 4, based on memory                    |
| Shutdown grace period | 30 seconds after `SIGTERM` by default, configurable up to 3,600 seconds with [`terminationGracePeriodSeconds`](/docs/daemons/config-reference#terminationgraceperiodseconds) |
| CPU architecture      | Linux `amd64`                                     |
| Image source          | A `Dockerfile` or `Containerfile` in your project |

## Default quotas

Each team has default quotas for daemons during the beta. The quotas apply across all of the team's projects. To raise a quota, contact [Vercel Support](/help) or your account team.

| Plan                                 | Instance sizes          | Quota per team                                |
| ------------------------------------ | ----------------------- | --------------------------------------------- |
| [Hobby](/docs/plans/hobby)           | 1 GiB or 2 GiB (1 vCPU) | 5 Active CPU-hours per month                  |
| [Pro](/docs/plans/pro-plan)          | All sizes               | 16 vCPUs and 32 GiB of memory running at once |
| [Enterprise](/docs/plans/enterprise) | All sizes               | Custom. Contact your account team             |

Each project environment also runs at most 50 daemon instances across all of its daemons and regions. When a deployment or scaling change requests more, Vercel starts instances for older daemons first and logs an error on each daemon that doesn't get its full count. To raise this limit, contact [Vercel Support](/help) or your account team.

On Hobby, the quota counts Active CPU, so time spent waiting for work doesn't count. When a Hobby team reaches the quota, Vercel stops the team's daemons until the first of the next month (UTC) or until the team upgrades to Pro.

## Pricing

On Pro and Enterprise, daemons are billed for Active CPU and Provisioned Memory. See [Pricing](/pricing) for the rates. Hobby teams aren't billed for daemons, and the Hobby quota applies instead.

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
