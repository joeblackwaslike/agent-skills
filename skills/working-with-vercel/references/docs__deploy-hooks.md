---
title: Creating & Triggering Deploy Hooks
product: vercel
url: /docs/deploy-hooks
canonical_url: "https://vercel.com/docs/deploy-hooks"
last_updated: 2026-07-23
type: conceptual
prerequisites:
  []
related:
  - /docs/builds/configure-a-build
  - /docs/projects
  - /docs/project-configuration/git-configuration
  - /docs/deployments/troubleshoot-a-build
  - /docs/limits
summary: Learn how to create and trigger deploy hooks to integrate Vercel deployments with other systems.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deploy-hooks.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "4af7930d4d3a8e679001dddd16adb89b4d3fe5c2f0e8dec392b06e5e6b8f1dba"
---

# Creating & Triggering Deploy Hooks

Deploy Hooks allow you to create URLs that accept HTTP `POST` requests in order to trigger deployments and re-run the [Build Step](/docs/builds/configure-a-build). These URLs are uniquely linked to your project, repository, and branch, so there is no need to use any authentication mechanism or provide any payload to the `POST` request.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to use Deploy Hooks with Vercel and a Headless CMS](https://vercel.com/kb/guide/set-up-and-use-deploy-hooks-with-vercel-and-headless-cms?from=related) — Create your own Deploy Hooks to trigger automatic deployments on Vercel when using a Headless CMS.
- [Can you deploy based on tags/releases on Vercel?](https://vercel.com/kb/guide/can-you-deploy-based-on-tags-releases-on-vercel?from=related) — Learn how to deploy based on tags/releases on Vercel.
- [Why aren't commits triggering deployments on Vercel?](https://vercel.com/kb/guide/why-aren-t-commits-triggering-deployments-on-vercel?from=related) — Commits not triggering deployments on Vercel? Walk the diagnostic checklist covering authentication, commit author acces
- [vercel deploy-hooks](https://vercel.com/docs/cli/deploy-hooks?from=related) — Manage Deploy Hooks for Git-triggered builds from the Vercel CLI: list, create, and remove deploy hook URLs that trigger
- [Deployments](https://vercel.com/docs/deployments?from=related) — Learn how to create and manage deployments on Vercel.
- [Managing Deployments](https://vercel.com/docs/deployments/managing-deployments?from=related) — Learn how to manage your current and previously deployed projects to Vercel through the dashboard. You can redeploy at a
- [Webhooks](https://vercel.com/docs/webhooks?from=related) — Learn how to set up webhooks and use them with Vercel Integrations.
- [Git Settings](https://vercel.com/docs/project-configuration/git-settings?from=related) — Use the project settings to manage the Git connection, enable Git LFS, and create deploy hooks.

Full cross-link map for this page: [/docs/deploy-hooks.graph.md](/docs/deploy-hooks.graph.md)
<!-- /docsgraph:related -->

This feature allows you to integrate Vercel deployments with other systems. For example, you can set up:

- Automatic deployments on content changes from a Headless CMS
- Scheduled deployments by configuring third-party cron job services to trigger the Deploy Hook
- Forced deployments from the command line

## Creating a Deploy Hook

To create a Deploy Hook for your project, make sure your project is [connected to a Git repository](/docs/projects#git).

Once your project is connected, navigate to its **Settings** page and then select the **Git** menu item.

In the "Deploy Hooks" section, choose a name for your Deploy Hook and select the branch that will be deployed when the generated URL is requested.

![Image](`/docs-assets/static/docs/concepts/deployments/git/deploy-hooks-light.png`)

*Creating a new Deploy Hook.*

> **💡 Note:** Use a name that clearly identifies the Deploy Hook so you can tell when it
> triggers a deployment. Create only one Deploy Hook per branch unless you're
> using multiple data sources.

After submitting the form, you will see a URL that you can copy and use.

## Triggering a Deploy Hook

To trigger a Deploy Hook, send a GET or POST request to the provided URL.

> **💡 Note:** Deploy Hooks will not be triggered if you have the `github.enabled = false`
> [configuration](/docs/project-configuration/git-configuration#github.enabled)
> present in your `vercel.json` file.

Here's an example request and response you can use for testing:

#### Example Request

```bash filename="example-request"
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_98g22o5YUFVHlKOzj9vKPTyN2SDG/tKybBxqhQs
```

#### Example Response

```json filename="example-response"
{
  "job": {
    "id": "okzCd50AIap1O31g0gne",
    "state": "PENDING",
    "createdAt": 1662825789999
  }
}
```

> **💡 Note:** You do not need to add an authorization header. See [Security](#security) to
> learn more.

After sending a request, you can see that it triggered a deployment on your project dashboard.

![Image](`/docs-assets/static/docs/concepts/deployments/git/deploy-hook-deployed-light.png`)

*Deployments triggered by a Deploy Hook are marked in the list.*

## Security

When you create a Deploy Hook, Vercel generates a unique identifier in the URL. This allows anyone with the URL to deploy your project, so treat it with the same security as you would any other token or password.

If you believe your Deploy Hook URL has been compromised, you can revoke it and create a new one.

## Build Cache

Builds triggered by a Deploy Hook are automatically provided with
an appropriate [Build Cache](/docs/deployments/troubleshoot-a-build#what-is-cached) by default, if it exists.

Caching helps speed up the [Build Step](/docs/builds/configure-a-build), so we encourage you to keep the default behavior.
However, if you explicitly want to opt out of using a Build Cache, you can disable it by
appending `?buildCache=false` to the Deploy Hook URL.

Here is an example request that explicitly disables the Build Cache:

```bash filename="example-request"
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_98g22o5YUFVHlKOzj9vKPTyN2SDG/tKybBxqhQs?buildCache=false
```

> **💡 Note:** Deploy Hooks created before May 11th, 2021 do not have the Build Cache enabled
> by default. To change it, you can either explicitly append `?buildCache=true`
> to the Deploy Hook URL, or replace your existing Deploy Hook with a newly
> created one.

## Other Optimizations

If you send multiple requests to deploy the same version of your project,
previous deployments for the same Deploy Hook will be canceled to reduce build times.

## Limits

- Hobby and Pro accounts have a limit of 5 deploy hooks per project. Enterprise accounts have a limit of 10 deploy hooks per project.
- You can trigger deploy hooks up to 60 times per hour per project, across all deploy hooks in the project. See [Rate limits](/docs/limits#rate-limits) for more information.

## Troubleshooting

If your deploy hook fails to create a deployment, check the status check on the commit associated with the deploy hook to identify any failures. See [Troubleshooting project collaboration](/docs/deployments/troubleshoot-project-collaboration) for more information.


---

[View full sitemap](/docs/sitemap)
