import { alpha, createTheme } from '@mui/material/styles';

// Visual refresh: warm neutral base + emerald accent.
// Functionality remains unchanged; only theme tokens + component styling change.
const emerald = '#059669';
const amber = '#f59e0b';
const ink = '#0b1220';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: emerald,
      dark: '#047857',
      light: '#34d399',
      contrastText: '#ffffff',
    },
    secondary: {
      main: amber,
      dark: '#b45309',
      light: '#fbbf24',
      contrastText: '#111827',
    },
    success: {
      main: '#16a34a',
    },
    warning: {
      main: '#f97316',
    },
    error: {
      main: '#dc2626',
    },
    background: {
      default: '#fbf7f1',
      paper: '#ffffff',
    },
    text: {
      primary: ink,
      secondary: '#374151',
    },
    divider: alpha(ink, 0.12),
    action: {
      hover: alpha(emerald, 0.08),
      selected: alpha(emerald, 0.12),
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
    h1: { fontFamily: '"Manrope", "Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.03em' },
    h2: { fontFamily: '"Manrope", "Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontFamily: '"Manrope", "Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontFamily: '"Manrope", "Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontFamily: '"Manrope", "Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h6: { fontFamily: '"Manrope", "Plus Jakarta Sans", sans-serif', fontWeight: 700, letterSpacing: '-0.01em' },
    subtitle2: {
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      fontSize: '0.72rem',
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: `${alpha(emerald, 0.35)} transparent`,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 18,
          paddingBlock: 10,
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${alpha(ink, 0.08)}`,
          borderRadius: 18,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 999,
        },
      },
    },
  },
});
