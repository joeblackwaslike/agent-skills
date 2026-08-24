---
title: Drives
product: vercel
url: /docs/sandbox/concepts/drives
canonical_url: "https://vercel.com/docs/sandbox/concepts/drives"
last_updated: 2026-07-15
type: conceptual
prerequisites:
  - /docs/sandbox/concepts
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/snapshots
  - /docs/sandbox/concepts/regions
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/cli-reference
  - /docs/sandbox/sdk-reference
summary: Persistent storage that can be mounted into sandboxes and shared across runs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/concepts/drives.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "c713e5189673d9de5b27ba6bc1749c1b74b0eb66efaf87a545f3cf238679eb1f"
---

# Drives

> **🔒 Permissions Required**: Drives


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Drives](https://vercel.com/kb/guide/vercel-drives?from=related) — Learn how Vercel Drives provide persistent storage for Vercel Sandboxes, and how to create, mount, list, and delete a dr
- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence?from=related) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [How to use snapshots for faster sandbox startup](https://vercel.com/kb/guide/how-to-use-snapshots-for-faster-sandbox-startup?from=related) — Learn how to save sandbox state with snapshots and skip installation on future runs.
- [List drives](https://vercel.com/docs/rest-api/sandboxes/list-drives?from=related)
- [Get or create a drive](https://vercel.com/docs/rest-api/sandboxes/get-or-create-a-drive?from=related)
- [Delete a drive](https://vercel.com/docs/rest-api/sandboxes/delete-a-drive?from=related)
- [sitemap.md](https://vercel.com/docs/sitemap.md?from=related) — Learn about sitemap.md on Vercel.

Full cross-link map for this page: [/docs/sandbox/concepts/drives.graph.md](/docs/sandbox/concepts/drives.graph.md)
<!-- /docsgraph:related -->

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

A drive's region can't change after creation. Requesting an existing drive with a different region or maximum size than it was created with fails with a `conflict` error.

### Mounting a drive in a sandbox

Mount a drive by passing the drive name and mount path when creating a sandbox. The sandbox must run in the same [region](/docs/sandbox/concepts/regions#regions-and-drives) as the drive. Mount paths must be absolute and cannot overlap with each other.

Drives can be mounted in `read-write` or `read-only` mode. By default, drives are mounted in `read-write` mode.

> **💡 Note:** Drives are currently single reader, single writer. Support for multiple readers is coming soon.

### Listing drives

List drives to view the currently attached sandboxes (if any) and metadata such as creation date and size.

### Deleting a drive

Deleting a drive permanently removes all data stored in the drive. A drive cannot be deleted if it is currently attached to a running sandbox.

## Limits

- A sandbox can mount up to 4 drives per run
- A drive has a maximum storage size of 100 GiB by default, and can be configured up to 1 TiB
- A drive is stored in a single [region](/docs/sandbox/concepts/regions). A sandbox that mounts a drive must run in the same region, and can't have [failover regions](/docs/sandbox/concepts/regions#failover-regions)
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
