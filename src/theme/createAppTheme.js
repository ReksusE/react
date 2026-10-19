import { createTheme } from '@mui/material/styles'

/**
 * Палитра повторяет CSS-переменные из styles/variables.scss,
 * поэтому компоненты MUI выглядят так же, как ранее сверстанные страницы.
 */
const palettes = {
  dark: {
    mode: 'dark',
    primary: { main: '#fb8d28', dark: '#c06402', contrastText: '#1a1a18' },
    secondary: { main: '#f07c00' },
    error: { main: '#e5484d' },
    background: { default: '#1a1a18', paper: '#242422' },
    text: { primary: '#ffffff', secondary: '#939393' },
    divider: 'rgba(255, 255, 255, 0.15)',
  },
  light: {
    mode: 'light',
    primary: { main: '#2895fb', dark: '#025ec0', contrastText: '#ffffff' },
    secondary: { main: '#0074f0' },
    error: { main: '#d32f2f' },
    background: { default: '#ffffff', paper: '#f5f5f5' },
    text: { primary: '#1a1a18', secondary: '#666666' },
    divider: 'rgba(0, 0, 0, 0.15)',
  },
}

const fontFamily = "'HelveticaNeueCyr', 'Roboto', sans-serif"

export default function createAppTheme(mode = 'dark') {
  return createTheme({
    palette: palettes[mode] ?? palettes.dark,
    shape: { borderRadius: 4 },
    typography: {
      fontFamily,
      h1: { fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 3rem)' },
      h2: { fontWeight: 700, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' },
      h3: { fontWeight: 700, fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' },
      button: { fontWeight: 700, letterSpacing: '0.04em' },
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { textTransform: 'uppercase' } },
      },
      MuiDialog: {
        defaultProps: { fullWidth: true, maxWidth: 'sm' },
        styleOverrides: { paper: { backgroundImage: 'none' } },
      },
      MuiTextField: { defaultProps: { size: 'small', fullWidth: true } },
      MuiChip: { defaultProps: { size: 'small', variant: 'outlined' } },
      MuiCard: { styleOverrides: { root: { backgroundImage: 'none' } } },
      MuiTooltip: { defaultProps: { arrow: true } },
    },
  })
}
