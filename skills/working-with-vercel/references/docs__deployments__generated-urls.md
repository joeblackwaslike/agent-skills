---
title: Accessing Deployments through Generated URLs
product: vercel
url: /docs/deployments/generated-urls
canonical_url: "https://vercel.com/docs/deployments/generated-urls"
last_updated: 2026-08-11
type: conceptual
prerequisites:
  - /docs/deployments
related:
  - /docs/deployments
  - /docs/deployments/environments
  - /docs/deployment-retention
  - /docs/deployment-protection
  - /docs/projects
summary: When you create a new deployment, Vercel will automatically generate a unique URL which you can use to access that particular deployment.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployments/generated-urls.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "1e391b29007aed7426261812fe246d9825b7ab6ceaa02f25d6ca63114749022e"
---

# Accessing Deployments through Generated URLs

When you create a new [deployment](/docs/deployments) in either a preview or production [environment](/docs/deployments/environments), Vercel will automatically generate a unique URL in order for you to access that deployment. You can use this URL to access a particular deployment for as long as your set [deployment retention policy](/docs/deployment-retention#setting-a-deployment-retention-policy) allows.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Protect past Production Deployments with Deployment Protection](https://vercel.com/changelog/protect-past-production-deployments-with-deployment-protection?from=related&source_path=%2Fdocs%2Fdeployments%2Fgenerated-urls&source_site=vercel-docs&relationship=related)
- [Debug routing on Vercel](https://vercel.com/kb/guide/debug-routing-on-vercel?from=related&source_path=%2Fdocs%2Fdeployments%2Fgenerated-urls&source_site=vercel-docs&relationship=related) — Learn how to debug how Vercel decides where to route your request
- [How do I change the name of my Vercel Project?](https://vercel.com/kb/guide/how-do-i-change-the-name-of-my-vercel-project?from=related&source_path=%2Fdocs%2Fdeployments%2Fgenerated-urls&source_site=vercel-docs&relationship=related) — Change your Vercel project name in the dashboard, CLI, or REST API, then update the environment variables, callbacks, an
- [How to debug 404 errors](https://vercel.com/kb/guide/how-to-debug-404-errors?from=related&source_path=%2Fdocs%2Fdeployments%2Fgenerated-urls&source_site=vercel-docs&relationship=related) — Learn the systematic steps to identify and resolve 404 issues.
- [Build a multi-tenant app with Next.js and Vercel](https://vercel.com/kb/guide/nextjs-multi-tenant-application?from=related&source_path=%2Fdocs%2Fdeployments%2Fgenerated-urls&source_site=vercel-docs&relationship=related) — Create a Next.js application with multi-tenancy and custom domain support on Vercel.
- [Troubleshooting Cross-Origin Errors \\(net::ERR_BLOCKED_BY_ORB\\) with Deployment Protection](https://vercel.com/kb/guide/troubleshooting-cross-origin-errors-neterr-blocked-by-orb-with-deployment-protection?from=related&source_path=%2Fdocs%2Fdeployments%2Fgenerated-urls&source_site=vercel-docs&relationship=related) — Learn to resolve \\`net::ERR_BLOCKED_BY_ORB\\` errors on protected Vercel deployments. This guide explains how cross-origi
- [Agentic Infrastructure](https://vercel.com/blog/agentic-infrastructure?from=related&source_path=%2Fdocs%2Fdeployments%2Fgenerated-urls&source_site=vercel-docs&relationship=related)
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli?from=related&source_path=%2Fdocs%2Fdeployments%2Fgenerated-urls&source_site=vercel-docs&relationship=related) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related&source_path=%2Fdocs%2Fdeployments%2Fgenerated-urls&source_site=vercel-docs&relationship=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [Build Features for Customizing Deployments](https://vercel.com/docs/builds/build-features?from=related&source_path=%2Fdocs%2Fdeployments%2Fgenerated-urls&source_site=vercel-docs&relationship=related) — Learn how to customize your deployments using Vercel's build features.
- [Deploying Git Repositories with Vercel](https://vercel.com/docs/git?from=related&source_path=%2Fdocs%2Fdeployments%2Fgenerated-urls&source_site=vercel-docs&relationship=related) — Vercel automatically deploys supported Git repositories on every branch push and when changes merge into the production
- [Audit Logs](https://vercel.com/docs/audit-log?from=related&source_path=%2Fdocs%2Fdeployments%2Fgenerated-urls&source_site=vercel-docs&relationship=related) — Learn how to track and analyze your team members' activities.

Full cross-link map for this page: [/docs/deployments/generated-urls.graph.md](/docs/deployments/generated-urls.graph.md?from=related&source_path=%2Fdocs%2Fdeployments%2Fgenerated-urls&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

This URL is **publicly accessible by default**, but you can configure it to be private using [deployment protection](/docs/deployment-protection).

The make up of the URL depends on how it was created and if it relates to a branch of a specific commit. To learn more, see [URL Components](/docs/deployments/generated-urls#url-components).

## Viewing generated URLs

You can access these automatically generated URLs in the following ways:

- On the command line when the build has completed.
- When using Git, you can access either a URL for the branch or for each commit. To learn more, see [Generated from Git](#generated-from-git).
- Under the Project's Overview and Deployments tabs, as shown below:

![Image](`/docs-assets/static/docs/concepts/deployments/generated-url-prod-light.png`)

## URL Components

Generated URLs are comprised of several different pieces of data associated with the underlying deployment. Varying combinations of the following information may be used to generate a URL:

| Value            | Description                                                                                                         | Created when                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `<project-name>` | The name of the [Project](/docs/projects) that contains the deployment                                     | Git branch, Git commit, CLI |
| `<unique-hash>`  | 9 randomly generated numbers and letters                                                                            | Git commit                  |
| `<scope-slug>`   | The slug (not the name) of the account or [team](/docs/accounts#creating-a-team) that contains the project/deployment | Git branch, Git commit, CLI |
| `<branch-name>`  | The name of the Git branch for which the deployment was created                                                     | Git branch                  |

### Generated from Git

When are working with Git, Vercel will automatically generate a URL for the following:

- **The commit**: This URL will always show you a preview of changes from that specific commit. This is useful for sharing a specific version of your project at a point in time.
  ```bash filename="url-structure"
  <project-name>-<unique-hash>-<scope-slug>.vercel.app
  ```
- **The branch**: The URL generated from a Git branch will always show you the most recent changes for the branch and won't change if you push new commits to the branch. For this reason, this format is ideal for sharing with team members during your review process. The URL has the following structure:
  ```bash filename="url-structure"
  <project-name>-git-<branch-name>-<scope-slug>.vercel.app
  ```

To access the commit URL, click the **View deployment** button from your pull request. To access the branch URL, click the **Visit Preview** button from the pull request comment.

![Image](`/docs-assets/static/docs/concepts/deployments/git-link-light.png`)

### Generated with Vercel CLI

To access the URL for a successful deployment from Vercel CLI, you can save the [standard output of the deploy command](/docs/cli/deploy#standard-output-usage). The generated URL will have the following structure:

```bash filename="url-structure"
<project-name>-<scope-slug>.vercel.app;
```

> **💡 Note:** Once you deploy to the production environment, the above URL will point to the
> production deployment.

If the deployment is created on a [Team](/docs/accounts#creating-a-team), you can also use the URL specific to the deployment's author. It will have the following structure:

```bash filename="url-structure"
<project-name>-<author-name>-<scope-slug>.vercel.app;
```

This allows you to stay on top of the latest change deployed by a particular [member](/docs/rbac) of a team within a specific project.

### Truncation

If more than 63 characters are present before the `.vercel.app` suffix (or the respective [Preview Deployment Suffix](#preview-deployment-suffix)) for a generated URL, they will be truncated.

### Anti-phishing protection

If your `<project-name>` resembles a regular web domain, it may be shortened to avoid that resemblance. For example, `www-company-com` would be changed to just `company`. This is done to prevent an accidental trigger of anti-phishing protection built into web browsers that protect the user from visiting domains that look roughly like other domains they visit.

## Preview Deployment Suffix

> **🔒 Permissions Required**: Preview Deployment Suffix

Preview Deployment Suffixes allow you to customize the URL of a [preview deployment](/docs/deployments/environments#preview-environment-pre-production) by replacing the default `vercel.app` suffix with a [custom domain](/docs/domains/working-with-domains/add-a-domain) of your choice.

To learn more, see the [Preview Deployment Suffix](/docs/deployments/preview-deployment-suffix) documentation.


---

[View full sitemap](/docs/sitemap)
