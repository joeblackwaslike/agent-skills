---
title: Vercel Connect product terms
product: vercel
url: /docs/connect/legal
canonical_url: "https://vercel.com/docs/connect/legal"
last_updated: 2026-08-26
type: reference
prerequisites:
  - /docs/connect
related:
  - /docs/connect
summary: Product terms governing your use of Vercel Connect, including Customer Managed Connectors, Vercel Managed Connectors, and Vercel Assisted Setup.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/legal.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "8508b6809e0c1ebf0ea753ec1944c7eba90f69beaaa4de24432206ecfb13b265"
---

# Vercel Connect product terms

These product terms apply to your use of Vercel Connect.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Connect](https://vercel.com/kb/guide/vercel-connect) — Use Vercel Connect to call provider APIs like Slack, GitHub, Linear, Microsoft, Discord, Snowflake, and Salesforce from
- [Connectors in Vercel Connect](https://vercel.com/docs/connect/concepts/connectors) — A connector is the team-owned record that represents one third-party service. Its type determines which capabilities are
- [Vercel Connect Concepts](https://vercel.com/docs/connect/concepts) — Understand the core building blocks of Vercel Connect: connectors, installations, tokens, project links, triggers, and a
- [Authentication in Vercel Connect](https://vercel.com/docs/connect/concepts/authentication) — Every Vercel Connect token request has two legs that both have to authenticate: the caller calling Vercel Connect, and V
- [Vercel Connect Limits](https://vercel.com/docs/connect/limits) — Platform limits and per-minute rate limits for Vercel Connect SDK methods, CLI commands, and public endpoints.
- [Get a Connect token](https://vercel.com/docs/rest-api/connect/get-a-connect-token) — POST /v1/connect/token/{connector} — Get an access token for a connector identified by the path parameter and scoped to

Full cross-link map for this page: [/docs/connect/legal.graph.md](/docs/connect/legal.graph.md)
<!-- /docsgraph:related -->

## 1. Definitions

**Customer Managed Connector** means Customer registers an OAuth client directly with a Third Party Platform and authorizes Vercel to store Customer's credentials and exchange tokens via that OAuth client on Customer's behalf.

**Third Party Platform** means a third party platform that Customer interacts with using Vercel Connect.

**Vercel Assisted Setup** means Customer authorizes and instructs Vercel to perform some or all of the steps required for Customer to register an OAuth client directly with an [eligible Third Party Platform](/docs/connect#connector-ownership-models).

**Vercel Managed Connector** means Vercel registers an OAuth client with the Third Party Platform and Customer authorizes Vercel's OAuth client to access Customer's account or workspace.

## 2. General

(a) Customer may only use Vercel Connect in (i) Customer Managed Connector, including through Vercel Assisted Setup, or (ii) Vercel Managed Connector.

(b) Customer acknowledges and agrees that all interactions with Third Party Platforms through Vercel Connect by Vercel are done on instruction of Customer. Customer retains primary responsibility under Customer's agreements with each such Third Party Platform in connection with Customer's use of Vercel Connect.

## 3. Vercel Managed Connector

Customer may use Vercel Managed Connector only with [Permitted Third Party Platforms](/docs/connect#connector-ownership-models) and will be bound by the terms and policies of that Third Party Platform referred on that webpage, if any.

## 4. Vercel Assisted Setup

In using Vercel Assisted Setup, Customer authorizes and instructs Vercel to connect and retrieve relevant credentials and data from the eligible Third Party Platforms on Customer's behalf for the purposes of expediting their Customer Managed Connector setup. Vercel Assisted Setup is performed as a one-off action and Vercel does not manage any connection created under Vercel Assisted Setup.

## 5. Restricted Use

Customer must not route through Vercel Connect any Cardholder Data (as defined under PCI DSS), Protected Health Information (as defined under HIPAA), Non-Public Personal Information (as defined under GLBA), ITAR-controlled technical data, or other categories of regulated data designated by Vercel, except as expressly approved by Vercel in writing.

## 6. Customer Actions

Customer authorizes and will be responsible for all actions taken via tokens minted or exchanged by Vercel Connect.

## 7. Third Party Platform Availability

Vercel may at any time add or remove Third Party Platforms to Vercel Connect without notice to Customer. Vercel does not warrant availability or uptime of any specific Third Party Platform. If a Third Party Platform suspends, terminates, or materially modifies developer access, Vercel will use commercially reasonable efforts to restore service, but is not liable for the interruption.

## 8. Token Revocation

Vercel will attempt to revoke tokens with Third Party Platforms if instructed by Customer. Customer acknowledges that such attempts may not succeed due to circumstances outside of Vercel's control and Customer is ultimately responsible for revoking tokens with Third Party Platforms.

## 9. Representations and Warranties

Customer represents and warrants that:

(a) Customer has all necessary consents and authority to authorize Vercel to provide Vercel Connect;

(b) Customer's authorization under Section 9(a) does not breach any applicable Third Party Platform's developer or Customer-side terms;

(c) Customer holds all rights necessary in the credentials, scopes, and content Customer provides to or routes through Vercel Connect; and

(d) all data routed through or in connection with Vercel Connect will be done in accordance with the applicable Third Party Platform terms.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
