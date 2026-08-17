---
title: Deploying with Vercel Drop
product: vercel
url: /docs/drop
canonical_url: "https://vercel.com/docs/drop"
last_updated: 2026-06-16
type: how-to
prerequisites:
  []
related:
  - /docs/git
  - /docs/cli
  - /docs/rest-api
  - /docs/deployments/environments
  - /docs/deployments/managing-deployments
summary: Vercel Drop lets you deploy a file or folder by dragging it into your browser, with no Git or CLI required.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/drop.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "a18592427a3f7f0b1d9d379f2303c785b372b8e8c21e1169d1eb1ce345ee2a88"
---

# Deploying with Vercel Drop

Vercel Drop lets you deploy a file, folder, or `.zip` by dragging it into your browser, with no Git, Vercel CLI, or local setup. Vercel Drop works for static sites as well as framework projects, which Vercel detects and builds for you. That makes it well suited to prototypes and one-off sites.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Drop vs Netlify Drop](https://vercel.com/kb/guide/vercel-drop-vs-netlify-drop?from=related) — Compare Vercel Drop and Netlify Drop for drag-and-drop deployment: framework builds, static sites, updates, size limits,
- [Deploy a Bolt.new app with Vercel Drop](https://vercel.com/kb/guide/bolt-vercel-drop?from=related) — Export your Bolt.new project as a .zip and deploy it to Vercel with Vercel Drop. Vercel detects the framework and builds
- [Deploy a Claude Design project to Vercel](https://vercel.com/kb/guide/claude-design?from=related) — Publish a Claude Design project to Vercel for a live production URL with the Vercel connector, or by exporting a .zip to
- [Deploy a Google Stitch design with Vercel Drop](https://vercel.com/kb/guide/google-stitch-vercel-drop?from=related) — Download the HTML from your Google Stitch screens and deploy them to production with Vercel Drop, with no Git or CLI req
- [Vercel Drop vs Cloudflare Direct Upload](https://vercel.com/kb/guide/vercel-drop-vs-cloudflare-direct-upload?from=related) — Compare Vercel Drop and Cloudflare Direct Upload: framework builds, browser vs CLI workflows, file limits, Git integrati
- [Deployments](https://vercel.com/docs/deployments?from=related) — Learn how to create and manage deployments on Vercel.
- [Deploying from CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [Deploy from CLI](https://vercel.com/docs/projects/deploy-from-cli?from=related) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.

Full cross-link map for this page: [/docs/drop.graph.md](/docs/drop.graph.md)
<!-- /docsgraph:related -->

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
