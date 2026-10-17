/**
 * Редьюсер списка концептов: вся логика изменения данных в одном месте.
 * state = { items: Concept[], selectedIds: string[] }
 */
export const ACTIONS = {
  ADD: 'add',
  UPDATE: 'update',
  REMOVE: 'remove',
  REMOVE_SELECTED: 'removeSelected',
  TOGGLE_SELECT: 'toggleSelect',
  SELECT_MANY: 'selectMany',
  CLEAR_SELECTION: 'clearSelection',
}

const nextId = (items) =>
  String(items.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1)

export const createInitialState = (items) => ({ items, selectedIds: [] })

export default function conceptsReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return {
        ...state,
        items: [{ ...action.payload, id: nextId(state.items) }, ...state.items],
      }

    case ACTIONS.UPDATE:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      }

    case ACTIONS.REMOVE:
      return {
        items: state.items.filter((item) => item.id !== action.id),
        selectedIds: state.selectedIds.filter((id) => id !== action.id),
      }

    case ACTIONS.REMOVE_SELECTED:
      return {
        items: state.items.filter((item) => !state.selectedIds.includes(item.id)),
        selectedIds: [],
      }

    case ACTIONS.TOGGLE_SELECT:
      return {
        ...state,
        selectedIds: state.selectedIds.includes(action.id)
          ? state.selectedIds.filter((id) => id !== action.id)
          : [...state.selectedIds, action.id],
      }

    case ACTIONS.SELECT_MANY:
      return { ...state, selectedIds: action.ids }

    case ACTIONS.CLEAR_SELECTION:
      return { ...state, selectedIds: [] }

    default:
      return state
  }
}
