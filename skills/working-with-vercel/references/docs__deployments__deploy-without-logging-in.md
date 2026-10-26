---
title: Deploying to Vercel Without Logging In
product: vercel
url: /docs/deployments/deploy-without-logging-in
canonical_url: "https://vercel.com/docs/deployments/deploy-without-logging-in"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/deployments
related:
  - /docs/drop
  - /docs/cli/deploy
  - /docs/cli/signup
  - /docs/deployments/claim-deployments
  - /docs/cli/login
summary: Deploy to Vercel without an account using Vercel Drop or the CLI, then claim the project to keep it.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployments/deploy-without-logging-in.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "30359e42493eca53bf11df6225d43387f8f8f9848aa11e8b653c6ecdb17884fa"
---

# Deploying to Vercel Without Logging In

You can deploy to Vercel without an account and get a live URL in one step. Both paths produce a temporary deployment. It runs in production, and it expires after a server-set period unless you claim it. Claiming transfers the project to your Vercel account so you can keep deploying it.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deploy without an account using Vercel CLI](https://vercel.com/changelog/deploy-without-an-account-using-vercel-cli)
- [Deploy with Vercel Drop without an account](https://vercel.com/changelog/deploy-with-vercel-drop-without-an-account)
- [Vercel Drop vs Netlify Drop](https://vercel.com/kb/guide/vercel-drop-vs-netlify-drop) — Compare Vercel Drop and Netlify Drop for drag-and-drop deployment: framework builds, static sites, updates, size limits,
- [Deploy a Bolt.new app with Vercel Drop](https://vercel.com/kb/guide/bolt-vercel-drop) — Export your Bolt.new project as a .zip and deploy it to Vercel with Vercel Drop. Vercel detects the framework and builds
- [Deploy a Claude Design project to Vercel](https://vercel.com/kb/guide/claude-design) — Publish a Claude Design project to Vercel for a live production URL with the Vercel connector, or by exporting a .zip to
- [How to debug 404 errors](https://vercel.com/kb/guide/how-to-debug-404-errors) — Learn the systematic steps to identify and resolve 404 issues.
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [Deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments) — Vercel MCP tools for deployments.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.

Full cross-link map for this page: [/docs/deployments/deploy-without-logging-in.graph.md](/docs/deployments/deploy-without-logging-in.graph.md)
<!-- /docsgraph:related -->

There are two ways to do this:

- **[Vercel Drop](/docs/drop) in the browser.** Drag a file, folder, or `.zip` onto the page while logged out.
- **[`vercel deploy --temporary`](/docs/cli/deploy#temporary) from the CLI.** Deploy from the terminal with no credentials.

Neither path requires account setup before your first deploy, so a developer trying something out or an AI agent that needs to ship output can both get to a live URL right away.

## What a temporary deployment is

A temporary deployment is a deployment created without logging in. It always goes to production, so the URL serves your deployment the same way a claimed project would.

Every temporary deployment expires. The expiry is set server-side and shown to you where you deploy. The CLI prints how long you have, and Vercel Drop shows a countdown. Once a temporary deployment expires, it is gone and can no longer be claimed.

> **💡 Note:** The claim link controls the project. Anyone with it can claim the project, so don't share it. The CLI states this directly when it prints the link: `Claim it to keep it live (don't share this link)`.

## Deploy with Vercel Drop

Go to [vercel.com/drop](/drop) and drop a file, folder, or `.zip` while logged out. There is no signup step, no team prompt, and no project-name prompt. Vercel generates a project name and deploys immediately.

Accountless Drop supports static sites only. If Vercel detects a framework project, it asks you to sign up, because framework builds require an account. When you're signed in, Drop also builds framework projects. See [Vercel Drop](/docs/drop) for the full browser workflow.

Accountless drops have size limits:

- No single file over 100 MB.
- No more than 1 GB total.

Larger drops require an account. Each accountless drop creates a new project.

When the deployment is ready, Vercel shows the live URL alongside a **Claim your project** button and a countdown to expiry. The claim link is available on that success page in the browser you deployed from.

## Deploy with the CLI

Run `vercel deploy --temporary` with no credentials:

```bash filename="terminal"
vercel deploy --temporary
```

The CLI builds the project locally first, so framework projects work on this path, then deploys the output to production. When the deployment is ready, the CLI prints the claim URL and how long until the deployment expires.

Until the temporary project expires, you can run `vercel deploy --temporary` again to redeploy it. Once it expires, you can't redeploy it as a temporary deployment. Create an account with [`vercel signup`](/docs/cli/signup), then run `vercel deploy` to deploy it again.

This path is not available in CI environments or in a directory already linked to a Vercel project. For every flag and option, see the [`vercel deploy` reference](/docs/cli/deploy#temporary).

## Choosing a path

Both paths target production, return a claim URL, and expire after a server-set period. They differ in where you work and what they support:

| | Vercel Drop | `vercel deploy --temporary` |
| --- | --- | --- |
| Where you deploy | Browser | Terminal |
| Project type | Static sites only | Builds frameworks locally |
| Redeploys | New project per drop | Same temporary project until it expires |

## Claiming to keep your deployment

Claiming transfers the project to your Vercel account so it stops counting down and stays live. Open the claim URL from the CLI output or the **Claim your project** button in Vercel Drop, then follow the steps in [Claim a temporary deployment](/docs/deployments/claim-deployments#claim-a-temporary-deployment).

After claiming, log in to keep deploying the project. For CLI workflows, run [`vercel login`](/docs/cli/login).

## Related

- [Vercel Drop](/docs/drop) to deploy static sites and framework projects from the browser
- [`vercel deploy` reference](/docs/cli/deploy#temporary) for all flags and options when deploying from the CLI
- [Claim a temporary deployment](/docs/deployments/claim-deployments#claim-a-temporary-deployment) to transfer a temporary deployment to your account
- [`vercel login`](/docs/cli/login) to authenticate the CLI after claiming
- [Deployments](/docs/deployments) to understand how deployments work on Vercel


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
