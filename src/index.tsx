import { ThemeEditorPanel } from './panels/ThemeEditorPanel';
import type { PanelDefinition, PanelContextValue } from './types';
import { themeEditorTools } from './tools';

/**
 * Export array of panel definitions.
 * This is the required export for panel extensions.
 */
export const panels: PanelDefinition[] = [
  {
    metadata: {
      id: 'industry-theme.theme-editor',
      name: 'Theme Editor',
      icon: '🎨',
      version: '0.1.0',
      author: 'Principal ADE',
      description: 'Customize Industry theme colors and appearance',
      slices: [], // This panel doesn't need data slices
      tools: themeEditorTools,
    },
    component: ThemeEditorPanel,

    // Optional: Called when this specific panel is mounted
    onMount: async (context: PanelContextValue) => {
      // eslint-disable-next-line no-console
      console.log(
        'Theme Editor Panel mounted',
        context.currentScope.repository?.path
      );
    },

    // Optional: Called when this specific panel is unmounted
    onUnmount: async (_context: PanelContextValue) => {
      // eslint-disable-next-line no-console
      console.log('Theme Editor Panel unmounting');
    },
  },
];

/**
 * Optional: Called once when the entire package is loaded.
 * Use this for package-level initialization.
 */
export const onPackageLoad = async () => {
  // eslint-disable-next-line no-console
  console.log('Panel package loaded - Theme Editor Panel Extension');
};

/**
 * Optional: Called once when the package is unloaded.
 * Use this for package-level cleanup.
 */
export const onPackageUnload = async () => {
  // eslint-disable-next-line no-console
  console.log('Panel package unloading - Theme Editor Panel Extension');
};

// Export tools for server-safe imports
export {
  themeEditorTools,
  themeEditorToolsMetadata,
  setThemeColorTool,
  resetThemeTool,
  applyThemePresetTool,
  exportThemeTool,
} from './tools';
