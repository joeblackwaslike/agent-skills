---
title: vercel remove
product: vercel
url: /docs/cli/remove
canonical_url: "https://vercel.com/docs/cli/remove"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/projects
summary: Learn how to remove a deployment using the vercel remove CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/remove.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "8f4f9e1734cfdbf2c6c50b197395f5501646ac29102dad2916809b5acce1652b"
---

# vercel remove

The `vercel remove` command, which can be shortened to `vercel rm`, is used to remove deployments either by ID or for a specific Vercel Project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I delete an individual deployment?](https://vercel.com/kb/guide/how-do-i-delete-an-individual-deployment?from=related&source_path=%2Fdocs%2Fcli%2Fremove&source_site=vercel-docs&relationship=related) — Information on deleting an individual deployment.
- [Delete Deployment](https://v0.app/docs/api/v1/reference/deployments/delete?from=related&source_path=%2Fdocs%2Fcli%2Fremove&source_site=vercel-docs&relationship=related) — Delete a deployment by ID. This will delete the deployment from Vercel.
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related&source_path=%2Fdocs%2Fcli%2Fremove&source_site=vercel-docs&relationship=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Fremove&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel redeploy](https://vercel.com/docs/cli/redeploy?from=related&source_path=%2Fdocs%2Fcli%2Fremove&source_site=vercel-docs&relationship=related) — Learn how to redeploy your project using the vercel redeploy CLI command.
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related&source_path=%2Fdocs%2Fcli%2Fremove&source_site=vercel-docs&relationship=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [Delete a Deployment](https://vercel.com/docs/rest-api/deployments/delete-a-deployment?from=related&source_path=%2Fdocs%2Fcli%2Fremove&source_site=vercel-docs&relationship=related) — DELETE /v13/deployments/{id} — This API allows you to delete a deployment, either by supplying its \\`id\\` in the URL or

Full cross-link map for this page: [/docs/cli/remove.graph.md](/docs/cli/remove.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fremove&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** You can also remove deployments from the Project Overview page on the Vercel
> Dashboard.

## Usage

```bash filename="terminal"
vercel remove [deployment-url]
```

*Using the \`vercel remove\` command to remove a
deployment from the Vercel platform.*

## Extended Usage

```bash filename="terminal"
vercel remove [deployment-url-1 deployment-url-2]
```

*Using the \`vercel remove\` command to remove multiple
deployments from the Vercel platform.*

```bash filename="terminal"
vercel remove [project-name]
```

*Using the \`vercel remove\` command to remove all
deployments for a Vercel Project from the Vercel platform.*

> **💡 Note:** By using the [project name](/docs/projects), the entire Vercel
> Project will be removed from the current scope unless the
> `--safe` is used.

## Unique Options

These are options that only apply to the `vercel remove` command.

### Safe

The `--safe` option, shorthand `-s`, can be used to skip the removal of deployments with an active preview URL or production domain when a Vercel Project is provided as the parameter.

```bash filename="terminal"
vercel remove my-project --safe
```

*Using the \`vercel remove\` command with the
\`--safe\` option.*

### Yes

The `--yes` option, shorthand `-y`, can be used to skip the confirmation step for a deployment or Vercel Project removal.

```bash filename="terminal"
vercel remove my-deployment.com --yes
```

*Using the \`vercel remove\` command with the
\`--yes\` option.*


---

[View full sitemap](/docs/sitemap)
