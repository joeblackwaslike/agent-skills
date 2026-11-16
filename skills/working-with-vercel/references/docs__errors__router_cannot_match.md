---
title: ROUTER_CANNOT_MATCH
product: vercel
url: /docs/errors/ROUTER_CANNOT_MATCH
canonical_url: "https://vercel.com/docs/errors/ROUTER_CANNOT_MATCH"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/redirects
  - /docs/deployments/logs
summary: The router cannot match the route to any of the known patterns. This is a routing error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/router_cannot_match.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "fdff10ea8bf4b8f88b14c69e77fedcb1255ce525944176c6f14fc1adefbf4383"
---

# ROUTER_CANNOT_MATCH

The `ROUTER_CANNOT_MATCH` error occurs when the router is unable to match the requested route to any of the known patterns. This could happen due to a misconfiguration in the routing setup or an erroneous request path.

**Error Code:** `502`

**Name:** Bad Gateway

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Review routing configuration:** Check the [routing configuration](/docs/redirects#configuration-redirects) to ensure that it is correctly set up to handle the requested route
2. **Verify request path:** Ensure that the request path is correct and adheres to the expected patterns defined in the routing configuration
3. **Check for typos:** Look for any typos or misconfigurations in the routing setup that might be causing the mismatch
4. **Review application logs:** Inspect the [application logs](/docs/deployments/logs) for any warnings or errors related to routing

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
