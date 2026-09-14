---
title: Working with SSL Certificates
product: vercel
url: /docs/domains/working-with-ssl
canonical_url: "https://vercel.com/docs/domains/working-with-ssl"
last_updated: 2026-08-11
type: conceptual
prerequisites:
  - /docs/domains
related:
  - /docs/domains/custom-SSL-certificate
  - /docs/domains/troubleshooting
  - /docs/notifications
  - /docs/domains
  - /docs/domains/working-with-domains
summary: Learn how Vercel uses SSL certification to keep your site secure.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/working-with-ssl.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "c7cb8e7df7972713e42ed9f4197673fb96e0426a4a64da450c2e7f75454336bb"
---

# Working with SSL Certificates

An SSL certificate enables encrypted communication between user's browser and your web server to be encrypted. The certificate is installed on the web server and allows for website authentication and data encryption. This is particularly important if you are working with any sort of authentication and personal or financial data.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can I use my domain on Vercel with A records?](https://vercel.com/kb/guide/a-record-and-caa-with-vercel?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-ssl&source_site=vercel-docs&relationship=related) — Point your apex domain to Vercel with an A record \\(76.76.21.21 or your domain card's value\\), pair it with a www CNAME,
- [Build a multi-tenant app with Next.js and Vercel](https://vercel.com/kb/guide/nextjs-multi-tenant-application?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-ssl&source_site=vercel-docs&relationship=related) — Create a Next.js application with multi-tenancy and custom domain support on Vercel.
- [Why is my domain not automatically generating an SSL/TLS certificate?](https://vercel.com/kb/guide/domain-not-generating-ssl-certificate?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-ssl&source_site=vercel-docs&relationship=related) — Information on why a domain may not be automatically generating an SSL/TLS certificate.
- [Automatic SSL with Vercel and Let's Encrypt](https://vercel.com/blog/automatic-ssl-with-vercel-lets-encrypt?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-ssl&source_site=vercel-docs&relationship=related)
- [Uploading Custom SSL Certificates](https://vercel.com/docs/domains/custom-ssl-certificate?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-ssl&source_site=vercel-docs&relationship=related) — By default, Vercel provides all domains with a custom SSL certificates. However, Enterprise teams can upload their own c
- [Pre-Generate SSL Certificates](https://vercel.com/docs/domains/pre-generating-ssl-certs?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-ssl&source_site=vercel-docs&relationship=related) — test
- [Encryption and TLS](https://vercel.com/docs/cdn-security/encryption?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-ssl&source_site=vercel-docs&relationship=related) — Learn how Vercel encrypts data in transit and at rest.
- [Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-ssl&source_site=vercel-docs&relationship=related) — Add and configure a custom domain for your Vercel project using the CLI.
- [Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-ssl&source_site=vercel-docs&relationship=related) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.

Full cross-link map for this page: [/docs/domains/working-with-ssl.graph.md](/docs/domains/working-with-ssl.graph.md?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-ssl&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

SSL certificates are issued from a [certificate authority (CA)](# "certificate authority (CA)") for each domain. While it is possible to [create and upload your own custom certificate](/docs/domains/custom-SSL-certificate), Vercel will automatically try to generate a certificate for every domain once it is added to a project, regardless of if it was registered through Vercel or not. However, it will only work once the certificate validation request is successful, which happens once DNS records are added and propagated.

Vercel uses LetsEncrypt for certificates. For all non-wildcard domains, we use the [HTTP-01 challenge method](https://letsencrypt.org/docs/challenge-types/#http-01-challenge) and providing the request can make it to Vercel, then our infrastructure will deal with it.
For wildcard requests, we use the [DNS-01 challenge method](https://letsencrypt.org/docs/challenge-types/#dns-01-challenge). This is why we require nameservers to be with Vercel to use wildcard domains - if the DNS isn't with us, we can't make the DNS record to approve it.

Issuing a certificate happens in the following way:

1. Vercel asks LetsEncrypt for a certificate for that domain and asks how it can prove control of the domain
2. Let's Encrypt reviews the domain and issues Vercel with a [challenge](https://letsencrypt.org/docs/challenge-types/) in order to authorise the certificate to be generated. This is usually in the format of creating a file or DNS record with a particular code.
3. Vercel creates that file with the code on the HTTP-01 or DNS-01 validation path and tells LetsEncrypt it's done
4. LetsEncrypt then check to see if the file is there and if they can see the file, they send us the certificate
5. Vercel then adds the certificate to our infrastructure and it then starts working on HTTPS

The [/.well-known](# "The /.well-known directory") path is reserved and cannot be redirected or rewritten. Only
Enterprise teams can configure custom SSL. [Contact sales](/contact/sales) to
learn more.

## Automatic certificate renewal

Vercel automatically attempts to renew the SSL certificates it issues for your custom domains 14 to 30 days before they expire. The exact renewal day varies, so a certificate that has not renewed at the 30-day mark does not necessarily indicate a problem.

Keep the domain correctly configured so Vercel can complete certificate validation during renewal. From the project's **Settings**, open **Domains** and check the domain's configuration status. Certificate renewal is separate from renewing the domain's registration.

Vercel cannot automatically renew certificates that you upload yourself. See [custom SSL certificates](/docs/domains/custom-SSL-certificate) for their renewal behavior.

### If certificate renewal fails

1. Open the project's **Domains** settings and resolve any configuration errors using the DNS values shown for the domain.
2. Check [common SSL certificate issues](/docs/domains/troubleshooting#common-ssl-certificate-issues), including CAA records that do not authorize Let's Encrypt and DNS or proxy configurations that prevent certificate validation.
3. Review the **Configuration - Certificate renewal failed** notification. Vercel notifies team owners of failed renewals; you can manage delivery in [notification settings](/docs/notifications#managing-notifications).
4. If the domain is correctly configured and renewal still fails, [contact Vercel support](/help) with the domain name and the error you see.

## Troubleshooting

To learn more about common SSL issues, see the [troubleshooting](/docs/domains/troubleshooting#common-ssl-certificate-issues) doc.

## Related

**Domains overview** [→](/docs/domains)

Learn the concepts behind how domains work

**Working with Domains** [→](/docs/domains/working-with-domains)

Learn how domains work and the options Vercel provides for managing them.

**Working with DNS** [→](/docs/domains/working-with-dns)

Learn how DNS works in order to properly configure your domain.

**Working with Nameservers** [→](/docs/domains/working-with-nameservers)

Learn about nameservers and the benefits Vercel nameservers provide.

**Troubleshooting Domains** [→](/docs/domains/troubleshooting)

Learn about common reasons for domain misconfigurations and how to
troubleshoot your domain on Vercel.


---

[View full sitemap](/docs/sitemap)
