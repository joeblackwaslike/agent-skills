---
name: python-sdk
description: Pieces Python SDK — pieces_os_client, PiecesClient wrapper, create/list assets, streaming Copilot, port detection
---

# Pieces Python SDK

## Installation

```bash
pip install pieces_os_client  # v5.0.1
```

**Requirements**: Python >=3.11 (and <3.15 for `pieces-cli`)

## PiecesClient Wrapper (Recommended)

`PiecesClient` is a high-level wrapper that handles port detection automatically.

```python
from pieces_os_client import PiecesClient

client = PiecesClient()
# auto-detects: localhost:1000 (macOS/Windows), localhost:5323 (Linux)
```

## Manual Configuration

```python
from pieces_os_client import ApiClient, Configuration, WellKnownApi

# Detect port
import platform
port = 5323 if platform.system() == 'Linux' else 1000

config = Configuration(host=f"http://localhost:{port}")
api_client = ApiClient(configuration=config)

# Health check
well_known = WellKnownApi(api_client=api_client)
health = well_known.get_well_known_health()  # → "ok:<uuid>"
```

## Core Operations

### Create Asset

```python
from pieces_os_client import PiecesClient

client = PiecesClient()

asset_id = client.create_asset(
    raw_content='def hello(): return "world"',
    metadata={
        "name": "Hello Function",
        "language": "python"
    }
)
print(f"Created asset: {asset_id}")
```

### List Assets

```python
assets = client.assets()
for asset in assets:
    print(asset.id, asset.name)
```

### Query Copilot (Streaming)

```python
for chunk in client.stream_question("Explain this Python code: ..."):
    print(chunk, end="", flush=True)
print()  # newline after streaming completes
```

### Non-Streaming Question

```python
answer = client.ask_question("What's the difference between list and tuple in Python?")
print(answer)
```

## Low-Level API Clients

For operations not covered by `PiecesClient`, instantiate specific API classes directly:

```python
from pieces_os_client import (
    ApiClient, Configuration,
    AssetsApi, AssetApi, SearchApi,
    ConnectorApi, WellKnownApi, OSApi
)

config = Configuration(host="http://localhost:1000")
api_client = ApiClient(configuration=config)

assets_api = AssetsApi(api_client=api_client)
snapshot = assets_api.assets_snapshot()  # list all assets

search_api = SearchApi(api_client=api_client)
results = search_api.full_text_search(query="authentication")
```

## Links

- **PyPI**: https://pypi.org/project/pieces_os_client/
- **GitHub**: https://github.com/pieces-app/pieces-os-client-sdk-for-python
- **Quickstart**: https://docs.pieces.app/build/sdks/python/quickstart
- **API Reference**: https://docs.pieces.app/build/reference/python
- **OpenAPI spec**: https://github.com/pieces-app/pieces-os-client-openapi-spec
