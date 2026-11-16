---
title: INTERNAL_ROUTER_CANNOT_PARSE_PATH
product: vercel
url: /docs/errors/INTERNAL_ROUTER_CANNOT_PARSE_PATH
canonical_url: "https://vercel.com/docs/errors/INTERNAL_ROUTER_CANNOT_PARSE_PATH"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The CDN has failed to parse application-specified URL, such as rewrite/redirection URLs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/internal_router_cannot_parse_path.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "755066f665e751a65a33364362ac2c939966173e5fa710d3e50e1cc2c08fbcbe"
---

# INTERNAL_ROUTER_CANNOT_PARSE_PATH

The `INTERNAL_ROUTER_CANNOT_PARSE_PATH` error occurs when the CDN has failed to parse application-specified URL, such as rewrite/redirection URLs.

**Error Code:** `502`

**Name:** Bad Gateway

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check configuration**: Check your configuration and make sure your app doesn't generate invalid URLs

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
