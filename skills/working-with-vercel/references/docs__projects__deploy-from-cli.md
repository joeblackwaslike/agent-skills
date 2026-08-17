---
title: Deploying a project from the CLI
product: vercel
url: /docs/projects/deploy-from-cli
canonical_url: "https://vercel.com/docs/projects/deploy-from-cli"
last_updated: 2026-07-23
type: how-to
prerequisites:
  - /docs/projects
related:
  - /docs/deployments/environments
  - /docs/cli/link
  - /docs/cli/env
  - /docs/cli/deploy
  - /docs/cli/domains
summary: Set up and deploy a Vercel project using the CLI, from linking to production.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/projects/deploy-from-cli.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "ef88ab4c744999ca4f20020e9662dc37f87f18945cda80d79b83033fc5092f19"
---

# Deploying a project from the CLI

Use this guide to set up and deploy a Vercel project entirely from the CLI. You'll link your local project, pull environment variables, test locally, deploy a preview, and go live with a custom domain.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I use CircleCI with Vercel?](https://vercel.com/kb/guide/how-can-i-use-circleci-with-vercel?from=related) — Learn how to use CircleCI to deploy to Vercel with custom CI/CD.
- [How to Deploy a Vue.js Site with Vercel](https://vercel.com/kb/guide/deploying-vuejs-to-vercel?from=related) — Create your Vue.js app and deploy it with Vercel.
- [Can you deploy based on tags/releases on Vercel?](https://vercel.com/kb/guide/can-you-deploy-based-on-tags-releases-on-vercel?from=related) — Learn how to deploy based on tags/releases on Vercel.
- [Deploying from CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [Deployments](https://vercel.com/docs/deployments?from=related) — Learn how to create and manage deployments on Vercel.
- [Project Linking](https://vercel.com/docs/cli/project-linking?from=related) — Learn how to link existing Vercel Projects with Vercel CLI.
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Git Integrations](https://vercel.com/docs/git?from=related) — Vercel allows for automatic deployments on every branch push and merges onto the production branch of your GitHub, GitLa

Full cross-link map for this page: [/docs/projects/deploy-from-cli.graph.md](/docs/projects/deploy-from-cli.graph.md)
<!-- /docsgraph:related -->

## Quick reference

Use this block when you already know what you're doing and want the full command sequence. Use the steps below for context and checks.

```bash filename="terminal"
# 1. Link your local directory to a Vercel project
vercel link

# 2. Pull environment variables for local development
vercel env pull .env.local

# 3. Develop locally (use your framework's dev command, or vercel dev)
vercel env run -- npm run dev

# 4. Deploy a preview
vercel deploy

# 5. Verify the preview
vercel curl / --deployment <preview-url>
vercel logs --deployment <preview-deployment-id> --level error

# 6. Deploy to production
vercel deploy --prod

# 7. Add a custom domain (if needed; one arg when run from the linked project)
vercel domains add example.com
vercel domains inspect example.com

# 8. Confirm production is live
vercel curl / --deployment <production-url>
vercel logs --environment production --level error --since 5m
```

## 1. Link your project

Connect your local directory to an existing Vercel project. If the project doesn't exist yet on Vercel, this command creates it:

```bash filename="terminal"
vercel link
```

This creates a `.vercel` directory in your project with the project and org configuration. The command is interactive and will prompt you to select your team and project.

For CI/CD or non-interactive environments, use the `--yes` flag:

```bash filename="terminal"
vercel link --yes
```

## 2. Pull environment variables

Download your project's environment variables so you can use them during local development:

```bash filename="terminal"
vercel env pull .env.local
```

This writes development environment variables to `.env.local`. If you need environment variables for a different target:

```bash filename="terminal"
vercel env pull --environment=preview
```

> **💡 Note:** If you're using `vercel dev` or `vercel build`, use `vercel pull` instead.
> These commands read from the `.vercel/` directory rather than `.env` files.

To list all configured environment variables without downloading them:

```bash filename="terminal"
vercel env ls
```

## 3. Develop locally

Start your local development server. If your framework has its own dev command (like `next dev` or `vite dev`), use that directly since it provides native support for your framework's features.

If you need to test Vercel-specific features like Vercel Functions or Middleware locally:

```bash filename="terminal"
vercel dev
```

You can also run your framework's dev command with Vercel environment variables injected:

```bash filename="terminal"
vercel env run -- npm run dev
```

This fetches environment variables from your linked project and passes them to your dev command without writing them to a file.

## 4. Deploy a preview

When you're ready to test your changes in a production-like environment, create a preview deployment:

```bash filename="terminal"
vercel deploy
```

This outputs a deployment URL. For an existing project that already has a production deployment, this creates a preview deployment and uses your preview environment variables.

> **💡 Note:** If this is the [first deployment](/docs/deployments/environments#first-deployment)
> of a new project, Vercel creates a production deployment even without
> `--prod`. After that, `vercel deploy` creates preview deployments.

If you want to see the build logs while deploying:

```bash filename="terminal"
vercel deploy --logs
```

## 5. Verify the preview

Test the preview deployment to make sure everything works. Use `vercel curl` to hit specific routes through deployment protection:

```bash filename="terminal"
vercel curl / --deployment <preview-url>
```

Check for errors in the preview deployment's logs:

```bash filename="terminal"
vercel logs --deployment <preview-deployment-id> --level error
```

## 6. Deploy to production

Once the preview looks good, deploy to production:

```bash filename="terminal"
vercel deploy --prod
```

This builds and deploys your project to the production environment, and the deployment gets assigned to your production domain automatically.

## 7. Add a custom domain

If you haven't configured a custom domain yet, add one. From a linked project, `vercel domains add` takes a single argument (the domain). Pass a project name as a second argument only when running outside of a linked directory:

```bash filename="terminal"
vercel domains add example.com
```

To see all domains currently configured:

```bash filename="terminal"
vercel domains ls
```

After adding a domain, Vercel automatically provisions an SSL certificate. You'll need to update your DNS records to point to Vercel. Use `vercel domains inspect` to see the required DNS configuration:

```bash filename="terminal"
vercel domains inspect example.com
```

## 8. Confirm production is live

Verify your production deployment is serving traffic correctly:

```bash filename="terminal"
vercel curl / --deployment <production-url>
```

Check production logs for any unexpected errors:

```bash filename="terminal"
vercel logs --environment production --level error --since 5m
```

## Ongoing workflow

After the initial setup, your day-to-day workflow simplifies to:

1. Make changes locally
2. Deploy a preview: `vercel deploy`
3. Verify the preview
4. Ship to production: `vercel deploy --prod`

If you connect a Git repository, Vercel also creates preview deployments automatically for every push and pull request.

## Related

- [vercel link](/docs/cli/link)
- [vercel env](/docs/cli/env)
- [vercel deploy](/docs/cli/deploy)
- [vercel domains](/docs/cli/domains)
- [Vercel CLI overview](/docs/cli)


---

[View full sitemap](/docs/sitemap)
