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
source: "https://vercel.com/docs/errors/router_cannot_match.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "5137c3453ef83b39790cd85b6f0ef7569191124db8e8d971d0214e2e53ab7936"
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


---

[View full sitemap](/docs/sitemap)
