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
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "3b4f9666e86e593008b85b153e4eec7c71a4afabedc89f57ceaa43a0fb692fa2"
---

# SNAPSHOT_NOT_FOUND

The `SNAPSHOT_NOT_FOUND` error occurs when a Sandbox tries to resume from a snapshot that is gone, typically because the snapshot expired and was deleted, was deleted explicitly, or never existed. This most commonly surfaces on `Sandbox.get({ name, resume: true })` or any SDK call that auto-resumes a stopped [persistent Sandbox](/docs/sandbox/concepts/persistent-sandboxes).

**Error Code:** `410`

**Name:** Gone

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Recreate the Sandbox with `getOrCreate`:** [`Sandbox.getOrCreate`](/docs/sandbox/sdk-reference#sandbox.getorcreate) handles this case for you when you pass `resume: true`: if the named Sandbox exists but its snapshot expired or was deleted, the SDK deletes the stale Sandbox, re-creates it with the same name, and fires `onCreate`. Without `resume: true`, `getOrCreate` returns the existing Sandbox, and the first SDK call that resumes it fails with this error. Use `getOrCreate` with `resume: true` instead of `Sandbox.get` for long-lived workflows.
2. **Check the snapshot retention policy:** If the snapshot was created automatically on shutdown, its TTL is governed by the Sandbox's [`snapshotExpiration`](/docs/sandbox/sdk-reference#snapshotexpiration) and [`keepLastSnapshots`](/docs/sandbox/sdk-reference#keeplastsnapshots) settings. Loosen them if your workflow needs to resume after long idle periods.
3. **Check the current snapshot:** Before you recreate the Sandbox, look up its current snapshot (`sandbox.currentSnapshotId`) with `sandbox snapshots get <snapshot-id>` or `Snapshot.get({ snapshotId })`. A `deleted` status confirms that the snapshot expired or was deleted.
4. **Inspect the Sandbox dashboard:** Navigate to the [Sandboxes dashboard](/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fsandboxes\&title=Go+to+Sandboxes) and review the Sandbox's snapshot history.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
