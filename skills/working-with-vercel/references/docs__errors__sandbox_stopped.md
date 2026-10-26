---
title: SANDBOX_STOPPED
product: vercel
url: /docs/errors/SANDBOX_STOPPED
canonical_url: "https://vercel.com/docs/errors/SANDBOX_STOPPED"
last_updated: 2026-09-15
type: reference
prerequisites:
  []
related:
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/sdk-reference
summary: The Sandbox was stopped and is no longer reachable. This is a platform error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/sandbox_stopped.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "78bf6add89aab2ced773507327d41cd885b276447cd2dae202181f4278c059f0"
---

# SANDBOX_STOPPED

The `SANDBOX_STOPPED` error occurs when you are trying to access a Sandbox that has been stopped. This could happen if the Sandbox was manually stopped by the owner, or if the session reached its configured timeout.

**Error Code:** `410`

**Name:** Gone

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Resume the sandbox:** For [persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes) (the default), call `Sandbox.get({ name })` and run a command. The SDK auto-resumes the sandbox from its last snapshot.
2. **Verify the Sandbox status:** Navigate to the [Sandboxes dashboard](/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fsandboxes\&title=Go+to+Sandboxes), select the one you are accessing, and check the history section to learn why it was stopped.
3. **Increase the timeout:** By default, Sandboxes have a session timeout of 5 minutes. You can extend it by passing the `timeout` property to [`Sandbox.create()`](/docs/sandbox/sdk-reference#sandbox.create).


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
