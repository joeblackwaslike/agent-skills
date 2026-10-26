---
title: eve with MCP
product: vercel
url: /docs/mcp/integrations/eve
canonical_url: "https://vercel.com/docs/mcp/integrations/eve"
last_updated: 2026-09-15
type: how-to
prerequisites:
  - /docs/mcp/integrations
  - /docs/mcp
related:
  - /docs/eve
  - /docs/mcp
  - /docs/connect
  - /docs/cli
  - /docs/connect/frameworks/eve
summary: Give eve agents access to MCP tools through filesystem connections and authorize requests with Vercel Connect.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/mcp/integrations/eve.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "617ee312055251773a41dbd385250dcc60dd44b733d8e9002fe1fd49bf0050d0"
---

# eve with MCP

Connect an [eve](/docs/eve) agent to a [Model Context Protocol (MCP)](/docs/mcp) server by adding a connection under `agent/connections/`. The example below connects to Linear so your agent can discover tools and read your assigned issues. [Vercel Connect](/docs/connect) handles authorization and provider tokens.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to perform large-scale data analysis with Vercel Sandbox and MCP](https://vercel.com/kb/guide/large-scale-data-analysis-vercel-sandbox-mcp) — Use Vercel Sandbox and an MCP server built with \\`mcp-handler\\` to let AI agents run DuckDB SQL and Python on large data
- [How to build a GitHub agent with eve and GitHub Tools](https://vercel.com/kb/guide/github-agent-eve) — Build a GitHub agent with eve, GitHub Tools, and Vercel Connect. Register AI-callable GitHub tools, gate writes behind d
- [Connections](https://eve.dev/docs/connections) — Expose external MCP and OpenAPI servers to the model, with connection tokens the model never sees.
- [Give your eve agent secure access to your private AWS RDS database](https://vercel.com/kb/guide/give-eve-agent-secure-access-to-aws-rds-database) — Connect an eve agent to a private AWS RDS database using Vercel Secure Compute and VPC peering, with a read-only query t
- [Connect a Warehouse (Optional)](https://eve.dev/docs/tutorial/connect-a-warehouse) — Optional follow-up to the Build an Agent tutorial. Let each user connect their own warehouse over an OAuth MCP via Verce
- [How to build a browser agent that works behind a login](https://vercel.com/kb/guide/build-a-browser-agent) — Build a browser agent with eve, Vercel Connect, and KERNEL managed auth that signs a user in through a human-in-the-loop
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga)
- [Integrations](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations) — Vercel MCP tools for integrations.
- [AI SDK and MCP with Vercel Connect](https://vercel.com/docs/connect/frameworks/ai-sdk-and-mcp) — Connect an AI SDK app to an OAuth-protected MCP server with Vercel Connect, then handle user consent and tool approval.
- [Use Vercel](https://vercel.com/docs/agent-resources/vercel-mcp) — Vercel MCP has tools available for searching docs, managing teams, projects, and deployments, and querying Web Analytics
- [Concepts](https://vercel.com/docs/eve/concepts) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.

Full cross-link map for this page: [/docs/mcp/integrations/eve.graph.md](/docs/mcp/integrations/eve.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

Before you begin, you need:

- An existing eve project. Start with the [eve overview](/docs/eve) if you don't have one.
- A Vercel account and [Vercel CLI](/docs/cli) installed.
- A Linear workspace you can authorize.
- An authenticated eve channel. Built-in platform channels identify the user from the sender. For a web channel, configure route authentication to return `principalType: 'user'` so eve can associate the connection with the current user.

## Install the integration

Install Vercel Connect in your existing eve project:

**pnpm**

```bash
pnpm i @vercel/connect eve
```

**yarn**

```bash
yarn add @vercel/connect eve
```

**npm**

```bash
npm i @vercel/connect eve
```

**bun**

```bash
bun add @vercel/connect eve
```

Link the directory to a Vercel project, then pull its environment variables:

```bash filename="Terminal"
vercel link
vercel env pull
```

The second command creates `.env.local` with a short-lived `VERCEL_OIDC_TOKEN`. Vercel Connect uses this token to authenticate your project. When you deploy to Vercel, token management happens automatically.

## Create and link a connector

Create a Linear connector:

```bash filename="Terminal"
vercel connect create linear --name acme-linear
```

Select the **MCP** connection method in the CLI prompts and complete any requested authorization. Then attach the connector to your linked project:

```bash filename="Terminal"
vercel connect attach linear/acme-linear
```

This links the connector to the project's Production, Preview, and Development environments. If you already have a Linear connector, attach that connector and use its UID or `scl_...` ID in the connection below.

## Define and authorize the connection

Create `agent/connections/linear.ts`:

```ts filename="agent/connections/linear.ts"
import { connect } from '@vercel/connect/eve';
import { defineMcpClientConnection } from 'eve/connections';

export default defineMcpClientConnection({
  url: 'https://mcp.linear.app/mcp',
  description: 'Linear issues, projects, cycles, and comments.',
  auth: connect({
    connector: 'linear/acme-linear',
    autoProvision: false,
  }),
});
```

eve discovers connections from the filesystem. The filename gives this connection the name `linear`, and the description helps the agent find relevant tools at runtime.

| Property | Purpose |
| --- | --- |
| `url` | The MCP server endpoint. |
| `description` | The services and tasks the connection supports, so the agent can discover relevant tools. |
| `auth` | The result of `connect()` from `@vercel/connect/eve`, using your connector's UID or ID. |

The example explicitly keeps `autoProvision: false`, the default, because you created and linked the connector. To opt in to runtime provisioning, set `autoProvision: true`. When a token or authorization request reports a missing connector or project link, Vercel Connect uses the connection URL and a provisionable connector UID to create or link a managed OAuth connector, then retries the request.

User authorization is the default. eve identifies the current user from the channel, and Vercel Connect keeps a separate authorization grant for each user. Linking the connector to the project allows the project to request tokens; each user still authorizes access to their own account.

## Call a tool

Send a message to your agent through its authenticated channel:

```text filename="Agent prompt"
Use the Linear connection to list my assigned issues.
```

When you first use the connection:

1. eve requests a token for the current user from Vercel Connect.
2. If the user has no valid grant, eve pauses the turn and presents an authorization URL or device code.
3. Complete the authorization in your browser. Vercel Connect resumes eve through its callback or secure webhook.
4. eve requests the token again, then discovers and calls the Linear tools needed to answer your prompt.

The agent can return the issues your account has permission to read. Subsequent requests use the existing grant while it remains valid.

## Choose user or app authorization

Choose the authorization mode based on whose account the agent should use:

| Mode | Use when | Consent behavior |
| --- | --- | --- |
| `user` (default) | Each person connects their own provider account. | eve can pause the turn and ask the user to authorize. |
| `app` | A background agent shares one installed credential. | Authorization is non-interactive and requires an app credential to be installed beforehand. |

For an app connection, set `principalType: 'app'` in the `connect()` options. If the app credential is missing, eve reports an authorization failure that an operator must resolve. It does not start a user consent flow.

For an example that uses app authorization to investigate deployment failures, follow [Manage Vercel projects with a software factory](/kb/guide/software-factory-vercel-mcp). It connects an eve agent to Vercel MCP with access to build logs, runtime errors, and deployment history.

## Troubleshoot the connection

| Problem | What to check |
| --- | --- |
| The first tool call fails with `principal_required`. | Ensure the channel authenticates the caller as a user principal. For a web channel, route authentication must return `principalType: 'user'`. |
| Local requests fail after previously working. | Run `vercel env pull` to refresh an expired development OIDC token, then restart your local process so it loads the updated environment. |
| The connector is unavailable to the project. | Check that the UID in `connect()` matches your connector and run `vercel connect attach <connector>` for the linked project. Custom Environments require an explicit environment link. |
| App authorization fails because no credential is installed. | Install the app credential before invoking the agent. App authorization cannot prompt an end user for consent. |

## Next steps

- Follow [Vercel Connect with eve](/docs/connect/frameworks/eve) for scopes, subject mapping, and credential management.
- Explore [MCP integrations](/docs/mcp/integrations) for AI SDK and TanStack AI examples.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
