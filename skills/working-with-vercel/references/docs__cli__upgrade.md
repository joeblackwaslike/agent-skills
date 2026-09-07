---
title: vercel upgrade
product: vercel
url: /docs/cli/upgrade
canonical_url: "https://vercel.com/docs/cli/upgrade"
last_updated: 2026-06-09
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
summary: Upgrade the Vercel CLI to the latest version and manage automatic updates with the vercel upgrade CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/upgrade.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "45f2ccbea4ac089e884f1425241ebdbc47786fbdaf86e20efaea97b4d7da8699"
---

# vercel upgrade

The `vercel upgrade` command upgrades the Vercel CLI on your machine to the latest version published to npm. It detects which package manager you used to install the CLI and runs the corresponding upgrade command. You can also use this command to enable or disable automatic updates.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel build](https://vercel.com/docs/cli/build?from=related&source_path=%2Fdocs%2Fcli%2Fupgrade&source_site=vercel-docs&relationship=related) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Fupgrade&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel api](https://vercel.com/docs/cli/api?from=related&source_path=%2Fdocs%2Fcli%2Fupgrade&source_site=vercel-docs&relationship=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel dev](https://vercel.com/docs/cli/dev?from=related&source_path=%2Fdocs%2Fcli%2Fupgrade&source_site=vercel-docs&relationship=related) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the
- [vercel rolling-release](https://vercel.com/docs/cli/rolling-release?from=related&source_path=%2Fdocs%2Fcli%2Fupgrade&source_site=vercel-docs&relationship=related) — Learn how to manage your project's rolling releases using the vercel rolling-release CLI command.

Full cross-link map for this page: [/docs/cli/upgrade.graph.md](/docs/cli/upgrade.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fupgrade&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel upgrade
```

*Upgrade the Vercel CLI to the latest published version.*

## Examples

### Upgrade to the latest version

```bash filename="terminal"
vercel upgrade
```

*Upgrade the Vercel CLI to the latest published version using the package
manager that installed it.*

### Preview the upgrade command without running it

```bash filename="terminal"
vercel upgrade --dry-run
```

*Print the command that would be executed without making any changes.*

### Enable automatic CLI updates

```bash filename="terminal"
vercel upgrade --enable-auto
```

*Opt into automatic Vercel CLI updates for future releases.*

### Disable automatic CLI updates

```bash filename="terminal"
vercel upgrade --disable-auto
```

*Opt out of automatic updates.*

### Get upgrade information as JSON

```bash filename="terminal"
vercel upgrade --format=json
```

*Emit the upgrade plan as JSON. Implies \`--dry-run\`; no upgrade is performed.*

## Unique options

These are options that only apply to the `vercel upgrade` command.

### Dry run

The `--dry-run` option prints the upgrade command that would be executed without running it.

```bash filename="terminal"
vercel upgrade --dry-run
```

*Show what would happen, without actually upgrading.*

### Enable auto

The `--enable-auto` option turns on automatic CLI updates for future releases.

```bash filename="terminal"
vercel upgrade --enable-auto
```

*Enable automatic updates.*

### Disable auto

The `--disable-auto` option turns off automatic CLI updates.

```bash filename="terminal"
vercel upgrade --disable-auto
```

*Disable automatic updates.*

### Format

The `--format` option, value `json`, emits the upgrade plan as JSON. This implies `--dry-run`, so no upgrade is performed.

```bash filename="terminal"
vercel upgrade --format=json
```

*Output the upgrade plan as JSON for scripting or agent workflows.*

> **💡 Note:** If `vercel upgrade` can't infer the package manager from a lockfile near the CLI
> install, it falls back to npm and runs `npm i -g vercel@latest` (or the
> non-global equivalent). Use `vercel upgrade --dry-run` first if you need to
> confirm exactly which command will run, then re-run without `--dry-run` (or run
> the printed command yourself) once you've reviewed it.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel upgrade` command:

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
