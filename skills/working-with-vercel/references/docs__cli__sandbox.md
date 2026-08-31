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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "a58c07243ebbf2b1269ea9c39f798cf5a52dc89584ca62e1ed9692372ed9aeaa"
---

# vercel sandbox

The `vercel sandbox` command is the entry point for managing [Vercel Sandbox](/docs/sandbox) from the Vercel CLI. Subcommands include `list`, `create`, `config`, `copy`, `exec`, `connect`, `stop`, `remove`, `run`, `snapshot`, `snapshots`, `login`, and `logout`. The full command surface is documented in the [Sandbox CLI Reference](/docs/sandbox/cli-reference). This page summarizes the entry point and links to the full reference.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Use and manage Vercel Sandbox directly from the Vercel CLI](https://vercel.com/changelog/use-vercel-sandbox-directly-within-vercel-cli?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related)
- [Vercel Sandbox CLI is now available](https://vercel.com/changelog/vercel-sandbox-cli-is-now-available?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related)
- [SSH into running Vercel Sandboxes with the CLI](https://vercel.com/changelog/ssh-into-running-sandboxes-with-the-sandbox-cli?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related)
- [Connect to and manage Sandboxes from the dashboard](https://vercel.com/changelog/connect-to-and-manage-sandboxes-from-the-dashboard?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related)
- [The Vercel Sandbox CLI is now more agent-friendly](https://vercel.com/changelog/the-vercel-sandbox-cli-is-now-more-agent-friendly?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related)
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/run-commands-in-sandbox?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Persistence](https://vercel.com/docs/sandbox/concepts/persistent-sandboxes?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related) — Sandboxes automatically save their filesystem state when stopped and restore it when resumed. No manual snapshot managem
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [Snapshots](https://vercel.com/docs/sandbox/concepts/snapshots?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related) — Save and restore sandbox state with snapshots for faster startups and environment sharing.
- [Delete a sandbox](https://vercel.com/docs/rest-api/sandboxes/delete-a-sandbox?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related) — DELETE /v2/sandboxes/{name} — Deletes a sandbox by name. If sandboxes are currently running, they will be stopped first.

Full cross-link map for this page: [/docs/cli/sandbox.graph.md](/docs/cli/sandbox.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=graph)
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
