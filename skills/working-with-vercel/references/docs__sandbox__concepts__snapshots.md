---
title: Snapshots
product: vercel
url: /docs/sandbox/concepts/snapshots
canonical_url: "https://vercel.com/docs/sandbox/concepts/snapshots"
last_updated: 2026-05-29
type: conceptual
prerequisites:
  - /docs/sandbox/concepts
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/sdk-reference
  - /docs/sandbox/cli-reference
  - /docs/sandbox/concepts
  - /docs/sandbox/pricing
summary: Save and restore sandbox state with snapshots for faster startups and environment sharing.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/concepts/snapshots.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "28a2e7a0084373cfbdb4941fe8822494531899ffbf10ef41beff3839a19c4265"
---

# Snapshots

Snapshots capture the state of a running sandbox, including the filesystem and installed packages. Use snapshots to skip setup time on subsequent runs.

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

## Create a sandbox from a snapshot

Pass the snapshot ID when creating a new sandbox:

## List snapshots

View all snapshots for your project:

## Retrieve an existing snapshot

Look up a snapshot by ID:

## Delete a snapshot

Remove snapshots you no longer need:

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
- See [Pricing and Limits](/docs/sandbox/pricing#snapshot-storage) for storage costs and limits.


---

[View full sitemap](/docs/sitemap)
