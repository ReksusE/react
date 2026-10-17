import './Auth.scss'
import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import AuthField from '@/components/AuthField'
import ThemeToggle from '@/components/ThemeToggle'
import { useAuth, DEMO_ADMIN } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from '@/utils/validators'
import {
  BackArrow,
  ClientIcon,
  DesignerIcon,
  GithubIcon,
  GoogleIcon,
  LogoMark,
  MasterIcon,
} from './AuthIcons'

const ROLE_OPTIONS = [
  { value: 'client', label: 'Клиент', Icon: ClientIcon },
  { value: 'designer', label: 'Дизайнер', Icon: DesignerIcon },
  { value: 'master', label: 'Мастер', Icon: MasterIcon },
]

const EMPTY_LOGIN = { email: '', password: '' }
const EMPTY_REGISTER = {
  role: 'client',
  name: '',
  email: '',
  phone: '',
  password: '',
  password2: '',
  agree: false,
}

// Имитация сетевого запроса — чтобы был виден спиннер на кнопке
const fakeRequest = () => new Promise((resolve) => setTimeout(resolve, 500))

export default function Auth() {
  const { user, login, register } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const [tab, setTab] = useState('login')
  const [loginValues, setLoginValues] = useState(EMPTY_LOGIN)
  const [registerValues, setRegisterValues] = useState(EMPTY_REGISTER)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [wasLoggedIn] = useState(Boolean(user))

  // Зашли на страницу уже авторизованными — отправляем на главную.
  // После успешного входа переход делаем сами (с учётом роли и from).
  if (wasLoggedIn) {
    return <Navigate to="/" replace />
  }

  const from = location.state?.from?.pathname

  const goAfterAuth = (authUser) =>
    navigate(from ?? (authUser.role === 'admin' ? '/admin' : '/'), { replace: true })

  const switchTab = (next) => {
    setTab(next)
    setErrors({})
  }

  const setLoginField = (key) => (value) => {
    setLoginValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const setRegisterField = (key) => (value) => {
    setRegisterValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    const nextErrors = {
      email: validateEmail(loginValues.email),
      password: loginValues.password ? '' : 'Введите пароль',
    }

    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) {return}

    setIsLoading(true)
    await fakeRequest()

    const result = login(loginValues.email, loginValues.password)

    setIsLoading(false)

    if (!result.ok) {
      setErrors({ password: result.error })
      showToast(result.error, 'error')

      return
    }

    showToast(`Добро пожаловать, ${result.user.name}!`, 'success')
    goAfterAuth(result.user)
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    const v = registerValues
    const nextErrors = {
      name: validateName(v.name),
      email: validateEmail(v.email),
      phone: validatePhone(v.phone),
      password: validatePassword(v.password),
      password2: v.password2 !== v.password ? 'Пароли не совпадают' : '',
      agree: v.agree ? '' : 'Необходимо принять условия',
    }

    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) {return}

    setIsLoading(true)
    await fakeRequest()

    const result = register({
      name: v.name,
      email: v.email,
      phone: v.phone,
      password: v.password,
      role: v.role,
    })

    setIsLoading(false)

    if (!result.ok) {
      setErrors({ email: result.error })
      showToast(result.error, 'error')

      return
    }

    showToast('Аккаунт создан', 'success')
    goAfterAuth(result.user)
  }

  const socialStub = (name) => () =>
    showToast(`Вход через ${name} пока недоступен`, 'info')

  return (
    <div className="auth">
      <header className="auth-header">
        <Link to="/" className="auth-header__logo">
          <img src="/images/logo.svg" alt="ArtKante" width="100" />
        </Link>
        <Link to="/" className="auth-header__back">
          <BackArrow />
          На главную
        </Link>
      </header>

      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-card__icon">
            <LogoMark />
          </div>

          <div className="auth-tabs" role="tablist">
            {[
              ['login', 'Вход'],
              ['register', 'Регистрация'],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={clsx('auth-tab', tab === key && 'is-active')}
                role="tab"
                id={`tab-${key}`}
                aria-selected={tab === key}
                aria-controls={`panel-${key}`}
                onClick={() => switchTab(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === 'login' ? (
            <form
              className="auth-form is-active"
              id="panel-login"
              role="tabpanel"
              aria-labelledby="tab-login"
              noValidate
              onSubmit={handleLogin}
            >
              <AuthField
                id="login-email"
                label="Email"
                type="email"
                placeholder="your@email.ru"
                autoComplete="email"
                value={loginValues.email}
                onChange={setLoginField('email')}
                error={errors.email}
              />
              <AuthField
                id="login-password"
                label="Пароль"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={loginValues.password}
                onChange={setLoginField('password')}
                error={errors.password}
              />

              <SubmitButton isLoading={isLoading}>Войти</SubmitButton>

              <div className="auth-divider">
                <span>или</span>
              </div>

              <div className="auth-socials">
                <button type="button" className="auth-social" onClick={socialStub('Google')}>
                  <GoogleIcon />
                  Google
                </button>
                <button type="button" className="auth-social" onClick={socialStub('GitHub')}>
                  <GithubIcon />
                  GitHub
                </button>
              </div>

              <p className="auth-footnote">
                Продолжая, вы соглашаетесь с&nbsp;
                <a href="#" onClick={(e) => e.preventDefault()}>
                  политикой конфиденциальности
                </a>
              </p>

              {import.meta.env.DEV && (
                <p className="auth-footnote auth-footnote--demo">
                  Демо-админ: {DEMO_ADMIN.email} / {DEMO_ADMIN.password}
                </p>
              )}
            </form>
          ) : (
            <form
              className="auth-form is-active"
              id="panel-register"
              role="tabpanel"
              aria-labelledby="tab-register"
              noValidate
              onSubmit={handleRegister}
            >
              <fieldset className="auth-field auth-roles-field">
                <legend className="auth-section-label">Тип аккаунта</legend>
                <div className="auth-roles">
                  {ROLE_OPTIONS.map(({ value, label, Icon }) => (
                    <label className="auth-role" key={value}>
                      <input
                        type="radio"
                        name="role"
                        value={value}
                        checked={registerValues.role === value}
                        onChange={() => setRegisterField('role')(value)}
                      />
                      <span className="auth-role__label">
                        <Icon />
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <AuthField
                id="reg-name"
                label="Имя"
                placeholder="Ирина Новоселова"
                autoComplete="name"
                value={registerValues.name}
                onChange={setRegisterField('name')}
                error={errors.name}
              />
              <AuthField
                id="reg-email"
                label="Email"
                type="email"
                placeholder="your@email.ru"
                autoComplete="email"
                value={registerValues.email}
                onChange={setRegisterField('email')}
                error={errors.email}
              />
              <AuthField
                id="reg-phone"
                label="Телефон"
                type="tel"
                placeholder="+375 (44) 000-00-00"
                autoComplete="tel"
                value={registerValues.phone}
                onChange={setRegisterField('phone')}
                error={errors.phone}
              />
              <AuthField
                id="reg-password"
                label="Пароль"
                type="password"
                placeholder="Минимум 8 символов"
                autoComplete="new-password"
                withStrength
                value={registerValues.password}
                onChange={setRegisterField('password')}
                error={errors.password}
              />
              <AuthField
                id="reg-password2"
                label="Повторите пароль"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                value={registerValues.password2}
                onChange={setRegisterField('password2')}
                error={errors.password2}
              />

              <label className="auth-checkbox">
                <input
                  type="checkbox"
                  name="agree"
                  checked={registerValues.agree}
                  onChange={(e) => setRegisterField('agree')(e.target.checked)}
                />
                <span className="auth-checkbox__box">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                    <path d="M1 4l3 3L9 1" stroke="#F07C00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="auth-checkbox__text">
                  Я принимаю{' '}
                  <a href="#" onClick={(e) => e.preventDefault()}>условия использования</a> и{' '}
                  <a href="#" onClick={(e) => e.preventDefault()}>политику конфиденциальности</a>{' '}
                  ArtKante
                </span>
              </label>
              <span className="auth-field__error" role={errors.agree ? 'alert' : undefined}>
                {errors.agree}
              </span>

              <SubmitButton isLoading={isLoading}>Создать аккаунт</SubmitButton>

              <p className="auth-footnote">
                Уже есть аккаунт?&nbsp;
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    switchTab('login')
                  }}
                >
                  Войти
                </a>
              </p>
            </form>
          )}
        </div>
      </main>

      <ThemeToggle floating />
    </div>
  )
}

function SubmitButton({ isLoading, children }) {
  return (
    <button
      type="submit"
      className={clsx('auth-submit', isLoading && 'is-loading')}
      disabled={isLoading}
    >
      <span className="auth-submit__text">{children}</span>
      <span className="auth-submit__spinner" aria-hidden="true" />
    </button>
  )
}
