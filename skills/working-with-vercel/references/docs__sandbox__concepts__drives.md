---
title: Drives
product: vercel
url: /docs/sandbox/concepts/drives
canonical_url: "https://vercel.com/docs/sandbox/concepts/drives"
last_updated: 2026-09-21
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
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "57a25e98d27fde0fd44d1c65052522710ed1710af8649f51e4c25e8da0b856df"
---

# Drives

> **Availability**: Drives (Public Beta) are available on Enterprise and Pro and Hobby plans

Drives provide persistent storage that you mount into a sandbox as a working directory. Your agent can generate code, download dependencies, and build up context in that directory, keeping its progress across sessions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Drives](https://vercel.com/kb/guide/vercel-drives?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related) — Learn how Vercel Drives provide persistent storage for Vercel Sandboxes, and how to create, mount, list, and delete a dr
- [Drives for Vercel Sandbox are now in public beta](https://vercel.com/changelog/drives-for-vercel-sandbox-are-now-in-public-beta?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related)
- [Drives for Vercel Sandbox in Private Beta](https://vercel.com/changelog/drives-for-vercel-sandbox-in-private-beta?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related)
- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [Compute that takes any shape](https://vercel.com/blog/fluid-compute-takes-any-shape?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related)
- [Working with Sandbox](https://vercel.com/docs/sandbox/working-with-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related) — Task-oriented examples for common Vercel Sandbox operations in TypeScript and Python.
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [List drives](https://vercel.com/docs/rest-api/sandboxes/list-drives?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=related) — GET /v2/sandboxes/drives — Retrieves a paginated list of drives belonging to a specific project.

Full cross-link map for this page: [/docs/sandbox/concepts/drives.graph.md](/docs/sandbox/concepts/drives.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fdrives&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Files written to a drive persist after the sandbox stops. Mount the same drive in a later run to pick up where you left off, even when starting from a different sandbox environment. You can mount up to four drives in a sandbox, each at its own path alongside the sandbox's own filesystem.

You currently need to mount a drive into a sandbox to read and write files using the sandbox's drive mount path.

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

**index.ts**

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

**main.py**

```py filename="main.py"
from vercel import sandbox

cache, created = await sandbox.get_or_create_drive(name="shared-deps")

# One sandbox populates the cache (single read-write mount)
writer = await sandbox.create_sandbox(mounts={"/cache": cache})
await writer.run_process(
    "pnpm",
    ["install", "--store-dir", "/cache"],
    check=True,
)
await writer.stop()

# Later sandboxes read the same cache without reinstalling
reader = await sandbox.create_sandbox(
    mounts={"/cache": cache.snapshot()},
)
```

A snapshot copies the entire filesystem per sandbox. A drive is one directory that many sandboxes share, so there is one copy to update and every sandbox reads from it.

## Usage

### Creating or retrieving a drive

Create a drive before mounting it into a sandbox. Drive names are unique within a Vercel project.

**index.ts**

```ts filename="index.ts"
import { Drive } from '@vercel/sandbox';

const drive = await Drive.getOrCreate({
  name: 'workspace-cache',
  maxSize: 200 * 1024 * 1024 * 1024, // 200 GiB
  region: 'sfo1',
});
```

**main.py**

```py filename="main.py"
from vercel import sandbox

drive, created = await sandbox.get_or_create_drive(
    name="workspace-cache",
    max_size_bytes=200 * 1024 * 1024 * 1024,  # 200 GiB
    region="sfo1",
)
```

**terminal.sh**

```bash filename="terminal.sh"
sandbox drives get-or-create workspace-cache \
  --max-size 214748364800 \
  --region sfo1
```

If you omit the maximum size, the drive defaults to 1 TiB (1 GiB for Hobby). Set `maxSize` in TypeScript, `max_size_bytes` in Python, or `--max-size` in the CLI to specify the maximum drive size in bytes. The size must be a multiple of 4096 bytes. The default maximum quota is 16 TiB.

Drives are created in `iad1` by default. Set `region` in the SDKs or `--region` in the CLI to store the drive in another [region](/docs/sandbox/concepts/regions#regions-and-drives).

A drive's region can't change after creation. Requesting an existing drive with a different region or maximum size than it was created with fails with a `conflict` error.

### Mounting a drive

Mount a drive by passing the drive name and mount path when creating a sandbox. The sandbox's main [region](/docs/sandbox/concepts/regions#regions-and-drives) must match the drive's region. Mount paths must be absolute and cannot overlap with each other.

Drives are mounted as read-write by default. Only one sandbox at a time can mount a given drive as read-write: use [snapshots](#snapshots) for shared access.

**index.ts**

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

**main.py**

```py filename="main.py"
from vercel import sandbox

drive, created = await sandbox.get_or_create_drive(name="workspace-cache")

# Mount as read-write once
box = await sandbox.create_sandbox(
    name="my-sandbox",
    mounts={"/data": drive},
)
```

**terminal.sh**

```bash filename="terminal.sh"
sandbox create --name my-sandbox --mount workspace-cache:/data
```

In the CLI, `--mount` uses the format `drive:/path[:read-write|snapshot]`.

#### Snapshots

You can also mount a drive by taking a point-in-time, read-only snapshot of it. Snapshots allow multiple sandboxes to mount the same drive concurrently. Each snapshot mount reflects the drive as it was at the moment you mounted it, and does not include any writes made to the drive thereafter. Mount a new snapshot to pick up more recent writes.

> **💡 Note:** A drive must be mounted read-write and written to at least once before you can mount a snapshot of it. Mounting a snapshot of a drive that has never been written to fails with a `drive_not_initialized` error.

**index.ts**

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

**main.py**

```py filename="main.py"
from vercel import sandbox

drive, created = await sandbox.get_or_create_drive(name="shared")

# Mount many snapshots of the same drive
first_reader = await sandbox.create_sandbox(
    name="reader-1",
    mounts={"/data": drive.snapshot()},
)
second_reader = await sandbox.create_sandbox(
    name="reader-2",
    mounts={"/data": drive.snapshot()},
)
```

**terminal.sh**

```bash filename="terminal.sh"
sandbox create --name reader-1 --mount shared:/data:snapshot
sandbox create --name reader-2 --mount shared:/data:snapshot
```

In the CLI, `--mount` uses the format `drive:/path[:read-write|snapshot]`.

### Forking a drive

> **Availability**: Drive forks (Private Beta) are available to Enterprise and Pro plans

You can fork an existing drive into a new drive, copying the drive's data and inheriting its region and maximum size. The fork belongs to the same project. Writes to a forked drive do not change the original drive, allowing you to safely edit a copy while preserving the source data. This can be useful to start a fleet of agents, each working independently on their own read-write copy forked from a base drive.

> **💡 Note:** A drive must be mounted read-write and written to at least once before you can create a fork from it. Creating a fork of a drive that has never been written to fails with a `drive_not_initialized` error.

**index.ts**

```ts filename="index.ts"
import { Drive, Sandbox } from '@vercel/sandbox';

const drive = await Drive.get({ name: 'workspace-cache' });
const forkedDrive = await drive.fork({ name: 'workspace-cache-fork' });

const sandbox = await Sandbox.create({
  region: forkedDrive.region,
  mounts: { '/data': forkedDrive },
});
```

**terminal.sh**

```bash filename="terminal.sh"
sandbox drives fork workspace-cache workspace-cache-fork
```

You can mount a forked drive like any other drive. A fork inherit its parent drive data but stores its own changes independently. Use `parentDriveId` to identify the source drive and `rootDriveId` to identify the original drive in a chain of forks.

### Listing drives

List drives to view the currently attached sandboxes (if any) and metadata such as creation date and size.

**index.ts**

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

**main.py**

```py filename="main.py"
from vercel import sandbox
from vercel.sandbox import DriveQueryByName

query = DriveQueryByName(
    name_prefix="workspace",
    sort_order="asc",
)

async for drive in sandbox.query_drives(query=query, page_size=10):
    print(drive.name, drive.current_sandbox_name or "detached")
```

**terminal.sh**

```bash filename="terminal.sh"
sandbox drives ls
sandbox drives ls --name-prefix workspace --limit 10
```

### Deleting a drive

Deleting a drive permanently removes all data stored in the drive. A drive cannot be deleted if it is currently attached to a running sandbox.

**index.ts**

```ts filename="index.ts"
import { Drive } from '@vercel/sandbox';

const drive = await Drive.getOrCreate({ name: 'workspace-cache' });
await drive.delete();
```

**main.py**

```py filename="main.py"
from vercel import sandbox

drive, created = await sandbox.get_or_create_drive(name="workspace-cache")
await drive.delete()
```

**terminal.sh**

```bash filename="terminal.sh"
sandbox drives rm workspace-cache
```

## Limits

- A sandbox can mount up to 4 drives per run
- A drive defaults to 1 TiB when you do not set a size (1 GiB for Hobby). The default maximum quota is 16 TiB
- A drive is stored in a single [region](/docs/sandbox/concepts/regions). A sandbox's main region must match a drive's region.

## Pricing

Drives are billed on three metrics: storage, reads, and writes. Storage is measured hourly on the logical used size in GB of each drive. Reads and writes measure the logical read and write usage in GB of each drive.

See [Sandbox pricing](/docs/sandbox/pricing#drive-storage) for the rates in each region and the Hobby allotments.

## Next steps

- [Persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes): Learn how persistent sandboxes automatically save and restore state.
- [Snapshots](/docs/sandbox/concepts/snapshots): Save and restore a full sandbox filesystem.
- [CLI Reference](/docs/sandbox/cli-reference): Command reference for the Sandbox CLI.
- [JS SDK Reference](/docs/sandbox/sdk-reference): Full API documentation for the JavaScript SDK.
- [Python SDK Reference](/docs/sandbox/python-sdk-reference): Full API documentation for the Python SDK.


---

[View full sitemap](/docs/sitemap)
