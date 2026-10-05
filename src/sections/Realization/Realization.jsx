import './Realization.scss'
import RealizationStep from '@/components/RealizationStep'
import Button from '@/components/Button'
import stepsData from '@/data/realizationSteps.json'
import getAsset from '@/utils/getAsset'

export default function Realization() {
  return (
    <section className="realization">
      <div className="realization__container container">
        <div className="realization__inner">
          <h2 className="realization__title reveal">
            Комплексная реализация проекта
            <br />
            на любом этапе строительства
          </h2>
          <div className="realization__list">
            {stepsData.map((step, index) => (
              <RealizationStep
                key={step.id}
                number={step.number}
                title={step.title}
                text={step.text}
                i18nTitle={step.i18nTitle}
                i18nText={step.i18nText}
                delay={index + 1}
              />
            ))}
          </div>
          <div className="realization__image">
            <img src={getAsset('images/realisation/triangle.svg')} alt="triangle" />
          </div>
        </div>
        <Button
          className="realization__btn reveal reveal-delay-4"
          data-js-modal-open="realization"
          data-i18n="real-btn"
        >
          Получить предварительную оценку проекта
        </Button>
      </div>
    </section>
  )
}