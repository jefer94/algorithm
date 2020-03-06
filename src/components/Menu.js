import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import './Menu.sass'

function Menu({ children, items }) {
  return (
    <div id="ide" className="modal">
      <div className="ide">
        <ul>
          {items.map(({ id, url, name, active }) => (
            <Link to={url} key={id}>
              <li className={active ? 'menu-button brightness' : 'menu-button'}>
                <Icon name={name} />
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {children}
    </div>
  )
}
Menu.propTypes = {
  children: PropTypes.element.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Menu
