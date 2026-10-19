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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "0bce05216ae1c89d30fbc8335ebb12cc58585c30216ebd396aff1e8a0f56e1fa"
---

# Domains and DNS

Check domain availability and pricing, then manage domains connected to your account or team. You can inspect and update DNS records, manage certificates, and track domain orders or contact verification.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Billing and Purchases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing) — Vercel MCP tools for billing and purchases.
- [Working with domains](https://vercel.com/docs/domains/working-with-domains) — Learn how domains work and the options Vercel provides for managing them.
- [Create a DNS record](https://vercel.com/docs/rest-api/dns/create-a-dns-record) — POST /v2/domains/{domain}/records — Creates a DNS record for a domain.
- [Get price data for multiple domains](https://vercel.com/docs/rest-api/domains-registrar/get-price-data-for-multiple-domains) — POST /v1/registrar/domains/price — Get price data for multiple domains in a single request.
- [Get Domain Verification Record](https://vercel.com/docs/rest-api/domains/get-domain-verification-record) — GET /v9/domains/{domain}/verification — Get the TXT verification record needed to claim ownership of a domain for the au

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/domains.graph.md](/docs/agent-resources/vercel-mcp/tools/domains.graph.md)
<!-- /docsgraph:related -->

## `buy_domains`

Register domains individually with [`get_purchase_quote`](/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote) and [`buy_domain`](/docs/agent-resources/vercel-mcp/tools/billing/buy_domain). This tool does not execute purchases.

## `buy_single_domain`

To register a domain, use [`get_purchase_quote`](/docs/agent-resources/vercel-mcp/tools/billing/get_purchase_quote) followed by [`buy_domain`](/docs/agent-resources/vercel-mcp/tools/billing/buy_domain). This tool does not execute purchases.

## `check_domain_availability_and_price`

Check if domain names are available for purchase and get pricing information

## Parameters

| Parameter | Type             | Required | Default | Description                                                                         |
| --------- | ---------------- | -------- | ------- | ----------------------------------------------------------------------------------- |
| `names`   | Array\<string> | Yes      | -       | Array of domain names to check availability for (e.g., \["example.com", "test.org"]) |

## `create_or_transfer_domain`

Add an existing domain to the Vercel platform.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

## `create_record`

Creates a DNS record for a domain.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `domain`      | string | Yes      | The domain used to create the DNS record.                   |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

## `get_bulk_availability`

Get availability for multiple domains.

## Parameters

| Parameter     | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation. |
| `requestBody` | object | Yes      | Request body for this tool.        |

## `get_bulk_price`

Get price data for multiple domains in a single request.

## Parameters

| Parameter     | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation. |
| `requestBody` | object | Yes      | Request body for this tool.        |

## `get_cert_by_id`

Read certificate metadata by its ID. The response does not include the private key.

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `id`      | string | Yes      | The cert id                                                 |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_contact_info_schema`

Get contact info schema.

## Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| `domain`  | string | Yes      | A valid domain name                |
| `teamId`  | string | No       | Team ID to use for this operation. |

## `get_domain`

Get information for a single domain in an account or team.

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `domain`  | string | Yes      | The name of the domain.                                     |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_domain_availability`

Check whether a domain is available to register.

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| `domain`  | string | Yes      | A valid domain name                |
| `teamId`  | string | No       | Team ID to use for this operation. |

## `get_domain_config`

Get a Domain's configuration.

## Parameters

| Parameter         | Type   | Required | Description                                                                                                                                                                                                                                                                                         |
| ----------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domain`          | string | Yes      | The name of the domain.                                                                                                                                                                                                                                                                             |
| `projectIdOrName` | string | No       | The project id or name that will be associated with the domain. Use this when the domain is not yet associated with a project.                                                                                                                                                                      |
| `strict`          | string | No       | When true, the response will only include the nameservers assigned directly to the specified domain. When false and there are no nameservers assigned directly to the specified domain, the response will include the nameservers of the domain's parent zone. Allowed values: `"true"`, `"false"`. |
| `teamId`          | string | No       | Team ID to use for this operation.                                                                                                                                                                                                                                                                  |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                                                                                                                                         |

## `get_domain_contact_verification`

Get contact verification status for a domain.

## Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| `domain`  | string | Yes      | A valid domain name                |
| `teamId`  | string | No       | Team ID to use for this operation. |

## `get_domain_price`

Get current domain pricing. For a purchase, use `get_purchase_quote` to obtain the price and confirmation details.

| Parameter | Type   | Required | Description                                                                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `domain`  | string | Yes      | A valid domain name                                                                                              |
| `years`   | string | No       | The number of years to get the price for. If not provided, the minimum number of years for the TLD will be used. |
| `teamId`  | string | No       | Team ID to use for this operation.                                                                               |

**Sample prompt:** "Is example.com available, and what does it cost to register?"

## `get_domain_project_domains`

List all project domains associated with an apex domain owned by the authenticated account.

## Parameters

| Parameter | Type   | Required | Description                                                   |
| --------- | ------ | -------- | ------------------------------------------------------------- |
| `domain`  | string | Yes      | The apex domain name.                                         |
| `limit`   | number | No       | Maximum number of project domains to list from a request.     |
| `since`   | number | No       | Get project domains created after this JavaScript timestamp.  |
| `until`   | number | No       | Get project domains created before this JavaScript timestamp. |
| `teamId`  | string | No       | Team ID to use for this operation.                            |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId.   |

## `get_domain_verification_record`

Get the TXT verification record needed to claim ownership of a domain for the authenticated team. The caller must add this TXT record to `_vercel.{domain}` in their DNS configuration, then call POST /domains/:domain/claim to complete the ownership transfer.

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `domain`  | string | Yes      | The domain name to get the verification record for          |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_domains_records_by_record_id`

Get a DNS record by ID.

## Parameters

| Parameter  | Type   | Required | Description                        |
| ---------- | ------ | -------- | ---------------------------------- |
| `recordId` | string | Yes      | The unique ID of the DNS record    |
| `teamId`   | string | No       | Team ID to use for this operation. |

## `get_order`

Get a domain order.

## Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| `orderId` | string | Yes      | A valid order ID                   |
| `teamId`  | string | No       | Team ID to use for this operation. |

## `get_records`

Retrieves a list of DNS records created for a domain name. By default it returns 20 records if no limit is provided. The rest can be retrieved using the pagination options.

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `domain`  | string | Yes      | The domain name.                                            |
| `limit`   | string | No       | Maximum number of records to list from a request.           |
| `since`   | string | No       | Get records created after this JavaScript timestamp.        |
| `until`   | string | No       | Get records created before this JavaScript timestamp.       |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_tld`

Get TLD.

## Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| `tld`     | string | Yes      | A valid TLD name                   |
| `teamId`  | string | No       | Team ID to use for this operation. |

## `get_tld_price`

Get TLD price data.

## Parameters

| Parameter | Type   | Required | Description                                                                                                      |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `tld`     | string | Yes      | A valid TLD name                                                                                                 |
| `years`   | string | No       | The number of years to get the price for. If not provided, the minimum number of years for the TLD will be used. |
| `teamId`  | string | No       | Team ID to use for this operation.                                                                               |

## `issue_cert`

Issue a new cert.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `list_certs`

Get certs.

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_domains`

List all the domains.

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `limit`   | number | No       | Maximum number of domains to list from a request.           |
| `since`   | number | No       | Get domains created after this JavaScript timestamp.        |
| `until`   | number | No       | Get domains created before this JavaScript timestamp.       |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_supported_tlds`

Get supported TLDs.

## Parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| `teamId`  | string | No       | Team ID to use for this operation. |

## `replace_domain_dns_records`

Replace DNS records for a domain.

## Parameters

| Parameter     | Type   | Required | Description                           |
| ------------- | ------ | -------- | ------------------------------------- |
| `domain`      | string | Yes      | The domain name                       |
| `teamId`      | string | No       | Team ID to use for this operation.    |
| `requestBody` | string | Yes      | DNS records in BIND zone-file format. |

## `search_domains`

Check availability and registration and renewal prices for one to 200 exact domain names. This lookup does not reserve or purchase domains.

## Parameters

| Parameter     | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation. |
| `requestBody` | object | Yes      | Request body for this tool.        |

## `update_record`

Update an existing DNS record.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `recordId`    | string | Yes      | The id of the DNS record                                    |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)
