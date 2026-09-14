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
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "2cdac4ea5847043a113af193ec7214dd316f27ab8b34518075ec4cd1a4407e41"
---

# Assigning a domain to a Git branch

Every commit pushed to the [Production Branch](/docs/git#production-branch) of your [connected Git repository](/docs/git) will be assigned the domains configured in your project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Microfrontends routing now applies to vc alias and branch domains](https://vercel.com/changelog/microfrontends-routing-now-applies-to-vc-alias-and-branch-domains?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fassign-domain-to-a-git-branch&source_site=vercel-docs&relationship=related)
- [Are Vercel Preview Deployments indexed by search engines?](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fassign-domain-to-a-git-branch&source_site=vercel-docs&relationship=related) — Vercel Preview Deployments aren't indexed by default. Learn how the noindex header works, how to confirm it, and the cus
- [How to set up a staging environment on Vercel](https://vercel.com/kb/guide/set-up-a-staging-environment-on-vercel?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fassign-domain-to-a-git-branch&source_site=vercel-docs&relationship=related) — Set up a staging environment on Vercel with custom environments, staged production deployments, or a branch-based previe
- [Branch Domains](https://vercel.com/blog/branch-domains?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fassign-domain-to-a-git-branch&source_site=vercel-docs&relationship=related)
- [How to use a non-default branch for production deployments on Vercel](https://vercel.com/kb/guide/can-i-use-a-non-default-branch-for-production?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fassign-domain-to-a-git-branch&source_site=vercel-docs&relationship=related) — Learn how to set a non-default branch for production on Vercel. Open the Production environment, change branch tracking,
- [Why are my branch specific variables and domains not linked to my CLI deployments?](https://vercel.com/kb/guide/branch-variables-and-domains-not-linked-to-cli-deployments?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fassign-domain-to-a-git-branch&source_site=vercel-docs&relationship=related) — How to link CLI deployments to the correct branch for use with custom environments and branch specific domains and envir
- [Assigning a custom domain to an environment](https://vercel.com/docs/domains/working-with-domains/add-a-domain-to-environment?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fassign-domain-to-a-git-branch&source_site=vercel-docs&relationship=related) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fassign-domain-to-a-git-branch&source_site=vercel-docs&relationship=related) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fassign-domain-to-a-git-branch&source_site=vercel-docs&relationship=related) — Add and configure a custom domain for your Vercel project using the CLI.
- [Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fassign-domain-to-a-git-branch&source_site=vercel-docs&relationship=related) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [Git settings](https://vercel.com/docs/project-configuration/git-settings?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fassign-domain-to-a-git-branch&source_site=vercel-docs&relationship=related) — Use the project settings to manage the Git connection, enable Git LFS, and create deploy hooks.

Full cross-link map for this page: [/docs/domains/working-with-domains/assign-domain-to-a-git-branch.graph.md](/docs/domains/working-with-domains/assign-domain-to-a-git-branch.graph.md?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fassign-domain-to-a-git-branch&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

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
