---
title: Monorepos FAQ
product: vercel
url: /docs/monorepos/monorepo-faq
canonical_url: "https://vercel.com/docs/monorepos/monorepo-faq"
last_updated: 2026-07-01
type: reference
prerequisites:
  - /docs/monorepos
related:
  - /docs/builds/managing-builds
  - /docs/project-configuration/vercel-json
  - /docs/cli/project-linking
  - /docs/cli/global-options
  - /docs/environment-variables
summary: Learn the answer to common questions about deploying monorepos on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/monorepos/monorepo-faq.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "18db1ca63ebdebc96095fd24c60696b266ac7b819dad4e640fd4cdb8b76a13c9"
---

# Monorepos FAQ

## How can I speed up builds?


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel](https://turborepo.dev/docs/guides/ci-vendors/vercel?from=related) — Deploy your Turborepo on Vercel with zero-config Remote Caching.
- [Deploying a Monorepo Using Yarn Workspaces to Vercel](https://vercel.com/kb/guide/deploying-yarn-monorepos-to-vercel?from=related) — In this guide, you will deploy a monorepo that includes two frontend applications and one shared library with Yarn works
- [How can I serve multiple projects under a single domain?](https://vercel.com/kb/guide/how-can-i-serve-multiple-projects-under-a-single-domain?from=related) — Learn how to serve multiple Vercel projects from a single domain.
- [Nx](https://vercel.com/docs/monorepos/nx?from=related) — Nx is an extensible build system with support for monorepos, integrations, and Remote Caching on Vercel. Learn how to de
- [Builds](https://vercel.com/docs/builds?from=related) — Understand how the build step works when creating a Vercel Deployment.
- [Build Features](https://vercel.com/docs/builds/build-features?from=related) — Learn how to customize your deployments using Vercel's build features.
- [Project Settings](https://vercel.com/docs/project-configuration/project-settings?from=related) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,
- [Projects](https://vercel.com/docs/projects?from=related) — A project is the application that you have deployed to Vercel.

Full cross-link map for this page: [/docs/monorepos/monorepo-faq.graph.md](/docs/monorepos/monorepo-faq.graph.md)
<!-- /docsgraph:related -->

Whether or not your deployments are queued depends on the amount of
Concurrent Builds you have available. Hobby plans are limited to 1
Concurrent Build, while Pro or Enterprise plans can customize the amount
on the "Billing" page in the team settings.

Learn more about [Concurrent Builds](/docs/builds/managing-builds).

## How can I make my projects available on different paths under the same domain?

After having set up your monorepo as described above, each of the
directories will be a separate Vercel project, and therefore be available
on a separate domain.

If you'd like to host multiple projects under a single domain, you can
create a new project, assign the domain in the project settings, and proxy
requests to the other upstream projects. The proxy can be implemented
using a `vercel.json` file with the [rewrites](/docs/project-configuration/vercel-json#rewrites) property, where each
`source` is the path under the main domain and each `destination` is the
upstream project domain.

## How are projects built after I push?

Pushing a commit to a Git repository that is connected with multiple
Vercel projects will result in multiple deployments being created and
built in parallel for each.

## Can I share source files between projects? Are shared packages supported?

To access source files outside the Root Directory, enable the **Include source files outside of the Root Directory in the Build Step** option in the Root Directory section within the project settings.

For information on using Yarn workspaces, see [Deploying a Monorepo Using
Yarn Workspaces to Vercel](/kb/guide/deploying-yarn-monorepos-to-vercel).

Vercel projects created after August 27th 2020 23:50 UTC have this option
enabled by default.
If you're using Vercel CLI, at least version 20.1.0 is required.

## How can I use Vercel CLI without Project Linking?

Vercel CLI accepts environment variables instead of [project linking](/docs/cli/project-linking), which is useful for deployments from CI providers. Set the `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` environment variables:

```zsh filename="terminal"
VERCEL_ORG_ID=team_123 VERCEL_PROJECT_ID=prj_456 vercel
```

You can also use the `--project` flag to specify a project name or ID directly. If both are provided, the `--project` flag takes precedence over `VERCEL_PROJECT_ID`. See [CLI Global Options](/docs/cli/global-options#project) for the full precedence order.

Learn more about [Vercel CLI for custom workflows](/kb/guide/using-vercel-cli-for-custom-workflows).

## Can I use Turborepo on the Hobby plan?

Yes. Turborepo is available on **all** plans.

## Can I use Nx with environment variables on Vercel?

When using [Nx](https://nx.dev/docs/getting-started/intro) on Vercel with
[environment variables](/docs/environment-variables), you may
encounter an issue where some of your environment variables are not being
assigned the correct value in a specific deployment.

This can happen if the environment variable is not initialized or defined
in that deployment. If that's the case, the system will look for a value
in an existing cache which may or may not be the value you would like to
use. It is a recommended practice to define all environment variables in
each deployment for all monorepos.

With Nx, you also have the ability to prevent the environment variable
from using a cached value. You can do that by configuring
[inputs](https://nx.dev/docs/reference/inputs) in your `nx.json` file.
For example, if you have an environment variable `MY_VERCEL_ENV` in your project,
add the following to your `nx.json` configuration file:

```json filename="nx.json"
{
  "namedInputs": {
    "sharedGlobals": [{ "env": "MY_VERCEL_ENV" }]
  }
}
```


---

[View full sitemap](/docs/sitemap)
