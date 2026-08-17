---
title: Assigning a custom domain to an environment
product: vercel
url: /docs/domains/working-with-domains/add-a-domain-to-environment
canonical_url: "https://vercel.com/docs/domains/working-with-domains/add-a-domain-to-environment"
last_updated: 2026-02-27
type: how-to
prerequisites:
  - /docs/domains/working-with-domains
  - /docs/domains
related:
  - /docs/deployments/environments
  - /docs/domains/working-with-domains/add-a-domain
summary: Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/working-with-domains/add-a-domain-to-environment.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "29b126464c10664a24ebfd64e2f1dbc531fc16d2c00885e1fca20055ac2e4cbc"
---

# Assigning a custom domain to an environment

1. From the [dashboard](/dashboard), pick the project to which you would like to assign your domain and open [**Settings**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdomains\&title=Go+to+Domains+Settings) in the sidebar.
2. Click on the **Environments** menu item.
3. Select the environment to which you would like to assign your domain. Users on Pro and Enterprise plans can create [custom environments](/docs/deployments/environments#custom-environments) to which they can assign custom domains.
4. Once you've added your domain, you will need to configure the DNS records of your domain with your registrar so it can be used with your environment:
   - **If the domain is in use by another Vercel account**, you will need to [verify access to the domain](/docs/domains/working-with-domains/add-a-domain#verify-domain-access), with a **TXT** record.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I add a custom domain to my Vercel project?](https://vercel.com/kb/guide/how-do-i-add-a-custom-domain-to-my-vercel-project?from=related) — Learn how to add a custom domain to your Vercel project.
- [How do I set up a staging environment on Vercel?](https://vercel.com/kb/guide/set-up-a-staging-environment-on-vercel?from=related) — Information on how to set up a staging environment on Vercel.
- [Set Up Custom Domain](https://vercel.com/docs/domains/set-up-custom-domain?from=related) — Add and configure a custom domain for your Vercel project using the CLI.
- [Assigning a Domain to a Git Branch](https://vercel.com/docs/domains/working-with-domains/assign-domain-to-a-git-branch?from=related) — Learn how to assign a domain to a different Git branch with this guide.
- [Add Custom Domain](https://vercel.com/docs/platforms/platform-elements/actions/add-custom-domain?from=related) — Server action for programmatically adding custom domains to Vercel projects.
- [Deploying & Redirecting Domains](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting?from=related) — Learn how to deploy your domains and set up domain redirects with this guide.
- [Managing DNS Records](https://vercel.com/docs/domains/managing-dns-records?from=related) — Learn how to add, verify, and remove DNS records for your domains on Vercel with this guide.

Full cross-link map for this page: [/docs/domains/working-with-domains/add-a-domain-to-environment.graph.md](/docs/domains/working-with-domains/add-a-domain-to-environment.graph.md)
<!-- /docsgraph:related -->

- If you're using an [**Apex domain**](/docs/domains/working-with-domains/add-a-domain#apex-domains) (e.g. example.com), you will need to configure it with an **A** record.
- If you're using a [**Subdomain**](/docs/domains/working-with-domains/add-a-domain#subdomains) (e.g. docs.example.com), you will need to configure it with a **CNAME** record.


---

[View full sitemap](/docs/sitemap)
