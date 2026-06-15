---
source: "https://raw.githubusercontent.com/google-gemini/gemini-cli/main/packages/cli/src/commands/extensions/examples/themes-example/README.md"
fetched_at: "2026-06-15T05:55:14.234Z"
sha256: "1b90b5307df1af550f85e37b1ef9dea29e26b17ef48b4fba77d4fa2c8c20f8c8"
---

# Themes Example

This is an example of a Gemini CLI extension that adds a custom theme.

## How to use

1.  Link this extension:

    ```bash
    gemini extensions link packages/cli/src/commands/extensions/examples/themes-example
    ```

2.  Set the theme in your settings file (`~/.gemini/settings.json`):

    ```json
    {
      "ui": {
        "theme": "shades-of-green (themes-example)"
      }
    }
    ```

    Alternatively, you can set it through the UI by running `gemini` and then
    typing `/theme` and pressing Enter.

3.  **Observe the Changes:**

    After setting the theme, you should see the changes reflected in the Gemini
    CLI's UI. The background will be a dark green, the primary text a lighter
    green, and various other UI elements will display different shades of green,
    as defined in this extension's `gemini-extension.json` file.
