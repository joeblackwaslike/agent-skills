---
title: vercel daemons
product: vercel
url: /docs/cli/daemons
canonical_url: "https://vercel.com/docs/cli/daemons"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/daemons
  - /docs/cli/link
  - /docs/cli/global-options
  - /docs/cli/login
  - /docs/cli
summary: List and inspect production daemons, override regional instance counts, and inspect or restart individual instances with Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/daemons.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "0e71739ee98fb13d3027b3805d1b6f5efaf945e298073afd18e488ba721cbc54"
---

# vercel daemons

The `vercel daemons` command manages [Daemons](/docs/daemons) for a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [Daemons](https://vercel.com/docs/build-output-api/daemons) — Learn how Vercel Daemons are represented in the Build Output API.
- [Daemon Configuration Reference](https://vercel.com/docs/daemons/config-reference) — Every field you can set on a daemon in the daemons key of vercel.json.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [Get project daemons](https://vercel.com/docs/rest-api/daemons/get-project-daemons) — GET /v1/projects/{idOrName}/daemons — List the daemons of a project.

Full cross-link map for this page: [/docs/cli/daemons.graph.md](/docs/cli/daemons.graph.md)
<!-- /docsgraph:related -->

All daemon commands target **production**. They use your [linked project](/docs/cli/link) by default. To select another project, pass `--project <name-or-id>` and use [`--scope`](/docs/cli/global-options#scope) to select its team. Sign in with [`vercel login`](/docs/cli/login), or [authenticate in CI/CD](/docs/cli#using-in-a-cicd-environment).

For deployment, scaling, and shutdown behavior, see [Managing Daemons](/docs/daemons/managing-daemons).

## Usage

Run `vercel daemons` without a subcommand to list production daemons:

```bash filename="terminal"
vercel daemons
vercel daemons list
```

*Both commands list daemons for the linked project.*

## Commands

### list

List daemon names, status, and instance counts. `ls` is an alias for `list`:

```bash filename="terminal"
vercel daemons list --project my-app --scope my-team
vercel daemons list --limit 20 --json
vercel daemons list --next <cursor> --json
```

*List daemons for a project, or request a page of results.*

By default, the CLI fetches every page. Passing `--limit` or `--next` returns one page. JSON output includes `daemons` and `pagination.next`. Pass the next cursor to `--next`; `null` means there are no more results.

| Option | Description |
| --- | --- |
| `-n, --limit <number>` | Maximum results for one page, from 1 to 100. Defaults to all results when you omit both pagination options. |
| `--next <cursor>` | Fetch the next page using the cursor from a previous response. |

### inspect

Inspect a daemon by its name in your configuration:

```bash filename="terminal"
vercel daemons inspect worker
vercel daemons inspect worker --json
```

*Inspect the configuration and readiness of the \`worker\` daemon.*

The output includes the image, memory allocation, and regional instance counts. It also indicates whether scaling overrides differ from the deployed configuration.

### scale

Override instance counts by region:

```bash filename="terminal"
vercel daemons scale worker iad1=3 fra1=1
vercel daemons scale worker iad1=0
vercel daemons scale worker --reset
```

*Set regional counts, stop instances in one region, or restore the deployed
configuration.*

Each override uses `REGION=NUMBER`, with an integer from 0 to 100. Specify each region at most once. Regions you omit keep their existing counts. Overrides persist across deployments until you reset them.

Use `--reset` to clear the overrides and restore the instance counts from your deployed configuration. You can't combine `--reset` with regional overrides.

The command applies the change **without a confirmation prompt**. It returns after saving the override; instances start or stop asynchronously. Use `vercel daemons inspect worker` to check readiness. See [Scaling](/docs/daemons/managing-daemons#scaling-a-daemon) for more details.

### instances list

List instances across all daemons, or filter by daemon name. `ls` is an alias for `list`:

```bash filename="terminal"
vercel daemons instances list
vercel daemons instances list worker --json
```

*Find instance IDs, regions, and runtime status.*

Use the full `dmni_...` instance ID from this output with `instances inspect` and `instances restart`.

### instances inspect

Inspect one instance and its CPU, memory, and network metrics:

```bash filename="terminal"
vercel daemons instances inspect <instance-id>
vercel daemons instances inspect <instance-id> --since 24h --json
```

*Replace \`\<instance-id>\` with an ID from \`instances list\`.*

| Option | Description |
| --- | --- |
| `-s, --since <time>` | Start of the metrics window. Accepts an ISO 8601 timestamp or relative duration, such as `24h`. Defaults to one hour ago. |
| `-u, --until <time>` | End of the metrics window. Accepts an ISO 8601 timestamp or relative duration, such as `1h`. Defaults to now. |

Use a window of at least one second, with the start before the end. If metrics are unavailable, the command still returns instance details. JSON output includes `metrics: null` and a warning in this case.

### instances restart

Restart one instance by sending `SIGTERM` and scheduling a replacement container:

```bash filename="terminal"
vercel daemons instances restart <instance-id>
```

*Replace \`\<instance-id>\` with an ID from \`instances list\`.*

This command **doesn't prompt for confirmation**. A successful response means Vercel accepted the restart, not that the replacement is ready. Run `vercel daemons instances list` to check its status. If an error leaves the outcome unknown, inspect the instance before retrying.

## Common options

Each command above supports these options. For instance commands, include the subcommand, such as `instances list --json`:

| Option | Description |
| --- | --- |
| `-p, --project <name-or-id>` | Select an existing project. Defaults to the linked project. |
| `--json` | Output JSON. `--format=json` is equivalent. |

Non-interactive execution also uses JSON output. The CLI doesn't create or link a project as part of a daemon command.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel daemons` command:

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
