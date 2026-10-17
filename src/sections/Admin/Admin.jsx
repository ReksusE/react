import './Admin.scss'
import { startTransition } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import clsx from 'clsx'
import ThemeToggle from '@/components/ThemeToggle'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import AdminConcepts from './AdminConcepts'
import AdminDashboard from './AdminDashboard'
import AdminUsers from './AdminUsers'

const TABS = [
  { key: 'dashboard', title: 'Дашборд', Component: AdminDashboard },
  { key: 'concepts', title: 'Концепты', Component: AdminConcepts },
  { key: 'users', title: 'Пользователи', Component: AdminUsers },
]

export default function Admin() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { logout } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const active = TABS.find((tab) => tab.key === searchParams.get('tab')) ?? TABS[0]
  const { Component } = active

  const handleLogout = () => {
    startTransition(() => {
      navigate('/', { replace: true })
      logout()
    })
    showToast('Вы вышли из аккаунта', 'info')
  }

  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <Link to="/" className="admin__logo">
          <img src="/images/logo.svg" alt="ArtKante" />
        </Link>
        <nav className="admin__nav">
          {TABS.map(({ key, title }) => (
            <button
              key={key}
              type="button"
              className={clsx('admin__nav-btn', active.key === key && 'is-active')}
              aria-current={active.key === key ? 'page' : undefined}
              onClick={() => setSearchParams(key === 'dashboard' ? {} : { tab: key })}
            >
              {title}
            </button>
          ))}
        </nav>
        <button type="button" className="admin__logout" onClick={handleLogout}>
          Выйти
        </button>
      </aside>

      <main className="admin__main">
        <header className="admin__header">
          <h1 className="admin__title">{active.title}</h1>
          <ThemeToggle />
        </header>
        <div className="admin__content">
          <Component />
        </div>
      </main>
    </div>
  )
}
