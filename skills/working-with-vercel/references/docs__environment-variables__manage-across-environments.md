---
title: Managing environment variables across environments
product: vercel
url: /docs/environment-variables/manage-across-environments
canonical_url: "https://vercel.com/docs/environment-variables/manage-across-environments"
last_updated: 2026-09-11
type: how-to
prerequisites:
  - /docs/environment-variables
related:
  - /docs/cli/project-linking
  - /docs/environment-variables/sensitive-environment-variables
  - /docs/cli/env
  - /docs/cli/pull
  - /docs/cli/target
summary: Add, sync, and verify environment variables across development, preview, production, and custom environments using the CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/environment-variables/manage-across-environments.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "bd519aa75960c41cac8b55453c26f97b7547a12f545e902812a5e18ad5778558"
---

# Managing environment variables across environments

Use this guide to manage environment variables across multiple environments. You'll audit what's configured, add variables to the right targets, handle sensitive values, and verify everything locally.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Full-stack previews on Vercel](https://vercel.com/kb/guide/full-stack-preview-deployments-on-vercel) — Learn how to use full-stack previews for your Vercel projects. Deploy Next.js, FastAPI, and a containerized Go service t
- [Environment Variables UI](https://vercel.com/blog/environment-variables-ui)
- [Environments Variables per Git branch](https://vercel.com/changelog/environments-variables-per-git-branch)
- [Environment variables now use Config and Secret types](https://vercel.com/changelog/environment-variables-now-use-config-and-secret-types)
- [How to set up a staging environment on Vercel](https://vercel.com/kb/guide/set-up-a-staging-environment-on-vercel) — Set up a staging environment on Vercel with custom environments, staged production deployments, or a branch-based previe
- [Managing environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables) — Learn how to create and manage environment variables for Vercel.
- [Environments](https://vercel.com/docs/deployments/environments) — Environments are for developing locally, testing changes in a pre-production environment, and serving end-users in produ
- [Environment Variables](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables) — Vercel MCP tools for environment variables.
- [Edit an environment variable](https://vercel.com/docs/rest-api/projects/edit-an-environment-variable) — PATCH /v9/projects/{idOrName}/env/{id} — Edit a specific environment variable for a given project by passing the environ
- [Shared environment variables](https://vercel.com/docs/environment-variables/shared-environment-variables) — Learn how to use Shared environment variables, which are environment variables that you define at the Team level and can

Full cross-link map for this page: [/docs/environment-variables/manage-across-environments.graph.md](/docs/environment-variables/manage-across-environments.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** This guide requires a [linked Vercel project](/docs/cli/project-linking). Run
> `vercel link` in your project directory if you haven't already.

## Quick reference

Use this block when you already know what you're doing and want the full command sequence. Use the steps below for context and checks.

```bash filename="terminal"
# 1. List available environments (including custom ones)
vercel environments list

# 2. Audit existing variables per environment
vercel env list --environment production
vercel env list --environment preview
vercel env list --environment development

# 3. Add variables to specific environments
vercel env add DATABASE_URL --environment production
vercel env add DATABASE_URL --environment preview

# 4. Add a Secret variable (write-only after saving)
vercel env add API_SECRET --environment production --sensitive

# 5. Add a branch-specific preview variable
vercel env add DATABASE_URL --environment preview --git-branch feature-branch

# 6. Pull environment variables locally to verify
vercel pull --environment=production
vercel pull --environment=preview --git-branch=feature-branch

# 7. Run a command with specific environment variables
vercel env run -e preview -- npm test
vercel env run -e production -- npm run build
```

> Install the [Vercel plugin](/docs/agent-resources/vercel-plugin?from=docs-callout\&source_path=%2Fdocs%2Fenvironment-variables%2Fmanage-across-environments) to audit environment variables across environments with your coding agent.
>
> ```bash
> npx plugins add vercel/vercel-plugin
> ```

## 1. List your environments

Check which environments are available for your project. This includes the default environments (production, preview, development) and any custom environments:

```bash filename="terminal"
vercel environments list
```

Custom environments let you create additional targets like `staging` or `qa` with their own environment variables.

## 2. Audit existing variables

Review what's currently configured in each environment to identify gaps or mismatches:

```bash filename="terminal"
vercel env list --environment production
```

```bash filename="terminal"
vercel env list --environment preview
```

```bash filename="terminal"
vercel env list --environment development
```

To check variables for a custom environment:

```bash filename="terminal"
vercel env list --environment staging
```

Compare the output across environments. Missing variables are a common cause of deployment failures where a preview works but production doesn't, or vice versa.

## 3. Add variables to specific environments

Add a variable to a single environment. The CLI reads the value from stdin, so it prompts you to enter it:

```bash filename="terminal"
vercel env add DATABASE_URL --environment production
```

To pipe a value in without the prompt:

```bash filename="terminal"
echo "postgres://user:pass@host/db" | vercel env add DATABASE_URL --environment production
```

To add the same variable to multiple environments, run the command for each one:

```bash filename="terminal"
vercel env add DATABASE_URL --environment preview
vercel env add DATABASE_URL --environment development
```

## 4. Add Secret variables

For credentials like API keys and tokens, use `--sensitive` or `--type secret`. Secret values are write-only after saving in the dashboard.

```bash filename="terminal"
vercel env add API_SECRET --environment production --sensitive --yes
```

Secrets are now allowed in Development. This reverses the earlier rule that limited Sensitive variables to Production and Preview.

```bash filename="terminal"
vercel env add DEV_API_SECRET --environment development --sensitive --yes
```

For non-sensitive configuration that stays readable after saving, use `--no-sensitive` or `--type config`. See [Config and Secret environment variables](/docs/environment-variables/sensitive-environment-variables) for type behavior and team policies.

## 5. Add branch-specific variables

For preview deployments, you can set variables that only apply to a specific Git branch. This is useful for testing against a different database or API endpoint on a feature branch:

```bash filename="terminal"
vercel env add DATABASE_URL --environment preview --git-branch feature-branch
```

This variable only applies to preview deployments triggered from the `feature-branch` branch. Other preview deployments use the default preview variable.

## 6. Update existing variables

To change the value of an existing variable:

```bash filename="terminal"
vercel env update DATABASE_URL --environment production
```

You can also pipe the new value:

```bash filename="terminal"
cat ~/.npmrc | vercel env update NPM_RC --environment preview --yes
```

## 7. Pull and verify locally

Pull environment variables to your local machine to verify they're set correctly:

```bash filename="terminal"
vercel pull --environment=production
```

For preview variables with a specific branch:

```bash filename="terminal"
vercel pull --environment=preview --git-branch=feature-branch
```

This writes the variables to `.vercel/.env.preview.local` (or the equivalent for your target environment). Check the file to confirm the values are correct.

## 8. Run commands with environment variables

Test your app locally using the environment variables from a specific environment without writing them to a file:

```bash filename="terminal"
vercel env run -e preview -- npm test
```

```bash filename="terminal"
vercel env run -e production -- npm run build
```

For branch-specific variables:

```bash filename="terminal"
vercel env run -e preview --git-branch feature-branch -- npm run dev
```

## When you need to remove a variable

To remove an environment variable from a specific environment:

```bash filename="terminal"
vercel env remove DATABASE_URL --environment production
```

This prompts for confirmation. Use `--yes` to skip the prompt in automated workflows:

```bash filename="terminal"
vercel env remove DATABASE_URL --environment production --yes
```

## Related

- [vercel env](/docs/cli/env)
- [vercel pull](/docs/cli/pull)
- [vercel environments](/docs/cli/target)
- [Environment variables overview](/docs/environment-variables)
- [Deploying a project from the CLI](/docs/projects/deploy-from-cli)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
