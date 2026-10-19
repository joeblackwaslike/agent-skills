---
title: Restrict access to deployments with Vercel Authentication
product: vercel
url: /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
canonical_url: "https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication"
last_updated: 2026-09-15
type: how-to
prerequisites:
  - /docs/deployment-protection/methods-to-protect-deployments
  - /docs/deployment-protection
related:
  - /docs/rbac/access-roles
  - /docs/rbac/access-groups
  - /docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links
  - /docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
  - /docs/comments
summary: Vercel Authentication restricts access to your deployments so only authorized users can view and comment on your site.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "2e7d2c286aa18bf262b617881e4acb0a35deb6ad226e5569e035486fd36d164f"
---

# Restrict access to deployments with Vercel Authentication

> **Availability**: Vercel Authentication is available on all plans

Vercel Authentication lets you restrict access to your public and non-public deployments. It is the **recommended** approach to protecting your deployments. When enabled, it allows only users with deployment access to view and comment on your site.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agents can now access protected deployments via Vercel’s MCP server](https://vercel.com/changelog/give-agents-access-to-protected-deployments-via-vercels-mcp-server)
- [Protect production deployments for free on every plan](https://vercel.com/changelog/protect-production-deployments-for-free-on-every-plan)
- [Protected Source Maps: Ship browser source maps securely](https://vercel.com/changelog/protected-source-maps-ship-browser-source-maps-securely)
- [How to enable CORS on Vercel](https://vercel.com/kb/guide/how-to-enable-cors) — Learn how to enable CORS on Vercel with vercel.json, Routing Middleware, framework config, and route handlers, plus how
- [Choose between Vercel Passport and other Deployment Protection methods](https://vercel.com/kb/guide/vercel-passport-vs-deployment-protection) — Compare Vercel Passport with Vercel Authentication, Password Protection, and Trusted IPs to choose the right Deployment
- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel vs Fastly](https://vercel.com/kb/guide/vercel-vs-fastly) — A detailed guide to Vercel vs Fastly: full-stack application platform vs CDN infrastructure layer, covering framework su
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [\<script type="text/llms.txt"\>](https://vercel.com/blog/a-proposal-for-inline-llm-instructions-in-html)
- [Access Control](https://vercel.com/docs/security/access-control) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Security settings](https://vercel.com/docs/project-configuration/security-settings) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Automated & Agent Access](https://vercel.com/docs/deployment-protection/automated-agent-access) — Grant AI agents, CI/CD pipelines, MCP servers, and testing tools access to Vercel deployments that have Deployment Prote

Full cross-link map for this page: [/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication.graph.md](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication.graph.md)
<!-- /docsgraph:related -->

Users attempting to access the deployment will encounter a Vercel login redirect. If already logged into Vercel, Vercel will authenticate them automatically.

After login, Vercel redirects the user and sets a cookie in the browser if they have view access. If the user does not have access to view the deployment, Vercel redirects them to [request access](#access-requests).

## Who can access protected deployments?

- Logged in [team members](/docs/rbac/access-roles#team-level-roles) with at least a viewer role ([Viewer Pro](/docs/rbac/access-roles#pro-viewer-role) or [Viewer Enterprise](/docs/rbac/access-roles#enterprise-viewer-role))
- Logged in [project members](/docs/rbac/access-roles#project-level-roles) with at least the [project Viewer](/docs/rbac/access-roles#project-viewer) role
- Logged in members of an [access group](/docs/rbac/access-groups) that has access to the project the deployment belongs to
- Logged in Vercel users who have been [granted access](#access-requests)
- Anyone who has been given a [Shareable Link](/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links) to the deployment
- Tools using the [protection bypass for automation](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) header

## Access requests

> **Availability**: Access requests are available on all plans

When a Vercel user visits your protected deployment, but they do not have permission to access it, they have the option to request access for their Vercel account.
This request triggers an email and Vercel notification to the branch authors.

![External users can request access to protected deployments.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/deployments/preview-deployments/request-access.png)

The access request can be approved or declined. Additionally, granted access can be revoked for a user at any time.

Users granted access can view the latest deployment from a specific branch when logged in with their Vercel account.
They can also leave preview [Comments](/docs/comments) if these are enabled on your team.

Those on the Hobby plan can only have one external user per account. If you need more, you can upgrade to a [Pro plan](/docs/plans/pro-plan/trials).

You can manage access requests in the following way.

1. From your [dashboard](/dashboard), go to [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings) in the sidebar
2. Choose the **Requests** section in the sidebar to see pending requests
3. Choose **Access** to manage existing access

![Access requests can be approved and declined on the Dashboard > Settings > Deployment Protection > Requests section.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/deployments/preview-deployments/manage-requests.png)

![Granted access requests can be managed on the Dashboard > Settings > Deployment Protection > Access section.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/deployments/preview-deployments/granted-access-list.png)

You can also manage access requests using the share modal on the deployment page.

![Access requests can be approved, declined and revoked in the deployment share modal.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/deployments/preview-deployments/manage-access-v2-light.png)

## Vercel Authentication security considerations

Disabling Vercel Authentication renders all existing deployments unprotected. When you re-enable it, previously authenticated users can maintain access without a new login, provided they already authenticated to the specific deployment and have a cookie set in their browser. The authentication token sent as a cookie is restricted to one URL and isn't transferable, even between URLs pointing to the same deployment.

| Consideration                 | Description                                                                                                                                                                                                                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Environment configuration** | Can be enabled for different environments. See [Choose which URLs to protect](/docs/deployment-protection#choose-which-urls-to-protect)                                                                                           |
| **Compatibility**             | Works alongside [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection) and [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips)                                                      |
| **Bypass methods**            | Can be bypassed using [Shareable Links](/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links) and [Protection bypass for Automation](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) |
| **Disabling**                 | All existing deployments become unprotected when Vercel Authentication is disabled                                                                                                                                                                                                     |
| **Re-enabling**               | Users who have logged in previously will still have access without re-authenticating                                                                                                                                                                                                   |
| **Token scope**               | Tokens are valid for a single URL and are not reusable across different URLs                                                                                                                                                                                                           |

## Managing Vercel Authentication

Admins and members can enable or disable Vercel Authentication for their team. Hobby teams can also enable or disable for their own projects. Vercel Authentication is managed on a **per-project** basis.

You can manage Vercel Authentication through the dashboard, API, or Terraform:

### How to manage Vercel Authentication from the dashboard

- ### Go to project deployment protection settings
  From your Vercel [dashboard](/dashboard):
  1. **Select the project** that you wish to enable Vercel Authentication for
  2. Go to [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings) in the sidebar

- ### Enable and configure Vercel Authentication
  From the **Vercel Authentication** section:
  1. Use the toggle to enable the feature
  2. Select the [deployment environment](/docs/deployments/environments) you want to protect
  3. Select **Save**
  Vercel Authentication now protects all your existing and future deployments in the environments you selected. Next time when you access a deployment, you will be asked to log in with Vercel if you aren't already logged in, you will be redirected to the deployment URL and a cookie will be set in your browser for that deployment URL.

  ![Enabling Vercel Authentication.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/projects/sso-protection-light.png)

### How to manage Vercel Authentication with the API

You can manage Vercel Authentication using the Vercel API endpoint to [update an existing project](/docs/rest-api/projects/update-an-existing-project) with the following body. Set `deploymentType` to one of these values:

- `prod_deployment_urls_and_all_previews`: Standard Protection
- `all`: All Deployments
- `preview`: Only Preview Deployments

To enable or update Vercel Authentication, send the `ssoProtection` object:

```json
{
  "ssoProtection": {
    "deploymentType": "prod_deployment_urls_and_all_previews"
  }
}
```

To disable Vercel Authentication, set `ssoProtection` to `null`:

```json
{
  "ssoProtection": null
}
```

### How to manage Vercel Authentication with Terraform

You can configure Vercel Authentication using `vercel_authentication` in the `vercel_project` data source in the [Vercel Terraform Provider](https://registry.terraform.io/providers/vercel/vercel/latest/docs/data-sources/project).


---

[View full sitemap](/docs/sitemap)
