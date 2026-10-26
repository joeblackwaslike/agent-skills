---
title: Git settings
product: vercel
url: /docs/project-configuration/git-settings
canonical_url: "https://vercel.com/docs/project-configuration/git-settings"
last_updated: 2026-08-25
type: reference
prerequisites:
  - /docs/project-configuration
related:
  - /docs/git
  - /docs/project-configuration/project-settings
  - /docs/deployments/managing-deployments
  - /docs/deploy-hooks
summary: Use the project settings to manage the Git connection, enable Git LFS, and create deploy hooks.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/project-configuration/git-settings.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "5209ea0ad75793440aaada8245c9608ca4fc804568cb84752ffbd4fff0dd2d19"
---

# Git settings

Once you have [connected a Git repository](/docs/git#deploying-a-git-repository), select the **Git** menu item from your project settings page to edit your project's Git settings. These settings include:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deployments can now require cryptographically-verified commits](https://vercel.com/changelog/deployments-can-now-require-cryptographically-verified-commits)
- [Edit Git settings for all projects in a repo](https://vercel.com/changelog/edit-git-settings-for-all-projects-in-a-repo)
- [Repository checkout and Git LFS downloads are now faster](https://vercel.com/changelog/repository-checkout-and-git-lfs-downloads-are-now-faster)
- [New Git Integration Settings](https://vercel.com/blog/new-git-integration-settings)
- [Git Configuration](https://vercel.com/docs/project-configuration/git-configuration) — Learn how to configure Git for your project through vercel.json or vercel.ts.
- [Deploying GitLab Projects with Vercel](https://vercel.com/docs/git/vercel-for-gitlab) — ​Vercel for GitLab automatically deploys your GitLab projects with Vercel, providing Preview Deployment URLs, and automa
- [vercel git](https://vercel.com/docs/cli/git) — Learn how to manage your Git provider connections using the vercel git CLI command.
- [Security settings](https://vercel.com/docs/project-configuration/security-settings) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Troubleshoot project collaboration](https://vercel.com/docs/deployments/troubleshoot-project-collaboration) — Learn about common reasons for deployment issues related to team member requirements and how to resolve them.

Full cross-link map for this page: [/docs/project-configuration/git-settings.graph.md](/docs/project-configuration/git-settings.graph.md)
<!-- /docsgraph:related -->

- Managing Git Large File Storage (LFS)
- Creating Deploy Hooks

## Disconnect your Git repository

To disconnect your Git repository from your Vercel project:

1. Choose a project from the [dashboard](/dashboard)
2. Open **Settings** in the sidebar and select [**Git**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fgit\&title=Go+to+Git+settings)
3. Under **Connected Git Repository**, select the **Disconnect** button.

## Git Large File Storage (LFS)

If you have [LFS objects](https://git-lfs.com/) in your repository, you can enable or disable support for them from the [project settings](/docs/project-configuration/project-settings).
When support is enabled, Vercel will pull the LFS objects that are used in your repository.

> **💡 Note:** You must [redeploy your
> project](/docs/deployments/managing-deployments#redeploy-a-project) after
> turning Git LFS on.

## Deploy Hooks

Vercel supports **deploy hooks**, which are unique URLs that accept HTTP POST requests and trigger deployments. Check out [our Deploy Hooks documentation](/docs/deploy-hooks) to learn more.

## Verified Commits

Vercel allows you to require verified commits for deployments. This is only available for GitHub projects. Learn more about [verified commits on GitHub](https://docs.github.com/en/authentication/managing-commit-signature-verification).

To enable verified commits:

1. From the Vercel dashboard, select your project
2. Open **Settings** in the sidebar and select [**Git**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fgit\&title=Go+to+Git+settings)
3. Under **Require Verified Commits**, select the **Enable** checkbox

When enabled, Vercel will only create deployments for commits that have been verified by GitHub. For all other commits, the deployment will be automatically canceled.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
