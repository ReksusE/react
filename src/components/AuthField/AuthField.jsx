import './AuthField.scss'
import { useState } from 'react'
import clsx from 'clsx'
import PhoneInput from '@/components/PhoneInput'
import { getPasswordStrength } from '@/utils/validators'

const EyeIcon = () => (
  <svg width="18" height="14" viewBox="0 0 24 18" fill="none" aria-hidden="true">
    <path d="M12 1C6.5 1 1.5 5 1 9C1.5 13 6.5 17 12 17C17.5 17 22.5 13 23 9C22.5 5 17.5 1 12 1Z" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

/**
 * Поле формы в стиле auth-field.
 * type: text | email | password | tel (с маской)
 * withStrength — индикатор надёжности пароля
 */
export default function AuthField(props) {
  const {
    id,
    label,
    type = 'text',
    value,
    onChange,
    error,
    withStrength = false,
    className,
    ...rest
  } = props

  const [isShown, setIsShown] = useState(false)
  const isPassword = type === 'password'
  const strength = withStrength ? getPasswordStrength(value) : null
  const common = {
    id,
    className: 'auth-field__input',
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-error` : undefined,
    ...rest,
  }

  let control

  if (type === 'tel') {
    control = <PhoneInput value={value} onChange={onChange} {...common} />
  } else {
    control = (
      <input
        {...common}
        type={isPassword && isShown ? 'text' : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }

  return (
    <div className={clsx('auth-field', error && 'has-error', className)}>
      <label className="auth-field__label" htmlFor={id}>
        {label}
      </label>

      {isPassword ? (
        <div className="auth-field__input-wrap">
          {control}
          <button
            type="button"
            className="auth-field__toggle"
            aria-label={isShown ? 'Скрыть пароль' : 'Показать пароль'}
            aria-pressed={isShown}
            onClick={() => setIsShown((prev) => !prev)}
          >
            <EyeIcon />
          </button>
        </div>
      ) : (
        control
      )}

      {strength && value && (
        <>
          <div className="auth-strength" data-level={strength.score}>
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className={clsx('auth-strength__bar', n <= strength.score && 'is-active')}
              />
            ))}
          </div>
          <span className="auth-strength__text">{strength.label}</span>
        </>
      )}

      <span className="auth-field__error" id={`${id}-error`} role={error ? 'alert' : undefined}>
        {error}
      </span>
    </div>
  )
}
