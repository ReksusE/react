import { useState, useMemo, useCallback } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import Filters from '@/components/Filters/Filters'
import ConceptCard from '@/components/ConceptCard'
import ConceptDetails from '@/components/ConceptDetails'
import ConceptForm from '@/components/ConceptForm'
import Modal from '@/components/Modal'
import { ACTIONS } from '@/context/conceptsReducer'
import { useConcepts } from '@/context/ConceptsContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import './Grid.scss'
import './Concept.scss'

const INITIAL_VISIBLE_COUNT = 8
const LOAD_MORE_COUNT = 8

const breadcrumbsItems = [
  { title: 'Главная', href: '/', i18n: 'nav-home' },
  { title: 'Концепты', href: '/concepts', i18n: 'nav-concepts' },
]

export default function Concepts() {
  const { items, selectedIds, dispatch } = useConcepts()
  const { isFavorite, toggleFavorite: toggleFav } = useFavorites()
  const { showToast } = useToast()
  const [activeFilters, setActiveFilters] = useState({})
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)
  const [resetTrigger, setResetTrigger] = useState(0)
  // modal: null | { mode: 'view' | 'edit' | 'create', id?: string }
  const [modal, setModal] = useState(null)

  const closeModal = useCallback(() => setModal(null), [])

  const handleFilterChange = (filterKey, value) => {
    setActiveFilters((prev) => ({ ...prev, [filterKey]: value }))
    setVisibleCount(INITIAL_VISIBLE_COUNT)
  }

  const handleReset = () => {
    setActiveFilters({})
    setVisibleCount(INITIAL_VISIBLE_COUNT)
    setResetTrigger((prev) => prev + 1)
  }

  const filteredConcepts = useMemo(
    () =>
      items.filter((concept) =>
        Object.entries(activeFilters).every(
          ([key, value]) =>
            value === null || value === undefined || concept[key] === value
        )
      ),
    [items, activeFilters]
  )

  const visibleConcepts = filteredConcepts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredConcepts.length

  const activeConcept = modal?.id
    ? items.find((item) => item.id === modal.id)
    : null

  const toggleSelect = useCallback(
    (id) => dispatch({ type: ACTIONS.TOGGLE_SELECT, id }),
    [dispatch]
  )

  const toggleFavorite = useCallback(
    (id) => {
      if (!toggleFav(id)) {
        showToast(
          'Войдите в аккаунт, чтобы добавлять концепты в избранное',
          'error'
        )
      }
    },
    [toggleFav, showToast]
  )

  const allVisibleSelected =
    filteredConcepts.length > 0 &&
    filteredConcepts.every((c) => selectedIds.includes(c.id))

  const toggleSelectAll = () =>
    dispatch(
      allVisibleSelected
        ? { type: ACTIONS.CLEAR_SELECTION }
        : { type: ACTIONS.SELECT_MANY, ids: filteredConcepts.map((c) => c.id) }
    )

  const handleDelete = (concept) => {
    if (!window.confirm(`Удалить концепт «${concept.title}»?`)) {return}

    dispatch({ type: ACTIONS.REMOVE, id: concept.id })
    showToast('Концепт удалён', 'success')
    closeModal()
  }

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {return}
    if (!window.confirm(`Удалить выбранные концепты (${selectedIds.length})?`)) {
      return
    }

    dispatch({ type: ACTIONS.REMOVE_SELECTED })
    showToast('Выбранные концепты удалены', 'success')
  }

  const handleSubmit = (values) => {
    if (modal?.mode === 'create') {
      dispatch({ type: ACTIONS.ADD, payload: values })
      showToast('Концепт добавлен', 'success')
      closeModal()

      return
    }

    dispatch({ type: ACTIONS.UPDATE, payload: { ...values, id: modal.id } })
    showToast('Изменения сохранены', 'success')
    setModal({ mode: 'view', id: modal.id })
  }

  const modalTitle = {
    create: 'Новый концепт',
    edit: 'Редактирование концепта',
    view: activeConcept?.title,
  }[modal?.mode]

  return (
    <section className="concepts" data-js-concepts>
      <div className="concepts__container container">
        <Breadcrumbs items={breadcrumbsItems} />

        <Filters
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          resetTrigger={resetTrigger}
        />

        <div className="concepts__toolbar" role="toolbar" aria-label="Действия">
          <button
            type="button"
            className="concept-btn concept-btn--primary"
            onClick={() => setModal({ mode: 'create' })}
          >
            + Добавить концепт
          </button>
          <button
            type="button"
            className="concept-btn"
            onClick={toggleSelectAll}
            disabled={filteredConcepts.length === 0}
          >
            {allVisibleSelected ? 'Снять выбор' : 'Выбрать все'}
          </button>
          <button
            type="button"
            className="concept-btn concept-btn--danger"
            onClick={handleDeleteSelected}
            disabled={selectedIds.length === 0}
          >
            Удалить выбранные ({selectedIds.length})
          </button>
          <span className="concepts__counter" aria-live="polite">
            Всего: {items.length} · Показано: {filteredConcepts.length}
          </span>
          <span className="concepts__hint">
            Ctrl/⌘ + клик — выбрать несколько карточек
          </span>
        </div>

        <div className="concepts__grid grid-card" data-js-concepts-grid>
          {filteredConcepts.length === 0 ? (
            <p className="concepts__empty">Концепты не найдены</p>
          ) : (
            visibleConcepts.map((concept) => (
              <ConceptCard
                key={concept.id}
                card={concept}
                isSelected={selectedIds.includes(concept.id)}
                isSelectionMode={selectedIds.length > 0}
                isFavorite={isFavorite(concept.id)}
                onOpen={(id) => setModal({ mode: 'view', id })}
                onToggleSelect={toggleSelect}
                onToggleFavorite={toggleFavorite}
              />
            ))
          )}
        </div>

        {hasMore && (
          <div className="concepts__expandable-wrap">
            <button
              type="button"
              className="concepts__expandable"
              onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_COUNT)}
            >
              Показать ещё ({filteredConcepts.length - visibleCount})
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={
          Boolean(modal) && (modal.mode === 'create' || Boolean(activeConcept))
        }
        title={modalTitle}
        onClose={closeModal}
      >
        {modal?.mode === 'view' && activeConcept && (
          <ConceptDetails
            concept={activeConcept}
            isFavorite={isFavorite(activeConcept.id)}
            onEdit={(c) => setModal({ mode: 'edit', id: c.id })}
            onDelete={handleDelete}
            onToggleFavorite={toggleFavorite}
          />
        )}
        {modal?.mode === 'edit' && activeConcept && (
          <ConceptForm
            initial={activeConcept}
            existing={items}
            onSubmit={handleSubmit}
            onCancel={() => setModal({ mode: 'view', id: modal.id })}
          />
        )}
        {modal?.mode === 'create' && (
          <ConceptForm
            existing={items}
            onSubmit={handleSubmit}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </section>
  )
}
