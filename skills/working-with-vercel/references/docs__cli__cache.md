---
title: vercel cache
product: vercel
url: /docs/cli/cache
canonical_url: "https://vercel.com/docs/cli/cache"
last_updated: 2026-09-15
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/caching/cdn-cache
  - /docs/caching/runtime-cache
  - /docs/caching/cdn-cache/purge
  - /docs/caching/runtime-cache/data-cache
  - /docs/cli/project-linking
summary: Learn how to manage cache for your project using the vercel cache CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/cache.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "f7a9d27ba179bb810c47a3af82f393b587500ba7ae7fba4da02ca2e7211c3c91"
---

# vercel cache

The `vercel cache` command is used to manage the cache for your project, such as [CDN cache](/docs/caching/cdn-cache) and [Runtime cache](/docs/caching/runtime-cache).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Add cache tags from Function responses, regardless of framework](https://vercel.com/changelog/add-cache-tags-from-function-responses-regardless-of-framework)
- [Invalidate the CDN cache by tag](https://vercel.com/changelog/invalidate-the-cdn-cache-by-tag)
- [Tag-based cache invalidation now available for all responses](https://vercel.com/changelog/tag-based-cache-invalidation-now-available-for-all-responses)
- [You can now invalidate the CDN cache by providing a source image](https://vercel.com/changelog/you-can-now-invalidate-the-cdn-cache-by-providing-a-source-image)
- [Manage cache tags for external origins](https://vercel.com/kb/guide/how-to-manage-cache-tags-for-external-origins) — Learn how to use cache tags to optimally serve fresh content on Vercel when content from your external origin changes
- [Diagnosing and fixing cache issues](https://vercel.com/docs/caching/cdn-cache/debug-cache-issues) — Diagnose stale content and fix CDN cache, data cache, and build cache issues using the CLI.
- [vercel blob](https://vercel.com/docs/cli/blob) — Learn how to interact with Vercel Blob storage using the vercel blob CLI command.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.

Full cross-link map for this page: [/docs/cli/cache.graph.md](/docs/cli/cache.graph.md)
<!-- /docsgraph:related -->

Learn more about [purging Vercel cache](/docs/caching/cdn-cache/purge).

## Usage

```bash filename="terminal"
vercel cache purge
```

*Using the \`vercel cache purge\` command to purge the CDN
cache, Runtime cache, and Data cache for the current project.*

On some plans, the projects in your team share one Runtime cache or Data cache. Purging a shared cache deletes the cached data of every project in your team. See storage scope by plan for [Runtime cache](/docs/caching/runtime-cache#storage-scope-by-plan) and [Data cache](/docs/caching/runtime-cache/data-cache#storage-scope-by-plan).

## Extended Usage

```bash filename="terminal"
vercel cache purge --type cdn
```

*Using the \`vercel cache purge --type cdn\` command to
purge the CDN cache for the current project.*

```bash filename="terminal"
vercel cache purge --type data
```

*Using the \`vercel cache purge --type data\` command to
purge the Runtime cache and Data cache for the current project.*

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
REVALIDATED and therefore block while revalidating.*

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
REVALIDATED and therefore block while revalidating.*

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

The `--srcimg` option specifies a source image to invalidate or delete from the cache. This invalidates or deletes all cached transformations of the source image. This option works with both `invalidate` and `dangerously-delete` subcommands.

The value must exactly match how your app references the source image (a relative path or a full URL), including any query parameters. Unlike user-defined cache tags, source image tags may contain commas and have a maximum length of 1013 bytes of UTF-8.

You can't use both `--tag` and `--srcimg` options together. Choose one based on whether you're invalidating cached content by tag or by source image.

```bash filename="terminal"
vercel cache invalidate --srcimg /api/avatar/1
```

*Using the \`vercel cache invalidate\` command with a source image path.*

### revalidation-deadline-seconds

The `--revalidation-deadline-seconds` option sets a deadline, in seconds, before `dangerously-delete` deletes the cached content. If a request for the content arrives before the deadline, Vercel serves the stale content and revalidates it in the background. If no request arrives before the deadline, Vercel deletes the content. Use this option only with the `dangerously-delete` subcommand:

```bash filename="terminal"
vercel cache dangerously-delete --tag blog-posts --revalidation-deadline-seconds 3600
```

*Using the \`vercel cache dangerously-delete\` command with a 1-hour (3600 seconds) revalidation deadline.*

### Project

By default, `vercel cache` acts on the project that the current directory is [linked](/docs/cli/project-linking) to. To purge, invalidate, or delete the cache of another project, pass its name or ID with the [`--project`](/docs/cli/global-options#project) option, shorthand `-p`:

```bash filename="terminal"
vercel cache purge --project my-project
```

*Using the \`vercel cache purge\` command with the
\`--project\` option.*

### Yes

The `--yes` option can be used to bypass the confirmation prompt when purging the cache, invalidating cached content, or dangerously deleting cached content. In non-interactive environments like CI, the command can't prompt and exits without changing the cache, so pass `--yes`:

```bash filename="terminal"
vercel cache purge --yes
```

*Using the \`vercel cache purge\` command with the
\`--yes\` option.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel cache` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
