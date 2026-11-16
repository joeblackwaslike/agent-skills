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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/sandbox_not_listening.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "27ededca2ff2493e49738f19d0fadf18ee3fa39fcbdc6beddf53c6dcd1d3d000"
---

# SANDBOX_NOT_LISTENING

The `SANDBOX_NOT_LISTENING` error occurs when you are trying to access a Sandbox that is not listening on the requested port. This could happen if the port is malconfigured, or the process running on that port has exited.

**Error Code:** `502`

**Name:** Bad Gateway

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Verify the configured port:** Make sure that the `ports` field used in `Sandbox.create` matches the port your application is listening on. Follow the [documentation](/docs/sandbox) to learn more
2. **Check the Sandbox history:** Navigate to the [Sandboxes dashboard](/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fsandboxes\&title=Go+to+Sandboxes), select the one you are accessing, and check the history section to see which commands were run and if any errors occurred

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
