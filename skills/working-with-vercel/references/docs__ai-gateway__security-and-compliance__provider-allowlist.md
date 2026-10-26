---
title: AI Gateway Provider Allowlist
product: vercel
url: /docs/ai-gateway/security-and-compliance/provider-allowlist
canonical_url: "https://vercel.com/docs/ai-gateway/security-and-compliance/provider-allowlist"
last_updated: 2026-09-08
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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "afbec850a2e0ed80974858dbba582a679ffb06c37fca4ca620530db1551f788d"
---

# AI Gateway Provider Allowlist

The provider allowlist lets team owners restrict which AI providers can serve requests through AI Gateway. A request only returns a `403` when no allowed provider can serve it. The feature is opt-in and available on Pro and Enterprise plans.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Team-wide provider allowlist on AI Gateway](https://vercel.com/changelog/team-wide-provider-allowlist-on-ai-gateway)
- [ Routing rules now available on AI Gateway](https://vercel.com/changelog/ai-gateway-routing-rules)
- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway)
- [How to control AI provider data handling with AI Gateway](https://vercel.com/kb/guide/control-ai-provider-data) — Prevent AI providers from training on your prompts, enforce zero data retention, and restrict providers and models with
- [AI Gateway Model Allowlist](https://vercel.com/docs/ai-gateway/security-and-compliance/model-allowlist) — Restrict which AI models your team can use through AI Gateway. Available on Pro and Enterprise.
- [AI Gateway Models and Providers](https://vercel.com/docs/ai-gateway/models-and-providers) — Choose AI Gateway models and providers. Configure routing, fallbacks, timeouts, prompt caching, reasoning, and web searc
- [Adding a Provider](https://vercel.com/docs/agent-resources/integrations-for-models/adding-a-provider) — Learn how to add a new AI provider to your Vercel projects.

Full cross-link map for this page: [/docs/ai-gateway/security-and-compliance/provider-allowlist.graph.md](/docs/ai-gateway/security-and-compliance/provider-allowlist.graph.md)
<!-- /docsgraph:related -->

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

The allowlist filters by provider only. A model like `openai/gpt-5.4-mini` is served by both `openai` and `azure`; disabling `openai` alone still routes that model through `azure`. To block a model entirely, disable every provider that serves it.

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
