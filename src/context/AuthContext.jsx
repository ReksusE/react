import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import hashPassword from '@/utils/hashPassword'
import { readStorage, removeStorage, writeStorage } from '@/utils/storage'

const USERS_KEY = 'artkante:users'
const SESSION_KEY = 'artkante:session'

export const ROLES = {
  client: 'Клиент',
  designer: 'Дизайнер',
  master: 'Мастер',
  admin: 'Администратор',
}

/**
 * Учебная имитация бэкенда: пользователи хранятся в localStorage.
 * Демо-администратор создаётся при первом запуске.
 */
export const DEMO_ADMIN = { email: 'admin@artkante.ru', password: 'Admin123!' }

const seedUsers = () => [
  {
    id: 'u1',
    name: 'Администратор',
    email: DEMO_ADMIN.email,
    phone: '',
    role: 'admin',
    passwordHash: hashPassword('u1', DEMO_ADMIN.password),
    createdAt: new Date().toISOString(),
  },
]

const stripHash = ({ passwordHash, ...user }) => user // eslint-disable-line no-unused-vars

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const stored = readStorage(USERS_KEY, null)

    return Array.isArray(stored) && stored.length > 0 ? stored : seedUsers()
  })
  const [sessionId, setSessionId] = useState(() => readStorage(SESSION_KEY, null))

  useEffect(() => writeStorage(USERS_KEY, users), [users])

  useEffect(() => {
    if (sessionId) {
      writeStorage(SESSION_KEY, sessionId)
    } else {
      removeStorage(SESSION_KEY)
    }
  }, [sessionId])

  const currentUser = useMemo(() => {
    const found = users.find((user) => user.id === sessionId)

    return found ? stripHash(found) : null
  }, [users, sessionId])

  const emailTaken = useCallback(
    (email, exceptId) =>
      users.some(
        (user) =>
          user.id !== exceptId &&
          user.email.toLowerCase() === email.trim().toLowerCase()
      ),
    [users]
  )

  const login = useCallback(
    (email, password) => {
      const user = users.find(
        (item) => item.email.toLowerCase() === email.trim().toLowerCase()
      )

      if (!user || user.passwordHash !== hashPassword(user.id, password)) {
        return { ok: false, error: 'Неверный email или пароль' }
      }

      setSessionId(user.id)

      return { ok: true, user: stripHash(user) }
    },
    [users]
  )

  const logout = useCallback(() => setSessionId(null), [])

  const createUser = useCallback(
    ({ name, email, phone = '', role = 'client', password }) => {
      if (emailTaken(email)) {
        return { ok: false, error: 'Пользователь с таким email уже существует' }
      }

      // Солью служит id, поэтому смена email не ломает пароль
      const id = `u${Date.now()}`
      const user = {
        id,
        name: name.trim(),
        email: email.trim(),
        phone,
        role,
        passwordHash: hashPassword(id, password),
        createdAt: new Date().toISOString(),
      }

      setUsers((prev) => [...prev, user])

      return { ok: true, user: stripHash(user) }
    },
    [emailTaken]
  )

  /** Саморегистрация: роль admin выдать себе нельзя. */
  const register = useCallback(
    (values) => {
      const role = values.role === 'admin' ? 'client' : values.role
      const result = createUser({ ...values, role })

      if (result.ok) {setSessionId(result.user.id)}

      return result
    },
    [createUser]
  )

  const updateUser = useCallback(
    (id, { password, ...patch }) => {
      const target = users.find((user) => user.id === id)

      if (!target) {return { ok: false, error: 'Пользователь не найден' }}

      const email = (patch.email ?? target.email).trim()

      if (emailTaken(email, id)) {
        return { ok: false, error: 'Пользователь с таким email уже существует' }
      }

      const adminsLeft = users.filter(
        (user) => user.role === 'admin' && user.id !== id
      ).length

      if (target.role === 'admin' && patch.role && patch.role !== 'admin' && adminsLeft === 0) {
        return { ok: false, error: 'Нельзя снять роль с последнего администратора' }
      }

      setUsers((prev) =>
        prev.map((user) => {
          if (user.id !== id) {return user}

          const next = { ...user, ...patch, email }

          if (patch.name !== undefined) {next.name = patch.name.trim()}
          if (password) {next.passwordHash = hashPassword(id, password)}

          return next
        })
      )

      return { ok: true }
    },
    [users, emailTaken]
  )

  const removeUser = useCallback(
    (id) => {
      const target = users.find((user) => user.id === id)

      if (!target) {return { ok: false, error: 'Пользователь не найден' }}
      if (id === sessionId) {return { ok: false, error: 'Нельзя удалить свою учётную запись' }}

      const adminsLeft = users.filter((user) => user.role === 'admin' && user.id !== id).length

      if (target.role === 'admin' && adminsLeft === 0) {
        return { ok: false, error: 'Нельзя удалить последнего администратора' }
      }

      setUsers((prev) => prev.filter((user) => user.id !== id))
      removeStorage(`artkante:favorites:${id}`)

      return { ok: true }
    },
    [users, sessionId]
  )

  const value = useMemo(
    () => ({
      user: currentUser,
      isAdmin: currentUser?.role === 'admin',
      users: users.map(stripHash),
      login,
      logout,
      register,
      createUser,
      updateUser,
      removeUser,
      emailTaken,
    }),
    [currentUser, users, login, logout, register, createUser, updateUser, removeUser, emailTaken]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
