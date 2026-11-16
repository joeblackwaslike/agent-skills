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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/sandbox_stopped.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "c041b10e4322628658a8801b9d029b1dc4a1676b3218a3b3ba83d335226b35fb"
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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
