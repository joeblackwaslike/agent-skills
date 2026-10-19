---
title: MCP Events
product: vercel
url: /docs/connect/mcp-events
canonical_url: "https://vercel.com/docs/connect/mcp-events"
last_updated: 2026-10-14
type: how-to
prerequisites:
  - /docs/connect
related:
  - /docs/connect/concepts/triggers
  - /docs/connect/quickstart
  - /docs/connect/concepts/project-links
  - /docs/connect/concepts/authentication
  - /docs/deployments/environments
summary: Use MCP events with Vercel Connect to react to changes, receive verified webhook deliveries, and manage subscription lifecycles.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/mcp-events.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "9252a38d7c59a0650a08ebcb0b5c0bc34290bef7f29bdebb366aefcc48d59fb4"
---

# MCP Events

MCP events let your agents listen for changes from compatible Model Context
Protocol (MCP) servers and act when something happens. Build agents that summarize
new messages, review newly created issues, or respond to document feedback without
polling for updates.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Receive MCP Webhook Events](https://ai-sdk.dev/cookbook/node/mcp-events) — Subscribe to MCP events and receive verified webhooks with AI SDK.
- [MCP Events support in Vercel Connect is now in public beta](https://vercel.com/changelog/mcp-events-support-in-vercel-connect-is-now-in-public-beta)
- [MCP Events](https://ai-sdk.dev/docs/ai-sdk-core/mcp-events) — Understand the MCP webhook events contract and the AI SDK APIs for subscribing, verifying, and receiving events.
- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga)
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect) — Authenticate Slack, Microsoft Teams, GitHub, Linear, Discord, Notion, and Telegram adapters with Vercel Connect, using s
- [MCP Events](https://ai-sdk.dev/docs/reference/ai-sdk-core/mcp-events) — Reference for experimental MCP event methods, the webhook handler, and subscription and storage types.
- [Build a ChatGPT Connector \\(MCP server\\)](https://vercel.com/kb/guide/mcp-server-chatgpt-connector) — Build a ChatGPT MCP server with mcp-handler and Fluid compute. Add search, fetch, and OAuth, deploy to Vercel, then vali
- [Deploy MCP servers to Vercel](https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel) — Learn how to deploy Model Context Protocol \\(MCP\\) servers on Vercel with OAuth authentication and efficient scaling.
- [Chat SDK with Vercel Connect](https://vercel.com/docs/connect/frameworks/chat-sdk) — Use Vercel Connect credentials and trigger forwarding with Chat SDK adapters for Slack, Discord, Microsoft Teams, GitHub
- [Model Context Protocol](https://vercel.com/docs/mcp) — Learn more about MCP and how you can use it on Vercel.

Full cross-link map for this page: [/docs/connect/mcp-events.graph.md](/docs/connect/mcp-events.graph.md)
<!-- /docsgraph:related -->

Connect supports webhook delivery and callback verification from the
[draft MCP Events specification](https://github.com/modelcontextprotocol/experimental-ext-triggers-events/blob/main/docs/design-sketch-proposal.md).
It creates and renews subscriptions, verifies the server's webhooks, and forwards
events to your application using authenticated delivery. Your application verifies
each delivery and decides how the agent should respond.

If you're building with eve, see [MCP events in eve](https://eve.dev/docs/connections/mcp#events-experimental)
to configure event callbacks for your MCP connections.

## Example use cases

Agents can subscribe to events to respond to new comments, messages, issues, and emails.

| Use case                            | What the agent does                                                                            | Event             | Arguments     |
| ----------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------- | ------------- |
| Apply document feedback             | Reads new review comments on a document and drafts the requested edits.                        | `comment.created` | `document_id` |
| Summarize new messages              | Posts a digest of new messages in a channel.                                                   | `message.created` | `channel_id`  |
| Triage new issues                   | Labels, prioritizes, and assigns issues as they're filed.                                      | `issue.created`   | `project_id`  |
| Turn bug reports into pull requests | Watches a feedback channel for bug reports and opens draft pull requests with fixes and tests. | `message.created` | `channel_id`  |
| Follow up on inbound email          | Drafts a reply or creates a task when a new email arrives in a shared inbox.                   | `email.received`  | `mailbox_id`  |

Event names and arguments vary by server. Call `client.experimental_events.list()` to see what your server supports.

The rest of this page builds the document feedback use case with a connector
named `oauth/documents` and the `comment.created` event.

## How delivery works

1. Your application creates a subscription with an event name, arguments, and destination path.
2. Connect registers a webhook with the MCP server and handles its verification challenge.
3. The MCP server sends events to Connect. Connect verifies them and forwards them to your destination.
4. Your receiver verifies Connect's delivery and durably accepts the event before acknowledging it.

Connect persists subscriptions, renews provider leases, and manages expiry and
cleanup. Your application owns the receiver, subscription-to-user bindings,
deduplication, and event processing. Unlike [connector triggers](/docs/connect/concepts/triggers),
MCP subscriptions select a particular event and arguments for an authorized account.

## Before you start

- [Create a connector](/docs/connect/quickstart) for an MCP server that supports webhook events.
- [Link your project](/docs/connect/concepts/project-links) and allow its destination environment.
- [Authorize the account](/docs/connect/concepts/authentication) that will own the subscription.
- Deploy your receiver to Production or a stable [Custom Environment](/docs/deployments/environments#custom-environments).

MCP event subscriptions currently require Production or a Custom Environment.
For a Custom Environment, deploy it and [assign a domain](/docs/domains/working-with-domains/add-a-domain-to-environment).
Use a verified domain that serves the deployment without redirecting requests.
The SDK authenticates the calling project with its Vercel OpenID Connect (OIDC) token.

Install Connect SDK 2.5.2 or later and AI SDK MCP client 2.0.76 or later:

```bash package-manager
pnpm add @vercel/connect @ai-sdk/mcp
```

## Create a subscription with AI SDK

Use `connectAuthProvider` and `experimental_connectEventsAdapter` from the same
SDK entrypoint. Pass the same resolved token parameters to both helpers:

| Helper                              | Purpose                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------ |
| `connectAuthProvider`               | Obtains credentials for direct MCP requests, including event catalog discovery.            |
| `experimental_connectEventsAdapter` | Delegates subscription management to Connect and receives the transport URL automatically. |

The following server-side function assumes a connector named `oauth/documents`
whose server offers `comment.created`. Replace the connector and URL with your
configuration. Derive `userId` from your authenticated session and authorize access
to `documentId` before calling it. Persist a unique `requestId` for the creation
intent and reuse it when retrying the same request:

#### TypeScript

```ts filename="lib/watch-document.ts"
import { createMCPClient } from '@ai-sdk/mcp';
import {
  connectAuthProvider,
  experimental_connectEventsAdapter,
  type ConnectTokenParams,
} from '@vercel/connect/ai-sdk';

export async function watchDocument({
  userId,
  documentId,
  requestId,
}: {
  userId: string;
  documentId: string;
  requestId: string;
}) {
  const connector = 'oauth/documents';
  const tokenParams: ConnectTokenParams = {
    subject: { type: 'user', id: userId },
  };

  const client = await createMCPClient({
    transport: {
      type: 'http',
      url: 'https://documents.example/mcp',
      authProvider: connectAuthProvider(connector, tokenParams),
    },
    experimental_events: {
      adapter: experimental_connectEventsAdapter({
        connector,
        tokenParams,
        destination: { path: '/hooks' },
      }),
    },
  });

  try {
    return await client.experimental_events.subscribe({
      name: 'comment.created',
      arguments: { document_id: documentId },
      idempotencyKey: requestId,
      ttlMs: null,
    });
  } finally {
    await client.close();
  }
}
```

#### JavaScript

```js filename="lib/watch-document.js"
import { createMCPClient } from '@ai-sdk/mcp';
import {
  connectAuthProvider,
  experimental_connectEventsAdapter,
} from '@vercel/connect/ai-sdk';

export async function watchDocument({ userId, documentId, requestId }) {
  const connector = 'oauth/documents';
  const tokenParams = {
    subject: { type: 'user', id: userId },
  };

  const client = await createMCPClient({
    transport: {
      type: 'http',
      url: 'https://documents.example/mcp',
      authProvider: connectAuthProvider(connector, tokenParams),
    },
    experimental_events: {
      adapter: experimental_connectEventsAdapter({
        connector,
        tokenParams,
        destination: { path: '/hooks' },
      }),
    },
  });

  try {
    return await client.experimental_events.subscribe({
      name: 'comment.created',
      arguments: { document_id: documentId },
      idempotencyKey: requestId,
      ttlMs: null,
    });
  } finally {
    await client.close();
  }
}
```

To discover which events your server offers, call `client.experimental_events.list()`
separately and choose an event and arguments from the authenticated catalog. Each
definition includes `inputSchema`, `payloadSchema`, and supported delivery modes.
Follow `nextCursor` when the catalog has more pages.

You don't implement an adapter or provide an AI SDK event store. The adapter takes
the MCP URL from `transport.url`; an explicit `mcpUrl` option overrides it. Connect
must authorize that endpoint before using provider credentials. Add scopes or
other credential constraints to the shared `tokenParams` when your provider requires them.

Creation can return `pending` while upstream registration finishes. Save the
returned Connect subscription ID with the authorized user and application intent.
Closing the MCP client does not stop the subscription.

## Receive and verify events

Deploy the receiver before creating subscriptions. For the `/hooks` destination,
create a Next.js App Router handler at `app/hooks/route.ts` or `app/hooks/route.js`.
Use `experimental_verifyMcpEvent` to authenticate the **Connect-to-application** hop:

#### TypeScript

```ts filename="app/hooks/route.ts"
import {
  experimental_verifyMcpEvent,
  Experimental_McpEventVerificationError,
} from '@vercel/connect/mcp';
import { acceptEventDelivery } from '@/lib/event-inbox';

export async function POST(request: Request) {
  let delivery;
  try {
    delivery = await experimental_verifyMcpEvent(request, {
      path: '/hooks',
    });
  } catch (error) {
    if (error instanceof Experimental_McpEventVerificationError) {
      return new Response(null, {
        status: error.code === 'invalid_delivery' ? 401 : 503,
      });
    }
    throw error;
  }

  try {
    await acceptEventDelivery(delivery);
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 503 });
  }
}
```

#### JavaScript

```js filename="app/hooks/route.js"
import {
  experimental_verifyMcpEvent,
  Experimental_McpEventVerificationError,
} from '@vercel/connect/mcp';
import { acceptEventDelivery } from '@/lib/event-inbox';

export async function POST(request) {
  let delivery;
  try {
    delivery = await experimental_verifyMcpEvent(request, {
      path: '/hooks',
    });
  } catch (error) {
    if (error instanceof Experimental_McpEventVerificationError) {
      return new Response(null, {
        status: error.code === 'invalid_delivery' ? 401 : 503,
      });
    }
    throw error;
  }

  try {
    await acceptEventDelivery(delivery);
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 503 });
  }
}
```

`acceptEventDelivery` is an application-owned durable inbox operation, not a
Connect SDK export. Implement it before using this handler. It must:

- Store the verified receipt and deduplicate it by `deliveryId`.
- Resolve the subscription's saved, authorized application binding before starting work.
- Commit receipt acceptance and queued work atomically, then allow the handler to return `204`.

A delivery can arrive before your creation request saves the returned subscription
ID. Retain it durably for later binding resolution or return a retryable error.
Don't infer its recipient from the payload or treat `context` as authorization.
If acceptance fails, return `503`; don't acknowledge work that you only started in memory.

The verifier consumes the request body and validates the delivery envelope. It does
not deduplicate events, validate your provider-specific payload schema, or run an
agent. Validate `event.data` before processing it. Do not use AI SDK's
`experimental_createMCPEventWebhook` here: that helper verifies direct MCP webhooks,
not Connect's forwarded envelopes.

### Configure the receiver identity

Set `path` to the registered public destination path, including any rewrite prefix.
Keep identity settings in trusted server configuration, not request headers or payloads:

| Option                          | Value                                                                                   |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| `path`                          | Required public route, such as `/hooks`.                                                |
| `projectId`                     | Defaults to `VERCEL_PROJECT_ID`.                                                        |
| `environment`                   | Defaults to `VERCEL_TARGET_ENV`, then `VERCEL_ENV`.                                     |
| `customEnvironmentId`           | Required for a Custom Environment. Use its stable `env_...` ID.                         |
| `ownerId`, `issuer`, `audience` | Optional additional restrictions. `ownerId` defaults to `VERCEL_ORG_ID` when available. |

Make the system environment variables available to your deployment, or pass the
expected values explicitly. Missing receiver identity fails verification. See
[system environment variables](/docs/environment-variables/system-environment-variables)
and [OIDC](/docs/oidc) for deployment configuration.

### Handle event and lifecycle deliveries

Each envelope includes `deliveryId`, `subscriptionId`, `source.connectorId`, and
saved application `context`. It contains one of these payloads:

| Payload                      | What your application should do                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------- |
| `event`                      | Validate `event.data` and process the business event.                                    |
| `control.type: 'gap'`        | Reconcile state with the source because some events cannot be replayed.                  |
| `control.type: 'terminated'` | Record the provider's reason and stop starting new work for the terminated subscription. |

Persist lifecycle changes before dispatching application callbacks. Make worker
side effects idempotent because deliveries can repeat or arrive out of order.

## Inspect and stop subscriptions

Use the returned Connect subscription ID, not an upstream provider ID. The direct
SDK calls below avoid opening an MCP connection to inspect or stop a subscription.
Authorize the requested subscription against your application's saved binding first:

#### TypeScript

```ts filename="lib/manage-watch.ts"
import {
  experimental_getSubscription,
  experimental_unsubscribe,
} from '@vercel/connect/mcp';

export async function getWatch(userId: string, subscriptionId: string) {
  return experimental_getSubscription('oauth/documents', {
    id: subscriptionId,
    expectedSubject: { type: 'user', id: userId },
  });
}

export async function stopWatch(userId: string, subscriptionId: string) {
  return experimental_unsubscribe('oauth/documents', {
    id: subscriptionId,
    expectedSubject: { type: 'user', id: userId },
  });
}
```

#### JavaScript

```js filename="lib/manage-watch.js"
import {
  experimental_getSubscription,
  experimental_unsubscribe,
} from '@vercel/connect/mcp';

export async function getWatch(userId, subscriptionId) {
  return experimental_getSubscription('oauth/documents', {
    id: subscriptionId,
    expectedSubject: { type: 'user', id: userId },
  });
}

export async function stopWatch(userId, subscriptionId) {
  return experimental_unsubscribe('oauth/documents', {
    id: subscriptionId,
    expectedSubject: { type: 'user', id: userId },
  });
}
```

`expectedSubject` checks that the subscription belongs to the intended account.
The SDK also authenticates the calling project and environment. A subscription ID
alone does not authorize access.

Use `experimental_listSubscriptions` from `@vercel/connect/mcp` with the same
`tokenParams` to list account-scoped subscriptions. The direct SDK returns
`pagination.next`; follow it even if a filtered page is empty. With the AI SDK
adapter, `client.experimental_events.listSubscriptions()` returns `nextCursor` instead.
These lists have account, project, and environment scope, not conversation scope.

| Status       | Meaning                                                                   |
| ------------ | ------------------------------------------------------------------------- |
| `pending`    | Connect has saved the subscription, but registration is not yet complete. |
| `active`     | The subscription is active.                                               |
| `needs_auth` | The subscription needs renewed account authorization.                     |
| `stopped`    | Local delivery has stopped. Check `cleanupStatus` for provider cleanup.   |
| `expired`    | The application's monitoring deadline has passed.                         |
| `failed`     | The subscription failed or the provider terminated it.                    |

A stop operation can return `stopped` with `cleanupStatus: 'pending'` while remote
cleanup remains unfinished. Retry unsubscribe to finish cleanup. The operation
can also report `cleanupStatus: 'complete'` or `'exhausted'`.

## Lifetime and delivery limits

Set `ttlMs` when subscribing. Use an integer from `120000` to `31536000000`
milliseconds (two minutes to 365 days), or `ttlMs: null` to monitor until explicitly
stopped. For example, `ttlMs: 600000` monitors for 10 minutes. Connect renews the
upstream provider lease within that application lifetime. You don't schedule
AI SDK `refresh()` calls when using the Connect adapter.

Subscription responses include the resolved `expiresAt` deadline, or `null` for
an indefinite watch. `expiresAt` is not a creation input in Connect SDK 2.5.2 and
later. Replace earlier `expiresAt: null` inputs with `ttlMs: null`.

Connect currently forwards deliveries inline. It does not retain a durable payload
outbox or provide scheduled redelivery, delivery history, or manual replay. The
provider's retry and replay window limits recovery when your receiver is unavailable.
Use your durable inbox to accept work quickly, then process it asynchronously.

## Pricing

MCP events are priced as [triggers](/docs/connect/pricing#triggers). Each delivery
that Connect forwards to your destination counts as one trigger. To stop being
billed, [stop the subscription](#inspect-and-stop-subscriptions).

## Next steps

- [AI SDK and MCP](/docs/connect/frameworks/ai-sdk-and-mcp): Configure authenticated MCP requests and handle user consent.
- [SDK Reference](/docs/connect/ts-sdk-reference#mcp-events): Review event API options, return values, and verification errors.
- [Triggers](/docs/connect/concepts/triggers): Receive provider webhooks configured at the connector level.


---

[View full sitemap](/docs/sitemap)
