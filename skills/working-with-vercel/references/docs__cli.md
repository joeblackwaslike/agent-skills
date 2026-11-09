---
title: Vercel CLI Overview
product: vercel
url: /docs/cli
canonical_url: "https://vercel.com/docs/cli"
last_updated: 2026-10-07
type: reference
prerequisites:
  []
related:
  - /docs/cli/logs
  - /docs/cli/certs
  - /docs/cli/dev
  - /docs/cli/dns
  - /docs/rest-api
summary: Learn how to use the Vercel command-line interface (CLI) to manage and configure your Vercel Projects from the command line.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "5cc0dcf56f8f9548db24c1d70a74552edd60c67198b3f5eec10724a9e6e46a67"
---

# Vercel CLI Overview

Vercel gives you multiple ways to interact with and configure your Vercel Projects. With the command-line interface (CLI) you can interact with the Vercel platform using a terminal, or through an automated system, enabling you to [retrieve logs](/docs/cli/logs), manage [certificates](/docs/cli/certs), replicate your deployment environment [locally](/docs/cli/dev), manage Domain Name System (DNS) [records](/docs/cli/dns), and more.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway) — Learn how to use the AI Gateway provider with the AI SDK.
- [Vercel Flags](https://flags-sdk.dev/docs/providers/vercel)
- [Terminal commands](https://v0.app/docs/terminal-commands) — v0 can run bash commands in your project sandbox to test, debug, and use platform CLIs. Control its autonomy with three
- [Agent Runs now available in the Vercel MCP and CLI](https://vercel.com/changelog/agent-runs-vercel-mcp-cli)
- [Configure weighted traffic splits for Vercel Flags from the Vercel CLI](https://vercel.com/changelog/configure-weighted-traffic-splits-for-vercel-flags-from-the-vercel-cli)
- [Copy-to-Prompt instructions now available for Flags](https://vercel.com/changelog/copy-to-prompt-instructions-now-available-for-flags)
- [Deploy Hono backends with zero configuration](https://vercel.com/changelog/deploy-hono-backends-with-zero-configuration)
- [Deploy without an account using Vercel CLI](https://vercel.com/changelog/deploy-without-an-account-using-vercel-cli)
- [Build AI agents with AI Gateway and AI SDK](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk) — Build AI agents on Vercel with AI Gateway and AI SDK, then make them reliable, capable, and durable with Sandbox, Chat S
- [How to automatically approve tool calls in eve with Jev](https://vercel.com/kb/guide/auto-approve-tool-calls-eve-jev) — Use Jev to review tool calls in eve, allow routine actions, and request human approval when needed. Configure the policy
- [Build with an Express starter template](https://vercel.com/kb/guide/build-with-a-express-starter-template) — Deploy an Express app to Vercel from a template. Browse Express starters from Vercel and the community, then run them lo
- [Build with a FastAPI starter template](https://vercel.com/kb/guide/build-with-a-fastapi-starter-template) — Browse FastAPI starter templates for Vercel and deploy one in a few steps. Compare minimal, AI, agent, and full-stack Fa

Full cross-link map for this page: [/docs/cli.graph.md](/docs/cli.graph.md)
<!-- /docsgraph:related -->

If you'd like to interface with the platform programmatically, check out the [REST API documentation](/docs/rest-api).

## Installing Vercel CLI

To download and install Vercel CLI, run the following command:

**pnpm**

```bash
pnpm i -g vercel
```

**yarn**

```bash
yarn global add vercel
```

**npm**

```bash
npm i -g vercel
```

**bun**

```bash
bun add -g vercel
```

## Updating Vercel CLI

When there is a new release of Vercel CLI, running any command will show you a message letting you know that an update is available.

If you have installed our command-line interface through [npm](http://npmjs.org/) or [Yarn](https://yarnpkg.com), the easiest way to update it is by running the installation command yet again.

**pnpm**

```bash
pnpm i -g vercel@latest
```

**yarn**

```bash
yarn global add vercel@latest
```

**npm**

```bash
npm i -g vercel@latest
```

**bun**

```bash
bun add -g vercel@latest
```

If you see permission errors, please read npm's [official guide](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally). Yarn depends on the same configuration as npm.

To see what changed in each version, browse the [release notes](/docs/cli/release-notes).

## Checking the version

The `--version` option can be used to verify the version of Vercel CLI currently being used.

```bash filename="terminal"
vercel --version
```

*Using the \`vercel\` command with the \`--version\` option.*

## Using in a CI/CD environment

Vercel CLI requires you to log in and authenticate before accessing resources or performing administrative tasks. In a terminal environment, you can use [`vercel login`](/docs/cli/login), which requires manual input. If you don't have a Vercel account yet, you can create one with [`vercel signup`](/docs/cli/signup). In a CI/CD environment where manual input is not possible, you can create a token on your [tokens page](/account/tokens) and then authenticate using one of these methods:

- Set the `VERCEL_TOKEN` environment variable
- Pass the [`--token` option](/docs/cli/global-options#token) to the command

Using the `VERCEL_TOKEN` environment variable is recommended for CI/CD because it avoids exposing the token in command-line arguments, which can be visible in process lists and logs. If both are provided, the `--token` flag takes precedence over the environment variable.

## Available Commands

### activity

View activity events for your Vercel project or team, filtered by type, date range, and project.

```bash
vercel activity
vercel activity --all --since 30d
vercel activity --type deployment --since 7d
```

[Learn more about the activity command](/docs/cli/activity)

### agent

Generate an `AGENTS.md` file in the current project with Vercel deployment best practices for coding agents.

```bash
vercel agent init
vercel agent init --yes
```

[Learn more about the agent command](/docs/cli/agent)

### agent-runs

Find projects with Agent Runs activity, list recent runs, and inspect run metadata and conversation traces.

```bash
vercel agent-runs projects
vercel agent-runs list
vercel agent-runs inspect run_1234567890
vercel agent-runs trace run_1234567890 --json
```

[Learn more about the agent-runs command](/docs/cli/agent-runs)

### ai-gateway

Manage [AI Gateway](/docs/ai-gateway) resources, including API keys, from the CLI.

```bash
vercel ai-gateway api-keys create
vercel ai-gateway api-keys create --name my-key --amount 500 --refresh-period monthly
```

[Learn more about the ai-gateway command](/docs/cli/ai-gateway)

### alerts

List recent alerts for a linked project, a specific project, or an entire team.

```bash
vercel alerts
vercel alerts --all
vercel alerts --project [project-name]
```

[Learn more about the alerts command](/docs/cli/alerts)

### alias

Apply custom domain aliases to your Vercel deployments.

```bash
vercel alias set [deployment-url] [custom-domain]
vercel alias remove [custom-domain]
vercel alias list
```

[Learn more about the alias command](/docs/cli/alias)

### api

Make authenticated HTTP requests to the Vercel API from your terminal.

```bash
vercel api [endpoint]
vercel api /v2/user
vercel api /v9/projects -X POST -F name=my-project
```

[Learn more about the api command](/docs/cli/api)

### billing

View usage and costs, contract commitments, your [Spend Management](/docs/spend-management) budget, and invoices for your team.

```bash
vercel billing usage
vercel billing contract
vercel billing budgets set --amount 200 --pause --webhook https://example.com/spend
vercel billing invoices list
vercel billing invoices download [invoice-id]
```

[Learn more about the billing command](/docs/cli/billing)

### bisect

Perform a binary search on your deployments to help surface issues.

```bash
vercel bisect
vercel bisect --good [deployment-url] --bad [deployment-url]
```

[Learn more about the bisect command](/docs/cli/bisect)

### blob

Interact with Vercel Blob storage to upload, download, list, delete, and copy files.

```bash
vercel blob list
vercel blob put [path-to-file] --access private
vercel blob get [url-or-pathname] --access private
vercel blob delete [url-or-pathname]
vercel blob copy [from-url] [to-pathname] --access private
```

[Learn more about the blob command](/docs/cli/blob)

### build

Build a Vercel Project locally or in your own CI environment.

```bash
vercel build
vercel build --prod
```

[Learn more about the build command](/docs/cli/build)

### buy

Purchase Vercel products like credits, addons, subscriptions, and domains directly from the CLI.

```bash
vercel buy credits v0 100
vercel buy pro
vercel buy domain example.com
```

[Learn more about the buy command](/docs/cli/buy)

### cache

Manage cache for your project (CDN cache, Runtime cache, and Data cache).

```bash
vercel cache purge
vercel cache purge --type cdn
vercel cache purge --type data
vercel cache invalidate --tag foo
vercel cache dangerously-delete --tag foo
```

[Learn more about the cache command](/docs/cli/cache)

### certs

Manage certificates for your domains.

```bash
vercel certs list
vercel certs issue [domain]
vercel certs delete [certificate-id]
```

[Learn more about the certs command](/docs/cli/certs)

### changelog

Read recent Vercel product updates or search the changelog by keyword.

```bash
vercel changelog
vercel changelog search "AI SDK"
vercel changelog --limit 10 --json
```

[Learn more about the changelog command](/docs/cli/changelog)

### ci

Enable or disable [Vercel CI](/docs/ci) for your repository, and inspect or rerun its jobs. Vercel CI is in Beta.

```bash
vercel ci ls
vercel ci inspect --wait
vercel ci logs --failed
vercel ci disable --remote origin
```

[Learn more about the ci command](/docs/cli/ci)

### comments

Review and manage existing [Vercel Toolbar comment threads](/docs/comments) from the terminal.

```bash
vercel comments
vercel comments inspect <thread>
vercel comments resolve <thread> --message 'Fixed in the latest deployment.'
```

[Learn more about the comments command](/docs/cli/comments)

### connect

Manage connectors: create, list, attach to projects, request runtime tokens, and remove them.

```bash
vercel connect create <service>
vercel connect list
vercel connect token <id>
vercel connect attach <id>
vercel connect detach <id>
vercel connect update <id>
vercel connect delete <id>
vercel connect open <id>
vercel connect contacts add <id> --phone-number +12025550123
```

Run `vercel connect create <service> --help` to see how you can connect to a specific service.

[Learn more about the connect command](/docs/cli/connect)

### crons

Manage [Cron Jobs](/docs/cron-jobs) for a project: add cron entries to `vercel.json`, list them, and trigger them on demand. This command is in beta.

```bash
vercel crons list
vercel crons add --path /api/cron --schedule "0 10 * * *"
vercel crons run /api/cron
```

[Learn more about the crons command](/docs/cli/crons)

### curl

Make HTTP requests to your Vercel deployments with automatic deployment protection bypass.

```bash
vercel curl [path]
vercel curl /api/hello
vercel curl /api/data --deployment [deployment-url]
```

[Learn more about the curl command](/docs/cli/curl)

### daemons

List and inspect production [Daemons](/docs/daemons), override instance counts, and restart individual instances.

```bash
vercel daemons list
vercel daemons inspect worker
vercel daemons instances list worker
```

[Learn more about the daemons command](/docs/cli/daemons)

### deploy

Deploy your Vercel projects. Default command when no subcommand is specified.

```bash
vercel
vercel deploy
vercel deploy --prod
```

[Learn more about the deploy command](/docs/cli/deploy)

### deploy-hooks

Manage [Deploy Hooks](/docs/deploy-hooks): list, create, and remove deploy hook URLs that trigger new deployments when called.

```bash
vercel deploy-hooks list
vercel deploy-hooks create cms-rebuild --git-branch main
vercel deploy-hooks delete hook_abc123
```

[Learn more about the deploy-hooks command](/docs/cli/deploy-hooks)

### dev

Replicate the Vercel deployment environment locally and test your project.

```bash
vercel dev
vercel dev --listen 3000
```

[Learn more about the dev command](/docs/cli/dev)

### dns

Manage your DNS records for your domains.

```bash
vercel dns list [domain]
vercel dns add [domain] [name] [type] [value]
vercel dns remove [record-id]
```

[Learn more about the dns command](/docs/cli/dns)

### doctor

Check your CLI setup and see how to fix each problem, without logging in or linking a project.

```bash
vercel doctor
vercel doctor --json
```

[Learn more about the doctor command](/docs/cli/doctor)

### domains

Buy, transfer, and manage your domains.

```bash
vercel domains list
vercel domains add [domain] [project]
vercel domains remove [domain]
vercel domains buy [domain]
vercel domains price [domain] [...domain]
vercel domains check [domain] [...domain]
```

[Learn more about the domains command](/docs/cli/domains)

### drains

Manage drains that forward logs, traces, Web Analytics, and Speed Insights data to external endpoints.

```bash
vercel drains list
vercel drains inspect drn_example --json
vercel drains create --name app-logs --type logs --url https://example.com/drain
```

[Learn more about the drains command](/docs/cli/drains)

### env

Manage environment variables in your Vercel Projects.

```bash
vercel env list
vercel env add [name] --environment [environment]
vercel env update [name] --environment [environment]
vercel env remove [name] --environment [environment]
vercel env pull [file]
vercel env run -- <command>
```

[Learn more about the env command](/docs/cli/env)

### environments

Manage custom environments and use the `--environment` option on relevant commands.

```bash
vercel environments list
vercel deploy --environment=staging
```

[Learn more about the environments command](/docs/cli/target)

### feedback

Send bugs, friction, and feature requests to the Vercel team without logging in or linking a project.

```bash
vercel feedback "The error didn't explain how to fix the issue"
vercel feedback --field product=cli --field type=bug --field actual="Unknown option: --preview"
```

[Learn more about the feedback command](/docs/cli/feedback)

### firewall

Manage your Vercel Firewall: view changes, publish, manage IP blocks, system bypass entries, custom rules, attack mode, and system mitigations.

```bash
vercel firewall overview
vercel firewall publish
vercel firewall ip-blocks block <ip>
vercel firewall rules list
vercel firewall attack-mode enable
```

[Learn more about the firewall command](/docs/cli/firewall)

### flags

Manage feature flags for your Vercel Project.

```bash
vercel flags list
vercel flags evaluations [flag]
vercel flags create [slug]
vercel flags versions [flag] --limit 10
vercel flags versions diff [flag] --revision [number]
vercel flags set [flag] --environment [environment] --variant [variant]
vercel flags segments list
vercel flags segments create beta-users --add include:user.id=user_123
vercel flags open [flag]
```

[Learn more about the flags command](/docs/cli/flags)

### git

Manage your Git provider connections.

```bash
vercel git connect
vercel git connect [git-url]
vercel git disconnect
```

[Learn more about the git command](/docs/cli/git)

### global-config

Manage [Global Config](/docs/global-config) stores: list, create, inspect, update, delete, and manage items, read tokens, and backups.

```bash
vercel global-config list
vercel global-config create flags
vercel global-config items flags --key betaUiEnabled
vercel global-config tokens flags --add "Production read"
vercel global-config backups flags
```

[Learn more about the global-config command](/docs/cli/global-config)

### guidance

Enable or disable guidance messages shown after CLI commands.

```bash
vercel guidance enable
vercel guidance disable
vercel guidance status
```

[Learn more about the guidance command](/docs/cli/guidance)

### health

Read the public Vercel platform status, active incidents, scheduled maintenance, and recently resolved incidents.

```bash
vercel health
vercel health --json
```

[Learn more about the health command](/docs/cli/health)

### help

Get information about all available Vercel CLI commands.

```bash
vercel help
vercel help [command]
```

[Learn more about the help command](/docs/cli/help)

### httpstat

Visualize HTTP request timing statistics for your Vercel deployments with automatic deployment protection bypass.

```bash
vercel httpstat [path]
vercel httpstat /api/hello
vercel httpstat /api/data --deployment [deployment-url]
```

[Learn more about the httpstat command](/docs/cli/httpstat)

### init

Initialize example Vercel Projects locally from the examples repository.

```bash
vercel init
vercel init [framework-name]
```

[Learn more about the init command](/docs/cli/init)

### inspect

Retrieve information about your Vercel deployments.

```bash
vercel inspect [deployment-id-or-url]
vercel inspect [deployment-id-or-url] --logs
vercel inspect [deployment-id-or-url] --wait
```

[Learn more about the inspect command](/docs/cli/inspect)

### install

Install a marketplace integration and provision a resource. Alias for `vercel integration add`.

```bash
vercel install <integration-name>
```

[Learn more about the install command](/docs/cli/install)

### integration

Manage marketplace integrations: provision resources, discover available integrations, view setup guides, check balances, and manage individual resources with the nested `resource` subcommand.

```bash
vercel integration add <integration-name> [--claim | --no-claim]
vercel integration list [project]
vercel integration discover
vercel integration guide <integration-name>
vercel integration balance <integration-name>
vercel integration open <integration-name> [resource-name]
vercel integration remove <integration-name>
vercel integration resource connect <resource-name> [project]
vercel integration resource disconnect <resource-name> [project]
vercel integration resource delete <resource-name>
vercel integration resource create-threshold <resource-name> <minimum> <spend> <limit>
vercel integration resource claim [resource-name]
```

[Learn more about the integration command](/docs/cli/integration)

### kms

Manage [Vercel KMS](/docs/kms) issuers, signing keys, and project grants. This command is in beta.

```bash
vercel kms list --scope my-team --json
vercel kms inspect iss_example --scope my-team --json
```

[Learn more about the kms command](/docs/cli/kms)

### link

Link a local directory to a Vercel Project, or add projects to an existing repository link.

```bash
vercel link
vercel link --cwd [path-to-directory]
vercel link --repo
vercel link add
```

[Learn more about the link command](/docs/cli/link)

### list

List recent deployments for the current Vercel Project.

```bash
vercel list
vercel list [project-name]
```

[Learn more about the list command](/docs/cli/list)

### login

Login to your Vercel account through CLI.

```bash
vercel login
```

[Learn more about the login command](/docs/cli/login)

### logout

Logout from your Vercel account through CLI.

```bash
vercel logout
```

[Learn more about the logout command](/docs/cli/logout)

### logs

Query runtime log entries and CDN request records for your project.

```bash
vercel logs
vercel logs requests
vercel logs --deployment [deployment-url]
```

[Learn more about the logs command](/docs/cli/logs)

### mcp

Set up MCP clients to use Vercel MCP.

```bash
vercel mcp
vercel mcp --project
```

[Learn more about the mcp command](/docs/cli/mcp)

### metrics

List and query metrics from your terminal, and inspect the schema to discover available dimensions and aggregations.

```bash
vercel metrics schema
vercel metrics schema <metric-or-prefix>
vercel metrics database.duration_ms --query 'plan:pro'
vercel metrics <metric_name> --since 7d --granularity 1d --project project-name --environment production
vercel metrics <metric_name> --all --group-by projectId --since 24h --environment production
```

[Learn more about the metrics command](/docs/cli/metrics)

### microfrontends

Work with microfrontends configuration.

```bash
vercel microfrontends pull
vercel microfrontends pull --deployment [deployment-id]
```

[Learn more about the microfrontends command](/docs/cli/microfrontends)

### monitors

Create, list, inspect, update, and delete monitors for a project or team, and manage their notification destinations. Replaces the deprecated `vercel alerts rules` commands.

```bash
vercel monitors ls
vercel monitors notifications
vercel monitors add --project my-app --body ./monitor.json
vercel monitors rm [monitor-id]
```

[Learn more about the monitors command](/docs/cli/monitors)

### open

Open your current project in the Vercel Dashboard.

```bash
vercel open
```

[Learn more about the open command](/docs/cli/open)

### organizations

Create and manage [organizations](/docs/organizations) and their child teams: list and inspect organizations, create an organization from a team, and create or add child teams.

```bash
vercel organizations list
vercel --scope acme organizations create --slug acme
vercel organizations teams create acme --slug acme-web --name "Acme Web"
```

[Learn more about the organizations command](/docs/cli/organizations)

### pricing

Look up Hobby, Pro, and Enterprise features from the public pricing table.

```bash
vercel pricing
vercel pricing "skew protection"
vercel pricing firewall --json
```

[Learn more about the pricing command](/docs/cli/pricing)

### project

List, create, inspect, delete, and manage your Vercel Projects.

```bash
vercel project list
vercel project create [project-name]
vercel project delete [project-name]
vercel project inspect [project-name]
vercel project keep [project-name] --scope [team-slug]
```

[Learn more about the project command](/docs/cli/project)

### promote

Promote an existing deployment to be the current deployment.

```bash
vercel promote [deployment-id-or-url]
vercel promote status [project]
```

[Learn more about the promote command](/docs/cli/promote)

### pull

Update your local project with remote environment variables and project settings.

```bash
vercel pull
vercel pull --environment=production
```

[Learn more about the pull command](/docs/cli/pull)

### redeploy

Rebuild and redeploy an existing deployment.

```bash
vercel redeploy [deployment-id-or-url]
```

[Learn more about the redeploy command](/docs/cli/redeploy)

### redirects

Manage project-level redirects.

```bash
vercel redirects list
vercel redirects add /old /new --status 301
vercel redirects import redirects.csv --force
vercel redirects promote <version-id>
```

[Learn more about the redirects command](/docs/cli/redirects)

### remove

Remove deployments either by ID or for a specific Vercel Project.

```bash
vercel remove [deployment-url]
vercel remove [project-name]
```

[Learn more about the remove command](/docs/cli/remove)

### rollback

Roll back production deployments to previous deployments.

```bash
vercel rollback
vercel rollback [deployment-id-or-url]
vercel rollback status [project]
```

[Learn more about the rollback command](/docs/cli/rollback)

### rolling-release

Manage your project's rolling releases to gradually roll out new deployments.

```bash
vercel rolling-release update --enable --advancement-type=manual-approval --stage=10 --stage=50
vercel rolling-release start --deployment=[deployment-id]
vercel rolling-release approve --deployment=[deployment-id] --currentStageIndex=[stage-index]
vercel rolling-release complete --deployment=[deployment-id]
```

[Learn more about the rolling-release command](/docs/cli/rolling-release)

### routes

Manage project-level routing rules for your Vercel Project.

```bash
vercel routes list
vercel routes add --ai "Rewrite /api/* to https://backend.internal/*"
vercel routes update "API Proxy" --dest "https://new-api.example.com/:path*"
vercel routes publish
```

[Learn more about the routes command](/docs/cli/routes)

### sandbox

Interact with [Vercel Sandbox](/docs/sandbox): list, create, connect, and manage sandboxes from the terminal. See the [Sandbox CLI Reference](/docs/sandbox/cli-reference) for the full surface.

```bash
vercel sandbox list
vercel sandbox create --connect
```

[Learn more about the sandbox command](/docs/cli/sandbox)

### schedules

Inspect and manage [Vercel Schedules](/docs/schedules) for a linked project. This command is in beta.

```bash
vercel schedules list
vercel schedules create daily-cleanup --cron "0 2 * * *" --topic scheduled-cleanup
vercel schedules invoke daily-cleanup
```

[Learn more about the schedules command](/docs/cli/schedules)

### security

Inspect the security posture of your Vercel team with checks against vulnerable misconfigurations and settings, and triage Security Review vulnerabilities.

```bash
vercel security
vercel security check --findings
vercel security check [check-name]
vercel security vulnerabilities
```

[Learn more about the security command](/docs/cli/security)

### setup

Set up coding agents for Vercel: install the Vercel plugin for Claude Code, Codex, and OpenCode, and connect your agents to AI Gateway.

```bash
vercel setup
vercel setup gateway
vercel setup --dry-run
```

[Learn more about the setup command](/docs/cli/setup)

### signup

Create a new Vercel account through CLI. Once sign-up is complete, you are signed in with the new account.

```bash
vercel signup
```

[Learn more about the signup command](/docs/cli/signup)

### skills

Discover agent skills relevant to your project, or search the skill catalog.

```bash
vercel skills
vercel skills nextjs
vercel skills nextjs --json
```

[Learn more about the skills command](/docs/cli/skills)

### storage

Manage storage resources and their project connections, including environment variables and Blob credentials.

```bash
vercel storage list
vercel storage status --all --json
vercel storage connect my-uploads --dry-run
```

[Learn more about the storage command](/docs/cli/storage)

### switch

Switch between different team scopes.

```bash
vercel switch
vercel switch [team-slug]
```

[Learn more about the switch command](/docs/cli/switch)

### teams

List, add, remove, and manage your teams.

```bash
vercel teams list
vercel teams create
vercel teams invite [email]
```

[Learn more about the teams command](/docs/cli/teams)

### telemetry

Enable or disable telemetry collection. Learn [what data Vercel CLI collects](/docs/cli/about-telemetry) and how to opt out.

```bash
vercel telemetry status
vercel telemetry enable
vercel telemetry disable
```

[Learn more about the telemetry command](/docs/cli/telemetry)

### token-pass

Configure supported coding agents to use Token Pass through AI Gateway.

```bash
vercel token-pass --agent opencode --dry-run
vercel token-pass setup --agent opencode --scope my-team --yes
```

[Learn more about the token-pass command](/docs/cli/token-pass)

### tokens

Manage your personal Vercel authentication tokens: list, create, and revoke API tokens.

```bash
vercel tokens list
vercel tokens create "CI deploy"
vercel tokens revoke tok_abc123
```

[Learn more about the tokens command](/docs/cli/tokens)

### traces

Inspect request traces for your project, and manage the sampling rules that decide which requests Vercel traces.

```bash
vercel traces inspect [request-id]
vercel traces [request-id]
vercel traces inspect [request-id] --open
vercel traces config ls
vercel traces config set 25 --environment production
vercel traces config remove --environment production
```

Open a trace directly in the tree or waterfall view:

```bash
vercel traces inspect [request-id] --open --view=tree
vercel traces inspect [request-id] --open --view=waterfall
```

[Learn more about the traces command](/docs/cli/traces)

### upgrade

Upgrade the Vercel CLI to the latest version and manage automatic updates.

```bash
vercel upgrade
vercel upgrade --dry-run
vercel upgrade --autoupdate
vercel upgrade --json
```

[Learn more about the upgrade command](/docs/cli/upgrade)

### vcr

Manage [Vercel Container Registry](/docs/container-registry) repositories, tags, and images from the terminal. See the [Container Registry CLI Reference](/docs/container-registry/cli-reference) for the full surface.

```bash
vercel vcr ls
vercel vcr login docker
```

[Learn more about the vcr command](/docs/cli/vcr)

### webhooks

Manage webhooks for your account.

```bash
vercel webhooks list
vercel webhooks inspect <id>
vercel webhooks create <url> --event <event>
vercel webhooks delete <id>
```

[Learn more about the webhooks command](/docs/cli/webhooks)

### whoami

Display the username of the currently logged in user.

```bash
vercel whoami
```

[Learn more about the whoami command](/docs/cli/whoami)

## Related guides

- [The Complete Guide to Vercel Connect](https://vercel.com/kb/guide/vercel-connect): Use Vercel Connect to call provider APIs like Slack, GitHub, Linear, Microsoft, Discord, Snowflake, and Salesforce from your agents and services with short-lived, scoped tokens instead of long-lived secrets.
- [Does Vercel support Docker deployments?](https://vercel.com/kb/guide/does-vercel-support-docker-deployments): Vercel supports deploying OCI-compatible container images through Vercel Functions and Vercel Container Registry, with Active CPU pricing and automatic scaling.
- [Build a fullstack app with Next.js 16 and Prisma Postgres](https://vercel.com/kb/guide/nextjs-prisma-postgres): Create a fullstack blog with the Next.js App Router, Prisma, Sign in with Vercel, Prisma Postgres from the Vercel Marketplace, and deploy it to Vercel.

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
