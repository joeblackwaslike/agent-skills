---
title: Authenticating eve requests
product: vercel
url: /docs/eve/authentication
canonical_url: "https://vercel.com/docs/eve/authentication"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/eve
related:
  - /docs/connect/frameworks/eve
  - /docs/oidc
  - /docs/deployment-protection
  - /docs/eve/deploying
  - /docs/eve/agent-runs
summary: Configure access to eve HTTP routes, authenticate browser users, and provide user identities for Vercel Connect.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/eve/authentication.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "5d984951f8e105480fcf53490539ed1d2cea0d9b74778773fbc1594ee4b574de"
---

# Authenticating eve requests

Configure authentication on an eve channel to control who can create sessions, send messages, read streams, and invoke session controls. Authentication runs before model work begins.

Route authentication verifies callers reaching your agent. [Tool and connection authentication](/docs/connect/frameworks/eve) supplies credentials when the agent calls another service. Configure both when an agent acts on behalf of signed-in users.

## Understand the default policy

A generated `agent/channels/eve.ts` includes `vercelOidc()`, `localDev()`, and `placeholderAuth()`. Vercel OIDC callers can authenticate through the first helper, and local development can use the second. The placeholder rejects other callers with a structured `401` response, including production browser users whose credentials aren't verified by an earlier helper.

Replace the placeholder with an authenticator for your intended callers. Deleting the channel file restores the default policy; it doesn't enable browser access.

The built-in health endpoint is public at the channel layer. A successful health check doesn't prove that a caller can access sessions.

## Authenticate Vercel service callers

For an agent called by Vercel services, configure the built-in HTTP channel:

**agent/channels/eve.ts**

```typescript filename="agent/channels/eve.ts"
import { localDev, vercelOidc } from 'eve/channels/auth';
import { eveChannel } from 'eve/channels/eve';

export default eveChannel({
  auth: [vercelOidc(), localDev()],
});
```

**agent/channels/eve.js**

```javascript filename="agent/channels/eve.js"
import { localDev, vercelOidc } from 'eve/channels/auth';
import { eveChannel } from 'eve/channels/eve';

export default eveChannel({
  auth: [vercelOidc(), localDev()],
});
```

`vercelOidc()` verifies Vercel OIDC bearer tokens and accepts tokens from the current project by default. Use its `subjects` option to explicitly allow callers from other projects. See [Vercel OIDC](/docs/oidc) for the deployment identity and token claims.

`localDev()` accepts a synthetic development identity only in the local development runtime. Keep it after the production authenticators so it doesn't replace a verified identity during development. It doesn't authenticate callers in a deployed production runtime.

These helpers don't verify your application's browser session cookie. Add an application authenticator for browser users.

## Authenticate browser users

Use your application's existing authentication system to verify a session, then map the verified user to an eve principal. In the example below, `getSession` is **your application's server-side session verifier**, not an eve API. Implement it in `lib/auth` so it validates the request's credentials and returns a trusted `userId`, or `null` for an unauthenticated request. Adjust the import to your project layout.

**agent/channels/eve.ts**

```typescript filename="agent/channels/eve.ts"
import { localDev, type AuthFn } from 'eve/channels/auth';
import { eveChannel } from 'eve/channels/eve';
import { getSession } from '../../lib/auth';

const appSession: AuthFn<Request> = async (request) => {
  const session = await getSession(request);
  if (!session) return null;

  return {
    authenticator: 'app',
    issuer: 'https://your_app.example.com',
    principalId: session.userId,
    principalType: 'user',
    attributes: {},
  };
};

export default eveChannel({
  auth: [appSession, localDev()],
});
```

**agent/channels/eve.js**

```javascript filename="agent/channels/eve.js"
import { localDev } from 'eve/channels/auth';
import { eveChannel } from 'eve/channels/eve';
import { getSession } from '../../lib/auth';

const appSession = async (request) => {
  const session = await getSession(request);
  if (!session) return null;

  return {
    authenticator: 'app',
    issuer: 'https://your_app.example.com',
    principalId: session.userId,
    principalType: 'user',
    attributes: {},
  };
};

export default eveChannel({
  auth: [appSession, localDev()],
});
```

Replace the example issuer with a stable identifier for your identity system. Keep `principalId` stable for each user; when accepting multiple identity providers, use the verified provider's issuer to distinguish their identities. Never take the user ID directly from unverified headers or request JSON.

The example accepts application sessions and local development callers. If the agent also needs Vercel service callers, add `vercelOidc()` between `appSession` and `localDev()`.

For a frontend on the same origin, browser requests can carry the application session cookie. Your agent's verifier must validate that cookie. If your application uses bearer tokens, send the token in the `Authorization` header and verify it in the authenticator.

### Apply session authorization

Route authentication does not enforce session ownership. If multiple users or tenants can reach the agent, your application must also enforce which sessions each caller may read or modify. A successful authentication result alone does not establish permission to access a particular session.

### Understand authentication order

When `auth` is an array, eve evaluates its entries in order:

- Returning an authentication context accepts the caller and stops evaluation.
- Returning `null` or `undefined` lets the next authenticator try.
- Throwing rejects the request.

If no authenticator accepts the caller, the request receives `401`. Put application-specific verifiers first and `localDev()` last.

## Provide an identity for Vercel Connect

User-scoped Connect credentials require `principalType: 'user'`. The browser example supplies this from a verified application session. Built-in platform channels such as Slack derive a user principal from the sender.

A local development, service, or anonymous identity doesn't satisfy this requirement. If a user-scoped connection fails with `principal_required`, authenticate an actual user before requesting the token. Use [app-scoped authorization](/docs/connect/frameworks/eve#choose-user-or-app-authorization) only when the external service should act as the agent itself.

Follow [Authorize an MCP connection](/docs/connect/frameworks/eve#authorize-an-mcp-connection) to configure the outbound connection after establishing the caller's identity.

## Troubleshoot access

| Symptom                                                                | What to check                                                                                                                  |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| The browser receives a response saying authentication isn't configured | Replace `placeholderAuth()` with a verifier for the browser's credentials.                                                     |
| Requests work locally but receive `401` after deployment               | `localDev()` doesn't authenticate production traffic. Check the deployed authenticator and its environment variables.          |
| The health endpoint succeeds but session requests fail                 | Health bypasses channel authentication. Test an authenticated session request separately.                                      |
| A user-scoped connection reports `principal_required`                  | Ensure the channel returns a verified user principal, not only a service or development identity.                              |
| Deployment Protection prevents a request from reaching eve             | Configure access through [Deployment Protection](/docs/deployment-protection). Its bypass is separate from eve authentication. |

## Next steps

- [Deploy the agent](/docs/eve/deploying) with the required environment variables.
- [Inspect Agent Runs](/docs/eve/agent-runs) after sending an authenticated message.
- [Configure Connect credentials](/docs/connect/frameworks/eve) for tools and connections.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
