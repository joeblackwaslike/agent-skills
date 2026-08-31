---
title: vercel contract
product: vercel
url: /docs/cli/contract
canonical_url: "https://vercel.com/docs/cli/contract"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  []
summary: Learn how to view contract commitment information for your Vercel account using the vercel contract CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/contract.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "c4760b80233296d562f1802a5da8fb2fa12239412dd2834e7767eb9237560ca1"
---

# vercel contract

The `vercel contract` command displays contract commitment information for your Vercel account. It shows details about your contract periods, commitment types, and values.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List FOCUS contract commitments](https://vercel.com/docs/rest-api/billing/list-focus-contract-commitments?from=related&source_path=%2Fdocs%2Fcli%2Fcontract&source_site=vercel-docs&relationship=related) — GET /v1/billing/contract-commitments — Returns commitment allocations per contract period in FOCUS v1.3 JSONL format for
- [vercel usage](https://vercel.com/docs/cli/usage?from=related&source_path=%2Fdocs%2Fcli%2Fcontract&source_site=vercel-docs&relationship=related) — Learn how to view billing usage and costs, for your Vercel account using the vercel usage CLI command.
- [vercel help](https://vercel.com/docs/cli/help?from=related&source_path=%2Fdocs%2Fcli%2Fcontract&source_site=vercel-docs&relationship=related) — Learn how to use the vercel help CLI command to get information about all available Vercel CLI commands.
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Fcontract&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel buy](https://vercel.com/docs/cli/buy?from=related&source_path=%2Fdocs%2Fcli%2Fcontract&source_site=vercel-docs&relationship=related) — Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.

Full cross-link map for this page: [/docs/cli/contract.graph.md](/docs/cli/contract.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fcontract&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel contract
```

*Using the \`vercel contract\` command to view all
contract commitments.*

The command outputs a table grouped by contract ID showing:

| Field               | Description                                              |
| ------------------- | -------------------------------------------------------- |
| **Contract ID**     | The unique identifier for each contract                  |
| **Contract Period** | The start and end dates of the contract                  |
| **Commitment Type** | The type of commitment (e.g., spend or usage-based)      |
| **Category**        | Either "Spend" (Pro plans) or "Usage" (Enterprise plans) |
| **Period**          | The commitment period                                    |
| **Commitment**      | The committed value                                      |
| **Description**     | Additional details about the commitment                  |

## Unique options

These are options that only apply to the `vercel contract` command.

### Format

The `--format` option, shorthand `-F`, specifies the output format. Currently, `json` is the only supported format option.

```bash filename="terminal"
vercel contract --format json
```

*Using the \`vercel contract\` command to output contract
data as JSON.*

The JSON output includes:

- `context`: The user or team context
- `commitments`: An array of contract commitments with full details
- `totalCount`: The total number of commitments


---

[View full sitemap](/docs/sitemap)
