---
title: Build Features for Customizing Deployments
product: vercel
url: /docs/builds/build-features
canonical_url: "https://vercel.com/docs/builds/build-features"
last_updated: 2026-09-16
type: reference
prerequisites:
  - /docs/builds
related:
  - /docs/environment-variables
  - /docs/cli/env
  - /docs/cli/deploying-from-cli
  - /docs/build-output-api
  - /docs/domains/working-with-domains/add-a-domain
summary: "Learn how to customize your deployments using Vercel's build features."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/builds/build-features.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "c1041321365a7d553105028d2ec91f16c7904b706dd8aebd1d2238c2888914bd"
---

# Build Features for Customizing Deployments

Vercel provides the following features to customize your deployments:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Private Dependencies](https://v0.app/docs/private-dependencies) — Install private npm packages in v0 by configuring NPM_TOKEN or NPM_RC as environment variables.
- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [Deploying from an External CI/CD Pipeline](https://vercel.com/docs/git/external-pipelines) — Build your project in GitHub Actions, CircleCI, Bitbucket Pipelines, or another CI/CD provider, then deploy the build ou
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Project settings](https://vercel.com/docs/project-configuration/project-settings) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,
- [Deploying GitLab Projects with Vercel](https://vercel.com/docs/git/vercel-for-gitlab) — ​Vercel for GitLab automatically deploys your GitLab projects with Vercel, providing Preview Deployment URLs, and automa

Full cross-link map for this page: [/docs/builds/build-features.graph.md](/docs/builds/build-features.graph.md)
<!-- /docsgraph:related -->

- [Private npm packages](#private-npm-packages)
- [Ignored files and folders](#ignored-files-and-folders)
- [Special paths](#special-paths)
- [Git submodules](#git-submodules)

## Private npm packages

To install private npm packages during a build, add your registry credentials to your project as [environment variables](/docs/environment-variables). Before Vercel installs your dependencies, it creates an `.npmrc` file from these variables, so you don't need to commit credentials to your repository.

| Variable | When to use it | Value |
| --- | --- | --- |
| `NPM_TOKEN` | Your private packages are on the npm registry at `registry.npmjs.org` | An npm access token with read access to the packages |
| `NPM_RC` | Your packages are on another registry, such as GitHub Packages, or on several registries | The contents of an `.npmrc` file that configures each registry |

When a deployment has both variables, `NPM_RC` takes precedence over `NPM_TOKEN`.

### Use other package registries

To install packages from a registry other than npm, set `NPM_RC` to the contents of an `.npmrc` file. This example installs packages in the `@acme` scope from GitHub Packages and all other packages from the npm registry:

```ini filename=".npmrc"
registry=https://registry.npmjs.org
@acme:registry=https://npm.pkg.github.com/
//registry.npmjs.org/:_authToken=your_npm_token_here
//npm.pkg.github.com/:_authToken=your_github_token_here
```

Keep `registry.npmjs.org` available in the file. Vercel installs its own runtimes from the npm registry during the build.

When your `.npmrc` file has more than one line, add it with [Vercel CLI](/docs/cli/env) so that its line breaks are preserved. Run `vercel env add` once for each environment that needs the variable:

```bash filename="terminal"
vercel env add NPM_RC --environment production < .npmrc
```

A new variable applies to deployments that you create after you add it, so redeploy to use it.

### Install private Git repositories as dependencies

You can also install a package from a private Git repository by referencing the repository in the `dependencies` of your `package.json` file. Create an access token that can only read that repository, and include it in the repository's HTTPS URL:

```json filename="package.json"
{
  "dependencies": {
    "private-package": "git+https://your_username:your_token@github.com/your_org/your_repo.git"
  }
}
```

The URL format depends on your Git provider:

| Git provider | Token to create | Dependency URL |
| --- | --- | --- |
| GitHub | Personal access token with read-only repository access | `git+https://your_username:your_token@github.com/your_org/your_repo.git` |
| GitHub Enterprise Server | Personal access token with read-only repository access | `git+https://your_username:your_token@your_hostname/your_org/your_repo.git` |
| GitLab | Deploy token with the `read_repository` scope | `git+https://your_token_username:your_token@gitlab.com/your_org/your_repo.git` |
| GitLab self-managed | Deploy token with the `read_repository` scope | `git+https://your_token_username:your_token@your_hostname/your_org/your_repo.git` |
| Bitbucket | Repository access token with read access | `git+https://x-token-auth:your_token@bitbucket.org/your_workspace/your_repo.git` |

> **💡 Note:** The token is stored in `package.json` and your lockfile, so everyone who can
> read your project's repository can use it. Limit the token to read access on
> the one repository it installs. To keep credentials out of your repository,
> publish the package to a private registry and authenticate with `NPM_TOKEN`
> or `NPM_RC` instead.

## Ignored files and folders

Vercel ignores certain files and folders by default and prevents them from being uploaded during the deployment process for security and performance reasons. These ignored files are only relevant when using Vercel CLI.

```bash filename="ignored-files"
.hg
.git
.gitmodules
.svn
.cache
.next
.now
.vercel
.npmignore
.dockerignore
.gitignore
.*.swp
.DS_Store
.wafpicke-*
.lock-wscript
.env.local
.env.*.local
.venv
.yarn/cache
.pnp*
npm-debug.log
config.gypi
node_modules
__pycache__
venv
CVS
```

*A complete list of files and folders ignored by Vercel during the Deployment
process.*

If the directory that you deploy has a `Cargo.toml` file at its root, Vercel CLI also ignores the `target` directory at that root. To upload it, add `!/target` to your `.vercelignore` file.

The `.vercel/output` directory is **not** ignored when [`vercel deploy --prebuilt`](/docs/cli/deploying-from-cli#deploying-from-local-build-prebuilt) is used to deploy a prebuilt Vercel Project, according to the [Build Output API](/docs/build-output-api) specification.

During a prebuilt deploy, Vercel excludes a required function file from the upload if it also matches a rule in your `.vercelignore` (or `.nowignore`). The exceptions are files that match `.pnp*` and files in the `node_modules`, `.next`, `.yarn/cache`, `.venv`, `venv`, `__pycache__`, and root `target` directories. Vercel uploads these files when a prebuilt function needs them, even if your ignore file lists them.

> **💡 Note:** You do not need to add any of the above files and folders to your
> `.vercelignore` file because it is done automatically
> by Vercel.

## Special paths

Vercel provides special pathnames for accessing deployment source and build logs.

All deployment URLs have two special pathnames to access the source code and the build logs:

- `/_src`
- `/_logs`

By default, these routes are protected so that they can only be accessed by you and the members of your Vercel Team.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/deployments/build-step/logs-and-sources-light.png)

*Build Logs and Source Protection is enabled by default.*

### Source View

By appending `/_src` to a Deployment URL or [Custom Domain](/docs/domains/working-with-domains/add-a-domain) in your web browser, you will be redirected to the Deployment inspector and be able to browse the sources and [build](/docs/builds/configure-a-build) outputs.

### Logs View

By appending `/_logs` to a Deployment URL or [Custom Domain](/docs/domains/working-with-domains/add-a-domain) in your web browser, you can see a real-time stream of logs from your deployment build processes by clicking on the **Build Logs** accordion.

If your project's [Framework Preset](/docs/builds/configure-a-build#framework-preset) is **Other**, this accordion is labeled **Deploy Logs** instead.

### Security considerations

The pathnames `/_src` and `/_logs` redirect to `https://vercel.com` and **require logging into your Vercel account** to access any sensitive information. A third-party cannot access your source or build logs anonymously by crafting a deployment URL with one of these paths.

## Git submodules

On Vercel, you can deploy [Git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) with a [Git provider](/docs/git) as long as the submodule is publicly accessible through the HTTP protocol. Git submodules that are private or requested over SSH will fail during the Build step. However, you can reference private repositories formatted as npm packages in your `package.json` file dependencies. Private repository modules require a special link syntax that varies according to the Git provider. For this syntax, see [Install private Git repositories as dependencies](#install-private-git-repositories-as-dependencies).

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
