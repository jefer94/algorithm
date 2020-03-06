import { useReducer, useEffect } from 'react'
import { code } from '../core/i18n'
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
  // console.log(init, localStorage.getItem(key) || 'null', 'aaaa', defaults)
  const [tabs, dispatch] = useReducer(tabsReducer, init)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(tabs))
  }, [tabs])

  return {
    tabs,
    dispatch,
    addTab: () => dispatch(addTab()),
    removeTab: (id) => dispatch(removeTab(id)),
    changeTab: (id) => dispatch(changeTab(id)),
    saveTab: (id, content) => dispatch(saveTab(id, content)),
    renameTab: (id) => dispatch(renameTab(id)),
    defaultsTabs: (id) => dispatch(defaultsTabs(id))
  }
}

const addTab = () => ({
  type: 'ADD_TAB'
})

const removeTab = (id) => ({
  type: 'DELETE_TAB',
  id
})

const changeTab = (id) => ({
  type: 'CHANGE_TAB',
  id
})

const saveTab = (id, content) => ({
  type: 'SAVE_TAB',
  id,
  content
})

const renameTab = (id, index) => ({
  type: 'RENAME_TAB',
  id,
  index
})

const defaultsTabs = () => ({
  type: 'DEFAULTS_TABS'
})
