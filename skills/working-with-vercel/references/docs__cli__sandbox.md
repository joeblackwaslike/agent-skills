---
title: vercel sandbox
product: vercel
url: /docs/cli/sandbox
canonical_url: "https://vercel.com/docs/cli/sandbox"
last_updated: 2026-08-04
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/sandbox
  - /docs/sandbox/cli-reference
  - /docs/sandbox/quickstart
summary: "Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from your terminal."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/sandbox.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "0d63a18e5659e26c061038c3d53d8dde4b11da510b2a86a44f8ff49858269b85"
---

# vercel sandbox

The `vercel sandbox` command is the entry point for managing [Vercel Sandbox](/docs/sandbox) from the Vercel CLI. Subcommands include `list`, `create`, `config`, `copy`, `exec`, `connect`, `stop`, `remove`, `run`, `snapshot`, `snapshots`, `login`, and `logout`. The full command surface is documented in the [Sandbox CLI Reference](/docs/sandbox/cli-reference). This page summarizes the entry point and links to the full reference.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Run Commands in Vercel Sandbox](https://vercel.com/docs/sandbox/run-commands-in-sandbox?from=related) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [How to use snapshots for faster sandbox startup](https://vercel.com/kb/guide/how-to-use-snapshots-for-faster-sandbox-startup?from=related) — Learn how to save sandbox state with snapshots and skip installation on future runs.
- [How to reconnect to a running Sandbox](https://vercel.com/kb/guide/how-to-reconnect-to-a-running-sandbox?from=related) — Learn how to use \`Sandbox.get\(\)\` to reconnect to an existing sandbox from a different process or after a script rest
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk?from=related) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [Examples](https://vercel.com/docs/sandbox/working-with-sandbox?from=related) — Task-oriented examples for common Vercel Sandbox operations in TypeScript and Python.
- [Persistence](https://vercel.com/docs/sandbox/concepts/persistent-sandboxes?from=related) — Sandboxes automatically save their filesystem state when stopped and restore it when resumed. No manual snapshot managem
- [Concepts](https://vercel.com/docs/sandbox/concepts?from=related) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [Delete a sandbox](https://vercel.com/docs/rest-api/sandboxes/delete-a-sandbox?from=related)

Full cross-link map for this page: [/docs/cli/sandbox.graph.md](/docs/cli/sandbox.graph.md)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel sandbox [subcommand]
```

*Using \`vercel sandbox\` to manage Vercel Sandboxes from the terminal.*

## Examples

### List sandboxes for the current project

```bash filename="terminal"
vercel sandbox list
```

*List the sandboxes belonging to the current project.*

### Create a sandbox and connect to it

```bash filename="terminal"
vercel sandbox create --connect
```

*Create a new sandbox and immediately connect to it in the terminal.*

## Full reference

For the full list of subcommands, flags, and examples, see the [Sandbox CLI Reference](/docs/sandbox/cli-reference). The Sandbox CLI is modeled on the Docker CLI, so commands like `vercel sandbox exec`, `vercel sandbox copy` (alias `cp`), and `vercel sandbox connect` (alias `ssh`) follow familiar shapes. Use `vercel sandbox stop` to stop the current session of a persistent sandbox (the filesystem is snapshotted and can be resumed). To permanently delete a sandbox along with its sessions, use `vercel sandbox remove` instead. The sandbox's snapshots are kept until they expire or you delete them.

## Related

- [Sandbox CLI Reference](/docs/sandbox/cli-reference)
- [Vercel Sandbox overview](/docs/sandbox)
- [Sandbox quickstart](/docs/sandbox/quickstart)


---

[View full sitemap](/docs/sitemap)
