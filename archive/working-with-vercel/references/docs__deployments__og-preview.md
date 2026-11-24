---
title: Inspecting your Open Graph metadata
product: vercel
url: /docs/deployments/og-preview
canonical_url: "https://vercel.com/docs/deployments/og-preview"
last_updated: 2026-08-11
type: how-to
prerequisites:
  - /docs/deployments
related:
  - /docs/deployment-protection
  - /docs/og-image-generation
summary: Learn how to inspect and validate your Open Graph metadata through the Open Graph deployment tab.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/deployments/og-preview.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "680b5f04092254e1ca1a5cab5c06c972cd59c2dc74f27837b8170d9ff1a50f2c"
---

# Inspecting your Open Graph metadata

You can use the **Open Graph** section in the sidebar on every deployment on Vercel to validate and view your [Open Graph (OG)](https://ogp.me/ "Open Graph (OG)") data across a range of social media sites before you share it out. Routes using [Deployment Protection](/docs/deployment-protection) can also be inspected.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Inspect and validate Open Graph metadata for enhanced link sharing](https://vercel.com/changelog/open-graph-link-sharing-inspector)
- [OG Image Generation: The Complete Customization Guide](https://vercel.com/kb/guide/using-custom-font) — Learn how to use custom fonts in your Vercel OG image, plus emoji, external images, non-Latin text, dynamic titles, and
- [List deployments](https://vercel.com/docs/rest-api/deployments/list-deployments) — GET /v7/deployments — List deployments under the authenticated user or team. If a deployment hasn't finished uploading \\
- [Accessing Deployments through Generated URLs](https://vercel.com/docs/deployments/generated-urls) — When you create a new deployment, Vercel will automatically generate a unique URL which you can use to access that parti
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments) — Vercel MCP tools for deployments.
- [Get deployment events](https://vercel.com/docs/rest-api/deployments/get-deployment-events) — GET /v3/deployments/{idOrUrl}/events — Get the build logs of a deployment by deployment ID and build ID. It can work as

Full cross-link map for this page: [/docs/deployments/og-preview.graph.md](/docs/deployments/og-preview.graph.md)
<!-- /docsgraph:related -->

To view your data:

1. Choose your account or team from the team switcher
2. Select your project and open [**Deployments**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fdeployments\&title=Go+to+Deployments) in the sidebar
3. From the **Deployments** section in the sidebar, select the deployment you wish to view the metadata for
4. Select the Open Graph tab:

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/deployments/og-tab-light.png)

5. From here, you can view the metadata and a preview for [Twitter](/docs/deployments/og-preview#twitter-specific-metadata), Slack, Facebook, and LinkedIn for [specific pages](/docs/deployments/og-preview#filter-by-pathname) in your deployment

## Filter by pathname

You can use the **Path** dropdown to view the OG card for any page on that particular deployment.

## Metadata

These properties set by the [Open Graph protocol](https://ogp.me/#metadata).

| Property         | Value                                                                   | Description                                                                                  |
| ---------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `title`          | The title tag used to name the page. 70 characters max.                 | This is used by default if no other values are passed.                                       |
| `description`    | The meta.description tag used to describe the page. 200 characters max. | This is used by default if no other values are passed.                                       |
| `og:image`       | Absolute URL to image.                                                  | Use the [OG Image Generation](/docs/og-image-generation) documentation to create new images. |
| `og:title`       | A title for link previews.                                              | You can use this to override the meta title if you want the OG title to be different.        |
| `og:description` | A one to two sentence description for link previews.                    | You can use this to override the meta description if you want the OG title to be different.  |
| `og:url`         | A canonical URL for link previews.                                      | You should provide the absolute URL.                                                         |

```jsx filename="index.js"
<div>
  <head>
    <meta name="og:title" content="Vercel CDN" />
    <meta name="og:description" content="Vercel CDN" />
    <meta
      name="og:image"
      content={
        // Because OG images must have an absolute URL, we use the
        // `VERCEL_URL` environment variable to get the deployment's URL.
        // More info: https://vercel.com/docs/environment-variables
        `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''}/api/vercel`
      }
    />
    <meta
      name="og:url"
      content="https://vercel.com/docs/cdn"
    />
  </head>
  <h1>A page with Open Graph Image.</h1>
</div>
```

### Twitter-specific metadata

| Property              | `content` value                                                                               | Additional information                                |
| --------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `twitter:image`       | A URL to an image file or to a dynamically generated image. `og:image` is used as a fallback. | `JPG`,`PNG`, `WEBP` and `GIF`. `SVG` is not supported |
| `twitter:card`        | The type of card used for Twitter link previews                                               | `summary`, `summary_large_image`, `app`, or `player`  |
| `twitter:title`       | A string that shows for Twitter link previews. `og:title` is used as a fallback.              | 70 characters max                                     |
| `twitter:description` | A description for Twitter link previews. `og:description` is used as a fallback.              | 200 characters max                                    |

```html filename="index.js"
<div>
  <head>
    <meta name="twitter:title" content="Vercel CDN for Twitter" />
    <meta name="twitter:description" content="Vercel CDN for Twitter" />
    <meta
      name="twitter:image"
      content="https://og-examples.vercel.sh/api/static"
    />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <h1>A page with Open Graph Image.</h1>
</div>
```

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
