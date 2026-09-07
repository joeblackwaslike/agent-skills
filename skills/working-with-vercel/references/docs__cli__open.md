---
title: vercel open
product: vercel
url: /docs/cli/open
canonical_url: "https://vercel.com/docs/cli/open"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli
  - /docs/cli/project-linking
  - /docs/cli/link
  - /docs/cli/global-options
  - /docs/cli/project
summary: Learn how to open your current project in the Vercel Dashboard using the vercel open CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/open.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "595918758ef8f6a5ffc4e3c9009065d738979b0957a42d571b1ae888d99af640"
---

# vercel open

The `vercel open` command opens your current project in the Vercel Dashboard. It automatically opens your default browser to the project's dashboard page, making it easy to access project settings, deployments, and other configuration options.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Open your Vercel dashboard from the Vercel CLI](https://vercel.com/changelog/open-your-vercel-dashboard-from-the-vercel-cli?from=related&source_path=%2Fdocs%2Fcli%2Fopen&source_site=vercel-docs&relationship=related)
- [vercel login](https://vercel.com/docs/cli/login?from=related&source_path=%2Fdocs%2Fcli%2Fopen&source_site=vercel-docs&relationship=related) — Learn how to login into your Vercel account using the vercel login CLI command.
- [vercel dev](https://vercel.com/docs/cli/dev?from=related&source_path=%2Fdocs%2Fcli%2Fopen&source_site=vercel-docs&relationship=related) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the
- [vercel api](https://vercel.com/docs/cli/api?from=related&source_path=%2Fdocs%2Fcli%2Fopen&source_site=vercel-docs&relationship=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel connect](https://vercel.com/docs/cli/connect?from=related&source_path=%2Fdocs%2Fcli%2Fopen&source_site=vercel-docs&relationship=related) — Learn how to manage Vercel Connect connectors using the vercel connect CLI command.
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Fopen&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.

Full cross-link map for this page: [/docs/cli/open.graph.md](/docs/cli/open.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fopen&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** This command is available in Vercel CLI v48.10.0 and later. If you're using an older version, see [Updating Vercel CLI](/docs/cli#updating-vercel-cli).

This command requires your directory to be [linked to a Vercel project](/docs/cli/project-linking). If you haven't linked your project yet, run [`vercel link`](/docs/cli/link) first.

## Usage

```bash filename="terminal"
vercel open
```

*Using the \`vercel open\` command to open the current
project in the Vercel Dashboard.*

## How it works

When you run `vercel open`:

1. The CLI checks if your current directory is linked to a Vercel project
2. It retrieves the project information, including the team slug and project name
3. It constructs the dashboard URL for your project
4. It opens the URL in your default browser

The command opens the project's main dashboard page at `https://vercel.com/{team-slug}/{project-name}`, where you can view deployments, configure settings, and manage your project.

## Examples

### Open the current project

From a linked project directory:

```bash filename="terminal"
vercel open
```

*Opening the current project in the Vercel Dashboard.*

This opens your browser to the project's dashboard page.

## Troubleshooting

### Project not linked

If you see an error that the command requires a linked project:

```bash filename="terminal"
# Link your project first
vercel link

# Then open it
vercel open
```

*Linking your project before opening it in the dashboard.*

Make sure you're in the correct directory where your project files are located.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel open` command:

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

## Related

- [vercel link](/docs/cli/link)
- [vercel project](/docs/cli/project)
- [Project Linking](/docs/cli/project-linking)


---

[View full sitemap](/docs/sitemap)
