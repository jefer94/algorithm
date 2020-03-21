import React from 'react'
import DocsComponent from '../components/Docs'
import Menu from './Menu'

/**
 * Get a Docs inside of Menu.
 *
 * @example
 * import React from 'react'
 * import Docs from '/containers/Docs'
 *
 * const component = <Docs />
 * @returns {object} <Docs />
 */
export default function () {
  return (
    <Menu>
      <DocsComponent />
    </Menu>
  )
}
