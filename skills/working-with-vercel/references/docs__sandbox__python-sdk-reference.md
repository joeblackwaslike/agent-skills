---
title: Python SDK Reference
product: vercel
url: /docs/sandbox/python-sdk-reference
canonical_url: "https://vercel.com/docs/sandbox/python-sdk-reference"
last_updated: 2026-05-25
type: reference
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/sdk-reference
  - /docs/sandbox/concepts/authentication
summary: Reference for the Vercel Sandbox Python SDK, including sync and async APIs for managing sandboxes, commands, snapshots, and network policy.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/python-sdk-reference.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "e4621f045f9ce95bf0778d2f2d80dfcda146a325817d2bd4bc7005a2477decb4"
---

# Python SDK Reference

Use the Vercel Sandbox Python SDK to create ephemeral Linux microVMs, run commands, manage files, and capture snapshots from sync or async Python code.

For JavaScript, see the [JS SDK Reference](/docs/sandbox/sdk-reference).

## Prerequisites

Install the Python package:

```bash filename="Terminal"
uv add vercel
```

After installation:

- Link your project and pull environment variables with `vercel link` and `vercel env pull` so the SDK can read a Vercel OpenID Connect (OIDC) token.
- Choose the sandbox runtime your workload needs.
- Import from `vercel.sandbox` for the full sync and async API surface. If you want async-first aliases for the main sandbox and command types, `vercel.sandbox.aio` exports async `Sandbox`, `Command`, and `CommandFinished` aliases.

## Core classes

| Class                              | What it does                                           | Example                                              |
| ---------------------------------- | ------------------------------------------------------ | ---------------------------------------------------- |
| [`AsyncSandbox`](#sandbox-class)   | Creates and manages sandboxes in async Python code     | `async with await AsyncSandbox.create() as sandbox:` |
| [`AsyncCommand`](#command-class)   | Represents a running or finished command in async code | `command = await sandbox.run_command_detached(...)`  |
| [`AsyncSnapshot`](#snapshot-class) | Represents a saved sandbox state in async code         | `snapshot = await sandbox.snapshot()`                |
| [`Sandbox`](#sandbox-class)        | Creates and manages sandboxes in sync Python code      | `with Sandbox.create() as sandbox:`                  |
| [`Command`](#command-class)        | Represents a running or finished command in sync code  | `command = sandbox.run_command_detached(...)`        |
| [`Snapshot`](#snapshot-class)      | Represents a saved sandbox state in sync code          | `snapshot = sandbox.snapshot()`                      |

## Sandbox class

The `Sandbox` and `AsyncSandbox` classes manage the full sandbox lifecycle. The sync API returns values directly, and the async API returns awaitables and async iterators.

### Sandbox class accessors

#### `sandbox_id`

Use `sandbox_id` to identify the current microVM so you can reconnect with `Sandbox.get()` or `AsyncSandbox.get()`. Store the value when your workflow spans multiple processes, retries, or background workers.

**Returns:** `str`.

```python filename="main.py"
print(sandbox.sandbox_id)
```

#### `status`

The `status` accessor reports the lifecycle state of the sandbox. Use it to check whether a sandbox is ready for new work, still starting, or already stopped.

**Returns:** `SandboxStatus`.

Possible values:

- `SandboxStatus.PENDING`
- `SandboxStatus.RUNNING`
- `SandboxStatus.STOPPING`
- `SandboxStatus.STOPPED`
- `SandboxStatus.ABORTED`
- `SandboxStatus.FAILED`
- `SandboxStatus.SNAPSHOTTING`

```python filename="main.py"
from vercel.sandbox import SandboxStatus

if sandbox.status == SandboxStatus.RUNNING:
    print("Sandbox is ready")

print(sandbox.status)
```

#### `source_snapshot_id`

Use `source_snapshot_id` to inspect which snapshot created the current sandbox. This value is `None` when the sandbox did not start from a snapshot.

**Returns:** `str | None`.

```python filename="main.py"
print(sandbox.source_snapshot_id)
```

#### `timeout`

The `timeout` accessor returns the current sandbox timeout in milliseconds. Compare this with upcoming work and call `extend_timeout()` when you need more time.

**Returns:** `int`.

```python filename="main.py"
print(sandbox.timeout)
```

#### `network_policy`

Use `network_policy` to inspect the current egress policy on the sandbox. This is useful when you update firewall rules dynamically during a workflow.

**Returns:** `NetworkPolicy | None`.

```python filename="main.py"
print(sandbox.network_policy)
```

#### `interactive_port`

The `interactive_port` accessor returns the PTY port when the sandbox was created with `interactive=True`. It remains `None` for non-interactive sandboxes.

**Returns:** `int | None`.

```python filename="main.py"
print(sandbox.interactive_port)
```

### Sandbox class static methods

#### `Sandbox.create()` and `AsyncSandbox.create()`

Use `create()` to launch a new sandbox with the runtime, source, timeout, ports, and network policy your workflow needs. The async version returns an awaitable sandbox and supports the same parameters.

**Returns:** `Sandbox` for sync code and `AsyncSandbox` for async code.

| Parameter        | Type                     | Required | Details                                                                              |
| ---------------- | ------------------------ | -------- | ------------------------------------------------------------------------------------ |
| `source`         | `Source \| None`         | No       | Use a Git repository, tarball, or snapshot as the starting filesystem.               |
| `ports`          | `list[int] \| None`      | No       | Ports to expose through `sandbox.domain(port)`.                                      |
| `timeout`        | `int \| None`            | No       | Initial timeout in milliseconds.                                                     |
| `resources`      | `dict[str, Any] \| None` | No       | Resource configuration such as virtual CPUs.                                         |
| `runtime`        | `str \| None`            | No       | Runtime image such as `node24`, `node22`, or `python3.13`.                           |
| `token`          | `str \| None`            | No       | Access token override.                                                               |
| `project_id`     | `str \| None`            | No       | Project scope override.                                                              |
| `team_id`        | `str \| None`            | No       | Team scope override.                                                                 |
| `interactive`    | `bool`                   | No       | Enables PTY support. Use the async API for `shell()`.                                |
| `env`            | `dict[str, str] \| None` | No       | Default environment variables for commands.                                          |
| `network_policy` | `NetworkPolicy \| None`  | No       | Egress policy, including `"allow-all"`, `"deny-all"`, or `NetworkPolicyCustom(...)`. |

Create a sandbox from a snapshot:

Create a sandbox from a Git repository:

#### `Sandbox.get()` and `AsyncSandbox.get()`

Use `get()` to reconnect to an active sandbox by ID. This is useful when a background job stores `sandbox_id` and resumes work later.

**Returns:** `Sandbox` for sync code and `AsyncSandbox` for async code.

| Parameter    | Type          | Required | Details                                |
| ------------ | ------------- | -------- | -------------------------------------- |
| `sandbox_id` | `str`         | Yes      | Identifier of the sandbox to retrieve. |
| `token`      | `str \| None` | No       | Access token override.                 |
| `project_id` | `str \| None` | No       | Project scope override.                |
| `team_id`    | `str \| None` | No       | Team scope override.                   |

#### `Sandbox.list()` and `AsyncSandbox.list()`

Use `list()` to fetch sandbox summaries for a project.

**Returns:** The first page of sandbox summaries. In Python, the returned page is iterable, so you can loop over its items directly.

| Parameter    | Type                      | Required | Details                                                         |
| ------------ | ------------------------- | -------- | --------------------------------------------------------------- |
| `limit`      | `int \| None`             | No       | Maximum number of sandboxes to return per page.                 |
| `since`      | `datetime \| int \| None` | No       | Lower timestamp bound as a timezone-aware datetime or epoch ms. |
| `until`      | `datetime \| int \| None` | No       | Upper timestamp bound as a timezone-aware datetime or epoch ms. |
| `token`      | `str \| None`             | No       | Access token override.                                          |
| `project_id` | `str \| None`             | No       | Project scope override.                                         |
| `team_id`    | `str \| None`             | No       | Team scope override.                                            |

### Sandbox class instance methods

#### `refresh()`

Use `refresh()` to reload the current sandbox state from the API. Call it when another process may have changed the sandbox and you need the latest values for accessors such as `status` or `timeout`.

**Returns:** `None`.

#### `wait_for_status()`

Use `wait_for_status()` to poll until the sandbox reaches a specific lifecycle state. Use it when a background job must wait for a sandbox to finish starting or stopping before continuing.

**Returns:** `None`.

| Parameter       | Type                   | Required | Details                                                                                                        |
| --------------- | ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `status`        | `SandboxStatus \| str` | Yes      | Target lifecycle state to wait for. Use any [`SandboxStatus`](#status) value, such as `SandboxStatus.RUNNING`. |
| `timeout`       | `float`                | No       | Maximum time to wait, in seconds.                                                                              |
| `poll_interval` | `float`                | No       | Delay between status checks.                                                                                   |

#### `domain()`

Use `domain()` to get the public URL for an exposed port. The port must be included in `ports` when you create the sandbox.
The call pattern is the same for sync and async sandbox objects.

**Returns:** `str`.

| Parameter | Type  | Required | Details                  |
| --------- | ----- | -------- | ------------------------ |
| `port`    | `int` | Yes      | Exposed port to resolve. |

```python filename="main.py"
print(sandbox.domain(3000))
```

#### `get_command()`

Use `get_command()` to fetch a previously started command by ID. This is useful after detached command execution when you want to resume log streaming or wait for completion later.

**Returns:** `Command` for sync code and `AsyncCommand` for async code.

| Parameter | Type  | Required | Details                             |
| --------- | ----- | -------- | ----------------------------------- |
| `cmd_id`  | `str` | Yes      | Identifier of the command to fetch. |

#### `run_command()`

Use `run_command()` to execute a command and wait for it to finish. The async version returns an awaitable result with the same arguments and behavior.

**Returns:** `CommandFinished` for sync code and `AsyncCommandFinished` for async code.

| Parameter | Type                     | Required | Details                                   |
| --------- | ------------------------ | -------- | ----------------------------------------- |
| `cmd`     | `str`                    | Yes      | Command to execute.                       |
| `args`    | `list[str] \| None`      | No       | Arguments for the command.                |
| `cwd`     | `str \| None`            | No       | Working directory for execution.          |
| `env`     | `dict[str, str] \| None` | No       | Additional environment variables.         |
| `sudo`    | `bool`                   | No       | Run the command with elevated privileges. |

#### `run_command_detached()`

Use `run_command_detached()` to start a command and return immediately with a live command object. This is useful for long-running processes, streaming logs, or waiting for results later.

**Returns:** `Command` for sync code and `AsyncCommand` for async code.

| Parameter | Type                     | Required | Details                                   |
| --------- | ------------------------ | -------- | ----------------------------------------- |
| `cmd`     | `str`                    | Yes      | Command to execute.                       |
| `args`    | `list[str] \| None`      | No       | Arguments for the command.                |
| `cwd`     | `str \| None`            | No       | Working directory for execution.          |
| `env`     | `dict[str, str] \| None` | No       | Additional environment variables.         |
| `sudo`    | `bool`                   | No       | Run the command with elevated privileges. |

#### `mk_dir()`

Use `mk_dir()` to create a directory in the sandbox filesystem before writing files or cloning repositories into it.

**Returns:** `None`.

| Parameter | Type          | Required | Details                    |
| --------- | ------------- | -------- | -------------------------- |
| `path`    | `str`         | Yes      | Directory to create.       |
| `cwd`     | `str \| None` | No       | Base directory for `path`. |

#### `iter_file()`

Use `iter_file()` to stream file contents from the sandbox in chunks. This is useful when you want to process a large file without loading it fully into memory.

**Returns:** An iterator for sync code and an async iterator for async code.

| Parameter    | Type          | Required | Details                              |
| ------------ | ------------- | -------- | ------------------------------------ |
| `path`       | `str`         | Yes      | Path to the file inside the sandbox. |
| `cwd`        | `str \| None` | No       | Base directory for resolving `path`. |
| `chunk_size` | `int`         | No       | Number of bytes per chunk.           |

#### `read_file()`

Use `read_file()` to read an entire file into memory. The method returns `None` when the path does not exist.

**Returns:** `bytes | None`.

| Parameter | Type          | Required | Details                              |
| --------- | ------------- | -------- | ------------------------------------ |
| `path`    | `str`         | Yes      | Path to the file inside the sandbox. |
| `cwd`     | `str \| None` | No       | Base directory for resolving `path`. |

#### `download_file()`

Use `download_file()` to copy a file from the sandbox to your local filesystem. Set `create_parents=True` when the local destination directory may not exist yet.

**Returns:** `str`.

| Parameter        | Type          | Required | Details                                       |
| ---------------- | ------------- | -------- | --------------------------------------------- |
| `remote_path`    | `str`         | Yes      | Path to the file inside the sandbox.          |
| `local_path`     | `str`         | Yes      | Destination path on your local machine.       |
| `cwd`            | `str \| None` | No       | Base directory for resolving `remote_path`.   |
| `create_parents` | `bool`        | No       | Create parent directories for the local file. |
| `chunk_size`     | `int`         | No       | Number of bytes per chunk while downloading.  |

#### `write_files()`

Use `write_files()` to upload one or more files into the sandbox. Each file entry requires a sandbox path and binary content, with an optional Unix mode for file permissions.

**Returns:** `None`.

| Parameter       | Type              | Required | Details                                                         |
| --------------- | ----------------- | -------- | --------------------------------------------------------------- |
| `files`         | `list[WriteFile]` | Yes      | Files to write into the sandbox.                                |
| `files.path`    | `str`             | Yes      | Path to the file inside the sandbox.                            |
| `files.content` | `bytes`           | Yes      | File contents as bytes.                                         |
| `files.mode`    | `int`             | No       | Unix file permissions such as `0o755` for an executable script. |

#### `update_network_policy()`

Use `update_network_policy()` to replace the sandbox egress policy after creation. Use it when a workflow needs broader network access for a specific step and you want to restore restrictions afterward.

**Returns:** `NetworkPolicy`.

| Parameter        | Type            | Required | Details                            |
| ---------------- | --------------- | -------- | ---------------------------------- |
| `network_policy` | `NetworkPolicy` | Yes      | New egress policy for the sandbox. |

#### `extend_timeout()`

Use `extend_timeout()` to add more time to a running sandbox before it stops automatically.

**Returns:** `None`.

| Parameter  | Type  | Required | Details                            |
| ---------- | ----- | -------- | ---------------------------------- |
| `duration` | `int` | Yes      | Timeout extension in milliseconds. |

#### `stop()`

Use `stop()` to shut down the sandbox. Set `blocking=True` when you want to wait until the stop operation completes before continuing.

**Returns:** `None`.

| Parameter       | Type    | Required | Details                           |
| --------------- | ------- | -------- | --------------------------------- |
| `blocking`      | `bool`  | No       | Wait for the sandbox to stop.     |
| `timeout`       | `float` | No       | Maximum time to wait, in seconds. |
| `poll_interval` | `float` | No       | Delay between status checks.      |

#### `snapshot()`

Use `snapshot()` to save the sandbox filesystem so you can restore it later. Creating a snapshot stops the source sandbox.

**Returns:** `Snapshot` for sync code and `AsyncSnapshot` for async code.

| Parameter    | Type          | Required | Details                                                                                                                                                   |
| ------------ | ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expiration` | `int \| None` | No       | Expiration time in milliseconds. Use `0` for no expiration. Expiring snapshots must use `MIN_SNAPSHOT_EXPIRATION_MS` (`86_400_000`, 24 hours) or greater. |

#### `shell()`

Use `shell()` to start an interactive PTY session inside the sandbox. This method is available only on `AsyncSandbox`, and the sandbox must be created with `interactive=True`.

**Returns:** `None`.

| Parameter | Type                     | Required | Details                                 |
| --------- | ------------------------ | -------- | --------------------------------------- |
| `command` | `list[str] \| None`      | No       | Command to launch in the PTY session.   |
| `env`     | `dict[str, str] \| None` | No       | Environment variables for the shell.    |
| `cwd`     | `str \| None`            | No       | Working directory for the shell.        |
| `sudo`    | `bool`                   | No       | Run the shell with elevated privileges. |

Interactive shells require `interactive=True` and the async API:

```python filename="main.py"
import asyncio

from vercel.sandbox import AsyncSandbox


async def main() -> None:
    sandbox = await AsyncSandbox.create(interactive=True, timeout=300_000)
    try:
        await sandbox.shell(["/bin/bash"])
    finally:
        await sandbox.stop()


asyncio.run(main())
```

## Command class

The `Command` and `AsyncCommand` classes represent detached commands that are still running or can be inspected later. Use them to stream logs, wait for completion, or terminate a process.

### Command class accessors

#### `cmd_id`

Use `cmd_id` to identify a detached command so you can fetch it later with `get_command()`.

**Returns:** `str`.

```python filename="main.py"
print(command.cmd_id)
```

#### `cwd`

The `cwd` accessor returns the working directory used for the command.

**Returns:** `str`.

```python filename="main.py"
print(command.cwd)
```

#### `started_at`

Use `started_at` to inspect when the command began. The value is a Unix timestamp in milliseconds.

**Returns:** `int`.

```python filename="main.py"
print(command.started_at)
```

### Command class methods

#### `logs()`

Use `logs()` to stream `LogLine` records from the command. The sync API returns an iterator, and the async API returns an async iterator.

**Returns:** An iterator for sync code and an async iterator for async code.

#### `wait()`

Use `wait()` to block until the detached command finishes unless it has already completed.

**Returns:** `CommandFinished` for sync code and `AsyncCommandFinished` for async code.

#### `output()`

Use `output()` to collect the command output as a string. You can request `stdout`, `stderr`, or both streams.

**Returns:** `str`.

| Parameter | Type  | Required | Details                                                          |
| --------- | ----- | -------- | ---------------------------------------------------------------- |
| `stream`  | `str` | No       | Output stream to collect, such as `both`, `stdout`, or `stderr`. |

#### `stdout()`

Use `stdout()` to return only standard output collected for the command.

**Returns:** `str`.

#### `stderr()`

Use `stderr()` to return only standard error collected for the command.

**Returns:** `str`.

#### `kill()`

Use `kill()` to send a signal to the running command.

**Returns:** `None`.

| Parameter | Type  | Required | Details                                                                                                        |
| --------- | ----- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `signal`  | `int` | No       | POSIX signal number to send. Defaults to `15` (`SIGTERM`). Use `9` (`SIGKILL`) to force-terminate the process. |

### Detached command example

## CommandFinished class

`CommandFinished` and `AsyncCommandFinished` represent commands that have already completed. They inherit the `Command` and `AsyncCommand` methods `logs()`, `wait()`, `output()`, `stdout()`, `stderr()`, and `kill()`, so you can inspect output and metadata after the process exits.

### CommandFinished class accessors

#### `exit_code`

Use `exit_code` to inspect the final process status. A value of `0` means the command succeeded. Any non-zero value means it failed.
The accessor is the same for sync and async command results.

**Returns:** `int`.

```python filename="main.py"
if result.exit_code == 0:
    print("Command succeeded")
```

## Snapshot class

The `Snapshot` and `AsyncSnapshot` classes save a sandbox filesystem so you can restore it later. Creating a snapshot stops the source sandbox.

### Snapshot class accessors

#### `snapshot_id`

Use `snapshot_id` to identify the snapshot for later restore or deletion.

**Returns:** `str`.

```python filename="main.py"
print(snapshot.snapshot_id)
```

#### `source_sandbox_id`

The `source_sandbox_id` accessor returns the sandbox ID that created the snapshot.

**Returns:** `str`.

```python filename="main.py"
print(snapshot.source_sandbox_id)
```

#### `status`

Use `status` to inspect the snapshot lifecycle state.

**Returns:** `"created" | "deleted" | "failed"`.

```python filename="main.py"
print(snapshot.status)
```

#### `size_bytes`

The `size_bytes` accessor returns the snapshot size in bytes.

**Returns:** `int`.

```python filename="main.py"
print(snapshot.size_bytes)
```

#### `created_at`

Use `created_at` to inspect when the snapshot was created. The value is a Unix timestamp in milliseconds.

**Returns:** `int`.

```python filename="main.py"
print(snapshot.created_at)
```

#### `expires_at`

Use `expires_at` to inspect when the snapshot expires. The value is `None` when the snapshot does not expire.

**Returns:** `int | None`.

```python filename="main.py"
print(snapshot.expires_at)
```

### Snapshot class static methods

#### `Snapshot.get()` and `AsyncSnapshot.get()`

Use `get()` to fetch an existing snapshot by ID.

**Returns:** `Snapshot` for sync code and `AsyncSnapshot` for async code.

| Parameter     | Type          | Required | Details                                 |
| ------------- | ------------- | -------- | --------------------------------------- |
| `snapshot_id` | `str`         | Yes      | Identifier of the snapshot to retrieve. |
| `token`       | `str \| None` | No       | Access token override.                  |
| `project_id`  | `str \| None` | No       | Project scope override.                 |
| `team_id`     | `str \| None` | No       | Team scope override.                    |

#### `Snapshot.list()` and `AsyncSnapshot.list()`

Use `list()` to fetch snapshot summaries for a project.

**Returns:** The first page of snapshot summaries. In Python, the returned page is iterable, so you can loop over its items directly.

| Parameter    | Type                      | Required | Details                                                         |
| ------------ | ------------------------- | -------- | --------------------------------------------------------------- |
| `limit`      | `int \| None`             | No       | Maximum number of snapshots to return per page.                 |
| `since`      | `datetime \| int \| None` | No       | Lower timestamp bound as a timezone-aware datetime or epoch ms. |
| `until`      | `datetime \| int \| None` | No       | Upper timestamp bound as a timezone-aware datetime or epoch ms. |
| `token`      | `str \| None`             | No       | Access token override.                                          |
| `project_id` | `str \| None`             | No       | Project scope override.                                         |
| `team_id`    | `str \| None`             | No       | Team scope override.                                            |

### Snapshot class instance methods

#### `delete()`

Use `delete()` to remove a snapshot you no longer need.

**Returns:** `None`.

### Snapshot helpers

#### `SnapshotExpiration(value)`

Use `SnapshotExpiration(value)` to validate snapshot expiration values before you pass them to `snapshot()`.

#### `MIN_SNAPSHOT_EXPIRATION_MS`

`MIN_SNAPSHOT_EXPIRATION_MS` is the minimum expiration for expiring snapshots. The value is `86_400_000` milliseconds, or 24 hours.

### Snapshot example

## Supporting types

These types are exported from `vercel.sandbox`:

- Source types: `Source`, `GitSource`, `TarballSource`, and `SnapshotSource`
- Sandbox types: `SandboxStatus` for sandbox lifecycle states and `WriteFile` for `write_files()`
- Network policy types: `NetworkPolicy`, `NetworkPolicyCustom`, `NetworkPolicyRule`, `NetworkPolicySubnets`, and `NetworkTransformer`
- Command result types: `CommandFinished` and `AsyncCommandFinished`
- Error types: `SandboxError`, `APIError`, `SandboxAuthError`, `SandboxNotFoundError`, `SandboxPermissionError`, `SandboxRateLimitError`, and `SandboxServerError`

## Authentication

The SDK supports the same authentication methods as the rest of Vercel Sandbox:

- Vercel OIDC tokens through `VERCEL_OIDC_TOKEN`. The SDK uses `VERCEL_PROJECT_ID` and `VERCEL_TEAM_ID` when present, and falls back to decoding them from the token payload when possible.
- Access tokens through `token=...`, or through `VERCEL_TOKEN` together with `VERCEL_PROJECT_ID` and `VERCEL_TEAM_ID`.

For setup details, see [Authentication](/docs/sandbox/concepts/authentication).


---

[View full sitemap](/docs/sitemap)
