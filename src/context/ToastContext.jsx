import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import Toast from '@/components/Toast'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const dismiss = useCallback(
    (id) => setToasts((prev) => prev.filter((toast) => toast.id !== id)),
    []
  )

  const showToast = useCallback(
    (text, type = 'info') => {
      const id = ++idRef.current

      setToasts((prev) => [...prev.slice(-3), { id, text, type }])
      window.setTimeout(() => dismiss(id), 3500)
    },
    [dismiss]
  )

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
