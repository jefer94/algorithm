import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { faBars, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import Icon from './Icon'
import './Tabs.sass'


function Tabs({ tabs, add, change, remove }) {
  const plusIndex = tabs.length && tabs[tabs.length] ?
    tabs[tabs.length].id + 1 :
    0
  return (
    <nav id="tabs">
      <ul>
        <li id="hamburger" className="tab-hamburger">
          <Link to="/console" role="button" aria-label="Menu">
            <div id="menu" className="hamburger">
              <Icon name={faBars} />
              {' '}
            </div>
          </Link>
        </li>
        {tabs.map((tab) => (
          <li className={tab.active ? 'tab-active' : 'tab'} key={tab.id}>
            <div onClick={() => change(tab.id)} onKeyUp={() => change(tab.id)} role="button" tabIndex={tab.id}>
              {tab.name}
              <button type="button" className="algorithm-button-role" aria-label={`Remove tab: ${tab.name}`} onClick={() => remove(tab.id)}>
                <Icon name={faTimes} />
              </button>
            </div>
          </li>
        ))}
        <li className="tab-hamburger">
          <button type="button" className="hamburger algorithm-button-role" onClick={add} onKeyUp={add} tabIndex={plusIndex} aria-label="Add tab">
            <Icon name={faPlus} />
          </button>
        </li>
      </ul>
    </nav>
  )
}
Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  add: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}

export default Tabs
