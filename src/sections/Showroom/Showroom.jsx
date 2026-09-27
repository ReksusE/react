import './Showrooms.scss'
import ShowroomCard from '@/components/ShowroomCard'
import Button from '@/components/Button'

const infoBlocks = [
  {
    id: 1,
    title: 'Часы работы:',
    lines: ['Пн-Пт: 11:00 - 20:00', 'Сб: 12:00 - 20:00', 'Вс: по согласованию'],
    i18nTitle: 'showroom-hours',
    i18nText: 'showroom-hours-val',
  },
  {
    id: 2,
    title: 'Адрес:',
    lines: [
      '105120, г. Москва, ул.',
      'Сыромятническая Нижняя,',
      'д.10, стр.12,',
      '(м.Курская, м.Чкаловская)',
    ],
    i18nTitle: 'showroom-address',
    i18nText: 'showroom-address-val',
  },
]

const showroomsLinks = [
  { id: 1, title: 'открыть схему проезда', href: '#', i18n: 'showroom-scheme' },
  { id: 2, title: 'дорога от метро', href: '#', i18n: 'showroom-way' },
]

export default function Showrooms() {
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
            <ShowroomCard
              name="шоурум 106"
              image="src/assets/images/showroom/106.png"
              alt="шоурум 106"
              i18n="showroom-106"
              animation="reveal--fade-left"
            />

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

            <ShowroomCard
              name="шоурум 112"
              image="src/assets/images/showroom/112.png"
              alt="шоурум 112"
              i18n="showroom-112"
              animation="reveal--fade-right"
            />
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