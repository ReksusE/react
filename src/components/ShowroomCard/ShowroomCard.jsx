import clsx from 'clsx'

export default function ShowroomCard(props) {
  const { name, image, alt, i18n, animation = 'reveal--fade-left' } = props

  return (
    <article className={clsx('showrooms__item', 'reveal', animation)}>
      <div className="showrooms__image-wrap">
        <img src={image} alt={alt || name} loading="lazy" />
      </div>
      <h3 className="showrooms__item-name" data-i18n={i18n}>
        {name}
      </h3>
    </article>
  )
}