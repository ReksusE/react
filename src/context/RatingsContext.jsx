import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { readStorage, writeStorage } from '@/utils/storage'

const RATINGS_KEY = 'artkante:ratings'
const RatingsContext = createContext(null)

/**
 * Оценки концептов: { [conceptId]: { [userId]: 1..5 } }.
 * Один пользователь — одна оценка на концепт (повторная заменяет прежнюю).
 */
export function RatingsProvider({ children }) {
  const { user } = useAuth()
  const [ratings, setRatings] = useState(() => readStorage(RATINGS_KEY, {}))

  useEffect(() => writeStorage(RATINGS_KEY, ratings), [ratings])

  const getSummary = useCallback(
    (conceptId) => {
      const values = Object.values(ratings[conceptId] ?? {})
      const count = values.length
      const average = count ? values.reduce((sum, value) => sum + value, 0) / count : 0

      return { average, count }
    },
    [ratings]
  )

  const getUserRating = useCallback(
    (conceptId) => (user ? ratings[conceptId]?.[user.id] ?? null : null),
    [ratings, user]
  )

  /** Возвращает false, если пользователь не вошёл в аккаунт. */
  const rate = useCallback(
    (conceptId, value) => {
      if (!user) {return false}

      setRatings((prev) => {
        const forConcept = { ...(prev[conceptId] ?? {}) }

        if (value) {
          forConcept[user.id] = value
        } else {
          delete forConcept[user.id]
        }

        return { ...prev, [conceptId]: forConcept }
      })

      return true
    },
    [user]
  )

  const value = useMemo(
    () => ({ getSummary, getUserRating, rate }),
    [getSummary, getUserRating, rate]
  )

  return <RatingsContext.Provider value={value}>{children}</RatingsContext.Provider>
}

export const useRatings = () => useContext(RatingsContext)
