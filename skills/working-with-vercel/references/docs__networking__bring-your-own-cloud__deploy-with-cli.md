---
title: Deploying with BYOC Using the Vercel CLI
product: vercel
url: /docs/networking/bring-your-own-cloud/deploy-with-cli
canonical_url: "https://vercel.com/docs/networking/bring-your-own-cloud/deploy-with-cli"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/networking/bring-your-own-cloud
  - /docs/networking
related:
  - /docs/networking/bring-your-own-cloud
  - /docs/networking/bring-your-own-cloud/connect-aws-account
  - /docs/networking/bring-your-own-cloud/provisioning-reference
  - /docs/networking/bring-your-own-cloud/operations
  - /docs/networking/bring-your-own-cloud/deploy-with-github-actions
summary: Build a project, provision its functions in your AWS account, and complete a Bring Your Own Cloud (BYOC) deployment with the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/networking/bring-your-own-cloud/deploy-with-cli.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "9d8eebd3432960be1bc7b6ebb49847db88958be771812c834e1f7be21c90c716"
---

# Deploying with BYOC Using the Vercel CLI

> **Availability**: Bring Your Own Cloud is available on Enterprise plans and is set up through your Vercel account team. Contact your account team to request access.

Create a [Bring Your Own Cloud (BYOC)](/docs/networking/bring-your-own-cloud) deployment from your machine or CI with the Vercel CLI. You initialize a deployment, build it, generate its AWS resource descriptor, provision the functions in your AWS account, and then tell Vercel to complete the deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Bring Your Own Cloud](https://vercel.com/kb/guide/byoc) — Use Bring Your Own Cloud \\(BYOC\\) to run Vercel Functions as AWS Lambda functions in your own AWS account, from setup to
- [How to debug 404 errors](https://vercel.com/kb/guide/how-to-debug-404-errors) — Learn the systematic steps to identify and resolve 404 issues.
- [Bring Your Own Cloud on AWS is now generally available](https://vercel.com/changelog/bring-your-own-cloud-on-aws-is-now-generally-available)
- [Implementing Canary Deployments on Vercel](https://vercel.com/kb/guide/implementing_canary_deployments_on_vercel) — This guide explains how to set up canary deployments on Vercel, enabling developers to gradually roll out new versions t
- [Vercel Deployment Guide](https://ai-sdk.dev/docs/advanced/vercel-deployment-guide) — Learn how to deploy an AI application to production on Vercel
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.

Full cross-link map for this page: [/docs/networking/bring-your-own-cloud/deploy-with-cli.graph.md](/docs/networking/bring-your-own-cloud/deploy-with-cli.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

- An AWS account [connected to your Vercel team](/docs/networking/bring-your-own-cloud/connect-aws-account) with the **Active** status.
- The ARN of a [Lambda execution role](/docs/networking/bring-your-own-cloud/connect-aws-account#create-the-lambda-execution-role) in that account.
- macOS or Linux with Node.js 20 or later. `vercel deploy describe` doesn't run on Windows.
- Vercel CLI 63.1.2 or later. Install the latest version with `npm i -g vercel@latest`.
- The [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) v2 and [`jq`](https://jqlang.org/download/).
- AWS credentials for an identity with the [provisioning permissions](/docs/networking/bring-your-own-cloud/provisioning-reference#provisioning-identity-permissions).
- A Vercel project with its build settings and environment variables configured for the target environment.

## Set up a provisioning tool

The Vercel CLI generates the AWS resources to create, but doesn't create them. You need a provisioning tool that reads `descriptor.json` and creates the Lambda layers and functions in your account. Choose one of these options:

- **Generate a script with the BYOC agent skill**: Install the [BYOC skill](https://github.com/vercel-labs/vercel-byoc) in your application repository, then ask your coding agent to create a provisioning script.
- **Use your own tooling**: Build provisioning into your existing infrastructure tooling, such as Terraform or the AWS SDK, following the [BYOC provisioning reference](/docs/networking/bring-your-own-cloud/provisioning-reference).

To use the BYOC skill, install it from your application's directory:

```bash filename="Terminal"
npx skills add vercel-labs/vercel-byoc
```

Then ask your coding agent to create a project script, replacing the execution role ARN with your own:

```text filename="Prompt"
Using the BYOC skill, create `pnpm byoc:provision <deployment-id>` using the execution role arn:aws:iam::<AWS_ACCOUNT_ID>:role/byoc-lambda-execution.
```

The rest of this guide runs that script as `pnpm byoc:provision`. If you use your own tooling, run your tool at the provisioning step instead.

## Deploy with BYOC

Run every command from your application's directory, and use the same deployment ID from initialization through completion.

> **💡 Note:** You have 15 minutes from `vercel deploy init` to `vercel deploy continue`.
> Finish linking the project, authenticating, and setting up your provisioning
> tool before you initialize the deployment.

- ### Set the deployment variables
  Set the values for your team, project, target environment, and AWS account. Use `preview` or `production` for the target, and keep the same value throughout:
  ```bash filename="Terminal"
  team_id="<TEAM_ID>"
  project_name="my-app"
  target="preview"
  aws_account_id="<AWS_ACCOUNT_ID>"
  ```
  Authenticate the Vercel CLI with `vercel login`, and make sure your AWS credentials point to the intended account:
  ```bash filename="Terminal"
  aws sts get-caller-identity
  ```
  **Check**: The `Account` value in the output matches `aws_account_id`.

- ### Link the project and pull its settings
  Link your application to the Vercel project, then pull the project settings for the target environment:
  ```bash filename="Terminal"
  vercel link --yes --team "$team_id" --project "$project_name"
  vercel pull --yes --environment "$target" --scope "$team_id"
  ```
  **Check**: `.vercel/project.json` contains the intended team and project.

- ### Initialize the deployment
  Create a deployment on Vercel and save its ID. `vercel deploy init` uploads no files. The deployment waits for you to provision its functions:
  ```bash filename="Terminal"
  mkdir -p .vercel/byoc
  vercel deploy init --yes --target "$target" --scope "$team_id" --json > .vercel/byoc/init.json
  deployment_id=$(jq -er '.deployment.id // .id' .vercel/byoc/init.json)
  jq -r '.deployment.target // .target' .vercel/byoc/init.json
  ```
  The deployment ID is at `.id` when you run the command in a terminal, and at `.deployment.id` when the CLI runs non-interactively, such as in CI or from a coding agent. The `jq` expression above handles both.

  **Check**: The printed target is `production` for a production deployment, or `null` for a preview deployment. A new project's first deployment is assigned to production even when you request `preview`. If the target is wrong, [mark the deployment as failed](/docs/networking/bring-your-own-cloud/operations#abandon-a-pending-deployment) and initialize another.

- ### Build the application
  Build the application with the environment variables of the deployment you initialized:
  ```bash filename="Terminal"
  vercel build --id "$deployment_id" --target "$target" --yes
  ```
  **Result**: The build output is written to `.vercel/output`.

- ### Describe the AWS resources
  Package the functions and generate the descriptor for your AWS account:
  ```bash filename="Terminal"
  vercel deploy describe --id "$deployment_id" --aws-account-id "$aws_account_id"
  ```
  `vercel deploy describe` uses the team in `.vercel/project.json`, and fails if `--scope` or `VERCEL_ORG_ID` names a different team. It doesn't create any AWS resources.

  **Result**: The command writes these files under `.vercel/<deployment-id>/`:

  | Path              | Contents                                                       |
  | ----------------- | -------------------------------------------------------------- |
  | `descriptor.json` | The Lambda functions and layers to create in your AWS account |
  | `zips/`           | One ZIP file per function                                      |
  | `layers/`         | One ZIP file per runtime layer                                 |
  | `build/`          | The original build output, moved from `.vercel/output`         |

  It also replaces `.vercel/output` with a version that contains no function code, plus a `provision.json` file that maps routes to Lambda functions. `vercel deploy continue` uploads this version.

  The function ZIP files contain your application code and environment variable values. Keep the `.vercel` directory private and keep the workspace until the deployment completes. For field-level details, see the [BYOC provisioning reference](/docs/networking/bring-your-own-cloud/provisioning-reference).

- ### Provision the functions in AWS
  Run your provisioning tool with the credentials of your provisioning identity. This example selects a local AWS CLI profile with `AWS_PROFILE`:
  ```bash filename="Terminal"
  AWS_PROFILE="byoc-provisioner" pnpm byoc:provision "$deployment_id"
  ```
  Your provisioning tool must create every layer and function in the descriptor, in each function's AWS region, and wait until each function reaches the `Active` state. The invocation role must allow `lambda:InvokeFunction` on every function you create.

  **Check**: Every function in `descriptor.json` exists in AWS with the `Active` state. To list the functions and regions the descriptor expects, run:
  ```bash filename="Terminal"
  jq -r '.functions[] | "\(.region) \(.configuration.FunctionName)"' ".vercel/$deployment_id/descriptor.json"
  ```

- ### Complete the deployment
  Tell Vercel the functions are ready. `vercel deploy continue` uploads the code-free output and `provision.json`, then waits for the deployment to finish:
  ```bash filename="Terminal"
  vercel deploy continue --id "$deployment_id" --scope "$team_id"
  vercel inspect "$deployment_id" --scope "$team_id" --wait
  ```
  **Check**: `vercel inspect` reports the `READY` status.

- ### Verify a function runs in your account
  Request a dynamic route through the exact deployment. Replace `/api/hello` with a route in your application that runs a function:
  ```bash filename="Terminal"
  vercel curl "/api/hello" --deployment "$deployment_id" --scope "$team_id" -- --fail-with-body --silent --show-error
  ```
  A static or cached response doesn't prove that BYOC is working. Confirm that the function ran in your account by checking its Amazon CloudWatch logs, using a function name and region from the descriptor:
  ```bash filename="Terminal"
  aws logs tail "/aws/lambda/your_function_name" --region us-east-1 --since 10m
  ```
  **Check**: The route returns the expected response, and the function's CloudWatch log group shows the invocation. If your functions run in multiple regions, confirm each region's functions exist and record which region handled your test requests.

## Customize provisioning

You can change how your provisioning tool creates functions, for example to attach functions to a VPC or add Lambda layers. Keep the generated function names, handlers, runtimes, memory, timeouts, environment variables, and tags exactly as they appear in the descriptor. Vercel invokes each function by its generated name, so renaming a function causes requests to it to fail. For the full list of values to preserve, see [Values to keep as generated](/docs/networking/bring-your-own-cloud/provisioning-reference#values-to-keep-as-generated).

If you attach functions to a VPC, route the subnets through a NAT gateway or equivalent egress so functions keep outbound internet access, and check your security group rules and DNS resolution.

For function packages larger than 50 MB, upload the ZIP files to a private Amazon S3 bucket in the same region as the function, and create the function from the bucket. See [Function package size](/docs/networking/bring-your-own-cloud/provisioning-reference#function-package-size).

## Troubleshooting

| Symptom                                                                                              | Cause                                                                                        | Fix                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Deployment dpl_... was not found, or manual provisioning is not enabled for this team.`              | BYOC isn't enabled for the team, or the deployment ID belongs to a different team            | Confirm the deployment ID and linked team. Ask your Vercel account team to confirm BYOC is enabled.                                                        |
| `vercel deploy describe` reports a scope or project mismatch                                          | `--scope`, `VERCEL_ORG_ID`, or `VERCEL_PROJECT_ID` doesn't match `.vercel/project.json`      | Remove the conflicting value or relink the project.                                                                                                       |
| `vercel deploy describe` rejects the build as unsupported                                             | The build includes functions using the Edge runtime or the container runtime, or Services    | Move those functions to the Node.js or Python runtime, and remove Services from the project. See [BYOC limitations](/docs/networking/bring-your-own-cloud#byoc-limitations). |
| `No prebuilt output found in ".vercel/output"`                                                       | `vercel deploy continue` ran from a different directory, or before `vercel deploy describe` | Run every command from the application's directory, in order.                                                                                             |
| `Provisioning exceeded the maximum allowed time.`                                                    | More than 15 minutes passed between `vercel deploy init` and `vercel deploy continue`       | Start a new deployment. See [Failures and retries](/docs/networking/bring-your-own-cloud/operations#failures-and-retries).                                |
| The deployment is `READY`, but dynamic routes fail                                                   | The invocation role can't invoke the functions, or the account credentials are **Expired**  | Check the invocation role's permissions policy and the account status in [Connect AWS Account](/docs/networking/bring-your-own-cloud/connect-aws-account). |

## Next steps

- [Deploy from GitHub Actions](/docs/networking/bring-your-own-cloud/deploy-with-github-actions) to start BYOC deployments from Git pushes
- [Operate BYOC deployments](/docs/networking/bring-your-own-cloud/operations), including retries and cleanup
- [Review the BYOC provisioning reference](/docs/networking/bring-your-own-cloud/provisioning-reference)


---

[View full sitemap](/docs/sitemap)
