import { editor } from './components/editor'

const tabs = function() {
  const add = name => ({
    type: 'ADD_TAB',
    name: name || 'untitle'
  })
  const _delete = name => ({
    type: 'DELETE_TAB',
    name: name
  })
  const change = name => ({
    type: 'CHANGE_TAB',
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
  return {
    add: add,
    remove: _delete,
    move: change,
    rename: rename,
    content: content,
    defaults: defaults
  }
}()

export { tabs }
