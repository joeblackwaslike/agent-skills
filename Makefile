SHELL := /bin/bash
UPDATE_SCRIPTS := $(shell find skills -path '*/scripts/update*.js' -o -path '*/scripts/update*.sh' 2>/dev/null | sort)

.PHONY: update-all list-update-scripts update-working-with-claude-code update-devcontainers update-working-with-codex update-working-with-gemini update-working-with-opencode update-working-with-cursor update-working-with-pieces update-working-with-github-actions update-working-with-vercel-ai-sdk update-working-with-beads update-working-with-git update-working-with-github update-developing-for-github update-working-with-dolt update-working-with-vercel update-working-with-vercel-api

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

update-working-with-beads: ## Update working-with-beads references (CLI ref from pinned bd + repo docs @ tag)
	node skills/working-with-beads/scripts/update_docs.js

update-working-with-git: ## Update working-with-git references (git/git AsciiDoc @ pinned tag + Pro Git book)
	node skills/working-with-git/scripts/update_docs.js

update-working-with-github: ## Update working-with-github references (gh CLI from pinned binary + docs.github.com guides)
	node skills/working-with-github/scripts/update_docs.js

update-developing-for-github: ## Update developing-for-github references (Apps/OAuth/webhooks docs + Octokit READMEs)
	node skills/developing-for-github/scripts/update_docs.js

update-working-with-dolt: ## Update working-with-dolt references (CLI ref from pinned dolt + dolthub.com docs)
	node skills/working-with-dolt/scripts/update_docs.js

update-working-with-vercel: ## Update working-with-vercel references (vercel.com/docs .md sweep, REST API excluded)
	node skills/working-with-vercel/scripts/update_docs.js

update-working-with-vercel-api: ## Update working-with-vercel-api references (OpenAPI spec → YAML + conceptual REST docs)
	node skills/working-with-vercel-api/scripts/update_docs.js

list-update-scripts: ## List all discovered auto-doc update scripts
	@echo "Discovered update scripts:"
	@for script in $(UPDATE_SCRIPTS); do echo "  $$script"; done
