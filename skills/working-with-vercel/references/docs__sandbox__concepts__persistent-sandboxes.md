---
title: Persistent sandboxes
product: vercel
url: /docs/sandbox/concepts/persistent-sandboxes
canonical_url: "https://vercel.com/docs/sandbox/concepts/persistent-sandboxes"
last_updated: 2026-05-29
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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "645f2c81aec7f9ee2f14bf1e21bbe73b55eb3cf397439591ab8e054f535e2220"
---

# Persistent sandboxes

Persistent sandboxes automatically save their filesystem state when stopped and restore it when resumed. You don't need to manually create or track [snapshots](/docs/sandbox/concepts/snapshots) between runs.

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

## Key concepts

These are the building blocks you'll encounter when working with persistent sandboxes — the two-level sandbox/session model, sandbox names, snapshot retention, automatic resume, and lifecycle hooks.

### Sandboxes and sessions

Persistent sandboxes use a two-level model:

- **Sandbox**: A long-lived entity identified by a unique `name` within your project. It survives across multiple VM boots.
- **Session**: A single running VM instance inside a sandbox. Each time you resume a sandbox, a new session starts from the last saved state.

When you stop a persistent sandbox, the SDK automatically snapshots the filesystem. When you resume it, a new session boots from that snapshot.

### Sandbox names

Every sandbox has a **name** that is unique within your project. The name is the primary way to identify and retrieve sandboxes.

- If you don't provide a name, one is generated automatically.
- Names cannot be changed after creation.
- Names are unique per project.

### Default snapshot expiration and retention

You can set a default expiration for the automatic snapshots, plus a retention policy that keeps only the N most recent snapshots:

- **`snapshotExpiration`**: Default TTL for any snapshot of this sandbox, measured from the snapshot's last use. The timer resets each time the snapshot is used. Use `0` (or `"none"` in the CLI) to keep snapshots indefinitely. Falls back to the system default if unset.
- **`keepLastSnapshots`**: Keep only the N (1–10) most recent snapshots, optionally with a different expiration and an option to delete evicted snapshots immediately.

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

`keepLastSnapshots: { count: 1 }` is the recommended setting when you only care about the latest snapshot. It keeps snapshot storage flat.

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

## Get or create (idempotent)

`Sandbox.getOrCreate` is the recommended pattern for long-lived sandboxes. It resumes the sandbox if it exists, or creates it if it doesn't.

```ts filename="index.ts"
const sandbox = await Sandbox.getOrCreate({
  name: 'my-sandbox',
  runtime: 'node24',
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

Behavior:

- If a sandbox with that `name` exists, `getOrCreate` retrieves it without resuming it by default. The sandbox resumes on the first SDK call (such as `runCommand`), and `onResume` fires at that point — not before `getOrCreate` resolves. Pass `resume: true` to resume immediately and have `onResume` awaited before `getOrCreate` resolves.
- If it does not exist, a fresh sandbox is created and `onCreate` fires (awaited before `getOrCreate` resolves).
- If the sandbox exists but its snapshot has expired, the stale sandbox is deleted, re-created with the same name, and `onCreate` fires.

## Resume where you left off

Use `Sandbox.get({ name })` to retrieve a persistent sandbox by name. The handle is returned immediately; the SDK starts a new session on the next call that needs a running VM:

```ts filename="index.ts"
// Retrieve the sandbox by name. The next SDK call resumes the session.
const sandbox = await Sandbox.get({ name: 'my-sandbox' });

// The filesystem is restored from the last session
await sandbox.runCommand('npm', ['run', 'dev']);
```

Pass `resume: false` to skip auto-resume. The sandbox resumes on the next SDK call that requires a running VM.

## Update sandbox configuration

`sandbox.update` replaces individual update helpers and accepts any of the mutable parameters at once. When `ports` is provided, it is treated as the **full** desired port list; any currently exposed port not present in the array is deregistered.

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

## Delete a sandbox

Deleting a sandbox removes it and all of its snapshots and sessions permanently.

```ts filename="index.ts"
await sandbox.delete();
```

## List and search sandboxes

`Sandbox.list` supports cursor-based pagination and returns an async-iterable that auto-paginates through every page.

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

`sandbox remove` permanently deletes the sandbox along with all of its snapshots and sessions. The operation is irreversible:

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

Persistent sandboxes appear in your project's [Sandboxes](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsandboxes\&title=Show+Sandbox+page) page. Each sandbox shows its name, status, resources, and runtime.

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
