---
source: "https://cursor.com/docs/plugins.md"
fetched_at: "2026-07-13T06:55:43.454Z"
sha256: "a04ce36f0724c0b0579e993ed8cd9344c815decfd5146c0eb60a355eb151afb0"
---

# Plugins

Plugins package rules, skills, agents, commands, MCP servers, and hooks into distributable bundles. Install and manage them from the [Customize](https://cursor.com/docs/customize-cursor.md) page or browse official plugins in the [Cursor Marketplace](/marketplace). For community plugins and MCP servers, browse [cursor.directory](https://cursor.directory). You can also [build your own](https://cursor.com/docs/plugins.md#creating-plugins) to share with other developers.

## What plugins contain

A plugin can bundle any combination of these components:

| Component       | Description                                                |
| :-------------- | :--------------------------------------------------------- |
| **Rules**       | Persistent AI guidance and coding standards (`.mdc` files) |
| **Skills**      | Specialized agent capabilities for complex tasks           |
| **Agents**      | Custom agent configurations and prompts                    |
| **Commands**    | Agent-executable command files                             |
| **MCP Servers** | Model Context Protocol integrations                        |
| **Hooks**       | Automation scripts triggered by events                     |

## Plugin canvases

Plugins now ship with prebuilt **canvases**: shared setup templates your team can open and reuse.

- **Hex Canvas** — Build data visualizations. At Cursor, we use the Hex Canvas to explore and share analytics.
- **Atlassian Canvas** — See a realtime view of your issues, projects, and documents from Jira and Confluence.

Open a canvas from an installed plugin in Customize to get a guided starting point instead of configuring everything from scratch.

## The marketplace

The [Cursor Marketplace](/marketplace) is where you discover and install official plugins. Plugins are distributed as Git repositories and submitted through the Cursor team. Every plugin is [manually reviewed](https://cursor.com/help/security-and-privacy/marketplace-security.md) before it's listed. Browse official plugins at [cursor.com/marketplace](https://cursor.com/marketplace) or search by keyword in **Customize**. For community plugins and MCP servers, browse [cursor.directory](https://cursor.directory).

## Team marketplaces

Team marketplaces are available on Teams and Enterprise plans.

- Teams plan: up to 1 team marketplace
- Enterprise plan: unlimited team marketplaces

[Contact sales](https://cursor.com/contact-sales?source=docs-plugins) for unlimited team marketplaces and Enterprise admin controls.

Open **Dashboard -> Plugins** to manage Team Marketplaces.

On Enterprise plans, only admins can add team marketplaces from **Dashboard
-> Plugins**.

### Default team marketplace

The **Default** team marketplace connects shared plugins and MCP servers across Cursor. Admins can add Team MCP servers that are already available to Cloud Agents, then make the same servers available for teammates to install and configure in the Agent Window, IDE, and CLI.

Adding a Team MCP server to the Default marketplace does not install or enable it for every developer. Admins still control marketplace access and plugin installation modes. Each developer may also need to authenticate with the MCP provider.

### Migrate existing Team MCPs

Admins can link standalone Team MCP servers to the Default marketplace:

1. Open **Dashboard -> Integrations & MCP**.
2. Find **Team MCP Servers**.
3. Select **Add to Team Marketplace** in the migration prompt.
4. Open **Dashboard -> Plugins** to review the Default marketplace, its access, and plugin installation modes.

Cursor creates the Default marketplace if needed and links the existing MCP servers to it. The servers remain available to Cloud Agents while teammates gain the option to install and configure them locally.

Removing a linked MCP plugin from the marketplace or deleting the marketplace
can delete the Team MCP server. This removes it for local users and Cloud
Agents. Review the confirmation message before continuing.

### Marketplace access

Team marketplaces are available to everyone in their team by default. Under **Marketplace Settings -> Marketplace Access**, admins can restrict a marketplace to selected [Organization Groups](https://cursor.com/docs/enterprise/organization-groups.md). Only members of the marketplace's team who belong to a selected group receive access. Team admins retain access.

### How does SCIM work?

Organization Groups can sync membership from your identity provider through [SCIM](https://cursor.com/docs/account/teams/scim.md). Manage membership in your identity provider, and Cursor syncs those updates to the Organization Group.

Existing marketplaces that use team-level SCIM directory groups keep that configuration. Cursor does not migrate those assignments automatically. Organizations without Organization Groups continue to use SCIM directory groups.

### Plugin installation modes

After setting marketplace access, choose how each plugin is distributed to that audience:

- **Default Off**: Developers can find the plugin and choose whether to install it.
- **Default On**: The plugin is installed by default, but developers can opt out.
- **Required**: The plugin is always installed and cannot be uninstalled.

## Add a team marketplace

Use this flow to import a GitHub repository as a team marketplace:

1. Go to **Dashboard -> Plugins**.
2. In **Team Marketplaces**, click **Add Marketplace**.
3. Follow the instructions to create a marketplace from scratch, or use "Import from Repo" if importing from GitHub.
4. Add and review plugins using "Add to Marketplace".
5. Under **Marketplace Settings**, set **Marketplace Access**, optionally enable Auto Refresh, then save.

Example repository to try:

- [fieldsphere/cursor-team-marketplace-template](https://github.com/fieldsphere/cursor-team-marketplace-template)

## Keep plugins up to date

When importing from GitHub, plugins are indexed when you first import the repository. You can refresh plugins in two ways:

- **Automatically**: Turn on **Enable Auto Refresh** to update plugins automatically whenever changes are pushed to the branch the marketplace tracks. This requires the [Cursor GitHub App](https://cursor.com/docs/integrations/github.md) installed on the repository. Cursor re-indexes a marketplace at most once every 10 minutes, batching rapid pushes to the latest commit.
- **Manually**: Click "Refresh" to manually update.

Auto Refresh updates plugins that are already part of the marketplace. Adding a brand-new plugin from the repository isn't automatic — re-import the repository URL to pick up newly added plugins.

## Where developers find team marketplaces

Developers can find team marketplaces in Customize.

- Open **Customize** in the sidebar
- Look for plugins from your team marketplace.
- Install Default Off plugins directly from that panel.
- Default On plugins are installed automatically, but developers can opt out.
- Required plugins are installed automatically and cannot be uninstalled.
- Install and configure marketplace MCP servers for use in the Agent Window, IDE, and CLI.

## Installing plugins

Install plugins from the marketplace. Plugins can be scoped to a project or installed at the user level.

### MCP Apps deeplinks

Share MCP server configurations using install links:

```text
cursor://anysphere.cursor-deeplink/mcp/install?name=$NAME&config=$BASE64_ENCODED_CONFIG
```

See [MCP install links](https://cursor.com/docs/mcp/install-links.md) for details on generating these links.

## Managing installed plugins

Open **Customize** in the sidebar to manage plugins, MCP servers, rules, and skills from one page. Filter by user, workspace, or team scope to see what is installed.

### MCP servers

Toggle personal and team-distributed MCP servers on or off from Customize:

1. Open **Customize** in the sidebar
2. Find the MCP server you want to change
3. Use the toggle to enable or disable it

Disabled servers won't load or appear in chat.

### Rules and skills

Manage rules and skills from Customize. Toggle individual rules between **Always**, **Agent Decides**, and **Manual** modes. Skills appear in the **Agent Decides** section and can be invoked manually with `/skill-name` in chat.

## Using the workspaceOpen hook

A `workspaceOpen` hook can return plugin paths to load on workspace open, which is useful when the set of plugins depends on the workspace itself.

### Hooks reference

Register plugin paths from a `workspaceOpen` hook script

## Creating plugins

A plugin is a directory with a `.cursor-plugin/plugin.json` manifest and your components (rules, skills, agents, commands, hooks, or MCP servers). Start from the [plugin template repository](https://github.com/cursor/plugin-template) or create one from scratch:

```text
my-plugin/
├── .cursor-plugin/
│   └── plugin.json
├── rules/
│   └── coding-standards.mdc
├── skills/
│   └── code-reviewer/
│       └── SKILL.md
└── mcp.json
```

The manifest only requires a `name` field. Components are discovered automatically from their default directories, or you can specify custom paths in the manifest.

```json
{
  "name": "my-plugin",
  "description": "Custom development tools",
  "version": "1.0.0",
  "author": { "name": "Your Name" }
}
```

### Test plugins locally

Before you publish, load your plugin from `~/.cursor/plugins/local`:

1. Create a folder for your plugin:
   `~/.cursor/plugins/local/my-plugin`
2. Copy your plugin files into that folder. Make sure `.cursor-plugin/plugin.json` is at the plugin root.
3. Restart Cursor, or run **Developer: Reload Window**.
4. Verify your plugin components load in Cursor, such as rules, skills, or MCP servers.

For faster iteration, symlink your plugin repository:

```bash
ln -s /path/to/my-plugin ~/.cursor/plugins/local/my-plugin
```

When your plugin is ready, submit it for review at [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish). For multi-plugin repositories, add a marketplace manifest at `.cursor-plugin/marketplace.json`.

See the [Plugins reference](https://cursor.com/docs/reference/plugins.md) for the full manifest schema, component formats, and submission checklist.

### Team and Enterprise marketplaces

Upgrade for private team marketplaces and organization-wide plugin distribution.

## FAQ

### Are marketplace plugins reviewed for security?

Yes. Every plugin is manually reviewed before it's listed. All plugins must be open source, and we review each update before publishing. See [Marketplace security](https://cursor.com/help/security-and-privacy/marketplace-security.md) for details on vetting, update reviews, and how to report issues.

### How do I create a plugin?

Create a directory with a `.cursor-plugin/plugin.json` manifest file, add your rules, skills, agents, commands, or other components, and submit it to the Cursor team. See the [Plugins reference](https://cursor.com/docs/reference/plugins.md) for the full guide.


---

## Sitemap

[Overview of all docs pages](/llms.txt)
