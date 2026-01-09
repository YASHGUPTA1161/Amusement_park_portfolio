# Prettier Setup Guide

## Installation

Run this command to install Prettier:

```bash
npm install
```

## Usage

### Format All Files

Format all files in your project:

```bash
npm run format
```

### Check Formatting (without changing files)

Check if files are formatted correctly:

```bash
npm run format:check
```

### Format Specific Files/Folders

Format specific files or folders:

```bash
npx prettier --write "components/**/*.{ts,tsx}"
npx prettier --write "app/**/*.{ts,tsx}"
```

## VS Code Setup (Format on Save)

1. Install the **Prettier - Code formatter** extension in VS Code
2. Add these settings to your VS Code settings (`.vscode/settings.json`):

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Configuration

Prettier settings are in `.prettierrc`:

- **semi**: true (use semicolons)
- **singleQuote**: false (use double quotes)
- **tabWidth**: 2 (2 spaces for indentation)
- **printWidth**: 80 (wrap lines at 80 characters)
- **trailingComma**: "es5" (add trailing commas where valid in ES5)

## Files Ignored

Files/folders in `.prettierignore` won't be formatted:

- `node_modules`
- `.next`
- Build outputs
- Lock files
- etc.

## ESLint Integration

Prettier is integrated with ESLint using `eslint-config-prettier` to avoid conflicts between formatting rules.
