/** Безопасная работа с localStorage (может быть недоступен или переполнен). */
export const readStorage = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key)

    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export const writeStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* хранилище недоступно — работаем только в памяти */
  }
}

export const removeStorage = (key) => {
  try {
    window.localStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}
