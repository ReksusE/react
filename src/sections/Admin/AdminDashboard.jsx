import { useMemo } from 'react'
import { ROLES, useAuth } from '@/context/AuthContext'
import { useConcepts } from '@/context/ConceptsContext'
import { favoritesKey } from '@/context/FavoritesContext'
import { readStorage } from '@/utils/storage'

export default function AdminDashboard() {
  const { users } = useAuth()
  const { items } = useConcepts()

  const stats = useMemo(() => {
    const favorites = users.reduce(
      (sum, user) => sum + readStorage(favoritesKey(user.id), []).length,
      0
    )
    const countBy = (list, key) =>
      list.reduce((acc, item) => {
        const value = item[key] || 'Не указано'

        acc[value] = (acc[value] || 0) + 1

        return acc
      }, {})

    return {
      favorites,
      byCategory: Object.entries(countBy(items, 'category')),
      byRole: Object.entries(countBy(users, 'role')),
    }
  }, [users, items])

  const maxCategory = Math.max(1, ...stats.byCategory.map(([, count]) => count))
  const recentUsers = [...users]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5)

  return (
    <div className="admin-dashboard">
      <div className="admin-stats">
        {[
          ['Концептов', items.length],
          ['Пользователей', users.length],
          ['Избранных', stats.favorites],
          ['Категорий', stats.byCategory.length],
        ].map(([label, value]) => (
          <div className="admin-stat" key={label}>
            <span className="admin-stat__value">{value}</span>
            <span className="admin-stat__label">{label}</span>
          </div>
        ))}
      </div>

      <div className="admin-panels">
        <section className="admin-panel">
          <h2 className="admin-panel__title">Концепты по категориям</h2>
          <ul className="admin-bars">
            {stats.byCategory.map(([category, count]) => (
              <li className="admin-bars__row" key={category}>
                <span className="admin-bars__label">{category}</span>
                <span className="admin-bars__track">
                  <span
                    className="admin-bars__fill"
                    style={{ width: `${(count / maxCategory) * 100}%` }}
                  />
                </span>
                <span className="admin-bars__count">{count}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="admin-panel">
          <h2 className="admin-panel__title">Пользователи по ролям</h2>
          <ul className="admin-bars">
            {stats.byRole.map(([role, count]) => (
              <li className="admin-bars__row" key={role}>
                <span className="admin-bars__label">{ROLES[role] || role}</span>
                <span className="admin-bars__track">
                  <span
                    className="admin-bars__fill"
                    style={{ width: `${(count / users.length) * 100}%` }}
                  />
                </span>
                <span className="admin-bars__count">{count}</span>
              </li>
            ))}
          </ul>

          <h2 className="admin-panel__title admin-panel__title--spaced">
            Последние регистрации
          </h2>
          <ul className="admin-recent">
            {recentUsers.map((user) => (
              <li key={user.id}>
                <span>{user.name}</span>
                <span className="admin-muted">
                  {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
