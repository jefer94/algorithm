import React, { memo } from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
// import { faBars, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import Icon from './Icon'
import './Tabs.sass'

/** @module components/Tabs */

/**
 * @typedef {Object} Tab
 * @property {string} id - Tab React key
 * @property {string} name - Tab name
 * @property {string} content - Tab content
 * @property {string} active - Tab active
 */

/**
 * @typedef {Object} TabsProps
 * @property {Tab[]} tabs - Icon from FontAwesome
 * @property {callback} add - Icon from FontAwesome
 * @property {callback} change - Icon from FontAwesome
 * @property {callback} remove - Icon from FontAwesome
 * @property {bool} multiTabsFeature - Icon from FontAwesome
 */

/**
 * Tabs component
 * @param {TabsProps} props
 * @example
 * <Tabs
 *   tabs={[]}
 *   add={() => addCallback()}
 *   change={id => changeCallback(id)}
 *   remove={id => removeCallback(id)}
 *   multiTabsFeature={false}
 * />
 * @returns {object} <Tabs ... />
 */
function Tabs({ tabs, add, change, remove, multiTabsFeature }) {
  function addTabComponent() {
    return multiTabsFeature ? (
      <li className="tab-hamburger">
        <button type="button" className="hamburger algorithm-button-role" onClick={add} onKeyUp={add} aria-label="Add tab">
          <Icon name={faPlus} />
        </button>
      </li>
    ) : ''
  }

  function closeTabComponent(tab) {
    return multiTabsFeature ? (
      <button type="button" className="algorithm-button-role" aria-label={`Remove tab: ${tab.name}`} onClick={() => remove(tab.id)}>
        <Icon name={faTimes} />
      </button>
    ) : ''
  }

  function titleAndSelectTabComponent(tab) {
    return multiTabsFeature ? (
      <button type="button" className="algorithm-button-role" aria-label={`Change to: ${tab.name}`} onClick={() => change(tab.id)}>
        {tab.name}
      </button>
    ) : (
      <button type="button" className="algorithm-button-role" aria-label={`Tab: ${tab.name}`}>
        {tab.name}
      </button>
    )
  }

  return (
    <nav id="tabs">
      <ul>
        {/* <li id="hamburger" className="tab-hamburger">
          <Link to="/console" role="button" aria-label="Menu">
            <div id="menu" className="hamburger">
              <Icon name={faBars} />
              {' '}
            </div>
          </Link>
        </li> */}
        {tabs.map((tab) => (
          <li className={tab.active ? 'tab-active' : 'tab'} key={tab.id}>
            <div>
              {titleAndSelectTabComponent(tab)}
              {closeTabComponent(tab)}
            </div>
          </li>
        ))}
        {addTabComponent()}
      </ul>
    </nav>
  )
}
Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  add: PropTypes.func,
  change: PropTypes.func,
  remove: PropTypes.func,
  multiTabsFeature: PropTypes.bool
}
Tabs.defaultProps = {
  add: () => {},
  change: () => {},
  remove: () => {},
  multiTabsFeature: false
}

export default memo(Tabs)
