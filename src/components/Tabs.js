import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { faBars, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import Icon from './Icon'
import './Tabs.sass'


function Tabs({ tabs, add, change }) {
  const plusIndex = tabs.length && tabs[tabs.length] ?
    tabs[tabs.length].id + 1 :
    0
  return (
    <nav id="tabs">
      <ul>
        <Link to="/console">
          <li id="hamburger" className="tab-hamburger">
            <div id="menu" className="hamburger">
              <Icon name={faBars} />
              {' '}
            </div>
          </li>
        </Link>
        {tabs.map((tab) => (
          <li className={tab.active ? 'tab-active' : 'tab'} key={tab.id}>
            <div onClick={() => change(tab.id)} onKeyUp={() => change(tab.id)} role="button" tabIndex={tab.id}>
              {tab.name}
              <Icon name={faTimes} />
            </div>
          </li>
        ))}
        <li id="plus" className="tab-hamburger">
          <div className="hamburger" onClick={add} role="button" onKeyUp={add} tabIndex={plusIndex}>
            <Icon name={faPlus} />
          </div>
        </li>
      </ul>
    </nav>
  )
}
Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  add: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired
}

export default Tabs
