---
title: Project links
product: vercel
url: /docs/connect/concepts/project-links
canonical_url: "https://vercel.com/docs/connect/concepts/project-links"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/connect/concepts
  - /docs/connect
related:
  - /docs/deployments/environments
  - /docs/oidc
  - /docs/connect/concepts/tokens
  - /docs/connect/concepts/authentication
  - /docs/cli/connect
summary: A project link binds a connector to a Vercel project, scoped to one or more environments. The link is what authorizes a runtime token request.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/concepts/project-links.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "b54b1966d0a3784401556974dbe387656cac91f36199e309c627ac91d8215239"
---

# Project links

A **project link** connects a team-owned connector to one Vercel project on the same team and records the environments where that project can request tokens from the connector. A connector can have a separate project link for each project that uses it.

For example, if the link between `slack/acme-slack` and `my-project` includes Production and a `qa` [Custom Environment](/docs/deployments/environments#custom-environments), deployments in those two environments can request tokens from the connector. Preview and Development deployments cannot. To use the same connector from another project, create another project link for that project.

The link is what authorizes a runtime token request. When your deployment calls `getToken`, the Vercel Connect API checks the calling project's [OIDC token](/docs/oidc) against the connector's project links. If no link exists for the calling project, or the link exists but doesn't include the calling environment, the API rejects the request.

## Why per-environment scoping

Project links restrict which deployment environments can request tokens from a connector. They do not add restrictions to a provider token after it is issued, and environments on the same connector can use the same provider installation. For provider-level isolation, create a separate connector for each environment, install each connector separately, and request the narrowest scopes each integration needs.

## Creating a link

### Use the dashboard

1. From the Vercel Dashboard, open **Connect** for your team.
2. Select the connector you want to use.
3. Under **Projects**, add a project or edit an existing project.
4. Under **Environments**, select each environment that can request tokens, including any Custom Environments.
5. Select **Connect** for a new project or **Save** when editing.

Custom Environments appear alongside Production, Preview, and Development. You can select more than one environment when the same project needs access from multiple environments.

### Use the CLI

Run `vercel connect attach` from a directory linked to a Vercel project, or pass `--project` to select one. Pass a built-in environment name or Custom Environment slug to `--environment`:

```bash filename="terminal"
vercel connect attach slack/acme-slack --project my-project --environment qa
```

Repeat `--environment`, or provide a comma-separated list, to enable more than one environment. If you omit the option, the CLI links `production`, `preview`, and `development`. It does not automatically include Custom Environments.

## Errors

Two runtime errors map to project-link state:

- `ClientNotLinkedToProjectError`: no link exists between the calling project and this connector.
- `ClientNotEnabledForEnvironmentError`: the link exists, but its environment list does not include the environment the OIDC token was issued for.

Both are terminal for user-authenticated calls. A team member must use the dashboard's project-page link UI or the user-auth upsert endpoint to fix them.

## Lifecycle

Project links are created when a team member attaches a connector to a project and removed with `vercel connect detach` or from the dashboard. Removing a link does not delete the connector or any installations. It only revokes the project's ability to request tokens.

Deleting a Custom Environment immediately prevents deployments that use its identity from requesting tokens. Vercel Connect also removes the environment from its project links. Other environments remain linked. If no environments remain, Vercel removes the project link.

## Next steps

- [Tokens](/docs/connect/concepts/tokens): How a token request is shaped and how project-link state surfaces as errors.
- [Authentication](/docs/connect/concepts/authentication): What the OIDC token carries and how the API checks it.
- [CLI Reference](/docs/cli/connect): Full surface of `vercel connect attach` and `detach`.


---

[View full sitemap](/docs/sitemap)
