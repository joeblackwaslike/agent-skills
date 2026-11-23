---
title: Vercel CI Environment Variables
product: vercel
url: /docs/ci/environment-variables
canonical_url: "https://vercel.com/docs/ci/environment-variables"
last_updated: 2026-10-28
type: how-to
prerequisites:
  - /docs/ci
related:
  []
summary: Manage environment variables and secrets for Vercel CI runs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ci/environment-variables.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "f2dffff05fe1027b2f6c9142021a70a2a0550de29cf764ce217359306a505ba5"
---

# Vercel CI Environment Variables

Use repository CI environment variables for secrets and values scoped to one repository. Use Shared Environment Variables to reuse a value across repositories. Use constants in `vercel.json` for non-secret values that you want to commit with your code.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel](https://turborepo.dev/docs/guides/ci-vendors/vercel) — Deploy your Turborepo on Vercel and run tasks with Vercel CI using zero-config Remote Caching.
- [Managing environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables) — Learn how to create and manage environment variables for Vercel.
- [Environment variables](https://vercel.com/docs/environment-variables) — Learn more about environment variables on Vercel.
- [Managing environment variables across environments](https://vercel.com/docs/environment-variables/manage-across-environments) — Add, sync, and verify environment variables across development, preview, production, and custom environments using the C
- [Config and Secret environment variables](https://vercel.com/docs/environment-variables/sensitive-environment-variables) — Choose Config or Secret environment variables based on whether their values should remain readable after saving.
- [Shared environment variables](https://vercel.com/docs/environment-variables/shared-environment-variables) — Learn how to use Shared environment variables, which are environment variables that you define at the Team level and can

Full cross-link map for this page: [/docs/ci/environment-variables.graph.md](/docs/ci/environment-variables.graph.md)
<!-- /docsgraph:related -->

If you're moving from GitHub Actions, follow the [migration guide](/kb/guide/github-actions-to-vercel-ci) to map repository secrets, organization secrets, and workflow `env` values to Vercel CI.

## Make variables available to your tasks

Vercel CI runs each task with Turborepo. By default, Turborepo uses [Strict Mode](https://turborepo.dev/docs/crafting-your-repository/using-environment-variables#strict-mode), which removes every environment variable that your `turbo.json` doesn't list. A variable you add to Vercel CI doesn't reach your task until you list it.

Add each variable your task reads to the task's `env` key:

```json filename="turbo.json" {5}
{
  "tasks": {
    "test": {
      "tags": ["ci"],
      "env": ["API_TOKEN"]
    }
  }
}
```

- Variables in `env` are part of the task's hash, so changing their value causes a cache miss. To pass a variable without changing the hash, use `passThroughEnv` instead.
- Use `globalEnv` or `globalPassThroughEnv` for variables that every task needs.
- This doesn't apply to dependency installation. `ci.bootstrapping.installEnv` values reach your install command directly.

## Add a repository CI environment variable

1. Open [**CI environment variables**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fenvironment-variables%3Fview%3Dci) in the Vercel dashboard.
2. Select the repository that should receive the variable.
3. Select **Add Variable**.
4. Enter the key and value. Select **Secret** for sensitive values that should be write-only.
5. Select **Add Variable**.

Vercel CI makes the variable available to later runs for that repository.

## Install private npm packages

Add a repository CI environment variable named `NPM_RC`. Select **Secret**, then enter your complete npm configuration as its value:

```ini
//registry.npmjs.org/:_authToken=your_access_token_here
```

Vercel CI writes `NPM_RC` to `$HOME/.npmrc` while installing dependencies, then removes the file. For a custom registry, update the registry hostname and add any required scope configuration.

## Reuse a Shared Environment Variable

To use the same value across repositories, create or edit a Shared Environment Variable from the **Shared** tab. Include the **Preview** environment, then select each repository under **Link to CI (Optional)**.

## Add constants in `vercel.json`

Add a `ci` key to the `vercel.json` file at the root of your repository. Use `ci.bootstrapping.installEnv` for values needed while installing dependencies. Use `ci.tasks` to assign values to a task name or a specific `package#task` selector:

```json filename="vercel.json" {6-8}
{
  "ci": {
    "bootstrapping": {
      "installEnv": {
        "NODE_OPTIONS": {
          "constant": {
            "value": "--max-old-space-size=4096"
          }
        }
      }
    }
  }
}
```

Constants in `vercel.json` override linked Shared Environment Variables with the same key. Do not commit secrets to `vercel.json`.

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
