---
title: Running commands in a Vercel Sandbox
product: vercel
url: /docs/sandbox/run-commands-in-sandbox
canonical_url: "https://vercel.com/docs/sandbox/run-commands-in-sandbox"
last_updated: 2026-09-04
type: how-to
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/cli-reference
  - /docs/sandbox/concepts/images
  - /docs/sandbox
summary: Create isolated sandbox environments to run builds, tests, and commands safely.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/run-commands-in-sandbox.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "a137868ff60af3d606918b74a5b629fa6ed0ad5e56d815b5f8a5ee8cdc8651c4"
---

# Running commands in a Vercel Sandbox

Use this guide to create isolated sandbox environments for running commands, builds, and tests. You'll create a sandbox, execute commands, copy files in and out, and save snapshots for reuse.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to use snapshots for faster sandbox startup](https://vercel.com/kb/guide/how-to-use-snapshots-for-faster-sandbox-startup?from=related&source_path=%2Fdocs%2Fsandbox%2Frun-commands-in-sandbox&source_site=vercel-docs&relationship=related) — Learn how to save sandbox state with snapshots and skip installation on future runs.
- [Sandbox](https://v0.app/docs/sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Frun-commands-in-sandbox&source_site=vercel-docs&relationship=related) — VM-backed chats run your project inside an isolated Vercel Sandbox that hosts your code, dev server, terminal, and agent
- [Vercel Sandbox CLI is now available](https://vercel.com/changelog/vercel-sandbox-cli-is-now-available?from=related&source_path=%2Fdocs%2Fsandbox%2Frun-commands-in-sandbox&source_site=vercel-docs&relationship=related)
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk?from=related&source_path=%2Fdocs%2Fsandbox%2Frun-commands-in-sandbox&source_site=vercel-docs&relationship=related) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [How to reconnect to a running Sandbox](https://vercel.com/kb/guide/how-to-reconnect-to-a-running-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Frun-commands-in-sandbox&source_site=vercel-docs&relationship=related) — Learn how to use \\`Sandbox.get\\(\\)\\` to reconnect to an existing sandbox from a different process or after a script rest
- [vercel sandbox](https://vercel.com/docs/cli/sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Frun-commands-in-sandbox&source_site=vercel-docs&relationship=related) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Quickstart](https://vercel.com/docs/sandbox/quickstart?from=related&source_path=%2Fdocs%2Fsandbox%2Frun-commands-in-sandbox&source_site=vercel-docs&relationship=related) — Learn how to run your first code in a Vercel Sandbox.
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Frun-commands-in-sandbox&source_site=vercel-docs&relationship=related) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [Persistence](https://vercel.com/docs/sandbox/concepts/persistent-sandboxes?from=related&source_path=%2Fdocs%2Fsandbox%2Frun-commands-in-sandbox&source_site=vercel-docs&relationship=related) — Sandboxes automatically save their filesystem state when stopped and restore it when resumed. No manual snapshot managem
- [Snapshots](https://vercel.com/docs/sandbox/concepts/snapshots?from=related&source_path=%2Fdocs%2Fsandbox%2Frun-commands-in-sandbox&source_site=vercel-docs&relationship=related) — Save and restore sandbox state with snapshots for faster startups and environment sharing.

Full cross-link map for this page: [/docs/sandbox/run-commands-in-sandbox.graph.md](/docs/sandbox/run-commands-in-sandbox.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Frun-commands-in-sandbox&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** This guide requires the [Sandbox CLI](/docs/sandbox/cli-reference).
> Install it with `npm i -g sandbox` and run `sandbox login` to
> authenticate.

## Quick reference

Use this block when you already know what you're doing and want the full command sequence. Use the steps below for context and checks.

```bash filename="terminal"
# 1. Create a named sandbox
sandbox create --name my-sandbox --image vercel/sandbox/node:24 --timeout 1h --publish-port 3000

# 2. Copy project files into the sandbox (sandbox copy transfers one file at a time)
tar -czf app.tgz -C ./my-app .
sandbox copy ./app.tgz my-sandbox:/tmp/app.tgz
sandbox exec my-sandbox -- sh -c "mkdir -p /app && tar -xzf /tmp/app.tgz -C /app"

# 3. Run commands inside the sandbox
sandbox exec --workdir /app my-sandbox -- npm install
sandbox exec --workdir /app my-sandbox -- npm run build
sandbox exec --workdir /app --env NODE_ENV=test my-sandbox -- npm test

# 4. Save the state as a snapshot for reuse
sandbox snapshot my-sandbox --stop

# 5. Create a new sandbox from the snapshot
sandbox create --snapshot <snapshot-id> --timeout 30m

# 6. Stop the current session (persistent sandboxes will resume on the next exec)
sandbox stop my-sandbox

# 7. Or permanently delete it
sandbox remove my-sandbox
```

## 1. Create a sandbox

Create a new sandbox environment with the image and configuration you need:

```bash filename="terminal"
sandbox create --image vercel/sandbox/node:24 --timeout 1h
```

This creates a Node.js 24 sandbox that auto-stops after one hour. The command outputs the sandbox ID. If you don't pass `--image`, the sandbox uses the default [`vercel/sandbox/universal`](/docs/sandbox/concepts/images) image. The older `--runtime` flag is deprecated. Use `--image` instead.

To make a port accessible via a public URL (useful for testing web applications):

```bash filename="terminal"
sandbox create --image vercel/sandbox/node:24 --timeout 1h --publish-port 3000
```

For Python workloads:

```bash filename="terminal"
sandbox create --image vercel/sandbox/python:3.14 --timeout 1h
```

To create a sandbox and immediately connect to an interactive shell:

```bash filename="terminal"
sandbox create --image vercel/sandbox/node:24 --timeout 1h --connect
```

## 2. Copy files into the sandbox

The `sandbox copy` command transfers one file at a time. To copy a single file into the sandbox:

```bash filename="terminal"
sandbox copy ./my-app/package.json <name>:/app/package.json
```

To move a whole directory, archive it first and extract it inside the sandbox:

```bash filename="terminal"
tar -czf app.tgz -C ./my-app .
sandbox copy ./app.tgz <name>:/tmp/app.tgz
sandbox exec <name> -- sh -c "mkdir -p /app && tar -xzf /tmp/app.tgz -C /app"
```

You can also copy files out of the sandbox back to your local machine:

```bash filename="terminal"
sandbox copy <name>:/app/output/results.json ./results.json
```

## 3. Run commands

Execute commands inside the sandbox. Use `--workdir` to set the working directory:

```bash filename="terminal"
sandbox exec --workdir /app <name> -- npm install
```

```bash filename="terminal"
sandbox exec --workdir /app <name> -- npm run build
```

To pass environment variables to the command:

```bash filename="terminal"
sandbox exec --workdir /app --env NODE_ENV=test <name> -- npm test
```

For commands that need elevated permissions:

```bash filename="terminal"
sandbox exec --sudo <name> -- sh -c "apt-get update && apt-get install -y jq"
```

## 4. Connect to an interactive shell

For exploratory work or debugging, connect to the sandbox interactively:

```bash filename="terminal"
sandbox connect <name>
```

This opens a shell session inside the sandbox. Exit the shell to disconnect.

## 5. Save a snapshot

After setting up a sandbox with dependencies installed and configured, save it as a snapshot so you can recreate the same environment later:

```bash filename="terminal"
sandbox snapshot <name> --stop
```

Snapshotting always stops the sandbox automatically. The `--stop` flag confirms you acknowledge this behavior.

To list your saved snapshots:

```bash filename="terminal"
sandbox snapshots list
```

## 6. Create a sandbox from a snapshot

Recreate an environment from a saved snapshot:

```bash filename="terminal"
sandbox create --snapshot <snapshot-id> --timeout 30m
```

This starts a new sandbox with all the files, dependencies, and configuration from the snapshot already in place.

## 7. Quick one-off commands

For simple tasks where you don't need to manage the sandbox lifecycle, use `sandbox run`. This creates a sandbox, runs a command, and optionally cleans up:

```bash filename="terminal"
sandbox run --image vercel/sandbox/node:24 --rm -- node -e 'console.log(process.version)'
```

The `--rm` flag automatically deletes the sandbox after the command finishes.

## 8. Configure network access

Control what network resources the sandbox can reach. Passing `--allowed-domain` creates a custom policy that only allows traffic to the listed destinations:

```bash filename="terminal"
sandbox create --image vercel/sandbox/node:24 --timeout 1h --allowed-domain "*.npmjs.org" --allowed-domain "registry.npmjs.org"
```

To update the network policy of an existing sandbox:

```bash filename="terminal"
sandbox config network-policy <name> --allowed-domain "api.example.com"
```

## 9. Clean up

For a persistent sandbox, `sandbox stop` ends the current session and snapshots the filesystem. The sandbox can be resumed later by name. To delete it permanently, use `sandbox remove`.

```bash filename="terminal"
# Stop the current session
sandbox stop <name>

# Stop multiple sandboxes
sandbox stop <name-1> <name-2>

# Permanently delete a sandbox and all its sessions
sandbox remove <name>
```

To see all running sandboxes:

```bash filename="terminal"
sandbox list
```

To include stopped sandboxes:

```bash filename="terminal"
sandbox list --all
```

## When to delete snapshots

Remove snapshots you no longer need to keep your environment clean:

```bash filename="terminal"
sandbox snapshots delete <snapshot-id>
```

## Related

- [Sandbox CLI reference](/docs/sandbox/cli-reference)
- [Vercel Sandbox overview](/docs/sandbox)


---

[View full sitemap](/docs/sitemap)
