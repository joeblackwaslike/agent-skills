---
title: Drives
product: vercel
url: /docs/sandbox/concepts/drives
canonical_url: "https://vercel.com/docs/sandbox/concepts/drives"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/sandbox/concepts
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/snapshots
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/cli-reference
  - /docs/sandbox/sdk-reference
summary: Learn about drives on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/concepts/drives.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "bbc68c4e58274c9d436f64e7b503ffe0b276901c85a1947c52b54d3fa7cf3fa8"
---

# Drives

> **🔒 Permissions Required**: Drives

Drives provide persistent storage that can be mounted into sandboxes. Your agent runs in a sandbox, generates code, downloads dependencies, builds up context. Drives let your agent persist that context across sessions. You can mount up to 4 drives into a sandbox, with up to 1 TiB of storage per drive.

## When to use drives vs snapshots

Depending on your use case, you may want to use a drive or a [snapshot](/docs/sandbox/concepts/snapshots) to persist and restore state in a sandbox. You can also use a combination of both to store separate types of data.

Drives are ideal for caching purposes and storing large amounts of data. Snapshots represent a full sandbox filesystem and provide consistent NVMe read/write performance.

| Aspect                 | Drive                                                          | Snapshot                                                      |
| ---------------------- | -------------------------------------------------------------- | ------------------------------------------------------------- |
| Storage type           | Single directory mounted on a sandbox                          | Full sandbox filesystem                                       |
| Read/Write performance | NVMe speed writes and cache hit reads, slower cache miss reads | NVMe speed reads and writes                                   |
| Storage size           | Up to 1 TiB per drive                                          | 32 GB (filesystem size)                                       |
| Expiration             | Persists until manually deleted                                | Expires after 30 days by default, can be extended to infinity |
| Use cases              | Agent output, caching, shared data                             | Agent state, temporary data, base filesystem                  |
| Price                  | Free during private beta                                       | $0.08/GB-month                                                |

## Common patterns

- Agent workspace: store an agent workspace that persists across sandbox runs, building context over time.
- Shared cache: cache dependencies, build artifacts, or other large data.
- Pre-seeding data: pre-seed a drive with data, then spin up compute on demand when needed.

## Usage

Once you are added to the [private beta](https://vercel.com/changelog/drives-for-vercel-sandbox-in-private-beta), install the beta version of the `@vercel/sandbox` SDK:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i @vercel/sandbox@beta
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i @vercel/sandbox@beta
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i @vercel/sandbox@beta
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i @vercel/sandbox@beta
    ```
  </Code>
</CodeBlock>

### Creating or retrieving a drive

Create a drive before mounting it into a sandbox. Drive names are unique within a Vercel project.

### Mounting a drive in a sandbox

Mount a drive by passing the drive name and mount path when creating a sandbox. Mount paths must be absolute and cannot overlap with each other.

Drives can be mounted in `read-write` or `read-only` mode. By default, drives are mounted in `read-write` mode.

> **⚠️ Warning:** Drives are currently single reader, single writer. Support for multiple readers is coming soon.

### Listing drives

List drives to view the currently attached sandboxes (if any) and metadata such as creation date and size.

### Deleting a drive

Deleting a drive permanently removes all data stored in the drive. A drive cannot be deleted if it is currently attached to a running sandbox.

## Limits

- A sandbox can mount up to 4 drives per run
- A drive has a maximum storage size of 100 GiB by default, and can be configured up to 1 TiB
- Drives are single reader, single writer. Support for multiple readers is coming soon
- We recommend using drives for caching and other non-critical use cases during the private beta period.

## Pricing

While in private beta, drives are free to use.

## Next steps

- [Persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes): Learn how persistent sandboxes automatically save and restore state.
- [Snapshots](/docs/sandbox/concepts/snapshots): Save and restore a full sandbox filesystem.
- [CLI Reference](/docs/sandbox/cli-reference): Command reference for the Sandbox CLI.
- [JS SDK Reference](/docs/sandbox/sdk-reference): Full API documentation for the JavaScript SDK.


---

[View full sitemap](/docs/sitemap)
