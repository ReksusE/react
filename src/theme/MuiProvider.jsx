import { useMemo } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { useTheme } from '@/context/ThemeContext'
import createAppTheme from './createAppTheme'

/** Связывает тему MUI с существующим ThemeContext (тёмная/светлая). */
export default function MuiProvider({ children }) {
  const { theme } = useTheme()
  const muiTheme = useMemo(() => createAppTheme(theme), [theme])

  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
}
