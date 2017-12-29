import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import menu from '../../icons/menu.svg'
import plus from '../../icons/plus.svg'
import { tabs } from '../actions'

const Tabs = ({ add, remove, move, tabs }) =>
  <nav id='tabs'>
    <ul>
      <Link to='/menu'>
        <li id='hamburger' className='tab-hamburger'>
          <div id='menu' className='hamburger'>
            <img src={menu} width='24px'/>
         / </div>
        </li>
      </Link>
      { tabs.map((tab, index) =>
        <li className={tab.active ? 'tab-active' : 'tab'} key={index} onClick={() => move(tab.name)}>{tab.name}</li>
      ) }
      <li id='plus' className='tab-hamburger' onClick={add}>
        <div className='hamburger'>
          <img src={plus} width='24px'/>
        </div>
      </li>
    </ul>
  </nav>

Tabs.propTypes = {
  tabs: PropTypes.array,
  add: PropTypes.func,
  remove: PropTypes.func,
  move: PropTypes.func
}

export default connect(
  state => ({
    tabs: state.tabs
  }),
  dispatch => ({
    add: (name) => dispatch(tabs.add(name)),
    remove: (name) => dispatch(tabs.remove(name)),
    move: (name) => dispatch(tabs.move(name))
  })
)(Tabs)
