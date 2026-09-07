---
title: Drives
product: vercel
url: /docs/sandbox/concepts/drives
canonical_url: "https://vercel.com/docs/sandbox/concepts/drives"
last_updated: 2026-09-02
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
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "b5f4b42bfe2703b9394f5f27e1d5fb134a7de2df6061ff0ac274317c483daf8f"
---

# Drives

> **🔒 Permissions Required**: Drives

Drives provide persistent storage that can be mounted into sandboxes. Your agent runs in a sandbox, generates code, downloads dependencies, builds up context. Drives let your agent persist that context across sessions. You can mount up to 4 drives into a sandbox. Each drive defaults to 1 TiB when you do not set a size. The maximum quota is 16 TiB per drive. [Contact Vercel Support](/help) to request a quota above 16 TiB.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Drives](https://vercel.com/kb/guide/vercel-drives?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related) — Learn how Vercel Drives provide persistent storage for Vercel Sandboxes, and how to create, mount, list, and delete a dr
- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [Compute that takes any shape](https://vercel.com/blog/fluid-compute-takes-any-shape?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related)
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [List drives](https://vercel.com/docs/rest-api/sandboxes/list-drives?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related) — GET /v2/sandboxes/drives — Retrieves a paginated list of drives belonging to a specific project. Drives are in private b
- [Get or create a drive](https://vercel.com/docs/rest-api/sandboxes/get-or-create-a-drive?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related) — POST /v2/sandboxes/drives/{name} — Gets an existing drive by project and name, or creates it when it does not exist. Dri
- [Delete a drive](https://vercel.com/docs/rest-api/sandboxes/delete-a-drive?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related) — DELETE /v2/sandboxes/drives/{name} — Deletes a drive by project and name. Attached drives cannot be deleted. Stop or rep
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/sandbox/concepts/drives.graph.md](/docs/sandbox/concepts/drives.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## When to use drives vs snapshots

Depending on your use case, you may want to use a drive or a [snapshot](/docs/sandbox/concepts/snapshots) to persist and restore state in a sandbox. You can also use a combination of both to store separate types of data.

Drives are ideal for caching purposes and storing large amounts of data. Snapshots represent a full sandbox filesystem and provide consistent NVMe read/write performance.

| Aspect                 | Drive                                                          | Snapshot                                                      |
| ---------------------- | -------------------------------------------------------------- | ------------------------------------------------------------- |
| Storage type           | Single directory mounted on a sandbox                          | Full sandbox filesystem                                       |
| Read/Write performance | NVMe speed writes and cache hit reads, slower cache miss reads | NVMe speed reads and writes                                   |
| Storage size           | 1 TiB by default; 16 TiB maximum quota, higher by request      | 64 GB (filesystem size)                                       |
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

**CLI**

```bash filename="Terminal"
sandbox drives get-or-create workspace-cache
```

If you omit `--max-size`, the drive defaults to 1 TiB. Set `--max-size` to specify the maximum drive size in bytes, up to the 16 TiB quota:

```bash filename="Terminal"
sandbox drives get-or-create workspace-cache --max-size 214748364800
```

[Contact Vercel Support](/help) to request a quota above 16 TiB.

Drives are created in `iad1` by default. Set `--region` to store the drive in another [region](/docs/sandbox/concepts/regions#regions-and-drives):

```bash filename="Terminal"
sandbox drives get-or-create workspace-cache --region sfo1
```

**TypeScript**

```ts filename="index.ts"
import { Drive } from '@vercel/sandbox';

const drive = await Drive.getOrCreate({
  name: 'workspace-cache',
  maxSize: 200 * 1024 * 1024 * 1024, // 200 GiB
  region: 'sfo1',
});
```

If you omit `maxSize`, the drive defaults to 1 TiB. Set `maxSize` to specify the maximum drive size in bytes, up to the 16 TiB quota. [Contact Vercel Support](/help) to request a quota above 16 TiB.

Drives are created in `iad1` by default. Set `region` to store the drive in another [region](/docs/sandbox/concepts/regions#regions-and-drives).

A drive's region can't change after creation. Requesting an existing drive with a different region or maximum size than it was created with fails with a `conflict` error.

### Mounting a drive in a sandbox

Mount a drive by passing the drive name and mount path when creating a sandbox. The sandbox must run in the same [region](/docs/sandbox/concepts/regions#regions-and-drives) as the drive. Mount paths must be absolute and cannot overlap with each other.

Drives can be mounted in `read-write` or `read-only` mode. By default, drives are mounted in `read-write` mode.

> **💡 Note:** Drives are currently single reader, single writer. Support for multiple readers is coming soon.

**CLI**

Use `--mount` with the format `drive:/path[:read-write|read-only]`:

```bash filename="Terminal"
sandbox create --name my-sandbox --mount workspace-cache:/data # defaults to read-write
sandbox create --name my-sandbox --mount workspace-cache:/data:read-only
```

**TypeScript**

```ts filename="index.ts"
import { Sandbox, Drive } from '@vercel/sandbox';

const drive = await Drive.getOrCreate({ name: 'workspace-cache' });
const sandbox = await Sandbox.create({
  name: 'my-sandbox',
  mounts: {
    '/data': {
      drive: drive.name,
      mode: 'read-only', // optional, defaults to 'read-write'
    },
  },
});
```

### Listing drives

List drives to view the currently attached sandboxes (if any) and metadata such as creation date and size.

**CLI**

```bash filename="Terminal"
sandbox drives ls
sandbox drives ls --name-prefix workspace --limit 10
```

**TypeScript**

```ts filename="index.ts"
import { Drive } from '@vercel/sandbox';

const result = await Drive.list({
  namePrefix: 'workspace',
  sortBy: 'name',
  sortOrder: 'asc',
  limit: 10,
});

for (const drive of result.drives) {
  console.log(drive.name, drive.currentSandboxName ?? 'detached');
}
```

### Deleting a drive

Deleting a drive permanently removes all data stored in the drive. A drive cannot be deleted if it is currently attached to a running sandbox.

**CLI**

```bash filename="Terminal"
sandbox drives rm workspace-cache
```

**TypeScript**

```ts filename="index.ts"
import { Drive } from '@vercel/sandbox';

const drive = await Drive.getOrCreate({ name: 'workspace-cache' });
await drive.delete();
```

## Limits

- A sandbox can mount up to 4 drives per run
- A drive defaults to 1 TiB when you do not set a size. The maximum quota is 16 TiB per drive. [Contact Vercel Support](/help) to request a quota above 16 TiB
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
