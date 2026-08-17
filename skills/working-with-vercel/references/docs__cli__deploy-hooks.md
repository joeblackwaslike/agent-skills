---
title: vercel deploy-hooks
product: vercel
url: /docs/cli/deploy-hooks
canonical_url: "https://vercel.com/docs/cli/deploy-hooks"
last_updated: 2026-06-09
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/deploy-hooks
summary: "Manage Deploy Hooks for Git-triggered builds from the Vercel CLI: list, create, and remove deploy hook URLs that trigger new deployments when called."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/deploy-hooks.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "f1810d311647a9a29f89348f5ea9f6fb6f90cc06807eb51c90b560b1af18d3b6"
---

# vercel deploy-hooks

The `vercel deploy-hooks` command (alias `vercel deploy-hook`) manages [Deploy Hooks](/docs/deploy-hooks). A deploy hook is a URL that, when called with an HTTP POST, triggers a new deployment of a specific Git branch. They are useful for triggering redeploys from external systems like content management systems and cron schedulers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to use Deploy Hooks with Vercel and a Headless CMS](https://vercel.com/kb/guide/set-up-and-use-deploy-hooks-with-vercel-and-headless-cms?from=related) — Create your own Deploy Hooks to trigger automatic deployments on Vercel when using a Headless CMS.
- [vercel webhooks](https://vercel.com/docs/cli/webhooks?from=related) — Learn how to manage webhooks for your Vercel account using the vercel webhooks CLI command.
- [Deployments](https://vercel.com/docs/deployments?from=related) — Learn how to create and manage deployments on Vercel.
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [Deploying from CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [vercel list](https://vercel.com/docs/cli/list?from=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.

Full cross-link map for this page: [/docs/cli/deploy-hooks.graph.md](/docs/cli/deploy-hooks.graph.md)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel deploy-hooks [subcommand]
```

*Using the \`vercel deploy-hooks\` command to manage deploy hook URLs for the
current project.*

## Commands

### list (ls)

Lists deploy hooks for the current (or specified) project.

```bash filename="terminal"
vercel deploy-hooks list
vercel deploy-hooks ls --format json
vercel deploy-hooks ls --project my-app
```

*List deploy hooks. Use \`--format json\` for machine-readable output.*

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `-F, --format <FORMAT>` | String | Output format (`json`) |
| `-p, --project <NAME_OR_ID>` | String | Project to list deploy hooks for (defaults to the linked project) |

### create (add)

Creates a new deploy hook for a Git branch. The CLI returns the hook URL.

```bash filename="terminal"
vercel deploy-hooks create cms-rebuild --ref main
```

*Create a deploy hook named \`cms-rebuild\` that deploys the \`main\` branch when
the URL is called.*

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `name` | No | Display name for the deploy hook |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `-r, --ref <BRANCH>` | String | Git branch ref to deploy when the hook URL is triggered |
| `-p, --project <NAME_OR_ID>` | String | Project to create the deploy hook in (defaults to the linked project) |

### remove (rm, delete)

Removes a deploy hook by ID. Use `vercel deploy-hooks list` first to find the hook ID.

```bash filename="terminal"
vercel deploy-hooks rm hook_abc123
```

*Remove a deploy hook by ID.*

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `id` | Yes | ID of the deploy hook to remove |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `-p, --project <NAME_OR_ID>` | String | Project containing the deploy hook (defaults to the linked project) |
| `-y, --yes` | Boolean | Skip the confirmation prompt |

## Examples

### Create a hook to redeploy on CMS publish

```bash filename="terminal"
vercel deploy-hooks create cms-rebuild --ref main
```

*Wire the returned URL into your CMS's publish webhook to trigger a
production redeploy whenever content changes.*

### List deploy hooks as JSON

```bash filename="terminal"
vercel deploy-hooks ls --format json
```

*Useful for syncing hook URLs with external systems.*

### Remove a hook non-interactively

```bash filename="terminal"
vercel deploy-hooks rm hook_abc123 --yes
```

*Skip the confirmation prompt; appropriate for CI scripts.*

## Related

- [Deploy Hooks overview](/docs/deploy-hooks)


---

[View full sitemap](/docs/sitemap)
