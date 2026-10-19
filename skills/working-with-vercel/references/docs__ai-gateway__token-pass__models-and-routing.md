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
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/authentication-and-byok/api-keys
  - /docs/ai-gateway/observability-and-spend/budgets
  - /docs/ai-gateway/security-and-compliance/zdr
summary: Which requests Token Pass covers, how Token Pass API keys route requests, what happens when credit runs out, and the errors you can get.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/token-pass/models-and-routing.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "ea77d100f479dcc18252b33444332aea8459481a1f1b7b9ad8876d423bb71d99"
---

# Token Pass Models and Routing

AI Gateway bills a request to Token Pass when all of these are true:

- Your team has an active Token Pass with credit remaining.
- You authenticate with an AI Gateway API key. Use a Token Pass API key.
- The request uses a featured model ID.
- The Token Pass provider (`token-pass`) serves the request.

All other requests follow normal AI Gateway routing and billing.

## Featured models

| Model   | Model ID             | Provider                         |
| ------- | -------------------- | -------------------------------- |
| Kimi K3 | `moonshotai/kimi-k3` | Vercel Token Pass (`token-pass`) |
| GLM 5.3 | `zai/glm-5.3`        | Vercel Token Pass (`token-pass`) |

Token Pass currently serves these models through Wafer. AI Gateway deducts usage from your credit at the Token Pass provider's per-token prices, shown on each [model page](/ai-gateway/models).

## Token Pass API keys

A Token Pass API key is an AI Gateway API key marked for Token Pass when you create it. You can't change a key's type later.

With a Token Pass API key:

- AI Gateway serves featured models only through the `token-pass` provider and bills them to your Token Pass credit.
- Requests never fall back to other providers or to your AI Gateway credits.
- Requests to any other model or endpoint fail with a `403`.

Token Pass only works with AI Gateway API keys. AI Gateway doesn't use Token Pass for requests authenticated with an OIDC token, a Vercel access token, or an app token. It routes those requests as usual and bills your AI Gateway credits.

## What isn't covered

These requests don't use Token Pass credit:

- Any model that isn't featured, including image, video, audio, and embedding models.
- Fast variants of featured models, including fast modes in coding agents.
- Featured models that you send with a regular AI Gateway API key and route to another provider.

With a Token Pass API key, these requests fail with a `403`. With a regular AI Gateway API key, they bill to your AI Gateway credits.

## Routing

With a Token Pass API key, AI Gateway sends featured models to the Token Pass provider. You don't need to set [provider options](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering).

Because a Token Pass API key can't use other providers, an `order` or `only` setting that leaves out `token-pass` makes the request fail. An `order` that lists `token-pass` first works as usual.

To use a featured model with another provider, send the request with a regular AI Gateway API key and name that provider:

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

Token Pass requests don't fail over. If the Token Pass provider returns an error, the request fails with that error. Retry the request, or [switch to regular AI Gateway usage](#switch-to-regular-ai-gateway-usage), billed to your AI Gateway credits.

## When credit runs out

Once you use up your Token Pass credit, requests with your Token Pass API key fail with a `403` until your next billing period starts. AI Gateway doesn't charge your AI Gateway credits for these requests, and Token Pass doesn't top up. To see your remaining credit and reset date, open the [Token Pass tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Ftoken-pass\&title=Go+to+Token+Pass).

To continue with paid usage before your credit resets, switch your coding agent or application to a regular AI Gateway API key and remove any routing options that select the `token-pass` provider. These requests use your AI Gateway credit balance at the selected provider's rates, so you need enough AI Gateway credits to keep making requests.

For automatic failover, your application has to catch the failed Token Pass request and retry it with a regular AI Gateway API key. Setting a provider order alone doesn't switch API keys.

## Switch to regular AI Gateway usage

Regular AI Gateway usage bills to your AI Gateway credits at each provider's rates. It covers every model, including featured models served by other providers. To set it up:

1. **Add AI Gateway credits.** Go to [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway), click the button that shows your AI Gateway credits balance, and add credits. To keep your balance from running out, [configure auto top-up](/docs/ai-gateway/pricing#configure-auto-top-up).

2. **Connect your agent with a regular API key.** Run the setup command without `--key`. It creates a regular AI Gateway API key and configures your agent with it:

   ```bash filename="terminal"
   npx vercel@latest ai-gateway setup --agent <name>
   ```

   To use an existing key instead, [create a key](/docs/ai-gateway/authentication-and-byok/api-keys#create-a-key) with the **Standard** key type and pass it with `--key`.

3. **Remove Token Pass routing options.** Delete any `order` or `only` setting that selects `token-pass`, such as `provider_order` in fx or `options.order` in `opencode.json`.

4. **Set a budget (optional).** To cap what the key can spend, set a [budget](/docs/ai-gateway/observability-and-spend/budgets).

To go back to Token Pass after your credit resets, run the setup command again with your Token Pass API key.

## Errors

Token Pass errors return HTTP status `403` with the error type `no_providers_available`. Check the message to find the cause:

| Cause                                                     | Message includes                                                                                  | Fix                                                                                 |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Your credit for this billing period is used up            | `Your Vercel Token Pass credits are used up until your next billing cycle.`                       | Wait for the reset, or [switch to regular AI Gateway usage](#switch-to-regular-ai-gateway-usage) |
| A Token Pass API key called a model that isn't featured   | `This API key is scoped to Vercel Token Pass and can only be used with Token Pass models.`        | Use a regular AI Gateway API key for that model                                     |
| The request needs a Token Pass API key                    | `requires a Vercel Token Pass API key.`                                                           | Create a Token Pass API key and use it for featured models                          |
| The key's team doesn't have an active Token Pass          | `requires an active Vercel Token Pass.`                                                           | Subscribe, or use a key from the team that has Token Pass                           |

Errors from the Token Pass provider come back unchanged. See [Failover](#failover).

## Team settings that affect Token Pass

| Setting                                                                                       | Effect on Token Pass                                                                                    |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [Zero data retention](/docs/ai-gateway/security-and-compliance/zdr)                           | Token Pass has zero data retention, so requests still route to it. Team-wide ZDR's per-request fee applies |
| [Disallow prompt training](/docs/ai-gateway/security-and-compliance/disallow-prompt-training) | Token Pass doesn't train on prompts, so requests still route to it                                      |
| [Provider allowlist](/docs/ai-gateway/security-and-compliance/provider-allowlist)             | Add `token-pass` to the list. Otherwise, requests with a Token Pass API key fail                        |
| [Model allowlist](/docs/ai-gateway/security-and-compliance/model-allowlist)                   | Add the featured model IDs to the list. Otherwise, AI Gateway blocks requests to them                   |
| Region and HIPAA restrictions                                                                 | If a restriction excludes the Token Pass provider, requests with a Token Pass API key fail             |

## Check which provider served a request

Use any of these:

- **Dashboard**: in [Observability](/docs/ai-gateway/observability-and-spend/observability), the provider is **Vercel Token Pass**.
- **API**: `providerMetadata.gateway.routing.resolvedProvider` is `token-pass`.
- **fx**: `fx ask --json` returns `token-pass` in `resolved_provider`.

## When a request doesn't use Token Pass

If a featured model request failed, or another provider served it, check these in order:

1. The request uses a Token Pass API key, not an OIDC token or a Vercel sign-in.
2. The key belongs to the team that has Token Pass.
3. The model ID is exactly `zai/glm-5.3` or `moonshotai/kimi-k3`, with fast mode off.
4. Your agent config doesn't set an `order` or `only` that leaves out `token-pass`.
5. Your provider allowlist and model allowlist include Token Pass and the featured models.
6. You still have credit this billing period. Check the Token Pass tab.


---

[View full sitemap](/docs/sitemap)
