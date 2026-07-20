---
source: "https://cursor.com/docs/models-and-pricing.md"
fetched_at: "2026-07-20T06:48:56.322Z"
sha256: "621f4f4e3666f1431ec1b4133586471e1ef0481303aac7937e21861d53bb9ca4"
---

# Models & Pricing

Cursor supports frontier models from OpenAI, Anthropic, Google, SpaceXAI, and more. Every individual plan includes two usage pools so you can pick the right balance of intelligence, speed, and cost.

## Usage pools

There are two separate usage pools for individual plans, each resetting with your monthly billing cycle:

- **First-party models**: Significantly more included usage with Auto, Composer 2.5, and Grok 4.5.
- **API**: Charged at the model's API price. Individual plans include at least $20 of API usage each month (more on higher tiers) with the option to pay for additional usage as needed.

Both pools are visible in your editor settings and on your [usage dashboard](https://cursor.com/dashboard/usage).

## First-party models pool

Auto allows Cursor to select models that balance intelligence, cost efficiency, and reliability. It is useful for everyday tasks.

The First-party models pool includes Auto, Composer 2.5, and Grok 4.5.

### Auto pricing

| Token type          | Price per 1M tokens |
| :------------------ | :------------------ |
| Input + Cache Write | $1.25               |
| Output              | $6.00               |
| Cache Read          | $0.25               |

### Composer pricing

Composer 2.5 is Cursor's own model, trained to be highly capable for agentic coding.

### Grok 4.5 pricing

Grok 4.5 is jointly trained by Cursor and SpaceXAI for long-running coding and knowledge work.

## API pool

When you select a specific model, usage is drawn from the API pool at that model's API rate.

### Model pricing

All prices are per million tokens:

| Model                                                                                         | Provider  | Input | Cache write | Cache read | Output | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------- | --------- | ----- | ----------- | ---------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Claude 4 Sonnet](https://www.anthropic.com/claude/sonnet)                                    | Anthropic | $3    | $3.75       | $0.3       | $15    | Hidden by default; Thinking variant counts as 2 requests in legacy pricing                                                                                                                                                                                                                                                                                                                                                                      |
| [Claude 4 Sonnet 1M](https://www.anthropic.com/claude/sonnet)                                 | Anthropic | $6    | $7.5        | $0.6       | $22.5  | Hidden by default; Thinking variant counts as 2 requests in legacy pricing; This model can be very expensive due to the large context window; The cost is 2x when the input exceeds 200k tokens                                                                                                                                                                                                                                                 |
| [Claude 4.5 Haiku](https://www.anthropic.com/claude/haiku)                                    | Anthropic | $1    | $1.25       | $0.1       | $5     | Hidden by default; Bedrock/Vertex: regional endpoints +10% surcharge; Cache: writes 1.25x, reads 0.1x                                                                                                                                                                                                                                                                                                                                           |
| [Claude 4.5 Opus](https://www.anthropic.com/claude/opus)                                      | Anthropic | $5    | $6.25       | $0.5       | $25    | Hidden by default; Requires Max Mode on legacy request-based plans                                                                                                                                                                                                                                                                                                                                                                              |
| [Claude 4.5 Sonnet](https://www.anthropic.com/claude/sonnet)                                  | Anthropic | $3    | $3.75       | $0.3       | $15    | Hidden by default; Requires Max Mode on legacy request-based plans; Up to 1M tokens with extended context at the same per-token rates (no long-context surcharge)                                                                                                                                                                                                                                                                               |
| [Claude 4.6 Opus](https://www.anthropic.com/claude/opus)                                      | Anthropic | $5    | $6.25       | $0.5       | $25    | Hidden by default; Requires Max Mode on legacy request-based plans; Up to 1M tokens with extended context at the same per-token rates (no long-context surcharge)                                                                                                                                                                                                                                                                               |
| [Claude 4.6 Sonnet](https://www.anthropic.com/claude/sonnet)                                  | Anthropic | $3    | $3.75       | $0.3       | $15    | Hidden by default; Requires Max Mode on legacy request-based plans; Up to 1M tokens with extended context at the same per-token rates (no long-context surcharge)                                                                                                                                                                                                                                                                               |
| [Claude 4.7 Opus](https://www.anthropic.com/claude/opus)                                      | Anthropic | $5    | $6.25       | $0.5       | $25    | Hidden by default; Requires Max Mode on legacy request-based plans; Up to 1M tokens with extended context at the same per-token rates (no long-context surcharge)                                                                                                                                                                                                                                                                               |
| [Claude Fable 5](https://www.anthropic.com/claude)                                            | Anthropic | $10   | $12.5       | $1         | $50    | Requires data retention approval for Enterprise customers, Teams and individual customers with Privacy Mode enabled; Anthropic stores agent input and output data for harm-prevention processes; this data is not used to train or improve Anthropic models or products; Requests that trip a security guardrail are automatically routed to Claude Opus; About 2x the cost of Claude Opus 4.8; Requires Max Mode on legacy request-based plans |
| [Claude Opus 4.7 (fast mode)](https://www.anthropic.com/claude/opus)                          | Anthropic | $30   | $37.5       | $3         | $150   | Hidden by default; Requires Max Mode on legacy request-based plans; Limited research preview; Up to 1M tokens with extended context at the same per-token rates as shorter context                                                                                                                                                                                                                                                              |
| [Claude Opus 4.8](https://www.anthropic.com/claude/opus)                                      | Anthropic | $5    | $6.25       | $0.5       | $25    | Requires Max Mode on legacy request-based plans; Fast mode (\`claude-opus-4-8-fast\`) requires Max Mode on legacy request-based plans; Fast mode is 3x lower per-token pricing than Opus 4.7 fast mode; Up to 1M tokens with extended context at the same per-token rates (no long-context surcharge)                                                                                                                                           |
| [Claude Sonnet 5](https://www.anthropic.com/claude/sonnet)                                    | Anthropic | $3    | $3.75       | $0.3       | $15    | Launch promotion: $2/M input and $10/M output through August 31, 2026; Requires Max Mode on legacy request-based plans; Up to 1M tokens with extended context at the same per-token rates (no long-context surcharge); Uses an updated tokenizer, so the same input can map to more tokens                                                                                                                                                      |
| [Composer 1](https://cursor.com)                                                              | Cursor    | $1.25 | -           | $0.125     | $10    | Hidden by default                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [Composer 2.5](https://cursor.com/blog/composer-2-5)                                          | Cursor    | $0.5  | -           | $0.2       | $2.5   | -                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [Gemini 2.5 Flash](https://developers.googleblog.com/en/start-building-with-gemini-25-flash/) | Google    | $0.3  | -           | $0.03      | $2.5   | Hidden by default                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [Gemini 3 Flash](https://ai.google.dev/gemini-api/docs)                                       | Google    | $0.5  | -           | $0.05      | $3     | Hidden by default                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [Gemini 3 Pro](https://ai.google.dev/gemini-api/docs)                                         | Google    | $2    | -           | $0.2       | $12    | Hidden by default                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [Gemini 3 Pro Image Preview](https://ai.google.dev/gemini-api/docs)                           | Google    | $2    | -           | $0.2       | $12    | Hidden by default; Native image generation model optimized for speed, flexibility, and contextual understanding; Text input and output priced the same as Gemini 3 Pro; Image output: $120/1M tokens (\~$0.134 per 1K/2K image, \~$0.24 per 4K image); Preview models may change before becoming stable and have more restrictive rate limits                                                                                                   |
| [Gemini 3.1 Pro](https://ai.google.dev/gemini-api/docs)                                       | Google    | $2    | -           | $0.2       | $12    | -                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [Gemini 3.5 Flash](https://ai.google.dev/gemini-api/docs)                                     | Google    | $1.5  | -           | $0.15      | $9     | -                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [GLM 5.2](https://z.ai)                                                                       | Z.ai      | $1.4  | -           | $0.26      | $4.4   | Hidden by default                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [GPT-5](https://openai.com/index/gpt-5/)                                                      | OpenAI    | $1.25 | -           | $0.125     | $10    | Hidden by default; Agentic and reasoning capabilities; Available reasoning effort variant is gpt-5-high                                                                                                                                                                                                                                                                                                                                         |
| [GPT-5 Fast](https://openai.com/index/gpt-5/)                                                 | OpenAI    | $2.5  | -           | $0.25      | $20    | Hidden by default; Faster speed but 2x price; Available reasoning effort variants are gpt-5-high-fast, gpt-5-low-fast                                                                                                                                                                                                                                                                                                                           |
| [GPT-5 Mini](https://openai.com/index/gpt-5/)                                                 | OpenAI    | $0.25 | -           | $0.025     | $2     | Hidden by default                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [GPT-5-Codex](https://platform.openai.com/docs/models/gpt-5-codex)                            | OpenAI    | $1.25 | -           | $0.125     | $10    | Hidden by default; Agentic and reasoning capabilities                                                                                                                                                                                                                                                                                                                                                                                           |
| [GPT-5.1 Codex](https://platform.openai.com/docs/models/gpt-5-codex)                          | OpenAI    | $1.25 | -           | $0.125     | $10    | Hidden by default; Agentic and reasoning capabilities                                                                                                                                                                                                                                                                                                                                                                                           |
| [GPT-5.1 Codex Max](https://platform.openai.com/docs/models/gpt-5-codex)                      | OpenAI    | $1.25 | -           | $0.125     | $10    | Hidden by default                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [GPT-5.1 Codex Mini](https://platform.openai.com/docs/models/gpt-5-codex)                     | OpenAI    | $0.25 | -           | $0.025     | $2     | Hidden by default; Agentic and reasoning capabilities; 4x rate limits compared to GPT-5.1 Codex                                                                                                                                                                                                                                                                                                                                                 |
| [GPT-5.2](https://openai.com/index/gpt-5/)                                                    | OpenAI    | $1.75 | -           | $0.175     | $14    | Hidden by default; Agentic and reasoning capabilities; Available reasoning effort variant is gpt-5.2-high                                                                                                                                                                                                                                                                                                                                       |
| [GPT-5.2 Codex](https://platform.openai.com/docs/models/gpt-5-codex)                          | OpenAI    | $1.75 | -           | $0.175     | $14    | Hidden by default; Agentic and reasoning capabilities                                                                                                                                                                                                                                                                                                                                                                                           |
| [GPT-5.3 Codex](https://platform.openai.com/docs/models/gpt-5-codex)                          | OpenAI    | $1.75 | -           | $0.175     | $14    | Hidden by default; Requires Max Mode on legacy request-based plans; Agentic and reasoning capabilities; Available reasoning effort variant is gpt-5.3-codex-high                                                                                                                                                                                                                                                                                |
| [GPT-5.4](https://developers.openai.com/api/docs/models/gpt-5.4)                              | OpenAI    | $2.5  | -           | $0.25      | $15    | Hidden by default; Requires Max Mode on legacy request-based plans; Agentic and reasoning capabilities; 90% discount on cached input tokens; Fast mode is 15% faster with 2x pricing; Long context supports up to 1M tokens with 2x input pricing                                                                                                                                                                                               |
| [GPT-5.4 Mini](https://developers.openai.com/api/docs/models/gpt-5.4-mini)                    | OpenAI    | $0.75 | -           | $0.075     | $4.5   | Hidden by default; Smaller, faster variant of GPT-5.4; 90% discount on cached input tokens                                                                                                                                                                                                                                                                                                                                                      |
| [GPT-5.4 Nano](https://developers.openai.com/api/docs/models/gpt-5.4-nano)                    | OpenAI    | $0.2  | -           | $0.02      | $1.25  | Hidden by default; Smallest GPT-5.4 variant, optimized for cost; 90% discount on cached input tokens                                                                                                                                                                                                                                                                                                                                            |
| [GPT-5.5](https://developers.openai.com/api/docs/models/gpt-5.5)                              | OpenAI    | $5    | -           | $0.5       | $30    | Hidden by default; Requires Max Mode on legacy request-based plans; Agentic and reasoning capabilities; More token-efficient than GPT-5.4 on comparable tasks; Improved persistence on long-running tasks; Fast mode is available at higher rates; Long context supports up to 1M tokens with 2x input pricing                                                                                                                                  |
| [GPT-5.6 Luna](https://openai.com/index/previewing-gpt-5-6-sol/)                              | OpenAI    | $1    | $1.25       | $0.1       | $6     | Smallest GPT-5.6 variant, optimized for cost and speed; Agentic and reasoning capabilities; Fast mode is available at 2x pricing; Cache writes are billed at 1.25x the uncached input rate                                                                                                                                                                                                                                                      |
| [GPT-5.6 Sol](https://openai.com/index/previewing-gpt-5-6-sol/)                               | OpenAI    | $5    | $6.25       | $0.5       | $30    | Requires Max Mode on legacy request-based plans; Agentic and reasoning capabilities; Fast mode is available at 2x pricing; Long context supports up to 1M tokens with 2x input pricing; Cache writes are billed at 1.25x the uncached input rate                                                                                                                                                                                                |
| [GPT-5.6 Terra](https://openai.com/index/previewing-gpt-5-6-sol/)                             | OpenAI    | $2.5  | $3.125      | $0.25      | $15    | Mid-tier GPT-5.6 variant between Sol and Luna; Agentic and reasoning capabilities; Fast mode is available at 2x pricing; Cache writes are billed at 1.25x the uncached input rate                                                                                                                                                                                                                                                               |
| Grok 4.5                                                                                      | Cursor    | $2    | -           | $0.5       | $6     | Jointly trained by Cursor and SpaceXAI                                                                                                                                                                                                                                                                                                                                                                                                          |
| Kimi K2.7 Code                                                                                | Moonshot  | $0.95 | -           | $0.19      | $4     | Hidden by default                                                                                                                                                                                                                                                                                                                                                                                                                               |

Opting in to regional data residency incurs a 10% uplift on Model pricing for eligible Models. See [Privacy and Data Governance](https://cursor.com/docs/enterprise/privacy-and-data-governance.md) for details on supported regions, Models, functions and data residency policies.

## Plans

All individual plans include unlimited tab completions, extended agent usage limits on all models, access to Bugbot, and access to Cloud Agents.

| Plan         | Price   | API usage included | First-party models pool |
| :----------- | :------ | :----------------- | :---------------------- |
| **Pro**      | $20/mo  | $20                | Generous included usage |
| **Pro Plus** | $60/mo  | $70                | Generous included usage |
| **Ultra**    | $200/mo | $400               | Generous included usage |

Since different models have different API costs, your model selection affects how quickly your included usage is consumed.

### How much usage do I need?

- **Daily Tab users**: Always stay within $20
- **Limited Agent users**: Often stay within the included $20
- **Daily Agent users**: Typically $60–$100/mo total usage
- **Power users (multiple agents/automation)**: Often $200+/mo total usage

### What happens when I reach my limit?

When you exceed your included monthly usage, you can either:

- **Add on-demand usage**: Continue at the same API rates with pay-as-you-go billing
- **Upgrade your plan**: Move to a higher tier for more included usage

On-demand usage is billed monthly at the same rates. Requests are never downgraded in quality or speed.

### Teams

There are two business plans: Teams and Enterprise (Custom). Teams offers two seat types: Standard ($40/user/mo) and Premium ($120/user/mo), where Premium adds 5x the Standard limits on Agent.

Team plans provide additional features like centralized team billing and administration, a team marketplace for internal rules, skills, and plugins, agentic code reviews with Bugbot, cloud agents and automations with shared team context, usage analytics, team-wide privacy mode enforcement, and SAML/OIDC SSO.

We recommend Teams for any customer that is happy self-serving. We recommend [Enterprise](https://cursor.com/contact-sales?source=docs-models-pricing) for customers that need priority support, pooled usage, invoicing, SCIM, or advanced security controls.

Learn more about [Teams pricing](https://cursor.com/docs/account/teams/pricing.md).

## Cursor Token Rate

On Teams and Enterprise plans, non-Auto third-party model requests include a Cursor Token Rate of $0.25 per million tokens. This rate applies on top of model API pricing for included usage, on-demand usage, and BYOK usage. Auto requests and all first-party models, including Composer 2.5 and Grok 4.5, are exempt from the Cursor Token Rate.

## Legacy request-based pricing

### Max Mode

Max Mode is available only on legacy request-based plans. It extends a model's context window beyond the default limit and is billed at the model's API rate plus 20%. See [Max Mode on legacy plans](https://cursor.com/help/ai-features/max-mode.md) for details.

## FAQ

### Where are models hosted?

Models are hosted on US, Canada, & Iceland based infrastructure by the model's provider, a trusted partner, or Cursor directly. For details, see our list of [sub-processors](https://trust.cursor.com/subprocessors).

### Where can I find pricing terms?

For enterprise pricing details, billing terms, and fee calculations, see the [Pricing Policy](https://cursor.com/terms/pricing).


---

## Sitemap

[Overview of all docs pages](/llms.txt)
