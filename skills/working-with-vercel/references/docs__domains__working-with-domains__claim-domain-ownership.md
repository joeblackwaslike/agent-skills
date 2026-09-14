---
title: Claiming Domain Ownership
product: vercel
url: /docs/domains/working-with-domains/claim-domain-ownership
canonical_url: "https://vercel.com/docs/domains/working-with-domains/claim-domain-ownership"
last_updated: 2026-07-20
type: how-to
prerequisites:
  - /docs/domains/working-with-domains
  - /docs/domains
related:
  - /docs/domains/working-with-domains/transfer-your-domain
summary: Learn how to claim ownership of a domain that is registered with another Vercel account by verifying DNS ownership.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/working-with-domains/claim-domain-ownership.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "75361abca6143ebdcd3361d13a135f18d8198c71fa33acb3654792d98a1c2048"
---

# Claiming Domain Ownership

If a domain is registered with another Vercel account and you need to take ownership of it, Vercel will automatically prompt you to verify DNS ownership when you try to add the domain. This allows you to claim the domain and transfer it to your team.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Domain Linked to Another Account](https://vercel.com/kb/guide/domain-linked-to-another-account?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fclaim-domain-ownership&source_site=vercel-docs&relationship=related) — This guide explains how to claim a domain already linked to another Vercel account and add it to your team using the dom
- [Why is my Vercel domain not verified?](https://vercel.com/kb/guide/why-is-my-vercel-domain-unverified?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fclaim-domain-ownership&source_site=vercel-docs&relationship=related) — Information on why a Vercel domain may not be verified and how to verify it.
- [How can I manage my Vercel DNS records?](https://vercel.com/kb/guide/how-to-manage-vercel-dns-records?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fclaim-domain-ownership&source_site=vercel-docs&relationship=related) — Add, edit, and delete Vercel DNS records from the dashboard, CLI, or REST API, and fix the Invalid Configuration error o
- [How can I migrate a site to Vercel without downtime?](https://vercel.com/kb/guide/zero-downtime-migration?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fclaim-domain-ownership&source_site=vercel-docs&relationship=related) — Information about how to assign a Vercel deployment to a domain without downtime.
- [Claim Domain Ownership](https://vercel.com/docs/rest-api/domains/claim-domain-ownership?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fclaim-domain-ownership&source_site=vercel-docs&relationship=related) — POST /v9/domains/{domain}/claim — Claim ownership of a domain for the authenticated team by verifying a TXT record. The
- [Get Domain Verification Record](https://vercel.com/docs/rest-api/domains/get-domain-verification-record?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fclaim-domain-ownership&source_site=vercel-docs&relationship=related) — GET /v9/domains/{domain}/verification — Get the TXT verification record needed to claim ownership of a domain for the au
- [Managing DNS Records](https://vercel.com/docs/domains/managing-dns-records?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fclaim-domain-ownership&source_site=vercel-docs&relationship=related) — Learn how to add, verify, and remove DNS records for your domains on Vercel with this guide.
- [Transferring Domains to Another Team or Project](https://vercel.com/docs/domains/working-with-domains/transfer-your-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fclaim-domain-ownership&source_site=vercel-docs&relationship=related) — Domains can be transferred to another team or project within Vercel, or to and from a third-party registrar. Learn how t
- [Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fclaim-domain-ownership&source_site=vercel-docs&relationship=related) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.

Full cross-link map for this page: [/docs/domains/working-with-domains/claim-domain-ownership.graph.md](/docs/domains/working-with-domains/claim-domain-ownership.graph.md?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Fclaim-domain-ownership&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## When claiming is required

When you add an existing domain via the **Connect External** button on your team's Domains page, Vercel automatically checks if you already registered the domain with another Vercel account. If so, you'll be prompted to verify ownership before you can use it.

Use this flow when:

- You registered a domain with another Vercel account that you no longer have access to
- You need to transfer domain ownership between Vercel teams without access to the source team
- You've lost access to the original Vercel account but control the domain's DNS

> **💡 Note:** If you have access to both Vercel accounts, consider using the [Move
> feature](/docs/domains/working-with-domains/transfer-your-domain#transfer-a-domain-to-another-vercel-user-or-team)
> instead, which is simpler and doesn't require DNS verification.

## Getting started

### Prerequisites

- You must have permission to add domains on the target team
- You must have access to modify DNS records for the domain

### Claim a domain

- ### Navigate to your team's Domains page
  Go to the [**Domains** section in your team dashboard sidebar](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+team%27s+domains+page) and click **Connect External**.

- ### Enter the domain name
  In the modal, enter the domain you want to add (for example, `example.com`) and click **Continue**.

  Vercel will check the domain's ownership status. If you registered the domain with another Vercel account, you'll be shown the claim verification step.

- ### Add the TXT record to your DNS
  You'll be shown a TXT record that you need to add to your domain's DNS configuration. The record will look similar to:

  | Type | Name                  | Value                  |
  | ---- | --------------------- | ---------------------- |
  | TXT  | `_vercel.example.com` | `vc-domain-verify=...` |

  Add this record with your DNS provider.
  > **💡 Note:** DNS changes can take a few minutes to propagate. If verification fails
  > initially, wait a few minutes and try again.

- ### Verify and claim
  Once you've added the TXT record, click **Verify & Claim** to complete the ownership transfer. Vercel will check for the TXT record and, if found, transfer the domain to your team.

  After successful verification, you'll land on the domain's configuration page where you can manage DNS records and assign it to projects.

## Troubleshooting

### TXT record not found

If you receive a "TXT record not found" error, ensure that:

1. You've added the TXT record to the correct domain (check the verification domain shown in the modal)
2. The TXT record value matches exactly what was provided
3. Enough time has passed for DNS propagation (typically a few minutes, but can take up to 48 hours in some cases)

You can verify your TXT record has propagated using a DNS lookup tool or by running the following in your terminal:

```bash filename="terminal"
dig TXT _vercel.example.com
```


---

[View full sitemap](/docs/sitemap)
