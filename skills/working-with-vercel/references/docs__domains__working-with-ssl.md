---
title: Working with SSL Certificates
product: vercel
url: /docs/domains/working-with-ssl
canonical_url: "https://vercel.com/docs/domains/working-with-ssl"
last_updated: 2026-06-08
type: conceptual
prerequisites:
  - /docs/domains
related:
  - /docs/domains/custom-SSL-certificate
  - /docs/domains/troubleshooting
summary: Learn how Vercel uses SSL certification to keep your site secure.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/working-with-ssl.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "87e03a8fee70e46e14abbd2e7b772bfb658dcb575537d7765fe3518fff98a44d"
---

# Working with SSL Certificates

An SSL certificate enables encrypted communication between user's browser and your web server to be encrypted. The certificate is installed on the web server and allows for website authentication and data encryption. This is particularly important if you are working with any sort of authentication and personal or financial data.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can I use my domain on Vercel with A records?](https://vercel.com/kb/guide/a-record-and-caa-with-vercel?from=related) — Point your apex domain to Vercel with an A record \(76.76.21.21 or your domain card's value\), pair it with a www CNAME,
- [Build a multi-tenant app with Next.js and Vercel](https://vercel.com/kb/guide/nextjs-multi-tenant-application?from=related) — Create a Next.js application with multi-tenancy and custom domain support on Vercel.
- [Why is my domain not automatically generating an SSL/TLS certificate?](https://vercel.com/kb/guide/domain-not-generating-ssl-certificate?from=related) — Information on why a domain may not be automatically generating an SSL/TLS certificate.
- [How do I resolve "ERR_SSL_PROTOCOL_ERROR" with Vercel?](https://vercel.com/kb/guide/resolve-err-ssl-protocol-error-with-vercel?from=related) — Information about how to resolve the "ERR_SSL_PROTOCOL_ERROR" error with Vercel.
- [Custom SSL Certificates](https://vercel.com/docs/domains/custom-ssl-certificate?from=related) — By default, Vercel provides all domains with a custom SSL certificates. However, Enterprise teams can upload their own c
- [Pre-Generate SSL Certificates](https://vercel.com/docs/domains/pre-generating-ssl-certs?from=related) — test
- [Encryption & TLS](https://vercel.com/docs/cdn-security/encryption?from=related) — Learn how Vercel encrypts data in transit and at rest.
- [vercel certs](https://vercel.com/docs/cli/certs?from=related) — Learn how to manage certificates for your domains using the vercel certs CLI command.
- [Working with Domains](https://vercel.com/docs/domains/working-with-domains?from=related) — Learn how domains work and the options Vercel provides for managing them.

Full cross-link map for this page: [/docs/domains/working-with-ssl.graph.md](/docs/domains/working-with-ssl.graph.md)
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

For information about when SSL certificate renewals happen, see [When is the SSL Certificate on my Vercel Domain renewed?](/kb/guide/renewal-of-ssl-certificates-with-a-vercel-domain)

The [/.well-known](# "The /.well-known directory") path is reserved and cannot be redirected or rewritten. Only
Enterprise teams can configure custom SSL. [Contact sales](/contact/sales) to
learn more.

## Troubleshooting

To learn more about common SSL issues, see the [troubleshooting](/docs/domains/troubleshooting#common-ssl-certificate-issues) doc.

## Related


---

[View full sitemap](/docs/sitemap)
