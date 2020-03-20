export const addTabAction = () => ({
  type: 'ADD_TAB'
})

export const removeTabAction = (id) => ({
  type: 'DELETE_TAB',
  id
})

export const changeTabAction = (id) => ({
  type: 'CHANGE_TAB',
  id
})

export const saveTabAction = (id, content) => ({
  type: 'SAVE_TAB',
  id,
  content
})

// export const renameTabAction = (id, index) => ({
//   type: 'RENAME_TAB',
//   id,
//   index
// })

export const defaultsTabsAction = () => ({
  type: 'DEFAULTS_TABS'
})
