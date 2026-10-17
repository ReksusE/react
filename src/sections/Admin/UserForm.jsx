import { useState } from 'react'
import AuthField from '@/components/AuthField'
import Button from '@/components/Button'
import { ROLES } from '@/context/AuthContext'
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from '@/utils/validators'

export default function UserForm({ initial, onSubmit }) {
  const isEdit = Boolean(initial)
  const [values, setValues] = useState({
    name: initial?.name ?? '',
    email: initial?.email ?? '',
    phone: initial?.phone ?? '',
    role: initial?.role ?? 'client',
    password: '',
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
      // при создании пароль обязателен, при редактировании — только если меняем
      password: isEdit && !values.password ? '' : validatePassword(values.password),
    }

    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) {return}

    const error = onSubmit({
      ...values,
      password: values.password || undefined,
    })

    if (error) {setErrors({ email: error })}
  }

  return (
    <form className="modal__form" noValidate onSubmit={handleSubmit}>
      <div className="modal__form-grid">
        <AuthField id="user-name" label="Имя" value={values.name} onChange={setField('name')} error={errors.name} />
        <AuthField id="user-email" label="Email" type="email" value={values.email} onChange={setField('email')} error={errors.email} />
        <AuthField id="user-phone" label="Телефон" type="tel" placeholder="+375 (44) 000-00-00" value={values.phone} onChange={setField('phone')} error={errors.phone} />
        <div className="auth-field">
          <label className="auth-field__label" htmlFor="user-role">Роль</label>
          <select
            id="user-role"
            className="auth-field__input"
            value={values.role}
            onChange={(e) => setField('role')(e.target.value)}
          >
            {Object.entries(ROLES).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <span className="auth-field__error" />
        </div>
        <AuthField
          id="user-password"
          label={isEdit ? 'Новый пароль' : 'Пароль'}
          type="password"
          autoComplete="new-password"
          placeholder={isEdit ? 'Оставьте пустым, если не меняете' : 'Минимум 8 символов'}
          withStrength
          value={values.password}
          onChange={setField('password')}
          error={errors.password}
        />
      </div>
      <Button className="modal__btn" type="submit">
        {isEdit ? 'Сохранить' : 'Добавить пользователя'}
      </Button>
    </form>
  )
}
