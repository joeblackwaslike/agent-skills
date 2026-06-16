---
title: Vercel Drop
product: vercel
url: /docs/drop
canonical_url: "https://vercel.com/docs/drop"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  []
related:
  - /docs/git
  - /docs/cli
  - /docs/rest-api
  - /docs/deployments/environments
  - /docs/deployments/managing-deployments
summary: Learn about vercel drop on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/drop.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "c9155864993c91338e84399feaf847bf6a06f7fc060e0efc4ffd369d59eabb44"
---

# Deploying with Vercel Drop

Vercel Drop lets you deploy a file, folder, or `.zip` by dragging it into your browser, with no Git, Vercel CLI, or local setup. Vercel Drop works for static sites as well as framework projects, which Vercel detects and builds for you. That makes it well suited to prototypes and one-off sites.

## When to use Vercel Drop

Use Vercel Drop when you have a project ready to ship and don't want to connect a repository or use the CLI. If you need a deployment on every push, use Vercel's Git integration instead. The table below compares the deployment methods:

| Method                       | Needs Git | Needs CLI | Best for                                   |
| ---------------------------- | --------- | --------- | ------------------------------------------ |
| Vercel Drop                  | No        | No        | One-off uploads, static sites, prototypes  |
| [Git](/docs/git)             | Yes       | No        | Continuous deployment on every push        |
| [Vercel CLI](/docs/cli)      | No        | Yes       | Local and CI deploys, scripting            |
| [REST API](/docs/rest-api)   | No        | No        | Programmatic and multi-tenant workflows    |

## Deploy a file or folder

You need a Vercel account and a file or folder to deploy. To create a deployment:

1. Go to [vercel.com/drop](/drop).
2. Drag and drop a file, folder, or `.zip` onto the page, or choose a **file** or **folder** to upload.
3. Choose the Vercel team to deploy to and enter a project name.
4. Select **Deploy**.

Vercel creates a new project, uploads your files, and publishes it straight to production. When it finishes, you get a live URL for your site.

## Choose your homepage

For a static site with no `index.html` at the top of your folder, Vercel asks which page people should see first when they open your site. Pick one from the **Root (/)** menu, or choose **No root page** if you don't want a homepage. With no root page, your site's root (`/`) returns a 404, though Vercel still serves each file at its own path.

## Limitations

- Each drop creates a new project. Vercel Drop doesn't redeploy into an existing project.
- The project isn't connected to Git, so pushes don't trigger new deployments. [Connect a Git repository](/docs/git) afterward if you want automatic deployments.
- Files upload from your browser, so larger folders take longer on slower connections.

## Next steps

- [Deploy from Git](/docs/git) for automatic deployments on every push.
- [Deploy with the Vercel CLI](/docs/cli) from your terminal or CI/CD pipeline.
- [Environments](/docs/deployments/environments) to understand local, preview, and production.
- [Managing deployments](/docs/deployments/managing-deployments) to redeploy, inspect, and promote.


---

[View full sitemap](/docs/sitemap)
