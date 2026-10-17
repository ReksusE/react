import { useState } from 'react'
import Modal from '@/components/Modal'
import Button from '@/components/Button'
import AuthField from '@/components/AuthField'
import { useToast } from '@/context/ToastContext'
import { validateName, validatePhone } from '@/utils/validators'

function CallbackForm({ onClose }) {
  const { showToast } = useToast()
  const [values, setValues] = useState({ name: '', phone: '', agree: true })
  const [errors, setErrors] = useState({})

  const setField = (key) => (value) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const nextErrors = {
      name: validateName(values.name),
      phone: validatePhone(values.phone, { required: true }),
      agree: values.agree ? '' : 'Необходимо согласие',
    }

    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) {return}

    showToast('Заявка отправлена, мы перезвоним вам', 'success')
    onClose()
  }

  return (
    <form className="modal__form" noValidate onSubmit={handleSubmit}>
      <AuthField id="callback-name" label="Ваше имя" value={values.name} onChange={setField('name')} error={errors.name} />
      <AuthField id="callback-phone" label="Ваш телефон" type="tel" placeholder="+375 (44) 000-00-00" value={values.phone} onChange={setField('phone')} error={errors.phone} />
      <label className="modal__checkbox-label">
        <input
          type="checkbox"
          checked={values.agree}
          onChange={(e) => setField('agree')(e.target.checked)}
        />
        <span>
          Нажимая на кнопку я соглашаюсь с{' '}
          <a href="#" onClick={(e) => e.preventDefault()}>политикой конфиденциальности</a>
        </span>
      </label>
      <span className="auth-field__error">{errors.agree}</span>
      <Button className="modal__btn" type="submit">
        Отправить
      </Button>
    </form>
  )
}

export default function CallbackModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} title="Заказать обратный звонок" onClose={onClose}>
      <CallbackForm onClose={onClose} />
    </Modal>
  )
}
