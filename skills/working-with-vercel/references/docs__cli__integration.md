---
title: vercel integration
product: vercel
url: /docs/cli/integration
canonical_url: "https://vercel.com/docs/cli/integration"
last_updated: 2026-02-27
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/integrations
  - /docs/cli/project
summary: Learn how to manage marketplace native integrations, provision resources, and discover available products using the vercel integration CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/integration.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "9f93667fd9c06098788c5638f14c3b01d33392d5141fba7e2c8cd1dcb1594430"
---

# vercel integration

The `vercel integration` command manages [marketplace integrations](/docs/integrations). Use it to provision resources, browse available integrations, view setup guides, check billing balances, and manage individual resources with the nested `resource` subcommand.

It supports the following subcommands:

- [`add`](#vercel-integration-add): Provision a new resource from a marketplace integration
- [`accept-terms`](#vercel-integration-accept-terms): Accept marketplace legal terms and install an integration on the team
- [`list`](#vercel-integration-list): List installed resources
- [`installations`](#vercel-integration-installations): List marketplace integration installations for the team
- [`discover`](#vercel-integration-discover): Browse available marketplace integrations
- [`categories`](#vercel-integration-categories): List available marketplace categories
- [`guide`](#vercel-integration-guide): View getting started guides and code snippets
- [`balance`](#vercel-integration-balance): Check balances and thresholds
- [`open`](#vercel-integration-open): Open a provider's dashboard via SSO
- [`update`](#vercel-integration-update): Update a marketplace integration installation
- [`remove`](#vercel-integration-remove): Uninstall an integration
- [`resource`](#vercel-integration-resource): Manage individual resources (connect, disconnect, remove, create-threshold, claim)

## vercel integration add

This command provisions a new resource from a marketplace integration. If the integration isn't installed on your team yet, it installs it first.

Also available as `vercel install` (alias: `vercel i`).

In a terminal, this command prompts for choices like billing plan and metadata. You can provide options as flags to reduce prompts. In non-interactive environments (CI pipelines, scripted usage), provide required options via flags. The command detects non-interactive terminals and skips interactive prompts.

```bash filename="terminal"
vercel integration add <integration-name>
```

*Provision a new resource from a marketplace integration.*

You can target a specific product from a multi-product integration using the slash syntax:

```bash filename="terminal"
vercel integration add <integration>/<product>
```

*Provision a specific product from a multi-product integration.*

> **💡 Note:** Run `vercel integration add <integration-name> --help` to see available
> products, metadata options, and billing plans an integration offers.

### Options

| Option              | Shorthand | Description                                                                                                                                                                                                                                                   |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--name`            | `-n`      | Custom name for the resource. Auto-generated if not provided.                                                                                                                                                                                                 |
| `--metadata`        | `-m`      | Metadata as `KEY=VALUE`. Can be repeated for multiple keys.                                                                                                                                                                                                   |
| `--plan`            | `-p`      | Billing plan ID to use for the resource.                                                                                                                                                                                                                      |
| `--environment`     | `-e`      | Environments to connect: `production`, `preview`, `development`. Can be repeated. Defaults to all three.                                                                                                                                                      |
| `--prefix`          |           | Prefix for environment variable names. The prefix is used as-is, so include a trailing underscore if you want a separator (e.g., `--prefix NEON2_` creates `NEON2_DATABASE_URL`). Must start with a letter and contain only letters, digits, and underscores. |
| `--format`          | `-F`      | Output format. Use `json` for machine-readable output.                                                                                                                                                                                                        |
| `--no-connect`      |           | Skip connecting the resource to the current project. Also skips env pull.                                                                                                                                                                                     |
| `--no-env-pull`     |           | Skip running `vercel env pull` after provisioning.                                                                                                                                                                                                            |
| `--installation-id` |           | Installation ID to use when multiple installations exist for the same integration.                                                                                                                                                                            |
| `--claim`           |           | If the new resource is a sandbox, claim it immediately after provisioning without prompting. Mutually exclusive with `--no-claim`.                                                                                                                          |
| `--no-claim`        |           | If the new resource is a sandbox, skip the offer to claim it and instead print a hint about how to claim it later. Mutually exclusive with `--claim`.                                                                                                       |

> **💡 Note:** Passing both `--claim` and `--no-claim` exits with code 1 and the error
> `Cannot use both --claim and --no-claim.`. In non-interactive environments,
> if you provision a sandbox resource without `--claim` or `--no-claim`, the
> command prints a hint pointing to [`claim`](#vercel-integration-resource-claim) instead of prompting.

### Post-provisioning behavior

After provisioning a resource, the command:

1. Prints a link to the resource in the Vercel dashboard
2. Connects the resource to the currently linked project (unless `--no-connect` is set)
3. Runs `vercel env pull` to sync environment variables (unless `--no-env-pull` or `--no-connect` is set)

### Examples

```bash filename="terminal"
# Provision a resource interactively
vercel integration add neon

# Target a specific product from a multi-product integration
vercel integration add acme/acme-redis

# Provision with a custom resource name
vercel integration add neon --name my-database

# Provision with metadata options
vercel integration add neon --metadata region=us-east-1
vercel integration add neon -m region=us-east-1 -m version=16

# Provision with a specific billing plan
vercel integration add neon --plan pro

# Connect to specific environments only
vercel integration add neon --environment production
vercel integration add neon -e production -e preview

# Provision without connecting to the current project
vercel integration add neon --no-connect

# Provision without pulling environment variables
vercel integration add neon --no-env-pull

# Use a prefix for environment variable names
vercel integration add neon --prefix NEON2_

# Skip the claim offer when provisioning a sandbox resource (good for CI)
vercel integration add shopify --no-claim

# Show available products and metadata keys
vercel integration add neon --help
```

## vercel integration accept-terms

This command accepts a marketplace integration's legal terms and installs the integration on the current team without provisioning a product resource. Use this when you only need the team-level installation; `add` installs the integration and provisions a resource in one step.

This command requires an interactive terminal and human confirmation. It does not replace integrations that require a browser flow or device attestation.

```bash filename="terminal"
vercel integration accept-terms <integration>
```

*Accept marketplace terms and install an integration on the team.*

### Arguments

| Argument      | Required | Description                                       |
| ------------- | -------- | ------------------------------------------------- |
| `integration` | Yes      | Integration slug (for example, `neon`) or ID.     |

### Options

| Option     | Shorthand | Description                                            |
| ---------- | --------- | ------------------------------------------------------ |
| `--format` | `-F`      | Output format. Use `json` for machine-readable output. |

### Examples

```bash filename="terminal"
# Accept terms interactively and install on the team
vercel integration accept-terms neon

# Output result as JSON
vercel integration accept-terms neon --format=json
```

## vercel integration list

This command lists installed resources with their associated integrations. By default, shows resources for the currently linked project.

Alias: `vercel integration ls`

```bash filename="terminal"
vercel integration list [project]
```

*List integration resources for the current project.*

The output includes the name, status, product, integration, and connected projects for each resource. Unclaimed sandbox marketplace resources are marked with a yellow `[SANDBOX]` tag in the **Status** column. When the listing contains one or more sandbox resources, a hint below the table shows how many can be claimed and points to [`claim`](#vercel-integration-resource-claim).

When you pass `--format=json`, each sandbox resource includes a `claim_status: "sandbox"` field. The field is omitted for non-sandbox resources.

### Arguments

| Argument  | Required | Description                                                                                                                                              |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `project` | No       | Project name to filter resources by, for example `my-app` (the name shown in the dashboard and `vercel project ls`). Uses the linked project if omitted. |

### Options

| Option          | Shorthand | Description                                                                     |
| --------------- | --------- | ------------------------------------------------------------------------------- |
| `--integration` | `-i`      | Filter resources to a specific integration.                                     |
| `--all`         | `-a`      | List all resources regardless of project. Cannot be used with `[project]`.      |
| `--format`      | `-F`      | Output format. Use `json` for machine-readable output.                          |

### Examples

```bash filename="terminal"
# List resources for the current project
vercel integration list

# Filter to a specific project by name
vercel integration list my-app

# Filter to a specific integration
vercel integration list --integration neon
vercel integration list -i upstash

# List all resources across the team
vercel integration list --all

# Output as JSON
vercel integration list --format=json
```

## vercel integration installations

This command lists marketplace integration installations for the current team. Use this when you need to see the team-level account-scope state (what integrations are installed) rather than the project-scope resources that `list` shows.

```bash filename="terminal"
vercel integration installations [options]
```

*List marketplace integration installations for the team.*

Alias: `vercel integration installation`.

### Options

| Option          | Shorthand | Description                                                       |
| --------------- | --------- | ----------------------------------------------------------------- |
| `--integration` | `-i`      | Limit to installations of this integration. Accepts a slug or ID. |
| `--format`      | `-F`      | Output format. Use `json` for machine-readable output.            |

### Examples

```bash filename="terminal"
# List all marketplace installations for the team
vercel integration installations

# Filter by integration slug
vercel integration installations --integration neon

# JSON output
vercel integration installations --format json
```

## vercel integration discover

This command lists available marketplace integrations and their products. Use this to find integrations you can install. Pass an optional query to filter results.

```bash filename="terminal"
vercel integration discover [query]
```

*Browse available marketplace integrations.*

For multi-product integrations, each product appears separately with a compound slug (for example, `aws/aws-dynamodb`). Single-product integrations where the product slug matches the integration slug show only the integration slug.

### Arguments

| Argument | Required | Description                                                                                                   |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| `query`  | No       | Filter integrations by substring against the integration slug, product slug, name, or description.            |

### Options

| Option       | Shorthand | Description                                                                                                            |
| ------------ | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| `--category` | `-c`      | Filter integrations by category. Can be repeated to match any value from a list (e.g., `-c storage -c ai`).       |
| `--format`   | `-F`      | Output format. Use `json` for machine-readable output.                                                                 |

> **💡 Note:** Run [`vercel integration categories`](#vercel-integration-categories) to see
> the available category values.

### Examples

```bash filename="terminal"
# Browse all available integrations
vercel integration discover

# Filter by search term
vercel integration discover postgres
vercel integration discover aws

# Filter integrations by category
vercel integration discover --category storage

# Match any of multiple categories (repeat the flag)
vercel integration discover --category storage --category ai
vercel integration discover -c commerce -c payments -c authentication

# Output as JSON
vercel integration discover --format=json
```

## vercel integration categories

This command lists the categories that marketplace integrations are grouped into. Use the output to find valid values for [`discover --category`](#vercel-integration-discover).

```bash filename="terminal"
vercel integration categories
```

*List the categories available for filtering marketplace integrations.*

The output includes the category slug (the value you pass to `--category`) and a short description.

### Options

| Option     | Shorthand | Description                                            |
| ---------- | --------- | ------------------------------------------------------ |
| `--format` | `-F`      | Output format. Use `json` for machine-readable output. |

### Examples

```bash filename="terminal"
# List all marketplace categories
vercel integration categories

# Output as JSON
vercel integration categories --format=json
```

## vercel integration guide

This command shows getting started guides and code snippets for using a marketplace integration in your project.

```bash filename="terminal"
vercel integration guide <integration-name>
```

*View setup guides for a marketplace integration.*

You can also target a specific product from a multi-product integration:

```bash filename="terminal"
vercel integration guide <integration>/<product>
```

### Options

| Option        | Shorthand | Description                                                                                         |
| ------------- | --------- | --------------------------------------------------------------------------------------------------- |
| `--framework` | `-f`      | Select a framework guide without prompts (e.g., `nextjs`, `remix`, `astro`, `nuxtjs`, `sveltekit`). |

### Examples

```bash filename="terminal"
# View guides for an integration
vercel integration guide neon

# View guides for a specific product
vercel integration guide aws/aws-dynamodb

# View the Next.js guide without prompts
vercel integration guide neon --framework nextjs
```

## vercel integration balance

This command shows the balances and thresholds for a marketplace integration, including prepayment details.

```bash filename="terminal"
vercel integration balance <integration-name>
```

*View billing balances and auto-recharge thresholds for a marketplace
integration.*

> **💡 Note:** This command only applies to integrations that support prepayment billing
> plans.

### Options

| Option     | Shorthand | Description                                            |
| ---------- | --------- | ------------------------------------------------------ |
| `--format` | `-F`      | Output format. Use `json` for machine-readable output. |

### Examples

```bash filename="terminal"
# View balances for an integration
vercel integration balance neon

# Output as JSON
vercel integration balance neon --format=json
```

## vercel integration open

This command opens the provider's dashboard for an integration or a specific resource via SSO.

```bash filename="terminal"
vercel integration open <integration-name> [resource-name]
```

*Open the provider's dashboard via single sign-on.*

When called without a resource name, it opens the integration's dashboard. When called with a resource name, it opens the dashboard for that specific resource.

### Options

| Option     | Shorthand | Description                                            |
| ---------- | --------- | ------------------------------------------------------ |
| `--format` | `-F`      | Output format. Use `json` to get the SSO link as JSON. |

### Examples

```bash filename="terminal"
# Open the integration's dashboard
vercel integration open neon

# Open a specific resource's dashboard
vercel integration open neon my-neon-database

# Get the SSO link as JSON (useful in scripts)
vercel integration open neon --format=json
```

## vercel integration update

This command updates an existing marketplace integration installation. Use it to change the billing plan or the set of projects that can access the integration.

`update` does not handle install, remove, or connect flows. Use `integration add` to install, `integration remove` to uninstall, and `integration-resource`, `env pull`, or related commands to manage resources. UI-only flows (browser OAuth, consent screens, marketplace purchase) may not map one-to-one to a single CLI flag; pass `--plan` and `--authorization-id` when the product requires them for billing changes.

```bash filename="terminal"
vercel integration update <integration> [options]
```

*Update an existing marketplace integration installation.*

### Arguments

| Argument      | Required | Description                                       |
| ------------- | -------- | ------------------------------------------------- |
| `integration` | Yes      | Integration slug (for example, `neon`) or ID.     |

### Options

| Option               | Shorthand | Description                                                                                                       |
| -------------------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| `--plan`             | `-p`      | Billing plan ID for integrations that support installation-level billing plans.                                   |
| `--authorization-id` | -         | Billing authorization ID when the platform requires it for plan changes.                                          |
| `--projects`         | -         | Project ID allowed to use this installation. Pass `all` for all projects. Repeatable.                             |
| `--installation-id`  | -         | Configuration ID when multiple marketplace installations exist for this integration.                              |
| `--format`           | `-F`      | Output format. Use `json` for machine-readable output.                                                            |

### Examples

```bash filename="terminal"
# Grant all team projects access to the integration
vercel integration update neon --projects all

# Limit access to specific projects
vercel integration update neon --projects prj_abc --projects prj_def

# Change installation billing plan
vercel integration update acme --plan pro

# Select installation when several exist
vercel integration update neon --installation-id icfg_xxx --projects all

# Output result as JSON
vercel integration update neon --projects all --format=json

# Non-interactive (JSON success and errors on stdout)
vercel integration update neon --projects all --non-interactive
```

## vercel integration remove

Uninstalls a marketplace integration from your team. You must [remove all resources](#vercel-integration-resource-remove) from the integration before running this command.

```bash filename="terminal"
vercel integration remove <integration-name>
```

*Uninstall a marketplace integration.*

### Options

| Option     | Shorthand | Description                                            |
| ---------- | --------- | ------------------------------------------------------ |
| `--yes`    | `-y`      | Skip the confirmation prompt.                          |
| `--format` | `-F`      | Output format. Use `json` for machine-readable output. |

> **💡 Note:** Non-interactive environments and JSON output mode require the `--yes` flag.

### Examples

```bash filename="terminal"
# Uninstall an integration
vercel integration remove neon

# Uninstall without confirmation
vercel integration remove neon --yes

# Output as JSON
vercel integration remove neon --format=json --yes
```

## vercel integration resource

The `vercel integration resource` command manages individual resources provisioned from marketplace integrations: connect resources to projects, disconnect them, remove them, configure auto-recharge thresholds, and claim sandbox resources.

`vercel integration-resource <subcommand>` and `vc ir <subcommand>` are backward-compatible aliases that route to the same handlers as the canonical nested form.

It supports the following subcommands:

- [`connect`](#vercel-integration-resource-connect): Connect a resource to a project
- [`disconnect`](#vercel-integration-resource-disconnect): Disconnect a resource from a project
- [`remove`](#vercel-integration-resource-remove): Delete a resource
- [`create-threshold`](#vercel-integration-resource-create-threshold): Set up auto-recharge for prepaid resources
- [`claim`](#vercel-integration-resource-claim): Claim a sandbox marketplace resource

In the examples below, `<resource-name>` (for example, `my-database`) is the name of a marketplace resource you've already provisioned — run [`vercel integration list`](#vercel-integration-list) to see the names of your resources. `<project>` (for example, `my-project`) is a project's name or ID — run [`vercel project ls`](/docs/cli/project) to list them, or find a project's ID in the [Vercel dashboard](/dashboard) under **Settings → General**.

### vercel integration resource connect

This command connects an existing marketplace resource to a project. If you don't specify a project, the command connects to the currently linked project.

```bash filename="terminal"
vercel integration resource connect <resource-name> [project]
```

*Connect a marketplace resource to a project.*

#### Arguments

| Argument        | Required | Description                                                                                                                       |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `resource-name` | Yes      | Name of the resource to connect (for example, `my-database`).                                                                     |
| `project`       | No       | Project name (for example, `my-project`) or project ID (for example, `prj_abc123`) to connect to. Uses the linked project if omitted. |

#### Options

| Option          | Shorthand | Description                                                                                                                                                                                                                                                  |
| --------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--environment` | `-e`      | Environments to connect: `production`, `preview`, `development`. Can be repeated. Defaults to all three.                                                                                                                                                     |
| `--prefix`      |           | Prefix for environment variable names. The prefix is used as-is, so include a trailing underscore if you want a separator (e.g., `--prefix NEON2_` creates `NEON2_DATABASE_URL`). Must start with a letter and contain only letters, digits, and underscores. |
| `--yes`         | `-y`      | Skip the confirmation prompt.                                                                                                                                                                                                                                |
| `--format`      | `-F`      | Output format. Use `json` for machine-readable output. Requires `--yes`.                                                                                                                                                                                     |

> **💡 Note:** Non-interactive environments and JSON output mode require the `--yes` flag.
> When `--yes` is missing in a non-interactive environment, the command emits a
> structured `outputAgentError` payload with `reason: "confirmation_required"`
> and a `next` array containing the suggested command, then exits with code 1.

#### Environment variable collisions

If connecting would create an environment variable name that already exists on the project, the command exits with an error that names the conflicting variable, the project, and the affected environments. The follow-up message suggests either passing a `--prefix` to namespace the new variables, or removing the existing variable with `vercel env rm`.

#### Examples

```bash filename="terminal"
# Connect to the currently linked project across all environments
vercel integration resource connect my-database

# Connect to a specific project
vercel integration resource connect my-database my-project

# Limit to specific environments
vercel integration resource connect my-database --environment production
vercel integration resource connect my-database -e production -e preview

# Use a prefix to avoid environment variable collisions
vercel integration resource connect my-database --prefix NEON2_

# Output as JSON (requires --yes)
vercel integration resource connect my-database --yes --format=json
```

### vercel integration resource disconnect

This command disconnects a resource from a project. If you don't specify a project, the command disconnects from the currently linked project.

```bash filename="terminal"
vercel integration resource disconnect <resource-name> [project]
```

*Disconnect a resource from a project.*

If the specified project is not currently connected to the resource, the command exits with code 1 and an error like `Project <name> is not connected to resource <resource>.` Run [`vercel integration list`](#vercel-integration-list) to see which projects are connected to each resource.

#### Arguments

| Argument        | Required | Description                                                                                                                            |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `resource-name` | Yes      | Name of the resource to disconnect (for example, `my-database`).                                                                       |
| `project`       | No       | Project name (for example, `my-project`) or project ID (for example, `prj_abc123`) to disconnect from. Uses the linked project if omitted. |

#### Options

| Option     | Shorthand | Description                                            |
| ---------- | --------- | ------------------------------------------------------ |
| `--all`    | `-a`      | Disconnect all projects from the resource.             |
| `--yes`    | `-y`      | Skip the confirmation prompt.                          |
| `--format` | `-F`      | Output format. Use `json` for machine-readable output. |

> **💡 Note:** Non-interactive environments and JSON output mode require the `--yes` flag.
> When `--yes` is missing in a non-interactive environment, the command emits a
> structured `outputAgentError` payload with `reason: "confirmation_required"`
> and a `next` array containing the suggested command, then exits with code 1.

#### Examples

```bash filename="terminal"
# Disconnect from the currently linked project
vercel integration resource disconnect my-database

# Using the short alias
vc ir disconnect my-redis-cache

# Disconnect from a specific project
vercel integration resource disconnect my-database my-project

# Disconnect all projects from the resource
vercel integration resource disconnect my-database --all

# Disconnect all without confirmation
vercel integration resource disconnect my-database -a -y

# Output as JSON
vercel integration resource disconnect my-database -a -y --format=json
```

### vercel integration resource remove

This command deletes an integration resource permanently.

Alias: `vercel integration resource rm`

```bash filename="terminal"
vercel integration resource remove <resource-name>
```

*Delete an integration resource.*

If the resource has connected projects, you must disconnect them first or use the `--disconnect-all` flag.

#### Options

| Option             | Shorthand | Description                                                |
| ------------------ | --------- | ---------------------------------------------------------- |
| `--disconnect-all` | `-a`      | Disconnect all projects from the resource before deletion. |
| `--yes`            | `-y`      | Skip the confirmation prompt.                              |
| `--format`         | `-F`      | Output format. Use `json` for machine-readable output.     |

> **💡 Note:** Non-interactive environments and JSON output mode require the `--yes` flag.

#### Examples

```bash filename="terminal"
# Remove a resource
vercel integration resource remove my-database

# Remove with the short alias
vc ir rm my-cache

# Disconnect all projects and remove in one step
vercel integration resource remove my-database --disconnect-all

# Remove without confirmation
vc ir rm my-cache --disconnect-all --yes

# Output as JSON
vc ir rm my-cache -a -y --format=json
```

### vercel integration resource create-threshold

Sets up an auto-recharge threshold for a prepaid resource. When the resource's balance drops below the minimum, it automatically purchases additional credit.

If the resource uses installation-level billing, the threshold applies to all resources under that installation.

```bash filename="terminal"
vercel integration resource create-threshold <resource-name> <minimum> <spend> <limit>
```

*Configure auto-recharge for a prepaid resource.*

#### Arguments

| Argument        | Required | Description                                                                                              |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `resource-name` | Yes      | Name of the resource to configure.                                                                       |
| `minimum`       | Yes      | Dollar amount that triggers a recharge (e.g., `50` for $50.00). Decimals supported (e.g., `5.75`).       |
| `spend`         | Yes      | Dollar amount to purchase when the threshold is triggered (e.g., `100` for $100.00). Decimals supported. |
| `limit`         | Yes      | Maximum spend per billing period in dollars (e.g., `2000` for $2,000.00). Decimals supported.            |

#### Options

| Option  | Shorthand | Description                   |
| ------- | --------- | ----------------------------- |
| `--yes` | `-y`      | Skip the confirmation prompt. |

> **💡 Note:** Non-interactive environments require the `--yes` flag.

#### Validation rules

- All amounts must be non-negative numbers.
- `minimum` must be less than or equal to `spend`.
- `minimum` must be less than or equal to `limit`.
- `limit` must be greater than or equal to `spend`.
- The `spend` amount must fall within the billing plan's allowed range.

#### Examples

```bash filename="terminal"
# Set up auto-recharge: top up $100 when balance drops below $50, max $2000/period
vercel integration resource create-threshold my-database 50 100 2000

# Skip confirmation
vc ir create-threshold my-database 50 100 2000 --yes
```

### vercel integration resource claim

This command claims a sandbox marketplace resource by opening the provider's claim URL in your browser and polling until ownership transfers from sandbox to your team.

```bash filename="terminal"
vercel integration resource claim [resource-name]
```

*Claim a sandbox marketplace resource.*

When you omit the resource name, the command picks the right resource based on how many sandbox resources exist on the current project:

| Sandbox resources | Behavior                                                                              |
| ----------------- | ------------------------------------------------------------------------------------- |
| 0                 | Prints `No sandbox resources to claim in the current project.` and exits with code 0. |
| 1                 | Prompts to confirm claiming that resource. Skip the prompt with `--yes`.              |
| 2 or more         | Shows an interactive picker.                                                          |

After the browser opens, the command polls for up to five minutes for ownership to transfer. Pressing Ctrl-C cancels the wait and exits with code 130.

#### Arguments

| Argument        | Required | Description                                                                                     |
| --------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `resource-name` | No       | Name of the sandbox resource to claim. If omitted, the command picks interactively (see above). |

#### Options

| Option      | Shorthand | Description                                                                                                                                              |
| ----------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--yes`     | `-y`      | When exactly one sandbox resource exists and no name was passed, skip the single-resource confirmation prompt. Does not affect the multi-resource picker. |
| `--no-wait` |           | Print the claim URL and exit immediately without opening the browser or polling for completion.                                                          |
| `--format`  | `-F`      | Output format. Use `json` for machine-readable output.                                                                                                   |

> **💡 Note:** In non-interactive environments, the command emits a structured
> `outputActionRequired` payload with
> `reason: "integration_sandbox_claim_required"` and `verification_uri` set to
> the claim URL, then exits with code 1.

After claiming, run [`vercel integration list`](#vercel-integration-list) to confirm the resource's ownership has transferred. You can also have [`vercel integration add`](#vercel-integration-add) start the claim flow automatically with `--claim`.

#### Examples

```bash filename="terminal"
# Pick a sandbox resource interactively
vercel integration resource claim

# Claim a specific resource
vercel integration resource claim my-stripe-sandbox

# Get the claim URL without waiting (useful in scripts and CI)
vercel integration resource claim my-stripe-sandbox --no-wait

# Output the URL as JSON
vercel integration resource claim my-stripe-sandbox --no-wait --format=json
```


---

[View full sitemap](/docs/sitemap)
