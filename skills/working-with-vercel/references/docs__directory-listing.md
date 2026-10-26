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
  []
summary: The Directory Listing is served when a particular path is a directory and does not contain an index file. Learn how to toggle and disable it in this...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/directory-listing.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "9df01c521c39d41d114721026219da3f5c58aa969452bffc421d399634780072"
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

To prevent Directory Listing for a specific path, you can either:

- Add an index file with any extension except `.css`, such as `index.html`. This file will be displayed instead of the Directory Listing
- Or, [set up a custom 404 error](/kb/guide/custom-404-page)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
