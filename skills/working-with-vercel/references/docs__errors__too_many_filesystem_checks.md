---
title: TOO_MANY_FILESYSTEM_CHECKS
product: vercel
url: /docs/errors/TOO_MANY_FILESYSTEM_CHECKS
canonical_url: "https://vercel.com/docs/errors/TOO_MANY_FILESYSTEM_CHECKS"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/rewrites
  - /docs/redirects
  - /docs/deployments/logs
summary: Too many filesystem checks occurred while processing the request. This is a routing error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/too_many_filesystem_checks.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "2e185ea546bc78537aed38c9e5370c792d27d20322d128904a82b1e8caa2148e"
---

# TOO_MANY_FILESYSTEM_CHECKS

The `TOO_MANY_FILESYSTEM_CHECKS` error occurs when there are excessive filesystem checks while processing a request. This could happen during the routing process, especially when using rewrites, redirects, or any other configuration that requires checking the filesystem repeatedly.

**Error Code:** `502`

**Name:** Bad Gateway

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Review routing configuration**: Check the routing configuration to ensure that it is not causing excessive filesystem checks, especially in the case of [rewrites](/docs/rewrites) or [redirects](/docs/redirects#configuration-redirects).
2. **Optimize routing configuration**: Reduce the number of has routes matched on a single path. You cannot have more than 5 has routes matched on a single path
3. **Check for Loops**: Ensure there isn't any looping logic in the routing or filesystem access code that could lead to excessive filesystem checks
4. **Review application logs**: Inspect the [application logs](/docs/deployments/logs) for any warnings or errors related to filesystem access or routing


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
