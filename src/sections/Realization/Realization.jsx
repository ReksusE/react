import './Realization.scss'
import RealizationStep from '@/components/RealizationStep'
import Button from '@/components/Button'

const stepsData = [
  {
    id: 1,
    number: '1',
    title: 'Проектирование',
    text: 'Весь комплекс проектных работ предоставляем в виде альбома, включающего в себя подробные визуализации, монтажные схемы, инженерные системы, разрезы и сметный расчет.',
    i18nTitle: 'real-step-1-title',
    i18nText: 'real-step-1-text',
  },
  {
    id: 2,
    number: '2',
    title: 'Комплектация под ключ',
    text: 'В работе используем специализированные материалы для печного строительства от производителей с многолетней репутацией на рынке.',
    i18nTitle: 'real-step-2-title',
    i18nText: 'real-step-2-text',
  },
  {
    id: 3,
    number: '3',
    title: 'Монтаж',
    text: 'Быстро и качественно собираем конструкции, всегда находимся на связи и согласовываем каждую деталь с руководителем проекта.',
    i18nTitle: 'real-step-3-title',
    i18nText: 'real-step-3-text',
  },
]

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
            {stepsData.map((steps, index) => (
              <RealizationStep
                key={steps.id}
                number={steps.number}
                title={steps.title}
                text={steps.text}
                i18nTitle={steps.i18nTitle}
                i18nText={steps.i18nText}
                delay={index + 1}
              />
            ))}
          </div>
          <div className="realization__image">
            <img src="src/assets/images/realisation/triangle.svg" alt="triangle" />
          </div>
        </div>
        <Button
          className="realization__btn reveal reveal-delay-4"
          modalTarget="realization"
          data-i18n="real-btn"
        >
          Получить предварительную оценку проекта
        </Button>
      </div>
    </section>
  )
}
