---
title: Assigning a domain to a Git branch
product: vercel
url: /docs/domains/working-with-domains/assign-domain-to-a-git-branch
canonical_url: "https://vercel.com/docs/domains/working-with-domains/assign-domain-to-a-git-branch"
last_updated: 2026-02-27
type: how-to
prerequisites:
  - /docs/domains/working-with-domains
  - /docs/domains
related:
  - /docs/git
  - /docs/deployments/environments
  - /docs/rest-api/reference/endpoints/projects/update-a-project-domain
summary: Learn how to assign a domain to a different Git branch with this guide.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/working-with-domains/assign-domain-to-a-git-branch.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "1590c535e8d84bfecb83a858f1e632d12ef9c2425455e81cf433617a0413f7f8"
---

# Assigning a domain to a Git branch

Every commit pushed to the [Production Branch](/docs/git#production-branch) of your [connected Git repository](/docs/git) will be assigned the domains configured in your project.

To automatically assign a domain to a different branch:

1. From the [dashboard](/dashboard), pick the project to which you would like to assign your domain and open **Settings** in the sidebar.
2. Click on [**Domains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdomains\&title=Go+to+Domains+Settings).
3. Select the **Edit** dropdown item for the domain to which you would like to assign your branch.
4. Select **Preview** from the **Connect to an environment** section
5. In the **Git Branch** field, enter the branch name to which you would like to assign the domain:

![Image](`/docs-assets/static/docs/domains/assign-domain-to-git-branch-light.png`)

Pro and Enterprise teams can also set branch tracking for their [custom environments](/docs/deployments/environments#custom-environments).

> **💡 Note:** If you prefer to do this using the Vercel REST API instead, you can use the
> ["Update a project
> domain"](/docs/rest-api/reference/endpoints/projects/update-a-project-domain)
> PATCH endpoint.


---

[View full sitemap](/docs/sitemap)
