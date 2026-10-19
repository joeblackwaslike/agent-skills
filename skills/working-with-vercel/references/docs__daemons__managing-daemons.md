---
title: Managing Daemons
product: vercel
url: /docs/daemons/managing-daemons
canonical_url: "https://vercel.com/docs/daemons/managing-daemons"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/daemons
related:
  - /docs/daemons
  - /docs/deployments/promoting-a-deployment
  - /docs/instant-rollback
  - /docs/rolling-releases
  - /docs/daemons/config-reference
summary: Deploy, scale, stop, and monitor Vercel Daemons with vercel.json and the dashboard.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/daemons/managing-daemons.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "a6f69fb6be08701c1a6e9d8e633dc46ace36e5ddb62306a7d6f18b89d20584ee"
---

# Managing Daemons

You declare daemons with the `daemons` key in `vercel.json`. Changes to daemon configuration in `vercel.json` take effect when the deployment that contains them becomes your production deployment, including when you roll back to it. You can override a daemon's instance counts in each region without deploying a new configuration. To declare a daemon for the first time, see the [Daemons quick start](/docs/daemons#quick-start).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Daemons](https://vercel.com/kb/guide/vercel-daemons) — Run background workers with Vercel Daemons. Learn how to deploy container images, configure resources, handle shutdowns,
- [Vercel Daemons is now in public beta](https://vercel.com/changelog/vercel-daemons-is-now-in-public-beta)
- [Daemons](https://vercel.com/docs/build-output-api/daemons) — Learn how Vercel Daemons are represented in the Build Output API.
- [How to choose between Functions, containers, and Daemons on Vercel](https://vercel.com/kb/guide/vercel-functions-containers-daemons) — Choose Vercel Functions for HTTP requests, container images for custom runtimes, and Daemons for continuous background w
- [Daemons Limits](https://vercel.com/docs/daemons/limits) — Limits on the configuration, size, and capabilities of Vercel Daemons during the beta.
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Managing Deployments](https://vercel.com/docs/deployments/managing-deployments) — Learn how to manage your current and previously deployed projects to Vercel through the dashboard. You can redeploy at a
- [Projects overview](https://vercel.com/docs/projects) — A project is where you deploy and operate frontend apps, APIs, backends, containers, and agent workloads on Vercel.

Full cross-link map for this page: [/docs/daemons/managing-daemons.graph.md](/docs/daemons/managing-daemons.graph.md)
<!-- /docsgraph:related -->

## Deploying changes to a daemon

Vercel updates daemons when a deployment becomes your production deployment. This happens when you deploy to production, [promote a deployment](/docs/deployments/promoting-a-deployment), use [Instant Rollback](/docs/instant-rollback), or complete a [rolling release](/docs/rolling-releases):

- **New and changed daemons**: Vercel starts instances from the new image right away.
- **Out-of-date instances**: Vercel sends `SIGTERM` to the instances from the previous production deployment, then stops them after the shutdown grace period.
- **Removed daemons**: When the new production deployment doesn't declare a daemon, Vercel stops all of that daemon's instances.
- **Scaling overrides**: When a daemon has a [scaling override](#scaling-from-the-dashboard), Vercel keeps the override's counts instead of the `instances` from the new production deployment.

For a short time during a rollout, both versions of a daemon run at once: the old instances finish their current work during the grace period while the new ones start. When an old instance receives `SIGTERM`, it should stop taking new work immediately and only finish the work in progress. Make sure both versions can run side by side, for example by processing messages from the same queue and by keeping database migrations compatible with the previous version. See [Graceful shutdown](/docs/daemons#graceful-shutdown) for how to handle `SIGTERM`.

## Scaling a daemon

Each daemon runs a fixed number of instances in each region. Vercel doesn't currently autoscale daemons. You can set the counts in `vercel.json`, or override them from the dashboard.

### Scaling with `vercel.json`

To change the number of instances, set [`instances`](/docs/daemons/config-reference#instances) to a map of region IDs to instance counts, then deploy to production:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "daemons": {
    "worker": {
      "root": "worker/",
      "entrypoint": "Dockerfile",
      "instances": { "iad1": 3, "cdg1": 2 }
    }
  }
}
```

The map replaces the previous one. Regions that you remove from the map stop their instances.

### Scaling from the dashboard

To override a daemon's instance counts without a new deployment:

1. In your project's dashboard, open **Daemons** and select the daemon.
2. Select **Set Scaling Overrides**.
3. Set the number of instances in each region, then select **Scale Daemon**.

The counts you set are a scaling override. Vercel uses them instead of the `instances` from your production deployment, and they stay in place when you deploy again, so changes to `instances` in `vercel.json` don't take effect while an override is set. To go back to the counts from your production deployment, open **Set Scaling Overrides** and select **Clear scaling overrides**.

You need permission to update the project to set scaling overrides.

## Stopping a daemon

To stop all instances of a daemon without a new deployment, [set a scaling override](#scaling-from-the-dashboard) with `0` instances in every region.

To stop all instances of a daemon and keep its configuration in your deployment, set `instances` to an empty map, or set every region to `0`, then deploy to production:

```json filename="vercel.json"
{
  "daemons": {
    "worker": {
      "root": "worker/",
      "entrypoint": "Dockerfile",
      "instances": {}
    }
  }
}
```

To delete a daemon, remove it from `daemons` in `vercel.json` and deploy to production.

When a project is [paused](/docs/projects/managing-projects#pausing-a-project), for example by [spend management](/docs/spend-management#pausing-projects), Vercel stops all of its daemon instances. They start again when you resume the project.

## Viewing daemon logs

Vercel collects each instance's `stdout` and `stderr` output. Daemon logs appear in your project's [Logs](/docs/logs/runtime) with the source `daemon` and the daemon's name, so you can filter logs for a single daemon. To see a daemon's instances and their logs, open **Daemons** in your project's dashboard and select the daemon.


---

[View full sitemap](/docs/sitemap)
