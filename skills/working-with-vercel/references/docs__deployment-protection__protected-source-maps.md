---
title: Restrict access to production source maps
product: vercel
url: /docs/deployment-protection/protected-source-maps
canonical_url: "https://vercel.com/docs/deployment-protection/protected-source-maps"
last_updated: 2026-05-14
type: how-to
prerequisites:
  - /docs/deployment-protection
related:
  - /docs/security/deployment-protection/methods-to-protect-deployments/vercel-authentication
  - /docs/rbac/access-roles
  - /docs/rbac/access-groups
  - /docs/security/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
  - /docs/rest-api/reference/endpoints/projects/update-an-existing-project
summary: Protected Source Maps gates requests for browser source maps behind Vercel Authentication, so only authorized users can view your production source...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-protection/protected-source-maps.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "49409d4c188d02e255977fd45980c26c7e8ad377d0d8290433db07b7fcc61969"
---

# Restrict access to production source maps

> **🔒 Permissions Required**: Protected Source Maps

Protected Source Maps gates requests for browser source maps behind [Vercel Authentication](/docs/security/deployment-protection/methods-to-protect-deployments/vercel-authentication). When enabled, your deployment serves `.map` files only to users who can already access the deployment, and returns `404 Not Found` to everyone else.

This lets you ship source maps to production so your team and error trackers can read meaningful stack traces, without exposing your source code to the public.

To get started, [enable Protected Source Maps](#enable-protected-source-maps-from-the-dashboard) from your project's Deployment Protection settings, then use the [Vercel Toolbar](#view-protected-source-maps-with-the-vercel-toolbar) to view protected source maps in your browser.

## Getting started with Protected Source Maps

You can manage Protected Source Maps from the [dashboard](#enable-protected-source-maps-from-the-dashboard) or the [REST API](#manage-protected-source-maps-with-the-api). Either way, access is limited to the users listed below.

### Who can view protected source maps

The same users who can view your protected deployments can view their source maps:

- Logged-in [team members](/docs/rbac/access-roles#team-level-roles) with at least a viewer role
- Logged-in [project members](/docs/rbac/access-roles#project-level-roles) with at least the [project Viewer](/docs/rbac/access-roles#project-viewer) role
- Logged-in members of an [access group](/docs/rbac/access-groups) that has access to the project
- Users who have been [granted access](/docs/security/deployment-protection/methods-to-protect-deployments/vercel-authentication#access-requests) to the deployment
- Tools using the [protection bypass for automation](/docs/security/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) header

## Enable Protected Source Maps from the dashboard

- ### Go to project deployment protection settings
  From your Vercel [dashboard](/dashboard):
  1. Select the project you want to configure
  2. Open **Settings** in the sidebar and select [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings)

- ### Toggle Protected Source Maps
  From the **Protected Source Maps** section:
  1. Use the toggle to enable or disable the feature
  2. Select **Save**
  The change applies to your existing deployments on the next request for a `.map` file. There is no need to redeploy.

## Manage Protected Source Maps with the API

Use the Vercel API endpoint to [update an existing project](/docs/rest-api/reference/endpoints/projects/update-an-existing-project) with the `protectedSourcemaps` boolean field.

| Parameter             | Type    | Description                                                                                |
| --------------------- | ------- | ------------------------------------------------------------------------------------------ |
| `protectedSourcemaps` | boolean | Set to `true` to gate `.map` requests behind Vercel Authentication, or `false` to disable. |

```bash
curl -X PATCH "https://api.vercel.com/v9/projects/your_project_id_here?teamId=your_team_id_here" \
  -H "Authorization: Bearer your_access_token_here" \
  -H "Content-Type: application/json" \
  -d '{"protectedSourcemaps": true}'
```

Set `protectedSourcemaps` to `false` in the body to disable the feature.

## View protected source maps with the Vercel Toolbar

Browsers do not send your Vercel session with `.map` requests by default, so DevTools and other tools cannot load protected source maps until they authenticate against the deployment. The [Vercel Toolbar](/docs/vercel-toolbar) signs the browser in for the current deployment.

To view protected source maps in your browser:

1. Open the deployment you want to inspect
2. Activate the [Vercel Toolbar](/docs/vercel-toolbar#activating-the-toolbar) and sign in with an account that has access to the deployment
3. Turn on **Debug Mode** in the Toolbar Menu
4. Reload the page

Your browser DevTools resolves minified stack traces using the protected source maps. Access is scoped to the deployment URL it was issued for, and ends when you sign out of Vercel or close the Toolbar session.

> **💡 Note:** Protected Source Maps only authorizes requests made from a browser with a
> valid Vercel session. Tools that fetch source maps from outside the browser,
> such as a CI pipeline uploading them to an error tracker, should use the
> [protection bypass for automation](/docs/security/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation)
> header.

## Considerations

| Consideration             | Description                                                                                                                                                                                                                                                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Plan availability**     | Available on all plans.                                                                                                                                                                                                                                                                                                                                |
| **Default behavior**      | Enabled by default for new projects. Existing projects must opt in by turning the setting on. If your build doesn't generate source maps in production, nothing is exposed today.                                                                                                                                                                      |
| **File scope**            | Applies to browser source map files (`.map`) served from your deployment. Inline source maps embedded in JavaScript, server-side source maps used by Vercel Functions, and source maps uploaded to third-party error trackers are unaffected.                                                                                                          |
| **Response when blocked** | Unauthorized requests receive `404 Not Found`, not `401` or `403`. This avoids confirming the file exists at the requested path.                                                                                                                                                                                                                       |
| **Compatibility**         | Works alongside [Vercel Authentication](/docs/security/deployment-protection/methods-to-protect-deployments/vercel-authentication), [Password Protection](/docs/security/deployment-protection/methods-to-protect-deployments/password-protection), and [Trusted IPs](/docs/security/deployment-protection/methods-to-protect-deployments/trusted-ips). |
| **Session scope**         | Authentication is tied to the deployment URL. Sessions do not carry over between URLs, even when those URLs point to the same deployment.                                                                                                                                                                                                              |
| **Disabling**             | Setting `protectedSourcemaps` to `false` makes the deployment's source maps publicly accessible again on the next request.                                                                                                                                                                                                                             |

## How Protected Source Maps work

When a browser requests a `.map` file from your deployment, Vercel checks the project's `protectedSourcemaps` setting before serving the response:

- If `protectedSourcemaps` is `true`, Vercel checks the request against deployment protection and serves the source map to authorized users. Everyone else receives a `404 Not Found` response, which avoids confirming whether the file exists at the requested path.
- If `protectedSourcemaps` is `false`, the deployment serves source maps to anyone who requests them. This preserves the behavior of projects that intentionally publish source maps for public error tracking.

This protection applies to browser source maps generated during a build, such as `*.js.map` and `*.css.map`. It does not change how source maps are generated, uploaded to error trackers, or consumed in non-browser contexts.

## Related resources

- [Vercel Authentication](/docs/security/deployment-protection/methods-to-protect-deployments/vercel-authentication)
- [Vercel Toolbar](/docs/vercel-toolbar)
- [Methods to bypass Deployment Protection](/docs/security/deployment-protection/methods-to-bypass-deployment-protection)
- [`NEXTJS_NO_PRODUCTION_SOURCE_MAPS` conformance rule](/docs/conformance/rules/NEXTJS_NO_PRODUCTION_SOURCE_MAPS)


---

[View full sitemap](/docs/sitemap)
