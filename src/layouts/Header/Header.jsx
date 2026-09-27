import './Header.scss'
import clsx from 'clsx'
import Logo from '@/components/Logo'
import BurgerButton from '@/components/BurgerButton'
import Icon from '@/components/Icon'

export default (props) => {
  const { url } = props

  const menuItems = [
    {
      label: 'Главная',
      href: '/',
    },
    {
      label: 'Концепты',
      href: '/About',
    },
    {
      label: 'Портфолио',
      href: '/Portfolio',
    },
    {
      label: 'Философия',
      href: '/Philosophy',
    },
    {
      label: 'Контакты',
      href: '/About',
    },
    {
      label: 'Избранное',
      href: '/About',
    },
  ]

  const menuItems1 = [
    {
      label: 'Загородный Дом',
      href: '/',
    },
    {
      label: 'Городская Квартира',
      href: '/',
    },
    {
      label: 'Общественные пространства',
      href: '/Portfolio',
    },
    {
      label: 'Облицовка',
      href: '/Philosophy',
    },
  ]

  const socials = [
    {
      label: 'Phone',
      icon: 'phone',
    },
    {
      label: 'Instagram',
      icon: 'instagram',
    },
  ]

  return (
    <header className="header" data-js-header>
      <div className="header__body container">
        <Logo title="Home" />

        <div className="header__nav" data-js-header-nav>
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
                  <a
                    className={clsx(
                      'header__menu-link',
                      href === url && 'is-active',
                      'header__menu-link-accent'
                    )}
                    href={href}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="header__menu header__menu-bottom">
            <ul className="header__menu-list">
              {menuItems1.map(({ label, href }, index) => (
                <li className={clsx('header__menu-item')} key={index}>
                  <a
                    className={clsx(
                      'header__menu-link',
                      'header__menu-link-bold'
                    )}
                    href={href}
                  >
                    {label}
                  </a>
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
            className="visible-mobile"
            extraAttrs={{ 'data-js-header-burger-button': '' }}
          />
        </div>
      </div>
    </header>
  )
}
