---
title: Provider Allowlist
product: vercel
url: /docs/ai-gateway/security-and-compliance/provider-allowlist
canonical_url: "https://vercel.com/docs/ai-gateway/security-and-compliance/provider-allowlist"
last_updated: 2026-06-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/security-and-compliance
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway/authentication-and-byok/byok
summary: Restrict which AI providers your team can route through AI Gateway. Available on Pro and Enterprise.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/security-and-compliance/provider-allowlist.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "460b53fe7304e0128a2269e0ce9a03006c3cf05c4612c148ad2f0783d0195b4d"
---

# Provider Allowlist

The provider allowlist lets team owners restrict which AI providers can serve requests through AI Gateway. A request only returns a `403` when no allowed provider can serve it. The feature is opt-in and available on Pro and Enterprise plans.

A common reason to enable this is compliance: your team has reviewed a specific set of providers, and you want to guarantee that AI Gateway never routes to one you haven't approved.

## Pricing

The provider allowlist is a team-wide setting that applies to every request. If you only need to restrict providers on individual requests, use the [`only` parameter](/docs/ai-gateway/models-and-providers/provider-options#provider-filtering-ordering-and-sorting) in `providerOptions` instead at no additional cost.

| Option                       | Cost                                | Availability       |
| ---------------------------- | ----------------------------------- | ------------------ |
| Per-request `only` filter    | No additional cost                  | All plans          |
| Team-wide provider allowlist | $0.10 per 1,000 successful requests | Pro and Enterprise |

The team-wide surcharge applies only to successful responses. Requests blocked by the allowlist (`403`) and other failures are not charged.

## Enabling the allowlist

Only team owners can change this setting.

1. Open the [AI Gateway **Settings** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fsettings\&title=AI+Gateway+Settings).
2. Toggle on **Restrict allowed providers**.

When you toggle on, every provider currently available on AI Gateway is added to the allowlist by default. This guarantees that turning the feature on never breaks existing traffic. You then remove providers you want to block as an explicit action.

## Disabling specific providers

With the allowlist enabled, switch off any providers your team should not use. The list is searchable. The footer shows how many providers are currently enabled.

Disabling a provider removes it from the routing candidates for any request. If the model has other providers that are still allowed, AI Gateway falls back to one of them. If every candidate provider for the request is disabled, the request returns:

```json
{
  "error": "Your team has restricted access to this provider. Contact the owner of the account for more details.",
  "type": "no_providers_available",
  "statusCode": 403
}
```

The allowlist filters by provider only. A model like `openai/gpt-5-mini` is served by both `openai` and `azure`; disabling `openai` alone still routes that model through `azure`. To block a model entirely, disable every provider that serves it.

## New providers

When AI Gateway adds a new provider after you enable the allowlist, the new provider is disabled by default and shows a **New** badge in the settings list. An info note at the top of the list tells you how many new providers are waiting for a decision.

To clear the badges, decide which new providers to enable and click **Save**. A save with no changes also counts as acknowledgment and clears the badges. Disabled new providers stay disabled until you enable them.

## Request-level filtering

If you also use the request-level [`only`](/docs/ai-gateway/models-and-providers/provider-options#provider-filtering-ordering-and-sorting) filter in `providerOptions`, both filters apply. A request must satisfy both:

- The provider must be in the request's `only` list, and
- The provider must be in your team's allowlist.

If either filter rejects every candidate, the request returns a `403`.

## BYOK

The allowlist applies to [BYOK](/docs/ai-gateway/authentication-and-byok/byok) requests too. Disabling a provider means your team does not want any traffic to that provider through AI Gateway, even with your own credentials.

## Plan and role requirements

| Requirement | Detail                                              |
| ----------- | --------------------------------------------------- |
| Plan        | Pro or Enterprise (not Pro trial)                   |
| Role        | Owner                                               |

Team members on non-owner roles can view the current configuration but cannot modify it.

> **💡 Note:** Allowlist changes can take a couple of minutes to propagate. In-flight
> requests finish under the previous settings. Once the change has propagated,
> new requests respect the updated allowlist.


---

[View full sitemap](/docs/sitemap)
