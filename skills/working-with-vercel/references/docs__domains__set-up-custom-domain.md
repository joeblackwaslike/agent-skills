---
title: Setting up a custom domain
product: vercel
url: /docs/domains/set-up-custom-domain
canonical_url: "https://vercel.com/docs/domains/set-up-custom-domain"
last_updated: 2026-08-11
type: how-to
prerequisites:
  - /docs/domains
related:
  - /docs/domains/working-with-domains/add-a-domain
  - /docs/cli/project-linking
  - /docs/domains/working-with-domains/deploying-and-redirecting
  - /docs/cli/domains
  - /docs/cli/dns
summary: Add and configure a custom domain for your Vercel project using the CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/set-up-custom-domain.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "b28d778786ab561662113a7d35ee0c62460c59c587b1773018e30532cc651209"
---

# Setting up a custom domain

Use this guide to add a custom domain to your Vercel project from the CLI, configure DNS records, and verify that everything is working. To do the same from the dashboard instead (**Settings** → **Domains** on your project), see [Adding & Configuring a Custom Domain](/docs/domains/working-with-domains/add-a-domain).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can I use my domain on Vercel with A records?](https://vercel.com/kb/guide/a-record-and-caa-with-vercel) — Point your apex domain to Vercel with an A record \\(76.76.21.21 or your domain card's value\\), pair it with a www CNAME,
- [How can I manage my Vercel DNS records?](https://vercel.com/kb/guide/how-to-manage-vercel-dns-records) — Add, edit, and delete Vercel DNS records from the dashboard, CLI, or REST API, and fix the Invalid Configuration error o
- [How can I migrate a site to Vercel without downtime?](https://vercel.com/kb/guide/zero-downtime-migration) — Information about how to assign a Vercel deployment to a domain without downtime.
- [Managing DNS Records](https://vercel.com/docs/domains/managing-dns-records) — Learn how to add, verify, and remove DNS records for your domains on Vercel with this guide.
- [Working with domains](https://vercel.com/docs/domains/working-with-domains) — Learn how domains work and the options Vercel provides for managing them.
- [Working with DNS](https://vercel.com/docs/domains/working-with-dns) — Learn how DNS works to properly configure your domain.
- [Troubleshooting domains](https://vercel.com/docs/domains/troubleshooting) — Learn about common reasons for domain misconfigurations and how to troubleshoot your domain on Vercel.
- [Configuring Custom Domains](https://vercel.com/docs/platforms/multi-tenant-platforms/configuring-domains) — Add, verify, redirect, and remove wildcard and custom domains for a multi-tenant application using the Vercel SDK.

Full cross-link map for this page: [/docs/domains/set-up-custom-domain.graph.md](/docs/domains/set-up-custom-domain.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** This guide requires a [linked Vercel project](/docs/cli/project-linking). Run
> `vercel link` in your project directory if you haven't already.

## Quick reference

Use this block when you already know what you're doing and want the full command sequence. Replace `my-site` with your project name. Replace `your_project_ip` and `your_project_cname_target` with the recommended values from domain verification or your project's **Settings** → **Domains**. The `vercel dns add` commands apply to domains using Vercel's nameservers. For external DNS, add the records through your provider's interface.

```bash filename="terminal"
# 1. Check your existing domains
vercel domains ls

# 2. Add the domain to your project (one arg when run from a linked project)
vercel domains add example.com

# 3. Check what DNS records are needed
vercel domains verify example.com --project my-site

# 4. Configure DNS records (apex domain)
vercel dns add example.com '@' A your_project_ip

# 4b. OR add the subdomain to your project and configure DNS records (subdomain)
vercel domains add www.example.com
vercel domains verify www.example.com --project my-site
vercel dns add example.com www CNAME your_project_cname_target

# 5. Verify DNS configuration
vercel domains verify example.com --project my-site
# If you also configured the subdomain, run:
# vercel domains verify www.example.com --project my-site

# 6. Verify SSL certificate was provisioned
vercel certs ls

# 7. Test the domain
vercel httpstat /
vercel curl /
```

## 1. Check your existing domains

List the domains already configured on your team to avoid conflicts:

```bash filename="terminal"
vercel domains ls
```

This shows all domains across your projects, including their DNS status and verification state.

## 2. Add the domain to your project

Add your custom domain. From a linked project, `vercel domains add` takes a single argument (the domain). To target a different project (or when running outside of a linked directory), pass the project name as a second argument.

```bash filename="terminal"
vercel domains add example.com
```

If the domain is already assigned to another project in your team, use the `--force` flag to reassign it:

```bash filename="terminal"
vercel domains add example.com --force
```

For a `www` subdomain, add that separately:

```bash filename="terminal"
vercel domains add www.example.com
```

If you add both `example.com` and `www.example.com`, configure a redirect from one to the other in your [Vercel project settings](/docs/domains/working-with-domains/deploying-and-redirecting#redirecting-domains) to avoid duplicate content.

## 3. Check what DNS records are needed

After adding the domain, check its DNS configuration and any recommended changes. Replace `my-site` with your project name:

```bash filename="terminal"
vercel domains verify example.com --project my-site
```

The result reports DNS configuration and ownership verification status, with recommended records when DNS changes are needed. Use the record values from this result or your project's [**Settings** → **Domains**](/docs/domains/working-with-domains/add-a-domain#configure-the-domain). Use `vercel domains inspect` for domain information and project associations.

For a subdomain, run verification for the full hostname, such as `vercel domains verify www.example.com --project my-site`. The `--project` option scopes the DNS recommendations to your project.

## 4. Configure DNS records

The records you add depend on whether you're configuring an apex domain (like `example.com`) or a subdomain (like `www.example.com`).

For an **apex domain**, replace `your_project_ip` with the recommended IPv4 address and add an A record:

```bash filename="terminal"
vercel dns add example.com '@' A your_project_ip
```

For a **subdomain**, replace `your_project_cname_target` with the recommended target and add a CNAME record:

```bash filename="terminal"
vercel dns add example.com www CNAME your_project_cname_target
```

> **💡 Note:** Use the values recommended for your domain, including its project-specific
> CNAME target. These commands work when your domain's nameservers point to
> Vercel. If you manage DNS with an external provider, add the recommended
> records through your provider's dashboard instead.

For Vercel-managed DNS, confirm that Vercel lists the records you added:

```bash filename="terminal"
vercel dns ls
```

## 5. Verify DNS configuration

After applying the recommended records at your DNS provider, check the domain again:

```bash filename="terminal"
vercel domains verify example.com --project my-site
```

The command exits with a non-zero status when the domain is misconfigured or needs ownership verification. Follow the reported next steps, then run verification again. DNS changes can take time to propagate. Verified ownership alone does not mean the DNS configuration is valid.

## 6. Verify SSL certificate

Vercel automatically provisions an SSL certificate after DNS verification succeeds. Check that the certificate was issued:

```bash filename="terminal"
vercel certs ls
```

Look for your domain in the output. The certificate typically provisions within a few minutes of DNS verification.

## 7. Test the domain

Verify your domain is serving traffic correctly:

```bash filename="terminal"
vercel httpstat /
```

This shows a full timing breakdown for a request to your production deployment. If you need to check the response body:

```bash filename="terminal"
vercel curl /
```

## When you're using an external DNS provider

If your domain's nameservers point to an external DNS provider (like Cloudflare or Route 53), you can't use `vercel dns add` to configure records. Instead:

1. Add the domain to your project with `vercel domains add example.com`
2. Run `vercel domains verify example.com --project my-site` (replace `my-site` with your project name) or open your project's **Settings** → **Domains** to get the recommended records
3. Add and save those records through your external DNS provider's interface
4. After DNS propagation, run `vercel domains verify example.com --project my-site` again to check configuration and ownership verification status

For a subdomain, use its full hostname in both verification commands. Use the recommended project-specific target when creating a CNAME record.

## Related

- [vercel domains](/docs/cli/domains)
- [vercel dns](/docs/cli/dns)
- [vercel certs](/docs/cli/certs)
- [Domains overview](/docs/domains)
- [Deploying a project from the CLI](/docs/projects/deploy-from-cli)


---

[View full sitemap](/docs/sitemap)
