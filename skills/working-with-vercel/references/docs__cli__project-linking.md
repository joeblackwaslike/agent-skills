---
title: Linking Projects with Vercel CLI
product: vercel
url: /docs/cli/project-linking
canonical_url: "https://vercel.com/docs/cli/project-linking"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/projects
  - /docs/cli/deploy
  - /docs/cli/link
  - /docs/cli/global-options
summary: Learn how to link existing Vercel Projects with Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/project-linking.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "2aa7e6ee57e2f81ffcf015bbea25c0a926eb095ec9fc7ef3e6d64bb2d5ede0dd"
---

# Linking Projects with Vercel CLI

When running `vercel` in a directory for the first time, Vercel CLI needs to know which team and [Vercel Project](/docs/projects) you
want to [deploy](/docs/cli/deploy) your directory to. You can choose to either [link](/docs/cli/link) an existing Vercel Project or to create a new one.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I change the name of my Vercel Project?](https://vercel.com/kb/guide/how-do-i-change-the-name-of-my-vercel-project) — Change your Vercel project name in the dashboard, CLI, or REST API, then update the environment variables, callbacks, an
- [Observability](https://workflow-sdk.dev/docs/observability) — Inspect and debug workflow runs using the CLI and web UI.
- [Faster, predictable project linking in the Vercel CLI](https://vercel.com/changelog/faster-predictable-project-linking-in-the-vercel-cli)
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [vercel open](https://vercel.com/docs/cli/open) — Learn how to open your current project in the Vercel Dashboard using the vercel open CLI command.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [vercel dev](https://vercel.com/docs/cli/dev) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the

Full cross-link map for this page: [/docs/cli/project-linking.graph.md](/docs/cli/project-linking.graph.md)
<!-- /docsgraph:related -->

After you pick a team, the CLI searches that team for projects connected to your local Git repository. If it finds none, it searches for a project that matches your local directory name (after slugifying). The `Which project?` prompt lists the matches first, followed by options to search all projects or create a new project:

```bash filename="terminal"
vercel

  Directory       ~/web/my-lovely-project

? Which team? My Awesome Team (awesome-team)
? Which project? my-lovely-project (folder name)

✓ Linked          awesome-team/my-lovely-project
```

*Linking an auto-detected Vercel Project when the local directory name matches
an existing project in the selected team.*

If no project matches (or you don't want the suggested project), select `Search all projects` and choose an existing project from the list:

```bash filename="terminal"
vercel

  Directory       ~/web/release-notes

? Which team? My Awesome Team (awesome-team)
? Which project? Search all projects
? Which project? marketing-site

✓ Linked          awesome-team/marketing-site
```

*Linking an existing Vercel Project by name when no project matches the local
directory name.*

Once set up, a new `.vercel` directory is added to your directory. The `.vercel/project.json` file contains the `orgId` and `projectId` of your Vercel Project. If you link a project that the CLI found through your Git repository, the CLI saves the link in `.vercel/repo.json` at the root of the repository instead. To unlink your directory, remove the `.vercel` directory.

You can use the [`--yes` option](/docs/cli/deploy#yes) to skip the project questions. The `--yes` option does not choose a team. If you belong to more than one team, also pass the [`--scope` option](/docs/cli/global-options#scope).

## Framework detection

When you create a new Vercel Project, Vercel CLI [links](/docs/cli/link) the Vercel Project and automatically detects the framework you are using and offers default Project Settings accordingly.

```bash filename="terminal"
vercel

  Directory       ~/web/my-new-project

? Which team? My Awesome Team (awesome-team)
? Which project? Create a new project
? Name? my-new-project

  Detected Next.js (Build Command: next build, Output Directory: Next.js default)
? Customize settings? (y/N)
```

*Creating a new Vercel Project with the \`vercel\`
command.*

The status line shows **Build Command** and **Output Directory** inline. If you answer `y` to `Customize settings?`, the CLI presents a checklist for overriding the detected settings (Build Command, Development Command, Output Directory). You can continue with the defaults or override them now; you can also edit settings later in your Vercel Project dashboard.

## Relevant commands

- [deploy](/docs/cli/deploy)
- [link](/docs/cli/link)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
