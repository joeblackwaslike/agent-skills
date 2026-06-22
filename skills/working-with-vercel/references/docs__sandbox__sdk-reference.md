---
title: JS SDK Reference
product: vercel
url: /docs/sandbox/sdk-reference
canonical_url: "https://vercel.com/docs/sandbox/sdk-reference"
last_updated: 2026-05-29
type: reference
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/python-sdk-reference
  - /docs/sandbox/concepts/persistent-sandboxes
  - /docs/sandbox/concepts/tags
  - /docs/sandbox/concepts/snapshots
  - /docs/sandbox/concepts/firewall
summary: A comprehensive reference for the Vercel Sandbox JavaScript SDK, which lets you run code in a secure, isolated environment.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/sdk-reference.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "dfe9e7d81267cffe193658b9b5a509c341b0c9f3db41ec73fbab2552aecab504"
---

# JS SDK Reference

Use the Vercel Sandbox JavaScript SDK to create isolated Linux microVMs on demand. Run untrusted code, test full Linux workflows, and manage files, ports, snapshots, drives, sessions, and network policy from Node.js applications.

For Python, see the [Python SDK Reference](/docs/sandbox/python-sdk-reference).

## Prerequisites

Install the SDK:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i @vercel/sandbox
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i @vercel/sandbox
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i @vercel/sandbox
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i @vercel/sandbox
    ```
  </Code>
</CodeBlock>

After installation:

- Link your project and pull environment variables with `vercel link` and `vercel env pull` so the SDK can read a Vercel OpenID Connect (OIDC) token.
- Choose a runtime: `node26`, `node24`, `node22`, or `python3.13`.

## Core classes

| Class                                       | What it does                                       | Example                                         |
| ------------------------------------------- | -------------------------------------------------- | ----------------------------------------------- |
| [`Sandbox`](#sandbox-class)                 | Creates and manages isolated microVM environments  | `const sandbox = await Sandbox.create()`        |
| [`Session`](#session-class)                 | Represents a single running VM inside a sandbox    | `const session = sandbox.currentSession()`      |
| [`FileSystem`](#filesystem-class)           | Provides a `node:fs/promises`-compatible API       | `await sandbox.fs.readFile('/tmp/a.txt')`       |
| [`Command`](#command-class)                 | Handles running commands inside the sandbox        | `const cmd = await sandbox.runCommand()`        |
| [`CommandFinished`](#commandfinished-class) | Contains the result after a command completes      | Access `cmd.exitCode` and `cmd.stdout()`        |
| [`NetworkPolicy`](#networkpolicy-class)     | Defines firewall rules for sandbox traffic         | `Sandbox.create({ networkPolicy: 'deny-all' })` |
| [`Snapshot`](#snapshot-class)               | Represents a saved sandbox state for fast restarts | `const snapshot = await sandbox.snapshot()`     |
| [`Drive`](#drive-class)                    | Represents persistent storage mounted to sandboxes | `const drive = await Drive.getOrCreate()`      |

### Basic workflow

```ts
// 1. Create a sandbox (persistent by default)
const sandbox = await Sandbox.create({ name: 'my-sandbox', runtime: 'node24' });

// 2. Run a command - it waits for completion and returns the result
const result = await sandbox.runCommand('node', ['--version']);

// 3. Check the result
console.log(result.exitCode); // 0
console.log(await result.stdout()); // v22.x.x

// 4. Later, resume the same sandbox by name
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

The `status` accessor reports the lifecycle state of the current session. Poll this value when you need to wait for startup or confirm shutdown, and treat `failed` as a signal to investigate.

**Returns:** `"pending" | "running" | "stopping" | "stopped" | "failed"`.

```ts
console.log(sandbox.status);
```

#### `timeout`

`timeout` shows how many milliseconds remain before the session stops automatically. Compare the remaining time against upcoming commands and call `sandbox.extendTimeout()` if the window is too short.

**Returns:** `number`.

```ts
console.log(sandbox.timeout);
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

The runtime image used by the sandbox (for example, `"node24"`).

**Returns:** `string | undefined`.

```ts
console.log(sandbox.runtime);
```

#### `region`

The region where the sandbox runs.

**Returns:** `string | undefined`.

```ts
console.log(sandbox.region);
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

Default expiration (in milliseconds) applied to snapshots automatically created for this sandbox. `0` means no expiration. Falls back to the system default if undefined.

**Returns:** `number | undefined`.

```ts
console.log(sandbox.snapshotExpiration);
```

#### `keepLastSnapshots`

Retention policy that keeps only the N most recent snapshots of this sandbox. A new snapshot is created whenever a persistent session stops or when you call [`sandbox.snapshot()`](#sandbox.snapshot).

When a new snapshot brings the total above `count` for a given named sandbox, the oldest snapshots are no longer kept.

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

Cumulative usage across every session this sandbox has run. Use these for long-running, persistent sandboxes where the most recent session does not represent total cost.

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

**Returns:** `Promise<Paginated<{ sandboxes: Sandbox[]; pagination: Pagination; }>>`.

| Parameter    | Type                          | Required | Details                                                              |
| ------------ | ----------------------------- | -------- | -------------------------------------------------------------------- |
| `namePrefix` | `string`                      | No       | Filter sandboxes whose name begins with this prefix. Requires `sortBy: "name"`. |
| `tags`       | `Record<string, string>`      | No       | Filter by a single tag.                                              |
| `sortBy`     | `"createdAt" \| "name" \| "statusUpdatedAt"` | No | Sort field. Defaults to `"createdAt"`.                              |
| `sortOrder`  | `"asc" \| "desc"`             | No       | Sort direction. Defaults to `"desc"`.                                |
| `limit`      | `number`                      | No       | Maximum number of sandboxes per page.                                |
| `cursor`     | `string`                      | No       | Pagination cursor returned by the previous page.                     |
| `projectId`  | `string`                      | No       | Project whose sandboxes you want to list.                            |
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

#### `Sandbox.create()`

`Sandbox.create()` launches a new microVM with your chosen runtime, source, and resource settings. Defaults to an empty workspace when no source is provided. Pass `source.depth` when cloning large repositories to shorten setup time.

Sandboxes are persistent by default: when the sandbox stops, the filesystem is automatically snapshotted and restored on the next resume. Pass `persistent: false` to opt out.

**Returns:** `Promise<Sandbox>`.

| Parameter            | Type                       | Required | Details / Values                                                                                                                                       |
| -------------------- | -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`               | `string`                   | No       | Unique sandbox name within the project. A random name is generated if omitted. Cannot be changed after creation.                                       |
| `source`             | `git`                      | No       | Clone a Git repository.  `url`: string `username`: string `password`: string `depth`?: number `revision`?: string  |
| `source`             | `tarball`                  | No       | Mount a tarball.  `url`: string                                                                                                            |
| `source`             | `snapshot`                 | No       | Create from a snapshot.  `snapshotId`: string                                                                                              |
| `resources.vcpus`    | `number`                   | No       | Number of vCPUs (2048 MB RAM per vCPU). Defaults to 2.                                                                                                 |
| `runtime`            | `string`                   | No       | Runtime image such as `"node26"`, `"node24"`, `"node22"`, or `"python3.13"`.                                                                           |
| `ports`              | `number[]`                 | No       | Ports to expose for `sandbox.domain()`. Up to 15.                                                                                                      |
| `timeout`            | `number`                   | No       | Session timeout in milliseconds. Defaults to 5 minutes.                                                                                                |
| `networkPolicy`      | `NetworkPolicy`            | No       | Firewall rules for sandbox egress traffic. Defaults to `"allow-all"`.                                                                                  |
| `env`                | `Record<string, string>`   | No       | Default environment variables for commands run in this sandbox. Per-command `runCommand({ env })` values override these defaults.                      |
| `mounts`             | `SandboxMounts`            | No       | Drives to attach to the sandbox, keyed by absolute mount path. Drives can be mounted as `"read-write"` (default) or `"read-only"`.                    |
| `tags`               | `Record<string, string>`   | No       | Up to five key-value [tags](/docs/sandbox/concepts/tags).                                                                                              |
| `persistent`         | `boolean`                  | No       | Auto-snapshot the filesystem on stop and restore on resume. Defaults to `true`.                                                                        |
| `snapshotExpiration` | `number`                   | No       | Default snapshot TTL in milliseconds. Use `0` for no expiration.                                                                                       |
| `keepLastSnapshots`  | `object`                   | No       | Retention policy that keeps only the N most recent snapshots. `{ count: 1-10, expiration?: number, deleteEvicted?: boolean }`. See [`keepLastSnapshots`](#keeplastsnapshots) for field details. |
| `onResume`           | `(sandbox) => Promise<void>` | No     | Fires whenever a session resumes (including after auto-resume). Use to restart background services or rehydrate caches.                                |
| `signal`             | `AbortSignal`              | No       | Cancel sandbox creation.                                                                                                                               |

```ts
const sandbox = await Sandbox.create({
  name: 'my-sandbox',
  runtime: 'node24',
  networkPolicy: 'deny-all',
  env: { NODE_ENV: 'production' },
  tags: { env: 'staging' },
  snapshotExpiration: 7 * 24 * 60 * 60 * 1000, // 7 days
});
```

#### `Sandbox.get()`

`Sandbox.get()` retrieves an existing sandbox by name. If the sandbox is stopped, the next SDK call (such as `runCommand`) automatically resumes it. Pass `resume: false` to skip the implicit resume.

**Returns:** `Promise<Sandbox>`.

| Parameter  | Type                          | Required | Details                                                                                                  |
| ---------- | ----------------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `name`     | `string`                      | Yes      | Sandbox name to retrieve.                                                                                |
| `resume`   | `boolean`                     | No       | Whether to resume the sandbox immediately. Defaults to `true`.                                           |
| `onResume` | `(sandbox) => Promise<void>`  | No       | Fires whenever a session resumes (including after auto-resume).                                          |
| `signal`   | `AbortSignal`                 | No       | Cancel the request.                                                                                      |

```ts
const sandbox = await Sandbox.get({ name: 'my-sandbox' });
```

#### `Sandbox.getOrCreate()`

`Sandbox.getOrCreate()` is the recommended pattern for long-lived sandboxes: it resumes the sandbox if it exists or creates it if it doesn't. Use `onCreate` for one-time setup and `onResume` for setup that should run on every session start.

**Returns:** `Promise<Sandbox>`.

| Parameter  | Type                          | Required | Details                                                                                                       |
| ---------- | ----------------------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| `name`     | `string`                      | No       | Sandbox name. If omitted, behaves like `Sandbox.create` (always creates, `onCreate` always fires).            |
| `resume`   | `boolean`                     | No       | Whether to resume the sandbox immediately when an existing one is retrieved. Defaults to `false`. When `true`, the sandbox is resumed before `getOrCreate` resolves, and `onResume` is awaited before it resolves. |
| `onCreate` | `(sandbox) => Promise<void>`  | No       | Runs once when the sandbox is freshly created. Awaited before `getOrCreate` resolves.                         |
| `onResume` | `(sandbox) => Promise<void>`  | No       | Runs every time the session resumes (including after auto-resume). By default, `getOrCreate` retrieves the sandbox but does not resume it, so `onResume` is not awaited before it resolves; the session resumes on the first SDK call (such as `runCommand`), and `onResume` runs at that point. Pass `resume: true` to resume immediately and have `onResume` awaited before `getOrCreate` resolves. |
| ...        | *all `Sandbox.create` params* | No       | Any creation parameter is accepted and used when the sandbox is created.                                      |

Behavior:

- If a sandbox with that `name` exists, `getOrCreate` retrieves it without resuming it by default. The sandbox resumes on the first SDK call (such as `runCommand`), and `onResume` fires at that point — not before `getOrCreate` resolves. Pass `resume: true` to resume immediately and have `onResume` awaited before `getOrCreate` resolves.
- If no sandbox exists, a fresh sandbox is created and `onCreate` is awaited before `getOrCreate` resolves.
- If the sandbox exists but its snapshot expired, the stale sandbox is deleted, re-created with the same name, and `onCreate` fires.

```ts
const sandbox = await Sandbox.getOrCreate({
  name: 'my-sandbox',
  runtime: 'node24',
  onCreate: async (sbx) => {
    await sbx.runCommand('git', ['clone', repoUrl, '.']);
    await sbx.runCommand('npm', ['install']);
  },
  onResume: async (sbx) => {
    await sbx.runCommand({ cmd: 'npm', args: ['run', 'dev'], detached: true });
  },
});
```

#### `Sandbox.fork()`

`Sandbox.fork()` creates a new sandbox seeded from the current snapshot of an existing one. The new sandbox inherits the source's config; any field you pass in overrides the copied value. If the source has no current snapshot, the fork falls back to a fresh create with the source's `runtime` plus the copied config.

`env` is **not** copied (encrypted server-side); pass it explicitly to set environment variables on the fork. `runtime` is not accepted as an override — when the source has a snapshot the runtime is inherited from it; otherwise it is copied from the source sandbox.

**Returns:** `Promise<Sandbox>`.

| Parameter       | Type                           | Required | Details                                                                                                 |
| --------------- | ------------------------------ | -------- | ------------------------------------------------------------------------------------------------------- |
| `sourceSandbox` | `string`                       | Yes      | Name of the sandbox to fork from.                                                                       |
| ...             | *most `Sandbox.create` params* | No       | Any field set here overrides the value copied from the source. `source` and `runtime` are not accepted. |

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

Call `sandbox.getCommand()` to retrieve a previously executed command by its ID, which is especially helpful after detached executions when you want to inspect logs later.

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
| `params.cmd`      | `string`                 | Yes      | Command to execute when using the object overload. |
| `params.args`     | `string[]`               | No       | Arguments for the object overload.                 |
| `params.cwd`      | `string`                 | No       | Working directory for execution.                   |
| `params.env`      | `Record<string, string>` | No       | Additional environment variables.                  |
| `params.sudo`     | `boolean`                | No       | Run the command with sudo.                         |
| `params.detached` | `boolean`                | No       | Return immediately with a live `Command` object.   |
| `params.stdout`   | `Writable`               | No       | Stream standard output to a writable.              |
| `params.stderr`   | `Writable`               | No       | Stream standard error to a writable.               |
| `params.signal`   | `AbortSignal`            | No       | Cancel the command when using the object overload. |

```ts
const result = await sandbox.runCommand('node', ['--version']);
```

#### `sandbox.mkDir()`

`sandbox.mkDir()` creates a directory in the sandbox filesystem before you write files or clone repositories. Paths are relative to `/vercel/sandbox` unless you provide an absolute path. Call this before `writeFiles()` when your target directory does not exist yet.

```ts
await sandbox.mkDir('assets');
```

| Parameter     | Type          | Required | Details               |
| ------------- | ------------- | -------- | --------------------- |
| `path`        | `string`      | Yes      | Directory to create.  |
| `opts.signal` | `AbortSignal` | No       | Cancel the operation. |

**Returns:** `Promise<void>`.

#### `sandbox.readFile()`

Use `sandbox.readFile()` to pull file contents from the sandbox to a `ReadableStream`. The promise resolves to `null` when the file does not exist. You can use [`sandbox.readFileToBuffer()`](#sandbox.readfiletobuffer) directly if you prefer receiving a `Buffer`.

```ts
const stream = await sandbox.readFile({ path: 'package.json' });
```

| Parameter     | Type          | Required | Details                                   |
| ------------- | ------------- | -------- | ----------------------------------------- |
| `file.path`   | `string`      | Yes      | Path to the file inside the sandbox.      |
| `file.cwd`    | `string`      | No       | Base directory for resolving `file.path`. |
| `opts.signal` | `AbortSignal` | No       | Cancel the read operation.                |

**Returns:** `Promise<null | ReadableStream>`.

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
  { path: 'package.json', cwd: '/vercel/sandbox' },
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

`sandbox.writeFiles()` uploads one or more files into the sandbox filesystem. Paths default to `/vercel/sandbox`; use absolute paths for custom locations and bundle related files into a single call to reduce round trips.

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
| `files`         | `{ path: string; content: Buffer; mode?: number; }[]` | Yes      | File descriptors to write.                                                                    |
| `files.path`    | `string`                                              | Yes      | Path to the file inside the sandbox.                                                          |
| `files.content` | `Buffer`                                              | Yes      | File contents as a Buffer.                                                                    |
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
console.log(result.activeCpuUsageMs);
console.log(result.networkTransfer); // { ingress, egress }
```

| Parameter     | Type          | Required | Details                    |
| ------------- | ------------- | -------- | -------------------------- |
| `opts.signal` | `AbortSignal` | No       | Cancel the stop operation. |

**Returns:** `Promise<{ snapshot?: { id: string; status: "created" | "deleted" | "failed"; sizeBytes: number; createdAt: number; expiresAt?: number; parentId?: string }; activeCpuUsageMs: number; networkTransfer: { ingress: number; egress: number } }>`.

#### `sandbox.update()`

`sandbox.update()` updates any mutable parameter on the sandbox. When `ports` is provided, it is treated as the **full** desired port list: any currently exposed port not present in the array is deregistered. `networkPolicy` is applied to the current session as well as future sessions.

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
});
```

| Parameter            | Type                       | Required | Details                                                                                                |
| -------------------- | -------------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `resources.vcpus`    | `number`                   | No       | New vCPU count (memory auto-scales to 2048 MB per vCPU).                                               |
| `timeout`            | `number`                   | No       | New session timeout in milliseconds.                                                                   |
| `networkPolicy`      | `NetworkPolicy`            | No       | Replace the firewall policy on the current and future sessions.                                        |
| `ports`              | `number[]`                 | No       | Replace the exposed ports. Ports not present in the array are deregistered.                            |
| `tags`               | `Record<string, string>`   | No       | Replace the tag set. Pass `{}` to clear.                                                               |
| `persistent`         | `boolean`                  | No       | Enable or disable auto-snapshotting on stop.                                                           |
| `snapshotExpiration` | `number`                   | No       | New default snapshot TTL in milliseconds. Use `0` for no expiration.                                   |
| `keepLastSnapshots`  | `object \| null`           | No       | Retention policy that keeps only the N most recent snapshots. Pass `null` to clear. See [`keepLastSnapshots`](#keeplastsnapshots) for field details. |
| `currentSnapshotId`  | `string`                   | No       | Point the sandbox at a different snapshot. New sessions resume from it.                                |
| `opts.signal`        | `AbortSignal`              | No       | Cancel the operation.                                                                                  |

**Returns:** `Promise<void>`.

#### `sandbox.delete()`

Permanently delete the sandbox and all of its snapshots and sessions. After deletion the instance becomes inert: further API calls throw immediately.

```ts
await sandbox.delete();
```

| Parameter     | Type          | Required | Details               |
| ------------- | ------------- | -------- | --------------------- |
| `opts.signal` | `AbortSignal` | No       | Cancel the operation. |

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

**Returns:** `Promise<Paginated<{ sessions: Session[]; pagination: Pagination; }>>`.

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

**Returns:** `Promise<Paginated<{ snapshots: Snapshot[]; pagination: Pagination; }>>`.

#### `sandbox.updateNetworkPolicy()` (deprecated)

> **💡 Note:** `sandbox.updateNetworkPolicy()` is deprecated. Use [`sandbox.update({ networkPolicy })`](#sandbox.update) instead.

Update the firewall settings applied to the sandbox egress traffic. The provided configuration fully replaces the pre-existing one. This allows for instance a user to start a sandbox, gather data, then run some untrusted program on it without risking data exfiltration.

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

// Allow traffic to the Internet while blocking private network
await sandbox.updateNetworkPolicy({
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
| `networkPolicy` | `NetworkPolicy` | Yes      | New firewall setup. Will fully replace the existing one. |
| `opts.signal`   | `AbortSignal`   | No       | Cancel the operation.                                    |

**Returns:** `Promise<void>`.

#### `sandbox.extendTimeout()`

Use `sandbox.extendTimeout()` to extend the sandbox lifetime by the specified duration. This lets you keep the sandbox running up to the maximum execution timeout for your plan, so check `sandbox.timeout` first and extend only when necessary to avoid premature shutdown.

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

The sandbox must be running to create a snapshot. Once you call this method, the sandbox shuts down automatically and becomes unreachable. You do not need to call `stop()` afterwards, and any subsequent commands to the sandbox will fail.

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

## Session class

A `Session` represents a single running VM instance inside a sandbox. Sessions are created and resumed for you whenever the sandbox transitions from `stopped` to `running`. Use `sandbox.currentSession()` to inspect the active one, or `sandbox.listSessions()` to enumerate every session the sandbox has run.

### Session class accessors

Read-only accessors on a `Session` instance returned by `sandbox.currentSession()`. Iterating `sandbox.listSessions()` yields raw API objects with the same fields keyed as `id` instead of `sessionId`.

| Accessor                 | Returns                                                       | Description                                   |
| ------------------------ | ------------------------------------------------------------- | --------------------------------------------- |
| `sessionId`              | `string`                                                      | Unique identifier of the session.             |
| `status`                 | `"pending" \| "running" \| "stopping" \| "stopped" \| "failed"` | Current lifecycle state.                      |
| `createdAt`              | `Date`                                                        | When the session started.                     |
| `activeCpuUsageMs`       | `number \| undefined`                                          | CPU used during the session, in milliseconds. Available once the session is stopped. |
| `networkTransfer`        | `{ ingress: number; egress: number } \| undefined`            | Network traffic during the session. Available once the session is stopped. |

```ts
const session = sandbox.currentSession();
console.log(session.sessionId, session.status);
```

## FileSystem class

`FileSystem` gives you a `node:fs/promises`-compatible surface for sandbox files and directories. Use it through `sandbox.fs` to keep code portable when you already have utilities that expect familiar Node.js filesystem methods.

```ts
const sandbox = await Sandbox.create({ runtime: 'node24' });

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

### Command class properties

#### `exitCode`

The `exitCode` property holds the process exit status once the command finishes. For detached commands, this value starts as `null` and gets populated after you await `command.wait()`, so check for `null` to determine if the command is still running.

```ts
if (command.exitCode !== null) {
  console.log(`Command exited with code: ${command.exitCode}`);
}
```

**Returns:** `number | null`.

### Command class accessors

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

## CommandFinished class

`CommandFinished` is the result you receive after a sandbox command exits. It extends the `Command` class, so you keep access to streaming helpers such as `logs()` or `stdout()`, but you also get the final exit metadata immediately. You usually receive this object from `sandbox.runCommand()` or by awaiting `command.wait()` on a detached process.

### CommandFinished class properties

#### `exitCode`

The `exitCode` property reports the numeric status returned by the command. A value of `0` indicates success; any other value means the process exited with an error, so branch on it before you parse output.

```ts
if (result.exitCode === 0) {
  console.log('Command succeeded');
}
```

**Returns:** `number`.

### CommandFinished class accessors

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

`CommandFinished` inherits all methods from `Command` including `logs()`, `output()`, `stdout()`, `stderr()`, and `kill()`. See the [Command class](#command-class) section for details on these methods.

## NetworkPolicy class

`NetworkPolicy` instances represent the firewall setup of the sandbox. To learn more, see [network firewall](/docs/sandbox/concepts/firewall).

### Base modes

#### `allow-all`

The `allow-all` mode is the default applicable policy for sandboxes. It allows all egress traffic, to the Internet and secure-compute environments.

#### `deny-all`

The `deny-all` mode can be set to restrict sandbox network access. It blocks all egress traffic, including DNS resolution.

### User-defined rules

#### `allow`

> **🔒 Permissions Required**: Transformation and forwarding rules

The `allow` property allows the user to provide a list of website or API domains to allow access to.
Traffic identification is based on SNI (server-name indicator), hence only TLS traffic is currently supported.
Matching is based on:

- if the domain does not contain any wildcard `*` segment, only exact matches are accepted.
- if the domain includes a wildcard `*` as a middle segment (e.g. `www.*.com`), it only matches this one segment.
- if the domain starts with a wildcard `*` (e.g. `*.google.com`), any subdomain is matched. It will not match the parent domain (e.g. `google.com` here).

Encryption is not intercepted if no transformation or forwarding rules are defined, allowing end-to-end data confidentiality.

The `allow` property can be set as an object providing the websites to allow traffic to, with optional additional transformation or forwarding rules.
When such rules are defined, encryption is intercepted to allow request alteration.

Each rule can define a set of [matchers](/docs/sandbox/concepts/firewall#matchers) on the path, method, query parameters, and headers. When defined, only requests matching the specified dimensions will be transformed or forwarded. Learn more about transformation rules and forwarding rules in the [firewall documentation](/docs/sandbox/concepts/firewall).

#### `subnets.allow`

`subnets.allow` allows the user to provide a list of address ranges to allow traffic to.
If used in combination with `allow`, traffic to those addresses will also bypass domain matching.

It enables users to enable traffic not using TLS, or towards systems where domains cannot be used.
Beware of virtual hosting providers which can host many websites behind a given address.

#### `subnets.deny`

`subnets.deny` allows the user to provide a list of address ranges to deny traffic to.
Those ranges will always take precedence over `subnets.allow` and domain-based `allow` entries.

It allows the user to deny access to part of their network for instance while allowing access to the Internet in general.

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

#### `createdAt`

The `createdAt` accessor returns the date and time when the snapshot was created.

**Returns:** `Date`.

```ts
console.log(snapshot.createdAt);
```

#### `expiresAt`

The `expiresAt` accessor returns the date and time when the snapshot will automatically expire and be deleted, based on its last use. If the snapshot was created with `expiration: 0`, this value is `null`.

**Returns:** `Date | null`.

```ts
if (snapshot.expiresAt) {
  console.log(snapshot.expiresAt.toISOString());
}
```

### Snapshot class static methods

#### `Snapshot.list()`

Use `Snapshot.list()` to enumerate snapshots for a project. Filter by sandbox name, sort, and paginate using a cursor. The returned value is async-iterable and auto-paginates through every page.

**Returns:** `Promise<Paginated<{ snapshots: Snapshot[]; pagination: Pagination; }>>`.

| Parameter   | Type              | Required | Details                                                |
| ----------- | ----------------- | -------- | ------------------------------------------------------ |
| `name`      | `string`          | No       | Filter snapshots by sandbox name.                      |
| `limit`     | `number`          | No       | Maximum number of snapshots per page.                  |
| `cursor`    | `string`          | No       | Pagination cursor returned by the previous page.       |
| `sortOrder` | `"asc" \| "desc"` | No       | Sort direction. Defaults to `"desc"`.                  |
| `projectId` | `string`          | No       | Project whose snapshots you want to list.              |
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

> **🔒 Permissions Required**: Drives

A `Drive` represents persistent storage that can be mounted into a sandbox. To learn more, see [Drives](/docs/sandbox/concepts/drives).

Create drives with [`Drive.getOrCreate()`](/docs/sandbox/sdk-reference#drive.getorcreate), list them with [`Drive.list()`](/docs/sandbox/sdk-reference#drive.list), and delete them with [`drive.delete()`](/docs/sandbox/sdk-reference#drive.delete). Mount them into sandboxes by using the [`mounts` property in `Sandbox.create()`](/docs/sandbox/sdk-reference#sandbox.create).

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

### Drive class accessors

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

Use `Drive.list()` to enumerate drives for a project. Filter by name prefix when you need to find drives for a specific workspace or user.

**Returns:** `Promise<{ drives: Drive[]; pagination: Pagination; }>` with async pagination helpers.

| Parameter    | Type                                             | Required | Details                                      |
| ------------ | ------------------------------------------------ | -------- | -------------------------------------------- |
| `projectId`  | `string`                                         | No       | Project whose drives you want to list.       |
| `limit`      | `number`                                         | No       | Maximum number of drives to return.          |
| `cursor`     | `string \| number`                               | No       | Pagination cursor from a previous response.  |
| `since`      | `number \| string`                               | No       | Lower pagination bound for returned drives.  |
| `until`      | `number \| string`                               | No       | Upper pagination bound for returned drives.  |
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

| Parameter | Type          | Required | Details                                                                                          |
| --------- | ------------- | -------- | ------------------------------------------------------------------------------------------------ |
| `name`    | `string`      | Yes      | Drive name. Must be unique within the project.                                                    |
| `maxSize` | `number`      | No       | Drive size limit in bytes. Defaults to 100 GiB when omitted, and can be configured up to 1 TiB. |
| `signal`  | `AbortSignal` | No       | Cancel the request if necessary.                                                                 |

```ts filename="index.ts"
import { Drive } from '@vercel/sandbox';

const drive = await Drive.getOrCreate({
  name: 'workspace-cache',
  maxSize: 200 * 1024 * 1024 * 1024, // 200 GiB
});
```

### Drive class instance methods

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

- [Install system packages](/kb/guide/how-to-install-system-packages-in-vercel-sandbox) while keeping sudo-enabled commands isolated.
- [Execute long-running tasks](/docs/sandbox/working-with-sandbox#execute-long-running-tasks) by extending sandbox timeouts for training or large dependency installs.
- [Mount persistent drives](/docs/sandbox/concepts/drives) when sandbox runs need to reuse workspace files, caches, or shared inputs.
- Browse more scenarios in the [Sandbox examples](/docs/sandbox/working-with-sandbox#examples) catalog.

## Authentication

Vercel Sandbox supports two authentication methods:

- **[Vercel OIDC tokens](/docs/sandbox/concepts/authentication#vercel-oidc-token-recommended)** (recommended): Vercel generates the OIDC token that it associates with your Vercel project. For local development, run `vercel link` and `vercel env pull` to get a development token. In production on Vercel, authentication is automatic.
- **[Access tokens](/docs/sandbox/concepts/authentication#access-tokens)**: Use access tokens when `VERCEL_OIDC_TOKEN` is unavailable, such as in external CI/CD systems or non-Vercel environments.

To learn more on each method, see [Authentication](/docs/sandbox/concepts/authentication) for complete setup instructions.

## Environment defaults

- **Operating system:** Amazon Linux 2023 with common build tools such as `git`, `tar`, `openssl`, and `dnf`.
- **Available runtimes:** `node26`, `node24`, `node22`, and `python3.13` images with their respective package managers.
- **Resources:** Choose the number of virtual CPUs (`vcpus`) per sandbox. Pricing and plan limits appear in the [Sandbox pricing table](/docs/sandbox/pricing#resource-limits).
- **Timeouts:** The default timeout is 5 minutes. You can extend it programmatically up to 45 minutes on the Hobby plan and up to 24 hours on Pro and Enterprise plans.
- **Sudo:** `sudo` commands run as `vercel-sandbox` with the root home directory set to `/root`.

> **💡 Note:** The filesystem is ephemeral. You must export artifacts to durable storage if
> you need to keep them after the sandbox stops.


---

[View full sitemap](/docs/sitemap)
