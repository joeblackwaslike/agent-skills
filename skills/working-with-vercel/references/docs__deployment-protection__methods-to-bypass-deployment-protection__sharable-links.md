---
title: Sharable Links
product: vercel
url: /docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links
canonical_url: "https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links"
last_updated: 2026-04-30
type: how-to
prerequisites:
  - /docs/deployment-protection/methods-to-bypass-deployment-protection
  - /docs/deployment-protection
related:
  - /docs/comments
  - /docs/rbac/access-roles
  - /docs/deployments/sharing-deployments
summary: Learn how to share your deployments with external users.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "2a6dc532852ecb6c0d9234e3bafa9f87ebc676cc422e4c267a214da52d86baec"
---

# Sharable Links

> **🔒 Permissions Required**: Shareable Links


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments?from=related) — Protect who can see your deployments.
- [Generated URLs](https://vercel.com/docs/deployments/generated-urls?from=related) — When you create a new deployment, Vercel will automatically generate a unique URL which you can use to access that parti
- [Protect Deployments](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments?from=related) — Vercel offers several methods to protect your deployments: Vercel Authentication, Passport, Password Protection, and Tru
- [Shared Environment Variables](https://vercel.com/docs/environment-variables/shared-environment-variables?from=related) — Learn how to use Shared environment variables, which are environment variables that you define at the Team level and can
- [Restrict access to deployments with Vercel Authentication](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication?from=related) — Vercel Authentication restricts access to your deployments so only authorized users can view and comment on your site.
- [Deployments](https://vercel.com/docs/deployments?from=related) — Learn how to create and manage deployments on Vercel.

Full cross-link map for this page: [/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links.graph.md](/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links.graph.md)
<!-- /docsgraph:related -->

Shareable links allow external users to securely access your deployments through a query string parameter.
Shareable links include the ability to leave [Comments](/docs/comments) on deployments which have them enabled.

## Who can create Shareable Links?

- Non-Production Domains:
  - [Team members](/docs/rbac/access-roles#team-level-roles) with at least the [Developer](/docs/rbac/access-roles#developer-role) role
  - [Project members](/docs/rbac/access-roles#project-level-roles) with at least the [Project Developer](/docs/rbac/access-roles#project-developer) role
- Production Domains:
  - [Team members](/docs/rbac/access-roles#team-level-roles) with at least the [Member](/docs/rbac/access-roles#member-role) role
  - [Project members](/docs/rbac/access-roles#project-level-roles) with the [Project Administrator](/docs/rbac/access-roles#project-administrators) role

## Creating Sharable Links

Users with the Admin, Member, and Developer roles can create or revoke sharable links for their project's deployments. Personal accounts can also manage sharable links for their Hobby deployments.

> **💡 Note:** Developers on the hobby plan can only create one shareable link in total per
> account.

To manage Sharable Links, do the following:

- ### Select your project
  From your Vercel [dashboard](/dashboard):
  1. Select the project that you wish to enable Vercel Authentication for
  2. Open **Deployments** in the sidebar

- ### Select the deployment
  From the list of **Preview Deployments**, select the deployment you wish to share.

- ### Click Share button
  From the Deployment page, click **Share** to display the **Share** popover. From the popover, select **Anyone with the link** from the dropdown.

  ![Image](`/docs-assets/static/docs/concepts/deployments/shareable-links-light.png`)

- ### Revoking a Sharable Link
  To revoke access for users, switch the dropdown option to **Only people with access**.

  If you have also [shared the deployment](/docs/deployments/sharing-deployments) with individual users, you will need to remove them from the **Share** popover.

## Managing Shareable Links

You can view and manage all the existing Shareable Links for your team in the following way

1. From your [dashboard](/dashboard), go to [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings) in the sidebar
2. Choose the **Access** section in the sidebar
3. Click the **All Access** button and select **Shareable Links**

![Image](`/docs-assets/static/docs/concepts/deployments/preview-deployments/shareable-links-list.png`)


---

[View full sitemap](/docs/sitemap)
