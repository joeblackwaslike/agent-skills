---
title: vercel deploy
product: vercel
url: /docs/cli/deploy
canonical_url: "https://vercel.com/docs/cli/deploy"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
  - /docs/cli/build
  - /docs/build-output-api
  - /docs/environment-variables/system-environment-variables
  - /docs/skew-protection
summary: Learn how to deploy your Vercel projects using the vercel deploy CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/deploy.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "6f96e101fccd0a6e2ff95f3ba92495c086d193bf210c95dbe3d377d87559ad93"
---

# vercel deploy

The `vercel deploy` command deploys Vercel projects, executable from the project's root directory or by specifying a path. You can omit 'deploy' in `vercel deploy`, as `vercel` is the only command that operates without a subcommand. This document will use 'vercel' to refer to `vercel deploy`.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [CLI archive deployments are now up to 30% faster with split-tgz archive option](https://vercel.com/changelog/cli-archive-deployments-are-now-up-to-30-faster-with-split-tgz-archive?from=related&source_path=%2Fdocs%2Fcli%2Fdeploy&source_site=vercel-docs&relationship=related)
- [Dry-run deployments with Vercel CLI](https://vercel.com/changelog/dry-run-deployments-with-vercel-cli?from=related&source_path=%2Fdocs%2Fcli%2Fdeploy&source_site=vercel-docs&relationship=related)
- [Improvements to command line logs](https://vercel.com/changelog/improvements-to-command-line-logs?from=related&source_path=%2Fdocs%2Fcli%2Fdeploy&source_site=vercel-docs&relationship=related)
- [Split-tgz is now the default CLI archive deployment behavior](https://vercel.com/changelog/split-tgz-is-now-the-default-cli-archive-deployment-behavior?from=related&source_path=%2Fdocs%2Fcli%2Fdeploy&source_site=vercel-docs&relationship=related)
- [Why are my branch specific variables and domains not linked to my CLI deployments?](https://vercel.com/kb/guide/branch-variables-and-domains-not-linked-to-cli-deployments?from=related&source_path=%2Fdocs%2Fcli%2Fdeploy&source_site=vercel-docs&relationship=related) — How to link CLI deployments to the correct branch for use with custom environments and branch specific domains and envir
- [Deploy to Vercel with Self-Hosted Git Pipelines \\(GitLab & Bitbucket\\)](https://vercel.com/kb/guide/how-can-i-use-gitlab-pipelines-with-vercel?from=related&source_path=%2Fdocs%2Fcli%2Fdeploy&source_site=vercel-docs&relationship=related) — Learn how to use GitLab Pipelines to deploy to Vercel including support for self-managed GitLab.
- [How to alias a preview deployment using the CLI](https://vercel.com/kb/guide/how-to-alias-a-preview-deployment-using-the-cli?from=related&source_path=%2Fdocs%2Fcli%2Fdeploy&source_site=vercel-docs&relationship=related) — Learn how to automatically alias a Vercel preview deployment.
- [Deploying safely on Vercel without merge queues](https://vercel.com/blog/deploy-safely-on-vercel-without-merge-queues?from=related&source_path=%2Fdocs%2Fcli%2Fdeploy&source_site=vercel-docs&relationship=related)
- [vercel redeploy](https://vercel.com/docs/cli/redeploy?from=related&source_path=%2Fdocs%2Fcli%2Fdeploy&source_site=vercel-docs&relationship=related) — Learn how to redeploy your project using the vercel redeploy CLI command.
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related&source_path=%2Fdocs%2Fcli%2Fdeploy&source_site=vercel-docs&relationship=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [vercel curl](https://vercel.com/docs/cli/curl?from=related&source_path=%2Fdocs%2Fcli%2Fdeploy&source_site=vercel-docs&relationship=related) — Learn how to make HTTP requests to your Vercel deployments with automatic deployment protection bypass using the vercel
- [vercel rolling-release](https://vercel.com/docs/cli/rolling-release?from=related&source_path=%2Fdocs%2Fcli%2Fdeploy&source_site=vercel-docs&relationship=related) — Learn how to manage your project's rolling releases using the vercel rolling-release CLI command.

Full cross-link map for this page: [/docs/cli/deploy.graph.md](/docs/cli/deploy.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fdeploy&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel
```

*Using the \`vercel\` command from the root of a Vercel
project directory.*

## Extended usage

```bash filename="terminal"
vercel --cwd [path-to-project]
```

*Using the \`vercel\` command and supplying a path to the
root directory of the Vercel project.*

```bash filename="terminal"
vercel deploy --prebuilt
```

*Using the \`vercel\` command to deploy a prebuilt Vercel
project, typically with \`vercel build\`. See
vercel build and
Build Output API for more details.*

## Standard output usage

When deploying, `stdout` is always the Deployment URL.

```bash filename="terminal"
vercel > deployment-url.txt
```

*Using the \`vercel\` command to deploy and write
\`stdout\` to a text file. When deploying,
\`stdout\` is always the Deployment URL.*

### Deploying to a custom domain

In the following example, you create a bash script that you include in your CI/CD workflow. The goal is to have all preview deployments be aliased to a custom domain so that developers can bookmark the preview deployment URL. Note that you may need to [define the scope](/docs/cli/global-options#scope) when using `vercel alias`

```bash filename="deployDomain.sh"
# save stdout and stderr to files
vercel deploy >deployment-url.txt 2>error.txt

# check the exit code
code=$?
if [ $code -eq 0 ]; then
    # Now you can use the deployment url from stdout for the next step of your workflow
    deploymentUrl=`cat deployment-url.txt`
    vercel alias $deploymentUrl my-custom-domain.com
else
    # Handle the error
    errorMessage=`cat error.txt`
    echo "There was an error: $errorMessage"
fi
```

*The script deploys your project and assigns the deployment URL saved in
\`stdout\` to the custom domain using
\`vercel alias\`.*

## Standard error usage

If you need to check for errors when the command is executed such as in a CI/CD workflow,
use `stderr`. If the exit code is anything other than `0`, an error has occurred. The
following example demonstrates a script that checks if the exit code is not equal to 0:

```bash filename="checkDeploy.sh"
# save stdout and stderr to files
vercel deploy >deployment-url.txt 2>error.txt

# check the exit code
code=$?
if [ $code -eq 0 ]; then
    # Now you can use the deployment url from stdout for the next step of your workflow
    deploymentUrl=`cat deployment-url.txt`
    echo $deploymentUrl
else
    # Handle the error
    errorMessage=`cat error.txt`
    echo "There was an error: $errorMessage"
fi
```

## Unique options

These are options that only apply to the `vercel` command.

### Prebuilt

The `--prebuilt` option can be used to upload and deploy the results of a previous `vc build` execution located in the .vercel/output directory. See [vercel build](/docs/cli/build) and [Build Output API](/docs/build-output-api) for more details.

#### When not to use --prebuilt

When using the `--prebuilt` flag, [System Environment Variables](/docs/environment-variables/system-environment-variables) will be missing at build time, so frameworks that rely on them at build time may not function correctly.

For Next.js projects, [Skew Protection](/docs/skew-protection) is supported with `--prebuilt` by configuring a custom deployment ID. See [Custom Deployment ID](/docs/skew-protection#custom-deployment-id) for setup instructions. Prebuilt deployments cannot use `dpl_` as a user-configured deployment ID prefix.

If you need System Environment Variables at build time, do not use the `--prebuilt` flag or use Git-based deployments.

```bash filename="terminal"
vercel --prebuilt
```

You should also consider using the [archive](/docs/cli/deploy#archive) option to minimize the number of files uploaded and avoid hitting upload limits:

```bash filename="terminal"
# Build the project locally
vercel build

# Deploy the pre-built project, archiving it as a .tgz file
vercel deploy --prebuilt --archive=tgz
```

This example uses the `vercel build` command to build your project locally. It then uses the `--prebuilt` and `--archive=tgz` options on the `deploy` command to compress the build output and then deploy it.

### Build env

The `--build-env` option, shorthand `-b`, can be used to provide environment variables to the [build step](/docs/builds/configure-a-build).

```bash filename="terminal"
vercel --build-env KEY1=value1 --build-env KEY2=value2
```

*Using the \`vercel\` command with the
\`--build-env\` option.*

### Yes

The `--yes` option can be used to skip questions you are asked when setting up a new Vercel project.
The questions will be answered with the provided defaults, inferred from `vercel.json` and the folder name.

```bash filename="terminal"
vercel --yes
```

*Using the \`vercel\` command with the
\`--yes\` option.*

### Env

The `--env` option, shorthand `-e`, can be used to provide [environment variables](/docs/environment-variables) at runtime.

```bash filename="terminal"
vercel --env KEY1=value1 --env KEY2=value2
```

*Using the \`vercel\` command with the
\`--env\` option.*

### Name

> **💡 Note:** The `--name` option has been deprecated in favor of
> [Vercel project linking](/docs/cli/project-linking), which allows you to link
> a Vercel project to your local codebase when you run
> `vercel`.

The `--name` option, shorthand `-n`, can be used to provide a Vercel project name for a deployment.

```bash filename="terminal"
vercel --name foo
```

*Using the \`vercel\` command with the
\`--name\` option.*

### Prod

The `--prod` option can be used to create a deployment for a production domain specified in the Vercel project dashboard.

```bash filename="terminal"
vercel --prod
```

*Using the \`vercel\` command with the
\`--prod\` option.*

> **💡 Note:** The [first deployment](/docs/deployments/environments#first-deployment) of a
> new project is always a production deployment, even when you omit `--prod`.
> Use `--prod` for later production deployments after that first one exists.

### Skip Domain

> **💡 Note:** This CLI option will override the [Auto-assign Custom Production
> Domains](/docs/deployments/promoting-a-deployment#staging-and-promoting-a-production-deployment)
> project setting.

Must be used with [`--prod`](#prod). The `--skip-domain` option will disable the automatic promotion (aliasing) of the relevant domains to a new production deployment. You can use [`vercel promote`](/docs/cli/promote) to complete the domain-assignment process later.

```bash filename="terminal"
vercel --prod --skip-domain
```

*Using the \`vercel\` command with the
\`--skip-domain\` option.*

### Public

The `--public` option can be used to ensure the source code is publicly available at the `/_src` path.

```bash filename="terminal"
vercel --public
```

*Using the \`vercel\` command with the
\`--public\` option.*

### Regions

The `--regions` option can be used to specify which [regions](/docs/regions) the deployments [Vercel functions](/docs/functions) should run in.

```bash filename="terminal"
vercel --regions sfo1
```

*Using the \`vercel\` command with the
\`--regions\` option.*

### No wait

The `--no-wait` option does not wait for a deployment to finish before exiting from the `deploy` command.

```bash filename="terminal"
vercel --no-wait
```

### Force

The `--force` option, shorthand `-f`, is used to force a new deployment without the [build cache](/docs/deployments/troubleshoot-a-build#what-is-cached).

```bash filename="terminal"
vercel --force
```

### With cache

The `--with-cache` option is used to retain the [build cache](/docs/deployments/troubleshoot-a-build#what-is-cached) when using `--force`.

```bash filename="terminal"
vercel --force --with-cache
```

### Archive

The `--archive` option compresses the deployment code into one or more files before uploading it. This option should be used when deployments include thousands of files to avoid rate limits such as the [files limit](https://vercel.com/docs/limits#files).

In some cases, `--archive` makes deployments slower. This happens because the caching of source files to optimize file uploads in future deployments is negated when source files are archived.

```bash filename="terminal"
vercel deploy --archive=tgz
```

### Logs

The `--logs` option, shorthand `-l`, also prints the build logs.

```bash filename="terminal"
vercel deploy --logs
```

*Using the \`vercel deploy\` command with the
\`--logs\` option, to view logs from the build process.*

### Meta

The `--meta` option, shorthand `-m`, is used to add metadata to the deployment.

```bash filename="terminal"
vercel deploy --meta KEY1=value1
```

> **💡 Note:** Deployments can be filtered using this data with [`vercel list   --meta`](/docs/cli/list#meta).

### target

Use the `--target` option to define the environment you want to deploy to. This could be production, preview, or a [custom environment](/docs/deployments/environments#custom-environments).

```bash filename="terminal"
vercel deploy --target=staging
```

### Guidance

The `--guidance` option displays suggested next steps and commands after deployment completes. This can help you discover relevant CLI commands for common post-deployment tasks.

```bash filename="terminal"
vercel deploy --guidance
```

*Using the \`vercel deploy\` command with the
\`--guidance\` option to receive command suggestions.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel deploy` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--team`](/docs/cli/global-options#team)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)
