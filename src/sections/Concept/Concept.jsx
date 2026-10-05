import { useMemo, useState } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import Filters from '@/components/Filters/Filters'
import ConceptCard from '@/components/ConceptCard'
import ConceptForm from '@/components/ConceptForm/ConceptForm'
import conceptsData from '@/data/concepts.json'
import './Grid.scss'
import './Concept.scss'

const INITIAL_VISIBLE_COUNT = 8
const LOAD_MORE_COUNT = 8

const breadcrumbsItems = [
  { title: 'Главная', href: '/', i18n: 'nav-home' },
  { title: 'Концепты', href: '/concepts', i18n: 'nav-concepts' },
]

export default function Concepts() {
  const [concepts, setConcepts] = useState(conceptsData)
  const [activeFilters, setActiveFilters] = useState({})
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)
  const [resetTrigger, setResetTrigger] = useState(0)
  const [selectedIds, setSelectedIds] = useState([])
  const [editingConcept, setEditingConcept] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleFilterChange = (filterKey, value) => {
    setActiveFilters((prev) => ({ ...prev, [filterKey]: value }))
    setVisibleCount(INITIAL_VISIBLE_COUNT)
  }

  const handleReset = () => {
    setActiveFilters({})
    setVisibleCount(INITIAL_VISIBLE_COUNT)
    setResetTrigger((prev) => prev + 1)
  }

  const filteredConcepts = useMemo(() => {
    return concepts.filter((concept) =>
      Object.entries(activeFilters).every(
        ([key, value]) =>
          value === null ||
          value === undefined ||
          concept[key] === value,
      ),
    )
  }, [concepts, activeFilters])

  const visibleConcepts = filteredConcepts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredConcepts.length

  const allVisibleSelected =
    visibleConcepts.length > 0 &&
    visibleConcepts.every((concept) => selectedIds.includes(concept.id))

  const handleToggleSelect = (id) => {
    setSelectedIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((selectedId) => selectedId !== id)
        : [...currentIds, id],
    )
  }

  const handleSelectAll = () => {
    const visibleIds = visibleConcepts.map((concept) => concept.id)

    if (allVisibleSelected) {
      setSelectedIds((currentIds) =>
        currentIds.filter((id) => !visibleIds.includes(id)),
      )
      return
    }

    setSelectedIds((currentIds) => [
      ...new Set([...currentIds, ...visibleIds]),
    ])
  }

  const handleDeleteConcept = (id) => {
    setConcepts((currentConcepts) =>
      currentConcepts.filter((concept) => concept.id !== id),
    )
    setSelectedIds((currentIds) =>
      currentIds.filter((selectedId) => selectedId !== id),
    )

    if (editingConcept?.id === id) {
      setEditingConcept(null)
      setIsFormOpen(false)
    }
  }

  const handleDeleteSelected = () => {
    if (!selectedIds.length) {
      return
    }

    setConcepts((currentConcepts) =>
      currentConcepts.filter((concept) => !selectedIds.includes(concept.id)),
    )
    setSelectedIds([])

    if (editingConcept && selectedIds.includes(editingConcept.id)) {
      setEditingConcept(null)
      setIsFormOpen(false)
    }
  }

  const handleEditConcept = (concept) => {
    setEditingConcept(concept)
    setIsFormOpen(true)
  }

  const handleOpenCreateForm = () => {
    setEditingConcept(null)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setEditingConcept(null)
    setIsFormOpen(false)
  }

  const handleSaveConcept = (conceptData) => {
    if (editingConcept) {
      setConcepts((currentConcepts) =>
        currentConcepts.map((concept) =>
          concept.id === editingConcept.id
            ? { ...concept, ...conceptData }
            : concept,
        ),
      )
    } else {
      const newConcept = {
        id: `concept-${Date.now()}`,
        ...conceptData,
      }

      setConcepts((currentConcepts) => [newConcept, ...currentConcepts])
    }

    handleCloseForm()
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT)
  }

  return (
    <section className="concepts" data-js-concepts>
      <div className="concepts__container container">
        <Breadcrumbs items={breadcrumbsItems} />

        <Filters
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          resetTrigger={resetTrigger}
        />

        <div className="concepts__management">
          <div className="concepts__management-actions">
            <button
              type="button"
              className="concepts__management-button"
              onClick={handleOpenCreateForm}
            >
              Добавить концепт
            </button>

            <button
              type="button"
              className="concepts__management-button"
              onClick={handleSelectAll}
              disabled={!visibleConcepts.length}
            >
              {allVisibleSelected ? 'Снять выделение' : 'Выбрать все'}
            </button>

            <button
              type="button"
              className="concepts__management-button concepts__management-button--delete"
              onClick={handleDeleteSelected}
              disabled={!selectedIds.length}
            >
              Удалить выбранные
              {selectedIds.length ? ` (${selectedIds.length})` : ''}
            </button>
          </div>

          {selectedIds.length > 0 && (
            <span className="concepts__selected-count">
              Выбрано: {selectedIds.length}
            </span>
          )}
        </div>

        {isFormOpen && (
          <ConceptForm
            concept={editingConcept}
            defaultImage={conceptsData[0]?.image}
            onSave={handleSaveConcept}
            onCancel={handleCloseForm}
          />
        )}

        <div className="concepts__grid grid-card" data-js-concepts-grid>
          {filteredConcepts.length === 0 ? (
            <div className="concepts__empty">
              <p>Концепты не найдены</p>
              <button type="button" onClick={handleReset}>
                Сбросить фильтры
              </button>
            </div>
          ) : (
            visibleConcepts.map((concept) => (
              <ConceptCard
                key={concept.id}
                card={concept}
                isSelected={selectedIds.includes(concept.id)}
                onSelect={handleToggleSelect}
                onEdit={handleEditConcept}
                onDelete={handleDeleteConcept}
              />
            ))
          )}
        </div>

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
