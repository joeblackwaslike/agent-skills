---
title: Managing Microfrontends
product: vercel
url: /docs/microfrontends/managing-microfrontends
canonical_url: "https://vercel.com/docs/microfrontends/managing-microfrontends"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/microfrontends
related:
  - /docs/microfrontends/managing-microfrontends/security
  - /docs/microfrontends/managing-microfrontends/vercel-toolbar
  - /docs/deployments/environments
  - /docs/errors/MICROFRONTENDS_MISSING_FALLBACK_ERROR
  - /docs/domains/working-with-domains/assign-domain-to-a-git-branch
summary: Learn about managing microfrontends on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/microfrontends/managing-microfrontends.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "67013407572a6649b2a237d65b86ba8314d7011d61c735606456b133e0b4c600"
---

# Managing microfrontends

With a project's **Microfrontends** settings of the Vercel dashboard, you can:

- [Add](#adding-microfrontends) and [remove](#removing-microfrontends) microfrontends
- [Delete](#deleting-a-microfrontends-group) a microfrontends group
- [Share settings](#sharing-settings-between-microfrontends) between microfrontends
- [Route Observability data](#observability-data-routing)
- [Manage security](/docs/microfrontends/managing-microfrontends/security) with Deployment Protection and Firewall

You can also use the [Vercel Toolbar to manage microfrontends](/docs/microfrontends/managing-microfrontends/vercel-toolbar).

## Adding microfrontends

You can add a project to a microfrontends group using the CLI or the dashboard.

**Using the CLI:**

Run the following command from the project directory and follow the interactive prompts:

```bash filename="terminal"
vercel microfrontends add-to-group
```

To pre-fill the group and default route, pass them as flags. A billing confirmation prompt will still be required:

```bash filename="terminal"
vercel mf add-to-group --group="My Group" --default-route=/docs
```

**Using the dashboard:**

1. Visit the **Settings** tab for the project that you would like to add.
2. Click on the **Microfrontends** tab.
3. Find the microfrontends group that it is being added to and click **Add to Group**.

These changes will take effect on the next deployment.

![Image](`/docs-assets/static/docs/microfrontends/add-to-microfrontends-group-2-light.png`)

## Removing microfrontends

You can remove a project from a microfrontends group using the CLI or the dashboard. Make sure no other microfrontend refers to this project before removing it.

**Using the CLI:**

Run the following command from the project directory and follow the interactive prompts:

```bash filename="terminal"
vercel microfrontends remove-from-group
```

After removal, update `microfrontends.json` in the default application to remove the project's entry. The CLI will warn you if the project is still referenced in the configuration but will not block the removal.

**Using the dashboard:**

1. Remove the microfrontend from the `microfrontends.json` in the default application.
2. Visit the **Settings** tab for the project that you would like to remove.
3. Click on the **Microfrontends** tab.
4. Find the microfrontends group that the project is a part of. Click **Remove from Group** to remove it from the group.

These changes will take effect on the next deployment.

> **💡 Note:** Projects that are the default application for the microfrontends group can
> only be removed after all other projects in the group have been removed.

## Deleting a microfrontends group

This action is not reversible.

**Using the CLI:**

Run the following command and follow the interactive prompts. The CLI will show how many projects will be removed but does not require the group to be empty first:

```bash filename="terminal"
vercel microfrontends delete-group
```

To pre-select the group, pass it as a flag. A confirmation prompt will still be required:

```bash filename="terminal"
vercel mf delete-group --group="My Group"
```

**Using the dashboard:**

Remove all projects from the group first, then the option to delete the group becomes available in the group's settings.

## Fallback environment

> **💡 Note:** This setting only applies to
> [preview](/docs/deployments/environments#preview-environment-pre-production)
> and [custom environments](/docs/deployments/environments#custom-environments).
> Requests for the
> [production](/docs/deployments/environments#production-environment)
> environment are always routed to the production deployment for each
> microfrontend project.

When microfrontend projects are not built for a commit in [preview](/docs/deployments/environments#preview-environment-pre-production)
or [custom environments](/docs/deployments/environments#custom-environments), Vercel will route those requests to a specified fallback so that requests in the entire microfrontends group will continue to work. This allows developers to build and test a single microfrontend without having to build other microfrontends.

There are three options for the fallback environment setting:

- `Same Environment` - Requests to microfrontends not built for that commit will fall back to a deployment for the other microfrontend project in the same environment.
  - For example, in the `Preview` environment, requests to a microfrontend that was not built for that commit would fallback to the `Preview` environment of that other microfrontend. If in a custom environment, the request would instead fallback to the custom environment with the same name in the other microfrontend project.
  - When this setting is used, Vercel will generate `Preview` deployments on the production branch for each microfrontend project automatically.
- `Production` - Requests to microfrontends not built for this commit will fall back to the promoted Production deployment for that other microfrontend project.
- A specific [custom environment](/docs/deployments/environments#custom-environments) - Requests to microfrontends not built for this commit will fall back to a deployment in a custom environment with the specified name.

This table illustrates the different fallback scenarios that could arise:

| Current Environment          | Fallback Environment         | If Microfrontend Built for Commit | If Microfrontend Did Not Build for Commit |
| ---------------------------- | ---------------------------- | --------------------------------- | ----------------------------------------- |
| `Preview`                    | `Same Environment`           | `Preview`                         | `Preview`                                 |
| `Preview`                    | `Production`                 | `Preview`                         | `Production`                              |
| `Preview`                    | `staging` Custom Environment | `Preview`                         | `staging` Custom Environment              |
| `staging` Custom Environment | `Same Environment`           | `staging` Custom Environment      | `staging` Custom Environment              |
| `staging` Custom Environment | `Production`                 | `staging` Custom Environment      | `Production`                              |
| `staging` Custom Environment | `staging` Custom Environment | `staging` Custom Environment      | `staging` Custom Environment              |

If the current environment is `Production`, requests will always be routed to the `Production` environment of the other project.

> **💡 Note:** If using the `Same Environment` or `Custom Environment` options, you may need
> to make sure that those environments have a deployment to fall back to. For
> example, if using the `Custom Environment` option, each project in the
> microfrontends group will need to have a Custom Environment with the specified
> name. If environments are not configured correctly, you may see a
> [MICROFRONTENDS\_MISSING\_FALLBACK\_ERROR](/docs/errors/MICROFRONTENDS_MISSING_FALLBACK_ERROR)
> on the request.

To configure this setting, visit the **Settings** tab for the microfrontends group and configure the **Fallback Environment** setting.

### Project domains for git branches

If your project has a [project domain assigned to a Git branch](/docs/domains/working-with-domains/assign-domain-to-a-git-branch), and the fallback environment is set to `Same Environment`, deployments on that branch will use the branch's project domain as the fallback environment instead of the [production branch](/docs/git#production-branch) (e.g. `main`).

To use that branch across the microfrontends group, add a project domain for the branch to every project in the group.

## Sharing settings between microfrontends

To share settings between Vercel microfrontend projects, you can use the [Vercel Terraform Provider](https://registry.terraform.io/providers/vercel/vercel/latest/docs) to synchronize across projects.

- [Microfrontend group resource](https://registry.terraform.io/providers/vercel/vercel/latest/docs/resources/microfrontend_group)
- [Microfrontend group membership resource](https://registry.terraform.io/providers/vercel/vercel/latest/docs/resources/microfrontend_group_membership)

### Sharing environment variables

[Shared Environment Variables](/docs/environment-variables/shared-environment-variables) allow you to manage a single secret and share it across multiple projects seamlessly.

To use environment variables with the same name but different values for different project groups, you can create a shared environment variable with a unique identifier (e.g., `FLAG_SECRET_X`). Then, map it to the desired variable (e.g., `FLAG_SECRET=$FLAG_SECRET_X`) in your `.env` file or [build command](/docs/builds/configure-a-build#build-command).

## Optimizing navigations between microfrontends

> **💡 Note:** This feature is currently only supported for Next.js.

Navigations between different top level microfrontends will introduce a hard navigation for users. Vercel optimizes these navigations by automatically prefetching and prerendering these links to minimize any user-visible latency.

> For \['nextjs-app']:

To get started, add the `PrefetchCrossZoneLinks` element to your `layout.tsx` or `layout.jsx` file in all your microfrontend applications:

> For \['nextjs']:

To get started, add the `PrefetchCrossZoneLinks` element to your `_app.tsx` or `_app.jsx` file:

Then in all microfrontends, use the `Link` component from `@vercel/microfrontends/next/client` anywhere you would use a normal link to automatically use the prefetching and prerendering optimizations.

```tsx
import { Link } from '@vercel/microfrontends/next/client';

export function MyComponent() {
  return (
    <>
      <Link href="/docs">Docs</Link>
    </>
  );
}
```

> **💡 Note:** When using this feature, all paths from the `microfrontends.json` file will be
> visible on the client side. This information is used to know which
> microfrontend each link comes from in order to apply prefetching and
> prerendering.

## Observability data routing

By default, observability data from [Speed Insights](/docs/speed-insights) and [Analytics](/docs/analytics) is routed to the default application. You can view this data in the **Speed Insights** and **Analytics** tabs of the Vercel project for the microfrontends group's default application.

Microfrontends also provides an option to route a project's own observability data directly to that Vercel project's page.

1. Ensure your Speed Insights and Analytics package dependencies are up to date. For this feature to work:
   - `@vercel/speed-insights` (if using) must be at version `1.2.0` or newer
   - `@vercel/analytics` (if using) must be at version `1.5.0` or newer
2. Visit the **Settings** tab for the project that you would like to change data routing.
3. Click on the **Microfrontends** tab.
4. Search for the **Observability Routing** setting.
5. Enable the setting to route the project's data to the project. Disable the setting to route the project's data to the default application.
6. The setting will go into effect for the project's next production deployment.

> **💡 Note:** Enabling or disabling this feature will **not** move existing data between the
> default application and the individual project. Historical data will remain in
> place.

If you are using Turborepo with `--env-mode=strict`, you need to either add `ROUTE_OBSERVABILITY_TO_THIS_PROJECT` and `NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH` to the allowed env variables or set `--env-mode` to `loose`. See [documentation](https://turborepo.com/docs/crafting-your-repository/using-environment-variables#environment-modes) for more information.


---

[View full sitemap](/docs/sitemap)
