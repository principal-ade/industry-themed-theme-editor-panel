import type { Meta, StoryObj } from '@storybook/react';
import { ThemeEditorPanel } from './ThemeEditorPanel';
import {
  MockPanelProvider,
  createMockContext,
  createMockActions,
  createMockEvents,
} from '../mocks/panelContext';

/**
 * ThemeEditorPanel allows users to customize the Industry theme colors.
 * It provides an interactive interface for modifying theme colors across
 * different categories including primary, background, text, UI, and status colors.
 */
const meta = {
  title: 'Panels/ThemeEditorPanel',
  component: ThemeEditorPanel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A theme customization panel for the Industry theme. Allows users to modify colors across different categories with live preview and reset functionality.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', background: '#1a1a1a' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    context: createMockContext(),
    actions: createMockActions(),
    events: createMockEvents(),
  },
} satisfies Meta<typeof ThemeEditorPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default theme editor view with all color categories
 */
export const Default: Story = {
  render: () => (
    <MockPanelProvider>
      {(props) => <ThemeEditorPanel {...props} />}
    </MockPanelProvider>
  ),
};

/**
 * Theme editor in a light theme context
 */
export const LightTheme: Story = {
  render: () => (
    <div style={{ height: '100vh', background: '#f5f5f5' }}>
      <MockPanelProvider>
        {(props) => <ThemeEditorPanel {...props} />}
      </MockPanelProvider>
    </div>
  ),
};

/**
 * Compact view - ideal for smaller viewports
 */
export const CompactView: Story = {
  render: () => (
    <div style={{ height: '600px', width: '400px', background: '#1a1a1a' }}>
      <MockPanelProvider>
        {(props) => <ThemeEditorPanel {...props} />}
      </MockPanelProvider>
    </div>
  ),
};

/**
 * Full height view - typical panel layout
 */
export const FullHeight: Story = {
  render: () => (
    <div style={{ height: '100vh', width: '450px', background: '#1a1a1a' }}>
      <MockPanelProvider>
        {(props) => <ThemeEditorPanel {...props} />}
      </MockPanelProvider>
    </div>
  ),
};

/**
 * Theme editor with custom repository context
 */
export const WithRepository: Story = {
  render: () => (
    <MockPanelProvider
      contextOverrides={{
        currentScope: {
          type: 'repository',
          workspace: {
            name: 'my-workspace',
            path: '/Users/developer/my-workspace',
          },
          repository: {
            name: 'my-project',
            path: '/Users/developer/my-workspace/my-project',
            branch: 'main',
            remote: 'origin',
          },
        },
      }}
    >
      {(props) => <ThemeEditorPanel {...props} />}
    </MockPanelProvider>
  ),
};

/**
 * Workspace-only context (no repository)
 */
export const WorkspaceOnly: Story = {
  render: () => (
    <MockPanelProvider
      contextOverrides={{
        currentScope: {
          type: 'workspace',
          workspace: {
            name: 'my-workspace',
            path: '/Users/developer/my-workspace',
          },
        },
      }}
    >
      {(props) => <ThemeEditorPanel {...props} />}
    </MockPanelProvider>
  ),
};

/**
 * Interactive demo with custom action handlers
 */
export const Interactive: Story = {
  render: () => {
    const context = createMockContext();
    const actions = createMockActions({
      // You can add custom action handlers here
      notifyPanels: (event) => {
        console.log('Theme changed:', event);
      },
    });
    const events = createMockEvents();

    return <ThemeEditorPanel context={context} actions={actions} events={events} />;
  },
};
