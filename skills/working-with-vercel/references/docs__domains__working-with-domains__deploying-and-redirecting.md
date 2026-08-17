---
title: Deploying & Redirecting Domains
product: vercel
url: /docs/domains/working-with-domains/deploying-and-redirecting
canonical_url: "https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting"
last_updated: 2026-07-23
type: how-to
prerequisites:
  - /docs/domains/working-with-domains
  - /docs/domains
related:
  - /docs/deployments/environments
  - /docs/git
  - /docs/domains/working-with-domains
  - /docs/projects
  - /docs/cdn
summary: Learn how to deploy your domains and set up domain redirects with this guide.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "170a2b5a4c6ec60159ad1befcebb379a142804bb35272ead79c6bb25e5b906cb"
---

# Deploying & Redirecting Domains

## Deploying your Domain


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can I use my domain on Vercel with A records?](https://vercel.com/kb/guide/a-record-and-caa-with-vercel?from=related) — Point your apex domain to Vercel with an A record \(76.76.21.21 or your domain card's value\), pair it with a www CNAME,
- [How do I add a custom domain to my Vercel project?](https://vercel.com/kb/guide/how-do-i-add-a-custom-domain-to-my-vercel-project?from=related) — Learn how to add a custom domain to your Vercel project.
- [Why do my Vercel deployments have multiple domains?](https://vercel.com/kb/guide/why-do-my-vercel-deployments-have-multiple-domains?from=related) — Learn about why Vercel auto generates URLs for your deployments.
- [Transferring Domains to Vercel](https://vercel.com/kb/guide/transferring-domains-to-vercel?from=related) — How to transfer your domain to Vercel.
- [Avoiding duplicate-content SEO with vercel.app URLs and custom domains](https://vercel.com/kb/guide/avoiding-duplicate-content-with-vercel-app-urls?from=related) — Discover why search engines may treat your vercel.app URL and custom domain as separate pages, and how to consolidate ra
- [Adding a Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain?from=related) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [Set Up Custom Domain](https://vercel.com/docs/domains/set-up-custom-domain?from=related) — Add and configure a custom domain for your Vercel project using the CLI.
- [Deploy from CLI](https://vercel.com/docs/projects/deploy-from-cli?from=related) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Manage Redirects at Scale](https://vercel.com/docs/routing/redirects/manage-redirects-at-scale?from=related) — Add, bulk upload, version, and roll back project-level redirects using the CLI.
- [vercel redirects](https://vercel.com/docs/cli/redirects?from=related) — Learn how to manage project-level redirects using the vercel redirects CLI command.

Full cross-link map for this page: [/docs/domains/working-with-domains/deploying-and-redirecting.graph.md](/docs/domains/working-with-domains/deploying-and-redirecting.graph.md)
<!-- /docsgraph:related -->

Once the domain has been added to your project and configured, it is **automatically applied to your latest production deployment**.

> **💡 Note:** The [first deployment](/docs/deployments/environments#first-deployment) of a
> new project is always a production deployment. Vercel then assigns your custom
> domain to that deployment automatically.

When you assign a custom domain to a project that's using [Git](/docs/git), each push (including merges) that you make to the [production branch](/docs/git#production-branch) (commonly `main`) will trigger a deployment to the domain.

When you assign a domain to a *different* branch, you'll need to make a new deployment to the desired branch for the domain to resolve correctly.

Reverts take effect immediately, assigning the **Custom Domain** to the deployment made prior to the point the revert is effective from.

## Redirecting domains

You can add domain redirects from the **Domains** section in the sidebar when more than one domain is present in the project. This provides a way to, for example, redirect a `www` **subdomain** to an **apex domain**, but can be used in a variety of ways.

> **💡 Note:** If a user visits your domain with or without the "www" subdomain prefix, we
> will attempt to redirect automatically. You might still want to add this
> redirect explicitly.

To add a redirect, open **Domains** in the sidebar within **Project Settings**, then select **Edit** on the domain you want to redirect from. Use the **Redirect to** dropdown to select the domain you want to redirect to:

![Image](`/docs-assets/static/docs/domains/redirect-domain-light.png`)

*A domain redirect that redirects requests made to \`www.acme.com\` to
\`acme.com\`.*

## Redirecting `www` domains

Adding an [apex domain](/docs/domains/working-with-domains#apex-domain) to a [Project](/docs/projects) on Vercel will automatically suggest adding its `www` counterpart. Using both of these domains ensures that visitors can always access your site, regardless of whether or not they use `www` when entering the URL.

We recommend using the `www` subdomain as your primary domain, with a redirect from the non-`www` domain to it. This allows the [Vercel CDN](/docs/cdn) more control over incoming traffic for improved reliability, speed, and security. The redirect is also cached on visitor's browsers for faster subsequent visits.

Some browsers like Google Chrome automatically hide the `www` subdomain from the address bar, so this redirect may not affect your URL appearance.

Choosing to redirect the `www` domain to the non-`www` also works but provides Vercel less control over incoming traffic. Alternatively, you can choose to add only the domain you typed.

## Additional technical information about Domain redirects

The DNS spec forbids using CNAME records on apex domains like `example.com`. They are, however, allowed for subdomains like `www.example.com`. This is why Vercel recommends primarily using a `www` domain with a CNAME record, and adding a redirect from the non-`www` domain to it.

Using CNAME instead of A records ensures that domains on Vercel are fast, reliable, and fault-tolerant. Unlike A records, CNAME records avoid hard-coding a specific IP address in favor of an additional lookup at the DNS level. This means that Vercel can quickly steer traffic in the case of DDoS attacks or for performance optimizations.

While we recommend using `www` as described above, Vercel maximizes the reliability and performance of your apex domain if you choose to use it as your primary domain by leveraging the [Anycast methodology](https://en.wikipedia.org/wiki/Anycast). This means Vercel still supports geographically routed traffic at infinite scale if you use an A record.

## Programmatic redirects

You can also add redirects programmatically using frameworks and Vercel Functions. [Learn more](/docs/routing/redirects).


---

[View full sitemap](/docs/sitemap)
