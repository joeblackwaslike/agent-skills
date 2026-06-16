---
title: Build Features for Customizing Deployments
product: vercel
url: /docs/builds/build-features
canonical_url: "https://vercel.com/docs/builds/build-features"
last_updated: 2026-05-13
type: reference
prerequisites:
  - /docs/builds
related:
  - /docs/environment-variables
  - /docs/cli/deploying-from-cli
  - /docs/build-output-api/v3
  - /docs/domains/add-a-domain
  - /docs/deployments/configure-a-build
summary: "Learn how to customize your deployments using Vercel's build features."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/builds/build-features.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "c2e114afd999018d5d5c96919ea08efc501652f2409e508686120d35fef19b02"
---

# Build Features for Customizing Deployments

Vercel provides the following features to customize your deployments:

- [Private npm packages](#private-npm-packages)
- [Ignored files and folders](#ignored-files-and-folders)
- [Special paths](#special-paths)
- [Git submodules](#git-submodules)

## Private npm packages

When your project's code is using private `npm` modules that require authentication, you need to perform an additional step to install private modules.

To install private `npm` modules, define `NPM_TOKEN` as an [Environment Variable](/docs/environment-variables) in your project. Alternatively, define `NPM_RC` as an [Environment Variable](/docs/environment-variables) in the contents of the project's npmrc config file that resides at the root of the project folder and is named `~/.npmrc`. This file defines the config settings of `npm` at the level of the project.

To learn more, check out the [guide here](/kb/guide/using-private-dependencies-with-vercel) if you need help configuring private dependencies.

## Ignored files and folders

Vercel ignores certain files and folders by default and prevents them from being uploaded during the deployment process for security and performance reasons. Please note that these ignored files are only relevant when using Vercel CLI.

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
npm-debug.log
config.gypi
node_modules
__pycache__
venv
CVS
```

*A complete list of files and folders ignored by Vercel during the Deployment
process.*

The `.vercel/output` directory is **not** ignored when [`vercel deploy --prebuilt`](/docs/cli/deploying-from-cli#deploying-from-local-build-prebuilt) is used to deploy a prebuilt Vercel Project, according to the [Build Output API](/docs/build-output-api/v3) specification.

> **💡 Note:** You do not need to add any of the above files and folders to your
> `.vercelignore` file because it is done automatically
> by Vercel.

## Special paths

Vercel provides special pathnames for accessing deployment source and build logs.

All deployment URLs have two special pathnames to access the source code and the build logs:

- `/_src`
- `/_logs`

By default, these routes are protected so that they can only be accessed by you and the members of your Vercel Team.

![Image](`/docs-assets/static/docs/concepts/deployments/build-step/logs-and-sources-light.png`)

*Build Logs and Source Protection is enabled by default.*

### Source View

By appending `/_src` to a Deployment URL or [Custom Domain](/docs/domains/add-a-domain) in your web browser, you will be redirected to the Deployment inspector and be able to browse the sources and [build](/docs/deployments/configure-a-build) outputs.

### Logs View

By appending `/_logs` to a Deployment URL or [Custom Domain](/docs/domains/add-a-domain) in your web browser, you can see a real-time stream of logs from your deployment build processes by clicking on the **Build Logs** accordion.

### Security considerations

The pathnames `/_src` and `/_logs` redirect to `https://vercel.com` and **require logging into your Vercel account** to access any sensitive information. A third-party cannot access your source or build logs anonymously by crafting a deployment URL with one of these paths.

## Git submodules

On Vercel, you can deploy [Git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) with a [Git provider](/docs/git) as long as the submodule is publicly accessible through the HTTP protocol. Git submodules that are private or requested over SSH will fail during the Build step. However, you can reference private repositories formatted as npm packages in your `package.json` file dependencies. Private repository modules require a special link syntax that varies according to the Git provider. For more information on this syntax, see "[How do I use private dependencies with Vercel?](/kb/guide/using-private-dependencies-with-vercel)".


---

[View full sitemap](/docs/sitemap)
