---
title: SANBDOX_NOT_LISTENING
product: vercel
url: /docs/errors/SANDBOX_NOT_LISTENING
canonical_url: "https://vercel.com/docs/errors/SANDBOX_NOT_LISTENING"
last_updated: 2026-05-25
type: reference
prerequisites:
  []
related:
  - /docs/sandbox
summary: The Sandbox is not listening on the requested port. This is an application error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/sandbox_not_listening.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "acf4532f77687026b1166d125be6c033ee0a6101d6202d3aa306763e84ba341c"
---

# SANBDOX_NOT_LISTENING

The `SANDBOX_NOT_LISTENING` error occurs when you are trying to access a Sandbox that is not listening on the requested port. This could happen if the port is malconfigured, or the process running on that port has exited.

**Error Code:** `502`

**Name:** Bad Gateway

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Verify the configured port:** Make sure that the `ports` field used in `Sandbox.create` matches the port your application is listening on. Follow the [documentation](/docs/sandbox) to learn more
2. **Check the Sandbox history:** Navigate to the [Sandboxes dashboard](/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fsandboxes\&title=Go+to+Sandboxes), select the one you are accessing, and check the history section to see which commands were run and if any errors occurred


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
