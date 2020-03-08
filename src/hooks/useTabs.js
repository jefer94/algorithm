import { useReducer, useEffect, useCallback } from 'react'
import { code } from '../libs/i18n'
import tabsReducer from '../reducers/tabs'

const key = '__ALGORITHM_TABS__'
const defaults = [{
  id: 0,
  name: 'Editor',
  content: code,
  active: true
}]

export default function () {
  const init = JSON.parse(localStorage.getItem(key) || 'null') || defaults
  const [tabs, dispatch] = useReducer(tabsReducer, init)

  const addTab = useCallback(() => dispatch(addTabAction()), [dispatch])
  const removeTab = useCallback((id) => dispatch(removeTabAction(id)), [dispatch])
  const changeTab = useCallback((id) => dispatch(changeTabAction(id)), [dispatch])
  const saveTab = useCallback((id, content) => dispatch(saveTabAction(id, content)), [dispatch])
  const renameTab = useCallback((id) => dispatch(renameTabAction(id)), [dispatch])
  const defaultsTabs = useCallback((id) => dispatch(defaultsTabsAction(id)), [dispatch])

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(tabs))
  }, [tabs])

  return {
    tabs,
    dispatch,
    addTab,
    removeTab,
    changeTab,
    saveTab,
    renameTab,
    defaultsTabs
  }
}

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

export const renameTabAction = (id, index) => ({
  type: 'RENAME_TAB',
  id,
  index
})

export const defaultsTabsAction = () => ({
  type: 'DEFAULTS_TABS'
})
