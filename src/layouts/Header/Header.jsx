import './Header.scss'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import Logo from '@/components/Logo'
import BurgerButton from '@/components/BurgerButton'
import Icon from '@/components/Icon'

const menuItems = [
  { label: 'Главная', href: '/' },
  { label: 'Концепты', href: '/concepts' },
  { label: 'Портфолио', href: '/portfolio' },
  { label: 'Философия', href: '/philosophy' },
  { label: 'Контакты', href: '/Contacts' },
  { label: 'Избранное', href: '/Favorive' },
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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // Закрываем меню при переходе на другую страницу
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

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

          <BurgerButton
            className={clsx('visible-mobile', isMenuOpen && 'is-active')}
            extraAttrs={{ onClick: toggleMenu, 'aria-expanded': isMenuOpen }}
          />
        </div>
      </div>
    </header>
  )
}
