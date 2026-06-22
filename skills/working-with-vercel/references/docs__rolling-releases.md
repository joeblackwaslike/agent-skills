---
title: Rolling Releases
product: vercel
url: /docs/rolling-releases
canonical_url: "https://vercel.com/docs/rolling-releases"
last_updated: 2026-06-03
type: conceptual
prerequisites:
  []
related:
  - /docs/speed-insights
  - /docs/instant-rollback
  - /docs/skew-protection
  - /docs/project-configuration/project-settings
  - /docs/cli/promote
summary: Learn how to use Rolling Releases for more cautious deployments.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/rolling-releases.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "36e902fa9e9cac6901e3675053701b5cc46bb5c8db2096996b4bd56ebba5325c"
---

# Rolling Releases

> **🔒 Permissions Required**: Rolling Releases

Rolling Releases allow you to roll out new deployments to a small fraction of your users before promoting them to everyone.

Vercel offers Rolling Releases on Pro and Enterprise. Pro teams can use Rolling Releases for one project. Enterprise limits are custom.

After you enable Rolling Releases, Vercel does not immediately serve new deployments to 100% of traffic. Instead, Vercel directs a configurable fraction of
your visitors, for example, 5%, to the new deployment. The rest of your traffic routes to your previous production deployment.

You can leave your rollout in this state for as long as you want, and Vercel shows you a breakdown of key metrics, such as [Speed Insights](/docs/speed-insights),
between the canary and current deployment. You can also compare these deployments with other metrics you gather with your own observability dashboards. When you're ready,
or when a configurable period of time has passed, you can promote the prospective deployment to 100% of traffic. At any point, you can use
[Instant Rollback](/docs/instant-rollback) to revert from the current release candidate.

## Configuring Rolling Releases

1. From your [dashboard](/dashboard), navigate to your **Project Settings**.
2. Select **Build & Deployment** in the left sidebar.
3. Scroll to the **Rolling Releases** section.

> **⚠️ Warning:** We highly recommend enabling [Skew Protection](/docs/skew-protection) with
> Rolling Releases. This ensures that every user, whether they get the prior
> deployment or the release candidate, communicates with the backend code from
> the matching deployment. Without Skew Protection, users may experience
> inconsistencies between client and server versions during rollouts.

After you enable Rolling Releases, configure two or more stages for your release. Stages are the distinct
traffic ratios you want to serve as your release candidate rolls out. Each stage must send a larger fraction of traffic
to the release candidate. The last stage must always be 100%, representing the full promotion of the
release candidate. Many projects only need two stages, with a single fractional stage before final promotion, but you can
configure more stages as needed.

> **💡 Note:** A stage configured for 0% of traffic is a special case. Vercel will not
> automatically direct any visitors to the release candidate in this case, but
> it can be accessed by forcing a value for the rolling release cookie. See
> [setting the rolling release cookie](#setting-the-rolling-release-cookie) for
> more information.

After you configure Rolling Releases for the project, each subsequent rollout uses the project's current rolling
release configuration. Each new rollout clones the rolling release configuration. Editing the configuration
does not affect rollouts that are currently in progress.

## Managing Rolling Releases

You can manage Rolling releases on the [project's settings page](/docs/project-configuration/project-settings) or via the API or CLI.

### Starting a rolling release

When you enable Rolling Releases in your [project's settings](/docs/project-configuration/project-settings), any action that promotes a deployment to production will initiate
a new rolling release. This includes:

- Pushing a commit to your git branch, if your project automatically promotes new commits.
- Selecting the **Promote** menu option on a deployment on the **Deployments** page.
- Promoting a deployment [via the CLI](/docs/cli/promote).

The rolling release will proceed to its first stage, sending a portion of traffic to the release candidate.

If a rolling release is in progress when one of the **promote** actions triggers, the project's
state won't change. The active rolling release must be resolved (either completed or aborted) before starting
a new one.

### Observability

While a rolling release is in progress, it will be prominently indicated in several locations:

- The Deployments page has a section summarizing the current rolling release status.
- The release candidate is badged "Canary" in the Deployments list, and indicates the fraction of traffic it is receiving.

Furthermore, the **Observability** tab for your project has a Rolling Releases section. This lets you examine Vercel-gathered
metrics about the actual traffic mix between your deployments and comparative performance differences between them.
You can use these metrics to help you decide whether you want to advance or abort a rolling release.

#### Metrics stored outside of Vercel

You may have observability metrics gathered by platforms other than Vercel. To use these metrics to help make
decisions about rolling releases, you will need to ensure that these metrics can distinguish between behaviors
observed on the base deployment and ones on the canary. The easiest way to do this is to propagate Vercel's deployment
ID to your other observability systems.

### Advancing a rolling release

Both the Deployments page and the Rolling Releases Observability tab have controls to change the state of the current release
with a button to advance the release to its next stage. If the next stage is the final stage, the release candidate will be fully
promoted to be your current production deployment, and the project exits the rolling release state.

### Aborting a rolling release

If the metrics on the release candidate are unacceptable to you, there are several ways to abort the rolling release:

- Use the Abort button on the Rolling Releases page.
- Use [Instant Rollback](/docs/instant-rollback) to roll back to any prior deployment, including the base deployment for the current rolling release.

This will leave your project in a rolled-back state, as with Instant Rollback. When you're ready, you can select any deployment to promote
to initiate a new rolling release. The project will exit rollback status once that rolling release completes.

## Understanding Rolling Releases

Rolling Releases should work out-of-the-box for most projects, but the implementation details may be significant for some users.

When a user requests a page from a project's production deployment with an active rolling release, Vercel assigns this user to a random bucket that is stored
in a cookie on the client. We use client-identifying information such as the client's IP address to perform this bucket assignment. This allows the same
device to see the same deployment even when in incognito mode. It also ensures that in race conditions such as
multiple simultaneous requests from the same client, all requests resolve to the same target deployment.

Vercel divides buckets between the two releases at the fraction requested in the current rolling release stage. When the rolling release
advances to a later stage, clients assigned to some buckets will now be assigned to a different deployment, and will receive the new
deployment at that time.

Note that while we attempt to divide user sessions among the two deployments at the configured fraction, not all users behave the same.
If a particularly high-traffic user is placed into one bucket, the observed fraction of total requests between the two deployments may
not match the requested fraction. Likewise, note that randomized assignment based on hashing may not achieve precisely the desired
diversion rate, especially when the number of sessions is small.

### Why Rolling Releases needs Skew Protection

Rolling Releases impact which deployment a user gets when they make a page load. Skew Protection ensures that backend API requests made
from a particular deployment are served by a backend implementation from the same deployment.

When a new user loads a page from a project with an active rolling release, they might receive a page from either deployment. Skew
Protection ensures that, whichever deployment they are served, their backend calls are consistent with the page that they loaded.

If the rolling release stage is advanced, the user may be eligible for a new deployment. On their next page load or refresh, they
will fetch that page from the new deployment. Until they refresh, Skew Protection will continue to ensure that they use backends
consistent with the page they are currently on.

### Setting the Rolling Release cookie

You can modify the Rolling Release cookie on a client by issuing a request that includes a special query parameter.
Requests that include `vcrrForceStable=true` in the URL will always get the base release for the current rolling release.
Likewise, `vcrrForceCanary=true` will force the cookie to target the current canary, including for a rolling release stage
configured for 0% of traffic.

> **💡 Note:** **Cookie value vs. served deployment.** During an active rolling release, the
> `_vcrr_<hash>` cookie (where `<hash>` is derived from your project ID) always
> includes the **canary (release candidate) deployment ID** as the first segment.
> That ID identifies the rolling-release session; it does not mean every request
> is served from the canary.The cookie value has the form
> `<canaryDeploymentId>|<bucketPercent>[|forced]`:* `<bucketPercent>` is a number between 0 and 1. If it is less than or equal
>   to the current stage's canary traffic fraction, the user is routed to the
>   canary; otherwise they are routed to the base (current) production
>   deployment.
> * `|forced` is appended when routing was set via `vcrrForceCanary=true` or
>   `vcrrForceStable=true`.`vcrrForceCanary=true` sets the bucket to `0` (canary).
> `vcrrForceStable=true` sets the bucket to `1` (base release while the
> rollout is below 100%).For example, both `?vcrrForceCanary=true` and `?vcrrForceStable=true` may
> return a cookie that starts with the same canary deployment ID, but only the
> canary URL includes `|0|forced` and serves the release candidate. The stable
> URL includes `|1|forced` and serves the base deployment.

This forced cookie is good only for the duration of a single rolling release. When that rolling release is completed or aborted
and a new rolling release starts, the cookie will get re-processed to a random value.

> **⚠️ Warning:** Be aware that anybody is capable of setting `vcrrForceCanary=true` on a URL.
> 0% canaries are not served by default, but they are not securely hidden from
> users.

## Manage rolling releases programmatically with the REST API

The Rolling Releases REST API allows you to programmatically manage rolling release configurations and monitor active releases. Common use cases include:

- **CI/CD integration**: Automate rolling release workflows as part of your deployment pipeline
- **Monitoring and observability**: Track the status and progress of active rolling releases
- **Update configuration**: Enable/disable rolling releases, add/remove stages, and more
- **Custom tooling**: Build internal dashboards or tools that interact with rolling release data

### Allowed endpoints

The following are the supported REST API endpoints for rolling releases and rollback:

| Method | Endpoint                                                                                                                                                                                        |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | [GET /v1/projects/{idOrName}/rolling-release/billing](/docs/rest-api/reference/endpoints/rolling-release#get-rolling-release-billing)                                                          |
| GET    | [GET /v1/projects/{idOrName}/rolling-release/config](/docs/rest-api/reference/endpoints/rolling-release#get-rolling-release-config)                                                            |
| DELETE | [DELETE /v1/projects/{idOrName}/rolling-release/config](/docs/rest-api/reference/endpoints/rolling-release#delete-rolling-release-config)                                                      |
| PATCH  | [PATCH /v1/projects/{idOrName}/rolling-release/config](/docs/rest-api/reference/endpoints/rolling-release#update-rolling-release-config)                                                       |
| GET    | [GET /v1/projects/{idOrName}/rolling-release](/docs/rest-api/reference/endpoints/rolling-release#get-active-rolling-release)                                                                   |
| POST   | [POST /v1/projects/{idOrName}/rolling-release/approve-stage](/docs/rest-api/reference/endpoints/rolling-release#advance-rolling-release-to-next-stage)                                         |
| POST   | [POST /v1/projects/{idOrName}/rolling-release/complete](/docs/rest-api/reference/endpoints/rolling-release#complete-rolling-release)                                                           |
| POST   | [POST /v1/projects/{projectId}/rollback/{deploymentId}](/docs/rest-api/reference/endpoints/instant-rollback#rollback-a-project-to-a-previous-deployment)                                       |
| PATCH  | [PATCH /v1/projects/{projectId}/rollback/{deploymentId}/update-description](/docs/rest-api/reference/endpoints/instant-rollback#update-the-description-of-a-project-rollback-to-a-deployment) |

### Stopping a rolling release with the API or SDK

To stop an active rolling release programmatically, use one of these approaches:

1. **Roll back (revert traffic to the previous production deployment):** Use the project rollback endpoint: `POST /v1/projects/{projectId}/rollback/{deploymentId}`. Pass the deployment ID of the previous production deployment (the one you want traffic to revert to). This stops the rollout and routes 100% of traffic back to that deployment. See [Instant Rollback](/docs/instant-rollback) for details.

2. **Promote the canary to 100%:** Call `POST /v1/projects/{idOrName}/rolling-release/complete`. The canary deployment then serves all production traffic and the rolling release is complete.

If you disable Rolling Releases via the config endpoint (PATCH or DELETE) while a rollout is in progress, the config change alone does not stop the current rollout—it only affects future deployments. After disabling, you must still call the complete endpoint or the rollback endpoint to resolve the active rollout.

For detailed API specifications, request/response schemas, and code examples:

- [API reference](/docs/rest-api/rolling-release)
- [Examples using the SDK](/docs/rest-api/sdk/examples/rolling-releases)


---

[View full sitemap](/docs/sitemap)
