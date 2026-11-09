---
title: vercel whoami
product: vercel
url: /docs/cli/whoami
canonical_url: "https://vercel.com/docs/cli/whoami"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
summary: Learn how to display the username of the currently logged in user with the vercel whoami CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/whoami.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "9239ba54fc7e9f10ccac7446c678426b4ae7955c25d11f59bb5a81c253694e12"
---

# vercel whoami

The `vercel whoami` command is used to show the username of the user currently logged into [Vercel CLI](/cli).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel login](https://vercel.com/docs/cli/login) — Learn how to login into your Vercel account using the vercel login CLI command.
- [vercel signup](https://vercel.com/docs/cli/signup) — Learn how to create a new Vercel account using the vercel signup CLI command.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel teams](https://vercel.com/docs/cli/teams) — Learn how to list, create, switch, invite, and manage your teams with the vercel teams CLI command.
- [vercel help](https://vercel.com/docs/cli/help) — Learn how to use the vercel help CLI command to get information about all available Vercel CLI commands.

Full cross-link map for this page: [/docs/cli/whoami.graph.md](/docs/cli/whoami.graph.md)
<!-- /docsgraph:related -->

In a terminal, the command also shows your active team and its plan, so you can check which team your commands run in. When you pipe the output to another command or redirect it to a file, the command prints only the username. If you're not logged in, the command exits with code `1`.

## Usage

```bash filename="terminal"
vercel whoami
```

*Using the \`vercel whoami\` command to view the username
of the user currently logged into Vercel CLI.*

## Unique options

These are options that only apply to the `vercel whoami` command.

### JSON

To read your account details and active team in a script, use the `--json` option:

```bash filename="terminal"
vercel whoami --json
```

*Using the \`vercel whoami\` command with the \`--json\` option.*

The JSON output includes:

- `username`, `email`, and `name`: The account you're logged in as
- `team`: The active team, with its `id`, `slug`, `name`, and `plan`

### Cached

To print your username without contacting Vercel, use the `--cached` option:

```bash filename="terminal"
vercel whoami --cached
```

*Using the \`vercel whoami\` command with the \`--cached\` option.*

The command prints the username that Vercel CLI saved the last time it looked up your account. It doesn't show the active team. If no username is saved, the command asks Vercel as usual.

The saved username can be out of date. To confirm that your login still works, run `vercel whoami` without `--cached`. The `--cached` option is available in Vercel CLI 65.0.0 and later.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel whoami` command:

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
