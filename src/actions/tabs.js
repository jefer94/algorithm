export const addTab = (name) => ({
  type: 'ADD_TAB',
  name: name || 'untitle'
})

export const removeTab = (name) => ({
  type: 'DELETE_TAB',
  name
})

export const moveTab = (name, content) => ({
  type: 'CHANGE_TAB',
  name,
  content
})

export const saveTab = (name, content) => ({
  type: 'SAVE_TAB',
  name,
  content
})

export const renameTab = (name, index) => ({
  type: 'RENAME_TAB',
  name,
  index
})

export const contentTab = (content, index) => ({
  type: 'CONTENT_TAB',
  index
})

export const defaultsTabs = () => ({
  type: 'DEFAULTS_TABS'
})
