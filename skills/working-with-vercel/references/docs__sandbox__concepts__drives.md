---
title: Drives
product: vercel
url: /docs/sandbox/concepts/drives
canonical_url: "https://vercel.com/docs/sandbox/concepts/drives"
last_updated: 2026-09-15
type: conceptual
prerequisites:
  - /docs/sandbox/concepts
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/snapshots
  - /docs/sandbox/concepts/regions
  - /docs/sandbox/pricing
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/cli-reference
summary: Persistent storage that can be mounted into sandboxes and shared across runs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/concepts/drives.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "e65d62cdded2b68d97897aa857851d09352af9cb4e89d01bc6cee00f2133a872"
---

# Drives

> **🔒 Permissions Required**: Drives (Beta)

Drives provide persistent storage that you mount into a sandbox as a working directory. Your agent can generate code, download dependencies, and build up context in that directory, keeping its progress across sessions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Drives](https://vercel.com/kb/guide/vercel-drives?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related) — Learn how Vercel Drives provide persistent storage for Vercel Sandboxes, and how to create, mount, list, and delete a dr
- [Drives for Vercel Sandbox in Private Beta](https://vercel.com/changelog/drives-for-vercel-sandbox-in-private-beta?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related)
- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [Compute that takes any shape](https://vercel.com/blog/fluid-compute-takes-any-shape?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related)
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [List drives](https://vercel.com/docs/rest-api/sandboxes/list-drives?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related) — GET /v2/sandboxes/drives — Retrieves a paginated list of drives belonging to a specific project. Drives are in private b
- [Delete a drive](https://vercel.com/docs/rest-api/sandboxes/delete-a-drive?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related) — DELETE /v2/sandboxes/drives/{name} — Deletes a drive by project and name. Attached drives cannot be deleted. Stop or rep

Full cross-link map for this page: [/docs/sandbox/concepts/drives.graph.md](/docs/sandbox/concepts/drives.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Files written to a drive persist after the sandbox stops. Mount the same drive in a later run to pick up where you left off, even when starting from a different sandbox environment. You can mount up to four drives in a sandbox, each at its own path alongside the sandbox's own filesystem.

## When to use drives vs snapshots

A [sandbox snapshot](/docs/sandbox/concepts/snapshots) captures a sandbox's filesystem at a point in time, including installed tools and project files. Use it to create or resume a sandbox from that saved environment. Sandboxes created from the same snapshot each get an independent copy of the filesystem.

Use a drive when you want a directory of files to persist independently of that environment. You mount the drive as an additional directory and keep updating its contents across sandbox runs. Drives are also useful for caching dependencies and build artifacts so later runs can reuse them.

You can use both together. For example, start a sandbox from a snapshot with your tools installed, then mount a drive for your project files and cached dependencies. This lets you reuse the working files with a different starting environment later.

Drives also support [read-only snapshots](#snapshots) for sharing a point-in-time view of a drive with multiple sandboxes. These are separate from the sandbox snapshots compared below.

| Aspect                 | Drive                                                          | Snapshot                                                      |
| ---------------------- | -------------------------------------------------------------- | ------------------------------------------------------------- |
| Storage type           | Single directory mounted on a sandbox                          | Full sandbox filesystem                                       |
| Sharing                | Shared storage across sandboxes                                | Independent copy per sandbox, changes are not shared          |
| Read/write access      | One read-write mount, many read-only mounts via snapshots      | Read-write filesystem for each sandbox                        |
| Read/Write performance | NVMe speed writes and cache hit reads, slower cache miss reads | NVMe speed reads and writes                                   |
| Storage size           | 1 TiB by default (1 GiB for Hobby). 16 TiB maximum quota, higher by request      | 64 GB (filesystem size)                                       |
| Expiration             | Persists until manually deleted                                | Expires after 30 days by default, can be extended to infinity |
| Use cases              | Agent output, caching, shared data                             | Agent state, temporary data, base filesystem                  |
| Price                  | $0.05/GB-month storage, plus reads and writes                  | $0.08/GB-month                                                |

## Common patterns

- Agent workspace: store an agent workspace that persists across sandbox runs, building context over time.
- Shared cache: cache dependencies, build artifacts, or other large data.
- Pre-seeding data: pre-seed a drive with data, then spin up compute on demand when needed.

### Example: a shared dependency cache

You run an agent that installs the same 10 GB of dependencies on every sandbox. With a snapshot, each sandbox gets its own copy, reinstalling and storing them separately every time. With a drive, they all read from one shared copy that persists across runs.

```ts filename="index.ts"
import { Sandbox, Drive } from '@vercel/sandbox';

const cache = await Drive.getOrCreate({ name: 'shared-deps' });

// One sandbox populates the cache (single read-write mount)
const writer = await Sandbox.create({
  mounts: { '/cache': cache },
});
await writer.runCommand('pnpm', ['install', '--store-dir', '/cache']);
await writer.stop();

// Later sandboxes read the same cache without reinstalling
const sandbox = await Sandbox.create({
  mounts: { '/cache': cache.snapshot() },
});
```

A snapshot copies the entire filesystem per sandbox. A drive is one directory that many sandboxes share, so there is one copy to update and every sandbox reads from it.

## Usage

### Creating or retrieving a drive

Create a drive before mounting it into a sandbox. Drive names are unique within a Vercel project.

**TypeScript**

```ts filename="index.ts"
import { Drive } from '@vercel/sandbox';

const drive = await Drive.getOrCreate({
  name: 'workspace-cache',
  maxSize: 200 * 1024 * 1024 * 1024, // 200 GiB
  region: 'sfo1',
});
```

If you omit `maxSize`, the drive defaults to 1 TiB (1 GiB for Hobby). Set `maxSize` to specify the maximum drive size in bytes, up to the 16 TiB quota. [Contact Vercel Support](/help) to request a quota above 16 TiB.

Drives are created in `iad1` by default. Set `region` to store the drive in another [region](/docs/sandbox/concepts/regions#regions-and-drives).

**CLI**

```bash filename="Terminal"
sandbox drives get-or-create workspace-cache
```

If you omit `--max-size`, the drive defaults to 1 TiB (1 GiB for Hobby). Set `--max-size` to specify the maximum drive size in bytes, up to the 16 TiB quota:

```bash filename="Terminal"
sandbox drives get-or-create workspace-cache --max-size 214748364800
```

[Contact Vercel Support](/help) to request a quota above 16 TiB.

Drives are created in `iad1` by default. Set `--region` to store the drive in another [region](/docs/sandbox/concepts/regions#regions-and-drives):

```bash filename="Terminal"
sandbox drives get-or-create workspace-cache --region sfo1
```

A drive's region can't change after creation. Requesting an existing drive with a different region or maximum size than it was created with fails with a `conflict` error.

### Mounting a drive

Mount a drive by passing the drive name and mount path when creating a sandbox. The sandbox must run in the same [region](/docs/sandbox/concepts/regions#regions-and-drives) as the drive. Mount paths must be absolute and cannot overlap with each other.

Drives are mounted as read-write by default. Only one sandbox at a time can mount a given drive as read-write: use [snapshots](#snapshots) for shared access.

**TypeScript**

```ts filename="index.ts"
import { Sandbox, Drive } from '@vercel/sandbox';

const drive = await Drive.getOrCreate({ name: 'workspace-cache' });

// Mount as read-write once
const sandbox = await Sandbox.create({
  name: 'my-sandbox',
  mounts: {
    '/data': drive
  },
});
```

**CLI**

Use `--mount` with the format `drive:/path[:read-write|snapshot]`:

```bash filename="Terminal"
sandbox create --name my-sandbox --mount workspace-cache:/data
```

#### Snapshots

You can also mount a drive by taking a point-in-time, read-only snapshot of it. Snapshots allow multiple sandboxes to mount the same drive concurrently:

**TypeScript**

```ts filename="index.ts"
import { Sandbox, Drive } from '@vercel/sandbox';

const drive = await Drive.getOrCreate({ name: 'shared' });

// Mount many snapshots of the same drive
const firstReader = await Sandbox.create({
  name: 'reader-1',
  mounts: {
    '/data': drive.snapshot()
  },
});
const secondReader = await Sandbox.create({
  name: 'reader-2',
  mounts: {
    '/data': drive.snapshot()
  },
});
```

**CLI**

Use `--mount` with the format `drive:/path[:read-write|snapshot]`:

```bash filename="Terminal"
sandbox create --name reader-1 --mount shared:/data:snapshot
sandbox create --name reader-2 --mount shared:/data:snapshot
```

### Listing drives

List drives to view the currently attached sandboxes (if any) and metadata such as creation date and size.

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

**CLI**

```bash filename="Terminal"
sandbox drives ls
sandbox drives ls --name-prefix workspace --limit 10
```

### Deleting a drive

Deleting a drive permanently removes all data stored in the drive. A drive cannot be deleted if it is currently attached to a running sandbox.

**TypeScript**

```ts filename="index.ts"
import { Drive } from '@vercel/sandbox';

const drive = await Drive.getOrCreate({ name: 'workspace-cache' });
await drive.delete();
```

**CLI**

```bash filename="Terminal"
sandbox drives rm workspace-cache
```

## Limits

- A sandbox can mount up to 4 drives per run
- A drive defaults to 1 TiB when you do not set a size (1 GiB for Hobby). The maximum quota is 16 TiB per drive. [Contact Vercel Support](/help) to request a quota above 16 TiB
- A drive is stored in a single [region](/docs/sandbox/concepts/regions). A sandbox that mounts a drive must run in the same region, and can't have [failover regions](/docs/sandbox/concepts/regions#failover-regions)

## Pricing

Drives are billed on three metrics: storage, reads, and writes. Storage is measured hourly on the logical used size in GB of each drive. Reads and writes measure the logical read and write usage in GB of each drive.

See [Sandbox pricing](/docs/sandbox/pricing#drive-storage) for the rates in each region and the Hobby allotments.

## Next steps

- [Persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes): Learn how persistent sandboxes automatically save and restore state.
- [Snapshots](/docs/sandbox/concepts/snapshots): Save and restore a full sandbox filesystem.
- [CLI Reference](/docs/sandbox/cli-reference): Command reference for the Sandbox CLI.
- [JS SDK Reference](/docs/sandbox/sdk-reference): Full API documentation for the JavaScript SDK.


---

[View full sitemap](/docs/sitemap)
