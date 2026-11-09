---
title: Working with SSL Certificates
product: vercel
url: /docs/domains/working-with-ssl
canonical_url: "https://vercel.com/docs/domains/working-with-ssl"
last_updated: 2026-09-16
type: conceptual
prerequisites:
  - /docs/domains
related:
  - /docs/domains/custom-SSL-certificate
  - /docs/domains/working-with-domains/add-a-domain
  - /docs/domains/troubleshooting
  - /docs/notifications
  - /docs/domains
summary: Learn how Vercel uses SSL certification to keep your site secure.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/working-with-ssl.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "8fee302e387623036525221c13a992b932b35bfd575296dbf7fa3e754a7bd395"
---

# Working with SSL Certificates

An SSL certificate enables encrypted communication between user's browser and your web server to be encrypted. The certificate is installed on the web server and allows for website authentication and data encryption. This is particularly important if you are working with any sort of authentication and personal or financial data.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Automatic SSL with Vercel and Let's Encrypt](https://vercel.com/blog/automatic-ssl-with-vercel-lets-encrypt)
- [Pre-generate SSL certs, now in the Domains dashboard](https://vercel.com/changelog/pre-generate-domain-ssl-certs-now-in-dashboard)
- [Uploading Custom SSL Certificates](https://vercel.com/docs/domains/custom-ssl-certificate) — By default, Vercel provides all domains with a custom SSL certificates. However, Enterprise teams can upload their own c
- [Pre-Generate SSL Certificates](https://vercel.com/docs/domains/pre-generating-ssl-certs) — test
- [Encryption and TLS](https://vercel.com/docs/cdn-security/encryption) — Learn how Vercel encrypts data in transit and at rest.
- [Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain) — Add and configure a custom domain for your Vercel project using the CLI.
- [Configuring Custom Domains](https://vercel.com/docs/platforms/multi-tenant-platforms/configuring-domains) — Add, verify, redirect, and remove wildcard and custom domains for a multi-tenant application using the Vercel SDK.

Full cross-link map for this page: [/docs/domains/working-with-ssl.graph.md](/docs/domains/working-with-ssl.graph.md)
<!-- /docsgraph:related -->

SSL certificates are issued from a [certificate authority (CA)](# "certificate authority (CA)") for each domain. While it is possible to [create and upload your own custom certificate](/docs/domains/custom-SSL-certificate), Vercel will automatically try to generate a certificate for every domain once it is added to a project, regardless of if it was registered through Vercel or not. However, it will only work once the certificate validation request is successful, which happens once DNS records are added and propagated.

Vercel uses Let's Encrypt for certificates. For all non-wildcard domains, we use the [HTTP-01 challenge method](https://letsencrypt.org/docs/challenge-types/#http-01-challenge) and providing the request can make it to Vercel, then our infrastructure will deal with it.
For wildcard requests, we use the [DNS-01 challenge method](https://letsencrypt.org/docs/challenge-types/#dns-01-challenge). This is why Vercel must be able to create the DNS challenge record for wildcard domains. Use Vercel's nameservers, or [delegate certificate validation to Vercel](/docs/domains/working-with-domains/add-a-domain#use-wildcard-domains-with-an-external-dns-provider) if you can't change your domain's nameservers.

Issuing a certificate happens in the following way:

1. Vercel asks Let's Encrypt for a certificate for that domain and asks how it can prove control of the domain
2. Let's Encrypt reviews the domain and issues Vercel with a [challenge](https://letsencrypt.org/docs/challenge-types/) to authorise the certificate to be generated. This is usually in the format of creating a file or DNS record with a particular code.
3. Vercel completes the challenge by creating the file (HTTP-01) or the DNS record (DNS-01) with that code, and tells Let's Encrypt it's done
4. Let's Encrypt then checks for the file or DNS record and, if the challenge succeeds, sends Vercel the certificate
5. Vercel then adds the certificate to our infrastructure and it then starts working on HTTPS

The [/.well-known/acme-challenge](# "The /.well-known directory") path is reserved and cannot be redirected or rewritten. Only
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

Learn how DNS works to properly configure your domain.

**Working with Nameservers** [→](/docs/domains/working-with-nameservers)

Learn about nameservers and the benefits Vercel nameservers provide.

**Troubleshooting Domains** [→](/docs/domains/troubleshooting)

Learn about common reasons for domain misconfigurations and how to
troubleshoot your domain on Vercel.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
