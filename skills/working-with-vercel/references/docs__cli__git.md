---
title: vercel git
product: vercel
url: /docs/cli/git
canonical_url: "https://vercel.com/docs/cli/git"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/git
  - /docs/cli/global-options
summary: Learn how to manage your Git provider connections using the vercel git CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/git.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "405cefe6b2676c21b8dc752a4b0ca0695c03d9d7990bc9bd1c36b77568faa9f2"
---

# vercel git

The `vercel git` command is used to manage a Git provider repository for a Vercel Project,
enabling deployments to Vercel through Git.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Git settings](https://vercel.com/docs/project-configuration/git-settings) — Use the project settings to manage the Git connection, enable Git LFS, and create deploy hooks.
- [vercel link](https://vercel.com/docs/cli/link) — Learn how to link a local directory to a Vercel Project using the vercel link CLI command.
- [vercel setup](https://vercel.com/docs/cli/setup) — Set up coding agents for Vercel with one command: install the Vercel plugin for Claude Code and Codex, and connect your
- [vercel build](https://vercel.com/docs/cli/build) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [Git Configuration](https://vercel.com/docs/project-configuration/git-configuration) — Learn how to configure Git for your project through vercel.json or vercel.ts.

Full cross-link map for this page: [/docs/cli/git.graph.md](/docs/cli/git.graph.md)
<!-- /docsgraph:related -->

When run, Vercel CLI searches for a local `.git` config file containing at least one remote URL.
If found, you can connect it to the Vercel Project linked to your directory.

[Learn more about using Git with Vercel](/docs/git).

## Usage

```bash filename="terminal"
vercel git connect
```

*Using the \`vercel git\` command to connect a Git
provider repository from your local Git config to a Vercel Project.*

```bash filename="terminal"
vercel git disconnect
```

*Using the \`vercel git\` command to disconnect a
connected Git provider repository from a Vercel Project.*

## Unique Options

These are options that only apply to the `vercel git` command.

### Yes

The `--yes` option can be used to skip connect confirmation.

```bash filename="terminal"
vercel git connect --yes
```

*Using the \`vercel git connect\` command with the
\`--yes\` option.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel git` command:

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
