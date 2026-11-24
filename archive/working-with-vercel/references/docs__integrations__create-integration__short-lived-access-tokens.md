---
title: Migrating to Short-Lived Access Tokens
product: vercel
url: /docs/integrations/create-integration/short-lived-access-tokens
canonical_url: "https://vercel.com/docs/integrations/create-integration/short-lived-access-tokens"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/integrations/create-integration
  - /docs/integrations
related:
  - /docs/integrations/create-integration/marketplace-api
  - /docs/integrations/create-integration/vercel-api-integrations
  - /docs/integrations/create-integration/marketplace-api/reference/partner/upsert-installation
summary: Move your integration from long-lived access tokens to short-lived tokens that you request with the client_credentials grant, without breaking...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/integrations/create-integration/short-lived-access-tokens.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "22797646e6edb2f50fc31f322efa3a3199118ecde183f8fd80d4eb9f2c80423f"
---

# Migrating to Short-Lived Access Tokens

Your integration calls the Vercel REST API with an access token for each installation. Long-lived access tokens never expire and are now deprecated. Short-lived access tokens expire after one hour, and your server requests a new one with the `client_credentials` grant whenever it needs one. Customers don't have to reinstall your integration when you switch.

Build new integrations with short-lived tokens from the start. If your integration already uses long-lived tokens, you can migrate in two steps. First, start requesting short-lived tokens for your existing installations. You can do this today without changing any settings, and your long-lived tokens keep working while you move each caller over. Once every caller uses short-lived tokens, turn on **Expire Long-Lived Access Tokens** in the Integration Console. An hour after you save, every long-lived token stops working and every new token is short-lived.

These steps apply to both connected accounts and native Marketplace integrations. Work through the [cutover checklist](#cutover-checklist) before you expire long-lived tokens.

> **⚠️ Warning:** Once you save **Expire Long-Lived Access Tokens**, every long-lived access
> token across all installations of your integration stops working an hour
> later, and any caller still using one will fail. You can't turn the setting
> off, extend the deadline, or get long-lived tokens back.

## What changes when you expire long-lived tokens

| | Before | After |
| --- | --- | --- |
| Connected accounts | When a customer installs or reauthorizes your integration, the authorization-code exchange returns a long-lived token. | The exchange returns a token that expires within one hour, with an `expires_in` field. |
| Native Marketplace integrations | The Upsert Installation request includes a long-lived token in `credentials.access_token`. | The token expires within one hour, and `credentials.expires_in` gives its remaining lifetime. |
| Your callers | You can store one token per installation and reuse it indefinitely. | You request a token when you need one and reuse it until it's close to expiring. |
| Existing long-lived tokens | They keep working. | They stop working at the deadline shown in the Integration Console. |

Your client secret still verifies webhooks from Vercel, and you also use it to request tokens. Tokens keep the scopes the customer approved for the installation. When Vercel calls your API, you still verify Vercel's OpenID Connect (OIDC) tokens as described in [Authentication](/docs/integrations/create-integration/marketplace-api#authentication).

### New integrations

New integrations always issue short-lived access tokens, so you have no long-lived tokens to migrate. You can't turn this off. Request tokens as described below.

## Request a short-lived token

Send a `POST` request to `https://api.vercel.com/v2/oauth/access_token` with an `application/x-www-form-urlencoded` body. Authenticate with HTTP Basic using your integration's client ID and client secret, and include these fields:

| Field | Value |
| --- | --- |
| `grant_type` | `client_credentials` |
| `installation_id` | The installation's configuration ID, which starts with `icfg_`. |

Replace the placeholders with your integration's credentials and installation ID:

```bash filename="terminal"
curl --request POST https://api.vercel.com/v2/oauth/access_token \
  --user 'your_client_id_here:your_client_secret_here' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'grant_type=client_credentials' \
  --data-urlencode 'installation_id=icfg_your_installation_id_here'
```

You can also send `client_id` and `client_secret` in the form body instead of using HTTP Basic, but don't use both in the same request. Leave out `scope`, because the token always gets the scopes approved for the installation.

A successful response includes the token and the number of seconds until it expires:

```json filename="response.json"
{
  "access_token": "your_access_token_here",
  "token_type": "Bearer",
  "expires_in": 3600,
  "installation_id": "icfg_your_installation_id_here",
  "user_id": "your_user_id_here",
  "team_id": "your_team_id_here",
  "scope": "read:project"
}
```

Send the token in an `Authorization: Bearer <access_token>` header when you call Vercel APIs. Vercel doesn't issue refresh tokens, so when you need a new token, send the same request again.

### Find the installation ID

Where you find the installation ID depends on how the customer installed your integration:

| Installation type | Where to find `installation_id` |
| --- | --- |
| Connected account | The `installation_id` field in the [authorization-code exchange](/docs/integrations/create-integration/vercel-api-integrations#exchange-code-for-access-token) response. |
| Native Marketplace integration | The `installationId` path parameter of the [Upsert Installation](/docs/integrations/create-integration/marketplace-api/reference/partner/upsert-installation) request. |

For installations that existed before you migrate, use the installation IDs you stored with their tokens.

## Request tokens when you need them

You don't need to refresh tokens on a timer. Request a token when a Vercel API call needs one, then keep reusing it until it's close to expiring:

1. Cache the token for each installation along with its expiry time, which is the current time plus `expires_in` seconds. Don't assume every token lasts exactly one hour.
2. Before each Vercel API call, use the cached token if it has more than a few minutes left. If it doesn't, request a new one.
3. If several workers call Vercel for the same installation, coordinate so they don't all request a new token at once. A lock per installation works well for this.
4. Keep tokens on your server, store them separately for each installation, and never log them.

Background jobs and cron tasks should request a token at the start of each run instead of reading one saved at installation time. Callers that run rarely will usually find their cached token has expired, so they'll request a new one. New installations work the same way. Don't use the token from the authorization-code exchange or the Upsert Installation request. Request a short-lived token with `client_credentials` instead, even for your first call after installation.

## Handle token request errors

Failed requests return a JSON error object with a `code` and a `message`:

```json filename="response.json"
{
  "error": {
    "code": "invalid_grant",
    "message": "Invalid installation authorization."
  }
}
```

Use the HTTP status and `code` to decide what to do:

| Status | `code` | Cause | What to do |
| --- | --- | --- | --- |
| `400` | `invalid_request` | The request is malformed, or it uses both HTTP Basic and body credentials. | Fix the request before you retry it. |
| `401` or `400` | `invalid_client` | The client ID or secret is wrong, or the integration is disabled or deleted. HTTP Basic failures return `401`. | Check that you're using the current client secret, and don't retry until you've fixed the credentials. |
| `400` | `unauthorized_client` | Your integration can't use `client_credentials` yet. | Check that your integration has the **Access Tokens** setting. |
| `400` | `unsupported_grant_type` | `grant_type` isn't `client_credentials` or `authorization_code`. | Fix the request. |
| `400` | `invalid_scope` | The request included `scope`. | Remove `scope`. |
| `400` | `invalid_grant` | The installation doesn't exist, doesn't belong to your integration, or is disabled or removed. | Stop requesting tokens for this installation and treat it as uninstalled. |
| `429` | `rate_limit_exceeded` | You've sent too many token requests. | Retry with exponential backoff, and make sure you're caching tokens instead of requesting one for every API call. |
| `5xx` | | Vercel had a temporary failure. | Retry with backoff, and keep using your cached token until it expires. |

If token requests keep failing, stop using the cached token once it expires, because Vercel rejects expired tokens.

## Check migration readiness

The **Migration Readiness** section in the Integration Console shows which kinds of tokens your callers send to Vercel APIs. To see it, open your integration and go to **Access Tokens**. If you don't have permission to view token activity, ask a team owner.

The section tracks two kinds of activity:

- **Short-Lived Tokens** shows when a short-lived token was last used in an API request. Hover over the info icon to see when one was last issued.
- **Long-Lived Tokens** shows when a long-lived token was last used or, after the deadline, when Vercel last rejected one. Hover over the info icon to see the request's route and user agent, which can help you find the caller.

A status badge sums up this activity. In the table below, "recent" means within the last 7 days:

| Status | What it means | What to do |
| --- | --- | --- |
| **Not Migrated** | Your integration hasn't requested a short-lived token. | [Request short-lived tokens](#request-a-short-lived-token) and use them in your API calls. |
| **Short-Lived Tokens Unused** | Your integration requested short-lived tokens but hasn't used one in an API request. | Check that your callers send the new tokens. |
| **Long-Lived Tokens in Use** | A long-lived token was used recently or, if you've saved the setting, since you saved it. | Find and update those callers. The route and user agent can help you identify them. |
| **No Recent Activity** | Neither kind of token was used recently. | Wait for more traffic, because there isn't enough activity yet to tell whether you're ready. |
| **Likely Ready** | Short-lived tokens were used recently, and long-lived tokens weren't. | Check for infrequent jobs and rarely used installations before you expire long-lived tokens. |
| **Requests Rejected** | After the deadline, requests with expired long-lived tokens are failing. | Move those callers to short-lived tokens. |
| **Short-Lived Only** | You saved the setting, no long-lived token was used after you saved it, and none was rejected recently. | Keep watching until the deadline passes. |

Use readiness as a guide alongside your own checks. Requesting a token only shows that your integration can get one, and the **Short-Lived Tokens** activity is what shows your callers are using them. **Likely Ready** can miss callers that run less than once a week, and Vercel doesn't record every request. Activity can also take a few minutes to appear, times are rounded down, and only the most recent request of each kind is kept. For details, hover over the info icon next to the section heading.

## Cutover checklist

Work through these steps in order, and don't expire long-lived tokens until every caller uses short-lived ones.

1. **Add token requests.** Build [`client_credentials` requests](#request-a-short-lived-token), [per-installation caching](#request-tokens-when-you-need-them), and [error handling](#handle-token-request-errors) into your server.
2. **Request short-lived tokens for existing installations.** You don't need to change any settings, and your long-lived tokens keep working in the meantime.
3. **Deploy the change everywhere.** Update every service that calls Vercel APIs, including web servers, workers, cron jobs, and scripts, and remove any code that reads a token saved at installation time.
4. **Confirm that callers use short-lived tokens.** Check that each kind of caller can call a Vercel API with a short-lived token, and that **Short-Lived Tokens** in [Migration Readiness](#check-migration-readiness) shows recent activity.
5. **Find any remaining long-lived token callers.** If **Long-Lived Tokens** shows recent activity, use the route and user agent to find the caller. Search your code, configuration, and secrets stores for saved installation tokens too, and give your least frequent jobs time to run before you continue.
6. **Expire long-lived tokens.** Turn on **Expire Long-Lived Access Tokens** and click **Update**. In the confirmation dialog, review the readiness summary, type your integration's slug, and click **Save and Expire Tokens**.
7. **Watch through the deadline.** The console shows the deadline in your local time and in UTC. If **Long-Lived Tokens in Use** appears before then, update those callers before the deadline passes. Afterward, **Requests Rejected** points to callers that are failing. You can't extend the deadline.

### What happens at the deadline

- Vercel sets the deadline the first time you save the setting, and saving again doesn't move it.
- At the deadline, Vercel rejects long-lived tokens for every installation of your integration, even if it hasn't finished deleting them.
- Tokens that were already set to expire before the deadline keep their earlier expiry.
- The **Expire Long-Lived Access Tokens** toggle stays on and locked, so you can't turn it off to bring back long-lived tokens.

## Public-key client authentication

This guide uses your client secret to authenticate token requests. Vercel plans to add another option that uses a signed client assertion with public keys you publish as a JSON Web Key Set (JWKS). You won't need it to migrate, and it won't change how you verify webhooks.

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
