import './Footer.scss'
import Icon from '@/components/Icon'
import Logo from '@/components/Logo'

// 📋 Данные для навигации
const navLinks = [
  { id: 1, title: 'Философия', href: '/philosophy', i18n: 'nav-philosophy' },
  { id: 2, title: 'Концепты', href: '/concepts', i18n: 'nav-concepts' },
  { id: 3, title: 'Портфолио', href: '/portfolio', i18n: 'nav-portfolio' },
  {
    id: 4,
    title: 'Политика конфидициальности',
    href: '/privacy',
    i18n: 'footer-privacy',
  },
]

// 🏠 Данные для концептов (сложные SVG с pattern)
const concepts = [
  {
    id: 1,
    title: 'ЗАГОРОДНЫЙ ДОМ',
    href: '/concepts/country',
    icon: 'concept-country',
    i18n: 'cat-country',
  },
  {
    id: 2,
    title: 'ГОРОДСКАЯ КВАРТИРА',
    href: '/concepts/city',
    icon: 'concept-city',
    i18n: 'cat-city',
  },
  {
    id: 3,
    title: 'Общественные Места',
    href: '/concepts/public',
    icon: 'concept-public',
    i18n: 'cat-public',
  },
  {
    id: 4,
    title: 'ОБЛИЦОВКА',
    href: '/concepts/facing',
    icon: 'concept-facing',
    i18n: 'cat-facing',
  },
]

// 📞 Данные для контактов (простые SVG)
const contacts = [
  {
    id: 1,
    title: '+375 (29) 700 80 90',
    href: 'tel:+375297008090',
    icon: 'phone',
    hasFill: false,
  },
  {
    id: 2,
    title: 'info@artkante.ru',
    href: 'mailto:info@artkante.ru',
    icon: 'mail',
    hasFill: false,
  },
  {
    id: 3,
    title:
      '105120, г. Минск, ул. Сыромятническая Нижняя, д.10, стр.12, офисы 106 и 112',
    href: '#',
    icon: 'pin',
    hasFill: false,
  },
  {
    id: 4,
    title: 'artkante.ru',
    href: 'https://artkante.ru',
    icon: 'instagram',
    hasFill: false,
  },
  {
    id: 5,
    title: 'artkante.ru',
    href: 'https://artkante.ru',
    icon: 'F',
    hasFill: true,
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <nav className="footer__menu">
          {/* Колонка 1: Логотип + Навигация */}
          <div className="footer__menu-column">
            <Logo title="ArtKante" />
            <ul className="footer__menu-list">
              {navLinks.map((link) => (
                <li key={link.id} className="footer__menu-item">
                  <a
                    href={link.href}
                    className="footer__menu-link"
                    data-i18n={link.i18n}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 2: Концепты */}
          <div className="footer__menu-column">
            <h3 className="footer__menu-title" data-i18n="footer-concepts">
              Концепты:
            </h3>
            <ul className="footer__menu-list">
              {concepts.map((concepts) => {
                return (
                  <li key={concepts.id} className="footer__menu-item">
                    <Icon
                      name={concepts.icon}
                      className="footer__contact-icon"
                    />
                    <a
                      href={concepts.href}
                      className="footer__menu-link"
                      data-i18n={concepts.i18n}
                    >
                      {concepts.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Колонка 3: Контакты */}
          <div className="footer__menu-column">
            <h3 className="footer__menu-title" data-i18n="footer-contacts">
              КОНТАКТЫ:
            </h3>
            <ul className="footer__menu-list">
              {contacts.map((contact) => (
                <li key={contact.id} className="footer__menu-item">
                  <Icon
                    name={contact.icon}
                    hasFill={contact.hasFill}
                    className="footer__contact-icon"
                  />
                  <a href={contact.href} className="footer__menu-link">
                    {contact.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </footer>
  )
}
