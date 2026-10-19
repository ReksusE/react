import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'

/** Уведомления: стек MUI Snackbar + Alert (тип: success | error | info). */
export default function Toast({ toasts, onDismiss }) {
  return (
    <Stack
      spacing={1}
      role="status"
      aria-live="polite"
      sx={{
        position: 'fixed',
        zIndex: (theme) => theme.zIndex.snackbar,
        bottom: 80,
        right: 20,
        maxWidth: 'calc(100vw - 40px)',
      }}
    >
      {toasts.map(({ id, text, type }) => (
        <Snackbar
          key={id}
          open
          sx={{ position: 'static', transform: 'none' }}
          onClose={(_, reason) => reason !== 'clickaway' && onDismiss(id)}
        >
          <Alert
            severity={type === 'error' || type === 'success' ? type : 'info'}
            variant="filled"
            onClose={() => onDismiss(id)}
            sx={{ width: '100%' }}
          >
            {text}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
  )
}
