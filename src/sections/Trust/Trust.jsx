import './Trust.scss'
import TrustCard from '@/components/TrustCard'
import Icon from '@/components/Icon'
import useTrustSlider from '@/modules/useTrustSlider'
import trustData from '@/data/trustData.json'

export default function Trust() {
  const { sliderRef, scrollNext, scrollPrev } = useTrustSlider()

  return (
    <section className="trust">
      <div className="trust__container container">
        <h2 className="trust__title reveal" data-i18n="trust-title">
          Нам доверяют
        </h2>

        <div className="trust__navigation reveal reveal-delay-1">
          <button
            className="trust__arrow trust__arrow--prev"
            aria-label="Назад"
            onClick={scrollPrev}
          >
            <Icon name="arrow-left" />
          </button>
          <button
            className="trust__arrow trust__arrow--next"
            aria-label="Вперед"
            onClick={scrollNext}
          >
            <Icon name="arrow-right" />
          </button>
        </div>

        <div className="trust__slider reveal reveal-delay-2" ref={sliderRef}>
          {trustData.map((person, index) => (
            <TrustCard
              key={person.id}
              name={person.name}
              image={person.image}
              i18n={person.i18n}
              socials={person.socials}
              delay={(index % 12) + 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}