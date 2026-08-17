---
title: Adding & Configuring a Custom Domain
product: vercel
url: /docs/domains/working-with-domains/add-a-domain
canonical_url: "https://vercel.com/docs/domains/working-with-domains/add-a-domain"
last_updated: 2026-02-27
type: how-to
prerequisites:
  - /docs/domains/working-with-domains
  - /docs/domains
related:
  - /docs/domains/working-with-domains/deploying-and-redirecting
summary: Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/working-with-domains/add-a-domain.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "373c13f668c35f39d228d7bf2871e6ca10d26d1c65f4c0ed7925b133c5515fb2"
---

# Adding & Configuring a Custom Domain

Vercel provides all deployments with a `vercel.app` URL, which enables you to share Deployments with your Team for collaboration. However, to provide greater personalization and flexibility to your project, you can instead add a **custom domain**. If you don't own a domain yet, you can [purchase it with Vercel](/domains).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I add a custom domain to my Vercel project?](https://vercel.com/kb/guide/how-do-i-add-a-custom-domain-to-my-vercel-project?from=related) — Learn how to add a custom domain to your Vercel project.
- [Can I use my domain on Vercel with A records?](https://vercel.com/kb/guide/a-record-and-caa-with-vercel?from=related) — Point your apex domain to Vercel with an A record \(76.76.21.21 or your domain card's value\), pair it with a www CNAME,
- [Accessing Vercel-hosted sites from mainland China](https://vercel.com/kb/guide/accessing-vercel-hosted-sites-from-mainland-china?from=related) — Understand why Vercel-hosted sites may be slow or inaccessible in mainland China, and explore steps to improve performan
- [Debug routing on Vercel](https://vercel.com/kb/guide/debug-routing-on-vercel?from=related) — Learn how to debug how Vercel decides where to route your request
- [Migrate self-hosted Next.js and containers from AWS to Vercel](https://vercel.com/kb/guide/migrate-containers-from-aws-to-vercel?from=related) — Migrate containers from AWS to Vercel: deploy with Dockerfile.vercel, keep RDS, S3, and SQS in AWS over OIDC, and cut ov
- [Set Up Custom Domain](https://vercel.com/docs/domains/set-up-custom-domain?from=related) — Add and configure a custom domain for your Vercel project using the CLI.
- [Configuring Domains](https://vercel.com/docs/platforms/multi-tenant-platforms/configuring-domains?from=related) — Add, verify, redirect, and remove wildcard and custom domains for a multi-tenant application using the Vercel SDK.
- [Adding a Domain to an Environment](https://vercel.com/docs/domains/working-with-domains/add-a-domain-to-environment?from=related) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [Managing DNS Records](https://vercel.com/docs/domains/managing-dns-records?from=related) — Learn how to add, verify, and remove DNS records for your domains on Vercel with this guide.
- [Add a domain to a project](https://vercel.com/docs/rest-api/projects/add-a-domain-to-a-project?from=related)

Full cross-link map for this page: [/docs/domains/working-with-domains/add-a-domain.graph.md](/docs/domains/working-with-domains/add-a-domain.graph.md)
<!-- /docsgraph:related -->

You can manage all domain settings related to a project from **Settings** and then **Domains** in the sidebar, regardless of whether you are using [apex domains](#apex-domains) or [subdomains](#subdomains) in your project. This document will guide you through both options.

Hobby teams have a limit of 50 custom domains per project.

## Add and configure domain

The following steps provide an overview of how to add and configure a custom domain in Vercel:

- ### Navigate to Domain Settings
  On the [dashboard](/dashboard), pick the project to which you would like to assign your domain.

  Once you have selected your project, open **Settings** in the sidebar and then select [**Domains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdomains\&title=Go+to+Domains+Settings).

- ### Add your domain
  From the **Domains** page, click the **Add Domain** button:

  ![Image](`/docs-assets/static/docs/domains/add-domain-button-light.png`)

  Input the domain you wish to include in the project:

  ![Image](`/docs-assets/static/docs/domains/enter-domain-input-light.png`)

  If you add an apex domain (e.g. `example.com`) to the project, Vercel will prompt you to add the `www` subdomain prefix. For more information about why we recommend using a `www` domain, see "[Redirecting `www` domains](/docs/domains/working-with-domains/deploying-and-redirecting#redirecting-www-domains)".

- ### Using wildcard domain
  You can also use your **custom domain** as a **wildcard domain** by prefixing it with `*.`.
  > **💡 Note:** If using your custom domain as a wildcard domain, you **must use the
  > nameservers method for verification**.
  To add a **wildcard domain**, use the prefix `*`, for example `*.acme.com`.

  ![Image](`/docs-assets/static/docs/concepts/projects/custom-domains/wildcard-domain.png`)

- ### Configure the domain
  Once you have added your custom domain, you will need to configure the DNS records of your domain with your registrar so it can be used with your Project. The dashboard will automatically display different methods for configuring it:
  - **If the domain is in use by another Vercel account**, you will need to [verify access to the domain](#verify-domain-access), with a **TXT** record
  - If you're using an [**Apex domain**](#apex-domains) (e.g. example.com), you will need to configure it with an **A** record
  - If you're using a [**Subdomain**](#subdomains) (e.g. docs.example.com), you will need to configure it with a **CNAME** record
  Both **apex domains** and **subdomains** can also be configured using the [**Nameservers**](#vercel-nameservers) method.
  > **⚠️ Warning:** If you are verifying your domain by changing nameservers, you will need to add
  > any DNS records to Vercel that you wish to keep from your previous DNS
  > provider.
  #### Apex domains
  You can configure apex domains with an **A** record.

  ![Image](`/docs-assets/static/docs/concepts/projects/custom-domains/new-domain-apex-light.png`)
  #### Subdomains
  You can configure **subdomains** with a **CNAME** record. Each project has a unique CNAME record e.g. `d1d4fc829fe7bc7c.vercel-dns-017.com`.

  ![Image](`/docs-assets/static/docs/concepts/projects/custom-domains/new-domain-app-light.png`)
  #### Vercel Nameservers
  If you choose to use a wildcard domain Vercel's nameservers will be automatically enabled for you on saving the domain settings. You will then be provided with the Vercel nameservers to copy and use with your registrar.

  ![Image](`/docs-assets/static/docs/domains/configure-dns-ns-light.png`)

- ### Verify domain access
  If the domain is in use by another Vercel account, you may be prompted to verify access to the domain. Note that this will not move the domain into your account, but will allow you to use it in your project. If you have multiple domains to verify, be aware that you can only set up one TXT record at a time, but you can modify it after the domain is transferred.

  ![Image](`/docs-assets/static/docs/domains/verify-domain-light.png`)

Once the domain has been configured and Vercel has verified it, the status of the domain will be updated within the UI to confirm that it is ready for use.

![Image](`/docs-assets/static/docs/domains/domain-properly-configured-light.png`)

> **💡 Note:** If a someone visits your domain with or without the "www" subdomain prefix,
> Vercel will attempt to redirect them to your domain. For more robust
> protection, you should explicitly add this domain and [redirect
> it](/docs/domains/working-with-domains/deploying-and-redirecting#redirecting-domains).


---

[View full sitemap](/docs/sitemap)
