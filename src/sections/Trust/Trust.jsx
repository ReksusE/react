import './Trust.scss'
import TrustCard from '@/components/TrustCard'
import Icon from '@/components/Icon'
import useTrustSlider from '@/modules/useTrustSlider'

const trustData = [
  {
    id: 1,
    name: 'Андрей Вафельник',
    image: '/src/assets/images/trust/person-1.png',
    i18n: 'trust-name-1',
    socials: [
      { icon: 'instagram', label: 'Instagram' },
      { icon: 'web', label: 'Website' },
    ],
  },
  {
    id: 2,
    name: 'Виктор Приходько',
    image: '/src/assets/images/trust/person-2.png',
    i18n: 'trust-name-2',
    socials: [
      { icon: 'instagram', label: 'Instagram' },
      { icon: 'web', label: 'Website' },
    ],
  },
  {
    id: 3,
    name: 'Виктор Приходько',
    image: '/src/assets/images/trust/person-3.png',
    i18n: 'trust-name-3',
    socials: [{ icon: 'instagram', label: 'Instagram' }],
  },
  {
    id: 4,
    name: 'Виктор Приходько',
    image: '/src/assets/images/trust/person-4.png',
    i18n: 'trust-name-4',
    socials: [{ icon: 'web', label: 'Website' }],
  },
  {
    id: 5,
    name: 'Виктор Приходько',
    image: '/src/assets/images/trust/person-1.png',
    i18n: 'trust-name-5',
    socials: [{ icon: 'instagram', label: 'Instagram' }],
  },
  {
    id: 6,
    name: 'Виктор Приходько',
    image: '/src/assets/images/trust/person-3.png',
    i18n: 'trust-name-6',
    socials: [
      { icon: 'instagram', label: 'Instagram' },
      { icon: 'web', label: 'Website' },
    ],
  },
  {
    id: 7,
    name: 'Виктор Приходько',
    image: '/src/assets/images/trust/person-2.png',
    i18n: 'trust-name-7',
    socials: [{ icon: 'web', label: 'Website' }],
  },
  {
    id: 8,
    name: 'Виктор Приходько',
    image: '/src/assets/images/trust/person-4.png',
    i18n: 'trust-name-8',
    socials: [{ icon: 'instagram', label: 'Instagram' }],
  },
  {
    id: 9,
    name: 'Виктор Приходько',
    image: '/src/assets/images/trust/person-2.png',
    i18n: 'trust-name-9',
    socials: [
      { icon: 'instagram', label: 'Instagram' },
      { icon: 'web', label: 'Website' },
    ],
  },
  {
    id: 10,
    name: 'Виктор Приходько',
    image: '/src/assets/images/trust/person-3.png',
    i18n: 'trust-name-10',
    socials: [{ icon: 'instagram', label: 'Instagram' }],
  },
  {
    id: 11,
    name: 'Виктор Приходько',
    image: '/src/assets/images/trust/person-4.png',
    i18n: 'trust-name-11',
    socials: [{ icon: 'web', label: 'Website' }],
  },
  {
    id: 12,
    name: 'Виктор Приходько',
    image: '/src/assets/images/trust/person-1.png',
    i18n: 'trust-name-12',
    socials: [{ icon: 'instagram', label: 'Instagram' }],
  },
]

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