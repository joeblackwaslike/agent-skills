---
source: "https://raw.githubusercontent.com/openai/codex/main/codex-rs/ext/extension-api/notes.md"
fetched_at: "2026-10-12T11:42:58.685Z"
sha256: "b63ccd86f7e8cd30fcf47b9fd79aab0c77b46d13f1b48f8e8e51b26c1274d4bb"
---

Everything becomes a good contributor design, which contributors do we need?

| Area                        | Contributors                                                        |
| --------------------------- | ------------------------------------------------------------------- |
| git attribution             | Context                                                             |
| memories                    | Context + Tool + Output                                             |
| guardian                    | Context + Request                                                   |
| goal                        | Tool + Runtime                                                      |
| image generation            | Tool + Output                                                       |
| skills                      | Context + Turn                                                      |
| personality                 | Context                                                             |
| plugins / apps / connectors | Context + Turn                                                      |
| shell snapshot              | Runtime                                                             |
| web search                  | Tool                                                                |
| AGENTS.md                   | Context (Runtime too only if you want eager refresh/cache behavior) |
| future sandboxing           | probably Request + Runtime                                          |
