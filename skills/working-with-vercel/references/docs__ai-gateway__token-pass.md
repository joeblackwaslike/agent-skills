---
title: Token Pass
product: vercel
url: /docs/ai-gateway/token-pass
canonical_url: "https://vercel.com/docs/ai-gateway/token-pass"
last_updated: 2026-10-14
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/authentication-and-byok/api-keys
  - /docs/ai-gateway/token-pass/models-and-routing
  - /docs/ai-gateway/security-and-compliance/zdr
summary: Get $150 of monthly credit for featured open-weight models for $30 per month, and use it in the coding agent or app of your choice through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/token-pass.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "7d98a1339ae4a4c6a23bf106d5d46dd2b3afdc9aa9d193d0769cb470a6d86a79"
---

# Token Pass

> Token Pass is available on Pro plans

Token Pass is a monthly token subscription from Vercel. For $30 per team each month, you get $150 of credit for featured open-weight models, served by a featured Token Pass Provider through [AI Gateway](/docs/ai-gateway). You can use it in any coding agent or app that connects to AI Gateway. Token Pass includes **zero data retention (ZDR)**, so AI Gateway and the featured provider don't retain your prompts or outputs.

> **💡 Note:** Token Pass is in Early Access. Vercel may change the featured models and the
> providers that serve them. This page lists the current set.

## At a glance

| Item                 | Details                                                                                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Price                | $30 per team per month, added to your Pro subscription                                                                                                                        |
| Credit               | $150 per billing period                                                                                                                                                       |
| Featured models      | Kimi K3 (`moonshotai/kimi-k3`), Kimi K3.1 Pro (`moonshotai/kimi-k3.1-pro`), GLM 5.3 (`zai/glm-5.3`), GLM 5.3 Flash (`zai/glm-5.3-flash`), and DeepSeek V4.1 Flash (`deepseek/deepseek-v4.1-flash`)                        |
| Provider             | Vercel Token Pass (`token-pass`), currently served by Wafer                                                                                                                   |
| Authentication       | Any AI Gateway credential works, including a standard API key, an OIDC token, and signing in with your Vercel account. A Token Pass-scoped key is optional and only works with featured models |
| Data handling        | Zero data retention. Prompts aren't used for training                                                                                                                         |
| Credit expiry        | End of each billing period. Unused credit doesn't roll over                                                                                                                   |
| When credit runs out | Standard API keys and OIDC tokens fall back to your AI Gateway credits. Token Pass-scoped keys fail until your next billing period                                            |
| Eligibility          | Pro teams                                                                                                                                                                     |

## Who can subscribe

Token Pass is available to Pro teams:

- **Pro teams** subscribe from the [Token Pass tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Ftoken-pass%3Fsource%3Dtoken_pass_docs\&title=Go+to+Token+Pass) in AI Gateway.
- **Hobby teams** upgrade to Pro first. The Token Pass tab takes you through the upgrade and then the subscription.
- **Pro trial teams** upgrade to a paid Pro plan first.
- **Enterprise teams** can't subscribe to Token Pass.

Team owners and members with permission to manage billing can subscribe and cancel.

Early Access has a limited number of spots. When it's full, the Token Pass tab shows a waitlist instead of the subscribe button. Joining the waitlist doesn't upgrade your plan or charge you.

## How it works

1. **Subscribe** from the Token Pass tab. Your first charge and credit cover the rest of your current billing period.
2. **Connect your agent** with any AI Gateway credential. An existing API key, an OIDC token, or signing in with your Vercel account all work.
3. **Pick a featured model.** While your team has Token Pass credit remaining, AI Gateway sends the request to the Token Pass provider and draws down your Token Pass credit automatically, whatever credential you use.
4. **Credit resets** to $150 at the start of each billing period.

Token Pass credit only pays for featured models served by the Token Pass provider. The same standard key covers both featured and other models. Other models bill your [AI Gateway credits](/docs/ai-gateway/pricing) as usual.

To create a key that only spends Token Pass credit, turn on **Restrict to Token Pass only** under **Advanced Configuration** when you [create an API key](/docs/ai-gateway/authentication-and-byok/api-keys#create-a-key). See [Models and routing](/docs/ai-gateway/token-pass/models-and-routing) for how standard keys and Token Pass keys route.

## Featured models and providers

Token Pass credit covers these models:

| Model               | Model ID                       |
| ------------------- | ------------------------------ |
| Kimi K3             | `moonshotai/kimi-k3`           |
| Kimi K3.1 Pro       | `moonshotai/kimi-k3.1-pro`     |
| GLM 5.3             | `zai/glm-5.3`                  |
| GLM 5.3 Flash       | `zai/glm-5.3-flash`            |
| DeepSeek V4.1 Flash | `deepseek/deepseek-v4.1-flash` |

> **💡 Note:** `deepseek/deepseek-v4.1-flash` routes to DeepSeek's latest V4.1 Flash
> weights, currently `deepseek/deepseek-v4.1-flash-1017` (the 10/17 snapshot),
> following DeepSeek's own naming convention.

In AI Gateway, these requests show **Vercel Token Pass** (`token-pass`) as the provider. Token Pass currently serves its models through Wafer, a Non-Vercel Service, and follows Wafer's terms and conditions listed in the [Notices and License Information](/legal/notices-and-license-information).

See [Models and routing](/docs/ai-gateway/token-pass/models-and-routing) for what is and isn't covered.

### List price

AI Gateway deducts each Token Pass request from your credit at the model's list price, the model provider's own API rate. Your $150 of monthly credit covers usage at these rates, in USD per 1 million tokens:

| Model               | Input | Cached input | Output |
| ------------------- | ----- | ------------ | ------ |
| Kimi K3             | $3.00 | $0.30        | $15.00 |
| Kimi K3.1 Pro       | $2.00 | $0.20        | $10.00 |
| GLM 5.3             | $1.40 | $0.26        | $4.40  |
| GLM 5.3 Flash       | $0.15 | $0.03        | $0.50  |
| DeepSeek V4.1 Flash | $0.15 | $0.003       | $0.60  |

## Data handling

Token Pass requests have [zero data retention](/docs/ai-gateway/security-and-compliance/zdr) (ZDR), and your prompts aren't used to train models. If you turn on team-wide ZDR or [disallow prompt training](/docs/ai-gateway/security-and-compliance/disallow-prompt-training), requests still reach Token Pass.

Team-wide ZDR's $0.10 per 1,000 requests fee doesn't apply to featured-model requests while your team's Token Pass is active with credit remaining. Once the credit runs out, and for non-featured models, the fee applies as usual. Fallback requests follow your team's ZDR setting, so with team-wide ZDR enabled they route only to ZDR providers.

## Next steps

- [Getting started](/docs/ai-gateway/token-pass/getting-started): subscribe and send a first request with your existing AI Gateway credential
- [Coding and personal agents](/docs/ai-gateway/token-pass/coding-agents): set up fx, Claude Code, Codex, Cline, or OpenCode
- [Models and routing](/docs/ai-gateway/token-pass/models-and-routing): routing, errors, optional Token Pass-scoped keys, and team settings
- [Credits and billing](/docs/ai-gateway/token-pass/billing): proration, resets, cancelling, and downgrades

## FAQ

### Is Token Pass connected to AI Gateway?

Yes. Token Pass requests run through AI Gateway, so you can use the coding agent of your choice or build your own agents with the AI SDK. Token Pass credit has a separate balance and only applies to featured models served by a Token Pass Provider. Regular [AI Gateway usage](/docs/ai-gateway/pricing) uses your AI Gateway credit balance.

### Which coding agents does it work with?

Any agent that connects to AI Gateway. [Coding and personal agents](/docs/ai-gateway/token-pass/coding-agents) has setup steps for fx, Claude Code, Codex, Cline, and OpenCode.

### What happens when I use all my credits?

It depends on the credential. With a standard AI Gateway API key or an OIDC token, requests fall back to your AI Gateway credits automatically at the serving provider's rates once Token Pass credit runs out. No manual key switching is needed, but your team needs enough AI Gateway credits for those requests to succeed. With a Token Pass-scoped API key, requests fail until your next billing period, with no fallback, so you're never charged beyond the pass.

See [Models and routing](/docs/ai-gateway/token-pass/models-and-routing) for details on credentials, fallback, and routing.

### Do unused credits roll over?

No. Credit expires at the end of each billing period, and a new $150 arrives when the next one starts.

### Is Token Pass per user or per team?

Per team. Everyone on the team shares the same $150.

### Can I use Token Pass in apps I deploy?

Yes, with a standard AI Gateway API key or the deployment's OIDC token. While your team has Token Pass credit, featured-model requests draw down that credit. When the credit runs out, those requests fall back to your AI Gateway credits at the serving provider's rates, so production traffic keeps running as long as your team has AI Gateway credits.

### Is my data retained or used for training?

No. Token Pass requests have zero data retention and aren't used for training.

### Will more models be added?

Vercel plans to add featured models and providers over time. This page lists the current set.

### How do I cancel?

In AI Gateway, open **Token Pass**. Under **Billing Settings**, select **Unsubscribe from Token Pass** and confirm. You keep your credit until the end of the current billing period, and Vercel doesn't refund the current period. See [Credits and billing](/docs/ai-gateway/token-pass/billing#cancel).

## Terms

These Token Pass Terms supplement the [AI Product Terms](/legal/ai-product-terms) and control if the two conflict.

1. The featured models and the providers serving them (each, a "Token Pass Provider"), as identified in [Featured models and providers](#featured-models-and-providers), are Non-Vercel Services subject to the applicable provider terms listed in the [Notices and License Information](/legal/notices-and-license-information). Vercel may change the featured models and Token Pass Providers at any time.
2. Token Pass credits may only be used for requests to the featured models served by a Token Pass Provider through AI Gateway, and expire at the end of each monthly billing period.
3. Vercel may end Token Pass at any time, for any reason, with a pro-rata refund of that month's fee.
4. Vercel may cancel Token Pass and remove unused credits, without a refund, if it reasonably believes Token Pass is being misused, including through multiple accounts, or that the [Acceptable Use Policy](/legal/acceptable-use-policy) has been violated.

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
