---
title: OPTIONS Allowlist
product: vercel
url: /docs/deployment-protection/methods-to-bypass-deployment-protection/options-allowlist
canonical_url: "https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/options-allowlist"
last_updated: 2026-04-30
type: how-to
prerequisites:
  - /docs/deployment-protection/methods-to-bypass-deployment-protection
  - /docs/deployment-protection
related:
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
  - /docs/deployment-protection/methods-to-protect-deployments/password-protection
  - /docs/deployment-protection/methods-to-protect-deployments/trusted-ips
summary: Learn how to disable Deployment Protection for CORS preflight requests for a list of paths.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/options-allowlist.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "10927967a83443c2707255d96ea6a7b142c031ef64a4889389bfe62aa2a5116b"
---

# OPTIONS Allowlist

> **🔒 Permissions Required**: OPTIONS Allowlist


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I add password protection to my Vercel deployment?](https://vercel.com/kb/guide/how-do-i-add-password-protection-to-my-vercel-deployment?from=related) — Enable Password Protection on a Vercel deployment, configure automation and CORS bypasses, and verify the gate before yo
- [How can I enable CORS on Vercel?](https://vercel.com/kb/guide/how-to-enable-cors?from=related) — Learn how to add CORS headers to your application on Vercel.
- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments?from=related) — Protect who can see your deployments.
- [Protect Deployments](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments?from=related) — Vercel offers several methods to protect your deployments: Vercel Authentication, Passport, Password Protection, and Tru
- [Exceptions](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/deployment-protection-exceptions?from=related) — Disable Deployment Protection for a list of preview domains.
- [Security settings](https://vercel.com/docs/project-configuration/security-settings?from=related) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Access Control](https://vercel.com/docs/security/access-control?from=related) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Security](https://vercel.com/docs/microfrontends/managing-microfrontends/security?from=related) — Learn about security on Vercel.

Full cross-link map for this page: [/docs/deployment-protection/methods-to-bypass-deployment-protection/options-allowlist.graph.md](/docs/deployment-protection/methods-to-bypass-deployment-protection/options-allowlist.graph.md)
<!-- /docsgraph:related -->

You can use OPTIONS Allowlist to disable Deployment Protection (including [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication), [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection), and [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips)) on any incoming CORS preflight `OPTIONS` request for a list of paths.

When you add a path to OPTIONS Allowlist, any incoming request with the method `OPTIONS` that **starts with** the path will no longer be covered by Deployment Protection. When you remove a path from OPTIONS Allowlist, the path becomes protected again with the project's Deployment Protection settings.

For example, if you specify `/api`, all requests to paths that start with `/api` (such as `/api/v1/users` and `/api/v2/projects`) will be unprotected for any `OPTIONS` request.

![Image](https://vercel.com/front/docs/security/options-allowlist-light.png)

## Enabling OPTIONS Allowlist

- ### Go to Project Deployment Protection Settings
  From your Vercel [dashboard](/dashboard):
  1. Select the project that you wish to enable Password Protection for
  2. Go to [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings) in the sidebar

- ### Enable OPTIONS Allowlist
  From the **OPTIONS Allowlist** section, enable the toggle labelled **Disabled**:

  ![Image](https://vercel.com/front/docs/security/options-allowlist-disabled-light.png)

- ### Specify a path
  Specify a path to add to the **OPTIONS Allowlist**:

  ![Image](https://vercel.com/front/docs/security/options-allowlist-add-path-light.png)

- ### Add more paths
  To add more paths, select **Add path**:

  ![Image](https://vercel.com/front/docs/security/options-allowlist-add-another-path-light.png)

- ### Save changes
  Once all the paths are added, select **Save**

## Disabling OPTIONS Allowlist

- ### Go to Project Deployment Protection Settings
  From your Vercel [dashboard](/dashboard):
  1. Select the project that you wish to enable Password Protection for
  2. Go to [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings) in the sidebar

- ### Disable OPTIONS Allowlist
  From the **OPTIONS Allowlist** section, select the toggle labelled **Enabled**:

  ![Image](https://vercel.com/front/docs/security/options-allowlist-light.png)

- ### Save changes
  Once all the paths are added, select **Save**


---

[View full sitemap](/docs/sitemap)
