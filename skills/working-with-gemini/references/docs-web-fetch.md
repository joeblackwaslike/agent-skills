---
source: "https://raw.githubusercontent.com/google-gemini/gemini-cli/main/docs/tools/web-fetch.md"
fetched_at: "2026-06-15T05:55:14.234Z"
sha256: "2624a4b0e0aafcc837c48b9169ef4c2ec481906d26bf13f1ea007f827fc48cad"
---

# Web fetch tool (`web_fetch`)

The `web_fetch` tool allows the Gemini agent to retrieve and process content
from specific URLs provided in your prompt.

## Technical reference

The agent uses this tool when you include URLs in your prompt and request
specific operations like summarization or extraction.

### Arguments

- `prompt` (string, required): A request containing up to 20 valid URLs
  (starting with `http://` or `https://`) and instructions on how to process
  them.

## Technical behavior

- **Confirmation:** Triggers a confirmation dialog showing the converted URLs.
- **Plan Mode:** In [Plan Mode](../cli/plan-mode.md), `web_fetch` is available
  but always requires explicit user confirmation (`ask_user`) due to security
  implications of accessing external or private network addresses.
- **Processing:** Uses the Gemini API's `urlContext` for retrieval.
- **Fallback:** If API access fails, the tool attempts to fetch raw content
  directly from your local machine.
- **Formatting:** Returns a synthesized response with source attribution.

## Use cases

- Summarizing technical articles or blog posts.
- Comparing data between two or more web pages.
- Extracting specific information from a documentation site.

## Next steps

- Follow the [Web tools guide](../cli/tutorials/web-tools.md) for practical
  usage examples.
- See the [Web search tool reference](./web-search.md) for general queries.
