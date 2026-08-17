---
title: vercel blob
product: vercel
url: /docs/cli/blob
canonical_url: "https://vercel.com/docs/cli/blob"
last_updated: 2026-07-15
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/vercel-blob
  - /docs/vercel-blob/public-storage
  - /docs/vercel-blob/private-storage
  - /docs/vercel-blob/using-blob-sdk
  - /docs/image-optimization/limits-and-pricing
summary: Learn how to interact with Vercel Blob storage using the vercel blob CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/blob.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "770b71dd1fe426b82697c46df26fc8edd9354ed5af316d293d8582da8f0ddf86"
---

# vercel blob

The `vercel blob` command is used to interact with [Vercel Blob](/docs/vercel-blob) storage, providing functionality to upload, download, list, delete, and copy files in [public](/docs/vercel-blob/public-storage) and [private](/docs/vercel-blob/private-storage) stores, store optimized images, and manage Blob stores.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Blob](https://vercel.com/kb/guide/vercel-blob?from=related) — Vercel Blob stores and serves files of any size through Vercel's global network. Learn how Blob works, what it costs, an
- [Manage Vercel Blob Storage](https://vercel.com/docs/vercel-blob/manage-blob-storage?from=related) — Create blob stores, upload files, list contents, and manage storage using the CLI.
- [Examples](https://vercel.com/docs/vercel-blob/examples?from=related) — Examples on how to use Vercel Blob in your applications
- [Overview](https://vercel.com/docs/storage?from=related) — Store large files and global configuration with Vercel's storage products.
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [Create a Blob store](https://vercel.com/docs/rest-api/storage/create-a-blob-store?from=related)

Full cross-link map for this page: [/docs/cli/blob.graph.md](/docs/cli/blob.graph.md)
<!-- /docsgraph:related -->

For more information about Vercel Blob, see the [Vercel Blob documentation](/docs/vercel-blob) and [Vercel Blob SDK reference](/docs/vercel-blob/using-blob-sdk).

## Usage

The `vercel blob` command supports the following operations:

- [`list`](#list-ls) - List all files in the Blob store
- [`put`](#put) - Upload a file to the Blob store
- [`put-image`](#put-image) - Optimize an image and store the result in the Blob store
- [`del`](#del) - Delete a file from the Blob store
- [`copy`](#copy-cp) - Copy a file in the Blob store
- [`get`](#get) - Download a blob from the Blob store
- [`create-store`](#create-store) - Create a new Blob store
- [`delete-store`](#delete-store) - Delete a Blob store
- [`get-store`](#get-store) - Get a Blob store
- [`list-stores`](#list-stores-ls-stores) - List all Blob stores
- [`empty-store`](#empty-store) - Delete all blobs in a Blob store

In a linked project with a connected Blob store, the CLI authenticates using OIDC by default: Vercel auto-populates `VERCEL_OIDC_TOKEN` and pairs it with `BLOB_STORE_ID`. If OIDC is not available, the CLI falls back to reading `BLOB_READ_WRITE_TOKEN` from your env file, or you can supply it directly with the [`--rw-token` option](#rw-token). For example, this can happen for an unlinked project, outside of Vercel, or during local development.

### list (ls)

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

The command requires OIDC credentials: pass `--oidc-token` and `--store-id`, or set the `VERCEL_OIDC_TOKEN` and `BLOB_STORE_ID` environment variables (available in `.env.local` after `vercel env pull`). Read-write tokens are not accepted.

Each upload is billed as one [image transformation](/docs/image-optimization/limits-and-pricing#image-transformations) plus a regular blob upload at standard [Vercel Blob pricing](/docs/vercel-blob/usage-and-pricing).

> **💡 Note:** If the transformed image would be larger than the source image, the source
> image is stored unchanged and the command prints a warning. The
> `--content-type` and `--multipart` options are
> not available: the stored content type always comes from the optimizer
> output, so use `--format` to control it, and optimized
> uploads cannot be split into parts.

### del

> **💡 Note:** This action is permanent and cannot be undone.

```bash filename="terminal"
vercel blob del [url-or-pathname]
```

*Using the \`vercel blob del\` command to delete a file
from the Blob store.*

### copy (cp)

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
vercel blob delete-store [store-id] [--yes]
```

*Using the \`vercel blob delete-store\` command to delete
a Blob store. Use \`--yes\` to skip the confirmation
prompt in CI environments.*

### get-store

```bash filename="terminal"
vercel blob get-store [store-id]
```

*Using the \`vercel blob get-store\` command to get a Blob
store.*

### list-stores (ls-stores)

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
vercel blob empty-store [store-id] [--yes]
```

*Using the \`vercel blob empty-store\` command to delete
all blobs in a Blob store. Use \`--yes\` to skip the
confirmation prompt in CI environments.*

## Unique Options

These are options that only apply to the `vercel blob` command.

### Rw token

You can use the `--rw-token` option to specify your Blob read-write token. This is a fallback authentication method for cases where OIDC is not available such as unlinked projects, environments outside of Vercel, or local development.

```bash filename="terminal"
vercel blob put image.jpg --rw-token [rw-token]
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

### Cursor

You can use the `--cursor` option to specify the cursor from a previous page to start listing from.

```bash filename="terminal"
vercel blob list --cursor [cursor-value]
```

*Using the \`vercel blob list\` command with the
\`--cursor\` option.*

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
vercel blob put image.jpg --add-random-suffix
```

*Using the \`vercel blob put\` command with the
\`--add-random-suffix\` option.*

### Pathname

You can use the `--pathname` option to specify the pathname to upload the file to. For `put`, the default is the filename. For `put-image`, this option is required: the command takes a separate input (a file or URL, possibly a blob already in your store) and output, so it needs an explicit pathname for the result.

```bash filename="terminal"
vercel blob put image.jpg --pathname assets/images/hero.jpg
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

You can use the `--json` option to print the stored blob as JSON, including its `url`, `downloadUrl`, `pathname`, and `contentType`, instead of only the URL. This option only applies to the `put-image` command.

```bash filename="terminal"
vercel blob put-image photo.png --pathname images/photo.png --width 1200 --access public --json
```

*Using the \`vercel blob put-image\` command with the
\`--json\` option.*

### Content Type

You can use the `--content-type` option to overwrite the content-type when using `put` or `copy`. It will be inferred from the file extension if not provided.

```bash filename="terminal"
vercel blob put data.txt --content-type application/json
```

*Using the \`vercel blob put\` command with the
\`--content-type\` option.*

### Cache Control Max Age

You can use the `--cache-control-max-age` option to set the `max-age` of the cache-control header directive when using `put`, `put-image`, or `copy`. The default is `2592000` (30 days).

```bash filename="terminal"
vercel blob put image.jpg --cache-control-max-age 86400
```

*Using the \`vercel blob put\` command with the
\`--cache-control-max-age\` option.*

### Allow Overwrite

You can use the `--allow-overwrite` option to overwrite the file if it already exists when uploading with `put` or `put-image`. The default is `false`.

```bash filename="terminal"
vercel blob put image.jpg --allow-overwrite
```

*Using the \`vercel blob put\` command with the
\`--allow-overwrite\` option.*

### Multipart

You can use the `--multipart` option to upload the file in multiple small chunks for performance and reliability. The default is `true`.

```bash filename="terminal"
vercel blob put large-file.zip --multipart false
```

*Using the \`vercel blob put\` command with the
\`--multipart\` option.*

### Region

You can use the `--region` option to specify the region where your Blob store should be created. The default is `iad1`. This option is only applicable when using the `create-store` command.

```bash filename="terminal"
vercel blob create-store my-store --region sfo1
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
vercel blob get image.jpg --output ./local-image.jpg
```

*Using the \`vercel blob get\` command with the
\`--output\` option.*

### If Match

You can use the `--if-match` option to only perform the operation if the blob's ETag matches the provided value. This option applies to the `put`, `del`, and `copy` commands.

```bash filename="terminal"
vercel blob put image.jpg --if-match "etag-value"
```

*Using the \`vercel blob put\` command with the
\`--if-match\` option.*

### If None Match

You can use the `--if-none-match` option to only return content if the blob's ETag does not match the provided value. If unchanged, the server returns a 304 response. This option applies to the `get` command.

```bash filename="terminal"
vercel blob get image.jpg --if-none-match "etag-value"
```

*Using the \`vercel blob get\` command with the
\`--if-none-match\` option.*


---

[View full sitemap](/docs/sitemap)
