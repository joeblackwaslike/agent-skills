---
title: Support Center
product: vercel
url: /docs/support-center
canonical_url: "https://vercel.com/docs/support-center"
last_updated: 2026-06-16
type: how-to
prerequisites:
  []
related:
  []
summary: Learn how to communicate securely with the Vercel support team
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/support-center.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "f63451589f2c3b3996eeb689662076d793ed91389dde551da08e9060a4c7162f"
---

# Support Center

> Support Center is available on all plans

The Vercel Support Center provides a secure and streamlined way for you to submit support cases. The Support Center allows you to create and view all cases, their statuses, and any messages from the Vercel Support team. All cases are securely stored to safeguard your data.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to keep your storefront running through Black Friday](https://vercel.com/kb/guide/black-friday-reliability) — Learn how to tune alerts, bot rules, and spend limits. Rehearse rollback so your team can recover quickly from checkout
- [Create and view support cases on the Vercel dashboard](https://vercel.com/changelog/support-center)
- [Support Center is now available for Pro customers](https://vercel.com/changelog/support-center-on-pro)
- [Improvements to Support Center](https://vercel.com/changelog/improvements-to-support-center)
- [Project settings](https://vercel.com/docs/project-configuration/project-settings) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,
- [Supported Frameworks on Vercel](https://vercel.com/docs/frameworks/more-frameworks) — Learn about the frameworks that can be deployed to Vercel.
- [Frontends on Vercel](https://vercel.com/docs/frameworks/frontend) — Vercel supports a wide range of the most popular frontend frameworks, optimizing how your application builds and runs no
- [How requests flow through Vercel](https://vercel.com/docs/fundamentals/infrastructure) — Learn how Vercel routes, secures, and serves requests from your users to your application.
- [Get supported TLDs](https://vercel.com/docs/rest-api/domains-registrar/get-supported-tlds) — GET /v1/registrar/tlds/supported — Get a list of TLDs supported by Vercel

Full cross-link map for this page: [/docs/support-center.graph.md](/docs/support-center.graph.md)
<!-- /docsgraph:related -->

## Submit a ticket

To submit a ticket to Vercel Support, do the following:

1. From your team's dashboard, open **Support** in the sidebar and then click the **New Case** button
2. In the support chat, select the product, then make sure the team the issue is related to is selected in the account dropdown.
3. Start a conversation with the AI support agent.
4. If the AI is unable to resolve your issue, click **Create Support Case** when the AI agent offers it in the chat.
5. The case form opens with the initial details filled out based on your conversation with the AI agent. Here you can edit any fields that need changing.
6. Once you are happy with the case, click **Submit Case**.

The team aims to respond to tickets as described in the [Support Terms](/legal/support-terms#when).

### Create a minimal reproducible example

A minimal reproducible example is the smallest project that still shows your problem. Including one in your case helps Vercel Support find the cause sooner, and building it often shows whether the problem comes from your code or from the platform.

Start from a basic starter template for your framework and add only the code needed to trigger the problem. Check that your example is:

- **Minimal**: Use as little code as possible to show the problem.
- **Self-contained**: Include everything needed to reproduce the problem.
- **Public**: Share the example in a public Git repository, and leave out secrets, sensitive data, and proprietary code. A public repository lets Vercel Support escalate the issue to product engineers.
- **Reproducible**: Confirm that the project builds locally without errors and that the problem appears when you deploy it to Vercel.

Add the repository URL to your case.

## Manage tickets

You can see a list of all support cases, regardless of status, in the **Support** tab. This list shows the ticket name, number, and the status. To view more information about the ticket, click on the ticket name in the list.

### Case correspondence

Each ticket displays all correspondences with the support team. Correspondence on your case is handled both over email and within the case module in the Vercel dashboard. You'll receive notifications about Vercel support responses through email, not within the Vercel dashboard.

### Manage a ticket status

To manage the status of any ticket, do the following:

1. From your team's dashboard, open **Support** in the sidebar
2. Find the ticket from the list and click the ticket name to open it
3. If the ticket was closed, click **Reopen case**. If it was open, click **Close case**. In either scenario, you may want to provide additional information for the support team

### Send attachments to the support team

The support team may request additional logs or other information from you that you'll need to attach to your support ticket. To upload a file, do the following:

1. From your team's dashboard, open **Support** in the sidebar
2. Find the ticket from the list and click the ticket name to open it
3. Click **Attach a File** to bring up your system file dialog. Select the relevant file and click **Upload**

## Other ways to contact Vercel

Some requests don't go through a support case, including requests from people who can't log in or don't have a Vercel account. Use the channel that matches your request:

| Request | Where to go |
| --- | --- |
| You can't log in to your account with any login method | [Account Recovery](/accountrecovery) |
| A site deployed on Vercel contains abusive, malicious, or illegal content | [Report abuse](/abuse) |
| A site deployed on Vercel infringes your copyright or trademark | [Report abuse](/abuse), and select the copyright or trademark option |
| You have a question about Vercel's security, or want to report a vulnerability | [Security support](/contact/security) |
| You want to discuss an Enterprise plan | [Contact Sales](/contact/sales) |
| You want help from other developers who build on Vercel | [Vercel Community](https://community.vercel.com) |

For questions about Next.js or Turborepo, you can also ask in [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions) or [Turborepo GitHub Discussions](https://github.com/vercel/turborepo/discussions).

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
