---
title: vercel inspect
product: vercel
url: /docs/cli/inspect
canonical_url: "https://vercel.com/docs/cli/inspect"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  []
summary: Learn how to retrieve information about your Vercel deployments using the vercel inspect CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/inspect.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "de9e589649b1a20e8c71ff8f947c726492a83e77a73a0ab4113be658cb5fa0ad"
---

# vercel inspect

The `vercel inspect` command is used to retrieve information about a deployment referenced either by its deployment URL or ID.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel list](https://vercel.com/docs/cli/list?from=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [vercel logs](https://vercel.com/docs/cli/logs?from=related) — View and filter request logs for your Vercel project, or stream live runtime logs from a deployment.
- [vercel httpstat](https://vercel.com/docs/cli/httpstat?from=related) — Learn how to visualize HTTP request timing statistics for your Vercel deployments using the vercel httpstat CLI command.
- [vercel redeploy](https://vercel.com/docs/cli/redeploy?from=related) — Learn how to redeploy your project using the vercel redeploy CLI command.

Full cross-link map for this page: [/docs/cli/inspect.graph.md](/docs/cli/inspect.graph.md)
<!-- /docsgraph:related -->

You can use this command to view either a deployment's information or its [build logs](/docs/cli/inspect#logs).

## Usage

```bash filename="terminal"
vercel inspect [deployment-id or url]
```

*Using the \`vercel inspect\` command to retrieve
information about a specific deployment.*

## Unique Options

These are options that only apply to the `vercel inspect` command.

### Timeout

The `--timeout` option sets the time to wait for deployment completion. It defaults to 3 minutes.

Any valid time string for the [ms](https://www.npmjs.com/package/ms) package can be used.

```bash filename="terminal"
vercel inspect https://example-app-6vd6bhoqt.vercel.app --timeout=5m
```

*Using the \`vercel inspect\` command with the
\`--timeout\` option.*

### Wait

The `--wait` option will block the CLI until the specified deployment has completed.

```bash filename="terminal"
vercel inspect https://example-app-6vd6bhoqt.vercel.app --wait
```

*Using the \`vercel inspect\` command with the
\`--wait\` option.*

### Logs

The `--logs` option, shorthand `-l`, prints the build logs instead of the deployment information.

```bash filename="terminal"
vercel inspect https://example-app-6vd6bhoqt.vercel.app --logs
```

*Using the \`vercel inspect\` command with the
\`--logs\` option, to view available build logs.*

If the deployment is queued or canceled, there will be no logs to display.

If the deployment is building, you may want to specify `--wait` option. The command will wait for build completion, and will display build logs as they are emitted.

```bash filename="terminal"
vercel inspect https://example-app-6vd6bhoqt.vercel.app --logs --wait
```

*Using the \`vercel inspect\` command with the
\`--logs\` and \`--wait\` options,
to view all build logs until the deployement is ready.*


---

[View full sitemap](/docs/sitemap)
