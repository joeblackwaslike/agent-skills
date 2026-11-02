---
title: Connecting Projects to Share Flags
product: vercel
url: /docs/flags/vercel-flags/project-connections
canonical_url: "https://vercel.com/docs/flags/vercel-flags/project-connections"
last_updated: 2026-10-20
type: how-to
prerequisites:
  - /docs/flags/vercel-flags
  - /docs/flags
related:
  - /docs/oidc
  - /docs/flags/vercel-flags/quickstart
  - /docs/flags/vercel-flags/sdks/core
  - /docs/cli/flags
  - /docs/flags/vercel-flags/dashboard/sdk-keys
summary: "Read another project's Vercel Flags using your project's identity, without copying SDK keys."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/project-connections.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "3ee85cdfaf9f8a063661a1893e27938728457ea1992ca895d9ace0b066cc5029"
---

# Connecting Projects to Share Flags

Project Connections let applications in the same Vercel team share flags. For example, multiple microfrontends can use one project's release flags. Connections are available on all plans.

The **source project** owns the flags. The **consumer project** reads and evaluates them using its own [OpenID Connect (OIDC) token](/docs/oidc). You don't need to create or rotate an SDK key.

## Create a connection

Before you start, [set up Vercel Flags](/docs/flags/vercel-flags/quickstart) in the source project and check the [required permissions](#required-permissions).

1. Open the source project in the Vercel Dashboard.
2. Select **Flags**, then **Connections**.
3. Under **flags can be read by**, select **New Connection**.
4. Select the consumer project.

You can also start from the consumer project's **Connections** page. Under **can read flags from**, select **New Connection** and choose the source project. The same permissions apply.

Expand the connection to copy the adapter snippet with the source project's ID.

## Read connected flags

To use Project Connections with the Flags SDK, you need `@flags-sdk/vercel` version 1.6.0 or later. Install the latest Flags SDK and Vercel adapter in the consumer application:

```bash package-manager
pnpm install flags @flags-sdk/vercel
```

If you use the [core library](/docs/flags/vercel-flags/sdks/core) directly, use `@vercel/flags-core` version 1.11.0 or later. The Vercel adapter includes the required core library version.

Pass the **source project's ID** to `createVercelAdapter`. The adapter authenticates with the **consumer project's OIDC token**. Use `vercelAdapter()` alongside it for the consumer project's own flags:

```ts filename="flags.ts" switcher
import { flag } from 'flags/next';
import { createVercelAdapter, vercelAdapter } from '@flags-sdk/vercel';

const sharedAdapter = createVercelAdapter({
  projectId: 'prj_source',
});

export const sharedCheckout = flag({
  key: 'shared-checkout',
  defaultValue: false,
  adapter: sharedAdapter(),
});

export const localFeature = flag({
  key: 'local-feature',
  defaultValue: false,
  adapter: vercelAdapter(),
});
```

```js filename="flags.js" switcher
import { flag } from 'flags/next';
import { createVercelAdapter, vercelAdapter } from '@flags-sdk/vercel';

const sharedAdapter = createVercelAdapter({
  projectId: 'prj_source',
});

export const sharedCheckout = flag({
  key: 'shared-checkout',
  defaultValue: false,
  adapter: sharedAdapter(),
});

export const localFeature = flag({
  key: 'local-feature',
  defaultValue: false,
  adapter: vercelAdapter(),
});
```

Replace `prj_source` with the ID from your connection and `shared-checkout` with a flag key in the source project. Evaluate the flag with `await sharedCheckout()`. For SvelteKit, import `flag` from `flags/sveltekit`.

### Local development

From the consumer application's directory, link to the **consumer project**, then pull its environment variables:

```bash filename="terminal"
vercel link
vercel env pull
```

Load `.env.local` in your application. Next.js loads this file automatically. It includes your project's OIDC token, which grants access to connected flags. Run `vercel env pull` again when the token expires.

## Access and environment scope

A connection grants read and evaluate access to all flags in the source project, across all environments. You can't restrict a connection to individual flags or environments. Change flags and targeting rules in the source project.

The consumer's OIDC token selects the source environment:

| Consumer environment | Source flag environment |
| -------------------- | ----------------------- |
| Production | Production |
| Preview | Preview |
| Development | Development |
| Custom environment | Preview |

> **💡 Note:** Read access includes the flag configuration and data in targeting rules. Only connect projects that should have access to this data.

## Manage connections with the CLI

Managing connections from the CLI requires Vercel CLI version 63.0.0 or later.

Use `--project` to name the source project explicitly. For example, let `storefront` read flags from `checkout`:

```bash filename="terminal"
vercel flags connections add storefront --project checkout
```

List the projects that can read `checkout`'s flags:

```bash filename="terminal"
vercel flags connections list --project checkout
```

List the source projects that `storefront` can read:

```bash filename="terminal"
vercel flags connections list --project storefront --role consumer
```

See the [CLI reference](/docs/cli/flags#project-connections) for command aliases, options, and JSON output.

## Disconnect a project

With the [required permissions](#required-permissions) on the source project, open the connection's menu on the **Connections** page and select **Remove Connection**. You can also remove it with the CLI:

```bash filename="terminal"
vercel flags connections remove storefront --project checkout
```

Removing a connection revokes the consumer project's access without requiring a redeploy. Set a `defaultValue` for each flag to control behavior when the SDK can't evaluate it.

Transferring either project to another team or deleting either project also removes the connection.

To keep reading flags across teams after a transfer, [configure SDK Keys](/docs/flags/vercel-flags/dashboard/sdk-keys#how-to-use-flags-of-another-project) in each consuming project. Redeploy each consumer before transferring. Connections don't convert to SDK Keys automatically.

## Required permissions

To create or remove a connection, you need one of these roles:

- **Member** or **Owner** on the team.
- **Project Admin** on the **source project**.

Creating a connection also requires permission to view the **consumer project**. Removing a connection doesn't require access to the consumer project.

**Developer** or **Project Developer** access alone doesn't permit creating or removing connections. You don't need the team **Owner** role.

Configurable project roles are available on Enterprise plans and can only be assigned to team **Contributors**. Each project role applies only to its assigned project. See the [project roles documentation](/docs/rbac/access-roles/project-level-roles) for availability and assignment rules.

## Builds and usage

When you use [embedded definitions](/docs/flags/vercel-flags/sdks/core#embedded-definitions), the build step also fetches connected projects' definitions. Create connections before building to include them in the deployment's fallback definitions.

Flag evaluations and configuration reads count toward the source project's usage, just as they do with SDK keys. See [Vercel Flags limits and pricing](/docs/flags/vercel-flags/limits-and-pricing).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
