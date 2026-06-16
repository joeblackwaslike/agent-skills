---
title: Managing Vercel Blob storage from the CLI
product: vercel
url: /docs/vercel-blob/manage-blob-storage
canonical_url: "https://vercel.com/docs/vercel-blob/manage-blob-storage"
last_updated: 2026-05-28
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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "e65f96a5f77f2fa98190ea133a3391d9c68dfc089f2cd56b8c2d228ad0de983d"
---

# Managing Vercel Blob storage from the CLI

Use this guide to manage Vercel Blob storage from the CLI. You'll create a store, upload and organize files, and handle cleanup.

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

```bash filename="terminal"
vercel blob del images/old-logo.png
```

## 6. Manage stores

To inspect a store's details:

```bash filename="terminal"
vercel blob get-store <store-id>
```

To remove a store entirely:

```bash filename="terminal"
vercel blob delete-store <store-id>
```

## Related

- [vercel blob](/docs/cli/blob)
- [Vercel Blob overview](/docs/vercel-blob)


---

[View full sitemap](/docs/sitemap)
