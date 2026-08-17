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
  - /docs/cli/project
summary: Learn how to open your current project in the Vercel Dashboard using the vercel open CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/open.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "c4ecad97b659673f4ac837c5f4ee2859b5f5336259b70a1cddaae08cd829ff1c"
---

# vercel open

The `vercel open` command opens your current project in the Vercel Dashboard. It automatically opens your default browser to the project's dashboard page, making it easy to access project settings, deployments, and other configuration options.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel login](https://vercel.com/docs/cli/login?from=related) — Learn how to login into your Vercel account using the vercel login CLI command.
- [Deploy from CLI](https://vercel.com/docs/projects/deploy-from-cli?from=related) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [vercel dev](https://vercel.com/docs/cli/dev?from=related) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the
- [Deploying from CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.

Full cross-link map for this page: [/docs/cli/open.graph.md](/docs/cli/open.graph.md)
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

## Related

- [vercel link](/docs/cli/link)
- [vercel project](/docs/cli/project)
- [Project Linking](/docs/cli/project-linking)


---

[View full sitemap](/docs/sitemap)
