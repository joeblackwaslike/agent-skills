---
title: Token Pass Models and Routing
product: vercel
url: /docs/ai-gateway/token-pass/models-and-routing
canonical_url: "https://vercel.com/docs/ai-gateway/token-pass/models-and-routing"
last_updated: 2026-10-14
type: reference
prerequisites:
  - /docs/ai-gateway/token-pass
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/token-pass
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/authentication-and-byok/api-keys
  - /docs/cli/token-pass
summary: How AI Gateway routes and fails over featured models with standard credentials and Token Pass-scoped keys, plus the errors you can get.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/token-pass/models-and-routing.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "8ddc4fc6b222751524deeb4edc80a3437fd0c9c771c766b271173f222a246437"
---

# Token Pass Models and Routing

AI Gateway bills a request to Token Pass when all of these are true:

- Your team has an active Token Pass with credit remaining.
- You authenticate with AI Gateway by any method, such as a standard API key, an OIDC token, or signing in with your Vercel account.
- The request uses a featured model ID.
- The Token Pass provider (`token-pass`) serves the request.

All other requests follow normal AI Gateway routing and billing.

## Featured models

| Model               | Model ID                       | Provider                         |
| ------------------- | ------------------------------ | -------------------------------- |
| Kimi K3             | `moonshotai/kimi-k3`           | Vercel Token Pass (`token-pass`) |
| Kimi K3.1 Pro       | `moonshotai/kimi-k3.1-pro`     | Vercel Token Pass (`token-pass`) |
| GLM 5.3             | `zai/glm-5.3`                  | Vercel Token Pass (`token-pass`) |
| GLM 5.3 Flash       | `zai/glm-5.3-flash`            | Vercel Token Pass (`token-pass`) |
| DeepSeek V4.1 Flash | `deepseek/deepseek-v4.1-flash` | Vercel Token Pass (`token-pass`) |

Token Pass currently serves these models through Wafer. AI Gateway deducts usage from your credit at each model's [list price](/docs/ai-gateway/token-pass#list-price).

## Routing

Token Pass routes in two ways depending on the credential. With a standard credential, the request rides the normal provider chain with the Token Pass provider promoted to the front while credit remains, so other providers stay available behind it. A [Token Pass key](#token-pass-api-keys) instead locks the request to the Token Pass provider, with no other providers available. The rest of this section covers routing with a standard credential.

While your team has an active Token Pass with credit remaining, AI Gateway sends featured-model requests to the Token Pass provider first, whatever credential you use. You don't need to set [provider options](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering).

An `order` or `only` setting that leaves out `token-pass` routes the request to the named providers instead, and with a standard credential those requests bill to your AI Gateway credits. An `order` that lists `token-pass` first works as usual.

To use a featured model with another provider, send the request with a standard AI Gateway API key and name that provider. This bills to your AI Gateway credits:

```bash filename="terminal" {9-11}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "zai/glm-5.3",
  "messages": [
    { "role": "user", "content": "Reply with one short sentence." }
  ],
  "providerOptions": {
    "gateway": { "only": ["zai"] }
  }
}'
```

## Failover

With a standard credential, the normal provider chain stays behind the Token Pass provider. If the Token Pass provider returns an error, the request fails over to the other providers and bills to your AI Gateway credits.

Requests with a [Token Pass key](#token-pass-api-keys) never fail over. If the Token Pass provider returns an error, the request fails with that error. Retry the request, or [switch to regular AI Gateway usage](#switch-to-regular-ai-gateway-usage).

## When credit runs out

Once your team uses up its Token Pass credit for the billing period, what happens next depends on your credential.

With a standard API key or OIDC token, requests continue automatically on the normal provider chain, billed to your team's AI Gateway credits at the serving provider's rates. Your team needs enough AI Gateway credits for these requests to succeed, so [configure auto top-up](/docs/ai-gateway/pricing#configure-auto-top-up) to keep your balance from running out.

With a [Token Pass key](#token-pass-api-keys), requests fail with a `403` until your next billing period starts. AI Gateway doesn't charge your AI Gateway credits for these requests, and Token Pass doesn't top up. To see your remaining credit and reset date, open the [Token Pass tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Ftoken-pass\&title=Go+to+Token+Pass).

To keep a scoped-key agent running with paid usage before your credit resets, switch it to a standard AI Gateway API key and remove any routing options that select the `token-pass` provider. For automatic failover, your application has to catch the failed request and retry it with a standard AI Gateway API key. Setting a provider order alone doesn't switch API keys.

## What isn't covered

These requests don't use Token Pass credit:

- Any model that isn't featured, including image, video, audio, and embedding models.
- Fast variants of featured models, including fast modes in coding agents.
- Featured models that you route to another provider.

With a standard credential, these requests bill to your AI Gateway credits. With a [Token Pass key](#token-pass-api-keys), they fail with a `403`.

## Token Pass API keys

You don't need a dedicated key to use Token Pass. Every AI Gateway credential, whether a standard API key, an OIDC token, or a Vercel sign-in, spends your Token Pass credit on featured models first, then falls back to AI Gateway credits when the pass runs out.

A Token Pass-scoped API key is optional. It's an AI Gateway API key marked for Token Pass when you create it, and you can't change its type later. Use one when you want usage capped at your Token Pass credit with no chance of billing AI Gateway credits.

With a Token Pass-scoped API key:

- AI Gateway serves featured models only through the `token-pass` provider and bills them to your Token Pass credit.
- Requests never fall back to other providers or to your AI Gateway credits, including when the Token Pass provider returns an error.
- Requests to any other model or endpoint fail with a `403`.
- An `order` or `only` setting that leaves out `token-pass` fails, because a scoped key can't use other providers.

To create a scoped key, turn on **Restrict to Token Pass only** under **Advanced Configuration** when you [create an API key](/docs/ai-gateway/authentication-and-byok/api-keys#create-a-key) in the dashboard, or run `vercel ai-gateway api-keys create --token-pass` with the CLI. The [`vercel token-pass`](/docs/cli/token-pass) command also creates one when it sets up a coding agent.

## Switch to regular AI Gateway usage

If you use a Token Pass-scoped API key, or you want to route off Token Pass entirely, switch to regular AI Gateway usage. It bills to your AI Gateway credits at each provider's rates and covers every model, including featured models served by other providers. To set it up:

1. **Add AI Gateway credits.** Go to [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway), click the button that shows your AI Gateway credits balance, and add credits. To keep your balance from running out, [configure auto top-up](/docs/ai-gateway/pricing#configure-auto-top-up).

2. **Connect your agent with a regular API key.** Run the setup command without `--key`. It creates a regular AI Gateway API key and configures your agent with it:

   ```bash filename="terminal"
   npx vercel@latest ai-gateway setup --agent <name>
   ```

   To use an existing key instead, [create a key](/docs/ai-gateway/authentication-and-byok/api-keys#create-a-key) with the **Standard** key type and pass it with `--key`.

3. **Remove Token Pass routing options.** Delete any `order` or `only` setting that selects `token-pass`, such as `provider_order` in fx or `options.order` in `opencode.json`.

4. **Set a budget (optional).** To cap what the key can spend, set a [budget](/docs/ai-gateway/observability-and-spend/budgets).

To go back to a Token Pass-scoped key after your credit resets, run the setup command again with that key.

## Errors

Token Pass errors return HTTP status `403` with the error type `no_providers_available`. Check the message to find the cause:

| Cause                                                                | Message includes                                                                           | Fix                                                                                              |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| A Token Pass-scoped key's credit for this billing period is used up  | `Your Vercel Token Pass credits are used up until your next billing cycle.`                | Wait for the reset, or [switch to regular AI Gateway usage](#switch-to-regular-ai-gateway-usage) |
| A Token Pass-scoped key called a model that isn't featured           | `This API key is scoped to Vercel Token Pass and can only be used with Token Pass models.` | Use a standard AI Gateway API key for that model                                                 |
| The key's team doesn't have an active Token Pass                     | `requires an active Vercel Token Pass.`                                                    | Subscribe, or use a key from the team that has Token Pass                                        |

Errors from the Token Pass provider come back unchanged. See [Failover](#failover).

## Team settings that affect Token Pass

| Setting                                                                                       | Effect on Token Pass                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Zero data retention](/docs/ai-gateway/security-and-compliance/zdr)                           | Token Pass has zero data retention, so requests still route to it. Team-wide ZDR's per-request fee doesn't apply to featured-model requests while Token Pass credit remains. After that, and for non-featured models, it applies as usual |
| [Disallow prompt training](/docs/ai-gateway/security-and-compliance/disallow-prompt-training) | Token Pass doesn't train on prompts, so requests still route to it                                                                                                                                         |
| [Provider allowlist](/docs/ai-gateway/security-and-compliance/provider-allowlist)             | Add `token-pass` to the list. Otherwise, requests to featured models fail                                                                                                                                  |
| [Model allowlist](/docs/ai-gateway/security-and-compliance/model-allowlist)                   | Add the featured model IDs to the list. Otherwise, AI Gateway blocks requests to them                                                                                                                      |
| Region and HIPAA restrictions                                                                 | If a restriction excludes the Token Pass provider, requests with a Token Pass-scoped key fail                                                                                                              |

## Check which provider served a request

Use any of these, regardless of which credential authenticated the request:

- **Dashboard**: in [Observability](/docs/ai-gateway/observability-and-spend/observability), the provider is **Vercel Token Pass**.
- **API**: `providerMetadata.gateway.routing.resolvedProvider` is `token-pass`.
- **fx**: `fx ask --json` returns `token-pass` in `resolved_provider`.

## When a request doesn't use Token Pass

If a featured model request failed, or another provider served it, check these in order:

1. The credential belongs to the team that has Token Pass. Any AI Gateway credential works, including a standard API key, an OIDC token, and a Vercel sign-in.
2. The model ID is exactly `zai/glm-5.3`, `zai/glm-5.3-flash`, `moonshotai/kimi-k3`, `moonshotai/kimi-k3.1-pro`, or `deepseek/deepseek-v4.1-flash`, with fast mode off.
3. Your agent config doesn't set an `order` or `only` that leaves out `token-pass`.
4. Your provider allowlist and model allowlist include Token Pass and the featured models.
5. You still have credit this billing period. Check the Token Pass tab.

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
