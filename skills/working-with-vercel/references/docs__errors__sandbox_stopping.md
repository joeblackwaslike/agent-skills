---
title: SANDBOX_STOPPING
product: vercel
url: /docs/errors/SANDBOX_STOPPING
canonical_url: "https://vercel.com/docs/errors/SANDBOX_STOPPING"
last_updated: 2026-05-25
type: reference
prerequisites:
  []
related:
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/sdk-reference
summary: The Sandbox is mid-shutdown and is no longer accepting commands. This is a transient state.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/sandbox_stopping.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "4e510289575cd37b1bf65a0d9f480d5ee81ada9482d1f219267f7296fa243833"
---

# SANDBOX_STOPPING

The `SANDBOX_STOPPING` error occurs when a request lands on a Sandbox whose current session is shutting down. The session is past the point where it can accept new commands, but the shutdown (including any automatic snapshot for [persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes)) has not finished yet.

**Error Code:** `422`

**Name:** Unprocessable Entity

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Wait for the session to stop, then resume:** This is a transient state. For a persistent Sandbox, wait until the shutdown finishes, then call `Sandbox.get({ name })` (or run any SDK command) to start a new session from the snapshot taken on shutdown.
2. **Check whether your code is racing `stop()`:** If your application calls `sandbox.stop()` from one path while another path is still issuing commands, the second path can see `SANDBOX_STOPPING`. Coordinate the two paths or guard them with the [`status`](/docs/sandbox/sdk-reference#status) accessor.
3. **Inspect the Sandbox history:** Navigate to the [Sandboxes dashboard](/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fsandboxes\&title=Go+to+Sandboxes), select the Sandbox, and check the history section to see what triggered the shutdown.


---

[View full sitemap](/docs/sitemap)
