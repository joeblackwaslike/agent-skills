---
title: Setting up a custom domain
product: vercel
url: /docs/domains/set-up-custom-domain
canonical_url: "https://vercel.com/docs/domains/set-up-custom-domain"
last_updated: 2026-06-15
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "6e2c38fbff079c3fd087396c6f6ed19cc4e50efb266159fde11e7b5b9db64e01"
---

# Setting up a custom domain

Use this guide to add a custom domain to your Vercel project from the CLI, configure DNS records, and verify that everything is working. To do the same from the dashboard instead (**Settings** → **Domains** on your project), see [Adding & Configuring a Custom Domain](/docs/domains/working-with-domains/add-a-domain).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can I use my domain on Vercel with A records?](https://vercel.com/kb/guide/a-record-and-caa-with-vercel?from=related) — Point your apex domain to Vercel with an A record \(76.76.21.21 or your domain card's value\), pair it with a www CNAME,
- [How can I manage my Vercel DNS records?](https://vercel.com/kb/guide/how-to-manage-vercel-dns-records?from=related) — Add, edit, and delete Vercel DNS records from the dashboard, CLI, or REST API, and fix the Invalid Configuration error o
- [How do I add a custom domain to my Vercel project?](https://vercel.com/kb/guide/how-do-i-add-a-custom-domain-to-my-vercel-project?from=related) — Learn how to add a custom domain to your Vercel project.
- [Managing DNS Records](https://vercel.com/docs/domains/managing-dns-records?from=related) — Learn how to add, verify, and remove DNS records for your domains on Vercel with this guide.
- [Working with Domains](https://vercel.com/docs/domains/working-with-domains?from=related) — Learn how domains work and the options Vercel provides for managing them.
- [Configuring Domains](https://vercel.com/docs/platforms/multi-tenant-platforms/configuring-domains?from=related) — Add, verify, redirect, and remove wildcard and custom domains for a multi-tenant application using the Vercel SDK.
- [Adding a Domain to an Environment](https://vercel.com/docs/domains/working-with-domains/add-a-domain-to-environment?from=related) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [Working with DNS](https://vercel.com/docs/domains/working-with-dns?from=related) — Learn how DNS works in order to properly configure your domain.

Full cross-link map for this page: [/docs/domains/set-up-custom-domain.graph.md](/docs/domains/set-up-custom-domain.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** This guide requires a [linked Vercel project](/docs/cli/project-linking). Run
> `vercel link` in your project directory if you haven't already.

## Quick reference

Use this block when you already know what you're doing and want the full command sequence. Use the steps below for context and checks.

```bash filename="terminal"
# 1. Check your existing domains
vercel domains ls

# 2. Add the domain to your project (one arg when run from a linked project)
vercel domains add example.com

# 3. Check what DNS records are needed
vercel domains inspect example.com

# 4. Configure DNS records (apex domain)
vercel dns add example.com '@' A 76.76.21.21

# 4b. OR configure DNS records (subdomain)
vercel dns add example.com www CNAME cname.vercel-dns-0.com

# 5. Verify DNS configuration
vercel domains inspect example.com

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

After adding the domain, inspect it to see the required DNS configuration:

```bash filename="terminal"
vercel domains inspect example.com
```

This shows the current DNS verification status and the exact records you need to configure. The output tells you whether the domain needs an A record, CNAME record, or nameserver delegation.

## 4. Configure DNS records

The records you add depend on whether you're configuring an apex domain (like `example.com`) or a subdomain (like `www.example.com`).

For an **apex domain**, add an A record:

```bash filename="terminal"
vercel dns add example.com '@' A 76.76.21.21
```

For a **subdomain**, add a CNAME record:

```bash filename="terminal"
vercel dns add example.com www CNAME cname.vercel-dns-0.com
```

> **💡 Note:** The DNS values shown above (`76.76.21.21` and `cname.vercel-dns-0.com`) are
> Vercel's general-purpose values. Your project may have specific values. Run
> `vercel domains inspect example.com` to see the exact records recommended for
> your domain. These commands work when your domain's nameservers are pointed to
> Vercel. If you manage DNS with an external provider, add these records through
> your provider's dashboard instead.

To verify your DNS records were added:

```bash filename="terminal"
vercel dns ls
```

## 5. Verify DNS configuration

Run `inspect` again to check that the domain is properly configured and verified:

```bash filename="terminal"
vercel domains inspect example.com
```

DNS propagation can take a few minutes. If the domain isn't verified yet, wait and run the command again.

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
2. Run `vercel domains inspect example.com` to see the required records
3. Add those records through your external DNS provider's interface
4. Run `vercel domains inspect example.com` again to verify Vercel detected the records

## Related

- [vercel domains](/docs/cli/domains)
- [vercel dns](/docs/cli/dns)
- [vercel certs](/docs/cli/certs)
- [Domains overview](/docs/domains)
- [Deploying a project from the CLI](/docs/projects/deploy-from-cli)


---

[View full sitemap](/docs/sitemap)
