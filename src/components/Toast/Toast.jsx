import './Toast.scss'
import clsx from 'clsx'

export default function Toast({ toasts, onDismiss }) {
  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map(({ id, text, type }) => (
        <div className={clsx('toast', `toast--${type}`)} key={id}>
          <span className="toast__text">{text}</span>
          <button
            type="button"
            className="toast__close"
            aria-label="Закрыть"
            onClick={() => onDismiss(id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
