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
  - /docs/deployments/deploy-without-logging-in
  - /docs/deployments/environments
summary: Vercel Drop lets you deploy a file or folder by dragging it into your browser, with no Git or CLI required. It also works without an account.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/drop.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "f1822ea289ddfe49e7ffe784b248ecf385ed630d877739e599e563881fda56c8"
---

# Deploying with Vercel Drop

Vercel Drop lets you deploy a file, folder, or `.zip` by dragging it into your browser, with no Git, Vercel CLI, or local setup. Static sites also work without an account, and you can claim them later to keep them live. Sign in to deploy framework projects, which Vercel detects and builds for you. That makes Vercel Drop well suited to prototypes and one-off sites.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Drop vs Netlify Drop](https://vercel.com/kb/guide/vercel-drop-vs-netlify-drop) — Compare Vercel Drop and Netlify Drop for drag-and-drop deployment: framework builds, static sites, updates, size limits,
- [Deploy with Vercel Drop without an account](https://vercel.com/changelog/deploy-with-vercel-drop-without-an-account)
- [Introducing Vercel Drop](https://vercel.com/changelog/vercel-drop)
- [Deploy a Bolt.new app with Vercel Drop](https://vercel.com/kb/guide/bolt-vercel-drop) — Export your Bolt.new project as a .zip and deploy it to Vercel with Vercel Drop. Vercel detects the framework and builds
- [Deploy a Claude Design project to Vercel](https://vercel.com/kb/guide/claude-design) — Publish a Claude Design project to Vercel for a live production URL with the Vercel connector, or by exporting a .zip to
- [Deploy a Google Stitch design with Vercel Drop](https://vercel.com/kb/guide/google-stitch-vercel-drop) — Download the HTML from your Google Stitch screens and deploy them to production with Vercel Drop, with no Git or CLI req
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Deploying GitLab Projects with Vercel](https://vercel.com/docs/git/vercel-for-gitlab) — ​Vercel for GitLab automatically deploys your GitLab projects with Vercel, providing Preview Deployment URLs, and automa
- [Deploy a Lovable app on Vercel](https://vercel.com/docs/integrations/lovable) — Deploy your Lovable project to Vercel using GitHub sync and zero-configuration TanStack Start detection.
- [Projects overview](https://vercel.com/docs/projects) — A project is where you deploy and operate frontend apps, APIs, backends, containers, and agent workloads on Vercel.

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

## Deploy without an account

You can deploy a static site without an account. To create a deployment:

1. Go to [vercel.com/drop](/drop).
2. Drag and drop a file, folder, or `.zip` onto the page, or choose a **file** or **folder** to upload.

Vercel deploys your site right away and gives you a live URL. The deployment is temporary, and the success page shows a countdown until it expires. To keep the site, select **Claim your project** and create a free account before the countdown ends. If the deployment expires, you can sign up and drop your files again.

If you drop a framework project, or a drop that exceeds the [anonymous limits](#limitations), Vercel asks you to sign up first. To deploy from a terminal without an account, see [Deploying without logging in](/docs/deployments/deploy-without-logging-in).

## Deploy with an account

When you're signed in, you can deploy static sites and framework projects to one of your teams. To create a deployment:

1. Go to [vercel.com/drop](/drop).
2. Drag and drop a file, folder, or `.zip` onto the page, or choose a **file** or **folder** to upload.
3. Choose the Vercel team to deploy to and enter a project name.
4. Select **Deploy**.

Vercel creates a new project, uploads your files, and publishes it straight to production. When it finishes, you get a live URL for your site.

## Choose your homepage

For a static site with no `index.html` at the top of your folder, Vercel asks which page people should see first when they open your site. Pick one from the **Root (/)** menu, or choose **No root page** if you don't want a homepage. With no root page, your site's root (`/`) returns a 404, though Vercel still serves each file at its own path.

## Keep iterating on a dropped project

A dropped project has no Git connection, so pushes don't create deployments. If you deployed without an account, claim the project first. After the first deploy, you can keep iterating in these ways:

- Drop a folder onto the project in the Vercel dashboard. Vercel creates a new production deployment of that project.
- Continue in [v0](https://v0.app) if the project is available there, or deploy from a terminal or coding agent with [Vercel CLI](/docs/cli).
- Delete the project in Settings, then drop a folder on [vercel.com/new](/new) or [vercel.com/drop](/drop) to create a new project.

## Limitations

- Without an account, you can only drop static sites. Each file can be up to 100 MB, and the whole drop up to 1 GB.
- Deployments without an account expire unless you claim them.
- Dropping onto an existing project requires an account.
- Dropping on [vercel.com/new](/new) or [vercel.com/drop](/drop) creates a new project.
- Dropping onto a project with no Git connection creates a new production deployment of that project.
- The project isn't connected to Git, so pushes don't trigger new deployments. [Connect a Git repository](/docs/git) afterward if you want automatic deployments.
- Files upload from your browser, so larger folders take longer on slower connections.

## Next steps

- [Deploy from Git](/docs/git) for automatic deployments on every push.
- [Deploy with the Vercel CLI](/docs/cli) from your terminal or CI/CD pipeline.
- [Environments](/docs/deployments/environments) to understand local, preview, and production.
- [Managing deployments](/docs/deployments/managing-deployments) to redeploy, inspect, and promote.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
