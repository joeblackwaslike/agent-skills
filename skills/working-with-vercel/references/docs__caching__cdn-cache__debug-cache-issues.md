---
title: Diagnosing and fixing cache issues
product: vercel
url: /docs/caching/cdn-cache/debug-cache-issues
canonical_url: "https://vercel.com/docs/caching/cdn-cache/debug-cache-issues"
last_updated: 2026-05-20
type: how-to
prerequisites:
  - /docs/caching/cdn-cache
  - /docs/caching
related:
  - /docs/cli/project-linking
  - /docs/cli/cache
  - /docs/cli/httpstat
  - /docs/cli/inspect
  - /docs/cli/logs
summary: Diagnose stale content and fix CDN cache, data cache, and build cache issues using the CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/caching/cdn-cache/debug-cache-issues.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "509f1201cf91bada944837375b26238a702a0f18880d4fb520e718db0e2bd349"
---

# Diagnosing and fixing cache issues

Use this guide to diagnose and fix cache-related issues. You'll identify whether the problem is with the CDN cache, data cache, or build cache, and apply the right fix for each.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to troubleshoot stale content returned from the Edge Network when using an external proxy or CDN](https://vercel.com/kb/guide/how-to-troubleshoot-stale-content-returned-from-the-edge-network-when-using-an-external-proxy-or-cdn?from=related) — Learn how to diagnose and fix stale content issues when using external proxies or CDNs with Vercel. Understand troublesh
- [Manage cache tags for external origins](https://vercel.com/kb/guide/how-to-manage-cache-tags-for-external-origins?from=related) — Learn how to use cache tags to optimally serve fresh content on Vercel when content from your external origin changes
- [How to debug 404 errors](https://vercel.com/kb/guide/how-to-debug-404-errors?from=related) — Learn the systematic steps to identify and resolve 404 issues.
- [Using Vercel as a Standalone CDN](https://vercel.com/kb/guide/using_vercel_as_a_cdn?from=related) — Use Vercel's external rewrites to proxy and cache content from external websites or APIs through Vercel's global edge ne
- [Troubleshoot Build Errors](https://vercel.com/docs/deployments/troubleshoot-a-build?from=related) — Learn how to resolve common scenarios you may encounter during the Build step, including build errors that cancel a depl
- [Purge CDN Cache](https://vercel.com/docs/caching/cdn-cache/purge?from=related) — Learn how to invalidate and delete cached content on Vercel's CDN, including cache keys and manual purging options.
- [Debug Slow Functions](https://vercel.com/docs/functions/debug-slow-functions?from=related) — Diagnose and fix slow Vercel Functions using CLI tools, logs, and timing analysis.
- [Data Cache](https://vercel.com/docs/caching/runtime-cache/data-cache?from=related) — Vercel Data Cache is a specialized cache that stores responses from data fetches in Next.js App Router
- [Cache Status](https://vercel.com/docs/caching/cache-status?from=related) — Understand the cache status and reason shown for each request in Vercel logs, and what causes a response to miss, bypass

Full cross-link map for this page: [/docs/caching/cdn-cache/debug-cache-issues.graph.md](/docs/caching/cdn-cache/debug-cache-issues.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** This guide requires a [linked Vercel project](/docs/cli/project-linking). Run
> `vercel link` in your project directory if you haven't already.

## Quick reference

Use this block when you already know what you're doing and want the full command sequence. Use the steps below for context and checks.

```bash filename="terminal"
# 1. Check current response headers for cache status
vercel httpstat /path-with-stale-content

# 2. Search logs for cache-related issues
vercel logs --environment production --query "cache" --since 1h --expand

# 3. Identify the current deployment
vercel inspect <deployment-url>

# IF stale CDN content (HTML, assets, images):
vercel cache purge --type cdn --yes
vercel httpstat /path-with-stale-content    # verify content is fresh

# IF stale data cache (API responses, database queries):
vercel cache invalidate --tag my-cache-tag
# OR hard-delete if invalidation isn't enough:
vercel cache dangerously-delete --tag my-cache-tag --yes

# IF stale build cache (wrong build output):
vercel deploy --force --prod

# IF stale optimized images:
vercel cache invalidate --srcimg /images/hero.png
```

## 1. Check the response headers

Start by checking the current cache status for the affected route. `vercel httpstat` shows response timing and lets you verify whether responses are served from cache:

```bash filename="terminal"
vercel httpstat /path-with-stale-content
```

> **💡 Note:** `vercel httpstat` is a beta command (CLI v48.9.0+) that requires the
> [`httpstat`](https://github.com/reorx/httpstat) tool to be installed on your
> system.

Run this two or three times in a row. If responses are consistently fast with similar timing, they're likely being served from the CDN cache.

## 2. Search logs for cache-related issues

Check production logs for cache-related entries that might explain the stale content:

```bash filename="terminal"
vercel logs --environment production --query "cache" --since 1h --expand
```

Look for patterns like revalidation failures, cache key mismatches, or errors in your caching logic.

## 3. Identify the current deployment

Check which deployment is currently serving production traffic:

```bash filename="terminal"
vercel inspect <deployment-url>
```

Compare the deployment's Git commit with your latest code. If the deployment is older than expected, the issue might be that a recent deployment failed and an older cached version is serving traffic.

## Fix: stale CDN content

If the issue is stale HTML pages, static assets, or images being served from the CDN despite having new content deployed, purge the CDN cache:

```bash filename="terminal"
vercel cache purge --type cdn --yes
```

After purging, verify the content is fresh:

```bash filename="terminal"
vercel httpstat /path-with-stale-content
```

The first request after purging may be slower because it needs to regenerate the cache. Subsequent requests will be fast again.

## Fix: stale data cache

If you're using the data cache (via `fetch` with `next.revalidate` or similar caching APIs) and the cached data is stale, invalidate it by tag:

```bash filename="terminal"
vercel cache invalidate --tag my-cache-tag
```

You can invalidate multiple tags at once by separating them with commas:

```bash filename="terminal"
vercel cache invalidate --tag products,pricing
```

If invalidation isn't clearing the stale data, hard-delete the cached entries:

```bash filename="terminal"
vercel cache dangerously-delete --tag my-cache-tag --yes
```

> **💡 Note:** `dangerously-delete` immediately removes the cached entries. The next request
> triggers a fresh fetch, which may be slower until the cache is repopulated.

## Fix: stale build cache

If the deployed output seems wrong despite the latest code being committed, the build cache might contain stale artifacts. Force a fresh build without using the build cache:

```bash filename="terminal"
vercel deploy --force --prod
```

If you want to skip the deployment cache but keep the build cache:

```bash filename="terminal"
vercel deploy --force --with-cache --prod
```

## Fix: stale optimized images

If an optimized image is still showing an old version after you've replaced the source file, invalidate the image optimization cache:

```bash filename="terminal"
vercel cache invalidate --srcimg /images/hero.png
```

Or hard-delete it:

```bash filename="terminal"
vercel cache dangerously-delete --srcimg /images/hero.png --yes
```

## Related

- [vercel cache](/docs/cli/cache)
- [vercel httpstat](/docs/cli/httpstat)
- [vercel inspect](/docs/cli/inspect)
- [vercel logs](/docs/cli/logs)
- [CDN cache overview](/docs/caching/cdn-cache)
- [Debugging production 500 errors](/docs/observability/debug-production-errors)


---

[View full sitemap](/docs/sitemap)
