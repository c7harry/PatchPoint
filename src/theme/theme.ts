import { MD3DarkTheme } from 'react-native-paper';

// Core brand color from favicon/logo
const BRAND_PRIMARY = '#209648';

export const palette = {
  primary: BRAND_PRIMARY,
  primaryDark: '#167239',
  primaryDarker: '#0f5229',
  primaryLight: '#40b866',
  primaryLighter: '#72d491',
  background: '#091611',
  surface: '#13261d',
  surfaceAlt: '#0f1f18',
  surfaceElevated: '#163324',
  outline: '#2e5745',
  textPrimary: '#f2f9f5',
  textSecondary: '#c4d9cf',
  textMuted: '#7da892',
  accent: '#d4f7e3',
  accentWarm: '#f5c451',
  danger: '#e54848',
  gradientTop: '#0b1d15',
  gradientBottom: '#143626',
  chipBg: 'rgba(32,150,72,0.15)',
  chipActive: BRAND_PRIMARY,
};

export const appTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: palette.primary,
    secondary: palette.primaryLight,
    background: palette.background,
    surface: palette.surface,
    surfaceVariant: palette.surfaceElevated,
    outline: palette.outline,
    onSurface: palette.textPrimary,
    onSurfaceVariant: palette.textSecondary,
    onPrimary: '#ffffff',
    error: palette.danger,
  },
};

export type AppTheme = typeof appTheme;
