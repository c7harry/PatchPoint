export const palette = {
  // Primary Brand Colors - Nature-inspired greens
  primary: '#10b981',          // Emerald green
  primaryLight: '#34d399',     // Light emerald
  primaryDark: '#059669',      // Dark emerald
  
  // Accent Colors
  accentWarm: '#f59e0b',       // Amber
  accentCool: '#06b6d4',       // Cyan
  
  // Background Hierarchy
  background: '#0a1a0e',       // Deep forest green (darkest)
  surface: '#1a2f23',          // Forest green (cards, elevated content)
  surfaceElevated: '#213529',  // Lighter forest (hover states)
  surfaceAlt: '#1e3126',       // Alternative surface
  
  // Gradients
  gradientTop: '#0d1f17',      // Top of main gradient
  gradientBottom: '#1a2f23',   // Bottom of main gradient
  
  // Text Colors
  textPrimary: '#ffffff',      // Primary white text
  textSecondary: 'rgba(255,255,255,0.8)',  // Secondary white text
  textMuted: 'rgba(255,255,255,0.6)',      // Muted white text
  textInverse: '#0a1a0e',      // Dark text for light backgrounds
  
  // Interactive Elements
  chipBg: 'rgba(255,255,255,0.1)',        // Default chip background
  chipActive: '#10b981',                   // Active chip background
  outline: 'rgba(255,255,255,0.2)',       // Borders and dividers
  
  // Status Colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Category Colors (for news categorization)
  categories: {
    Technology: '#3b82f6',     // Blue
    Health: '#ef4444',         // Red
    Sports: '#f59e0b',         // Orange
    Politics: '#8b5cf6',       // Purple
    Entertainment: '#ec4899',  // Pink
    Business: '#10b981',       // Green (matches primary)
    Local: '#06b6d4',         // Cyan
    Education: '#84cc16',      // Lime
  },
  
  // Shadows and Effects
  shadow: {
    small: '0 2px 8px rgba(0,0,0,0.15)',
    medium: '0 4px 16px rgba(0,0,0,0.2)',
    large: '0 8px 32px rgba(0,0,0,0.25)',
    colored: '0 8px 24px rgba(16,185,129,0.15)', // Primary colored shadow
  },
};

export const typography = {
  // Font Families
  fontFamily: {
    primary: 'Montserrat, System, -apple-system, BlinkMacSystemFont, sans-serif',
    secondary: 'Inter, System, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  
  // Font Sizes
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
    '5xl': 32,
    '6xl': 36,
  },
  
  // Font Weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
  
  // Letter Spacing
  letterSpacing: {
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  full: 9999,
};

export const animations = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 800,
  },
  
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

// Helper functions for dynamic theming
export const getCardVariantStyles = (variant: 'hero' | 'trending' | 'grid' | 'list') => {
  const baseStyles = {
    borderRadius: borderRadius.xl,
    backgroundColor: palette.surface,
    shadowColor: '#000',
  };

  switch (variant) {
    case 'hero':
      return {
        ...baseStyles,
        borderRadius: borderRadius['3xl'],
        shadowOpacity: 0.4,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
      };
    
    case 'trending':
      return {
        ...baseStyles,
        borderRadius: borderRadius['2xl'],
        shadowOpacity: 0.3,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 6 },
      };
    
    case 'grid':
      return {
        ...baseStyles,
        borderRadius: borderRadius.xl,
        shadowOpacity: 0.25,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
      };
    
    case 'list':
      return {
        ...baseStyles,
        borderRadius: borderRadius.lg,
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      };
    
    default:
      return baseStyles;
  }
};

export const getCategoryColor = (category: string): string => {
  return palette.categories[category as keyof typeof palette.categories] || palette.primary;
};

// Responsive breakpoints
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440,
};

// Theme object for React Native Paper
export const paperTheme = {
  colors: {
    primary: palette.primary,
    primaryContainer: palette.primaryLight,
    secondary: palette.accentWarm,
    secondaryContainer: palette.accentCool,
    surface: palette.surface,
    surfaceVariant: palette.surfaceAlt,
    background: palette.background,
    onPrimary: palette.textInverse,
    onSecondary: palette.textInverse,
    onSurface: palette.textPrimary,
    onBackground: palette.textPrimary,
    outline: palette.outline,
    error: palette.error,
  },
  fonts: {
    regular: {
      fontFamily: typography.fontFamily.secondary,
      fontWeight: typography.fontWeight.normal,
    },
    medium: {
      fontFamily: typography.fontFamily.primary,
      fontWeight: typography.fontWeight.medium,
    },
    bold: {
      fontFamily: typography.fontFamily.primary,
      fontWeight: typography.fontWeight.bold,
    },
  },
};

export default {
  palette,
  typography,
  spacing,
  borderRadius,
  animations,
  getCardVariantStyles,
  getCategoryColor,
  breakpoints,
  paperTheme,
};