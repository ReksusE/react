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
    if (!modal) {
      return undefined
    }

    document.documentElement.classList.add('is-lock')

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.documentElement.classList.remove('is-lock')
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [modal, onClose])

  if (!modal) {
    return null
  }

  return (
    <div className="modal is-active">
      <div
        className="modal__overlay"
        role="button"
        tabIndex={0}
        aria-label="Закрыть модальное окно"
        onClick={onClose}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            onClose()
          }
        }}
      />

      <div className="modal__content">
        <header className="modal__header">
          <button
            className="modal__close"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          >
            ×
          </button>

          <h2 className="modal__title">
            {modal.title}
          </h2>

          {modal.subtitle && (
            <p className="modal__subtitle">
              {modal.subtitle}
            </p>
          )}
        </header>

        <div className="modal__body">
          {modal.form === 'contact' ? (
            <ModalContactForm />
          ) : (
            <ModalRealizationForm />
          )}
        </div>
      </div>
    </div>
  )
}
