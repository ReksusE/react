import { useMemo, useState } from 'react'
import ConceptForm from '@/components/ConceptForm'
import Modal from '@/components/Modal'
import { ACTIONS } from '@/context/conceptsReducer'
import { useConcepts } from '@/context/ConceptsContext'
import { useToast } from '@/context/ToastContext'
import getAsset from '@/utils/getAsset'

export default function AdminConcepts() {
  const { items, dispatch } = useConcepts()
  const { showToast } = useToast()
  const [query, setQuery] = useState('')
  // null | { mode: 'create' } | { mode: 'edit', id }
  const [modal, setModal] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return q
      ? items.filter((item) =>
          [item.title, item.category, item.fuel, item.style, item.material]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(q))
        )
      : items
  }, [items, query])

  const editing = modal?.id ? items.find((item) => item.id === modal.id) : null
  const close = () => setModal(null)

  const handleSubmit = (values) => {
    if (modal.mode === 'create') {
      dispatch({ type: ACTIONS.ADD, payload: values })
      showToast('Концепт добавлен', 'success')
    } else {
      dispatch({ type: ACTIONS.UPDATE, payload: { ...values, id: modal.id } })
      showToast('Изменения сохранены', 'success')
    }

    close()
  }

  const handleDelete = (item) => {
    if (window.confirm(`Удалить концепт «${item.title}»?`)) {
      dispatch({ type: ACTIONS.REMOVE, id: item.id })
      showToast('Концепт удалён', 'success')
    }
  }

  return (
    <div className="admin-section">
      <div className="admin-toolbar">
        <input
          className="admin-search"
          type="search"
          placeholder="Поиск по названию, стилю, материалу…"
          aria-label="Поиск концептов"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="button"
          className="concept-btn concept-btn--primary"
          onClick={() => setModal({ mode: 'create' })}
        >
          + Добавить концепт
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th />
              <th>Название</th>
              <th>Назначение</th>
              <th>Топливо</th>
              <th>Стиль</th>
              <th>Материал</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.image && (
                    <img className="admin-table__thumb" src={getAsset(item.image)} alt="" loading="lazy" />
                  )}
                </td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.fuel}</td>
                <td>{item.style}</td>
                <td>{item.material}</td>
                <td className="admin-table__actions">
                  <button type="button" className="concept-btn" onClick={() => setModal({ mode: 'edit', id: item.id })}>
                    Изменить
                  </button>
                  <button type="button" className="concept-btn concept-btn--danger" onClick={() => handleDelete(item)}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="admin-muted admin-table__empty">
                  Ничего не найдено
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={Boolean(modal) && (modal.mode === 'create' || Boolean(editing))}
        title={modal?.mode === 'create' ? 'Добавить концепт' : 'Редактировать концепт'}
        onClose={close}
      >
        {modal?.mode === 'create' && (
          <ConceptForm existing={items} onSubmit={handleSubmit} onCancel={close} />
        )}
        {modal?.mode === 'edit' && editing && (
          <ConceptForm initial={editing} existing={items} onSubmit={handleSubmit} onCancel={close} />
        )}
      </Modal>
    </div>
  )
}
