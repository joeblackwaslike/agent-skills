---
title: WordPress
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/wordpress
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/wordpress"
last_updated: 2026-05-30
type: conceptual
prerequisites:
  - /docs/ai-gateway/ecosystem/framework-integrations
  - /docs/ai-gateway/ecosystem
related:
  - /docs/ai-gateway
  - /docs/ai-gateway/authentication-and-byok/api-keys
summary: Learn how to integrate Vercel AI Gateway with WordPress to let your plugins access multiple AI models
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/wordpress.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "798653bfd3d2cff30da700243f460c64d160b3e2682984b012d1411f22d9873c"
---

# WordPress

The [Vercel AI Gateway Provider plugin for WordPress](https://wordpress.org/plugins/vercel-ai-gateway-provider/)
registers [AI Gateway](/docs/ai-gateway) as a provider for the
[WordPress AI Client](https://make.wordpress.org/core/2026/03/24/introducing-the-ai-client-in-wordpress-7-0/),
so you can generate text, images, and video from your site. Any AI-powered plugin
built on top of the WordPress AI Client will then benefit from these capabilities.

> **💡 Note:** The plugin requires WordPress 7.0 or higher.

## Installing and configuring the AI Gateway provider plugin

- ### Install the plugin
  In your WordPress admin, go to **Plugins > Add New**, search for **Vercel AI Gateway**,
  then install and activate the **AI Gateway Provider** plugin.

  You can also install it manually by uploading the `vercel-ai-gateway-provider` folder
  to `/wp-content/plugins/` and activating it from the **Plugins** screen.

- ### Configure your API key
  Go to **Settings > Connectors** and paste your
  [Vercel AI Gateway API key](/docs/ai-gateway/authentication-and-byok/api-keys#create-a-key).

  The provider registers itself with the WordPress AI Client on the `init` hook,
  so once the key is saved any plugin that calls the WordPress AI Client can use it.

## Using the AI Gateway in your plugin

Plugins built on top of the WordPress AI Client can leverage the AI Gateway for any
site where this plugin has been configured. Use code snippets like the following in
your plugin code that runs after `init`:

```php
$text = wp_ai_client_prompt( 'Write a one-sentence bedtime story about a unicorn.' )
    ->using_provider( 'ai_gateway' )
    ->generate_text();
```

The `wp_ai_client_prompt()` function returns a prompt builder with all methods
aliased to snake\_case. For a deeper introduction to the underlying API, see
[the tutorial for building a plugin with the WordPress AI Client](https://developer.wordpress.org/news/2026/05/how-to-build-an-image-generation-plugin-with-the-wordpress-ai-client/).

### Examples

#### Selecting a model

Pass one or more model IDs to `using_model_preference()`. The first available model
in the list is used, which is useful as a fallback chain:

```php
$text = wp_ai_client_prompt( 'Explain quantum computing in one paragraph.' )
    ->using_provider( 'ai_gateway' )
    ->using_model_preference( 'claude-sonnet-4.6', 'gemini-3.1-pro-preview' )
    ->generate_text();
```

#### System instruction and generation parameters

```php
$text = wp_ai_client_prompt( 'How many R are in "strawberry"?' )
    ->using_provider( 'ai_gateway' )
    ->using_model_preference( 'claude-sonnet-4.6' )
    ->using_system_instruction( 'You are a careful, precise assistant. Think step by step.' )
    ->using_temperature( 0.2 )
    ->using_max_tokens( 200 )
    ->generate_text();
```

#### Multi-turn conversation

Pass prior turns to `with_history()` so the model has context from earlier messages:

```php
use WordPress\AiClient\Messages\DTO\UserMessage;
use WordPress\AiClient\Messages\DTO\ModelMessage;
use WordPress\AiClient\Messages\DTO\MessagePart;

$history = [
    new UserMessage( [ new MessagePart( 'My name is Ada.' ) ] ),
    new ModelMessage( [ new MessagePart( 'Nice to meet you, Ada.' ) ] ),
];

$text = wp_ai_client_prompt( 'What did I say my name was?' )
    ->using_provider( 'ai_gateway' )
    ->with_history( ...$history )
    ->generate_text();
```

#### Vision (image input)

Pass a URL, local path, base64 string, or data URI to `with_file()`:

```php
$text = wp_ai_client_prompt( 'Describe what you see in this image.' )
    ->using_provider( 'ai_gateway' )
    ->using_model_preference( 'gemini-3.1-pro-preview' )
    ->with_file( 'https://example.com/photo.jpg' )
    ->generate_text();
```

#### Structured JSON output

Use `as_json_response()` with a JSON schema to constrain the model's output:

```php
$schema = [
    'type'       => 'object',
    'properties' => [
        'title'    => [ 'type' => 'string' ],
        'keywords' => [
            'type'  => 'array',
            'items' => [ 'type' => 'string' ],
        ],
    ],
    'required'   => [ 'title', 'keywords' ],
];

$text = wp_ai_client_prompt( 'Suggest a title and 5 SEO keywords for a post about urban gardening.' )
    ->using_provider( 'ai_gateway' )
    ->as_json_response( $schema )
    ->generate_text();

$data = json_decode( $text, true );
```

#### Image generation

```php
$file = wp_ai_client_prompt( 'A watercolor painting of a Cavalier King Charles Spaniel in a sunlit garden.' )
    ->using_provider( 'ai_gateway' )
    ->using_model_preference( 'gemini-3.1-flash-image-preview' )
    ->as_output_media_aspect_ratio( '16:9' )
    ->generate_image();

file_put_contents( __DIR__ . '/spaniel.png', base64_decode( $file->getBase64Data() ) );
```

#### Image editing

Combine `with_file()` and `generate_image()` to edit an existing image:

```php
$input_data_uri = 'data:image/png;base64,' . base64_encode( file_get_contents( __DIR__ . '/spaniel.png' ) );

$file = wp_ai_client_prompt( 'Repaint this scene at sunset, keeping the dog and pose unchanged.' )
    ->using_provider( 'ai_gateway' )
    ->using_model_preference( 'gemini-3.1-flash-image-preview' )
    ->with_file( $input_data_uri )
    ->as_output_media_aspect_ratio( '16:9' )
    ->generate_image();

file_put_contents( __DIR__ . '/spaniel-sunset.png', base64_decode( $file->getBase64Data() ) );
```

#### Video generation

```php
$file = wp_ai_client_prompt( 'A drone shot flying over a misty mountain range at sunrise.' )
    ->using_provider( 'ai_gateway' )
    ->generate_video();
```

#### Multi-modal output (text and image)

Request multiple output modalities in a single call:

```php
use WordPress\AiClient\Messages\Enums\ModalityEnum;

$result = wp_ai_client_prompt( 'Write a 3-verse kids poem about a Cavalier King Charles Spaniel, accompanied by illustrations.' )
    ->using_provider( 'ai_gateway' )
    ->as_output_modalities( ModalityEnum::text(), ModalityEnum::image() )
    ->generate_result();
```

## Using the provider outside of WordPress

The same provider implementation also works with the framework-agnostic
[`WordPress/php-ai-client`](https://github.com/WordPress/php-ai-client) SDK,
which can be used in any PHP project. Install the
[`vercel-labs/ai-gateway-provider`](https://packagist.org/packages/vercel-labs/ai-gateway-provider)
Composer package and register it with the SDK's default registry.


---

[View full sitemap](/docs/sitemap)
