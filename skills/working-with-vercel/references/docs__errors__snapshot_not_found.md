---
title: SNAPSHOT_NOT_FOUND
product: vercel
url: /docs/errors/SNAPSHOT_NOT_FOUND
canonical_url: "https://vercel.com/docs/errors/SNAPSHOT_NOT_FOUND"
last_updated: 2026-05-25
type: reference
prerequisites:
  []
related:
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/sdk-reference
summary: The Sandbox cannot resume because the snapshot it references no longer exists.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/snapshot_not_found.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "d6634f9b7fe94f34314e0d5b067eba5092efd7f7e3dbc53ad78b9021daf09921"
---

# SNAPSHOT_NOT_FOUND

The `SNAPSHOT_NOT_FOUND` error occurs when a Sandbox tries to resume from a snapshot that is gone — typically because the snapshot expired and was deleted, was deleted explicitly, or never existed. This most commonly surfaces on `Sandbox.get({ name })` or any SDK call that auto-resumes a stopped [persistent Sandbox](/docs/sandbox/concepts/persistent-sandboxes), and on `Sandbox.create({ source: { type: 'snapshot', snapshotId } })` when the referenced snapshot ID is invalid.

**Error Code:** `410`

**Name:** Gone

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Recreate the Sandbox with `getOrCreate`:** [`Sandbox.getOrCreate`](/docs/sandbox/sdk-reference#sandbox.getorcreate) handles this case for you: if the named Sandbox exists but its snapshot expired, the SDK deletes the stale Sandbox, re-creates it with the same name, and fires `onCreate`. Use it instead of `Sandbox.get` for long-lived workflows.
2. **Check the snapshot retention policy:** If the snapshot was created automatically on shutdown, its TTL is governed by the Sandbox's [`snapshotExpiration`](/docs/sandbox/sdk-reference#snapshotexpiration) and [`keepLastSnapshots`](/docs/sandbox/sdk-reference#keeplastsnapshots) settings. Loosen them if your workflow needs to resume after long idle periods.
3. **Verify the snapshot ID:** For `Sandbox.create({ source: { type: 'snapshot', snapshotId } })`, confirm the snapshot still exists with `sandbox snapshots get <snapshot-id>` or `Snapshot.get({ snapshotId })`. To spawn a new Sandbox from another Sandbox's current snapshot without tracking IDs, use [`Sandbox.fork`](/docs/sandbox/sdk-reference#sandbox.fork) instead.
4. **Inspect the Sandbox dashboard:** Navigate to the [Sandboxes dashboard](/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fsandboxes\&title=Go+to+Sandboxes) and review the Sandbox's snapshot history.


---

[View full sitemap](/docs/sitemap)
