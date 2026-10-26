---
title: Comments Overview
product: vercel
url: /docs/comments
canonical_url: "https://vercel.com/docs/comments"
last_updated: 2026-08-19
type: conceptual
prerequisites:
  []
related:
  - /docs/comments/how-comments-work
  - /docs/deployments/environments
  - /docs/comments/integrations
  - /docs/deployments/sharing-deployments
  - /docs/vercel-toolbar
summary: Comments allow teams and invited participants to give direct feedback on preview deployments. Learn more about Comments in this overview.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/comments.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "bbf144981aa93d8e058b9950cc3db32b768972943da070fa90c0242758d56b23"
---

# Comments Overview

> Comments are available on all plans

Comments allow teams [and invited participants](/docs/comments/how-comments-work#sharing) to give direct feedback on [preview deployments](/docs/deployments/environments#preview-environment-pre-production) or other environments through the Vercel Toolbar. Comments can be added to any part of the UI, opening discussion threads that [can be linked to Slack threads](/docs/comments/integrations#use-the-vercel-app-for-slack). This feature is **enabled by default** on *all* preview deployments, for all account plans, free of charge. The only requirement is that all users must have a Vercel account.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to prototype a storefront section in v0 and ship it to Next.js](https://vercel.com/kb/guide/how-to-prototype-a-storefront-section-in-v0) — Learn how v0 prototyping works for storefront sections, from a scoped prompt to a pull request in your existing Next.js
- [Preview deployments for retail campaign review](https://vercel.com/kb/guide/preview-deployments-retail-campaign-review) — Use preview deployments so merchandising, brand, and engineering review a retail campaign on one live URL before launch.
- [Enhanced Preview experience](https://vercel.com/blog/making-live-reviews-a-reality-enhanced-preview-experience)
- [Introducing Commenting on Preview Deployments](https://vercel.com/blog/introducing-commenting-on-preview-deployments)
- [Using Vercel comments to improve the Next.js 13 documentation](https://vercel.com/blog/using-vercel-comments-to-improve-the-next-js-13-documentation)
- [Commenting on Previews is now in Public Beta](https://vercel.com/changelog/commenting-on-previews-is-now-in-public-beta)
- [Manage Vercel Toolbar comments from the CLI](https://vercel.com/changelog/manage-vercel-toolbar-comments-from-the-cli)
- [Comments on Preview Deployments are now generally available](https://vercel.com/changelog/comments-on-preview-deployments-are-now-generally-available)
- [Managing the visibility of the Vercel Toolbar](https://vercel.com/docs/vercel-toolbar/managing-toolbar) — Learn how to enable or disable the Vercel Toolbar for your team, project, and session.
- [Account Management](https://vercel.com/docs/accounts) — Learn how to manage your Vercel account and team members.
- [Vercel CLI Overview](https://vercel.com/docs/cli) — Learn how to use the Vercel command-line interface \\(CLI\\) to manage and configure your Vercel Projects from the command
- [Sharable Links](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links) — Learn how to share your deployments with external users.

Full cross-link map for this page: [/docs/comments.graph.md](/docs/comments.graph.md)
<!-- /docsgraph:related -->

![Comments on a preview deployment of the Vercel Docs homepage.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/comments/comment-light.png)

Pull request owners receive emails when a new comment is created. Comment creators and participants in comment threads will receive email notifications alerting them to new activity within those threads. Anyone in your Vercel team can leave comments on your previews by default. On Pro and Enterprise plans, you can [invite external users](/docs/deployments/sharing-deployments#sharing-a-preview-deployment-with-external-collaborators) to view your deployment and leave comments.

When changes are pushed to a PR, and a new preview deployment has been generated, a popup modal in the bottom-right corner of the deployment will prompt you to refresh your view:

![The popup modal that alerts you when you are viewing an outdated deployment.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/comments/new-deployment-is-ready-light.png)

Comments are a feature of the [Vercel Toolbar](/docs/vercel-toolbar) and the toolbar must be active to see comments left on a page. You can activate the toolbar by clicking on it. For users who intend to use comments frequently, we recommend downloading the [browser extension](/docs/vercel-toolbar/in-production-and-localhost/add-to-production#accessing-the-toolbar-using-the-chrome-extension) and toggling on **Always Activate** in **Preferences** from the Toolbar menu. This sets the toolbar to always activate so you will see comments on pages without needing to click to activate it.

To leave a comment:

1. Open the toolbar menu and select **Comment** or the comment bubble icon in shortcuts.
2. Then, click on the page or highlight text to place your comment.

## More resources

- [Enabling or Disabling Comments](/docs/comments/how-comments-work)
- [Using Comments](/docs/comments/using-comments)
- [Managing Comments](/docs/comments/managing-comments)
- [Comments Integrations](/docs/comments/integrations)
- [Managing Comments with Vercel CLI](/docs/cli/comments)
- [Using Comments in production and localhost](/docs/vercel-toolbar/in-production-and-localhost)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
