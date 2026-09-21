---
title: AWS PrivateLink
product: vercel
url: /docs/networking/privatelink
canonical_url: "https://vercel.com/docs/networking/privatelink"
last_updated: 2026-09-15
type: reference
prerequisites:
  - /docs/networking
related:
  - /docs/networking/static-ips
  - /docs/networking/secure-compute
  - /docs/projects
  - /docs/routing-middleware
  - /docs/glossary
summary: Connect Vercel deployments to AWS-hosted backends through AWS PrivateLink endpoint services without using the public internet.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/networking/privatelink.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "cb63962860286d0d2251c98afdf11619da071ff9dbccecda28c73654e7db6bf7"
---

# AWS PrivateLink

With PrivateLink, you can connect your Vercel deployments to AWS-hosted backend services over a private connection, without exposing traffic to the public internet. [Get started](#getting-started) by creating a PrivateLink connection.

## When to use PrivateLink

- Connect privately to AWS-hosted databases such as Amazon RDS, Aurora, Neon, or Redshift
- Connect to SaaS services that expose a PrivateLink endpoint (e.g. Snowflake, MongoDB Atlas, Confluent)
- Access internal services exposed through an AWS Network Load Balancer
- Connect to S3 or DynamoDB without traversing the public internet
- Meet security and compliance requirements (SOC 2, HIPAA, GDPR) that prohibit public network exposure

## When not to use PrivateLink

PrivateLink only connects to services that have published an AWS PrivateLink endpoint service. If your backend is on-premises, in another cloud, or hasn't been exposed via PrivateLink, use [Static IPs](/docs/networking/static-ips) with allowlisting or Secure Compute with [VPC peering](/docs/networking/secure-compute#vpc-peering) / [VPN](/docs/networking/secure-compute#vpn-support) instead.

## How it works

When you create a PrivateLink connection, Vercel:

- **Provisions a dedicated VPC endpoint** in the shared network for your team, in 2 Availability Zones supported by the target service
- **Routes all outbound traffic** to that service through the endpoint, keeping it on the AWS private network
- **Assigns a dedicated AWS IAM role** to your team that the service provider can allowlist as a connection principal
- **Tracks data transfer per connection** so you can see usage broken down by service

Both deployed function traffic and build traffic can route through PrivateLink connections, with the same configuration model as Static IPs.

### Supported endpoint types

- **Interface Endpoints**: Used for services exposed behind an AWS Network Load Balancer, as well as AWS services like S3 and DynamoDB that publish interface endpoint services

Gateway Endpoints, Gateway Load Balancer Endpoints, and Resource Endpoints are not currently supported.

## Getting started

Follow these steps to create your first PrivateLink connection.

### Prerequisites

Before you start, confirm you have:

- A [Vercel project](/docs/projects) on a team with **Advanced Networking** enabled
- An AWS PrivateLink endpoint service you can connect to, either one that accepts all principals or one where an IAM role ARN can be added to the allowlist
- The **service name** (for example `com.amazonaws.vpce.<region>.vpce-svc-…`) and **AWS Region** from the provider

- ### Create the connection in Vercel
  1. From your project, navigate to **Settings** → **Networking** → **Advanced Networking** → [**AWS PrivateLink**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fnetworking%2Fadvanced%2Fprivate-link\&title=AWS+PrivateLink)
  2. Click **Add Connection**
  3. Enter a **Name** for the connection, select the **Region**, and enter the **Service Name** from the provider
  4. Optionally, enable **Private DNS** to resolve the service's own private DNS names (for example, a provider-specific hostname) from your deployments
  5. Click **Add Connection**

- ### Wait for the provider to accept the connection
  Vercel provisions the VPC endpoint and requests a connection to the endpoint service. If the service doesn't automatically accept connections, the endpoint stays in a **pending acceptance** state until the provider approves it. Share your team's **principal role ARN** (shown in the setup dialog) with the provider so they can allowlist it.

- ### Verify traffic
  Once the endpoint is available, redeploy your project and confirm requests to the backend succeed over the PrivateLink connection.

## Managing PrivateLink

### Routing Middleware support

PrivateLink connections are region-specific and do not apply to [Routing Middleware](/docs/routing-middleware), which runs at the [edge](/docs/glossary#edge).

### DNS

Each endpoint's DNS names are shown in the dashboard once the connection is available. You can connect in two ways:

- **AWS endpoint DNS names**: Use the AWS-generated `vpce-….vpce.amazonaws.com` hostnames listed on the endpoint. These resolve to the endpoint from your deployments without additional configuration.
- **Private DNS**: If you enable Private DNS on the connection, your deployments can also resolve the service's own private DNS names (for example, a provider-specific hostname) to the endpoint. Vercel resolves these names inside its network for your project's deployments.

### PrivateLink with deployment environments

Assigning a PrivateLink connection to a project applies to all environments in that project. Per-environment scoping is not supported.

### Regional considerations

- Each PrivateLink connection exists in a single AWS region. Create one connection per region when you need multi-region access.
- For multi-region private connectivity, each region needs its own VPC endpoint to the service, which means the service must either be available in every matching region or support cross-region PrivateLink connections.
- The endpoint service must be available in at least two Availability Zones that overlap with Vercel's network in that region. If there isn't enough overlap, provisioning fails. Ask your provider to expose the service in additional zones.
- Pick regions close to your provider to reduce latency.

## Limitations

- **Isolation**: Each connection is dedicated to your team, but the underlying VPC is shared with other customers. For full isolation, use Secure Compute.
- **Services** must publish an AWS PrivateLink endpoint service and either accept all principals or allowlist your team's IAM role.
- **Project-level configuration**: You cannot limit a connection to a single deployment environment inside a project.
- **Endpoint types**: Only interface endpoints are supported.


---

[View full sitemap](/docs/sitemap)
