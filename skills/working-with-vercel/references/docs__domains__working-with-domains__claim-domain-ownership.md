---
title: Claiming Domain Ownership
product: vercel
url: /docs/domains/working-with-domains/claim-domain-ownership
canonical_url: "https://vercel.com/docs/domains/working-with-domains/claim-domain-ownership"
last_updated: 2026-09-18
type: how-to
prerequisites:
  - /docs/domains/working-with-domains
  - /docs/domains
related:
  - /docs/domains/working-with-domains/transfer-your-domain
summary: Learn how to claim ownership of a domain that is registered with another Vercel account by verifying DNS ownership.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/working-with-domains/claim-domain-ownership.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "cc3afc2db2f167c4423698b2a7d68ebb2fc14e68a620ef1232e4231f048876dd"
---

# Claiming Domain Ownership

If a domain is registered with another Vercel account and you need to take ownership of it, Vercel will automatically prompt you to verify DNS ownership when you try to add the domain. This allows you to claim the domain and transfer it to your team.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Claim Domain Ownership](https://vercel.com/docs/rest-api/domains/claim-domain-ownership) — POST /v9/domains/{domain}/claim — Claim ownership of a domain for the authenticated team by verifying a TXT record. The
- [Get Domain Verification Record](https://vercel.com/docs/rest-api/domains/get-domain-verification-record) — GET /v9/domains/{domain}/verification — Get the TXT verification record needed to claim ownership of a domain for the au
- [Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [Transferring Domains to Another Team or Project](https://vercel.com/docs/domains/working-with-domains/transfer-your-domain) — Domains can be transferred to another team or project within Vercel, or to and from a third-party registrar. Learn how t
- [get_domain_verification_record](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/get_domain_verification_record) — Use get_domain_verification_record with Vercel MCP.

Full cross-link map for this page: [/docs/domains/working-with-domains/claim-domain-ownership.graph.md](/docs/domains/working-with-domains/claim-domain-ownership.graph.md)
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

## When to use Account Recovery

You must control the root domain's DNS to add the verification TXT record. If someone else controls it, ask that owner to add the record.

If you bought the domain through Vercel, it uses Vercel's nameservers, and you can't access the owning account, you can't add the TXT record needed to claim it. Use [Account Recovery](/accountrecovery) to regain access first.

## When verification is required again

Claiming a domain for a team and verifying its use on a project are separate checks. After you claim the domain at the team level, adding records or unused subdomains to your projects doesn't require repeated ownership verification.

If the domain or subdomain is already associated with another project, Vercel requires project-level verification when you add it, including when it is serving traffic. Follow the verification prompt for that specific hostname; claiming the root domain doesn't bypass this check.

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
