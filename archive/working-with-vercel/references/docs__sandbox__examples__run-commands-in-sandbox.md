---
title: Running commands in a Vercel Sandbox
product: vercel
url: /docs/sandbox/examples/run-commands-in-sandbox
canonical_url: "https://vercel.com/docs/sandbox/examples/run-commands-in-sandbox"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/sandbox/examples
  - /docs/sandbox
related:
  - /docs/sandbox/cli-reference
  - /docs/sandbox/concepts/images
  - /docs/sandbox
summary: Create isolated sandbox environments to run builds, tests, and commands safely.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/examples/run-commands-in-sandbox.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "b93d344ed560f2759bf2aaf4acd172cd051ed3d8e7ea4a91e766263651c7e1ba"
---

# Running commands in a Vercel Sandbox

Use this guide to create isolated sandbox environments for running commands, builds, and tests. You'll create a sandbox, execute commands, copy files in and out, and save snapshots for reuse.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Create a sandbox and run code](https://vercel.com/docs/sandbox/examples/create-a-sandbox-and-run-code) — Create a Vercel Sandbox, write a file into it, run the file, and inspect the command output in TypeScript, Python, or th
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [Quickstart](https://vercel.com/docs/sandbox/quickstart) — Learn how to run your first code in a Vercel Sandbox.
- [Snapshots](https://vercel.com/docs/sandbox/concepts/snapshots) — Save and restore sandbox state with snapshots for faster startups and environment sharing.

Full cross-link map for this page: [/docs/sandbox/examples/run-commands-in-sandbox.graph.md](/docs/sandbox/examples/run-commands-in-sandbox.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** This guide requires the [Sandbox CLI](/docs/sandbox/cli-reference).
> Install it with `npm i -g sandbox` and run `sandbox login` to
> authenticate.

## Quick reference

Use this block when you already know what you're doing and want the full command sequence. Use the steps below for context and checks.

```bash filename="terminal"
# 1. Create a sandbox with a name
sandbox create --name my-sandbox --image vercel/sandbox/node:24 --timeout 1h --publish-port 3000

# 2. Copy project files into the sandbox
sandbox copy --recursive ./my-app my-sandbox:/tmp/app

# 3. Run commands inside the sandbox
sandbox exec --workdir /tmp/app my-sandbox -- npm install
sandbox exec --workdir /tmp/app my-sandbox -- npm run build
sandbox exec --workdir /tmp/app --env NODE_ENV=test my-sandbox -- npm test

# 4. Save the state as a snapshot for reuse
sandbox snapshot my-sandbox --stop

# 5. Create a new sandbox from the snapshot
sandbox create --name restored-sandbox --snapshot <snapshot-id> --timeout 30m

# 6. Use the restored sandbox, then stop its session
sandbox exec --workdir /tmp/app restored-sandbox -- npm test
sandbox stop restored-sandbox

# 7. Permanently delete both sandboxes and the snapshot when no longer needed
sandbox remove restored-sandbox my-sandbox --delete-orphan-snapshots
```

## 1. Create a sandbox

Create a new sandbox environment with the image and configuration you need:

```bash filename="terminal"
sandbox create --image vercel/sandbox/node:24 --timeout 1h
```

This creates a Node.js 24 sandbox that auto-stops after one hour. The command prints the sandbox name. If you don't pass `--image`, the sandbox uses the default [`vercel/sandbox/universal`](/docs/sandbox/concepts/images) image. The older `--runtime` flag is deprecated. Use `--image` instead.

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

The `sandbox copy` command copies one file by default. To copy a single file into the sandbox:

```bash filename="terminal"
sandbox exec <name> -- mkdir -p /tmp/app
sandbox copy ./my-app/package.json <name>:/tmp/app/package.json
```

To copy a whole directory, add `--recursive` (or `-r`):

```bash filename="terminal"
sandbox copy --recursive ./my-app <name>:/tmp/app
```

The contents of the source directory end up inside the destination directory, so `./my-app/package.json` becomes `/tmp/app/package.json`. The command creates the destination directory if it doesn't exist.

You can also copy files out of the sandbox back to your local machine:

```bash filename="terminal"
sandbox copy <name>:/tmp/app/output/results.json ./results.json
```

To copy a directory out of the sandbox, add `--recursive`:

```bash filename="terminal"
sandbox copy --recursive <name>:/tmp/app/output ./output
```

## 3. Run commands

Execute commands inside the sandbox. Use `--workdir` to set the working directory:

```bash filename="terminal"
sandbox exec --workdir /tmp/app <name> -- npm install
```

```bash filename="terminal"
sandbox exec --workdir /tmp/app <name> -- npm run build
```

To pass environment variables to the command:

```bash filename="terminal"
sandbox exec --workdir /tmp/app --env NODE_ENV=test <name> -- npm test
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
sandbox create --name restored-sandbox --snapshot <snapshot-id> --timeout 30m
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

# Delete the sandbox and the snapshots no other sandbox uses
sandbox remove <name> --delete-orphan-snapshots
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
