---
title: Rate Limiting SDK
product: vercel
url: /docs/vercel-firewall/vercel-waf/rate-limiting-sdk
canonical_url: "https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting-sdk"
last_updated: 2026-07-23
type: how-to
prerequisites:
  - /docs/vercel-firewall/vercel-waf
  - /docs/vercel-firewall
related:
  - /docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
  - /docs/environment-variables/system-environment-variables
  - /docs/vercel-firewall/vercel-waf/rate-limiting
summary: Learn how to configure a custom rule with rate limit in your code.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting-sdk.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "41473b1f9f0cbd861222981b2d856cb00a3d242e50242b7f8d323b4c0b8d47e2"
---

# Rate Limiting SDK

You can configure a custom rule with rate limit in your code by using the [`@vercel/firewall`](https://github.com/vercel/vercel/tree/main/packages/firewall/docs) package. This can be useful in the following cases:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Add Rate Limiting with Vercel](https://vercel.com/kb/guide/add-rate-limiting-vercel?from=related) — Learn how to implement rate limiting with Vercel
- [Build an AI Chat Agent with Weather API Tool Calling](https://vercel.com/kb/guide/build-ai-agent-weather-api?from=related) — Build an intelligent conversational agent that fetches real-time weather data using the AI SDK, tool calling, and a back
- [Deploying and testing BotID](https://vercel.com/kb/guide/deploying-and-testing-botid?from=related) — This guide gives an overview on Vercel BotID and how to deploy and test it in production
- [Limit Abuse with Rate Limiting](https://vercel.com/kb/guide/limit-abuse-with-rate-limiting?from=related) — Learn how to protect your authentication endpoints against abuse.
- [Securing your AI applications with Rate Limiting](https://vercel.com/kb/guide/securing-ai-app-rate-limiting?from=related) — Learn how to secure your AI applications with rate limiting using Vercel WAF and Vercel AI SDK
- [Custom Rules](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules?from=related) — Learn how to add and manage custom rules to configure the Vercel Web Application Firewall \(WAF\).
- [Read Firewall Configuration](https://vercel.com/docs/rest-api/security/read-firewall-configuration?from=related)
- [Firewall API](https://vercel.com/docs/vercel-firewall/firewall-api?from=related) — Learn how to interact with the security endpoints of the Vercel REST API programmatically.
- [vercel firewall](https://vercel.com/docs/cli/firewall?from=related) — Learn how to manage your project's custom firewall rules, IP blocks, system bypass rules, attack challenge mode, and sys

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/rate-limiting-sdk.graph.md](/docs/vercel-firewall/vercel-waf/rate-limiting-sdk.graph.md)
<!-- /docsgraph:related -->

- You need to set a rate limit on requests in your backend
- You want to use additional conditions with the rate limit that are not possible in the custom rule configuration of the dashboard

> **💡 Note:** Rate limit counters are tracked on a per-region basis; traffic matching a given rate limit key in multiple regions can exceed the limit you configure for any single region.

## Using `@vercel/firewall`

- ### Create a `@vercel/firewall` rule
  1. From your [dashboard](https://vercel.com/dashboard/), select the project that you'd like to configure rate limiting for. Then open **Firewall** in the sidebar
  2. Select **Configure** on the top right of the Firewall overview page. Then, select **+ New Rule**
  3. Complete the fields for the rule as follows
     1. Type a name such as "Firewall api rule"
     2. In the **Configure** section, for the first **If** condition, select `@vercel/firewall`
     3. Use `update-object` as the **Rate limit ID**
     4. Use the default values for **Rate Limit** and **Then**
  4. Select **Save Rule**
  5. Apply the changes:
     - When you make any change, you will see a **Review Changes** button appear or update on the top right with the number of changes requested
     - Select **Review Changes** and review the changes to be applied
     - Select **Publish** to apply the changes to your production deployment

- ### Configure rate limiting in code
  You can now use the Rate limit ID `update-object` set up above with `@vercel/firewall` to rate limit any request based on your own conditions. Every request is counted against a rate limit key, and each unique key gets its own bucket. By default, the key is the client IP. Override it by passing a `rateLimitKey` (see [Custom rate limit keys](#custom-rate-limit-keys)).
  ```ts filename="rate-limit.ts"
  import { checkRateLimit } from '@vercel/firewall';

  export async function POST(request: Request) {
    const { rateLimited } = await checkRateLimit('update-object', { request });
    if (rateLimited) {
      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
    // Otherwise, continue with other tasks
  }
  ```

- ### Test in a preview deployment
  For your code to run when deployed in a preview deployment, you need to:
  - Enable [Protection Bypass for Automation](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) in your project
  - Ensure [System Environment Variables are automatically exposed](/docs/environment-variables/system-environment-variables#system-environment-variables)

## Custom rate limit keys

Pass a `rateLimitKey` to bucket requests on something other than the client IP, such as an authenticated user ID or organization ID. The key you pass replaces the default client-IP bucket entirely: every request with the same key shares a bucket, even when the requests come from different IPs. To keep IP as part of the bucket, compose the key yourself (see below).

For example, this code will have a rate limit per authenticated user:

```ts filename="rate-limit.ts"
import { checkRateLimit } from '@vercel/firewall';
import { authenticateUser } from './auth';

export async function POST(request: Request) {
  const auth = await authenticateUser(request);
  const { rateLimited } = await checkRateLimit('update-object', {
    request,
    rateLimitKey: auth.userId,
  });
  if (rateLimited) {
    return new Response(
      JSON.stringify({
        error: 'Rate limit exceeded',
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
  // Otherwise, continue with the request
}
```

Two or more values can be combined when you want to rate limit on multiple dimensions. Create a compound key from the separate values before passing it as `rateLimitKey`:

```ts
const auth = await authenticateUser(request);
const rateLimitKey = `${auth.orgId}:${auth.userId}`;
const { rateLimited } = await checkRateLimit('update-object', {
  request,
  rateLimitKey,
});
```

Pick a delimiter that does not appear in your id values, or use a structured encoding if parts are free-form, so two different pairs of values never produce the same string.

### Combine with Firewall conditions

The following example shows how to use **Firewall rule conditions** in the dashboard together with a `rateLimitKey` you choose in code. The dashboard **If** conditions narrow which requests hit the rule (for example, a specific request header). Your function then calls `checkRateLimit` with a custom key.

> **⚠️ Warning:** Adding a dashboard condition to a rule does not restore per-IP bucketing.
> The bucket is defined by the `rateLimitKey` your function passes. If every
> matching request resolves to the same key (for example, a constant string),
> the rule becomes effectively global. Include the caller's IP or another
> per-caller value in the key when you want per-IP or per-user separation.

#### Update the custom rule filters

Edit the custom rule in the dashboard and add an **If** condition with the following values, then click **Save Rule**:

- Filter dropdown: **#Request Header**
- Value: `xrr-internal-header`
- Operator: Equals
- Match value: `internal`

#### Use the `rateLimitKey` in code

In code, pass a `rateLimitKey` that matches how the buckets should be separated. This will only apply on request that matches the condition above.

```ts filename="rate-limit.ts"
import { checkRateLimit } from '@vercel/firewall';
import { authenticateUser } from './auth';

export async function POST(request: Request) {
  const auth = await authenticateUser(request);
  const { rateLimited } = await checkRateLimit('update-object', {
    request,
    rateLimitKey: auth.orgId,
  });
  if (rateLimited) {
    return new Response(
      JSON.stringify({
        error: 'Rate limit exceeded',
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
```

## Learn more

- [WAF Rate Limiting](/docs/vercel-firewall/vercel-waf/rate-limiting): Counting algorithms, limits, and pricing


---

[View full sitemap](/docs/sitemap)
