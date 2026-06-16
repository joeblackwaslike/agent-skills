---
title: Triggers
product: vercel
url: /docs/connect/concepts/triggers
canonical_url: "https://vercel.com/docs/connect/concepts/triggers"
last_updated: 2026-06-03
type: conceptual
prerequisites:
  - /docs/connect/concepts
  - /docs/connect
related:
  - /docs/connect/concepts/tokens
  - /docs/connect/quickstart
  - /docs/connect/concepts/connectors
  - /docs/cli/connect
summary: Incoming webhooks from third-party services, verified by Vercel Connect and forwarded to your projects.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/concepts/triggers.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "9b3468ce0e60f7a9c0870a66176b0c00ebce077bbb842fdfa03ee1ce3b2cc684"
---

# Triggers

A **trigger** is an incoming webhook from a third-party service that Vercel Connect verifies and forwards to your projects. Where [tokens](/docs/connect/concepts/tokens) are the outbound half of Vercel Connect (your code calling the provider), triggers are the inbound half (the provider calling your code).

Trigger forwarding is Slack-only in beta.

## How it works

1. The provider sends a webhook to Vercel Connect's intake endpoint (configured on the provider side at install time).
2. Vercel Connect verifies the request signature against the connector's signing key. Unsigned or invalid requests are rejected.
3. Vercel Connect forwards the verified event to each registered trigger destination on the connector.

A trigger destination is a project + branch + path: when an event arrives, Vercel Connect POSTs it to `https://<deployment-url>/<path>` for the latest deployment of the configured branch.

A connector can have up to three trigger destinations.

Forwarding is strictly opt-in: Vercel Connect delivers events only to the trigger destinations you configure on the connector. It never routes event data to any other destination at Vercel's election.

## Registering a destination

Pass `--triggers` when attaching a connector to a project:

```bash filename="terminal"
vercel connect attach slack/acme-slack --project my-project --environment production --triggers
```

To target a specific branch or path on the project, add `--trigger-branch` and `--trigger-path`:

```bash filename="terminal"
vercel connect attach slack/acme-slack --project my-project --environment production \
  --triggers --trigger-branch staging --trigger-path /api/slack-events
```

`--trigger-branch` defaults to production. `--trigger-path` defaults to `/{service}` (for example, `/slack`). Both flags are only valid alongside `--triggers`.

Without `--triggers`, the project is linked (it can request tokens) but is not registered as a trigger destination. You can also add or remove destinations from the dashboard.

## Verifying a forwarded request

When Vercel Connect forwards an event to your project, it signs the outbound request so your handler can confirm it came from Vercel Connect. Verify the signature on the receiving end before acting on the payload. Vercel Connect publishes the signing key per connector for this purpose.

## Errors

If a destination's project is removed, its branch no longer has any deployment, or the deployment returns a non-2xx status, Vercel Connect logs the delivery failure but does not retry indefinitely. Use the connector's delivery log in the dashboard to investigate.

## Next steps

- [Quickstart](/docs/connect/quickstart): The Slack walkthrough includes a `--triggers` example.
- [Connectors](/docs/connect/concepts/connectors): Which connector types support triggers.
- [CLI Reference](/docs/cli/connect): Full surface of `vercel connect attach --triggers`.


---

[View full sitemap](/docs/sitemap)
