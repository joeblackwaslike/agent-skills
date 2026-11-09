---
title: vercel blob
product: vercel
url: /docs/cli/blob
canonical_url: "https://vercel.com/docs/cli/blob"
last_updated: 2026-08-13
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/vercel-blob
  - /docs/vercel-blob/public-storage
  - /docs/vercel-blob/private-storage
  - /docs/vercel-blob/using-blob-sdk
  - /docs/vercel-blob/vercel-signed-urls
summary: Learn how to interact with Vercel Blob storage using the vercel blob CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/blob.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "05c55176bd726f538f08d845bd9d6c2f327076a41e8a49781941787ab4473fa0"
---

# vercel blob

The `vercel blob` command is used to interact with [Vercel Blob](/docs/vercel-blob) storage, providing functionality to upload, download, list, delete, and copy files in [public](/docs/vercel-blob/public-storage) and [private](/docs/vercel-blob/private-storage) stores, store optimized images, and manage Blob stores.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Blob CLI is now available](https://vercel.com/changelog/vercel-blob-cli-is-now-available)
- [Vercel Blob now available in all Vercel Regions](https://vercel.com/changelog/vercel-blob-now-available-in-all-vercel-regions)
- [The Complete Guide to Vercel Blob](https://vercel.com/kb/guide/vercel-blob) — Vercel Blob stores and serves files of any size through Vercel's global network. Learn how Blob works, what it costs, an
- [vercel storage](https://vercel.com/docs/cli/storage) — List, create, inspect, and delete storage resources, and manage their project connections with the Vercel CLI.
- [Managing Vercel Blob storage from the CLI](https://vercel.com/docs/vercel-blob/manage-blob-storage) — Create blob stores, upload files, list contents, and manage storage using the CLI.
- [vercel global-config](https://vercel.com/docs/cli/global-config) — Manage Global Config stores from the Vercel CLI: list, create, inspect, update, delete, and manage items, read tokens, a
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.

Full cross-link map for this page: [/docs/cli/blob.graph.md](/docs/cli/blob.graph.md)
<!-- /docsgraph:related -->

For more information about Vercel Blob, see the [Vercel Blob documentation](/docs/vercel-blob) and [Vercel Blob SDK reference](/docs/vercel-blob/using-blob-sdk).

## Usage

The `vercel blob` command supports the following operations:

- [`list`](#list) - List all files in the Blob store
- [`put`](#put) - Upload a file to the Blob store
- [`put-image`](#put-image) - Optimize an image and store the result in the Blob store
- [`delete`](#delete) - Delete a file from the Blob store
- [`copy`](#copy) - Copy a file in the Blob store
- [`get`](#get) - Download a blob from the Blob store
- `signed-token` - Issue a short-lived signed token for Blob operations. See [Vercel Signed URLs](/docs/vercel-blob/vercel-signed-urls)
- `presign` - Generate a presigned URL for a Blob operation. See [Vercel Signed URLs](/docs/vercel-blob/vercel-signed-urls)
- [`create-store`](#create-store) - Create a new Blob store
- [`delete-store`](#delete-store) - Delete a Blob store
- [`get-store`](#get-store) - Get a Blob store
- [`list-stores`](#list-stores) - List all Blob stores
- [`empty-store`](#empty-store) - Delete all blobs in a Blob store

In a linked project with a connected Blob store, the CLI authenticates using OIDC by default: Vercel auto-populates `VERCEL_OIDC_TOKEN` and pairs it with `BLOB_STORE_ID`. If OIDC is not available, the CLI falls back to reading `BLOB_READ_WRITE_TOKEN` from your env file, or you can supply it directly with the [`--rw-token` option](#rw-token). For example, this can happen for an unlinked project, outside of Vercel, or during local development.

### list

```bash filename="terminal"
vercel blob list
```

*Using the \`vercel blob list\` command to list all files
in the Blob store.*

### put

```bash filename="terminal"
vercel blob put [path-to-file] --access private
```

*Using the \`vercel blob put\` command to upload a file to
the Blob store.*

### put-image

```bash filename="terminal"
vercel blob put-image [path-to-file-or-url] --pathname [pathname] --width [width] --access private
```

*Using the \`vercel blob put-image\` command to run an image
through Image Optimization and store
only the optimized output in the Blob store. The source can be a local file
or a public \`http(s)\` URL, which Vercel fetches and
optimizes server-side. The command prints the URL of the stored blob to
stdout, so scripts and agents can read the result back. Use
\`--json\` to print the full blob object instead.*

The transformation is controlled with the [`--width`](#width) (required), [`--quality`](#quality), and [`--format`](#format) options:

```bash filename="terminal"
vercel blob put-image https://example.com/hero.png --pathname images/hero.webp --width 512 --quality 60 --format webp --access public
```

*Fetching a remote image, converting it to a 512 pixel wide WebP, and storing
it in the Blob store.*

The command requires OIDC credentials: pass `--oidc-token` and `--store` (your Blob store ID), or set the `VERCEL_OIDC_TOKEN` and `BLOB_STORE_ID` environment variables (available in `.env.local` after `vercel env pull`). Read-write tokens are not accepted.

Each upload is billed as one [image transformation](/docs/image-optimization/limits-and-pricing#image-transformations) plus a regular blob upload at standard [Vercel Blob pricing](/docs/vercel-blob/usage-and-pricing).

> **💡 Note:** If the transformed image would be larger than the source image, the source
> image is stored unchanged. If you set `--format` and the image is not
> converted, the command prints a warning. The
> `--content-type` and `--multipart` options are
> not available: the stored content type always comes from the optimizer
> output, so use `--format` to control it, and optimized
> uploads cannot be split into parts.

### delete

> **💡 Note:** This action is permanent and cannot be undone.

```bash filename="terminal"
vercel blob delete [url-or-pathname] [--yes]
```

*Using the \`vercel blob delete\` command to delete a file
from the Blob store. In a terminal, the command asks you to confirm.
Use \`--yes\` to skip the confirmation prompt, and pass it in scripts
and CI environments.*

### copy

```bash filename="terminal"
vercel blob copy [from-url-or-pathname] [to-pathname] --access private
```

*Using the \`vercel blob copy\` command to copy a file in
the Blob store.*

### get

```bash filename="terminal"
vercel blob get [url-or-pathname] --access private
```

*Using the \`vercel blob get\` command to download a blob.
Works with both public and
private stores.
Content is printed to stdout by default, or saved to a file with
\`--output\`.*

### create-store

```bash filename="terminal"
vercel blob create-store [name] --access <access> [--region <region>] [--yes] [--environment <env>]
```

*Using the \`vercel blob create-store\` command to create a new
Blob store. The default region is set to \`iad1\` when not specified.
Use \`--yes\` to auto-connect to the linked project (defaults
to all environments). Use \`--environment\` to specify which environments
to connect (repeatable).*

### delete-store

> **💡 Note:** This action is permanent and cannot be undone.

```bash filename="terminal"
vercel blob delete-store [store-id]
```

*Using the \`vercel blob delete-store\` command to delete
a Blob store. The command always asks you to confirm, so
you must run it in an interactive terminal.*

### get-store

```bash filename="terminal"
vercel blob get-store [store-id]
```

*Using the \`vercel blob get-store\` command to get a Blob
store.*

### list-stores

```bash filename="terminal"
vercel blob list-stores [--all]
```

*Using the \`vercel blob list-stores\` command to list all
Blob stores. When run in a linked project directory, only stores connected to
that project are shown. Use \`--all\` to list all team
stores regardless of project. In a terminal, an interactive selector lets you
browse store details.*

### empty-store

> **💡 Note:** This action is permanent and cannot be undone.

```bash filename="terminal"
vercel blob empty-store [--yes]
```

*Using the \`vercel blob empty-store\` command to delete
all blobs in a Blob store. The command empties the store that
your Blob credentials point to. It does not accept a store ID
as an argument. Use \`--yes\` to skip the confirmation prompt in
CI environments.*

## Unique Options

These are options that only apply to the `vercel blob` command.

### Rw token

You can use the `--rw-token` option to specify your Blob read-write token. This is a fallback authentication method for cases where OIDC is not available such as unlinked projects, environments outside of Vercel, or local development.

```bash filename="terminal"
vercel blob put image.jpg --access private --rw-token [rw-token]
```

*Using the \`vercel blob put\` command with the
\`--rw-token\` option.*

### Limit

You can use the `--limit` option to specify the number of results to return per page when using `list`. The default value is `10` and the maximum is `1000`.

```bash filename="terminal"
vercel blob list --limit 100
```

*Using the \`vercel blob list\` command with the
\`--limit\` option.*

### Next

You can use the `--next` option to show the next page of results when using `list`. Pass the cursor that the previous page printed:

```bash filename="terminal"
vercel blob list --next [cursor-value]
```

*Using the \`vercel blob list\` command with the
\`--next\` option.*

### Prefix

You can use the `--prefix` option to filter Blobs by a specific prefix.

```bash filename="terminal"
vercel blob list --prefix images/
```

*Using the \`vercel blob list\` command with the
\`--prefix\` option.*

### Mode

You can use the `--mode` option to filter Blobs by either folded or expanded mode. The default is `expanded`.

```bash filename="terminal"
vercel blob list --mode folded
```

*Using the \`vercel blob list\` command with the
\`--mode\` option.*

### Add Random Suffix

You can use the `--add-random-suffix` option to add a random suffix to the file name when using `put`, `put-image`, or `copy`.

```bash filename="terminal"
vercel blob put image.jpg --access private --add-random-suffix
```

*Using the \`vercel blob put\` command with the
\`--add-random-suffix\` option.*

### Pathname

You can use the `--pathname` option to specify the pathname to upload the file to. For `put`, the default is the filename. For `put-image`, this option is required: the command takes a separate input (a file or URL, possibly a blob already in your store) and output, so it needs an explicit pathname for the result.

```bash filename="terminal"
vercel blob put image.jpg --access private --pathname assets/images/hero.jpg
```

*Using the \`vercel blob put\` command with the
\`--pathname\` option.*

### Width

You can use the `--width` option to set the width of the optimized image in pixels, between 1 and 8192. The aspect ratio of the source image is preserved. This option is required and only applies to the `put-image` command.

```bash filename="terminal"
vercel blob put-image photo.png --pathname images/photo.png --width 1200 --access public
```

*Using the \`vercel blob put-image\` command with the
\`--width\` option.*

### Quality

You can use the `--quality` option to set the quality of the optimized image, between 1 (lowest quality) and 100 (highest quality). The default is `75`. This option only applies to the `put-image` command.

```bash filename="terminal"
vercel blob put-image photo.png --pathname images/photo.png --width 1200 --quality 60 --access public
```

*Using the \`vercel blob put-image\` command with the
\`--quality\` option.*

### Format

You can use the `--format` option to convert the optimized image to `jpeg`, `png`, `webp`, or `avif`. The source image format is preserved when omitted. This option only applies to the `put-image` command.

```bash filename="terminal"
vercel blob put-image photo.png --pathname images/photo.webp --width 1200 --format webp --access public
```

*Using the \`vercel blob put-image\` command with the
\`--format\` option.*

### JSON

You can use the `--json` option to print the result as JSON. This option applies to the `list`, `put-image`, `signed-token`, `presign`, and `list-stores` commands. With `put-image`, the command prints the stored blob, including its `url`, `downloadUrl`, `pathname`, and `contentType`, instead of only the URL:

```bash filename="terminal"
vercel blob put-image photo.png --pathname images/photo.png --width 1200 --access public --json
```

*Using the \`vercel blob put-image\` command with the
\`--json\` option.*

### Content Type

You can use the `--content-type` option to overwrite the content-type when using `put` or `copy`. It will be inferred from the file extension if not provided.

```bash filename="terminal"
vercel blob put data.txt --access private --content-type application/json
```

*Using the \`vercel blob put\` command with the
\`--content-type\` option.*

### Cache Control Max Age

You can use the `--cache-control-max-age` option to set the `max-age` of the cache-control header directive when using `put`, `put-image`, or `copy`. The default is `2592000` (30 days).

```bash filename="terminal"
vercel blob put image.jpg --access private --cache-control-max-age 86400
```

*Using the \`vercel blob put\` command with the
\`--cache-control-max-age\` option.*

### Force

You can use the `--force` option to overwrite the file if it already exists when uploading with `put` or `put-image`. The default is `false`.

```bash filename="terminal"
vercel blob put image.jpg --access private --force
```

*Using the \`vercel blob put\` command with the
\`--force\` option.*

### Multipart

The `put` command uploads the file in multiple small chunks for performance and reliability. This is the default, so you do not need to pass `--multipart`. To upload the file in a single request instead, use the `--no-multipart` option:

```bash filename="terminal"
vercel blob put image.jpg --access private --no-multipart
```

*Using the \`vercel blob put\` command with the
\`--no-multipart\` option.*

### Region

You can use the `--region` option to specify the region where your Blob store should be created. The default is `iad1`. This option is only applicable when using the `create-store` command.

```bash filename="terminal"
vercel blob create-store my-store --access private --region sfo1
```

*Using the \`vercel blob create-store\` command with the \`--region\` option.*

### Access

The `--access` option is required and specifies whether the store or blob should use [public](/docs/vercel-blob/public-storage) or [private](/docs/vercel-blob/private-storage) storage. This option applies to the `put`, `put-image`, `copy`, `get`, and `create-store` commands.

```bash filename="terminal"
vercel blob put image.jpg --access private
```

*Using the \`vercel blob put\` command with the
\`--access\` option.*

### Output

You can use the `--output` option to save the blob content to a file instead of printing it to stdout. This option only applies to the `get` command.

```bash filename="terminal"
vercel blob get image.jpg --access private --output ./local-image.jpg
```

*Using the \`vercel blob get\` command with the
\`--output\` option.*

### If Match

You can use the `--if-match` option to only perform the operation if the blob's ETag matches the provided value. This option applies to the `put`, `delete`, and `copy` commands. With `put`, the upload replaces the existing blob only if its ETag matches:

```bash filename="terminal"
vercel blob put image.jpg --access private --if-match "etag-value"
```

*Using the \`vercel blob put\` command with the
\`--if-match\` option.*

### If None Match

You can use the `--if-none-match` option to only return content if the blob's ETag does not match the provided value. If unchanged, the server returns a 304 response. This option applies to the `get` command.

```bash filename="terminal"
vercel blob get image.jpg --access private --if-none-match "etag-value"
```

*Using the \`vercel blob get\` command with the
\`--if-none-match\` option.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel blob` command:

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
