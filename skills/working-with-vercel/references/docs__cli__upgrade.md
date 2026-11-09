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
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "08c69c2fdf99f91d962826ab6394338e80740d6127de72b12c6618ac0930a9b7"
---

# vercel upgrade

The `vercel upgrade` command upgrades the Vercel CLI on your machine to the latest version published to npm. It detects which package manager you used to install the CLI and runs the corresponding upgrade command. You can also use this command to enable or disable automatic updates.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel changelog](https://vercel.com/docs/cli/changelog) — Read recent Vercel product updates and search the changelog from your terminal using the Vercel CLI.
- [vercel rolling-release](https://vercel.com/docs/cli/rolling-release) — Learn how to manage your project's rolling releases using the vercel rolling-release CLI command.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel doctor](https://vercel.com/docs/cli/doctor) — Learn how to check your Vercel CLI setup and fix problems with the vercel doctor CLI command.

Full cross-link map for this page: [/docs/cli/upgrade.graph.md](/docs/cli/upgrade.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** If `vercel upgrade` can't detect a supported global package-manager
> installation, it exits with an error. Update the CLI with the package manager
> that installed it. Use `vercel upgrade --dry-run` to inspect the upgrade
> command before running it.

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

### Turn automatic CLI updates on or off

```bash filename="terminal"
vercel upgrade --autoupdate
```

*Opt into automatic Vercel CLI updates for future releases.*

```bash filename="terminal"
vercel upgrade --no-autoupdate
```

*Opt out of automatic updates.*

### Get upgrade information as JSON

```bash filename="terminal"
vercel upgrade --json
```

*Emit the upgrade plan as JSON. Implies \`--dry-run\`; no upgrade is performed.*

### Install a specific version

```bash filename="terminal"
vercel upgrade 59.11.7
```

*Install an exact Vercel CLI version. Use the full \`major.minor.patch\` version.*

### Install the newest release that your package manager allows

```bash filename="terminal"
vercel upgrade latest
```

*Use this when your package manager's minimum release
age blocks the newest release. Your package manager
installs the newest release that its settings allow.*

## Unique options

These are options that only apply to the `vercel upgrade` command.

### Dry run

The `--dry-run` option prints the upgrade command that would be executed without running it.

```bash filename="terminal"
vercel upgrade --dry-run
```

*Show what would happen, without actually upgrading.*

### Automatic updates

The `--autoupdate` option turns on automatic CLI updates for future releases:

```bash filename="terminal"
vercel upgrade --autoupdate
```

*Enable automatic updates.*

The `--no-autoupdate` option turns them off:

```bash filename="terminal"
vercel upgrade --no-autoupdate
```

*Disable automatic updates.*

Both options change the setting only and don't run an upgrade.

### Minimum release age

npm and pnpm can hold back a package release until it reaches a minimum age. If that setting blocks the newest Vercel CLI release, `vercel upgrade` doesn't install it. It shows you two options: keep the check or skip it.

To keep the check, run `vercel upgrade latest`. Your package manager installs the newest release that its settings allow.

To skip the check and install the newest release, use the `--bypass-min-release-age` option:

```bash filename="terminal"
vercel upgrade --bypass-min-release-age
```

*Upgrade to the newest release without the package manager's minimum
release-age check.*

The CLI remembers this choice for later upgrades that you run. [Automatic updates](#automatic-updates) always follow your package manager's settings.

To turn the check back on, use the `--no-bypass-min-release-age` option. It changes the setting only and doesn't run an upgrade:

```bash filename="terminal"
vercel upgrade --no-bypass-min-release-age
```

*Turn the minimum release-age check back on.*

The `--bypass-min-release-age` option works only when you installed the CLI with npm or pnpm.

### JSON

The `--json` option emits the upgrade plan as JSON. This implies `--dry-run`, so no upgrade is performed.

```bash filename="terminal"
vercel upgrade --json
```

*Output the upgrade plan as JSON for scripting or agent workflows.*

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
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
