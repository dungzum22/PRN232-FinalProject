export const theme = {
  colors: {
    // Bakery warm color palette
    primary: '#d97757',
    primaryDark: '#c45a3a',
    primaryLight: '#e89b7f',
    
    secondary: '#f5e6d3',
    secondaryDark: '#e8d4b8',
    
    background: '#fefaf7',
    backgroundAlt: '#f9f1ea',
    
    text: '#2d1b12',
    textLight: '#6b5a4d',
    textMuted: '#9a8a7d',
    
    white: '#ffffff',
    black: '#000000',
    
    // Status colors
    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
    
    // UI colors
    border: 'rgba(217, 119, 87, 0.15)',
    borderLight: 'rgba(217, 119, 87, 0.1)',
    shadow: 'rgba(45, 27, 18, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  
  fonts: {
    primary: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    heading: "'Georgia', 'Times New Roman', serif",
  },
  
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },
  
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
  },
  
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(45, 27, 18, 0.05)',
    md: '0 4px 6px -1px rgba(45, 27, 18, 0.1), 0 2px 4px -1px rgba(45, 27, 18, 0.06)',
    lg: '0 10px 15px -3px rgba(45, 27, 18, 0.1), 0 4px 6px -2px rgba(45, 27, 18, 0.05)',
    xl: '0 20px 25px -5px rgba(45, 27, 18, 0.1), 0 10px 10px -5px rgba(45, 27, 18, 0.04)',
  },
  
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
  
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

export type Theme = typeof theme;

