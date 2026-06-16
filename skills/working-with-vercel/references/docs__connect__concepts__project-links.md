---
title: Project links
product: vercel
url: /docs/connect/concepts/project-links
canonical_url: "https://vercel.com/docs/connect/concepts/project-links"
last_updated: 2026-06-03
type: conceptual
prerequisites:
  - /docs/connect/concepts
  - /docs/connect
related:
  - /docs/oidc
  - /docs/connect/concepts/tokens
  - /docs/connect/concepts/authentication
  - /docs/cli/connect
summary: A project link binds a connector to a Vercel project, scoped to one or more environments. The link is what authorizes a runtime token request.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/concepts/project-links.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "0b1adbf4d2d0af5130f86906ac5945cbe4d1ac4fbcb3aa95e3e22c1bbaa5ee1b"
---

# Project links

A **project link** is the binding between a connector (owned by a team) and one or more Vercel projects (also owned by that team). Each link records a set of environments (`production`, `preview`, `development`) in which the project is allowed to request tokens from the connector.

The link is what authorizes a runtime token request. When your deployment calls `getToken`, the Vercel Connect API checks the calling project's [OIDC token](/docs/oidc) against the connector's project links. If no link exists for the calling project, or the link exists but doesn't include the calling environment, the API rejects the request.

## Why per-environment scoping

A token compromised in `preview` should not be usable in `production`. By scoping the link per environment, each environment carries its own authorization grant and scopes. For sensitive connectors, link a separate connector to each environment: production has its own connector with its own installation, preview has another, development has another.

## Creating a link

From the CLI:

```bash filename="terminal"
vercel connect attach slack/acme-slack --project my-project --environment production
```

From the dashboard, open the connector and use the **Linked Projects** UI to add a project and select environments.

## Errors

Two runtime errors map to project-link state:

- `ClientNotLinkedToProjectError`: no link exists between the calling project and this connector.
- `ClientNotEnabledForEnvironmentError`: the link exists, but its environment list does not include the environment the OIDC token was issued for.

Both are terminal for user-authenticated calls. A team member must use the dashboard's project-page link UI or the user-auth upsert endpoint to fix them.

## Lifecycle

Project links are created when a team member attaches a connector to a project and removed with `vercel connect detach` or from the dashboard. Removing a link does not delete the connector or any installations; it only revokes the project's ability to request tokens.

## Next steps

- [Tokens](/docs/connect/concepts/tokens): How a token request is shaped and how project-link state surfaces as errors.
- [Authentication](/docs/connect/concepts/authentication): What the OIDC token carries and how the API checks it.
- [CLI Reference](/docs/cli/connect): Full surface of `vercel connect attach` and `detach`.


---

[View full sitemap](/docs/sitemap)
