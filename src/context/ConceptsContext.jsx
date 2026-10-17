import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import conceptsData from '@/data/concepts.json'
import { readStorage, writeStorage } from '@/utils/storage'
import conceptsReducer, { createInitialState } from './conceptsReducer'

const CONCEPTS_KEY = 'artkante:concepts'
const ConceptsContext = createContext(null)

const init = () => {
  const stored = readStorage(CONCEPTS_KEY, null)

  return createInitialState(Array.isArray(stored) ? stored : conceptsData)
}

export function ConceptsProvider({ children }) {
  const [state, dispatch] = useReducer(conceptsReducer, undefined, init)

  // В localStorage сохраняем только сами концепты (выбор — временное состояние)
  useEffect(() => writeStorage(CONCEPTS_KEY, state.items), [state.items])

  const value = useMemo(() => ({ ...state, dispatch }), [state])

  return <ConceptsContext.Provider value={value}>{children}</ConceptsContext.Provider>
}

export const useConcepts = () => useContext(ConceptsContext)
