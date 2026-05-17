SHELL := /bin/bash
UPDATE_SCRIPTS := $(shell find skills -path '*/scripts/update*.js' -o -path '*/scripts/update*.sh' 2>/dev/null | sort)

.PHONY: update-all list-update-scripts update-working-with-claude-code

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

list-update-scripts: ## List all discovered auto-doc update scripts
	@echo "Discovered update scripts:"
	@for script in $(UPDATE_SCRIPTS); do echo "  $$script"; done
