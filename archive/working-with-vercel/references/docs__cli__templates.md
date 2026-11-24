---
title: vercel templates
product: vercel
url: /docs/cli/templates
canonical_url: "https://vercel.com/docs/cli/templates"
last_updated: 2026-11-06
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/login
  - /docs/integrations
  - /docs/cli/init
  - /docs/cli/global-options
summary: Search the template catalog, inspect deployment requirements, and deploy templates from the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cli/templates.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "a9c77c5e2d6561951ca2056ced09b4a132d5e75e4cc026edfd02173834700185"
---

# vercel templates

Use `vercel templates` to search for templates, inspect their requirements, and deploy an application from a new GitHub repository. You can search and inspect templates without logging in. Interactive deployments start [Vercel login](/docs/cli/login) if needed; authenticate before unattended deployments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.

Full cross-link map for this page: [/docs/cli/templates.graph.md](/docs/cli/templates.graph.md)
<!-- /docsgraph:related -->

## Search templates

Search for a template by name or description. Use `--framework` or `--type` to filter the results:

```bash filename="terminal"
vercel templates search "AI chatbot" --framework next.js --limit 10
```

Results appear as a table with each template's slug, name, framework, and whether the CLI can deploy it. A slug is the template's URL-friendly name, such as `eve-memory-agent`. When stdout isn't a terminal, the table is tab-separated with a header row, so scripts can read it.

When more results are available, the CLI prints a `Next page:` command on stderr with your query and filters. With `--json`, pass the value of `pagination.next` to `--next`. JSON results also include each template's description and template ID. The `--limit` option defaults to 20. Values above 100 are reduced to 100 with a warning; values below 1 are invalid.

To use a different catalog endpoint, set `VERCEL_TEMPLATES_API_URL` to its full base URL, such as `http://localhost:3000/api/templates/v1`. Catalog requests are anonymous. The global `--api` option selects the Vercel API endpoint separately.

## Inspect a template

Use a template's slug or template ID from a search result to check its requirements before deploying:

```bash filename="terminal"
vercel templates inspect nextjs-boilerplate --json
```

Without `--json`, the CLI shows the template's slug, template ID, source repository, and whether it can be deployed. It also lists the template's projects and the environment variables, Marketplace resources, Blob stores, and connections it requires. For a deployable template, it ends with the command to deploy it. If the CLI can't deploy the template, it lists the reasons instead.

With `--json`, the result also includes the template's README as `overview` and each project's build and install commands. Use the exact slug or template ID when inspecting or deploying a template.

## Deploy a template

Before deploying, connect your GitHub account to Vercel and install the Vercel GitHub App in the destination account. Choose new repository and project names.

Create a repository and deploy the template's projects. Replace `acme` with your GitHub account or organization and `your-team` with your Vercel team slug:

```bash filename="terminal"
vercel templates deploy nextjs-boilerplate --repo acme/my-site --scope your-team
```

The CLI creates a private GitHub repository. Use `--public` to create a public repository. Each new project's first deployment goes to production, with its environment variables and resource connections configured for production.

The CLI copies the template into the new repository, connects each project to GitHub, and waits for deployments to finish. You don't need to clone the repository locally.

For a single-project application, the project name comes from the destination repository name. For example, `--repo acme/my-site` creates a project named `my-site`. The CLI lowercases the name and replaces each run of characters other than letters, digits, and hyphens with one hyphen, so `--repo acme/My_Site` creates `my-site`. Use `projects` in your deployment config to override the name.

Project names must be lowercase, start with a letter or digit, and be up to 100 characters long. They can include letters, digits, `.`, `_`, and `-`, but not `---`. The CLI checks names before it creates the repository or any projects. If the name is already in use, the CLI prompts for another name in an interactive terminal. In unattended mode, supply the override with `--config` and retry. Choose a different `--repo` if the repository already exists.

When deployment succeeds, the CLI returns the repository URL, deployment URLs, and a run ID. It labels the deployment URLs with their environment: Production for a new run, or Preview when you resume an earlier run that deploys to Preview.

| Option | Description |
| --- | --- |
| `--repo <owner/name>` | Destination GitHub repository. Prompts when omitted in a terminal. |
| `--public` | Create a public repository. |
| `--prod` | Explicitly select production, which new projects use for their first deployment. |
| `--config <file>` | Read project names, resource selections, and environment variable references from a JSON file. |
| `--yes` | Confirm creation after resolving required inputs. |
| `--resume <run-id>` | Verify and continue a recorded deployment run. |
| `--json` | Return a structured result. |

### Configure deployment inputs

Pass a JSON file with `--config` to customize project names, select resources, or supply environment variables. Use the project names and resource keys from `vercel templates inspect <template-slug> --json`.

The following example assumes a template with a project named `starter` and a Marketplace resource keyed by `products-0`. Adapt these keys and environment variable names to your template:

```json filename="template-inputs.json"
{
  "projects": {
    "starter": { "name": "my-site" }
  },
  "env": {
    "API_KEY": { "env": "MY_TEMPLATE_API_KEY" },
    "SIGNING_KEY": { "file": "./secrets/signing-key" },
    "DATABASE_URL": { "resource": "products-0" }
  },
  "resources": {
    "products-0": {
      "integration": "neon",
      "product": "neon",
      "installationId": "icfg_example",
      "plan": "your-plan-id",
      "metadata": { "region": "your-region" },
      "projects": ["starter"]
    }
  }
}
```

Replace example identifiers and metadata with values supported by your selected product. Choose a plan explicitly, including free plans. To reuse a resource, supply `existingId` instead of a plan and provisioning metadata. Optional resources and Blob stores require `enabled: true` or an `existingId`. Set `enabled: false` to skip an optional one, even if it also has an `existingId`. Required resources can't be disabled.

Read secret values from process environment variables or files relative to the config file. The CLI removes trailing newlines from values read from a file, so a key saved with `echo` works as expected. In an interactive terminal, the CLI prompts for missing required values and masks your input. Keep secrets out of command arguments.

Use a `resource` reference when a connected Marketplace resource or Blob store supplies a variable. The CLI checks that the connection supplies the variable before starting builds. For a required variable shared across projects, connect the resource to every template project.

Install the required [Marketplace integrations](/docs/integrations) and accept their terms before deploying. The `--yes` option confirms resource creation, but you must accept legal terms separately. Existing billing restrictions still apply.

### Set up template connections

Deploy interactively to choose connections as part of setup:

```bash filename="terminal"
vercel templates deploy eve-memory-agent
```

The CLI prompts for the destination repository and any choices you haven't supplied. If the template requires Vercel Connect, choose an existing connector or create a new connection. Available connection methods depend on the service.

When a service requires browser authorization, complete setup in the browser window the CLI opens. For services that require credentials, enter them in masked prompts. After authorization, the CLI connects the service to your project, sets the required environment variable, and continues deployment.

Templates such as Eve use Connect triggers to receive events from external services. The CLI configures these triggers for the new project's production deployment. The `--yes` option confirms creation but doesn't authorize access to a provider.

For templates that require Blob storage, the CLI creates and connects the store before building. It uses the template's public or private access setting. Use `blobs` in your config file to reuse a store with matching access, choose a name or region, or enable an optional store. The default region is `iad1`.

For unattended deployment, select authorized connectors in the config. This example names the Eve project `my-eve-agent` and reuses a private Blob store and an authorized connector:

```json filename="eve-inputs.json"
{
  "projects": {
    "eve-memory-agent": { "name": "my-eve-agent" }
  },
  "blobs": {
    "stores-0": { "existingId": "store_your_private_blob" }
  },
  "connectors": {
    "connect-0": { "id": "scl_your_authorized_connector" }
  }
}
```

Use requirement keys from `vercel templates inspect <template-slug> --json`. For interactive setup, you can also configure a connector's `name`, `method`, `target`, and `params`.

To read credentials from a file or environment variable during interactive setup, use `credentials: { "file": "./connector-credentials.json" }` or `credentials: { "env": "CONNECTOR_CREDENTIALS_JSON" }`. Supply the JSON object required by the connection method. Unattended runs require an existing authorized connector, even if you provide credentials.

If connection setup stops after creating a connector, resume the same run to reuse it. If you cancel setup in the browser, or it fails before the CLI receives a connector ID, the CLI can't confirm whether a connector was created. It keeps that step pending so a resume never creates a second connector. Follow the [recovery steps](#resume-after-interruption) before resuming.

### Run unattended

For scripts and continuous integration (CI), supply all required inputs and confirm creation with `--yes`. For example, deploy Eve with the authorized connector and private Blob store selected in `eve-inputs.json`:

```bash filename="terminal"
vercel templates deploy eve-memory-agent \
  --repo acme/my-eve-agent \
  --scope your-team \
  --config eve-inputs.json \
  --prod --yes --non-interactive --json
```

The command reports missing inputs and known setup requirements before creating resources. If a provider fails during setup, use the returned run ID to resume after addressing the error.

Use `--json` for structured output. Successful results go to stdout: search returns `templates` and `pagination`, inspection returns `template`, and deployment returns `outcome`, `runId`, `repository`, `target` (`production` or `preview`), and `deployments`. Failures return a JSON error on stderr. JSON mode suppresses progress messages and prompts.

| Exit code | Meaning |
| --- | --- |
| `0` | Success. Read the result from stdout. |
| `1` | Operational failure, invalid deployment config, or required setup. Read `reason`, `message`, and `data` from stderr. |
| `2` | Invalid arguments or missing required inputs, such as environment values or a malformed `--resume` run ID. |
| `130` | You canceled a prompt or declined a required confirmation. The CLI prints `Canceled.` and `Nothing was changed.`, or a JSON error with the `canceled` reason. |

### Resume after interruption

If deployment stops after setup begins, the CLI prints a command to resume with the recorded run ID, team, and configuration paths. JSON errors include this command in `next`. Complete any setup or reconciliation steps shown before running it. You can also supply the run ID explicitly:

```bash filename="terminal"
vercel templates deploy eve-memory-agent \
  --resume <run-id> \
  --scope your-team --config eve-inputs.json --yes
```

The CLI saves progress in its global configuration directory without storing secret values. When you resume, it verifies existing resources and skips completed steps. It preserves created resources and the recorded deployment environment after a failure. Resume uses the saved template details, so you can continue if the catalog entry changes or becomes unavailable.

Resume keeps the selected project names, Marketplace plans, and public metadata choices such as regions and select options. Once all projects exist, the CLI checks their stored environment variable names instead of requesting secret values again. If some projects still need to be created, provide the required environment values for those projects.

Keep the repository, resource, and plan choices unchanged. You can rename a project the run hasn't created yet, for example after the API rejects its name, but not one it already created. You can also add or update environment value references and provisioning metadata for unfinished steps. Reordering keys in the config file doesn't affect resuming. Arbitrary text and password metadata aren't saved, so provide those values again if the Marketplace resource still needs provisioning.

If a deployment uses a different environment from its configured inputs, the CLI reports the mismatch with the deployment ID. Inspect that deployment and its environment settings before continuing.

If a request times out without a receipt, inspect the pending operation before resuming. Add a `reconcile` entry to the original config with the operation name from the error and the verified resource ID. For a repository copy, use `sha` with the verified commit SHA in place of `id`. For example, reconcile a created project with:

```json filename="reconciliation-example.json"
{
  "reconcile": {
    "operation": "project:eve-memory-agent",
    "receipt": { "id": "prj_your_project_id" }
  }
}
```

Merge this entry into your existing config. The CLI validates the receipt before continuing.

For a connector creation the CLI couldn't confirm, the error lists connectors created since the attempt started as candidates. If one belongs to this run, use its ID in `receipt`. If you've checked that nothing was created, retry the creation with `nothingCreated` and the `startedAt` value from the error:

```json filename="reconciliation-example.json"
{
  "reconcile": {
    "operation": "connect-create:connect-0",
    "nothingCreated": true,
    "startedAt": 1794200000000
  }
}
```

The CLI checks the attempt again before retrying it, and refuses if a connector was created or setup is still running. Unattended runs can't retry connector setup; resume interactively or supply the connector ID in `receipt`. Don't retry an uncertain creation operation as a new run. The CLI recovers a run lock when it can verify that the owning process has stopped. If the owner is still running or can't be verified, the command reports the lock path. Verify that no process is using the run before removing that lock.

### Monorepos and microfrontends

For monorepo templates, the CLI creates a project for each root directory specified by the template.

For microfrontend templates, project names must match the application keys in the template's `microfrontends.json` or `microfrontends.jsonc` file. If a name is already in use, deploy to another team or update the source configuration before deploying with different names. A project-name override alone doesn't update that configuration. The CLI configures the microfrontends group before deploying and prompts for any required billing confirmation.

The CLI deploys application templates. Search also returns other kinds of templates, such as firewall or routing rules, which it marks as not deployable. Use `vercel templates inspect` to check whether the CLI can deploy a result and see why not.

To create a local project from an example, use [`vercel init`](/docs/cli/init).

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel templates` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).

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
