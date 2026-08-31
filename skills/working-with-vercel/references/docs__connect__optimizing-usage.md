---
title: Optimizing Vercel Connect Usage
product: vercel
url: /docs/connect/optimizing-usage
canonical_url: "https://vercel.com/docs/connect/optimizing-usage"
last_updated: 2026-08-26
type: how-to
prerequisites:
  - /docs/connect
related:
  - /docs/connect/pricing
  - /docs/connect/ts-sdk-reference
  - /docs/connect/concepts/tokens
  - /docs/connect/concepts/triggers
  - /docs/drains
summary: Reduce billed token requests and triggers by using the SDK cache effectively, tuning refresh behavior, and pruning trigger destinations.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/optimizing-usage.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "017c67fad6ddb842e0dae176076b66e8aed364a9557e5f3af8750b5e934f0161"
---

# Optimizing Vercel Connect Usage

Vercel Connect bills two things: **token requests** (each call to Vercel Connect that returns a provider token) and **triggers** (each webhook event forwarded to a trigger destination).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The end of credential sprawl for agents](https://vercel.com/blog/the-end-of-credential-sprawl-for-agents?from=related&source_path=%2Fdocs%2Fconnect%2Foptimizing-usage&source_site=vercel-docs&relationship=related)
- [The Complete Guide to Vercel Connect](https://vercel.com/kb/guide/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Foptimizing-usage&source_site=vercel-docs&relationship=related) — Use Vercel Connect to call provider APIs like Slack, GitHub, Linear, Microsoft, Discord, Snowflake, and Salesforce from
- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga?from=related&source_path=%2Fdocs%2Fconnect%2Foptimizing-usage&source_site=vercel-docs&relationship=related)
- [Introducing Vercel Connect](https://vercel.com/blog/introducing-vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Foptimizing-usage&source_site=vercel-docs&relationship=related)
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Foptimizing-usage&source_site=vercel-docs&relationship=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [Authentication](https://vercel.com/docs/connect/concepts/authentication?from=related&source_path=%2Fdocs%2Fconnect%2Foptimizing-usage&source_site=vercel-docs&relationship=related) — Every Vercel Connect token request has two legs that both have to authenticate: the caller calling Vercel Connect, and V
- [Chat SDK](https://vercel.com/docs/connect/frameworks/chat-sdk?from=related&source_path=%2Fdocs%2Fconnect%2Foptimizing-usage&source_site=vercel-docs&relationship=related) — Use Vercel Connect credentials and trigger forwarding with Chat SDK adapters for Slack, Discord, GitHub, Linear, Notion,
- [Manage and optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related&source_path=%2Fdocs%2Fconnect%2Foptimizing-usage&source_site=vercel-docs&relationship=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fconnect%2Foptimizing-usage&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/connect/optimizing-usage.graph.md](/docs/connect/optimizing-usage.graph.md?from=related&source_path=%2Fdocs%2Fconnect%2Foptimizing-usage&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

This guide shows you how to keep both counts low without changing what your app does. For the rates on each plan, see [Pricing and Limits](/docs/connect/pricing).

## Reduce token requests

The `@vercel/connect` SDK caches tokens in-process, so most of your `getToken` calls should be free cache hits. A billed token request only happens when the SDK actually calls Vercel Connect. Your goal is to maximize cache hits and avoid patterns that silently bypass the cache.

### Let the cache work

The SDK keeps an in-process [LRU cache](/docs/connect/ts-sdk-reference#caching) of up to 100 tokens, keyed by the connector and the full request parameters. A cached token is reused until it falls inside the `validityBufferMs` window (30 seconds by default). An agent that makes 50 provider calls in one invocation pays for one token request, not 50.

Call `getToken` right before each provider call instead of fetching a token once and threading it through your code:

```ts filename="app/lib/slack.ts"
import { getToken } from '@vercel/connect';

export async function postMessage(channel: string, text: string) {
  // Cache hit on every call after the first, until the token nears expiry
  const token = await getToken('slack/acme-slack', {
    subject: { type: 'app' },
  });

  await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ channel, text }),
  });
}
```

This pattern is both cheaper and safer than manual token handling: repeated calls hit the cache, and long-running work never holds a stale token.

### Keep request parameters consistent

The cache key includes every request parameter. Two `getToken` calls with different `scopes`, `resources`, `authorizationDetails`, `installationId`, or `subject` values are two cache entries, and each one pays its own token request. Define each token request's parameters once in a shared module and import them wherever you call `getToken`:

```ts filename="app/lib/connect-params.ts"
import type { ConnectTokenParams } from '@vercel/connect';

export function slackUserParams(userId: string): ConnectTokenParams {
  return {
    subject: { type: 'user', id: userId },
    scopes: ['chat:write'],
  };
}
```

Requesting one token with the scopes a code path needs is cheaper than requesting several narrowly scoped tokens in the same invocation. Only split requests when you want the narrower blast radius of [fine-grained scoping](/docs/connect/concepts/tokens#scoping-a-token) for security reasons.

### Watch the cache size with user tokens

Each distinct user subject is its own cache entry. If one process serves more than 100 distinct parameter combinations (for example, user tokens for hundreds of users), the LRU cache evicts older entries and those users pay a fresh token request on their next call. This is expected behavior for large multi-user workloads, but two things help:

- Use `{ type: 'app' }` tokens for operations that don't need to act as a specific user. App tokens share one cache entry.
- Keep parameter shapes consistent so each user occupies one entry, not several.

### Avoid `forceRefresh` in hot paths

Passing `{ forceRefresh: true }` bypasses the cache and bills a token request on every call. Reserve it for the rare case where you must revalidate the grant with Vercel Connect. If a provider rejects a cached token, call [`deleteTokenCacheEntry`](/docs/connect/ts-sdk-reference#deletetokencacheentry) with the same parameters instead. Only the next request fetches fresh; normal caching resumes after that:

```ts filename="app/lib/retry.ts"
import { deleteTokenCacheEntry, getToken } from '@vercel/connect';

const params = { subject: { type: 'app' } as const };

let token = await getToken('slack/acme-slack', params);
const res = await callProvider(token);

if (res.status === 401) {
  deleteTokenCacheEntry('slack/acme-slack', params);
  token = await getToken('slack/acme-slack', params);
}
```

### Tune the validity buffer to the work

`validityBufferMs` controls how early the SDK refreshes a token before expiry. The default of 30 seconds fits short request handlers. Raise it only when a single operation runs long enough that a token could expire mid-flight, such as a batch job that holds one token for several minutes. Setting a large buffer everywhere refreshes tokens earlier than necessary, which means more billed requests over time.

### Prefer long-lived processes for heavy traffic

The cache is in-process. A process that starts cold pays one token request for each parameter combination before hits begin, so architectures that reuse instances across invocations amortize far better than ones that spin up a fresh process per request. If your token request count looks close to your provider call count, check whether your workload is fetching tokens from short-lived processes.

## Reduce triggers

Every webhook event the provider sends to Vercel Connect counts, and the multiplier is your destination count: an event forwarded to three [trigger destinations](/docs/connect/concepts/triggers) bills as three triggers. An event that arrives with no destinations configured still bills as one.

To keep trigger counts low:

- **Subscribe to fewer events at the provider.** Billing starts when the provider's webhook client sends an event, so the biggest lever is on the provider side. Where the provider lets you choose which event types to send, subscribe only to the ones your handlers act on.
- **Register only the destinations you use.** If one project can handle an event and route it internally, one destination is a third of the cost of fanning out to three.
- **Remove destinations you no longer handle.** A destination that points at a handler that ignores the event still bills on every delivery.
- **Remove the webhook at the provider when you stop using triggers.** Removing trigger destinations alone doesn't stop billing, because each incoming event still counts as one trigger. Delete the webhook URL from the provider's dashboard so events stop arriving. See [How to stop being billed](/docs/connect/pricing#how-to-stop-being-billed).

## Monitor your usage

Use the connector's **Observability** tab to see where token requests and triggers come from before you optimize:

1. Open the connector in the Vercel Dashboard and select **Observability**.
2. Filter by the **Token Request** event type, then narrow by project, environment, or subject to find the code paths that request the most tokens.
3. Filter by **Inbound Trigger** and **Forward Trigger** events to compare how many events arrive against how many deliveries you're billed for.

Stable correlation IDs (`tokenId`, `authorizationId`, `triggerRequestId`) let you trace a specific token or event across events and match it to your own logs. To analyze usage over a longer window than your plan retains, forward events to your own endpoint with a [Drain](/docs/drains). See [Observability](/docs/connect/observability) for the full event reference.

## Next steps

- [Pricing and Limits](/docs/connect/pricing): The rates for token requests and triggers on each plan.
- [Tokens](/docs/connect/concepts/tokens): Caching, refresh, and revocation in depth.
- [SDK Reference](/docs/connect/ts-sdk-reference): Full `ConnectTokenParams` shape, `ConnectOptions`, and cache functions.


---

[View full sitemap](/docs/sitemap)
