import { useState } from 'react'
import Modal from '@/components/Modal'
import Button from '@/components/Button'
import AuthField from '@/components/AuthField'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from '@/utils/validators'

function ProfileForm({ user, onClose }) {
  const { updateUser } = useAuth()
  const { showToast } = useToast()
  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    password: '',
    passwordConfirm: '',
  })
  const [errors, setErrors] = useState({})

  const setField = (key) => (value) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const nextErrors = {
      name: validateName(values.name),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone),
      password: values.password ? validatePassword(values.password) : '',
      passwordConfirm:
        values.password && values.password !== values.passwordConfirm
          ? 'Пароли не совпадают'
          : '',
    }

    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) {return}

    const result = updateUser(user.id, {
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password || undefined,
    })

    if (!result.ok) {
      setErrors({ email: result.error })

      return
    }

    showToast('Профиль обновлён', 'success')
    onClose()
  }

  return (
    <form className="modal__form" noValidate onSubmit={handleSubmit}>
      <div className="modal__form-grid">
        <AuthField id="edit-name" label="Имя" value={values.name} onChange={setField('name')} error={errors.name} />
        <AuthField id="edit-email" label="Email" type="email" value={values.email} onChange={setField('email')} error={errors.email} />
        <AuthField id="edit-phone" label="Телефон" type="tel" placeholder="+375 (44) 000-00-00" value={values.phone} onChange={setField('phone')} error={errors.phone} />
        <AuthField
          id="edit-password"
          label="Новый пароль"
          type="password"
          autoComplete="new-password"
          placeholder="Оставьте пустым, если не меняете"
          value={values.password}
          onChange={setField('password')}
          error={errors.password}
        />
        <AuthField
          id="edit-password-confirm"
          label="Подтвердите пароль"
          type="password"
          autoComplete="new-password"
          value={values.passwordConfirm}
          onChange={setField('passwordConfirm')}
          error={errors.passwordConfirm}
        />
      </div>
      <Button className="modal__btn" type="submit">
        Сохранить изменения
      </Button>
    </form>
  )
}

export default function ProfileModal({ isOpen, onClose }) {
  const { user } = useAuth()

  return (
    <Modal
      isOpen={isOpen && Boolean(user)}
      title="Редактировать профиль"
      subtitle="Измените данные вашего аккаунта"
      onClose={onClose}
    >
      {user && <ProfileForm user={user} onClose={onClose} />}
    </Modal>
  )
}
