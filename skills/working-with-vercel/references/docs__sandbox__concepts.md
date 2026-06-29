---
title: Understanding Sandboxes
product: vercel
url: /docs/sandbox/concepts
canonical_url: "https://vercel.com/docs/sandbox/concepts"
last_updated: 2026-06-05
type: conceptual
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/cli-reference
  - /docs/sandbox/sdk-reference
  - /docs/sandbox/python-sdk-reference
  - /docs/sandbox/concepts/snapshots
  - /docs/sandbox/concepts/firewall
summary: Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applications, and executing...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/concepts.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "b59e2a03334192da960a4b7e3e99d8f1a597ef47f7897ff52c1e3012541583e3"
---

# Understanding Sandboxes

Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applications, executing AI-generated scripts, and more. Sandboxes are **persistent by default**: when a sandbox stops, the SDK automatically snapshots its filesystem, and the sandbox configuration is preserved across sessions, so both are restored the next time you resume.

## What is a sandbox?

A sandbox is an isolated Linux environment that you create programmatically with the SDK or CLI. Think of it as a secure virtual machine that:

- Boots from either a clean image or a saved snapshot
- Uses Amazon Linux 2023 as the base image
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

If you already use Docker images to define your environment, you can replicate that setup in a sandbox by installing the same packages using [`dnf` and your language's package manager](/kb/guide/how-to-install-system-packages-in-vercel-sandbox), or by taking a snapshot after initial setup.

## How sandboxes work

When you call `Sandbox.create()`, Vercel provisions a Firecracker microVM on its infrastructure. This microVM boots an Amazon Linux 2023 image with your specified runtime (Node.js or Python) pre-installed.

The sandbox runs on Vercel's global infrastructure, so you don't need to manage servers, scale capacity, or worry about availability. Sandboxes automatically provision in `iad1` region.

Here's what happens during the lifecycle:

1. **Provisioning**: Vercel allocates compute resources and boots the microVM. Resuming from a snapshot is even faster than starting a fresh sandbox.
2. **Running**: Your code executes inside a session. A **session** is a single running VM instance inside a sandbox. You can run commands, install packages, start servers, and interact with the filesystem.
3. **Stopping**: When the timeout expires or you call `stop()`, the session shuts down. For persistent sandboxes (the default), the SDK automatically snapshots the filesystem so the next session resumes from the same state. For non-persistent sandboxes, the filesystem is discarded.
4. **Resuming**: The next SDK call (such as `runCommand` or `writeFiles`) on a stopped persistent sandbox starts a new session from the most recent snapshot. You don't need to resume manually.

For long-term storage of data that doesn't belong in the filesystem, write it to external services like databases or object storage.

## Sandbox lifecycle

### Creating a sandbox

When you're ready to use a sandbox, you can either create a new one from scratch or use a saved snapshot of a sandbox you created previously. Using a snapshot is much faster than creating from scratch because it avoids reinstalling dependencies and repeating setup steps.

Think of it like the difference between booting a fresh OS install versus resuming from a saved state. A new sandbox gives you a clean slate; a snapshot gives you a pre-configured environment ready to go.

Sandboxes are identified by a **name** that is unique within your project. If you don't provide one, the SDK generates a name for you. Use the same name later with `Sandbox.get()` or `Sandbox.getOrCreate()` to resume the sandbox.

To create a sandbox, you can use the [CLI](/docs/sandbox/cli-reference), the [JS SDK](/docs/sandbox/sdk-reference), or the [Python SDK](/docs/sandbox/python-sdk-reference):

### Running commands

Once created, you can run commands inside the sandbox. Commands can run in blocking mode (wait for completion) or detached mode (return immediately).

### Stopping a sandbox

Sandboxes automatically stop after a timeout. The default timeout is 5 minutes.

Alternatively, you can stop them manually. `stop()` resolves once the VM is fully stopped, and returns the final session state. For persistent sandboxes, the resolved value also includes metadata for the snapshot captured during shutdown.

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

Vercel Sandboxes are designed for running untrusted code safely.

### Isolation architecture

Sandboxes use [Firecracker](https://firecracker-microvm.github.io/) microVMs to provide strict isolation. Each sandbox runs in its own lightweight virtual machine with a dedicated kernel, ensuring that code in one sandbox cannot access or interfere with others or the underlying host system.

### Resource limits

Every sandbox comes with:

- A dedicated private filesystem
- Network namespace isolation
- Kernel-level process isolation
- Strict CPU, memory, and disk limits
- Automatic timeouts to prevent runaway processes

These limits prevent resource exhaustion and ensure fair usage across all sandboxes.

### Network access

Sandboxes can make outbound HTTP requests by default, so you can install packages from public registries like npm or PyPI. Exposed ports are accessible via a public URL, so be mindful of what services you run.

Internet access from the sandbox can be restricted through network policies defined by the users, as part of the [sandbox firewall](/docs/sandbox/concepts/firewall).

### Data privacy

Sandboxes run on Vercel's secure infrastructure, which maintains SOC 2 Type II certification. Since sandboxes are ephemeral, they do not persist data long-term. For specific data residency requirements, consult your plan details or compliance team.

## Next steps

- [Persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes): Sandboxes that auto-save state and resume where you left off.
- [Tags](/docs/sandbox/concepts/tags): Categorize sandboxes by environment, team, or any other criteria using key-value tags.
- [Drives (Beta)](/docs/sandbox/concepts/drives): Attach persistent filesystem storage to sandboxes and reuse data across sandbox runs.
- [Quickstart](/docs/sandbox/quickstart): Run your first sandbox.
- [Working with Sandbox](/docs/sandbox/working-with-sandbox): Task-oriented guides for common operations.
- [Authentication](/docs/sandbox/concepts/authentication): Configure SDK authentication.
- [Snapshots](/docs/sandbox/concepts/snapshots): Save and restore sandbox state.
- [JS SDK Reference](/docs/sandbox/sdk-reference): Full API documentation for JavaScript and TypeScript.
- [Python SDK Reference](/docs/sandbox/python-sdk-reference): Full API documentation for Python.
- [CLI Reference](/docs/sandbox/cli-reference): Manage sandboxes from the terminal.
- [Examples](/docs/sandbox/working-with-sandbox#examples): Real-world use cases and code samples.


---

[View full sitemap](/docs/sitemap)
