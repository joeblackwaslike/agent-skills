---
title: "SEO"
source: "https://docusaurus.io/docs/seo"
fetched_at: "2026-05-26T21:59:06.099Z"
sha256: "8d87c408ba6b0b69c6fcfa082256604fbf9eddf853333a4e148d0e4781ee4558"
---

# SEO

Source: https://docusaurus.io/docs/seo

- GuidesSEOVersion: 3.10.1On this page
# Search engine optimization (SEO)

Docusaurus supports search engine optimization in a variety of ways.

## Global metadata​

Provide global meta attributes for the entire site through the site configuration. The metadata will all be rendered in the HTML `<head>` using the key-value pairs as the prop name and value. The `metadata` attribute is a convenient shortcut to declare `<meta>` tags, but it is also possible to inject arbitrary tags in `<head>` with the `headTags` attribute.

docusaurus.config.js
```
export default {  themeConfig: {    // Declare some <meta> tags    metadata: [      {name: 'keywords', content: 'cooking, blog'},      {name: 'twitter:card', content: 'summary_large_image'},    ],  },  headTags: [    // Declare a <link> preconnect tag    {      tagName: 'link',      attributes: {        rel: 'preconnect',        href: 'https://example.com',      },    },    // Declare some json-ld structured data    {      tagName: 'script',      attributes: {        type: 'application/ld+json',      },      innerHTML: JSON.stringify({        '@context': 'https://schema.org/',        '@type': 'Organization',        name: 'Meta Open Source',        url: 'https://opensource.fb.com/',        logo: 'https://opensource.fb.com/img/logos/Meta-Open-Source.svg',      }),    },  ],};
```

Docusaurus adds some metadata out-of-the-box. For example, if you have configured i18n, you will get a `hreflang` alternate link.

To read more about types of meta tags, visit the MDN docs.

## Single page metadata​

Similar to global metadata, Docusaurus also allows for the addition of meta-information to individual pages. Follow this guide for configuring the `<head>` tag. In short:

my-markdown-page.mdx
```
# A cooking guide<head>  <meta name="keywords" content="cooking, blog" />  <meta name="twitter:card" content="summary_large_image" />  <link rel="preconnect" href="https://example.com" />  <script type="application/ld+json">    {JSON.stringify({      '@context': 'https://schema.org/',      '@type': 'Organization',      name: 'Meta Open Source',      url: 'https://opensource.fb.com/',      logo: 'https://opensource.fb.com/img/logos/Meta-Open-Source.svg',    })}  </script></head>Some content...
```

Docusaurus automatically adds `description`, `title`, canonical URL links, and other useful metadata to each Markdown page. They are configurable through front matter:


```
---title: Title for search engines; can be different from the actual headingdescription: A short description of this pageimage: a thumbnail image to be shown in social media cardskeywords: [keywords, describing, the main topics]---
```

When creating your React page, adding these fields in `Layout` would also improve SEO.

tipPrefer to use front matter for fields like `description` and `keywords`: Docusaurus will automatically apply this to both `description` and `og:description`, while you would have to manually declare two metadata tags when using the `<head>` tag.
infoThe official plugins all support the following front matter: `title`, `description`, `keywords` and `image`. Refer to their respective API documentation for additional front matter support:
Docs front matter

- Blog front matter

- Pages front matter

For JSX pages, you can use the Docusaurus `<Head>` component.

my-react-page.jsx
```
import React from 'react';import Layout from '@theme/Layout';import Head from '@docusaurus/Head';export default function page() {  return (    <Layout title="Page" description="A React page demo">      <Head>        <meta property="og:image" content="image.png" />        <meta name="twitter:card" content="summary_large_image" />        <link rel="preconnect" href="https://example.com" />        <script type="application/ld+json">          {JSON.stringify({            '@context': 'https://schema.org/',            '@type': 'Organization',            name: 'Meta Open Source',            url: 'https://opensource.fb.com/',            logo: 'https://opensource.fb.com/img/logos/Meta-Open-Source.svg',          })}        </script>      </Head>      {/* ... */}    </Layout>  );}
```

tipFor convenience, the default theme `<Layout>` component accept `title` and `description` as props.

## Static HTML generation​

Docusaurus is a static site generator—HTML files are statically generated for every URL route, which helps search engines discover your content more easily.

## Image meta description​

The alt tag for an image tells the search engine what the image is about, and is used when the image can't be visually seen, e.g. when using a screen reader, or when the image is broken. Alt tags are commonly supported in Markdown.

You may also add a title for your image—this doesn't impact SEO much but is displayed as a tooltip when hovering above the image, usually used to provide hints.


```
![Docusaurus banner](./assets/docusaurus-asset-example-banner.png 'Image title')
```

http://localhost:3000

## Rich search information​

Docusaurus blogs support rich search results out-of-the-box to get maximum search engine experience. The information is created depending on your meta information in blog/global configuration. In order to get the benefits of the rich search information, fill in the information about the post's publish date, authors, and image, etc. Read more about the meta-information here.

## Robots file​

A `robots.txt` file regulates search engines' behavior about which should be displayed and which shouldn't. You can provide it as static asset. The following would allow access to all sub-pages from all requests:

static/robots.txt
```
User-agent: *Disallow:
```

Read more about the robots file in the Google documentation.

warning**Important**: the `robots.txt` file does **not** prevent HTML pages from being indexed.To prevent your whole Docusaurus site from being indexed, use the `noIndex` site config. Some hosting providers may also let you configure a `X-Robots-Tag: noindex` HTTP header (GitHub Pages does not support this).To prevent a single page from being indexed, use `<meta name="robots" content="noindex">` as page metadata. Read more about the robots meta tag.

## Sitemap file​

Docusaurus provides the `@docusaurus/plugin-sitemap` plugin, which is shipped with `preset-classic` by default. It autogenerates a `sitemap.xml` file which will be available at `https://example.com/[baseUrl]/sitemap.xml` after the production build. This sitemap metadata helps search engine crawlers crawl your site more accurately.

tipThe sitemap plugin automatically filters pages containing a `noindex` robots meta directive.For example, `/examples/noIndex` is not included in the Docusaurus sitemap.xml file because it contains the following page metadata:
```
<head>  <meta name="robots" content="noindex, nofollow" /></head>
```


## Human readable links​

Docusaurus uses your file names as links, but you can always change that using slugs, see this tutorial for more details.

## Structured content​

Search engines rely on the HTML markup such as `<h2>`, `<table>`, etc., to understand the structure of your webpage. When Docusaurus renders your pages, semantic markup, e.g. `<aside>`, `<nav>`, `<main>`, are used to divide the different sections of the page, helping the search engine to locate parts like sidebar, navbar, and the main page content.

Most CommonMark syntaxes have their corresponding HTML tags. By using Markdown consistently in your project, you will make it easier for search engines to understand your page content.Edit this pageLast updated on Apr 30, 2026 by Sébastien Lorber
