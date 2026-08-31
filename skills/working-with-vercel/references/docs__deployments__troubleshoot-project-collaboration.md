---
title: Troubleshoot project collaboration
product: vercel
url: /docs/deployments/troubleshoot-project-collaboration
canonical_url: "https://vercel.com/docs/deployments/troubleshoot-project-collaboration"
last_updated: 2026-03-13
type: reference
prerequisites:
  - /docs/deployments
related:
  - /docs/accounts
  - /docs/plans/hobby
  - /docs/plans/pro-plan
  - /docs/git
summary: Learn about common reasons for deployment issues related to team member requirements and how to resolve them.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployments/troubleshoot-project-collaboration.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "f676ea000283bb22edad076bc62ee96ee6016404a9e5fdce77ae0598f997a0cf"
---

# Troubleshoot project collaboration

This guide will help you troubleshoot deployment failures related to project collaboration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Auto-add Git committers to your team](https://vercel.com/changelog/auto-add-git-committers-to-your-team?from=related&source_path=%2Fdocs%2Fdeployments%2Ftroubleshoot-project-collaboration&source_site=vercel-docs&relationship=related)
- [Can I connect a Pro team to a personal Git account?](https://vercel.com/kb/guide/connecting-teams-with-personal-git-accounts?from=related&source_path=%2Fdocs%2Fdeployments%2Ftroubleshoot-project-collaboration&source_site=vercel-docs&relationship=related) — Information on connecting personal Git accounts to a Vercel team.
- [Why aren't commits triggering deployments on Vercel?](https://vercel.com/kb/guide/why-aren-t-commits-triggering-deployments-on-vercel?from=related&source_path=%2Fdocs%2Fdeployments%2Ftroubleshoot-project-collaboration&source_site=vercel-docs&relationship=related) — Commits not triggering deployments on Vercel? Walk the diagnostic checklist covering authentication, commit author acces
- [Can you deploy based on tags/releases on Vercel?](https://vercel.com/kb/guide/can-you-deploy-based-on-tags-releases-on-vercel?from=related&source_path=%2Fdocs%2Fdeployments%2Ftroubleshoot-project-collaboration&source_site=vercel-docs&relationship=related) — Learn how to deploy based on tags/releases on Vercel.
- [How to fix “unable to find your GitHub repository” on Vercel](https://vercel.com/kb/guide/unable-to-find-github-repository?from=related&source_path=%2Fdocs%2Fdeployments%2Ftroubleshoot-project-collaboration&source_site=vercel-docs&relationship=related) — Learn how to check GitHub permissions to ensure your Vercel account has sufficient access to import your repository.
- [Deploying GitLab Projects with Vercel](https://vercel.com/docs/git/vercel-for-gitlab?from=related&source_path=%2Fdocs%2Fdeployments%2Ftroubleshoot-project-collaboration&source_site=vercel-docs&relationship=related) — ​Vercel for GitLab automatically deploys your GitLab projects with Vercel, providing Preview Deployment URLs, and automa
- [Git settings](https://vercel.com/docs/project-configuration/git-settings?from=related&source_path=%2Fdocs%2Fdeployments%2Ftroubleshoot-project-collaboration&source_site=vercel-docs&relationship=related) — Use the project settings to manage the Git connection, enable Git LFS, and create deploy hooks.
- [Managing Team Members](https://vercel.com/docs/rbac/managing-team-members?from=related&source_path=%2Fdocs%2Fdeployments%2Ftroubleshoot-project-collaboration&source_site=vercel-docs&relationship=related) — Learn how to manage team members on Vercel, and how to assign roles to each member with role-based access control \\(RBAC
- [Project settings](https://vercel.com/docs/project-configuration/project-settings?from=related&source_path=%2Fdocs%2Fdeployments%2Ftroubleshoot-project-collaboration&source_site=vercel-docs&relationship=related) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,
- [Monorepos FAQ](https://vercel.com/docs/monorepos/monorepo-faq?from=related&source_path=%2Fdocs%2Fdeployments%2Ftroubleshoot-project-collaboration&source_site=vercel-docs&relationship=related) — Learn the answer to common questions about deploying monorepos on Vercel.

Full cross-link map for this page: [/docs/deployments/troubleshoot-project-collaboration.graph.md](/docs/deployments/troubleshoot-project-collaboration.graph.md?from=related&source_path=%2Fdocs%2Fdeployments%2Ftroubleshoot-project-collaboration&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

For private repositories, a deployment can fail if Vercel cannot identify the commit author, or if your team requires manual approval before adding the committer. You can use the following checklist to make sure your Vercel team is properly configured:

- Ensure contributors who push code have Vercel accounts linked to their git
  provider and can be added to your team through
  [collaboration settings](/docs/accounts#collaboration-settings).

* For each team member, verify their Vercel account is connected to their git
  provider.

- Confirm bot commits are properly configured by the git provider.

> **💡 Note:** Collaboration is free for public repositories.

## Team configuration

### Hobby teams

The [Hobby Plan](/docs/plans/hobby) does not support collaboration for private repositories. If you need collaboration, upgrade to the [Pro Plan](/docs/plans/pro-plan).

To deploy commits under a Hobby team, the commit author must be the owner of the Hobby team containing the Vercel project connected to the Git repository. This is verified by comparing the [**Login Connections**](/docs/accounts#login-methods-and-connections) Hobby team's owner with the commit author.

To make sure we can verify your commits:

1. Make sure all commits are authored by the git user associated with your account.
2. Link your git provider to your Vercel account in [Account Settings](/docs/accounts#sign-up-with-a-git-provider)

> **💡 Note:** If your account is not connected to your git provider, make sure you've properly configured your [Vercel email address](/docs/accounts#managing-emails) so that it matches the email associated with the commit.For the most reliable experience, ensure both your project and account are properly connected to your git provider.

For more information, see [Using Hobby teams](/docs/git#using-hobby-teams)

### Pro teams

The [Pro Plan](/docs/plans/pro-plan) allows for collaboration through team membership. When someone with a Vercel account commits to your codebase, they may be added automatically or require approval, depending on your [collaboration settings](/docs/accounts#collaboration-settings).

To deploy commits under a Vercel Pro team, the commit author must be a member of the team containing the Vercel project connected to the Git repository.

To make sure we can verify commits associated with your team:

1. Make sure contributors have Vercel accounts linked to their git provider in [Account Settings](/docs/accounts#sign-up-with-a-git-provider)
2. Review your team's [collaboration settings](/docs/accounts#collaboration-settings) to confirm whether Vercel should auto approve or manually approve new committers
3. If your team uses manual approval, approve the pending membership before the contributor deploys again. After approval, the committer must redeploy their changes.

For more information, see [Using Pro teams](/docs/git#using-pro-teams)

### Bot access

Ensure your bots are properly configured and that their commits are clearly identified as automated.

## Account configuration

### Connecting Git provider accounts

Each team member must connect their git provider account to their Vercel account:

1. Visit [Account Settings](https://vercel.com/account/settings/authentication)
2. Navigate to the [**Login Connections**](/docs/accounts#login-methods-and-connections) section
3. Connect your GitHub, GitLab, or Bitbucket account

### Resolving git provider commit attribution issues

Your git provider associates commits with users by matching the commit email to an email on your git provider account.

If you see an error saying the provider could not associate the committer with a user, the local git configuration email address likely does not match an email registered on their git provider account. Run `git config user.email` on the machine that created the commit, then verify that it matches a verified email on the git provider account.

For multiple email addresses, see [Managing multiple email addresses](/docs/deployments/troubleshoot-project-collaboration#managing-multiple-email-addresses).

### Managing multiple email addresses

If you use multiple email addresses for git commits, you will need to configure a secondary email address with either your git provider or Vercel depending on if your git repository is linked to your project.

To add secondary email addresses to your Vercel account:

1. Go to your [Account Settings](https://vercel.com/account/settings#email)
2. Add any email addresses you use for git commits
3. Verify each email address


---

[View full sitemap](/docs/sitemap)
