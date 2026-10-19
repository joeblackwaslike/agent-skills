---
title: Private Dependencies
product: vercel
url: /docs/agent/private-dependencies
canonical_url: "https://vercel.com/docs/agent/private-dependencies"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/agent
related:
  - /docs/environment-variables/shared-environment-variables
summary: Configure shared npm credentials so Vercel Agent can install private dependencies from npm and custom registries.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent/private-dependencies.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "b2d1cec986df74bb270f1944fceaa7dc32974643051697322e6814b92ed751e9"
---

# Private Dependencies

Vercel Agent installs private npm packages using your repository's existing package manager. Add `NPM_TOKEN` or `NPM_RC` as a shared team environment variable to authenticate with your registry.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Agent now installs private packages from npm and custom registries](https://vercel.com/changelog/vercel-agent-now-installs-private-packages-from-npm-and-custom-registries)
- [How do I use private dependencies with Vercel?](https://vercel.com/kb/guide/using-private-dependencies-with-vercel) — Information on how to use private dependencies with a Vercel deployment.
- [Private Dependencies](https://v0.app/docs/private-dependencies) — Install private npm packages in v0 by configuring NPM_TOKEN or NPM_RC as environment variables.
- [Dependencies from package.json are missing after install](https://vercel.com/kb/guide/dependencies-from-package-json-missing-after-install) — Understand why dependencies may not being installed during a build and how to fix.
- [v0 now reads npm credentials from shared environment variables](https://vercel.com/changelog/v0-now-reads-npm-credentials-from-shared-environment-variables)
- [Private enterprise agents on Vercel](https://vercel.com/kb/guide/private-enterprise-agents-vercel) — Design private enterprise agents that call internal APIs and databases with Vercel Functions, Secure Compute, AI Gateway
- [Using private GitHub repositories with Vercel Sandbox](https://vercel.com/kb/guide/sandbox-private-github-repositories) — Learn how to use Vercel Sandbox with private GitHub repositories using fine-grained tokens, classic tokens, or GitHub Ap
- [Build Features for Customizing Deployments](https://vercel.com/docs/builds/build-features) — Learn how to customize your deployments using Vercel's build features.
- [Installation](https://vercel.com/docs/agent/installation) — Let AI automatically install Web Analytics and Speed Insights in your app
- [Package Managers](https://vercel.com/docs/package-managers) — Discover the package managers supported by Vercel for dependency management. Learn how Vercel detects and uses npm, Yarn
- [Config and Secret environment variables](https://vercel.com/docs/environment-variables/sensitive-environment-variables) — Choose Config or Secret environment variables based on whether their values should remain readable after saving.
- [Public and Shared Repositories](https://vercel.com/docs/container-registry/public-and-shared-repositories) — Share a Vercel Container Registry repository with specific Vercel teams or make it public for any Vercel team to access.

Full cross-link map for this page: [/docs/agent/private-dependencies.graph.md](/docs/agent/private-dependencies.graph.md)
<!-- /docsgraph:related -->

## How it works

Your package manager runs its usual install command while Vercel Agent authenticates package downloads as registry requests leave the sandbox.

Credential values stay outside the sandbox, so the agent and sandbox processes cannot read them.

Registry authentication only covers package downloads. Publishing and registry administration aren't supported. Keep credentials out of prompts and commands.

## Configure a credential

Add your credentials in your Vercel team's settings:

1. Open **Settings**, then select **Environment Variables**.
2. Add a [Shared Environment Variable](/docs/environment-variables/shared-environment-variables) using the name and value described below.
3. Select **Development** or **Preview**, then save the variable.

You don't need to link these variables to individual projects. Vercel Agent checks Development before Preview and ignores Production and project-level variables.

### NPM\_TOKEN

Use `NPM_TOKEN` for packages hosted on `registry.npmjs.org`. Set its value to an npm access token with read access to the private packages your repository needs.

### NPM\_RC

Use `NPM_RC` for a custom registry or multiple registries. Set its value to the registry configuration from your `.npmrc` file.

For GitHub Packages:

```ini filename="NPM_RC"
@acme:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

For JFrog Artifactory:

```ini filename="NPM_RC"
@acme:registry=https://acme.jfrog.io/artifactory/api/npm/npm-local/
//acme.jfrog.io/artifactory/api/npm/npm-local/:_authToken=${ARTIFACTORY_TOKEN}
```

Replace `@acme` and the registry URL with your own. Add each referenced token, such as `GITHUB_PACKAGES_TOKEN`, as a Shared Environment Variable in the same environment as `NPM_RC`. Each token needs read access to the packages in its registry.

To use multiple registries, add an entry for each package scope and its registry credentials. You can also set `registry` to choose the default registry.

When both `NPM_RC` and `NPM_TOKEN` are set in the same environment, `NPM_RC` takes precedence.

## Override credentials for Vercel Agent

To give Vercel Agent different credentials from your builds, use `VERCEL_AGENT_NPM_RC` or `VERCEL_AGENT_NPM_TOKEN`. Within each environment, Vercel Agent selects the first defined variable in this order:

1. `VERCEL_AGENT_NPM_RC`
2. `VERCEL_AGENT_NPM_TOKEN`
3. `NPM_RC`
4. `NPM_TOKEN`

To disable registry authentication, set `VERCEL_AGENT_NPM_RC` to an empty string in Development. This also stops fallback to Preview.

## Requirements

- Registry URLs must use HTTPS with a DNS hostname and no custom port.
- `NPM_RC` supports token and basic authentication. Client certificates are unsupported.

## Troubleshooting

If a private package fails to install:

- Check that the token has read access to the package.
- Check that registry URLs and package scopes match your dependencies.
- Add any variables referenced by `NPM_RC` to the same environment as `NPM_RC`.

If a Development `NPM_RC` or `VERCEL_AGENT_NPM_RC` references a missing variable, Vercel Agent retries the same configuration key in Preview. To use that fallback, define the configuration and its referenced variables in Preview.

Empty or malformed configuration stops lookup instead of falling back to a lower-priority variable.


---

[View full sitemap](/docs/sitemap)
