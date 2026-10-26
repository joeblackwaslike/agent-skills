---
title: Deploying with BYOC from GitHub Actions
product: vercel
url: /docs/networking/bring-your-own-cloud/deploy-with-github-actions
canonical_url: "https://vercel.com/docs/networking/bring-your-own-cloud/deploy-with-github-actions"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/networking/bring-your-own-cloud
  - /docs/networking
related:
  - /docs/git
  - /docs/networking/bring-your-own-cloud
  - /docs/networking/bring-your-own-cloud/deploy-with-cli
  - /docs/deployment-protection
  - /docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
summary: Keep the Vercel Git integration and use GitHub Actions to build, provision, and complete Bring Your Own Cloud (BYOC) deployments on every push.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/networking/bring-your-own-cloud/deploy-with-github-actions.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "422049149c612598b80eae74f1436b42093f64b99e1841061f279634a17cc31c"
---

# Deploying with BYOC from GitHub Actions

> Bring Your Own Cloud is available on Enterprise plans and is set up through your Vercel account team. Contact your account team to request access.

Keep the [Vercel Git integration](/docs/git) for a [Bring Your Own Cloud (BYOC)](/docs/networking/bring-your-own-cloud) project, so every push creates a preview or production deployment that GitHub Actions builds, provisions in your AWS account, and completes.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Bring Your Own Cloud](https://vercel.com/kb/guide/byoc) — Use Bring Your Own Cloud \\(BYOC\\) to run Vercel Functions as AWS Lambda functions in your own AWS account, from setup to
- [Can you deploy based on tags/releases on Vercel?](https://vercel.com/kb/guide/can-you-deploy-based-on-tags-releases-on-vercel) — Learn how to deploy based on tags/releases on Vercel.
- [How can I use the Vercel CLI for custom workflows?](https://vercel.com/kb/guide/using-vercel-cli-for-custom-workflows) — You can use the Vercel CLI to deploy any application, including custom git providers and restricted source code.
- [Implementing Blue-Green Deployments on Vercel](https://vercel.com/kb/guide/blue_green_deployments_on_vercel) — This guide outlines how to implement blue-green deployments on Vercel, leveraging GitHub Actions for seamless and contro
- [How can I run end-to-end tests after my Vercel Preview Deployment?](https://vercel.com/kb/guide/how-can-i-run-end-to-end-tests-after-my-vercel-preview-deployment) — Learn how to use the Vercel CLI in combination with your CI/CD provider to run end-to-end tests for every code change.
- [Connecting an AWS Account for BYOC](https://vercel.com/docs/networking/bring-your-own-cloud/connect-aws-account) — Connect an AWS account to your Vercel team so Bring Your Own Cloud \\(BYOC\\) can invoke Lambda functions in your account.

Full cross-link map for this page: [/docs/networking/bring-your-own-cloud/deploy-with-github-actions.graph.md](/docs/networking/bring-your-own-cloud/deploy-with-github-actions.graph.md)
<!-- /docsgraph:related -->

This setup is optional. You can also run BYOC deployments from any CI system with the [Vercel CLI flow](/docs/networking/bring-your-own-cloud/deploy-with-cli).

## How the GitHub Actions flow works

With the BYOC Git flow turned on, Vercel doesn't build your pushes itself. Instead:

1. You push a commit, and the Vercel Git integration creates a BYOC deployment that waits for provisioning.
2. Vercel sends the `deployment.build-requested` webhook to a webhook relay that you host. The relay can run on any service that can receive the webhook. The setup on this page deploys it as an AWS Lambda function in your AWS account.
3. The relay verifies the webhook signature and starts your GitHub Actions workflow through a GitHub App.
4. The workflow checks out the deployment's exact commit and runs the [CLI flow](/docs/networking/bring-your-own-cloud/deploy-with-cli) with the existing deployment ID: `vercel build --id`, `vercel deploy describe`, provisioning, and `vercel deploy continue`.

The workflow authenticates to Vercel and AWS with OpenID Connect (OIDC), which gives each run short-lived credentials without storing long-lived access keys for either service. Builds run separately from the AWS provisioning credentials.

The 15-minute provisioning window starts when Vercel creates the deployment, so time spent waiting in the GitHub Actions queue counts toward it.

## Prerequisites

- A working [CLI deployment](/docs/networking/bring-your-own-cloud/deploy-with-cli) for the project, including the AWS account connection and the Lambda execution role.
- Administrator access to the GitHub repository.
- AWS permissions to create the relay's supporting resources: a Lambda function, an AWS Secrets Manager secret, and IAM roles.
- A Vercel team Owner to configure OIDC authentication for the Vercel CLI. If OIDC authentication for the CLI isn't available on your team, ask your Vercel account team to enable it.
- The [BYOC agent skill](https://github.com/vercel-labs/vercel-byoc) installed in your application repository with `npx skills add vercel-labs/vercel-byoc`.

## Set up GitHub Actions for BYOC

- ### Generate the integration
  From your application repository, ask your coding agent to generate the integration, using your AWS CLI profile and execution role ARN:
  ```text filename="Prompt"
  Set up GitHub Actions for this project's BYOC deployments using AWS profile byoc-admin and Lambda execution role arn:aws:iam::<AWS_ACCOUNT_ID>:role/byoc-lambda-execution.
  ```
  The agent identifies your Vercel project, confirms the AWS account and region, and generates four pieces:

  | Piece                   | Purpose                                                                                  |
  | ----------------------- | ---------------------------------------------------------------------------------------- |
  | GitHub Actions workflow | Builds, describes, provisions, and continues each requested deployment                   |
  | Provisioning scripts    | Create the Lambda layers and functions from `descriptor.json`                            |
  | Webhook relay           | Receives `deployment.build-requested` and starts the workflow                            |
  | Infrastructure template | Creates the relay, its secret, and the AWS roles the workflow assumes through OIDC       |

  The local AWS profile is used only for setup. The workflow itself uses OIDC.

- ### Create and install the GitHub App
  The relay starts workflows through a GitHub App. Create it with these settings:
  1. Create a private GitHub App under the account or organization that owns the repository.
  2. Grant **Repository permissions** → **Actions**: **Read and write**, and leave incoming webhooks turned off.
  3. Install the App on the BYOC repository only.
  4. Generate and download a private key for the App.
  Give the agent the App ID, the installation ID, and the local path to the private key file. Don't paste the key into a chat or commit it to the repository.

- ### Deploy and verify the integration
  Have the agent deploy the infrastructure template and upload the relay code. The agent stores the GitHub App private key and the webhook signing secret in AWS Secrets Manager in your selected account and region, and grants the relay access to the secret.

  The agent then publishes the workflow on the repository's default branch and registers a project-specific Vercel webhook for `deployment.build-requested` with signature verification.

  **Check**: Before you turn on the flow, have the agent report these results:
  - **Relay**: The relay's URL and log location, plus the secret's name and region in AWS Secrets Manager.
  - **Vercel authentication**: A GitHub Actions job can obtain temporary Vercel credentials and read the intended project.
  - **AWS authentication**: A GitHub Actions job can assume the provisioning role in the intended AWS account.

- ### Turn on the BYOC Git flow
  Connect the project to the Vercel Git integration, or reuse an existing connection. Then turn on the BYOC Git flow by adding the `manualProvisioning` property to your project's `vercel.json`, keeping your other settings:
  ```json filename="vercel.json"
  {
    "manualProvisioning": true
  }
  ```
  Alternatively, set the project environment variable `VERCEL_MANUAL_PROVISIONING` to `1` for each environment that should use the BYOC Git flow.

  You don't need either setting for the [CLI flow](/docs/networking/bring-your-own-cloud/deploy-with-cli).

- ### Test preview and production deployments
  Push a new commit to a preview branch.

  **Check**:
  - The GitHub Actions workflow runs for the commit.
  - The Vercel deployment reaches `READY`.
  - An existing dynamic route returns the expected response.
  If the deployment uses [Deployment Protection](/docs/deployment-protection), have the agent configure [Protection Bypass for Automation](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) so the workflow's check can reach the deployment.

  Repeat the test on your production branch to verify production deployments.

> **💡 Note:** Run only one workflow per deployment ID at a time. If a run fails while the
> deployment is still waiting for provisioning, rerun it with the same
> deployment ID. See [Failures and
> retries](/docs/networking/bring-your-own-cloud/operations#failures-and-retries).

## Next steps

- [Operate BYOC deployments](/docs/networking/bring-your-own-cloud/operations), including retries, cleanup, and credential rotation
- [Review the BYOC provisioning reference](/docs/networking/bring-your-own-cloud/provisioning-reference)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
