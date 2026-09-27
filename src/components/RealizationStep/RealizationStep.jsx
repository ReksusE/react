import clsx from 'clsx'

export default function RealizationStep(props) {
  const { number, title, text, i18Tittle, i18Text, delay = 1 } = props
  return (
    <article
      className={clsx('realization__item', `reveal reveal-delay-${delay}`)}
    >
      <div className="realization__number">{number}</div>
      <div className="realization__content">
        <h3 className="realization__subtitle" data-i18n={i18Tittle}>
          {title}
        </h3>
        <p className="realization__text" data-i18n={i18Text}>
          {text}
        </p>
      </div>
    </article>
  )
}
