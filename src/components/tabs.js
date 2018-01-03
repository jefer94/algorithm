import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import menu from '../icons/menu.svg'
// import plus from '../icons/plus.svg'
import { tabs } from '../actions'

class Tabs extends Component {
  constructor (props) {
    super(props)
    this.props = props
    this.length = props.tabs.length
  }
  componentWillReceiveProps (props) {
    this.props = props
    this.length = props.tabs.length
  }
  componentWillUnmount () {
    const tab = this.props.tabs.filter(tab => tab.active)[0]
    this.props.save(tab.name)
  }
  render () {
    return (
      <nav id='tabs'>
        <ul>
          <Link to='/console'>
            <li id='hamburger' className='tab-hamburger'>
              <div id='menu' className='hamburger'>
                <img src={menu} width='24px'/>
             / </div>
            </li>
          </Link>
          { this.props.tabs.map((tab, index) =>
            <li className={tab.active ? 'tab-active' : 'tab'} key={index} onClick={() => this.props.move(tab.name)}>{tab.name}</li>
          ) }
          {/* <li id='plus' className='tab-hamburger' onClick={this.props.add}>
            <div className='hamburger'>
              <img src={plus} width='24px'/>
            </div>
          </li>*/}
        </ul>
      </nav>
    )
  }
}
Tabs.propTypes = {
  tabs   : PropTypes.array,
  add    : PropTypes.func,
  remove : PropTypes.func,
  move   : PropTypes.func,
  save   : PropTypes.func
}

export default connect(
  state => ({
    tabs : state.tabs
  }),
  dispatch => ({
    add    : (name) => dispatch(tabs.add(name)),
    remove : (name) => dispatch(tabs.remove(name)),
    move   : (name) => dispatch(tabs.move(name)),
    save   : (name) => dispatch(tabs.save(name))
  })
)(Tabs)
