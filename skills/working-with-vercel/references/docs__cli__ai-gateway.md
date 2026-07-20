---
title: vercel ai-gateway
product: vercel
url: /docs/cli/ai-gateway
canonical_url: "https://vercel.com/docs/cli/ai-gateway"
last_updated: 2026-06-26
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/ai-gateway
  - /docs/ai-gateway/models-and-providers/routing-rules
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway/authentication-and-byok/authentication
summary: "Manage AI Gateway resources from the Vercel CLI: API keys and routing rules."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/ai-gateway.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "af0f2cc0718c581145dac4a8d56ab69a3675827ca057c7e399446738b3847b9d"
---

# vercel ai-gateway

The `vercel ai-gateway` command manages [AI Gateway](/docs/ai-gateway) resources from the Vercel CLI, including API keys, [routing rules](/docs/ai-gateway/models-and-providers/routing-rules), and [models](/docs/ai-gateway/models-and-providers).

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
vercel ai-gateway models endpoints anthropic/claude-opus-4.8
```

*Compare the providers that serve a model, with pricing, latency, and uptime.*

##### Options

| Option | Type | Description |
| --- | --- | --- |
| `--format <FORMAT>` | String | Set to `json` to output the full endpoints payload, including throughput and tags |

### coding-agents

Connect local coding agents to [AI Gateway](/docs/ai-gateway).

```bash filename="terminal"
vercel ai-gateway coding-agents [subcommand]
```

#### setup

Configure [supported coding agents](#supported-coding-agents) to route requests through AI Gateway. The command provisions or reuses an AI Gateway API key and writes each agent's config file so requests use the gateway with your key. It does not pin a model, so you keep choosing your own.

```bash filename="terminal"
vercel ai-gateway coding-agents setup --yes
```

*Connect the coding agents detected on this machine without any prompts.*

Run the command without flags to step through each prompt in order:

1. **Agents** to configure. The agents detected on your machine (their config directory exists) are pre-selected.
2. **Consent** for any agent with a pre-flight warning, described in the next section. Declining skips that agent and continues with the others.
3. **API key name** for a new key. The prompt suggests `[<user>'s <device>] Coding Agents`.
4. **Team** that owns the key.
5. **Spend limit** (quota) for the key.
6. **Expiration** for the key.
7. **Keychain storage** on macOS: whether to store the key in your Keychain (default yes).

When a selected agent isn't found at its default location, the command also offers to set a custom config path. It then prints a summary and the planned changes as a per-file diff with the key masked, and asks you to confirm. Declining writes nothing and never creates a key.

##### Supported coding agents

| Agent | `--agent` value |
| --- | --- |
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | `claude-code` |
| [Codex](https://github.com/openai/codex) | `codex` |
| [OpenCode](https://opencode.ai) | `opencode` |
| [Pi](https://github.com/earendil-works/pi) | `pi` |

##### Warnings and consent

Connecting can break an agent's existing setup. Before asking any key questions, the command checks each selected agent and asks for explicit consent when it finds a conflict:

| Warning | Agent | When it fires | What it means |
| --- | --- | --- | --- |
| `desktop_app_breaks` | Codex | The Codex desktop app is installed (macOS) | The desktop app shares `~/.codex/config.toml` with the Codex CLI but can't use custom model providers, so it stops working. The CLI keeps working. To undo, remove the `model_provider` line from `config.toml` |

Detection only checks whether the app is installed. The command never reads your data.

Interactively, each warned agent gets its own confirmation, defaulting to no. Declining leaves that agent's files untouched, and the run continues with the other agents.

With `--yes` or in non-interactive mode, naming an agent with `--agent` (or passing `--all`) counts as consent: the run proceeds and prints the warnings. The command skips a warned agent that was only selected by detection, with reason `requires_consent` and a hint to pass `--agent <id>`. If that skips every agent, the command exits `1` with reason `requires_consent` and a ready-to-run command that replays the invocation with the consent flags added. `--dry-run` never asks for consent; it prints the warnings and shows what a real run would do.

##### What it configures

The command writes only the gateway's compatibility URL and authentication to each agent, never a default model:

| Agent | Files | What's written |
| --- | --- | --- |
| Claude Code | `~/.claude/settings.json` (honors `$CLAUDE_CONFIG_DIR`); shell startup file in Keychain mode | `env.ANTHROPIC_BASE_URL=https://ai-gateway.vercel.sh` and `env.ANTHROPIC_API_KEY=""`; the key as `env.ANTHROPIC_AUTH_TOKEN` or a Keychain-resolved shell export |
| Codex | `~/.codex/config.toml` (honors `$CODEX_HOME`) plus shell startup file | `model_provider=vercel` and a `vercel` provider (`base_url=https://ai-gateway.vercel.sh/v1`, `wire_api=responses`, `env_key=AI_GATEWAY_API_KEY`); the shell file exports `AI_GATEWAY_API_KEY` |
| OpenCode | `~/.config/opencode/opencode.json` (honors `$XDG_CONFIG_HOME`); shell startup file in Keychain mode | A `vercel` provider entry; the key as `provider.vercel.options.apiKey` or the `AI_GATEWAY_API_KEY` shell export |
| Pi | `~/.pi/agent/auth.json` (mode `0600`, honors `$PI_CODING_AGENT_DIR`) | A `vercel-ai-gateway` API-key entry. Pi always stores the key in this file, even in Keychain mode |

The command edits existing files in place, preserving their formatting, and saves a `.bak` copy first. Disable backups with `--no-backup`. If it can't parse a file, it skips that file instead of overwriting it.

Shell exports live in a marked, removable block in your shell's startup file: `~/.zshrc` for zsh (honors `$ZDOTDIR`), `~/.bash_profile` on macOS or `~/.bashrc` elsewhere for bash, `config.fish` for fish, or `~/.profile` otherwise. Pass `--shell-rc <path>` to target a different file, or `--agent-config <agent>=<path>` to override an agent's config location. On Windows there's no shell startup file to manage: the command tells you which environment variable to set, and prints a newly created key once so you don't lose it.

##### Key storage

On macOS, the command stores the API key in your login Keychain by default instead of writing it into plaintext config. It saves the key as a generic password with the service name "Vercel AI Gateway", and agents read it through shell exports that call `security find-generic-password` when a terminal starts. Pi is the exception: it always keeps the key in its own auth file.

Pass `--no-keychain`, or run on a non-macOS host, to write the key directly into each agent's config file, or into the shell startup file for Codex, instead. If the Keychain write fails during setup, the command falls back to this mode automatically.

The command uses a single Keychain item, so connecting a different team replaces the stored key. Human-readable output masks the key as `vck_••••1234`.

##### Re-running and key rotation

Re-running the command against an already-configured setup is a no-op: it asks whether to reconfigure interactively (default no), and otherwise exits `0`, reporting reason `already_configured` in non-interactive output. No new key is minted.

- Pass `--reconfigure` to run the full setup again, for example to rotate the key or switch teams.
- Run `setup --key <new-key>` on a Keychain setup to swap in a rotated or expired key. The command refreshes the Keychain entry in place without touching config files.

##### Options

| Option | Type | Description |
| --- | --- | --- |
| `--agent <NAME>` | String | Coding agent to configure. Repeatable. See [supported coding agents](#supported-coding-agents) for values. In runs without prompts, also grants consent for that agent's warnings |
| `--all` | Boolean | Configure every supported coding agent |
| `--key <KEY>` | String | Use an existing AI Gateway API key instead of creating one. Skips key creation and the name, team, budget, and expiry prompts |
| `--name <NAME>` | String | Name for a newly created API key |
| `--budget <AMOUNT>` | Number | Spend limit for a new key, in US dollars (minimum 1) |
| `--refresh-period <PERIOD>` | String | Quota reset cadence for a new key: `daily`, `weekly`, `monthly`, or `none` |
| `--include-byok` | Boolean | Count bring-your-own-key (BYOK) usage toward the quota |
| `--expiration <PERIOD>` | String | Expiry for a new key: `7d`, `30d`, `60d`, `90d`, `1y`, or `none` (default `none`) |
| `--reconfigure` | Boolean | Run setup again even when everything is already configured, to rotate the key or switch teams |
| `--agent-config <AGENT=PATH>` | String | Override an agent's config file path, for example `claude-code=/path/settings.json`. Repeatable |
| `--shell-rc <PATH>` | String | Shell startup file that receives the managed export block |
| `--dry-run` | Boolean | Show what would change without writing files or creating a key |
| `--no-backup` | Boolean | Do not write `.bak` backups of changed files |
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
| Backups | Enabled. The command writes `.bak` files unless you pass `--no-backup` |

##### Non-interactive output

Pass `--non-interactive` to emit a single JSON object instead of human-readable output. The CLI also switches to this mode on its own when it detects it's running inside a coding agent and stdin isn't a TTY. Agent selection follows the same detected-agents default as `--yes`.

The payload includes `status`, a `reason` (for example `coding_agents_configured`, `already_configured`, `dry_run`, `requires_consent`, or `missing_scope`), a `message`, the list of `configured` files (`changes` for a dry run), any `skipped` entries, and a `warnings` array of `{agent, code, message}` objects. On a consent failure, a `next` array carries a ready-to-run replay command. The success payload contains the full API key, so treat the output as a secret.

If at least one agent config can be written, the run exits `0` and lists the rest under `skipped`. When nothing can be written, the command exits `1` with reason `unparseable_config` and doesn't create a key.

##### Notes

- The command never pins a model. Choose a model inside each agent, for example Codex `--model` or OpenCode `/model` then `vercel/<creator>/<model>`.
- Open a new terminal after connecting so the shell exports load. Codex always reads `AI_GATEWAY_API_KEY` from your environment; in Keychain mode, every agent except Pi reads its key from the shell.
- Restart Claude Code so it picks up the new settings.
- The command exits `0` on success or a no-op, `1` on an operational failure or invalid input, and `2` when it shows help (`--help`).

> **⚠️ Warning:** Your API key is sensitive. Human-readable output only shows it masked (for
> example `vck_••••1234`), but the JSON payload includes it in full, and the
> agent config files or shell startup file hold it whenever the macOS Keychain
> isn't used. Keep all of these secret.

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

## Related

- [AI Gateway overview](/docs/ai-gateway)
- [AI Gateway models and providers](/docs/ai-gateway/models-and-providers)
- [AI Gateway routing rules](/docs/ai-gateway/models-and-providers/routing-rules)
- [AI Gateway authentication](/docs/ai-gateway/authentication-and-byok/authentication)


---

[View full sitemap](/docs/sitemap)
