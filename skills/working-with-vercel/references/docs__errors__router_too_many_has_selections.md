---
title: ROUTER_TOO_MANY_HAS_SELECTIONS
product: vercel
url: /docs/errors/ROUTER_TOO_MANY_HAS_SELECTIONS
canonical_url: "https://vercel.com/docs/errors/ROUTER_TOO_MANY_HAS_SELECTIONS"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/redirects
  - /docs/deployments/logs
summary: The router has too many selections. This is a routing error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/router_too_many_has_selections.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "faedb23c4ee33e293fb4173349390c2b383c2558ce232af0855aeefdc8be61a5"
---

# ROUTER_TOO_MANY_HAS_SELECTIONS

The `ROUTER_TOO_MANY_HAS_SELECTIONS` error occurs when the router encounters too many selections while processing the request. This could happen due to misconfiguration or a complex routing setup that exceeds the router's capabilities.

**Error Code:** `502`

**Name:** Bad Gateway

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Review routing configuration:** Check the [routing configuration](/docs/redirects#configuration-redirects) to ensure it's correctly set up and doesn't contain excessive selections
2. **Simplify routing setup:** If possible, simplify the routing setup to reduce the number of selections the router has to process
3. **Check for recursive or looping logic:** Ensure there isn't any recursive or looping logic in the routing configuration that could lead to excessive selections
4. **Review application logs:** Inspect the [application logs](/docs/deployments/logs) for any warnings or errors related to routing or selections


---

[View full sitemap](/docs/sitemap)
