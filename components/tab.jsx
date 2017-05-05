import React, { PropTypes } from 'react';

let Tab = ({id, onclick, _class, name}) => (
  <li id={id} className={_class} onClick={onclick}>{name}</li>
)

Tab.propTypes = {
  id: propTypes.number.isRequired,
  onclick: propTypes.func.isRequired,
  _class: propTypes.string.isRequired,
  name: propTypes.string.isRequired
}

export default Tab
