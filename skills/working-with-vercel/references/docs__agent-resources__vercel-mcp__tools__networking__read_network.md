---
title: read_network
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/networking/read_network
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/read_network"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/networking
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use read_network with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/read_network.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "4117e564e5e87f7960f5c245909625e282130e192a7fb0e19bb68b5ef235a55a"
---

# read_network

Read a Secure Compute network.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_network](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/update_network?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking%2Fread_network&source_site=vercel-docs&relationship=related) — Use update_network with Vercel MCP.
- [Read a Secure Compute network](https://vercel.com/docs/rest-api/networking/read-a-secure-compute-network?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking%2Fread_network&source_site=vercel-docs&relationship=related) — GET /v1/connect/networks/{networkId} — Allows to read a Secure Compute network.
- [Delete a Secure Compute network](https://vercel.com/docs/rest-api/networking/delete-a-secure-compute-network?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking%2Fread_network&source_site=vercel-docs&relationship=related) — DELETE /v1/connect/networks/{networkId} — Allows to delete a Secure Compute network.
- [Update a Secure Compute network](https://vercel.com/docs/rest-api/networking/update-a-secure-compute-network?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking%2Fread_network&source_site=vercel-docs&relationship=related) — PATCH /v1/connect/networks/{networkId} — Allows to update a Secure Compute network.
- [List Secure Compute networks](https://vercel.com/docs/rest-api/networking/list-secure-compute-networks?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking%2Fread_network&source_site=vercel-docs&relationship=related) — GET /v1/connect/networks — Allows to list Secure Compute networks.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/networking/read_network.graph.md](/docs/agent-resources/vercel-mcp/tools/networking/read_network.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking%2Fread_network&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                         |
| ----------- | ------ | -------- | --------------------------------------------------- |
| `networkId` | string | Yes      | The unique identifier of the Secure Compute network |
| `teamId`    | string | No       | Team ID.                                            |
| `slug`      | string | No       | Team slug.                                          |


---

[View full sitemap](/docs/sitemap)
