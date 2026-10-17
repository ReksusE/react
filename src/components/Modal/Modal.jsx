import './Modal.scss'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'

export default function Modal({ isOpen, title, subtitle, onClose, className, children }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {return}

    const previouslyFocused = document.activeElement
    const onKeyDown = (e) => e.key === 'Escape' && onClose()

    document.addEventListener('keydown', onKeyDown)
    document.documentElement.classList.add('is-lock')
    dialogRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.documentElement.classList.remove('is-lock')
      previouslyFocused?.focus?.()
    }
  }, [isOpen, onClose])

  if (!isOpen) {return null}

  return createPortal(
    <div
      className="modal"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={clsx('modal__dialog', className)}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={dialogRef}
      >
        <button
          type="button"
          className="modal__close"
          aria-label="Закрыть"
          onClick={onClose}
        >
          ×
        </button>
        {title && <h2 className="modal__title">{title}</h2>}
        {subtitle && <p className="modal__subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>,
    document.body
  )
}
