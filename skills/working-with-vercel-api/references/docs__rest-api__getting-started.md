---
title: Make Your First Vercel API Request
product: vercel
url: /docs/rest-api/getting-started
canonical_url: "https://vercel.com/docs/rest-api/getting-started"
last_updated: 2026-08-28
type: tutorial
prerequisites:
  []
related:
  - /docs/accounts/access-tokens
  - /docs/rest-api/projects/retrieve-a-list-of-projects
  - /docs/rest-api/errors
  - /docs/limits
  - /docs/rest-api/sdk/projects/retrieve-a-list-of-projects
summary: Create a scoped Vercel access token, make a read-only REST API request, and call the same operation with the Vercel SDK.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/rest-api/getting-started.md"
fetched_at: "2026-09-07T09:06:17.588Z"
sha256: "a78e3bdff80c4e52092ed649f47f99f8bd2a4e36ec9dbd8c5f66f7f1f8b03bf4"
---

# Make Your First Vercel API Request

Use a Vercel access token to call the Vercel REST API with `curl`, then make the same request with `@vercel/sdk`. Both examples retrieve at most one project with `GET /v10/projects` and do not change your account.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List projects of an access group](https://vercel.com/docs/rest-api/access-groups/list-projects-of-an-access-group?from=related&source_path=%2Fdocs%2Frest-api%2Fgetting-started&source_site=vercel-docs&relationship=related) — GET /v1/access-groups/{idOrName}/projects — List projects of an access group
- [Create an access group project](https://vercel.com/docs/rest-api/access-groups/create-an-access-group-project?from=related&source_path=%2Fdocs%2Frest-api%2Fgetting-started&source_site=vercel-docs&relationship=related) — POST /v1/access-groups/{accessGroupIdOrName}/projects — Allows creation of an access group project
- [List project members](https://vercel.com/docs/rest-api/projectmembers/list-project-members?from=related&source_path=%2Fdocs%2Frest-api%2Fgetting-started&source_site=vercel-docs&relationship=related) — GET /v1/projects/{idOrName}/members — Lists all members of a project.
- [vercel api](https://vercel.com/docs/cli/api?from=related&source_path=%2Fdocs%2Frest-api%2Fgetting-started&source_site=vercel-docs&relationship=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [Get a project domain](https://vercel.com/docs/rest-api/projects/get-a-project-domain?from=related&source_path=%2Fdocs%2Frest-api%2Fgetting-started&source_site=vercel-docs&relationship=related) — GET /v9/projects/{idOrName}/domains/{domain} — Get project domain by project id/name and domain name.

Full cross-link map for this page: [/docs/rest-api/getting-started.graph.md](/docs/rest-api/getting-started.graph.md?from=related&source_path=%2Fdocs%2Frest-api%2Fgetting-started&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Prerequisites

- A [Vercel account](/signup)
- A terminal with `curl`
- An active Node.js LTS release and npm for the SDK steps

## Choose REST or the SDK

Both approaches call the same Vercel REST API operation and use the same access token:

| Approach | When to use it |
| --- | --- |
| REST with `curl` | You want to call the API directly from a shell or another HTTP client. |
| `@vercel/sdk` | You are using TypeScript or JavaScript and want generated methods and types. |

Complete both examples to confirm that your token works with direct HTTP requests and the SDK.

## Create a scoped access token

> **💡 Note:** Access tokens are secrets. Do not commit a token to source control or share it
> in logs and screenshots.

- ### Open the Account Tokens page
  Go to the [Account Tokens page](/account/tokens) and enter a descriptive name for the token.

- ### Choose the token scope and expiration
  Choose the narrowest scope that covers the projects you need to access with the API. The project-list operation works with Full Account, Team, and Project scopes. Then choose an expiration and select **Create**.

  See [access token scopes](/docs/accounts/access-tokens#token-scoping-levels) for the full behavior of each option.

- ### Store the token in your shell
  Copy the token when Vercel displays it. You cannot view its value again after leaving the page.

  In a bash or zsh terminal, run the following command. Paste the token when the terminal waits for input, then press Enter:
  ```bash filename="terminal"
  read -s VERCEL_TOKEN && export VERCEL_TOKEN
  ```
  The shell does not display the token. Keep this terminal open for the remaining steps.

## Make a request with `curl`

Send a `GET` request to `/v10/projects`. The `limit=1` query parameter limits the response, and the command saves the JSON body to `vercel-projects.json`:

```bash filename="terminal"
curl --fail-with-body --silent --show-error \
  --output vercel-projects.json \
  --write-out "HTTP %{http_code}\n" \
  "https://api.vercel.com/v10/projects?limit=1" \
  --header "Authorization: Bearer $VERCEL_TOKEN"
```

A successful request prints the following status:

```text
HTTP 200
```

The response body can be a project array or a paginated object with `projects` and `pagination`. See the [project-list response reference](/docs/rest-api/projects/retrieve-a-list-of-projects#responses) for every field.

## Make the same request with `@vercel/sdk`

- ### Create a Node.js project
  Create a directory and install the Vercel SDK:
  ```bash filename="terminal"
  mkdir vercel-api-quickstart
  cd vercel-api-quickstart
  npm init --yes
  npm install @vercel/sdk
  ```
  npm creates a `package.json` file and adds `@vercel/sdk` as a dependency.

- ### Add the SDK request
  Create an `index.mjs` file with the following code:
  ```js filename="index.mjs"
  import { Vercel } from '@vercel/sdk';

  const bearerToken = process.env.VERCEL_TOKEN;

  if (!bearerToken) {
    throw new Error('VERCEL_TOKEN is not set');
  }

  const vercel = new Vercel({ bearerToken });
  const result = await vercel.projects.getProjects({ limit: '1' });
  const projects = Array.isArray(result) ? result : result.projects;

  if (projects.length === 0) {
    console.log('Success: no projects in this token scope');
  } else {
    const project = projects[0];
    console.log(`Success: ${project.name} (${project.id})`);
  }
  ```
  In TypeScript, `getProjects` returns `Promise<GetProjectsResponseBody>`. The response type can be a project array or a paginated object, so the example normalizes both forms before reading the first project.

- ### Run the SDK request
  Run the script from the same terminal where you exported `VERCEL_TOKEN`:
  ```bash filename="terminal"
  node index.mjs
  ```
  If the token scope contains a project, the script prints a project name and ID:
  ```text
  Success: my-project (prj_xxxxxxxxxxxxxxxxxxxxxxxx)
  ```
  If the scope contains no projects, the script still confirms that the request succeeded:
  ```text
  Success: no projects in this token scope
  ```

## Understand account, team, and project scope

The token scope determines which projects `GET /v10/projects` can return:

| Token scope | Request target | `teamId` or `slug` behavior |
| --- | --- | --- |
| Full Account | Your personal account by default, or a team you belong to | Omit both for personal projects. Pass either value to target a team. |
| Team | Projects in the token's team | Omit both. Vercel infers the team from the token. |
| Project | The token's single project | Omit both. Vercel infers the team and project from the token. |

A project-scoped token denies requests for user-level resources, team-level resources, and other projects. See [access tokens](/docs/accounts/access-tokens) for token creation and scope details.

## Handle common `401`, `403`, and `429` responses

| Status | Cause | What to check |
| --- | --- | --- |
| `401 Unauthorized` | The API did not accept the authentication details. | Confirm that `VERCEL_TOKEN` is set and the header uses `Authorization: Bearer <token>`. |
| `403 Forbidden` | The token does not have permission to access the requested resource. | Check the token's expiration and scope. For a full-account token targeting a team, pass `teamId` or `slug`. |
| `429 Too Many Requests` | A platform-wide API rate limit rejected the request. | Reduce the request rate and retry after the limit resets. |

See [REST API errors](/docs/rest-api/errors) for error payloads and [API rate limits](/docs/limits#rate-limits) for limit scopes and reset behavior.

## What you learned

You authenticated with a Bearer token, called the read-only `GET /v10/projects` operation with `curl`, and called the same operation with `vercel.projects.getProjects`. You also learned how Full Account, Team, and Project token scopes affect requests.

## Explore the reference

- [Retrieve a list of projects with the REST API](/docs/rest-api/projects/retrieve-a-list-of-projects)
- [Retrieve a list of projects with the Vercel SDK](/docs/rest-api/sdk/projects/retrieve-a-list-of-projects)
- [Browse the Vercel REST API reference](/docs/rest-api)
- [Browse the Vercel SDK reference](/docs/rest-api/sdk)
- [Open the machine-readable OpenAPI description](https://openapi.vercel.sh/)


---

[View full sitemap](/docs/sitemap)
