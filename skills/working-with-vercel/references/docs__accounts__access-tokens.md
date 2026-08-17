---
title: Access tokens
product: vercel
url: /docs/accounts/access-tokens
canonical_url: "https://vercel.com/docs/accounts/access-tokens"
last_updated: 2026-08-03
type: how-to
prerequisites:
  - /docs/accounts
related:
  - /docs/rest-api
  - /docs/cli/tokens
  - /docs/rest-api/authentication/create-an-auth-token
  - /docs/accounts
summary: Create and scope Vercel access tokens to your full account, a team, or a single project, then use them to authenticate API and CLI requests.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/accounts/access-tokens.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "c2fc65d606e5b71be0c23b5fb2e69d20b62ff85402d8f68a0f39cad4c69060ad"
---

# Access tokens

Vercel access tokens authenticate requests to the [Vercel REST API](/docs/rest-api#creating-an-access-token) and the [Vercel CLI](/docs/cli/tokens) on your behalf. You create and manage them on the [Account Tokens page](https://vercel.com/account/tokens), under the Settings area of your account, and you can also create them without the dashboard using the [REST API](/docs/rest-api/authentication/create-an-auth-token) or the CLI.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I use a Vercel API Access Token?](https://vercel.com/kb/guide/how-do-i-use-a-vercel-api-access-token?from=related) — An Access Token is required in order to use the Vercel API. Tokens can be created and managed at the level of your accou
- [Tokens](https://vercel.com/docs/sign-in-with-vercel/tokens?from=related) — Learn how to Sign in with Vercel
- [Scopes & Permissions](https://vercel.com/docs/sign-in-with-vercel/scopes-and-permissions?from=related) — Learn how to manage scopes and permissions for Sign in with Vercel
- [Building Integrations with Vercel REST API](https://vercel.com/docs/integrations/create-integration/vercel-api-integrations?from=related) — Learn how to use Vercel REST API to build your integrations and work with redirect URLs.
- [Authentication](https://vercel.com/docs/connect/concepts/authentication?from=related) — Every Vercel Connect token request has two legs that both have to authenticate: the caller calling Vercel Connect, and V
- [Tokens](https://vercel.com/docs/connect/concepts/tokens?from=related) — Short-lived provider credentials issued by Vercel Connect. Each token request specifies a subject, optional installation

Full cross-link map for this page: [/docs/accounts/access-tokens.graph.md](/docs/accounts/access-tokens.graph.md)
<!-- /docsgraph:related -->

A token's value appears only once, at creation, so copy it then and store it somewhere secure because you cannot retrieve it again afterward. Every token carries a scope that determines which resources it can reach. This page explains the three scoping levels and walks through [creating a **project-scoped token**](#project-scoped-access-token), which limits a token to a single project.

## Token scoping levels

When you create a token, you choose how far its access reaches. Vercel supports three levels:

| Scope             | Access                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Full Account**  | Acts on your personal account and every team you belong to. The Scope dropdown labels this option "Full Account".                    |
| **Team**          | Limited to a single team. The token can read and write that team's resources across all of its projects.                            |
| **Project**       | Limited to a single project within a team. The token can only read and write resources belonging to that one project.               |

A project-scoped token denies any request to another project, to a user-level resource, or to a team-level resource. This keeps jobs, tools, and workflows constrained to the projects they need rather than granting them the entire team or your full account.

> **💡 Note:** Some teams require you to enable two-factor authentication or SAML before you
> can create tokens scoped to them. If a team enforces this, the dashboard tells
> you so when you select it.

## Project-scoped access token

This section covers creating a project-scoped access token from the dashboard.

### Prerequisites

- A Vercel account.
- Membership in the team that owns the project you want to scope the token to.
- Two-factor authentication enabled on your account, if the target team requires it.

- ### Open the Account Tokens page
  In the scope selector at the top left of the dashboard's navigation bar, make sure you are viewing your personal account rather than a team. Then go to the [Account Tokens page](https://vercel.com/account/tokens), also found under the Settings area of your account.

- ### Name the token
  Enter a descriptive name for the token so you can identify it later.

- ### Select the team
  Open the **Scope** dropdown and select the team that owns the project. Clicking the team drills into its list of projects.

- ### Select the project
  Select the project you want the token to be limited to.
  > **💡 Note:** Selecting **All Projects** instead of an individual project creates a
  > team-scoped token rather than a project-scoped one.

- ### Choose an expiration and create the token
  Choose an expiration and select **Create**.

- ### Copy the token
  Copy the token now. Personal access tokens begin with the prefix `vcp_`, and the value will not be shown again.

## Use a scoped token with the API

Pass the token as a Bearer token in the `Authorization` header of your request.

```bash filename="terminal"
curl "https://api.vercel.com/v9/projects" \
  -H "Authorization: Bearer vcp_xxxxxxxxxxxxxxxxxxxxxxxx"
```

*Listing projects with a scoped access token*

Team- and project-scoped tokens do not require the `teamId` query parameter or the team `slug` on API requests. Vercel infers the team and project from the token's scope, so you can omit those parameters. Full-account tokens still need `?teamId=` when targeting a specific team's resources.

## Create and manage tokens programmatically

You can create tokens without the dashboard through two paths.

- **REST API**, where the [create an auth token](/docs/rest-api/authentication/create-an-auth-token) endpoint accepts an optional `projectId` in the request body to scope the token to a project.
- **Vercel CLI**, where [`vercel tokens`](/docs/cli/tokens) manages tokens from the command line. Use `vercel tokens add --project <PROJECT_ID>` to create a project-scoped token.

> **💡 Note:** Creating tokens through the CLI or API requires a full-account token. A
> project-scoped token cannot mint new tokens.

## Related

- [Vercel REST API authentication](/docs/rest-api#creating-an-access-token)
- [Managing tokens with the Vercel CLI](/docs/cli/tokens)
- [Create an auth token API endpoint](/docs/rest-api/authentication/create-an-auth-token)
- [Account Management](/docs/accounts)


---

[View full sitemap](/docs/sitemap)
