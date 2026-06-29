---
title: Vercel CLI Overview
product: vercel
url: /docs/cli
canonical_url: "https://vercel.com/docs/cli"
last_updated: 2026-06-22
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
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "e1dc1efcf909aa9c646832f5e85a440a907e13b92edca0b1445c6aee3a21932e"
---

# Vercel CLI Overview

Vercel gives you multiple ways to interact with and configure your Vercel Projects. With the command-line interface (CLI) you can interact with the Vercel platform using a terminal, or through an automated system, enabling you to [retrieve logs](/docs/cli/logs), manage [certificates](/docs/cli/certs), replicate your deployment environment [locally](/docs/cli/dev), manage Domain Name System (DNS) [records](/docs/cli/dns), and more.

If you'd like to interface with the platform programmatically, check out the [REST API documentation](/docs/rest-api).

## Installing Vercel CLI

To download and install Vercel CLI, run the following command:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i vercel
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i vercel
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i vercel
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i vercel
    ```
  </Code>
</CodeBlock>

## Updating Vercel CLI

When there is a new release of Vercel CLI, running any command will show you a message letting you know that an update is available.

If you have installed our command-line interface through [npm](http://npmjs.org/) or [Yarn](https://yarnpkg.com), the easiest way to update it is by running the installation command yet again.

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i vercel
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i vercel
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i vercel
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i vercel
    ```
  </Code>
</CodeBlock>

If you see permission errors, please read npm's [official guide](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally). Yarn depends on the same configuration as npm.

## Checking the version

The `--version` option can be used to verify the version of Vercel CLI currently being used.

```bash filename="terminal"
vercel --version
```

*Using the \`vercel\` command with the \`--version\` option.*

## Using in a CI/CD environment

Vercel CLI requires you to log in and authenticate before accessing resources or performing administrative tasks. In a terminal environment, you can use [`vercel login`](/docs/cli/login), which requires manual input. In a CI/CD environment where manual input is not possible, you can create a token on your [tokens page](/account/tokens) and then authenticate using one of these methods:

- Set the `VERCEL_TOKEN` environment variable
- Pass the [`--token` option](/docs/cli/global-options#token) to the command

Using the `VERCEL_TOKEN` environment variable is recommended for CI/CD because it avoids exposing the token in command-line arguments, which can be visible in process lists and logs. If both are provided, the `--token` flag takes precedence over the environment variable.

## Experimental native CLI binaries

Native CLI binaries are also available as an experimental opt-in install.

Native CLI binaries can reduce setup in environments where installing and maintaining Node.js is unnecessary or inconvenient, including lightweight containers, CI jobs, or managed developer workspaces.

To install the native binary, run:

```bash filename="terminal"
pnpm i -g @vercel/vc-native -f
```

The `-f` flag is required because the native package installs the same global bin names as the standard CLI. It allows pnpm to replace existing global `vercel` and `vc` bin links. Once installed, `vercel` and `vc` run the native binary matched to your OS and CPU architecture, across macOS, Linux, and Windows on x64 and arm64.

Platform-specific packages are also available when you need a specific binary:

```bash filename="terminal"
pnpm i -g @vercel/vc-native-darwin-x64 -f
```

## Available Commands

### activity

View activity events for your Vercel project or team, filtered by type, date range, and project.

```bash
vercel activity
vercel activity ls --all --since 30d
vercel activity ls --type deployment --since 7d
```

[Learn more about the activity command](/docs/cli/activity)

### agent

Generate an `AGENTS.md` file in the current project with Vercel deployment best practices for coding agents.

```bash
vercel agent init
vercel agent init --yes
```

[Learn more about the agent command](/docs/cli/agent)

### ai-gateway

Manage [AI Gateway](/docs/ai-gateway) resources, including API keys, from the CLI.

```bash
vercel ai-gateway api-keys create
vercel ai-gateway api-keys create --name my-key --budget 500 --refresh-period monthly
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
vercel alias rm [custom-domain]
vercel alias ls
```

[Learn more about the alias command](/docs/cli/alias)

### api

Make authenticated HTTP requests to the Vercel API from your terminal. This is a beta command.

```bash
vercel api [endpoint]
vercel api /v2/user
vercel api /v9/projects -X POST -F name=my-project
```

[Learn more about the api command](/docs/cli/api)

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
vercel blob put [path-to-file]
vercel blob get [url-or-pathname]
vercel blob del [url-or-pathname]
vercel blob copy [from-url] [to-pathname]
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
vercel buy addon siem 1
vercel buy pro
vercel buy domain example.com
```

[Learn more about the buy command](/docs/cli/buy)

### cache

Manage cache for your project (CDN cache and Data cache).

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
vercel certs ls
vercel certs issue [domain]
vercel certs rm [certificate-id]
```

[Learn more about the certs command](/docs/cli/certs)

### connect

Manage connectors: create, list, attach to projects, request runtime tokens, and remove them. This is a beta command.

```bash
vercel connect create <type>
vercel connect list
vercel connect token <id>
vercel connect attach <id>
vercel connect detach <id>
vercel connect update <id>
vercel connect remove <id>
vercel connect open <id>
```

[Learn more about the connect command](/docs/cli/connect)

### contract

View contract commitment information for your Vercel account.

```bash
vercel contract
vercel contract --format json
```

[Learn more about the contract command](/docs/cli/contract)

### crons

Manage [Cron Jobs](/docs/cron-jobs) for a project: add cron entries to `vercel.json`, list them, and trigger them on demand. This command is in beta.

```bash
vercel crons ls
vercel crons add --path /api/cron --schedule "0 10 * * *"
vercel crons run /api/cron
```

[Learn more about the crons command](/docs/cli/crons)

### curl

Make HTTP requests to your Vercel deployments with automatic deployment protection bypass. This is a beta command.

```bash
vercel curl [path]
vercel curl /api/hello
vercel curl /api/data --deployment [deployment-url]
```

[Learn more about the curl command](/docs/cli/curl)

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
vercel deploy-hooks ls
vercel deploy-hooks create cms-rebuild --ref main
vercel deploy-hooks rm hook_abc123
```

[Learn more about the deploy-hooks command](/docs/cli/deploy-hooks)

### dev

Replicate the Vercel deployment environment locally and test your project.

```bash
vercel dev
vercel dev --port 3000
```

[Learn more about the dev command](/docs/cli/dev)

### dns

Manage your DNS records for your domains.

```bash
vercel dns ls [domain]
vercel dns add [domain] [name] [type] [value]
vercel dns rm [record-id]
```

[Learn more about the dns command](/docs/cli/dns)

### domains

Buy, sell, transfer, and manage your domains.

```bash
vercel domains ls
vercel domains add [domain] [project]
vercel domains rm [domain]
vercel domains buy [domain]
vercel domains price [domain] [...domain]
vercel domains check [domain] [...domain]
```

[Learn more about the domains command](/docs/cli/domains)

### edge-config

Manage [Edge Config](/docs/edge-config) stores: list, create, inspect, update, remove, and manage items, read tokens, and backups.

```bash
vercel edge-config list
vercel edge-config add flags
vercel edge-config items flags --key betaUiEnabled
vercel edge-config tokens flags --add "Production read"
vercel edge-config backups flags
```

[Learn more about the edge-config command](/docs/cli/edge-config)

### env

Manage environment variables in your Vercel Projects.

```bash
vercel env ls
vercel env add [name] [environment]
vercel env update [name] [environment]
vercel env rm [name] [environment]
vercel env pull [file]
vercel env run -- <command>
```

[Learn more about the env command](/docs/cli/env)

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
vercel flags create [slug]
vercel flags set [flag] --environment [environment] --variant [variant]
vercel flags segments ls
vercel flags segments create beta-users --add include:user.id=user_123
vercel flags open [flag]
```

[Learn more about the flags command](/docs/cli/flags)

### git

Manage your Git provider connections.

```bash
vercel git ls
vercel git connect
vercel git disconnect [provider]
```

[Learn more about the git command](/docs/cli/git)

### guidance

Enable or disable guidance messages shown after CLI commands.

```bash
vercel guidance enable
vercel guidance disable
vercel guidance status
```

[Learn more about the guidance command](/docs/cli/guidance)

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
vercel init [project-name]
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
vercel integration resource remove <resource-name>
vercel integration resource create-threshold <resource-name> <minimum> <spend> <limit>
vercel integration resource claim [resource-name]
```

The `resource` subcommand is also available as `vercel integration-resource <subcommand>` and `vc ir <subcommand>` (backward-compatible aliases).

[Learn more about the integration command](/docs/cli/integration)

### link

Link a local directory to a Vercel Project.

```bash
vercel link
vercel link [path-to-directory]
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
vercel login [email]
vercel login --github
```

[Learn more about the login command](/docs/cli/login)

### logout

Logout from your Vercel account through CLI.

```bash
vercel logout
```

[Learn more about the logout command](/docs/cli/logout)

### logs

List runtime logs for a specific deployment.

```bash
vercel logs [deployment-url]
vercel logs [deployment-url] --follow
```

[Learn more about the logs command](/docs/cli/logs)

### mcp

Set up MCP client configuration for your Vercel Project.

```bash
vercel mcp
vercel mcp --project
```

[Learn more about the mcp command](/docs/cli/mcp)

### metrics

Query metrics from your terminal and inspect the schema to discover the metrics, dimensions, and aggregations available to your account.

```bash
vercel metrics schema
vercel metrics schema <metric-or-prefix>
vercel metrics <metric-id> --since 7d --granularity 1d --project project-name --prod
vercel metrics <metric-id> --all --group-by project_id --since 24h --prod
```

[Learn more about the metrics command](/docs/cli/metrics)

### microfrontends

Work with microfrontends configuration.

```bash
vercel microfrontends pull
vercel microfrontends pull --dpl [deployment-id]
```

[Learn more about the microfrontends command](/docs/cli/microfrontends)

### oauth-apps

Register Vercel Apps (OAuth) and manage team installations: register new apps, list and dismiss installation requests, install apps with permissions, and uninstall them.

```bash
vercel oauth-apps list-requests
vercel oauth-apps register --name "My App" --slug my-app --redirect-uri https://app.example.com/oauth/callback
vercel oauth-apps install --client-id cl_abc --permission read:project
vercel oauth-apps remove inst_abc123 --yes
```

[Learn more about the oauth-apps command](/docs/cli/oauth-apps)

### open

Open your current project in the Vercel Dashboard.

```bash
vercel open
```

[Learn more about the open command](/docs/cli/open)

### project

List, add, inspect, remove, and manage your Vercel Projects.

```bash
vercel project ls
vercel project add
vercel project rm
vercel project inspect [project-name]
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
vercel redirects upload redirects.csv --overwrite
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
vercel rolling-release configure --cfg='[config]'
vercel rolling-release start --dpl=[deployment-id]
vercel rolling-release approve --dpl=[deployment-id]
vercel rolling-release complete --dpl=[deployment-id]
```

[Learn more about the rolling-release command](/docs/cli/rolling-release)

### routes

Manage project-level routing rules for your Vercel Project.

```bash
vercel routes list
vercel routes add --ai "Rewrite /api/* to https://backend.internal/*"
vercel routes edit "API Proxy" --dest "https://new-api.example.com/:path*"
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

### skills

Discover agent skills relevant to your project, or search the skill catalog.

```bash
vercel skills
vercel skills nextjs
vercel skills nextjs --json
```

[Learn more about the skills command](/docs/cli/skills)

### switch

Switch between different team scopes.

```bash
vercel switch
vercel switch [team-name]
```

[Learn more about the switch command](/docs/cli/switch)

### target

Manage custom environments (targets) and use the `--target` flag on relevant commands.

```bash
vercel target list
vercel target ls
vercel deploy --target=staging
```

[Learn more about the target command](/docs/cli/target)

### teams

List, add, remove, and manage your teams.

```bash
vercel teams list
vercel teams add
vercel teams invite [email]
```

[Learn more about the teams command](/docs/cli/teams)

### telemetry

Enable or disable telemetry collection.

```bash
vercel telemetry status
vercel telemetry enable
vercel telemetry disable
```

[Learn more about the telemetry command](/docs/cli/telemetry)

### tokens

Manage your personal Vercel authentication tokens: list, create, and revoke API tokens.

```bash
vercel tokens ls
vercel tokens add "CI deploy"
vercel tokens rm tok_abc123
```

[Learn more about the tokens command](/docs/cli/tokens)

### traces

Inspect request traces for your project.

```bash
vercel traces get [request-id]
vercel traces [request-id]
vercel traces get [request-id] --open
```

[Learn more about the traces command](/docs/cli/traces)

### upgrade

Upgrade the Vercel CLI to the latest version and manage automatic updates.

```bash
vercel upgrade
vercel upgrade --dry-run
vercel upgrade --enable-auto
vercel upgrade --format=json
```

[Learn more about the upgrade command](/docs/cli/upgrade)

### usage

View billing usage and costs for your Vercel account.

```bash
vercel usage
vercel usage --from 2025-01-01 --to 2025-01-31
vercel usage --breakdown daily
```

[Learn more about the usage command](/docs/cli/usage)

### webhooks

Manage webhooks for your account. This command is in beta.

```bash
vercel webhooks list
vercel webhooks get <id>
vercel webhooks create <url> --event <event>
vercel webhooks rm <id>
```

[Learn more about the webhooks command](/docs/cli/webhooks)

### whoami

Display the username of the currently logged in user.

```bash
vercel whoami
```

[Learn more about the whoami command](/docs/cli/whoami)


---

[View full sitemap](/docs/sitemap)
