---
title: JS SDK Reference
product: vercel
url: /docs/sandbox/sdk-reference
canonical_url: "https://vercel.com/docs/sandbox/sdk-reference"
last_updated: 2026-09-15
type: reference
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/concepts/tags
  - /docs/sandbox/concepts/regions
  - /docs/sandbox/concepts/secure-compute
  - /docs/sandbox/pricing
summary: A comprehensive reference for the Vercel Sandbox JavaScript SDK, which lets you run code in a secure, isolated environment.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/sdk-reference.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "6949305033fffc2cb01d88c5c3412cb5b4cde35c2f9793a62a4d808bf07e7275"
---

# JS SDK Reference

Use the Vercel Sandbox JavaScript SDK to create isolated Linux microVMs on demand. Run untrusted code, test full Linux workflows, and manage files, ports, snapshots, drives, sessions, and network policy from Node.js applications.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Drives for Vercel Sandbox in Private Beta](https://vercel.com/changelog/drives-for-vercel-sandbox-in-private-beta)
- [Port 8080 is now available in Vercel Sandboxes](https://vercel.com/changelog/port-8080-is-now-available-in-vercel-sandboxes)
- [Vercel Sandbox creation now returns a ready sandbox](https://vercel.com/changelog/sandbox-create-waits-until-ready)
- [Vercel Sandbox commands now support stdin](https://vercel.com/changelog/vercel-sandbox-commands-now-support-stdin)
- [Vercel Sandbox supports forking](https://vercel.com/changelog/vercel-sandbox-supports-forking)
- [Build AI agents with AI Gateway and AI SDK](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk) — Build AI agents on Vercel with AI Gateway and AI SDK, then make them reliable, capable, and durable with Sandbox, Chat S
- [Running Durable Agents on Vercel](https://vercel.com/kb/guide/durable-ai-agents) — Design durable AI agents on Vercel with patterns for execution recovery, human approval, safe retries, deployment change
- [How to give agents persistent storage with Vercel Drives](https://vercel.com/kb/guide/persistent-storage-with-vercel-drives) — Give AI SDK and TanStack AI agents persistent storage with Vercel Drives so they can save and reuse research notes acros
- [How to test a container image in Vercel Sandbox before deploying](https://vercel.com/kb/guide/test-container-image-vercel-sandbox) — Validate a container image before deploying by booting it as a custom Sandbox image from Vercel Container Registry \\(VCR
- [How to process user-uploaded files with Vercel Sandbox and Vercel Blob](https://vercel.com/kb/guide/user-uploaded-files-vercel-sandbox-and-blob) — Learn how to upload files to Vercel Blob, process them safely with FFmpeg in an isolated Vercel Sandbox, and store the r
- [Get a named sandbox](https://vercel.com/docs/rest-api/sandboxes/get-a-named-sandbox) — GET /v2/sandboxes/{name} — Retrieves a named sandbox by name, including its current sandbox and routes. If the sandbox i
- [Fork a named sandbox](https://vercel.com/docs/rest-api/sandboxes/fork-a-named-sandbox) — POST /v2/sandboxes/{name}/fork — Forks a named sandbox, creating a new named sandbox from the source's configuration. Re

Full cross-link map for this page: [/docs/sandbox/sdk-reference.graph.md](/docs/sandbox/sdk-reference.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

Install the SDK:

**pnpm**

```bash
pnpm i @vercel/sandbox
```

**yarn**

```bash
yarn add @vercel/sandbox
```

**npm**

```bash
npm i @vercel/sandbox
```

**bun**

```bash
bun add @vercel/sandbox
```

After installation, link your project and pull environment variables with `vercel link` and `vercel env pull` so the SDK can read a Vercel OpenID Connect (OIDC) token.

## Core classes

| Class                                       | What it does                                       | Example                                         |
| ------------------------------------------- | -------------------------------------------------- | ----------------------------------------------- |
| [`Sandbox`](#sandbox-class)                 | Creates and manages isolated microVM environments  | `const sandbox = await Sandbox.create()`        |
| [`SandboxUser`](#sandboxuser-class)         | Runs commands and file operations as a Linux user  | `const user = await sandbox.createUser('alice')` |
| [`Session`](#session-class)                 | Represents a single running VM inside a sandbox    | `const session = sandbox.currentSession()`      |
| [`FileSystem`](#filesystem-class)           | Provides a `node:fs/promises`-compatible API       | `await sandbox.fs.readFile('/tmp/a.txt')`       |
| [`Command`](#command-class)                 | Handles running commands inside the sandbox        | `const cmd = await sandbox.runCommand('ls')`    |
| [`CommandFinished`](#commandfinished-class) | Contains the result after a command completes      | Access `cmd.exitCode` and `cmd.stdout()`        |
| [`NetworkPolicy`](#networkpolicy-type)     | Defines firewall rules for sandbox traffic         | `Sandbox.create({ networkPolicy: 'deny-all' })` |
| [`Snapshot`](#snapshot-class)               | Represents a saved sandbox state for fast restarts | `const snapshot = await sandbox.snapshot()`     |
| [`Drive`](#drive-class)                    | Represents persistent storage mounted to sandboxes | `const drive = await Drive.getOrCreate()`      |

### Basic workflow

```ts
// 1. Create a sandbox (persistent by default)
const sandbox = await Sandbox.create({ name: 'my-sandbox' });

// 2. Run a command - it waits for completion and returns the result
const result = await sandbox.runCommand('node', ['--version']);

// 3. Check the result
console.log(result.exitCode); // 0
console.log(await result.stdout()); // v22.x.x

// 4. Later, retrieve the same sandbox by name
const same = await Sandbox.get({ name: 'my-sandbox' });
```

## Sandbox class

The `Sandbox` class gives you full control over isolated Linux microVMs. Use it to create new sandboxes, retrieve existing ones, stream command output, snapshot the filesystem, and shut sessions down once your workflow is complete.

Sandboxes are **persistent by default**: when a sandbox stops, the SDK snapshots its filesystem and restores it on the next resume. See [Persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes) for the full lifecycle model.

### Sandbox class accessors

#### `name`

The `name` accessor returns the sandbox's unique name within the project. Use this string with `Sandbox.get()` to retrieve the sandbox in a later process. If you didn't pass a `name` to `Sandbox.create()`, one is generated for you.

**Returns:** `string`.

```ts
console.log(sandbox.name);
```

#### `persistent`

Whether the sandbox automatically snapshots its filesystem on stop. Defaults to `true` for sandboxes created with `Sandbox.create()`.

**Returns:** `boolean`.

```ts
console.log(sandbox.persistent);
```

#### `status`

The `status` accessor reads cached metadata for the current session. Repeated property access doesn't poll the API. Retrieve a fresh handle with `Sandbox.get({ name, resume: false })` to observe external changes without resuming the sandbox. A status check doesn't coordinate concurrent lifecycle operations; finish `stop()` or `snapshot()` before submitting more commands.

**Returns:** `"pending" | "running" | "stopping" | "stopped" | "failed" | "aborted" | "snapshotting"`.

```ts
const fresh = await Sandbox.get({ name: sandbox.name, resume: false });
console.log(fresh.status);
```

#### `timeout`

`timeout` is the sandbox's saved default session timeout, in milliseconds, when available. Change it with `sandbox.update({ timeout })`. Calling `sandbox.extendTimeout()` adds to the live session's deadline without changing this saved value. To read the deadline, use `expiresAt`.

**Returns:** `number | undefined`.

```ts
console.log(sandbox.timeout);
```

#### `expiresAt`

`expiresAt` returns the time when the current session will stop automatically. It works with [`sandbox.extendTimeout()`](#sandbox.extendtimeout) and moves forward when you extend the timeout. For milliseconds remaining, subtract the current time.

**Returns:** `Date | undefined`.

```ts
const msRemaining = sandbox.expiresAt
  ? sandbox.expiresAt.getTime() - Date.now()
  : undefined;
```

#### `tags`

Key-value tags associated with the sandbox. See [Tags](/docs/sandbox/concepts/tags).

**Returns:** `Record<string, string> | undefined`.

```ts
console.log(sandbox.tags);
```

#### `vcpus` and `memory`

`vcpus` returns the number of allocated virtual CPUs. `memory` returns the allocated memory in MB (2048 MB per vCPU).

**Returns:** `number | undefined`.

```ts
console.log(sandbox.vcpus, sandbox.memory);
```

#### `runtime`

Deprecated: use [`image`](#image) for image-based sandboxes.

The runtime image used by the sandbox (for example, `"node24"`).

**Returns:** `string | undefined`.

```ts
console.log(sandbox.runtime);
```

#### `image`

The image used by the sandbox (for example, `"vercel/sandbox/universal"`).

**Returns:** `string | undefined`.

```ts
console.log(sandbox.image);
```

#### `region`

The [region](/docs/sandbox/concepts/regions) where the sandbox runs. Set with the `region` parameter of [`Sandbox.create()`](#sandbox.create). When no region was passed, this is the project's default sandbox region, or `iad1` if the project doesn't set one.

**Returns:** `string`.

```ts
console.log(sandbox.region);
```

#### `failoverRegions`

The additional [regions](/docs/sandbox/concepts/regions#failover-regions) this sandbox can fail over to. Returns an empty array when the sandbox has no failover regions.

**Returns:** `string[]`.

```ts
console.log(sandbox.failoverRegions);
```

#### `networkId`

The ID of the [Secure Compute network](/docs/sandbox/concepts/secure-compute) assigned to this sandbox. Returns `undefined` when no network is assigned. An updated ID reflects the saved configuration. Once updated, a running session uses the new network after it stops and resumes.

**Returns:** `string | undefined`.

```ts
console.log(sandbox.networkId);
```

#### `createdAt` and `updatedAt`

Timestamps for when the sandbox was created and last updated.

**Returns:** `Date`.

```ts
console.log(sandbox.createdAt, sandbox.updatedAt);
```

#### `currentSnapshotId`

The ID of the snapshot the sandbox would resume from. Updated automatically when a persistent sandbox stops.

**Returns:** `string | undefined`.

```ts
console.log(sandbox.currentSnapshotId);
```

#### `snapshotExpiration`

Default expiration (in milliseconds) applied to snapshots automatically created for this sandbox. `0` means no expiration. If undefined, snapshots expire after 30 days (`2,592,000,000` ms).

**Returns:** `number | undefined`.

```ts
console.log(sandbox.snapshotExpiration);
```

#### `keepLastSnapshots`

Retention policy that keeps only the N most recent snapshots of this sandbox. A new snapshot is created whenever a persistent session stops or when you call [`sandbox.snapshot()`](#sandbox.snapshot).

When a new snapshot brings the total above `count` for a sandbox, the oldest snapshots are no longer kept.

The `deleteEvicted` field controls what happens to them: delete them immediately, or leave them to expire on their own.

**Returns:** `{ count: number; expiration?: number; deleteEvicted?: boolean } | undefined`. Returns `undefined` when no retention policy is set.

The policy object has the following fields:

| Field           | Type      | Required | Details                                                                                                                                                     |
| --------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `count`         | `number`  | Yes      | Number of most recent snapshots to keep. Must be an integer from 1 to 10. When a new snapshot brings the total above `count`, the oldest snapshots are no longer kept. |
| `expiration`    | `number`  | No       | Expiration in milliseconds applied to the kept snapshots. Use `0` for no expiration. Falls back to `snapshotExpiration` when omitted.                        |
| `deleteEvicted` | `boolean` | No       | What happens to a snapshot once it is no longer among the `count` most recent. When `true` (the default), the snapshot is deleted immediately. When `false`, it is not deleted and remains until its existing expiration. |

```ts
console.log(sandbox.keepLastSnapshots);
```

#### `activeCpuUsageMs`

The amount of CPU used by the current session, in milliseconds. Only populated after the VM stops. Use this to track billable CPU for the latest session.

**Returns:** `number | undefined`.

```ts
console.log(sandbox.activeCpuUsageMs);
```

#### `networkTransfer`

The amount of network data used by the current session, in bytes. Only populated after the VM stops.

**Returns:** `{ ingress: number; egress: number } | undefined`.

```ts
console.log(sandbox.networkTransfer);
```

#### `totalDurationMs`, `totalActiveCpuDurationMs`, `totalIngressBytes`, `totalEgressBytes`

Cumulative usage across every session this sandbox has run. Use these for long-running, persistent sandboxes where the most recent session does not represent total usage. Network ingress and egress are usage metrics, not billing totals. See [Pricing and Limits](/docs/sandbox/pricing#network) to understand which traffic is billable.

**Returns:** `number | undefined`.

```ts
console.log(sandbox.totalDurationMs, sandbox.totalActiveCpuDurationMs);
console.log(sandbox.totalIngressBytes, sandbox.totalEgressBytes);
```

#### `mounts`

The `mounts` accessor returns the drives mounted on the sandbox, keyed by mount path.

**Returns:** `SandboxMounts`.

```ts
console.log(sandbox.mounts);
```

### Sandbox class static methods

#### `Sandbox.list()`

Use `Sandbox.list()` to enumerate sandboxes for a project, with optional filters and cursor-based pagination. The returned value is **async-iterable**: iterate it directly to auto-paginate through every page, iterate `result.pages()` to walk page by page, or call `result.toArray()` to collect everything.

Omit `token`, `teamId`, and `projectId` to use OIDC or local development authentication. To use an access token, pass all three fields together. `projectId` alone does not override the OIDC project.

`SandboxMetaData` items are plain API metadata records, not `Sandbox` instances. Records identify sandboxes by `name` and have no instance methods. Timestamps such as `createdAt` are numbers. Retrieve a handle with `Sandbox.get({ name: record.name })`.

**Returns:** `Promise<Paginated<{ sandboxes: SandboxMetaData[]; pagination: Pagination; }>>`.

| Parameter    | Type                          | Required | Details                                                              |
| ------------ | ----------------------------- | -------- | -------------------------------------------------------------------- |
| `namePrefix` | `string`                      | No       | Filter sandboxes whose name begins with this prefix. Requires `sortBy: "name"`. |
| `tags`       | `Record<string, string>`      | No       | Filter by a single tag.                                              |
| `sortBy`     | `"createdAt" \| "name" \| "statusUpdatedAt"` | No | Sort field. Defaults to `"createdAt"`.                              |
| `sortOrder`  | `"asc" \| "desc"`             | No       | Sort direction. Defaults to `"desc"`.                                |
| `limit`      | `number`                      | No       | Maximum number of sandboxes per page.                                |
| `cursor`     | `string`                      | No       | Pagination cursor returned by the previous page.                     |
| `token` | `string` | No | Access token. Requires `teamId` and `projectId` when supplied. |
| `teamId` | `string` | No | Team ID. Requires `token` and `projectId` when supplied. |
| `projectId`  | `string`                      | No       | Project to list. Requires `token` and `teamId` when supplied.                            |
| `signal`     | `AbortSignal`                 | No       | Cancel the request.                                                  |

```ts
const result = await Sandbox.list({
  namePrefix: 'ci-',
  sortBy: 'name',
  tags: { env: 'staging' },
});

// Per-item iteration auto-paginates
for await (const sandbox of result) {
  console.log(sandbox.name);
}
```

To select a project with an access token, pass the complete credential set:

```ts
const result = await Sandbox.list({
  token: 'your_access_token_here',
  teamId: 'your_team_id_here',
  projectId: 'your_project_id_here',
});

for await (const record of result) {
  const sandbox = await Sandbox.get({
    name: record.name,
    token: 'your_access_token_here',
    teamId: 'your_team_id_here',
    projectId: 'your_project_id_here',
  });
  console.log(sandbox.name);
}
```

#### `Sandbox.create()`

`Sandbox.create()` launches a new microVM with your chosen image, source, and resource settings. Defaults to an empty workspace when no source is provided. Pass `source.depth` when cloning large repositories to shorten setup time.

The promise resolves when the sandbox is ready to run commands and access files. Creation time includes startup and, when using a snapshot, the wait to restore it. Restoring a snapshot that isn't cached can take longer.

To compare end-to-end performance, measure from the start of creation through completion of the same first command or file operation.

Sandboxes are persistent by default: when the sandbox stops, the filesystem is automatically snapshotted and restored on the next resume. Pass `persistent: false` to opt out.

**Returns:** `Promise<Sandbox>`.

| Parameter            | Type                         | Required | Details                                                                                                                                                                                                             |
| -------------------- | ---------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`               | `string`                     | No       | Unique sandbox name within the project. A random name is generated if omitted. Cannot be changed after creation.                                                                                                    |
| `source`             | `git`                        | No       | Clone a Git repository. <br /> `url`: string <br /> `username`: string <br /> `password`: string <br /> `depth`?: number <br /> `revision`?: string                                                                 |
| `source`             | `tarball`                    | No       | Mount a tarball. <br /> `url`: string                                                                                                                                                                               |
| `source`             | `snapshot`                   | No       | Create from a snapshot. <br /> `snapshotId`: string                                                                                                                                                                 |
| `resources.vcpus`    | `number`                     | No       | Number of vCPUs (2048 MB RAM per vCPU). Defaults to 2.                                                                                                                                                              |
| `runtime`            | `string`                     | No       | Deprecated: use [`image`](#image) for image-based sandboxes. Runtime image such as `"node26"`, `"node24"`, `"node22"`, or `"python3.13"`.                                                                           |
| `image`              | `string`                     | No       | VCR image reference, either a [Vercel Managed Image](/docs/sandbox/concepts/images#vercel-managed-images) or [custom image](/docs/sandbox/concepts/images#custom-images). Defaults to `"vercel/sandbox/universal"`. |
| `ports`              | `number[]`                   | No       | Ports to expose for `sandbox.domain()`. Up to 15.                                                                                                                                                                   |
| `timeout`            | `number`                     | No       | Session timeout in milliseconds. Defaults to 5 minutes.                                                                                                                                                             |
| `region`             | `string`                     | No       | [Region](/docs/sandbox/concepts/regions) to create the sandbox in. Defaults to the [project's default sandbox region](/docs/sandbox/concepts/regions#set-a-default-region-for-your-project), or `iad1`.                                                                                     |
| `failoverRegions`    | `string[]`                   | No       | Additional [regions](/docs/sandbox/concepts/regions#failover-regions) the sandbox can fall back to when the main region is unavailable. Must not include the main `region`. Available on Pro and Enterprise plans, excluding [Pro trials](/docs/plans/pro-plan/trials).            |
| `networkPolicy`      | `NetworkPolicy`              | No       | Firewall rules for sandbox egress traffic. Defaults to `"allow-all"`.                                                                                                                                               |
| `networkId`          | `string`                     | No       | [Secure Compute network ID](/docs/sandbox/concepts/secure-compute) to use from the first session.                                                                                                                                              |
| `env`                | `Record<string, string>`     | No       | Default environment variables for commands run in this sandbox. Per-command `runCommand({ env })` values override these defaults.                                                                                   |
| `mounts`             | `SandboxMounts`              | No       | Drives to attach to the sandbox, keyed by absolute mount path. Pass a `Drive` for read-write access or `drive.snapshot()` for a point-in-time, read-only snapshot.                                                  |
| `tags`               | `Record<string, string>`     | No       | Up to five key-value [tags](/docs/sandbox/concepts/tags).                                                                                                                                                           |
| `persistent`         | `boolean`                    | No       | Auto-snapshot the filesystem on stop and restore on resume. Defaults to `true`.                                                                                                                                     |
| `snapshotExpiration` | `number`                     | No       | Default snapshot TTL in milliseconds. Defaults to 30 days (`2,592,000,000` ms). Use `0` for no expiration.                                                                                                          |
| `keepLastSnapshots`  | `object`                     | No       | Retention policy that keeps only the N most recent snapshots. `{ count: 1-10, expiration?: number, deleteEvicted?: boolean }`. See [`keepLastSnapshots`](#keeplastsnapshots) for field details.                     |
| `onResume`           | `(sandbox) => Promise<void>` | No       | Fires whenever a session resumes, including after auto-resume. Use to restart background services or rehydrate caches.                                                                                              |
| `signal`             | `AbortSignal`                | No       | Cancel sandbox creation.                                                                                                                                                                                            |

For VCR repository setup and push commands, see [Getting Started with Vercel Container Registry](/docs/container-registry/getting-started). For how custom images work in Sandbox, see [Images](/docs/sandbox/concepts/images).

```ts
const sandbox = await Sandbox.create({
  name: 'my-sandbox',
  image: 'vercel/sandbox/node:26',
  networkPolicy: 'deny-all',
  env: { NODE_ENV: 'production' },
  tags: { env: 'staging' },
  snapshotExpiration: 7 * 24 * 60 * 60 * 1000, // 7 days
});
```

#### `Sandbox.get()`

`Sandbox.get()` retrieves an existing sandbox by name without resuming it by default (`resume: false`). A stopped persistent sandbox automatically resumes on the first SDK call that needs a running session, such as `runCommand`. Pass `resume: true` to resume it before `get` resolves.

**Returns:** `Promise<Sandbox>`.

| Parameter  | Type                          | Required | Details                                                                                                  |
| ---------- | ----------------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `name`     | `string`                      | Yes      | Sandbox name to retrieve.                                                                                |
| `resume`   | `boolean`                     | No       | Whether to resume the sandbox before `get` resolves. Defaults to `false`. A stopped sandbox still resumes automatically on the first SDK call that needs a running session. |
| `onResume` | `(sandbox) => Promise<void>`  | No       | Fires whenever a session resumes (including after auto-resume).                                          |
| `signal`   | `AbortSignal`                 | No       | Cancel the request.                                                                                      |

```ts
const sandbox = await Sandbox.get({ name: 'my-sandbox' });
```

#### `Sandbox.getOrCreate()`

`Sandbox.getOrCreate()` is the recommended pattern for long-lived sandboxes: it retrieves the sandbox if it exists, or creates it if it doesn't. By default (`resume: false`), an existing sandbox is retrieved without resuming it. A stopped persistent sandbox resumes on the first SDK call that needs a running session, or immediately when you pass `resume: true`. Use `onCreate` for initial setup and `onResume` for setup on later session starts. Creation calls `onCreate` only, so start services in both callbacks when they must run in every session.

Creation parameters (such as `keepLastSnapshots` or `snapshotExpiration`) apply only when `getOrCreate` creates the sandbox. If a sandbox with the same `name` already exists, `getOrCreate` returns it with its existing configuration and ignores the creation parameters you pass. To change the configuration of an existing sandbox, call [`sandbox.update()`](#sandbox.update).

**Returns:** `Promise<Sandbox>`.

| Parameter  | Type                          | Required | Details                                                                                                       |
| ---------- | ----------------------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| `name`     | `string`                      | No       | Sandbox name. If omitted, behaves like `Sandbox.create` (always creates, `onCreate` always fires).            |
| `resume`   | `boolean`                     | No       | Whether to resume the sandbox immediately when an existing one is retrieved. Defaults to `false`. When `true`, the sandbox is resumed before `getOrCreate` resolves, and `onResume` is awaited before it resolves. |
| `onCreate` | `(sandbox) => Promise<void>`  | No       | Runs once when the sandbox is freshly created. Awaited before `getOrCreate` resolves.                         |
| `onResume` | `(sandbox) => Promise<void>`  | No       | Runs every time the session resumes (including after auto-resume). By default, `getOrCreate` retrieves the sandbox but does not resume it, so `onResume` is not awaited before it resolves; the session resumes on the first SDK call (such as `runCommand`), and `onResume` runs at that point. Pass `resume: true` to resume immediately and have `onResume` awaited before `getOrCreate` resolves. |
| ...        | *all `Sandbox.create` params* | No       | Any creation parameter is accepted and used only when the sandbox is created. Ignored when an existing sandbox is retrieved.  |

Behavior:

- If a sandbox with that `name` exists, `getOrCreate` retrieves it without resuming it by default. The sandbox resumes on the first SDK call (such as `runCommand`), and `onResume` fires at that point, not before `getOrCreate` resolves. Pass `resume: true` to resume immediately and have `onResume` awaited before `getOrCreate` resolves.
- If a sandbox with that `name` exists, its configuration is not updated. Creation parameters passed to `getOrCreate` are ignored; use [`sandbox.update()`](#sandbox.update) to change the configuration of an existing sandbox.
- If no sandbox exists, a fresh sandbox is created with the parameters you pass, and `onCreate` is awaited before `getOrCreate` resolves.
- If the sandbox exists but its snapshot expired and you pass `resume: true`, the stale sandbox is deleted, re-created with the same name, and `onCreate` fires. Without `resume: true`, `getOrCreate` returns the existing sandbox, and the first SDK call that resumes it fails with a `snapshot_not_found` error.

```ts
async function startServer(sbx: Sandbox) {
  await sbx.runCommand({ cmd: 'npm', args: ['run', 'dev'], detached: true });
}

const sandbox = await Sandbox.getOrCreate({
  name: 'my-sandbox',
  onCreate: async (sbx) => {
    await sbx.runCommand('git', ['clone', repoUrl, '.']);
    await sbx.runCommand('npm', ['install']);
    await startServer(sbx);
  },
  onResume: startServer,
});
```

Both callbacks start the server in detached mode, while installation runs only on creation. Detached startup returns before the server is ready. Wait for your application's readiness check before forwarding requests.

#### `Sandbox.fork()`

`Sandbox.fork()` creates a new sandbox seeded from the current snapshot of an existing one. The new sandbox inherits the source's config, including its environment variables. Any field you pass in overrides the copied value. If the source has no current snapshot, the fork falls back to a fresh create with the source's `image` plus the copied config.

Pass `env` to override the copied environment variables. `image` is not accepted as an override. When the source has a snapshot, the image is inherited from it; otherwise it is copied from the source sandbox.

The fork runs in the source sandbox's [region](/docs/sandbox/concepts/regions) unless you pass `region`. The fork also inherits the source's failover regions; pass `failoverRegions` to replace them. If the source has a snapshot, that snapshot must be available in the target region.

The fork also inherits the source sandbox's [Secure Compute network](/docs/sandbox/concepts/secure-compute) unless you pass `networkId`.

**Returns:** `Promise<Sandbox>`.

| Parameter       | Type                           | Required | Details                                                                                                 |
| --------------- | ------------------------------ | -------- | ------------------------------------------------------------------------------------------------------- |
| `sourceSandbox` | `string`                       | Yes      | Name of the sandbox to fork from.                                                                       |
| ...             | *most `Sandbox.create` params* | No       | Any field set here overrides the value copied from the source. `source` and `image` are not accepted. |

```ts
// Inherit every supported field from the source
const fork = await Sandbox.fork({ sourceSandbox: 'prod-agent' });

// Override specific fields; the rest are copied from the source
const customized = await Sandbox.fork({
  sourceSandbox: 'prod-agent',
  name: 'forked-prod-agent',
  resources: { vcpus: 4 },
  env: { OPENAI_API_KEY: process.env.OPENAI_API_KEY! },
});
```

### Sandbox class instance methods

#### `sandbox.getCommand()`

Call `sandbox.getCommand()` to retrieve a command by its ID from the current session, for example, after a detached execution. This parent method can resume the sandbox. Command IDs belong to their original session and do not transfer to a new VM. Use [`session.getCommand()`](#session-class-instance-methods) to keep lookup on one session.

**Returns:** `Promise<Command>`.

| Parameter     | Type          | Required | Details                                 |
| ------------- | ------------- | -------- | --------------------------------------- |
| `cmdId`       | `string`      | Yes      | Identifier of the command to fetch.     |
| `opts.signal` | `AbortSignal` | No       | Cancel the lookup if it takes too long. |

```ts
const command = await sandbox.getCommand(cmdId);
```

#### `sandbox.runCommand()`

`sandbox.runCommand()` executes commands inside the microVM, either blocking until completion or returning immediately in detached mode. Use `detached: true` for long-running servers, stream output to local log handlers, and call `command.wait()` later for results.

**Returns:** `Promise<CommandFinished>` when `detached` is `false`; `Promise<Command>` when `detached` is `true`.

| Parameter         | Type                     | Required | Details                                            |
| ----------------- | ------------------------ | -------- | -------------------------------------------------- |
| `command`         | `string`                 | Yes      | Command to execute (string overload).              |
| `args`            | `string[]`               | No       | Arguments for the string overload.                 |
| `opts.signal`     | `AbortSignal`            | No       | Cancel the command (string overload).              |
| `opts.timeoutMs` | `number` | No | Maximum command runtime in milliseconds (string overload). |
| `params.cmd`      | `string`                 | Yes      | Command to execute when using the object overload. |
| `params.args`     | `string[]`               | No       | Arguments for the object overload.                 |
| `params.cwd`      | `string`                 | No       | Working directory for execution.                   |
| `params.env`      | `Record<string, string>` | No       | Additional environment variables.                  |
| `params.sudo`     | `boolean`                | No       | Run the command with sudo.                         |
| `params.detached` | `boolean`                | No       | Return immediately with a live `Command` object.   |
| `params.stdout`   | `Writable`               | No       | Stream standard output to a writable.              |
| `params.stderr`   | `Writable`               | No       | Stream standard error to a writable.               |
| `params.stdin`    | `boolean \| Readable`    | No       | Keep stdin open, or pipe a readable to it.         |
| `params.signal`   | `AbortSignal`            | No       | Cancel the command when using the object overload. |
| `params.timeoutMs` | `number` | No | Maximum command runtime in milliseconds, including detached commands. |
| `params.onStart` | `(command: Command) => void \| Promise<void>` | No | Awaited start callback. Requires `detached` to be omitted or `false`. |

`timeoutMs` is enforced by the sandbox when execution starts. Expiry sends `SIGKILL`, even with `detached: true`. `onStart` receives the command as soon as it starts and is awaited before `runCommand()` resolves; use it only for non-detached commands:

```ts
const command = await sandbox.runCommand({
  cmd: 'sleep',
  args: ['60'],
  detached: true,
  timeoutMs: 5_000,
});
await command.wait();
```

The detached command is killed after five seconds unless it exits earlier. To observe a non-detached command starting, pass `onStart: (command) => { console.log(command.cmdId); }` instead of `detached: true`. `SandboxUser` handles accept these same controls.

Set `stdin: true` with `detached: true` to write to the command with [`writeStdin()`](#writestdin), or pass a `Readable` such as `process.stdin` to pipe it to the command, with or without `detached`. Without `stdin`, the command reads from an empty stdin.

```ts
const result = await sandbox.runCommand('node', ['--version']);
```

#### `sandbox.openInteractive()`

`sandbox.openInteractive()` opens interactive access, resuming the sandbox if needed. It returns a WebSocket URL and token for connecting your WebSocket client to a controller-hosted PTY:

```ts
const { url, token } = await sandbox.openInteractive();
```

| Parameter | Type | Required | Details |
| --------- | ---- | -------- | ------- |
| `opts.signal` | `AbortSignal` | No | Cancel opening interactive access. |

**Returns:** `Promise<{ url: string; token: string }>`.

Treat the token as a credential and close your WebSocket connection when finished. Use [`session.openInteractive()`](#session-class-instance-methods) when access must stay on one exact VM.

#### `sandbox.mkDir()`

`sandbox.mkDir()` creates a directory in the sandbox filesystem before you write files or clone repositories. Paths are relative to `sandbox.cwd` unless you provide an absolute path. Call this before `writeFiles()` when your target directory does not exist yet.

```ts
await sandbox.mkDir('assets');
```

| Parameter     | Type          | Required | Details               |
| ------------- | ------------- | -------- | --------------------- |
| `path`        | `string`      | Yes      | Directory to create.  |
| `opts.signal` | `AbortSignal` | No       | Cancel the operation. |

**Returns:** `Promise<void>`.

#### `sandbox.readFile()`

Use `sandbox.readFile()` to pull file contents from the sandbox to a Node.js readable stream. The promise resolves to `null` when the file does not exist. You can use [`sandbox.readFileToBuffer()`](#sandbox.readfiletobuffer) directly if you prefer receiving a `Buffer`.

```ts
const stream = await sandbox.readFile({ path: 'package.json' });
if (stream) {
  stream.pipe(process.stdout);
}
```

| Parameter     | Type          | Required | Details                                   |
| ------------- | ------------- | -------- | ----------------------------------------- |
| `file.path`   | `string`      | Yes      | Path to the file inside the sandbox.      |
| `file.cwd`    | `string`      | No       | Base directory for resolving `file.path`. |
| `opts.signal` | `AbortSignal` | No       | Cancel the read operation.                |

**Returns:** `Promise<NodeJS.ReadableStream | null>`.

#### `sandbox.readFileToBuffer()`

Use `sandbox.readFileToBuffer()` to pull entire file contents from the sandbox to an in-memory buffer. The promise resolves to `null` when the file does not exist.

```ts
const buffer = await sandbox.readFileToBuffer({ path: 'package.json' });
```

| Parameter     | Type          | Required | Details                                   |
| ------------- | ------------- | -------- | ----------------------------------------- |
| `file.path`   | `string`      | Yes      | Path to the file inside the sandbox.      |
| `file.cwd`    | `string`      | No       | Base directory for resolving `file.path`. |
| `opts.signal` | `AbortSignal` | No       | Cancel the read operation.                |

**Returns:** `Promise<null | Buffer>`.

#### `sandbox.downloadFile()`

Use `sandbox.downloadFile()` to pull file contents from the sandbox to a local destination. The promise resolves to the absolute destination path or `null` when the source file does not exist.

```ts
const dstPath = await sandbox.downloadFile(
  { path: 'package.json', cwd: sandbox.cwd },
  { path: 'local-package.json', cwd: '/tmp' }
);
```

| Parameter             | Type          | Required | Details                                                          |
| --------------------- | ------------- | -------- | ---------------------------------------------------------------- |
| `src.path`            | `string`      | Yes      | Path to the file inside the sandbox.                             |
| `src.cwd`             | `string`      | No       | Base directory for resolving `src.path`.                         |
| `dst.path`            | `string`      | Yes      | Path to local destination.                                       |
| `dst.cwd`             | `string`      | No       | Base directory for resolving `dst.path`.                         |
| `opts.signal`         | `AbortSignal` | No       | Cancel the download operation.                                   |
| `opts.mkdirRecursive` | `boolean`     | No       | Create destination directories recursively if they do not exist. |

**Returns:** `Promise<null | string>`.

#### `sandbox.writeFiles()`

`sandbox.writeFiles()` uploads one or more files into the sandbox filesystem. Relative paths resolve from `sandbox.cwd`; use absolute paths for custom locations and bundle related files into a single call to reduce round trips.

```ts
await sandbox.writeFiles([{ path: 'hello.txt', content: Buffer.from('hi') }]);
```

You can set Unix file permissions using the optional `mode` property. For example, use `0o755` for executable scripts:

```ts
await sandbox.writeFiles([
  { path: 'run.sh', content: Buffer.from('#!/bin/bash\necho "Hello"'), mode: 0o755 },
]);
```

| Parameter       | Type                                                  | Required | Details                                                                                       |
| --------------- | ----------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------- |
| `files`         | `{ path: string; content: string \| Uint8Array; mode?: number; }[]` | Yes      | File descriptors to write.                                                                    |
| `files.path`    | `string`                                              | Yes      | Path to the file inside the sandbox.                                                          |
| `files.content` | `string \| Uint8Array`                              | Yes      | File contents as a string or byte array, including `Buffer`.                                                                    |
| `files.mode`    | `number`                                              | No       | Unix file permissions in octal (for example, `0o644` for read/write, `0o755` for executable). |
| `opts.signal`   | `AbortSignal`                                         | No       | Cancel the write operation.                                                                   |

**Returns:** `Promise<void>`.

#### `sandbox.domain()`

`sandbox.domain()` resolves a publicly accessible URL for a port you exposed during creation. It throws if the port is not registered to a route, so include the port in the `ports` array when creating the sandbox and cache the returned URL so you can share it quickly with collaborators.

```ts
const previewUrl = sandbox.domain(3000);
```

| Parameter | Type     | Required | Details                          |
| --------- | -------- | -------- | -------------------------------- |
| `p`       | `number` | Yes      | Port number declared in `ports`. |

**Returns:** `string`.

#### `sandbox.currentSession()`

Returns the current [`Session`](#session-class) for the sandbox. A session represents a single running VM instance. The SDK creates and resumes sessions for you; usually you don't need to interact with sessions directly.

```ts
const session = sandbox.currentSession();
console.log(session.sessionId, session.status);
```

**Returns:** `Session`.

#### `sandbox.stop()`

`sandbox.stop()` resolves once the VM is fully stopped, and returns the final session state. For persistent sandboxes, the resolved value also includes metadata for the snapshot captured during shutdown. It's safe to call multiple times.

```ts
const result = await sandbox.stop();
console.log(result.snapshot?.id);
console.log(result.activeCpuDurationMs);
console.log(result.networkTransfer); // { ingress, egress }
```

| Parameter     | Type          | Required | Details                    |
| ------------- | ------------- | -------- | -------------------------- |
| `opts.signal` | `AbortSignal` | No       | Cancel the stop operation. |

**Returns:** `Promise<{ snapshot?: { id: string; status: "created" | "deleted" | "failed"; sizeBytes: number; createdAt: number; expiresAt?: number; parentId?: string }; activeCpuDurationMs: number; networkTransfer: { ingress: number; egress: number } }>`.

#### `sandbox.update()`

`sandbox.update()` changes saved sandbox configuration. Resource, mount, region, and Secure Compute network changes apply to later sessions; they don't resize or move the running VM. `ports` replaces the full exposed port list and updates the current session's routes. `networkPolicy` applies to the active session and future sessions.

`timeout` sets the default for future sessions. If it exceeds the running session's timeout, the SDK extends the live deadline by the difference. Lowering the saved timeout doesn't shorten the live deadline. Use [`sandbox.extendTimeout()`](#sandbox.extendtimeout) to add time without changing the saved default.

Updates aren't atomic. The SDK first attempts a positive live timeout extension, then applies a live network policy, then submits configuration and tags. The session-policy request can also persist the policy for future sessions when it targets the sandbox's current session. A later failure doesn't roll back earlier live changes or saved-policy changes. If the call rejects, retrieve fresh metadata and inspect the active session before retrying; don't assume nothing changed.

```ts
await sandbox.update({
  resources: { vcpus: 4 },
  timeout: 30 * 60 * 1000,
  networkPolicy: 'deny-all',
  ports: [3000, 8000],
  tags: { env: 'prod' },
  persistent: false,
  snapshotExpiration: 14 * 24 * 60 * 60 * 1000,
  keepLastSnapshots: { count: 1 },
  currentSnapshotId: 'snap_xyz', // Roll back to a previous snapshot
  mounts: {
    '/data': { drive: 'workspace-cache', mode: 'read-write' },
  }, // Replaces the mounts; pass {} to remove them
});
```

| Parameter            | Type                       | Required | Details                                                                                                |
| -------------------- | -------------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `resources.vcpus`    | `number`                   | No       | New vCPU count for future sessions (memory auto-scales to 2048 MB per vCPU).                                               |
| `timeout`            | `number`                   | No       | Saved session timeout in milliseconds. A higher value can extend the running deadline; a lower value applies only to future sessions.                                                                   |
| `networkPolicy`      | `NetworkPolicy`            | No       | Replace the firewall policy on the current and future sessions.                                        |
| `networkId`          | `string \| null`           | No       | Assign a [Secure Compute network](/docs/sandbox/concepts/secure-compute) by ID, or pass `null` to remove it. The running session keeps its current network until it stops and resumes. |
| `ports`              | `number[]`                 | No       | Replace the exposed ports. Ports not present in the array are deregistered.                            |
| `tags`               | `Record<string, string>`   | No       | Replace the tag set. Pass `{}` to clear.                                                               |
| `persistent`         | `boolean`                  | No       | Enable or disable auto-snapshotting on stop.                                                           |
| `snapshotExpiration` | `number`                   | No       | New default snapshot TTL in milliseconds. Use `0` for no expiration.                                   |
| `keepLastSnapshots`  | `object \| null`           | No       | Retention policy that keeps only the N most recent snapshots. Pass `null` to clear. See [`keepLastSnapshots`](#keeplastsnapshots) for field details. |
| `currentSnapshotId`  | `string`                   | No       | Point the sandbox at a different snapshot. New sessions resume from it.                                |
| `region`             | `string`                   | No       | [Region](/docs/sandbox/concepts/regions) for the next session. The running session keeps its current region. |
| `failoverRegions`    | `string[]`                 | No       | Replace the [failover regions](/docs/sandbox/concepts/regions#failover-regions). Must not include the sandbox's main region. Pass `[]` to remove them. Applies to the next session; the running session keeps the region it started in. Available on Pro and Enterprise plans, excluding [Pro trials](/docs/plans/pro-plan/trials). |
| `mounts`             | `SandboxMounts`            | No       | Replace the drives mounted in the next session. Pass a `Drive` for read-write access or `drive.snapshot()` for a point-in-time, read-only snapshot. Pass `{}` to remove all mounts. |
| `opts.signal`        | `AbortSignal`              | No       | Cancel the operation.                                                                                  |

**Returns:** `Promise<void>`.

#### `sandbox.delete()`

Permanently delete the sandbox and all of its sessions. By default, snapshots stay available until they expire or you delete them with [`snapshot.delete()`](#snapshot.delete). Pass `deleteOrphanSnapshots: true` to also request asynchronous deletion of this sandbox's snapshots that no other sandbox uses. Snapshots referenced by another sandbox remain available.

Discard the handle after deletion.

```ts
await sandbox.delete({ deleteOrphanSnapshots: true });
```

| Parameter                    | Type          | Required | Details                                                                                   |
| ---------------------------- | ------------- | -------- | ----------------------------------------------------------------------------------------- |
| `opts.deleteOrphanSnapshots` | `boolean`     | No       | Asynchronously delete snapshots no other sandbox uses. Defaults to `false`.                 |
| `opts.signal`               | `AbortSignal` | No       | Cancel the operation.                                                                     |

**Returns:** `Promise<void>`.

#### `sandbox.listSessions()`

List the VM sessions that have been created for this sandbox. Returns an async-iterable that auto-paginates.

```ts
const sessions = await sandbox.listSessions();
for await (const session of sessions) {
  console.log(session.id, session.status);
}
```

| Parameter   | Type              | Required | Details                            |
| ----------- | ----------------- | -------- | ---------------------------------- |
| `limit`     | `number`          | No       | Maximum number of sessions per page. |
| `cursor`    | `string`          | No       | Pagination cursor.                 |
| `sortOrder` | `"asc" \| "desc"` | No       | Sort direction. Defaults to `"desc"`. |
| `signal`    | `AbortSignal`     | No       | Cancel the request.                |

`SessionMetaData` items are plain API metadata records, not `Session` instances. Their identifier is `id`, and timestamps such as `createdAt` are numbers. Use `sandbox.currentSession()` for the current session handle.

**Returns:** `Promise<Paginated<{ sessions: SessionMetaData[]; pagination: Pagination; }>>`.

#### `sandbox.listSnapshots()`

List the snapshots that belong to this sandbox. Returns an async-iterable that auto-paginates.

```ts
const snapshots = await sandbox.listSnapshots();
for await (const snapshot of snapshots) {
  console.log(snapshot.id, snapshot.status);
}
```

| Parameter   | Type              | Required | Details                            |
| ----------- | ----------------- | -------- | ---------------------------------- |
| `limit`     | `number`          | No       | Maximum number of snapshots per page. |
| `cursor`    | `string`          | No       | Pagination cursor.                 |
| `sortOrder` | `"asc" \| "desc"` | No       | Sort direction. Defaults to `"desc"`. |
| `signal`    | `AbortSignal`     | No       | Cancel the request.                |

`SnapshotMetadata` items are plain API metadata records, not `Snapshot` instances. Their identifier is `id`, and timestamps such as `createdAt` are numbers. Retrieve a handle with `Snapshot.get({ snapshotId: record.id })`.

**Returns:** `Promise<Paginated<{ snapshots: SnapshotMetadata[]; pagination: Pagination; }>>`.

#### `sandbox.updateNetworkPolicy()` (deprecated)

> **💡 Note:** `sandbox.updateNetworkPolicy()` is deprecated. Use [`sandbox.update({ networkPolicy })`](#sandbox.update) instead.

This deprecated method targets the current session's policy endpoint rather than the sandbox configuration endpoint and can auto-resume the sandbox. The API also saves the policy for future sessions when the target remains the sandbox's current session. The sandbox handle's cached policy can remain stale. Use `sandbox.update({ networkPolicy })` to update the live policy and saved configuration, or `session.update({ networkPolicy })` to target a pinned session. See [live updates](/docs/sandbox/concepts/firewall#live-updates).

```ts
await sandbox.updateNetworkPolicy('allow-all'); // Allow all egress from the sandbox

await sandbox.updateNetworkPolicy('deny-all'); // Block all egress from the sandbox

await sandbox.updateNetworkPolicy({allow: ["google.com", "ai-gateway.vercel.sh"]}); // Allow traffic to specific websites only

// Allow traffic to specific websites and private network
await sandbox.updateNetworkPolicy({
  allow: ["google.com", "ai-gateway.vercel.sh"],
  subnets: {
    allow: ["10.0.0.0/8"],
  },
});

// Allow traffic to the Internet while blocking the specified private range
await sandbox.updateNetworkPolicy({
  allow: ["*"],
  subnets: {
    deny: ["10.0.0.0/8"],
  },
});

// Allow traffic to a specific website with credential brokering
await sandbox.updateNetworkPolicy({
  allow: {
    "ai-gateway.vercel.sh": [{
      transform: [{
        headers: {
          "x-api-key": "secret-key"
        }
      }]
    }]
  }
});
```

| Parameter       | Type            | Required | Details                                                  |
| --------------- | --------------- | -------- | -------------------------------------------------------- |
| `networkPolicy` | `NetworkPolicy` | Yes      | Replace the current session's entire firewall policy. |
| `opts.signal`   | `AbortSignal`   | No       | Cancel the operation.                                    |

**Returns:** `Promise<NetworkPolicy>`, containing the updated session's [incomplete policy readback](#policy-readback).

#### `sandbox.extendTimeout()`

Use `sandbox.extendTimeout()` to add the specified duration to the live session's deadline, up to the maximum execution timeout for your plan. Check `sandbox.expiresAt` to estimate the remaining time. The saved `sandbox.timeout` default stays unchanged.

This parent-handle method can automatically resume a stopped sandbox before extending its new session. To extend only an already-running session, use `sandbox.currentSession().extendTimeout()` or [`sandbox extend`](/docs/sandbox/cli-reference#sandbox-extend).

```ts
await sandbox.extendTimeout(60000); // Extend by 60 seconds
```

| Parameter     | Type          | Required | Details                                            |
| ------------- | ------------- | -------- | -------------------------------------------------- |
| `duration`    | `number`      | Yes      | Duration in milliseconds to extend the timeout by. |
| `opts.signal` | `AbortSignal` | No       | Cancel the operation.                              |

**Returns:** `Promise<void>`.

#### `sandbox.snapshot()`

Call `sandbox.snapshot()` to capture the current state of the sandbox, including the filesystem and installed packages. Use snapshots to skip lengthy setup steps when creating new sandboxes. To learn more, see [Snapshots](/docs/sandbox/concepts/snapshots).

`sandbox.snapshot()` resumes the sandbox if necessary, then snapshots and stops that session. The stopped VM's processes terminate, and its `Session` and command handles remain tied to that session. You don't need to call `stop()` afterwards.

The parent `Sandbox` handle remains usable. A later operation such as `sandbox.runCommand()` can automatically resume a new session, which can incur additional usage charges. Resuming doesn't restart old processes or reactivate handles from the previous session.

> **💡 Note:** Snapshots expire 30 days after their last use by default. Set `expiration` to `0` to disable expiration,
> or choose a custom duration in milliseconds (e.g., `ms('14d')`) to fit your workflow.

```ts filename="index.ts"
const snapshot = await sandbox.snapshot({ expiration: ms('14d') });
console.log(snapshot.snapshotId);

// Later, create a new sandbox from the snapshot
const newSandbox = await Sandbox.create({
  source: { type: 'snapshot', snapshotId: snapshot.snapshotId },
});
```

| Parameter         | Type          | Required | Details                                                                   |
| ----------------- | ------------- | -------- | ------------------------------------------------------------------------- |
| `opts.expiration` | `number`      | No       | Optional expiration time in milliseconds, measured from the snapshot's last use. Use 0 for no expiration at all. |
| `opts.signal`     | `AbortSignal` | No       | Cancel the operation.                                                     |

**Returns:** `Promise<Snapshot>`.

#### `sandbox.createUser()`

`sandbox.createUser()` adds a Linux user with an isolated home directory at `/home/<username>`. The user gets `/bin/bash` as their login shell, and their home directory is private to other users but readable by the SDK. Use this to give each agent in a [multi-agent workflow](/docs/sandbox/concepts/multi-agent) its own workspace.

```ts
const alice = await sandbox.createUser('alice');
console.log(alice.username, alice.homeDir); // "alice" "/home/alice"
```

| Parameter     | Type          | Required | Details                                                                             |
| ------------- | ------------- | -------- | ----------------------------------------------------------------------------------- |
| `username`    | `string`      | Yes      | Linux username. Must match `/^[a-z_][a-z0-9_-]*$/` and be at most 32 characters.     |
| `opts.signal` | `AbortSignal` | No       | Cancel the operation.                                                               |

**Returns:** `Promise<SandboxUser>`.

#### `sandbox.asUser()`

`sandbox.asUser()` returns a [`SandboxUser`](#sandboxuser-class) handle for a user that already exists, without creating it. Use it for users restored from a snapshot or created outside the SDK, such as `root`.

```ts
const bob = sandbox.asUser('bob');
```

| Parameter  | Type     | Required | Details                                                                         |
| ---------- | -------- | -------- | ------------------------------------------------------------------------------- |
| `username` | `string` | Yes      | Linux username. Must match `/^[a-z_][a-z0-9_-]*$/` and be at most 32 characters. |

**Returns:** `SandboxUser`.

#### `sandbox.createGroup()`

`sandbox.createGroup()` creates a Linux group with a shared directory at `/shared/<groupname>`. The directory uses the setgid bit, so files created inside it inherit the group, and every member can read one another's files and add their own. Add members with [`sandbox.addUserToGroup()`](#sandboxaddusertogroup).

```ts
const devs = await sandbox.createGroup('devs');
console.log(devs.sharedDir); // "/shared/devs"
```

| Parameter     | Type          | Required | Details                                                                            |
| ------------- | ------------- | -------- | --------------------------------------------------------------------------------- |
| `groupname`   | `string`      | Yes      | Group name. Must match `/^[a-z_][a-z0-9_-]*$/` and be at most 32 characters.       |
| `opts.signal` | `AbortSignal` | No       | Cancel the operation.                                                             |

**Returns:** `Promise<{ groupname: string; sharedDir: string }>`.

#### `sandbox.addUserToGroup()`

`sandbox.addUserToGroup()` adds a user to a group. Once added, the user can access the group's shared directory at `/shared/<groupname>`, where every member can read one another's files and add their own.

```ts
await sandbox.addUserToGroup('alice', 'devs');
```

| Parameter     | Type          | Required | Details                          |
| ------------- | ------------- | -------- | -------------------------------- |
| `username`    | `string`      | Yes      | The user to add.                 |
| `groupname`   | `string`      | Yes      | The group to add the user to.    |
| `opts.signal` | `AbortSignal` | No       | Cancel the operation.            |

**Returns:** `Promise<void>`.

#### `sandbox.removeUserFromGroup()`

`sandbox.removeUserFromGroup()` removes a user from a group, revoking their access to the group's shared directory. Revocation applies to new commands immediately. Processes already running as that user keep the group until they exit.

```ts
await sandbox.removeUserFromGroup('alice', 'devs');
```

| Parameter     | Type          | Required | Details                             |
| ------------- | ------------- | -------- | ----------------------------------- |
| `username`    | `string`      | Yes      | The user to remove.                 |
| `groupname`   | `string`      | Yes      | The group to remove the user from.  |
| `opts.signal` | `AbortSignal` | No       | Cancel the operation.               |

**Returns:** `Promise<void>`.

## SandboxUser class

A `SandboxUser` runs commands and file operations as a specific Linux user. Commands execute as that user, and file methods resolve relative paths against the user's home directory. Get an instance from [`sandbox.createUser()`](#sandboxcreateuser) or [`sandbox.asUser()`](#sandboxasuser). See [Multi-agent sandboxes](/docs/sandbox/concepts/multi-agent) for a task-oriented guide.

The sandbox image must include `/bin/bash` for user execution.

### SandboxUser class accessors

#### `username`

The Linux username this instance runs as.

**Returns:** `string`.

#### `homeDir`

The user's home directory. This is `/home/<username>` for users created with `createUser()`, and `/root` for the `root` user.

**Returns:** `string`.

```ts
const alice = await sandbox.createUser('alice');
console.log(alice.homeDir); // "/home/alice"
```

### SandboxUser class instance methods

#### `user.runCommand()`

`user.runCommand()` runs a command as this user. It accepts the same arguments as [`sandbox.runCommand()`](#sandboxruncommand), with two differences: the working directory defaults to the user's home directory, and passing `sudo: true` escalates that single command to root.

**Returns:** `Promise<CommandFinished>` when `detached` is `false`; `Promise<Command>` when `detached` is `true`.

| Parameter         | Type                     | Required | Details                                                        |
| ----------------- | ------------------------ | -------- | -------------------------------------------------------------- |
| `command`         | `string`                 | Yes      | Command to execute (string overload).                          |
| `args`            | `string[]`               | No       | Arguments for the string overload.                             |
| `opts.signal`     | `AbortSignal`            | No       | Cancel the command (string overload).                          |
| `opts.timeoutMs` | `number` | No | Maximum command runtime in milliseconds (string overload). |
| `params.cmd`      | `string`                 | Yes      | Command to execute when using the object overload.             |
| `params.args`     | `string[]`               | No       | Arguments for the object overload.                             |
| `params.cwd`      | `string`                 | No       | Working directory. Defaults to the user's home directory.      |
| `params.env`      | `Record<string, string>` | No       | Additional environment variables.                              |
| `params.sudo`     | `boolean`                | No       | Run the command as root instead of this user.                  |
| `params.detached` | `boolean`                | No       | Return immediately with a live `Command` object.               |
| `params.stdout`   | `Writable`               | No       | Stream standard output to a writable.                          |
| `params.stderr`   | `Writable`               | No       | Stream standard error to a writable.                           |
| `params.stdin`    | `boolean \| Readable`    | No       | Keep stdin open, or pipe a readable to it.                     |
| `params.signal`   | `AbortSignal`            | No       | Cancel the command when using the object overload.             |
| `params.timeoutMs` | `number` | No | Maximum command runtime in milliseconds, including detached commands. |
| `params.onStart` | `(command: Command) => void \| Promise<void>` | No | Awaited start callback. Requires `detached` to be omitted or `false`. |

```ts
const whoami = await alice.runCommand('whoami');
console.log(await whoami.stdout()); // "alice\n"

// Object form with environment variables and a custom working directory
await alice.runCommand({
  cmd: 'node',
  args: ['index.js'],
  env: { API_KEY: 'your_api_key_here' },
  cwd: '/tmp',
});
```

#### `user.writeFiles()`

`user.writeFiles()` writes files as this user. Relative paths resolve to the user's home directory, and the written files are owned by the user.

```ts
await alice.writeFiles([
  { path: 'app.js', content: Buffer.from('console.log("hi")') },
]);
```

| Parameter       | Type                                                  | Required | Details                                                              |
| --------------- | ----------------------------------------------------- | -------- | ------------------------------------------------------------------- |
| `files`         | `{ path: string; content: string \| Uint8Array; mode?: number; }[]` | Yes      | File descriptors to write. Relative paths resolve to the home directory. |
| `opts.signal`   | `AbortSignal`                                         | No       | Cancel the operation.                                              |

**Returns:** `Promise<void>`.

#### `user.readFile()`

`user.readFile()` reads a file as this user and returns a stream, or `null` if the file does not exist. Relative paths resolve to the user's home directory.

```ts
const stream = await alice.readFile({ path: 'app.js' });
// stream is a Node.js ReadableStream, or null if the file does not exist.
// For a Buffer instead of a stream, use readFileToBuffer().
```

| Parameter     | Type                          | Required | Details                                                     |
| ------------- | ----------------------------- | -------- | ----------------------------------------------------------- |
| `file`        | `{ path: string; cwd?: string }` | Yes   | File to read. A relative `path` resolves to the home directory. |
| `opts.signal` | `AbortSignal`                 | No       | Cancel the operation.                                      |

**Returns:** `Promise<NodeJS.ReadableStream | null>`.

#### `user.readFileToBuffer()`

`user.readFileToBuffer()` reads a file as this user and returns a `Buffer`, or `null` if the file does not exist. Relative paths resolve to the user's home directory.

```ts
const buf = await alice.readFileToBuffer({ path: 'app.js' });
console.log(buf?.toString());
```

| Parameter     | Type                             | Required | Details                                                     |
| ------------- | -------------------------------- | -------- | ---------------------------------------------------------- |
| `file`        | `{ path: string; cwd?: string }` | Yes      | File to read. A relative `path` resolves to the home directory. |
| `opts.signal` | `AbortSignal`                    | No       | Cancel the operation.                                      |

**Returns:** `Promise<Buffer | null>`.

#### `user.downloadFile()`

`user.downloadFile()` reads a file as this user and writes it to the local filesystem, returning the absolute local path, or `null` if the source file does not exist.

```ts
await alice.downloadFile({ path: 'app.js' }, { path: './app.js' });
```

| Parameter             | Type                             | Required | Details                                                         |
| --------------------- | -------------------------------- | -------- | ------------------------------------------------------------- |
| `src`                 | `{ path: string; cwd?: string }` | Yes      | Source file in the sandbox. A relative `path` resolves to the home directory. |
| `dst`                 | `{ path: string; cwd?: string }` | Yes      | Destination on the local machine.                             |
| `opts.mkdirRecursive` | `boolean`                        | No       | Create parent directories on the local machine if they are missing. |
| `opts.signal`         | `AbortSignal`                    | No       | Cancel the operation.                                        |

**Returns:** `Promise<string | null>`.

#### `user.mkDir()`

`user.mkDir()` creates a directory owned by this user. Relative paths resolve to the user's home directory.

```ts
await alice.mkDir('projects/my-app');
```

| Parameter     | Type          | Required | Details                                                       |
| ------------- | ------------- | -------- | ------------------------------------------------------------ |
| `path`        | `string`      | Yes      | Directory to create. A relative path resolves to the home directory. |
| `opts.signal` | `AbortSignal` | No       | Cancel the operation.                                       |

**Returns:** `Promise<void>`.

#### `user.addToGroup()`

`user.addToGroup()` adds this user to a group. It is a convenience wrapper around [`sandbox.addUserToGroup()`](#sandboxaddusertogroup).

```ts
await alice.addToGroup('devs');
```

| Parameter     | Type          | Required | Details                       |
| ------------- | ------------- | -------- | ----------------------------- |
| `groupname`   | `string`      | Yes      | The group to join.            |
| `opts.signal` | `AbortSignal` | No       | Cancel the operation.         |

**Returns:** `Promise<void>`.

#### `user.removeFromGroup()`

`user.removeFromGroup()` removes this user from a group. It is a convenience wrapper around [`sandbox.removeUserFromGroup()`](#sandboxremoveuserfromgroup).

```ts
await alice.removeFromGroup('devs');
```

| Parameter     | Type          | Required | Details                       |
| ------------- | ------------- | -------- | ----------------------------- |
| `groupname`   | `string`      | Yes      | The group to leave.           |
| `opts.signal` | `AbortSignal` | No       | Cancel the operation.         |

**Returns:** `Promise<void>`.

## Session class

A `Session` represents a single running VM instance inside a sandbox. Sessions are created and resumed for you whenever the sandbox transitions from `stopped` to `running`. Use `sandbox.currentSession()` to inspect the active one, or `sandbox.listSessions()` to enumerate every session the sandbox has run.

### Session class instance methods

A `Session` stays pinned to one VM. Its methods don't automatically resume a stopped sandbox or switch to a newer session. Use the parent `Sandbox` methods when automatic resume is intended. Historical handles can expose metadata, but stopping the VM ends its running processes and interactive connections.

| Method | Parameters and behavior | Returns |
| ------ | ----------------------- | ------- |
| `getCommand(cmdId, opts?)` | Look up a command in this session. IDs from another session don't transfer. | `Promise<Command>` |
| `runCommand(...)` | Same overloads and controls as [`sandbox.runCommand()`](#sandbox.runcommand), on this VM. | `Promise<CommandFinished>` or `Promise<Command>` |
| `mkDir(path, opts?)` | Same arguments as [`sandbox.mkDir()`](#sandbox.mkdir). | `Promise<void>` |
| `readFile(file, opts?)` | Same arguments as [`sandbox.readFile()`](#sandbox.readfile). | `Promise<NodeJS.ReadableStream \| null>` |
| `readFileToBuffer(file, opts?)` | Same arguments as [`sandbox.readFileToBuffer()`](#sandbox.readfiletobuffer). | `Promise<Buffer \| null>` |
| `downloadFile(src, dst, opts?)` | Same arguments as [`sandbox.downloadFile()`](#sandbox.downloadfile). | `Promise<string \| null>` |
| `writeFiles(files, opts?)` | Same arguments as [`sandbox.writeFiles()`](#sandbox.writefiles). | `Promise<void>` |
| `domain(port)` | Resolve this session's route for a port. | `string` |
| `openInteractive(opts?)` | Same connection details as [`sandbox.openInteractive()`](#sandbox.openinteractive), on this VM. | `Promise<{ url: string; token: string }>` |
| `stop(opts?)` | Stop this session. | `Promise<{ session: SandboxSnapshot; sandbox?: SandboxMetaData; snapshot?: SnapshotMetadata }>` |
| `update({ networkPolicy }, opts?)` | Update this session's network policy. Accepts no parent sandbox settings such as `timeout`. | `Promise<void>` |
| `extendTimeout(duration, opts?)` | Extend this running session by a duration in milliseconds. | `Promise<void>` |
| `snapshot(opts?)` | Snapshot this session. Accepts `expiration` in milliseconds (`0` for no expiration) and `signal`. Stops this VM. | `Promise<Snapshot>` |

`opts.signal` cancels operations that accept an options object. `domain()` is synchronous and takes only a port. `snapshot()` takes its options directly.

Keep a session handle when command lookup must target the original VM:

```ts
const session = sandbox.currentSession();
const command = await session.runCommand({ cmd: 'sleep', args: ['30'], detached: true });
const sameCommand = await session.getCommand(command.cmdId);
await sameCommand.wait();
```

A later parent resume creates a different session. It doesn't reactivate old process handles or move their command IDs to the new VM.

### Session class accessors

Read-only accessors on a `Session` instance returned by `sandbox.currentSession()`. Iterating `sandbox.listSessions()` yields plain API metadata records, not `Session` instances. Records use `id` instead of `sessionId` and numeric timestamps instead of `Date` accessors.

| Accessor                 | Returns                                                       | Description                                   |
| ------------------------ | ------------------------------------------------------------- | --------------------------------------------- |
| `sessionId`              | `string`                                                      | Unique identifier of the session.             |
| `status`                 | `"pending" \| "running" \| "stopping" \| "stopped" \| "failed" \| "aborted" \| "snapshotting"` | Cached lifecycle state. Repeated reads don't poll the API. |
| `createdAt`              | `Date`                                                        | When the session started.                     |
| `activeCpuUsageMs`       | `number \| undefined`                                          | CPU used during the session, in milliseconds. Available once the session is stopped. |
| `networkTransfer`        | `{ ingress: number; egress: number } \| undefined`            | Network traffic during the session. Available once the session is stopped. |
| `routes` | `SandboxRouteData[]` | Routes associated with this session. |
| `timeout` | `number` | This session's timeout in milliseconds, separate from the parent sandbox's saved default. |
| `interactivePort` | `number \| undefined` | Interactive controller port when available. |
| `networkPolicy` | `NetworkPolicy \| undefined` | Session network policy. |
| `sourceSnapshotId` | `string \| undefined` | Snapshot used to start this VM. |
| `memory`, `vcpus` | `number` | Memory in MB and vCPU count, respectively. |
| `region` | `string` | VM region. |
| `cwd` | `string` | Session working directory. |
| `requestedAt`, `updatedAt` | `Date` | Request and metadata update times. |
| `startedAt`, `requestedStopAt`, `stoppedAt`, `abortedAt`, `snapshottedAt` | `Date \| undefined` | Lifecycle timestamps when available. |
| `duration` | `number \| undefined` | Wall-clock duration in milliseconds. |
| `runtime` | `string \| undefined` | Deprecated runtime identifier. Use parent sandbox image metadata. |

```ts
const session = sandbox.currentSession();
console.log(session.sessionId, session.status);
```

To observe external changes, retrieve a fresh parent handle with `Sandbox.get({ name: sandbox.name, resume: false })` and inspect its current session. The old `Session` handle continues to describe its original VM; a later resume creates a different session. Status reads don't synchronize concurrent stop, snapshot, or command operations.

## FileSystem class

`FileSystem` gives you a `node:fs/promises`-compatible surface for sandbox files and directories. Use it through `sandbox.fs` to keep code portable when you already have utilities that expect familiar Node.js filesystem methods.

```ts
const sandbox = await Sandbox.create();

await sandbox.fs.writeFile('/tmp/hello.txt', 'hello from sandbox');
const text = await sandbox.fs.readFile('/tmp/hello.txt', 'utf8');
console.log(text);
```

> **💡 Note:** `FileSystem` currently implements a focused subset of `node:fs/promises` for sandbox
> workflows. APIs such as file handles and watchers are not currently included.

### FileSystem class methods

All methods support `AbortSignal` through an options object.
Methods throw Node.js-style filesystem errors with fields such as `code`, `syscall`, and `path`.

#### Read and write file contents

| Method                    | Signature summary                                                                                 | Returns             |
| ------------------------- | ------------------------------------------------------------------------------------------------- | ------------------- |
| `sandbox.fs.readFile()`   | `path`, optional encoding (`'utf8'` or `{ encoding, signal }`)                                   | `Promise<Buffer \| string>` |
| `sandbox.fs.writeFile()`  | `path`, `string \| Buffer \| Uint8Array`, optional `{ encoding, signal }`                        | `Promise<void>`     |
| `sandbox.fs.appendFile()` | `path`, `string \| Buffer \| Uint8Array`, optional `{ encoding, signal }`                        | `Promise<void>`     |

```ts
await sandbox.fs.writeFile('/tmp/config.json', JSON.stringify({ mode: 'test' }));
const config = await sandbox.fs.readFile('/tmp/config.json', 'utf8');
await sandbox.fs.appendFile('/tmp/config.json', '\n');
```

#### Create, inspect, and enumerate paths

| Method                  | Signature summary                                             | Returns                   |
| ----------------------- | ------------------------------------------------------------- | ------------------------- |
| `sandbox.fs.mkdir()`    | `path`, optional `{ recursive, signal }`                      | `Promise<string \| undefined>` |
| `sandbox.fs.readdir()`  | `path`, optional `{ withFileTypes, signal }`                  | `Promise<string[] \| Dirent[]>` |
| `sandbox.fs.stat()`     | `path`, optional `{ signal }`                                 | `Promise<Stats>`          |
| `sandbox.fs.lstat()`    | `path`, optional `{ signal }`                                 | `Promise<Stats>`          |
| `sandbox.fs.realpath()` | `path`, optional `{ signal }`                                 | `Promise<string>`         |
| `sandbox.fs.mkdtemp()`  | `prefix`, optional `{ signal }`                               | `Promise<string>`         |

```ts
await sandbox.fs.mkdir('/tmp/results', { recursive: true });

const entries = await sandbox.fs.readdir('/tmp', { withFileTypes: true });
for (const entry of entries) {
  if (entry.isDirectory()) console.log(`dir: ${entry.name}`);
}

const stats = await sandbox.fs.stat('/tmp/results');
console.log(stats.isDirectory()); // true
```

#### Update, copy, or remove files and directories

| Method                   | Signature summary                             | Returns         |
| ------------------------ | --------------------------------------------- | --------------- |
| `sandbox.fs.unlink()`    | `path`, optional `{ signal }`                 | `Promise<void>` |
| `sandbox.fs.rm()`        | `path`, optional `{ recursive, force, signal }` | `Promise<void>` |
| `sandbox.fs.rmdir()`     | `path`, optional `{ signal }`                 | `Promise<void>` |
| `sandbox.fs.rename()`    | `oldPath`, `newPath`, optional `{ signal }`   | `Promise<void>` |
| `sandbox.fs.copyFile()`  | `src`, `dest`, optional `{ signal }`          | `Promise<void>` |
| `sandbox.fs.truncate()`  | `path`, optional `len`, optional `{ signal }` | `Promise<void>` |

```ts
await sandbox.fs.copyFile('/tmp/input.txt', '/tmp/output.txt');
await sandbox.fs.rename('/tmp/output.txt', '/tmp/final.txt');
await sandbox.fs.truncate('/tmp/final.txt', 1024);
await sandbox.fs.rm('/tmp/final.txt');
```

#### Manage permissions, ownership, and symbolic links

| Method                  | Signature summary                                    | Returns           |
| ----------------------- | ---------------------------------------------------- | ----------------- |
| `sandbox.fs.chmod()`    | `path`, mode (`number \| string`), optional `{ signal }` | `Promise<void>`   |
| `sandbox.fs.chown()`    | `path`, `uid`, `gid`, optional `{ signal }`          | `Promise<void>`   |
| `sandbox.fs.symlink()`  | `target`, `path`, optional `{ signal }`              | `Promise<void>`   |
| `sandbox.fs.readlink()` | `path`, optional `{ signal }`                        | `Promise<string>` |

```ts
await sandbox.fs.chmod('/tmp/script.sh', 0o755);
await sandbox.fs.symlink('/tmp/script.sh', '/tmp/current-script');
const linkTarget = await sandbox.fs.readlink('/tmp/current-script');
console.log(linkTarget);
```

#### Check existence and accessibility

| Method               | Signature summary                    | Returns            |
| -------------------- | ------------------------------------ | ------------------ |
| `sandbox.fs.access()` | `path`, optional `{ signal }`       | `Promise<void>`    |
| `sandbox.fs.exists()` | `path`, optional `{ signal }`       | `Promise<boolean>` |

```ts
await sandbox.fs.access('/tmp/config.json');
const hasCache = await sandbox.fs.exists('/tmp/cache.db');
```

`sandbox.fs.exists()` is a convenience helper that is not part of the Node.js `node:fs/promises` API.
`sandbox.fs.access()` currently checks path existence.

## Command class

`Command` instances represent processes that run inside a sandbox. Detached executions created through `sandbox.runCommand({ detached: true, ... })` return a `Command` immediately so that you can stream logs or stop the process later. Blocking executions that do not set `detached` still expose these methods through the `CommandFinished` object they resolve to.

### Command class accessors

#### `exitCode`

The `exitCode` property holds the process exit status once the command finishes. For detached commands, this value starts as `null` and gets populated after you await [`command.wait()`](#wait), so check for `null` to determine if the command is still running.

```ts
if (command.exitCode !== null) {
  console.log(`Command exited with code: ${command.exitCode}`);
}
```

**Returns:** `number | null`.

#### `durationMs`

The `durationMs` property measures how long the command took to execute in milliseconds. For detached commands, the value starts as `undefined` and gets populated after you await [`command.wait()`](#wait).

```ts
if (command.durationMs) {
  console.log(`Command ran for: ${command.durationMs}ms`);
}
```

**Returns:** `number | undefined`.

#### `cmdId`

Use `cmdId` to identify the specific command execution so you can look it up later with `sandbox.getCommand()`. Store this value whenever you launch detached commands so you can replay output in dashboards or correlate logs across systems.

```ts
console.log(command.cmdId);
```

**Returns:** `string`.

#### `cwd`

The `cwd` accessor shows the working directory where the command is executing. Compare this value against expected paths when debugging file-related issues or verifying that relative paths resolve correctly.

```ts
console.log(command.cwd);
```

**Returns:** `string`.

#### `startedAt`

`startedAt` returns the Unix timestamp (in milliseconds) when the command started executing. Subtract this from the current time to monitor execution duration or set timeout thresholds for long-running processes.

```ts
const duration = Date.now() - command.startedAt;
console.log(`Command has been running for ${duration}ms`);
```

**Returns:** `number`.

### Command class methods

#### `logs()`

Call `logs()` to stream structured log entries in real time so you can watch command output as it happens. Each entry includes the stream type (`stdout` or `stderr`) and the data chunk, so you can route logs to different destinations or stop iteration when you detect a readiness signal.

```ts
for await (const log of command.logs()) {
  if (log.stream === 'stdout') {
    process.stdout.write(log.data);
  } else {
    process.stderr.write(log.data);
  }
}
```

| Parameter     | Type          | Required | Details                         |
| ------------- | ------------- | -------- | ------------------------------- |
| `opts.signal` | `AbortSignal` | No       | Cancel log streaming if needed. |

**Returns:** `AsyncGenerator<{ stream: "stdout" | "stderr"; data: string; }, void, void>`.

**Note:** May throw `StreamError` if the sandbox stops while streaming logs.

#### `wait()`

Use `wait()` to block until a detached command finishes and get the resulting `CommandFinished` object with the populated exit code. This method is essential for detached commands where you need to know when execution completes. For non-detached commands, `sandbox.runCommand()` already waits automatically.

```ts
const detachedCmd = await sandbox.runCommand({
  cmd: 'sleep',
  args: ['5'],
  detached: true,
});
const result = await detachedCmd.wait();
if (result.exitCode !== 0) {
  console.error('Something went wrong...');
}
```

| Parameter       | Type          | Required | Details                                    |
| --------------- | ------------- | -------- | ------------------------------------------ |
| `params.signal` | `AbortSignal` | No       | Cancel waiting if you need to abort early. |

**Returns:** `Promise<CommandFinished>`.

#### `output()`

Use `output()` to retrieve stdout, stderr, or both as a single string. Choose `"both"` when you want combined output for logging, or specify `"stdout"` or `"stderr"` when you need to process them separately after the command finishes.

```ts
const combined = await command.output('both');
const stdoutOnly = await command.output('stdout');
```

| Parameter     | Type                             | Required | Details                    |
| ------------- | -------------------------------- | -------- | -------------------------- |
| `stream`      | `"stdout" \| "stderr" \| "both"` | Yes      | The output stream to read. |
| `opts.signal` | `AbortSignal`                    | No       | Cancel output streaming.   |

**Returns:** `Promise<string>`.

**Note:** This may throw string conversion errors if the command output contains invalid Unicode.

#### `stdout()`

`stdout()` collects the entire standard output stream as a string, which is handy when commands print JSON or other structured data that you need to parse after completion.

```ts
const output = await command.stdout();
const data = JSON.parse(output);
```

| Parameter     | Type          | Required | Details                                 |
| ------------- | ------------- | -------- | --------------------------------------- |
| `opts.signal` | `AbortSignal` | No       | Cancel the read while the command runs. |

**Returns:** `Promise<string>`.

**Note:** This may throw string conversion errors if the command output contains invalid Unicode.

#### `stderr()`

`stderr()` gathers all error output produced by the command. Combine this with `exitCode` to build user-friendly error messages or forward failure logs to your monitoring system.

```ts
const errors = await command.stderr();
if (errors) {
  console.error('Command errors:', errors);
}
```

| Parameter     | Type          | Required | Details                                        |
| ------------- | ------------- | -------- | ---------------------------------------------- |
| `opts.signal` | `AbortSignal` | No       | Cancel the read while collecting error output. |

**Returns:** `Promise<string>`.

**Note:** This may throw string conversion errors if the command output contains invalid Unicode.

#### `kill()`

Call `kill()` to terminate a running command using the specified signal. This lets you stop long-running processes without destroying the entire sandbox. Send `SIGTERM` by default for graceful shutdown, or use `SIGKILL` for immediate termination.

```ts
await command.kill('SIGKILL');
```

| Parameter          | Type          | Required | Details                                                   |
| ------------------ | ------------- | -------- | --------------------------------------------------------- |
| `signal`           | `Signal`      | No       | The signal to send to the process. Defaults to `SIGTERM`. |
| `opts.abortSignal` | `AbortSignal` | No       | Cancel the kill operation.                                |

**Returns:** `Promise<void>`.

#### `writeStdin()`

Call `writeStdin()` to send input to a running command started with `stdin: true` and `detached: true`. Writes reach the process in the order you call them, and each one resolves once the process has accepted the data. A write fails after 30 seconds if the process isn't reading stdin. The process reads from a pipe, not a terminal.

```ts
const command = await sandbox.runCommand({
  cmd: 'cat',
  detached: true,
  stdin: true,
});
await command.writeStdin('hello\n');
await command.closeStdin();
const result = await command.wait();
console.log(await result.stdout()); // "hello\n"
```

| Parameter          | Type                   | Required | Details                                          |
| ------------------ | ---------------------- | -------- | ------------------------------------------------ |
| `data`             | `string \| Uint8Array` | Yes      | The data to write. Strings are encoded as UTF-8. |
| `opts.abortSignal` | `AbortSignal`          | No       | Cancel the write.                                |

**Returns:** `Promise<void>`.

**Note:** If a write fails, part of it may have reached the process, and later writes to that command are rejected. You can still call `closeStdin()` or `kill()`. Write to a command from one place at a time.

#### `closeStdin()`

Call `closeStdin()` to close the command's stdin. The process reads end of input once it has consumed everything written, so use this for commands that wait for it, such as `cat` or `sort`.

```ts
await command.closeStdin();
```

| Parameter          | Type          | Required | Details               |
| ------------------ | ------------- | -------- | --------------------- |
| `opts.abortSignal` | `AbortSignal` | No       | Cancel the operation. |

**Returns:** `Promise<void>`.

## CommandFinished class

`CommandFinished` is the result you receive after a sandbox command exits. It extends the `Command` class, so you keep access to streaming helpers such as `logs()` or `stdout()`, but you also get the final exit metadata immediately. You usually receive this object from `sandbox.runCommand()` or by awaiting `command.wait()` on a detached process.

### CommandFinished class accessors

#### `exitCode`

The `exitCode` property reports the numeric status returned by the command. A value of `0` indicates success; any other value means the process exited with an error, so branch on it before you parse output.

```ts
if (result.exitCode === 0) {
  console.log('Command succeeded');
}
```

**Returns:** `number`.

#### `durationMs`

The `durationMs` property measures how long the command took to execute in milliseconds. Use this value to measure performance metrics or detect unusually long-running commands. The value is `undefined` for older commands that were executed before this property existed.

```ts
if (result.durationMs) {
  console.log(`Command ran for ${result.durationMs}ms`);
}
```

**Returns:** `number | undefined`.

#### `cmdId`

Use `cmdId` to identify the specific command execution so you can reference it in logs or retrieve it later with `sandbox.getCommand()`. Store this ID whenever you need to trace command history or correlate output across retries.

```ts
console.log(result.cmdId);
```

**Returns:** `string`.

#### `cwd`

The `cwd` accessor shows the working directory where the command executed. Compare this value against expected paths when debugging file-related failures or relative path issues.

```ts
console.log(result.cwd);
```

**Returns:** `string`.

#### `startedAt`

`startedAt` returns the Unix timestamp (in milliseconds) when the command started executing. Subtract this from the current time or from another timestamp to measure execution duration or schedule follow-up tasks.

```ts
const duration = Date.now() - result.startedAt;
console.log(`Command took ${duration}ms`);
```

**Returns:** `number`.

### CommandFinished class methods

`CommandFinished` inherits all methods from `Command` including `logs()`, `output()`, `stdout()`, `stderr()`, and `kill()`. See the [Command class](#command-class) section for details on these methods. `writeStdin()` and `closeStdin()` always reject on a `CommandFinished`, because the process has exited.

## NetworkPolicy type

`NetworkPolicy` is an exported TypeScript union type for the sandbox firewall configuration. Use `"allow-all"`, `"deny-all"`, or a custom policy object. To learn more, see [network firewall](/docs/sandbox/concepts/firewall).

### Base modes

#### `allow-all`

The `allow-all` mode is the default applicable policy for sandboxes. It allows all egress traffic, to the Internet and secure-compute environments.

#### `deny-all`

The `deny-all` mode can be set to restrict sandbox network access. It blocks all egress traffic, including DNS resolution.

### User-defined rules

#### `allow`

> Transformation and forwarding rules are available on Enterprise and Pro plans

The `allow` property allows the user to provide a list of website or API domains to allow access to.
Traffic identification is based on SNI (server-name indicator), hence only TLS traffic is currently supported.
Matching is based on:

- if the domain does not contain any wildcard `*` segment, only exact matches are accepted.
- if the domain includes a wildcard `*` as a middle segment (e.g. `www.*.com`), it only matches this one segment.
- if the domain starts with a wildcard `*` (e.g. `*.google.com`), any subdomain is matched. It will not match the parent domain (e.g. `google.com` here).

Encryption is not intercepted if no transformation, forwarding, or direct-response rules are defined, allowing end-to-end data confidentiality.

The `allow` property can be an object mapping allowed domains to rules. Each rule defines exactly one action, using `transform`, `forwardURL`, or `response`. The firewall terminates TLS for domains with these rules to inspect requests and apply the action.

Each rule can define [matchers](/docs/sandbox/concepts/firewall#matchers) on the path, method, query parameters, and headers. All specified dimensions must match. `method` takes a string array, such as `["GET", "POST"]`; matching any listed method succeeds. Path, header, and query matchers use `exact`, `startsWith`, or `regex`.

Rules run in declaration order, and the first matching rule handles the request. A rule without `match` matches every request to the domain. If no rule matches, the request reaches the allowed domain unchanged. To restrict paths, put a catch-all `response` rule after the accepted paths, as shown in [direct responses](/docs/sandbox/concepts/firewall#direct-responses).

```ts filename="index.ts"
// Allow traffic only to the provided websites.
{
  "allow": ["ai-gateway.vercel.sh", "google.com"]
}

// Allow traffic to all websites and add transformations to specific ones.
{
  "allow": {
    "ai-gateway.vercel.sh": [{
      "transform": [{
        "headers": {
          "x-api-key": "secret-key"
        }
      }]
    }],
    "*.github.com": [{
      "match": {
        "method": ["POST"]
      },
      "forwardURL": "https://my-proxy.vercel.app/github"
    }],
    "*.openai.com": [{
      "match": {
        "path": {
          "startsWith": "/v1/chat/completions"
        }
      },
      "transform": [{
        "headers": {
          "x-api-key": "other-secret-key"
        }
      }]
    }],
    // Optionally allow traffic to all other domains.
    "*": []
  }
}
```

#### `response`

The `response` action returns a response from the network proxy without contacting the destination. Use a final rule without `match` to reject requests that earlier rules did not handle:

```ts filename="policy.ts"
import type { NetworkPolicy } from '@vercel/sandbox';

const policy: NetworkPolicy = {
  allow: {
    'api.example.com': [
      {
        match: { path: { startsWith: '/v1/' }, method: ['POST'] },
        transform: [{ headers: { 'x-api-key': 'your_api_key_here' } }],
      },
      { response: { statusCode: 403 } },
    ],
  },
};
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `statusCode` | `number` | Yes | Integer from 200 through 599. |
| `headers` | `Record<string, string>` | No | Response headers. Names must be unique, ignoring case. |
| `body` | `string` | No | Response body. Requires `contentType`; omit for status codes 204, 205, and 304. |
| `contentType` | `string` | When `body` is set | Nonempty content type of the response body, required even for an empty string body. |

The proxy manages `connection`, `content-length`, `keep-alive`, `proxy-connection`, `trailer`, `transfer-encoding`, and `upgrade`. The SDK or API rejects these response headers, regardless of capitalization.

#### `subnets.allow`

`subnets.allow` allows the user to provide a list of address ranges to allow traffic to.
If used in combination with `allow`, traffic to those addresses will also bypass domain matching.

It enables users to enable traffic not using TLS, or towards systems where domains cannot be used.
Beware of virtual hosting providers which can host many websites behind a given address.

#### `subnets.deny`

`subnets.deny` allows the user to provide a list of address ranges to deny traffic to.
Those ranges will always take precedence over `subnets.allow` and domain-based `allow` entries.

It allows the user to deny access to part of their network for instance while allowing access to the Internet in general.

### Policy readback

`sandbox.networkPolicy` returns cached saved-policy metadata as `NetworkPolicy | undefined`. `session.networkPolicy` returns cached metadata for that session with the same type. Neither getter fetches fresh state or reconstructs the complete authored policy.

Readback replaces injected header values with `"<redacted>"`, groups injection rules before forwarding rules, and omits direct-response rules. Resubmitting readback can change rule ordering, replace credentials with the redaction placeholder, or remove rejection rules. Retain the original authored policy separately and use it for updates.

## Snapshot class

A `Snapshot` represents a saved state of a sandbox that you can use to create new sandboxes. Snapshots capture the filesystem, installed packages, and environment configuration, letting you skip setup steps and start new sandboxes faster. To learn more, see [Snapshots](/docs/sandbox/concepts/snapshots).

Create snapshots with `sandbox.snapshot()` or retrieve existing ones with `Snapshot.get()`.

### Snapshot class accessors

#### `snapshotId`

Use `snapshotId` to identify the snapshot when creating new sandboxes or retrieving it later. Store this ID to reuse the snapshot across multiple sandbox instances.

**Returns:** `string`.

```ts filename="index.ts"
console.log(snapshot.snapshotId);
```

#### `sourceSessionId`

The `sourceSessionId` accessor returns the ID of the session that produced this snapshot. Use this to trace the origin of a snapshot or correlate it with session logs.

**Returns:** `string`.

```ts filename="index.ts"
console.log(snapshot.sourceSessionId);
```

#### `status`

The `status` accessor reports the current state of the snapshot. Check this value to confirm the snapshot creation succeeded before using it.

**Returns:** `"created" | "deleted" | "failed"`.

```ts filename="index.ts"
console.log(snapshot.status);
```

#### `sizeBytes`

The `sizeBytes` accessor returns the size of the snapshot in bytes. Use this to monitor storage usage.

**Returns:** `number`.

```ts
console.log(snapshot.sizeBytes);
```

#### `regions`

All [regions](/docs/sandbox/concepts/regions) where the snapshot is available. Snapshots can only be used to create or resume sandboxes in a region where they are available.

**Returns:** `string[]`.

```ts
console.log(snapshot.regions);
```

#### `createdAt`

The `createdAt` accessor returns the date and time when the snapshot was created.

**Returns:** `Date`.

```ts
console.log(snapshot.createdAt);
```

#### `expiresAt`

The `expiresAt` accessor returns the date and time when the snapshot will automatically expire and be deleted, based on its last use. If the snapshot was created with `expiration: 0`, this value is `undefined`.

**Returns:** `Date | undefined`.

```ts
if (snapshot.expiresAt) {
  console.log(snapshot.expiresAt.toISOString());
}
```

### Snapshot class static methods

#### `Snapshot.list()`

Use `Snapshot.list()` to enumerate snapshots for a project. Filter by sandbox name, sort, and paginate using a cursor. The returned value is async-iterable and auto-paginates through every page.

Omit `token`, `teamId`, and `projectId` to use OIDC or local development authentication. To use an access token, pass all three fields together. `projectId` alone does not override the OIDC project.

`SnapshotMetadata` items are plain API metadata records, not `Snapshot` instances. Their identifier is `id`, and timestamps such as `createdAt` are numbers. Retrieve a handle with `Snapshot.get({ snapshotId: record.id })`.

**Returns:** `Promise<Paginated<{ snapshots: SnapshotMetadata[]; pagination: Pagination; }>>`.

| Parameter   | Type              | Required | Details                                                |
| ----------- | ----------------- | -------- | ------------------------------------------------------ |
| `name`      | `string`          | No       | Filter snapshots by sandbox name.                      |
| `limit`     | `number`          | No       | Maximum number of snapshots per page.                  |
| `cursor`    | `string`          | No       | Pagination cursor returned by the previous page.       |
| `sortOrder` | `"asc" \| "desc"` | No       | Sort direction. Defaults to `"desc"`.                  |
| `token` | `string` | No | Access token. Requires `teamId` and `projectId` when supplied. |
| `teamId` | `string` | No | Team ID. Requires `token` and `projectId` when supplied. |
| `projectId` | `string`          | No       | Project to list. Requires `token` and `teamId` when supplied.              |
| `signal`    | `AbortSignal`     | No       | Cancel the request.                                    |

```ts
const result = await Snapshot.list({ name: 'my-sandbox' });
for await (const snapshot of result) {
  console.log(snapshot.id, snapshot.status);
}
```

#### `Snapshot.get()`

Use `Snapshot.get()` to retrieve an existing snapshot by its ID.

**Returns:** `Promise<Snapshot>`.

| Parameter    | Type          | Required | Details                                 |
| ------------ | ------------- | -------- | --------------------------------------- |
| `snapshotId` | `string`      | Yes      | Identifier of the snapshot to retrieve. |
| `signal`     | `AbortSignal` | No       | Cancel the request if necessary.        |

```ts filename="index.ts"
import { Snapshot } from '@vercel/sandbox';

const snapshot = await Snapshot.get({ snapshotId: 'snap_abc123' });
console.log(snapshot.status);
```

#### `Snapshot.tree()`

Walk the parent-child ancestry tree of a snapshot. Set `sortOrder: 'desc'` to walk ancestors, or `sortOrder: 'asc'` to walk descendants. The returned value is async-iterable.

**Returns:** `Promise<Paginated<{ snapshots: SnapshotTreeNodeData[]; pagination: Pagination; }>>`.

| Parameter    | Type              | Required | Details                                                    |
| ------------ | ----------------- | -------- | ---------------------------------------------------------- |
| `snapshotId` | `string`          | Yes      | Snapshot ID to anchor the tree on.                         |
| `sortOrder`  | `"asc" \| "desc"` | No       | `"desc"` walks ancestors, `"asc"` walks descendants.       |
| `limit`      | `number`          | No       | Maximum number of nodes per page.                          |
| `signal`     | `AbortSignal`     | No       | Cancel the request.                                        |

```ts
const ancestors = await Snapshot.tree({
  snapshotId: 'snap_abc',
  sortOrder: 'desc',
});
for await (const node of ancestors) {
  console.log(node.snapshot.id, node.snapshot.parentId);
}
```

### Snapshot class instance methods

#### `snapshot.delete()`

Call `snapshot.delete()` to remove a snapshot you no longer need. Deleting unused snapshots helps manage storage and keeps your snapshot list organized.

**Returns:** `Promise<void>`.

| Parameter     | Type          | Required | Details               |
| ------------- | ------------- | -------- | --------------------- |
| `opts.signal` | `AbortSignal` | No       | Cancel the operation. |

```ts filename="index.ts"
await snapshot.delete();
```

## Drive class

A `Drive` represents persistent storage that can be mounted into a sandbox. To learn more, see [Drives](/docs/sandbox/concepts/drives).

Create drives with [`Drive.getOrCreate()`](/docs/sandbox/sdk-reference#drive.getorcreate), list them with [`Drive.list()`](/docs/sandbox/sdk-reference#drive.list), and delete them with [`drive.delete()`](/docs/sandbox/sdk-reference#drive.delete). Mount a drive with read-write access, or use [`drive.snapshot()`](/docs/sandbox/sdk-reference#drive.snapshot) to mount a read-only snapshot.

### Drive class accessors

#### `driveId`

The `driveId` accessor returns the drive's unique ID.

**Returns:** `string`.

```ts filename="index.ts"
console.log(drive.driveId);
```

#### `parentDriveId`

The `parentDriveId` accessor returns the ID of the source drive for a fork. It returns `undefined` for a drive created without a fork.

**Returns:** `string | undefined`.

```ts filename="index.ts"
console.log(drive.parentDriveId);
```

#### `rootDriveId`

The `rootDriveId` accessor returns the ID of the original drive in a chain of forks. Forking a fork keeps the same root drive ID. It returns `undefined` for a drive created without a fork.

**Returns:** `string | undefined`.

```ts filename="index.ts"
console.log(drive.rootDriveId);
```

#### `name`

The `name` accessor returns the drive name. Drive names are unique within a Vercel project.

**Returns:** `string`.

```ts filename="index.ts"
console.log(drive.name);
```

#### `projectId`

The `projectId` accessor returns the project ID that owns the drive.

**Returns:** `string`.

```ts filename="index.ts"
console.log(drive.projectId);
```

#### `region`

The `region` accessor returns the [region](/docs/sandbox/concepts/regions#regions-and-drives) where the drive stores its data.

**Returns:** `string`.

```ts filename="index.ts"
console.log(drive.region); // "iad1"
```

#### `maxSize`

The `maxSize` accessor returns the configured drive size limit in bytes.

**Returns:** `number`.

```ts filename="index.ts"
console.log(drive.maxSize);
```

#### `currentSessionId`

The `currentSessionId` accessor returns the session ID the drive is attached to, if the drive is currently mounted.

**Returns:** `string | undefined`.

```ts filename="index.ts"
console.log(drive.currentSessionId);
```

#### `currentSandboxName`

The `currentSandboxName` accessor returns the sandbox name the drive is attached to, if the drive is currently mounted.

**Returns:** `string | undefined`.

```ts filename="index.ts"
console.log(drive.currentSandboxName);
```

#### `createdAt`

The `createdAt` accessor returns the date and time when the drive was created.

**Returns:** `Date`.

```ts filename="index.ts"
console.log(drive.createdAt);
```

#### `updatedAt`

The `updatedAt` accessor returns the date and time when the drive was last updated.

**Returns:** `Date`.

```ts filename="index.ts"
console.log(drive.updatedAt);
```

### Drive class static methods

#### `Drive.list()`

Use `Drive.list()` to enumerate drives for a project. Filter by name prefix when you need to find drives for a specific workspace or user. Each item is a `Drive` instance with accessors and instance methods.

Omit `token`, `teamId`, and `projectId` to use OIDC or local development authentication. To use an access token, pass all three fields together. `projectId` alone does not override the OIDC project.

**Returns:** `Promise<Paginated<{ drives: Drive[]; pagination: Pagination; }>>`.

| Parameter    | Type                                             | Required | Details                                      |
| ------------ | ------------------------------------------------ | -------- | -------------------------------------------- |
| `token` | `string` | No | Access token. Requires `teamId` and `projectId` when supplied. |
| `teamId` | `string` | No | Team ID. Requires `token` and `projectId` when supplied. |
| `projectId`  | `string`                                         | No       | Project to list. Requires `token` and `teamId` when supplied.       |
| `limit`      | `number`                                         | No       | Maximum number of drives to return.          |
| `cursor`     | `string`                                         | No       | Pagination cursor returned by the previous page. |
| `sortBy`     | `"createdAt" \| "updatedAt" \| "name"`           | No       | Field to sort drives by.                     |
| `sortOrder`  | `"asc" \| "desc"`                                | No       | Sort direction.                              |
| `namePrefix` | `string`                                         | No       | Filter drives by name prefix.                |
| `signal`     | `AbortSignal`                                    | No       | Cancel the request if necessary.             |

```ts filename="index.ts"
import { Drive } from '@vercel/sandbox';

const { drives, pagination } = await Drive.list({
  namePrefix: 'workspace',
  sortBy: 'name',
  sortOrder: 'asc',
  limit: 10,
});

for (const drive of drives) {
  console.log(drive.name, drive.currentSandboxName ?? 'detached');
}

console.log(pagination.next);
```

The returned object supports async iteration and helper methods for pagination:

```ts filename="index.ts"
const result = await Drive.list({ limit: 10 });

for await (const drive of result) {
  console.log(drive.name);
}

const allDrives = await result.toArray();
```

#### `Drive.getOrCreate()`

Use `Drive.getOrCreate()` to retrieve an existing drive by name or create it if it doesn't exist. Create the drive before mounting it into a sandbox.

**Returns:** `Promise<Drive>`.

| Parameter | Type          | Required | Details                                                                                                                                                    |
| --------- | ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`    | `string`      | Yes      | Drive name. Must be unique within the project.                                                                                                             |
| `region`  | `string`      | No       | [Region](/docs/sandbox/concepts/regions#regions-and-drives) where the drive is created and stores its data. Defaults to `iad1`.                            |
| `maxSize` | `number`      | No       | Maximum drive size in bytes. Defaults to 1 TiB when omitted. The default maximum quota is 16 TiB. |
| `signal`  | `AbortSignal` | No       | Cancel the request if necessary.                                                                                                                           |

A drive's region can't change after creation. Calling `Drive.getOrCreate()` with a `region` or `maxSize` that doesn't match the existing drive fails with a `conflict` error.

```ts filename="index.ts"
import { Drive } from '@vercel/sandbox';

const drive = await Drive.getOrCreate({
  name: 'workspace-cache',
  region: 'sfo1',
  maxSize: 200 * 1024 * 1024 * 1024, // 200 GiB
});
```

### Drive class instance methods

#### `drive.snapshot()`

Call `drive.snapshot()` to return a read-only snapshot mount configuration. You can use the configuration to mount the drive on multiple sandboxes at the same time.

**Returns:** `{ drive: string; mode: "snapshot" }`.

```ts filename="index.ts"
import { Drive, Sandbox } from '@vercel/sandbox';

const drive = await Drive.getOrCreate({ name: 'workspace-cache' });

await Sandbox.create({
  mounts: {
    '/data': drive.snapshot(),
  },
});
```

#### `drive.fork()`

Call `drive.fork()` to create a new drive from an existing drive's data. The fork belongs to the same project and inherits the source drive's region and maximum size. You can mount and update the fork independently of the source drive.

> **💡 Note:** A drive must be mounted read-write and written to at least once before you can create a fork from it. Creating a fork of a drive that has never been written to fails with a `drive_not_initialized` error.

**Returns:** `Promise<Drive>`.

| Parameter | Type          | Required | Details                                                  |
| --------- | ------------- | -------- | -------------------------------------------------------- |
| `name`    | `string`      | Yes      | Name of the new drive. Must be unique within the project. |
| `signal`  | `AbortSignal` | No       | Cancel the request if necessary.                         |

```ts filename="index.ts"
import { Drive } from '@vercel/sandbox';

const drive = await Drive.get({ name: 'workspace-cache' });
const forkedDrive = await drive.fork({ name: 'workspace-cache-fork' });

console.log(forkedDrive.name);
console.log(forkedDrive.parentDriveId === drive.driveId); // true
```

For a mount example, see [Forking a drive](/docs/sandbox/concepts/drives#forking-a-drive).

#### `drive.delete()`

Call `drive.delete()` to permanently remove a drive and the data stored on it. The drive must not be attached to a sandbox when you delete it.

**Returns:** `Promise<void>`.

| Parameter     | Type          | Required | Details               |
| ------------- | ------------- | -------- | --------------------- |
| `opts.signal` | `AbortSignal` | No       | Cancel the operation. |

```ts filename="index.ts"
await drive.delete();
```

## `defineSandboxProxy`

Use `defineSandboxProxy` from `@vercel/sandbox/proxy` to implement a request-forwarding proxy referenced by a network policy `forwardURL`. The helper verifies the Vercel-issued OIDC token on each incoming request and extracts metadata about the source sandbox.

```ts filename="app/api/sandbox-proxy/route.ts"
import { defineSandboxProxy } from '@vercel/sandbox/proxy';

const handler = defineSandboxProxy(async (request, meta) => {
  // meta: { host, teamId, projectId, sandboxId, sandboxName }
  console.log('Proxied from sandbox', meta.sandboxName);
  return fetch(request);
});

// Sandboxes forward requests using their original method, so expose the
// handler under every verb the network policy can route.
export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
```

See the [firewall documentation](/docs/sandbox/concepts/firewall#requests-proxying) for the full request flow.

## Example workflows

- [Install system packages](/docs/sandbox/working-with-sandbox#install-system-packages) while keeping sudo-enabled commands isolated.
- [Execute long-running tasks](/docs/sandbox/working-with-sandbox#execute-long-running-tasks) by extending sandbox timeouts for training or large dependency installs.
- [Mount persistent drives](/docs/sandbox/concepts/drives) when sandbox runs need to reuse workspace files, caches, or shared inputs.
- Browse more scenarios in the [Sandbox examples](/docs/sandbox/working-with-sandbox#examples) catalog.

## Authentication

Vercel Sandbox supports two authentication methods:

- **[Vercel OIDC tokens](/docs/sandbox/concepts/authentication#vercel-oidc-token-recommended)** (recommended): Vercel generates the OIDC token that it associates with your Vercel project. For local development, run `vercel link` and `vercel env pull` to get a development token. In production on Vercel, authentication is automatic.
- **[Access tokens](/docs/sandbox/concepts/authentication#access-tokens)**: Use access tokens when `VERCEL_OIDC_TOKEN` is unavailable, such as in external CI/CD systems or non-Vercel environments.

To learn more on each method, see [Authentication](/docs/sandbox/concepts/authentication) for complete setup instructions.

## Environment defaults

- **Image:** Ubuntu 26.04 with common languages, coding agents, and utilities. See [Vercel Managed Images](/docs/sandbox/concepts/images) to learn more.
- **Resources:** Choose the number of virtual CPUs (`vcpus`) per sandbox. Pricing and plan limits appear in the [Sandbox pricing table](/docs/sandbox/pricing#resource-limits).
- **Timeouts:** The default timeout is 5 minutes. You can extend it programmatically up to 45 minutes on the Hobby plan and up to 24 hours on Pro and Enterprise plans.
- **Working directory:** Managed images use `/vercel`. Custom images use the Dockerfile `WORKDIR`, or `/` if none is set. Use `sandbox.cwd` to read the current directory.
- **Sudo:** Set `sudo: true` to run a command as root with `HOME` set to `/root`. Commands otherwise use the image's default user. Elevation does not select a different working directory.

> **💡 Note:** Sandboxes are persistent by default. The filesystem is automatically
> snapshotted when a session stops and restored on the next resume. For one-off
> workloads, pass `persistent: false` to opt out. See
> [Persistence](/docs/sandbox/concepts/persistent-sandboxes).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
