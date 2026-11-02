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
source: "https://vercel.com/docs/ci/environment-variables.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "688fc81fd37530331389b07034c684d10bf505922e2ada71c1ba5ab5417bc89a"
---

# Vercel CI Environment Variables

Use repository CI environment variables for secrets and values scoped to one repository. Use Shared Environment Variables to reuse a value across repositories. Use constants in `vercel.json` for non-secret values that you want to commit with your code.

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


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
