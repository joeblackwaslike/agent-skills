---
title: Sandbox Regions
product: vercel
url: /docs/sandbox/concepts/regions
canonical_url: "https://vercel.com/docs/sandbox/concepts/regions"
last_updated: 2026-08-26
type: conceptual
prerequisites:
  - /docs/sandbox/concepts
  - /docs/sandbox
related:
  - /docs/cli/project
  - /docs/plans/pro-plan/trials
  - /docs/sandbox/concepts/snapshots
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/sdk-reference
summary: Choose the regions where Vercel Sandbox runs your sandboxes, set a project default, and configure failover regions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/concepts/regions.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "acd7d1c1e1005e1ee88352e60f7a7363285c0979fa5b6c6fd3b567c792c559de"
---

# Sandbox Regions

Sandboxes run in a region that you choose when you create them. Pick the region closest to the data sources your sandboxes talk to, such as databases or object storage, to reduce latency.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Sandbox is now globally available](https://vercel.com/changelog/vercel-sandbox-is-now-globally-available?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fregions&source_site=vercel-docs&relationship=related)
- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fregions&source_site=vercel-docs&relationship=related) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [The Complete Guide to Vercel Drives](https://vercel.com/kb/guide/vercel-drives?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fregions&source_site=vercel-docs&relationship=related) — Learn how Vercel Drives provide persistent storage for Vercel Sandboxes, and how to create, mount, list, and delete a dr
- [Working with Sandbox](https://vercel.com/docs/sandbox/working-with-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fregions&source_site=vercel-docs&relationship=related) — Task-oriented examples for common Vercel Sandbox operations in TypeScript and Python.
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fregions&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/run-commands-in-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fregions&source_site=vercel-docs&relationship=related) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fregions&source_site=vercel-docs&relationship=related) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Quickstart](https://vercel.com/docs/sandbox/quickstart?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fregions&source_site=vercel-docs&relationship=related) — Learn how to run your first code in a Vercel Sandbox.

Full cross-link map for this page: [/docs/sandbox/concepts/regions.graph.md](/docs/sandbox/concepts/regions.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fregions&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Available regions

Vercel Sandbox is available in the following regions:

| Region | Location             |
| ------ | -------------------- |
| `iad1` | Washington, D.C., USA |
| `sfo1` | San Francisco, USA   |
| `cle1` | Cleveland, USA       |
| `cdg1` | Paris, France        |

The default region is `iad1`.

## How Vercel picks the region

When you create a sandbox, Vercel resolves the region in this order:

1. The `region` you pass when creating the sandbox.
2. Your project's default sandbox region, configured in the [project settings](#set-a-default-region-for-your-project).
3. `iad1` when no region was specified.

## Set the region for a sandbox

Pass the region when you create the sandbox:

**CLI**

```bash filename="terminal"
sandbox create --name my-sandbox --region sfo1
```

The `--region` option is also available on `sandbox run` and `sandbox fork`.

**TypeScript**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  name: 'my-sandbox',
  region: 'sfo1',
});

console.log(sandbox.region); // "sfo1"
```

Read the region of an existing sandbox with the `sandbox.region` accessor in the SDK, or from the `REGION` column of `sandbox list` in the CLI.

## Set a default region for your project

To change the region for all sandboxes a project creates, without passing `region` on every call:

1. From the [Vercel dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings\&title=Open+project+settings), select your project and go to **Settings**, then **Sandboxes**.
2. Under **Sandbox Regions**, select the main region.
3. Select **Save**.

You can also set the project defaults with [Vercel CLI](/docs/cli/project#update) (this is the `vercel` CLI, not the `sandbox` CLI):

```bash filename="terminal"
# Set the default region and failover regions for the project
vercel project update my-project --sandbox-region sfo1 --sandbox-failover-regions cle1,iad1

# Clear them
vercel project update my-project --sandbox-region "" --sandbox-failover-regions ""
```

To view a project's configured sandbox regions, run `vercel project inspect my-project` and check the **Sandbox** section.

New sandboxes that don't specify a `region` use the project default. Existing sandboxes keep the region they were created in.

> **💡 Note:** After you change the project's main region, new sandboxes can't be created from [snapshots](#regions-and-snapshots) that aren't available in that region.

## Failover regions

> **🔒 Permissions Required**: Failover regions

Failover regions let sandbox creation succeed even when the main region is unavailable. When Vercel can't provision capacity in the main region, it tries the failover regions in the order you list them.

A snapshot doesn't need to be available in a failover region for failover to work. Vercel loads it across regions for you, as described in [Regions and snapshots](#regions-and-snapshots).

Teams on the Hobby plan or a [Pro trial](/docs/plans/pro-plan/trials) can set the main region, but can't configure or use failover regions. Requests that include failover regions fail with a `payment_required` error. If your team moves to the Hobby plan, Vercel ignores previously configured failover regions when creating sandboxes.

Pass failover regions when creating a sandbox, or set them as a project default in the same **Sandbox Regions** settings section:

**CLI**

```bash filename="terminal"
sandbox create --name my-sandbox --region iad1 --failover-regions cle1,sfo1
```

**TypeScript**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  name: 'my-sandbox',
  region: 'iad1',
  failoverRegions: ['cle1', 'sfo1'],
});
```

Failover regions must not include the sandbox's main region. Failover regions are also not supported for sandboxes that mount [drives](#regions-and-drives).

To change the failover regions of an existing sandbox, pass `failoverRegions` to `sandbox.update()` in the SDK (use `[]` to remove them) or run `sandbox config failover-regions <name> <region,...|none>` in the CLI.

## Regions and snapshots

A [snapshot](/docs/sandbox/concepts/snapshots) is stored in the region of the sandbox it was created from. You can only create or resume a sandbox from a snapshot in a region where that snapshot is available. Creating a sandbox from a snapshot in another region fails with a `snapshot_region_mismatch` error.

This applies to [persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes) too: a persistent sandbox resumes from its latest snapshot, so that snapshot must be available in the sandbox's region.

The same rule applies to [forks](/docs/sandbox/sdk-reference#sandbox.fork). A fork runs in the source sandbox's region unless you pass `region`. If the source has a snapshot, that snapshot must be available in the target region.

> **💡 Note:** Failover is the exception to the snapshot region requirement. When sandbox creation falls back to a [failover region](#failover-regions), Vercel loads the snapshot from the closest region where it's available instead of failing with `snapshot_region_mismatch`. A session that runs in a failover region stores the snapshots it creates in that region.

Snapshots can't be moved between regions. To run an environment in another region, create a new sandbox in that region, run your setup again, and snapshot it there.

Read the regions where a snapshot is available with the `snapshot.regions` accessor in the SDK, or from the `REGIONS` column of `sandbox snapshots list` in the CLI.

## Regions and drives

A [drive](/docs/sandbox/concepts/drives) is stored in a single region. Choose the region when you create the drive, with the `--region` option in the CLI or the `region` parameter in `Drive.getOrCreate()`. Drives are created in `iad1` when you don't specify a region:

**CLI**

```bash filename="terminal"
sandbox drives get-or-create workspace-cache --region sfo1
```

**TypeScript**

```ts filename="index.ts"
import { Drive } from '@vercel/sandbox';

const drive = await Drive.getOrCreate({
  name: 'workspace-cache',
  region: 'sfo1',
});

console.log(drive.region); // "sfo1"
```

A drive's region can't change after creation, and drives can't be moved between regions. Requesting an existing drive with a different region fails with a `conflict` error.

A sandbox that mounts a drive must run in the same region as the drive; otherwise creation fails with a `drive_region_mismatch` error.

The project default region is not applied to sandboxes that mount drives. Pass `region` explicitly to match the drive's region when it's not `iad1`.

[Failover regions](#failover-regions) are not supported for sandboxes that mount drives, because a drive is only available in its own region. Configuring both fails with a `bad_request` error.

Read the region of an existing drive with the `drive.region` accessor in the SDK, or from the `REGION` column of `sandbox drives list` in the CLI.

## Pricing

Active CPU and Provisioned Memory rates vary by region. See [Regional pricing](/docs/sandbox/pricing#regional-pricing) for the rates in each region. Sandbox Creations, Network, and [Snapshot Storage](/docs/sandbox/pricing#snapshot-storage) are billed at the same rate in all regions where Sandbox is available.

## Next steps

- [Snapshots](/docs/sandbox/concepts/snapshots): Save and restore sandbox state.
- [Drives (Beta)](/docs/sandbox/concepts/drives): Attach persistent storage to sandboxes.
- [Pricing and Quotas](/docs/sandbox/pricing): Snapshot storage rates and sandbox quotas.
- [JS SDK Reference](/docs/sandbox/sdk-reference#sandbox.create): The `region` and `failoverRegions` parameters.
- [CLI Reference](/docs/sandbox/cli-reference#sandbox-create): The `--region` and `--failover-regions` options.


---

[View full sitemap](/docs/sitemap)
