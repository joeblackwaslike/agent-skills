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
  - /docs/rest-api/deployments/list-deployments
  - /docs/accounts
summary: Create and scope Vercel access tokens to your full account, a team, or a single project, then use them to authenticate API and CLI requests.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/accounts/access-tokens.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "d5c7b70959c890e8f2100e94897954fe12d3b3df7e83a615730d5ff2ac9749bb"
---

# Access tokens

Vercel access tokens authenticate requests to the [Vercel REST API](/docs/rest-api#creating-an-access-token) and the [Vercel CLI](/docs/cli/tokens) on your behalf. You create and manage them on the [Account Tokens page](https://vercel.com/account/tokens), under the Settings area of your account, and you can also create them without the dashboard using the [REST API](/docs/rest-api/authentication/create-an-auth-token) or the CLI.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I use a Vercel API Access Token?](https://vercel.com/kb/guide/how-do-i-use-a-vercel-api-access-token?from=related&source_path=%2Fdocs%2Faccounts%2Faccess-tokens&source_site=vercel-docs&relationship=related) — An Access Token is required in order to use the Vercel API. Tokens can be created and managed at the level of your accou
- [Project-scoped Tokens](https://vercel.com/changelog/project-scoped-tokens?from=related&source_path=%2Fdocs%2Faccounts%2Faccess-tokens&source_site=vercel-docs&relationship=related)
- [Make Your First Vercel API Request](https://vercel.com/docs/rest-api/getting-started?from=related&source_path=%2Fdocs%2Faccounts%2Faccess-tokens&source_site=vercel-docs&relationship=related) — Create a scoped Vercel access token, make a read-only REST API request, and call the same operation with the Vercel SDK.
- [Tokens](https://vercel.com/docs/sign-in-with-vercel/tokens?from=related&source_path=%2Fdocs%2Faccounts%2Faccess-tokens&source_site=vercel-docs&relationship=related) — Learn how to Sign in with Vercel
- [List Auth Tokens](https://vercel.com/docs/rest-api/authentication/list-auth-tokens?from=related&source_path=%2Fdocs%2Faccounts%2Faccess-tokens&source_site=vercel-docs&relationship=related) — GET /v6/user/tokens — Retrieve a list of the current User's authentication tokens.
- [Create an access group project](https://vercel.com/docs/rest-api/access-groups/create-an-access-group-project?from=related&source_path=%2Fdocs%2Faccounts%2Faccess-tokens&source_site=vercel-docs&relationship=related) — POST /v1/access-groups/{accessGroupIdOrName}/projects — Allows creation of an access group project
- [Authentication](https://vercel.com/docs/connect/concepts/authentication?from=related&source_path=%2Fdocs%2Faccounts%2Faccess-tokens&source_site=vercel-docs&relationship=related) — Every Vercel Connect token request has two legs that both have to authenticate: the caller calling Vercel Connect, and V

Full cross-link map for this page: [/docs/accounts/access-tokens.graph.md](/docs/accounts/access-tokens.graph.md?from=related&source_path=%2Fdocs%2Faccounts%2Faccess-tokens&source_site=vercel-docs&relationship=graph)
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

## Create an access token

Create a Vercel API access token from your personal account's [**Account Tokens** page](https://vercel.com/account/tokens):

1. Enter a descriptive token name.
2. Open **Scope** and choose the resources the token needs. Select **Full Account** for personal account access, or select a team to limit access to that team. If the team opens a project list, select **All Projects** for team access or an individual project for project access.
3. Choose an expiration and select **Create**.
4. Copy the token and store it securely. Vercel shows the value only once.

Choose the narrowest [scope](#token-scoping-levels) that supports your task. For a walkthrough of project access, see [Project-scoped access token](#project-scoped-access-token).

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

### List deployments with an access token

To [list deployments](/docs/rest-api/deployments/list-deployments), send a request to `GET /v7/deployments`. Store your token in the `VERCEL_ACCESS_TOKEN` environment variable, then run:

```bash filename="terminal"
curl "https://api.vercel.com/v7/deployments" \
  -H "Authorization: Bearer $VERCEL_ACCESS_TOKEN"
```

The response contains a `deployments` array and pagination information. A full-account token targets your personal account by default. A team- or project-scoped token targets the resources in its scope.

For a full-account token targeting a team, set `VERCEL_TEAM_ID` to the team's ID from [team settings](/docs/accounts#find-your-team-id), then include `teamId` in the request:

```bash filename="terminal"
curl "https://api.vercel.com/v7/deployments?teamId=$VERCEL_TEAM_ID" \
  -H "Authorization: Bearer $VERCEL_ACCESS_TOKEN"
```

You can also make the request from server-side JavaScript:

```js filename="list-deployments.mjs"
const url = new URL('https://api.vercel.com/v7/deployments');
if (process.env.VERCEL_TEAM_ID) {
  url.searchParams.set('teamId', process.env.VERCEL_TEAM_ID);
}

const response = await fetch(url, {
  headers: {
    Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
  },
});

if (!response.ok) {
  throw new Error(`Vercel API request failed: ${response.status}`);
}

const { deployments } = await response.json();
console.log(deployments);
```

This prints the deployments accessible to the token and selected team. Keep the token in server-side environment variables rather than client-side code.

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
