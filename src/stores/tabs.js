import { algorithm_word as tab, code } from '../core/i18n'

const defaults = [ {
  name    : 'Editor',
  content : code,
  active  : true
} ]

const title = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`

const tabs = (state = defaults, action) =>
  action.type === 'ADD_TAB' ?
    state.concat([ {
      name    : `${title(tab)} ${state.length + 1}`,
      content : '',
      active  : false
    } ]) :
    action.type === 'DELETE_TAB' ?
      state.filter(tab => tab.name !== action.name) :
      action.type === 'RENAME_TAB' ?
        state.map(tab => tab.name === action.name ?
          {
            name    : action.name,
            content : tab.content,
            active  : tab.active
          } :
          tab
        ) :
        action.type === 'CHANGE_TAB' ?
          state.map(tab => ({
            name    : tab.name,
            content : tab.active ?
              action.content :
              tab.content,
            active : tab.name === action.name
          })) :
          action.type === 'SAVE_TAB' ?
            state.map(tab => ({
              name    : tab.name,
              content : tab.name === action.name ?
                action.content :
                tab.content,
              active : tab.active
            })) :
            action.type === 'CONTENT_TAB' ?
              state.map((tab, index) => index + 1 === action.index ?
                tab.content = action.content :
                tab.content
              ) :
              action.type === 'DEFAULTS_TABS' ?
                defaults :
                state

export default tabs
