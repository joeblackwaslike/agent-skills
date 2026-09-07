---
title: Persistence
product: vercel
url: /docs/sandbox/concepts/persistent-sandboxes
canonical_url: "https://vercel.com/docs/sandbox/concepts/persistent-sandboxes"
last_updated: 2026-08-25
type: conceptual
prerequisites:
  - /docs/sandbox/concepts
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/snapshots
  - /docs/sandbox/sdk-reference
  - /docs/sandbox/cli-reference
  - /docs/sandbox/pricing
  - /docs/sandbox/concepts/tags
summary: Sandboxes automatically save their filesystem state when stopped and restore it when resumed. No manual snapshot management.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/concepts/persistent-sandboxes.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "b36a1941294e9d6d7782607eb0ac84e56d5ecaf2970cf985dcbc10d848615e5c"
---

# Persistence

Persistent sandboxes automatically save their filesystem state when stopped and restore it when resumed. You don't need to manually create or track [snapshots](/docs/sandbox/concepts/snapshots) between runs.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Sandbox can now run for up to 24 hours](https://vercel.com/changelog/vercel-sandbox-can-now-run-for-up-to-24-hours?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fpersistent-sandboxes&source_site=vercel-docs&relationship=related)
- [The Complete Guide to Vercel Drives](https://vercel.com/kb/guide/vercel-drives?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fpersistent-sandboxes&source_site=vercel-docs&relationship=related) — Learn how Vercel Drives provide persistent storage for Vercel Sandboxes, and how to create, mount, list, and delete a dr
- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fpersistent-sandboxes&source_site=vercel-docs&relationship=related) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [Sandbox persistence is now GA](https://vercel.com/changelog/sandbox-persistence-is-now-ga?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fpersistent-sandboxes&source_site=vercel-docs&relationship=related)
- [How to use snapshots for faster sandbox startup](https://vercel.com/kb/guide/how-to-use-snapshots-for-faster-sandbox-startup?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fpersistent-sandboxes&source_site=vercel-docs&relationship=related) — Learn how to save sandbox state with snapshots and skip installation on future runs.
- [Automatic persistence now in beta on Vercel Sandbox](https://vercel.com/changelog/vercel-sandbox-persistent-sandboxes-beta?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fpersistent-sandboxes&source_site=vercel-docs&relationship=related)
- [Quickstart](https://vercel.com/docs/sandbox/quickstart?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fpersistent-sandboxes&source_site=vercel-docs&relationship=related) — Learn how to run your first code in a Vercel Sandbox.
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fpersistent-sandboxes&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fpersistent-sandboxes&source_site=vercel-docs&relationship=related) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Glossary](https://vercel.com/docs/glossary?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fpersistent-sandboxes&source_site=vercel-docs&relationship=related) — Learn about the terms and concepts used in Vercel's products and documentation.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fpersistent-sandboxes&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/sandbox/concepts/persistent-sandboxes.graph.md](/docs/sandbox/concepts/persistent-sandboxes.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fpersistent-sandboxes&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

**Persistence is the default.** Every sandbox created with [`Sandbox.create()`](/docs/sandbox/sdk-reference#sandbox.create) or [`sandbox create`](/docs/sandbox/cli-reference#sandbox-create) is persistent unless you explicitly opt out.

> **💡 Note:** Each automatic snapshot consumes [Snapshot Storage](/docs/sandbox/pricing#snapshot-storage), which is billed separately from compute. For one-off or ephemeral workloads, pass `persistent: false` to `Sandbox.create()` (or `--non-persistent` to `sandbox create`) to opt out — see [Opt out of persistence](#opt-out-of-persistence).

## Persistent vs. non-persistent sandboxes

Persistence changes how a sandbox behaves when its current session stops. The table below summarizes the key differences between the two modes:

| Aspect                  | Persistent (default)                                      | Non-persistent                                |
| :---------------------- | :-------------------------------------------------------- | :-------------------------------------------- |
| **State on stop**       | Automatically snapshotted                                 | Discarded unless manually snapshotted         |
| **Resuming**            | `Sandbox.get({ name })` or any SDK call auto-resumes      | Cannot be resumed; create a new sandbox       |
| **Identification**      | User-defined `name` (unique per project)                  | Same; `name` is still used                    |
| **Snapshot management** | Automatic, handled by the SDK                             | None                                          |
| **Typical use cases**   | Developer environments, agent workspaces, long-lived jobs | One-off CI tasks, build-and-discard workflows |

## Opt out of persistence

To opt out, pass `persistent: false` at creation time, or update the sandbox later with `sandbox.update({ persistent: false })`. From the CLI, pass `--non-persistent` to `sandbox create`. Non-persistent sandboxes discard their filesystem when the session stops and don't accrue [Snapshot Storage](/docs/sandbox/pricing#snapshot-storage) costs.

**TypeScript**

```ts filename="index.ts"
const sandbox = await Sandbox.create({ persistent: false });
```

**Python**

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    await sandbox.create_sandbox(persistent=False)


asyncio.run(main())
```

## Key concepts

These are the building blocks you'll encounter when working with persistent sandboxes — the two-level sandbox/session model, sandbox names, snapshot retention, automatic resume, and lifecycle hooks.

### Sandboxes and sessions

Persistent sandboxes use a two-level model:

- **Sandbox**: A long-lived entity identified by a unique `name` within your project. It survives across multiple VM boots.
- **Session**: A single running VM instance inside a sandbox. Each time you resume a sandbox, a new session starts from the last saved state.

When you stop a persistent sandbox, the SDK automatically snapshots the filesystem. When you resume it, a new session boots from that snapshot with a fresh [session timeout](/docs/sandbox/pricing#runtime-limits). A sandbox is made up of many sessions, so the maximum duration caps each one, not the sandbox.

### Sandbox names

Every sandbox has a **name** that is unique within your project. The name is the primary way to identify and retrieve sandboxes.

- If you don't provide a name, one is generated automatically.
- Names cannot be changed after creation.
- Names are unique per project.

### Default snapshot expiration and retention

You can set a default expiration for the automatic snapshots, plus a retention policy that keeps only the N most recent snapshots:

- **`snapshotExpiration`**: Default TTL for any snapshot of this sandbox, measured from the snapshot's last use. The timer resets each time the snapshot is used. Defaults to 30 days (`2,592,000,000` ms). Use `0` (or `"none"` in the CLI) to keep snapshots indefinitely.
- **`keepLastSnapshots`**: Keep only the N (1–10) most recent snapshots, optionally with a different expiration and an option to delete evicted snapshots immediately.

**TypeScript**

```ts filename="index.ts"
const sandbox = await Sandbox.create({
  name: 'my-sandbox',
  snapshotExpiration: 7 * 24 * 60 * 60 * 1000, // 7 days
  keepLastSnapshots: {
    count: 1, // Keep only the most recent snapshot
    expiration: 30 * 24 * 60 * 60 * 1000, // 30 days for kept snapshots
    deleteEvicted: true, // Delete evicted snapshots immediately
  },
});
```

**Python**

```python filename="main.py"
import asyncio
from datetime import timedelta

from vercel import sandbox
from vercel.sandbox import SnapshotRetention


async def main() -> None:
    await sandbox.create_sandbox(
        name="my-sandbox",
        snapshot_expiration=timedelta(days=7),
        snapshot_retention=SnapshotRetention(
            count=1,
            expiration=timedelta(days=30),
            delete_evicted=True,
        ),
    )


asyncio.run(main())
```

`keepLastSnapshots: { count: 1 }` is the recommended setting when you only care about the latest snapshot. It keeps snapshot storage flat.

### Sandbox retention

Vercel removes sandboxes that can't resume from a snapshot after 14 days of inactivity. This applies to non-persistent (ephemeral) sandboxes and to sandboxes whose source snapshot has been deleted or has expired. To keep a sandbox around, keep it persistent and make sure its snapshots don't expire before you use it again.

### Automatic resume

If a persistent sandbox is stopped and you call `runCommand`, `writeFiles`, or other SDK methods on it, the SDK automatically starts a new session and retries the operation. You don't need to check the sandbox status or restart it manually.

Two methods do **not** auto-resume:

- `sandbox.stop()`
- `sandbox.update()`

### Lifecycle hooks

`onCreate` and `onResume` let you run setup code at the right moment:

- **`onCreate`** runs once when a sandbox is freshly created (only fires with [`Sandbox.getOrCreate`](/docs/sandbox/sdk-reference#sandbox.getorcreate)). It's awaited before `Sandbox.getOrCreate` resolves. Use it for one-time setup like cloning a repo or installing dependencies.
- **`onResume`** runs every time a session is resumed, including when an SDK call auto-resumes a stopped sandbox. By default, `Sandbox.getOrCreate` retrieves the sandbox but does not resume it, so `onResume` is not awaited before it resolves; the session resumes on the first SDK call (such as `runCommand`), and `onResume` runs at that point. Pass `resume: true` to `Sandbox.getOrCreate` to resume immediately and have `onResume` awaited before it resolves. Use it to restart background services or rehydrate caches.

## Create a persistent sandbox

Call `Sandbox.create()` with a `name` to create a persistent sandbox. Persistence is on by default, so you only need to set `name`; the snippet below also sets a 7-day snapshot expiration:

**TypeScript**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  name: 'my-sandbox',
  // `persistent: true` is the default. Pass `false` to opt out.
  snapshotExpiration: 7 * 24 * 60 * 60 * 1000, // 7 days
});

await sandbox.runCommand('npm', ['install']);
await sandbox.stop(); // Filesystem is snapshotted automatically
```

**Python**

```python filename="main.py"
import asyncio
from datetime import timedelta

from vercel import sandbox


async def main() -> None:
    box = await sandbox.create_sandbox(
        name="my-sandbox",
        snapshot_expiration=timedelta(days=7),
    )
    await box.run_process("uv", ["sync"], check=True)
    await box.stop()


asyncio.run(main())
```

## Get or create (idempotent)

`Sandbox.getOrCreate` is the recommended pattern for long-lived sandboxes. It resumes the sandbox if it exists, or creates it if it doesn't.

Creation parameters (such as `keepLastSnapshots` or `snapshotExpiration`) apply only when `getOrCreate` creates the sandbox. If a sandbox with the same `name` already exists, `getOrCreate` returns it with its existing configuration and ignores the creation parameters you pass. To change the configuration of an existing sandbox, use [`sandbox.update`](#update-sandbox-configuration).

**TypeScript**

```ts filename="index.ts"
const sandbox = await Sandbox.getOrCreate({
  name: 'my-sandbox',
  onCreate: async (sbx) => {
    // Runs only the first time the sandbox is created
    await sbx.runCommand('git', ['clone', repoUrl, '.']);
    await sbx.runCommand('npm', ['install']);
  },
  onResume: async (sbx) => {
    // Runs every time the session resumes
    await sbx.runCommand({
      cmd: 'npm',
      args: ['run', 'dev'],
      detached: true,
    });
  },
});
```

**Python**

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box, created = await sandbox.get_or_create_sandbox(name="my-sandbox")
    if created:
        await box.run_process("uv", ["sync"], check=True)


asyncio.run(main())
```

Behavior:

- If a sandbox with that `name` exists, `getOrCreate` retrieves it without resuming it by default. The sandbox resumes on the first SDK call (such as `runCommand`), and `onResume` fires at that point — not before `getOrCreate` resolves. Pass `resume: true` to resume immediately and have `onResume` awaited before `getOrCreate` resolves.
- If a sandbox with that `name` exists, its configuration is not updated. Creation parameters passed to `getOrCreate` are ignored; use [`sandbox.update`](#update-sandbox-configuration) to change the configuration of an existing sandbox.
- If it does not exist, a fresh sandbox is created with the parameters you pass, and `onCreate` fires (awaited before `getOrCreate` resolves).
- If the sandbox exists but its snapshot has expired, the stale sandbox is deleted, re-created with the same name, and `onCreate` fires.

## Resume where you left off

Use `Sandbox.get({ name })` to retrieve a persistent sandbox by name. The handle is returned immediately; the SDK starts a new session on the next call that needs a running VM:

**TypeScript**

```ts filename="index.ts"
// Retrieve the sandbox by name. The next SDK call resumes the session.
const sandbox = await Sandbox.get({ name: 'my-sandbox' });

// The filesystem is restored from the last session
await sandbox.runCommand('npm', ['run', 'dev']);
```

**Python**

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-sandbox")
    print(await box.fs.read_text("notes.txt"))


asyncio.run(main())
```

Pass `resume: false` to skip auto-resume. The sandbox resumes on the next SDK call that requires a running VM.

## Update sandbox configuration

`sandbox.update` replaces individual update helpers and accepts any of the mutable parameters at once. When `ports` is provided, it is treated as the **full** desired port list; any currently exposed port not present in the array is deregistered.

**TypeScript**

```ts filename="index.ts"
await sandbox.update({
  resources: { vcpus: 4 }, // Memory auto-scales to 2048 MB per vCPU
  timeout: 30 * 60 * 1000, // 30 minutes
  persistent: true,
  snapshotExpiration: 14 * 24 * 60 * 60 * 1000, // 14 days
  keepLastSnapshots: { count: 1 },
  networkPolicy: 'deny-all',
  ports: [3000, 8000],
  tags: { env: 'production' },
  currentSnapshotId: 'snap_xyz', // Roll back to a previous snapshot
});
```

**Python**

```python filename="main.py"
import asyncio
from datetime import timedelta

from vercel import sandbox
from vercel.sandbox import NetworkPolicy, SandboxResources, SnapshotRetention


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-sandbox")
    await box.update(
        resources=SandboxResources(vcpus=4),
        execution_time_limit=timedelta(minutes=30),
        persistent=True,
        snapshot_expiration=timedelta(days=14),
        snapshot_retention=SnapshotRetention(count=1),
        network_policy=NetworkPolicy.deny_all(),
        ports=[3000, 8000],
        tags={"env": "production"},
        current_snapshot_id="snap_xyz",
    )


asyncio.run(main())
```

## Delete a sandbox

Deleting a sandbox permanently removes the sandbox and all of its sessions. Its [snapshots](/docs/sandbox/concepts/snapshots) survive the deletion, because several sandboxes can start from the same snapshot. They stay available until they expire or you delete them, and they keep incurring [storage charges](/docs/sandbox/pricing#snapshot-storage) in the meantime.

**TypeScript**

```ts filename="index.ts"
await sandbox.delete();
```

**Python**

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-sandbox")
    await box.destroy()


asyncio.run(main())
```

## List and search sandboxes

`Sandbox.list` supports cursor-based pagination and returns an async-iterable that auto-paginates through every page.

**TypeScript**

```ts filename="index.ts"
const result = await Sandbox.list({
  namePrefix: 'user-a', // Filter by name prefix (requires sortBy: "name")
  tags: { env: 'production' }, // Filter by tags
  sortBy: 'createdAt', // "createdAt" (default), "name", or "statusUpdatedAt"
  sortOrder: 'desc', // "asc" or "desc" (default)
});

// Per-item async iteration (auto-paginates)
for await (const sandbox of result) {
  console.log(sandbox.name);
}

// Or per-page
for await (const page of result.pages()) {
  console.log(page.sandboxes.length);
}

// Or collect everything
const all = await result.toArray();
```

**Python**

```python filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import SandboxQueryByName, TagFilter


async def main() -> None:
    query = SandboxQueryByName(
        name_prefix="user-a",
        sort_order="desc",
        tag=TagFilter(key="env", value="production"),
    )

    async for box in sandbox.query_sandboxes(query=query):
        print(box.name)


asyncio.run(main())
```

## CLI usage

The `sandbox` CLI exposes the same persistent-sandbox primitives as the SDK. The sections below cover the most common commands; see the [CLI reference](/docs/sandbox/cli-reference) for every option.

### Create a persistent sandbox

Pass `--name` to `sandbox create` to give the sandbox a stable identifier. Optionally set `--snapshot-expiration` to control how long automatic snapshots live, or `--non-persistent` to opt out of persistence entirely:

```bash filename="Terminal"
# Create a persistent sandbox
sandbox create --name my-sandbox

# Create with a default snapshot expiration of 7 days
sandbox create --name my-sandbox --snapshot-expiration 7d

# Create with no snapshot expiration
sandbox create --name my-sandbox --snapshot-expiration none

# Create a non-persistent (ephemeral) sandbox
sandbox create --name my-sandbox --non-persistent
```

### Run a command with automatic resume

If the sandbox is stopped, `run` resumes it before executing the command:

```bash filename="Terminal"
sandbox run --name my-sandbox -- npm test
```

### Inspect sessions

List the sandbox sessions that have run inside the sandbox to audit lifecycle events or troubleshoot a stopped session:

```bash filename="Terminal"
sandbox sessions list my-sandbox
```

### Configure a sandbox

Use `sandbox config <subcommand>` to inspect or update one parameter at a time. The full subcommand list is in the [CLI reference](/docs/sandbox/cli-reference#sandbox-config); common ones look like this:

```bash filename="Terminal"
sandbox config list my-sandbox
sandbox config vcpus my-sandbox 4
sandbox config timeout my-sandbox 30m
sandbox config persistent my-sandbox true
sandbox config snapshot-expiration my-sandbox 7d
sandbox config keep-last-snapshots my-sandbox 1
sandbox config ports my-sandbox -p 3000 -p 8000
sandbox config tags my-sandbox --tag env=production
```

### Delete a sandbox

`sandbox remove` permanently deletes the sandbox along with all of its sessions. The operation is irreversible. The sandbox's snapshots survive it, so delete them separately with [`sandbox snapshots delete`](/docs/sandbox/cli-reference#sandbox-snapshots-delete):

```bash filename="Terminal"
sandbox remove my-sandbox
```

## Migrating from `@vercel/sandbox@1`

Sandboxes created with v1 are backfilled with their old `sandboxId` as the new `name`, so the only required code change is using `name` instead of `sandboxId`:

```ts filename="index.ts"
// Before (v1)
const sandbox = await Sandbox.get({ sandboxId: 'sbx_123' });

// After (v2)
const sandbox = await Sandbox.get({ name: 'sbx_123' });
```

Other changes to be aware of:

| Change                  | Before (v1)                             | After (v2)                                       |
| :---------------------- | :-------------------------------------- | :----------------------------------------------- |
| **Get a sandbox**       | `Sandbox.get({ sandboxId: "sbx_123" })` | `Sandbox.get({ name: "my-sandbox" })`            |
| **Sandbox identifier**  | `sandbox.sandboxId`                     | `sandbox.name`                                   |
| **Default persistence** | Ephemeral (no auto-snapshot)            | Persistent (auto-snapshot on stop)               |
| **List pagination**     | `since` / `until` parameters            | `cursor`-based pagination                        |
| **List response**       | `{ json: { sandboxes, pagination } }`   | `{ sandboxes, pagination }` (async-iterable)     |
| **Auto-resume**         | Commands fail on stopped sandboxes      | Commands automatically resume the sandbox first  |
| **Update helpers**      | `updateNetworkPolicy`                   | `sandbox.update({ networkPolicy, ... })`         |

`sandbox.updateNetworkPolicy()` is deprecated. Use `sandbox.update({ networkPolicy })` instead.

## Managing persistent sandboxes in the dashboard

Persistent sandboxes appear in your project's [Sandboxes](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsandboxes\&title=Show+Sandbox+page) page. Each sandbox shows its name, status, resources, and image.

Select a sandbox to view its detail page, which includes:

- **Sandbox**: Overview of the sandbox configuration, status, and resources.
- **Activity**: A log of sandbox lifecycle events.
- **Snapshots**: Automatic snapshots created when sessions stop. These are the saved filesystem states that enable resume.

From the dashboard you can stop the current session or permanently remove the sandbox.

## Next steps

- [Snapshots](/docs/sandbox/concepts/snapshots): Learn how snapshots work under the hood.
- [Tags](/docs/sandbox/concepts/tags): Categorize sandboxes by environment, team, or any other criteria.
- [JS SDK Reference](/docs/sandbox/sdk-reference): Full API documentation for the JavaScript SDK.
- [CLI Reference](/docs/sandbox/cli-reference): Command reference for the CLI.
- [Authentication](/docs/sandbox/concepts/authentication): Configure SDK authentication.


---

[View full sitemap](/docs/sitemap)
