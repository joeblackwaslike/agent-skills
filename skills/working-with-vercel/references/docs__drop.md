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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/drop.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "a0763b1bc9d1f61f43f36a66b5937edbaf1b585f4778c0a7e497891318c37397"
---

# Deploying with Vercel Drop

Vercel Drop lets you deploy a file, folder, or `.zip` by dragging it into your browser, with no Git, Vercel CLI, or local setup. Static sites also work without an account, and you can claim them later to keep them live. Sign in to deploy framework projects, which Vercel detects and builds for you. That makes Vercel Drop well suited to prototypes and one-off sites.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Drop](https://vercel.com/changelog/vercel-drop)
- [Deploy with Vercel Drop without an account](https://vercel.com/changelog/deploy-with-vercel-drop-without-an-account)
- [Deploy a Bolt.new app with Vercel Drop](https://vercel.com/kb/guide/bolt-vercel-drop) — Export your Bolt.new project as a .zip and deploy it to Vercel with Vercel Drop. Vercel detects the framework and builds
- [Deploy a Google Stitch design with Vercel Drop](https://vercel.com/kb/guide/google-stitch-vercel-drop) — Download the HTML from your Google Stitch screens and deploy them to production with Vercel Drop, with no Git or CLI req
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Build Features for Customizing Deployments](https://vercel.com/docs/builds/build-features) — Learn how to customize your deployments using Vercel's build features.
- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.

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

Vercel deploys your site right away and gives you a live URL. The deployment is temporary, and the success page shows a countdown until it expires. To keep the site, select **Claim Project** and create a free account before the countdown ends. If the deployment expires, you can sign up and drop your files again.

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

## Related guides

- [Deploy a Claude Design project to Vercel](https://vercel.com/kb/guide/claude-design): Publish a Claude Design project to Vercel for a live production URL with the Vercel connector, or by exporting a .zip to Vercel Drop. No Git or CLI required.
- [Vercel Drop vs Cloudflare Direct Upload](https://vercel.com/kb/guide/vercel-drop-vs-cloudflare-direct-upload): Compare Vercel Drop and Cloudflare Direct Upload: framework builds, browser vs CLI workflows, file limits, Git integration paths, and when to choose each.
- [Export your Webflow site and host it on Vercel](https://vercel.com/kb/guide/webflow-vercel-drop): Learn how to export your Webflow site's code and host it on Vercel with Vercel Drop. Drag your .zip export into the browser for a live production URL with no Git or CLI setup.
- [Vercel Drop vs Netlify Drop](https://vercel.com/kb/guide/vercel-drop-vs-netlify-drop): Compare Vercel Drop and Netlify Drop for drag-and-drop deployment: framework builds, static sites, updates, size limits, and when to choose each one.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
