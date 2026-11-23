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
  - /docs/cli/global-options
summary: "Manage Deploy Hooks for Git-triggered builds from the Vercel CLI: list, create, and delete deploy hook URLs that trigger new deployments when called."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cli/deploy-hooks.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "1ebd0d15d83f9218e27c75bd1bfe3a34aebb7d95315299dcfe99f03427641a51"
---

# vercel deploy-hooks

The `vercel deploy-hooks` command manages [Deploy Hooks](/docs/deploy-hooks). A deploy hook is a URL that, when called with an HTTP POST, triggers a new deployment of a specific Git branch. They are useful for triggering redeploys from external systems like content management systems and cron schedulers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to use Deploy Hooks with Vercel and a Headless CMS](https://vercel.com/kb/guide/set-up-and-use-deploy-hooks-with-vercel-and-headless-cms) — Create your own Deploy Hooks to trigger automatic deployments on Vercel when using a Headless CMS.
- [vercel webhooks](https://vercel.com/docs/cli/webhooks) — Learn how to manage webhooks for your Vercel account using the vercel webhooks CLI command.
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.

Full cross-link map for this page: [/docs/cli/deploy-hooks.graph.md](/docs/cli/deploy-hooks.graph.md)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel deploy-hooks [subcommand]
```

*Using the \`vercel deploy-hooks\` command to manage deploy hook URLs for the
current project.*

## Commands

### list

Lists deploy hooks for the current (or specified) project.

```bash filename="terminal"
vercel deploy-hooks list
vercel deploy-hooks list --json
vercel deploy-hooks list --project my-app
```

*List deploy hooks. Use \`--json\` for machine-readable output.*

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `--json` | Boolean | Output as JSON |
| `-p, --project <NAME_OR_ID>` | String | Project to list deploy hooks for (defaults to the linked project) |

### create

Creates a new deploy hook for a Git branch. The CLI returns the hook URL.

```bash filename="terminal"
vercel deploy-hooks create cms-rebuild --git-branch main
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
| `--git-branch <BRANCH>` | String | Git branch to deploy when the hook URL is triggered |
| `-p, --project <NAME_OR_ID>` | String | Project to create the deploy hook in (defaults to the linked project) |

### delete

Deletes a deploy hook by ID. Use `vercel deploy-hooks list` first to find the hook ID.

```bash filename="terminal"
vercel deploy-hooks delete hook_abc123
```

*Delete a deploy hook by ID.*

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `id` | Yes | ID of the deploy hook to delete |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `-p, --project <NAME_OR_ID>` | String | Project containing the deploy hook (defaults to the linked project) |
| `-y, --yes` | Boolean | Skip the confirmation prompt. Takes effect with [`--non-interactive`](/docs/cli/global-options#non-interactive) |

## Examples

### Create a hook to redeploy on CMS publish

```bash filename="terminal"
vercel deploy-hooks create cms-rebuild --git-branch main
```

*Wire the returned URL into your CMS's publish webhook to trigger a
production redeploy whenever content changes.*

### List deploy hooks as JSON

```bash filename="terminal"
vercel deploy-hooks list --json
```

*Useful for syncing hook URLs with external systems.*

### Delete a hook non-interactively

```bash filename="terminal"
vercel deploy-hooks delete hook_abc123 --yes --non-interactive
```

*Skip the confirmation prompt; appropriate for CI scripts.*

## Related

- [Deploy Hooks overview](/docs/deploy-hooks)

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel deploy-hooks` command:

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
