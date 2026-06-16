---
title: Code Owners
product: vercel
url: /docs/code-owners
canonical_url: "https://vercel.com/docs/code-owners"
last_updated: 2025-03-19
type: conceptual
prerequisites:
  []
related:
  - /docs/code-owners/getting-started
  - /docs/code-owners/code-approvers
summary: Use Code Owners to define users or teams that are responsible for directories and files in your codebase
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/code-owners.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "cee4e791d1162df408efca48da3d0dc3d0436dc90ea3cab10aa3ccf976a64a7a"
---

# Code Owners

> **🔒 Permissions Required**: Code Owners

As a company grows, it can become difficult for any one person to be familiar with the entire codebase. As growing teams start to specialize, it's hard to track which team and members are responsible for any given piece of code. **Code Owners** works with GitHub to let you automatically assign the right developer for the job by implementing features like:

- **Colocated owners files**: Owners files live right next to the code, making it straightforward to find who owns a piece of code right from the context
- **Mirrored organization dynamics**: **Code Owners** mirrors the structure of your organization. Code owners who are higher up in the directory tree act as broader stewards over the codebase and are the fallback if owners files go out of date, such as when developers switch teams
- **Customizable code review algorithms**: **Modifiers** allow organizations to tailor their code review process to their needs. For example, you can assign reviews in a round-robin style, based on who's on call, or to the whole team

## Get Started

Code Owners is only available for use with GitHub.

To get started with Code Owners, follow the instructions on the
[Getting Started](/docs/code-owners/getting-started) page.

## Code Approvers

Code Approvers are a list of [GitHub usernames or teams](https://docs.github.com/en/organizations/organizing-members-into-teams/about-teams) that can review and accept pull request changes to a directory or file.

You can enable Code Approvers by adding a `.vercel.approvers` file to a directory in your codebase. To learn more about how the code approvers file works and the properties it takes, see the [Code Approvers](/docs/code-owners/code-approvers) reference.


---

[View full sitemap](/docs/sitemap)
