# Security Review for VS Code Extensions

Use this when the extension touches files, commands, workspace trust, auth, secrets, webviews, external APIs, or AI-triggered actions.

## Workspace Trust

If behavior executes code, reads sensitive files, calls external services, or mutates the workspace, decide how it behaves in untrusted workspaces. Respect VS Code Workspace Trust APIs where applicable.

## Secrets

- Store tokens in `context.secrets`.
- Never write secrets to workspace files, logs, telemetry, settings, or generated prompts.
- Redact before logging errors from API clients.

## Command Execution

- Avoid shell execution when a VS Code API or Node API can do the job.
- If shell execution is required, pass arguments without string concatenation.
- Never run workspace-provided commands without explicit user action and validation.

## Webview Security

- Use a restrictive Content Security Policy.
- Use nonces or external bundled scripts; avoid unsafe inline scripts.
- Validate every message from the webview.
- Do not expose the VS Code API object globally.
- Use `localResourceRoots` to restrict accessible resources.

## File Access

- Prefer `vscode.workspace.fs`.
- Check workspace boundaries before writing.
- Ask or clearly signal before destructive edits.

## AI-triggered Actions

Treat AI tool calls as untrusted input. Validate schema, scope file paths, require user confirmation for destructive or externally visible actions, and provide clear audit logs.
