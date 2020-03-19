import React, { useEffect, useState, lazy } from 'react'
import PropTypes from 'prop-types'
import { faBars, faTerminal, faBook } from '@fortawesome/free-solid-svg-icons'
import useTabs from '../hooks/useTabs'
import { homeRoute, docsRoute, consoleRoute } from '../globals/routes'
import keychain from '../libs/keychain'

const MenuComponent = lazy(() => import('../components/Menu'))

function menuItem(url, name, icon, active) {
  return { id: keychain('menu'), url, name, icon, active }
}

function getActiveContent(tabs) {
  const res = tabs.filter((value) => value.active)
  if (res.length) return tabs[0].content
  return ''
}

function getActiveId(tabs) {
  const res = tabs.filter((value) => value.active)
  if (res.length) return tabs[0].id
  return -1
}

function Menu({ children }) {
  const { tabs, addTab, changeTab, saveTab, removeTab } = useTabs()
  // const [id, setId] = useState(0)
  const [id, setId] = useState(getActiveId(tabs))
  const [content] = useState(getActiveContent(tabs))
  // useEffect(() => () => {
  //   const tab = tabs.filter((tab) => tab.active)[0]
  //   if (tab && tab.name) saveTab(tab.name)
  // })

  useEffect(() => {
    const res = tabs.filter(({ active }) => active)
    if (res.length) {
      const [tab] = res
      if (id === tab.id && content !== tab.content) saveTab(tab.id, content)
      else if (id !== tab.id) setId(tab.id)
    }
  }, [content, tabs])

  const items = [
    menuItem(docsRoute, 'Docs', faBook),
    menuItem(consoleRoute, 'Console', faTerminal)
  ]

  return (
    <MenuComponent
      items={items}
      menu={menuItem(homeRoute, 'Menu', faBars, true)}
      tabs={tabs}
      add={addTab}
      change={changeTab}
      remove={removeTab}
    >
      {children}
    </MenuComponent>
  )
}
Menu.propTypes = {
  children: PropTypes.element.isRequired
}

export default Menu
