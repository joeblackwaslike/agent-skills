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
  - /docs/domains/add-a-domain
summary: Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/working-with-domains/add-a-domain-to-environment.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "608fcffd1a7f01e3f9373e3a4f6fb286e151777e128695e63caed17ab16bd089"
---

# Assigning a custom domain to an environment

1. From the [dashboard](/dashboard), pick the project to which you would like to assign your domain and open [**Settings**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdomains\&title=Go+to+Domains+Settings) in the sidebar.
2. Click on the **Environments** menu item.
3. Select the environment to which you would like to assign your domain. Users on Pro and Enterprise plans can create [custom environments](/docs/deployments/environments#custom-environments) to which they can assign custom domains.
4. Once you've added your domain, you will need to configure the DNS records of your domain with your registrar so it can be used with your environment:
   - **If the domain is in use by another Vercel account**, you will need to [verify access to the domain](/docs/domains/add-a-domain#verify-domain-access), with a **TXT** record.

- If you're using an [**Apex domain**](/docs/domains/add-a-domain#apex-domains) (e.g. example.com), you will need to configure it with an **A** record.
- If you're using a [**Subdomain**](/docs/domains/add-a-domain#subdomains) (e.g. docs.example.com), you will need to configure it with a **CNAME** record.


---

[View full sitemap](/docs/sitemap)
