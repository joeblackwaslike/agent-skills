---
title: Python SDK Reference
product: vercel
url: /docs/sandbox/sdk/python
canonical_url: "https://vercel.com/docs/sandbox/sdk/python"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/sandbox/sdk
  - /docs/sandbox
related:
  - /docs/sandbox/sdk/javascript
  - /docs/sandbox/concepts/credentials
  - /docs/sandbox/concepts/drives
  - /docs/sandbox/concepts/regions
  - /docs/sandbox/examples/expose-a-port
summary: Reference for the Vercel Sandbox Python SDK, including sandbox lifecycle, commands, files, drives, snapshots, persistence, and network policies.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/sdk/python.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "4a245c63f63b93baec47a8aca22f192c0cecab7c09fd0952c4330ac7ea0cb23b"
---

# Python SDK Reference

Use the Vercel Sandbox Python SDK to create and manage isolated Linux microVMs, run commands, work with files and drives, and preserve environments between sessions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Sandbox vs Upstash Box](https://vercel.com/kb/guide/vercel-sandbox-vs-upstash-box) — Compare Vercel Sandbox and Upstash Box as AI agent sandboxes, including isolation, persistence, network controls, SDKs,
- [Vercel Sandbox](https://eve.dev/docs/sandbox/vercel) — Create persistent sandboxes on Vercel, from a prepared snapshot when the environment has build-time setup.
- [Persistence](https://vercel.com/docs/sandbox/concepts/persistent-sandboxes) — Sandboxes automatically save their filesystem state when stopped and restore it when resumed. No manual snapshot managem
- [Snapshots](https://vercel.com/docs/sandbox/concepts/snapshots) — Save and restore sandbox state with snapshots for faster startups and environment sharing.
- [Resume a long-lived sandbox](https://vercel.com/docs/sandbox/examples/resume-a-long-lived-sandbox) — Stop a persistent Vercel Sandbox and resume it later by name, with its filesystem restored automatically.
- [Sandbox CLI Reference](https://vercel.com/docs/sandbox/sdk/cli) — Use the Sandbox CLI to run coding agents, manage sandboxes, execute commands, and copy files from your terminal.
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat

Full cross-link map for this page: [/docs/sandbox/sdk/python.graph.md](/docs/sandbox/sdk/python.graph.md)
<!-- /docsgraph:related -->

For JavaScript and TypeScript, see the [JS SDK Reference](/docs/sandbox/sdk/javascript).

## Install the SDK

Install the `vercel-sandbox` package. It requires Python 3.11 or newer:

```bash filename="Terminal"
uv add vercel-sandbox
```

The `vercel` package also installs `vercel-sandbox`, so both packages provide the same `vercel.sandbox` module.

The examples on this page use the asynchronous API and run with `asyncio`. Examples that work with an existing sandbox or drive retrieve it by name first. You can import the API as a module:

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
        result = await box.run_command(
            "python",
            ["-c", "print('Hello from Vercel Sandbox!')"],
            capture_output=True,
            check=True,
        )
        print(result.stdout.decode())


asyncio.run(main())
```

`create_sandbox()` returns a single-use operation that you can either await or use as an async context manager:

- `async with sandbox.create_sandbox() as box` stops and destroys the sandbox on exit, including snapshots no other sandbox uses.
- `box = await sandbox.create_sandbox()` leaves lifecycle management to you. Call `stop()` to end the current session or `destroy()` to delete the sandbox.
- Pass `destroy=False` to stop, but not destroy, a context-managed sandbox on exit.

> **💡 Note:** Don't await or enter the same creation operation more than once.

The function accepts these keyword arguments:

| Parameter              | Type                                                                | Description                                                                              |
| ---------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `name`                 | `str \| None`                                                       | Stable sandbox name. Vercel generates one when omitted.                                  |
| `image`                | `str \| None`                                                       | Vercel Container Registry image reference.                                               |
| `source`               | `GitSource \| TarballSource \| SnapshotSource \| None`              | Initial filesystem source.                                                               |
| `ports`                | `list[int] \| None`                                                 | Ports to expose through the sandbox routes.                                              |
| `execution_time_limit` | `int \| float \| timedelta \| None`                                 | Maximum runtime for the current session. Numbers represent seconds.                      |
| `resources`            | `SandboxResources \| None`                                          | Requested virtual CPUs and memory (2048 MB per vCPU).                                    |
| `persistent`           | `bool \| None`                                                      | Whether Vercel snapshots the filesystem when the session stops.                          |
| `network_policy`       | `NetworkPolicy \| None`                                             | Outbound network policy.                                                                 |
| `network_id`           | `str \| None`                                                       | Secure Compute network ID to attach to the sandbox.                                      |
| `env`                  | `Mapping[str, str] \| None`                                         | Environment variables available to commands in the sandbox.                              |
| `tags`                 | `Mapping[str, str] \| None`                                         | Metadata used to organize and query sandboxes.                                           |
| `mounts`               | `Mapping[str \| PurePosixPath, str \| Drive \| DriveMount] \| None` | Drives keyed by absolute mount path. Drives use read-write mode by default.              |
| `snapshot_expiration`  | `int \| float \| timedelta \| SnapshotExpiration \| None`           | Default snapshot lifetime. Numbers represent seconds. Zero disables expiration.          |
| `snapshot_retention`   | `SnapshotRetention \| None`                                         | Automatic snapshot retention policy.                                                     |
| `region`               | `str \| CurrentRegion \| None`                                      | Region for the sandbox. Pass `CURRENT_REGION` to use the calling Vercel Function's region. See [Region defaults](#region-defaults). |
| `failover_regions`     | `Iterable[str] \| None`                                             | Regions to try if the preferred region lacks capacity.                                   |
| `credentials`          | `SandboxManagedCredentials \| None`                                 | Vercel managed [credentials](/docs/sandbox/concepts/credentials) the sandbox can use, such as `SandboxManagedCredentials(npm=True)`. |
| `destroy`              | `bool`                                                              | Whether context-manager exit destroys the sandbox after stopping it. Defaults to `True`. |

When you omit `image`, the Sandbox API uses `vercel/sandbox/universal:latest`. You can pass a bare repository, tag, digest, or fully qualified Vercel Container Registry reference. The `box.image` property contains the resolved image reference.

The SDK selects the owning project from its resolved credentials. To use another project, configure `SandboxServiceOptions` with credentials for that project.

Drive mount paths must be absolute, and the sandbox's main region must match each mounted drive's region. See [Drives](/docs/sandbox/concepts/drives) and [Regions](/docs/sandbox/concepts/regions).

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
        await box.fs.write_text(
            "pyproject.toml",
            '[project]\nname = "app"\nversion = "0.1.0"\nrequires-python = ">=3.11"\ndependencies = ["httpx"]\n',
        )
        await box.run_command("uv", ["sync"], check=True)
    finally:
        await box.stop()


asyncio.run(main())
```

### `fork_sandbox()`

Create a sandbox from an existing sandbox:

```python filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import SandboxResources


async def main() -> None:
    async with sandbox.fork_sandbox(
        source_sandbox="production-agent",
        name="debug-agent",
        resources=SandboxResources(vcpus=4, memory=8192),
        tags={"purpose": "debug"},
    ) as forked:
        result = await forked.run_command(
            "python",
            ["script.py"],
            capture_output=True,
            check=True,
        )
        print(result.stdout.decode())


asyncio.run(main())
```

The fork starts from the source sandbox's current saved snapshot, without capturing unsaved changes from a running session. If the source has no current snapshot, the fork starts from its base environment and copied configuration.

The fork inherits the source's configuration and Secure Compute network (`network_id`), except for drive mounts. Values passed to `fork_sandbox()` replace the corresponding inherited values. Supported overrides include `image`, `network_id`, `region`, and `failover_regions`. An explicit `failover_regions` iterable replaces the inherited list, and `[]` clears it. Pass `mounts` to attach drives to the fork.

Omitting `env` or passing `env=None` inherits the source environment. An explicit mapping replaces the entire inherited environment without merging keys, and `env={}` clears it. An explicit `tags` mapping also replaces all inherited tags:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    async with sandbox.fork_sandbox(source_sandbox="production-agent") as inherited:
        print(inherited.name)

    async with sandbox.fork_sandbox(
        source_sandbox="production-agent",
        env={"MODE": "test"},
    ) as replaced:
        print(replaced.name)

    async with sandbox.fork_sandbox(
        source_sandbox="production-agent",
        env={},
    ) as cleared:
        print(cleared.name)


asyncio.run(main())
```

`inherited` keeps the source's environment, `replaced` runs with only `MODE=test`, and `cleared` runs without any of the source's variables.

The fork inherits the source's region unless the call or [`SandboxServiceOptions`](#region-defaults) supplies one. If the source has a snapshot, it must be available in the target region. See [Regions and snapshots](/docs/sandbox/concepts/regions#regions-and-snapshots).

Like `create_sandbox()`, the returned operation is single-use, awaitable, and an async context manager. Context-manager exit stops and destroys the fork by default.

## Retrieve and resume sandboxes

### `get_sandbox()`

Fetch a sandbox by name without starting a new runtime session:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")
    print(box.status)
    print(box.current_snapshot_id)


asyncio.run(main())
```

`get_sandbox()` accepts `name` and optional `include_system_routes`. The lookup is passive and doesn't start a new runtime session. The SDK uses the project from its resolved credentials.

Command and filesystem operations on the returned handle automatically resume a stopped persistent sandbox. The same `box` handle adopts the replacement session before retrying the operation:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")

    # Resumes the sandbox if it is stopped, then reads the restored filesystem.
    content = await box.fs.read_text("state.json")
    print(content)


asyncio.run(main())
```

This behavior applies to `run_command()`, `create_command()`, command queries, `open_interactive()`, methods on `box.fs`, `extend_execution_time_limit()`, `update_network_policy()`, and `snapshot()`. Lifecycle and sandbox configuration operations, including `stop()`, `destroy()`, and `update()`, don't auto-resume.

### `get_or_create_sandbox()`

Retrieve a sandbox by name or create it when it doesn't exist:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box, created = await sandbox.get_or_create_sandbox(
        name="my-development-environment",
        persistent=True,
    )

    if created:
        await box.fs.write_text(
            "pyproject.toml",
            '[project]\nname = "app"\nversion = "0.1.0"\nrequires-python = ">=3.11"\ndependencies = ["httpx"]\n',
        )
        await box.run_command("uv", ["sync"], check=True)


asyncio.run(main())
```

The function resumes an existing sandbox by default. Pass `resume=False` for a passive lookup. If the sandbox's latest snapshot no longer exists, the SDK deletes the stale sandbox and creates a replacement with the same name. The `created` value is `True` when the SDK creates or replaces the sandbox.

`get_or_create_sandbox()` also accepts the [`create_sandbox()` parameters](#create_sandbox), except `destroy`. The SDK only uses them when it creates or replaces the sandbox. They don't change an existing sandbox's configuration.

### `resume_sandbox()`

Start a new runtime session from a stopped persistent sandbox:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    async with sandbox.resume_sandbox(
        name="my-development-environment"
    ) as box:
        content = await box.fs.read_text("state.json")
        print(content)


asyncio.run(main())
```

`resume_sandbox()` returns a single-use operation. You can await it to manage the lifecycle yourself or use it as an async context manager. Context-manager exit stops the resumed session but doesn't destroy the sandbox.

Use `resume_sandbox()` when the runtime session must start before another operation. For lazy resume, use `get_sandbox()` and call a command or filesystem method on the returned handle.

### Query sandboxes

`query_sandboxes()` returns an async iterator and follows pagination cursors automatically:

```python filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import SandboxQueryByName, TagFilter


async def main() -> None:
    query = SandboxQueryByName(
        name_prefix="user-123-",
        sort_order="desc",
        tag=TagFilter(key="environment", value="development"),
    )

    async for box in sandbox.query_sandboxes(query=query, page_size=50):
        print(box.name, box.status)


asyncio.run(main())
```

Use one of these query models:

| Type                              | Fields                                               |
| --------------------------------- | ---------------------------------------------------- |
| `SandboxQueryByCreatedAt`         | `sort_order`, optional `tag`                         |
| `SandboxQueryByName`              | `sort_order`, optional `name_prefix`, optional `tag` |
| `SandboxQueryByStatusUpdatedAt`   | `sort_order`                                         |
| `SandboxQueryByCurrentSnapshotId` | `sort_order`                                         |
| `TagFilter`                       | Exact `key` and `value` match                        |

All query functions accept `page_size` and `cursor`. Queries use the project from the SDK's resolved credentials.

## Sandbox handles

A `Sandbox` handle describes the persistent sandbox and its current runtime session. A sandbox has at most one active session. When a stopped persistent sandbox resumes, the new session replaces the stopped session as the current one.

### Properties

| Property               | Type                              | Description                                                              |
| ---------------------- | --------------------------------- | ------------------------------------------------------------------------ |
| `name`                 | `str`                             | Stable sandbox identity.                                                 |
| `current_session_id`   | `str`                             | Identifier for the current runtime session.                              |
| `current_session`      | `SandboxRuntimeSession \| None`   | Current session handle when the API response includes it.                |
| `image`                | `str \| None`                     | Resolved image reference.                                                |
| `status`               | `SandboxStatus \| None`           | Current lifecycle state.                                                 |
| `persistent`           | `bool \| None`                    | Whether stop creates an automatic snapshot.                              |
| `current_snapshot_id`  | `str \| None`                     | Snapshot used for the next resume.                                       |
| `project_id`           | `str \| None`                     | Owning project.                                                          |
| `cwd`                  | `str \| None`                     | Default working directory.                                               |
| `region`               | `str \| None`                     | Configured main region. After failover, the current session can run in another region. |
| `failover_regions`      | `tuple[str, ...]`                 | Configured failover regions.                                             |
| `memory`               | `int \| None`                     | Memory in megabytes.                                                     |
| `vcpus`                | `int \| None`                     | Number of virtual CPUs.                                                  |
| `execution_time_limit` | `timedelta \| None`               | Current session execution limit.                                         |
| `network_policy`       | `NetworkPolicyReadback \| None`   | Cached saved-policy metadata. See [policy metadata](#inspect-policy-metadata). |
| `network_id`           | `str \| None`                     | Attached Secure Compute network ID.                                      |
| `snapshot_expiration`  | `timedelta \| None`               | Default snapshot expiration.                                             |
| `snapshot_retention`   | `SnapshotRetentionState \| None`  | Active retention policy.                                                 |
| `status_updated_at`    | `int \| None`                     | Unix timestamp for the latest status update.                             |
| `created_at`           | `int \| None`                     | Unix creation timestamp.                                                 |
| `updated_at`           | `int \| None`                     | Unix update timestamp.                                                   |
| `tags`                 | `dict[str, str] \| None`          | Copy of the sandbox tags.                                                |
| `routes`               | `tuple[SandboxRouteState, ...]`   | Exposed routes. Each route has `url`, `port`, `subdomain`, and `system`. |
| `mounts`               | `dict[str, SandboxMount] \| None` | Drives mounted by path. Each mount has `drive` and `mode`.               |
| `raw`                  | `dict \| None`                    | Copy of the raw API response data.                                       |
| `fs`                   | `SandboxFilesystem`               | Filesystem for the current session.                                      |

`SandboxStatus` can be `PENDING`, `RUNNING`, `STOPPING`, `STOPPED`, `FAILED`, `ABORTED`, or `SNAPSHOTTING`.

### `session()`

Use `session()` when you want to scope work to the sandbox's active runtime session and clean it up when the block exits:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")

    async with box.session() as runtime_session:
        result = await runtime_session.run_command(
            "python",
            ["script.py"],
            capture_output=True,
            check=True,
        )
        print(runtime_session.id, result.stdout.decode())


asyncio.run(main())
```

`session()` resumes the sandbox if needed and returns its current `SandboxRuntimeSession`. Operations through this handle stay attached to that session and don't trigger automatic resume.

Choose the lifecycle behavior that fits your application:

- `async with box.session() as runtime_session` attempts to stop the acquired session when the block exits. It doesn't destroy the parent sandbox.
- `runtime_session = await box.session()` doesn't perform automatic cleanup. Call `await runtime_session.stop()` when you're done.
- Use methods on `box` instead when you want a stopped sandbox to resume automatically.

A sandbox has only one active session at a time. On context exit, the SDK requests a stop for the session acquired on entry. If that session has already stopped and the sandbox has resumed, the request is a no-op and the new active session keeps running.

Each asynchronous `session()` operation is single-use. Don't await or enter the same operation more than once. Complete concurrent work before leaving the context when you need deterministic cleanup.

### Routes

Find the URL for an exposed port. For a complete example, see [Expose a port](/docs/sandbox/examples/expose-a-port).

```python filename="main.py"
import asyncio

from vercel import sandbox


def route_url(box: sandbox.Sandbox, port: int) -> str | None:
    for route in box.routes:
        if route.port == port:
            return route.url
    return None


async def main() -> None:
    box = await sandbox.create_sandbox(ports=[3000])
    print(route_url(box, 3000))


asyncio.run(main())
```

### `update()`

Update mutable sandbox configuration:

```python filename="main.py"
import asyncio
from datetime import timedelta

from vercel import sandbox
from vercel.sandbox import NetworkPolicy, SandboxResources, SnapshotRetention


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")

    await box.update(
        resources=SandboxResources(vcpus=2, memory=4096),
        execution_time_limit=timedelta(minutes=30),
        persistent=True,
        ports=[3000, 8000],
        network_policy=NetworkPolicy.deny_all(),
        tags={"environment": "production"},
        snapshot_retention=SnapshotRetention(count=2),
    )


asyncio.run(main())
```

You can update `ports`, `execution_time_limit`, `resources`, `persistent`, `network_policy`, `network_id`, `env`, `tags`, `mounts`, `snapshot_expiration`, `snapshot_retention`, `current_snapshot_id`, `region`, and `failover_regions`. Only non-`None` values are sent, except that `snapshot_retention=None` removes the retention policy and `network_id=None` detaches the [Secure Compute](/docs/sandbox/concepts/secure-compute) network. A larger `execution_time_limit` also extends the running session. Changes to `network_id` apply from the sandbox's next session. For saved and live `network_policy` updates, see [updating a running session](#update-a-running-session). `ports` replaces the complete exposed port list. `mounts` replaces all drive mounts for the next session, and an empty mapping removes all mounts. Pass `failover_regions=[]` to clear failover regions. Set `current_snapshot_id` to choose the snapshot restored on the next resume. The method refreshes and returns the same `Sandbox` handle.

`update(region=...)` accepts a region string or `CURRENT_REGION`. It doesn't use `SandboxServiceOptions.region`. The configured region stays unchanged when you omit `region`, pass `None`, or pass `CURRENT_REGION` while `VERCEL_REGION` is unset.

### `extend_execution_time_limit()`

Increase the current session's execution limit:

```python filename="main.py"
import asyncio
from datetime import timedelta

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")

    session = await box.extend_execution_time_limit(timedelta(minutes=15))
    print(session.execution_time_limit)


asyncio.run(main())
```

The duration adds to the current limit. The service rejects durations shorter than one second.

### `stop()` and `destroy()`

Stop the current runtime session without deleting a persistent sandbox:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")
    await box.stop()


asyncio.run(main())
```

Delete the sandbox and its sessions. By default, snapshots remain until they expire:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")
    await box.destroy()


asyncio.run(main())
```

To asynchronously delete snapshots that no other sandbox uses, pass `delete_orphan_snapshots=True` to `destroy()`. Snapshots referenced by another sandbox remain available. Context-managed sandbox creation requests this orphan cleanup on exit by default, unlike an explicit `destroy()` call.

### `list_sessions()` and `list_snapshots()`

Fetch one page of resources that belong to a sandbox:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")

    sessions = await box.list_sessions(page_size=20, sort_order="desc")
    snapshots = await box.list_snapshots(page_size=20, sort_order="desc")


asyncio.run(main())
```

Use the module-level query functions when you want automatic pagination.

## Manage drives

[Drives](/docs/sandbox/concepts/drives) provide persistent storage that you can mount into sandboxes. A drive belongs to one project and region, and its files remain available after a sandbox stops.

See the [Drives Python SDK reference](/docs/drives/python-sdk-reference) for the standalone SDK.

### Retrieve a drive

Use `get_drive()` to look up an existing drive by name or ID without creating it. It raises `SandboxApiError` with status code 404 when the drive doesn't exist:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    drive = await sandbox.get_drive(name_or_id="workspace-cache")
    print(drive.name, drive.region)


asyncio.run(main())
```

### Create or retrieve a drive

Use `get_or_create_drive()` to retrieve a named drive or create it when it doesn't exist. It returns a tuple containing the drive and `created`, a boolean indicating whether the drive was created by this call:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    drive, created = await sandbox.get_or_create_drive(
        name="workspace-cache",
        max_size_bytes=200 * 1024 * 1024 * 1024,
        region="sfo1",
    )


asyncio.run(main())
```

The function accepts these keyword arguments:

| Parameter        | Type          | Description                                                          |
| ---------------- | ------------- | -------------------------------------------------------------------- |
| `name`           | `str`         | Project-local drive name.                                            |
| `max_size_bytes` | `int \| None` | Maximum size for a new drive. The project default applies if omitted. |
| `region`         | `str \| CurrentRegion \| None` | Region for a new drive. Pass `CURRENT_REGION` to use the calling Vercel Function's region. See [Region defaults](#region-defaults). |

When neither the call nor `SandboxServiceOptions` supplies a region, the Sandbox API creates the drive in `iad1`. The project's default sandbox region doesn't apply to drives. Requesting an existing drive with a different region or maximum size fails with a `conflict` error, including when the region comes from `SandboxServiceOptions`.

### Mount a drive

Pass a mapping of absolute mount paths to drive handles or names. Drives mount in read-write mode by default:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    drive, created = await sandbox.get_or_create_drive(name="workspace-cache")

    box = await sandbox.create_sandbox(
        name="my-sandbox",
        mounts={"/data": drive},
    )


asyncio.run(main())
```

Call `drive.snapshot()` to create a read-only, point-in-time mount that multiple sandboxes can use concurrently:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    drive = await sandbox.get_drive(name_or_id="workspace-cache")

    reader = await sandbox.create_sandbox(
        name="reader",
        mounts={"/data": drive.snapshot()},
    )


asyncio.run(main())
```

You can also construct a mount explicitly with `DriveMount(drive, mode="read-write")` or `DriveMount(drive, mode="snapshot")`.

`create_sandbox()`, `fork_sandbox()`, and `get_or_create_sandbox()` accept `mounts`. A fork doesn't inherit its source sandbox's mounts. Pass `mounts` to attach drives to the fork.

Mount paths must be absolute and can't overlap. You can mount each drive once and mount up to four drives per sandbox. All mounted drives must be in the sandbox's main region.

### Fork a drive

Use `fork_drive()` to create a new drive from an existing drive's committed data. `source` is the source drive's name. You can also call `drive.fork()` on a drive handle:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    forked = await sandbox.fork_drive(
        source="workspace-cache",
        name="workspace-cache-fork",
    )

    source = await sandbox.get_drive(name_or_id="workspace-cache")
    another_fork = await source.fork(name="workspace-cache-another-fork")

    print(forked.parent_drive_id == source.id)  # True


asyncio.run(main())
```

Both calls return a new `Drive` in the same project with the source's region and maximum size. The fork is an independent copy and doesn't receive later writes to the source. Mount it like any other drive.

The source drive must have been mounted read-write and written to at least once. The SDK raises `SandboxApiError` with status code 404 for a missing source and 409 for a destination name that already exists or a source that has never been written to.

### List drives

`query_drives()` returns an async iterator and follows pagination cursors automatically:

```python filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import DriveQueryByName


async def main() -> None:
    query = DriveQueryByName(
        name_prefix="workspace",
        sort_order="asc",
    )

    async for drive in sandbox.query_drives(query=query, page_size=10):
        print(drive.name, drive.current_sandbox_name or "detached")


asyncio.run(main())
```

Use one of these query models:

| Type                    | Fields                               |
| ----------------------- | ------------------------------------ |
| `DriveQueryByCreatedAt` | `sort_order`                         |
| `DriveQueryByUpdatedAt` | `sort_order`                         |
| `DriveQueryByName`      | `sort_order`, optional `name_prefix` |

`query_drives()` also accepts `page_size` and `cursor`. It uses the project from the SDK's resolved credentials.

### Drive properties and deletion

| Property                   | Type          | Description                             |
| -------------------------- | ------------- | --------------------------------------- |
| `id`                       | `str`         | Drive identifier.                       |
| `parent_drive_id`          | `str \| None` | Drive this drive was forked from, when present. |
| `root_drive_id`            | `str \| None` | Original drive at the root of a chain of forks, when present. |
| `name`                     | `str`         | Project-local drive name.               |
| `project_id`               | `str`         | Owning project.                         |
| `region`                   | `str`         | Storage region.                         |
| `max_size_bytes`           | `int`         | Maximum drive size in bytes.            |
| `current_session_id`       | `str \| None` | Attached runtime session, when present. |
| `current_sandbox_name`     | `str \| None` | Attached sandbox, when present.         |
| `created_at`, `updated_at` | `int`         | Unix timestamps.                        |

Delete a detached drive and all its data:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    drive = await sandbox.get_drive(name_or_id="workspace-cache")
    await drive.delete()


asyncio.run(main())
```

Use `await sandbox.delete_drive(name="workspace-cache")` when you don't have a drive handle. You can't delete a drive while it is attached to a running sandbox.

## Run commands

### `run_command()`

Run a command and wait for it to exit:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")

    result = await box.run_command(
        "python",
        ["-m", "pytest"],
        env={"PYTHONUNBUFFERED": "1"},
        kill_after=120,
        capture_output=True,
        check=True,
    )

    print(result.returncode)
    print(result.stdout.decode())
    print(result.stderr.decode())


asyncio.run(main())
```

`run_command()` replaces `run_process()`, which still works as a deprecated alias and emits a `DeprecationWarning`.

Command input and output use bytes. By default, `run_command()` streams remote stdout and stderr to the local `sys.stdout.buffer` and `sys.stderr.buffer`. Set `capture_output=True` to store both streams as `bytes` on the returned `CompletedCommand`, and call `.decode()` when you need text.

To send output somewhere else, pass a writable binary stream as `stdout` or `stderr`, such as `io.BytesIO` or a file opened with `"wb"`. A text stream raises `TypeError`.

| Parameter        | Type                                              | Default  | Description                                                                    |
| ---------------- | ------------------------------------------------- | -------- | ------------------------------------------------------------------------------ |
| `command`        | `str`                                             | Required | Executable or command name.                                                    |
| `args`           | `Sequence[str] \| None`                           | `None`   | Arguments excluding the executable.                                            |
| `cwd`            | `str \| None`                                     | `None`   | Working directory.                                                             |
| `env`            | `Mapping[str, str] \| None`                       | `None`   | Environment variables added to the command.                                    |
| `sudo`           | `bool`                                            | `False`  | Run with elevated privileges.                                                  |
| `kill_after`     | `float \| timedelta \| None`                      | `None`   | Server-side time before `SIGKILL`. Numbers represent seconds.                  |
| `check`          | `bool`                                            | `False`  | Raise `subprocess.CalledProcessError` for a nonzero exit code.                 |
| `stdout`         | `BinaryIO \| int \| None`                         | `None`   | Writable binary stream, `subprocess.PIPE`, or `subprocess.DEVNULL`. `None` inherits the local stdout. |
| `stderr`         | `BinaryIO \| int \| None`                         | `None`   | Writable binary stream, `subprocess.PIPE`, `subprocess.DEVNULL`, or `subprocess.STDOUT` to merge stderr into stdout. `None` inherits the local stderr. |
| `capture_output` | `bool`                                            | `False`  | Capture stdout and stderr on the result. You can't combine it with `stdout` or `stderr`. |
| `input`          | `bytes \| bytearray \| memoryview \| None`        | `None`   | Bytes written to stdin, which is then closed. Encode text before you pass it.  |
| `on_start`       | `Callable[[Command], None] \| None`               | `None`   | Synchronous callback that receives a `Command` handle when the command starts. |

`CompletedCommand` includes `id`, `name`, `args`, `cwd`, `session_id`, `started_at`, `returncode`, `stdout`, and `stderr`. `stdout` and `stderr` are `bytes`, or `None` for a stream that wasn't captured. Its `check_returncode()` method raises `subprocess.CalledProcessError` after the command completes unsuccessfully.

Pass `input` to give the command data on stdin. The SDK writes the bytes and then closes stdin, so commands that read until end of file can finish:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")

    result = await box.run_command("sort", input=b"b\na\n", capture_output=True)
    print(result.stdout.decode())


asyncio.run(main())
```

Without `input`, the command reads an empty stdin. A command that exits or stops reading before it takes all the input isn't an error. If the write fails, the SDK kills the command and raises `SandboxStdinError`.

Use `on_start` to react as soon as the command starts, before the SDK delivers any output:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")

    result = await box.run_command(
        "python",
        ["train.py"],
        on_start=lambda command: print(command.id),
    )


asyncio.run(main())
```

Keep these rules in mind when you use `on_start`:

- The callback runs at most once. A command that has started never runs again, so a stopped sandbox only resumes and retries a command that never started.
- The callback must be synchronous and return promptly. It runs on the event loop, and the SDK holds the command's output until it returns. The SDK rejects an async callback with `TypeError`.
- The `Command` handle it receives has no `stdout` or `stderr` readers. Output still goes to the `stdout` and `stderr` destinations.
- If the callback raises, `run_command()` raises the same exception, skips `check`, and leaves the command running in the sandbox.

### `create_command()`

Start a command and return before it exits:

```python filename="main.py"
import asyncio

from anyio.streams.text import TextReceiveStream
from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")

    process = await box.create_command(
        "sh",
        ["-lc", "for i in 1 2 3; do echo $i; sleep 1; done"],
    )

    assert process.stdout is not None
    async for text in TextReceiveStream(process.stdout):
        print(text, end="")

    returncode = await process.wait()


asyncio.run(main())
```

`process.stdout` and `process.stderr` yield bytes. `TextReceiveStream` decodes each chunk as it arrives.

`create_command()` replaces `create_process()`, which still works as a deprecated alias and emits a `DeprecationWarning`.

`create_command()` accepts `command`, `args`, `cwd`, `env`, `sudo`, and `kill_after`. Configure its streams with these sentinels from `subprocess`:

| Parameter | Accepted values                                                                          | Default |
| --------- | ---------------------------------------------------------------------------------------- | ------- |
| `stdin`   | `PIPE` attaches a writer. `None` or `DEVNULL` gives the command an empty stdin.          | `None`  |
| `stdout`  | `PIPE` exposes a reader. `DEVNULL` drops the output.                                     | `PIPE`  |
| `stderr`  | `PIPE`, `DEVNULL`, or `STDOUT` to merge stderr into the stdout reader in arrival order.  | `PIPE`  |

This example writes to stdin and reads the output:

```python filename="main.py"
import asyncio
import subprocess

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")

    process = await box.create_command("cat", stdin=subprocess.PIPE)

    stdout, stderr = await process.communicate(b"hello from stdin\n")
    print(stdout.decode())


asyncio.run(main())
```

To write incrementally, call `await process.stdin.send(...)` with bytes, then `await process.stdin.aclose()` to send end of file.

### Command properties and methods

| Member             | Description                                                                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | Command identifier.                                                                                                                                   |
| `name`             | Executable name.                                                                                                                                      |
| `args`             | Command arguments.                                                                                                                                    |
| `cwd`              | Working directory.                                                                                                                                    |
| `session_id`       | Owning runtime session.                                                                                                                               |
| `started_at`       | Unix start timestamp.                                                                                                                                 |
| `returncode`       | Exit code, or `None` while running.                                                                                                                   |
| `status`           | `CommandStatus.RUNNING` or `CommandStatus.EXITED`.                                                                                                    |
| `stdout`, `stderr` | Single-use `ByteReader` streams, or `None` when dropped or merged.                                                                                    |
| `stdin`            | A `CommandStdin` writer when created with `stdin=subprocess.PIPE`, otherwise `None`.                                                                  |
| `refresh()`        | Refresh command state.                                                                                                                                |
| `wait()`           | Wait for exit and return the exit code.                                                                                                               |
| `communicate()`    | Write optional `input` bytes to stdin, read both streams, and wait. Returns a `(stdout, stderr)` tuple of `bytes`, with `None` for a stream that has no reader. Passing `input` without a stdin writer raises `ValueError`. |
| `send_signal()`    | Send an integer, `CommandSignal` member, or name such as `"SIGTERM"`. Passing `signal.Signals` is deprecated.                                         |
| `terminate()`      | Send `SIGTERM`.                                                                                                                                       |
| `kill()`           | Send `SIGKILL`.                                                                                                                                       |

A `ByteReader` implements `anyio.abc.ByteReceiveStream`. `receive()` returns the bytes that are available without waiting for a newline, and async iteration yields those byte chunks. `read()` and `readline()` also return bytes, and their sizes count bytes. Wrap a reader in `anyio.streams.text.TextReceiveStream` to decode it as text. Each stream moves forward and can't rewind. Call `aclose()` to stop reading early.

A `CommandStdin` writer is an `anyio.abc.ByteSendStream`. It supports `send()` for bytes and `aclose()` to close stdin, and you can wrap it in `anyio.streams.text.TextSendStream` to send text. Each `send()` returns once the command accepts the bytes. After the command exits or stops reading, `send()` raises `anyio.BrokenResourceError`. If a request fails, it raises `SandboxStdinError`. Part of the data may have reached the command by then, so later sends raise `anyio.BrokenResourceError`, but you can still close the stream.

Get an existing command or list commands in the current session:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")

    process = await box.get_command("cmd_123", wait=True)
    processes = await box.query_commands()


asyncio.run(main())
```

`get_process()` and `query_processes()` are deprecated aliases for `get_command()` and `query_commands()`. A command handle returned by `get_command()` or `query_commands()` always has a `stdin` writer. If the command was started without stdin, the first `send()` raises `SandboxStdinError`.

The earlier `Process`, `CompletedProcess`, `ProcessStatus`, `ProcessSignal`, and `ProcessStdin` names remain as aliases of the matching command types.

`communicate()` always closes stdin when you pass `input`, even empty bytes. With no `input`, it closes stdin only if the handle owns it: the command was created with `stdin=subprocess.PIPE`, or the handle has written to it. A handle from `get_command()` or `query_commands()` leaves stdin open, so a command that reads until end of file, such as `cat`, keeps running and `communicate()` waits for it. Call `communicate(b"")` or `await process.stdin.aclose()` to send end of file.

## Run commands as Linux users

Give each agent or workload its own Linux account inside one sandbox. `create_user()` creates an account and returns a `SandboxUser` handle. `as_user()` selects an existing account without creating it and without making a request. Both methods are available on a sandbox and on a runtime session:

```python filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import SandboxUserAlreadyExistsError


async def main() -> None:
    async with sandbox.create_sandbox() as box:
        try:
            alice = await box.create_user("alice")
        except SandboxUserAlreadyExistsError as error:
            alice = box.as_user(error.username)

        result = await alice.run_command("whoami", capture_output=True, check=True)
        print(result.stdout.decode())  # alice

        await alice.fs.write_text("notes.txt", "alice only", mode=0o600)
        print(await alice.fs.read_text("notes.txt"))  # alice only


asyncio.run(main())
```

Usernames must match `[a-z_][a-z0-9_-]*` and contain at most 32 characters. Both methods raise `ValueError` for an invalid name before sending a request.

`create_user()` gives the account `/bin/bash` as its shell and a home directory at `/home/<username>` with mode `0770`. It raises `SandboxUserAlreadyExistsError` when the account already exists and `SandboxError` for other provisioning failures. `as_user()` resolves the account's home directory on first use, so a missing account fails on the first operation.

A user handle has these members:

| Member             | Description                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `username`         | Linux account name.                                                                                                       |
| `home_dir`         | Home directory. `None` for an account selected with `as_user()` until its first operation, except `root`, which is `/root`. |
| `run_command()`    | Same options as [`run_command()`](#run_command) on a sandbox, except `on_start`.                                          |
| `create_command()` | Same options as [`create_command()`](#create_command) on a sandbox. Returns a `Command`.                                  |
| `fs`               | Filesystem scoped to the user. Relative paths resolve from the user's home directory.                                     |

Commands run as the user with `HOME`, `USER`, and `LOGNAME` set, and they start in the user's home directory. A relative `cwd` resolves from that home directory. Pass `sudo=True` to run one command as root, or use `box.as_user("root")` for a root handle.

Commands, reads, directory listings, renames, and removals run as the user and follow Linux permissions, so one user can't read another user's private files. Writes and `mkdir()` work differently: the SDK uploads the data with the sandbox's default account and then gives the file to the user. They can reach paths that the user's own commands can't, so don't expose them to untrusted callers as a permission boundary.

A user handle from a sandbox follows it through [automatic resume](#get_sandbox). A handle from a runtime session stays on that session. User handles don't expose lifecycle methods, command lookups, or group management. Commands started through a user handle reject the `STOP`, `TSTP`, `TTIN`, and `TTOU` signals with `NotImplementedError` and keep running.

Vercel's managed images include everything user handles need. A custom image needs Bash, `getent`, `useradd`, GNU `find`, and coreutils, plus `setpriv`, `env`, and `sleep` in `/usr/bin`.

To write code that accepts a sandbox, a runtime session, or a user handle, annotate it with the `SandboxExecution` protocol:

```python filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import SandboxExecution


async def run_agent(executor: SandboxExecution) -> str:
    await executor.fs.write_text("input.txt", "hello")
    result = await executor.run_command(
        "cat", ["input.txt"], capture_output=True, check=True
    )
    return result.stdout.decode()


async def main() -> None:
    async with sandbox.create_sandbox() as box:
        alice = await box.create_user("alice")

        print(await run_agent(box))
        print(await run_agent(alice))


asyncio.run(main())
```

See [Run isolated AI agents in one sandbox](/docs/sandbox/concepts/multi-agent) for a walkthrough.

## Open interactive terminals

`open_interactive()` starts a command attached to a pseudoterminal (PTY), such as a shell or a full-screen program. It's available on a sandbox and on a runtime session. Use the returned operation with `async with`. You can't await it:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    async with sandbox.create_sandbox() as box:
        async with box.open_interactive("/bin/bash", cols=100, rows=30) as terminal:
            await terminal.stream.send(b"echo hello; exit\n")
            async for chunk in terminal.stream:
                print(chunk.decode(errors="replace"), end="")
            print(await terminal.wait())  # 0


asyncio.run(main())
```

The stream carries raw terminal bytes, so the output includes the shell prompt, the echoed input, and escape sequences. It ends when the command exits.

| Parameter      | Default       | Description                                                                 |
| -------------- | ------------- | --------------------------------------------------------------------------- |
| `command`      | `"/bin/bash"` | Executable to start.                                                        |
| `args`         | `None`        | Arguments excluding the executable.                                         |
| `cwd`          | `None`        | Working directory.                                                          |
| `env`          | `None`        | Environment variables added to the command. `TERM` defaults to `xterm-256color`. |
| `sudo`         | `False`       | Run with elevated privileges.                                               |
| `cols`, `rows` | `80`, `24`    | Terminal size in characters.                                                |

The context yields an `InteractiveSession`:

| Member               | Description                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| `stream`             | `InteractiveStream`, an `anyio.abc.ByteStream`. Use `send()` to write, and `receive()` or async iteration to read. |
| `resize(cols, rows)` | Change the terminal size.                                                                                    |
| `wait()`             | Wait for the command to exit and return its exit code. Returns `None` if you closed the session first.       |
| `returncode`         | Exit code, or `None` while the command runs.                                                                 |
| `aclose()`           | Close the connection. Leaving the context also closes it.                                                    |

A terminal can't half-close, so `stream.send_eof()` raises `NotImplementedError`. You can't reattach to a session after it closes.

If the SDK can't open the connection, it raises `SandboxInteractiveError`. If the connection ends before the command reports its exit code, reading the stream and `wait()` both raise `anyio.BrokenResourceError`.

With the [synchronous API](#synchronous-api), `stream` is a raw binary stream with `read()`, `readinto()`, and `write()`:

```python filename="main.py"
from vercel.sandbox import sync as sandbox

with sandbox.create_sandbox() as box:
    with box.open_interactive("/bin/bash") as terminal:
        terminal.stream.write(b"echo hello; exit\n")
        print(terminal.stream.read().decode(errors="replace"))
        print(terminal.wait(timeout=30))  # 0
```

`wait()` accepts an optional `timeout` in seconds and raises `TimeoutError` when it expires. Read the stream to its end before you call `wait()`, because the SDK only buffers a limited amount of unread output. A dropped connection raises `ConnectionError`.

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
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")

    await box.fs.mkdir("workspace")
    await box.fs.write_text("workspace/input.txt", "hello\n")
    await box.fs.write_bytes("workspace/data.bin", b"\x00\x01")

    text = await box.fs.read_text("workspace/input.txt")
    data = await box.fs.read_bytes("workspace/data.bin")


asyncio.run(main())
```

### Batch file writes

Upload related files in one operation:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")

    async with box.fs.batch(cwd="workspace") as batch:
        batch.write_text("main.py", "print('hello')\n")
        batch.write_bytes("data.bin", b"\x00\x01", mode=0o600)


asyncio.run(main())
```

`batch.write_text()` and `batch.write_bytes()` stage data locally. The context uploads all staged files when it exits successfully.

### Inspect and change paths

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")

    if await box.fs.exists("workspace/main.py"):
        entries = await box.fs.listdir("workspace")
        for entry in entries:
            print(entry.path, entry.kind)

    await box.fs.rename("workspace/main.py", "workspace/app.py")
    await box.fs.remove("workspace/data.bin", missing_ok=True)


asyncio.run(main())
```

`DirectoryEntry.kind` is `file`, `directory`, `symlink`, or `other`. Its `path` is relative to the listed directory.

### Stream large files

Use `open()` to avoid loading a complete file into memory:

```python filename="main.py"
import asyncio

import anyio
from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")

    local_path = anyio.Path("archive.tar")

    async with (
        await anyio.open_file(local_path, "rb") as source,
        box.fs.open("archive.tar", "wb", permissions=0o600) as target,
    ):
        while chunk := await source.read(64 * 1024):
            await target.write(chunk)


asyncio.run(main())
```

Streaming handles expose `name`, `mode`, and `closed`. They also provide `readable()`, `writable()`, and `seekable()` state methods. Sandbox files are sequential streams, so `seekable()` returns `False`.

Readers support `read()`, `readline()`, async iteration, and `aclose()`. Binary readers also support `readinto()`. Writers support `write()`, `writelines()`, `flush()`, and `aclose()`.

For binary uploads, pass `size` when you know the expected byte count. The SDK raises `SandboxUploadSizeMismatchError` if the stream produces a different number of bytes.

## Work with snapshots

### Create and restore a snapshot

Keep the producer sandbox until restoration completes. A default `create_sandbox()` context stops and destroys its sandbox on exit, and asynchronously deletes snapshots that no other sandbox uses. Snapshot expiration doesn't prevent this explicit deletion.

Await the producer to manage its lifetime yourself. The restored sandbox's context handles its cleanup, and the nested `finally` blocks attempt producer and snapshot cleanup even if setup, restoration, or another cleanup step raises:

```python filename="main.py"
import asyncio
from datetime import timedelta

from vercel import sandbox
from vercel.sandbox import SnapshotSource


async def main() -> None:
    producer = await sandbox.create_sandbox()
    snapshot = None
    try:
        await producer.fs.mkdir("state")
        await producer.fs.write_text("state/message.txt", "saved\n")
        snapshot = await producer.snapshot(expiration=timedelta(days=7))

        async with sandbox.create_sandbox(
            source=SnapshotSource(snapshot_id=snapshot.id),
        ) as restored:
            print(await restored.fs.read_text("state/message.txt"))
    finally:
        try:
            await producer.destroy()
        finally:
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
| `regions`                  | `tuple[str, ...]`                    | Regions where the snapshot is available. Contains `region` when the API doesn't return a list. |
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
import asyncio

from vercel import sandbox


async def main() -> None:
    snapshot = await sandbox.get_snapshot(snapshot_id="snap_123")

    async for item in sandbox.query_snapshots(
        name="my-development-environment",
        page_size=50,
        sort_order="desc",
    ):
        print(item.id, item.status)


asyncio.run(main())
```

`query_snapshots()` accepts optional `name`, `page_size`, `cursor`, and `sort_order`. It uses the project from the SDK's resolved credentials.

### Query runtime sessions

Inspect session history across sandboxes:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    async for runtime_session in sandbox.query_sessions(
        name="my-development-environment",
        sort_order="desc",
    ):
        print(runtime_session.id, runtime_session.status)


asyncio.run(main())
```

A `SandboxRuntimeSession` exposes `id`, `sandbox_name`, `project_id`, `status`, `cwd`, `region`, `memory`, `vcpus`, `execution_time_limit`, `network_policy`, `network_id`, `requested_at`, `started_at`, and `stopped_at`.

A runtime session also provides `fs`, command methods, `create_user()`, `as_user()`, `open_interactive()`, `refresh()`, `extend_execution_time_limit()`, `update_network_policy()`, `snapshot()`, and `stop()`. These methods operate on that session and don't trigger automatic resume after it stops.

`SnapshotRetentionState` describes the active retention policy through `count`, optional `expiration`, and `delete_evicted` properties.

## Configure sandbox sources

### `GitSource`

Clone a Git repository when the sandbox starts:

```python filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import GitSource


async def main() -> None:
    box = await sandbox.create_sandbox(
        source=GitSource(
            url="https://github.com/vercel/sandbox-example-next.git",
            revision="main",
            depth=1,
        )
    )


asyncio.run(main())
```

`GitSource` accepts `url`, optional `depth`, optional `revision`, and optional `username` and `password` for HTTP basic authentication.

### `TarballSource`

Initialize from a remotely accessible tarball:

```python filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import TarballSource


async def main() -> None:
    box = await sandbox.create_sandbox(
        source=TarballSource(url="https://example.com/source.tar.gz")
    )


asyncio.run(main())
```

### `SnapshotSource`

Restore a filesystem snapshot:

```python filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import SnapshotSource


async def main() -> None:
    box = await sandbox.create_sandbox(
        source=SnapshotSource(snapshot_id="snap_123")
    )


asyncio.run(main())
```

## Configure resources and retention

`SandboxResources` accepts optional `vcpus` and `memory` fields. Each vCPU includes 2048 MB of memory; pass both `vcpus` and `memory=vcpus * 2048` when updating resources with `update()`:

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

`count` must be between one and 10. `delete_evicted` controls whether Vercel deletes snapshots removed from the retention window.

## Configure network access

### Allow or deny all traffic

```python filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import NetworkPolicy


async def main() -> None:
    allowed = await sandbox.create_sandbox(
        network_policy=NetworkPolicy.allow_all()
    )

    denied = await sandbox.create_sandbox(
        network_policy=NetworkPolicy.deny_all()
    )


asyncio.run(main())
```

### Allow selected domains

```python filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import NetworkPolicy


async def main() -> None:
    policy = NetworkPolicy.custom(
        allow={
            "api.github.com": (),
            "pypi.org": (),
        }
    )

    box = await sandbox.create_sandbox(network_policy=policy)


asyncio.run(main())
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

Select requests for a rule by path, method, query string, or headers. A matcher selects requests for an action; the matcher alone does not allow or deny traffic:

```python filename="main.py"
from vercel.sandbox import (
    NetworkPolicyKeyValueMatcher,
    NetworkPolicyMatcher,
    NetworkPolicyRequestMatcher,
    NetworkPolicyRule,
    NetworkPolicyTransform,
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
    ),
    transform=[
        NetworkPolicyTransform(headers={"x-api-key": "your_api_key_here"})
    ],
)
```

`NetworkPolicyMatcher` provides `exact()`, `starts_with()`, and `regex()` constructors. All specified dimensions must match; any listed method can match. `NetworkPolicyRule` requires exactly one action: a nonempty `transform`, `forward_url`, or `response`. `NetworkPolicyTransform` accepts `headers`, a mapping of header names to values. `NetworkPolicySubnets` accepts optional `allow` and `deny` CIDR lists.

### Return a direct response

Use `NetworkPolicyResponse` to answer from the network proxy without contacting the destination. Rules run in declaration order, and the first matching rule handles the request. A rule without `match` matches all requests to the domain. If no rule matches, the request reaches the allowed domain unchanged.

This policy injects a credential for `POST` requests to `/v1/` paths and returns `403` for all other requests to the domain:

```python filename="policy.py"
from vercel.sandbox import (
    NetworkPolicy,
    NetworkPolicyMatcher,
    NetworkPolicyRequestMatcher,
    NetworkPolicyResponse,
    NetworkPolicyRule,
    NetworkPolicyTransform,
)

policy = NetworkPolicy.custom(
    allow={
        "api.example.com": [
            NetworkPolicyRule(
                match=NetworkPolicyRequestMatcher(
                    path=NetworkPolicyMatcher.starts_with("/v1/"),
                    method=["POST"],
                ),
                transform=[
                    NetworkPolicyTransform(
                        headers={"x-api-key": "your_api_key_here"}
                    )
                ],
            ),
            NetworkPolicyRule(response=NetworkPolicyResponse(status_code=403)),
        ]
    }
)
```

| `NetworkPolicyResponse` argument | Type | Required | Description |
| --- | --- | --- | --- |
| `status_code` | `int` | Yes | Integer from 200 through 599. |
| `headers` | `Mapping[str, str] \| None` | No | Response headers. Names must be unique, ignoring case. |
| `body` | `str \| None` | No | Response body. Requires `content_type`; omit for status codes 204, 205, and 304. |
| `content_type` | `str \| None` | When `body` is set | Nonempty content type of the response body, required even for an empty string body. |

The proxy manages `connection`, `content-length`, `keep-alive`, `proxy-connection`, `trailer`, `transfer-encoding`, and `upgrade`. The SDK or API rejects these response headers, regardless of capitalization. Python validates `connection`, `content-length`, and `transfer-encoding` locally with `ValueError`; the API rejects the other protected headers with HTTP 400.

### Inspect policy metadata

`box.network_policy` returns cached saved-policy metadata, and `runtime_session.network_policy` returns cached metadata for that session. Both properties return `NetworkPolicyReadback | None`. Reading these properties doesn't fetch fresh state.

Readback omits secret header values, matcher values, response headers and bodies, and the original ordering across action types. You cannot submit readback as a `NetworkPolicy`. Retain the authored policy separately for updates.

| Exported type | Fields |
| --- | --- |
| `NetworkPolicyReadback` | `mode`, `allowed_domains`, `subnets`, `injection_rules`, `forward_rules`, and `response_rules`. |
| `NetworkPolicyInjectionRuleSummary` | `domain`, `header_names`, and `match_dimensions`. Header names contain no secret values. |
| `NetworkPolicyForwardRuleSummary` | `domain`, `forward_url`, and `match_dimensions`. |
| `NetworkPolicyResponseRuleSummary` | `domain`, `status_code`, and `match_dimensions`. |

The domain and rule collections are tuples. `subnets` is `NetworkPolicySubnets | None`. `match_dimensions` contains dimension names (`"path"`, `"method"`, `"query"`, or `"headers"`), rather than authored matchers.

### Update a running session

Use `box.update(network_policy=...)` to replace the current session's policy, when eligible, and save the policy for future sessions:

```python filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import NetworkPolicy


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")
    await box.update(network_policy=NetworkPolicy.deny_all())


asyncio.run(main())
```

The method never resumes a stopped sandbox. It uses the cached current session, skipping the live update if no session is attached or its cached status is `STOPPED`, `STOPPING`, `ABORTED`, or `FAILED`. Otherwise, it applies the live policy before saving configuration and tags. Live-policy errors propagate and prevent the SDK's later sandbox configuration-and-tags request. A later save failure can leave the live policy changed, so the operation is not atomic.

Each policy replaces the previous policy in full. Use `NetworkPolicy.allow_all()` to remove restrictions. Omit `network_policy` or pass `None` to leave it unchanged. The method returns the same `Sandbox` handle; the synchronous equivalent returns the same `SyncSandbox` handle without `await`.

To update and run work on one specific session, acquire it with `runtime_session = await box.session()`, call `await runtime_session.update_network_policy(policy)`, then run the workload through that same handle. Acquiring a session can resume the sandbox; subsequent operations on the acquired handle stay on that session and propagate failures instead of resuming another one. The SDK targets that session directly. When it is still the sandbox's current session, the API also persists the policy for future sessions; updates to older sessions do not replace the current saved policy.

The sandbox-level `box.update_network_policy()` is deprecated and emits `DeprecationWarning`. It targets the current session endpoint, can auto-resume the sandbox, and returns a `SandboxRuntimeSession`. Its synchronous equivalent returns `SyncSandboxRuntimeSession`. The runtime-session method remains available for pinned updates. Both methods call the session endpoint, which also persists the policy when the target remains the sandbox's current session. The parent handle's cached saved-policy metadata can remain stale.

## Synchronous API

The synchronous API mirrors the asynchronous API. Import it explicitly from `vercel.sandbox`:

```python filename="main.py"
from vercel.sandbox import sync as sandbox

with sandbox.create_sandbox() as box:
    result = box.run_command(
        "python",
        ["-c", "print('Hello from Vercel Sandbox!')"],
        capture_output=True,
        check=True,
    )
    print(result.stdout.decode())
```

Remove `await` and use regular context managers and iterators. Sync handle names include `SyncSandbox`, `SyncSandboxRuntimeSession`, `SyncCommand`, `SyncSandboxUser`, `SyncInteractiveSession`, `SyncDrive`, `SyncSnapshot`, and sync filesystem reader and writer types.

Sync command output readers are `SyncByteReader` streams. They support `read()`, `readline()`, `close()`, and iteration over byte lines. `process.stdin` is a `SyncCommandStdin`, a writable raw binary stream that you can wrap in `io.TextIOWrapper` for text. Its `write()` raises `BrokenPipeError` after the command exits or stops reading. Call `close()` or use the stream as a context manager to send end of file.

Use `with box.session() as runtime_session:` to clean up the acquired session on exit, or `runtime_session = box.session()` to manage cleanup yourself.

Use the asynchronous API unless your application is synchronous. Don't call the synchronous API from an active async event loop.

## Data models

Configuration and result types, such as `SandboxResources`, `NetworkPolicy`, `CompletedCommand`, and `DirectoryEntry`, are [Pydantic](https://docs.pydantic.dev) models. Pass their fields as keyword arguments. Invalid or unknown fields raise `pydantic.ValidationError`.

Results are read-only. Call `model_dump(mode="json")` to turn one into JSON-compatible data:

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")

    result = await box.run_command("echo", ["hello"], capture_output=True)
    payload = result.model_dump(mode="json")


asyncio.run(main())
```

Handles such as `Sandbox`, `Command`, `Drive`, and `Snapshot` aren't models, and serialized data doesn't recreate one. To return to a sandbox in a later request, save its name and call `get_sandbox()`.

## Exported protocol and union types

These exported types support precise annotations:

| Type                                       | Purpose                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------ |
| `CreateSandboxOperation`                   | Single-use awaitable and async context manager returned by `create_sandbox()`. |
| `ForkSandboxOperation`                     | Single-use awaitable and async context manager returned by `fork_sandbox()`.   |
| `ResumeSandboxOperation`                   | Single-use awaitable and async context manager returned by `resume_sandbox()`. |
| `SandboxSessionOperation`                  | Single-use awaitable and async context manager returned by `box.session()`.    |
| `InteractiveSessionOperation`              | Single-use async context manager returned by `open_interactive()`.             |
| `SandboxExecution`, `SandboxFilesystemOperations` | Protocols for the command and filesystem methods that sandboxes, runtime sessions, and user handles share. The synchronous versions are `SyncSandboxExecution` and `SyncSandboxFilesystemOperations`. |
| `SandboxSource`                            | Union of `GitSource`, `TarballSource`, and `SnapshotSource`.                   |
| `SandboxQuery`                             | Union of the four sandbox query models.                                        |
| `DriveQuery`                               | Union of the three drive query models.                                         |
| `DriveReference`                           | Drive name or handle accepted by `DriveMount`.                                 |
| `DriveHandle`                              | Protocol that `Drive` and `SyncDrive` handles satisfy.                         |
| `SandboxCredentialsFactory`                | Async callable that returns `SandboxCredentials`, for `SandboxServiceOptions`. The synchronous version is `SyncSandboxCredentialsFactory`. |
| `RegionInput`                              | `str \| CurrentRegion \| None`. Pass the exported `CURRENT_REGION` sentinel to use the calling Vercel Function's region. |
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
| `SandboxCleanupError`            | Context-managed cleanup failed.                                               |
| `SandboxResponseError`           | A successful API response was malformed.                                      |
| `SandboxStreamError`             | A command's output stream reported an error.                                  |
| `SandboxStdinError`              | Writing to or closing a command's stdin failed.                               |
| `SandboxInteractiveError`        | An interactive terminal connection couldn't be opened.                        |
| `SandboxUserAlreadyExistsError`  | `create_user()` found an existing Linux account. Select it with `as_user()`.  |
| `SandboxInvalidHandleError`      | A handle isn't attached to a valid session or execution mode.                 |
| `SandboxFilesystemError`         | Base error for filesystem operations.                                         |
| `SandboxFilesystemCommandError`  | A command-backed filesystem operation failed.                                 |
| `SandboxFilesystemWriteError`    | The API rejected a batch write.                                               |
| `SandboxPathNotFoundError`       | A required remote path doesn't exist.                                         |
| `SandboxFilesystemTransferError` | Base error for streaming transfers.                                           |
| `SandboxUploadSizeMismatchError` | An upload didn't match its declared size.                                     |

`run_command(check=True)` raises Python's `subprocess.CalledProcessError` for nonzero exit codes.

```python filename="main.py"
import asyncio
from subprocess import CalledProcessError

from vercel import sandbox
from vercel.sandbox import SandboxApiError


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")

    try:
        await box.run_command("python", ["-m", "pytest"], check=True)
    except CalledProcessError as error:
        print(error.returncode, error.stderr)
    except SandboxApiError as error:
        print(error.status_code, error.code)


asyncio.run(main())
```

## Authentication

By default, the SDK resolves credentials in this order:

1. A Vercel OpenID Connect (OIDC) token from the current Vercel request or `VERCEL_OIDC_TOKEN`.
2. `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, and `VERCEL_TEAM_ID`.

For local development, run `vercel link` and `vercel env pull`, then load `.env.local` into your Python process with a tool such as `python-dotenv`. For other environments, set all three access-token variables. See [Sandbox Authentication](/docs/sandbox/concepts/authentication).

## Sandbox CLI commands

To open a shell in a sandbox from your own terminal, run `sandbox connect`. To drive a terminal from code, use [`open_interactive()`](#open-interactive-terminals).

Installing `vercel-sandbox` also installs the `sandbox` and `vercel-sandbox` console commands. These commands delegate to the JavaScript Sandbox CLI through `npx`, so they require Node.js. The Python API itself doesn't require Node.js.

## Standalone clients

`SandboxClient.create()` returns a client with its own configuration and HTTP connections. Use it to pass Sandbox access into a service as a dependency, or to work with more than one project, without changing how `from vercel import sandbox` behaves elsewhere:

```python filename="main.py"
import asyncio
import os
from datetime import timedelta

from vercel.sandbox import SandboxClient, SandboxCredentials, SandboxServiceOptions


async def resolve_credentials() -> SandboxCredentials:
    return SandboxCredentials(
        token=os.environ["ACME_VERCEL_TOKEN"],
        project_id=os.environ["ACME_VERCEL_PROJECT_ID"],
        team_id=os.environ["ACME_VERCEL_TEAM_ID"],
    )


async def main() -> None:
    client = SandboxClient.create(
        options=SandboxServiceOptions(
            credentials_factory=resolve_credentials,
            request_timeout=timedelta(minutes=2),
        ),
    )
    try:
        async with client.create_sandbox() as box:
            result = await box.run_command("whoami", capture_output=True, check=True)
            print(result.stdout.decode())
    finally:
        await client.aclose()


asyncio.run(main())
```

`create()` is synchronous and doesn't make a request, so you can call it while you set up your application. It accepts two optional keyword arguments:

| Parameter              | Description                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `options`              | [`SandboxServiceOptions`](#configure-sandbox) for this client.                              |
| `httpx_client_factory` | Factory for a custom HTTP client. See [Configure the HTTP client](#configure-the-http-client). |

The client has the same methods as the `sandbox` module: `create_sandbox()`, `fork_sandbox()`, `get_sandbox()`, `get_or_create_sandbox()`, `resume_sandbox()`, `query_sandboxes()`, `query_sessions()`, `get_snapshot()`, `query_snapshots()`, `get_drive()`, `get_or_create_drive()`, `fork_drive()`, `delete_drive()`, and `query_drives()`. Handles that it returns keep using the client's configuration.

Call `await client.aclose()` when you're done, after you finish with the handles the client returned. Closing the client releases its connections. It doesn't stop or destroy sandboxes.

For synchronous code, import `SyncSandboxClient` and `SandboxServiceOptions` from `vercel.sandbox.sync`, and call `client.close()`:

```python filename="main.py"
from vercel.sandbox.sync import SandboxServiceOptions, SyncSandboxClient

client = SyncSandboxClient.create(options=SandboxServiceOptions(region="iad1"))
try:
    with client.create_sandbox() as box:
        box.run_command("python", ["--version"], check=True)
finally:
    client.close()
```

## SDK sessions

An SDK session owns the HTTP connection pool and service configuration that `from vercel import sandbox` calls use. The SDK creates and reuses a default session, so call the SDK directly. Don't wrap calls in `session()` without arguments, because that behaves exactly like the default session.

Create a session only to change the HTTP client or a service's configuration for every SDK call inside a block. To configure one part of your application instead, use a [standalone client](#standalone-clients).

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
| `httpx_client_factory` | Factory for a custom HTTP client. Return `httpx2.AsyncClient` for async calls or `httpx2.Client` for sync calls. Omit it to inherit the active session's factory. |

The session closes the HTTP client returned by `httpx_client_factory` when its context exits. Nested sessions inherit their parent's configuration. A nested service option replaces the option for that service. Don't use sync Sandbox calls inside an async session or async Sandbox calls inside a sync session.

### Configure the HTTP client

The SDK sends requests with [HTTPX2](https://pypi.org/project/httpx2/), which `vercel-sandbox` installs. Pass a client factory to configure the client that Vercel services use:

```python filename="main.py"
import asyncio
import os

import httpx2

from vercel import sandbox
from vercel.api import session


def create_http_client() -> httpx2.AsyncClient:
    # Services such as Sandbox use this underlying HTTP client.
    return httpx2.AsyncClient(proxy=os.environ["CORPORATE_PROXY_URL"])


async def main() -> None:
    async with session(httpx_client_factory=create_http_client):
        async with sandbox.create_sandbox() as box:
            await box.run_command("python", ["--version"], check=True)


asyncio.run(main())
```

The SDK closes the client when the session exits.

### Configure Sandbox

Pass `SandboxServiceOptions` to a session or a [standalone client](#standalone-clients) to configure Sandbox calls. This example reads credentials from custom environment variables and increases the timeout for streaming file transfers:

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
| `file_transfer_timeout` | 5 minutes                             | Timeout for each attempt at a file read or upload.                                                               |
| `request_timeout`       | `None`                                | Timeout for each attempt at any other request. By default, the SDK doesn't limit how long it waits for a response. Waiting for a command to finish and streaming its output never time out. |
| `region`                | `None`                                | Default region for sandbox creation, sandbox forks, and drive creation. Accepts a region string or `CURRENT_REGION`. `update()` doesn't use it. |

The SDK retries a request up to two more times when the connection fails or the API responds with status code 429 or a 5xx status code. It waits a short, randomized delay between attempts. A timeout applies to each attempt, so wrap a call in `anyio.fail_after()` to limit its total duration:

```python filename="main.py"
import asyncio

import anyio
from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-development-environment")

    with anyio.fail_after(30):
        result = await box.run_command("python", ["script.py"], capture_output=True)


asyncio.run(main())
```

#### Region defaults

The SDK doesn't send a `region` unless you supply one, and it doesn't read `VERCEL_REGION` on its own. For `create_sandbox()`, `fork_sandbox()`, `get_or_create_sandbox()`, and `get_or_create_drive()`, the SDK picks the region in this order:

1. The `region` argument, when it isn't `None`.
2. `SandboxServiceOptions.region`.
3. No region. The API then applies the [project or API default](/docs/sandbox/concepts/regions#how-vercel-picks-the-region). Forks inherit the source sandbox's region, and new drives default to `iad1`.

The `region` argument and `SandboxServiceOptions.region` accept these values, which the exported `RegionInput` alias describes:

| Value                      | Behavior                                                                                                         |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| A string, such as `"sfo1"` | Send the string as the request's `region`.                                                                       |
| `CURRENT_REGION`           | Send the value of `VERCEL_REGION`, even when it's an empty string. When the variable is unset, omit `region`.    |
| `None`                     | Use `SandboxServiceOptions.region` for creation and forks. For `update()`, leave the region unchanged.           |

To place a sandbox in the same region as the Vercel Function that creates it, pass [`CURRENT_REGION`](/docs/environment-variables/system-environment-variables#VERCEL_REGION):

```python filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import CURRENT_REGION


async def main() -> None:
    async with sandbox.create_sandbox(region=CURRENT_REGION) as box:
        print(box.region)


asyncio.run(main())
```

To apply a default to every creation call, pass `SandboxServiceOptions(region=CURRENT_REGION)` or a fixed region such as `SandboxServiceOptions(region="sfo1")` to an [SDK session](#sdk-sessions). A region from either source overrides the project's default sandbox region and a fork's inherited region. When you mount drives, make sure the sandbox's region matches the drives' region.

The SDK reads `VERCEL_REGION` once, when you call the operation. For `create_sandbox()` and `fork_sandbox()`, that happens when you create the operation, before you await or enter it. Creating `SandboxServiceOptions` doesn't read the environment.

The synchronous API follows the same rules. Import `CURRENT_REGION` and `SandboxServiceOptions` from `vercel.sandbox.sync` for synchronous calls.

## Example workflows

- [Run untrusted Python code safely with Vercel Sandbox](/kb/guide/python-and-vercel-sandbox): End-to-end FastAPI walkthrough.

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
