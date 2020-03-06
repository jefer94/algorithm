import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Icon.sass'

function Icon({ name }) {
  return <FontAwesomeIcon className="algorithm-icon" icon={name} />
}
Icon.propTypes = {
  name: PropTypes.shape({
    icon: PropTypes.array
  }).isRequired
}

export default Icon
