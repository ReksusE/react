import './Founder.scss'
import Button from '@/components/Button'

export default function Founder() {
  return (
    <section className="founder">
      <div className="founder__container container">
        <div className="founder__inner">
          <div className="founder__image-wrapper reveal reveal--fade-left">
            <picture>
              <source
                srcSet="src/assets/images/founder/founder-mobile.jpg"
                media="(max-width: 1024px)"
              />
              <img
                className="founder__image"
                src="src/assets/images/founder/founder.jpg"
                alt="Ирина Новоселова"
                width="390"
                height="517"
              />
            </picture>
          </div>
          <div className="founder__content reveal reveal--fade-right reveal-delay-2">
            <div className="founder__text">
              <span className="founder__role" data-i18n="founder-role">
                основатель и руководитель
              </span>
              <h2 className="founder__name" data-i18n="founder-name">
                Ирина Новоселова
              </h2>
              <p data-i18n="founder-text-1">
                "Уже более 10 лет я вместе с командой разрабатываю и
                реализовываю проекты в сфере каминов и печей.
              </p>
              <p data-i18n="founder-text-2">
                Приходите к нам с вашей идеей очага и наша команда максимально
                вникнет в ваш проект. Мы вместе реализуем все, что вы задумали.
                "
              </p>
            </div>
            <Button
              className="founder__button"
              data-js-modal-open="founder"
              data-i18n="founder-btn"
            >
              получить консультацию руководителя
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
