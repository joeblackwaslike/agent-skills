---
title: ROUTER_EXTERNAL_TARGET_ERROR
product: vercel
url: /docs/errors/ROUTER_EXTERNAL_TARGET_ERROR
canonical_url: "https://vercel.com/docs/errors/ROUTER_EXTERNAL_TARGET_ERROR"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/redirects
  - /docs/deployments/logs
summary: Error occurred while routing to an external target. This is a routing error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/router_external_target_error.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "498ca8866890b4f38aa1e2e23b6310cf0aa0f33bd2565cb301405e9fb1466532"
---

# ROUTER_EXTERNAL_TARGET_ERROR

The `ROUTER_EXTERNAL_TARGET_ERROR` error occurs when there is an error while routing to an external target. This could happen due to incorrect routing configuration, an erroneous response from the external target, or other issues affecting the routing process. If the external server does not respond within the maximum timeout of **120 seconds** (2 minutes), you will see this error.

**Error Code:** `502`

**Name:** Bad Gateway

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Review routing configuration:** Check the [routing configuration](/docs/redirects#configuration-redirects) to ensure that it is correctly set up to route to the external target
2. **Verify external target availability:** Make sure the external target is online and reachable
3. **Check for errors in external target:** Investigate the external target for any errors that might be causing the routing issue
4. **Inspect firewall settings:** Verify that there are no firewall settings blocking the connection to the external target
5. **Review application logs:** Inspect the [application logs](/docs/deployments/logs) for any warnings or errors related to routing or the external target


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
