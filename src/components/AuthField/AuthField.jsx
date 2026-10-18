import { useState } from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import PhoneInput from '@/components/PhoneInput'
import { getPasswordStrength } from '@/utils/validators'

const STRENGTH_COLORS = ['inherit', 'error', 'warning', 'info', 'success']

/**
 * Поле формы на базе MUI TextField.
 * type: text | email | password | tel (с маской)
 * withStrength — индикатор надёжности пароля
 */
export default function AuthField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  withStrength = false,
  className,
  ...rest
}) {
  const [isShown, setIsShown] = useState(false)
  const isPassword = type === 'password'
  const isPhone = type === 'tel'
  const strength = withStrength ? getPasswordStrength(value) : null

  const input = {}

  if (isPhone) {input.inputComponent = PhoneInput}
  if (isPassword) {
    input.endAdornment = (
      <InputAdornment position="end">
        <IconButton
          edge="end"
          aria-label={isShown ? 'Скрыть пароль' : 'Показать пароль'}
          aria-pressed={isShown}
          onClick={() => setIsShown((prev) => !prev)}
        >
          {isShown ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
        </IconButton>
      </InputAdornment>
    )
  }

  return (
    <Box className={className} sx={{ mb: 1 }}>
      <TextField
        id={id}
        label={label}
        type={isPassword && isShown ? 'text' : isPhone ? 'tel' : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={Boolean(error)}
        helperText={error || ' '}
        slotProps={{
          input,
          inputLabel: { shrink: isPhone || undefined },
          formHelperText: { role: error ? 'alert' : undefined },
        }}
        {...rest}
      />

      {strength && value && (
        <Box sx={{ mt: -0.5 }}>
          <LinearProgress
            variant="determinate"
            value={strength.score * 25}
            color={STRENGTH_COLORS[strength.score]}
            aria-label="Надёжность пароля"
          />
          <Typography variant="caption" color="text.secondary">
            {strength.label}
          </Typography>
        </Box>
      )}
    </Box>
  )
}
