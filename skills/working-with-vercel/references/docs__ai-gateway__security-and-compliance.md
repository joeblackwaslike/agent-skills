---
title: AI Gateway Security and Compliance
product: vercel
url: /docs/ai-gateway/security-and-compliance
canonical_url: "https://vercel.com/docs/ai-gateway/security-and-compliance"
last_updated: 2026-09-08
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/security-and-compliance/zdr
  - /docs/ai-gateway/security-and-compliance/disallow-prompt-training
  - /docs/ai-gateway/security-and-compliance/provider-allowlist
  - /docs/ai-gateway/security-and-compliance/model-allowlist
summary: "AI Gateway data privacy and governance controls: zero data retention, prompt training policies, and provider allowlists."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/security-and-compliance.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "7ce86bbea3d57cfad7fbd69a8103c791a896785258fd00b8e8b8d3b0900e63b2"
---

# AI Gateway Security and Compliance

AI Gateway gives you controls over where your data goes and what providers can do with it. You can route only to providers with verified zero data retention agreements, prevent providers from training on your prompts, and restrict which providers serve traffic for your team. These controls work the same way regardless of which model you use.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to control AI provider data handling with AI Gateway](https://vercel.com/kb/guide/control-ai-provider-data) — Prevent AI providers from training on your prompts, enforce zero data retention, and restrict providers and models with
- [Zero Data Retention on AI Gateway](https://vercel.com/blog/zdr-on-ai-gateway)
- [Team-wide Zero Data Retention and prompt training controls now on AI Gateway](https://vercel.com/changelog/zero-data-retention-no-prompt-training-on-ai-gateway)
- [Team-wide provider allowlist on AI Gateway](https://vercel.com/changelog/team-wide-provider-allowlist-on-ai-gateway)
- [OpenResponses Configuration with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/advanced) — Configure provider routing, fallbacks, and restrictions using the OpenResponses API through AI Gateway.
- [AI Gateway FAQ](https://vercel.com/docs/ai-gateway/faq) — Answers to common questions about AI Gateway, including request errors, pricing and markup, SDK and API compatibility, m
- [Products](https://vercel.com/docs/products) — Browse Vercel products for building, deploying, securing, observing, and scaling web applications.
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X

Full cross-link map for this page: [/docs/ai-gateway/security-and-compliance.graph.md](/docs/ai-gateway/security-and-compliance.graph.md)
<!-- /docsgraph:related -->

## What you can do

- **Enforce data privacy**: Route only to providers with verified ZDR agreements with [Zero Data Retention](/docs/ai-gateway/security-and-compliance/zdr)
- **Block training on prompts**: Prevent providers from using your prompts for model training with [Disallow Prompt Training](/docs/ai-gateway/security-and-compliance/disallow-prompt-training)
- **Restrict providers**: Limit which AI providers can serve requests across your team with the [Provider Allowlist](/docs/ai-gateway/security-and-compliance/provider-allowlist)
- **Restrict models**: Control which AI models your team can use with the [Model Allowlist](/docs/ai-gateway/security-and-compliance/model-allowlist)

## Features overview

| Feature                                                                                        | What it does                            | Key details                                                               |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------- |
| [Zero Data Retention](/docs/ai-gateway/security-and-compliance/zdr)                             | Ensure data privacy compliance          | Default ZDR policy, per-request enforcement, verified provider agreements |
| [Disallow Prompt Training](/docs/ai-gateway/security-and-compliance/disallow-prompt-training)   | Prevent prompts from training models    | Per-request enforcement, verified provider agreements                     |
| [Provider Allowlist](/docs/ai-gateway/security-and-compliance/provider-allowlist)               | Restrict which providers serve requests | Team-wide policy for compliance; Pro and Enterprise plans                 |

## Zero data retention

AI Gateway uses zero data retention by default. It permanently deletes your prompts and responses after requests complete. For applications with strict compliance requirements, you can also enforce ZDR at the provider level:

```typescript
const result = await streamText({
  model: 'anthropic/claude-opus-5',
  prompt: 'Analyze this sensitive data...',
  providerOptions: {
    gateway: { zeroDataRetention: true },
  },
});
```

When `zeroDataRetention` is enabled, requests only route to providers with verified ZDR agreements. See the [ZDR documentation](/docs/ai-gateway/security-and-compliance/zdr) for the list of compliant providers.

## Provider allowlist

The provider allowlist lets team owners restrict which AI providers can serve requests through AI Gateway. A request only returns `403` when no allowed provider can serve it. The feature is opt-in and available on Pro and Enterprise plans.

A common reason to enable this is compliance: your team has reviewed a specific set of providers, and you want to guarantee that AI Gateway never routes to one you haven't approved.

See the [Provider Allowlist docs](/docs/ai-gateway/security-and-compliance/provider-allowlist) for configuration and pricing.

## Next steps

- [Enable ZDR](/docs/ai-gateway/security-and-compliance/zdr) for sensitive workloads
- [Disallow prompt training](/docs/ai-gateway/security-and-compliance/disallow-prompt-training) for your data
- [Restrict providers](/docs/ai-gateway/security-and-compliance/provider-allowlist) for compliance


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
