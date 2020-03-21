import React, { memo, lazy } from 'react'
import PropTypes from 'prop-types'
import './Icon.sass'

/** @module components/Icon */

const FontAwesomeIcon = lazy(() => import('./FontAwesomeWrapper'))

/**
 * @typedef {object} IconProps
 * @property {string} name - Icon from FontAwesome
 */

/**
 * Edidor wrapper
 * @param {IconProps} props
 * @example
 * <Icon name={FontAwesomeIcon} />
 * @returns {object} <Editor ... />
 */
function Icon({ name }) {
  return <FontAwesomeIcon className="algorithm-icon" icon={name} />
}
Icon.propTypes = {
  name: PropTypes.shape({
    icon: PropTypes.array
  }).isRequired
}

export default memo(Icon)
