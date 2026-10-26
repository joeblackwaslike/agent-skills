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
  - /docs/cli
  - /docs/cli/global-options
summary: Upgrade the Vercel CLI to the latest version and manage automatic updates with the vercel upgrade CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/upgrade.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "4bd448d58f1720220fe7bcc5a5b149e9106263eb5117518e3bbe9359e66a4139"
---

# vercel upgrade

The `vercel upgrade` command upgrades the Vercel CLI on your machine to the latest version published to npm. It detects which package manager you used to install the CLI and runs the corresponding upgrade command. You can also use this command to enable or disable automatic updates.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel rolling-release](https://vercel.com/docs/cli/rolling-release) — Learn how to manage your project's rolling releases using the vercel rolling-release CLI command.
- [vercel build](https://vercel.com/docs/cli/build) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [vercel setup](https://vercel.com/docs/cli/setup) — Set up coding agents for Vercel with one command: install the Vercel plugin for Claude Code and Codex, and connect your

Full cross-link map for this page: [/docs/cli/upgrade.graph.md](/docs/cli/upgrade.graph.md)
<!-- /docsgraph:related -->

Package-manager installations upgrade the `vercel` package, whether the CLI uses Node.js execution or native execution. If you installed the legacy `@vercel/vc-native` package directly, [migrate to `vercel`](/docs/cli#migrate-from-the-legacy-native-package) before upgrading.

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

### Enable binary

The `--enable-binary` option opts a package-manager installation into using its installed experimental native binary:

```bash filename="terminal"
vercel upgrade --enable-binary
```

*Enabling native execution when a native binary is installed.*

This saves a runtime preference; it doesn't install a separate package. Keep optional dependencies enabled when installing `vercel` so the matching native package is available.

### Disable binary

The `--disable-binary` option disables native execution and returns a package-manager installation to Node.js execution:

```bash filename="terminal"
vercel upgrade --disable-binary
```

*Disabling native execution through the Node.js launcher.*

The package's Node.js launcher handles this recovery command even if the native binary can't start. If you set `VERCEL_CLI_USE_NATIVE_BINARY=1` or `true`, remove that override so the saved opt-out takes effect.

### Format

The `--format` option, value `json`, emits the upgrade plan as JSON. This implies `--dry-run`, so no upgrade is performed.

```bash filename="terminal"
vercel upgrade --format=json
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
- [`--team`](/docs/cli/global-options#team)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
