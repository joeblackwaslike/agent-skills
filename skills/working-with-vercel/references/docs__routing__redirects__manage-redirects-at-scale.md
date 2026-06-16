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
  - /docs/redirects
  - /docs/project-configuration
summary: Add, bulk upload, version, and roll back project-level redirects using the CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/routing/redirects/manage-redirects-at-scale.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "8f480254768063e525ce7b59274d83cb350f53552b7f39d52f224bf47512deea"
---

# Managing redirects at scale

Use this guide to manage project-level redirects from the CLI. You'll add individual redirects, bulk upload from a file, manage versions, and roll back if needed.

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
- [Redirects overview](/docs/redirects)
- [Project configuration](/docs/project-configuration)


---

[View full sitemap](/docs/sitemap)
