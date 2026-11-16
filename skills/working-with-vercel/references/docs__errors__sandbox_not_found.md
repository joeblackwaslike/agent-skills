---
title: SANDBOX_NOT_FOUND
product: vercel
url: /docs/errors/SANDBOX_NOT_FOUND
canonical_url: "https://vercel.com/docs/errors/SANDBOX_NOT_FOUND"
last_updated: 2026-05-22
type: reference
prerequisites:
  []
related:
  []
summary: The Sandbox could not be found on Vercel. This is a platform error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/sandbox_not_found.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "dc415537444fb364aeff8e9c8c850781cfb09a7ddb318cd2fc7731eac3190254"
---

# SANDBOX_NOT_FOUND

The `SANDBOX_NOT_FOUND` error occurs when you are trying to access a Sandbox that does not exist. This could happen if there is a typo in the URL.

**Error Code:** `404`

**Name:** Not Found

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Verify the Sandbox URL:** Navigate to the [Sandboxes dashboard](/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fsandboxes\&title=Go+to+Sandboxes), select the one you want to access, and copy the displayed URL
2. **Check for typos:** Ensure that there are no typos in the Sandbox URL you are trying to access

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
