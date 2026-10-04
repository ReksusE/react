import './Showrooms.scss'
import ShowroomCard from '@/components/ShowroomCard'
import Button from '@/components/Button'
import showroomsData from '@/data/showroomsData.json'

export default function Showrooms() {
  const { infoBlocks, showroomsLinks, cards } = showroomsData

  return (
    <section className="showrooms">
      <div className="showrooms__container container">
        <div className="showrooms__inner">
          <header className="showrooms__header reveal">
            <p className="showrooms__header-subtitle" data-i18n="showroom-title">
              Приглашаем в комфортные, удобные для встреч и презентаций шоурумы
            </p>
            <div>
              <h2 className="showrooms__header-title" data-i18n="showroom-building-1">
                центр дизайна artplay
              </h2>
              <p className="showrooms__header-building" data-i18n="showroom-building-2">
                строение 12
              </p>
            </div>
          </header>

          <div className="showrooms__content reveal reveal-delay-2">
            {cards[0] && (
              <ShowroomCard
                name={cards[0].name}
                image={cards[0].image}
                alt={cards[0].alt}
                i18n={cards[0].i18n}
                animation={cards[0].animation}
              />
            )}

            <div className="showrooms__info">
              {infoBlocks.map((block) => (
                <div key={block.id} className="showrooms__block">
                  <h4 className="showrooms__block-title" data-i18n={block.i18nTitle}>
                    {block.title}
                  </h4>
                  <p className="showrooms__block-text" data-i18n={block.i18nText}>
                    {block.lines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < block.lines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>

            {cards[1] && (
              <ShowroomCard
                name={cards[1].name}
                image={cards[1].image}
                alt={cards[1].alt}
                i18n={cards[1].i18n}
                animation={cards[1].animation}
              />
            )}
          </div>

          <div className="showrooms__link reveal">
            {showroomsLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="showrooms__link-item"
                data-i18n={link.i18n}
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>

        <Button
          className="showrooms__btn reveal reveal-delay-3"
          modalTarget="showroom"
          data-i18n="showroom-callback"
        >
          заказать обратный звонок
        </Button>
      </div>
    </section>
  )
}