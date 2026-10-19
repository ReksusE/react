import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import './Modal.scss'

/**
 * Модальное окно на базе MUI Dialog (фокус-ловушка, Esc, блокировка скролла
 * и возврат фокуса обеспечивает сама библиотека).
 */
export default function Modal({
  isOpen,
  title,
  subtitle,
  onClose,
  className,
  maxWidth = 'md',
  children,
}) {
  return (
    <Dialog
      open={Boolean(isOpen)}
      onClose={onClose}
      maxWidth={maxWidth}
      className={className}
      aria-label={title}
      scroll="body"
    >
      <IconButton
        aria-label="Закрыть"
        onClick={onClose}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>

      {title && (
        <DialogTitle sx={{ pr: 7, textTransform: 'uppercase' }}>
          {title}
          {subtitle && (
            <Typography variant="body2" color="text.secondary" component="p">
              {subtitle}
            </Typography>
          )}
        </DialogTitle>
      )}

      <DialogContent sx={{ pt: title ? 1 : 3 }}>{children}</DialogContent>
    </Dialog>
  )
}
