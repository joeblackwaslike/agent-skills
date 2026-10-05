---
title: Domains and DNS
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/domains
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  - /docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote
  - /docs/agent-resources/vercel-mcp/tools/billing/buy_domain
summary: Vercel MCP tools for domains and dns.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "d6b07d95ad2277c2107ddd032ec25ea90af1b0752a6d4b159f0e4679febfa839"
---

# Domains and DNS

Check domain availability and pricing, then manage domains connected to your account or team. You can inspect and update DNS records, manage certificates, and track domain orders or contact verification.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Working with domains](https://vercel.com/docs/domains/working-with-domains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains&source_site=vercel-docs&relationship=related) — Learn how domains work and the options Vercel provides for managing them.
- [Get availability for multiple domains](https://vercel.com/docs/rest-api/domains-registrar/get-availability-for-multiple-domains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains&source_site=vercel-docs&relationship=related) — POST /v1/registrar/domains/availability — Get availability for multiple domains. If the domains are available, they can
- [Get price data for multiple domains](https://vercel.com/docs/rest-api/domains-registrar/get-price-data-for-multiple-domains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains&source_site=vercel-docs&relationship=related) — POST /v1/registrar/domains/price — Get price data for multiple domains in a single request.
- [Get Domain Availability and Pricing](https://vercel.com/docs/rest-api/domains-registrar/get-domain-availability-and-pricing?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains&source_site=vercel-docs&relationship=related) — POST /v1/registrar/domains/search — Start domain research here. Get registration availability and pricing for 1–200 exac
- [Programmatic Domain Management](https://vercel.com/docs/domains/registrar-api?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains&source_site=vercel-docs&relationship=related) — Programmatically search, price, purchase, renew, and manage domains with Vercel's domains registrar API endpoints.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains.graph.md](/docs/agent-resources/vercel-mcp/tools/domains.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdomains&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `buy_domains`

Register domains individually with [`get_purchase_quote`](/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote) and [`buy_domain`](/docs/agent-resources/vercel-mcp/tools/billing/buy_domain). This tool does not execute purchases.

## `buy_single_domain`

To register a domain, use [`get_purchase_quote`](/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote) followed by [`buy_domain`](/docs/agent-resources/vercel-mcp/tools/billing/buy_domain). This tool does not execute purchases.

## `create_or_transfer_domain`

Add an existing domain to the Vercel platform.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | Yes      | Request body for this tool. |

## `get_bulk_availability`

Get availability for multiple domains.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `teamId`      | string | No       | Team ID.                    |
| `requestBody` | object | Yes      | Request body for this tool. |

## `get_contact_info_schema`

Get contact info schema.

## Parameters

| Parameter | Type   | Required | Description         |
| --------- | ------ | -------- | ------------------- |
| `domain`  | string | Yes      | A valid domain name |
| `teamId`  | string | No       | Team ID.            |

## `get_domain_availability`

Check whether a domain is available to register.

| Parameter | Type   | Required | Description         |
| --------- | ------ | -------- | ------------------- |
| `domain`  | string | Yes      | A valid domain name |
| `teamId`  | string | No       | Team ID.            |

## `get_domain_contact_verification`

Get contact verification status for a domain.

## Parameters

| Parameter | Type   | Required | Description         |
| --------- | ------ | -------- | ------------------- |
| `domain`  | string | Yes      | A valid domain name |
| `teamId`  | string | No       | Team ID.            |

## `get_domain_price`

Get current domain pricing. For a purchase, use `get_purchase_quote` to obtain the price and confirmation details.

| Parameter | Type   | Required | Description                                                                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `domain`  | string | Yes      | A valid domain name                                                                                              |
| `years`   | string | No       | The number of years to get the price for. If not provided, the minimum number of years for the TLD will be used. |
| `teamId`  | string | No       | Team ID.                                                                                                         |

**Sample prompt:** "Is example.com available, and what does it cost to register?"

## `get_domains_records_by_record_id`

Get a DNS record by ID.

## Parameters

| Parameter  | Type   | Required | Description                     |
| ---------- | ------ | -------- | ------------------------------- |
| `recordId` | string | Yes      | The unique ID of the DNS record |
| `teamId`   | string | No       | Team ID.                        |

## `get_order`

Get a domain order.

## Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| `orderId` | string | Yes      | A valid order ID |
| `teamId`  | string | No       | Team ID.         |

## `get_tld`

Get TLD.

## Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| `tld`     | string | Yes      | A valid TLD name |
| `teamId`  | string | No       | Team ID.         |

## `get_tld_price`

Get TLD price data.

## Parameters

| Parameter | Type   | Required | Description                                                                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `tld`     | string | Yes      | A valid TLD name                                                                                                 |
| `years`   | string | No       | The number of years to get the price for. If not provided, the minimum number of years for the TLD will be used. |
| `teamId`  | string | No       | Team ID.                                                                                                         |

## `issue_cert`

Issue a new cert.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |

## `list_certs`

Get certs.

## Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `teamId`  | string | No       | Team ID.    |
| `slug`    | string | No       | Team slug.  |

## `list_domains`

List all the domains.

## Parameters

| Parameter | Type   | Required | Description                                           |
| --------- | ------ | -------- | ----------------------------------------------------- |
| `limit`   | number | No       | Maximum number of domains to list from a request.     |
| `since`   | number | No       | Get domains created after this JavaScript timestamp.  |
| `until`   | number | No       | Get domains created before this JavaScript timestamp. |
| `teamId`  | string | No       | Team ID.                                              |
| `slug`    | string | No       | Team slug.                                            |

## `list_supported_tlds`

Get supported TLDs.

## Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `teamId`  | string | No       | Team ID.    |

## `replace_domains_by_domain_records`

Replace DNS records for a domain.

## Parameters

| Parameter     | Type   | Required | Description                           |
| ------------- | ------ | -------- | ------------------------------------- |
| `domain`      | string | Yes      | The domain name                       |
| `teamId`      | string | No       | Team ID.                              |
| `requestBody` | string | Yes      | DNS records in BIND zone-file format. |

## `update_record`

Update an existing DNS record.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `recordId`    | string | Yes      | The id of the DNS record    |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | Yes      | Request body for this tool. |

## `upload_cert`

Upload a cert.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
