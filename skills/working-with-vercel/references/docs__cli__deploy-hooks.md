---
title: vercel deploy-hooks
product: vercel
url: /docs/cli/deploy-hooks
canonical_url: "https://vercel.com/docs/cli/deploy-hooks"
last_updated: 2026-05-29
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/deploy-hooks
summary: "Manage Deploy Hooks for Git-triggered builds from the Vercel CLI: list, create, and remove deploy hook URLs that trigger new deployments when called."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/deploy-hooks.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "5d5a15f12d27fa1276380bcaa3987c6073c9cdf04f8e86ffd8dfd289d6b313e5"
---

# vercel deploy-hooks

The `vercel deploy-hooks` command (alias `vercel deploy-hook`) manages [Deploy Hooks](/docs/deploy-hooks). A deploy hook is a URL that, when called with an HTTP POST, triggers a new deployment of a specific Git branch. They are useful for triggering redeploys from external systems like content management systems and cron schedulers.

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
