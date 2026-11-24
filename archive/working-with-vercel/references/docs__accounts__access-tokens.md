---
title: Access tokens
product: vercel
url: /docs/accounts/access-tokens
canonical_url: "https://vercel.com/docs/accounts/access-tokens"
last_updated: 2026-11-14
type: how-to
prerequisites:
  - /docs/accounts
related:
  - /docs/rest-api
  - /docs/cli/tokens
  - /docs/rest-api/authentication/create-an-auth-token
  - /docs/cli/deploy
  - /docs/deployments/deploy-without-logging-in
summary: Create and scope Vercel access tokens to your full account, a team, or a single project, then use them to authenticate API and CLI requests.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/accounts/access-tokens.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "e60372a4a2a3c648ce9ec3b3ba468945fcc239f31b2d53abf6b3198ef43e4edc"
---

# Access tokens

Vercel access tokens authenticate requests to the [Vercel REST API](/docs/rest-api#creating-an-access-token) and the [Vercel CLI](/docs/cli/tokens) on your behalf. You create and manage them on the [Account Tokens page](https://vercel.com/account/tokens), under the Settings area of your account, and you can also create them without the dashboard using the [REST API](/docs/rest-api/authentication/create-an-auth-token) or the CLI.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel token scanning expands to more public sources](https://vercel.com/changelog/vercel-token-scanning-expands-to-more-public-sources)
- [Make Your First Vercel API Request](https://vercel.com/docs/rest-api/getting-started) — Create a scoped Vercel access token, make a read-only REST API request, and call the same operation with the Vercel SDK.
- [Tokens](https://vercel.com/docs/sign-in-with-vercel/tokens) — Learn how to Sign in with Vercel
- [Scopes and Permissions](https://vercel.com/docs/sign-in-with-vercel/scopes-and-permissions) — Learn how to manage scopes and permissions for Sign in with Vercel
- [Authentication in Vercel Connect](https://vercel.com/docs/connect/concepts/authentication) — Every Vercel Connect token request has two legs that both have to authenticate: the caller calling Vercel Connect, and V
- [Manage Sign in with Vercel from the Dashboard](https://vercel.com/docs/sign-in-with-vercel/manage-from-dashboard) — Learn how to manage Sign in with Vercel from the Dashboard

Full cross-link map for this page: [/docs/accounts/access-tokens.graph.md](/docs/accounts/access-tokens.graph.md)
<!-- /docsgraph:related -->

A token's value appears only once, at creation, so copy it then and store it somewhere secure because you cannot retrieve it again afterward. Every token carries a scope that determines which resources it can reach. This page explains the three scoping levels and walks through [creating a **project-scoped token**](#project-scoped-access-token), which limits a token to a single project.

If you're looking for a token so you can deploy, and you don't have a Vercel account yet, you don't need one. Run [`vercel deploy --temporary`](/docs/cli/deploy#temporary) to deploy without credentials, then claim the project. See [Deploying without logging in](/docs/deployments/deploy-without-logging-in).

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

The response contains a `deployments` array and pagination information. A full-account token targets your [default team](/docs/accounts#default-team) by default. A team- or project-scoped token targets the resources in its scope.

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

### Troubleshoot authentication errors

If a request with a token fails, read the `error` object in the response body to find the cause:

| Response | Cause | Fix |
| --- | --- | --- |
| `403` with `"invalidToken": true` | The token is wrong, expired, or deleted. | Check that the header reads `Authorization: Bearer <token>` and that the token still appears on the [Account Tokens page](/account/tokens). If you've lost the token, create a new one. |
| `403` with `"missingToken": true` | The request has no `Authorization` header, or the header isn't in the form `Bearer <token>`. A common cause is an environment variable that's empty in the current shell. | Check that the header reads `Authorization: Bearer <token>`. Run `echo "${VERCEL_ACCESS_TOKEN:+set}"` to confirm the variable is set, then send the request from the same shell. |
| A team's resources are missing, or the request is denied, with a full-account token | A full-account token targets your default team unless you specify a team. | Add `teamId` or `slug` to the request. |
| A project-scoped token is denied | Project-scoped tokens can't access other projects, team-level resources, or user-level resources. | Use a team-scoped token, or a project-scoped token for the project you're requesting. |
| `429` | The request exceeded a [REST API rate limit](/docs/limits#rate-limits). | Reduce your request rate and retry after the limit resets. |

## Create and manage tokens programmatically

You can create tokens without the dashboard through two paths.

- **REST API**, where the [create an auth token](/docs/rest-api/authentication/create-an-auth-token) endpoint accepts an optional `projectId` in the request body to scope the token to a project.
- **Vercel CLI**, where [`vercel tokens`](/docs/cli/tokens) manages tokens from the command line. A [`vercel login`](/docs/cli/login) session can't create tokens, so pass an existing access token to the CLI with the [`--token` option or the `VERCEL_TOKEN` environment variable](/docs/cli/global-options#token). To create a project-scoped token, pass a [team-scoped token](#create-an-access-token) for the team that owns the project and run `vercel tokens create <TOKEN_NAME> --project <PROJECT_ID>`. The command takes the team from the token's scope, so a full-account token doesn't work with `--project`.

> **💡 Note:** Creating a full-account token through the CLI or API, or a team-scoped token through the API, requires a full-account token. A team-scoped token can create only project-scoped tokens for projects in its team. A
> project-scoped token cannot mint new tokens.

## Review a token's use

The Vercel REST API returns when a request last used a token, and your team's Activity Log shows which events happened on the team and the user involved in each one.

### Read a token's last-used timestamp with the REST API

The [Get Auth Token Metadata](/docs/rest-api/authentication/get-auth-token-metadata) endpoint, `GET /v5/user/tokens/{tokenId}`, returns the token's `activeAt` field, the timestamp in milliseconds of the most recent request that used the token. Pass `current` as the `tokenId` to read the metadata for the token that authenticates the request. With your token in the `VERCEL_ACCESS_TOKEN` environment variable, run:

```bash filename="terminal"
curl "https://api.vercel.com/v5/user/tokens/current" \
  -H "Authorization: Bearer $VERCEL_ACCESS_TOKEN"
```

The response contains a `token` object with `activeAt` alongside the token's other metadata:

```json
{
  "token": {
    "activeAt": 1234567890123,
    "createdAt": 1234567890123,
    "id": "your_token_id_here",
    "name": "your_token_name_here",
    "type": "token"
  }
}
```

To check all of your tokens, call the [List Auth Tokens](/docs/rest-api/authentication/list-auth-tokens) endpoint, `GET /v6/user/tokens`, which returns `activeAt` for each token in its `tokens` array. This endpoint requires a Full Account token. It returns tokens in pages. When `pagination.next` isn't `null`, pass its value as the `until` query parameter to request the next page.

### Review team events in the Activity Log or Audit Logs

The [Activity Log](/docs/activity-log), available on all plans, lists the events on a team with the user involved, the type of event, and the time it happened. See [Events logged](/docs/activity-log#events-logged) for the events the Activity Log records, or query the same events from the command line with [`vercel activity`](/docs/cli/activity).

On Enterprise plans, team members with the owner or security role can use [Audit Logs](/docs/audit-log) for security review. Audit Logs include Activity Log events and additional audit metadata. You can export Audit Logs as a CSV file for the last 90 days, or forward them to an external destination with [Audit Log Drains](/docs/drains/reference/audit-logs).

## Related

- [Vercel REST API authentication](/docs/rest-api#creating-an-access-token)
- [Managing tokens with the Vercel CLI](/docs/cli/tokens)
- [Create an auth token API endpoint](/docs/rest-api/authentication/create-an-auth-token)
- [Account Management](/docs/accounts)
- [Get Auth Token Metadata API endpoint](/docs/rest-api/authentication/get-auth-token-metadata)
- [Activity Log](/docs/activity-log)
- [Audit Logs](/docs/audit-log)

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
