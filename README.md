# Industry Theme Editor Panel

A panel extension for customizing the Industry theme colors and appearance in real-time. This panel is built with the `@principal-ade/panel-framework-core` and follows the [Panel Extension Store Specification V2](https://github.com/principal-ade/panel-framework/blob/main/PANEL_EXTENSION_STORE_SPECIFICATION_V2.md).

## Features

- **Live Color Customization**: Modify theme colors across different categories in real-time
- **Interactive Color Picker**: Visual hex color picker with manual input support
- **Organized by Category**: Colors grouped into Primary, Background, Text, UI, and Status categories
- **Reset Functionality**: Individual color reset buttons to revert to defaults
- **Industry Theme Integration**: Seamlessly integrates with `@principal-ade/industry-theme`

## Installation

```bash
# Install dependencies
bun install

# Build the panel
bun run build

# Development mode (watch for changes)
bun run dev
```

## Development

### Project Structure

```
src/
├── panels/
│   └── ThemeEditorPanel.tsx       # Main theme editor component
├── components/
│   └── ColorPickerInput.tsx       # Color picker input component
├── types/
│   └── index.ts                   # TypeScript type definitions
└── index.tsx                      # Panel exports and lifecycle hooks
```

### Color Categories

The theme editor organizes colors into the following categories:

- **Primary Colors**: Primary, Secondary, Accent
- **Background Colors**: Background, Background Light/Dark, Secondary, Tertiary
- **Text Colors**: Text, Text Secondary, Text Tertiary
- **UI Colors**: Border, Border Light/Dark
- **Status Colors**: Success, Warning, Error, Info

### Running Storybook

```bash
# Start Storybook for interactive development
bun run storybook

# Build Storybook for deployment
bun run build-storybook
```

## Usage

Once installed in a host application, the Theme Editor panel will be available with:

- **Panel ID**: `industry-theme.theme-editor`
- **Display Name**: Theme Editor
- **Icon**: 🎨

## Dependencies

- **react-colorful**: Hex color picker component
- **lucide-react**: Icon library
- **@principal-ade/industry-theme**: Industry theme package
- **@principal-ade/panel-framework-core**: Panel framework integration

## Building

```bash
# Clean and build
bun run build

# Type checking
bun run typecheck

# Linting
bun run lint
bun run lint:fix

# Formatting
bun run format
bun run format:check
```

## Publishing

```bash
# Build the package
bun run build

# Publish to NPM
npm publish --access public
```

## License

MIT © Principal ADE

## Contributing

Contributions welcome! Please read the contributing guidelines first.
