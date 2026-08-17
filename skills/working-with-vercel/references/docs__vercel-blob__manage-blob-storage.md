---
title: Managing Vercel Blob storage from the CLI
product: vercel
url: /docs/vercel-blob/manage-blob-storage
canonical_url: "https://vercel.com/docs/vercel-blob/manage-blob-storage"
last_updated: 2026-07-15
type: how-to
prerequisites:
  - /docs/vercel-blob
related:
  - /docs/cli/project-linking
  - /docs/cli/blob
  - /docs/vercel-blob
summary: Create blob stores, upload files, list contents, and manage storage using the CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-blob/manage-blob-storage.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "cf6bb576d9f71b3c4197d3d75dafb417616d6f82511cf20bc755b97ae4c74b57"
---

# Managing Vercel Blob storage from the CLI

Use this guide to manage Vercel Blob storage from the CLI. You'll create a store, upload and organize files, and handle cleanup.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Blob](https://vercel.com/kb/guide/vercel-blob?from=related) — Vercel Blob stores and serves files of any size through Vercel's global network. Learn how Blob works, what it costs, an
- [Build with Vercel Blob on Nuxt](https://vercel.com/kb/guide/vercel-blob-nuxt?from=related) — Set up Vercel Blob in a Nuxt application with NuxtHub, upload and serve files, and deliver optimized images with Nuxt Im
- [Build with Vercel Blob on Next.js](https://vercel.com/kb/guide/vercel-blob-nextjs?from=related) — Deploy the Vercel Blob Next.js Starter and learn how client uploads store images securely in a private Blob store.
- [Create a Blob store](https://vercel.com/docs/rest-api/storage/create-a-blob-store?from=related)
- [Overview](https://vercel.com/docs/storage?from=related) — Store large files and global configuration with Vercel's storage products.
- [Delete a Blob store](https://vercel.com/docs/rest-api/storage/delete-a-blob-store?from=related)
- [vercel vcr](https://vercel.com/docs/cli/vcr?from=related) — Manage Vercel Container Registry from the Vercel CLI: list, inspect, create, and delete repositories, browse tags, and m
- [Container Registry](https://vercel.com/docs/container-registry?from=related) — Store and manage Docker container images on Vercel. Push images built from a Dockerfile, then run them on Vercel Functio

Full cross-link map for this page: [/docs/vercel-blob/manage-blob-storage.graph.md](/docs/vercel-blob/manage-blob-storage.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** This guide assumes a [linked Vercel project](/docs/cli/project-linking). Run
> `vercel link` in your project directory if you haven't already. The CLI also
> accepts an explicit `--rw-token` (or `--oidc-token`) together with `--store-id`
> if you cannot link the project locally.

## Quick reference

Use this block when you already know what you're doing and want the full command sequence. Use the steps below for context and checks.

```bash filename="terminal"
# 1. Create a blob store (--access is required: public or private)
vercel blob create-store my-blob-store --access public

# 2. Upload files (--access is required: public or private)
vercel blob put ./assets/logo.png --pathname images/logo.png --access public
vercel blob put ./data/config.json --content-type application/json --access public

# 3. List blobs
vercel blob list --prefix images/ --limit 20

# 4. Copy a blob (--access is required: public or private)
vercel blob copy images/logo.png images/logo-backup.png --access public

# 5. Delete a blob
vercel blob del images/old-logo.png

# 6. Inspect a store
vercel blob get-store <store-id>
```

## 1. Create a blob store

Create a new blob store for your project. The `--access` flag is required and accepts `public` or `private`:

```bash filename="terminal"
vercel blob create-store my-blob-store --access public
```

To specify a region for the store:

```bash filename="terminal"
vercel blob create-store my-blob-store --access public --region iad1
```

## 2. Upload files

Upload a file to a specific path in your blob store. The `--access` flag is required and accepts `public` or `private`:

```bash filename="terminal"
vercel blob put ./assets/logo.png --pathname images/logo.png --access public
```

The CLI infers the content type from the file extension. To set it explicitly:

```bash filename="terminal"
vercel blob put ./data/config.json --content-type application/json --access public
```

To control cache behavior:

```bash filename="terminal"
vercel blob put ./assets/hero.jpg --pathname images/hero.jpg --cache-control-max-age 86400 --access public
```

If a file already exists at the target pathname, use `--allow-overwrite` to replace it:

```bash filename="terminal"
vercel blob put ./assets/logo-v2.png --pathname images/logo.png --allow-overwrite --access public
```

To add a random suffix to the filename (useful for avoiding collisions with user uploads):

```bash filename="terminal"
vercel blob put ./uploads/photo.jpg --add-random-suffix --access private
```

## 3. List blobs

List all blobs in your store:

```bash filename="terminal"
vercel blob list
```

Filter by prefix to browse a specific directory:

```bash filename="terminal"
vercel blob list --prefix images/ --limit 20
```

For paginated results, use the cursor from the previous response:

```bash filename="terminal"
vercel blob list --prefix images/ --limit 10 --cursor <cursor-value>
```

## 4. Copy blobs

Copy a blob to a new location within the same store. The `--access` flag is required and accepts `public` or `private`:

```bash filename="terminal"
vercel blob copy images/logo.png images/logo-backup.png --access public
```

This creates a new blob at the destination path without modifying the original.

## 5. Delete blobs

Remove a blob you no longer need:

> **💡 Note:** This action is permanent and cannot be undone.

```bash filename="terminal"
vercel blob del images/old-logo.png
```

## 6. Manage stores

To inspect a store's details:

```bash filename="terminal"
vercel blob get-store <store-id>
```

To remove a store entirely:

> **💡 Note:** This action is permanent and cannot be undone.

```bash filename="terminal"
vercel blob delete-store <store-id>
```

## Related

- [vercel blob](/docs/cli/blob)
- [Vercel Blob overview](/docs/vercel-blob)


---

[View full sitemap](/docs/sitemap)
