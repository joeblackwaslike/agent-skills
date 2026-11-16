---
title: Fluid compute pricing
product: vercel
url: /docs/functions/usage-and-pricing
canonical_url: "https://vercel.com/docs/functions/usage-and-pricing"
last_updated: 2026-06-16
type: reference
prerequisites:
  - /docs/functions
related:
  - /docs/fluid-compute
  - /docs/plans/hobby
  - /docs/deployments
  - /docs/plans/pro-plan
  - /docs/plans/pro-plan/trials
summary: Learn about usage and pricing for fluid compute on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/functions/usage-and-pricing.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "c8cf427c002c8cc6e5cb64efc78e37042b861d1ca450bf271fa2e3bd44efcc55"
---

# Fluid compute pricing

Vercel prices Functions on fluid compute based on your plan and resource usage. Hobby includes monthly allowances for Active CPU, Provisioned Memory, and Invocations. Vercel bills Pro usage on demand, and your monthly Pro usage credit can offset those charges:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Bun 1.4 is now available in Vercel Functions](https://vercel.com/changelog/bun-1-4-is-now-available-in-vercel-functions)
- [Bun runtime for Vercel Functions now accepts Bun.serve as an entrypoint](https://vercel.com/changelog/bun-serve-entrypoint-for-vercel-functions)
- [Function invocations now billed per unit](https://vercel.com/changelog/function-invocations-now-billed-per-unit)
- [Vercel Queues now in public beta](https://vercel.com/changelog/vercel-queues-now-in-public-beta)
- [WebSocket support is now generally available](https://vercel.com/changelog/websocket-support-is-now-generally-available)
- [Astro on Vercel vs Webflow Cloud](https://vercel.com/kb/guide/astro-on-vercel-vs-webflow-cloud) — Compare running Astro on Vercel Functions with Fluid compute against Webflow Cloud on Cloudflare Workers. Learn how Astr
- [Running background workers on Vercel](https://vercel.com/kb/guide/background-workers-on-vercel) — Run background jobs on Vercel with waitUntil, Cron Jobs, Queues, Workflows, Daemons, or Sandbox. Compare the options and
- [Deploy PHP on Vercel with Docker](https://vercel.com/kb/guide/deploy-php-on-vercel-with-docker) — Build a PHP application with FrankenPHP and Docker, then deploy it to Vercel Functions with managed configuration, stora
- [Running Docker on Vercel](https://vercel.com/kb/guide/docker) — Run Docker on Vercel for HTTP apps and background workers, store images in Vercel Container Registry, and test container
- [Running Docker on Vercel vs Render](https://vercel.com/kb/guide/docker-on-vercel-vs-render) — Compare how Vercel and Render run Docker workloads, including deployment model, scaling, image sources, state, and netwo
- [Building Slack agents can be easy](https://vercel.com/blog/building-slack-agents-can-be-easy)
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.

Full cross-link map for this page: [/docs/functions/usage-and-pricing.graph.md](/docs/functions/usage-and-pricing.graph.md)
<!-- /docsgraph:related -->

| Resource | Hobby | Pro |
| --- | --- | --- |
| **Active CPU** | 4 hours included | N/A |
| *On-demand Active CPU* | - | Costs vary by region |
| **Provisioned Memory** | 360 GB-hrs included | N/A |
| *On-demand Provisioned Memory* | - | Costs vary by region |
| **Invocations** | 1 million included | N/A |
| *On-demand Invocations* | - | N/A |


Enterprise plans have custom terms. Speak to your Vercel account representative for details.

### Resource Details

#### Active CPU

- This is the CPU time your code actively consumes in milliseconds
- You are only billed during actual code execution and not during I/O operations (database queries, like AI model calls, etc.)
- Billed per CPU-hour
- Pauses billing when your code is waiting for external services

For example: If your function takes 100ms to process data but spends 400ms waiting for a database query, you're only billed for the 100ms of active CPU time. This means computationally intensive tasks (like image processing) will use more CPU time than I/O-heavy tasks (like making API calls).

#### Provisioned Memory

- Memory allocated to your function instances (in GB)
- Billed for the entire instance lifetime in GB-hours
- Continues billing while handling requests, even during I/O operations
- Each instance can handle multiple requests with [optimized concurrency](/docs/fluid-compute#optimized-concurrency)
- Memory is reserved for your function even when it's waiting for I/O
- Billing continues until the last in-flight request completes

For example: If you have a 1GB function instance running for 1 hour handling multiple requests, you're billed for 1 GB-hour of provisioned memory, regardless of how many requests it processed or how much of that hour was spent waiting for I/O.

#### Invocations

- Counts each request to your function
- Billed per incoming request
- Hobby includes 1 million invocations per month
- Vercel bills Pro invocations on demand
- Counts regardless of request success or failure

For example: If your function receives 1.5 million requests on a Pro plan, Vercel bills those invocations at $0.60 per million, subject to your monthly Pro usage credit.

## Regional pricing

The following table shows the regional pricing for fluid compute resources on Vercel. The prices are per hour for CPU and per GB-hr for memory:

| Region | Active CPU (per hour) | Provisioned Memory (per GB-hr) |
| --- | --- | --- |
| Cape Town, South Africa (cpt1) | $0.200 | $0.0166 |
| Cleveland, USA (cle1) | $0.128 | $0.0106 |
| Dublin, Ireland (dub1) | $0.168 | $0.0139 |
| Frankfurt, Germany (fra1) | $0.184 | $0.0152 |
| Hong Kong (hkg1) | $0.176 | $0.0146 |
| London, UK (lhr1) | $0.177 | $0.0146 |
| Montreal, Canada (yul1) | $0.147 | $0.0122 |
| Mumbai, India (bom1) | $0.140 | $0.0116 |
| Osaka, Japan (kix1) | $0.202 | $0.0167 |
| Paris, France (cdg1) | $0.177 | $0.0146 |
| Portland, USA (pdx1) | $0.128 | $0.0106 |
| San Francisco, USA (sfo1) | $0.177 | $0.0147 |
| São Paulo, Brazil (gru1) | $0.221 | $0.0183 |
| Seoul, South Korea (icn1) | $0.169 | $0.0140 |
| Singapore (sin1) | $0.160 | $0.0133 |
| Stockholm, Sweden (arn1) | $0.160 | $0.0133 |
| Sydney, Australia (syd1) | $0.180 | $0.0149 |
| Tokyo, Japan (hnd1) | $0.202 | $0.0167 |
| Washington D.C., USA (iad1) | $0.128 | $0.0106 |


## How pricing works

A function instance runs in a region, and its pricing is based on the resources it uses in that region. The cost for each invocation is calculated based on the **Active CPU** and **Provisioned memory** resources it uses in that region.

When the first request arrives, Vercel starts an instance with your configured memory. Vercel bills Provisioned Memory continuously until the last in-flight request finishes. **Vercel bills Active CPU only while your code is actually running. If the request is waiting on I/O, CPU billing pauses but memory billing continues**.

After all requests complete, the instance is paused, and no CPU or memory charges apply until the next invocation. This means, you pay for memory whenever work is in progress, never for idle CPU, and nothing at all between requests.

### Example

Suppose you deploy a function with 4 GB of memory in the São Paulo, Brazil region, where the rates are $0.221/hour for CPU and $0.0183/GB-hour for memory. If one request takes 4 seconds of active CPU time and the instance is alive for 10 seconds (including I/O), the cost will be:

- CPU: (4 seconds / 3600) × $0.221 = $0.0002456
- Memory: (4 GB × 10 seconds / 3600) × $0.0183 = $0.0002033
- Total: $0.0002456 + $0.0002033 = $0.0004489 for each invocation.

## What happens when a Hobby team exceeds its fluid compute allowance

Exceeding the usage limits of your plan is one cause of a paused deployment. A paused production deployment stops serving traffic, and visitors see a `503 DEPLOYMENT_PAUSED` error. For the other causes and how to resolve each one, see [Why has my account or deployment been paused?](/kb/guide/why-is-my-account-deployment-blocked).

In most cases, a Hobby team that exceeds its usage limits must wait until 30 days have passed before it can use fluid compute again, as described in [Hobby billing cycle](/docs/plans/hobby#hobby-billing-cycle). A paused Hobby team doesn't resume on its own when that period ends.

When your [Hobby team](/docs/plans/hobby) is set to **paused**, it remains in this state indefinitely unless you take action. This means **all** new and existing [deployments](/docs/deployments) will be paused.

> **💡 Note:** If you have reached this state, your application is likely a good candidate
> for a [Pro account](/docs/plans/pro-plan).

To unpause your account, you have two main options:

- **Contact Support**: You can reach out to our [support team](/help) to discuss the reason for the pause and potential resolutions
- **Transfer to a Pro team**:
  If your Hobby team is paused, you won't have the option to initiate a [Pro trial](/docs/plans/pro-plan/trials). Instead, you can set up a Pro team:
  1. [Create a Pro team account](/docs/accounts#creating-a-team)
  2. Add a valid credit card to this account. Open **Settings** in the sidebar, then select [**Billing**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbilling\&title=Go+to+Billing) and **Payment Method**

Once set up, a transfer modal will appear, prompting you to [transfer your previous Hobby projects](/docs/projects/transferring-projects) to this new team. After transferring, you can continue with your projects as usual.

Pro doesn't include allowances for Active CPU, Provisioned Memory, or Invocations. Vercel bills them on demand, and your monthly Pro usage credit can offset those charges. To upgrade before your team is paused, see [Upgrading to Pro](/docs/plans/hobby#upgrading-to-pro).

To check which allowance your team exceeded, compare Active CPU, Provisioned Memory, and Invocations on the [Usage page or with `vercel billing usage`](/docs/pricing/manage-and-optimize-usage#viewing-usage). To find the routes that drive Active CPU, see [Troubleshoot and optimize Active CPU usage on Fluid compute](/kb/guide/optimize-active-cpu-on-fluid-compute).

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
