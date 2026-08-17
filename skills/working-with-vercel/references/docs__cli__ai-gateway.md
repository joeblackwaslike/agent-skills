---
title: vercel ai-gateway
product: vercel
url: /docs/cli/ai-gateway
canonical_url: "https://vercel.com/docs/cli/ai-gateway"
last_updated: 2026-07-28
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/ai-gateway
  - /docs/ai-gateway/observability-and-spend
  - /docs/ai-gateway/models-and-providers/routing-rules
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway/coding-agents
summary: "Manage AI Gateway resources from the Vercel CLI: API keys, routing rules, models, and coding agent setup."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/ai-gateway.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "21839db7dd15fdd37dc903b188a5dd119c0e38b028720adbdaf6e3d546d7c29f"
---

# vercel ai-gateway

The `vercel ai-gateway` command manages [AI Gateway](/docs/ai-gateway) resources from the Vercel CLI, including API keys, [budgets](/docs/ai-gateway/observability-and-spend), [routing rules](/docs/ai-gateway/models-and-providers/routing-rules), [models](/docs/ai-gateway/models-and-providers), leaderboards, and [coding agents](/docs/ai-gateway/coding-agents).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How I use OpenCode with Vercel AI Gateway to build features fast](https://vercel.com/kb/guide/how-i-use-opencode-with-vercel-ai-gateway-to-build-features-fast?from=related) — How to route different AI models to different coding tasks automatically, cutting token costs by ~70% without losing qua
- [Build AI agents with AI Gateway and AI SDK](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk?from=related) — Build AI agents on Vercel with AI Gateway and AI SDK, then make them reliable, capable, and durable with Sandbox, Chat S
- [Manage your Sanity project from Slack with eve](https://vercel.com/kb/guide/eve-sanity-copilot?from=related) — A Slack-based Sanity copilot built on eve. It queries and edits content with GROQ, shapes schemas, manages releases, and
- [Build an agent with Vercel and Flue](https://vercel.com/kb/guide/build-an-agent-with-vercel-and-flue?from=related) — Build and deploy an agent with Flue, Vercel Sandbox, and AI Gateway
- [Draft content in your voice from Slack with eve](https://vercel.com/kb/guide/eve-content-agent?from=related) — Deploy the eve content agent template, a Slack bot that drafts blog posts, LinkedIn posts, release notes, and newsletter
- [CLI](https://eve.dev/docs/reference/cli?from=related) — Reference for every eve CLI command: init, set, info, build, start, dev, logs, trace, link, deploy, eval, channels, and
- [Conductor](https://vercel.com/docs/ai-gateway/coding-agents/conductor?from=related) — Use Conductor with the AI Gateway.
- [Grok Build](https://vercel.com/docs/ai-gateway/coding-agents/grok-build?from=related) — Use Grok Build with the AI Gateway.
- [Superset](https://vercel.com/docs/ai-gateway/coding-agents/superset?from=related) — Use Superset with the AI Gateway.

Full cross-link map for this page: [/docs/cli/ai-gateway.graph.md](/docs/cli/ai-gateway.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** Connecting a coding agent? [`vercel ai-gateway coding-agents setup`](#setup)
> is the recommended way to do it. For per-agent behavior, model pickers, and
> manual configuration, see the [coding agents
> guide](/docs/ai-gateway/coding-agents).

## Usage

```bash filename="terminal"
vercel ai-gateway [subcommand]
```

*Using the \`vercel ai-gateway\` command to manage AI Gateway resources for the
current team.*

Most subcommands accept `--format json` (`-F json`) to print a machine-readable payload instead of a table. The `rules`, `models`, and `budgets set`, `list`, and `remove` subcommands also accept `--json`, which does the same thing. [`coding-agents setup`](#setup) uses [`--non-interactive`](#non-interactive-output) instead.

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
| `--include-byok` | Boolean | Count bring-your-own-key (BYOK) usage toward the quota (default `false`) |
| `--alert-thresholds <LIST>` | String | Comma-separated spend percentages to alert at, a subset of `50`, `75`, and `100`, for example `75,100` |
| `--expiration <PERIOD>` | String | Expiry for the key: `7d`, `30d`, `60d`, `90d`, `1y`, or `none` (default `none`) |
| `--zdr-exempt` | Boolean | Exempt the key from the team's [zero data retention](/docs/ai-gateway/security-and-compliance/zdr) (ZDR) only model restriction. Team owners only |

> **⚠️ Warning:** A ZDR-exempt key can reach models that don't offer zero data retention, which
> is why only team owners can create one. Pair it with `--expiration` so the
> exemption doesn't outlive the work that needed it.

```bash filename="terminal"
vercel ai-gateway api-keys create --name escape-hatch --zdr-exempt --expiration 7d
```

*Create a ZDR-exempt key that expires in seven days.*

#### list

List the AI Gateway API keys for the current team. The table shows each key's ID, name, masked key, quota, and expiry. Alias: `ls`.

```bash filename="terminal"
vercel ai-gateway api-keys ls
```

##### Options

| Option | Type | Description |
| --- | --- | --- |
| `--format <FORMAT>` | String | Set to `json` for the full key payload |

#### inspect

Show the details of one API key, including its quota, current spend, alert thresholds, and expiry. Keys created with [`--zdr-exempt`](#create) also show a `zdr exempt` row, so you can audit which keys carry the exemption.

```bash filename="terminal"
vercel ai-gateway api-keys inspect key_123
```

##### Options

| Option | Type | Description |
| --- | --- | --- |
| `--format <FORMAT>` | String | Set to `json` for the full key payload |

#### remove

Remove an API key by its ID. Aliases: `rm`, `delete`. Pass `--yes` to skip the confirmation prompt.

```bash filename="terminal"
vercel ai-gateway api-keys remove key_123 --yes
```

##### Options

| Option | Type | Description |
| --- | --- | --- |
| `--yes`, `-y` | Boolean | Skip the confirmation prompt |
| `--format <FORMAT>` | String | Set to `json` for the machine-readable payload |

### budgets

Manage AI Gateway budgets, which are metered spend limits that apply to a scope rather than to a single key.

```bash filename="terminal"
vercel ai-gateway budgets [subcommand]
```

#### set

Create or update the budget for a scope. The `team` scope takes no name; the `project` scope takes a project name or ID.

```bash filename="terminal"
vercel ai-gateway budgets set team --limit 500 --refresh-period monthly
```

*Cap team-wide AI Gateway spend at $500 per month.*

```bash filename="terminal"
vercel ai-gateway budgets set project my-project --limit 200
```

*Cap one project at $200.*

##### Options

| Option | Type | Description |
| --- | --- | --- |
| `--limit <AMOUNT>` | Number | Budget limit in dollars (minimum 1) |
| `--refresh-period <PERIOD>` | String | Budget refresh cadence: `daily`, `weekly`, `monthly`, or `none` (default `monthly`) |
| `--include-byok` | Boolean | Count BYOK usage toward the budget (default `false`) |
| `--format <FORMAT>` | String | Set to `json` for the machine-readable payload |

#### list

List the budgets for the current team, with each budget's scope, limit, current spend, and refresh cadence. Alias: `ls`.

```bash filename="terminal"
vercel ai-gateway budgets ls
```

##### Options

| Option | Type | Description |
| --- | --- | --- |
| `--format <FORMAT>` | String | Set to `json` for the machine-readable payload |

#### remove

Remove the budget for a scope. Aliases: `rm`, `delete`.

```bash filename="terminal"
vercel ai-gateway budgets remove project my-project --yes
```

##### Options

| Option | Type | Description |
| --- | --- | --- |
| `--yes`, `-y` | Boolean | Skip the confirmation prompt |
| `--format <FORMAT>` | String | Set to `json` for the machine-readable payload |

#### defaults

Manage budget defaults. A default applies to every resource of that scope that has no budget of its own, so new projects and new API keys inherit a spend limit instead of starting unlimited.

```bash filename="terminal"
vercel ai-gateway budgets defaults [subcommand]
```

| Subcommand | Description |
| --- | --- |
| `list` (alias `ls`) | List the team's budget defaults |
| `set <SCOPE>` | Create or update the default for `project` or `api-key` |
| `remove <SCOPE>` (aliases `rm`, `delete`) | Remove the default for `project` or `api-key` |

```bash filename="terminal"
vercel ai-gateway budgets defaults set project --limit 200 --refresh-period monthly
```

*Give every project without its own budget a $200 monthly limit.*

```bash filename="terminal"
vercel ai-gateway budgets defaults set api-key --limit 50
```

*Give every API key without its own quota a $50 limit.*

##### Options

| Option | Type | Description |
| --- | --- | --- |
| `--limit <AMOUNT>` | Number | Default budget limit in dollars (minimum 1). Applies to `set` |
| `--refresh-period <PERIOD>` | String | Refresh cadence: `daily`, `weekly`, `monthly`, or `none` (default `monthly`). Applies to `set` |
| `--yes`, `-y` | Boolean | Skip the confirmation prompt. Applies to `remove` |
| `--format <FORMAT>` | String | Set to `json` for the machine-readable payload |

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
vercel ai-gateway rules add --type rewrite --source anthropic/claude-opus-5 --destination anthropic/claude-haiku-4.5
```

*Route requests for one model to another.*

```bash filename="terminal"
vercel ai-gateway rules add --type deny --source openai/gpt-5.6-sol
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
| `--format <FORMAT>` | String | Set to `json` for the machine-readable payload |

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

### coding-agents

Connect local coding agents to [AI Gateway](/docs/ai-gateway).

```bash filename="terminal"
vercel ai-gateway coding-agents [subcommand]
```

#### setup

Configure [supported coding agents](#supported-coding-agents) to route requests through AI Gateway. The command provisions or reuses an AI Gateway API key and writes each agent's config file so requests use the gateway with your key.

This is the recommended way to connect an agent: it picks the right [compatibility URL](#gateway-urls-the-command-writes) per agent, keeps your key out of plaintext config on macOS, and preserves your existing desktop sessions. The [coding agents guide](/docs/ai-gateway/coding-agents) covers the same agents from the other direction, with per-agent features and manual configuration for the tools this command doesn't handle.

```bash filename="terminal"
vercel ai-gateway coding-agents setup --yes
```

*Connect the coding agents detected on this machine without any prompts.*

Run the command without flags to step through each prompt in order:

1. **Agents** to configure. The agents detected on your machine (their config directory exists) are pre-selected.
2. **Consent** for any agent with a pre-flight warning, described in [Warnings and consent](#warnings-and-consent). Declining skips that agent and continues with the others.
3. **Session migration**, when you have Claude Desktop or Codex Desktop sessions that would otherwise disappear from the switched provider. See [Desktop session migration](#desktop-session-migration).
4. **API key name** for a new key. The prompt suggests `[<user>'s <device>] Coding Agents`.
5. **Team** that owns the key.
6. **Spend limit** (quota) for the key.
7. **Expiration** for the key.
8. **Keychain storage** on macOS: whether to store the key in your Keychain (default yes).

When a selected agent isn't found at its default location, the command also offers to set a custom config path. It then prints a summary and the planned changes as a per-file diff with the key masked, and asks you to confirm. Declining writes nothing and never creates a key.

##### Supported coding agents

| Agent | `--agent` value |
| --- | --- |
| [Claude Code](/docs/ai-gateway/coding-agents/claude-code) | `claude-code` |
| [Cline](/docs/ai-gateway/coding-agents/cline) | `cline` |
| [Codex](/docs/ai-gateway/coding-agents/openai-codex) | `codex` |
| [Cursor](/docs/ai-gateway/coding-agents/cursor) | `cursor` |
| [Hermes](/docs/ai-gateway/coding-agents/hermes) | `hermes` |
| [Kilo Code](/docs/ai-gateway/coding-agents/kilo-code) | `kilo` |
| [OpenClaw](/docs/ai-gateway/coding-agents/openclaw) | `openclaw` |
| [OpenCode](/docs/ai-gateway/coding-agents/opencode) | `opencode` |
| [Pi](/docs/ai-gateway/coding-agents/pi) | `pi` |

The command treats every agent the same way: detection pre-selects the ones already installed on your machine, `--all` covers every agent in the table, and the interactive checklist lists them in this order. To connect a subset, name each one with `--agent`:

```bash filename="terminal"
vercel ai-gateway coding-agents setup --agent cursor --agent kilo
```

*Connect specific agents by naming each one with \`--agent\`.*

##### Gateway URLs the command writes

AI Gateway serves several compatibility surfaces, and each agent gets the one its client speaks. The command picks these for you, which is the main reason to prefer it over hand-editing a config file:

| Agent | URL | Why this surface |
| --- | --- | --- |
| Claude Code | `https://ai-gateway.vercel.sh/claude-code` | Anthropic-compatible surface with a Claude Code shaped model catalog, so gateway models appear in the `/model` picker. The Anthropic SDK appends `/v1/messages` itself, so the URL has no `/v1` |
| Codex | `https://ai-gateway.vercel.sh/codex/v1` | OpenAI-compatible surface that also serves `/codex/v1/models` in the `ModelsResponse` shape Codex decodes at startup. Every other path falls through to the standard `/v1` handlers |
| Cursor | `https://ai-gateway.vercel.sh/cursor/v1` | OpenAI-compatible surface that normalizes the non-spec bodies Cursor's base URL override sends to `/chat/completions`, which the standard schema rejects. Every other path falls through to the standard `/v1` handlers |
| Hermes, Kilo Code, OpenClaw | `https://ai-gateway.vercel.sh/coding-agent/v1` | The [coding agent surface](#the-coding-agent-surface), for agents with no dedicated endpoint of their own |
| Cline, OpenCode, Pi | None | These agents ship a first-party AI Gateway provider and already know the URL, so only the credential is written |

Pass `--base-url <URL>` to write a different base URL, for example a preview deployment of the gateway. The value is written verbatim to the agents that carry a URL, and it has no effect on agents that use a first-party provider.

##### The coding agent surface

Every agent without a dedicated endpoint should point at the shared coding agent surface:

```bash
https://ai-gateway.vercel.sh/coding-agent/v1
```

It passes straight through to the standard `/v1` handlers, so auth, routing, billing, CORS, and errors behave exactly as they do on the bare `/v1` surface, and unknown paths return the same JSON 404. Use it anyway: it marks the traffic as coming from a coding agent, and it gives behavior that turns out to be common to every harness somewhere to live later, without you having to edit your config again.

For a client that speaks the Anthropic protocol and appends `/v1/messages` itself, drop the `/v1` and use `https://ai-gateway.vercel.sh/coding-agent`.

##### What it configures

| Agent | Files | What's written |
| --- | --- | --- |
| Claude Code | `~/.claude/settings.json` (honors `$CLAUDE_CONFIG_DIR`); shell startup file in Keychain mode | `env.ANTHROPIC_BASE_URL`, `env.ANTHROPIC_API_KEY=""`, and `env.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1`; the key as `env.ANTHROPIC_AUTH_TOKEN` or a Keychain-resolved shell export |
| Codex | `~/.codex/config.toml` (honors `$CODEX_HOME`) plus shell startup file | `model_provider=vercel` and a `vercel` provider (`base_url`, `wire_api=responses`, `env_key=AI_GATEWAY_API_KEY`); the shell file exports `AI_GATEWAY_API_KEY` |
| OpenCode | `~/.config/opencode/opencode.json` (honors `$XDG_CONFIG_HOME`); shell startup file in Keychain mode | A `vercel` provider entry; the key as `provider.vercel.options.apiKey` or the `AI_GATEWAY_API_KEY` shell export |
| Pi | `~/.pi/agent/auth.json` (mode `0600`, honors `$PI_CODING_AGENT_DIR`) | A `vercel-ai-gateway` API-key entry. Pi always stores the key in this file, even in Keychain mode |
| Cline | `~/.cline/data/settings/providers.json` (mode `0600`) | A `vercel-ai-gateway` provider with your key, set as `lastUsedProvider` and given the default model below |
| Cursor | None | Cursor keeps API-key settings in its account-synced store, so the command exports `AI_GATEWAY_API_KEY` and prints the steps to finish in **Settings** -> **Models**, including the `/cursor/v1` base URL to paste |
| Hermes | `~/.hermes/config.yaml` | A `vercel-ai-gateway` provider (`key_env=AI_GATEWAY_API_KEY`, `discover_models: true`) plus the default model below; the shell file exports the key |
| Kilo Code | `~/.config/kilo/kilo.json` (honors `$XDG_CONFIG_HOME`) | An `openai-compatible` provider whose `apiKey` is the `{env:AI_GATEWAY_API_KEY}` reference Kilo resolves at runtime; the shell file exports the key |
| OpenClaw | `~/.openclaw/openclaw.json` | A `vercel-ai-gateway` provider whose `apiKey` is an `${AI_GATEWAY_API_KEY}` reference, a starter model list, and the default model below; the shell file exports the key |

The command edits existing files in place, preserving their formatting, and saves a `.bak` copy first. Disable backups with `--no-backup`. If it can't parse a file, it skips that file instead of overwriting it.

Shell exports live in a marked, removable block in your shell's startup file: `~/.zshrc` for zsh (honors `$ZDOTDIR`), `~/.bash_profile` on macOS or `~/.bashrc` elsewhere for bash, `config.fish` for fish, or `~/.profile` otherwise. Pass `--shell-rc <path>` to target a different file, or `--agent-config <agent>=<path>` to override an agent's config location. On Windows there's no shell startup file to manage: the command tells you which environment variable to set, and prints a newly created key once so you don't lose it.

##### Model selection

For Claude Code, Codex, OpenCode, Pi, Kilo Code, and Cursor, the command pins no model, so you keep choosing your own inside the agent. Cline, Hermes, and OpenClaw can't start without one, so they get `anthropic/claude-fable-5` as a starting point. Change it at any time:

| Agent | How to switch models |
| --- | --- |
| Cline | In-session, or `cline auth -p vercel-ai-gateway -m <gateway-model-id>` |
| Hermes | `/model custom:vercel-ai-gateway:<gateway-model-id>` |
| OpenClaw | Add the model to the provider's `models` array in `openclaw.json`, then select it |

##### Desktop session migration

Switching providers hides the sessions that were recorded under the old one. When the command finds those sessions, it offers to copy them into the gateway provider so your history stays visible. Originals are never moved, edited, or deleted.

| Agent | What gets copied |
| --- | --- |
| Claude Code | Claude Desktop session records, copied into the gateway (`Claude-3p`) identity with each `model` rewritten to its gateway ID. The gateway identity only exists after Claude Desktop's first gateway launch, so re-run setup once you've switched providers in **Developer** -> **Configure Third-Party Inference** |
| Codex | Codex Desktop rollout files under `sessions` and `archived_sessions`, copied with a deterministic new session ID and `model_provider` set to `vercel` |

Copies are atomic, use mode `0600`, and never clobber an existing destination. Re-running is safe: a session that was already copied is skipped. If a copy fails, the command leaves your agent configuration untouched and exits `1` so you can retry.

Interactively, you get one prompt and can decline. With `--yes` or in non-interactive mode, eligible sessions are copied. Pass `--no-session-migration` to skip the whole step. Compressed Codex sessions (`.jsonl.zst`) can't be rewritten: decompress them first, or pass `--no-session-migration`.

##### Warnings and consent

Connecting can break an agent's existing setup. Before asking any key questions, the command checks each selected agent for known conflicts and asks for explicit consent, so you can bail before a key is created. Detection only checks whether an app is installed; the command never reads your data.

Interactively, each warned agent gets its own confirmation, defaulting to no. Declining leaves that agent's files untouched, and the run continues with the other agents.

With `--yes` or in non-interactive mode, naming an agent with `--agent` (or passing `--all`) counts as consent: the run proceeds and prints the warnings. The command skips a warned agent that was only selected by detection, with reason `requires_consent` and a hint to pass `--agent <id>`. If that skips every agent, the command exits `1` with reason `requires_consent` and a ready-to-run command that replays the invocation with the consent flags added. `--dry-run` never asks for consent; it prints the warnings and shows what a real run would do.

> **💡 Note:** No agent currently ships a warning. Codex used to warn that connecting broke
> the Codex desktop app; that warning is gone now that setup migrates desktop
> sessions instead.

##### Key storage

On macOS, the command stores the API key in your login Keychain by default instead of writing it into plaintext config. It saves the key as a generic password with the service name "Vercel AI Gateway", and agents read it through shell exports that call `security find-generic-password` when a terminal starts. Pi is the exception: it always keeps the key in its own auth file.

Pass `--no-keychain`, or run on a non-macOS host, to write the key directly into each agent's config file, or into the shell startup file, instead. If the Keychain write fails during setup, the command falls back to this mode automatically.

The command uses a single Keychain item, so connecting a different team replaces the stored key. Human-readable output masks the key as `vck_••••1234`.

##### Applying the changes

By default the command writes the files itself. On a Keychain setup, the confirmation prompt offers a third option: instead of writing, it generates a prompt describing the exact edits and copies it to your clipboard, so you can hand the work to a coding agent you already have open. Because the key lives in the Keychain, that prompt carries no secret.

Pass `--apply` to choose without prompting:

| Mode | Behavior |
| --- | --- |
| `--apply edit` | Write the files. This is the default |
| `--apply prompt` | Emit the agent prompt on stdout instead of writing. Requires the macOS Keychain, so the prompt never contains a plaintext key |

##### Re-running and key rotation

Re-running the command against an already-configured setup is a no-op: it asks whether to reconfigure interactively (default no), and otherwise exits `0`, reporting reason `already_configured` in non-interactive output. No new key is minted.

- Pass `--reconfigure` to run the full setup again, for example to rotate the key or switch teams.
- Run `setup --key <new-key>` on a Keychain setup to swap in a rotated or expired key. The command refreshes the Keychain entry in place without touching config files.
- When everything is already configured but sessions are still waiting to be copied, the run does the migration alone and leaves your key and config as they are.

##### Options

| Option | Type | Description |
| --- | --- | --- |
| `--agent <NAME>` | String | Coding agent to configure. Repeatable. See [supported coding agents](#supported-coding-agents) for values. In runs without prompts, also grants consent for that agent's warnings |
| `--all` | Boolean | Configure every [supported coding agent](#supported-coding-agents), whether or not it's detected on this machine |
| `--key <KEY>` | String | Use an existing AI Gateway API key instead of creating one. Skips key creation and the name, team, budget, and expiry prompts |
| `--name <NAME>` | String | Name for a newly created API key |
| `--budget <AMOUNT>` | Number | Spend limit for a new key, in US dollars (minimum 1) |
| `--refresh-period <PERIOD>` | String | Quota reset cadence for a new key: `daily`, `weekly`, `monthly`, or `none` |
| `--include-byok` | Boolean | Count bring-your-own-key (BYOK) usage toward the quota |
| `--expiration <PERIOD>` | String | Expiry for a new key: `7d`, `30d`, `60d`, `90d`, `1y`, or `none` (default `none`) |
| `--reconfigure` | Boolean | Run setup again even when everything is already configured, to rotate the key or switch teams |
| `--agent-config <AGENT=PATH>` | String | Override an agent's config file path, for example `claude-code=/path/settings.json`. Repeatable |
| `--shell-rc <PATH>` | String | Shell startup file that receives the managed export block |
| `--base-url <URL>` | String | Override the AI Gateway base URL written into agent configs, for example a preview deployment. Written verbatim |
| `--apply <MODE>` | String | How to apply the changes: `edit` (default) or `prompt` |
| `--dry-run` | Boolean | Show what would change without writing files or creating a key |
| `--no-backup` | Boolean | Do not write `.bak` backups of changed files |
| `--no-session-migration` | Boolean | Do not copy existing Claude Desktop or Codex Desktop sessions |
| `--no-keychain` | Boolean | Write the key into the agent config files and shell startup file instead of the macOS Keychain |
| `--yes`, `-y` | Boolean | Run without prompts |
| `--scope <SLUG>`, `--team <SLUG>` | String | Team that owns a newly created key. Global options, also available as `-S` and `-T` |

##### Defaults with `--yes`

The `--yes` option skips every prompt, which makes the command fully non-interactive. Combined with the defaults below, `vercel ai-gateway coding-agents setup --yes` is the shortest complete run:

| Prompt | Default |
| --- | --- |
| Agents | The agents detected on your machine. If none are detected, the command errors and asks you to pass `--agent` or `--all`. The command skips agents with warnings unless you name them |
| API key | Creates a new key unless you pass `--key` |
| Key name | Omitted, so the server assigns a name. Interactively, the prompt suggests `[<user>'s <device>] Coding Agents` |
| Team or scope | Uses `--scope` or `--team`, or your currently selected team. Without one, the command errors with `missing_scope`. Not needed with `--key` |
| Spend limit | Unlimited, unless you pass `--budget` |
| Refresh | One-time limit with no reset, unless you pass `--refresh-period` |
| Expiration | Never (`--expiration none`) |
| Key storage | Your macOS Keychain when available, otherwise the agent config files. Pass `--no-keychain` to always use config |
| Session migration | Eligible desktop sessions are copied. Pass `--no-session-migration` to skip |
| Apply mode | `edit`, so the files are written. Pass `--apply prompt` for the prompt instead |
| Backups | Enabled. The command writes `.bak` files unless you pass `--no-backup` |

##### Non-interactive output

Pass `--non-interactive` to emit a single JSON object instead of human-readable output. The CLI also switches to this mode on its own when it detects it's running inside a coding agent and stdin isn't a TTY. Agent selection follows the same detected-agents default as `--yes`.

The payload includes `status`, a `reason`, a `message`, the list of `configured` files (`changes` for a dry run), any `migrated` sessions, any `skipped` entries, per-agent `notes`, and a `warnings` array of `{agent, code, message}` objects. On a consent failure, a `next` array carries a ready-to-run replay command. The success payload contains the full API key, and `--apply prompt` returns the generated prompt in `prompt`, so treat the output as a secret.

| `reason` | Meaning |
| --- | --- |
| `coding_agents_configured` | Files were written |
| `already_configured` | Nothing to do; no key was created |
| `sessions_migrated` | Only desktop sessions were copied |
| `agent_prompt` | `--apply prompt` returned a prompt instead of writing |
| `dry_run` | Preview only |
| `requires_consent` | Every selected agent needs an explicit `--agent` |
| `session_migration_failed` | A session copy failed, so no configuration was changed |
| `unparseable_config` | No agent config could be written |
| `keychain_error` | The key couldn't be stored in the macOS Keychain |
| `missing_scope` | No team was selected for a new key |

If at least one agent config can be written, the run exits `0` and lists the rest under `skipped`. When nothing can be written, the command exits `1` and doesn't create a key.

##### Notes

- Open a new terminal after connecting so the shell exports load. Codex always reads `AI_GATEWAY_API_KEY` from your environment; in Keychain mode, every agent except Pi and Cline reads its key from the shell.
- Restart Claude Code so it picks up the new settings, and restart the OpenClaw gateway process so it loads the new provider.
- The command exits `0` on success or a no-op, `1` on an operational failure or invalid input, and `2` when it shows help (`--help`).

> **⚠️ Warning:** Your API key is sensitive. Human-readable output only shows it masked (for
> example `vck_••••1234`), but the JSON payload includes it in full, and the
> agent config files or shell startup file hold it whenever the macOS Keychain
> isn't used. Keep all of these secret.

### models

Browse the [models](/docs/ai-gateway/models-and-providers) available through AI Gateway and compare the providers that serve them. Both commands are read-only. Add `--format json` to either command for the full, machine-readable payload.

```bash filename="terminal"
vercel ai-gateway models [subcommand]
```

#### list

List the models available through AI Gateway. The table shows each model's ID, name, owner, and type. Alias: `ls`.

```bash filename="terminal"
vercel ai-gateway models ls
```

*List every model available through AI Gateway.*

##### Options

| Option | Type | Description |
| --- | --- | --- |
| `--format <FORMAT>` | String | Set to `json` to output the full model payload |

#### endpoints

List the provider endpoints that serve a model. The table shows each endpoint's context window, input and output pricing, time-to-first-token latency, and uptime. Run `vercel ai-gateway models ls` to find model IDs.

```bash filename="terminal"
vercel ai-gateway models endpoints <model-id>
```

```bash filename="terminal"
vercel ai-gateway models endpoints anthropic/claude-opus-5
```

*Compare the providers that serve a model, with pricing, latency, and uptime.*

##### Options

| Option | Type | Description |
| --- | --- | --- |
| `--format <FORMAT>` | String | Set to `json` to output the full endpoints payload, including throughput and tags |

### leaderboard

Explore the [AI Gateway leaderboards](/docs/ai-gateway/leaderboards), the open, anonymized usage data published under CC BY 4.0. Alias: `leaderboards`. Every subcommand is read-only.

```bash filename="terminal"
vercel ai-gateway leaderboard [subcommand]
```

| Subcommand | Description |
| --- | --- |
| `models` | The most-used models |
| `labs` | The most-used model creators |
| `apps` | The top apps built on AI Gateway |
| `providers` | The top inference providers |

```bash filename="terminal"
vercel ai-gateway leaderboard models --modality text
```

*Show the most-used text models.*

```bash filename="terminal"
vercel ai-gateway leaderboard labs --metric spend
```

*Rank model creators by spend instead of request count.*

```bash filename="terminal"
vercel ai-gateway leaderboard models --format csv --out models.csv
```

*Export the full model leaderboard as CSV.*

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `--modality <MODALITY>` | String | Filter by modality: `all`, `text`, `image`, or `video` (default `all`). Applies to `models` and `labs` |
| `--metric <METRIC>` | String | Metric for the table view: `requests`, `tokens`, `spend`, `imageCount`, or `videoCount` (default `requests`). Applies to `models` and `labs` |
| `--date <YYYY-MM-DD>` | String | Day to show in the table view (default: most recent). Applies to `models` and `labs` |
| `--format <FORMAT>`, `-F` | String | Output format: `table`, `json`, or `csv` (default: `table` in a terminal, `json` otherwise) |
| `--out <FILE>`, `-o` | String | Write the payload to a file instead of stdout. Defaults to JSON; use `--format csv` for CSV |

## Examples

### Create an API key with a monthly budget

```bash filename="terminal"
vercel ai-gateway api-keys create --name my-key --budget 500 --refresh-period monthly --alert-thresholds 75,100
```

*Create an API key named \`my-key\` with a $500 monthly quota that alerts at 75%
and 100% of the limit.*

### Give every new project a spend limit

```bash filename="terminal"
vercel ai-gateway budgets defaults set project --limit 200 --refresh-period monthly
```

*Apply a $200 monthly budget to any project that has no budget of its own.*

### Connect detected coding agents

```bash filename="terminal"
vercel ai-gateway coding-agents setup --yes
```

*Connect the detected agents with a new, unlimited, non-expiring key.*

### Connect specific agents with a budgeted key

```bash filename="terminal"
vercel ai-gateway coding-agents setup \
  --agent claude-code --agent codex \
  --name "My Coding Key" \
  --scope my-team \
  --budget 500 --refresh-period monthly \
  --expiration 30d \
  --yes
```

*Connect Claude Code and Codex with a $500 monthly key that expires in 30
days.*

### Connect every supported agent

```bash filename="terminal"
vercel ai-gateway coding-agents setup --all --yes
```

*Configure every supported agent, including the ones not installed on this
machine yet.*

### Hand the edits to a coding agent instead of writing them

```bash filename="terminal"
vercel ai-gateway coding-agents setup --apply prompt --yes
```

*Create the key, store it in the macOS Keychain, and emit a prompt that
describes the edits.*

### Reuse an existing key and preview changes

```bash filename="terminal"
vercel ai-gateway coding-agents setup --key vck_... --dry-run
```

*Reuse an existing key and preview the changes without writing any files.*

### Reconfigure an already-connected machine

```bash filename="terminal"
vercel ai-gateway coding-agents setup --reconfigure --yes
```

*Run setup again on an already-configured machine, for example to rotate the
key or switch teams.*

### Point an agent at a different gateway base URL

```bash filename="terminal"
vercel ai-gateway coding-agents setup --agent codex --base-url https://preview.ai-gateway.vercel.sh/coding-agent/v1
```

*Write a preview deployment's URL instead of the default surface.*

## Related

- [AI Gateway overview](/docs/ai-gateway)
- [Coding agents](/docs/ai-gateway/coding-agents)
- [AI Gateway models and providers](/docs/ai-gateway/models-and-providers)
- [AI Gateway routing rules](/docs/ai-gateway/models-and-providers/routing-rules)
- [AI Gateway authentication](/docs/ai-gateway/authentication-and-byok)
- [AI Gateway API keys](/docs/ai-gateway/authentication-and-byok/api-keys)


---

[View full sitemap](/docs/sitemap)
