---
title: Sandbox Regions
product: vercel
url: /docs/sandbox/concepts/regions
canonical_url: "https://vercel.com/docs/sandbox/concepts/regions"
last_updated: 2026-09-22
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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "15b4ec2dbed2caa00dee4f65760cc4d12dcb228091b3a5430882d3eef3fc860f"
---

# Sandbox Regions

Sandboxes run in a region that you choose when you create them. Pick the region closest to the data sources your sandboxes talk to, such as databases or object storage, to reduce latency.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Drives for Vercel Sandbox are now in public beta](https://vercel.com/changelog/drives-for-vercel-sandbox-are-now-in-public-beta)
- [Vercel Sandbox is now available in all regions](https://vercel.com/changelog/vercel-sandbox-is-now-available-in-all-regions)
- [Vercel Sandbox is now globally available](https://vercel.com/changelog/vercel-sandbox-is-now-globally-available)
- [How Vercel Drives work and how to use them](https://vercel.com/kb/guide/vercel-drives) — Learn how Vercel Drives give Vercel Sandbox persistent, shareable storage, and how to create, mount, snapshot, fork, lis
- [How to use Vercel Drives with an eve agent](https://vercel.com/kb/guide/vercel-drives-eve-agent) — Mount Vercel Drives in an eve agent's sandbox to give each user a persistent workspace and share read-only reference dat
- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [How to use snapshots for faster sandbox startup](https://vercel.com/kb/guide/how-to-use-snapshots-for-faster-sandbox-startup) — Learn how to save sandbox state with snapshots and skip installation on future runs.
- [Concepts](https://vercel.com/docs/eve/concepts) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y

Full cross-link map for this page: [/docs/sandbox/concepts/regions.graph.md](/docs/sandbox/concepts/regions.graph.md)
<!-- /docsgraph:related -->

## Available regions

Vercel Sandbox is available in 19 regions:

| Region Code | Region Name | Reference Location |
|-------------|-------------|--------------------|
| arn1 | eu-north-1 | Stockholm, Sweden |
| bom1 | ap-south-1 | Mumbai, India |
| cdg1 | eu-west-3 | Paris, France |
| cle1 | us-east-2 | Cleveland, USA |
| cpt1 | af-south-1 | Cape Town, South Africa |
| dub1 | eu-west-1 | Dublin, Ireland |
| fra1 | eu-central-1 | Frankfurt, Germany |
| gru1 | sa-east-1 | São Paulo, Brazil |
| hkg1 | ap-east-1 | Hong Kong |
| hnd1 | ap-northeast-1 | Tokyo, Japan |
| iad1 | us-east-1 | Washington, D.C., USA |
| icn1 | ap-northeast-2 | Seoul, South Korea |
| kix1 | ap-northeast-3 | Osaka, Japan |
| lhr1 | eu-west-2 | London, United Kingdom |
| pdx1 | us-west-2 | Portland, USA |
| sfo1 | us-west-1 | San Francisco, USA |
| sin1 | ap-southeast-1 | Singapore |
| syd1 | ap-southeast-2 | Sydney, Australia |
| yul1 | ca-central-1 | Montréal, Canada |


The default region is `iad1`.

## How Vercel picks the region

When you create a sandbox, Vercel resolves the region in this order:

1. The `region` you pass when creating the sandbox.
2. Your project's default sandbox region, configured in the [project settings](#set-a-default-region-for-your-project).
3. `iad1` when no region was specified.

## Set the region for a sandbox

Pass the region when you create the sandbox:

**terminal.sh**

```bash filename="terminal.sh"
sandbox create --name my-sandbox --region sfo1
```

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  name: 'my-sandbox',
  region: 'sfo1',
});

console.log(sandbox.region); // "sfo1"
```

**main.py**

```py filename="main.py"
from vercel import sandbox

async with sandbox.create_sandbox(name="my-sandbox", region="sfo1") as box:
    print(box.region)  # "sfo1"
```

The CLI `--region` option is also available on `sandbox run` and `sandbox fork`.

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

> Failover regions are available on Enterprise and Pro plans

Failover regions let sandbox creation succeed even when the main region is unavailable. When Vercel can't provision capacity in the main region, it tries the failover regions in the order you list them.

A snapshot or drive doesn't need to be available in a failover region for failover to work. Vercel loads it across regions for you, as described in [Regions and snapshots](#regions-and-snapshots) and [Regions and drives](#regions-and-drives).

Teams on the Hobby plan or a [Pro trial](/docs/plans/pro-plan/trials) can set the main region, but can't configure or use failover regions. Requests that include failover regions fail with a `payment_required` error. If your team moves to the Hobby plan, Vercel ignores previously configured failover regions when creating sandboxes.

Pass failover regions when creating a sandbox, or set them as a project default in the same **Sandbox Regions** settings section:

**terminal.sh**

```bash filename="terminal.sh"
sandbox create --name my-sandbox --region iad1 --failover-regions cle1,sfo1
```

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  name: 'my-sandbox',
  region: 'iad1',
  failoverRegions: ['cle1', 'sfo1'],
});
```

**main.py**

```py filename="main.py"
from vercel import sandbox

async with sandbox.create_sandbox(
    name="my-sandbox",
    region="iad1",
    failover_regions=["cle1", "sfo1"],
) as box:
    print(box.region, box.failover_regions)
```

Failover regions must not include the sandbox's main region. To change the failover regions of an existing sandbox, pass `failoverRegions` to `sandbox.update()` in TypeScript or `failover_regions` to `box.update()` in Python. Pass `[]` to remove them. With the CLI, run `sandbox config failover-regions <name> <region,...|none>`.

## Regions and snapshots

A [snapshot](/docs/sandbox/concepts/snapshots) is stored in the region of the sandbox it was created from. You can only create or resume a sandbox from a snapshot in a region where that snapshot is available. Creating a sandbox from a snapshot in another region fails with a `snapshot_region_mismatch` error.

This applies to [persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes) too: a persistent sandbox resumes from its latest snapshot, so that snapshot must be available in the sandbox's region.

The same rule applies to [forks](/docs/sandbox/sdk-reference#sandbox.fork). A fork runs in the source sandbox's region unless you pass `region`. If the source has a snapshot, that snapshot must be available in the target region.

> **💡 Note:** Failover is the exception to the snapshot region requirement. When sandbox creation falls back to a [failover region](#failover-regions), Vercel loads the snapshot from the closest region where it's available instead of failing with `snapshot_region_mismatch`. A session that runs in a failover region stores the snapshots it creates in that region.

Snapshots can't be moved between regions. To run an environment in another region, create a new sandbox in that region, run your setup again, and snapshot it there.

Read the regions where a snapshot is available with the `snapshot.regions` accessor in the SDK, or from the `REGIONS` column of `sandbox snapshots list` in the CLI.

## Regions and drives

A [drive](/docs/sandbox/concepts/drives) is stored in a single region. Choose the region when you create the drive, with the `--region` option in the CLI or the `region` parameter in `Drive.getOrCreate()`. Drives are created in `iad1` when you don't specify a region:

**terminal.sh**

```bash filename="terminal.sh"
sandbox drives get-or-create workspace-cache --region sfo1
```

**index.ts**

```ts filename="index.ts"
import { Drive } from '@vercel/sandbox';

const drive = await Drive.getOrCreate({
  name: 'workspace-cache',
  region: 'sfo1',
});

console.log(drive.region); // "sfo1"
```

**main.py**

```py filename="main.py"
from vercel import sandbox

drive, _ = await sandbox.get_or_create_drive(
    name="workspace-cache",
    region="sfo1",
)
print(drive.region)  # "sfo1"
```

A drive's region can't change after creation, and drives can't be moved between regions. Requesting an existing drive with a different region fails with a `conflict` error.

A sandbox's main region must match a drive's region. Otherwise, creation will fail with a `drive_region_mismatch` error. Sandboxes that failover to another region will still load their drives, but latency from reads will be higher.

The project default region is not applied to sandboxes that mount drives. Pass `region` explicitly to match the drive's region when it's not `iad1`.

Read the region of an existing drive with the `drive.region` accessor in the SDK, or from the `REGION` column of `sandbox drives list` in the CLI.

## Pricing

Active CPU, Provisioned Memory, Sandbox Data Transfer, and Drive rates vary by region. See [Regional pricing](/docs/sandbox/pricing#regional-pricing) for the rates in each region. Sandbox Creations and [Snapshot Storage](/docs/sandbox/pricing#snapshot-storage) are billed at the same rate in all regions where Sandbox is available.

## Next steps

- [Snapshots](/docs/sandbox/concepts/snapshots): Save and restore sandbox state.
- [Drives](/docs/sandbox/concepts/drives): Attach persistent storage to sandboxes.
- [Pricing and Quotas](/docs/sandbox/pricing): Snapshot storage rates and sandbox quotas.
- [JS SDK Reference](/docs/sandbox/sdk-reference#sandbox.create): The `region` and `failoverRegions` parameters.
- [CLI Reference](/docs/sandbox/cli-reference#sandbox-create): The `--region` and `--failover-regions` options.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
