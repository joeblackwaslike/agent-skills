---
source: "https://oraios.github.io/serena/_sources/01-about/050_acknowledgements.md"
fetched_at: "2026-06-16T12:24:33.275Z"
sha256: "20519f7da4cc043c2363c5c23d94b55b5d8f7a73e6983937e2268e080fb6f6b3"
---

# Acknowledgements

## Sponsors

We are very grateful to our [sponsors](https://github.com/sponsors/oraios), who help us drive Serena's development. 
The core team (the founders of [Oraios AI](https://oraios-ai.de/)) put in a lot of work in order to turn Serena into a useful open source project.
So far, there is no business model behind this project, and sponsors are our only source of income from it.

Sponsors help us dedicate more time to the project, managing contributions, and working on larger features (like better tooling based on more advanced
LSP features, VSCode integration, debugging via the DAP, and several others).
If you find this project useful to your work, or would like to accelerate the development of Serena, consider becoming a sponsor.

We are proud to announce that the Visual Studio Code team, together with Microsoft’s Open Source Programs Office and GitHub Open Source
have decided to sponsor Serena with a one-time contribution!

## Community Contributions

A significant part of Serena, especially support for various languages, was contributed by the open source community.
We are very grateful for the many contributors who made this possible and who played an important role in making Serena
what it is today.

## Technologies

We built Serena on top of multiple existing open-source technologies, the most important ones being:

1. [multilspy](https://github.com/microsoft/multilspy).
   A library which wraps language server implementations and adapts them for interaction via Python
   and which provided the basis for our library Solid-LSP (src/solidlsp).
   Solid-LSP provides pure synchronous LSP calls and extends the original library with the symbolic logic
   that Serena required.
2. [Python MCP SDK](https://github.com/modelcontextprotocol/python-sdk)
3. All the language servers that we use through Solid-LSP.

Without these projects, Serena would not have been possible (or would have been significantly more difficult to build).
