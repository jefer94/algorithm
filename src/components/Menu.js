import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import './Menu.sass'

function Menu({ children, items }) {
  return (
    <div id="ide" className="modal">
      <div className="ide">
        <ul>
          {items.map(({ id, url, icon, name, active }) => (
            <li className={active ? 'menu-button brightness' : 'menu-button'} key={id}>
              <Link className={active ? 'menu-button brightness' : 'menu-button'} to={url} aria-label={name}>
                <Icon name={icon} />
              </Link>
            </li>
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

export default memo(Menu)
