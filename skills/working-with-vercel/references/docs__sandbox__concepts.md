---
title: Understanding Sandboxes
product: vercel
url: /docs/sandbox/concepts
canonical_url: "https://vercel.com/docs/sandbox/concepts"
last_updated: 2026-06-30
type: conceptual
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/images
  - /docs/container-registry
  - /docs/sandbox/cli-reference
  - /docs/sandbox/sdk-reference
  - /docs/sandbox/python-sdk-reference
summary: Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applications, and executing...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/concepts.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "ec168816e26ee6d30fb43b052855b2558ee3d63cdcc02450c215a6f10400fbf8"
---

# Understanding Sandboxes

Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applications, executing AI-generated scripts, and more. Sandboxes are **persistent by default**: when a sandbox stops, the SDK automatically snapshots its filesystem, and the sandbox configuration is preserved across sessions, so both are restored the next time you resume.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to test a container image in Vercel Sandbox before deploying](https://vercel.com/kb/guide/test-container-image-vercel-sandbox?from=related) — Validate a container image before deploying by booting it as a custom Sandbox image from Vercel Container Registry \(VCR
- [Sandbox](https://eve.dev/docs/sandbox?from=related) — The agent's isolated bash environment, including built-in file tools, a seeded /workspace, backends, lifecycle, and netw
- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence?from=related) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [How to use snapshots for faster sandbox startup](https://vercel.com/kb/guide/how-to-use-snapshots-for-faster-sandbox-startup?from=related) — Learn how to save sandbox state with snapshots and skip installation on future runs.
- [Run Commands in Vercel Sandbox](https://vercel.com/docs/sandbox/run-commands-in-sandbox?from=related) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox?from=related) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y

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

If you already use Docker images to define your environment, store the image in [Vercel Container Registry (VCR)](/docs/container-registry) and create the sandbox with a custom image. See [Images](/docs/sandbox/concepts/images#custom-images). You can also install packages with [your system's package manager](/kb/guide/how-to-install-system-packages-in-vercel-sandbox), or take a snapshot after setup when a Docker image is not needed.

## How sandboxes work

When you call `Sandbox.create()`, Vercel provisions a Firecracker microVM on its infrastructure. This microVM boots an Ubuntu 26.04 image, a custom image from VCR, or a saved snapshot.

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

Each sandbox runs in its own [Firecracker](https://firecracker-microvm.github.io/) microVM with a dedicated kernel, so you can run processes that require system-level privileges without affecting other sandboxes or the host. These workloads run with `sudo` and are isolated to your sandbox by the microVM boundary.

Supported workloads include:

- **Container runtimes**: Run Docker and other container engines inside the sandbox to build images or run containerized workloads.
- **VPN clients**: Connect to a VPN provider to reach private networks during a session.
- **FUSE filesystems**: Mount Filesystem in Userspace (FUSE) drivers to attach object storage, network filesystems, or other custom mounts.

These processes require elevated privileges, so run them with `sudo`. For example, to run a command with elevated privileges through the CLI:

```bash filename="terminal"
sandbox exec --sudo <name> -- <command>
```

Outbound network access from these workloads still follows the [sandbox firewall](/docs/sandbox/concepts/firewall) network policy. Restrict reachable destinations with a network policy when you run untrusted code.

If you run containers inside the sandbox, the proxy CA certificate is not available inside the container by default. Install it in the container's trust store so HTTPS traffic that the firewall terminates passes TLS verification. See [Proxy CA certificates](#proxy-ca-certificates).

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

#### Proxy CA certificates

Vercel Sandbox mounts a unique, per-sandbox certificate authority (CA) certificate for the sandbox proxy in these locations:

- `/etc/pki/ca-trust/source/anchors/vercel-proxy-ca.pem`
- `/usr/local/share/ca-certificates/vercel-proxy-ca.pem`

Vercel Sandbox adds the proxy CA certificate to the system trust bundle automatically. Applications that use the system trust store do not need extra configuration.

The following environment variables are also set so common tools and runtimes use the system CA bundle at `/etc/ssl/certs/ca-certificates.crt`:

```text
AWS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
CARGO_HTTP_CAINFO=/etc/ssl/certs/ca-certificates.crt
CURL_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
GIT_SSL_CAINFO=/etc/ssl/certs/ca-certificates.crt
GRPC_DEFAULT_SSL_ROOTS_FILE_PATH=/etc/ssl/certs/ca-certificates.crt
NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt
NODE_USE_SYSTEM_CA=1
NPM_CONFIG_CAFILE=/etc/ssl/certs/ca-certificates.crt
PIP_CERT=/etc/ssl/certs/ca-certificates.crt
REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt
```

If your application does not use the system trust store and these environment variables, configure it to trust one of the mounted `vercel-proxy-ca.pem` files. This is required for HTTPS traffic that the [sandbox firewall](/docs/sandbox/concepts/firewall) terminates for transformation rules.

**Containers do not inherit the proxy CA.** The proxy CA certificate and the CA environment variables are installed on the sandbox host. A container that you run inside the sandbox has its own isolated filesystem and trust store, so it does not inherit either of them. Without the certificate, HTTPS requests from inside the container fail TLS verification when the [sandbox firewall](/docs/sandbox/concepts/firewall) terminates them for transformation rules.

To make a container trust the proxy, mount the certificate into the container and add it to the container's own trust store. For example, with Docker:

```bash filename="terminal"
# Mount the host certificate into the container and trust it at build or run time.
docker run --rm \
  -v /etc/pki/ca-trust/source/anchors/vercel-proxy-ca.pem:/usr/local/share/ca-certificates/vercel-proxy-ca.crt:ro \
  my-image \
  sh -c "update-ca-certificates && my-command"
```

The exact path and command depend on the container's base image. Place the certificate where that image's trust store expects it, then run the image's trust-update command (for example, `update-ca-certificates` on Debian or Ubuntu, or `update-ca-trust` on Amazon Linux, Fedora, or RHEL). For applications that read a CA bundle from an environment variable instead of the system trust store, set the relevant variable (such as `NODE_EXTRA_CA_CERTS`) to the mounted certificate path inside the container.

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
