---
title: Operating BYOC Deployments
product: vercel
url: /docs/networking/bring-your-own-cloud/operations
canonical_url: "https://vercel.com/docs/networking/bring-your-own-cloud/operations"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/networking/bring-your-own-cloud
  - /docs/networking
related:
  - /docs/networking/bring-your-own-cloud
  - /docs/instant-rollback
  - /docs/webhooks/webhooks-api
  - /docs/networking/bring-your-own-cloud/connect-aws-account
  - /docs/networking/bring-your-own-cloud/deploy-with-github-actions
summary: Retry failed Bring Your Own Cloud (BYOC) deployments, clean up AWS resources, monitor logs, and rotate credentials.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/networking/bring-your-own-cloud/operations.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "307ea279753086babd2085bbac46e1b8b797627ad8c7ece7754ec9716eb0b3cb"
---

# Operating BYOC Deployments

> **Availability**: Bring Your Own Cloud is available on Enterprise plans and is set up through your Vercel account team. Contact your account team to request access.

With [Bring Your Own Cloud (BYOC)](/docs/networking/bring-your-own-cloud), your team operates the AWS side of every deployment. Retry or abandon failed deployments, clean up AWS resources you no longer need, and monitor the functions and credentials your deployments depend on.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Bring Your Own Cloud](https://vercel.com/kb/guide/byoc) — Use Bring Your Own Cloud \\(BYOC\\) to run Vercel Functions as AWS Lambda functions in your own AWS account, from setup to
- [How to debug 404 errors](https://vercel.com/kb/guide/how-to-debug-404-errors) — Learn the systematic steps to identify and resolve 404 issues.
- [Bring Your Own Cloud on AWS is now generally available](https://vercel.com/changelog/bring-your-own-cloud-on-aws-is-now-generally-available)
- [Implementing Canary Deployments on Vercel](https://vercel.com/kb/guide/implementing_canary_deployments_on_vercel) — This guide explains how to set up canary deployments on Vercel, enabling developers to gradually roll out new versions t
- [Managing Deployments](https://vercel.com/docs/deployments/managing-deployments) — Learn how to manage your current and previously deployed projects to Vercel through the dashboard. You can redeploy at a
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Deployment Retention](https://vercel.com/docs/deployment-retention) — Learn how Deployment Retention policies affect a deployment's lifecycle
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.

Full cross-link map for this page: [/docs/networking/bring-your-own-cloud/operations.graph.md](/docs/networking/bring-your-own-cloud/operations.graph.md)
<!-- /docsgraph:related -->

## Failures and retries

When a BYOC deployment fails, check the deployment status in Vercel with `vercel inspect <deployment-id>`, and the output of the failed CLI command or CI job. The right next step depends on the deployment's state:

| Deployment state                                                     | What to do                                                                                                                                                         |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Still waiting for provisioning, within 15 minutes of initialization | Fix the cause, then retry with the same deployment ID, generated files, and resource inventory. Reuse the functions and layers you already created when they match. |
| Failed, canceled, or timed out                                       | Start a new deployment with `vercel deploy init`, or redeploy through Vercel. The new deployment gets a new ID. Keep the old inventory for cleanup.                |
| `READY`                                                              | Don't provision it again. Test the deployment, or create a new deployment for any changes.                                                                         |

To change code in a deployment that's still waiting for provisioning, rebuild and run `vercel deploy describe` again with the same deployment ID, then provision from the new descriptor. After `vercel deploy continue` succeeds, create a new deployment for further changes.

A deployment that waits longer than 15 minutes fails with the error `Provisioning exceeded the maximum allowed time.` and its `manualProvisioning.state` becomes `TIMEOUT`.

### Abandon a pending deployment

To stop a deployment that's still waiting for provisioning, mark it as failed with a reason:

```bash filename="Terminal"
vercel deploy continue --id "<DEPLOYMENT_ID>" --error "Initialized with the wrong target"
```

**Result**: The CLI prints `Marked deployment <DEPLOYMENT_ID> as errored`, and the deployment shows as failed in Vercel.

Failed and abandoned deployments can leave functions and layers in your AWS account. Add them to your cleanup process.

### Keep one worker per deployment

Run only one build and provisioning worker per deployment ID at a time. Two workers provisioning the same deployment can conflict on function creation. Persist the deployment ID, generated files, and resource inventory so a retry can pick up where the failed attempt stopped.

## Cleanup and retention

Deleting a deployment in Vercel doesn't delete its Lambda functions or layers in your AWS account. Your team decides when to remove them.

### Keep an inventory of AWS resources

Record the ARNs of the functions and layer versions created for each deployment, and store the inventory somewhere durable. The script generated by the [BYOC agent skill](https://github.com/vercel-labs/vercel-byoc) writes this inventory to `.vercel/<deployment-id>/provisioned.json`, marking which resources it created and which it reused.

Keep the resources for every deployment you still serve, including deployments you may [roll back](/docs/instant-rollback) to.

### Remove resources you no longer need

Use the inventory to delete only the resources created for deployments you no longer need:

1. Delete the functions that the inventory marks as created for that deployment.
2. Delete a layer version only after confirming that no remaining function uses it. Layers can be shared between deployments.
3. Keep the AWS account registration and the invocation role. Other deployments depend on them.

### Automate cleanup with the `deployment.cleanup` webhook

Vercel sends the [`deployment.cleanup`](/docs/webhooks/webhooks-api) webhook when it permanently deletes a deployment, after the 30-day recovery period ends. The webhook doesn't fire when a deployment is first marked for deletion.

To automate cleanup, build a handler that receives the webhook, looks up the deployment ID in your inventory, and deletes that deployment's resources. Treat cleanup as manual until you've configured and tested the handler.

## Logs and monitoring

BYOC spreads operational signals across Vercel, your CI system, and AWS:

| Signal                               | Where to find it                                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Deployment status and build errors   | Vercel dashboard, `vercel inspect`, or the REST API                                                            |
| Build and provisioning job failures  | Your CI system, such as GitHub Actions                                                                        |
| Function logs and errors             | Vercel, as for any other deployment. Your functions also write to Amazon CloudWatch Logs, in the log group `/aws/lambda/<function-name>` in each function's region |
| Account credential status            | The **Vercel Private Cloud** section of your team's **Networking** settings                                   |

Assign an owner to monitor failed deployments, account credential status, and application health. Confirm with your Vercel account team which credential alerts are available for your team, and add your own monitoring for anything else you need, such as Amazon CloudWatch alarms on function errors and throttles.

## Rotating credentials

Rotate each credential type in the place it's stored:

- **Invocation role**: Vercel refreshes its credentials for the invocation role automatically. Keep the role's trust policy, permissions policy, `VercelFunction` tag, and 12-hour maximum session duration in place. If the account shows **Expired**, fix the role and select **Refresh Credentials**. See [Connecting an AWS account for BYOC](/docs/networking/bring-your-own-cloud/connect-aws-account#account-statuses).
- **GitHub App keys and webhook secrets**: If you [deploy from GitHub Actions](/docs/networking/bring-your-own-cloud/deploy-with-github-actions), update the key or secret in GitHub or Vercel and in the relay's stored secret together. Reload the relay and verify a deployment end to end before you retire the old credential.
- **OIDC credentials**: GitHub Actions obtains short-lived credentials for Vercel and AWS through OIDC on each run, so there are no long-lived keys to rotate.

## Related

- [Deploying with BYOC using the Vercel CLI](/docs/networking/bring-your-own-cloud/deploy-with-cli)
- [BYOC provisioning reference](/docs/networking/bring-your-own-cloud/provisioning-reference)
- [Webhooks API reference](/docs/webhooks/webhooks-api)


---

[View full sitemap](/docs/sitemap)
