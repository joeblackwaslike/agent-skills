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
  - /docs/ai-gateway/token-pass/models-and-routing
  - /docs/ai-gateway/security-and-compliance/zdr
  - /docs/ai-gateway/security-and-compliance/disallow-prompt-training
summary: Get $80 of monthly credit for featured open-weight models for $30 per month, and use it in the coding agent or app of your choice through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/token-pass.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "87517a613f5be9d807ad9c30d63168d9cafa13b874c9dd399c55b54446f74424"
---

# Token Pass

> Token Pass is available on Pro plans

Token Pass is a monthly token subscription from Vercel. For $30 per team each month, you get $80 of credit for featured open-weight models, served by a featured Token Pass Provider through [AI Gateway](/docs/ai-gateway). You can use it in any coding agent or app that connects to AI Gateway. Token Pass includes **zero data retention (ZDR)**, so AI Gateway and the featured provider don't retain your prompts or outputs.

> **💡 Note:** Token Pass is in Early Access. Vercel may change the featured models and the
> providers that serve them. This page lists the current set.

## At a glance

| Item                 | Details                                                                           |
| -------------------- | --------------------------------------------------------------------------------- |
| Price                | $30 per team per month, added to your Pro subscription                            |
| Credit               | $80 per billing period                                                            |
| Featured models      | Kimi K3 (`moonshotai/kimi-k3`), GLM 5.3 (`zai/glm-5.3`), and DeepSeek V4.1 Flash (`deepseek/deepseek-v4.1-flash`) |
| Provider             | Vercel Token Pass (`token-pass`), currently served by Wafer                       |
| API key              | A Token Pass API key, which only works with featured models                       |
| Data handling        | Zero data retention. Prompts aren't used for training                             |
| Credit expiry        | End of each billing period. Unused credit doesn't roll over                       |
| When credit runs out | Token Pass requests fail until your next billing period. You aren't charged extra |
| Eligibility          | Pro teams                                                                         |

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
2. **Create a Token Pass API key** and connect your agent with it.
3. **Pick a featured model.** AI Gateway sends the request to the Token Pass provider and deducts the cost from your Token Pass credit.
4. **Credit resets** to $80 at the start of each billing period.

Token Pass credit only pays for featured models served by the Token Pass provider. For other models, use a regular AI Gateway API key, which bills your [AI Gateway credits](/docs/ai-gateway/pricing).

## Featured models and providers

Token Pass credit covers these models:

| Model               | Model ID                       |
| ------------------- | ------------------------------ |
| Kimi K3             | `moonshotai/kimi-k3`           |
| GLM 5.3             | `zai/glm-5.3`                  |
| DeepSeek V4.1 Flash | `deepseek/deepseek-v4.1-flash` |

> **💡 Note:** `deepseek/deepseek-v4.1-flash` routes to DeepSeek's latest V4.1 Flash
> weights, currently `deepseek/deepseek-v4.1-flash-1017` (the 10/17 snapshot),
> following DeepSeek's own naming convention.

In AI Gateway, these requests show **Vercel Token Pass** (`token-pass`) as the provider. Token Pass currently serves its models through Wafer, a Non-Vercel Service, and follows Wafer's terms and conditions listed in the [Notices and License Information](/legal/notices-and-license-information).

See [Models and routing](/docs/ai-gateway/token-pass/models-and-routing) for what is and isn't covered.

### List price

AI Gateway deducts each Token Pass request from your credit at the model's list price, the model provider's own API rate. Your $80 of monthly credit covers usage at these rates, in USD per 1 million tokens:

| Model               | Input | Cached input | Output |
| ------------------- | ----- | ------------ | ------ |
| Kimi K3             | $3.00 | $0.30        | $15.00 |
| GLM 5.3             | $1.40 | $0.26        | $4.40  |
| DeepSeek V4.1 Flash | $0.15 | $0.003       | $0.60  |

## Data handling

Token Pass requests have [zero data retention](/docs/ai-gateway/security-and-compliance/zdr) (ZDR), and your prompts aren't used to train models. If you turn on team-wide ZDR or [disallow prompt training](/docs/ai-gateway/security-and-compliance/disallow-prompt-training), requests still reach Token Pass.

If you turn on team-wide ZDR, its $0.10 per 1,000 requests fee applies to Token Pass requests too.

## Next steps

- [Getting started](/docs/ai-gateway/token-pass/getting-started): subscribe, create a key, and send a first request
- [Coding and personal agents](/docs/ai-gateway/token-pass/coding-agents): set up fx, Claude Code, Codex, Cline, or OpenCode
- [Models and routing](/docs/ai-gateway/token-pass/models-and-routing): API keys, routing, errors, and team settings
- [Credits and billing](/docs/ai-gateway/token-pass/billing): proration, resets, cancelling, and downgrades

## FAQ

### Is Token Pass connected to AI Gateway?

Yes. Token Pass requests run through AI Gateway, so you can use the coding agent of your choice or build your own agents with the AI SDK. Token Pass credit has a separate balance and only applies to featured models served by a Token Pass Provider. Regular [AI Gateway usage](/docs/ai-gateway/pricing) uses your AI Gateway credit balance.

### Which coding agents does it work with?

Any agent that connects to AI Gateway with an API key. [Coding and personal agents](/docs/ai-gateway/token-pass/coding-agents) has setup steps for fx, Claude Code, Codex, Cline, and OpenCode.

### What happens when I use all my credits?

Once you use up your Token Pass credit, requests with your Token Pass API key fail until your next billing period.

To continue with paid usage, switch your coding agent or application to a regular AI Gateway API key and remove any routing options that select the `token-pass` provider. These requests use your AI Gateway credit balance at the selected provider's rates, so you need enough AI Gateway credits to keep making requests. See [Switch to regular AI Gateway usage](/docs/ai-gateway/token-pass/models-and-routing#switch-to-regular-ai-gateway-usage) for the steps.

For automatic failover, your application has to catch the failed Token Pass request and retry it with a regular AI Gateway API key. Setting a provider order alone doesn't switch API keys.

### Do unused credits roll over?

No. Credit expires at the end of each billing period, and a new $80 arrives when the next one starts.

### Is Token Pass per user or per team?

Per team. Everyone on the team shares the same $80.

### Can I use Token Pass in apps I deploy?

Yes, with a Token Pass API key stored as an environment variable. A deployment's OIDC token can't spend Token Pass. Token Pass doesn't fall back to paid usage, so when the credit runs out, requests fail until the next billing period. For production traffic that has to stay up, use a regular AI Gateway API key.

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


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
