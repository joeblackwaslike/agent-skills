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
  - /docs/frameworks/agents/eve
  - /docs/mcp
  - /docs/connect
  - /docs/cli
  - /docs/integrations/sanity-context
summary: Give eve agents access to MCP tools through filesystem connections and authorize requests with Vercel Connect.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/mcp/integrations/eve.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "6924c7eb9b60e38bcf6d93ded65ed3b4b66b9edb006795728ab27f8ebc65899d"
---

# eve with MCP

Connect an [eve](/docs/frameworks/agents/eve) agent to a [Model Context Protocol (MCP)](/docs/mcp) server by adding a connection under `agent/connections/`. The example below connects to Linear so your agent can discover tools and read your assigned issues. [Vercel Connect](/docs/connect) handles authorization and provider tokens.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a GitHub agent with eve and GitHub Tools](https://vercel.com/kb/guide/github-agent-eve) — Build a GitHub agent with eve, GitHub Tools, and Vercel Connect. Register AI-callable GitHub tools, gate writes behind d
- [Give your eve agent secure access to your private AWS RDS database](https://vercel.com/kb/guide/give-eve-agent-secure-access-to-aws-rds-database) — Connect an eve agent to a private AWS RDS database using Vercel Secure Compute and VPC peering, with a read-only query t
- [Build a ChatGPT Connector \\(MCP server\\)](https://vercel.com/kb/guide/mcp-server-chatgpt-connector) — Build a ChatGPT MCP server with mcp-handler and Fluid compute. Add search, fetch, and OAuth, deploy to Vercel, then vali
- [How to add tools to your eve agent](https://vercel.com/kb/guide/how-to-add-eve-tools) — Add tools to an eve agent by creating a TypeScript file under agent/tools/ with defineTool, and gate sensitive ones on h
- [Use Vercel](https://vercel.com/docs/agent-resources/vercel-mcp) — Vercel MCP has tools available for searching docs, managing teams, projects, and deployments, and querying Web Analytics
- [AI SDK and MCP with Vercel Connect](https://vercel.com/docs/connect/frameworks/ai-sdk-and-mcp) — Connect an AI SDK app to an OAuth-protected MCP server with Vercel Connect, then handle user consent and tool approval.
- [AI SDK with MCP](https://vercel.com/docs/mcp/integrations/ai-sdk) — Connect the AI SDK to an MCP server on Vercel, discover its tools, and call them with models served through AI Gateway.
- [Using eve with Chat SDK](https://vercel.com/docs/chat-sdk/eve) — Send Chat SDK messages to an eve agent with a channel, persistent state, and Vercel Connect.
- [Agent Resources](https://vercel.com/docs/agent-resources) — Set up AI coding tools with Vercel documentation, reusable skills, and secure access to projects, deployments, and logs.

Full cross-link map for this page: [/docs/mcp/integrations/eve.graph.md](/docs/mcp/integrations/eve.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

Before you begin, you need:

- An existing eve project. To create one, run `pnpm dlx eve@latest init my-agent`, then `cd my-agent`.
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

## Frequently asked questions

### How do I limit which MCP tools an eve agent can use?

Add `tools` to the connection with either `allow` or `block`, but not both. For example, `tools: { allow: ['search_issues', 'get_issue'] }` lets the model discover only those two tools, while `block` hides specific tools from a larger set. Prefer `allow` when the server also exposes tools that write data. eve names each tool `<connection>__<tool>`, such as `linear__search_issues`. See [Tool filters](https://eve.dev/docs/connections/mcp#tool-filters) in the eve documentation.

### Can an eve agent ask for approval before it calls an MCP tool?

Yes. Set `approval` on the connection. The `never()`, `once()`, `always()`, and `auto()` helpers apply one policy to every tool on the connection. For finer control, pass a function that receives `toolName`, `toolInput`, and `toolAnnotations` and returns `'user-approval'` to pause for a person or `'not-applicable'` to run the call. `toolName` includes the connection prefix, so match it with `endsWith()`. While the agent waits for an answer, eve suspends the session's workflow until the answer arrives. See [Approval gates](https://eve.dev/docs/connections/mcp#approval-gates).

### Can I connect eve to an MCP server that uses an API key instead of OAuth?

Yes. Return `{ token }` from `auth.getToken`, and eve sends it as an `Authorization: Bearer` header on every request. Use `headers` for a server that expects a different header, and omit both only for a public server. Store the key in an environment variable. You don't need Vercel Connect for a static credential. To connect [Sanity Context](/docs/integrations/sanity-context) this way, pass an organization API token with Context permissions. The [Sandbox data analysis guide](/kb/guide/large-scale-data-analysis-vercel-sandbox-mcp) uses this approach to connect eve to an MCP server that runs SQL and Python in Vercel Sandbox.

### Can I publish an eve agent as an MCP server?

Yes. Create `agent/channels/mcp.ts` and export `mcpChannel` from `eve/channels/mcp` with an `auth` strategy, which the channel requires. The channel serves Streamable HTTP at `/eve/v1/mcp`. Clients such as Claude Code start work with the `agent_start` tool and check on it with `agent_get`. Once `agent_start` returns, the work survives restarts and redeploys. Set `tools: true` to also publish the agent's own tools for clients to call directly. See [MCP channel](https://eve.dev/docs/channels/mcp).

### Which Vercel services does an eve agent with MCP connections use?

On Vercel, eve sends model requests through [AI Gateway](/docs/ai-gateway) and authenticates with your project's OIDC identity, so you don't add a provider API key. Each session runs on [Vercel Workflows](/docs/workflows), which checkpoints progress and resumes pending work after interruptions. [Vercel Sandbox](/docs/sandbox) isolates code that the agent runs. [Vercel Connect](/docs/connect) stores each user's OAuth grant and issues tokens for MCP connections. See [eve on Vercel](/docs/frameworks/agents/eve).

## Next steps

- Follow [Vercel Connect with eve](/docs/connect/frameworks/eve) for scopes, subject mapping, and credential management.
- Explore [MCP integrations](/docs/mcp/integrations) for AI SDK and TanStack AI examples.

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
