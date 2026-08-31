---
title: Python SDK Reference
product: vercel
url: /docs/sandbox/python-sdk-reference
canonical_url: "https://vercel.com/docs/sandbox/python-sdk-reference"
last_updated: 2026-08-25
type: reference
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/sdk-reference
  - /docs/sandbox/concepts/authentication
summary: Reference for the Vercel Sandbox Python SDK, including sandbox lifecycle, processes, files, snapshots, persistence, and network policies.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/python-sdk-reference.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "2c89aa7f0faebc8ac0fdc479440e5f4c0e874c0759c89746c10c207f0fb9a941"
---

# Python SDK Reference

Use the Vercel Sandbox Python SDK to create isolated Linux microVMs, run processes, manage files, and preserve environments between sessions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence?from=related&source_path=%2Fdocs%2Fsandbox%2Fpython-sdk-reference&source_site=vercel-docs&relationship=related) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [How to use snapshots for faster sandbox startup](https://vercel.com/kb/guide/how-to-use-snapshots-for-faster-sandbox-startup?from=related&source_path=%2Fdocs%2Fsandbox%2Fpython-sdk-reference&source_site=vercel-docs&relationship=related) — Learn how to save sandbox state with snapshots and skip installation on future runs.
- [Sandbox](https://eve.dev/docs/sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fpython-sdk-reference&source_site=vercel-docs&relationship=related) — The agent's isolated bash environment, including built-in file tools, a seeded /workspace, backends, lifecycle, and netw
- [How to test a container image in Vercel Sandbox before deploying](https://vercel.com/kb/guide/test-container-image-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fpython-sdk-reference&source_site=vercel-docs&relationship=related) — Validate a container image before deploying by booting it as a custom Sandbox image from Vercel Container Registry \\(VCR
- [Persistence](https://vercel.com/docs/sandbox/concepts/persistent-sandboxes?from=related&source_path=%2Fdocs%2Fsandbox%2Fpython-sdk-reference&source_site=vercel-docs&relationship=related) — Sandboxes automatically save their filesystem state when stopped and restore it when resumed. No manual snapshot managem
- [Working with Sandbox](https://vercel.com/docs/sandbox/working-with-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fpython-sdk-reference&source_site=vercel-docs&relationship=related) — Task-oriented examples for common Vercel Sandbox operations in TypeScript and Python.
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Fpython-sdk-reference&source_site=vercel-docs&relationship=related) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [Snapshots](https://vercel.com/docs/sandbox/concepts/snapshots?from=related&source_path=%2Fdocs%2Fsandbox%2Fpython-sdk-reference&source_site=vercel-docs&relationship=related) — Save and restore sandbox state with snapshots for faster startups and environment sharing.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fpython-sdk-reference&source_site=vercel-docs&relationship=related) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y

Full cross-link map for this page: [/docs/sandbox/python-sdk-reference.graph.md](/docs/sandbox/python-sdk-reference.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fpython-sdk-reference&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

For JavaScript and TypeScript, see the [JS SDK Reference](/docs/sandbox/sdk-reference).

## Install the SDK

Install the Vercel Python package:

```bash filename="Terminal"
uv add vercel
```

The examples on this page use the asynchronous API. You can import it as a module:

```python filename="main.py"
from vercel import sandbox
```

The SDK creates and reuses a default session when you first use it. Most applications don't need to create one. See [SDK sessions](#sdk-sessions) when you need a custom HTTP client, credentials, or service configuration.

## Create a sandbox

### `create_sandbox()`

Create and start a sandbox:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    async with sandbox.create_sandbox() as box:
        result = await box.run_process(
            "python",
            ["-c", "print('Hello from Vercel Sandbox!')"],
            capture_output=True,
            check=True,
        )
        print(result.stdout)


asyncio.run(main())
```

`create_sandbox()` returns a single-use operation that you can either await or use as an async context manager:

- `async with sandbox.create_sandbox() as box` stops and destroys the sandbox on exit.
- `box = await sandbox.create_sandbox()` leaves lifecycle management to you. Call `stop()` to end the current session or `destroy()` to delete the sandbox.
- Pass `destroy=False` to stop, but not destroy, a context-managed sandbox on exit.

> **💡 Note:** Don't await or enter the same creation operation more than once.

The function accepts these keyword arguments:

| Parameter              | Type                                                      | Description                                                                              |
| ---------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `project_id`           | `str \| None`                                             | Project that owns the sandbox. The SDK uses your resolved credentials when omitted.      |
| `name`                 | `str \| None`                                             | Stable sandbox name. Vercel generates one when omitted.                                  |
| `image`                | `str \| None`                                             | Vercel Container Registry image reference.                                               |
| `source`               | `GitSource \| TarballSource \| SnapshotSource \| None`    | Initial filesystem source.                                                               |
| `ports`                | `list[int] \| None`                                       | Ports to expose through the sandbox routes.                                              |
| `execution_time_limit` | `int \| float \| timedelta \| None`                       | Maximum runtime for the current session. Numbers represent seconds.                      |
| `resources`            | `SandboxResources \| None`                                | Requested virtual CPUs and memory.                                                       |
| `persistent`           | `bool \| None`                                            | Whether Vercel snapshots the filesystem when the session stops.                          |
| `network_policy`       | `NetworkPolicy \| None`                                   | Outbound network policy.                                                                 |
| `env`                  | `Mapping[str, str] \| None`                               | Environment variables available to processes in the sandbox.                             |
| `tags`                 | `Mapping[str, str] \| None`                               | Metadata used to organize and query sandboxes.                                           |
| `snapshot_expiration`  | `int \| float \| timedelta \| SnapshotExpiration \| None` | Default snapshot lifetime. Numbers represent seconds. Zero disables expiration.          |
| `snapshot_retention`   | `SnapshotRetention \| None`                               | Automatic snapshot retention policy.                                                     |
| `destroy`              | `bool`                                                    | Whether context-manager exit destroys the sandbox after stopping it. Defaults to `True`. |

When you omit `image`, the Sandbox API uses `vercel/sandbox/universal:latest`. You can pass a bare repository, tag, digest, or fully qualified Vercel Container Registry reference. The `box.image` property contains the resolved image reference.

Create a persistent sandbox without automatic cleanup:

```python filename="main.py"
import asyncio
from datetime import timedelta

from vercel import sandbox
from vercel.sandbox import SnapshotRetention


async def main() -> None:
    box = await sandbox.create_sandbox(
        name="my-development-environment",
        persistent=True,
        execution_time_limit=timedelta(minutes=30),
        snapshot_retention=SnapshotRetention(count=3),
        tags={"environment": "development"},
    )

    try:
        await box.run_process("uv", ["sync"], check=True)
    finally:
        await box.stop()


asyncio.run(main())
```

### `fork_sandbox()`

Create a sandbox from an existing named sandbox:

```python filename="main.py"
from vercel import sandbox
from vercel.sandbox import SandboxResources

async with sandbox.fork_sandbox(
    source_sandbox="production-agent",
    name="debug-agent",
    resources=SandboxResources(vcpus=4, memory=8192),
    tags={"purpose": "debug"},
) as forked:
    result = await forked.run_process(
        "python",
        ["script.py"],
        capture_output=True,
        check=True,
    )
    print(result.stdout)
```

The fork inherits the source sandbox's current snapshot and configuration. Values passed to `fork_sandbox()` replace the corresponding inherited values. Like `create_sandbox()`, the returned operation is single-use, awaitable, and an async context manager. Context-manager exit stops and destroys the fork by default.

## Retrieve and resume sandboxes

### `get_sandbox()`

Fetch a sandbox by name without starting a new runtime session:

```python filename="main.py"
box = await sandbox.get_sandbox(name="my-development-environment")
print(box.status)
print(box.current_snapshot_id)
```

`get_sandbox()` accepts `name`, optional `project_id`, and optional `include_system_routes`. The lookup is passive and doesn't start a new runtime session.

Process and filesystem operations on the returned handle automatically resume a stopped persistent sandbox. The same `box` handle adopts the replacement session before retrying the operation:

```python filename="main.py"
box = await sandbox.get_sandbox(name="my-development-environment")

# Resumes the sandbox if it is stopped, then reads the restored filesystem.
content = await box.fs.read_text("state.json")
print(content)
```

This behavior applies to `run_process()`, `create_process()`, process queries, methods on `box.fs`, `extend_execution_time_limit()`, `update_network_policy()`, and `snapshot()`. Lifecycle and sandbox configuration operations, including `stop()`, `destroy()`, and `update()`, don't auto-resume.

### `get_or_create_sandbox()`

Retrieve a named sandbox or create it when it doesn't exist:

```python filename="main.py"
box, created = await sandbox.get_or_create_sandbox(
    name="my-development-environment",
    persistent=True,
)

if created:
    await box.run_process("uv", ["sync"], check=True)
```

The function resumes an existing sandbox by default. Pass `resume=False` for a passive lookup. If the sandbox's latest snapshot no longer exists, the SDK deletes the stale sandbox and creates a replacement with the same name. The `created` value is `True` when the SDK creates or replaces the sandbox.

### `resume_sandbox()`

Start a new runtime session from a stopped persistent sandbox:

```python filename="main.py"
async with sandbox.resume_sandbox(
    name="my-development-environment"
) as box:
    content = await box.fs.read_text("state.json")
    print(content)
```

`resume_sandbox()` returns a single-use operation. You can await it to manage the lifecycle yourself or use it as an async context manager. Context-manager exit stops the resumed session but doesn't destroy the sandbox.

Use `resume_sandbox()` when the runtime session must start before another operation. For lazy resume, use `get_sandbox()` and call a process or filesystem method on the returned handle.

### Query sandboxes

`query_sandboxes()` returns an async iterator and follows pagination cursors automatically:

```python filename="main.py"
from vercel import sandbox
from vercel.sandbox import SandboxQueryByName, TagFilter

query = SandboxQueryByName(
    name_prefix="user-123-",
    sort_order="desc",
    tag=TagFilter(key="environment", value="development"),
)

async for box in sandbox.query_sandboxes(query=query, page_size=50):
    print(box.name, box.status)
```

Use one of these query models:

| Type                              | Fields                                               |
| --------------------------------- | ---------------------------------------------------- |
| `SandboxQueryByCreatedAt`         | `sort_order`, optional `tag`                         |
| `SandboxQueryByName`              | `sort_order`, optional `name_prefix`, optional `tag` |
| `SandboxQueryByStatusUpdatedAt`   | `sort_order`                                         |
| `SandboxQueryByCurrentSnapshotId` | `sort_order`                                         |
| `TagFilter`                       | Exact `key` and `value` match                        |

All query functions accept `page_size` and `cursor`. `query_sandboxes()` also accepts `project_id`.

## Sandbox handles

A `Sandbox` handle describes the persistent sandbox and its current runtime session. A sandbox has at most one active session. When a stopped persistent sandbox resumes, the new session replaces the stopped session as the current one.

### Properties

| Property               | Type                             | Description                                                              |
| ---------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `name`                 | `str`                            | Stable sandbox identity.                                                 |
| `current_session_id`   | `str`                            | Identifier for the current runtime session.                              |
| `current_session`      | `SandboxRuntimeSession \| None`  | Current session handle when the API response includes it.                |
| `image`                | `str \| None`                    | Resolved image reference.                                                |
| `status`               | `SandboxStatus \| None`          | Current lifecycle state.                                                 |
| `persistent`           | `bool \| None`                   | Whether stop creates an automatic snapshot.                              |
| `current_snapshot_id`  | `str \| None`                    | Snapshot used for the next resume.                                       |
| `project_id`           | `str \| None`                    | Owning project.                                                          |
| `cwd`                  | `str \| None`                    | Default working directory.                                               |
| `region`               | `str \| None`                    | Runtime region.                                                          |
| `memory`               | `int \| None`                    | Memory in megabytes.                                                     |
| `vcpus`                | `int \| None`                    | Number of virtual CPUs.                                                  |
| `execution_time_limit` | `timedelta \| None`              | Current session execution limit.                                         |
| `network_policy`       | `NetworkPolicy \| None`          | Current outbound network policy.                                         |
| `snapshot_expiration`  | `timedelta \| None`              | Default snapshot expiration.                                             |
| `snapshot_retention`   | `SnapshotRetentionState \| None` | Active retention policy.                                                 |
| `status_updated_at`    | `int \| None`                    | Unix timestamp for the latest status update.                             |
| `created_at`           | `int \| None`                    | Unix creation timestamp.                                                 |
| `updated_at`           | `int \| None`                    | Unix update timestamp.                                                   |
| `tags`                 | `dict[str, str] \| None`         | Copy of the sandbox tags.                                                |
| `routes`               | `tuple[SandboxRouteState, ...]`  | Exposed routes. Each route has `url`, `port`, `subdomain`, and `system`. |
| `raw`                  | `dict \| None`                   | Copy of the raw API response data.                                       |
| `fs`                   | `SandboxFilesystem`              | Filesystem for the current session.                                      |

`SandboxStatus` can be `PENDING`, `RUNNING`, `STOPPING`, `STOPPED`, `FAILED`, `ABORTED`, or `SNAPSHOTTING`.

### `session()`

Use `session()` when you want to scope work to the sandbox's active runtime session and clean it up when the block exits:

```python filename="main.py"
box = await sandbox.get_sandbox(name="my-development-environment")

async with box.session() as runtime_session:
    result = await runtime_session.run_process(
        "python",
        ["script.py"],
        capture_output=True,
        check=True,
    )
    print(runtime_session.id, result.stdout)
```

`session()` resumes the sandbox if needed and returns its current `SandboxRuntimeSession`. Operations through this handle stay attached to that session and don't trigger automatic resume.

Choose the lifecycle behavior that fits your application:

- `async with box.session() as runtime_session` attempts to stop the acquired session when the block exits. It doesn't destroy the parent sandbox.
- `runtime_session = await box.session()` doesn't perform automatic cleanup. Call `await runtime_session.stop()` when you're done.
- Use methods on `box` instead when you want a stopped sandbox to resume automatically.

A sandbox has only one active session at a time. On context exit, the SDK requests a stop for the session acquired on entry. If that session has already stopped and the sandbox has resumed, the request is a no-op and the new active session keeps running.

Each asynchronous `session()` operation is single-use. Don't await or enter the same operation more than once. Complete concurrent work before leaving the context when you need deterministic cleanup.

### Routes

Find the URL for an exposed port:

```python filename="main.py"
def route_url(box: sandbox.Sandbox, port: int) -> str | None:
    for route in box.routes:
        if route.port == port:
            return route.url
    return None


box = await sandbox.create_sandbox(ports=[3000])
print(route_url(box, 3000))
```

### `update()`

Update mutable sandbox configuration:

```python filename="main.py"
from datetime import timedelta

from vercel.sandbox import NetworkPolicy, SandboxResources, SnapshotRetention

await box.update(
    resources=SandboxResources(vcpus=2),
    execution_time_limit=timedelta(minutes=30),
    persistent=True,
    ports=[3000, 8000],
    network_policy=NetworkPolicy.deny_all(),
    tags={"environment": "production"},
    snapshot_retention=SnapshotRetention(count=2),
)
```

You can update `ports`, `execution_time_limit`, `resources`, `persistent`, `network_policy`, `env`, `tags`, `snapshot_expiration`, `snapshot_retention`, and `current_snapshot_id`. Only non-`None` values are sent. Passing `snapshot_retention=None` explicitly removes the retention policy. `ports` replaces the complete exposed port list. Set `current_snapshot_id` to choose the snapshot restored on the next resume. The method refreshes and returns the same `Sandbox` handle.

### `extend_execution_time_limit()`

Increase the current session's execution limit:

```python filename="main.py"
from datetime import timedelta

session = await box.extend_execution_time_limit(timedelta(minutes=15))
print(session.execution_time_limit)
```

The duration adds to the current limit. The service rejects durations shorter than one second.

### `stop()` and `destroy()`

Stop the current runtime session without deleting a persistent sandbox:

```python filename="main.py"
await box.stop()
```

Delete the sandbox, its sessions, and its snapshots permanently:

```python filename="main.py"
await box.destroy()
```

### `list_sessions()` and `list_snapshots()`

Fetch one page of resources that belong to a sandbox:

```python filename="main.py"
sessions = await box.list_sessions(page_size=20, sort_order="desc")
snapshots = await box.list_snapshots(page_size=20, sort_order="desc")
```

Use the module-level query functions when you want automatic pagination.

## Run processes

### `run_process()`

Run a process and wait for it to exit:

```python filename="main.py"
result = await box.run_process(
    "python",
    ["-m", "pytest"],
    cwd="/vercel/sandbox",
    env={"PYTHONUNBUFFERED": "1"},
    kill_after=120,
    capture_output=True,
    check=True,
)

print(result.returncode)
print(result.stdout)
print(result.stderr)
```

By default, `run_process()` streams remote stdout and stderr to the matching local streams. Set `capture_output=True` to store both streams on the returned `CompletedProcess`. You can stream to custom text writers with `stdout` and `stderr`.

| Parameter        | Type                         | Default  | Description                                                    |
| ---------------- | ---------------------------- | -------- | -------------------------------------------------------------- |
| `command`        | `str`                        | Required | Executable or command name.                                    |
| `args`           | `Sequence[str] \| None`      | `None`   | Arguments excluding the executable.                            |
| `cwd`            | `str \| None`                | `None`   | Working directory.                                             |
| `env`            | `Mapping[str, str] \| None`  | `None`   | Environment variables added to the process.                    |
| `sudo`           | `bool`                       | `False`  | Run with elevated privileges.                                  |
| `kill_after`     | `float \| timedelta \| None` | `None`   | Server-side time before `SIGKILL`. Numbers represent seconds.  |
| `check`          | `bool`                       | `False`  | Raise `subprocess.CalledProcessError` for a nonzero exit code. |
| `stdout`         | `TextIO \| int \| None`      | `None`   | Local destination or `subprocess` output sentinel.             |
| `stderr`         | `TextIO \| int \| None`      | `None`   | Local destination or `subprocess` output sentinel.             |
| `capture_output` | `bool`                       | `False`  | Capture stdout and stderr on the result.                       |

`CompletedProcess` includes `id`, `name`, `args`, `cwd`, `session_id`, `started_at`, `returncode`, `stdout`, and `stderr`. Its `check_returncode()` method raises `subprocess.CalledProcessError` after the process completes unsuccessfully.

### `create_process()`

Start a process and return before it exits:

```python filename="main.py"
import sys

process = await box.create_process(
    "sh",
    ["-lc", "for i in 1 2 3; do echo $i; sleep 1; done"],
)

assert process.stdout is not None
async for line in process.stdout:
    sys.stdout.write(line)

returncode = await process.wait()
```

`create_process()` accepts `command`, `args`, `cwd`, `env`, `sudo`, and `kill_after`. It also accepts `stdout` and `stderr` using `subprocess.PIPE`, `subprocess.DEVNULL`, or `subprocess.STDOUT`. Both streams default to `subprocess.PIPE`.

### Process properties and methods

| Member             | Description                                                                            |
| ------------------ | -------------------------------------------------------------------------------------- |
| `id`               | Process identifier.                                                                    |
| `name`             | Executable name.                                                                       |
| `args`             | Command arguments.                                                                     |
| `cwd`              | Working directory.                                                                     |
| `session_id`       | Owning runtime session.                                                                |
| `started_at`       | Unix start timestamp.                                                                  |
| `returncode`       | Exit code, or `None` while running.                                                    |
| `status`           | `ProcessStatus.RUNNING` or `ProcessStatus.EXITED`.                                     |
| `stdout`, `stderr` | Single-use `TextReader` streams, or `None` when dropped or merged.                     |
| `stdin`            | Always `None`. Process standard input isn't supported.                                 |
| `refresh()`        | Refresh process state.                                                                 |
| `wait()`           | Wait for exit and return the exit code.                                                |
| `communicate()`    | Read both streams and wait. Returns `(stdout, stderr)`. Process stdin isn't supported. |
| `send_signal()`    | Send an integer, `signal.Signals` value, or name such as `"SIGTERM"`.                  |
| `terminate()`      | Send `SIGTERM`.                                                                        |
| `kill()`           | Send `SIGKILL`.                                                                        |

A `TextReader` supports `read()`, `readline()`, async iteration, and `aclose()`. Each stream moves forward and can't rewind.

Get an existing process or list processes in the current session:

```python filename="main.py"
process = await box.get_process("cmd_123", wait=True)
processes = await box.query_processes()
```

## Manage files

Use `box.fs` to access the current runtime session's filesystem. Relative paths resolve from the sandbox working directory. Filesystem `path` and `cwd` arguments accept `str` or `pathlib.PurePosixPath`.

### Filesystem methods

| Method                                                                 | Description                                                                |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `open(path, mode, ...)`                                                | Open a lazy streaming reader or writer. Supports `r`, `rb`, `w`, and `wb`. |
| `mkdir(path, recursive=True)`                                          | Create a directory.                                                        |
| `read_text(path, encoding="utf-8", errors="strict")`                   | Read a complete text file.                                                 |
| `read_bytes(path)`                                                     | Read a complete binary file.                                               |
| `write_text(path, text, encoding="utf-8", errors="strict", mode=None)` | Write a complete text file.                                                |
| `write_bytes(path, data, mode=None)`                                   | Write a complete binary file.                                              |
| `batch()`                                                              | Stage multiple writes and upload them together on context exit.            |
| `exists(path)`                                                         | Check whether a path exists.                                               |
| `is_file(path)`                                                        | Check whether a path is a regular file.                                    |
| `is_dir(path)`                                                         | Check whether a path is a directory.                                       |
| `listdir(path=".")`                                                    | Return `DirectoryEntry` values.                                            |
| `remove(path, recursive=False, missing_ok=False)`                      | Remove a file or directory.                                                |
| `rename(source, destination)`                                          | Move or rename a path.                                                     |

All methods accept an optional `cwd` keyword argument.

### Read and write complete files

```python filename="main.py"
await box.fs.mkdir("workspace")
await box.fs.write_text("workspace/input.txt", "hello\n")
await box.fs.write_bytes("workspace/data.bin", b"\x00\x01")

text = await box.fs.read_text("workspace/input.txt")
data = await box.fs.read_bytes("workspace/data.bin")
```

### Batch file writes

Upload related files in one operation:

```python filename="main.py"
async with box.fs.batch(cwd="workspace") as batch:
    batch.write_text("main.py", "print('hello')\n")
    batch.write_bytes("data.bin", b"\x00\x01", mode=0o600)
```

`batch.write_text()` and `batch.write_bytes()` stage data locally. The context uploads all staged files when it exits successfully.

### Inspect and change paths

```python filename="main.py"
if await box.fs.exists("workspace/main.py"):
    entries = await box.fs.listdir("workspace")
    for entry in entries:
        print(entry.path, entry.kind)

await box.fs.rename("workspace/main.py", "workspace/app.py")
await box.fs.remove("workspace/data.bin", missing_ok=True)
```

`DirectoryEntry.kind` is `file`, `directory`, `symlink`, or `other`. Its `path` is relative to the listed directory.

### Stream large files

Use `open()` to avoid loading a complete file into memory:

```python filename="main.py"
from pathlib import Path

import anyio

local_path = anyio.Path("archive.tar")

async with (
    await anyio.open_file(local_path, "rb") as source,
    box.fs.open("archive.tar", "wb", permissions=0o600) as target,
):
    while chunk := await source.read(64 * 1024):
        await target.write(chunk)
```

Streaming handles expose `name`, `mode`, and `closed`. They also provide `readable()`, `writable()`, and `seekable()` state methods. Sandbox files are sequential streams, so `seekable()` returns `False`.

Readers support `read()`, `readline()`, async iteration, and `aclose()`. Binary readers also support `readinto()`. Writers support `write()`, `writelines()`, `flush()`, and `aclose()`.

For binary uploads, pass `size` when you know the expected byte count. The SDK raises `SandboxUploadSizeMismatchError` if the stream produces a different number of bytes.

## Work with snapshots

### Create and restore a snapshot

```python filename="main.py"
import asyncio
from datetime import timedelta

from vercel import sandbox
from vercel.sandbox import SnapshotSource


async def main() -> None:
    snapshot = None
    restored = None

    async with sandbox.create_sandbox() as box:
        await box.fs.mkdir("state")
        await box.fs.write_text("state/message.txt", "saved\n")
        snapshot = await box.snapshot(expiration=timedelta(days=7))

    try:
        restored = await sandbox.create_sandbox(
            source=SnapshotSource(snapshot_id=snapshot.id),
        )
        print(await restored.fs.read_text("state/message.txt"))
    finally:
        if restored is not None:
            await restored.destroy()
        if snapshot is not None:
            await snapshot.delete()


asyncio.run(main())
```

`SnapshotExpiration` accepts seconds or `timedelta`. Use zero for no expiration. Nonzero expiration must be between one day and 10 years.

### Snapshot properties

| Property                   | Type                                 | Description                                 |
| -------------------------- | ------------------------------------ | ------------------------------------------- |
| `id`                       | `str`                                | Snapshot identifier.                        |
| `source_session_id`        | `str`                                | Runtime session that produced the snapshot. |
| `region`                   | `str`                                | Storage region.                             |
| `status`                   | `"created" \| "deleted" \| "failed"` | Snapshot state.                             |
| `size_bytes`               | `int`                                | Stored size.                                |
| `expires_at`               | `int \| None`                        | Unix expiration timestamp.                  |
| `created_at`, `updated_at` | `int`                                | Unix timestamps.                            |
| `last_used_at`             | `int \| None`                        | Latest restore timestamp.                   |
| `creation_method`          | `str \| None`                        | How the snapshot was created.               |
| `parent_id`                | `str \| None`                        | Parent snapshot when present.               |

Call `await snapshot.delete()` to delete a snapshot.

### Get and query snapshots

```python filename="main.py"
snapshot = await sandbox.get_snapshot(snapshot_id="snap_123")

async for item in sandbox.query_snapshots(
    name="my-development-environment",
    page_size=50,
    sort_order="desc",
):
    print(item.id, item.status)
```

`query_snapshots()` accepts optional `project_id`, `name`, `page_size`, `cursor`, and `sort_order`.

### Query runtime sessions

Inspect session history across sandboxes:

```python filename="main.py"
async for runtime_session in sandbox.query_sessions(
    name="my-development-environment",
    sort_order="desc",
):
    print(runtime_session.id, runtime_session.status)
```

A `SandboxRuntimeSession` exposes `id`, `sandbox_name`, `project_id`, `status`, `cwd`, `region`, `memory`, `vcpus`, `execution_time_limit`, `network_policy`, `requested_at`, `started_at`, and `stopped_at`.

A runtime session also provides `fs`, process methods, `refresh()`, `extend_execution_time_limit()`, `update_network_policy()`, `snapshot()`, and `stop()`. These methods operate on that session and don't trigger automatic resume after it stops.

`SnapshotRetentionState` describes the active retention policy through `count`, optional `expiration`, and `delete_evicted` properties.

## Configure sandbox sources

### `GitSource`

Clone a Git repository when the sandbox starts:

```python filename="main.py"
from vercel.sandbox import GitSource

box = await sandbox.create_sandbox(
    source=GitSource(
        url="https://github.com/vercel/sandbox-example-next.git",
        revision="main",
        depth=1,
    )
)
```

`GitSource` accepts `url`, optional `depth`, optional `revision`, and optional `username` and `password` for HTTP basic authentication.

### `TarballSource`

Initialize from a remotely accessible tarball:

```python filename="main.py"
from vercel.sandbox import TarballSource

box = await sandbox.create_sandbox(
    source=TarballSource(url="https://example.com/source.tar.gz")
)
```

### `SnapshotSource`

Restore a filesystem snapshot:

```python filename="main.py"
from vercel.sandbox import SnapshotSource

box = await sandbox.create_sandbox(
    source=SnapshotSource(snapshot_id="snap_123")
)
```

## Configure resources and retention

`SandboxResources` accepts optional `vcpus` and `memory` fields:

```python filename="main.py"
from vercel.sandbox import SandboxResources

resources = SandboxResources(vcpus=2, memory=4096)
```

`SnapshotRetention` controls automatic snapshot retention:

```python filename="main.py"
from datetime import timedelta

from vercel.sandbox import SnapshotRetention

retention = SnapshotRetention(
    count=3,
    expiration=timedelta(days=7),
    delete_evicted=True,
)
```

`count` must be between one and 100. `delete_evicted` controls whether Vercel deletes snapshots removed from the retention window.

## Configure network access

### Allow or deny all traffic

```python filename="main.py"
from vercel.sandbox import NetworkPolicy

allowed = await sandbox.create_sandbox(
    network_policy=NetworkPolicy.allow_all()
)

denied = await sandbox.create_sandbox(
    network_policy=NetworkPolicy.deny_all()
)
```

### Allow selected domains

```python filename="main.py"
from vercel.sandbox import NetworkPolicy

policy = NetworkPolicy.custom(
    allow={
        "api.github.com": (),
        "pypi.org": (),
    }
)

box = await sandbox.create_sandbox(network_policy=policy)
```

### Broker credentials

Add a secret header to matching outbound requests without exposing the secret to the sandbox process:

```python filename="main.py"
import os

from vercel.sandbox import (
    NetworkPolicy,
    NetworkPolicyRule,
    NetworkPolicyTransform,
)

policy = NetworkPolicy.custom(
    allow={
        "api.github.com": [
            NetworkPolicyRule(
                transform=[
                    NetworkPolicyTransform(
                        headers={
                            "Authorization": f"Bearer {os.environ['GITHUB_TOKEN']}"
                        }
                    )
                ]
            )
        ]
    }
)
```

### Match requests

Restrict a rule by path, method, query string, or headers:

```python filename="main.py"
from vercel.sandbox import (
    NetworkPolicyKeyValueMatcher,
    NetworkPolicyMatcher,
    NetworkPolicyRequestMatcher,
    NetworkPolicyRule,
)

rule = NetworkPolicyRule(
    match=NetworkPolicyRequestMatcher(
        path=NetworkPolicyMatcher.starts_with("/v1/"),
        method=["POST"],
        query=[
            NetworkPolicyKeyValueMatcher(
                key=NetworkPolicyMatcher.exact("stream"),
                value=NetworkPolicyMatcher.regex("^(true|false)$"),
            )
        ],
    )
)
```

`NetworkPolicyMatcher` provides `exact()`, `starts_with()`, and `regex()` constructors. `NetworkPolicyRule` also accepts `forward_url`. `NetworkPolicyTransform` can set headers and declare `header_names`. `NetworkPolicySubnets` accepts optional `allow` and `deny` CIDR lists.

Update a running session's policy:

```python filename="main.py"
await box.update_network_policy(NetworkPolicy.deny_all())
```

## Synchronous API

The synchronous API mirrors the asynchronous API. Import it explicitly from `vercel.sandbox`:

```python filename="main.py"
from vercel.sandbox import sync as sandbox

with sandbox.create_sandbox() as box:
    result = box.run_process(
        "python",
        ["-c", "print('Hello from Vercel Sandbox!')"],
        capture_output=True,
        check=True,
    )
    print(result.stdout)
```

Remove `await` and use regular context managers and iterators. Sync handle names include `SyncSandbox`, `SyncSandboxRuntimeSession`, `SyncProcess`, `SyncSnapshot`, and sync filesystem reader and writer types.

Use `with box.session() as runtime_session:` to clean up the acquired session on exit, or `runtime_session = box.session()` to manage cleanup yourself.

Use the asynchronous API unless your application is synchronous. Don't call the synchronous API from an active async event loop.

## Exported protocol and union types

These exported types support precise annotations:

| Type                                       | Purpose                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------ |
| `CreateSandboxOperation`                   | Single-use awaitable and async context manager returned by `create_sandbox()`. |
| `ForkSandboxOperation`                     | Single-use awaitable and async context manager returned by `fork_sandbox()`.   |
| `ResumeSandboxOperation`                   | Single-use awaitable and async context manager returned by `resume_sandbox()`. |
| `SandboxSessionOperation`                  | Single-use awaitable and async context manager returned by `box.session()`.    |
| `SandboxSource`                            | Union of `GitSource`, `TarballSource`, and `SnapshotSource`.                   |
| `SandboxQuery`                             | Union of the four sandbox query models.                                        |
| `SandboxFilesystemBatch`                   | Async batch returned by `box.fs.batch()`.                                      |
| `SandboxTextReader`, `SandboxBinaryReader` | Async streaming file readers returned by `box.fs.open()`.                      |
| `SandboxTextWriter`, `SandboxBinaryWriter` | Async streaming file writers returned by `box.fs.open()`.                      |

## Errors

Catch `SandboxError` to handle any Sandbox SDK error. Catch a more specific type when your application can recover differently:

| Error                            | Meaning                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------- |
| `SandboxApiError`                | The Sandbox API returned an error. Inspect `status_code`, `code`, and `data`. |
| `SandboxCredentialsError`        | The SDK couldn't resolve valid credentials.                                   |
| `SandboxTerminalStateError`      | Sandbox creation reached a terminal failure state.                            |
| `SandboxTimeoutError`            | A session stayed in a lifecycle transition beyond the SDK deadline.           |
| `SandboxCleanupError`            | Context-managed cleanup failed.                                               |
| `SandboxResponseError`           | A successful API response was malformed.                                      |
| `SandboxStreamError`             | A process log stream reported an error.                                       |
| `SandboxInvalidHandleError`      | A handle isn't attached to a valid session or execution mode.                 |
| `SandboxFilesystemError`         | Base error for filesystem operations.                                         |
| `SandboxFilesystemCommandError`  | A command-backed filesystem operation failed.                                 |
| `SandboxFilesystemWriteError`    | The API rejected a batch write.                                               |
| `SandboxPathNotFoundError`       | A required remote path doesn't exist.                                         |
| `SandboxFilesystemTransferError` | Base error for streaming transfers.                                           |
| `SandboxUploadSizeMismatchError` | An upload didn't match its declared size.                                     |

`run_process(check=True)` raises Python's `subprocess.CalledProcessError` for nonzero exit codes.

```python filename="main.py"
from subprocess import CalledProcessError

from vercel.sandbox import SandboxApiError

try:
    await box.run_process("python", ["-m", "pytest"], check=True)
except CalledProcessError as error:
    print(error.returncode, error.stderr)
except SandboxApiError as error:
    print(error.status_code, error.code)
```

## Authentication

By default, the SDK resolves credentials in this order:

1. A Vercel OpenID Connect (OIDC) token from the current Vercel request or `VERCEL_OIDC_TOKEN`.
2. `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, and `VERCEL_TEAM_ID`.

For local development, run `vercel link` and `vercel env pull`, then load `.env.local` into your Python process with a tool such as `python-dotenv`. For other environments, set all three access-token variables. See [Sandbox Authentication](/docs/sandbox/concepts/authentication).

## CLI-only and JavaScript-only features

The Python SDK doesn't currently expose interactive PTY shells or the Drives API. Use `sandbox connect` for an interactive shell. Use the Sandbox CLI or JavaScript SDK for Drive operations.

Installing `vercel` also installs the `sandbox` and `vercel-sandbox` console commands. These commands delegate to the JavaScript Sandbox CLI through `npx`, so they require Node.js. The Python API itself doesn't require Node.js.

## SDK sessions

An SDK session owns the HTTP connection pool and service clients used by Vercel Python SDK calls. The SDK creates and reuses a default session, so most applications should call the SDK directly.

Creating a session without configuration is redundant because it behaves like the default session. Create an explicit session only when you need to customize its HTTP client or a service's configuration.

### `session()`

Import `session` from `vercel.api` and use it as an async or sync context manager:

```python
def session(
    *,
    service_options: Sequence[ServiceOptions] | None = None,
    httpx_client_factory: HttpxClientFactory | None = ...,
) -> SessionContext: ...
```

| Parameter              | Description                                                                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `service_options`      | Service-specific configuration. For Sandbox, pass `SandboxServiceOptions` from the async or sync Sandbox module.                                                |
| `httpx_client_factory` | Factory for a custom HTTP client. Return `httpx.AsyncClient` for async calls or `httpx.Client` for sync calls. Omit it to inherit the active session's factory. |

The session closes the HTTP client returned by `httpx_client_factory` when its context exits. Nested sessions inherit their parent's configuration. A nested service option replaces the option for that service. Don't use sync Sandbox calls inside an async session or async Sandbox calls inside a sync session.

### Configure the HTTP client

Pass an HTTPX client factory to configure the client used by Vercel services:

```python filename="main.py"
import asyncio
import os

import httpx

from vercel import sandbox
from vercel.api import session


def create_http_client() -> httpx.AsyncClient:
    # Services such as Sandbox use this underlying HTTPX client.
    return httpx.AsyncClient(proxy=os.environ["CORPORATE_PROXY_URL"])


async def main() -> None:
    async with session(httpx_client_factory=create_http_client):
        async with sandbox.create_sandbox() as box:
            await box.run_process("python", ["--version"], check=True)


asyncio.run(main())
```

The SDK closes the client when the session exits.

### Configure Sandbox

Pass `SandboxServiceOptions` to configure Sandbox calls in the session. This example reads credentials from custom environment variables and increases the timeout for streaming file transfers:

```python filename="main.py"
import asyncio
import os
from datetime import timedelta

from vercel import sandbox
from vercel.api import session
from vercel.sandbox import SandboxCredentials, SandboxServiceOptions


async def resolve_credentials() -> SandboxCredentials:
    return SandboxCredentials(
        token=os.environ["ACME_VERCEL_TOKEN"],
        project_id=os.environ["ACME_VERCEL_PROJECT_ID"],
        team_id=os.environ["ACME_VERCEL_TEAM_ID"],
    )


async def main() -> None:
    sandbox_options = SandboxServiceOptions(
        credentials_factory=resolve_credentials,
        file_transfer_timeout=timedelta(minutes=10),
    )

    async with session(service_options=[sandbox_options]):
        async with sandbox.create_sandbox() as box:
            print(box.name)


asyncio.run(main())
```

`SandboxServiceOptions` accepts these parameters:

| Parameter               | Default                               | Description                                                                                                      |
| ----------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `base_url`              | `https://vercel.com/api`              | Sandbox API base URL. Override it only for testing or Vercel-managed development environments.                   |
| `credentials_factory`   | Default OIDC and environment resolver | Callable that returns `SandboxCredentials`. Use an async callable for async Sandbox and a sync callable for sync. |
| `file_transfer_timeout` | 5 minutes                             | Timeout for streaming file uploads and downloads.                                                               |


---

[View full sitemap](/docs/sitemap)
