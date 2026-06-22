---
title: vercel ai-gateway
product: vercel
url: /docs/cli/ai-gateway
canonical_url: "https://vercel.com/docs/cli/ai-gateway"
last_updated: 2026-05-29
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/ai-gateway
  - /docs/ai-gateway/models-and-providers/routing-rules
  - /docs/ai-gateway/authentication-and-byok/authentication
summary: "Manage AI Gateway resources from the Vercel CLI: create and configure AI Gateway API keys."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/ai-gateway.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "8e4a0a839539980115b2eb49c78aca4ac238dcc000b0a6266bb23086afbcd0f1"
---

# vercel ai-gateway

The `vercel ai-gateway` command manages [AI Gateway](/docs/ai-gateway) resources from the Vercel CLI, including API keys and [routing rules](/docs/ai-gateway/models-and-providers/routing-rules).

## Usage

```bash filename="terminal"
vercel ai-gateway [subcommand]
```

*Using the \`vercel ai-gateway\` command to manage AI Gateway resources for the
current team.*

## Commands

### api-keys

Manage AI Gateway API keys for the current team.

```bash filename="terminal"
vercel ai-gateway api-keys [subcommand]
```

#### create

Create a new AI Gateway API key. The CLI returns the plaintext key once; store it securely.

```bash filename="terminal"
vercel ai-gateway api-keys create
```

*Create an API key interactively, using the default settings.*

```bash filename="terminal"
vercel ai-gateway api-keys create --name my-key --budget 500 --refresh-period monthly
```

*Create an API key with a human-readable name and a monthly $500 quota.*

##### Options

| Option | Type | Description |
| --- | --- | --- |
| `--name <NAME>` | String | Human-readable name for the API key |
| `--budget <AMOUNT>` | Number | Quota budget amount in dollars (minimum 1) |
| `--refresh-period <PERIOD>` | String | Quota refresh cadence: `daily`, `weekly`, `monthly`, or `none` (default `none`) |
| `--include-byok` | Boolean | Include BYOK (Bring Your Own Key) usage in the quota (default `false`) |

### rules

Manage [AI Gateway routing rules](/docs/ai-gateway/models-and-providers/routing-rules) for the current team. A rule rewrites a request from one model to another, or denies a model. See the [routing rules documentation](/docs/ai-gateway/models-and-providers/routing-rules) for concepts, request behavior, and propagation details.

> **💡 Note:** AI Gateway routing rules are in beta and may change before general
> availability.

```bash filename="terminal"
vercel ai-gateway rules [subcommand]
```

#### add

Add a routing rule. A `rewrite` rule requires `--destination`; a `deny` rule does not.

```bash filename="terminal"
vercel ai-gateway rules add --type rewrite --source anthropic/claude-opus-4.7 --destination anthropic/claude-haiku-4.5
```

*Route requests for one model to another.*

```bash filename="terminal"
vercel ai-gateway rules add --type deny --source openai/gpt-5.5
```

*Block requests for a model.*

##### Options

| Option | Type | Description |
| --- | --- | --- |
| `--type <TYPE>` | String | Rule type: `rewrite` or `deny` (required) |
| `--source <MODEL>` | String | Model the rule matches (required) |
| `--destination <MODEL>` | String | Target model a `rewrite` rule routes to |
| `--reason <TEXT>` | String | Reason surfaced when the rule applies |
| `--description <TEXT>` | String | Human-readable description of the rule |

#### list

List routing rules for the current team. Alias: `ls`. Pass `--include-disabled` to also show disabled rules.

```bash filename="terminal"
vercel ai-gateway rules list
```

#### edit

Edit a rule by its ID. Change the destination, reason, or description, or toggle the rule with `--enable` / `--disable`.

```bash filename="terminal"
vercel ai-gateway rules edit rule_123 --disable
```

#### remove

Remove a rule by its ID. Aliases: `rm`, `delete`. Pass `--yes` to skip the confirmation prompt.

```bash filename="terminal"
vercel ai-gateway rules remove rule_123 --yes
```

## Examples

### Create an API key with defaults

```bash filename="terminal"
vercel ai-gateway api-keys create
```

*Create an API key with the default settings.*

### Create an API key with a monthly budget

```bash filename="terminal"
vercel ai-gateway api-keys create --name my-key --budget 500 --refresh-period monthly
```

*Create an API key named \`my-key\` with a $500 monthly quota that refreshes
every month.*

## Related

- [AI Gateway overview](/docs/ai-gateway)
- [AI Gateway routing rules](/docs/ai-gateway/models-and-providers/routing-rules)
- [AI Gateway authentication](/docs/ai-gateway/authentication-and-byok/authentication)


---

[View full sitemap](/docs/sitemap)
