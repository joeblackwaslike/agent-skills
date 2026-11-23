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
  - /docs/drives
  - /docs/sandbox/concepts/snapshots
  - /docs/sandbox/concepts/images
  - /docs/drives/pricing
  - /docs/sandbox/pricing
summary: Mount Vercel Drives into sandboxes for persistent storage that survives stops and is shared across runs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/concepts/drives.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "df69e049126b59b313d331e1abc5252b75099990512fdb41907cfbfa6e97db9d"
---

# Drives

Drives provide persistent storage that you mount into a sandbox as a working directory. Your agent can generate code, download dependencies, and build up context in that directory, keeping its progress across sessions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Drives for Vercel Sandbox are now in public beta](https://vercel.com/changelog/drives-for-vercel-sandbox-are-now-in-public-beta)
- [Vercel Sandbox](https://eve.dev/docs/sandbox/vercel) — Create persistent sandboxes on Vercel, from a prepared snapshot when the environment has build-time setup.
- [Drives for Vercel Sandbox in Private Beta](https://vercel.com/changelog/drives-for-vercel-sandbox-in-private-beta)
- [Vercel Drives is now generally available](https://vercel.com/changelog/vercel-drives-is-now-generally-available)
- [Vercel Drives now reads files up to 6x faster](https://vercel.com/changelog/vercel-drives-now-reads-files-up-to-6x-faster)
- [Vercel Sandbox with Drives now starts up to 2.4× faster](https://vercel.com/changelog/vercel-sandbox-with-drives-now-starts-up-to-2-4x-faster)
- [Running Durable Agents on Vercel](https://vercel.com/kb/guide/durable-ai-agents) — Design durable AI agents on Vercel with patterns for execution recovery, human approval, safe retries, deployment change
- [How to give agents persistent storage with Vercel Drives](https://vercel.com/kb/guide/persistent-storage-with-vercel-drives) — Give AI SDK and TanStack AI agents persistent storage with Vercel Drives so they can save and reuse research notes acros
- [Build a Shopify agent with AI SDK and Vercel Connect](https://vercel.com/kb/guide/shopify-agent-ai-sdk-vercel-connect) — Build a Shopify agent with AI SDK and Vercel Connect to search products, check orders, and request approval before chang
- [Agents are users, so your software needs evals](https://vercel.com/blog/agent-evals)
- [Compute that takes any shape](https://vercel.com/blog/fluid-compute-takes-any-shape)
- [Drives](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drives) — Vercel MCP tools for drives.

Full cross-link map for this page: [/docs/sandbox/concepts/drives.graph.md](/docs/sandbox/concepts/drives.graph.md)
<!-- /docsgraph:related -->

Files written to a drive persist after the sandbox stops. Mount the same drive in a later run to pick up where you left off, even when starting from a different sandbox environment. You can mount up to four drives in a sandbox, each at its own path alongside the sandbox's own filesystem.

To learn how to create and manage drives, see [Vercel Drives](/docs/drives). This page covers how to mount drives into sandboxes and how they compare to sandbox snapshots.

You currently need to mount a drive into a sandbox to read and write files using the sandbox's drive mount path.

## When to use drives vs snapshots

A [sandbox snapshot](/docs/sandbox/concepts/snapshots) captures a sandbox's filesystem at a point in time, including installed tools and project files. Use it to create or resume a sandbox from that saved environment. Sandboxes created from the same snapshot each get an independent copy of the filesystem.

Use a drive when you want a directory of files to persist independently of that environment. You mount the drive as an additional directory and keep updating its contents across sandbox runs. Drives are also useful for caching dependencies and build artifacts so later runs can reuse them.

You can use both together. For example, start a sandbox from a snapshot with your tools installed, then mount a drive for your project files and cached dependencies. This lets you reuse the working files with a different starting environment later.

Think of a snapshot as the computer you want to start, and a drive as the files you want to work on. Keep the starting environment lean. Use a [custom image](/docs/sandbox/concepts/images#custom-images) for stable setup that many sandboxes need, such as OS packages, language runtimes, package managers, agents, and common tools. Use snapshots for reusable runtime state that should be ready at startup.

Put heavy working state on drives. Cloned repositories, generated files, datasets, build output, dependency caches, logs, and agent workspace state usually belong on a drive. A drive mounts as a directory in the sandbox, and the sandbox reads and writes those files through the mount path as the workload needs them.

If a snapshot is large and rarely reused, move stable setup into a custom image and move changing project data into a drive. This keeps the boot path smaller and helps the sandbox start faster.

Drives also support [read-only snapshots](#snapshots) for sharing a point-in-time view of a drive with multiple sandboxes. These are separate from the sandbox snapshots compared below.

| Aspect                 | Drive                                                                                                    | Snapshot                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Storage type           | Single directory mounted on a sandbox                                                                    | Full sandbox filesystem                                                      |
| Sharing                | Shared storage across sandboxes                                                                          | Independent copy per sandbox, changes are not shared                         |
| Read/write access      | One read-write mount, many read-only mounts via snapshots                                                | Read-write filesystem for each sandbox                                       |
| Read/Write performance | NVMe speed writes and cache hit reads, slower cache miss reads                                           | NVMe speed reads and writes                                                  |
| Storage size           | 1 TiB by default (1 GiB for Hobby). 16 TiB maximum quota, higher by request                              | 64 GB (filesystem size)                                                      |
| Expiration             | Persists until manually deleted                                                                          | Expires after 30 days by default, can be extended to infinity                |
| Use cases              | Working files, cloned repositories, generated output, datasets, dependency caches, agent workspace state | Reusable startup environments, installed tools, small filesystem checkpoints |
| Price                  | [Regional storage, reads, and writes](/docs/drives/pricing)                                              | [Storage per GB-month](/docs/sandbox/pricing#snapshot-storage)               |

## Common patterns

- Agent workspace: store an agent workspace that persists across sandbox runs, building context over time. [Give each user of an eve agent a workspace drive](/kb/guide/vercel-drives-eve-agent) so files persist across that user's sessions.
- Shared cache: cache dependencies, build artifacts, or other large data.
- Pre-seeding data: pre-seed a drive with data, then spin up compute on demand when needed. [Share datasets across analysis sandboxes](/kb/guide/large-scale-data-analysis-vercel-sandbox-mcp#how-to-share-large-datasets-across-sandboxes-with-vercel-drives) by loading a dataset once and mounting read-only snapshots in separate query sandboxes.

### Example: a shared dependency cache

You run an agent that installs the same 10 GB of dependencies on every sandbox. With a snapshot, each sandbox gets its own copy, reinstalling and storing them separately every time. With a drive, they all read from one shared copy that persists across runs.

**index.ts**

```ts filename="index.ts"
import { Drive } from '@vercel/drives';
import { Sandbox } from '@vercel/sandbox';

const cache = await Drive.getOrCreate({ name: 'shared-deps' });

// One sandbox populates the cache (single read-write mount)
const writer = await Sandbox.create({
  region: cache.region,
  source: {
    type: 'git',
    url: 'https://github.com/vercel/ms.git',
    depth: 1,
  },
  mounts: { '/cache': cache },
});
await writer.runCommand({
  cmd: 'pnpm',
  args: ['install', '--store-dir', '/cache'],
});
await writer.stop();

// Later sandboxes read the same cache without reinstalling
const sandbox = await Sandbox.create({
  region: cache.region,
  mounts: { '/cache': cache.snapshot() },
});
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import drives, sandbox
from vercel.sandbox import GitSource

async def main() -> None:
    cache, created = await drives.get_or_create_drive(name="shared-deps")

    # One sandbox populates the cache (single read-write mount)
    writer = await sandbox.create_sandbox(
        region=cache.region,
        source=GitSource(
            url="https://github.com/vercel/ms.git",
            depth=1,
        ),
        mounts={"/cache": cache},
    )
    await writer.run_command("pnpm", ["install", "--store-dir", "/cache"], check=True)
    await writer.stop()

    # Later sandboxes read the same cache without reinstalling
    reader = await sandbox.create_sandbox(
        region=cache.region,
        mounts={"/cache": cache.snapshot()},
    )

asyncio.run(main())
```

### Mounting a drive

Mount a drive by passing the drive name and mount path when creating a sandbox. The sandbox's main [region](/docs/sandbox/concepts/regions#regions-and-drives) must match the drive's region. Mount paths must be absolute and cannot overlap with each other.

Drives are mounted as read-write by default. Only one sandbox at a time can mount a given drive as read-write: use [snapshots](#snapshots) for shared access.

**index.ts**

```ts filename="index.ts"
import { Drive } from '@vercel/drives';
import { Sandbox } from '@vercel/sandbox';

const drive = await Drive.getOrCreate({ name: 'workspace-cache' });

// Mount as read-write once
const sandbox = await Sandbox.create({
  name: 'my-sandbox',
  region: drive.region,
  mounts: {
    '/data': drive,
  },
});
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import drives, sandbox

async def main() -> None:
    drive, created = await drives.get_or_create_drive(name="workspace-cache")

    # Mount as read-write once
    box = await sandbox.create_sandbox(
        name="my-sandbox",
        region=drive.region,
        mounts={"/data": drive},
    )

asyncio.run(main())
```

**terminal.sh**

```bash filename="terminal.sh"
sandbox create --name my-sandbox --region iad1 --mount workspace-cache:/data
```

In the CLI examples, replace `iad1` with your drive's region if it differs. The `--mount` option uses the format `drive:/path[:read-write|snapshot]`.

#### Snapshots

You can also mount a drive by taking a point-in-time, read-only snapshot of it. Snapshots allow multiple sandboxes to mount the same drive concurrently. Each snapshot mount reflects the drive as it was at the moment you mounted it, and does not include any writes made to the drive thereafter. Mount a new snapshot to pick up more recent writes.

**index.ts**

```ts filename="index.ts"
import { Drive } from '@vercel/drives';
import { Sandbox } from '@vercel/sandbox';

const drive = await Drive.getOrCreate({ name: 'shared' });

// Mount many snapshots of the same drive
const firstReader = await Sandbox.create({
  name: 'reader-1',
  region: drive.region,
  mounts: {
    '/data': drive.snapshot(),
  },
});
const secondReader = await Sandbox.create({
  name: 'reader-2',
  region: drive.region,
  mounts: {
    '/data': drive.snapshot(),
  },
});
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import drives, sandbox

async def main() -> None:
    drive, created = await drives.get_or_create_drive(name="shared")

    # Mount many snapshots of the same drive
    first_reader = await sandbox.create_sandbox(
        name="reader-1",
        region=drive.region,
        mounts={"/data": drive.snapshot()},
    )
    second_reader = await sandbox.create_sandbox(
        name="reader-2",
        region=drive.region,
        mounts={"/data": drive.snapshot()},
    )

asyncio.run(main())
```

**terminal.sh**

```bash filename="terminal.sh"
sandbox create --name reader-1 --region iad1 --mount shared:/data:snapshot
sandbox create --name reader-2 --region iad1 --mount shared:/data:snapshot
```

### Forking a drive

You can fork an existing drive into a new drive, copying the drive's data and inheriting its region and maximum size. The fork belongs to the same project. Writes to a forked drive do not change the original drive, allowing you to safely edit a copy while preserving the source data. This can be useful to start a fleet of agents, each working independently on their own read-write copy forked from a base drive.

> **💡 Note:** A drive must be mounted read-write and written to at least once before you can
> create a fork from it. Creating a fork of a drive that has never been written
> to fails with a `drive_not_initialized` error.

**index.ts**

```ts filename="index.ts"
import { Drive } from '@vercel/drives';
import { Sandbox } from '@vercel/sandbox';

const drive = await Drive.get({ name: 'workspace-cache' });
const forkedDrive = await drive.fork({ name: 'workspace-cache-fork' });

const sandbox = await Sandbox.create({
  region: forkedDrive.region,
  mounts: { '/data': forkedDrive },
});
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import drives, sandbox


async def main() -> None:
    drive = await drives.get_drive(name_or_id="workspace-cache")
    forked_drive = await drive.fork(name="workspace-cache-fork")

    box = await sandbox.create_sandbox(
        region=forked_drive.region,
        mounts={"/data": forked_drive},
    )


asyncio.run(main())
```

**terminal.sh**

```bash filename="terminal.sh"
vercel drives fork workspace-cache workspace-cache-fork
```

You can mount a forked drive like any other drive. A fork inherit its parent drive data but stores its own changes independently. Use `parentDriveId` to identify the source drive and `rootDriveId` to identify the original drive in a chain of forks.

## Limits

- A sandbox can mount up to 4 drives per run
- A sandbox's main [region](/docs/sandbox/concepts/regions) must match the drive's region

For drive size and quota limits, see [Pricing and limits](/docs/drives/pricing#limits).

## Pricing

Drives are billed on storage, reads, and writes. For the rates in each region and the Hobby allotments, see [Drives pricing](/docs/drives/pricing).

## Next steps

- [How Vercel Drives work and how to use them](/kb/guide/vercel-drives): Create, mount, share, and fork a drive step by step, and resolve common errors.
- [Vercel Drives](/docs/drives): Create, manage, fork, and delete drives.
- [Drives pricing](/docs/drives/pricing): Storage, read, and write rates per region.
- [Persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes): Learn how persistent sandboxes automatically save and restore state.
- [Snapshots](/docs/sandbox/concepts/snapshots): Save and restore a full sandbox filesystem.
- [CLI Reference](/docs/sandbox/cli-reference): Command reference for the Sandbox CLI.
- [JS SDK Reference](/docs/sandbox/sdk-reference): Full API documentation for the JavaScript SDK.
- [Python SDK Reference](/docs/sandbox/python-sdk-reference): Full API documentation for the Python SDK.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
