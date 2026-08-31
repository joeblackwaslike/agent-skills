---
title: API Keys
product: vercel
url: /docs/ai-gateway/authentication-and-byok/api-keys
canonical_url: "https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys"
last_updated: 2026-08-11
type: how-to
prerequisites:
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/budgets
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/authentication-and-byok/oidc
  - /docs/cli
  - /docs/rest-api
summary: "Create, view, and delete AI Gateway API keys, and set each key's budget and spend attribution, from the dashboard, CLI, or API."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "e2d24e6cc68de8f248fedc480b40d38bcefadef29956a0199c86edd334c784c6"
---

# API Keys

API keys authenticate your requests to the AI Gateway. This page covers how to:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Budgets for API keys on AI Gateway](https://vercel.com/changelog/budgets-for-api-keys-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Fapi-keys&source_site=vercel-docs&relationship=related)
- [Claude Sonnet 5 now available on Vercel AI Gateway](https://vercel.com/changelog/claude-sonnet-5-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Fapi-keys&source_site=vercel-docs&relationship=related)
- [DeepSeek models now available via Azure on AI Gateway](https://vercel.com/changelog/deepseek-models-now-available-via-azure-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Fapi-keys&source_site=vercel-docs&relationship=related)
- [Gemini 3.6 Flash and Gemini 3.5 Flash-Lite are now available on AI Gateway](https://vercel.com/changelog/gemini-3-6-flash-3-5-flash-lite-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Fapi-keys&source_site=vercel-docs&relationship=related)
- [Gemini 3.7 Flash now available on AI Gateway for 50% off](https://vercel.com/changelog/gemini-3-7-flash-now-available-on-ai-gateway-for-50-off?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Fapi-keys&source_site=vercel-docs&relationship=related)
- [How to architect an AI evaluation dashboard on Vercel](https://vercel.com/kb/guide/ai-evaluation-dashboard-architecture-on-vercel?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Fapi-keys&source_site=vercel-docs&relationship=related) — Map eval orchestration, traces, and run storage to AI Gateway, Observability, and Marketplace Postgres, and learn when s
- [Bring Your Own Key \\(BYOK\\)](https://vercel.com/docs/ai-gateway/authentication-and-byok/byok?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Fapi-keys&source_site=vercel-docs&relationship=related) — Learn how to configure your own provider keys with the AI Gateway.
- [Create an SDK key](https://vercel.com/docs/rest-api/feature-flags/create-an-sdk-key?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Fapi-keys&source_site=vercel-docs&relationship=related) — PUT /v1/projects/{projectIdOrName}/feature-flags/sdk-keys — Creates an SDK key.
- [Revoke a signing key](https://vercel.com/docs/rest-api/kms/revoke-a-signing-key?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Fapi-keys&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/keys/{keyId}/revoke — Immediately revoke a signing key that is already scheduled for rev
- [Delete an SDK key](https://vercel.com/docs/rest-api/feature-flags/delete-an-sdk-key?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Fapi-keys&source_site=vercel-docs&relationship=related) — DELETE /v1/projects/{projectIdOrName}/feature-flags/sdk-keys/{hashKey} — Deletes an SDK key.
- [Create a signing key](https://vercel.com/docs/rest-api/kms/create-a-signing-key?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Fapi-keys&source_site=vercel-docs&relationship=related) — POST /v1/kms/issuers/{issuerId}/keys — Create a new signing key for a KMS issuer. Depending on the activation mode, the

Full cross-link map for this page: [/docs/ai-gateway/authentication-and-byok/api-keys.graph.md](/docs/ai-gateway/authentication-and-byok/api-keys.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Fapi-keys&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- **Create** a key in the dashboard, with the Vercel CLI, or via the Vercel API
- **View** your keys and their usage
- **Attribute** a key's spend to your team or an individual member
- **Delete or revoke** a key

You can optionally give any key a **budget** to cap how much it can spend (see [Budgets](/docs/ai-gateway/observability-and-spend/budgets#api-key-budgets)), and choose whether its spend is attributed to your team or to a member (see [Spend attribution](#spend-attribution)). For how to use a key in your code, see [Authentication](/docs/ai-gateway/authentication-and-byok#api-keys).

> **💡 Note:** When a team member leaves your team, Vercel deactivates any API keys they
> created. If you need authentication that isn't tied to a specific person, use
> [OIDC tokens](/docs/ai-gateway/authentication-and-byok/oidc) on Vercel
> deployments.

## Create a key

Create a key from the dashboard, the Vercel CLI, or the Vercel API.

#### Dashboard

1. **Open the API Keys page.** Go to the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys) and click **Create key**.
2. **Name and create the key.** Give the key a name and create it.
3. **Save the key.** Copy the key value immediately (you cannot retrieve it again) and save it as `AI_GATEWAY_API_KEY`.

#### CLI

Make sure you're on the [latest CLI version](/docs/cli). The key is created under your current CLI scope; check it with `vercel whoami`, change it with `vercel switch`, or pass `--scope <team>` per command.

```bash filename="terminal"
vercel ai-gateway api-keys create --name my-api-key
```

Copy the key value immediately. You cannot retrieve it again.

#### API

Call `POST /v1/api-keys` with a [Vercel access token](/docs/rest-api#creating-an-access-token), passing the team ID as a query parameter.

```bash filename="terminal"
curl -X POST "https://api.vercel.com/v1/api-keys?teamId=$VERCEL_TEAM_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "purpose": "ai-gateway", "name": "my-api-key" }'
```

| Field       | Type   | Description                                  |
| ----------- | ------ | -------------------------------------------- |
| `purpose`   | string | Required. Use `ai-gateway`.                  |
| `name`      | string | Optional. Human-readable name.               |
| `projectId` | string | Optional. Scope the key to a Vercel project. |
| `expiresAt` | number | Optional. Expiry as a UNIX timestamp (ms).   |

The response includes `apiKeyString` (the secret; save it now) and the key's `id`.

To cap how much a key can spend, add a budget when you create it. See [Budgets](/docs/ai-gateway/observability-and-spend/budgets#set-an-api-key-budget-at-creation). By default, a new key's spend is attributed to you. To attribute it to your team instead, see [Spend attribution](#spend-attribution).

## Spend attribution

Every AI Gateway API key is attributed to either your team or a single team member. Attribution controls whose [budget](/docs/ai-gateway/observability-and-spend/budgets) the key's spend counts against:

- **User**: the key's spend counts toward both the team budget and the key creator's [user budget](/docs/ai-gateway/observability-and-spend/budgets#user-budgets).
- **Team**: the key's spend counts toward the team budget only.

Budgets stack rather than split. A key attributed to a member counts against both that member's budget and the team budget on every request, and the request is rejected if either is exceeded. The team budget caps total spend, and a user budget caps one member's share of it.

New keys default to **User** attribution. A key with no attribution set counts toward the **Team**, which covers keys created before spend attribution shipped and any key created through the API without `metadata.spendAttribution`. Only team **Owners** and **AI Gateway Budget Managers** can set or change a key's attribution.

#### Dashboard

1. **Open the create- or edit-key dialog.** On the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys), click **Create key**, or open a key's **···** menu and select **Edit key**.
2. **Set spend attribution.** Under **Spend attribution**, choose **User** or **Team**.
3. **Save.**

#### API

Set `metadata.spendAttribution` when you create a key:

```bash filename="terminal"
curl -X POST "https://api.vercel.com/v1/api-keys?teamId=$VERCEL_TEAM_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "purpose": "ai-gateway",
    "name": "my-api-key",
    "metadata": { "spendAttribution": "user" }
  }'
```

| Field                       | Type   | Description                                                                          |
| --------------------------- | ------ | ------------------------------------------------------------------------------------ |
| `metadata.spendAttribution` | string | `user` (default) or `team`. Only team Owners and Budget Managers can set this field. |

To change the attribution of an existing key, use the dashboard.

## View a key

List your keys from the dashboard, the Vercel CLI, or the Vercel API.

#### Dashboard

The [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys) lists every key with its last-used time. A budgeted key also shows its spend against the limit; see [Budgets](/docs/ai-gateway/observability-and-spend/budgets#check-an-api-key-budget-and-spend).

#### CLI

List all AI Gateway keys (the CLI injects your current team scope if you omit `teamId`):

```bash filename="terminal"
vercel api "/v1/api-keys?purpose=ai-gateway"
```

#### API

```bash filename="terminal"
curl "https://api.vercel.com/v1/api-keys?teamId=$VERCEL_TEAM_ID&purpose=ai-gateway" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

## Edit a key

A key's editable properties are its budget and its spend attribution. To add, change, or remove a budget, see [Budgets](/docs/ai-gateway/observability-and-spend/budgets#add-or-change-an-api-key-budget). To change attribution, see [Spend attribution](#spend-attribution). To change anything else, such as the name, [delete the key](#delete-a-key) and create a new one.

## Delete a key

Deleting a key immediately invalidates it. Any request using it afterward fails authentication.

#### Dashboard

On the API Keys page, open a key's **···** menu to delete it, or use the **···** menu next to **Create key** to delete all keys at once.

#### CLI

List your keys to find the `id` of the one to revoke:

```bash filename="terminal"
vercel api "/v1/api-keys?purpose=ai-gateway"
```

Each key in the response has an `id`. Pass it to the delete endpoint:

```bash filename="terminal"
vercel api "/v1/api-keys/$API_KEY_ID" -X DELETE
```

The CLI asks for confirmation before deleting. To revoke several keys, repeat the delete for each `id`.

#### API

List keys with `GET /v1/api-keys` (see [View a key](#view-a-key)) to get each `id`, then delete one:

```bash filename="terminal"
curl -X DELETE "https://api.vercel.com/v1/api-keys/$API_KEY_ID?teamId=$VERCEL_TEAM_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

### Report a compromised key

If a raw key has leaked, revoke it without authentication by reporting it:

```bash filename="terminal"
curl -X POST "https://api.vercel.com/external/compromised_secret" \
  -H "Content-Type: application/json" \
  -d '{ "secret": { "api_key": "vck_..." } }'
```


---

[View full sitemap](/docs/sitemap)
