import React, { useState, useRef, useEffect } from 'react';
import {
  ThemeProvider,
  useTheme,
  terminalTheme,
  regalTheme,
  matrixTheme,
  matrixMinimalTheme,
  slateTheme,
  defaultMarkdownTheme,
  defaultEditorTheme,
  defaultTerminalTheme,
  landingPageTheme,
  landingPageLightTheme,
  type Theme,
} from '@principal-ade/industry-theme';
import { Palette, HelpCircle, ChevronDown } from 'lucide-react';
import type { PanelComponentProps } from '../types';
import { ColorPickerInput } from '../components/ColorPickerInput';

/**
 * Theme presets from the industry-theme library
 */
interface ThemePreset {
  name: string;
  label: string;
  theme: Theme;
}

const THEME_PRESETS: ThemePreset[] = [
  { name: 'terminal', label: 'Terminal', theme: terminalTheme },
  { name: 'regal', label: 'Regal', theme: regalTheme },
  { name: 'matrix', label: 'Matrix', theme: matrixTheme },
  { name: 'matrixMinimal', label: 'Matrix Minimal', theme: matrixMinimalTheme },
  { name: 'slate', label: 'Slate', theme: slateTheme },
  { name: 'markdown', label: 'Markdown', theme: defaultMarkdownTheme },
  { name: 'editor', label: 'Editor', theme: defaultEditorTheme },
  { name: 'terminalDefault', label: 'Terminal Default', theme: defaultTerminalTheme },
  { name: 'landingPage', label: 'Landing Page', theme: landingPageTheme },
  { name: 'landingPageLight', label: 'Landing Light', theme: landingPageLightTheme },
];

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

interface ThemeEditorPanelContentProps extends PanelComponentProps {
  selectedPreset: string;
  onPresetSelect: (presetName: string) => void;
}

/**
 * ThemeEditorPanelContent - Internal component that uses theme
 */
const ThemeEditorPanelContent: React.FC<ThemeEditorPanelContentProps> = ({
  selectedPreset,
  onPresetSelect,
}) => {
  const { theme } = useTheme();
  const [showHelp, setShowHelp] = useState(false);
  const [presetDropdownOpen, setPresetDropdownOpen] = useState(false);
  const presetDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (presetDropdownRef.current && !presetDropdownRef.current.contains(event.target as Node)) {
        setPresetDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePresetSelect = (presetName: string) => {
    setPresetDropdownOpen(false);
    onPresetSelect(presetName);
  };

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

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Preset Dropdown */}
            <div ref={presetDropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setPresetDropdownOpen(!presetDropdownOpen)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${theme.colors.border}`,
                  backgroundColor: presetDropdownOpen ? theme.colors.backgroundSecondary : theme.colors.background,
                  color: theme.colors.text,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: theme.fontSizes[1],
                  fontFamily: theme.fonts.body,
                  transition: 'all 0.15s',
                  minWidth: '140px',
                  justifyContent: 'space-between',
                }}
                onMouseEnter={(e) => {
                  if (!presetDropdownOpen) {
                    e.currentTarget.style.backgroundColor = theme.colors.backgroundSecondary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!presetDropdownOpen) {
                    e.currentTarget.style.backgroundColor = theme.colors.background;
                  }
                }}
              >
                <span>{THEME_PRESETS.find((p) => p.name === selectedPreset)?.label || 'Select Preset'}</span>
                <ChevronDown
                  size={16}
                  style={{
                    transform: presetDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.15s',
                  }}
                />
              </button>

              {/* Dropdown Menu */}
              {presetDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '4px',
                    backgroundColor: theme.colors.background,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '6px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    zIndex: 1000,
                    minWidth: '160px',
                    overflow: 'hidden',
                  }}
                >
                  {THEME_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => handlePresetSelect(preset.name)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: 'none',
                        backgroundColor:
                          selectedPreset === preset.name ? theme.colors.backgroundSecondary : 'transparent',
                        color: theme.colors.text,
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: theme.fontSizes[1],
                        fontFamily: theme.fonts.body,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'background-color 0.1s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme.colors.backgroundSecondary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          selectedPreset === preset.name ? theme.colors.backgroundSecondary : 'transparent';
                      }}
                    >
                      {/* Color preview dots */}
                      <div style={{ display: 'flex', gap: '3px' }}>
                        <span
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: preset.theme.colors.primary,
                            border: `1px solid ${theme.colors.border}`,
                          }}
                        />
                        <span
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: preset.theme.colors.background,
                            border: `1px solid ${theme.colors.border}`,
                          }}
                        />
                        <span
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: preset.theme.colors.accent,
                            border: `1px solid ${theme.colors.border}`,
                          }}
                        />
                      </div>
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
              )}
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
  const [selectedPreset, setSelectedPreset] = useState<string>('terminal');

  const currentTheme = THEME_PRESETS.find((p) => p.name === selectedPreset)?.theme ?? terminalTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <ThemeEditorPanelContent
        {...props}
        selectedPreset={selectedPreset}
        onPresetSelect={setSelectedPreset}
      />
    </ThemeProvider>
  );
};
