---
title: vercel flags
product: vercel
url: /docs/cli/flags
canonical_url: "https://vercel.com/docs/cli/flags"
last_updated: 2026-08-04
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "dbe80e3b60a291651f01cce1ef4507f07832ec48986f6115d80a446955873637"
---

# vercel flags

The `vercel flags` command manages [Vercel Flags](/docs/flags/vercel-flags) for a project from the command line. Use `vercel flags` to create and update feature flags, view version history and evaluation metrics, manage rules and rollouts, or configure reusable segments and SDK keys.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How Splits Work in Vercel Flags](https://vercel.com/kb/guide/how-splits-work-in-vercel-flags?from=related) — Use weighted splits in Vercel Flags to deterministically bucket users into variants by percentage for gradual rollouts a
- [How Vercel Flags are evaluated](https://vercel.com/kb/guide/how-vercel-flags-are-evaluated?from=related) — Learn how Vercel Flags determines a flag’s value across environments using evaluation context, targeting, rules, and fal
- [How Vercel Flags resolves environments](https://vercel.com/kb/guide/how-vercel-flags-resolves-environments?from=related) — Configure Vercel Flags per environment by using environment-scoped SDK Keys that map your Vercel deployment environment
- [Roll Out a Feature](https://vercel.com/docs/flags/vercel-flags/cli/roll-out-feature?from=related) — Create a feature flag, wire it into your application with the Flags SDK, and start a staged rollout using the Vercel CLI
- [Feature Flag](https://vercel.com/docs/flags/vercel-flags/dashboard/feature-flag?from=related) — Learn how to configure individual feature flags in the Vercel Dashboard.
- [vercel rolling-release](https://vercel.com/docs/cli/rolling-release?from=related) — Learn how to manage your project's rolling releases using the vercel rolling-release CLI command.
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [Run an A/B Test](https://vercel.com/docs/flags/vercel-flags/cli/run-ab-test?from=related) — Set up an A/B test with a feature flag, track results through Web Analytics, and clean up afterward using the Vercel CLI

Full cross-link map for this page: [/docs/cli/flags.graph.md](/docs/cli/flags.graph.md)
<!-- /docsgraph:related -->

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
vercel flags versions [flag]
```

*Using the \`vercel flags versions\` command to list the version history of a
feature flag.*

```bash filename="terminal"
vercel flags versions diff [flag] --revision [number]
```

*Using the \`vercel flags versions diff\` command to show what changed in a
revision.*

```bash filename="terminal"
vercel flags evaluations [flag]
```

*Using the \`vercel flags evaluations\` command to display evaluation metrics
for a feature flag.*

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
vercel flags rules ls [flag]
```

*Using the \`vercel flags rules\` command to list conditional rules for a
feature flag.*

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
vercel flags unarchive [flag]
```

*Using the \`vercel flags\` command to unarchive a feature flag.*

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

### Viewing version history

Use `vercel flags versions` to list saved revisions for a flag. The default table output includes the revision number, author, change message, timestamp, and changed environments. You can also run `vercel flags versions list [flag]` for the same list output.

```bash filename="terminal"
vercel flags versions welcome-message
```

*Listing the version history for the \`welcome-message\` flag.*

By default, `vercel flags versions` uses the linked project. To query another project, pass the project name or ID with `--project`.

Filter versions by changed environment with `--environment` or `-e`:

```bash filename="terminal"
vercel flags versions welcome-message --environment production
```

*Listing only versions that changed the production environment.*

The command returns up to 20 versions per page by default. Use `--limit` to set a page size from 1 to 100. When another page is available, the CLI prints a next-page command with `--cursor`:

```bash filename="terminal"
vercel flags versions welcome-message --limit 10
vercel flags versions welcome-message --limit 10 --cursor next_page_cursor
```

*Requesting up to 10 versions, then using the cursor from the previous response
to get the next page.*

The table output stays summary-only. Use `--json` for scripting and automation when you need the full version snapshot. Each version includes a `data` object with the flag configuration for that revision:

```bash filename="terminal"
vercel flags versions welcome-message --json
```

```json
{
  "versions": [
    {
      "id": "flag_version_3",
      "flagId": "flag_abc123",
      "revision": 3,
      "author": "Ada Lovelace",
      "createdBy": "user_456",
      "message": "Updated production targeting",
      "createdAt": 1783602795208,
      "changedEnvironments": ["production"],
      "data": {
        "description": "My awesome feature flag",
        "variants": [
          { "id": "off", "value": false, "label": "Off" },
          { "id": "on", "value": true, "label": "On" }
        ],
        "environments": {
          "production": {
            "active": true,
            "rules": [
              {
                "id": "rule_pro_users",
                "conditions": [
                  {
                    "lhs": {
                      "type": "entity",
                      "kind": "user",
                      "attribute": "plan"
                    },
                    "cmp": "eq",
                    "rhs": "pro"
                  }
                ],
                "outcome": { "type": "variant", "variantId": "on" }
              }
            ],
            "pausedOutcome": { "type": "variant", "variantId": "off" },
            "fallthrough": { "type": "variant", "variantId": "off" },
            "targets": {
              "user": {
                "id": {
                  "on": [{ "value": "user_123", "note": "Beta customer" }]
                }
              }
            },
            "revision": 3
          }
        },
        "seed": 12345,
        "state": "active"
      }
    }
  ],
  "pagination": {
    "next": null
  }
}
```

*Output shape for \`vercel flags versions welcome-message --json\`.*

Use `vercel flags versions diff` to compare a revision with the immediately preceding revision:

```bash filename="terminal"
vercel flags versions diff welcome-message --revision 4
```

*Showing the changes introduced in revision \`4\` by comparing it with revision
\`3\`.*

The diff output is a readable summary of the flag change. It starts with the revision, flag, and project context, then shows the author, message, changed environments, and sections for changed settings and environments. Revision `0` appears in version history as the creation revision, but it can't be diffed because it has no previous revision.

Use `--json` to output a normalized, structured diff:

```bash filename="terminal"
vercel flags versions diff welcome-message --revision 4 --json
```

*Outputting the structured diff between revisions \`4\` and \`3\` as JSON.*

The diff JSON includes `flag`, `revision`, `previousRevision`, `version`, `previousVersion`, and `changes`. The `version` and `previousVersion` fields use the same summary fields as the version list output. Every item in `changes` includes `path` and `action`. The remaining fields depend on the action:

- `action: "added"` includes only `after`
- `action: "removed"` includes only `before`
- `action: "changed"` includes both `before` and `after`

If revision `0` has no saved message, version history shows `Flag created`. When a diff has no semantic changes, the command prints `No changes detected.` If the requested revision is unavailable, the error reports how many revisions are available.

### Viewing flag evaluations

Use `vercel flags evaluations <flag>` to see how many times a flag evaluated to each variant during a time range. Pass a flag slug or ID. By default, `vercel flags evaluations` uses the linked project.

```bash filename="terminal"
vercel flags evaluations new-checkout --since 1h --granularity 15m
```

*Viewing evaluations for each \`new-checkout\` variant in 15-minute buckets.*

#### Arguments

| Argument | Type | Required | Default | Description |
| - | - | - | - | - |
| `<flag>` | string | Yes | — | Feature flag slug or ID. |

#### Options

| Option | Type | Required | Default | Description |
| - | - | - | - | - |
| `--project <NAME_OR_ID>` | string | No | Linked project | Project name or ID. |
| `-s, --since <TIME>` | string | No | `1h` | Start time as a relative duration or ISO 8601 timestamp. |
| `-u, --until <TIME>` | string | No | Current time | End time as a relative duration or ISO 8601 timestamp. |
| `-g, --granularity <SIZE>` | string | No | Automatic | Time bucket size. Supports `1m`, `5m`, `15m`, `1h`, `4h`, and `1d`. |
| `--json` | boolean | No | `false` | Outputs exact bucket data as JSON instead of a human-readable summary. |

When you run the command outside the linked project directory, use the global `--cwd` option to select it:

```bash filename="terminal"
vercel flags evaluations new-checkout --cwd /path/to/project
```

*Viewing evaluations for the project linked at \`/path/to/project\`.*

#### Human-readable output

By default, `vercel flags evaluations` shows the aligned UTC time range, bucket interval, and project. It also shows per-variant totals, statistics, and sparklines. The CLI displays current variants with their configured values and labels. It labels evaluations without a variant as `Default in Code` and displays deleted or unknown variant IDs unchanged.

For example, the command above can return:

```text filename="stdout"
> Period: 2026-07-10 10:00 to 2026-07-10 11:00 (UTC) [1h]
> Interval: 15m
> Project: my-storefront (acme)

    Variants  total  avg      min          max
  false: Off    180   45  30 at 10:00  60 at 10:45
    true: On    100   25  10 at 10:00  40 at 10:30

    Variants
  false: Off  ▁▆▃█
    true: On  ▁▃█▆
```

If the selected period has no evaluation data, the command prints `No data found for this period.` and exits successfully.

#### JSON output

Pass `--json` to output exact bucket data without text formatting. Each `buckets` entry includes the timestamp, evaluation count, and either a variant ID or `null`. A `null` variant represents `Default in Code`. The `variants` object maps current variant IDs to their configured values.

```bash filename="terminal"
vercel flags evaluations new-checkout --since 1h --granularity 15m --json
```

```json filename="stdout"
{
  "flag": "new-checkout",
  "variants": {
    "off": false,
    "on": true
  },
  "startTime": "2026-07-10T10:00:00.000Z",
  "endTime": "2026-07-10T11:00:00.000Z",
  "granularity": {
    "minutes": 15
  },
  "truncated": false,
  "buckets": [
    {
      "timestamp": "2026-07-10T10:00:00.000Z",
      "variant": "off",
      "evaluations": 30
    },
    {
      "timestamp": "2026-07-10T10:00:00.000Z",
      "variant": "on",
      "evaluations": 10
    },
    {
      "timestamp": "2026-07-10T10:15:00.000Z",
      "variant": "off",
      "evaluations": 50
    },
    {
      "timestamp": "2026-07-10T10:15:00.000Z",
      "variant": "on",
      "evaluations": 20
    },
    {
      "timestamp": "2026-07-10T10:30:00.000Z",
      "variant": "off",
      "evaluations": 40
    },
    {
      "timestamp": "2026-07-10T10:30:00.000Z",
      "variant": "on",
      "evaluations": 40
    },
    {
      "timestamp": "2026-07-10T10:45:00.000Z",
      "variant": "off",
      "evaluations": 60
    },
    {
      "timestamp": "2026-07-10T10:45:00.000Z",
      "variant": "on",
      "evaluations": 30
    }
  ]
}
```

*Returning exact bucket data for \`new-checkout\` as JSON.*

`vercel flags evaluations` rounds the start time down and the end time up to bucket boundaries. The JSON `startTime` and `endTime` fields contain the aligned range. The `buckets` array includes only returned buckets and doesn't add buckets with no data.

When the selected period has no evaluation data, the `buckets` array is empty.

#### Limits

`vercel flags evaluations` returns up to the 100 most evaluated variants. Human-readable output warns when additional variants are omitted. In JSON output, `truncated` is `true` when the limit omits less frequently evaluated variants.

#### Errors

`vercel flags evaluations` exits with a non-zero status when validation fails or it can't retrieve the project, flag, or evaluation data. Common validation and project error codes include:

| Code | Cause |
| - | - |
| `MISSING_FLAG` | The required `<flag>` argument is missing. |
| `INVALID_GRANULARITY` | `--granularity` isn't one of the six supported values. |
| `INVALID_TIME` | A time value is invalid, or the start time isn't before the end time. |
| `NOT_LINKED` | The current directory isn't linked and `--project` wasn't provided. |
| `PROJECT_NOT_FOUND` | The project passed to `--project` wasn't found in the current scope. |
| `PROJECT_RESOLUTION_FAILED` | The CLI couldn't resolve the requested project. |

Flag lookup errors use the code returned by the Vercel API. Evaluation data errors can use `FORBIDDEN`, `RATE_LIMITED`, `TIMEOUT`, `INTERNAL_ERROR`, or `BAD_REQUEST`.

In human-readable mode, the CLI prints error messages to the terminal. With `--json`, validation and request errors use the following shape after command-line argument parsing succeeds:

```json filename="stdout"
{
  "error": {
    "code": "INVALID_GRANULARITY",
    "message": "Invalid granularity \"10m\". Use one of: 1m, 5m, 15m, 1h, 4h, 1d."
  }
}
```

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

### Managing conditional rules

Use `vercel flags rules` to manage targeting rules in a flag environment. Rules evaluate from top to bottom before the environment's fallthrough outcome. The first matching rule determines the outcome Vercel Flags serves.

```bash filename="terminal"
vercel flags rules ls my-feature --environment production
```

*Listing conditional rules for \`my-feature\` in production.*

Add a rule by passing one or more conditions and an outcome:

```bash filename="terminal"
vercel flags rules add my-feature --environment production \
  --condition user.plan:eq:pro --variant on \
  --message "Enable Pro users"
```

*Adding a production rule that serves the \`on\` variant to Pro users.*

Rule conditions use these forms:

| Form | Description | Example |
| - | - | - |
| `ENTITY.ATTRIBUTE:OPERATOR:VALUE` | Matches an entity attribute. | `user.plan:eq:pro` |
| `segment:OPERATOR:SEGMENT` | Matches a reusable segment by segment ID. | `segment:eq:seg_beta123` |

Repeat `--condition` to add multiple conditions. You can also separate conditions with semicolons in one value:

```bash filename="terminal"
vercel flags rules add my-feature --environment production \
  --condition "user.plan:eq:pro;team.tier:eq:enterprise" --variant on
```

*Adding a rule that only matches when both conditions are true.*

See [available rule operators](#available-rule-operators) for the complete operator list, including aliases and value formats.

Use the same outcome options as `vercel flags set`, `vercel flags split`, and `vercel flags rollout` when adding or updating a rule. For example, a matching rule can serve one variant, split traffic across variants, or run a progressive rollout:

```bash filename="terminal"
vercel flags rules add my-feature --environment production \
  --condition user.plan:eq:pro --by user.id \
  --weight off=90 --weight on=10 --position 1
```

*Adding a rule at the top of the list that splits matching Pro users.*

Use the rule ID from `vercel flags rules ls` to update, move, or remove a rule:

```bash filename="terminal"
vercel flags rules update my-feature rule_123 --environment production \
  --condition user.plan:eq:enterprise
```

```bash filename="terminal"
vercel flags rules move my-feature rule_123 --environment production \
  --position 1
```

```bash filename="terminal"
vercel flags rules rm my-feature rule_123 --environment production
```

*Updating, moving, and removing an existing conditional rule.*

When you update, move, or remove a rule in an environment that reuses another environment's configuration, the CLI copies the effective rules into the selected environment and disables configuration reuse for that environment.

### Available rule operators

Use these operators in `vercel flags rules` conditions and `vercel flags segments` rule criteria. Operators can compare entity attributes or segments, depending on the command syntax.

| Operator | Meaning | Accepted aliases |
| - | - | - |
| `eq` | Is equal to the value. | `=`, `==`, `equals`, `equal` |
| `!eq` | Is not equal to the value. | `does-not-equal`, `not-equals`, `not-equal`, `!=` |
| `oneOf` | Is in a comma-separated list of values. | `in`, `oneof`, `one-of` |
| `!oneOf` | Is not in a comma-separated list of values. | `not-in`, `not-one-of`, `!oneof` |
| `containsAllOf` | Contains all values in a comma-separated list. | `containsallof`, `contains-all-of` |
| `containsAnyOf` | Contains at least one value in a comma-separated list. | `containsanyof`, `contains-any-of` |
| `containsNoneOf` | Contains none of the values in a comma-separated list. | `containsnoneof`, `contains-none-of` |
| `startsWith` | Starts with the value. | `startswith`, `starts-with` |
| `endsWith` | Ends with the value. | `endswith`, `ends-with` |
| `contains` | Contains the value. | None |
| `!contains` | Does not contain the value. | `does-not-contain`, `notcontains`, `not-contains`, `notContains` |
| `ex` | Has any value. | `exists` |
| `!ex` | Has no value. | `!exists`, `not-exists` |
| `gt` | Is greater than the value. | `>` |
| `gte` | Is greater than or equal to the value. | `>=` |
| `lt` | Is less than the value. | `<` |
| `lte` | Is less than or equal to the value. | `<=` |

The list operators `oneOf`, `!oneOf`, `containsAllOf`, `containsAnyOf`, and `containsNoneOf` accept comma-separated values, such as `user.plan:oneOf:pro,enterprise`. The existence operators `ex` and `!ex` don't require a value, such as `user.email:ex`.

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

A flag must be archived before it can be deleted. Archived flags stop evaluating. Use `vercel flags unarchive` or the [dashboard](/docs/flags/vercel-flags/dashboard) to restore an archived flag with its previous configuration.

```bash filename="terminal"
vercel flags archive my-feature --yes
```

*Archiving a flag without a confirmation prompt.*

```bash filename="terminal"
vercel flags unarchive my-feature --yes
```

*Unarchiving a flag without a confirmation prompt.*

`vercel flags unarchive` prints a warning and exits successfully without making changes when the flag is already active.

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

Segment rules use the same operators as conditional flag rules. See [available rule operators](#available-rule-operators) for the complete operator list, including aliases and value formats.

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

> **💡 Note:** Copy the SDK key from the create output immediately and store it somewhere safe. Vercel returns the full value only once, at creation time. `vercel flags sdk-keys ls` returns a masked preview (for example, `vf_server_abc********`). If you lose the value, delete the key with `vercel flags sdk-keys rm` and create a new one.

If you don't provide the `--environment` option, you'll be prompted to select one interactively.

`vercel flags list --json`, `vercel flags versions [flag] --json`, `vercel flags versions diff [flag] --revision [number] --json`, `vercel flags rules ls --json`, `vercel flags segments ls --json`, and `vercel flags sdk-keys ls --json` output JSON for scripting and automation.

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

### Since

The `--since` option, shorthand `-s`, sets the start of the time range for `vercel flags evaluations`. Use a relative duration like `1h`, `30m`, `2d`, or `1w`, or an ISO 8601 timestamp. If omitted, the range starts one hour before the command runs.

```bash filename="terminal"
vercel flags evaluations new-checkout --since 24h
```

*Viewing evaluations from the last 24 hours.*

### Until

The `--until` option, shorthand `-u`, sets the end of the time range for `vercel flags evaluations`. It accepts the same relative durations and ISO 8601 timestamps as `--since`. If omitted, the range ends at the current time. The start time must be earlier than the end time.

```bash filename="terminal"
vercel flags evaluations new-checkout --since 24h --until 1h
```

*Viewing evaluations from 24 hours ago through one hour ago.*

### Granularity

The `--granularity` option, shorthand `-g`, sets the time bucket size for `vercel flags evaluations`. Supported values are `1m`, `5m`, `15m`, `1h`, `4h`, and `1d`.

If you omit `--granularity`, the CLI selects a bucket size based on the time range. The minimum bucket size prevents overly detailed queries over long periods:

| Time range | Automatic bucket | Minimum bucket |
| - | - | - |
| Up to 1 hour | `1m` | `1m` |
| More than 1 hour and up to 2 hours | `5m` | `5m` |
| More than 2 hours and up to 12 hours | `15m` | `5m` |
| More than 12 hours and up to 3 days | `1h` | `1h` |
| More than 3 days and up to 30 days | `4h` | `4h` |
| More than 30 days | `1d` | `1d` |

When you request a bucket smaller than the minimum, the CLI uses the minimum instead. Human-readable output includes a notice, while JSON output reports the adjusted value in `granularity`.

```bash filename="terminal"
vercel flags evaluations new-checkout --since 7d --granularity 4h
```

*Viewing seven days of evaluations in four-hour buckets.*

### JSON

The `--json` option prints machine-readable output for commands that support JSON output, including `vercel flags list`, `vercel flags versions`, `vercel flags versions diff`, `vercel flags evaluations`, `vercel flags rules ls`, `vercel flags segments ls`, `vercel flags segments inspect`, `vercel flags segments create`, `vercel flags segments update`, and `vercel flags sdk-keys ls`.

```bash filename="terminal"
vercel flags segments inspect beta-users --json
```

*Using the \`vercel flags segments inspect\` command with the \`--json\` option.*

### Limit

`vercel flags versions` and `vercel flags versions list` return up to 20 versions per page by default. Use `--limit` to request a different page size. The value must be an integer from 1 through 100.

```bash filename="terminal"
vercel flags versions welcome-message --limit 10
```

*Using the \`vercel flags versions\` command with the \`--limit\` option.*

### Cursor

The `--cursor` option gets the next page from a previous `vercel flags versions` or `vercel flags versions list` response. Human-readable output prints a next-page command when another page is available. JSON output returns the next cursor as `pagination.next`.

```bash filename="terminal"
vercel flags versions welcome-message --limit 10 --cursor next_page_cursor
```

*Using the \`vercel flags versions\` command with the \`--cursor\` option.*

### Revision

The required `--revision` option selects the revision to compare when using `vercel flags versions diff`. The selected revision is compared with the immediately preceding revision, so revision `0` can't be diffed.

```bash filename="terminal"
vercel flags versions diff welcome-message --revision 4
```

*Using the \`vercel flags versions diff\` command with the \`--revision\` option.*

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

For rules, use `rule:ENTITY.ATTRIBUTE:OPERATOR:VALUE`. See [available rule operators](#available-rule-operators) for `OPERATOR` values. To remove a rule by ID, use `--remove rule:RULE_ID`.

### Condition

The `--condition` option, shorthand `-c`, defines a condition when using `vercel flags rules add` or replaces all conditions when using `vercel flags rules update`. Use `ENTITY.ATTRIBUTE:OPERATOR:VALUE` for entity attributes or `segment:OPERATOR:SEGMENT` for reusable segments. See [available rule operators](#available-rule-operators) for `OPERATOR` values. Repeat `--condition` or separate conditions with semicolons to add multiple conditions.

```bash filename="terminal"
vercel flags rules add my-feature --environment production \
  --condition user.plan:eq:pro --condition team.tier:eq:enterprise \
  --variant on
```

*Using repeated \`--condition\` options to require multiple rule matches.*

### Environment

The `--environment` option, shorthand `-e`, specifies the target environment for `vercel flags set`, `vercel flags split`, `vercel flags rollout`, `vercel flags enable`, `vercel flags disable`, `vercel flags rules`, and `vercel flags sdk-keys add`. When using `vercel flags versions` or `vercel flags versions list`, it filters versions by the environment that changed. Valid values are `production`, `preview`, and `development`.

```bash filename="terminal"
vercel flags set welcome-message --environment production --variant control
```

*Using the \`vercel flags set\` command with the
\`--environment\` option.*

### Variant

The `--variant` option, shorthand `-v`, defines variants on `vercel flags create`, and selects a variant by ID or value on `vercel flags update`, `vercel flags set`, `vercel flags disable`, `vercel flags rules add`, and `vercel flags rules update`.

For JSON flags, create variants with `--variant '<JSON>'` or `--variant '<JSON>'=Label`. When you update a JSON flag, the selector can be a variant ID or the current JSON value, but not the label.

```bash filename="terminal"
vercel flags create welcome-message --kind string \
  --variant control="Welcome back" --variant treatment="Start for free"
```

*Using repeated \`--variant\` options to create a string flag with explicit
variants.*

### By

The `--by` option selects the entity attribute used for consistent bucketing when using `vercel flags split`, `vercel flags rollout`, `vercel flags rules add`, or `vercel flags rules update`. Use the format `<entity.attribute>`, such as `user.id`.

```bash filename="terminal"
vercel flags rollout redesigned-checkout --environment production --by user.id \
  --stage 5,6h --stage 25,12h
```

*Using \`--by\` to bucket the rollout by \`user.id\`.*

### Weight

The `--weight` option, shorthand `-w`, adds a variant weight when using `vercel flags split`, `vercel flags rules add`, or `vercel flags rules update`. Use the format `VARIANT=WEIGHT`, and repeat the option for every variant. `VARIANT` can be a variant ID or value. Vercel Flags normalizes weights into percentages, and a weight of `0` excludes a variant from receiving traffic.

```bash filename="terminal"
vercel flags split ai-summary-model --environment production --by user.id \
  --default-variant stable --weight stable=95 --weight candidate=5
```

*Using repeated \`--weight\` options to route 5% of traffic to a candidate
model.*

### From variant, to variant, and default variant

The `--from-variant`, `--to-variant`, and `--default-variant` options control which variants a rollout uses. `--from-variant` is the current variant, `--to-variant` is the rollout target, and `--default-variant` is served when the bucketing attribute is missing.

The `--default-variant` option also applies to `vercel flags split` and split outcomes for `vercel flags rules`. Boolean splits default to the `false` variant. For String, Number, and JSON splits, pass `--default-variant` to choose the fallback variant served when the split's bucketing attribute is missing. The split default variant accepts either a variant ID or a variant value.

For Boolean flag rollouts, these values default to `false`, `true`, and `false`. For String, Number, and JSON flag rollouts, pass them explicitly. Each option accepts either a variant ID or a variant value. The rollout options also apply to rollout outcomes for `vercel flags rules`.

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

The `--message` option sets an optional revision message when using `vercel flags update`, `vercel flags set`, `vercel flags split`, `vercel flags rollout`, `vercel flags enable`, `vercel flags disable`, `vercel flags rules add`, `vercel flags rules update`, `vercel flags rules move`, or `vercel flags rules rm`.

```bash filename="terminal"
vercel flags set welcome-message -e preview --variant control \
  --message "Keep preview on control"
```

*Using the \`vercel flags set\` command with the \`--message\` option.*

### Stage

The `--stage` option, shorthand `-s`, adds a rollout stage when using `vercel flags rollout`, `vercel flags rules add`, or `vercel flags rules update`. Each stage uses the format `PERCENTAGE,DURATION`, for example `5,6h`. Repeat `--stage` to build a longer schedule.

```bash filename="terminal"
vercel flags rollout redesigned-checkout --environment production --by user.id \
  --stage 5,6h --stage 10,6h --stage 25,12h --stage 50,1d
```

*Defining four rollout stages with repeated \`--stage\` options.*

### Start

The `--start` option controls when a rollout begins when using `vercel flags rollout`, `vercel flags rules add`, or `vercel flags rules update`. Use `now`, a future relative duration like `1h`, or an ISO 8601 datetime.

```bash filename="terminal"
vercel flags rollout welcome-message --environment production --by user.id \
  --from-variant control --to-variant treatment --default-variant control \
  --stage 10,2h --stage 50,12h --start 2026-04-16T09:00:00Z
```

*Scheduling a rollout to start at a specific time.*

### Position

The `--position` option, shorthand `-p`, sets the 1-based position for a conditional rule when using `vercel flags rules add` or `vercel flags rules move`. If you omit `--position` when adding a rule, the CLI adds the rule at the end.

```bash filename="terminal"
vercel flags rules move my-feature rule_123 --environment production \
  --position 1
```

*Moving a conditional rule to the top of the production rule list.*

### Type

The `--type` option specifies the type of SDK key when using `vercel flags sdk-keys add`.

```bash filename="terminal"
vercel flags sdk-keys add --type server --environment production
```

*Using the \`vercel flags sdk-keys add\` command with the \`--type\` option.*

### Yes

The `--yes` option, shorthand `-y`, skips the confirmation prompt when archiving, unarchiving, or deleting a flag, deleting a segment, or deleting an SDK key.

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
