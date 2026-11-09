---
title: Managing Schedules
product: vercel
url: /docs/schedules/manage
canonical_url: "https://vercel.com/docs/schedules/manage"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/schedules
related:
  - /docs/cli/schedules
  - /docs/schedules/sdk
  - /docs/schedules/concepts
  - /docs/rbac/access-roles
  - /docs/schedules/limits
summary: View, enable, disable, and run schedules across environments, and check their execution history from the dashboard, CLI, or SDK.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/schedules/manage.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "ba6a6c195d0de686d7a0572dac22cef171588efa3030aa30347b36f40fbd2bb7"
---

# Managing Schedules

You can manage static and dynamic schedules from the dashboard, the [`vercel schedules`](/docs/cli/schedules) CLI, or the [`@vercel/schedules`](/docs/schedules/sdk) SDK. None of these actions require a redeploy.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Schedules](https://eve.dev/docs/schedules) — Run an agent on a cron cadence, either a fire-and-forget prompt or a handler that hands work off to a channel.
- [Schedules Configuration Reference](https://vercel.com/docs/schedules/configuration) — Reference for static schedules in vercel.json and the Build Output API, including targets, function identifiers, cron sy
- [Vercel Schedules: API Reference](https://vercel.com/docs/schedules/http-api) — Reference for the Vercel Schedules HTTP API: authenticate, choose an environment, and create, list, update, enable, disa
- [Getting Started with Schedules](https://vercel.com/docs/schedules/quickstart) — Run a private Vercel Function every hour with a static schedule in vercel.json, test it locally, and deploy it.
- [Testing Schedules Locally](https://vercel.com/docs/schedules/local-development) — Run static and dynamic schedules on your machine with vercel dev, trigger runs on demand, and learn what differs from pr
- [Handling Scheduled Runs](https://vercel.com/docs/schedules/handle-runs) — Write the private function, route, or queue consumer that a schedule runs, and make it safe to run more than once.

Full cross-link map for this page: [/docs/schedules/manage.graph.md](/docs/schedules/manage.graph.md)
<!-- /docsgraph:related -->

| Action | Static schedules | Dynamic schedules |
| --- | --- | --- |
| View, enable, disable, and run | Dashboard, CLI, or SDK | Dashboard, CLI, or SDK |
| Update | Edit your configuration and redeploy | CLI or SDK |
| Delete | Remove it from your configuration and redeploy | CLI or SDK |

## View your schedules

1. Open your project in the Vercel dashboard and select **Schedules**.
2. Use the **Environment** filter to choose production or a custom environment. For a Preview branch, select **Preview** and then the branch.
3. Optionally, filter by status, source (static or dynamic), or namespace.

To see schedules across every project on your team, open your team's **Schedules** page.

From the CLI, list schedules in production:

```bash filename="terminal"
vercel schedules list
vercel schedules inspect cleanup
```

Every `vercel schedules` command uses production by default. To manage another environment, see [Manage schedules across environments](#manage-schedules-across-environments).

From your code, call `Schedules.list()` or `Schedules.get()`. See the [JS SDK Reference](/docs/schedules/sdk#list-schedules).

## Run a schedule now

Run a schedule immediately to test it. A manual run doesn't change the schedule's state or cadence, and it works on inactive schedules.

- **Dashboard**: Select the schedule and click **Run Schedule**.
- **CLI**: Run `vercel schedules invoke cleanup`.
- **SDK**: Call `Schedules.invoke({ name: 'cleanup' })`.

Your target receives the run the same way as a scheduled one.

## Enable and disable a schedule

Disable a schedule to stop it from running on its cadence without losing its configuration. Enable it to resume.

New static schedules in Preview branches start inactive. New static schedules in custom environments start inactive unless you [change the environment's default](#run-static-schedules-in-a-custom-environment). See [Manage schedules across environments](#manage-schedules-across-environments).

**Dashboard:**

1. Select the schedule.
2. Open the menu next to **Run Schedule**.
3. Select **Disable** or **Enable**.

**CLI:**

```bash filename="terminal"
vercel schedules disable cleanup
vercel schedules enable cleanup
```

**SDK:**

```ts
import { Schedules } from '@vercel/schedules';

await Schedules.disable({ name: 'cleanup' });
await Schedules.enable({ name: 'cleanup' });
```

A static schedule keeps the state you set across later deployments.

### Enable a schedule temporarily

You can enable a schedule until a set time. When the time passes, the schedule becomes inactive again. This is useful for testing a Preview schedule without leaving it on.

- **Dashboard**: Open the menu next to **Run Schedule** and select **Enable for 1 Hour**, **Enable for 6 Hours**, or **Enable for 24 Hours**.
- **CLI**: Run `vercel schedules enable cleanup --for 2h`, or pass `--until` with an ISO 8601 time.
- **SDK**: Pass `until` to `Schedules.enable()`:

  ```ts
  await Schedules.enable({
    name: 'cleanup',
    until: new Date(Date.now() + 2 * 60 * 60 * 1000),
  });
  ```

While the window is open, the schedule has an `activeUntil` timestamp. Enabling it again with a new end time replaces the old one. Enabling it without an end time keeps it active indefinitely.

You can't add an end time to a schedule that's already active indefinitely. Disable it first, then enable it with an end time.

## Manage schedules across environments

Vercel keeps a [separate set of schedules](/docs/schedules/concepts#environments) for production, each custom environment, each Preview branch, and CLI deployments by each user. Changing a schedule in one environment doesn't affect the others, so you can test a schedule on a branch without touching production.

### Choose an environment

Each tool picks the environment differently:

| Tool | How to choose |
| --- | --- |
| Dashboard | On the project's **Schedules** page, use the **Environment** filter. For a Preview branch, select **Preview** and then the branch. |
| CLI | Pass `--environment <name-or-id>` for a custom environment, `--git-branch <branch>` for a Preview branch, or `--user <user-id>` for CLI deployments by a user. Combine `--user` and `--git-branch` for CLI deployments associated with a branch. Without these options, commands use production. |
| SDK | Calls apply to the environment of the deployment that runs your code. You can't choose a different one. |

The CLI options work with every `vercel schedules` command, including `executions list`:

```bash filename="terminal"
vercel schedules list --git-branch feature-x
vercel schedules executions list cleanup --environment staging
vercel schedules list --user user_123 --git-branch feature-x
```

You can't combine `--environment` with `--git-branch` or `--user`. You can't use any of these options with `--local`. See [Choose an environment](/docs/cli/schedules#choose-an-environment) in the CLI reference.

### Permissions

Team members with the [Developer](/docs/rbac/access-roles#developer-role) or [Project Developer](/docs/rbac/access-roles#project-developer) role can create, change, run, and delete schedules in Preview branches and custom environments. In production, they can only view schedules. Owners, Members, and Project Administrators can manage schedules in every environment.

### Test a static schedule on a Preview branch

New static schedules in Preview branches start inactive, so a branch can't run a production job by accident. To test a schedule on a branch:

1. Push the branch with the schedule in `vercel.json`. Vercel adds the schedule to the branch when the deployment is ready.
2. Open the **Schedules** page, select **Preview**, and select the branch.
3. Select the schedule and click **Run Schedule** to run it once. You don't need to enable it first.
4. To test it on its cadence, open the menu next to **Run Schedule** and select **Enable for 1 Hour**. It turns off again on its own.

From the CLI:

```bash filename="terminal"
vercel schedules invoke cleanup --git-branch feature-x
vercel schedules enable cleanup --git-branch feature-x --for 1h
```

Runs go to the branch's current deployment, so later pushes to the branch pick up your handler changes.

### Run static schedules in a custom environment

In a custom environment such as `staging`, new static schedules start inactive by default. Enable each one once. It stays enabled across later deployments to that environment:

```bash filename="terminal"
vercel schedules enable cleanup --environment staging
```

To make new static schedules in a custom environment start active instead:

1. In your project's **Settings**, open **Environments** and select the custom environment.
2. In the **Schedules** section, turn on **Create New Schedules as Active**.
3. Click **Save**.

The setting applies only to static schedules that Vercel creates after you save it. Schedules that already exist in the environment keep their current state, so turning the setting on doesn't enable a schedule you disabled, and turning it off doesn't disable any schedules.

### Dynamic schedules outside production

When code in a Preview or custom environment deployment calls `@vercel/schedules`, it creates and changes schedules for that branch or environment, not production. Dynamic schedules are active as soon as you create them, in every environment.

To inspect or clean up those schedules, pass the same `--git-branch` or `--environment` option to the CLI:

```bash filename="terminal"
vercel schedules list --git-branch feature-x --namespace tenant_abc123
vercel schedules delete daily-digest --git-branch feature-x --namespace tenant_abc123
```

## Check execution history

Select a schedule in the dashboard to see its next run and its execution history. On the schedule page, you can:

- View the run count, error rate, and average duration
- Search for a run by execution ID
- Filter scheduled and manual runs
- Filter successful and failed runs

Outcomes, error rates, and durations come from recorded function requests. For queue targets, they reflect the consumer that processed the message. Runs without a recorded outcome aren't included in the metrics.

From the CLI, list a schedule's recent runs:

```bash filename="terminal"
vercel schedules executions list cleanup --since 7d
```

See [`vercel schedules executions list`](/docs/cli/schedules#list-execution-history) for all options.

## Update a schedule

To change a **static** schedule, edit it in `vercel.json` and redeploy. Vercel applies the change when the deployment becomes current.

To change a **dynamic** schedule, call `Schedules.update()` or run `vercel schedules update`. Properties you leave out keep their current values:

```bash filename="terminal"
vercel schedules update cleanup --cron "0 3 * * *"
```

See [Update a dynamic schedule](/docs/schedules/sdk#update-a-schedule) for the full set of options.

## Delete a schedule

To delete a **static** schedule, remove it from `vercel.json` and redeploy.

To delete a **dynamic** schedule, call `Schedules.delete()` or run `vercel schedules delete`:

```bash filename="terminal"
vercel schedules delete cleanup
```

When you delete a schedule:

- Its future runs stop. If a run is already waiting to be delivered, Vercel skips it. A run that Vercel has already delivered keeps running.
- It no longer appears in the dashboard, CLI, or SDK, and it stops counting toward your [team's schedule limit](/docs/schedules/limits#schedules-per-team).
- You can create a new schedule with the same name right away. The new schedule gets a new ID and starts with no execution history.

You can delete a one-time schedule before it runs or after its run has been dispatched. While the run is still being dispatched, deleting it fails with `schedule_single_at_passed`. Try again a few minutes later. If you don't delete it, Vercel removes it about 30 days after its scheduled time.

### When Vercel deletes schedules

Vercel also deletes schedules in these cases:

| Event | What Vercel deletes |
| --- | --- |
| You remove a static schedule from your configuration | That schedule, when the new deployment becomes the current deployment of its environment or branch |
| A Preview branch no longer has a current deployment | Every static and dynamic schedule for that branch |
| Production or a custom environment no longer has a current deployment | Static schedules only. Dynamic schedules are kept. |
| You delete the project | Every schedule in the project |
| The team moves to Hobby, or you transfer the project to a Hobby team | Schedules that exceed the [Hobby limits](/docs/schedules/limits#what-happens-to-schedules-when-you-move-to-hobby) |

When a project is paused, Vercel skips its scheduled runs but doesn't delete any schedules.

## Track schedule changes

Vercel records changes to your schedules as team events, so you can see who changed what and when. Each event is recorded after the change succeeds:

- `schedule-created`
- `schedule-updated`
- `schedule-deleted`
- `schedule-enabled`
- `schedule-disabled`
- `schedule-invoked`

The `schedule-invoked` event records a manual run, outside the schedule's cadence.

These events appear in your team's [Activity Log](/docs/activity-log). On Enterprise, they're also included in [Audit Log](/docs/audit-log) exports and [audit log drains](/docs/drains/reference/audit-logs).

Vercel records an event when a person or integration makes the change. That includes the dashboard, the CLI, and API calls with a user, app, or integration principal, including OIDC tokens that carry a user. Changes your deployed code makes with the [`@vercel/schedules`](/docs/schedules/sdk) SDK aren't recorded.

## Related

- [`vercel schedules` reference](/docs/cli/schedules)
- [JS SDK Reference](/docs/schedules/sdk)
- [Concepts](/docs/schedules/concepts)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
