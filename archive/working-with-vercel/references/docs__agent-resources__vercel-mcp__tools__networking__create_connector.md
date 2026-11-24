---
title: create_connector
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/networking/create_connector
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/create_connector"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/networking
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use create_connector with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/create_connector.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "d8020ff1812ac111b7aafe78367fde3d4d74ffe18875173968fb16b9ffc14b27"
---

# create_connector

Create a connector.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking%2Fcreate_connector&source_site=vercel-docs&relationship=related) — Use create_project with Vercel MCP.
- [Connectors in Vercel Connect](https://vercel.com/docs/connect/concepts/connectors?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking%2Fcreate_connector&source_site=vercel-docs&relationship=related) — A connector is the team-owned record that represents one third-party service. Its type determines which capabilities are
- [join_team](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/join_team?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking%2Fcreate_connector&source_site=vercel-docs&relationship=related) — Use join_team with Vercel MCP.
- [Create or update a connector project connection](https://vercel.com/docs/rest-api/connect/create-or-update-a-connector-project-connection?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking%2Fcreate_connector&source_site=vercel-docs&relationship=related) — POST /v1/connect/connectors/{connector}/projects/{projectId} — Connect a connector to a project, or replace the environm
- [Delete a connector](https://vercel.com/docs/rest-api/connect/delete-a-connector?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking%2Fcreate_connector&source_site=vercel-docs&relationship=related) — DELETE /v1/connect/connectors/{connector} — Delete a connector, its project connections, and its installation records.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/networking/create_connector.graph.md](/docs/agent-resources/vercel-mcp/tools/networking/create_connector.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fnetworking%2Fcreate_connector&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
