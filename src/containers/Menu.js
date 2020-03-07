import React from 'react'
import PropTypes from 'prop-types'
import { faBars, faTerminal, faBook } from '@fortawesome/free-solid-svg-icons'
import MenuComponent from '../components/Menu'
import { homeRoute, docsRoute, consoleRoute } from '../globals/routes'

const cache = {
  id: -1
}

function menuItem(url, name, active) {
  cache.id += 1
  const { id } = cache
  return { id, url, name, active }
}

function Menu({ children }) {
  const items = [
    menuItem(homeRoute, faBars, true),
    menuItem(docsRoute, faBook),
    menuItem(consoleRoute, faTerminal)
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
