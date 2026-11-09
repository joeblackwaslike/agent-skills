---
title: OPTIONS Allowlist
product: vercel
url: /docs/deployment-protection/methods-to-bypass-deployment-protection/options-allowlist
canonical_url: "https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/options-allowlist"
last_updated: 2026-08-28
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
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "b271baf64004f645bbefa5ae10b931fe69e5ef5b83d3c34e9ee995ff8a4ada68"
---

# OPTIONS Allowlist

> OPTIONS Allowlist is available on all plans

You can use OPTIONS Allowlist to disable [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) and [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection) on any incoming CORS preflight `OPTIONS` request for a list of paths.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to enable CORS on Vercel](https://vercel.com/kb/guide/how-to-enable-cors) — Learn how to enable CORS on Vercel with vercel.json, Routing Middleware, framework config, and route handlers, plus how
- [OPTIONS Allowlist](https://vercel.com/changelog/options-allowlist)
- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments) — Protect who can see your deployments.
- [Methods to Protect Deployments](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments) — Vercel offers several methods to protect your deployments: Vercel Authentication, Passport, Password Protection, and Tru
- [Deployment Protection Exceptions](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/deployment-protection-exceptions) — Disable Deployment Protection for a list of preview domains.
- [Access Control](https://vercel.com/docs/security/access-control) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Security settings](https://vercel.com/docs/project-configuration/security-settings) — Configure security settings for your Vercel project, including Vercel Support Code Visibility, Git Fork Protection, and

Full cross-link map for this page: [/docs/deployment-protection/methods-to-bypass-deployment-protection/options-allowlist.graph.md](/docs/deployment-protection/methods-to-bypass-deployment-protection/options-allowlist.graph.md)
<!-- /docsgraph:related -->

OPTIONS Allowlist does not bypass [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips). When a deployment requires a Trusted IP address, a preflight request from an IP address that is not on your Trusted IPs list still receives a `404` response, even for a path on the allowlist.

When you add a path to OPTIONS Allowlist, any incoming request with the method `OPTIONS` that **starts with** the path will no longer be covered by Vercel Authentication or Password Protection. When you remove a path from OPTIONS Allowlist, the path becomes protected again with the project's Deployment Protection settings.

For example, if you specify `/api`, all requests to paths that start with `/api` (such as `/api/v1/users` and `/api/v2/projects`) will skip Vercel Authentication and Password Protection for any `OPTIONS` request.

![OPTIONS Allowlist.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/security/options-allowlist-light.png)

## Enabling OPTIONS Allowlist

- ### Go to Project Deployment Protection Settings
  From your Vercel [dashboard](/dashboard):
  1. Select the project that you wish to enable OPTIONS Allowlist for
  2. Go to [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings) in the sidebar

- ### Enable OPTIONS Allowlist
  From the **OPTIONS Allowlist** section, enable the **Allow OPTIONS Requests** toggle:

  ![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/security/options-allowlist-disabled-light.png)

- ### Specify a path
  Specify a path to add to the **OPTIONS Allowlist**:

  ![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/security/options-allowlist-add-path-light.png)

- ### Add more paths
  To add more paths, select **Add path**:

  ![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/security/options-allowlist-add-another-path-light.png)

- ### Save changes
  Once all the paths are added, select **Save**

## Disabling OPTIONS Allowlist

- ### Go to Project Deployment Protection Settings
  From your Vercel [dashboard](/dashboard):
  1. Select the project that you wish to disable OPTIONS Allowlist for
  2. Go to [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings) in the sidebar

- ### Disable OPTIONS Allowlist
  From the **OPTIONS Allowlist** section, disable the **Allow OPTIONS Requests** toggle:

  ![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/security/options-allowlist-light.png)

- ### Save changes
  Select **Save**


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
