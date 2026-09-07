---
title: Snapshots
product: vercel
url: /docs/sandbox/concepts/snapshots
canonical_url: "https://vercel.com/docs/sandbox/concepts/snapshots"
last_updated: 2026-08-26
type: conceptual
prerequisites:
  - /docs/sandbox/concepts
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/sdk-reference
  - /docs/sandbox/cli-reference
  - /docs/sandbox/pricing
  - /docs/sandbox/concepts
summary: Save and restore sandbox state with snapshots for faster startups and environment sharing.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/concepts/snapshots.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "d32535871beee3d4210c423f9b5be1a7649641837daebbd0091d3def062f7d0c"
---

# Snapshots

Snapshots capture the state of a running sandbox, including the filesystem and installed packages. Use snapshots to skip setup time on subsequent runs.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to use snapshots for faster sandbox startup](https://vercel.com/kb/guide/how-to-use-snapshots-for-faster-sandbox-startup?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsnapshots&source_site=vercel-docs&relationship=related) — Learn how to save sandbox state with snapshots and skip installation on future runs.
- [Vercel Sandbox now calculates snapshot storage costs daily](https://vercel.com/changelog/vercel-sandbox-now-calculates-snapshot-storage-costs-daily?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsnapshots&source_site=vercel-docs&relationship=related)
- [Vercel Sandbox now supports Devin Outposts](https://vercel.com/changelog/vercel-sandbox-now-supports-devin-outposts?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsnapshots&source_site=vercel-docs&relationship=related)
- [How to install system packages in Vercel Sandbox](https://vercel.com/kb/guide/how-to-install-system-packages-in-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsnapshots&source_site=vercel-docs&relationship=related) — Learn how to install additional system packages in Vercel Sandbox with apt-get on the default Ubuntu-based managed image
- [The Complete Guide to Vercel Drives](https://vercel.com/kb/guide/vercel-drives?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsnapshots&source_site=vercel-docs&relationship=related) — Learn how Vercel Drives provide persistent storage for Vercel Sandboxes, and how to create, mount, list, and delete a dr
- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsnapshots&source_site=vercel-docs&relationship=related) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [Filesystem snapshots supported on Vercel Sandboxes](https://vercel.com/changelog/filesystem-snapshots-supported-on-vercel-sandboxes?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsnapshots&source_site=vercel-docs&relationship=related)
- [Vercel Sandbox snapshots now allow custom retention periods](https://vercel.com/changelog/vercel-sandbox-snapshots-now-allow-custom-retention-periods?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsnapshots&source_site=vercel-docs&relationship=related)
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsnapshots&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [Create a snapshot](https://vercel.com/docs/rest-api/sandboxes/create-a-snapshot?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsnapshots&source_site=vercel-docs&relationship=related) — POST /v2/sandboxes/sessions/{sessionId}/snapshot — Creates a point-in-time snapshot of a running session's filesystem. S
- [List snapshots](https://vercel.com/docs/rest-api/sandboxes/list-snapshots?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsnapshots&source_site=vercel-docs&relationship=related) — GET /v2/sandboxes/snapshots — Retrieves a paginated list of snapshots for a specific project.
- [Transferring a project](https://vercel.com/docs/projects/transferring-projects?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsnapshots&source_site=vercel-docs&relationship=related) — Learn how to transfer a project between Vercel teams.

Full cross-link map for this page: [/docs/sandbox/concepts/snapshots.graph.md](/docs/sandbox/concepts/snapshots.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsnapshots&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

For [persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes) (the default), snapshots are created automatically whenever a session stops, and the next session resumes from the most recent snapshot. You can still call `snapshot()` manually to create a checkpoint between sessions, or to fork a child sandbox from a known state.

## When to use snapshots

- **Faster startups**: Skip dependency installation by snapshotting after setup.
- **Checkpointing**: Save progress on long-running tasks.
- **Sharing environments**: Give teammates an identical starting point.
- **Forking**: Spawn new sandboxes from another sandbox's current state with [`Sandbox.fork`](/docs/sandbox/sdk-reference#sandbox.fork) (SDK) or [`sandbox fork`](/docs/sandbox/cli-reference#sandbox-fork) (CLI).

## How snapshots fit the sandbox lifecycle

A sandbox runs work inside a session, and snapshots connect one session to the next: when a session stops, its state is saved, and the next session resumes from that snapshot instead of starting clean.

The cycle looks like this:

1. You start or resume a sandbox, which runs a session.
2. When you call `stop()` or the timeout expires, the session stops. For a [persistent sandbox](/docs/sandbox/concepts/persistent-sandboxes) (the default), Vercel captures its filesystem and creates a snapshot automatically before the sandbox shuts down. Non-persistent sandboxes skip this and discard their filesystem.
3. When you create or resume a sandbox from a snapshot, it starts a new session from the saved state.

You can also snapshot a running sandbox at any time by calling `snapshot()`, which captures its current filesystem before stopping the session.

Snapshots outlive the sandbox they came from. Deleting a sandbox removes the sandbox and its sessions, but its snapshots stay available until they expire or you [delete them](#delete-a-snapshot), and they keep incurring [storage charges](/docs/sandbox/pricing#snapshot-storage) in the meantime.

A snapshot isn't tied to one sandbox. You can create or [fork](/docs/sandbox/sdk-reference#sandbox.fork) any number of sandboxes from the same snapshot, so deleting a single sandbox can't remove a snapshot that other sandboxes still start from.

For the full sandbox-side view of this cycle, see [Understanding Sandboxes](/docs/sandbox/concepts#sandbox-lifecycle) and [Persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes).

### How snapshots are created

You create snapshots in one of two ways:

| Creation method | When it happens                                                                 | How to control it                                                                                                          |
| :-------------- | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------- |
| **Automatic**   | A persistent sandbox session stops (manual `stop()` or timeout).                | Tune with [`snapshotExpiration`](/docs/sandbox/sdk-reference#snapshotexpiration) and [`keepLastSnapshots`](/docs/sandbox/sdk-reference#keeplastsnapshots). Opt out by making the sandbox non-persistent. |
| **Manual**      | You call `snapshot()` (SDK) or `sandbox snapshot --stop` (CLI) on a running sandbox. | Pass `expiration` to [`snapshot()`](/docs/sandbox/sdk-reference#sandbox.snapshot) per call to control when the snapshot expires. |

### Snapshot states

Once created, a snapshot reports a `status` that you can read with [`Snapshot.get`](#retrieve-an-existing-snapshot) or [`Snapshot.list`](#list-snapshots):

| Status      | Meaning                                                                                              |
| :---------- | :--------------------------------------------------------------------------------------------------- |
| `created`   | The snapshot is captured and ready to create or resume sandboxes from.                               |
| `deleted`   | The snapshot was removed, either because you called `delete()` or because it reached its expiration. |
| `failed`    | The capture didn't complete, so the snapshot can't be used. Take a new snapshot to retry.            |

When a snapshot's expiration passes, it moves to `deleted`. The [retention settings](#snapshot-retention) control that expiration, and each time you create a sandbox from a snapshot, its expiration timer resets, so snapshots you keep using stay `created`.

## Create a snapshot

Call `snapshot()` on a running sandbox:

> **💡 Note:** Once you create a snapshot, the sandbox shuts down automatically and becomes unreachable. You don't need to stop it afterwards.

**CLI**

```bash
# Create a snapshot of a running sandbox (by name)
sandbox snapshot my-sandbox --stop

# Create a snapshot that expires 14 days after its last use
sandbox snapshot my-sandbox --stop --expiration 14d

# Create a snapshot that never expires
sandbox snapshot my-sandbox --stop --expiration 0
```

The `--stop` flag confirms that the sandbox will be stopped when snapshotting. By default, snapshots expire 30 days after their last use. Use `--expiration` (e.g. `--expiration 14d`) to set a custom expiration time, or `--expiration 0` to never expire the snapshot.

**TypeScript**

```ts
import { Sandbox } from '@vercel/sandbox';
import ms from 'ms';

const sandbox = await Sandbox.create();

// Install dependencies, configure environment, etc.
await sandbox.runCommand('npm', ['install']);

// Snapshot and get the ID
const snapshot = await sandbox.snapshot({ expiration: ms('14d') });
console.log(snapshot.snapshotId);
```

**Python**

```python filename="main.py"
import asyncio
from datetime import timedelta

from vercel import sandbox


async def main() -> None:
    box = await sandbox.create_sandbox()

    # Install dependencies, configure environment, etc.
    await box.run_process("uv", ["sync"], check=True)

    # Snapshot and get the ID.
    snapshot = await box.snapshot(expiration=timedelta(days=14))
    print(snapshot.id)


asyncio.run(main())
```

## Create a sandbox from a snapshot

Pass the snapshot ID when creating a new sandbox:

**CLI**

```bash
sandbox create --snapshot snap_abc123
```

**TypeScript**

```ts
const sandbox = await Sandbox.create({
  source: { type: 'snapshot', snapshotId: 'snap_abc123' },
});
```

**Python**

```python filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import SnapshotSource


async def main() -> None:
    box = await sandbox.create_sandbox(
        source=SnapshotSource(snapshot_id="snap_abc123")
    )
    print(box.current_snapshot_id)


asyncio.run(main())
```

## Snapshots and regions

A snapshot is stored in the [region](/docs/sandbox/concepts/regions) of the sandbox it was created from. You can only create or resume a sandbox from a snapshot in a region where that snapshot is available. Creating a sandbox from a snapshot in another region fails with a `snapshot_region_mismatch` error. [Failover](/docs/sandbox/concepts/regions#failover-regions) is the exception. When creation falls back to a failover region, Vercel loads the snapshot from the closest region where it's available.

Snapshots can't be moved between regions. To run an environment in another region, create a new sandbox in that region, run your setup again, and snapshot it there.

Read the regions where a snapshot is available with the `snapshot.regions` accessor in the SDK, or from the `REGIONS` column of `sandbox snapshots list` in the CLI. [Snapshot storage](/docs/sandbox/pricing#snapshot-storage) is billed at the same rate in every region.

## List snapshots

View all snapshots for your project:

**CLI**

```bash
# List snapshots for the current project
sandbox snapshots list

# List snapshots for a specific project
sandbox snapshots list --project my-app
```

**TypeScript**

```ts
import { Snapshot } from '@vercel/sandbox';

// Auto-paginates through every page
const result = await Snapshot.list();
for await (const snapshot of result) {
  console.log(snapshot.id, snapshot.status);
}

// Or filter by sandbox name
const forSandbox = await Snapshot.list({ name: 'my-sandbox' });
```

**Python**

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    async for snapshot in sandbox.query_snapshots(page_size=10):
        print(snapshot.id, snapshot.status)


asyncio.run(main())
```

## Retrieve an existing snapshot

Look up a snapshot by ID:

**CLI**

The CLI doesn't support retrieving a single snapshot by ID. Use `sandbox snapshots list` to view all snapshots for your project:

```bash
sandbox snapshots list
```

**TypeScript**

```ts
import { Snapshot } from '@vercel/sandbox';

const snapshot = await Snapshot.get({ snapshotId: 'snap_abc123' });
console.log(snapshot.status); // "created" | "deleted" | "failed"
```

**Python**

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    snapshot = await sandbox.get_snapshot(snapshot_id="snap_abc123")
    print(snapshot.status)


asyncio.run(main())
```

## Delete a snapshot

Remove snapshots you no longer need:

**CLI**

```bash
# Delete a single snapshot
sandbox snapshots delete snap_abc123

# Delete multiple snapshots
sandbox snapshots delete snap_abc123 snap_def456
```

**TypeScript**

```ts
await snapshot.delete();
```

**Python**

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    snapshot = await sandbox.get_snapshot(snapshot_id="snap_abc123")
    await snapshot.delete()


asyncio.run(main())
```

## Snapshot retention

Snapshots expire **30 days after their last use** by default. You can shorten, extend, or remove that expiration at three levels:

- **Per-call**: pass `expiration` to `sandbox.snapshot({ expiration })` or `--expiration` to `sandbox snapshot`. Use `0` (or `none` in the CLI) for no expiration.
- **Per-sandbox default**: set `snapshotExpiration` at the sandbox level. Every automatic snapshot taken on stop, and every manual snapshot that omits an explicit `expiration`, inherits this value.
- **Retention policy**: use `keepLastSnapshots` to bound how many snapshots a sandbox keeps, regardless of expiration. For [persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes) (the default), the SDK creates a snapshot every time a session stops, so a retention policy is how you keep storage flat.

```ts
await sandbox.update({
  snapshotExpiration: 7 * 24 * 60 * 60 * 1000, // 7 days
  keepLastSnapshots: { count: 1, expiration: 30 * 24 * 60 * 60 * 1000 },
});
```

`keepLastSnapshots` fields:

- `count`: keep only the N (1–10) most recent snapshots.
- `expiration`: TTL for the kept snapshots, in milliseconds. Use `0` for no expiration.
- `deleteEvicted`: when `true` (the default), evicted snapshots are deleted immediately.

## Snapshot limits

- Snapshots expire **30 days after their last use** by default. See [Snapshot states](#snapshot-states) for how expiration moves a snapshot to `deleted`.
- Snapshots can only be used in a region where they are available. See [Snapshots and regions](#snapshots-and-regions).
- See [Pricing and Limits](/docs/sandbox/pricing#snapshot-storage) for storage costs and limits.


---

[View full sitemap](/docs/sitemap)
