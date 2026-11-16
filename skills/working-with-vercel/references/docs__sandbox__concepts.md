---
title: Understanding Sandboxes
product: vercel
url: /docs/sandbox/concepts
canonical_url: "https://vercel.com/docs/sandbox/concepts"
last_updated: 2026-08-25
type: conceptual
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/images
  - /docs/container-registry
  - /docs/sandbox/working-with-sandbox
  - /docs/sandbox/concepts/regions
  - /docs/sandbox/cli-reference
summary: Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applications, and executing...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/concepts.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "4a5dc9c031ace666bbeee376607bbf4918869dc4d99921f19d34e0107055b44c"
---

# Understanding Sandboxes

Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applications, executing AI-generated scripts, and more. Sandboxes are **persistent by default**: when a sandbox stops, Vercel automatically snapshots its filesystem, and the sandbox configuration is preserved across sessions, so both are restored the next time you resume.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [A sandbox without a network boundary is only half a sandbox](https://vercel.com/blog/a-sandbox-without-a-network-boundary-is-only-half-a-sandbox)
- [Vercel Sandboxes are now generally available](https://vercel.com/changelog/vercel-sandboxes-ga)
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Delete a sandbox](https://vercel.com/docs/rest-api/sandboxes/delete-a-sandbox) — DELETE /v2/sandboxes/{name} — Deletes a sandbox by name. If sandboxes are currently running, they will be stopped first.
- [List sandboxes](https://vercel.com/docs/rest-api/sandboxes/list-sandboxes) — GET /v2/sandboxes — Retrieves a paginated list of named sandboxes belonging to a specific project. Results can be sorted
- [Hermes](https://vercel.com/docs/sandbox/ecosystem/hermes) — Run Hermes Agent terminal commands in isolated Vercel Sandbox microVMs, with models served through Vercel AI Gateway.

Full cross-link map for this page: [/docs/sandbox/concepts.graph.md](/docs/sandbox/concepts.graph.md)
<!-- /docsgraph:related -->

## What is a sandbox?

A sandbox is an isolated Linux environment that you create programmatically with the SDK or CLI. Think of it as a secure virtual machine that:

- Boots from a [Vercel Managed Image](/docs/sandbox/concepts/images#vercel-managed-images), a custom [VCR image](/docs/sandbox/concepts/images#custom-images), or a saved snapshot
- Uses Ubuntu, Arch Linux, or any other Linux distribution you need
- Has network access for installing packages and making API calls
- Automatically stops after a configurable timeout
- Provides full root access to install any package or binary

Each sandbox includes configurable isolation:

- **Filesystem access**: A dedicated private filesystem. With persistence enabled (the default), the filesystem is automatically snapshotted on stop and restored when the sandbox resumes. The sandbox configuration is preserved across sessions and reapplied on resume.
- **Process isolation**: Kernel-level isolation ensures code cannot see or access processes in other sandboxes.
- **Network isolation**: Each sandbox has its own network namespace with controlled outbound access.

## Sandboxes vs containers

Unlike Docker containers, each sandbox runs in its own [Firecracker](https://firecracker-microvm.github.io/) microVM with a dedicated kernel. This provides stronger isolation than container-based solutions, which makes sandboxes ideal for running untrusted code.

| Aspect           | Docker containers                                         | Vercel Sandboxes                                               |
| :--------------- | :-------------------------------------------------------- | :------------------------------------------------------------- |
| **Isolation**    | Shares host kernel; relies on namespaces and cgroups      | Dedicated kernel per sandbox; full VM isolation                |
| **Security**     | Suitable for trusted code; container escapes are possible | Designed for untrusted code; microVM boundary prevents escapes |
| **Startup time** | Sub-second                                                | Milliseconds (Firecracker optimized for fast boot)             |
| **Use case**     | Packaging and deploying applications                      | Running arbitrary, untrusted code safely                       |

If you already use Docker images to define your environment, store the image in [Vercel Container Registry (VCR)](/docs/container-registry) and create the sandbox with a custom image. See [Images](/docs/sandbox/concepts/images#custom-images). You can also install packages with [your system's package manager](/docs/sandbox/working-with-sandbox#install-system-packages), or take a snapshot after setup when a Docker image is not needed.

## How sandboxes work

When you call `Sandbox.create()`, Vercel provisions a Firecracker microVM on its infrastructure. This microVM boots an Ubuntu 26.04 image, a custom image from VCR, or a saved snapshot.

The sandbox runs on Vercel's infrastructure, so you don't need to manage servers, scale capacity, or worry about availability. Sandboxes provision in the `iad1` region by default. You can choose a different region per sandbox or set a project default. See [Regions](/docs/sandbox/concepts/regions).

Here's what happens during the lifecycle:

1. **Provisioning**: Vercel allocates compute resources and boots the microVM. Resuming from a snapshot is even faster than starting a fresh sandbox.
2. **Running**: Your code executes inside a session. A **session** is a single running VM instance inside a sandbox. You can run commands, install packages, start servers, and interact with the filesystem.
3. **Stopping**: When the timeout expires or you call `stop()`, the session shuts down. For persistent sandboxes (the default), Vercel automatically snapshots the filesystem so the next session resumes from the same state. For non-persistent sandboxes, the filesystem is discarded.
4. **Resuming**: The next SDK call (such as `runCommand` or `writeFiles`) on a stopped persistent sandbox starts a new session from the most recent snapshot. You don't need to resume manually.

For long-term storage of data that doesn't belong in the filesystem, write it to external services like databases or object storage.

## Sandbox lifecycle

### Creating a sandbox

When you're ready to use a sandbox, you can either create a new one from scratch or use a saved snapshot of a sandbox you created previously. Using a snapshot is much faster than creating from scratch because it avoids reinstalling dependencies and repeating setup steps.

Think of it like the difference between booting a fresh OS install versus resuming from a saved state. A new sandbox gives you a clean slate; a snapshot gives you a pre-configured environment ready to go.

Sandboxes are identified by a **name** that is unique within your project. If you don't provide one, the SDK generates a name for you. Use the same name later with `Sandbox.get()` or `Sandbox.getOrCreate()` to resume the sandbox.

To create a sandbox, you can use the [CLI](/docs/sandbox/cli-reference), the [JS SDK](/docs/sandbox/sdk-reference), or the [Python SDK](/docs/sandbox/python-sdk-reference):

**terminal.sh**

```bash filename="terminal.sh"
# Create a sandbox with a random name
sandbox create

# Create with an explicit name
sandbox create --name my-sandbox
```

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

// Create a new sandbox
const sandbox = await Sandbox.create({ name: 'my-sandbox' });

// Or create from a snapshot
const sandboxFromSnapshot = await Sandbox.create({
  source: { type: 'snapshot', snapshotId: 'snap_abc123' },
});

// Or retrieve an existing sandbox by name
// The next operation resumes it if it is stopped
const existing = await Sandbox.get({ name: 'my-sandbox' });
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox
from vercel.sandbox import SnapshotSource


async def main() -> None:
    box = await sandbox.create_sandbox(name="my-sandbox")

    box_from_snapshot = await sandbox.create_sandbox(
        source=SnapshotSource(snapshot_id="snap_abc123")
    )

    # Or retrieve an existing sandbox by name
    # The next operation resumes it if it is stopped
    existing = await sandbox.get_sandbox(name="my-sandbox")


asyncio.run(main())
```

### Running commands

Once created, you can run commands inside the sandbox. Commands can run in blocking mode (wait for completion) or detached mode (return immediately).

**terminal.sh**

```bash filename="terminal.sh"
# Run a command in an existing sandbox (by name)
sandbox exec my-sandbox -- npm install

# Run interactively
sandbox exec --interactive --tty my-sandbox -- bash

# Run with environment variables
sandbox exec --env DEBUG=true my-sandbox -- npm test
```

**index.ts**

```ts filename="index.ts"
// Blocking: waits for the command to finish
const result = await sandbox.runCommand('npm', ['install']);
console.log(result.exitCode);

// Detached: returns immediately, useful for servers
const cmd = await sandbox.runCommand({
  cmd: 'npm',
  args: ['run', 'dev'],
  detached: true,
});

// Stream logs from a detached command
for await (const log of cmd.logs()) {
  console.log(log.data);
}
```

**main.py**

```py filename="main.py"
import asyncio

from anyio.streams.text import TextReceiveStream
from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-sandbox")

    # Wait for a command and capture its output.
    result = await box.run_command(
        "npm",
        ["install"],
        capture_output=True,
        check=True,
    )
    print(result.returncode)

    # Return immediately with a live command handle.
    process = await box.create_command("npm", ["run", "dev"])

    # Stream stdout from the command and decode it as text.
    assert process.stdout is not None
    async for text in TextReceiveStream(process.stdout):
        print(text, end="")


asyncio.run(main())
```

### Stopping a sandbox

Sandboxes automatically stop after a timeout. The default timeout is 5 minutes, and the [maximum](/docs/sandbox/pricing#runtime-limits) applies to each [session](/docs/sandbox/concepts/persistent-sandboxes#sandboxes-and-sessions), not to the sandbox itself. A sandbox spans as many sessions as you resume it for: an agent workspace resumed once a day for a week is one sandbox and seven sessions.

Alternatively, you can stop them manually. `stop()` resolves once the VM is fully stopped, and returns the final session state. For persistent sandboxes, the resolved value also includes metadata for the snapshot captured during shutdown.

**terminal.sh**

```bash filename="terminal.sh"
sandbox stop my-sandbox
```

**index.ts**

```ts filename="index.ts"
await sandbox.stop();
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-sandbox")
    await box.stop()


asyncio.run(main())
```

You can also stop sandboxes from the Vercel Dashboard by navigating to **Observability > Sandboxes** and clicking **Stop Sandbox**.

### Taking snapshots

Snapshots save the current state of a sandbox, including all installed packages and files. Use snapshots to skip setup time on subsequent runs, checkpoint long-running tasks, or share environments with teammates.

See [Snapshots](/docs/sandbox/concepts/snapshots) for complete documentation on creating, retrieving, and managing snapshots.

## Common use cases

Vercel Sandboxes are ideal for features that require secure, on-demand code execution:

| Pattern                         | Why use sandboxes?                                                              | Example                                                                          |
| :------------------------------ | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------- |
| **AI code interpreter**         | LLM-generated code can be unpredictable. Sandboxes ensure it runs in isolation. | An AI assistant that solves math problems by writing and running Python scripts. |
| **Clean test environments**     | Start fresh for every test run to avoid "works on my machine" issues.           | Running unit tests against a clean OS for every commit.                          |
| **Reproducible infrastructure** | Share identical snapshots of environments across teams.                         | A QA team spinning up an exact replica of a customer's environment.              |
| **Temporary debugging**         | Spin up a throwaway environment to inspect issues without risk.                 | Investigating a production issue by replicating the environment.                 |

### When not to use sandboxes

Sandboxes are not designed to run continuously. They are **not** suitable for:

- **Permanent hosting**: If you need a server that stays up 24/7, use a traditional VM or Vercel Functions.
- **Long-term storage of large datasets**: The filesystem persists between sessions of a persistent sandbox, but it isn't a substitute for a database or object store. Push large or shared data to external services.

## Security model

Vercel Sandboxes are designed for running untrusted code safely. Each sandbox runs in its own [Firecracker](https://firecracker-microvm.github.io/) microVM with a dedicated kernel, enforced resource limits, and controlled network access.

See [Sandbox security model](/docs/sandbox/concepts/security) for the full security model, including the isolation architecture, hardware side channels, resource limits, network access, and data privacy.

## Next steps

- [Persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes): Sandboxes that auto-save state and resume where you left off.
- [Tags](/docs/sandbox/concepts/tags): Categorize sandboxes by environment, team, or any other criteria using key-value tags.
- [Drives](/docs/sandbox/concepts/drives): Attach persistent filesystem storage to sandboxes and reuse data across sandbox runs.
- [Regions](/docs/sandbox/concepts/regions): Choose where your sandboxes run and configure failover regions.
- [Secure Compute](/docs/sandbox/concepts/secure-compute): Send a sandbox's public-internet traffic through a network's static IPs, and reach your own VPC over VPC peering.
- [Security model](/docs/sandbox/concepts/security): How the sandbox boundary isolates untrusted code, and what it does and does not cover.
- [Quickstart](/docs/sandbox/quickstart): Run your first sandbox.
- [Working with Sandbox](/docs/sandbox/working-with-sandbox): Task-oriented guides for common operations.
- [Authentication](/docs/sandbox/concepts/authentication): Configure SDK authentication.
- [Snapshots](/docs/sandbox/concepts/snapshots): Save and restore sandbox state.
- [JS SDK Reference](/docs/sandbox/sdk-reference): Full API documentation for JavaScript and TypeScript.
- [Python SDK Reference](/docs/sandbox/python-sdk-reference): Full API documentation for Python.
- [CLI Reference](/docs/sandbox/cli-reference): Manage sandboxes from the terminal.
- [Examples](/docs/sandbox/working-with-sandbox#examples): Real-world use cases and code samples.

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
