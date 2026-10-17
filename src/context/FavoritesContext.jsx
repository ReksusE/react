import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { readStorage, writeStorage } from '@/utils/storage'

const FavoritesContext = createContext(null)

export const favoritesKey = (userId) => `artkante:favorites:${userId}`

export function FavoritesProvider({ children }) {
  const { user } = useAuth()
  const userId = user?.id ?? null

  const [store, setStore] = useState(() => ({
    userId,
    ids: userId ? readStorage(favoritesKey(userId), []) : [],
  }))

  // Смена пользователя (вход/выход) — подгружаем его избранное
  if (store.userId !== userId) {
    setStore({
      userId,
      ids: userId ? readStorage(favoritesKey(userId), []) : [],
    })
  }

  const toggleFavorite = useCallback(
    (id) => {
      if (!userId) {return false}

      setStore((prev) => {
        const ids = prev.ids.includes(id)
          ? prev.ids.filter((item) => item !== id)
          : [...prev.ids, id]

        writeStorage(favoritesKey(userId), ids)

        return { ...prev, ids }
      })

      return true
    },
    [userId]
  )

  const value = useMemo(
    () => ({
      favoriteIds: store.ids,
      isFavorite: (id) => store.ids.includes(id),
      toggleFavorite,
    }),
    [store.ids, toggleFavorite]
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export const useFavorites = () => useContext(FavoritesContext)
