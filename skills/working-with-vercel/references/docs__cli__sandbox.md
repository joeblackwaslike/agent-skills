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
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "ace5fdb1fa20eb5fcdf7035e8a88251949401cfc263ea10b109efb4820bdd241"
---

# vercel sandbox

The `vercel sandbox` command is the entry point for managing [Vercel Sandbox](/docs/sandbox) from the Vercel CLI. Subcommands include `list`, `create`, `config`, `copy`, `exec`, `connect`, `stop`, `remove`, `run`, `snapshot`, `snapshots`, `login`, and `logout`. The full command surface is documented in the [Sandbox CLI Reference](/docs/sandbox/cli-reference). This page summarizes the entry point and links to the full reference.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Use and manage Vercel Sandbox directly from the Vercel CLI](https://vercel.com/changelog/use-vercel-sandbox-directly-within-vercel-cli)
- [SSH into running Vercel Sandboxes with the CLI](https://vercel.com/changelog/ssh-into-running-sandboxes-with-the-sandbox-cli)
- [Vercel Sandbox CLI is now available](https://vercel.com/changelog/vercel-sandbox-cli-is-now-available)
- [The Vercel Sandbox CLI is now more agent-friendly](https://vercel.com/changelog/the-vercel-sandbox-cli-is-now-more-agent-friendly)
- [Connect to and manage Sandboxes from the dashboard](https://vercel.com/changelog/connect-to-and-manage-sandboxes-from-the-dashboard)
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [Persistence](https://vercel.com/docs/sandbox/concepts/persistent-sandboxes) — Sandboxes automatically save their filesystem state when stopped and restore it when resumed. No manual snapshot managem
- [Delete a sandbox](https://vercel.com/docs/rest-api/sandboxes/delete-a-sandbox) — DELETE /v2/sandboxes/{name} — Deletes a sandbox by name. If sandboxes are currently running, they will be stopped first.
- [Snapshots](https://vercel.com/docs/sandbox/concepts/snapshots) — Save and restore sandbox state with snapshots for faster startups and environment sharing.

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

*List the running sandboxes in the current project. Add \`--all\` to include
stopped sandboxes.*

### Create a sandbox and connect to it

```bash filename="terminal"
vercel sandbox create --connect
```

*Create a new sandbox and immediately connect to it in the terminal.*

## Full reference

For the full list of subcommands, flags, and examples, see the [Sandbox CLI Reference](/docs/sandbox/cli-reference). The Sandbox CLI is modeled on the Docker CLI, so commands like `vercel sandbox exec`, `vercel sandbox copy`, and `vercel sandbox connect` follow familiar shapes. Use `vercel sandbox stop` to stop the current session of a persistent sandbox (the filesystem is snapshotted and can be resumed). To permanently delete a sandbox along with its sessions, use `vercel sandbox remove` instead. The sandbox's snapshots are kept until they expire or you delete them.

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
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
