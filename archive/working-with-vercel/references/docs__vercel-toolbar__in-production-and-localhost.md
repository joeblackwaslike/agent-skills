---
title: Add the Vercel Toolbar to local and production environments
product: vercel
url: /docs/vercel-toolbar/in-production-and-localhost
canonical_url: "https://vercel.com/docs/vercel-toolbar/in-production-and-localhost"
last_updated: 2026-08-11
type: conceptual
prerequisites:
  - /docs/vercel-toolbar
related:
  - /docs/deployments/environments
  - /docs/comments/using-comments
  - /docs/flags
  - /docs/draft-mode
  - /docs/edit-mode
summary: Learn how to use the Vercel Toolbar in production and local environments.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/vercel-toolbar/in-production-and-localhost.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "75903810b41dc94070844aa94707020ff2b728455cda2eff958a9ca8e6bf30f1"
---

# Add the Vercel Toolbar to local and production environments

The Vercel Toolbar is available by default on all [preview environments](/docs/deployments/environments#preview-environment-pre-production). In production environments the toolbar supports ongoing team collaboration and project iteration. When used in development environments, you can see and resolve preview comments during development, streamlining the process of iterating on your project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I serve multiple projects under a single domain?](https://vercel.com/kb/guide/how-can-i-serve-multiple-projects-under-a-single-domain) — Learn how to serve multiple Vercel projects from a single domain.
- [Use the Vercel Toolbar in Production with the Chrome Extension or the toolbar menu](https://vercel.com/changelog/use-the-vercel-toolbar-in-production)
- [@vercel/toolbar available to use collaboration features in production](https://vercel.com/changelog/vercel-toolbar-now-available-to-use-collaboration-features-in-production)
- [Easier toolbar setup for SvelteKit and other Vite-based frameworks](https://vercel.com/changelog/easier-toolbar-setup-for-sveltekit-and-other-vite-based-frameworks)
- [Introducing new developer tools in the Vercel Toolbar](https://vercel.com/blog/introducing-new-developer-tools-in-the-vercel-toolbar)
- [Managing the visibility of the Vercel Toolbar](https://vercel.com/docs/vercel-toolbar/managing-toolbar) — Learn how to enable or disable the Vercel Toolbar for your team, project, and session.
- [Enabling and Disabling Comments](https://vercel.com/docs/comments/how-comments-work) — Learn when and where Comments are available, and how to enable and disable Comments at the account, project, and session
- [Toolbar](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar) — Vercel MCP tools for toolbar.
- [Toolbar Browser Extensions](https://vercel.com/docs/vercel-toolbar/browser-extension) — The browser extensions enable you to use the toolbar in production environments, take screenshots and attach them to com
- [Comments Overview](https://vercel.com/docs/comments) — Comments allow teams and invited participants to give direct feedback on preview deployments. Learn more about Comments

Full cross-link map for this page: [/docs/vercel-toolbar/in-production-and-localhost.graph.md](/docs/vercel-toolbar/in-production-and-localhost.graph.md)
<!-- /docsgraph:related -->

All toolbar features such as [Comments](/docs/comments/using-comments), [Feature Flags](/docs/flags), [Draft Mode](/docs/draft-mode), and [Edit Mode](/docs/edit-mode), are available in both production and development environments.

- [Add the toolbar to your local or production environment](/docs/vercel-toolbar/in-production-and-localhost/add-to-localhost)

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
