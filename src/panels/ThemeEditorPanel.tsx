import React, { useState } from 'react';
import { ThemeProvider, useTheme } from '@principal-ade/industry-theme';
import { Palette, HelpCircle } from 'lucide-react';
import type { PanelComponentProps } from '../types';
import { ColorPickerInput } from '../components/ColorPickerInput';

interface ColorConfig {
  label: string;
  path: string;
}

/**
 * HelpContent - Displays help information for the theme editor
 */
const HelpContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <p
        style={{
          margin: '0 0 24px 0',
          fontSize: '15px',
          lineHeight: '1.6',
          color: theme.colors.text,
        }}
      >
        Customize the Industry theme colors to match your preferences. Changes will be saved automatically.
      </p>

      <div
        style={{
          padding: '20px',
          backgroundColor: theme.colors.backgroundSecondary,
          borderRadius: '8px',
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        <h4
          style={{
            margin: '0 0 16px 0',
            fontSize: theme.fontSizes[3],
            color: theme.colors.text,
            fontWeight: 600,
          }}
        >
          How to Use
        </h4>
        <ul
          style={{
            margin: 0,
            paddingLeft: '20px',
            fontSize: '14px',
            color: theme.colors.textSecondary,
            lineHeight: '1.8',
          }}
        >
          <li>Click the color square to open the color picker</li>
          <li>Enter hex values directly in the input field</li>
          <li>Use the reset button to revert individual colors</li>
          <li>All changes are applied immediately</li>
        </ul>
      </div>
    </div>
  );
};

const COLOR_GROUPS: Record<string, ColorConfig[]> = {
  'Primary Colors': [
    { label: 'Primary', path: 'colors.primary' },
    { label: 'Secondary', path: 'colors.secondary' },
    { label: 'Accent', path: 'colors.accent' },
  ],
  'Background Colors': [
    { label: 'BG Default', path: 'colors.background' },
    { label: 'BG Light', path: 'colors.backgroundLight' },
    { label: 'BG Dark', path: 'colors.backgroundDark' },
    { label: 'BG Secondary', path: 'colors.backgroundSecondary' },
    { label: 'BG Tertiary', path: 'colors.backgroundTertiary' },
  ],
  'Text Colors': [
    { label: 'Text', path: 'colors.text' },
    { label: 'Text Secondary', path: 'colors.textSecondary' },
    { label: 'Text Tertiary', path: 'colors.textTertiary' },
  ],
  'UI Colors': [
    { label: 'Border', path: 'colors.border' },
    { label: 'Border Light', path: 'colors.borderLight' },
    { label: 'Border Dark', path: 'colors.borderDark' },
  ],
  'Status Colors': [
    { label: 'Success', path: 'colors.success' },
    { label: 'Warning', path: 'colors.warning' },
    { label: 'Error', path: 'colors.error' },
    { label: 'Info', path: 'colors.info' },
  ],
};

/**
 * ThemeEditorPanelContent - Internal component that uses theme
 */
const ThemeEditorPanelContent: React.FC<PanelComponentProps> = () => {
  const { theme } = useTheme();
  const [showHelp, setShowHelp] = useState(false);

  const handleColorChange = async (path: string, newValue: string) => {
    // TODO: Implement theme update via panel framework actions
    console.log(`Update ${path} to ${newValue}`);
  };

  const handleResetColor = async (path: string) => {
    // TODO: Implement reset via panel framework actions
    console.log(`Reset ${path}`);
  };

  const getColorValue = (path: string): string => {
    const parts = path.split('.');
    let value: any = theme;

    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        return '#000000';
      }
    }

    return typeof value === 'string' ? value : '#000000';
  };

  return (
    <div
      style={{
        fontFamily: theme.fonts.body,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header - Fixed */}
      <div
        style={{
          padding: '20px',
          borderBottom: `1px solid ${theme.colors.border}`,
          flex: '0 0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Palette size={24} color={theme.colors.primary} />
            <h2
              style={{
                margin: 0,
                fontSize: theme.fontSizes[4],
                color: theme.colors.text,
              }}
            >
              Theme Editor
            </h2>
          </div>

          {/* Help Button */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            title="Help"
            style={{
              padding: '8px',
              borderRadius: '6px',
              border: `1px solid ${theme.colors.border}`,
              backgroundColor: showHelp ? theme.colors.backgroundSecondary : theme.colors.background,
              color: theme.colors.text,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              if (!showHelp) {
                e.currentTarget.style.backgroundColor = theme.colors.backgroundSecondary;
              }
            }}
            onMouseLeave={(e) => {
              if (!showHelp) {
                e.currentTarget.style.backgroundColor = theme.colors.background;
              }
            }}
          >
            <HelpCircle size={18} />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        style={{
          flex: '1 1 auto',
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {showHelp ? (
          <HelpContent />
        ) : (
          /* Color Groups */
          <>
            {Object.entries(COLOR_GROUPS).map(([groupName, colors]) => (
              <section
                key={groupName}
                style={{
                  padding: '16px',
                  background: theme.colors.backgroundSecondary,
                  borderRadius: theme.radii[2],
                  border: `1px solid ${theme.colors.border}`,
                  flex: '0 0 auto',
                }}
              >
                <h3
                  style={{
                    margin: '0 0 16px 0',
                    fontSize: theme.fontSizes[3],
                    color: theme.colors.text,
                    fontWeight: 600,
                  }}
                >
                  {groupName}
                </h3>
                {colors.map((color) => (
                  <ColorPickerInput
                    key={color.path}
                    label={color.label}
                    value={getColorValue(color.path)}
                    onChange={(newValue) => handleColorChange(color.path, newValue)}
                    onReset={() => handleResetColor(color.path)}
                    defaultValue={getColorValue(color.path)}
                  />
                ))}
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

/**
 * ThemeEditorPanel - A panel for customizing the Industry theme colors.
 *
 * This panel allows users to:
 * - Customize theme colors across different categories
 * - Preview changes in real-time
 * - Reset individual colors to defaults
 * - Save theme customizations
 */
export const ThemeEditorPanel: React.FC<PanelComponentProps> = (props) => {
  return (
    <ThemeProvider>
      <ThemeEditorPanelContent {...props} />
    </ThemeProvider>
  );
};
