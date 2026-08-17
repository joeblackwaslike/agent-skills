---
title: Linking Projects with Vercel CLI
product: vercel
url: /docs/cli/project-linking
canonical_url: "https://vercel.com/docs/cli/project-linking"
last_updated: 2026-06-09
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/projects
  - /docs/cli/deploy
  - /docs/cli/link
summary: Learn how to link existing Vercel Projects with Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/project-linking.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "73715cef009c1a310f1234a2c18dca4663123b37b180c32161747dc925ea4678"
---

# Linking Projects with Vercel CLI

When running `vercel` in a directory for the first time, Vercel CLI needs to know which team and [Vercel Project](/docs/projects) you
want to [deploy](/docs/cli/deploy) your directory to. You can choose to either [link](/docs/cli/link) an existing Vercel Project or to create a new one.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I change the name of my Vercel Project?](https://vercel.com/kb/guide/how-do-i-change-the-name-of-my-vercel-project?from=related) — Change your Vercel project name in the dashboard, CLI, or REST API, then update the environment variables, callbacks, an
- [Observability](https://workflow-sdk.dev/docs/observability?from=related) — Inspect and debug workflow runs using the CLI and Web UI.
- [Deploy from CLI](https://vercel.com/docs/projects/deploy-from-cli?from=related) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Deploying from CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [vercel open](https://vercel.com/docs/cli/open?from=related) — Learn how to open your current project in the Vercel Dashboard using the vercel open CLI command.
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Deployments](https://vercel.com/docs/deployments?from=related) — Learn how to create and manage deployments on Vercel.

Full cross-link map for this page: [/docs/cli/project-linking.graph.md](/docs/cli/project-linking.graph.md)
<!-- /docsgraph:related -->

After you pick a team, the CLI searches that team for an existing project that matches your local directory name (after slugifying). If it finds one, it offers to link to it directly. Otherwise it falls through to the manual selection flow shown later in this page.

```bash filename="terminal"
vercel

  Set up "~/web/my-lovely-project"
? Which team? My Awesome Team
? Found project "awesome-team/my-lovely-project". Link to it? [Y/n] y
  Linked      awesome-team/my-lovely-project
```

*Linking an auto-detected Vercel Project when the local directory name matches
an existing project in the selected team.*

If no project matches the directory name (or you choose not to link to the suggestion), the CLI falls back to a manual prompt:

```bash filename="terminal"
vercel

  Set up "~/web/release-notes"
? Which team? My Awesome Team
? Link to existing project? [y/N] y
? Existing project name? marketing-site
  Linked      awesome-team/marketing-site
```

*Linking an existing Vercel Project by name when no project matches the local
directory name.*

Once set up, a new `.vercel` directory is added to your directory. The `.vercel/project.json` file contains the `orgId` and `projectId` of your Vercel Project. To unlink your directory, remove the `.vercel` directory.

You can use the [`--yes` option](/docs/cli/deploy#yes) to skip these questions.

## Framework detection

When you create a new Vercel Project, Vercel CLI [links](/docs/cli/link) the Vercel Project and automatically detects the framework you are using and offers default Project Settings accordingly.

```bash filename="terminal"
vercel

  Set up "~/web/my-new-project"
? Which team? My Awesome Team
? Link to existing project? [y/N] n
? Name? my-new-project
  Detected Next.js (Build Command: next build, Output Directory: Next.js default)
? Customize settings? [y/N]
```

*Creating a new Vercel Project with the \`vercel\`
command.*

The status line shows **Build Command** and **Output Directory** inline. If you answer `y` to `Customize settings?`, the CLI presents a checklist for overriding the detected settings (Build Command, Development Command, Output Directory). You can continue with the defaults or override them now; you can also edit settings later in your Vercel Project dashboard.

## Relevant commands

- [deploy](/docs/cli/deploy)
- [link](/docs/cli/link)


---

[View full sitemap](/docs/sitemap)
