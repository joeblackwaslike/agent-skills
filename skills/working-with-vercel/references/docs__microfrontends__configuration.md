---
title: Microfrontends Configuration
product: vercel
url: /docs/microfrontends/configuration
canonical_url: "https://vercel.com/docs/microfrontends/configuration"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/microfrontends
related:
  - /docs/microfrontends/quickstart
  - /docs/builds/configure-a-build
  - /docs/environment-variables/managing-environment-variables
summary: Configure your microfrontends.json.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/microfrontends/configuration.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "f74fadcd99f0320bdff70e2d5aa7c215d377a5e18fbef7f5517bff6b92886432"
---

# Microfrontends Configuration

The `microfrontends.json` file is used to configure your microfrontends. If this file is not deployed with your [default application](/docs/microfrontends/quickstart#key-concepts), the deployment will not be a microfrontend.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Microfrontends](https://turborepo.dev/docs/guides/microfrontends?from=related&source_path=%2Fdocs%2Fmicrofrontends%2Fconfiguration&source_site=vercel-docs&relationship=related) — Set up Turborepo's built-in proxy to route traffic between multiple frontend applications during local development.
- [Microfrontends local development](https://vercel.com/docs/microfrontends/local-development?from=related&source_path=%2Fdocs%2Fmicrofrontends%2Fconfiguration&source_site=vercel-docs&relationship=related) — Learn how to run and test your microfrontends locally.
- [vercel microfrontends](https://vercel.com/docs/cli/microfrontends?from=related&source_path=%2Fdocs%2Fmicrofrontends%2Fconfiguration&source_site=vercel-docs&relationship=related) — Manage microfrontends groups from the CLI. Learn how to create groups, inspect group metadata, add and remove projects,
- [Managing microfrontends](https://vercel.com/docs/microfrontends/managing-microfrontends?from=related&source_path=%2Fdocs%2Fmicrofrontends%2Fconfiguration&source_site=vercel-docs&relationship=related) — Learn how to manage your microfrontends on Vercel.
- [Microfrontends Routing](https://vercel.com/docs/microfrontends/routing?from=related&source_path=%2Fdocs%2Fmicrofrontends%2Fconfiguration&source_site=vercel-docs&relationship=related) — Configure which microfrontend handles each path and understand how Vercel selects deployments.
- [Testing & troubleshooting microfrontends](https://vercel.com/docs/microfrontends/troubleshooting?from=related&source_path=%2Fdocs%2Fmicrofrontends%2Fconfiguration&source_site=vercel-docs&relationship=related) — Learn about testing, common issues, and how to troubleshoot microfrontends on Vercel.

Full cross-link map for this page: [/docs/microfrontends/configuration.graph.md](/docs/microfrontends/configuration.graph.md?from=related&source_path=%2Fdocs%2Fmicrofrontends%2Fconfiguration&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Schema

Config$schemastringSee https://openapi.vercel.sh/microfrontends.json. versionstringThe version of the microfrontends config schema. applications\[ApplicationRouting]\(#applicationrouting)Mapping of Vercel project names to their microfrontend configurations. Requiredoptions\[Options]\(#options)Optional configuration options for the microfrontend. ApplicationRouting\[key: string]: \[Application]\(#application) Mapping of Vercel project names to their microfrontend configurations.  key: The Vercel project name of the microfrontend application.

Note: If this name does not also match the name \`name\` from the \`package.json\`, set \`packageName\` with the name used in \`package.json\`.

See. \[application naming]\(/docs/microfrontends/configuration#application-naming).Application\[DefaultApplication]\(#defaultapplication) or \[ChildApplication]\(#childapplication).  The configuration for a microfrontend application. There must always be one default application. DefaultApplicationpackageNamestringThe name used to run the application, e.g. the \`name\` field in the \`package.json\`.

This is used by the local proxy to map the application config to the locally running app.

This is only necessary when the application name does not match the \`name\` used in \`package.json\`.

See. \[application naming]\(/docs/microfrontends/configuration#application-naming).development\[DefaultDevelopment]\(#defaultdevelopment)Development configuration for the default application. RequiredDefaultDevelopmentlocalnumber | stringA local port number or host that this application runs on when it is running locally. If passing a string, include the protocol (optional), host (required) and port (optional).

Examples of valid values: 8080, my.localhost.me, my.localhost.me:8080, https://my.localhost.me, https://my.localhost.me:8080.

The default value is http://localhost:\<port> where port is a stable, unique port number (based on the application name).

See. \[local development]\(/docs/microfrontends/local-development).taskstringThe task to run when starting the development server. Should reference a script in the package.json of the application.

The default value is "dev".

See. \[local development]\(/docs/microfrontends/local-development).fallbackstringFallback for local development, could point to any environment. This is required for the default app. This value is used as the fallback for child apps as well if they do not have a fallback.

If passing a string, include the protocol (optional), host (required) and port (optional). For example: \`https://this.ismyhost:8080\`. If omitted, the protocol defaults to HTTPS. If omitted, the port defaults to \`80\` for HTTP and \`443\` for HTTPS.

See. \[local development]\(/docs/microfrontends/local-development).RequiredChildApplicationpackageNamestringThe name used to run the application, e.g. the \`name\` field in the \`package.json\`.

This is used by the local proxy to map the application config to the locally running app.

This is only necessary when the application name does not match the \`name\` used in \`package.json\`.

See. \[application naming]\(/docs/microfrontends/configuration#application-naming).development\[ChildDevelopment]\(#childdevelopment)Development configuration for the child application. routing\[Routing]\(#routing)Groups of path expressions that are routed to this application.

See. \[path routing]\(/docs/microfrontends/path-routing).RequiredassetPrefixstringThe name of the asset prefix to use instead of the auto-generated name.

The asset prefix is used to prefix all paths to static assets, such as JS, CSS, or images that are served by a specific application. It is necessary to ensure there are no conflicts with other applications on the same domain.

An auto-generated asset prefix of the form \`vc-ap-\<hash>\` is used when this field is not provided.

When this field is provided, \`/${assetPrefix}/:path\*\` must also be added to the list of paths in the \`routing\` field. Changing the asset prefix after a microfrontend application has already been deployed is not a forwards and backwards compatible change, and the asset prefix should be added to the \`routing\` field and deployed before setting the \`assetPrefix\` field.

The default value is the auto-generated asset prefix of the form \`vc-ap-\<hash>\`.

See. \[asset prefix]\(/docs/microfrontends/path-routing#asset-prefix).ChildDevelopmentlocalnumber | stringA local port number or host that this application runs on when it is running locally. If passing a string, include the protocol (optional), host (required) and port (optional).

Examples of valid values: 8080, my.localhost.me, my.localhost.me:8080, https://my.localhost.me, https://my.localhost.me:8080.

The default value is http://localhost:\<port> where port is a stable, unique port number (based on the application name).

See. \[local development]\(/docs/microfrontends/local-development).taskstringThe task to run when starting the development server. Should reference a script in the package.json of the application.

The default value is "dev".

See. \[local development]\(/docs/microfrontends/local-development).fallbackstringFallback for local development, could point to any environment. If not provided for child apps, the fallback of the default app will be used.

If passing a string, include the protocol (optional), host (required) and port (optional). For example: \`https://this.ismyhost:8080\`. If omitted, the protocol defaults to HTTPS. If omitted, the port defaults to \`80\` for HTTP and \`443\` for HTTPS.

See. \[local development]\(/docs/microfrontends/local-development).Routing\[PathGroup\[]]\(#pathgroup) A list of path groups that are routed to this application. PathGroupgroupstringGroup name for the paths. flagstringThe name of the feature flag that controls routing for this group of paths. See. \[routing changes safely with flags]\(/docs/microfrontends/path-routing#routing-changes-safely-with-flags).pathsstring\[]A list of path expressions that are routed to this application. See. \[supported path expressions]\(/docs/microfrontends/path-routing#supported-path-expressions).RequiredOptionsdisableOverridesbooleanIf you want to disable the overrides for the site. For example, if you are managing rewrites between applications externally, you may wish to disable the overrides on the toolbar as they will have no effect.

See. \[routing overrides]\(/docs/microfrontends/managing-microfrontends/vercel-toolbar#routing-overrides).localProxyPortnumberThe port number used by the local proxy server.

The default value is 3024.

See. \[local development]\(/docs/microfrontends/local-development).

## Example

```json filename="microfrontends.json"
{
  "$schema": "https://openapi.vercel.sh/microfrontends.json",
  "applications": {
    "nextjs-pages-dashboard": {
      "development": {
        "fallback": "nextjs-pages-dashboard.vercel.app"
      }
    },
    "nextjs-pages-blog": {
      "routing": [
        {
          "paths": ["/blog/:path*"]
        },
        {
          "flag": "enable-flagged-blog-page",
          "paths": ["/flagged/blog"]
        }
      ]
    }
  }
}
```

## Application Naming

If the application name differs from the `name` field in `package.json` for the application, you should either rename the name field in `package.json` to match or add the `packageName` field to the microfrontends configuration.

```json filename="microfrontends.json"
    "docs": {
      "packageName": "name-from-package-json",
      "routing": [
        {
          "group": "docs",
          "paths": ["/docs/:path*"]
        }
      ]
    }
```

## File Naming

The microfrontends configuration file can be named either `microfrontends.json` or `microfrontends.jsonc`.

You can also define a custom configuration file by setting the `VC_MICROFRONTENDS_CONFIG_FILE_NAME` environment variable — for example, `microfrontends-dev.json`. The file name must end with either `.json` or `.jsonc`, and it may include a path, such as `/path/to/microfrontends.json`. The filename / path specified is relative to the [root directory](/docs/builds/configure-a-build#root-directory) for the [default application](/docs/microfrontends/quickstart#key-concepts).

Be sure to add the [environment variable](/docs/environment-variables/managing-environment-variables) to all projects within the microfrontends group.

Using a custom file name allows the same repository to support multiple microfrontends groups, since each group can have its own configuration file.

If you're using Turborepo, define the environment variable **outside** of the Turbo invocation when running `turbo dev`, so the local proxy can detect and use the correct configuration file.

```bash
VC_MICROFRONTENDS_CONFIG_FILE_NAME="microfrontends-dev.json" turbo dev
```


---

[View full sitemap](/docs/sitemap)
