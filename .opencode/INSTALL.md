# Installing agent-skills for OpenCode

## Prerequisites

- [OpenCode.ai](https://opencode.ai) installed

## Option A: Plugin (recommended)

Add agent-skills to the `plugin` array in your `opencode.json` (global or project-level):

```json
{
  "plugin": ["agent-skills@git+https://github.com/joeblackwaslike/agent-skills.git"]
}
```

Restart OpenCode. The plugin auto-registers the skills directory.

For a local clone:

```json
{
  "plugin": ["/path/to/agent-skills/.opencode/plugins/agent-skills.js"]
}
```

## Option B: Manual skills path

Add the skills directory to `skills.paths` in your `opencode.json`:

```json
{
  "skills": {
    "paths": ["/path/to/agent-skills/skills"]
  }
}
```

## Verify

Ask OpenCode: "use skill tool to list skills" — agent-skills should appear.

## Updating

If installed via git spec, clear OpenCode's package cache or reinstall the plugin
to pick up the latest commit. For a local clone, `git pull` is sufficient.
