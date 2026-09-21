---
title: Adding & Configuring a Custom Domain
product: vercel
url: /docs/domains/working-with-domains/add-a-domain
canonical_url: "https://vercel.com/docs/domains/working-with-domains/add-a-domain"
last_updated: 2026-09-16
type: how-to
prerequisites:
  - /docs/domains/working-with-domains
  - /docs/domains
related:
  - /docs/domains/working-with-domains/deploying-and-redirecting
  - /docs/domains/managing-dns-records
  - /docs/domains/troubleshooting
summary: Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/working-with-domains/add-a-domain.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "66f20d9bc03e346ab3804771e9560e1d40b326bb2de40ef5f92a79d12aeadfb2"
---

# Adding & Configuring a Custom Domain

Vercel provides all deployments with a `vercel.app` URL, which enables you to share Deployments with your Team for collaboration. However, to provide greater personalization and flexibility to your project, you can instead add a **custom domain**. If you don't own a domain yet, you can [purchase it with Vercel](/domains).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Custom domain](https://v0.app/docs/custom-domains?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fadd-a-domain&source_site=vercel-docs&relationship=related) — Add custom domains to your v0 deployments to give your applications a professional, branded URL.
- [Can I use my domain on Vercel with A records?](https://vercel.com/kb/guide/a-record-and-caa-with-vercel?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fadd-a-domain&source_site=vercel-docs&relationship=related) — Point your apex domain to Vercel with an A record \\(76.76.21.21 or your domain card's value\\), pair it with a www CNAME,
- [Accessing Vercel-hosted sites from mainland China](https://vercel.com/kb/guide/accessing-vercel-hosted-sites-from-mainland-china?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fadd-a-domain&source_site=vercel-docs&relationship=related) — Understand why Vercel-hosted sites may be slow or inaccessible in mainland China, and explore steps to improve performan
- [Deploy to Vercel with Self-Hosted Git Pipelines \\(GitLab & Bitbucket\\)](https://vercel.com/kb/guide/how-can-i-use-gitlab-pipelines-with-vercel?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fadd-a-domain&source_site=vercel-docs&relationship=related) — Learn how to use GitLab Pipelines to deploy to Vercel including support for self-managed GitLab.
- [Migrate self-hosted Next.js and containers from AWS to Vercel](https://vercel.com/kb/guide/migrate-containers-from-aws-to-vercel?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fadd-a-domain&source_site=vercel-docs&relationship=related) — Migrate containers from AWS to Vercel: deploy with Dockerfile.vercel, keep RDS, S3, and SQS in AWS over OIDC, and cut ov
- [How to set up a staging environment on Vercel](https://vercel.com/kb/guide/set-up-a-staging-environment-on-vercel?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fadd-a-domain&source_site=vercel-docs&relationship=related) — Set up a staging environment on Vercel with custom environments, staged production deployments, or a branch-based previe
- [Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fadd-a-domain&source_site=vercel-docs&relationship=related) — Add and configure a custom domain for your Vercel project using the CLI.
- [Assigning a custom domain to an environment](https://vercel.com/docs/domains/working-with-domains/add-a-domain-to-environment?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fadd-a-domain&source_site=vercel-docs&relationship=related) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [Working with DNS](https://vercel.com/docs/domains/working-with-dns?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fadd-a-domain&source_site=vercel-docs&relationship=related) — Learn how DNS works to properly configure your domain.
- [Working with nameservers](https://vercel.com/docs/domains/working-with-nameservers?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fadd-a-domain&source_site=vercel-docs&relationship=related) — Learn about nameservers and the benefits Vercel nameservers provide.
- [Build Features for Customizing Deployments](https://vercel.com/docs/builds/build-features?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fadd-a-domain&source_site=vercel-docs&relationship=related) — Learn how to customize your deployments using Vercel's build features.

Full cross-link map for this page: [/docs/domains/working-with-domains/add-a-domain.graph.md](/docs/domains/working-with-domains/add-a-domain.graph.md?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fadd-a-domain&source_site=vercel-docs&relationship=graph)
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
  > **💡 Note:** Vercel needs access to DNS challenges to issue and renew wildcard
  > certificates. Use the [nameservers method](#vercel-nameservers), or [delegate
  > certificate validation](#use-wildcard-domains-with-an-external-dns-provider)
  > if you can't change your domain's nameservers.
  To add a **wildcard domain**, use the prefix `*`, for example `*.acme.com`.

  ![Image](`/docs-assets/static/docs/concepts/projects/custom-domains/wildcard-domain.png`)
  #### Use wildcard domains with an external DNS provider
  If you can't change your domain's nameservers, delegate the `_acme-challenge` subdomain to Vercel for certificate issuance and renewal. Your existing DNS provider continues to manage the rest of your DNS records, including the wildcard record that routes traffic to Vercel.

  The following steps use the `acme.com` DNS zone and cover both `*.acme.com` and `*.foo.acme.com`. The apex domain is `acme.com`; neither wildcard configures the apex domain itself.
  > **⚠️ Warning:** Use this workaround only if you can't change your domain's nameservers.
  > Delegating the challenge can prevent other hosting providers from issuing or
  > renewing certificates that use the same challenge name.
  1. Add your wildcard domain to your project's **Settings > Domains**.

  2. In your team's **Domains** page, select `acme.com`. Under **DNS Records**, click **Enable Vercel DNS**. Keep your existing nameservers configured at your registrar.

  3. At your **existing DNS provider**, add both `NS` records for the wildcard you're configuring. The names below are relative to the `acme.com` DNS zone:

     | Wildcard domain  | Type | Name                  | Value                 |
     | ---------------- | ---- | --------------------- | --------------------- |
     | `*.acme.com`     | `NS` | `_acme-challenge`     | `ns1.vercel-dns.com.` |
     | `*.acme.com`     | `NS` | `_acme-challenge`     | `ns2.vercel-dns.com.` |
     | `*.foo.acme.com` | `NS` | `_acme-challenge.foo` | `ns1.vercel-dns.com.` |
     | `*.foo.acme.com` | `NS` | `_acme-challenge.foo` | `ns2.vercel-dns.com.` |

     If your provider requires a full record name, use `_acme-challenge.acme.com` or `_acme-challenge.foo.acme.com`, respectively. These records delegate certificate validation; they don't route website traffic.

  4. At the **same DNS provider**, add the matching wildcard `CNAME` record to route traffic to Vercel:

     | Wildcard domain  | Type    | Name    | Value                     |
     | ---------------- | ------- | ------- | ------------------------- |
     | `*.acme.com`     | `CNAME` | `*`     | `cname.vercel-dns-0.com.` |
     | `*.foo.acme.com` | `CNAME` | `*.foo` | `cname.vercel-dns-0.com.` |

  5. After the records propagate, check the domain's configuration and certificate status in your project's **Settings > Domains**. Keep the `NS` records in place so Vercel can renew the certificate automatically.

- ### Configure the domain
  Once you have added your custom domain, you will need to configure the DNS records of your domain with your registrar so it can be used with your Project. The dashboard will automatically display different methods for configuring it:
  - **If the domain is in use by another Vercel account**, you will need to [verify access to the domain](#verify-domain-access), with a **TXT** record
  - If you're using an [**Apex domain**](#apex-domains) (e.g. example.com), you will need to configure it with an **A** record
  - If you're using a [**Subdomain**](#subdomains) (e.g. docs.example.com), you will need to configure it with a **CNAME** record
  Both **apex domains** and **subdomains** can also be configured using the [**Nameservers**](#vercel-nameservers) method.
  > **⚠️ Warning:** Before changing nameservers, [copy your existing DNS
  > records](/docs/domains/managing-dns-records#migrating-dns-records-from-an-external-registrar)
  > to Vercel, including MX records for email and any verification TXT records.
  > Changing only the website's A or CNAME record at your current DNS provider
  > does not require moving the rest of your DNS records.
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

## Troubleshooting domain setup

If the domain does not show a valid configuration, compare the records at your authoritative DNS provider with the values shown in the project's **Domains** settings.

| Symptom | What to check |
| --- | --- |
| The domain has an invalid configuration | Check for conflicting A, AAAA, or CNAME records for the same hostname. Use the values shown for your project rather than copying another project's records. |
| A subdomain does not resolve | For `www.example.com`, use `www` as the record name in Vercel's DNS form. Other DNS providers may use a different name format. |
| The apex domain works but `www` does not, or the reverse | Add both domains to the project and [configure a redirect](/docs/domains/working-with-domains/deploying-and-redirecting#redirecting-domains) to your preferred domain. |
| Email stopped arriving after a nameserver change | Restore your email provider's records using the [email troubleshooting steps](/docs/domains/managing-dns-records#troubleshooting-email-delivery). |

DNS changes can take time to propagate. Use [DNS verification](/docs/domains/managing-dns-records#verifying-dns-records) to compare the published records, and see [domain troubleshooting](/docs/domains/troubleshooting) for configuration and certificate errors.


---

[View full sitemap](/docs/sitemap)
