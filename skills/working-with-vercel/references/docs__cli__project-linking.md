---
title: Linking Projects with Vercel CLI
product: vercel
url: /docs/cli/project-linking
canonical_url: "https://vercel.com/docs/cli/project-linking"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/projects/overview
  - /docs/cli/deploy
  - /docs/cli/link
summary: Learn how to link existing Vercel Projects with Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/project-linking.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "d059becf05a71884a658adcc3cb7de607bec67fa8e4c3767a96f1fcdd03e9261"
---

# Linking Projects with Vercel CLI

When running `vercel` in a directory for the first time, Vercel CLI needs to know which team and [Vercel Project](/docs/projects/overview) you
want to [deploy](/docs/cli/deploy) your directory to. You can choose to either [link](/docs/cli/link) an existing Vercel Project or to create a new one.

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
