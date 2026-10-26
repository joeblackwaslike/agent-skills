---
title: TOO_MANY_FORKS
product: vercel
url: /docs/errors/TOO_MANY_FORKS
canonical_url: "https://vercel.com/docs/errors/TOO_MANY_FORKS"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/rewrites
  - /docs/redirects
  - /docs/headers
  - /docs/deployments/logs
summary: An error occurred in the application when matching too many conditional routes. You cannot have more than 5 \
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/too_many_forks.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "cb493ac26f22ab8fe8ff62b028a5c23c6d985abb7b17853cd66339e19bde666b"
---

# TOO_MANY_FORKS

The `TOO_MANY_FORKS` error occurs when too many forks are generated while processing the request. This usually happens when matching too many conditional routes, which could lead to a loop or excessive resource usage.

You cannot have more than 5 `has` routes matched on a single path.

**Error Code:** `502`

**Name:** Bad Gateway

#### Troubleshoot

To troubleshoot this error, follow these steps:

1. **Review routing configuration**: Reduce the number of [rewrites](/docs/rewrites), [redirects](/docs/redirects#configuration-redirects), or [headers](/docs/headers) with a `has` key (conditional route) that match the erroring request path
2. **Check for recursive logic**: Ensure there isn't any recursive logic in the routing configuration that could lead to excessive forking
3. **Handle unhandled exceptions**: Check the [application logs](/docs/deployments/logs) for any unhandled exceptions that may be causing the error


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
