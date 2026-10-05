import clsx from 'clsx'

export default function Breadcrumbs({ items = [], className }) {
  return (
    <nav className={clsx('concepts__breadcrumbs', className, 'reveal')}>
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="concepts__breadcrumbs-list"
          data-i18n={item.i18n}
        >
          {item.title}
        </a>
      ))}
    </nav>
  )
}