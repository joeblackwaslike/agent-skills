---
title: Vercel Firewall
product: vercel
url: /docs/vercel-firewall
canonical_url: "https://vercel.com/docs/vercel-firewall"
last_updated: 2026-09-10
type: conceptual
prerequisites:
  []
related:
  - /docs/vercel-firewall/ddos-mitigation
  - /docs/vercel-firewall/firewall-concepts
  - /docs/vercel-firewall/vercel-waf/ip-blocking
  - /docs/vercel-firewall/vercel-waf/custom-rules
  - /docs/vercel-firewall/vercel-waf/managed-rulesets
summary: Learn how Vercel Firewall helps protect your applications and websites from malicious attacks and unauthorized access.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/vercel-firewall.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "c22b0800a1e57f26498a065c0bce0027606c429140854698425a30eb5daac719"
---

# Vercel Firewall

The Vercel Firewall is a robust, multi-layered security system designed to protect your applications from a wide range of threats. Every incoming request goes through the following firewall layers:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Control AI crawlers and assistants separately in Vercel Firewall](https://vercel.com/changelog/block-ai-crawlers-and-assistants-independently-with-managed-rules)
- [Bot Protection is now generally available](https://vercel.com/changelog/bot-protection-is-now-generally-available)
- [Bot Protection is now in public beta](https://vercel.com/changelog/bot-protection-is-now-in-public-beta)
- [Create custom WAF rules directly from the Vercel Firewall tab](https://vercel.com/changelog/create-custom-waf-rules-directly-from-the-vercel-firewall-tab)
- [Create Vercel Firewall rules with natural language](https://vercel.com/changelog/create-vercel-waf-custom-rules-using-natural-language)
- [Application authentication on Vercel](https://vercel.com/kb/guide/application-authentication-on-vercel) — Secure application authentication on Vercel across layers: proxy checks, the Data Access Layer, PPR-safe rendering, and
- [Building an AI chat app with RAG and source citations on Vercel](https://vercel.com/kb/guide/building-ai-chat-app-with-rag-and-citations-on-vercel) — A production stack for AI chat with retrieval, reranking, source citations, and background ingestion on Vercel using Nex
- [Deploy a Go backend on Vercel with AI Gateway](https://vercel.com/kb/guide/deploy-a-go-backend-on-vercel-with-ai-gateway) — Build and deploy a Go HTTP server that calls AI Gateway using the standard library, with no SDK dependencies.
- [How to build and maintain HIPAA-compliant applications on Vercel](https://vercel.com/kb/guide/hipaa-compliance-guide-vercel) — Deploy HIPAA-compliant healthcare apps on Vercel with built-in security, BAAs, and scalable serverless infrastructure.
- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [How we run Vercel's CDN in front of Discourse](https://vercel.com/blog/how-we-run-vercels-cdn-in-front-of-discourse)
- [Vercel for Enterprise](https://vercel.com/blog/vercel-for-enterprise)

Full cross-link map for this page: [/docs/vercel-firewall.graph.md](/docs/vercel-firewall.graph.md)
<!-- /docsgraph:related -->

- [Platform-wide firewall](#platform-wide-firewall): With [DDoS mitigation](/docs/vercel-firewall/ddos-mitigation), it protects against large-scale attacks such as DDoS and TCP floods and is available for free for all customers without any configuration required.
- [Web Application Firewall (WAF)](#vercel-waf): A customizable layer for fine-tuning security measures with logic tailored to your needs and [observability](#observability) into your web traffic.

### Concepts

Understand the fundamentals:

- How [Vercel protects every request](/docs/vercel-firewall/firewall-concepts#how-vercel-secures-requests).
- Why [DDoS](/docs/vercel-firewall/firewall-concepts#understanding-ddos) needs to be mitigated.
- How the firewall decides [which rule to apply first](#rule-execution-order).
- How the firewall uses [JA3 and JA4 TLS fingerprints](/docs/vercel-firewall/firewall-concepts#ja3-and-ja4-tls-fingerprints) to identify and restrict malicious traffic.

## Rule execution order

The automatic rules of the platform-wide firewall and the custom rules of the WAF work together in the following execution order:

1. [DDoS mitigation rules](/docs/vercel-firewall/ddos-mitigation)
2. [WAF IP blocking rules](/docs/vercel-firewall/vercel-waf/ip-blocking)
3. [WAF custom rules](/docs/vercel-firewall/vercel-waf/custom-rules)
4. [WAF Managed Rulesets](/docs/vercel-firewall/vercel-waf/managed-rulesets)

When you have more than one custom rule, you can [customize](/docs/vercel-firewall/vercel-waf/custom-rules#custom-rule-configuration) their order in the **Firewall** section in the sidebar of the project.

## Platform-wide firewall

> DDoS Mitigation is available on all plans

Vercel provides automated [DDoS mitigation](/docs/vercel-firewall/ddos-mitigation) for all deployments, regardless of the plan that you are on. With this automated DDoS mitigation, we block incoming traffic if we identify abnormal or suspicious levels of incoming requests.

## Vercel WAF

> Vercel WAF is available on all plans
>
> Those with the member, viewer, developer and administrator roles can access this feature

The [Vercel WAF](/docs/vercel-firewall/vercel-waf) complements the platform-wide firewall by allowing you to define custom protection strategies using the following tools:

- [Custom Rules](/docs/vercel-firewall/vercel-waf/custom-rules)
- [IP Blocking](/docs/vercel-firewall/vercel-waf/ip-blocking)
- [WAF Managed Rulesets](/docs/vercel-firewall/vercel-waf/managed-rulesets)
- [Attack Mode](/docs/vercel-firewall/attack-mode)

You can also manage bypass rules and your WAF configuration programmatically with the [REST API](/docs/vercel-firewall/firewall-api) through the Vercel SDK, direct endpoint calls, or Terraform.

## Observability

You can use the following tools to [monitor the internet traffic](/docs/vercel-firewall/firewall-observability) at your team or project level:

- [Query](/docs/query) in the **Observability** section of the dashboard allows you to create queries, filtered by fields such as [WAF Action](/docs/query/reference#group-by-and-where-fields), to visualize the traffic across your Vercel projects.
- **Firewall** in the Vercel dashboard sidebar on every project allows you to monitor the internet traffic to your deployments with a [traffic monitoring view](/docs/vercel-firewall/firewall-observability#traffic) that includes a live traffic window.
- [Firewall alerts](/docs/vercel-firewall/firewall-observability#firewall-alerts) allow you to react quickly to potential security threats.
- Use [Drains](/docs/drains/using-drains) to send your application logs to a Security Information and Event Management (SIEM) system.

## Priority projects

[Priority projects](/docs/vercel-firewall/priority-projects) are an add-on for Pro and Enterprise teams that you enable per project. Priority builds on the firewall with:

- Visibility into unverified [bot traffic](/docs/bot-management) and richer bot categories.
- Bot signals in [custom rules](/docs/vercel-firewall/vercel-waf/custom-rules) and in middleware and functions.
- Advanced [security observability](/docs/vercel-firewall/firewall-observability) with additional query builder fields.
- Firewall and BotID anomaly alerts, and [higher Firewall limits](/docs/vercel-firewall/priority-projects#higher-firewall-limits).
- [Page Integrity](/docs/vercel-firewall/page-integrity) for script inventory, monitoring, and blocking.
- The [OWASP core ruleset](/docs/vercel-firewall/vercel-waf/managed-rulesets#configure-owasp-core-ruleset) for protection against the OWASP Top 10 on Pro. Enterprise teams can use it on every project.

## Related guides

- [How to keep your storefront running through Black Friday](https://vercel.com/kb/guide/black-friday-reliability): Learn how to tune alerts, bot rules, and spend limits. Rehearse rollback so your team can recover quickly from checkout or order issues on Black Friday.
- [How to prepare your storefront for Black Friday traffic](https://vercel.com/kb/guide/black-friday-preparation): Set baselines and cut backend load. Make your catalog readable to agents and keep orders and AI features reliable. Then load test checkout before traffic peaks.
- [Supporting Compliance with Vercel WAF](https://vercel.com/kb/guide/supporting-compliance-with-vercel-waf): Vercel Firewall provides edge-based traffic filtering and monitoring to help teams meet compliance requirements in security and regulatory frameworks, including PCI DSS, ISO 27001, SOC 2, and HIPAA.
- [How to conduct PCI scans on Vercel: A complete guide to IP safelisting](https://vercel.com/kb/guide/how-to-conduct-pci-scans-on-vercel-guide): Scan and verify your Vercel deployments for secure, PCI-compliant payment processing.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
