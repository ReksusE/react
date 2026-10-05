import clsx from 'clsx'
import { Link } from 'react-router-dom'

export default function CategoriesCard(props) {
  const { title, image, alt, href = '/concepts', i18n, delay = 1 } = props
  return (
    <Link
      to={href}
      className={clsx('categories__item', `reveal reveal-delay-${delay}`)}
    >
      <div className="categories__image">
        <img src={image} alt={alt} loading="lazy" />
      </div>
      <h3 className="categories__title" data-i18n={i18n}>
        {title}
      </h3>
    </Link>
  )
}
