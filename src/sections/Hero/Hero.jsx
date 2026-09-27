import { useState, useEffect } from 'react'
import './hero.scss'

const heroSlides = [
  { id: 1, image: 'src/assets/images/hero/hero__bg.jpg', i18n: 'hero-slide-1' },
  {
    id: 2,
    image: 'src/assets/images/hero/hero__bg2.jpg',
    i18n: 'hero-slide-2',
  },
  {
    id: 3,
    image: 'src/assets/images/hero/hero__bg3.jpg',
    i18n: 'hero-slide-3',
  },
  {
    id: 4,
    image: 'src/assets/images/hero/hero__bg4.jpg',
    i18n: 'hero-slide-4',
  },
  {
    id: 5,
    image: 'src/assets/images/hero/hero__bg5.jpg',
    i18n: 'hero-slide-5',
  },
]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleDotClick = (index) => {
    setActiveSlide(index)
  }

  return (
    <section className="hero">
      <div className="hero__container container">
        <div className="hero__inner">
          {/* 🖼 Фоны слайдов */}
          <div className="hero__bg-wrapper">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`hero__bg ${index === activeSlide ? 'is-active' : ''}`}
                style={{ backgroundImage: `url('${slide.image}')` }}
              />
            ))}
          </div>

          {/* 📝 Контент */}
          <div className="hero__content">
            <div className="hero__title-wrapper">
              <h1 className="hero__title">
                <span className="hero__title-bold" data-i18n="hero-title-bold">
                  Печи Камины Барбекю
                </span>
                <span
                  className="hero__title-light"
                  data-i18n="hero-title-light"
                >
                  под ключ
                </span>
              </h1>
              <p className="hero__subtitle" data-i18n="hero-subtitle">
                проектирование архитектура инженерия монтаж
              </p>
            </div>

            <div className="hero__slogan-wrapper">
              <span className="hero__slogan" data-i18n="hero-slogan">
                С нами легко внедряются проекты
              </span>
            </div>
          </div>
        </div>

        {/* 🔘 Индикаторы */}
        <div className="hero__indicators">
          {heroSlides.map((_, index) => (
            <span
              key={index}
              className={`hero__indicators-line ${index === activeSlide ? 'is-active' : ''}`}
              onClick={() => handleDotClick(index)}
              role="button"
              tabIndex={0}
              aria-label={`Перейти к слайду ${index + 1}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleDotClick(index)
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
