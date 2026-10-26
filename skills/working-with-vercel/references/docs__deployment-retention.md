---
title: Deployment Retention
product: vercel
url: /docs/deployment-retention
canonical_url: "https://vercel.com/docs/deployment-retention"
last_updated: 2026-09-16
type: conceptual
prerequisites:
  []
related:
  - /docs/deployment-storage
  - /docs/cli/list
  - /docs/domains/working-with-domains/assign-domain-to-a-git-branch
  - /docs/deployments/environments
  - /docs/errors/deployment_deleted
summary: "Learn how Deployment Retention policies affect a deployment's lifecycle"
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-retention.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "15769280805bfc43195cb4ad1972b7e1b390cfe321c7f5c459ec03865502ec1d"
---

# Deployment Retention

> Deployment Retention is available on all plans

Deployment retention refers to the configured policies that determine how long different types of deployments are kept before they are automatically deleted.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I delete an individual deployment?](https://vercel.com/kb/guide/how-do-i-delete-an-individual-deployment) — Information on deleting an individual deployment.
- [Deployment retention policies now preserve active branch deployments](https://vercel.com/changelog/deployment-retention-policies-now-preserve-active-branch-deployments)
- [Deployment Storage keeps your deployments rollback-ready](https://vercel.com/changelog/deployment-storage-keeps-your-deployments-rollback-ready)
- [Deployment Storage billing begins for existing Pro teams](https://vercel.com/changelog/deployment-storage-pricing-expands-to-existing-teams)
- [Hobby projects now default to 30-day deployment retention](https://vercel.com/changelog/hobby-projects-now-default-to-30-day-deployment-retention)
- [Hobby projects now retain fewer deployments to free up storage](https://vercel.com/changelog/hobby-projects-now-retain-fewer-deployments-to-free-up-storage)
- [Optimize Deployment Storage](https://vercel.com/docs/deployment-storage/optimize) — Set retention periods, review remaining usage, and reduce deployment output size.
- [Managing Deployments](https://vercel.com/docs/deployments/managing-deployments) — Learn how to manage your current and previously deployed projects to Vercel through the dashboard. You can redeploy at a
- [Deployment Policies](https://vercel.com/docs/deployments/deployment-policy) — Use a deployment policy to control which Git sources and deployment mechanisms can deploy to your team and projects, per
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Operating BYOC Deployments](https://vercel.com/docs/networking/bring-your-own-cloud/operations) — Retry failed Bring Your Own Cloud \\(BYOC\\) deployments, clean up AWS resources, monitor logs, and rotate credentials.

Full cross-link map for this page: [/docs/deployment-retention.graph.md](/docs/deployment-retention.graph.md)
<!-- /docsgraph:related -->

These configured retention policies allow you to control how long your deployment data is stored, providing:

- **Enhanced protection:** Remove outdated deployments with potential vulnerabilities or sensitive data
- **Compliance support:** Configure retention policies to align with your compliance requirements.
- **Efficient storage management:** Automatically clear out unnecessary deployments

Your retention policy determines when deployments become eligible for automatic deletion. Retained deployment output contributes to [Deployment Storage](/docs/deployment-storage) while Vercel stores it.

Unless a team or project uses a custom policy, the default retention periods are:

| Plan | Canceled | Errored | Pre-Production | Production |
| --- | --- | --- | --- | --- |
| Hobby | 30 days | 30 days | 30 days | 30 days |
| Pro and Enterprise | 30 days | 90 days | 180 days | 1 year |

A team policy can replace these defaults for new projects or all existing projects. A project policy applies only to that project and replaces the team default.

You can configure retention durations for the following deployment states:

- Canceled deployments
- Errored deployments
- Preview deployments
- Production deployments

For example, imagine you created a production deployment with a 60-day retention period on 01/01/2024 and later replaced it with a newer deployment. The origin deployment would expire on 03/01/2024, entering the recovery period, and users accessing it would see a 410 status code. If required, you could still restore it until 03/31/2024, when all associated resources are permanently removed and restoring the deployment is no longer possible.

After a deployment reaches its configured retention limit, a background job typically marks it for deletion within 48 hours. If a deployment is protected by one of the [exceptions to the retention policy](/docs/deployment-retention#exceptions-to-the-retention-policy) when it's first evaluated, it won't be deleted at that time. Once the exception no longer applies (for example, when a production alias moves to a newer deployment), the background job re-evaluates the deployment. This re-evaluation can take up to 30 days.

## Setting a deployment retention policy

To configure a retention policy, open **Settings** in the sidebar of your project and follow these steps:

1. Select **Security** on the side panel of the project settings page
2. Scroll down to the **Deployment Retention Policy** section
3. Select the drop down menu with the appropriate duration
4. Save the new retention policy for your project

### Viewing deployment retention policy

You can view your deployments retention policy using [Vercel CLI](/docs/cli/list) and running the following command from your terminal:

```bash filename="terminal"
vercel list [project-name] [--policy errored=6m]
```

### Exceptions to the retention policy

Deployments older than the configured retention interval are not always deleted. Vercel keeps a deployment while any of the following is true.

These recent deployment exceptions depend on your plan:

| Exception | Hobby | Pro and Enterprise |
| --- | --- | --- |
| Last deployments created in the project | Last 3 | Last 10 |
| Production deployments in state Ready | Last 3 | Last 20 |
| Non-production deployments in state Ready | Not applied | Last 20 |

These exceptions apply on every plan:

- The deployment has a production alias assigned to it.
- The deployment is the target of a [branch alias](/docs/domains/working-with-domains/assign-domain-to-a-git-branch) for a [custom environment](/docs/deployments/environments#custom-environments).
- The deployment is a non-production deployment and has any custom alias assigned to it.
- The deployment is the latest preview deployment for a Git branch that is still active. A branch is considered active when it has not been deleted and its associated pull request has not been merged or closed.

## Restoring a deleted deployment

When a deployment is marked for deletion either accidentally or as part of the retention policy, you can restore it within the recovery period. This period is 30 days for successfully built deployments, but unsuccessful deployments may be garbage collected sooner.

To restore a deleted deployment, open **Settings** in the sidebar of your project:

1. Select **Security** on the side panel of the project settings page
2. Scroll down to the **Recently Deleted** section
3. Find the deployment that needs to be restored, and click on the dropdown menu item **Restore**
4. Complete the modal

## More resources

- [View Deployment Retention Policies](/docs/cli/list#unique-options)
- [Troubleshoot Deployment Retention Errors](/docs/errors/deployment_deleted)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
