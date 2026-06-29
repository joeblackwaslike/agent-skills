---
title: Feature Flag Configuration
product: vercel
url: /docs/flags/vercel-flags/dashboard/feature-flag
canonical_url: "https://vercel.com/docs/flags/vercel-flags/dashboard/feature-flag"
last_updated: 2026-05-11
type: how-to
prerequisites:
  - /docs/flags/vercel-flags/dashboard
  - /docs/flags/vercel-flags
related:
  - /docs/flags/vercel-flags/dashboard/sdk-keys
  - /docs/flags/vercel-flags/dashboard/entities
  - /docs/flags/vercel-flags/dashboard/segments
  - /docs/deployments/environments
  - /docs/flags/vercel-flags/dashboard/archive
summary: Learn how to configure individual feature flags in the Vercel Dashboard.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/dashboard/feature-flag.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "e0fbbe7bb9a2977241ba6c6cbaf51cb61aea062377787f22b96d77776c01aa7c"
---

# Feature Flag Configuration

When you select a flag from the Flags overview, you can configure how it behaves across different environments and users. This page covers all the configuration options available for individual flags.

Each flag has a fixed **type** and a set of **variants** (the values it can return). Every environment (Production, Preview, and Development) gets its own **configuration** that decides which variant to serve, either as a single static value or through **targets and rules**. The value a configuration ultimately serves is called its **outcome**.

## Flag types

Vercel Flags supports four value types:

- **Boolean**: `true` or `false`. Use for simple feature toggles.
- **String**: Text values like `"control"`, `"variant-a"`, `"variant-b"`. Use for multi-variant rollouts or different UI treatments.
- **Number**: Numeric values. Use for scaling, limits, or thresholds.
- **JSON**: Structured objects or arrays. Use for complex configuration like `{"theme": "dark", "limit": 10}`.

The type is set when you create the flag and cannot be changed afterward.

## Variants

Variants are the possible values your flag can return. Each variant has:

- **Value**: The actual value returned by the flag (e.g., `true`, `"premium"`, `42`)
- **Label**: A human-readable name shown in the dashboard (e.g., "Enabled", "Premium Tier")

You can add new variants at any time.

### Deleting a variant

To delete a variant, it must not be referenced by any environment configuration or targeting rule.

> **💡 Note:** Switching an environment to a static value preserves its rules in the background. If those rules reference the variant you want to delete, you must remove them first, even though they aren't currently being evaluated.

## Environments

Each flag can be configured differently for Production, Preview, and Development environments. This lets you test features in Development while keeping them off in Production, validate on Preview deployments before going live, or roll out variants only in Production.

### How environments work

When your application evaluates a flag with the default Vercel OpenID Connect (OIDC) authentication, Vercel Flags uses the environment associated with the current deployment or local project context. If you configure an [SDK Key](/docs/flags/vercel-flags/dashboard/sdk-keys) manually, the key determines which environment's configuration is used:

| Authentication | Configuration used |
| -------------- | ------------------ |
| Vercel OIDC | The current Vercel environment |
| Production SDK Key | Production configuration |
| Preview SDK Key | Preview configuration |
| Development SDK Key | Development configuration |

Each environment has its own configuration that determines how the flag is evaluated. A configuration consists of [evaluation](#evaluation) rules and [outcomes](#outcome). See [SDK Keys](/docs/flags/vercel-flags/dashboard/sdk-keys) to learn when to use manual SDK Key authentication.

A common setup enables a feature in Development and Preview while keeping it off in Production:

| Environment | Configuration |
| ----------- | ------------- |
| Production  | Disabled      |
| Preview     | Enabled       |
| Development | Enabled       |

This lets your team test the feature during development and in preview deployments before going live.

## Evaluation

Each environment is in one of two evaluation modes:

- **Static value**: every request gets the same variant. No rules are evaluated.
- **Targets and rules**: the SDK checks targets first, then evaluates rules in order, and uses a fallthrough [outcome](#outcome) when nothing matches.

You can switch between modes at any time without losing your rules.

### Static value

The simplest configuration serves the same value to everyone in an environment:

1. Select the environment (Production, Preview, or Development)
2. Choose a variant from the switch or dropdown
3. Save your changes

### Targets and rules

Targeting and dynamic rules let you serve different values based on user attributes.

Using targets and rules requires creating [Entities](/docs/flags/vercel-flags/dashboard/entities) first, since they're based on entities.

To set up targets and rules:

1. Click the  **Target** icon next to an environment
2. Add rules or targets to define who sees which variant
3. Set a fallthrough [outcome](#outcome) for users who don't match any rules

Targets are evaluated first. If no targets match, rules are evaluated.

Rules are evaluated from top to bottom. Each rule can have multiple filters. A rule only matches if all filters match. The first matching rule determines the [outcome](#outcome) that's served. If no rules match, the fallthrough outcome is used.

Learn more about [targeting with segments](/docs/flags/vercel-flags/dashboard/segments) and [entities](/docs/flags/vercel-flags/dashboard/entities).

A common production pattern enables a feature only for your team:

| Environment | Configuration                              |
| ----------- | ------------------------------------------ |
| Production  | Enabled only for `@yourcompany.com` emails |
| Preview     | Reuse production                           |
| Development | Reuse production                           |

### Switching between static and rules modes

You can switch between static values and targeting rules at any time. When you switch from rules to a static value, your rules are preserved in the background. This lets you quickly disable targeting (serve one value to everyone) and re-enable it later without losing your configuration.

## Outcome

An *outcome* is what the flag actually serves at a decision point. Outcomes appear in two places: as the result of a matching targeting rule, or as the **fallthrough** outcome used when no rule matches.

The same three outcome types are available in either spot:

| Type | What it does |
| ---- | ------------ |
| **Single variant** | Serves one variant. Used by static value mode, and the default outcome type for rules and fallthroughs. |
| **Weighted split** | Buckets requests across variants by percentage. |
| **Progressive rollout** | Moves traffic from one variant to another on a schedule. |

### Single variant

A single variant outcome serves the same value every time it's used. It's the default for new rules and the only outcome type used by [static value](#static-value) mode.

### Weighted split

Use a weighted split to serve a feature to a percentage of users. Set up an [Entity](/docs/flags/vercel-flags/dashboard/entities) first. For example, an entity called *User* with `id` (string) and `email` (string) attributes.

1. In your flag details, select the  **Target** icon for the desired environment
2. Don't configure any rules or targets. Pick the **Percentage split** option for the "When no other rules match, serve" fallthrough
3. In the **Based on** field, select **User » id** or whichever entity attribute you want to base the split on. This attribute is used to bucket your users into the available variants
4. Select a **Fallback** variant, used in case the entity or attribute the split is based on wasn't provided
5. Set the percentages or weights for the split. Vercel Flags supports weights, so you can set 1, 1, 1 for an equal three-way split

You can also use a weighted split as the outcome of an individual rule, not only as the fallthrough.

### Progressive rollout

Use a progressive rollout when you want traffic to move from one variant to another over time. Progressive rollouts are different from weighted splits: they follow a schedule and finish at 100% of the `roll to` variant.

You can configure a progressive rollout as the fallthrough or as the outcome of an individual rule.

1. Open the environment you want to change
2. In **When no other rules match, serve**, choose **a progressive rollout**
3. In **Based on**, select the entity attribute used for stable bucketing, such as **User › id**
4. Choose **Roll from**, **Roll to**, and **Fallback**
5. Choose whether the rollout should start when you save or at a specific time
6. Add one or more schedule steps with a percentage and a duration for each step
7. Save the flag

After you save, the dashboard shows the start time, current percentage, and time until the next stage. After the last listed step finishes, the rollout serves 100% of the `roll to` variant indefinitely. If the selected entity attribute is missing during evaluation, the flag serves the fallback variant.

Boolean flags prefill the rollout as `false` to `true`. String, Number, and JSON flags let you choose any existing variants.

### Fallthrough vs fallback variant

> **💡 Note:** *Fallthrough* and *fallback variant* are different concepts. The fallthrough is the environment-level outcome used when no rule matches. The fallback variant is what a weighted split or progressive rollout serves when its bucketing data is missing.

## Sharing configuration across environments

Once you've configured one environment, you can reuse that configuration in others or extend it to custom environments.

### Reusing configuration from another environment

Lower environments (Development and Preview) can reuse the configuration from higher environments:

- Development can reuse Preview or Production
- Preview can reuse Production

This is useful when you want consistent behavior across environments without duplicating configuration.

> **💡 Note:** Configuration linking only works from lower to higher environments. Production cannot reuse Development or Preview. This prevents accidentally affecting production when changing development settings.

To reuse configuration:

1. Select the environment you want to configure
2. Click the  icon to **Reuse configuration**
3. Select the source environment

Changes to the source environment will automatically apply to linked environments.

### Custom environments

Vercel Flags supports three flag environments: Production, Preview, and Development. [Vercel Custom Environments](/docs/deployments/environments#custom-environments) use Preview flag configuration by default.

To use a different flag environment for a custom environment:

1. Find the SDK Key you want in the [SDK Keys](/docs/flags/vercel-flags/dashboard/sdk-keys) section of the **Flags** section in the sidebar, or create a new one for the desired environment
2. Add or update an environment variable in your custom environment, such as `FLAGS`, and set its value to that SDK Key
3. Redeploy the custom environment

This means you configure your flags once per flag environment rather than repeating the setup for every custom environment.

If you need flag rules that distinguish between individual custom environments, create an [entity](/docs/flags/vercel-flags/dashboard/entities) for the environment name and pass it as evaluation context.

## Managing flags

### Saving changes

After making changes to a flag, click on **Review and save**, which will open a confirmation modal.

The modal shows the environments your change will affect and summarizes the changed configuration.

Leave a *Change message* for your change which will show up in the activity log of this flag.

### Maintainers

The **Maintainer** field in the sidebar shows who to contact about a flag. Maintainers are informational only and do not affect evaluation, targeting, permissions, or rollout behavior.

To add or update maintainers:

1. Open the flag in the dashboard
2. In the sidebar, find **Maintainer** and click **Edit**
3. Select up to five team members

### Activity and change history

The **Activity** section in the sidebar shows the complete history of changes to a flag:

- Who made each change
- When the change was made
- What was modified

You can add a change message when modifying a flag to document the reason for the update. This helps your team understand the context behind changes.

#### How to restore a previous configuration

To restore a previous configuration:

1. Open **Activity** in the sidebar
2. Find the configuration you want to restore
3. Click **Restore** to apply that configuration

This creates a new change in the history, so you can always see what was restored and when.

### Using segments

[Segments](/docs/flags/vercel-flags/dashboard/segments) let you define reusable groups of users. Instead of recreating the same targeting rules for multiple flags, create a segment once and reference it in your flag configuration.

Common segments include:

- Internal team members
- Beta testers
- Enterprise customers
- Users in specific regions

Segments can consist of a list of users or be made up of dynamic rules.

### Archiving and deleting

When a flag is no longer needed:

- **Archive**: Removes the flag from active use but preserves its configuration. Archived flags can be restored later. See [Archive](/docs/flags/vercel-flags/dashboard/archive).
- **Delete**: Permanently removes the flag and all its configuration. This cannot be undone.

> **💡 Note:** When you archive a flag, it stops being served by the SDK. Your application will receive the default value defined in code, or an error if no default is set.

## Next steps

- [Create reusable segments](/docs/flags/vercel-flags/dashboard/segments)
- [Define entities for targeting](/docs/flags/vercel-flags/dashboard/entities)
- [Manage SDK Keys](/docs/flags/vercel-flags/dashboard/sdk-keys)


---

[View full sitemap](/docs/sitemap)
