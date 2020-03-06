import { algorithmWord as tabName, code } from '../core/i18n'

const defaults = [{
  id: 0,
  name: 'Editor',
  content: code,
  active: true
}]

function title(string, id) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)} ${id}`
}

function add(state) {
  const id = state.length ? state[state.length - 1].id + 1 : 0
  return state.concat([{
    id,
    name: title(tabName, id),
    content: '',
    active: false
  }])
}

export default function (state = defaults, action) {
  switch (action.type) {
    case 'ADD_TAB':
      return add(state)

    case 'DELETE_TAB':
      return state.filter((tab) => tab.id !== action.id)

    case 'RENAME_TAB':
      return state.map((tab) => (tab.id === action.id ?
        {
          id: tab.id,
          name: action.name,
          content: tab.content,
          active: tab.active
        } :
        tab))

    case 'CHANGE_TAB':
      return state.map((tab) => ({
        id: tab.id,
        name: tab.name,
        content: tab.active ?
          action.content :
          tab.content,
        active: tab.id === action.id
      }))

    case 'SAVE_TAB':
      return state.map((tab) => ({
        id: tab.id,
        name: tab.name,
        content: tab.id === action.id ?
          action.content :
          tab.content,
        active: tab.active
      }))

    case 'DEFAULTS_TABS':
      return [...defaults]

    default:
      return state
  }
}
