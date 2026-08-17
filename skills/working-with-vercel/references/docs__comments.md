---
title: Comments Overview
product: vercel
url: /docs/comments
canonical_url: "https://vercel.com/docs/comments"
last_updated: 2026-06-16
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "8d01c498582914c6d607363ef7eb88198377b15801212ddfea54267eb5af14b7"
---

# Comments Overview

> **🔒 Permissions Required**: Comments


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I prevent the Vercel for GitHub integration comments?](https://vercel.com/kb/guide/how-to-prevent-vercel-github-comments?from=related) — Information on how to prevent the Vercel for GitHub integration from adding comments.
- [Managing Toolbar](https://vercel.com/docs/vercel-toolbar/managing-toolbar?from=related) — Learn how to enable or disable the Vercel Toolbar for your team, project, and session.
- [Browser Extensions](https://vercel.com/docs/vercel-toolbar/browser-extension?from=related) — The browser extensions enable you to use the toolbar in production environments, take screenshots and attach them to com
- [Deployments](https://vercel.com/docs/deployments?from=related) — Learn how to create and manage deployments on Vercel.
- [General Settings](https://vercel.com/docs/project-configuration/general-settings?from=related) — Configure basic settings for your Vercel project, including the project name, build and development settings, root direc
- [Code Review](https://vercel.com/docs/agent/pr-review?from=related) — Get automatic AI-powered code reviews on your pull requests

Full cross-link map for this page: [/docs/comments.graph.md](/docs/comments.graph.md)
<!-- /docsgraph:related -->

Comments allow teams [and invited participants](/docs/comments/how-comments-work#sharing) to give direct feedback on [preview deployments](/docs/deployments/environments#preview-environment-pre-production) or other environments through the Vercel Toolbar. Comments can be added to any part of the UI, opening discussion threads that [can be linked to Slack threads](/docs/comments/integrations#use-the-vercel-app-for-slack). This feature is **enabled by default** on *all* preview deployments, for all account plans, free of charge. The only requirement is that all users must have a Vercel account.

![Image](`/front/docs/comments/comment-light.png`)

Pull request owners receive emails when a new comment is created. Comment creators and participants in comment threads will receive email notifications alerting them to new activity within those threads. Anyone in your Vercel team can leave comments on your previews by default. On Pro and Enterprise plans, you can [invite external users](/docs/deployments/sharing-deployments#sharing-a-preview-deployment-with-external-collaborators) to view your deployment and leave comments.

When changes are pushed to a PR, and a new preview deployment has been generated, a popup modal in the bottom-right corner of the deployment will prompt you to refresh your view:

![Image](`/front/docs/comments/new-deployment-is-ready-light.png`)

Comments are a feature of the [Vercel Toolbar](/docs/vercel-toolbar) and the toolbar must be active to see comments left on a page. You can activate the toolbar by clicking on it. For users who intend to use comments frequently, we recommend downloading the [browser extension](/docs/vercel-toolbar/in-production-and-localhost/add-to-production#accessing-the-toolbar-using-the-chrome-extension) and toggling on **Always Activate** in **Preferences** from the Toolbar menu. This sets the toolbar to always activate so you will see comments on pages without needing to click to activate it.

To leave a comment:

1. Open the toolbar menu and select **Comment** or the comment bubble icon in shortcuts.
2. Then, click on the page or highlight text to place your comment.

## More resources

- [Enabling or Disabling Comments](/docs/comments/how-comments-work)
- [Using Comments](/docs/comments/using-comments)
- [Managing Comments](/docs/comments/managing-comments)
- [Comments Integrations](/docs/comments/integrations)
- [Using Comments in production and localhost](/docs/vercel-toolbar/in-production-and-localhost)


---

[View full sitemap](/docs/sitemap)
