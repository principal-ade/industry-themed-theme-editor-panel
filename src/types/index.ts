/**
 * Panel Extension Type Definitions
 *
 * Re-exports core types from @principal-ade/panel-framework-core
 */

// Re-export all core types from panel-framework-core
export type {
  // Core data types
  DataSlice,
  WorkspaceMetadata,
  RepositoryMetadata,
  FileTreeSource,
  ActiveFileSlice,

  // Event system
  PanelEventType,
  PanelEvent,
  PanelEventEmitter,

  // Panel interface
  PanelActions,
  PanelContextValue,
  PanelComponentProps,

  // Panel definition
  PanelMetadata,
  PanelLifecycleHooks,
  PanelDefinition,
  PanelModule,

  // Registry types
  PanelRegistryEntry,
  PanelLoader,
  PanelRegistryConfig,

  // Tool types (UTCP-compatible)
  PanelTool,
  PanelToolsMetadata,
  JsonSchema,
  PanelEventCallTemplate,
} from '@principal-ade/panel-framework-core';

import type {
  PanelActions as CorePanelActions,
  PanelComponentProps as CorePanelComponentProps,
} from '@principal-ade/panel-framework-core';

/**
 * Empty context for ThemeEditorPanel
 * This panel doesn't use any data slices - it only uses the useTheme hook
 */
export interface ThemeEditorPanelContext {}

/**
 * Typed props for ThemeEditorPanel
 */
export type ThemeEditorPanelPropsTyped = CorePanelComponentProps<
  CorePanelActions,
  ThemeEditorPanelContext
>;
