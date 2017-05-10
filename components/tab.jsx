import PropTypes from 'prop-types';

let Tab = ({id, onclick, _class, name}) => (
  <li id={id} className={_class} onClick={onclick}>{name}</li>
)

Tab.propTypes = {
  id: PropTypes.number.isRequired,
  onclick: PropTypes.func.isRequired,
  _class: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Tab
