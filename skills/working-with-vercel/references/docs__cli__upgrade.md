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
  []
summary: Upgrade the Vercel CLI to the latest version and manage automatic updates with the vercel upgrade CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/upgrade.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "fa0018273b4079d2e3019e0656cce409f6061fcd2196d52d87caa353417eb15f"
---

# vercel upgrade

The `vercel upgrade` command upgrades the Vercel CLI on your machine to the latest version published to npm. It detects which package manager you used to install the CLI and runs the corresponding upgrade command. You can also use this command to enable or disable automatic updates.

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


---

[View full sitemap](/docs/sitemap)
