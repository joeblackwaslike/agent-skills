---
title: vercel inspect
product: vercel
url: /docs/cli/inspect
canonical_url: "https://vercel.com/docs/cli/inspect"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
summary: Learn how to retrieve information about your Vercel deployments using the vercel inspect CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/inspect.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "d2d7bddfcfb4d431736e708cdd2fee9bd76a1787e18ff525d95a59c8b8710a3f"
---

# vercel inspect

The `vercel inspect` command is used to retrieve information about a deployment referenced either by its deployment URL or ID.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Improvements to command line logs](https://vercel.com/changelog/improvements-to-command-line-logs)
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [vercel httpstat](https://vercel.com/docs/cli/httpstat) — Learn how to visualize HTTP request timing statistics for your Vercel deployments using the vercel httpstat CLI command.
- [vercel redeploy](https://vercel.com/docs/cli/redeploy) — Learn how to redeploy your project using the vercel redeploy CLI command.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.

Full cross-link map for this page: [/docs/cli/inspect.graph.md](/docs/cli/inspect.graph.md)
<!-- /docsgraph:related -->

You can use this command to view either a deployment's information or its [build logs](/docs/cli/inspect#logs).

## Usage

```bash filename="terminal"
vercel inspect [deployment-id or url]
```

*Using the \`vercel inspect\` command to retrieve
information about a specific deployment.*

## Unique Options

These are options that only apply to the `vercel inspect` command.

### Timeout

The `--timeout` option sets the time to wait for deployment completion. It defaults to 3 minutes.

Any valid time string for the [ms](https://www.npmjs.com/package/ms) package can be used.

```bash filename="terminal"
vercel inspect https://example-app-6vd6bhoqt.vercel.app --timeout=5m
```

*Using the \`vercel inspect\` command with the
\`--timeout\` option.*

### Wait

The `--wait` option blocks the CLI until the deployment completes or [`--timeout`](#timeout) expires. If the wait times out while the deployment is still in progress, the command exits with code `124`. A timeout does not mean the deployment is ready.

This is a command-specific exception to the [CLI exit-code contract](/docs/cli/global-options#exit-codes).

```bash filename="terminal"
vercel inspect https://example-app-6vd6bhoqt.vercel.app --wait
```

*Using the \`vercel inspect\` command with the
\`--wait\` option.*

### Logs

The `--logs` option, shorthand `-l`, prints the build logs instead of the deployment information.

```bash filename="terminal"
vercel inspect https://example-app-6vd6bhoqt.vercel.app --logs
```

*Using the \`vercel inspect\` command with the
\`--logs\` option, to view available build logs.*

If the deployment is queued or canceled, there will be no logs to display.

If the deployment is building, you may want to specify `--wait` option. The command will wait for build completion, and will display build logs as they are emitted.

```bash filename="terminal"
vercel inspect https://example-app-6vd6bhoqt.vercel.app --logs --wait
```

*Using the \`vercel inspect\` command with the
\`--logs\` and \`--wait\` options,
to view all build logs until the deployement is ready.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel inspect` command:

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
