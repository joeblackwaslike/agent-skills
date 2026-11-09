---
title: vercel billing contract
product: vercel
url: /docs/cli/contract
canonical_url: "https://vercel.com/docs/cli/contract"
last_updated: 2026-10-30
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/plans/enterprise
  - /docs/cli/global-options
summary: Learn how to view contract commitment information for your Vercel account using the vercel billing contract CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/contract.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "0f5b7f93aac0495e4f338295e52681f03207e0660e01d74146d3fcb6c0246d25"
---

# vercel billing contract

The `vercel billing contract` command displays contract commitment information for your Vercel account. It shows details about your contract periods, commitment types, and values.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel billing](https://vercel.com/docs/cli/billing) — Learn how to view usage, contracts, budgets, and invoices for your Vercel team using the vercel billing CLI command.
- [vercel billing usage](https://vercel.com/docs/cli/usage) — Learn how to view billing usage and costs, for your Vercel account using the vercel billing usage CLI command.
- [List FOCUS contract commitments](https://vercel.com/docs/rest-api/billing/list-focus-contract-commitments) — GET /v1/billing/contract-commitments — Returns commitment allocations per contract period in FOCUS v1.3 JSONL format for
- [list_contract_commitments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/list_contract_commitments) — Use list_contract_commitments with Vercel MCP.
- [vercel pricing](https://vercel.com/docs/cli/pricing) — Look up Hobby, Pro, and Enterprise features from the public Vercel pricing table using the CLI.

Full cross-link map for this page: [/docs/cli/contract.graph.md](/docs/cli/contract.graph.md)
<!-- /docsgraph:related -->

Contract commitments are part of an [Enterprise](/docs/plans/enterprise) contract. If your team is on another plan, the command has no commitments to show.

## Usage

```bash filename="terminal"
vercel billing contract
```

*Using the \`vercel billing contract\` command to view all
contract commitments.*

The command outputs a table grouped by contract ID showing:

| Field               | Description                                              |
| ------------------- | -------------------------------------------------------- |
| **Contract ID**     | The unique identifier for each contract                  |
| **Contract Period** | The start and end dates of the contract                  |
| **Type**            | The plan the commitment belongs to: `Enterprise`         |
| **Category**        | The kind of commitment: `Usage`                          |
| **Period**          | The commitment period                                    |
| **Commitment**      | The committed value                                      |
| **Description**     | Additional details about the commitment                  |

## Unique options

These are options that only apply to the `vercel billing contract` command.

### JSON

The `--json` option prints the contract data as a single JSON object on stdout instead of a table.

```bash filename="terminal"
vercel billing contract --json
```

*Using the \`vercel billing contract\` command to output contract
data as JSON.*

The JSON output includes:

- `context`: The account or team name
- `commitments`: An array of contract commitments with full details
- `totalCommitments`: The total number of commitments

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel billing contract` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
