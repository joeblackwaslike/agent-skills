---
title: Open WebUI
product: vercel
url: /docs/ai-gateway/chat-platforms/open-webui
canonical_url: "https://vercel.com/docs/ai-gateway/chat-platforms/open-webui"
last_updated: 2026-06-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/chat-platforms
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/observability
summary: Use Open WebUI with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/chat-platforms/open-webui.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "005d166b6a49abc8c84e2285f0b5bf2cd91c713f62d0d0646a5c6950264fc8e9"
---

# Open WebUI

[Open WebUI](https://github.com/open-webui/open-webui) is a self-hosted web interface for interacting with LLMs. You can configure it to use AI Gateway for unified model access, spend monitoring, and access to hundreds of models from multiple providers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build your own AI model router](https://vercel.com/kb/guide/how-to-build-your-own-ai-model-router?from=related&source_path=%2Fdocs%2Fai-gateway%2Fchat-platforms%2Fopen-webui&source_site=vercel-docs&relationship=related) — Build an AI model router with Vercel AI Gateway. Keep routing, key, and retention decisions in your code while the gatew
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Fchat-platforms%2Fopen-webui&source_site=vercel-docs&relationship=related) — Create an AI Gateway API key, make your first request with TypeScript, Python, or cURL, and verify how the request was r
- [OpenAI Chat Completions API](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions?from=related&source_path=%2Fdocs%2Fai-gateway%2Fchat-platforms%2Fopen-webui&source_site=vercel-docs&relationship=related) — Use the OpenAI Chat Completions API with AI Gateway for seamless integration with existing tools and libraries.
- [SDKs & APIs](https://vercel.com/docs/ai-gateway/sdks-and-apis?from=related&source_path=%2Fdocs%2Fai-gateway%2Fchat-platforms%2Fopen-webui&source_site=vercel-docs&relationship=related) — Use the AI Gateway with various SDKs and API specifications including OpenAI, Anthropic, and OpenResponses.
- [Text Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/text?from=related&source_path=%2Fdocs%2Fai-gateway%2Fchat-platforms%2Fopen-webui&source_site=vercel-docs&relationship=related) — Generate and stream text responses using AI Gateway.
- [Python](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fchat-platforms%2Fopen-webui&source_site=vercel-docs&relationship=related) — Use the AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.

Full cross-link map for this page: [/docs/ai-gateway/chat-platforms/open-webui.graph.md](/docs/ai-gateway/chat-platforms/open-webui.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fchat-platforms%2Fopen-webui&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Configuring Open WebUI

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Install Open WebUI
  If you haven't already installed Open WebUI, follow the [Open WebUI installation guide](https://docs.openwebui.com/getting-started/quick-start). You can deploy it using Docker, Python, or other methods.

- ### Configure AI Gateway
  Open WebUI integrates with AI Gateway through a custom function. Choose one of the following methods:
  #### One-Click Install
  1. Visit [Vercel AI Gateway Integration](https://openwebui.com/posts/vercel_ai_gateway_integration_52b4c475)
  2. Click **Get** to install the function to your running Open WebUI instance
  3. Click **Save** to finish installing
  4. Click the settings icon next to the function to enter your **AI Gateway API key**
  #### Manual Install
  1. Navigate to **Profile Icon** > **Settings** > **Admin Settings** > **Functions**
  2. Click **New Function**
  3. Copy and paste the following function code:
  ```python filename="gateway-integration.py"
  import requests
  import json
  import traceback
  from typing import Generator, List
  from pydantic import BaseModel, Field


  class Pipe:
      class Valves(BaseModel):
          """Configuration settings for Vercel AI Gateway integration"""

          VERCEL_API_KEY: str = Field(
              default="",
              description="Your Vercel AI Gateway API key (required). Get one at https://vercel.com/dashboard"
          )
          GATEWAY_URL: str = Field(
              default="https://ai-gateway.vercel.sh/v1",
              description="Vercel AI Gateway base URL"
          )
          ENABLE_REASONING: bool = Field(
              default=True,
              description="Enable reasoning/thinking mode for supported models"
          )
          REASONING_MAX_TOKENS: int = Field(
              default=2000,
              description="Maximum tokens to allocate for reasoning output",
              gt=0
          )
          REQUEST_TIMEOUT: int = Field(
              default=90,
              description="Request timeout in seconds",
              gt=0
          )
          MODEL_PREFIX: str | None = Field(
              default=None,
              description="Prefix for model names in Open WebUI (e.g., 'Vercel: '). Leave empty for no prefix."
          )
          MODEL_CREATORS: str | None = Field(
              default=None,
              description="Comma-separated list of model creators to include or exclude (e.g., 'anthropic,openai,google'). Leave empty to include all creators."
          )
          INVERT_CREATOR_LIST: bool = Field(
              default=False,
              description="If true, the above 'Model Creators' list becomes an *exclude* list instead of an *include* list."
          )

      def __init__(self):
          self.type = "manifold"  # Indicates this pipe provides multiple models
          self.valves = self.Valves()
          if not self.valves.VERCEL_API_KEY:
              print("Warning: VERCEL_API_KEY is not set.")

      def _error_response(self, error_message: str) -> dict:
          """Helper to create an OpenAI-compatible error response"""
          return {
              "id": "error",
              "object": "chat.completion",
              "created": 0,
              "model": "error",
              "choices": [{
                  "index": 0,
                  "message": {
                      "role": "assistant",
                      "content": f"Pipe Error: {error_message}"
                  },
                  "finish_reason": "stop"
              }]
          }

      def _get_headers(self, body: dict | None = None) -> dict:
          headers = {
              "Authorization": f"Bearer {self.valves.VERCEL_API_KEY}",
              "Content-Type": "application/json",
              "HTTP-Referer": "https://openwebui.com/",
              "X-Title": "Open WebUI via Vercel AI Gateway",
          }

          if body:
              headers["HTTP-Referer"] = body.get("http_referer", headers["HTTP-Referer"])
              headers["X-Title"] = body.get("x_title", headers["X-Title"])

          return headers

      def pipes(self) -> List[dict]:
          """
          Fetch available models from Vercel AI Gateway.
          This method is called by OpenWebUI to discover available models.
          """
          if not self.valves.VERCEL_API_KEY:
              return [
                  {"id": "error", "name": "Pipe Error: Vercel API Key not provided"}
              ]

          try:
              headers = self._get_headers()

              response = requests.get(
                  f"{self.valves.GATEWAY_URL}/models",
                  headers=headers,
                  timeout=self.valves.REQUEST_TIMEOUT
              )
              response.raise_for_status()

              models_data = response.json()
              raw_models = models_data.get("data", [])

              if not raw_models:
                  return [
                      {"id": "error", "name": "Pipe Error: No models found on Vercel AI Gateway"}
                  ]

              creator_list_str = (self.valves.MODEL_CREATORS or "").lower()
              invert_list = self.valves.INVERT_CREATOR_LIST
              target_creators = {
                  c.strip() for c in creator_list_str.split(",") if c.strip()
              }

              # Transform models to Open WebUI format with filtering
              prefix = self.valves.MODEL_PREFIX or ""
              models = []

              for model in raw_models:
                  model_id = model.get("id")
                  if not model_id:
                      continue

                  if target_creators:
                      creator = (
                          model_id.split("/", 1)[0].lower()
                          if "/" in model_id
                          else model_id.lower()
                      )
                      creator_in_list = creator in target_creators
                      keep = (creator_in_list and not invert_list) or (
                          not creator_in_list and invert_list
                      )
                      if not keep:
                          continue

                  model_name = model.get("name", model_id)
                  models.append({
                      "id": model_id,
                      "name": f"{prefix}{model_name}"
                  })

              if not models:
                  if target_creators:
                      return [
                          {
                              "id": "error",
                              "name": "Pipe Error: No models found matching the creator filter"
                          }
                      ]
                  else:
                      return [
                          {
                              "id": "error",
                              "name": "Pipe Error: No models found on Vercel AI Gateway"
                          }
                      ]

              return models

          except requests.exceptions.Timeout:
              print("Error fetching models: Request timed out")
              return [{"id": "error", "name": "Pipe Error: Timeout fetching models"}]
          except requests.exceptions.HTTPError as e:
              error_msg = f"Pipe Error: HTTP {e.response.status_code} fetching models"
              try:
                  error_detail = e.response.json().get("error", {}).get("message", "")
                  if error_detail:
                      error_msg += f": {error_detail}"
              except Exception:
                  pass
              print(f"Error fetching models: {error_msg}")
              return [{"id": "error", "name": error_msg}]
          except Exception as e:
              print(f"Unexpected error fetching models: {e}")
              traceback.print_exc()
              return [{"id": "error", "name": f"Pipe Error: {e}"}]

      def pipe(self, body: dict) -> dict | Generator:
          """
          Process incoming chat requests.
          This is the main function called by OpenWebUI when a user interacts with a model.

          Args:
              body: Request body in OpenAI chat completions format

          Returns:
              String for non-streaming responses, Generator for streaming responses
          """
          if not self.valves.VERCEL_API_KEY:
              return "Pipe Error: Vercel API Key is not configured. Please set it in function settings."

          try:
              payload = body.copy()

              # Remove Open WebUI's model prefix if present (e.g., "pipe.model" -> "model")
              if "model" in payload and payload["model"] and "." in payload["model"]:
                  payload["model"] = payload["model"].split(".", 1)[1]

              # Enable reasoning if configured
              if self.valves.ENABLE_REASONING:
                  payload["reasoning"] = {
                      "enabled": True,
                      "max_tokens": self.valves.REASONING_MAX_TOKENS
                  }

              headers = self._get_headers(body)

              url = f"{self.valves.GATEWAY_URL}/chat/completions"
              is_streaming = body.get("stream", False)

              if is_streaming:
                  return self.stream_response(url, headers, payload)
              else:
                  return self.non_stream_response(url, headers, payload)

          except Exception as e:
              print(f"Error preparing request in pipe method: {e}")
              traceback.print_exc()
              return f"Pipe Error: Failed to prepare request: {e}"

      def non_stream_response(self, url: str, headers: dict, payload: dict) -> dict:
          try:
              response = requests.post(
                  url,
                  headers=headers,
                  json=payload,
                  timeout=self.valves.REQUEST_TIMEOUT
              )
              response.raise_for_status()

              res = response.json()

              if not res.get("choices"):
                  return res

              return res

          except requests.exceptions.Timeout:
              return self._error_response(f"Request timed out ({self.valves.REQUEST_TIMEOUT}s)")
          except requests.exceptions.HTTPError as e:
              error_msg = f"API returned HTTP {e.response.status_code}"
              try:
                  detail = e.response.json().get("error", {}).get("message", "")
                  if detail:
                      error_msg += f": {detail}"
              except Exception:
                  pass
              return self._error_response(error_msg)
          except Exception as e:
              print(f"Unexpected error in non_stream_response: {e}")
              traceback.print_exc()
              return self._error_response(f"Unexpected error processing response: {e}")

      def stream_response(self, url: str, headers: dict, payload: dict) -> Generator[str, None, None]:
          response = None
          try:
              response = requests.post(
                  url,
                  headers=headers,
                  json=payload,
                  stream=True,
                  timeout=self.valves.REQUEST_TIMEOUT
              )
              response.raise_for_status()

              for line in response.iter_lines():
                  if not line or not line.startswith(b"data: "):
                      continue

                  data = line[len(b"data: "):].decode("utf-8")
                  if data == "[DONE]":
                      yield "data: [DONE]\n\n"
                      break

                  try:
                      chunk = json.loads(data)
                  except json.JSONDecodeError:
                      continue

                  if "choices" not in chunk:
                      continue

                  # OpenWebUI detects and handles delta.reasoning
                  yield f"data: {json.dumps(chunk)}\n\n"

          except requests.exceptions.Timeout:
              yield f"data: {json.dumps(self._error_response(f'Request timed out ({self.valves.REQUEST_TIMEOUT}s)'))}\n\n"
          except requests.exceptions.HTTPError as e:
              yield f"data: {json.dumps(self._error_response(f'API returned HTTP {e.response.status_code}'))}\n\n"
          except Exception as e:
              print(f"Unexpected error during streaming: {e}")
              traceback.print_exc()
              yield f"data: {json.dumps(self._error_response(f'Unexpected error during streaming: {e}'))}\n\n"
          finally:
              if response:
                  response.close()
  ```
  4. Click the settings icon next to the function to enter your **AI Gateway API key**
  5. ```
     ```
  > **💡 Note:** The function handles authentication and request routing to AI Gateway automatically.

- ### Start using models
  Select a model from the AI Gateway catalog in the Open WebUI interface. Your requests will now be routed through AI Gateway.

  You can verify this by checking your [AI Gateway Overview](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in the Vercel dashboard.

- ### (Optional) Monitor usage and spend
  View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.


---

[View full sitemap](/docs/sitemap)
