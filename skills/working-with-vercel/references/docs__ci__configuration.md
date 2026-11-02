---
title: Vercel CI Configuration Reference
product: vercel
url: /docs/ci/configuration
canonical_url: "https://vercel.com/docs/ci/configuration"
last_updated: 2026-10-28
type: reference
prerequisites:
  - /docs/ci
related:
  - /docs/ci/image
  - /docs/deployment-protection
  - /docs/ci/guides/end-to-end-tests
  - /docs/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources
summary: Reference for the turbo.json tags and vercel.json keys that configure Vercel CI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ci/configuration.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "8ec6ee72bd1912f80dc95b7d33c39c657dbb10d2fedb941b1eb7577cdb53b8b1"
---

# Vercel CI Configuration Reference

## Creating task dependencies

Tasks that are tagged to run in CI will have their dependencies run in CI, too.

```json filename="turbo.json" {8}
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"],
      "tags": ["ci"]
    }
  }
}
```

Using [Turborepo's task composition rules](https://turborepo.dev/docs/crafting-your-repository/configuring-tasks#depending-on-tasks-in-dependencies-with-), Vercel CI will run the `build` tasks that a `test` task depends on before executing the `test` task.

You can also set the `ci` tag in a [Package Configuration](https://turborepo.dev/docs/reference/package-configurations).

```json filename="packages/web/turbo.json" {5}
{
  "extends": ["//"],
  "tasks": {
    "test": {
      "tags": ["ci"]
    }
  }
}
```

This runs that task for the package even when the root `turbo.json` does not enable it, giving you the power to compose your CI declarations.

## Excluding tasks

Add the `!ci` tag to keep a task from being selected to run in Vercel CI. The `!ci` tag takes precedence over the `ci` tag, so a task with both tags doesn't run.

Use `!ci` in a [Package Configuration](https://turborepo.dev/docs/reference/package-configurations) to opt one package out of a task that the root `turbo.json` runs in CI. In the example below, the root `turbo.json` runs `test` for every package:

```json filename="turbo.json" {4}
{
  "tasks": {
    "test": {
      "tags": ["ci"]
    }
  }
}
```

The package's `turbo.json` excludes its own `test` task:

```json filename="packages/legacy/turbo.json" {5}
{
  "extends": ["//"],
  "tasks": {
    "test": {
      "tags": ["!ci"]
    }
  }
}
```

Vercel CI runs `test` for every package except `packages/legacy`.

`!ci` doesn't remove a task from the dependencies of other tasks. If a task that runs in Vercel CI depends on a task tagged `!ci`, Vercel CI still runs the dependency first.

## Resource sizing

Vercel CI assigns 2 CPUs and 4 GB of memory to each task by default.

Add a `ci:cpus:<count>` tag to assign up to 32 CPUs to a task:

```json filename="turbo.json" {4}
{
  "tasks": {
    "test": {
      "tags": ["ci", "ci:cpus:8"]
    }
  }
}
```

Memory resources are assigned at 2 GB per CPU:

| CPUs | Memory |
| ---- | ------ |
| 1    | 2 GB   |
| 2    | 4 GB   |
| 4    | 8 GB   |
| 8    | 16 GB  |
| 16   | 32 GB  |
| 32   | 64 GB  |

To change the CPU allocation for one package, add the tag in that package's [Package Configuration](https://turborepo.dev/docs/reference/package-configurations). Start the `tags` array with `$TURBO_EXTENDS$` so the task keeps the `ci` tag from the root `turbo.json`:

```json filename="packages/web/turbo.json" {5}
{
  "extends": ["//"],
  "tasks": {
    "test": {
      "tags": ["$TURBO_EXTENDS$", "ci:cpus:16"]
    }
  }
}
```

### Bootstrapping resources

Before your tasks run, Vercel CI bootstraps each run by cloning your repository and installing its dependencies. The install step uses 4 CPUs and 8 GB of memory by default.

If dependency installation is slow or runs out of memory, set `ci.bootstrapping.resources.vcpus` in the `vercel.json` file at the root of your repository:

```json filename="vercel.json" {5-7}
{
  "ci": {
    "bootstrapping": {
      "installEnv": {},
      "resources": {
        "vcpus": 16
      }
    }
  }
}
```

- `vcpus` must be a whole number from 1 to 32.
- Memory is assigned at 2 GB per CPU, so this example requests 16 CPUs and 32 GB of memory.
- This setting only applies to dependency installation. It doesn't change the resources assigned to your tasks.
- An invalid `resources` value makes your `ci` configuration invalid. Vercel CI will ignore your configuration.

## Installing additional tools

To install a tool that your package manager doesn't provide, set `ci.bootstrapping.installCommand` in `vercel.json`. Before you install a tool, check whether the image already includes it. See [Pre-installed software](/docs/ci/image#pre-installed-software) for the full list.

Your install command doesn't run on the same instance as your tasks. Vercel CI handles each run in these steps:

1. During bootstrapping, Vercel CI clones your repository and runs the install command on a separate instance that always uses the Amazon Linux image.
2. Vercel CI saves a copy of your repository directory, including everything the install command added to it.
3. Each task runs on its own instance, starting from that copy.

A tool reaches your tasks only if the install command puts it inside your repository directory. The tool must also work on the image your task uses, so if your task uses the Ubuntu image, install a build that runs on both images.

The install command replaces the default dependency install, so it must also install your dependencies. In this example, the install command installs dependencies with pnpm, then runs a script that downloads [ShellCheck](https://www.shellcheck.net/):

```json filename="vercel.json" {4}
{
  "ci": {
    "bootstrapping": {
      "installCommand": "pnpm install --frozen-lockfile && sh scripts/install-ci-tools.sh",
      "installEnv": {}
    }
  }
}
```

The script downloads ShellCheck into a `.bin` directory in your repository:

```bash filename="scripts/install-ci-tools.sh"
set -eu
mkdir -p .bin
curl -fsSL https://github.com/koalaman/shellcheck/releases/download/v0.11.0/shellcheck-v0.11.0.linux.x86_64.tar.xz \
  | tar -xJ --strip-components=1 -C .bin shellcheck-v0.11.0/shellcheck
```

Your tasks can then run the tool from that directory:

```json filename="package.json"
{
  "scripts": {
    "lint:shell": "./.bin/shellcheck scripts/*.sh"
  }
}
```

- The install command runs from the root of your repository, or from your project's root directory if you've set one.
- Your tasks only receive files inside your repository. Files the install command writes anywhere else, like your home directory, aren't available to your tasks. This includes system packages that you install with `dnf` or `apt-get`.
- When you set `ci.bootstrapping`, you must also set `ci.bootstrapping.installEnv`, even if it's empty.
- Add `.bin` to your `.gitignore` file so you don't commit the downloaded tool.

## Testing against your deployments

A task can wait for the Vercel deployment of your commit, then send requests to it, for example to run end-to-end tests. Vercel CI authenticates those requests with an OpenID Connect (OIDC) token, so they work even when the deployment uses [Deployment Protection](/docs/deployment-protection).

For a complete Playwright example, see [Running end-to-end tests](/docs/ci/guides/end-to-end-tests).

### Depend on a deployment

Add `<package>#deployment` to the task's `dependsOn`, and add the `ci:oidc:deployments` tag. In the example below, the `test:e2e` task in `apps/web` waits for the `web` package's deployment:

```json filename="apps/web/turbo.json" {5-7}
{
  "extends": ["//"],
  "tasks": {
    "test:e2e": {
      "dependsOn": ["web#deployment"],
      "tags": ["ci", "ci:oidc:deployments"],
      "passThroughEnv": ["VERCEL_DEPLOYMENT_URLS"]
    }
  }
}
```

- Vercel CI resolves `web#deployment` to the Vercel project connected to your repository whose root directory is the `web` package's directory. Exactly one project must match.
- The task starts after that deployment succeeds. You don't need to define a `deployment` task in `turbo.json`.
- A task with `ci:oidc:deployments` must depend on its own package's deployment.

> **💡 Note:** Vercel CI only treats `<package>#deployment` as a Vercel deployment when the
> package has no `deployment` script in its `package.json`. If the package has
> one, Vercel CI runs that script like any other task instead of waiting for
> the Vercel deployment. Tasks that depend on it don't receive
> `VERCEL_DEPLOYMENT_URLS`, and tasks with `ci:oidc:deployments` fail. To use
> deployment dependencies, rename the script.

### Send requests to the deployment

Vercel CI gives the task these environment variables:

| Variable                    | Value                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------- |
| `VERCEL_DEPLOYMENT_URLS`    | A JSON object that maps each package name to its deployment's hostname                |
| `VERCEL_DEPLOYMENT_TARGETS` | A JSON object that maps each package name to `production` or `preview`               |

Turborepo filters environment variables, so add the variables your task reads to its `passThroughEnv`, as shown in the example above.

When the task sends a request to its own package's deployment hostname, Vercel CI adds the OIDC token in the `x-vercel-trusted-oidc-idp-token` header. You don't need to handle the token yourself. The token isn't available in an environment variable, and Vercel CI doesn't send it to other hosts, including the deployment's aliases and custom domains.

The task also receives the environment variables of its deployment's project, limited to the variables its `env` and `passThroughEnv` allow.

Deployments built from the same repository and Vercel team trust Vercel CI automatically. For deployments from another repository, add a [Trusted Sources](/docs/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources) rule for Vercel CI.

### Call other projects

To send the token to production deployments of other projects on your team, add up to five `ci:oidc:project:<project-id>` tags alongside `ci:oidc:deployments`:

```json filename="apps/web/turbo.json" {9}
{
  "extends": ["//"],
  "tasks": {
    "test:e2e": {
      "dependsOn": ["web#deployment"],
      "tags": [
        "ci",
        "ci:oidc:deployments",
        "ci:oidc:project:prj_123456789"
      ],
      "passThroughEnv": ["VERCEL_DEPLOYMENT_URLS", "VERCEL_OIDC_PROJECT_URLS"]
    }
  }
}
```

- `VERCEL_OIDC_PROJECT_URLS` maps each project ID to the hostname of its current production deployment. Vercel CI only sends the token to that hostname.
- Each project's production deployment must be ready. If it isn't, the task fails with a configuration error.
- A project built from another repository needs a Trusted Sources rule that trusts Vercel CI for production.

### Turn OIDC off

Add `ci:oidc:none` to a task to turn OIDC off for that task. A task's `ci:oidc` tags take precedence over the `ci:oidc` tags in its package's top-level `tags`.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
