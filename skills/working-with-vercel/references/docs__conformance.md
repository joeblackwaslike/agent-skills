---
title: Introduction to Conformance
product: vercel
url: /docs/conformance
canonical_url: "https://vercel.com/docs/conformance"
last_updated: 2026-02-18
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/getting-started
  - /docs/conformance/rules
  - /docs/conformance/allowlist
  - /docs/conformance/customize
summary: Learn how Conformance improves collaboration, productivity, and software quality at scale.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "d27598581565c5365d859f6ff8746858e945a501218b0a758a7b83fdcadde77f"
---

# Introduction to Conformance

> **🔒 Permissions Required**: Conformance

Conformance provides tools that run automated checks on your code for product critical issues, such as performance, security, and code health. Conformance runs in the development workflow to help you:

- **Prevent issues from being merged into your codebase**: Conformance runs locally and on Continuous Integration (CI) to notify developers early and prevent issues from ever reaching production
- **Learn from expert guidance directly in your development workflow**: Conformance rules were created based on years of experience in large codebases and frontend applications, and with Vercel's deep knowledge of the framework ecosystem
- **Burn down existing issues over time**: Conformance allowlists enable you to identify and allowlist all existing errors, unblocking development and facilitating gradual error fixing over time. Developers can then incrementally improve the codebase when they have the time to work on the issues

## Getting Started

To get started with Conformance, follow the instructions on the
[Getting Started](/docs/conformance/getting-started) page.

## Conformance Rules

Conformance comes with a curated suite of rules that look
for common issues. These rules were created based on the decades of combined
experience that we have building high quality web applications.

You can learn more about the built-in Conformance rules on the
[Conformance Rules](/docs/conformance/rules) page.

## Conformance Allowlists

A core feature in Conformance is the ability to provide allowlists. This mechanism allows organizations to have developers review their conformance violations with an expert on the team before deciding whether it should be allowed. Conformance allowlists can also be added to existing issues, helping to make sure that new code follows the best practices.

Learn more about how this mechanism works on the
[Allowlists](/docs/conformance/allowlist) page.

## Customizing Conformance

Conformance can be customized to meet your repository's
needs. See [Customizing Conformance](/docs/conformance/customize) for more
information.

## More resources

- [Learn how Vercel helps organizations grow with Conformance and Code owners](https://www.youtube.com/watch?v=IFkZz3_7Poo)


---

[View full sitemap](/docs/sitemap)
