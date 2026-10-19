---
title: Webhook triggers for Vercel Connect
product: vercel
url: /docs/connect/concepts/triggers
canonical_url: "https://vercel.com/docs/connect/concepts/triggers"
last_updated: 2026-09-18
type: conceptual
prerequisites:
  - /docs/connect/concepts
  - /docs/connect
related:
  - /docs/connect/concepts/tokens
  - /docs/deployments/environments
  - /docs/domains/working-with-domains/add-a-domain-to-environment
  - /docs/oidc
  - /docs/cli/connect
summary: Incoming webhooks from third-party services, verified by Vercel Connect and forwarded to your projects.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/concepts/triggers.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "31c4aa47265c5258bee08259923256ff46e1927c908c3abf78232ffca0d39904"
---

# Webhook triggers for Vercel Connect

A **trigger** is an incoming webhook from a third-party service that Vercel Connect verifies and forwards to your projects. Where [tokens](/docs/connect/concepts/tokens) are the outbound half of Vercel Connect (your code calling the provider), triggers are the inbound half (the provider calling your code).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect) — Authenticate Slack, Microsoft Teams, GitHub, Linear, Discord, Notion, and Telegram adapters with Vercel Connect, using s
- [Chat SDK now supports Vercel Connect](https://vercel.com/changelog/chat-sdk-vercel-connect)
- [Vercel Connect now supports Microsoft Teams](https://vercel.com/changelog/vercel-connect-microsoft-teams)
- [How to set up a staging environment on Vercel](https://vercel.com/kb/guide/set-up-a-staging-environment-on-vercel) — Set up a staging environment on Vercel with custom environments, staged production deployments, or a branch-based previe
- [The Complete Guide to Vercel Connect](https://vercel.com/kb/guide/vercel-connect) — Use Vercel Connect to call provider APIs like Slack, GitHub, Linear, Microsoft, Discord, Snowflake, and Salesforce from
- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga)
- [The end of credential sprawl for agents](https://vercel.com/blog/the-end-of-credential-sprawl-for-agents)
- [Chat SDK with Vercel Connect](https://vercel.com/docs/connect/frameworks/chat-sdk) — Use Vercel Connect credentials and trigger forwarding with Chat SDK adapters for Slack, Discord, Microsoft Teams, GitHub
- [Concepts](https://vercel.com/docs/eve/concepts) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [Observability](https://vercel.com/docs/connect/observability) — Monitor token requests, authorizations, revocations, and trigger deliveries for your connectors.
- [Creating & Triggering Deploy Hooks](https://vercel.com/docs/deploy-hooks) — Learn how to create and trigger deploy hooks to integrate Vercel deployments with other systems.
- [Setting Up Webhooks](https://vercel.com/docs/webhooks) — Learn how to set up webhooks and use them with Vercel Integrations.

Full cross-link map for this page: [/docs/connect/concepts/triggers.graph.md](/docs/connect/concepts/triggers.graph.md)
<!-- /docsgraph:related -->

[Browse connectors](/connect/browse) to see which services support triggers and their default events.

## How it works

1. The provider sends a webhook to Vercel Connect's intake endpoint (configured on the provider side at install time).
2. Vercel Connect verifies the request signature against the connector's signing key. Unsigned or invalid requests are rejected.
3. Vercel Connect forwards the verified event to each registered trigger destination on the connector.

A trigger destination combines a project, target, and path. The target can be Production, a Preview branch, or a [Custom Environment](/docs/deployments/environments#custom-environments). When an event arrives, Vercel Connect resolves the target to a domain and appends the configured path to `https://<domain>`.

A connector can have up to three trigger destinations.

Forwarding is strictly opt-in: Vercel Connect delivers events only to the trigger destinations you configure on the connector. It never routes event data to any other destination at Vercel's election.

## Registering a destination

### Use the dashboard

1. Open [**Connect**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fconnect\&title=Open+Vercel+Connect+Project) in the Vercel Dashboard, then select the connector.
2. Under **Triggers**, select **Add Trigger Destination**.
3. Select the project.
4. Under **Target Type**, choose the destination:
   - Select **Environment**, then under **Environment** select **Production** or a Custom Environment.
   - Select **Branch**, then choose the Preview branch.
5. Enter the path that receives provider events.
6. Select **Add**.

Before using a Custom Environment as a destination, deploy to it and [assign a domain](/docs/domains/working-with-domains/add-a-domain-to-environment) to the environment. The domain must be verified and serve the environment's latest deployment directly rather than redirect elsewhere. Vercel Connect forwards events through that domain.

Registering a trigger destination also enables its target environment on the connector's project link, allowing deployments there to request tokens.

### Use the CLI

Pass `--triggers` when attaching a connector to a project:

```bash filename="terminal"
vercel connect attach slack/acme-slack --project my-project --environment production --triggers
```

To target a Preview branch, set a custom receiver path, or do both, add `--trigger-branch`, `--trigger-path`, or both:

```bash filename="terminal"
vercel connect attach slack/acme-slack --project my-project --environment production \
  --triggers --trigger-branch staging --trigger-path /api/slack-events
```

To target a Custom Environment, pass its slug to `--trigger-environment`:

```bash filename="terminal"
vercel connect attach slack/acme-slack --project my-project --environment qa \
  --triggers --trigger-environment qa --trigger-path /api/slack-events
```

`--trigger-environment` selects where Vercel Connect sends provider events. The CLI combines the environments passed to `--environment` with the trigger target. For a project with no existing trigger destinations, the example above produces a project link that contains only `qa`. Existing trigger destinations remain registered, and the CLI preserves any Custom Environments they require on the project link. If you omit `--environment`, the CLI links `production`, `preview`, and `development`, adds `qa` because it is the trigger target, and preserves Custom Environments required by existing destinations.

`--trigger-environment` and `--trigger-branch` are mutually exclusive and only valid with `--triggers`. If you omit both options, the trigger destination targets Production. If you omit `--trigger-path`, Vercel derives the receiver path from the connector and project framework. Pass `--trigger-path` to select the receiver path explicitly.

When you omit `--triggers`, `vercel connect attach` updates the project link without adding a trigger destination. Existing trigger destinations remain registered. You can also add or remove destinations from the Vercel Dashboard.

Removing a trigger destination does not remove its environment from the project link. Edit the link under **Projects** if you also want to revoke token access.

Deleting a Custom Environment removes trigger destinations that target it. Vercel Connect does not reroute those events to Production or Preview.

## Verifying a forwarded request

When Vercel Connect forwards an event to your project, it attaches a Vercel [OIDC token](/docs/oidc) as a `Bearer` credential in the `Authorization` header. Verify that token before acting on the payload. Because every connector uses the same mechanism, you verify one token instead of implementing each provider's signature scheme.

Use `createConnectWebhookVerifier` from `@vercel/connect/chat` in TypeScript, or `verify_connect_webhook()` in Python:

**app/api/slack-events/route.ts**

```ts filename="app/api/slack-events/route.ts"
import { createConnectWebhookVerifier } from '@vercel/connect/chat';

const verify = createConnectWebhookVerifier();

export async function POST(request: Request) {
  const body = await request.text();

  try {
    await verify(request, body);
  } catch {
    return new Response('Unauthorized', { status: 401 });
  }

  const event = JSON.parse(body);
  // Handle the verified event.
  return Response.json({ ok: true });
}
```

**main.py**

```py filename="main.py"
from fastapi import FastAPI, HTTPException, Request
from vercel.connect import (
    ConnectWebhookVerificationError,
    verify_connect_webhook,
)

app = FastAPI()


@app.post('/api/slack-events')
async def slack_events(request: Request):
    try:
        await verify_connect_webhook(request)
    except ConnectWebhookVerificationError:
        raise HTTPException(status_code=401)

    event = await request.json()
    # Handle the verified event.
    return {'ok': True}
```

By default, both verifiers accept a token only when its project and environment match the current deployment, using `VERCEL_PROJECT_ID` and `VERCEL_TARGET_ENV` (then `VERCEL_ENV`). They accept any valid Vercel OIDC token for that project and environment; they aren't pinned to a specific connector or deployment. Verification fails closed: if the verifier can't determine the expected project or environment, it rejects every request.

## Errors

If the target does not resolve to a deployment, or the receiving handler returns a 5xx status, delivery fails. Requests that receive status `500`, `502`, `503`, or `504` are attempted up to three times. The Vercel Dashboard shows aggregate trigger metrics rather than a per-event delivery log, so use the target deployment's runtime logs to investigate an individual request.

## Next steps

- [Slack connector](/connect/slack): Review Slack's default events and setup instructions.
- [Microsoft Teams connector](/connect/microsoft-teams): Set up a managed Teams bot and forward verified activities to your project.
- [Connector catalog](/connect/browse): Which connectors support triggers and their default events.
- [CLI Reference](/docs/cli/connect): Full surface of `vercel connect attach --triggers`.
- [Python SDK Reference](/docs/connect/python-sdk-reference#verify_connect_webhook): Full `verify_connect_webhook()` reference.


---

[View full sitemap](/docs/sitemap)
