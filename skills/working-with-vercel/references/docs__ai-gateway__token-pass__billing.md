---
title: Token Pass Credits and Billing
product: vercel
url: /docs/ai-gateway/token-pass/billing
canonical_url: "https://vercel.com/docs/ai-gateway/token-pass/billing"
last_updated: 2026-10-14
type: reference
prerequisites:
  - /docs/ai-gateway/token-pass
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/token-pass
  - /docs/ai-gateway/token-pass/models-and-routing
  - /docs/ai-gateway/security-and-compliance/zdr
  - /docs/ai-gateway/observability-and-spend/observability
summary: How Vercel charges for Token Pass, how you receive and use credit, and what happens when you cancel or downgrade.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/token-pass/billing.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "51f7d10f1c94f4569c0e72dfbc9da4f7f71113ad6a9caa78296fb22b782bae4b"
---

# Token Pass Credits and Billing

Token Pass is a monthly add-on to your team's Pro subscription. Vercel charges it on the same invoice, and it follows the same billing period.

## Summary

| Item           | Details                                                                  |
| -------------- | ------------------------------------------------------------------------ |
| Price          | $30 per team per month                                                   |
| Credit         | $80 per billing period                                                   |
| Billing period | Your team's Pro billing period                                           |
| First period   | Vercel prorates the charge and credit for the days left in the period    |
| Expiry         | Credit expires at the end of each billing period. It doesn't roll over   |
| Overage        | None. When credit runs out, Token Pass requests fail until the next period |
| Scope          | Per team. All members and Token Pass API keys on the team share the credit |
| Cancelling     | Takes effect at the end of the billing period. No refund for that period |

## How Token Pass credit works

AI Gateway prices each Token Pass request at the model's [list price](/docs/ai-gateway/token-pass#list-price) and deducts the cost from your Token Pass credit.

Token Pass credit is a separate balance from your AI Gateway credits:

- Token Pass credit only pays for [featured models](/docs/ai-gateway/token-pass/models-and-routing#featured-models) served by the Token Pass provider. It can't pay for other models.
- Your AI Gateway credit balance doesn't include Token Pass credit, and Token Pass requests don't use your AI Gateway credits.

## Subscribing mid-period

If you subscribe partway through your Pro billing period, your first charge covers only the days left in that period. Vercel prorates your first credit the same way. The confirmation screen shows the exact amount, including taxes and fees, and the date your $30 monthly charge starts.

After that, at the start of each billing period, Vercel charges $30 and adds $80 of credit.

## Credit reset

At the end of each billing period, unused credit expires. When the next period starts, your credit resets to $80. To see your remaining credit and reset date, open the [Token Pass tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Ftoken-pass\&title=Go+to+Token+Pass).

## When credit runs out

Token Pass doesn't charge overages or top up automatically. Once you use up your credit, requests with your Token Pass API key fail with a `403` error until your next billing period. To continue with paid usage, switch to a regular AI Gateway API key, which bills to your AI Gateway credits. See [Switch to regular AI Gateway usage](/docs/ai-gateway/token-pass/models-and-routing#switch-to-regular-ai-gateway-usage).

## Cancel

To cancel Token Pass:

1. In AI Gateway, open [**Token Pass**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Ftoken-pass\&title=Go+to+Token+Pass).
2. Under **Billing Settings**, select **Unsubscribe from Token Pass**.
3. Confirm.

Team owners and members with permission to manage billing can cancel. Cancellation takes effect at the end of your current billing period:

- You keep your remaining credit and can use it until the period ends.
- Vercel doesn't refund the current period.
- Vercel doesn't charge you for Token Pass again.

## Downgrading from Pro

Token Pass requires a Pro plan. If you downgrade your team to Hobby:

- Your Pro plan downgrades under its normal terms.
- Vercel doesn't refund Token Pass.
- You keep Token Pass and your remaining credit until the end of the current billing period. Then Token Pass ends.

## Team-wide ZDR fee

If your team has [team-wide zero data retention](/docs/ai-gateway/security-and-compliance/zdr#team-wide-zero-data-retention) on, the $0.10 per 1,000 requests fee applies to Token Pass requests too. Per-request ZDR has no extra cost.

## Changes to Token Pass

Token Pass is in Early Access, and the [Token Pass Terms](/docs/ai-gateway/token-pass#terms) apply:

- Vercel may change the featured models and the providers that serve them at any time.
- If Vercel ends Token Pass, you receive a pro-rata refund of that month's fee.
- If Vercel reasonably believes someone is misusing Token Pass, including through multiple accounts, it may cancel Token Pass and remove unused credit without a refund.

## Where to see usage and charges

Check these places:

- **Token Pass tab**: remaining credit, usage this billing period, reset date, and the featured models.
- **[Observability](/docs/ai-gateway/observability-and-spend/observability)**: Token Pass requests, listed under the Vercel Token Pass provider.
- **Invoices**: the $30 charge, listed as an add-on on your Pro invoice.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
