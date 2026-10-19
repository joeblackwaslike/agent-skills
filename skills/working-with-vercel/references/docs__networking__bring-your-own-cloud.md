---
title: Bring Your Own Cloud
product: vercel
url: /docs/networking/bring-your-own-cloud
canonical_url: "https://vercel.com/docs/networking/bring-your-own-cloud"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/networking
related:
  - /docs/functions
  - /docs/networking/bring-your-own-cloud/deploy-with-cli
  - /docs/networking/bring-your-own-cloud/deploy-with-github-actions
  - /docs/cdn
  - /docs/networking/bring-your-own-cloud/connect-aws-account
summary: Bring Your Own Cloud (BYOC) lets you run Vercel Functions behind your project in your own AWS account while Vercel routes requests and serves your...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/networking/bring-your-own-cloud.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "b6aba3bd8303437ce0dc165362bd7c5216f350c6f41af469987ab175dd883536"
---

# Bring Your Own Cloud

> **Availability**: Bring Your Own Cloud is available on Enterprise plans and is set up through your Vercel account team. Contact your account team to request access.

Bring Your Own Cloud (BYOC) lets you run the [Vercel Functions](/docs/functions) behind your project as AWS Lambda functions in your own AWS account. Vercel still routes requests, serves static assets, and manages the deployment, while your team owns the functions, their IAM permissions, and their network access.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Bring Your Own Cloud](https://vercel.com/kb/guide/byoc) — Use Bring Your Own Cloud \\(BYOC\\) to run Vercel Functions as AWS Lambda functions in your own AWS account, from setup to
- [Bring Your Own Cloud on AWS is now generally available](https://vercel.com/changelog/bring-your-own-cloud-on-aws-is-now-generally-available)
- [Behind the scenes of Vercel's infrastructure: Achieving optimal scalability and performance](https://vercel.com/blog/behind-the-scenes-of-vercels-infrastructure)
- [How to choose the right Vercel networking option](https://vercel.com/kb/guide/how-to-choose-the-right-vercel-networking-option) — Decide whether your project needs a networking option at all, then choose between Static IPs, AWS PrivateLink, Secure Co
- [Can I get a fixed IP address for my Vercel deployments?](https://vercel.com/kb/guide/can-i-get-a-fixed-ip-address) — Vercel deployments use dynamic IPs by default. Learn how Static IPs, Secure Compute, and AWS PrivateLink give you a fixe
- [How can I allowlist IP addresses for a deployment?](https://vercel.com/kb/guide/how-to-allowlist-deployment-ip-address) — Vercel deployments use dynamic outbound IPs by default. Learn how to allowlist IP addresses for a deployment with Static
- [How to ship a Koa app on Vercel](https://vercel.com/kb/guide/ship-a-koa-app-on-vercel) — Deploy a Koa app to Vercel with zero configuration. Learn how to ship from the Vercel CLI or Git, and configure response

Full cross-link map for this page: [/docs/networking/bring-your-own-cloud.graph.md](/docs/networking/bring-your-own-cloud.graph.md)
<!-- /docsgraph:related -->

BYOC is for teams with security, compliance, or data-residency requirements that say application code must run in a cloud account they control.

## How BYOC works

A BYOC deployment splits the work between Vercel and your AWS account. You build the application and create its functions in AWS, and Vercel wires up the deployment and invokes those functions when requests arrive.

### How a BYOC deployment is created

A BYOC deployment follows five stages, run from your machine or your CI environment:

1. **Initialize**: `vercel deploy init` creates a deployment on Vercel that waits for you to provision its functions. No files are uploaded at this stage.
2. **Build**: `vercel build --id` builds your application with the environment variables of that deployment.
3. **Describe**: `vercel deploy describe --id` packages each function as a ZIP file and writes a `descriptor.json` file that lists the AWS Lambda functions and layers to create. It doesn't create any AWS resources.
4. **Provision**: Your provisioning tool creates the Lambda functions and layers in your AWS account from the descriptor.
5. **Continue**: `vercel deploy continue --id` uploads your static assets and deployment metadata, without function code, and Vercel completes the deployment.

You have 15 minutes from initializing the deployment to running `vercel deploy continue`. After 15 minutes, the deployment fails with the error `Provisioning exceeded the maximum allowed time.`

For the full sequence, see [Deploying with BYOC using the Vercel CLI](/docs/networking/bring-your-own-cloud/deploy-with-cli). To start deployments from Git pushes instead, see [Deploying with BYOC from GitHub Actions](/docs/networking/bring-your-own-cloud/deploy-with-github-actions).

### How requests reach your functions

When a request arrives for a BYOC deployment:

1. The Vercel [CDN](/docs/cdn) receives the request and terminates TLS.
2. Vercel serves static assets and cached responses directly, without contacting your AWS account.
3. For a dynamic route, Vercel assumes an IAM role in your AWS account and invokes the matching Lambda function.
4. Your function's response returns through Vercel to the client.

Vercel invokes your functions with an IAM role that you create, called the invocation role. Vercel refreshes the credentials for that role automatically after you [connect your AWS account](/docs/networking/bring-your-own-cloud/connect-aws-account).

## What you own and what Vercel owns

With BYOC, your team takes on the parts of the platform that run in your AWS account:

| Area                       | Vercel                                                | Your team                                                                   |
| -------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------- |
| Request routing and TLS    | Routes requests and terminates TLS at the Vercel CDN  | None                                                                        |
| Static assets              | Stores and serves static assets                       | None                                                                        |
| Builds                     | Provides the build and packaging commands in the CLI  | Runs builds on your own machines or CI                                      |
| Function code and runtime  | None                                                  | Creates, stores, and runs Lambda functions and layers in your AWS account   |
| IAM                        | Assumes the invocation role you grant                 | Creates and maintains the invocation role and the Lambda execution role     |
| Networking                 | None                                                  | Provides outbound internet access, VPC attachment, and security rules       |
| Quotas and scaling         | None                                                  | Maintains AWS service quotas, concurrency limits, and scaling headroom      |
| Logs                       | Shows deployment status and function logs, as for any other deployment | None                                                       |
| Cleanup                    | Sends the `deployment.cleanup` webhook                | Deletes AWS resources for deployments you no longer need                    |

Plan for someone on your team to own the AWS account continuously. Vercel can't raise your AWS quotas, recreate deleted functions, or fix IAM or network changes made in your account.

## When to use BYOC

Use BYOC when a security, compliance, or data-residency requirement means your application code must run in an AWS account you own.

If you need private connectivity to your backends but Vercel can run your compute, another networking option is usually a better fit:

| Requirement                                                                  | Option                                                      |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------- |
| A known set of source IPs to add to a backend allowlist                      | [Static IPs](/docs/networking/static-ips)                   |
| A dedicated, single-tenant VPC with VPC peering or site-to-site VPN          | [Secure Compute](/docs/networking/secure-compute)           |
| Function code must run in your own AWS account                               | Bring Your Own Cloud                                        |

For a full comparison, see [Choosing a networking option](/docs/networking#choosing-a-networking-option).

## When not to use BYOC

BYOC isn't the right fit when:

- **All traffic must stay in your account**: TLS terminates at the Vercel CDN, and requests and responses pass through Vercel.
- **You need a government certification**: BYOC doesn't currently satisfy FedRAMP or other government certification requirements.
- **You rely on features BYOC doesn't support**: See [BYOC limitations](#byoc-limitations).
- **Your team can't own AWS operations**: BYOC moves function provisioning, quotas, and cleanup into your account.

## Security and data handling

BYOC keeps function code and function execution in your AWS account. Vercel receives only what it needs to serve the deployment and invoke your functions:

| Data                                              | Sent to Vercel                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------- |
| Function code and runtime layers                  | No. Function packages stay on your build machine and in AWS.        |
| Static assets                                     | Yes                                                                 |
| Routing and function configuration metadata      | Yes                                                                 |
| Function-to-Lambda mappings (`provision.json`)    | Yes                                                                 |
| Your application's `package.json` files          | Yes                                                                 |
| Request and response data                         | Yes. Requests and responses pass through Vercel.                    |

Function packages that `vercel deploy describe` generates contain your application code and environment variable values. Keep the `.vercel` directory private on your build machine and in CI artifacts.

Review your data handling and compliance requirements with your Vercel account team.

## BYOC limitations

| Limitation                | Details                                                                                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cloud provider            | AWS only. Functions run on AWS Lambda.                                                                                                                       |
| Runtimes                  | Node.js and Python                                                                                                                                           |
| Unsupported function types | Functions using the [Edge runtime](/docs/functions/runtimes/edge) or the [container runtime](/docs/functions/runtimes/container), and [Services](/docs/services)                                        |
| Build environment         | macOS or Linux. `vercel deploy describe` doesn't run on Windows.                                                                                             |
| Provisioning window       | 15 minutes from `vercel deploy init` to `vercel deploy continue`                                                                                             |
| Network access            | The AWS account and subnets that host your functions need outbound internet access                                                                           |
| Government certifications | Doesn't currently satisfy FedRAMP or other government certification requirements                                                                            |

### Beta enhancements

Most features of [Vercel Functions](/docs/functions/limitations) work with BYOC, except for the following beta enhancements that aren't yet available:

- [**Extended max duration beta**](/docs/functions/configuring-functions/duration#extended-max-duration-beta): The standard maximum of 800 seconds applies on Pro and Enterprise plans.
- [**Large Functions beta**](/docs/functions/limitations#large-functions-beta): The standard bundle size limit of 250 MB applies, with a 500 MB limit for Python.

## Pricing

BYOC is an Enterprise feature with custom pricing. [Contact the Vercel sales team](/contact/sales) for BYOC pricing.

Your team also pays AWS directly for the resources BYOC creates in your account, including Lambda invocations and duration, Lambda layer storage, Amazon CloudWatch logs, and data transfer.

## Get started with BYOC

Set up BYOC in this order:

1. [Connect your AWS account](/docs/networking/bring-your-own-cloud/connect-aws-account) to your Vercel team.
2. [Deploy with the Vercel CLI](/docs/networking/bring-your-own-cloud/deploy-with-cli) to create your first BYOC deployment.
3. Optionally, [deploy from GitHub Actions](/docs/networking/bring-your-own-cloud/deploy-with-github-actions) or any other provider so Git pushes create BYOC deployments.
4. Review [operating BYOC deployments](/docs/networking/bring-your-own-cloud/operations) for retries, cleanup, and monitoring.

To build your own provisioning tool, see the [BYOC provisioning reference](/docs/networking/bring-your-own-cloud/provisioning-reference).

## Related

- [Networking overview](/docs/networking)
- [Secure Compute](/docs/networking/secure-compute)
- [Vercel Functions](/docs/functions)
- [Enterprise plan](/docs/plans/enterprise)


---

[View full sitemap](/docs/sitemap)
