---
title: Model Allowlist
product: vercel
url: /docs/ai-gateway/security-and-compliance/model-allowlist
canonical_url: "https://vercel.com/docs/ai-gateway/security-and-compliance/model-allowlist"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/security-and-compliance
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/security-and-compliance/provider-allowlist
  - /docs/ai-gateway/authentication-and-byok/byok
summary: Learn about model allowlist on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/security-and-compliance/model-allowlist.md"
fetched_at: "2026-07-13T07:00:47.058Z"
sha256: "9fe67f1cf194aad911a3d79b1e0a34d97c25d73d974f6723bce6c68d5e08f9a6"
---

# Model Allowlist

The model allowlist lets team owners restrict which models can be used through AI Gateway. A request returns a `403` when the requested model is not on the allowlist. The feature is opt-in and available on Pro and Enterprise plans.

A common reason to enable this is governance: your team has approved a specific set of models, and you want to guarantee that AI Gateway never serves one you haven't reviewed.

## Pricing

| Option                    | Cost                                | Availability       |
| ------------------------- | ----------------------------------- | ------------------ |
| Team-wide model allowlist | $0.10 per 1,000 successful requests | Pro and Enterprise |

The surcharge applies only to successful responses. Requests blocked by the allowlist (`403`) and other failures are not charged.

If your team also has the [provider allowlist](/docs/ai-gateway/security-and-compliance/provider-allowlist) enabled, a request is charged a single restriction surcharge, not one per allowlist. You are never billed twice for having both active.

## Enabling the allowlist

Only team owners can change this setting.

1. Open the [AI Gateway **Settings** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fsettings\&title=AI+Gateway+Settings).
2. Toggle on **Model Allowlist**.

When you toggle on, every model currently available on AI Gateway is added to the allowlist by default. This guarantees that turning the feature on never breaks existing traffic. You then remove models you want to block as an explicit action.

## Disabling specific models

With the allowlist enabled, switch off any models your team should not use. Models are grouped by their creator.

When a request targets a disabled model, AI Gateway returns:

```json
{
  "error": "Your team has restricted access to this model. Contact the owner of the account for more details.",
  "type": "no_providers_available",
  "statusCode": 403
}
```

## New models

When AI Gateway adds a new model after you enable the allowlist, the new model is disabled by default and shows a **New** badge in the settings list. An info note at the top of the list tells you how many new models are waiting for a decision.

To clear the badges, decide which new models to enable and click **Save**. A save with no changes also counts as acknowledgment and clears the badges. Disabled new models stay disabled until you enable them.

## Provider allowlist

The model allowlist and the [provider allowlist](/docs/ai-gateway/security-and-compliance/provider-allowlist) are independent checks, and a request must pass both:

- The model allowlist controls which models your team can use.
- The provider allowlist controls which providers can serve them.

A model on your allowlist can still be blocked if every provider that serves it is disabled on the provider allowlist. Keep at least one of its providers enabled for each model you want to use.

If both allowlists are enabled, you are charged a single restriction surcharge per successful request, as described in [Pricing](#pricing).

## BYOK

The allowlist applies to [BYOK](/docs/ai-gateway/authentication-and-byok/byok) requests too. Disabling a model means your team does not want any traffic to that model through AI Gateway, even with your own credentials.

## Plan and role requirements

| Requirement | Detail                            |
| ----------- | --------------------------------- |
| Plan        | Pro or Enterprise (not Pro trial) |
| Role        | Owner                             |

Team members on non-owner roles can view the current configuration but cannot modify it.

> **💡 Note:** Allowlist changes can take a couple of minutes to propagate. In-flight
> requests finish under the previous settings. Once the change has propagated,
> new requests respect the updated allowlist.


---

[View full sitemap](/docs/sitemap)
