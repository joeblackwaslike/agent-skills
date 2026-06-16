---
title: Rate Limiting SDK
product: vercel
url: /docs/vercel-firewall/vercel-waf/rate-limiting-sdk
canonical_url: "https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting-sdk"
last_updated: 2026-05-07
type: how-to
prerequisites:
  - /docs/vercel-firewall/vercel-waf
  - /docs/vercel-firewall
related:
  - /docs/security/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
  - /docs/environment-variables/system-environment-variables
  - /docs/security/vercel-waf/rate-limiting
summary: Learn how to configure a custom rule with rate limit in your code.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting-sdk.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "1c17d57804401bbd0c45096998a59ad19d80d27df0de7b9bdb6a575bf6ea1cdc"
---

# Rate Limiting SDK

You can configure a custom rule with rate limit in your code by using the [`@vercel/firewall`](https://github.com/vercel/vercel/tree/main/packages/firewall/docs) package. This can be useful in the following cases:

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
  You can now use the Rate limit ID `update-object` set up above with `@vercel/firewall` to rate limit any request based on your own conditions. By default, the rate limit key will be based on the IP address from the request if no custom `rateLimitKey` is specified.
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
  - Enable [Protection Bypass for Automation](/docs/security/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) in your project
  - Ensure [System Environment Variables are automatically exposed](/docs/environment-variables/system-environment-variables#system-environment-variables)

## Custom rate limit keys

Rate limit rules can be used with custom keys defined in code specified in the `rateLimitKey` field to create unique buckets. This can be used when you want to rate limit on something other than the IP address, such as an authenticated user ID or organization ID.

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

- [WAF Rate Limiting](/docs/security/vercel-waf/rate-limiting): Counting algorithms, limits, and pricing


---

[View full sitemap](/docs/sitemap)
