SHELL := /bin/bash
UPDATE_SCRIPTS := $(shell find skills -path '*/scripts/update*.js' -o -path '*/scripts/update*.sh' 2>/dev/null | sort)

.PHONY: update-all list-update-scripts update-working-with-claude-code update-devcontainers update-working-with-codex update-working-with-gemini update-working-with-opencode

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

list-update-scripts: ## List all discovered auto-doc update scripts
	@echo "Discovered update scripts:"
	@for script in $(UPDATE_SCRIPTS); do echo "  $$script"; done
