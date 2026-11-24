---
title: Using the Directory Listing
product: vercel
url: /docs/directory-listing
canonical_url: "https://vercel.com/docs/directory-listing"
last_updated: 2026-02-26
type: conceptual
prerequisites:
  []
related:
  - /docs/routing/custom-404-pages
summary: The Directory Listing is served when a particular path is a directory and does not contain an index file. Learn how to toggle and disable it in this...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/directory-listing.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "da7605f61c05f481b3ed1f4804b3c248a6f77a6ab32d4c3f735ab42da8c703d1"
---

# Using the Directory Listing

The Directory Listing setting enables you to display the contents of a directory when a user visits its path. For example, if you create a directory at the root of your project called `/assets`, then when people visit `https://your-site.com/assets`, they will see the files and folders within that directory, as shown in the example below:

![The contents of a /assets directory.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/projects/directory-listing-page-light.png)

You can enable or disable Directory Listing from **Advanced** in your project sidebar settings.

![Directory Listing for an example /assets directory.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/projects/directory-listing-light.png)

When enabled, the Directory Listing will be displayed. When disabled, a "Not Found" error will be displayed with status code `404`.

> **💡 Note:** If Directory Listing isn't working, navigate to your deployment in the
> dashboard and open **Source** in the sidebar to view the contents of
> your project. Ensure the expected directory and files are listed.

### Disabling Directory Listing on a specific directory

To prevent Directory Listing for a specific path, add an index file with any extension except `.css`, such as `index.html`. This file will be displayed instead of the Directory Listing.

A [custom 404 page](/docs/routing/custom-404-pages) doesn't prevent Directory Listing. When the directory contains files, Vercel displays the Directory Listing instead of the 404 page.

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
