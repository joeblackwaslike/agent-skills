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
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "c93c39a2e8c656417140a85c579fcf4a54c901fd19402174bbdee97251dabb47"
---

# Deployment Retention

> Deployment Retention is available on all plans

Deployment retention refers to the configured policies that determine how long different types of deployments are kept before they are automatically deleted.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I delete an individual deployment?](https://vercel.com/kb/guide/how-do-i-delete-an-individual-deployment) — Information on deleting an individual deployment.
- [Deleted deployments are permanently removed sooner](https://vercel.com/changelog/deleted-deployments-are-permanently-removed-sooner)
- [Deployment retention policies now preserve active branch deployments](https://vercel.com/changelog/deployment-retention-policies-now-preserve-active-branch-deployments)
- [Deployment Storage keeps your deployments rollback-ready](https://vercel.com/changelog/deployment-storage-keeps-your-deployments-rollback-ready)
- [Deployment Storage billing begins for existing Pro teams](https://vercel.com/changelog/deployment-storage-pricing-expands-to-existing-teams)
- [Hobby projects now default to 30-day deployment retention](https://vercel.com/changelog/hobby-projects-now-default-to-30-day-deployment-retention)
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
| Hobby and Pro | 30 days | 30 days | 30 days | 30 days |
| Enterprise | 30 days | 90 days | 180 days | 1 year |

A team policy can replace these defaults for new projects or all existing projects. A project policy applies only to that project and replaces the team default.

You can configure retention durations for the following deployment states:

- Canceled deployments
- Errored deployments
- Preview deployments
- Production deployments

For example, imagine you created a production deployment with a 60-day retention period on 01/01/2024 and later replaced it with a newer deployment. The origin deployment would expire on 03/01/2024, entering the recovery period, and users accessing it would see a 410 status code. If required, you could still restore it until 03/31/2024, when all associated resources are permanently removed and restoring the deployment is no longer possible.

After a deployment reaches its configured retention limit, a background job typically marks it for deletion within 48 hours. If a deployment is protected by one of the [exceptions to the retention policy](/docs/deployment-retention#exceptions-to-the-retention-policy) when it's first evaluated, it won't be deleted at that time. Once the exception no longer applies (for example, when a production alias moves to a newer deployment), the background job re-evaluates the deployment. This re-evaluation can take up to 30 days.

## Setting a deployment retention policy

To set a team policy, open the team's Settings page, select Build and Deployment, and find Deployment Retention Policy. You can apply the policy to new projects or all existing projects.

To set a policy for one project, open Settings in the sidebar of your project and follow these steps:

1. Select Build and Deployment on the side panel of the project settings page
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

When a deployment is deleted, either manually or as part of the retention policy, it enters a recovery period during which you can restore it. After the recovery period ends, Vercel garbage collects the deployment and permanently deletes it.

The length of the recovery period depends on how old the deployment is when it is deleted:

- **Deleted at 30 days of age or older:** The recovery period is 30 days from deletion. This includes any deployment under a retention policy of 30 days or more.
- **Deleted before reaching 30 days of age:** The recovery period is shorter. For a deployment deleted by a retention policy set to less than 30 days, the recovery period matches the retention policy, so a 7-day retention policy results in a 7-day recovery period. For a deployment deleted manually, the recovery period is determined by the deployment's age at deletion, down to a minimum of 1 day.

This matches the recovery period to the deployment's age, so short retention policies do not leave large numbers of old deployments on the **Recently Deleted** page.

These recovery periods apply to successfully built deployments. Unsuccessful deployments may be garbage collected sooner.

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
