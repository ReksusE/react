import clsx from 'clsx'
import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items = [], className }) {
  return (
    <nav className={clsx('concepts__breadcrumbs', className, 'reveal')}>
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className="concepts__breadcrumbs-list"
          data-i18n={item.i18n}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}