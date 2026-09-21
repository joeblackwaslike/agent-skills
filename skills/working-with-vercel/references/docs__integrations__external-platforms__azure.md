---
title: Using Vercel with Microsoft Azure
product: vercel
url: /docs/integrations/external-platforms/azure
canonical_url: "https://vercel.com/docs/integrations/external-platforms/azure"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/integrations
related:
  - /docs/networking/secure-compute
  - /docs/networking/static-ips
  - /docs/functions
  - /docs/oidc
  - /docs/oidc/azure
summary: Run your frontend on Vercel alongside backends hosted in Microsoft Azure, with private network connectivity, keyless authentication through Microsoft...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/external-platforms/azure.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "c912e64dda5dedaca828dc667ad9cb1b7712847d72febf55e5c21d0fa6823458"
---

# Using Vercel with Microsoft Azure

You can run your frontend on Vercel while your APIs, databases, and internal services stay in Microsoft Azure. Vercel connects to Azure at three layers:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can I use Vercel to deploy to a private cloud?](https://vercel.com/kb/guide/can-i-use-vercel-to-deploy-to-a-private-cloud?from=related&source_path=%2Fdocs%2Fintegrations%2Fexternal-platforms%2Fazure&source_site=vercel-docs&relationship=related) — Learn about if it's possible to deploy to a private cloud with Vercel.
- [Vercel Connect now supports Microsoft](https://vercel.com/changelog/vercel-connect-supports-microsoft?from=related&source_path=%2Fdocs%2Fintegrations%2Fexternal-platforms%2Fazure&source_site=vercel-docs&relationship=related)
- [Deploy ASP.NET Core on Vercel with Docker](https://vercel.com/kb/guide/dot-net-asp-net-on-vercel-with-docker?from=related&source_path=%2Fdocs%2Fintegrations%2Fexternal-platforms%2Fazure&source_site=vercel-docs&relationship=related) — Build a .NET application with Docker and deploy it to Vercel Functions. Learn how to configure environment variables, in
- [Behind the scenes of Vercel's infrastructure: Achieving optimal scalability and performance](https://vercel.com/blog/behind-the-scenes-of-vercels-infrastructure?from=related&source_path=%2Fdocs%2Fintegrations%2Fexternal-platforms%2Fazure&source_site=vercel-docs&relationship=related)
- [Building secure and performant web applications on Vercel](https://vercel.com/blog/building-secure-and-performant-web-applications-on-vercel?from=related&source_path=%2Fdocs%2Fintegrations%2Fexternal-platforms%2Fazure&source_site=vercel-docs&relationship=related)
- [Hosting your API on Vercel](https://vercel.com/kb/guide/hosting-backend-apis?from=related&source_path=%2Fdocs%2Fintegrations%2Fexternal-platforms%2Fazure&source_site=vercel-docs&relationship=related) — Learn how to build and scale performant APIs on Vercel.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel?from=related&source_path=%2Fdocs%2Fintegrations%2Fexternal-platforms%2Fazure&source_site=vercel-docs&relationship=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Backends on Vercel](https://vercel.com/docs/frameworks/backend?from=related&source_path=%2Fdocs%2Fintegrations%2Fexternal-platforms%2Fazure&source_site=vercel-docs&relationship=related) — Vercel supports a wide range of the most popular backend frameworks, optimizing how your application builds and runs no
- [Using the Go Runtime with Vercel Functions](https://vercel.com/docs/functions/runtimes/go?from=related&source_path=%2Fdocs%2Fintegrations%2Fexternal-platforms%2Fazure&source_site=vercel-docs&relationship=related) — Learn how to use the Go runtime to run Go APIs on Vercel.
- [How requests flow through Vercel](https://vercel.com/docs/fundamentals/infrastructure?from=related&source_path=%2Fdocs%2Fintegrations%2Fexternal-platforms%2Fazure&source_site=vercel-docs&relationship=related) — Learn how Vercel routes, secures, and serves requests from your users to your application.
- [Networking](https://vercel.com/docs/networking?from=related&source_path=%2Fdocs%2Fintegrations%2Fexternal-platforms%2Fazure&source_site=vercel-docs&relationship=related) — Connect your Vercel projects to backend services with static IPs and secure networking options.

Full cross-link map for this page: [/docs/integrations/external-platforms/azure.graph.md](/docs/integrations/external-platforms/azure.graph.md?from=related&source_path=%2Fdocs%2Fintegrations%2Fexternal-platforms%2Fazure&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- [**Network**](#connect-to-azure-networks): reach Azure resources that restrict access by IP address or accept traffic only from inside your Virtual Network.
- [**Identity**](#authenticate-to-azure-without-stored-credentials): authenticate to Azure services with short-lived Microsoft Entra ID credentials instead of stored secrets.
- [**Source code**](#deploy-from-your-source-code): build and deploy from a repository on GitHub or using Azure DevOps.

## Connect to Azure networks

By default, Vercel deployments can egress from [any IP address](/kb/guide/how-to-allowlist-deployment-ip-address). Using [Secure Compute](/docs/networking/secure-compute) you can give your Vercel projects a dedicated network with a fixed egress surface for IP allowlisting. Additionally, Secure Compute supports direct, private connectivity to your Azure Virtual Network and Azure resources connected to that.

### Allowlist static IP addresses

When your Azure services are reachable over the public internet and only need to know which addresses your traffic comes from, static IPs are enough. Vercel offers two options:

- [**Secure Compute**](/docs/networking/secure-compute): a dedicated, single-tenant network with its own static IP pair, available as an add-on on Enterprise plans. Use this when you also need network isolation or private connectivity.
- [**Static IPs**](/docs/networking/static-ips): a shared static egress pool on Pro and Enterprise plans, without the dedicated network.

Add the resulting IP addresses to the firewall rules of the Azure resource you're calling, such as the firewall on an Azure SQL Database, an Azure Storage account, or an Azure Front Door instance. Keep authentication in place on top of the IP filtering, because the IP addresses alone aren't a sufficient access control.

### Reach private Azure resources

When your Azure resources have no public endpoint, connect your Secure Compute network directly to your Azure Virtual Network. Secure Compute gives you a dedicated network that Vercel runs on your behalf, so Vercel can terminate a site-to-site (S2S) VPN between that network and your Azure VPN Gateway. Additional options with higher bandwidth and lower latency are also available.

Once the connection is established, your [Vercel Functions](/docs/functions) route traffic to private addresses in your Virtual Network. This includes Virtual Machines or Kubernetes clusters deployed in the network. It also includes any Azure service exposed through a [private endpoint from Azure Private Link](https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview): Azure Cosmos DB, Azure SQL Database, Azure Storage, Azure Key Vault, and apps on App Service or Container Apps can all be reached this way.

To scope a connection to your topology and bandwidth requirements, get in touch with our team.

## Authenticate to Azure without stored credentials

Use [OIDC federation](/docs/oidc) so your Vercel deployments authenticate to Microsoft Entra ID with short-lived tokens instead of credentials stored as environment variables. Vercel issues a signed OIDC token to your builds and functions, and workload identity federation exchanges it for an Entra ID access token.

This works for managed Azure services and for APIs you build yourself. Any endpoint that accepts a Microsoft Entra ID access token accepts the credential your deployment obtains, including Azure services like Cosmos DB or Azure Storage, or APIs you host.

Follow [Connect to Microsoft Azure](/docs/oidc/azure) to register the application in Entra ID, add the federated credential, and call an Azure service from your code.

Network connectivity and identity are independent choices. You can use OIDC federation on its own over the public internet, use Secure Compute on its own with another authentication method, or combine both so that a private connection carries a keyless, short-lived credential.

## Deploy from your source code

Vercel builds and deploys from wherever your code lives:

- [**GitHub**](/docs/git/vercel-for-github): connect a repository for automatic [production deployments](/docs/deployments/environments#production-environment) on pushes to your production branch and [preview deployments](/docs/deployments/environments#preview-environment-pre-production) on every other push.
- [**Azure DevOps**](/docs/git/vercel-for-azure-pipelines): use the Vercel Deployment Extension to trigger deployments from Azure Pipelines, whether your code is in Azure Repos or another Git provider connected to your pipeline.


---

[View full sitemap](/docs/sitemap)
