---
title: Creating Schedules for Each Customer
product: vercel
url: /docs/schedules/multi-tenant
canonical_url: "https://vercel.com/docs/schedules/multi-tenant"
last_updated: 2026-10-07
type: how-to
prerequisites:
  - /docs/schedules
related:
  - /docs/schedules
  - /docs/schedules/configuration
  - /docs/schedules/limits
  - /docs/schedules/sdk
  - /docs/schedules/handle-runs
summary: Use schedule namespaces to give each customer in a multi-tenant app their own recurring and one-time schedules.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/multi-tenant.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "59107960a127cdc5cf1e0061e91d937be9a5ce40e4b3b2568b4271e1174d395b"
---

# Creating Schedules for Each Customer

In a multi-tenant app, each customer (tenant) often needs their own schedules, like a daily digest at a time they choose. Use one **namespace** per tenant to keep their schedules separate.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Schedules Concepts](https://vercel.com/docs/schedules/concepts) — Learn how Vercel Schedules handles environments, deployments, jitter, one-time schedules, late runs, and duplicate deliv
- [Managing Schedules](https://vercel.com/docs/schedules/manage) — View, enable, disable, and run schedules across environments, and check their execution history from the dashboard, CLI,
- [Vercel Schedules: API Reference](https://vercel.com/docs/schedules/http-api) — Reference for the Vercel Schedules HTTP API: authenticate, choose an environment, and create, list, update, enable, disa
- [Getting Started with Schedules](https://vercel.com/docs/schedules/quickstart) — Run a private Vercel Function every hour with a static schedule in vercel.json, test it locally, and deploy it.
- [vercel schedules](https://vercel.com/docs/cli/schedules) — Inspect and manage schedules in production, a custom environment, a Preview branch, CLI deployments by a user, or a loca

Full cross-link map for this page: [/docs/schedules/multi-tenant.graph.md](/docs/schedules/multi-tenant.graph.md)
<!-- /docsgraph:related -->

Schedule names are unique within a namespace, so every tenant can have a schedule named `daily-digest`. Use the name for the kind of job and the namespace for the tenant. One queue consumer can then handle every tenant.

Namespaces are only available for [dynamic schedules](/docs/schedules#static-and-dynamic-schedules). Static schedules always use the `default` namespace.

## Choose a namespace for each tenant

Namespaces follow the same rules as [schedule names](/docs/schedules/configuration#schedule-names): 1 to 256 ASCII letters, digits, `.`, `_`, and `-`, starting with a letter or digit.

If your tenant IDs already match these rules, such as `tenant_abc123`, use them directly. Otherwise, map each ID to a valid string, for example by replacing other characters with `-`. Make sure the mapping can't give two tenants the same namespace.

## Create a schedule for a tenant

When a tenant turns on a recurring job, create a dynamic schedule in their namespace. Store any settings the job needs in the payload:

```ts filename="lib/digest.ts"
import { Schedules } from '@vercel/schedules';

export async function enableDigest(tenantId: string, timezone: string) {
  await Schedules.create({
    name: 'daily-digest',
    namespace: tenantId,
    target: { topic: 'tenant-jobs' },
    expression: { type: 'cron', cron: '0 9 * * *' },
    timezone,
    payload: { reportType: 'summary' },
  });
}
```

All tenants can share the `tenant-jobs` topic. Each message includes the namespace, so your consumer knows which tenant the run is for.

For a one-time job, such as a trial expiring, use a `single` expression:

```ts
await Schedules.create({
  name: 'trial-ending',
  namespace: tenantId,
  target: { topic: 'tenant-jobs' },
  expression: { type: 'single', at: '2026-11-15T09:00' },
  timezone: 'America/New_York',
});
```

## Handle tenant runs

Create one consumer on the shared topic. Read the tenant from `message.namespace` and the job from `message.name`:

```ts filename="api/tenant-jobs.ts"
import { handleCallback } from '@vercel/queue';
import type { ScheduleQueueMessage } from '@vercel/schedules';

type TenantJobMessage = ScheduleQueueMessage<{ reportType?: string }>;

export const POST = handleCallback<TenantJobMessage>(async (message) => {
  const tenantId = message.namespace;

  switch (message.name) {
    case 'daily-digest':
      await sendDigest(tenantId, message.payload?.reportType ?? 'summary');
      break;
    case 'trial-ending':
      await sendTrialReminder(tenantId);
      break;
  }
});
```

Subscribe the consumer to the topic in `vercel.json`:

```json filename="vercel.json"
{
  "functions": {
    "api/tenant-jobs.ts": {
      "experimentalTriggers": [{ "type": "queue/v2beta", "topic": "tenant-jobs" }]
    }
  }
}
```

## Manage a tenant's schedules

Pass the tenant's namespace to every SDK method:

```ts
import { Schedules } from '@vercel/schedules';

const { data } = await Schedules.list({ namespace: tenantId });

await Schedules.update({
  name: 'daily-digest',
  namespace: tenantId,
  timezone: 'America/Los_Angeles',
});

await Schedules.invoke({ name: 'daily-digest', namespace: tenantId });
```

## Delete a tenant's schedules

When you remove a tenant, delete all of their schedules so they stop running and no longer count toward your [team's schedule limit](/docs/schedules/limits#schedules-per-team):

```ts filename="lib/tenants.ts"
import { Schedules, SchedulesApiError } from '@vercel/schedules';

export async function deleteTenantSchedules(tenantId: string) {
  const names: string[] = [];
  let cursor: string | undefined;

  do {
    const page = await Schedules.list({ namespace: tenantId, cursor });
    names.push(...page.data.map((schedule) => schedule.name));
    cursor = page.cursor ?? undefined;
  } while (cursor);

  for (const name of names) {
    try {
      await Schedules.delete({ name, namespace: tenantId });
    } catch (error) {
      // A one-time schedule can't be deleted while its run is being dispatched.
      // Vercel removes it about 30 days after its scheduled time.
      if (
        error instanceof SchedulesApiError &&
        error.code === 'schedule_single_at_passed'
      ) {
        continue;
      }
      throw error;
    }
  }
}
```

A one-time schedule can't be deleted while its run is being dispatched, which can take a few minutes after its scheduled time.

## Related

- [JS SDK Reference](/docs/schedules/sdk)
- [Handling scheduled runs](/docs/schedules/handle-runs#queue-targets)
- [Limits](/docs/schedules/limits)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
