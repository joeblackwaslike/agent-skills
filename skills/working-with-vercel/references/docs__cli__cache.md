---
title: vercel cache
product: vercel
url: /docs/cli/cache
canonical_url: "https://vercel.com/docs/cli/cache"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/caching/cdn-cache
  - /docs/caching/runtime-cache
  - /docs/caching/cdn-cache/purge
summary: Learn how to manage cache for your project using the vercel cache CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/cache.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "ecd5c51dcea5606824173a47e78e294f11772725d5dcbbe109b9bd5b39bcc20a"
---

# vercel cache

The `vercel cache` command is used to manage the cache for your project, such as [CDN cache](/docs/caching/cdn-cache) and [Runtime cache](/docs/caching/runtime-cache).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage cache tags for external origins](https://vercel.com/kb/guide/how-to-manage-cache-tags-for-external-origins?from=related) — Learn how to use cache tags to optimally serve fresh content on Vercel when content from your external origin changes
- [Debug Cache Issues](https://vercel.com/docs/caching/cdn-cache/debug-cache-issues?from=related) — Diagnose stale content and fix CDN cache, data cache, and build cache issues using the CLI.
- [Data Cache](https://vercel.com/docs/caching/runtime-cache/data-cache?from=related) — Vercel Data Cache is a specialized cache that stores responses from data fetches in Next.js App Router
- [Cache Status](https://vercel.com/docs/caching/cache-status?from=related) — Understand the cache status and reason shown for each request in Vercel logs, and what causes a response to miss, bypass
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [vercel blob](https://vercel.com/docs/cli/blob?from=related) — Learn how to interact with Vercel Blob storage using the vercel blob CLI command.

Full cross-link map for this page: [/docs/cli/cache.graph.md](/docs/cli/cache.graph.md)
<!-- /docsgraph:related -->

Learn more about [purging Vercel cache](/docs/caching/cdn-cache/purge).

## Usage

```bash filename="terminal"
vercel cache purge
```

*Using the \`vercel cache purge\` command to purge the CDN
cache and Data cache for the current project.*

## Extended Usage

```bash filename="terminal"
vercel cache purge --type cdn
```

*Using the \`vercel cache purge --type cdn\` command to
purge the CDN cache for the currenet project.*

```bash filename="terminal"
vercel cache purge --type data
```

*Using the \`vercel cache purge --type data\` command to
purge the Data cache for the current project.*

```bash filename="terminal"
vercel cache invalidate --tag blog-posts
```

*Using the \`vercel cache invalidate --tag blog-posts\` command
to invalidate the cached content associated with tag "blog-posts" for the current
project. Subsequent requests for this cached content will serve STALE and
revalidate in the background.*

```bash filename="terminal"
vercel cache dangerously-delete --tag blog-posts
```

*Using the \`vercel cache dangerously-delete --tag blog-posts\`
command to dangerously delete the cached content associated with tag "blog-posts" for
the current project. Subsequent requests for this cached content will serve
MISS and therefore block while revalidating.*

```bash filename="terminal"
vercel cache invalidate --srcimg /api/avatar/1
```

*Using the \`vercel cache invalidate --srcimg /api/avatar/1\` command
to invalidate all cached content associated with the source image "/api/avatar/1" for the current
project. Subsequent requests for this cached content will serve STALE and
revalidate in the background.*

```bash filename="terminal"
vercel cache dangerously-delete --srcimg /api/avatar/1
```

*Using the \`vercel cache dangerously-delete --srcimg /api/avatar/1\`
command to dangerously delete all cached content associated with the source image "/api/avatar/1" for
the current project. Subsequent requests for this cached content will serve
MISS and therefore block while revalidating.*

```bash filename="terminal"
vercel cache dangerously-delete --srcimg /api/avatar/1 --revalidation-deadline-seconds 604800
```

*Using the \`vercel cache dangerously-delete --srcimg /api/avatar/1 --revalidation-deadline-seconds 604800\`
command to dangerously delete all cached content associated with the source image "/api/avatar/1" for
the current project if not accessed in the next 604800 seconds (7 days).*

## Unique Options

These are options that only apply to the `vercel cache` command.

### tag

The `--tag` option specifies which tag to invalidate or delete from the cache. You can provide a single tag or multiple comma-separated tags. This option works with both `invalidate` and `dangerously-delete` subcommands.

```bash filename="terminal"
vercel cache invalidate --tag blog-posts,user-profiles,homepage
```

*Using the \`vercel cache invalidate\` command with multiple tags.*

### srcimg

The `--srcimg` option specifies a source image path to invalidate or delete from the cache. This invalidates or deletes all cached transformations of the source image. This option works with both `invalidate` and `dangerously-delete` subcommands.

You can't use both `--tag` and `--srcimg` options together. Choose one based on whether you're invalidating cached content by tag or by source image.

```bash filename="terminal"
vercel cache invalidate --srcimg /api/avatar/1
```

*Using the \`vercel cache invalidate\` command with a source image path.*

### revalidation-deadline-seconds

The `--revalidation-deadline-seconds` option specifies the revalidation deadline in seconds. When used with `dangerously-delete`, cached content will only be deleted if it hasn't been accessed within the specified time period.

```bash filename="terminal"
vercel cache dangerously-delete --tag blog-posts --revalidation-deadline-seconds 3600
```

*Using the \`vercel cache dangerously-delete\` command with a 1-hour (3600 seconds) revalidation deadline.*

### Yes

The `--yes` option can be used to bypass the confirmation prompt when purging the cache or dangerously deleting cached content.

```bash filename="terminal"
vercel cache purge --yes
```

*Using the \`vercel cache purge\` command with the
\`--yes\` option.*


---

[View full sitemap](/docs/sitemap)
