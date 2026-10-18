import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DarkMode from '@mui/icons-material/DarkMode'
import LightMode from '@mui/icons-material/LightMode'
import { useTheme } from '@/context/ThemeContext'

const floatingSx = {
  position: 'fixed',
  zIndex: 500,
  right: 20,
  bottom: 20,
  width: 48,
  height: 48,
  bgcolor: 'background.paper',
  border: 1,
  borderColor: 'divider',
  boxShadow: 6,
  '&:hover': { bgcolor: 'background.paper' },
}

export default function ThemeToggle({ floating = false, className }) {
  const { theme, toggleTheme } = useTheme()
  const label = theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'

  return (
    <Tooltip title={label}>
      <IconButton
        className={className}
        aria-label={label}
        onClick={toggleTheme}
        sx={floating ? floatingSx : undefined}
      >
        {theme === 'dark' ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  )
}
