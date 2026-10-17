import { useMemo, useState } from 'react'
import Modal from '@/components/Modal'
import { ROLES, useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import UserForm from './UserForm'

export default function AdminUsers() {
  const { users, user: me, createUser, updateUser, removeUser } = useAuth()
  const { showToast } = useToast()
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  // null | { mode: 'create' } | { mode: 'edit', id }
  const [modal, setModal] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return users.filter(
      (item) =>
        (!roleFilter || item.role === roleFilter) &&
        (!q || [item.name, item.email, item.phone].some((v) => (v || '').toLowerCase().includes(q)))
    )
  }, [users, query, roleFilter])

  const editing = modal?.id ? users.find((item) => item.id === modal.id) : null
  const close = () => setModal(null)

  // Возвращает текст ошибки, если операция не удалась (форма покажет её у поля)
  const handleSubmit = (values) => {
    const result =
      modal.mode === 'create'
        ? createUser(values)
        : updateUser(modal.id, values)

    if (!result.ok) {
      showToast(result.error, 'error')

      return result.error
    }

    showToast(modal.mode === 'create' ? 'Пользователь добавлен' : 'Изменения сохранены', 'success')
    close()
  }

  const handleDelete = (item) => {
    if (!window.confirm(`Удалить пользователя «${item.name}»?`)) {return}

    const result = removeUser(item.id)

    showToast(result.ok ? 'Пользователь удалён' : result.error, result.ok ? 'success' : 'error')
  }

  return (
    <div className="admin-section">
      <div className="admin-toolbar">
        <input
          className="admin-search"
          type="search"
          placeholder="Поиск по имени, email, телефону…"
          aria-label="Поиск пользователей"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="admin-select"
          aria-label="Фильтр по роли"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">Все роли</option>
          {Object.entries(ROLES).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <button
          type="button"
          className="concept-btn concept-btn--primary"
          onClick={() => setModal({ mode: 'create' })}
        >
          + Добавить пользователя
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Email</th>
              <th>Телефон</th>
              <th>Роль</th>
              <th>Создан</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.name}
                  {item.id === me.id && <span className="admin-badge">это вы</span>}
                </td>
                <td>{item.email}</td>
                <td>{item.phone || '—'}</td>
                <td>
                  <span className={`admin-role admin-role--${item.role}`}>{ROLES[item.role]}</span>
                </td>
                <td>{new Date(item.createdAt).toLocaleDateString('ru-RU')}</td>
                <td className="admin-table__actions">
                  <button type="button" className="concept-btn" onClick={() => setModal({ mode: 'edit', id: item.id })}>
                    Изменить
                  </button>
                  <button
                    type="button"
                    className="concept-btn concept-btn--danger"
                    disabled={item.id === me.id}
                    onClick={() => handleDelete(item)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="admin-muted admin-table__empty">
                  Ничего не найдено
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={Boolean(modal) && (modal.mode === 'create' || Boolean(editing))}
        title={modal?.mode === 'create' ? 'Добавить пользователя' : 'Редактировать пользователя'}
        onClose={close}
      >
        {modal?.mode === 'create' && <UserForm onSubmit={handleSubmit} />}
        {modal?.mode === 'edit' && editing && <UserForm initial={editing} onSubmit={handleSubmit} />}
      </Modal>
    </div>
  )
}
