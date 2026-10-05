import clsx from 'clsx'

export default function RealizationStep(props) {
  const { number, title, text, i18nTitle, i18nText, delay = 1 } = props
  return (
    <article
      className={clsx('realization__item', `reveal reveal-delay-${delay}`)}
    >
      <div className="realization__number">{number}</div>
      <div className="realization__content">
        <h3 className="realization__subtitle" data-i18n={i18nTitle}>
          {title}
        </h3>
        <p className="realization__text" data-i18n={i18nText}>
          {text}
        </p>
      </div>
    </article>
  )
}
