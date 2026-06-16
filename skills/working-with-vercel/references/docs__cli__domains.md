---
title: vercel domains
product: vercel
url: /docs/cli/domains
canonical_url: "https://vercel.com/docs/cli/domains"
last_updated: 2026-05-28
type: reference
prerequisites:
  - /docs/cli
related:
  []
summary: Learn how to buy, sell, transfer, and manage your domains using the vercel domains CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/domains.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "559c6070f827434dec8e7a55ebf7aac44beaf70c6d878a14cecab4ccea68de64"
---

# vercel domains

The `vercel domains` command manages domains under the current scope. With it, you can list, inspect, add, remove, purchase, move, transfer in, search, price, and check the availability of domains.

> **💡 Note:** You can manage domains with further options and greater control under a Vercel
> Project's Domains section in the sidebar from the Vercel Dashboard.

## Usage

```bash filename="terminal"
vercel domains ls
```

*Using the \`vercel domains\` command to list all domains
under the current scope.*

## Extended Usage

```bash filename="terminal"
vercel domains inspect [domain]
```

*Using the \`vercel domains\` command to retrieve
information about a specific domain.*

```bash filename="terminal"
vercel domains add [domain] [project]
```

*Using the \`vercel domains\` command to add a domain to
the current scope or a Vercel Project.*

```bash filename="terminal"
vercel domains rm [domain]
```

*Using the \`vercel domains\` command to remove a domain
from the current scope.*

```bash filename="terminal"
vercel domains buy [domain]
```

*Using the \`vercel domains\` command to buy a domain for
the current scope.*

```bash filename="terminal"
vercel domains search [query]
```

*Using the \`vercel domains\` command to discover
domain candidates from a keyword or domain fragment.*

```bash filename="terminal"
vercel domains price [domain] [...domain]
```

*Using the \`vercel domains\` command to return
pricing for one or more domains.*

```bash filename="terminal"
vercel domains check [domain] [...domain]
```

*Using the \`vercel domains\` command to check
availability for one or more domains.*

```bash filename="terminal"
vercel domains move [domain] [scope-name]
```

*Using the \`vercel domains\` command to move a domain to
another scope.*

```bash filename="terminal"
vercel domains transfer-in [domain]
```

*Using the \`vercel domains\` command to transfer in a
domain to the current scope.*

## Unique Options

These are options that only apply to the `vercel domains` command.

### Yes

Use the `--yes` option to bypass the confirmation prompt when removing a domain.

```bash filename="terminal"
vercel domains rm [domain] --yes
```

*Using the \`vercel domains rm\` command with the
\`--yes\` option.*

### Limit

Use the `--limit` option to specify the maximum number of domains that `ls` returns. The default value is `20` and the maximum is `100`.

```bash filename="terminal"
vercel domains ls --limit 100
```

*Using the \`vercel domains ls\` command with the
\`--limit\` option.*

You can also use the `--limit` option with `search` to specify the number of domain candidates to check per page. The default value is `20` and the maximum is `200`.

```bash filename="terminal"
vercel domains search acme --limit 200
```

*Using the \`vercel domains search\` command with the
\`--limit\` option.*

### Next

The `--next` option enables pagination when listing domains. Pass the timestamp (in milliseconds since the UNIX epoch) from a previous response to get the next page of results.

```bash filename="terminal"
vercel domains ls --next 1584722256178
```

*Using the \`vercel domains ls\` command with the
\`--next\` option for pagination.*

You can also use the `--next` option with `search` to fetch the next page of candidates. Pass the cursor returned in the previous search response or printed in the continuation command.

```bash filename="terminal"
vercel domains search acme --next [cursor]
```

*Using the \`vercel domains search\` command with the
\`--next\` option for pagination.*

### Force

The `--force` option forces a domain on a project, removing it from an existing one.

```bash filename="terminal"
vercel domains add my-domain.com my-project --force
```

*Using the \`vercel domains add\` command with the
\`--force\` option.*

### Available

Use the `--available` option with `search` to show only domain candidates that are available to register.

```bash filename="terminal"
vercel domains search acme --available
```

*Using the \`vercel domains search\` command with the
\`--available\` option.*

### Order

Use the `--order` option with `search` to order candidates by `relevance`, `alphabetical`, or `length`. The default value is `relevance`.

```bash filename="terminal"
vercel domains search acme --order alphabetical
```

*Using the \`vercel domains search\` command with the
\`--order\` option.*

### TLD

Use the `--tld` option with `search` to filter candidates by exact top-level domain. Repeat the option to search multiple TLDs.

```bash filename="terminal"
vercel domains search acme --tld com --tld dev
```

*Using the \`vercel domains search\` command with the
\`--tld\` option.*

### Format

Use the `--format=json` option with `search` to return structured JSON output.

```bash filename="terminal"
vercel domains search acme --format=json
```

*Using the \`vercel domains search\` command with the
\`--format=json\` option.*


---

[View full sitemap](/docs/sitemap)
