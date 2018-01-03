import { editor } from './components/editor'

const tabs = function() {
  const add = name => ({
    type: 'ADD_TAB',
    name: name || 'untitle'
  })
  const remove = name => ({
    type: 'DELETE_TAB',
    name: name
  })
  const move = name => ({
    type: 'CHANGE_TAB',
    name: name,
    content: editor.getValue()
  })
  const save = name => ({
    type: 'SAVE_TAB',
    name: name,
    content: editor.getValue()
  })
  const rename = (name, index) => ({
    type: 'RENAME_TAB',
    name: name,
    index: index
  })
  const content = (content, index) => ({
    type: 'CONTENT_TAB',
    index: index
  })
  const defaults = () => ({
    type: 'DEFAULTS_TABS'
  })
  return { add, remove, move, save, rename, content, defaults }
}()

const variables = function() {
  const add = (value, key) => ({
    type: 'VAR_ADD',
    text: value,
    key: key
  })
  const reset = () => ({
    type: 'VAR_RESET'
  })
  return { add, reset }
}()

export { tabs, variables }
