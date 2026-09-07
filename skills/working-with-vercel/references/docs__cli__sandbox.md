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
  - /docs/cli/global-options
summary: "Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from your terminal."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/sandbox.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "78da5fa9ffae4b6cde677182c09a860fffcb82d52ebc5ee11233c852603e89d5"
---

# vercel sandbox

The `vercel sandbox` command is the entry point for managing [Vercel Sandbox](/docs/sandbox) from the Vercel CLI. Subcommands include `list`, `create`, `config`, `copy`, `exec`, `connect`, `stop`, `remove`, `run`, `snapshot`, `snapshots`, `login`, and `logout`. The full command surface is documented in the [Sandbox CLI Reference](/docs/sandbox/cli-reference). This page summarizes the entry point and links to the full reference.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Use and manage Vercel Sandbox directly from the Vercel CLI](https://vercel.com/changelog/use-vercel-sandbox-directly-within-vercel-cli?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related)
- [Vercel Sandbox CLI is now available](https://vercel.com/changelog/vercel-sandbox-cli-is-now-available?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related)
- [SSH into running Vercel Sandboxes with the CLI](https://vercel.com/changelog/ssh-into-running-sandboxes-with-the-sandbox-cli?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related)
- [The Vercel Sandbox CLI is now more agent-friendly](https://vercel.com/changelog/the-vercel-sandbox-cli-is-now-more-agent-friendly?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related)
- [Vercel Sandboxes are now generally available](https://vercel.com/changelog/vercel-sandboxes-ga?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related)
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/run-commands-in-sandbox?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [Persistence](https://vercel.com/docs/sandbox/concepts/persistent-sandboxes?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related) — Sandboxes automatically save their filesystem state when stopped and restore it when resumed. No manual snapshot managem
- [Delete a sandbox](https://vercel.com/docs/rest-api/sandboxes/delete-a-sandbox?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related) — DELETE /v2/sandboxes/{name} — Deletes a sandbox by name. If sandboxes are currently running, they will be stopped first.
- [Get a named sandbox](https://vercel.com/docs/rest-api/sandboxes/get-a-named-sandbox?from=related&source_path=%2Fdocs%2Fcli%2Fsandbox&source_site=vercel-docs&relationship=related) — GET /v2/sandboxes/{name} — Retrieves a named sandbox by name, including its current sandbox and routes. If the sandbox i

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

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel sandbox` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--team`](/docs/cli/global-options#team)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)
