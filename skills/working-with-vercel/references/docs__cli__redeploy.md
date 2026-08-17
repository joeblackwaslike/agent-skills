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
summary: Learn how to redeploy your project using the vercel redeploy CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/redeploy.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "f15977808c4f60be7b368b4dc55d8a5437c4642196f3f6789858122224506e47"
---

# vercel redeploy

The `vercel redeploy` command is used to rebuild and [redeploy an existing deployment](/docs/deployments/managing-deployments).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [Deploying from CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [vercel promote](https://vercel.com/docs/cli/promote?from=related) — Learn how to promote an existing deployment using the vercel promote CLI command.
- [vercel remove](https://vercel.com/docs/cli/remove?from=related) — Learn how to remove a deployment using the vercel remove CLI command.
- [vercel list](https://vercel.com/docs/cli/list?from=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.

Full cross-link map for this page: [/docs/cli/redeploy.graph.md](/docs/cli/redeploy.graph.md)
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


---

[View full sitemap](/docs/sitemap)
