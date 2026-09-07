---
title: eve
product: vercel
url: /docs/connect/frameworks/eve
canonical_url: "https://vercel.com/docs/connect/frameworks/eve"
last_updated: 2026-08-28
type: how-to
prerequisites:
  - /docs/connect/frameworks
  - /docs/connect
related:
  - /docs/connect/concepts/authentication
  - /docs/connect/concepts/triggers
  - /docs/cli/connect
  - /docs/connect/concepts/installations
  - /docs/connect/concepts/tokens
summary: Use Vercel Connect to configure eve channel credentials, authorize MCP client connections, and authenticate inbound Connect OAuth requests.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/frameworks/eve.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "13ca54ad1c307de0c9ef2cc8cf6aa565eecb9042118c739c59f7b265c99b1b77"
---

# eve

> **🔒 Permissions Required**: Vercel Connect

The `@vercel/connect/eve` entrypoint adapts Vercel Connect credentials to
eve's connection and channel APIs. It uses your deployment's
[Vercel OIDC token](/docs/connect/concepts/authentication) to request provider
tokens, so your app doesn't store provider refresh tokens.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Feve&source_site=vercel-docs&relationship=related)
- [The end of credential sprawl for agents](https://vercel.com/blog/the-end-of-credential-sprawl-for-agents?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Feve&source_site=vercel-docs&relationship=related)
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Feve&source_site=vercel-docs&relationship=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [Introducing Vercel Connect](https://vercel.com/blog/introducing-vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Feve&source_site=vercel-docs&relationship=related)
- [Build an integrations hub with Nuxt and Vercel Connect](https://vercel.com/kb/guide/nuxt-and-vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Feve&source_site=vercel-docs&relationship=related) — Build an Integrations Hub with Nuxt and Vercel Connect. Connect GitHub and Linear over OAuth and mint short-lived tokens
- [How to build a GitHub agent with eve and GitHub Tools](https://vercel.com/kb/guide/github-agent-eve?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Feve&source_site=vercel-docs&relationship=related) — Build a GitHub agent with eve, GitHub Tools, and Vercel Connect. Register AI-callable GitHub tools, gate writes behind d
- [Chat SDK](https://vercel.com/docs/connect/frameworks/chat-sdk?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Feve&source_site=vercel-docs&relationship=related) — Use Vercel Connect credentials and trigger forwarding with Chat SDK adapters for Slack, Discord, GitHub, Linear, Notion,
- [AI SDK and MCP](https://vercel.com/docs/connect/frameworks/ai-sdk-and-mcp?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Feve&source_site=vercel-docs&relationship=related) — Connect an AI SDK app to an OAuth-protected MCP server with Vercel Connect, then handle user consent and tool approval.
- [Auth.js](https://vercel.com/docs/connect/frameworks/authjs?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Feve&source_site=vercel-docs&relationship=related) — Add a Vercel Connect OAuth provider to Auth.js in a Next.js App Router application.
- [eve](https://vercel.com/docs/eve?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Feve&source_site=vercel-docs&relationship=related) — Build and deploy durable backend AI agents with eve, an open-source, filesystem-first framework.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Feve&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/connect/frameworks/eve.graph.md](/docs/connect/frameworks/eve.graph.md?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Feve&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Understand the integration points

The entrypoint exposes three helpers, one for each place eve can use Vercel
Connect:

- **Channel credentials:** The `connect<Channel>Credentials()` helpers resolve
  app-scoped credentials for eve channels and verify Connect-forwarded
  webhooks with a Vercel OIDC token instead of the provider's native
  signature.
- **MCP client connections:** `connect()` returns the `auth` value for
  `defineMcpClientConnection`. eve requests a provider token for each
  principal and coordinates interactive consent when a user needs to
  authorize.
- **Inbound OAuth routes:** `connectOAuth()` authenticates bearer tokens that
  the Vercel Connect OAuth gateway issues to callers of your eve routes.

## Install the eve integration

Install both packages in your eve project:

```bash filename="Terminal"
pnpm add @vercel/connect eve
```

Link your project and pull a development OIDC token before running locally:

```bash filename="Terminal"
vercel link
vercel env pull
```

## Check channel capabilities

The channel credential helpers request app-scoped credentials and return the
shape expected by the matching eve channel:

| Channel | Helper | Credentials it resolves |
| --- | --- | --- |
| Slack | `connectSlackCredentials` | Slack bot token and Vercel OIDC webhook verifier |
| Discord | `connectDiscordCredentials` | Discord bot token, application ID, and Vercel OIDC webhook verifier |
| GitHub | `connectGitHubCredentials` | GitHub installation token and Vercel OIDC webhook verifier |
| Linear | `connectLinearCredentials` | Linear access token and Vercel OIDC webhook verifier |
| Linq | `connectLinqCredentials` | Linq API key and Vercel OIDC webhook verifier |
| Photon | `connectPhotonCredentials` | Photon project ID and project secret, resolved lazily |

The helpers pin the subject to `{ type: 'app' }`, so callers cannot replace it
with a user subject. The webhook verifiers check the Vercel OIDC token that a
[Connect trigger](/docs/connect/concepts/triggers) adds to forwarded requests,
not the provider's native signature.

## Configure each channel

Run `eve add channel/<name>` to scaffold a channel. For channels that offer
credential options, choose Vercel Connect when prompted. The guided Connect
flow signs you in to Vercel, creates or links your project, creates or reuses
the connector, and registers the channel's webhook route, such as
`/eve/v1/slack`, as a trigger destination. To manage connectors and project
links yourself, use the [`vercel connect` CLI](/docs/cli/connect) instead.

### Slack

`connectSlackCredentials` resolves the bot token and supplies the webhook
verifier, so you don't set `SLACK_BOT_TOKEN` or `SLACK_SIGNING_SECRET`. Token
rotation, multi-workspace tenancy, and request verification stay inside
Connect:

```ts filename="agent/channels/slack.ts"
import { connectSlackCredentials } from '@vercel/connect/eve';
import { slackChannel } from 'eve/channels/slack';

export default slackChannel({
  credentials: connectSlackCredentials('slack/my-agent'),
});
```

### Discord

`connectDiscordCredentials` resolves the bot token and application ID lazily,
so you don't set `DISCORD_BOT_TOKEN`, `DISCORD_APPLICATION_ID`, or
`DISCORD_PUBLIC_KEY`. The verifier checks forwarded interactions with
same-project Vercel OIDC instead of the Discord public key:

```ts filename="agent/channels/discord.ts"
import { connectDiscordCredentials } from '@vercel/connect/eve';
import { discordChannel } from 'eve/channels/discord';

export default discordChannel({
  credentials: connectDiscordCredentials('discord/my-agent'),
});
```

### GitHub

`connectGitHubCredentials` resolves a GitHub installation token directly, so
eve skips the App JSON Web Token exchange and you don't set `GITHUB_APP_ID`,
`GITHUB_APP_PRIVATE_KEY`, or `GITHUB_WEBHOOK_SECRET`:

```ts filename="agent/channels/github.ts"
import { connectGitHubCredentials } from '@vercel/connect/eve';
import { githubChannel } from 'eve/channels/github';

export default githubChannel({
  botName: 'my-agent',
  credentials: connectGitHubCredentials('github/my-agent'),
});
```

### Linear

Set up with `eve add channel/linear-agent`. Connect owns the Linear app and
its token, so you don't set `LINEAR_ACCESS_TOKEN` or `LINEAR_WEBHOOK_SECRET`.
The verifier checks forwarded webhooks with Vercel OIDC instead of the
`Linear-Signature` HMAC:

```ts filename="agent/channels/linear.ts"
import { connectLinearCredentials } from '@vercel/connect/eve';
import { linearChannel } from 'eve/channels/linear';

export default linearChannel({
  credentials: connectLinearCredentials('linear/my-agent'),
});
```

The channel receives inbound Linear Agent Sessions, but it does not expose
Linear issues, projects, cycles, and comments as tools. Add a separate MCP
client connection:

```ts filename="agent/connections/linear.ts"
import { connect } from '@vercel/connect/eve';
import { defineMcpClientConnection } from 'eve/connections';

export default defineMcpClientConnection({
  url: 'https://mcp.linear.app/mcp',
  description: 'Linear issues, projects, cycles, and comments.',
  auth: connect('linear/my-agent'),
});
```

See [Authorize an MCP connection](#authorize-an-mcp-connection) to choose
user- or app-scoped authorization and configure consent.

### Linq

During setup, eve can create a managed Linq account and line, or connect an
existing one with a partner API token, and then fetches your assigned phone
numbers. `connectLinqCredentials` resolves the API key, so you don't set
`LINQ_API_KEY` or `LINQ_WEBHOOK_SECRET`:

```ts filename="agent/channels/linq.ts"
import { connectLinqCredentials } from '@vercel/connect/eve';
import { linqChannel } from 'eve/channels/linq';

export default linqChannel({
  credentials: connectLinqCredentials('linq/my-agent'),
});
```

### Photon

Set up with `eve add channel/photon-imessage`. `connectPhotonCredentials`
resolves the Photon project ID and project secret when the adapter first
initializes, so you don't set `IMESSAGE_PROJECT_ID`, `IMESSAGE_PROJECT_SECRET`,
or `IMESSAGE_WEBHOOK_SECRET`. The channel verifies forwarded webhooks with
same-project Vercel OIDC by default:

```ts filename="agent/channels/photon.ts"
import { connectPhotonCredentials } from '@vercel/connect/eve';
import { photonIMessageChannel } from 'eve/channels/photon';

export default photonIMessageChannel({
  credentials: connectPhotonCredentials('photon/my-agent'),
});
```

## Select scopes and installations

Each helper accepts Connect token parameters, such as `scopes` and
`installationId`, as its second argument. For a multi-workspace or
multi-organization connector, select an
[installation](/docs/connect/concepts/installations):

```ts filename="agent/channels/slack.ts"
import { connectSlackCredentials } from '@vercel/connect/eve';
import { slackChannel } from 'eve/channels/slack';

export default slackChannel({
  credentials: connectSlackCredentials('slack/my-agent', {
    installationId: 'inst_workspace_xyz',
    scopes: ['chat:write'],
  }),
});
```

If you omit `installationId`, Connect uses the connector's default
installation. You cannot override the app subject.

## Account for delivery limitations

- **Preview deployments:** Connect forwards triggers to deployed URLs, not
  `localhost`. To receive triggers on Preview, register the branch with
  `--triggers --trigger-branch <branch> --trigger-path /eve/v1/<channel>`.
  Add `--environment preview` to let the Preview deployment request
  credentials. Use a separate connector and select its UID at runtime with
  `VERCEL_ENV` only when you need to isolate Preview traffic from Production.
- **Trigger destinations:** Each connector supports up to three trigger
  destinations, and creating a connector with `--triggers` registers a default
  production destination.
- **Detaching:** `vercel connect detach` removes token access but not trigger
  destinations. Remove destinations you no longer need separately.

## Authorize an MCP connection

User-scoped connections require the channel that starts or resumes the session
to authenticate the caller as a user principal. Built-in platform channels
derive this principal from the sender. For a web app, configure the eve
channel's route authentication to return `principalType: 'user'`. Without an
authenticated user principal, the first user-scoped connection call fails with
`reason: 'principal_required'`. See
[eve's authentication guide](https://eve.dev/docs/guides/auth-and-route-protection)
for route authentication options.

Pass `connect()` directly to `defineMcpClientConnection`. The string can be a
connector UID, such as `linear/my-agent`, or an opaque `scl_...` connector ID:

```ts filename="agent/connections/linear.ts"
import { connect } from '@vercel/connect/eve';
import { defineMcpClientConnection } from 'eve/connections';

export default defineMcpClientConnection({
  url: 'https://mcp.linear.app/mcp',
  description: 'Linear issues, projects, cycles, and comments.',
  auth: connect('linear/my-agent'),
});
```

The default principal type is `user`. eve resolves the current user, and the
helper maps that principal to this Vercel Connect subject:

```ts
{ type: 'user', id: principal.id, issuer: principal.issuer }
```

Vercel Connect keeps a separate grant for each subject. See
[Tokens](/docs/connect/concepts/tokens#subject-types) for how subjects scope
provider tokens.

## Choose user or app authorization

Use a user principal when each person authorizes their own provider account.
This mode supports interactive consent and is the default:

```ts
auth: connect({
  connector: 'linear/my-agent',
  principalType: 'user',
}),
```

Use an app principal when the agent shares one installed credential. App
authorization is non-interactive, so eve only requests a token and never
starts a user consent flow:

```ts
auth: connect({
  connector: 'oauth/internal-status',
  principalType: 'app',
}),
```

App principals map to `{ type: 'app' }`. If the connector has no app
credential, eve reports a non-retryable authorization failure that an operator
must resolve.

## Customize subject mapping

Use `createSubject` when the default user or app subject does not match your
connector. For example, a JWT bearer connector can use eve's user ID and
issuer:

```ts
auth: connect({
  connector: 'oauth/internal-api',
  createSubject(principal) {
    if (principal.type !== 'user') {
      throw new Error('This connection requires a user principal.');
    }

    return {
      type: 'jwt-bearer',
      sub: principal.id,
      iss: principal.issuer,
    };
  },
}),
```

The callback also receives the connection context as its second argument. Use
that context when the subject depends on the MCP server URL. Prefer
`createSubject` over the deprecated `principalToSubject` option.

## Control connector provisioning

`connect()` sets `autoProvision` to `true` by default. Before the first token
or authorization request, it uses the eve connection URL and deployment OIDC
token to create or link a managed OAuth connector for the current Vercel
project.

Automatic provisioning only runs for a provisionable connector UID and a
connection with a URL. It skips opaque `scl_...` IDs. Disable it when you
manage [connectors](/docs/connect/concepts/connectors) and
[project links](/docs/connect/concepts/project-links) separately:

```ts
auth: connect({
  connector: 'linear/my-agent',
  autoProvision: false,
}),
```

## Understand the consent lifecycle

For a user principal, eve and Vercel Connect coordinate consent:

1. eve calls `getToken`. If the user has no valid grant, the helper tells eve
   that authorization is required.
2. eve calls `startAuthorization`, suspends the turn, and presents the
   returned authorization URL or device code.
3. Vercel Connect completes OAuth and resumes eve through the callback or
   secure webhook.
4. eve calls `completeAuthorization`. The helper requests the token again
   because Vercel Connect is the authoritative source.

eve supplies the default instruction, `Authorize <ConnectionName> in your
browser to continue.` Override the provider name or instruction when your
flow needs more context:

```ts
auth: connect({
  connector: 'linear/my-agent',
  displayName: 'Linear',
  instructions:
    'Authorize Linear to read issues and add comments for this request.',
}),
```

A missing connector installation produces a non-retryable failure. A failed
completion remains retryable, so eve can offer consent again.

## Validate, evict, or revoke credentials

By default, the SDK reuses an unexpired token from its in-process cache. Set
`validate: true` to bypass that cache on every `getToken` call and check the
grant with Vercel Connect:

```ts
const auth = connect({
  connector: 'linear/my-agent',
  validate: true,
});
```

This adds a network request, but it prevents sensitive actions from using a
grant that the user revoked before its token expired.

Every authorization returned by `connect()` also has an `evict()` method.
eve uses local eviction when an MCP server rejects a bearer token. Local
eviction preserves the grant and refresh token, so the next request can fetch
a replacement token.

For a user-initiated disconnect, pass `revoke: true` to remove the grant at
Vercel Connect and clear the local cache:

```ts filename="agent/connections/linear.ts"
import {
  connect,
  type EveConnectionAuthorizationContext,
} from '@vercel/connect/eve';
import {
  defineMcpClientConnection,
  type ConnectionPrincipal,
} from 'eve/connections';

export const linearAuth = connect('linear/my-agent');

export async function disconnectLinear(
  principal: ConnectionPrincipal,
  connection: EveConnectionAuthorizationContext,
) {
  await linearAuth.evict({
    principal,
    connection,
    revoke: true,
  });
}

export default defineMcpClientConnection({
  url: 'https://mcp.linear.app/mcp',
  description: 'Linear issues, projects, cycles, and comments.',
  auth: linearAuth,
});
```

Revocation is destructive and best-effort. The helper still removes the local
cache entry if the server-side revoke fails.

## Authenticate an inbound Connect OAuth route

`connectOAuth()` solves a separate problem from `connect()`. It returns an eve
route authentication callback for inbound bearer tokens issued by the Vercel
Connect OAuth gateway. It does not authorize an MCP client connection.

Create the callback and pass it to an eve route option that accepts
`AuthFn<Request>`:

```ts filename="agent/auth/connect-oauth.ts"
import { connectOAuth } from '@vercel/connect/eve';

export const auth = connectOAuth({
  connectors: ['oauth/linear'],
  tenantIds: ['tenant_123'],
});
```

The callback verifies the token's signature, the
`https://connect.vercel.com` issuer, and the `typ: "at"` access-token claim.
By default, it accepts audiences for the current `VERCEL_PROJECT_ID` and
deployment environment from `VERCEL_TARGET_ENV` or `VERCEL_ENV`.

Use `audiences` for exact audience values, or set `projectId` and
`environment` explicitly. You can also restrict `subjects`, `connectors`,
`tenantIds`, `installationIds`, and additional claims. Invalid, missing, or
out-of-policy bearer tokens return no authenticated session.

## Next steps

- [Connect quickstart](/docs/connect/quickstart): Create and link a connector.
- [SDK reference](/docs/connect/ts-sdk-reference): Review token parameters and
  errors.
- [Authentication](/docs/connect/concepts/authentication): Understand Vercel
  OIDC and project-link enforcement.


---

[View full sitemap](/docs/sitemap)
