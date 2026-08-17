---
title: Managing redirects at scale
product: vercel
url: /docs/routing/redirects/manage-redirects-at-scale
canonical_url: "https://vercel.com/docs/routing/redirects/manage-redirects-at-scale"
last_updated: 2026-05-28
type: how-to
prerequisites:
  - /docs/routing/redirects
  - /docs/routing
related:
  - /docs/cli/project-linking
  - /docs/cli/redirects
  - /docs/routing/redirects
  - /docs/project-configuration
summary: Add, bulk upload, version, and roll back project-level redirects using the CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/routing/redirects/manage-redirects-at-scale.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "7d9aaf90414d7032d8116f1bf1772a780e6ec66244ca80bfd2c9b232fd9f7944"
---

# Managing redirects at scale

Use this guide to manage project-level redirects from the CLI. You'll add individual redirects, bulk upload from a file, manage versions, and roll back if needed.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Managing Redirects from your CMS using Vercel Bulk Redirects](https://vercel.com/kb/guide/managing-redirects-from-your-cms-using-vercel-bulk-redirects?from=related) — Learn how to sync redirect rules from your CMS to Vercel at build time with vercel.ts, allowing non-technical teams to m
- [How can I increase the limit of redirects or use dynamic redirects on Vercel?](https://vercel.com/kb/guide/how-can-i-increase-the-limit-of-redirects-or-use-dynamic-redirects-on-vercel?from=related) — Instructions on how to use Serverless Functions to handle redirects on Vercel.
- [Dynamic redirects with Global Config and Next.js proxy](https://vercel.com/kb/guide/dynamic-redirects-with-global-config-and-next-js-proxy?from=related) — Learn how to create redirects that update instantly without redeploying by storing rules in Global Config and reading th
- [Getting Started](https://vercel.com/docs/routing/redirects/bulk-redirects/getting-started?from=related) — Learn how to import thousands of simple redirects from CSV, JSON, or JSONL files.
- [Bulk Redirects](https://vercel.com/docs/routing/redirects/bulk-redirects?from=related) — Learn how to import thousands of simple redirects from CSV, JSON, or JSONL files.
- [Edit a project-level redirect.](https://vercel.com/docs/rest-api/bulk-redirects/edit-a-project-level-redirect?from=related)
- [Configuration Redirects](https://vercel.com/docs/routing/redirects/configuration-redirects?from=related) — Learn how to define static redirects in your framework configuration or vercel.json with support for wildcards, pattern
- [Gets project-level redirects.](https://vercel.com/docs/rest-api/bulk-redirects/gets-project-level-redirects?from=related)

Full cross-link map for this page: [/docs/routing/redirects/manage-redirects-at-scale.graph.md](/docs/routing/redirects/manage-redirects-at-scale.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** This guide requires a [linked Vercel project](/docs/cli/project-linking). Run
> `vercel link` in your project directory if you haven't already.

## Quick reference

Use this block when you already know what you're doing and want the full command sequence. Use the steps below for context and checks.

```bash filename="terminal"
# 1. Review existing redirects
vercel redirects list --per-page 50

# 2. Add individual redirects
vercel redirects add /old-path /new-path --status 301
vercel redirects add /temp-path /new-path --status 302 --preserve-query-params

# 3. Bulk upload from a file
vercel redirects upload redirects.csv

# 4. Review the staged version before it goes live
vercel redirects list --staging

# 5. Check version history
vercel redirects list-versions

# 6. Promote a staged version to live
vercel redirects promote <version-id>

# IF a redirect version causes problems:
vercel redirects restore <previous-version-id>

# 7. Search and remove specific redirects
vercel redirects list --search "/old-blog"
vercel redirects remove /old-blog/post-1
```

## 1. Review existing redirects

Start by checking what redirects are currently active:

```bash filename="terminal"
vercel redirects list --per-page 50
```

To search for a specific redirect pattern:

```bash filename="terminal"
vercel redirects list --search "/old-blog"
```

## 2. Add individual redirects

Add a permanent redirect (301) for a URL that has moved permanently:

```bash filename="terminal"
vercel redirects add /old-path /new-path --status 301
```

Add a temporary redirect (302) that preserves query parameters:

```bash filename="terminal"
vercel redirects add /temp-path /new-path --status 302 --preserve-query-params
```

For case-sensitive matching:

```bash filename="terminal"
vercel redirects add /API/v1 /api/v1 --status 301 --case-sensitive
```

Available status codes are 301 (permanent), 302 (temporary), 307 (temporary, preserves method), and 308 (permanent, preserves method).

## 3. Bulk upload redirects

For site migrations with many redirects, upload them from a CSV file:

```bash filename="terminal"
vercel redirects upload redirects.csv
```

> **💡 Note:** By default, uploading adds to your existing redirects. To replace all existing
> redirects with the contents of the file, use the `--overwrite` flag.

To replace all existing redirects:

```bash filename="terminal"
vercel redirects upload redirects.csv --overwrite
```

## 4. Review the staged version

After uploading or adding redirects, review the staged version before it goes live:

```bash filename="terminal"
vercel redirects list --staging
```

This shows the redirects that will take effect when you promote the staged version.

## 5. Check version history

View all redirect versions to understand what changed and when:

```bash filename="terminal"
vercel redirects list-versions
```

Each version has an ID, name, timestamp, and status. This history lets you track changes and roll back to any previous version.

## 6. Promote a staged version

When you're satisfied with the staged redirects, promote the version to make it live:

```bash filename="terminal"
vercel redirects promote <version-id>
```

## 7. Remove specific redirects

To remove a redirect you no longer need:

```bash filename="terminal"
vercel redirects remove /old-path
```

Use `--yes` to skip the confirmation prompt:

```bash filename="terminal"
vercel redirects remove /old-path --yes
```

## When you need to roll back

If a redirect version causes problems (for example, a redirect loop or incorrect destination), restore a previous version:

```bash filename="terminal"
vercel redirects list-versions
```

Find the version ID of the last known good version, then restore it:

```bash filename="terminal"
vercel redirects restore <previous-version-id>
```

This immediately reverts the live redirects to the selected version.

## Related

- [vercel redirects](/docs/cli/redirects)
- [Redirects overview](/docs/routing/redirects)
- [Project configuration](/docs/project-configuration)


---

[View full sitemap](/docs/sitemap)
