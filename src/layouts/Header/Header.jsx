import './Header.scss'
import { startTransition, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import Logo from '@/components/Logo'
import BurgerButton from '@/components/BurgerButton'
import Icon from '@/components/Icon'
import ProfileModal from '@/components/ProfileModal'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'

const menuItems = [
  { label: 'Главная', href: '/' },
  { label: 'Концепты', href: '/concepts' },
  { label: 'Портфолио', href: '/portfolio' },
  { label: 'Философия', href: '/philosophy' },
  { label: 'Контакты', href: '/' },
  { label: 'Избранное', href: '/favorites' },
]

const menuItems1 = [
  { label: 'Загородный Дом', href: '/' },
  { label: 'Городская Квартира', href: '/' },
  { label: 'Общественные пространства', href: '/portfolio' },
  { label: 'Облицовка', href: '/philosophy' },
]

const socials = [
  { label: 'Phone', icon: 'phone' },
  { label: 'Instagram', icon: 'instagram' },
]

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-3.866 3.582-7 8-7s8 3.134 8 7" strokeLinecap="round" />
  </svg>
)

const panelIcons = {
  login: <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  edit: <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />,
  logout: <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />,
}

const PanelIcon = ({ name }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {panelIcons[name]}
  </svg>
)

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const userWrapperRef = useRef(null)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, isAdmin, logout } = useAuth()
  const { showToast } = useToast()

  // Закрываем меню при переходе на другую страницу
  useEffect(() => {
    setIsMenuOpen(false)
    setIsUserPanelOpen(false)
  }, [pathname])

  // Закрываем панель пользователя по клику снаружи и по Esc
  useEffect(() => {
    if (!isUserPanelOpen) {return}

    const onPointerDown = (e) => {
      if (!userWrapperRef.current?.contains(e.target)) {setIsUserPanelOpen(false)}
    }
    const onKeyDown = (e) => e.key === 'Escape' && setIsUserPanelOpen(false)

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isUserPanelOpen])

  const handleLogout = () => {
    // навигация и выход — в одном transition, иначе защищённый маршрут успеет отправить на /auth
    setIsUserPanelOpen(false)
    startTransition(() => {
      navigate('/')
      logout()
    })
    showToast('Вы вышли из аккаунта', 'info')
  }

  // Блокируем скролл страницы, пока открыто мобильное меню
  useEffect(() => {
    document.documentElement.classList.toggle('is-lock', isMenuOpen)

    return () => document.documentElement.classList.remove('is-lock')
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  return (
    <header className="header">
      <div className="header__body container">
        <Logo title="Home" />

        <div className={clsx('header__nav', isMenuOpen && 'is-active')}>
          <nav className="header__menu header__menu-top">
            <ul className="header__menu-list">
              {menuItems.map(({ label, href }, index) => (
                <li
                  className={clsx(
                    'header__menu-item',
                    index === menuItems.length - 1 && 'header__menu-item-push'
                  )}
                  key={index}
                >
                  <NavLink
                    className={({ isActive }) =>
                      clsx(
                        'header__menu-link',
                        'header__menu-link-accent',
                        isActive && 'is-active'
                      )
                    }
                    to={href}
                    end
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="header__menu header__menu-bottom">
            <ul className="header__menu-list">
              {menuItems1.map(({ label, href }, index) => (
                <li className="header__menu-item" key={index}>
                  <Link
                    className="header__menu-link header__menu-link-bold"
                    to={href}
                  >
                    {label}
                  </Link>
                  <Icon
                    name="caret-down-circle-outline"
                    className="header__menu-list__icon"
                    hasFill={true}
                    ariaLabel="caret-down-circle-outline"
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="header__side">
          {socials.map(({ label, icon }) => (
            <a className="side-icon" href="/" title={label} key={label}>
              <span className="visually-hidden">{label}</span>
              <Icon name={icon} />
            </a>
          ))}

          <div className="header__user-wrapper" ref={userWrapperRef}>
            <button
              type="button"
              className="header__user-btn"
              aria-label="Личный кабинет"
              aria-expanded={isUserPanelOpen}
              onClick={() => setIsUserPanelOpen((prev) => !prev)}
            >
              <UserIcon />
            </button>
            <div className={clsx('header__user-panel', isUserPanelOpen && 'is-active')}>
              <div className="header__user-info">
                <span className="header__user-name">{user ? user.name : 'Гость'}</span>
                <span className="header__user-email">
                  {user ? user.email : 'Войдите в аккаунт'}
                </span>
              </div>
              {!user && (
                <Link to="/auth" className="header__panel-item">
                  <PanelIcon name="login" />
                  <span>Войти</span>
                </Link>
              )}
              {user && (
                <Link to="/favorites" className="header__panel-item">
                  <PanelIcon name="heart" />
                  <span>Избранное</span>
                </Link>
              )}
              {isAdmin && (
                <Link to="/admin" className="header__panel-item">
                  <PanelIcon name="shield" />
                  <span>Админ-панель</span>
                </Link>
              )}
              {user && (
                <>
                  <button
                    type="button"
                    className="header__panel-item"
                    onClick={() => {
                      setIsUserPanelOpen(false)
                      setIsProfileOpen(true)
                    }}
                  >
                    <PanelIcon name="edit" />
                    <span>Редактировать</span>
                  </button>
                  <div className="header__panel-divider" />
                  <button
                    type="button"
                    className="header__panel-item header__panel-item--logout"
                    onClick={handleLogout}
                  >
                    <PanelIcon name="logout" />
                    <span>Выйти из аккаунта</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <BurgerButton
            className={clsx('visible-mobile', isMenuOpen && 'is-active')}
            extraAttrs={{ onClick: toggleMenu, 'aria-expanded': isMenuOpen }}
          />
        </div>
      </div>

      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </header>
  )
}
