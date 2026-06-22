---
title: Security and Compliance
product: vercel
url: /docs/ai-gateway/security-and-compliance
canonical_url: "https://vercel.com/docs/ai-gateway/security-and-compliance"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/security-and-compliance/zdr
  - /docs/ai-gateway/security-and-compliance/disallow-prompt-training
  - /docs/ai-gateway/security-and-compliance/provider-allowlist
summary: Learn about security and compliance on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/security-and-compliance.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "231866a037b2717aea6293a3f1a55bcbd5a00c7a15d8150618e162aff4c87fb7"
---

# Security and Compliance

AI Gateway gives you controls over where your data goes and what providers can do with it. You can route only to providers with verified zero data retention agreements, prevent providers from training on your prompts, and restrict which providers serve traffic for your team. These controls work the same way regardless of which model you use.

## What you can do

- **Enforce data privacy**: Route only to providers with verified ZDR agreements with [Zero Data Retention](/docs/ai-gateway/security-and-compliance/zdr)
- **Block training on prompts**: Prevent providers from using your prompts for model training with [Disallow Prompt Training](/docs/ai-gateway/security-and-compliance/disallow-prompt-training)
- **Restrict providers**: Limit which AI providers can serve requests across your team with the [Provider Allowlist](/docs/ai-gateway/security-and-compliance/provider-allowlist)

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
  model: 'anthropic/claude-opus-4.7',
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
