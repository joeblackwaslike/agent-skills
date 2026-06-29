---
title: vercel flags
product: vercel
url: /docs/cli/flags
canonical_url: "https://vercel.com/docs/cli/flags"
last_updated: 2026-06-05
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/flags/vercel-flags
  - /docs/flags/vercel-flags/dashboard
  - /docs/flags/vercel-flags/dashboard/segments
summary: Learn how to manage feature flags for your Vercel project using the vercel flags CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/flags.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "b8638652296f386116e83d5cd987f2d42d40115ffd2f0562bced6088e813beab"
---

# vercel flags

The `vercel flags` command manages [Vercel Flags](/docs/flags/vercel-flags) for a project directly from the command line. You can create, list, inspect, open, update, set, split traffic, roll out, enable, disable, archive, and delete feature flags, as well as manage reusable segments and SDK keys.

## Usage

```bash filename="terminal"
vercel flags list
```

*Using the \`vercel flags\` command to list all active
feature flags.*

```bash filename="terminal"
vercel flags create [slug]
```

*Using the \`vercel flags create\` command to create a new feature flag.*

```bash filename="terminal"
vercel flags inspect [flag]
```

*Using the \`vercel flags\` command to display information
about a feature flag.*

```bash filename="terminal"
vercel flags open [flag]
```

*Opening the project feature flags dashboard, or a specific feature flag, in
the Vercel dashboard.*

```bash filename="terminal"
vercel flags update [flag]
```

*Using the \`vercel flags\` command to update a flag's variants.*

```bash filename="terminal"
vercel flags set [flag]
```

*Using the \`vercel flags\` command to set the served variant in an
environment.*

```bash filename="terminal"
vercel flags split [flag]
```

*Using the \`vercel flags\` command to configure a weighted split in an
environment.*

```bash filename="terminal"
vercel flags rollout [flag]
```

*Using the \`vercel flags\` command to configure a progressive rollout in an
environment.*

```bash filename="terminal"
vercel flags enable [flag]
```

*Using the \`vercel flags\` command to enable a boolean feature flag in an
environment.*

```bash filename="terminal"
vercel flags disable [flag]
```

*Using the \`vercel flags\` command to disable a boolean feature flag in an
environment.*

```bash filename="terminal"
vercel flags archive [flag]
```

*Using the \`vercel flags\` command to archive a feature flag.*

```bash filename="terminal"
vercel flags rm [flag]
```

*Using the \`vercel flags\` command to delete a feature flag.*

```bash filename="terminal"
vercel flags segments ls
```

*Using the \`vercel flags segments\` command to list reusable targeting segments.*

## Extended usage

### Adding flags

Boolean flags are created by default. The `vercel flags create` command creates
a new feature flag.

```bash filename="terminal"
vercel flags create welcome-message --kind string --description "Homepage welcome copy" \
  --variant control="Welcome back" --variant treatment="Start for free"
```

*Creating a string feature flag with explicit variants.*

For string, number, and JSON flags, repeat `--variant VALUE[=LABEL]` to define the exact variants you want to create. If you omit `--variant` in a terminal, the CLI prompts you to add variants interactively. In non-interactive environments, you must pass `--variant`.

For JSON flags, use repeated `--variant '<JSON>'` or `--variant '<JSON>'=Label` values:

```bash filename="terminal"
vercel flags create layout-config --kind json \
  --variant '{"theme":"light","sidebar":false}'=Light \
  --variant '{"theme":"dark","sidebar":true}'=Dark
```

*Creating a JSON feature flag with labeled object variants.*

JSON variants accept any valid JSON value, including objects, arrays, booleans, numbers, strings, and `null`.

```bash filename="terminal"
vercel flags create search-config --kind json \
  --variant '{"mode":"fast","limit":10}' \
  --variant '{"mode":"accurate","limit":50}'
```

*Creating JSON variants without labels. The CLI assigns \`Variant 1\` and
\`Variant 2\`.*

Boolean flags always use the built-in `false` and `true` variants, labelled `Off` and `On`.

New boolean flags serve `true` in development and `false` in preview and production. The create output shows the initial environment behavior for the flag you just created.

### Opening flags

Use `vercel flags open` to jump straight to the Vercel dashboard.

```bash filename="terminal"
vercel flags open welcome-message
```

*Opening a specific feature flag in the Vercel dashboard.*

### Updating variants

Use `vercel flags update` to change an existing variant's value, label, or both. If you omit one of the update flags, the CLI can guide you interactively.

```bash filename="terminal"
vercel flags update welcome-message --variant control --value welcome-back \
  --label "Welcome back" --message "Refresh control copy"
```

*Updating a variant and recording a revision message.*

`--variant` matches a variant ID or current value. Run `vercel flags inspect` if you want to confirm the available variants before updating them.

For JSON flags, `--variant` can be the variant ID or the current JSON value, and `--value` must be valid JSON:

```bash filename="terminal"
vercel flags update layout-config \
  --variant '{"theme":"light","sidebar":false}' \
  --value '{"theme":"light","sidebar":true}' \
  --label "Light+"
```

*Updating a JSON variant by matching its current value.*

JSON variant selection matches the parsed JSON value, not the label. Run `vercel flags inspect` if you want to copy the current variant ID or value before updating it.

For boolean flags, `vercel flags update` can rename the `true` or `false` variant labels, but it cannot change the boolean values themselves.

### Setting a served variant

Use `vercel flags set` to choose which variant a specific environment serves.

```bash filename="terminal"
vercel flags set welcome-message --environment preview --variant control \
  --message "Serve the control copy in preview"
```

*Setting the variant served in preview for a string flag.*

### Configuring a weighted split

Use `vercel flags split` to bucket traffic across variants in one environment. The command configures the environment's fallthrough outcome, which applies when no targeting rule matches.

```bash filename="terminal"
vercel flags split ai-summary-model --environment production --by user.id \
  --default-variant stable --weight stable=95 --weight candidate=5 \
  --message "Route summary traffic to the candidate model"
```

*Routing 5% of production summary requests to a candidate AI model using
\`user.id\` for bucketing.*

The `--by` option selects the entity attribute used for stable bucketing. Define the entity and attribute in the dashboard before running the command. For example, create a `User` entity with an `id` attribute, then pass `--by user.id`.

Pass one `--weight` value for every variant. Weights are ratios that Vercel Flags normalizes into percentages, so `stable=1` and `candidate=1` produce the same allocation as `stable=50` and `candidate=50`. Use `0` for variants that should receive no traffic. At least one variant must have a weight greater than `0`.

If you omit split options in an interactive terminal, the CLI prompts for the environment, bucketing attribute, weights, fallback variant, and revision message. In non-interactive environments, pass the required options explicitly.

For boolean flags, `vercel flags split` uses the `false` variant as the default fallback. For String, Number, and JSON flags, pass `--default-variant`. The default variant is served when the entity attribute used for bucketing is unavailable.

```bash filename="terminal"
vercel flags split ai-chat-model -e preview --by user.id \
  --default-variant stable --weight stable=50 --weight candidate=50 \
  --weight legacy=0
```

*Excluding the \`legacy\` model variant from a preview split by setting its
weight to \`0\`.*

If you rerun `vercel flags split` for an environment that already has a weighted split, you can update only the weights, the fallback variant, or the revision message. If you omit `--by`, `--weight`, or `--default-variant`, the CLI keeps the current split values.

### Configuring a progressive rollout

Use `vercel flags rollout` to move traffic from one variant to another over time.

```bash filename="terminal"
vercel flags rollout redesigned-checkout --environment production --by user.id \
  --stage 5,6h --stage 10,6h --stage 25,12h --stage 50,1d \
  --message "Start redesigned checkout rollout"
```

*Configuring a Boolean rollout in production using \`user.id\` for bucketing.*

Each `--stage` defines the percentage of traffic sent to the rollout variant and how long that stage lasts. After the last stage finishes, the environment serves 100% of the target variant indefinitely.

```bash filename="terminal"
vercel flags rollout welcome-message --environment production --by user.id \
  --from-variant control --to-variant treatment --default-variant control \
  --stage 10,2h --stage 50,12h --start 2026-04-16T09:00:00Z
```

*Scheduling a progressive rollout for a non-Boolean flag.*

For Boolean flags, `vercel flags rollout` defaults to rolling from `false` to `true` and using the `false` variant as the fallback. For String, Number, and JSON flags, pass `--from-variant`, `--to-variant`, and optionally `--default-variant`. These options accept either a variant ID or a variant value, and using the ID is often easier for JSON variants.

If you rerun `vercel flags rollout` for an environment that already has a rollout, you can update only the stages and keep the current bucketing attribute, start time, and variants.

### Enabling and disabling flags

The `enable` and `disable` commands are shortcuts for boolean flags. They control whether an environment serves the `true` variant or the `false` variant. If you do not provide the `--environment` option, the CLI prompts you to select one interactively.

```bash filename="terminal"
vercel flags enable my-feature --environment production --message "Resume rollout"
```

*Enabling a boolean flag in production and recording why the change was made.*

```bash filename="terminal"
vercel flags disable my-feature -e production --variant false \
  --message "Pause rollout in production"
```

*Disabling a boolean flag and serving the \`false\` variant in production.*

> **💡 Note:** The `enable` and `disable` commands only work with boolean flags. For string
> or number flags, use `vercel flags set` to change the served variant in an
> environment and `vercel flags update` to change variant values or labels.

### Archiving and removing flags

A flag must be archived before it can be deleted. Archived flags stop evaluating and can be restored from the [dashboard](/docs/flags/vercel-flags/dashboard).

```bash filename="terminal"
vercel flags archive my-feature --yes
```

*Archiving a flag without a confirmation prompt.*

```bash filename="terminal"
vercel flags rm my-feature --yes
```

*Deleting an archived flag without a confirmation prompt.*

### Segments

The `vercel flags segments` subcommand manages reusable [segments](/docs/flags/vercel-flags/dashboard/segments) for the linked project. A segment can include exact entity values, exclude exact entity values, and define rules based on entity attributes.

```bash filename="terminal"
vercel flags segments ls
```

*Listing all feature flag segments for the linked project.*

```bash filename="terminal"
vercel flags segments inspect beta-users --json
```

*Inspecting a segment and printing its full data as JSON.*

Create a segment with exact included values by repeating `--add`:

```bash filename="terminal"
vercel flags segments create beta-users --label "Beta users" \
  --add include:user.id=user_123 --add include:user.id=user_456
```

*Creating a segment that includes two users by \`user.id\`.*

Create a segment from rules by using the `rule:` target:

```bash filename="terminal"
vercel flags segments create enterprise-users --label "Enterprise users" \
  --add rule:user.plan:eq:enterprise
```

*Creating a segment for users whose plan equals \`enterprise\`.*

Update a segment by adding or removing criteria:

```bash filename="terminal"
vercel flags segments update beta-users --add include:user.id=user_789 \
  --remove include:user.id=user_123
```

*Adding one user and removing another user from a segment.*

```bash filename="terminal"
vercel flags segments update enterprise-users \
  --add rule:user.email:ends-with:@company.com \
  --remove rule:user.plan:eq:pro
```

*Adding and removing segment rules in one update.*

Delete a segment with `rm`:

```bash filename="terminal"
vercel flags segments rm beta-users --yes
```

*Deleting a segment without a confirmation prompt.*

Segments can't be deleted while they are referenced by flags or other segments. Remove every reference first, then run `vercel flags segments rm`.

Segment criteria use these forms:

| Form | Description | Example |
| - | - | - |
| `include:ENTITY.ATTRIBUTE=VALUE` | Adds an exact entity value to the segment. | `include:user.id=user_123` |
| `exclude:ENTITY.ATTRIBUTE=VALUE` | Excludes an exact entity value from the segment. | `exclude:user.email=blocked@example.com` |
| `rule:ENTITY.ATTRIBUTE:OPERATOR:VALUE` | Adds or removes a rule based on an entity attribute. | `rule:user.plan:eq:enterprise` |
| `rule:RULE_ID` | Removes a rule by ID when using `--remove`. | `rule:rule_abc123` |

Valid rule operators are `eq`, `!eq`, `oneOf`, `!oneOf`, `containsAllOf`, `containsAnyOf`, `containsNoneOf`, `startsWith`, `endsWith`, `contains`, `!contains`, `ex`, `!ex`, `gt`, `gte`, `lt`, and `lte`. The CLI also accepts readable aliases such as `equals`, `does-not-equal`, `starts-with`, and `ends-with`.

For list operators such as `oneOf`, pass comma-separated values:

```bash filename="terminal"
vercel flags segments create paid-users --label "Paid users" \
  --add rule:user.plan:oneOf:pro,enterprise
```

*Creating a segment with a list rule.*

Use `--data` when you want to provide the full segment data JSON. The JSON object can include `rules`, `include`, and `exclude` fields:

```bash filename="terminal"
vercel flags segments create staff --label Staff \
  --data '{"rules":[],"include":{"user":{"email":[{"value":"me@company.com"}]}},"exclude":{}}'
```

*Creating a segment from full JSON data.*

### SDK keys

The `vercel flags sdk-keys` subcommand manages SDK keys for your project. SDK keys authenticate your application when evaluating flags. You can create keys for different environments and key types.

```bash filename="terminal"
vercel flags sdk-keys ls
```

*Using the \`vercel flags sdk-keys ls\` command to list
all SDK keys.*

```bash filename="terminal"
vercel flags sdk-keys add --type server --environment production
```

*Creating a server SDK key for the production environment.*

```bash filename="terminal"
vercel flags sdk-keys rm [hash-key]
```

*Using the \`vercel flags sdk-keys rm\` command to delete
an SDK key.*

When you create an SDK key, the output includes:

- **Hash key**: A truncated identifier shown in the key list
- **SDK key**: The full key value, shown only at creation time
- **Connection string**: A `flags:` URI containing all configuration needed to connect to Vercel Flags

> **⚠️ Warning:** Copy the SDK key from the create output immediately and store it somewhere safe. Vercel returns the full value only once, at creation time. `vercel flags sdk-keys ls` returns a masked preview (for example, `vf_server_abc********`). If you lose the value, delete the key with `vercel flags sdk-keys rm` and create a new one.

If you don't provide the `--environment` option, you'll be prompted to select one interactively.

`vercel flags list --json`, `vercel flags segments ls --json`, and `vercel flags sdk-keys ls --json` output the respective list as JSON for scripting and automation.

### Encrypting flag overrides

The `vercel flags override` subcommand encrypts flag override values into a secure token. Set the token in the `vercel-flag-overrides` cookie to override flag evaluation for a session without changing the flag's configuration.

```bash filename="terminal"
vercel flags override [flag=value ...]
```

*Using the \`vercel flags override\` command to encrypt flag overrides.*

`override` requires the `FLAGS_SECRET` environment variable on every invocation (both encryption and `--decrypt`). The CLI reads `FLAGS_SECRET` from your process environment or from a `.env.local` or `.env` file in the current directory. The value must be a 256-bit base64url-encoded key (32 bytes); this is the same secret your application uses to verify the cookie. If `FLAGS_SECRET` is missing, the command exits with `FLAGS_SECRET not found. Set it in the environment, .env.local, or .env file.` Run `vercel env pull` to populate `.env.local` from the linked project, or create a matching secret locally.

Pass one or more `flag=value` arguments to encrypt. The default token expiration is one year; use `--expiration` to set a different value (for example, `30d`).

```bash filename="terminal"
# Encrypt a single flag override
vercel flags override my-flag=true

# Encrypt multiple flag overrides
vercel flags override flag-a=true flag-b=hello

# Set a custom expiration
vercel flags override my-flag=42 --expiration 30d
```

To inspect an existing token, pass `--decrypt`:

```bash filename="terminal"
vercel flags override --decrypt <token>
```

*Decrypting an override token to inspect its JSON payload.*

### Preparing flag definitions for the build

The `vercel flags prepare` subcommand writes a synthetic `@vercel/flags-definitions` package into `node_modules` so that fallback flag definitions are available to your app at runtime without a live flag-service round-trip. It delegates to [`@vercel/prepare-flags-definitions`](https://www.npmjs.com/package/@vercel/prepare-flags-definitions) and uses your environment (process, `.env.local`, `.env`) to fetch definitions. If no usable credential is found, the command exits without writing anything.

Most users won't invoke `prepare` directly; the build pipeline runs it automatically when one of the following is true:

- An environment variable contains a raw SDK key matching `vf_server_*` or `vf_client_*`.
- The `@flags-sdk/vercel` or `@vercel/flags-core` package is installed in the project.
- `VERCEL_FLAGS_EMBED_DEFINITIONS=force-on` is set (use `force-off` to force-skip, or `VERCEL_FLAGS_DISABLE_DEFINITION_EMBEDDING=1` to legacy opt-out).

A `flags:` connection string alone does not trigger the automatic gate, but it is recognized by the preparer once invoked. Run `vercel flags prepare` directly when you want the build artifact from a connection-string-only setup.

```bash filename="terminal"
vercel flags prepare
```

*Using the \`vercel flags prepare\` command to write the synthetic
\`@vercel/flags-definitions\` package into \`node\_modules\`.*

## Unique options

These are options that only apply to the `vercel flags` command.

### State

The `--state` option, shorthand `-s`, filters the list of flags by state when using `vercel flags list`. Valid values are `active` and `archived`. Defaults to `active`.

```bash filename="terminal"
vercel flags ls --state archived
```

*Using the \`vercel flags ls\` command with the
\`--state\` option to list archived flags.*

### JSON

The `--json` option prints machine-readable output for commands that support JSON output, including `vercel flags list`, `vercel flags segments ls`, `vercel flags segments inspect`, `vercel flags segments create`, `vercel flags segments update`, and `vercel flags sdk-keys ls`.

```bash filename="terminal"
vercel flags segments inspect beta-users --json
```

*Using the \`vercel flags segments inspect\` command with the \`--json\` option.*

### Kind

The `--kind` option, shorthand `-k`, specifies the type of a new flag when using `vercel flags create`. Valid values are `boolean`, `string`, `number`, and `json`. Defaults to `boolean`.

```bash filename="terminal"
vercel flags create layout-config --kind json \
  --variant '{"theme":"light"}'=Light \
  --variant '{"theme":"dark","sidebar":true}'=Dark
```

*Using the \`vercel flags create\` command with the
\`--kind\` option to create a JSON flag.*

### Description

The `--description` option, shorthand `-d`, sets a description for a new flag when using `vercel flags create`, or a segment description when using `vercel flags segments create` or `vercel flags segments update`.

```bash filename="terminal"
vercel flags create my-feature --description "Controls the new onboarding flow"
```

*Using the \`vercel flags create\` command with the
\`--description\` option.*

### Hint

The `--hint` option sets help text that describes who belongs in a segment when using `vercel flags segments create` or `vercel flags segments update`. If you omit `--hint` while creating a segment, the CLI uses the segment description or label.

```bash filename="terminal"
vercel flags segments create beta-users --label "Beta users" \
  --hint "Users enrolled in the beta program"
```

*Creating a segment with a hint.*

### Data

The `--data` option provides full segment data JSON when using `vercel flags segments create`, or replaces segment data when using `vercel flags segments update`. The JSON object can include `rules`, `include`, and `exclude` fields.

```bash filename="terminal"
vercel flags segments update staff \
  --data '{"rules":[],"include":{"user":{"email":[{"value":"me@company.com"}]}},"exclude":{}}'
```

*Replacing a segment's data with JSON.*

When updating a segment, if you combine `--data` with `--add` or `--remove`, the CLI applies the add and remove operations to the provided JSON before saving the segment.

### Add and remove

The `--add` option, shorthand `-a`, adds segment criteria when using `vercel flags segments create` or `vercel flags segments update`. The `--remove` option removes segment criteria when using `vercel flags segments update`.

```bash filename="terminal"
vercel flags segments update beta-users --add include:user.id=user_789 \
  --remove include:user.id=user_123
```

*Using \`--add\` and \`--remove\` to update exact segment values.*

For rules, use `rule:ENTITY.ATTRIBUTE:OPERATOR:VALUE`. To remove a rule by ID, use `--remove rule:RULE_ID`.

### Environment

The `--environment` option, shorthand `-e`, specifies the target environment for `vercel flags set`, `vercel flags split`, `vercel flags rollout`, `vercel flags enable`, `vercel flags disable`, and `vercel flags sdk-keys add`. Valid values are `production`, `preview`, and `development`.

```bash filename="terminal"
vercel flags set welcome-message --environment production --variant control
```

*Using the \`vercel flags set\` command with the
\`--environment\` option.*

### Variant

The `--variant` option, shorthand `-v`, defines variants on `vercel flags create`, and selects a variant by ID or value on `vercel flags update`, `vercel flags set`, and `vercel flags disable`.

For JSON flags, create variants with `--variant '<JSON>'` or `--variant '<JSON>'=Label`. When you update a JSON flag, the selector can be a variant ID or the current JSON value, but not the label.

```bash filename="terminal"
vercel flags create welcome-message --kind string \
  --variant control="Welcome back" --variant treatment="Start for free"
```

*Using repeated \`--variant\` options to create a string flag with explicit
variants.*

### By

The `--by` option selects the entity attribute used for consistent bucketing when using `vercel flags split` or `vercel flags rollout`. Use the format `<entity.attribute>`, such as `user.id`.

```bash filename="terminal"
vercel flags rollout redesigned-checkout --environment production --by user.id \
  --stage 5,6h --stage 25,12h
```

*Using \`--by\` to bucket the rollout by \`user.id\`.*

### Weight

The `--weight` option, shorthand `-w`, adds a variant weight when using `vercel flags split`. Use the format `VARIANT=WEIGHT`, and repeat the option for every variant. `VARIANT` can be a variant ID or value. Vercel Flags normalizes weights into percentages, and a weight of `0` excludes a variant from receiving traffic.

```bash filename="terminal"
vercel flags split ai-summary-model --environment production --by user.id \
  --default-variant stable --weight stable=95 --weight candidate=5
```

*Using repeated \`--weight\` options to route 5% of traffic to a candidate
model.*

### From variant, to variant, and default variant

The `--from-variant`, `--to-variant`, and `--default-variant` options control which variants a rollout uses. `--from-variant` is the current variant, `--to-variant` is the rollout target, and `--default-variant` is served when the bucketing attribute is missing.

The `--default-variant` option also applies to `vercel flags split`. Boolean splits default to the `false` variant. For String, Number, and JSON splits, pass `--default-variant` to choose the fallback variant served when the split's bucketing attribute is missing. The split default variant accepts either a variant ID or a variant value.

For Boolean flags, these values default to `false`, `true`, and `false`. For String, Number, and JSON flags, pass them explicitly. Each option accepts either a variant ID or a variant value.

```bash filename="terminal"
vercel flags rollout welcome-message --environment production --by user.id \
  --from-variant control --to-variant treatment --default-variant control \
  --stage 10,2h --stage 50,12h
```

*Selecting explicit rollout variants for a String flag.*

### Value

The `--value` option sets the new value for a variant when using `vercel flags update`. For JSON flags, `--value` must be valid JSON. Boolean variants can keep their existing `true` or `false` value, but they cannot be changed to a different boolean value.

```bash filename="terminal"
vercel flags update welcome-message --variant control --value welcome-back
```

*Using the \`vercel flags update\` command with the \`--value\` option.*

### Label

The `--label` option, shorthand `-l`, sets a variant label when using `vercel flags update`, a segment label when using `vercel flags segments create` or `vercel flags segments update`, or an SDK key label when using `vercel flags sdk-keys add`.

```bash filename="terminal"
vercel flags update welcome-message --variant control --label "Welcome back"
```

*Using the \`vercel flags update\` command with the \`--label\` option.*

### Message

The `--message` option sets an optional revision message when using `vercel flags update`, `vercel flags set`, `vercel flags split`, `vercel flags rollout`, `vercel flags enable`, or `vercel flags disable`.

```bash filename="terminal"
vercel flags set welcome-message -e preview --variant control \
  --message "Keep preview on control"
```

*Using the \`vercel flags set\` command with the \`--message\` option.*

### Stage

The `--stage` option, shorthand `-s`, adds a rollout stage when using `vercel flags rollout`. Each stage uses the format `PERCENTAGE,DURATION`, for example `5,6h`. Repeat `--stage` to build a longer schedule.

```bash filename="terminal"
vercel flags rollout redesigned-checkout --environment production --by user.id \
  --stage 5,6h --stage 10,6h --stage 25,12h --stage 50,1d
```

*Defining four rollout stages with repeated \`--stage\` options.*

### Start

The `--start` option controls when `vercel flags rollout` begins. Use `now`, a future relative duration like `1h`, or an ISO 8601 datetime.

```bash filename="terminal"
vercel flags rollout welcome-message --environment production --by user.id \
  --from-variant control --to-variant treatment --default-variant control \
  --stage 10,2h --stage 50,12h --start 2026-04-16T09:00:00Z
```

*Scheduling a rollout to start at a specific time.*

### Type

The `--type` option specifies the type of SDK key when using `vercel flags sdk-keys add`.

```bash filename="terminal"
vercel flags sdk-keys add --type server --environment production
```

*Using the \`vercel flags sdk-keys add\` command with the \`--type\` option.*

### Yes

The `--yes` option, shorthand `-y`, skips the confirmation prompt when archiving or deleting a flag, deleting a segment, or deleting an SDK key.

```bash filename="terminal"
vercel flags archive my-feature --yes
```

*Using the \`vercel flags archive\` command with the
\`--yes\` option to skip confirmation.*

### Expiration

The `--expiration` option sets how long an encrypted override token returned by `vercel flags override` stays valid. Accepts any duration string parseable by `setExpirationTime` in `jose` (for example, `30d`, `12h`, `90d`). Defaults to `1y`.

```bash filename="terminal"
vercel flags override my-flag=42 --expiration 30d
```

*Override \`my-flag\` for 30 days instead of the default one year.*

### Decrypt

The `--decrypt` option switches `vercel flags override` from encrypt mode to decrypt mode. Pass the encrypted override token and the CLI prints the override payload as JSON. Requires the same `FLAGS_SECRET` used to encrypt the token.

```bash filename="terminal"
vercel flags override --decrypt <token>
```

*Inspect an existing override token by decrypting it back to its JSON payload.*


---

[View full sitemap](/docs/sitemap)
