import './Modal.scss'
import { useEffect } from 'react'
import ModalContactForm from './ModalContactForm'
import ModalRealizationForm from './ModalRealizationForm'

const MODALS = {
  founder: {
    title: 'Получить консультацию руководителя',
    subtitle:
      'Оставьте ваши контакты, и руководитель бюро свяжется с вами для детального обсуждения и помощи с вашим проектом',
    form: 'contact',
  },
  showroom: {
    title: 'Заказать обратный звонок',
    form: 'contact',
  },
  realization: {
    title: 'Получить предварительную оценку проекта',
    subtitle:
      'Отправьте ваш проект, и специалисты бюро сделают его предварительную оценку и предложат способы реализации.',
    form: 'realization',
  },
}

export default function Modal({ type, onClose }) {
  const modal = MODALS[type]

  useEffect(() => {
    if (!modal) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.documentElement.classList.add('is-lock')

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.documentElement.classList.remove('is-lock')
    }
  }, [modal, onClose])

  if (!modal) return null

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${type}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="modal__content">
        <button
          className="modal__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="modal__title" id={`modal-title-${type}`}>
          {modal.title}
        </h2>

        {modal.subtitle && (
          <p className="modal__subtitle">{modal.subtitle}</p>
        )}

        {modal.form === 'contact' ? (
          <ModalContactForm />
        ) : (
          <ModalRealizationForm />
        )}
      </div>
    </div>
  )
}
