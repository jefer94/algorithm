import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import menu from '../icons/menu.svg'
import docs from '../icons/docs.svg'
import console from '../icons/console.svg'

const Menu = ({ children }) =>
  <div id='ide' className='modal'>
    <div className='ide'>
      <ul>
        <Link to='/'>
          <li id='hamburger' className='tab-hamburger'>
            <div className='hamburger'>
              <img src={menu} width='24px'/>
            </div>
          </li>
        </Link>
        <Link to='/docs'>
          <li className='tab-console'>
            <div className='hamburger'>
              <img src={docs} width='27px'/>
            </div>
          </li>
        </Link>
        <Link to='/console'>
          <li className='tab-console'>
            <div className='hamburger'>
              <img src={console} width='27px'/>
            </div>
          </li>
        </Link>
      </ul>
    </div>
    {children}
  </div>

Menu.propTypes = {
  children : PropTypes.node
}

export default Menu
