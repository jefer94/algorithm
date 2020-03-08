import React, { lazy } from 'react'
import PropTypes from 'prop-types'
import { faBars, faTerminal, faBook } from '@fortawesome/free-solid-svg-icons'
import { homeRoute, docsRoute, consoleRoute } from '../globals/routes'

const MenuComponent = lazy(() => import('../components/Menu'))

const cache = {
  id: -1
}

function menuItem(url, name, icon, active) {
  cache.id += 1
  const { id } = cache
  return { id, url, name, icon, active }
}

function Menu({ children }) {
  const items = [
    menuItem(homeRoute, 'Menu', faBars, true),
    menuItem(docsRoute, 'Docs', faBook),
    menuItem(consoleRoute, 'Console', faTerminal)
  ]

  return (
    <MenuComponent items={items}>
      {children}
    </MenuComponent>
  )
}
Menu.propTypes = {
  children: PropTypes.element.isRequired
}

export default Menu
