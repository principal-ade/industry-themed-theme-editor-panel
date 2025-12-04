/**
 * Theme Editor Panel Tools
 *
 * UTCP-compatible tools for the theme editor panel extension.
 * These tools can be invoked by AI agents and emit events that panels listen for.
 *
 * IMPORTANT: This file should NOT import any React components to ensure
 * it can be imported server-side without pulling in React dependencies.
 * Use the './tools' subpath export for server-safe imports.
 */

import type { PanelTool, PanelToolsMetadata } from '@principal-ade/utcp-panel-event';

/**
 * Tool: Set Theme Color
 */
export const setThemeColorTool: PanelTool = {
  name: 'set_theme_color',
  description: 'Sets a specific color in the Industry theme',
  inputs: {
    type: 'object',
    properties: {
      colorKey: {
        type: 'string',
        description: 'The color key to set (e.g., "primary", "secondary", "accent", "background")',
      },
      colorValue: {
        type: 'string',
        description: 'The color value in hex format (e.g., "#ff5500")',
      },
    },
    required: ['colorKey', 'colorValue'],
  },
  outputs: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      colorKey: { type: 'string' },
      colorValue: { type: 'string' },
    },
  },
  tags: ['theme', 'color', 'customization'],
  tool_call_template: {
    call_template_type: 'panel_event',
    event_type: 'industry-theme.theme-editor:set-color',
  },
};

/**
 * Tool: Reset Theme
 */
export const resetThemeTool: PanelTool = {
  name: 'reset_theme',
  description: 'Resets the theme to default Industry theme colors',
  inputs: {
    type: 'object',
    properties: {
      confirmReset: {
        type: 'boolean',
        description: 'Confirm the reset action',
      },
    },
  },
  outputs: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      message: { type: 'string' },
    },
  },
  tags: ['theme', 'reset', 'default'],
  tool_call_template: {
    call_template_type: 'panel_event',
    event_type: 'industry-theme.theme-editor:reset-theme',
  },
};

/**
 * Tool: Apply Theme Preset
 */
export const applyThemePresetTool: PanelTool = {
  name: 'apply_theme_preset',
  description: 'Applies a predefined theme preset',
  inputs: {
    type: 'object',
    properties: {
      presetName: {
        type: 'string',
        description: 'The name of the preset to apply (e.g., "dark", "light", "high-contrast")',
      },
    },
    required: ['presetName'],
  },
  outputs: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      appliedPreset: { type: 'string' },
    },
  },
  tags: ['theme', 'preset', 'customization'],
  tool_call_template: {
    call_template_type: 'panel_event',
    event_type: 'industry-theme.theme-editor:apply-preset',
  },
};

/**
 * Tool: Export Theme
 */
export const exportThemeTool: PanelTool = {
  name: 'export_theme',
  description: 'Exports the current theme configuration',
  inputs: {
    type: 'object',
    properties: {
      format: {
        type: 'string',
        enum: ['json', 'css', 'scss'],
        description: 'The export format',
      },
    },
  },
  outputs: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      format: { type: 'string' },
      content: { type: 'string' },
    },
  },
  tags: ['theme', 'export', 'configuration'],
  tool_call_template: {
    call_template_type: 'panel_event',
    event_type: 'industry-theme.theme-editor:export-theme',
  },
};

/**
 * All tools exported as an array.
 */
export const themeEditorTools: PanelTool[] = [
  setThemeColorTool,
  resetThemeTool,
  applyThemePresetTool,
  exportThemeTool,
];

/**
 * Panel tools metadata for registration with PanelToolRegistry.
 */
export const themeEditorToolsMetadata: PanelToolsMetadata = {
  id: 'industry-theme.theme-editor',
  name: 'Theme Editor',
  description: 'Tools provided by the Industry Theme Editor panel extension',
  tools: themeEditorTools,
};
