---
title: Routing Requests with Custom Routing
product: vercel
url: /docs/ai-gateway/models-and-providers/custom-routing
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/custom-routing"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/virtual-models
  - /docs/ai-gateway/models-and-providers/custom-routing/reference
  - /docs/ai-gateway/sdks-and-apis/responses/websockets
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
  - /docs/ai-gateway/models-and-providers/model-fallbacks
summary: Create an AI Gateway Custom Router that selects from an ordered set of models, virtual models, and nested routers behind one stable model ID.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/models-and-providers/custom-routing.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "060e015543e8e7e884cfb2171f06e06f0f7d688879237e0519677a136f062801"
---

# Routing Requests with Custom Routing

Custom Routing lets you call one stable `router/<slug>` model ID while AI Gateway selects from an ordered set of models, [virtual models](/docs/ai-gateway/models-and-providers/virtual-models), and other routers. You can change the members, selection objective, or policy without redeploying your application.

## Create a router in the dashboard

- ### Open the Routers tab
  Go to the **Routers** tab of [Custom Routing](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fcustom-routing%2Frouters\&title=AI+Gateway+Custom+Routing) in the Vercel dashboard, then click **Create Router**. The router form opens in a panel on the right.

- ### Name the router
  Enter a permanent **Slug** of 1 to 64 lowercase letters, numbers, or hyphens that starts and ends with a letter or number. For example, the slug `production-chat` creates the model ID `router/production-chat`.

  Add an optional display name and description to help your team identify the router.

- ### Add ordered members
  Add between one and 50 members. A member can be a model such as `openai/gpt-6-astra`, a virtual model such as `vmc/regulated-chat`, or another router such as `router/fallback-chat`. Pick each member from the list, or type its ID and press Enter.

  Drag members into the order AI Gateway should use before metric-based selection. The order also breaks exact score ties.

- ### Choose a selector
  Select how AI Gateway orders eligible members:
  - **Declared Order** keeps the member order from the form.
  - **Cost** tries the candidate with the lowest estimated cost first.
  - **Time to First Token (TTFT)** tries the candidate with the fastest recent time to first token first.
  - **Tokens per Second (TPS)** tries the candidate with the highest recent output speed first.
  The options depend on the router's model type, as listed in [Selectors by model type](/docs/ai-gateway/models-and-providers/custom-routing/reference#selectors-by-model-type).

  See the [Custom Routing reference](/docs/ai-gateway/models-and-providers/custom-routing/reference#selectors) for how each selector works.

- ### Set the policy constraints
  Under **Required Capabilities**, require implicit caching, reasoning, structured output, tool use, or vision. Under **Compliance**, turn on **Zero Data Retention** or **Block Prompt Training** to require providers with those policies.

  AI Gateway applies every enabled constraint before selection. Nested virtual models and routers can tighten this policy, but cannot relax it.

- ### Create the router
  Click **Create Router**. The **Routers** tab shows the full `router/<slug>` ID, member count, and selector.

## Call the router from your application

Pass `router/<slug>` as the model ID in any HTTP request to AI Gateway. [Responses API WebSocket mode](/docs/ai-gateway/sdks-and-apis/responses/websockets) and batch jobs don't support routers yet, as listed in [Limits and validation](/docs/ai-gateway/models-and-providers/custom-routing/reference#limits-and-validation). The following AI SDK request calls a router with the slug `production-chat`:

```typescript filename="app/api/chat/route.ts"
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const result = streamText({
    model: 'router/production-chat',
    prompt,
  });

  return result.toTextStreamResponse();
}
```

The same model ID works with AI Gateway's OpenAI-compatible, Anthropic-compatible, and OpenResponses APIs. AI Gateway records the concrete model and provider that served each request in the response metadata and AI Gateway logs.

## Update or archive a router

Open a router from the **Routers** tab and use its **Configure** tab to change its members, selector, or policy constraints. Changes apply to new requests after the configuration propagates.

The router's **Overview** tab shows requests, spend, success rate, and usage for that router. The **Overview** tab of Custom Routing shows the same for all of your team's routers.

Open the router's menu on the **Routers** tab and select **Archive Router** to stop serving it. Requests to an archived router return `404` until you restore it from the **Archived** section. Archived routers remain in the dashboard and count toward your team's router limit.

Any member of your team can call a router. Only team **Owners** and **Members** can create routers, and only the router's creator and team **Owners** can edit, archive, or restore it.

## Related

- [Custom Routing reference](/docs/ai-gateway/models-and-providers/custom-routing/reference)
- [Virtual Models](/docs/ai-gateway/models-and-providers/virtual-models)
- [Provider filtering and ordering](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering)
- [AI Gateway model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks)

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
