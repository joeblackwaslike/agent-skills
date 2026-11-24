---
title: ROUTER_EXTERNAL_TARGET_CONNECTION_ERROR
product: vercel
url: /docs/errors/ROUTER_EXTERNAL_TARGET_CONNECTION_ERROR
canonical_url: "https://vercel.com/docs/errors/ROUTER_EXTERNAL_TARGET_CONNECTION_ERROR"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/redirects
  - /docs/deployments/logs
summary: Connection error occurred while routing to an external target. This is a routing error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/router_external_target_connection_error.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "20ae2689579fc222d628bb6849e85b7eb8873ae19e81704d9da1a48293a51d82"
---

# ROUTER_EXTERNAL_TARGET_CONNECTION_ERROR

The `ROUTER_EXTERNAL_TARGET_CONNECTION_ERROR` error occurs when there is a connection error while routing to an external target. This could happen due to network issues, incorrect routing configuration, or the external target being unreachable.

**Error Code:** `502`

**Name:** Bad Gateway

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check network connectivity:** Ensure that the network connectivity between your deployment and the external target is stable
2. **Verify external target availability:** Make sure the external target is online and reachable
3. **Review routing configuration:** Check the [routing configuration](/docs/redirects#configuration-redirects) to ensure that it is correctly set up to route to the external target
4. **Inspect firewall settings:** Verify that there are no firewall settings blocking the connection to the external target
5. **Review application logs:** Inspect the [application logs](/docs/deployments/logs) for any warnings or errors related to routing or network connectivity

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
