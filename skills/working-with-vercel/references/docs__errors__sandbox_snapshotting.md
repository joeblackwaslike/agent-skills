---
title: SANDBOX_SNAPSHOTTING
product: vercel
url: /docs/errors/SANDBOX_SNAPSHOTTING
canonical_url: "https://vercel.com/docs/errors/SANDBOX_SNAPSHOTTING"
last_updated: 2026-05-25
type: reference
prerequisites:
  []
related:
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/sdk-reference
summary: The Sandbox is creating a snapshot and is no longer accepting commands. This is a transient state.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/sandbox_snapshotting.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "c304db8705f380ec11c8de72027bb9d9a182b666d304a716ad7a7b79e484c52b"
---

# SANDBOX_SNAPSHOTTING

The `SANDBOX_SNAPSHOTTING` error occurs when a request lands on a Sandbox whose current session is in the middle of creating a snapshot. The session no longer accepts commands and will stop once the snapshot finishes. This happens automatically for [persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes) on stop, and on demand when you call `sandbox.snapshot()`.

**Error Code:** `422`

**Name:** Unprocessable Entity

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Wait for the snapshot to finish, then resume:** This is a transient state. For a persistent Sandbox, the snapshot is the saved filesystem the next session resumes from. Once it's done, call `Sandbox.get({ name })` (or run any SDK command) to start a new session.
2. **Check whether your code is racing `snapshot()`:** If one path calls `sandbox.snapshot()` while another path is still issuing commands, the second path can see `SANDBOX_SNAPSHOTTING`. Coordinate the two paths or guard them with the [`status`](/docs/sandbox/sdk-reference#status) accessor.
3. **Inspect the Sandbox history:** Navigate to the [Sandboxes dashboard](/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fsandboxes\&title=Go+to+Sandboxes), select the Sandbox, and check the history section to see what triggered the snapshot.


---

[View full sitemap](/docs/sitemap)
