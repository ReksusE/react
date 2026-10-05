import { useState, useMemo } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import Filters from '@/components/Filters/Filters'
import ConceptCard from '@/components/ConceptCard'
import conceptsData from '@/data/concepts.json'
import './Grid.scss'
import './Concept.scss'


const INITIAL_VISIBLE_COUNT = 8
const LOAD_MORE_COUNT = 8

const breadcrumbsItems = [
  { title: 'Главная', href: '/', i18n: 'nav-home' },
  { title: 'Концепты', href: '/concepts', i18n: '' },
]

export default function Concepts() {
  const [activeFilters, setActiveFilters] = useState({})
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)
  const [resetTrigger, setResetTrigger] = useState(0)

  const handleFilterChange = (filterKey, value) => {
    setActiveFilters((prev) => ({ ...prev, [filterKey]: value }))
    setVisibleCount(INITIAL_VISIBLE_COUNT)
  }

  const handleReset = () => {
    setActiveFilters({})
    setVisibleCount(INITIAL_VISIBLE_COUNT)
    setResetTrigger((prev) => prev + 1)
  }

  // Фильтрация
  const filteredConcepts = useMemo(() => {
    return conceptsData.filter((concept) =>
      Object.entries(activeFilters).every(
        ([key, value]) => value === null || value === undefined || concept[key] === value
      )
    )
  }, [activeFilters])

  // Видимые карточки
  const visibleConcepts = filteredConcepts.slice(0, visibleCount)

  // Показываем кнопку, если есть ещё карточки
  const hasMore = visibleCount < filteredConcepts.length

  const handleLoadMore = () => {
  setVisibleCount((prev) => prev + LOAD_MORE_COUNT)
}

  // ⚠️ Временная отладка — удалите после проверки
  console.log('📊 Concepts debug:', {
    total: conceptsData.length,
    filtered: filteredConcepts.length,
    visibleCount,
    hasMore,
    visibleConceptsLength: visibleConcepts.length,
  })

  return (
    <section className="concepts" data-js-concepts>
      <div className="concepts__container container">
        <Breadcrumbs items={breadcrumbsItems} />

        <Filters
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          resetTrigger={resetTrigger}
        />

        <div className="concepts__grid grid-card" data-js-concepts-grid>
          {filteredConcepts.length === 0 ? (
            <p className="concepts__empty" style={{ color: 'var(--color-gray-alt)', fontSize: '1rem' }}>
              Концепты не найдены
            </p>
          ) : (
            visibleConcepts.map((concept) => (
              <ConceptCard key={concept.id} card={concept} />
            ))
          )}
        </div>

        {/* Кнопка "Показать ещё" */}
        {hasMore && (
          <div className="concepts__expandable-wrap">
            <button
              type="button"
              className="concepts__expandable"
              onClick={handleLoadMore}
            >
              Показать ещё ({filteredConcepts.length - visibleCount})
            </button>
          </div>
        )}
      </div>
    </section>
  )
}