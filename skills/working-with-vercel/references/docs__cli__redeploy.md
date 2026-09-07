---
title: vercel redeploy
product: vercel
url: /docs/cli/redeploy
canonical_url: "https://vercel.com/docs/cli/redeploy"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/deployments/managing-deployments
  - /docs/deployments/environments
  - /docs/cli/global-options
summary: Learn how to redeploy your project using the vercel redeploy CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/redeploy.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "158bbbf4a8ea6fa14a2126bc5130951ca184783099797b5f39760f892a39cca7"
---

# vercel redeploy

The `vercel redeploy` command is used to rebuild and [redeploy an existing deployment](/docs/deployments/managing-deployments).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related&source_path=%2Fdocs%2Fcli%2Fredeploy&source_site=vercel-docs&relationship=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related&source_path=%2Fdocs%2Fcli%2Fredeploy&source_site=vercel-docs&relationship=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [vercel remove](https://vercel.com/docs/cli/remove?from=related&source_path=%2Fdocs%2Fcli%2Fredeploy&source_site=vercel-docs&relationship=related) — Learn how to remove a deployment using the vercel remove CLI command.
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Fredeploy&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel deploy-hooks](https://vercel.com/docs/cli/deploy-hooks?from=related&source_path=%2Fdocs%2Fcli%2Fredeploy&source_site=vercel-docs&relationship=related) — Manage Deploy Hooks for Git-triggered builds from the Vercel CLI: list, create, and remove deploy hook URLs that trigger

Full cross-link map for this page: [/docs/cli/redeploy.graph.md](/docs/cli/redeploy.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fredeploy&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel redeploy [deployment-id or url]
```

*Using \`vercel redeploy\` will rebuild and deploys an
existing deployment.*

## Standard output usage

When redeploying, `stdout` is always the Deployment URL.

```bash filename="terminal"
vercel redeploy https://example-app-6vd6bhoqt.vercel.app > deployment-url.txt
```

*Using the \`vercel redeploy\` command to redeploy and
write \`stdout\` to a text file. When redeploying,
\`stdout\` is always the Deployment URL.*

## Standard error usage

If you need to check for errors when the command is executed such as in a CI/CD workflow,
use `stderr`. If the exit code is anything other than `0`, an error has occurred. The
following example demonstrates a script that checks if the exit code is not equal to 0:

```bash filename="check-redeploy.sh"
# save stdout and stderr to files
vercel redeploy https://example-app-6vd6bhoqt.vercel.app >deployment-url.txt 2>error.txt

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

## Unique Options

These are options that only apply to the `vercel redeploy` command.

### No Wait

The `--no-wait` option does not wait for a deployment to finish before exiting from the `redeploy` command.

```bash filename="terminal"
vercel redeploy https://example-app-6vd6bhoqt.vercel.app --no-wait
```

*Using the \`vercel redeploy\` command with the
\`--no-wait\` option.*

### target

Use the `--target` option to define the environment you want to redeploy to. This could be production, preview, or a [custom environment](/docs/deployments/environments#custom-environments).

```bash filename="terminal"
vercel redeploy https://example-app-6vd6bhoqt.vercel.app --target=staging
```

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel redeploy` command:

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
