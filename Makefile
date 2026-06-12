SHELL := /bin/bash
UPDATE_SCRIPTS := $(shell find skills -path '*/scripts/update*.js' -o -path '*/scripts/update*.sh' 2>/dev/null | sort)

.PHONY: update-all list-update-scripts update-working-with-claude-code update-devcontainers update-working-with-codex update-working-with-gemini update-working-with-opencode update-working-with-cursor update-working-with-pieces update-working-with-github-actions update-working-with-vercel-ai-sdk

update-all: ## Update all auto-generated skill docs
	@if [ -z "$(UPDATE_SCRIPTS)" ]; then echo "No update scripts found."; exit 0; fi
	@echo "Running all doc update scripts..."
	@for script in $(UPDATE_SCRIPTS); do \
		echo "→ $$script"; \
		if [[ "$$script" == *.js ]]; then node "$$script"; \
		else bash "$$script"; fi; \
	done
	@echo "Done."

update-working-with-claude-code: ## Update working-with-claude-code references
	node skills/working-with-claude-code/scripts/update_docs.js

update-devcontainers: ## Update devcontainers generated reference docs
	node skills/devcontainers/scripts/update.js

update-working-with-codex: ## Update working-with-codex references
	node skills/working-with-codex/scripts/update_docs.js

update-working-with-gemini: ## Update working-with-gemini references
	node skills/working-with-gemini/scripts/update_docs.js

update-working-with-opencode: ## Update working-with-opencode references
	node skills/working-with-opencode/scripts/update_docs.js

update-working-with-cursor: ## Update working-with-cursor references
	node skills/working-with-cursor/scripts/update_docs.js

update-working-with-pieces: ## Update working-with-pieces references (resources, MCP tools, LTM prompts, versions)
	node skills/working-with-pieces/scripts/update.js

update-working-with-github-actions: ## Update working-with-github-actions references (GitHub docs + action versions)
	node skills/working-with-github-actions/scripts/update_docs.js

update-working-with-vercel-ai-sdk: ## Update working-with-vercel-ai-sdk references (ai-sdk.dev docs/providers/cookbook)
	node skills/working-with-vercel-ai-sdk/scripts/update_docs.js

list-update-scripts: ## List all discovered auto-doc update scripts
	@echo "Discovered update scripts:"
	@for script in $(UPDATE_SCRIPTS); do echo "  $$script"; done
