---
title: Deployment Protection Exceptions
product: vercel
url: /docs/deployment-protection/methods-to-bypass-deployment-protection/deployment-protection-exceptions
canonical_url: "https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/deployment-protection-exceptions"
last_updated: 2026-08-21
type: how-to
prerequisites:
  - /docs/deployment-protection/methods-to-bypass-deployment-protection
  - /docs/deployment-protection
related:
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
  - /docs/deployment-protection/methods-to-protect-deployments/password-protection
  - /docs/deployment-protection/methods-to-protect-deployments/trusted-ips
  - /docs/deployment-protection
summary: Disable Deployment Protection for a list of preview domains.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/deployment-protection-exceptions.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "fbdee98913fdd9dd7e38a9c8c4e2f8310cf4c857be4d2f4aec8c56e77b1f9147"
---

# Deployment Protection Exceptions

> **🔒 Permissions Required**: Deployment Protection Exceptions


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Slack](https://eve.dev/docs/channels/slack?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fmethods-to-bypass-deployment-protection%2Fdeployment-protection-exceptions&source_site=vercel-docs&relationship=related) — Reach your agent from Slack app mentions, DMs, slash commands, and interactive callbacks.
- [React2Shell Security Bulletin](https://vercel.com/blog/resources-for-protecting-against-react2shell?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fmethods-to-bypass-deployment-protection%2Fdeployment-protection-exceptions&source_site=vercel-docs&relationship=related)
- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fmethods-to-bypass-deployment-protection%2Fdeployment-protection-exceptions&source_site=vercel-docs&relationship=related) — Protect who can see your deployments.
- [Deployment Protection: Added security controls now available on all plans](https://vercel.com/blog/protecting-deployments?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fmethods-to-bypass-deployment-protection%2Fdeployment-protection-exceptions&source_site=vercel-docs&relationship=related)
- [Protecting Deployments](https://vercel.com/blog/security-controls-protected-preview-deployments-passwords?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fmethods-to-bypass-deployment-protection%2Fdeployment-protection-exceptions&source_site=vercel-docs&relationship=related)
- [Methods to Protect Deployments](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fmethods-to-bypass-deployment-protection%2Fdeployment-protection-exceptions&source_site=vercel-docs&relationship=related) — Vercel offers several methods to protect your deployments: Vercel Authentication, Passport, Password Protection, and Tru
- [Access Control](https://vercel.com/docs/security/access-control?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fmethods-to-bypass-deployment-protection%2Fdeployment-protection-exceptions&source_site=vercel-docs&relationship=related) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Preview Deployment Suffix](https://vercel.com/docs/deployments/preview-deployment-suffix?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fmethods-to-bypass-deployment-protection%2Fdeployment-protection-exceptions&source_site=vercel-docs&relationship=related) — When you create a new deployment, Vercel will automatically generate a unique URL which you can use to access that parti
- [Security settings](https://vercel.com/docs/project-configuration/security-settings?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fmethods-to-bypass-deployment-protection%2Fdeployment-protection-exceptions&source_site=vercel-docs&relationship=related) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fmethods-to-bypass-deployment-protection%2Fdeployment-protection-exceptions&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/deployment-protection/methods-to-bypass-deployment-protection/deployment-protection-exceptions.graph.md](/docs/deployment-protection/methods-to-bypass-deployment-protection/deployment-protection-exceptions.graph.md?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fmethods-to-bypass-deployment-protection%2Fdeployment-protection-exceptions&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Deployment Protection Exceptions let you disable Deployment Protection (including [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication), [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection), and [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips)) for a list of preview domains.

When you add a domain to Deployment Protection Exceptions, it becomes publicly accessible and is no longer covered by Deployment Protection features. When you remove a domain from Deployment Protection Exceptions, the domain becomes protected again with the project's Deployment Protection settings.

![Image](https://vercel.com/front/docs/security/deployment-exception-light.png)

Deployment Protection Exceptions is designed for Preview Deployment domains. If you wish to make a Production Deployment domain public, see [Only Production Deployments](/docs/deployment-protection#only-production-deployments).

## Adding a Deployment Protection Exception

- ### Go to project Deployment Protection settings
  From your Vercel [dashboard](/dashboard):
  1. Select the project that you wish to add an exception for
  2. Go to [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings) in the sidebar

- ### Select Add Domain in the Deployment Protection Exceptions section
  From the **Deployment Protection Exceptions** section, select **Add Domain**:

  ![Image](https://vercel.com/front/docs/security/deployment-exception-no-domain-light.png)

- ### Specify the domain to unprotect
  From the **Unprotect Domain** modal:
  1. Enter the domain that you wish to unprotect in the input
  2. Select **Continue**
  ![Image](https://vercel.com/front/docs/security/deployment-protection-exceptions-add-domain-light.png)

- ### Confirm the domain to unprotect
  From the **Unprotect Domain** modal:
  1. Confirm the domain by entering it again in the first input
  2. Enter `unprotect my domain` in the second input
  3. Select **Confirm**
  All your existing and future deployments for that domain will be **unprotected**.

  ![Image](https://vercel.com/front/docs/security/deployment-protection-exceptions-confirm-add-light.png)

## Removing a Deployment Protection Exception

- ### Go to project Deployment Protection settings
  From your Vercel [dashboard](/dashboard):
  1. Select the project that you wish to remove an exception for
  2. Go to [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings) in the sidebar

- ### Select the domain to remove
  From the **Deployment Protection Exceptions** section:
  1. Find the domain row in the **Unprotected Domains** section
  2. Select the dot menu at the end of the row
  3. From the context menu, select **Remove**
  ![Image](https://vercel.com/front/docs/security/remove-deployment-exception-light.png)

- ### Confirm the domain to remove
  From the **Reprotect Domain** modal:
  1. Enter the domain in the first input
  2. Enter `reprotect my domain` in the second input
  3. Select **Confirm**
  All your existing and future deployments for that domain will be **protected**.

  ![Image](https://vercel.com/front/docs/security/deployment-protection-exceptions-remove-light.png)

## Managing Deployment Protection Exceptions

You can view and manage all the existing Deployment Protection Exceptions for your team in the following way:

1. From your [dashboard](/dashboard), go to [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings) in the sidebar
2. Select the **Access** section in the sidebar
3. Select the **All Access** button and choose `Unprotected Previews`

![Image](`/docs-assets/static/docs/concepts/deployments/preview-deployments/deployment-protection-exceptions-list.png`)


---

[View full sitemap](/docs/sitemap)
