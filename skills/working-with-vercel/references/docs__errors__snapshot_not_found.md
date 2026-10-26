---
title: SNAPSHOT_NOT_FOUND
product: vercel
url: /docs/errors/SNAPSHOT_NOT_FOUND
canonical_url: "https://vercel.com/docs/errors/SNAPSHOT_NOT_FOUND"
last_updated: 2026-09-15
type: reference
prerequisites:
  []
related:
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/sdk-reference
summary: The Sandbox cannot resume because the snapshot it references no longer exists.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/snapshot_not_found.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "67b25a4bd9f3f661dc4212c6abd09297be508841d6d67abe23167577c828c78d"
---

# SNAPSHOT_NOT_FOUND

The `SNAPSHOT_NOT_FOUND` error occurs when a Sandbox tries to resume from a snapshot that is gone, typically because the snapshot expired and was deleted, was deleted explicitly, or never existed. This most commonly surfaces on `Sandbox.get({ name })` or any SDK call that auto-resumes a stopped [persistent Sandbox](/docs/sandbox/concepts/persistent-sandboxes), and on `Sandbox.create({ source: { type: 'snapshot', snapshotId } })` when the referenced snapshot ID is invalid.

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
