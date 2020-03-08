import React, { memo, lazy } from 'react'
import PropTypes from 'prop-types'
import './Icon.sass'

const FontAwesomeIcon = lazy(() => import('./FontAwesomeWrapper'))

function Icon({ name }) {
  return <FontAwesomeIcon className="algorithm-icon" icon={name} />
}
Icon.propTypes = {
  name: PropTypes.shape({
    icon: PropTypes.array
  }).isRequired
}

export default memo(Icon)
