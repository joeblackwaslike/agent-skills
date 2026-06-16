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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "6d62f6b5af66318bdb33df919da57dafa999af3024e2eccd7a29af4a0ff17acb"
---

# vercel contract

The `vercel contract` command displays contract commitment information for your Vercel account. It shows details about your contract periods, commitment types, and values.

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
