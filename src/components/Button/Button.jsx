import MuiButton from '@mui/material/Button'

/**
 * Единая кнопка приложения (обёртка над MUI Button).
 * Прежний API сохранён: className, href, type, children.
 */
export default function Button({ type = 'button', variant = 'contained', ...rest }) {
  return <MuiButton type={type} variant={variant} {...rest} />
}
