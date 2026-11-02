---
title: Bring Your Own Key (BYOK) to AI Gateway
product: vercel
url: /docs/ai-gateway/authentication-and-byok/byok
canonical_url: "https://vercel.com/docs/ai-gateway/authentication-and-byok/byok"
last_updated: 2026-09-22
type: how-to
prerequisites:
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/observability-and-spend/budgets
  - /docs/ai-gateway/authentication-and-byok/api-keys
  - /docs/ai-gateway/authentication-and-byok/oidc
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
summary: Learn how to configure your own provider keys with AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/authentication-and-byok/byok.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "04916340a26ea1dd9f6115b429ab29ee33ded510141b621660576e15d87aabd7"
---

# Bring Your Own Key (BYOK) to AI Gateway

Using your own credentials with an external AI provider allows AI Gateway to authenticate requests on your behalf with [no added markup](/docs/ai-gateway/pricing#bring-your-own-key-byok).
This approach is useful for using credits provided by the AI provider or executing AI queries that access private cloud data.
If a query using your credentials fails, AI Gateway will retry the query with its system credentials to improve service availability. When [ZDR](#zero-data-retention-zdr) is enabled, this fallback is limited to ZDR-eligible system credentials.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [10x more capacity for Laguna S 2.1 on AI Gateway](https://vercel.com/changelog/10x-more-capacity-for-laguna-s-2-1-on-ai-gateway)
- [AI Gateway adds Browserbase Search and Fetch tools](https://vercel.com/changelog/ai-gateway-adds-browserbase-search-and-fetch-tools)
- [Cat Jam is now available in stealth for free on AI Gateway](https://vercel.com/changelog/cat-jam-is-now-available-in-stealth-for-free-on-ai-gateway)
- [Claude Sonnet 5.5 now available on AI Gateway](https://vercel.com/changelog/claude-sonnet-5-5-now-available-on-ai-gateway)
- [Claude Sonnet 5 now available on Vercel AI Gateway](https://vercel.com/changelog/claude-sonnet-5-ai-gateway)
- [Cost-aware model routing with Vercel AI Gateway](https://vercel.com/kb/guide/cost-aware-model-routing-with-ai-gateway) — Send easy requests to a lower-cost model and escalate only the complex ones to a frontier model through AI Gateway, with
- [Claude Code and Claude Agent SDK with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/claude-code) — Connect Claude Code to AI Gateway with one CLI command, or configure it manually.
- [AI Gateway Google and Vertex Reasoning](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/google) — Configure thinking for Google Gemini and Gemma models with the AI SDK and AI Gateway.
- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem) — Use Vercel Sandbox with the agent frameworks, model SDKs, and agents you already work with.

Full cross-link map for this page: [/docs/ai-gateway/authentication-and-byok/byok.graph.md](/docs/ai-gateway/authentication-and-byok/byok.graph.md)
<!-- /docsgraph:related -->

Integrating credentials like this with AI Gateway is sometimes referred to as **Bring-Your-Own-Key**, or **BYOK**. In the Vercel dashboard this feature is found in the **AI Gateway section in the sidebar** under the **Bring Your Own Key (BYOK)** section in the sidebar.

Provider credentials are scoped to be available throughout your Vercel team, so you can use the same credentials across multiple projects.

> **💡 Note:** BYOK is available on the paid tier. When a request with your credentials
> fails, AI Gateway keeps it running by falling back to system credentials,
> and that fallback usage is billed against your credits balance. To use
> BYOK, your team needs purchased [AI Gateway
> credits](/docs/ai-gateway/pricing).

Spend through your own credentials isn't counted in [budgets](/docs/ai-gateway/observability-and-spend/budgets). It's metered separately and doesn't count toward a team, project, or API key limit, so a budget can't be used to cap BYOK spend.

## Getting started

- ### Retrieve credentials from your AI provider
  First, retrieve credentials from your AI provider. AI Gateway uses these credentials first to authenticate requests to that provider. If a query made with your credentials fails, AI Gateway will re-attempt with system credentials, aiming to provide improved availability.

- ### Add the credentials to your Vercel team
  1. Go to the [AI Gateway Bring Your Own Key (BYOK) page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbyok\&title=AI+Gateway+BYOK) in your Vercel dashboard.
  2. Find your provider from the list and click **Add Key**.
  3. In the dialog that appears, enter the credentials you retrieved from the provider.
  4. Ensure that the **Enabled** toggle is turned on so that the credentials are active.
  5. Click **Test API Key** to validate and add your credentials.

- ### Use the credentials in your AI Gateway requests
  Once you add credentials, AI Gateway automatically includes them in your requests. You can now use these credentials to authenticate your requests.

## Use API credits from a ChatGPT or Claude subscription

Eligible ChatGPT Pro and Business subscribers and Claude Max and Team subscribers can claim API credits in a linked provider organization. Use a key from that organization with BYOK so eligible requests can draw from the grant. The credits stay with OpenAI or Anthropic, separate from your AI Gateway Credits balance.

Follow the walkthrough for your subscription to check eligibility, claim the grant, and connect the credited organization's key:

- [Use ChatGPT API credits with Vercel AI Gateway](/i/chatgpt-api-credits-ai-gateway)
- [Use Claude API credits with Vercel AI Gateway](/i/claude-api-credits-ai-gateway)

After claiming the grant:

1. Add the organization's OpenAI or Anthropic key using the steps above. For dashboard credentials, confirm that the key is enabled and marked **In Use**.
2. Authenticate your application to AI Gateway with an [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/api-keys) or [OIDC](/docs/ai-gateway/authentication-and-byok/oidc). These credentials authenticate to AI Gateway; the provider key authenticates to OpenAI or Anthropic.
3. [Restrict the serving provider](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering#restrict-providers-with-the-only-filter) to `openai` or `anthropic`, respectively. A provider restriction doesn't disable fallback to AI Gateway's system credentials if your key fails.
4. Check the request's provider and credential source in [AI Gateway Logs](/docs/ai-gateway/observability-and-spend/logs), then confirm grant usage in the provider's billing dashboard. A successful response or key test doesn't establish that the grant funded the request.

## Manage keys in the dashboard

### Use more than one key per provider

You can add up to 10 keys per provider. Each key has its own name, **Enabled** state, and ZDR setting, and the dashboard lists every key under its provider.

AI Gateway uses the oldest enabled key for a provider, which the dashboard marks **In Use**. Requests that require [Zero Data Retention (ZDR)](#zero-data-retention-zdr) can use another enabled key that's marked ZDR-compliant.

Other enabled keys are on standby. If the key in use fails, requests fall back to system credentials, not to your next key. To switch to a standby key, disable the key in use.

### Replace a key

Replace a key when you rotate it at the provider. Replacing a key changes only the stored credential, so the key keeps its name, **Enabled** state, ZDR setting, and [model mappings](#model-mappings). Your BYOK traffic keeps using your own credentials during the swap. If you delete a key and add a new one instead, requests use system credentials in between.

1. In the [AI Gateway Bring Your Own Key (BYOK) page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbyok\&title=AI+Gateway+BYOK), click the menu for the key you want to replace.
2. Select **Replace Key**.
3. Enter the new credentials and click **Replace API Key**.

AI Gateway tests the new credentials before saving them. If the test fails, the existing key stays in place. To see when a key was last replaced, hover its created date in the list.

> **💡 Note:** Keep the old key valid at the provider for a few minutes after you replace
> it. Requests already in progress can still use it, and an open realtime
> WebSocket session keeps the key it started with until the session ends.

### Who can manage keys

| Role      | View keys | Add, replace, rename, enable, or delete keys | Mark a key as ZDR-compliant |
| --------- | --------- | -------------------------------------------- | --------------------------- |
| Owner     | Yes       | Yes                                          | Yes                         |
| Member    | Yes       | Yes                                          | No                          |
| Developer | Yes       | No                                           | No                          |

## Request-scoped BYOK

In addition to configuring credentials in the dashboard, you can pass provider credentials on a per-request basis using the `byok` option in `providerOptions.gateway`. This is useful when you need to use different credentials for specific requests without changing your team-wide configuration.

When request-scoped BYOK credentials are provided, AI Gateway doesn't consider any cached BYOK credentials configured in the dashboard for that request. Requests may still fall back to system credentials if the provided credentials fail.

### Request examples

The cURL examples use `jq` to encode the provider key in JSON.

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

See the [AI SDK BYOK reference](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#bring-your-own-key-byok) for SDK configuration and usage.

```typescript filename="byok.ts"
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-5',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      byok: {
        anthropic: [
          {
            apiKey: process.env.ANTHROPIC_API_KEY!,
          },
        ],
      },
    },
  },
});

console.log(text);
```

#### Python (beta)

```python filename="byok_ai.py"
import asyncio
import os
import ai

async def main():
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [ai.user_message("Explain quantum computing in two sentences.")]
    params = ai.InferenceRequestParams(
        extra_body={"providerOptions": {"gateway": {"byok": {"anthropic": [{"apiKey": os.environ["ANTHROPIC_API_KEY"]}]}}}}
    )
    async with ai.stream(model, messages, params=params) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end="", flush=True)
    print()

asyncio.run(main())
```

#### Chat Completions

#### TypeScript

```typescript filename="byok-chat.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  // AI Gateway extension fields are not included in the upstream SDK types.
  ...{
    providerOptions: {
      gateway: {
        byok: {
          anthropic: [
            {
              apiKey: process.env.ANTHROPIC_API_KEY!,
            },
          ],
        },
      },
    },
  },
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="byok_chat.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    extra_body={"providerOptions": {"gateway": {"byok": {"anthropic": [{"apiKey": os.environ["ANTHROPIC_API_KEY"]}]}}}},
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="byok-chat.sh"
jq -n '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "providerOptions": {
    "gateway": {
      "byok": {
        "anthropic": [
          {
            "apiKey": $ENV.ANTHROPIC_API_KEY
          }
        ]
      }
    }
  }
}' | curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  --data-binary @-
```

#### Messages API

#### TypeScript

```typescript filename="byok-messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const response = await client.messages.create({
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  max_tokens: 1024,
  ...{
    providerOptions: {
      gateway: {
        byok: {
          anthropic: [
            {
              apiKey: process.env.ANTHROPIC_API_KEY!,
            },
          ],
        },
      },
    },
  },
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="byok_messages.py"
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    max_tokens=1024,
    extra_body={"providerOptions": {"gateway": {"byok": {"anthropic": [{"apiKey": os.environ["ANTHROPIC_API_KEY"]}]}}}},
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="byok-messages.sh"
jq -n '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "max_tokens": 1024,
  "providerOptions": {
    "gateway": {
      "byok": {
        "anthropic": [
          {
            "apiKey": $ENV.ANTHROPIC_API_KEY
          }
        ]
      }
    }
  }
}' | curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  --data-binary @-
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="byok-responses.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'anthropic/claude-sonnet-5',
  input: 'Explain quantum computing in two sentences.',
  ...{
    providerOptions: {
      gateway: {
        byok: {
          anthropic: [
            {
              apiKey: process.env.ANTHROPIC_API_KEY!,
            },
          ],
        },
      },
    },
  },
});

console.log(response.output_text);
```

#### Python

```python filename="byok_responses.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="anthropic/claude-sonnet-5",
    input="Explain quantum computing in two sentences.",
    extra_body={"providerOptions": {"gateway": {"byok": {"anthropic": [{"apiKey": os.environ["ANTHROPIC_API_KEY"]}]}}}},
)

print(response.output_text)
```

#### cURL

```bash filename="byok-responses.sh"
jq -n '{
  "model": "anthropic/claude-sonnet-5",
  "input": "Explain quantum computing in two sentences.",
  "providerOptions": {
    "gateway": {
      "byok": {
        "anthropic": [
          {
            "apiKey": $ENV.ANTHROPIC_API_KEY
          }
        ]
      }
    }
  }
}' | curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  --data-binary @-
```

### Credential structure by provider

Each provider has its own credential structure:

| Provider         | Parameters                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| Anthropic        | `{ apiKey: string }`                                                                                    |
| OpenAI           | `{ apiKey: string }`                                                                                    |
| Azure            | `{ apiKey: string, resourceName: string }`                                                              |
| Google Vertex AI | `{ project: string, location: string, googleCredentials: { privateKey: string, clientEmail: string } }` |
| Amazon Bedrock   | `{ accessKeyId: string, secretAccessKey: string, region?: string }`                                     |

For detailed credential parameters for each provider, see the [AI SDK providers documentation](https://ai-sdk.dev/providers/ai-sdk-providers).

> **💡 Note:** Amazon Bedrock reranking requires SigV4 credentials (`accessKeyId` and
> `secretAccessKey`) and does not accept API keys. If you BYOK and plan to use
> reranking models through Bedrock, you must use SigV4 credentials.

### Multiple credentials

You can specify multiple credentials per provider (tried in order) and credentials for multiple providers:

```typescript
providerOptions: {
  gateway: {
    byok: {
      // Multiple credentials for the same provider (tried in order)
      vertex: [
        { project: 'proj-1', location: 'us-east5', googleCredentials: { privateKey: '...', clientEmail: '...' } },
        { project: 'proj-2', location: 'us-east5', googleCredentials: { privateKey: '...', clientEmail: '...' } },
      ],
      // Multiple providers
      anthropic: [{ apiKey: 'sk-ant-...' }],
      bedrock: [{ accessKeyId: '...', secretAccessKey: '...', region: 'us-east-1' }],
    },
  } satisfies GatewayProviderOptions,
},
```

> **💡 Note:** For Chat Completions API usage with request-scoped BYOK, see the
> [OpenAI Chat Completions API
> documentation](/docs/ai-gateway/authentication-and-byok/byok#request-scoped-byok).

### Model mappings

Some providers like Azure let you create deployments with custom names. Model mappings let you map AI Gateway model slugs to your deployment names so requests route to the correct deployment.

For example, your Azure resource might have a deployment named `my-finetuned-gpt5` for the model `openai/gpt-5.4-nano`.

Include a `modelMappings` array in each credential to map AI Gateway model slugs to your custom deployment names:

```typescript
providerOptions: {
  gateway: {
    only: ['azure'],
    byok: {
      azure: [
        {
          apiKey: process.env.AZURE_API_KEY,
          resourceName: process.env.AZURE_RESOURCE_NAME,
          modelMappings: [
            {
              gatewayModelSlug: 'openai/gpt-5.4-nano',
              customModelId: 'my-finetuned-gpt5',
            },
          ],
        },
      ],
    },
  } satisfies GatewayProviderOptions,
},
```

Model mappings are optional. If your deployment names match AI Gateway defaults, skip this step.

You can also configure model mappings in the dashboard when adding or editing BYOK credentials. The dashboard provides a searchable dropdown of available AI Gateway model slugs.

> **💡 Note:** AI Gateway displays pricing based on East US 2 region rates. If your Azure
> resource is in a different region, your actual costs may vary. For
> region-specific pricing, see [Azure OpenAI
> pricing](https://azure.microsoft.com/en-us/pricing/details/azure-openai/).

## Zero Data Retention (ZDR)

When ZDR is enabled, either team-wide or per-request, AI Gateway skips your BYOK keys by default. BYOK keys operate under your own agreements and permissions with providers, which can differ from the ZDR agreements Vercel has negotiated for AI Gateway system credentials.

If you have your own ZDR agreement with a provider, mark an individual BYOK key as ZDR-compliant to include it in the ZDR routing set. This applies to both team-wide and request-level ZDR.

Marking a key as ZDR-compliant makes it eligible for ZDR routing; it does not enable ZDR. ZDR is enforced only when team-wide ZDR is on or the request sets `zeroDataRetention: true`. Without team-wide or request-level ZDR enabled, normal routing and fallback apply. Marking a BYOK key as ZDR-compliant does not enforce ZDR for the request.

ZDR also changes fallback. With ZDR enabled, a ZDR-marked BYOK key is tried first, and a failed request falls back only to system credentials for providers with ZDR agreements. If none are available for the model, the request fails instead of routing through a non-ZDR provider.

> **💡 Note:** For the full behavior and configuration steps, see [ZDR and
> BYOK](/docs/ai-gateway/security-and-compliance/zdr#byok).

## Regional inference

Using your own credentials doesn't opt you out of regional routing. AI Gateway applies `inferenceRegion` to BYOK requests the same way it does to system credentials, calling the provider's in-region endpoint with your key. A region set on the request overrides a region saved on the credential, such as a Vertex `location`.

For the full behavior, including failure cases and how to confirm where a request ran, see [BYOK and data residency](/docs/ai-gateway/security-and-compliance/regional-inference#byok-and-data-residency).

## Testing your credentials

After successfully adding your credentials for a provider, you can verify that they're working directly from the **Bring Your Own Key (BYOK)** tab. To test your credentials:

1. In the [AI Gateway](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2F\&title=) tab, navigate to the **Bring Your Own Key (BYOK)** section.
2. Click the menu for the key you want to test.
3. Select **Test Key** from the dropdown.

This will execute a small test query using a cheap and fast model from the selected provider to verify the health of your credentials. The test is designed to be minimal and cost-effective while ensuring your authentication is working properly.

Once the test completes, you can click on the test result badge to open a detailed test result modal. This modal includes:

- The code used to make the test request
- The raw JSON response returned by the AI Gateway


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
