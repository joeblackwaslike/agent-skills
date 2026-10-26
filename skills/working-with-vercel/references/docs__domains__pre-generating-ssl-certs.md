---
title: Pre-Generate SSL Certificates
product: vercel
url: /docs/domains/pre-generating-ssl-certs
canonical_url: "https://vercel.com/docs/domains/pre-generating-ssl-certs"
last_updated: 2026-09-16
type: how-to
prerequisites:
  - /docs/domains
related:
  - /docs/domains/working-with-domains/transfer-your-domain
  - /docs/cli/certs
  - /docs/domains/managing-dns-records
summary: test
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/pre-generating-ssl-certs.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "9624a7c65190e1fc442bbe8f79cda69a5a8c3960224612e4bc907130be03e3e7"
---

# Pre-Generate SSL Certificates

> **💡 Note:** This page is part the domains transfer experience. See [this
> page](/docs/domains/working-with-domains/transfer-your-domain#transfer-a-domain-to-vercel)
> for the full set of steps to transfer a domain to Vercel.

This article guides you through all the steps necessary to set up SSL certificates for a domain
being migrated to Vercel without downtime. Your domain should be serving content from 3rd party
servers that are unrelated to Vercel, and you need to be prepared to make the necessary
DNS changes.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Pre-generate SSL certs, now in the Domains dashboard](https://vercel.com/changelog/pre-generate-domain-ssl-certs-now-in-dashboard)
- [Migrate self-hosted Next.js and containers from AWS to Vercel](https://vercel.com/kb/guide/migrate-containers-from-aws-to-vercel) — Migrate Next.js apps and HTTP containers from AWS to Vercel. Configure AWS access, assess background workers, and plan t
- [Migrate to Vercel from Cloudflare](https://vercel.com/kb/guide/migrate-to-vercel-from-cloudflare) — Migrate your website's configuration from Cloudflare Pages or Workers to Vercel
- [How can I migrate a site to Vercel without downtime?](https://vercel.com/kb/guide/zero-downtime-migration) — Information about how to assign a Vercel deployment to a domain without downtime.
- [How can I manage my Vercel DNS records?](https://vercel.com/kb/guide/how-to-manage-vercel-dns-records) — Add, edit, and delete Vercel DNS records from the dashboard, CLI, or REST API, and fix the Invalid Configuration error o
- [Why is my Vercel domain not verified?](https://vercel.com/kb/guide/why-is-my-vercel-domain-unverified) — Information on why a Vercel domain may not be verified and how to verify it.
- [Working with SSL Certificates](https://vercel.com/docs/domains/working-with-ssl) — Learn how Vercel uses SSL certification to keep your site secure.
- [Uploading Custom SSL Certificates](https://vercel.com/docs/domains/custom-ssl-certificate) — By default, Vercel provides all domains with a custom SSL certificates. However, Enterprise teams can upload their own c
- [Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain) — Add and configure a custom domain for your Vercel project using the CLI.
- [Transferring Domains to Another Team or Project](https://vercel.com/docs/domains/working-with-domains/transfer-your-domain) — Domains can be transferred to another team or project within Vercel, or to and from a third-party registrar. Learn how t
- [Encryption and TLS](https://vercel.com/docs/cdn-security/encryption) — Learn how Vercel encrypts data in transit and at rest.

Full cross-link map for this page: [/docs/domains/pre-generating-ssl-certs.graph.md](/docs/domains/pre-generating-ssl-certs.graph.md)
<!-- /docsgraph:related -->

You can do this using either the Vercel Domains dashboard, or the [Vercel CLI](/docs/cli/certs).

## Generating a Certificate

To issue certificates through the dashboard for a domain, first ensure the domain belongs to a team. You can then click into the domain management page,
scroll down to "SSL Certificates" and click "Pre-generate SSL certificates". Please note this option is only available if you do not already
have any SSL certificates issued for the domain.

![Pre-Generate button found under the SSL Certificates section of the Domain configuration page](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/domains/ssl-pregen-light.png)

If you choose to do this through the terminal, you can run the following command to get the challenge records for your domain:

```bash filename="terminal"
vercel certs issue "*.example.com" example.com --challenge-only
```

*Creating the challenge for the certificate that will be used for \*.example.com
and example.com.*

## Setting your DNS records and finalizing

To verify ownership of your domain, copy the TXT records into your DNS on the registrar you are using.

Click "Verify" to verify that the records have been set and issue the certificate. DNS records can take time to propagate,
so if it doesn't work immediately, it's worth waiting for the records to propagate before taking further action.

![Copy certificates modal containing the TXT records to copy into your DNS registrar](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/domains/copy-challenges-light.png)

To check whether the TXT records have propagated, you can use the following command in a terminal of your choice:

```bash filename="terminal"
nslookup -type=TXT example.com
```

*Looking up the TXT records for example.com*

Once TXT records have propagated, you can click "Verify" to issue the SSL certificates.

If you choose to issue SSL certificates through the terminal, you can run the command previously used without the
`--challenge-only` flag:

```bash filename="terminal"
vercel certs issue "*.example.com" example.com
```

*Issuing a certificate that covers both \*.example.com and example.com.*

## Verifying the Certificate

Before you change the DNS records of your domain, you can verify if the certificate is correct and will be accepted by browsers. Run the following command:

```bash filename="terminal"
curl https://example.com --resolve example.com:443:76.76.21.21 -I
```

*curl command that sends a request directly to Vercel, ignoring the DNS
configuration of the domain.*

If the request is successful, the certificate is working and you can proceed with the migration.

## Finishing connecting your domain to Vercel

To migrate your deployment to Vercel, add the provided A or CNAME record from your project’s Domain Settings page to your DNS configuration so your domain points to Vercel webservers.
See [this detailed guide](/kb/guide/a-record-and-caa-with-vercel) on using domains with **A** records for more information.

For more details on performing a migration, see [this guide](/docs/domains/managing-dns-records#migrating-dns-records-from-an-external-registrar).


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
