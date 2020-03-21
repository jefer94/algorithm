import React, { memo } from 'react'
import PropTypes from 'prop-types'
import './Console.sass'
// #393035

/** @module components/Editor */


/**
 * @typedef {object} Line
 * @property {string} id - Doc key.
 * @property {string} value - Doc name.
 * @property {string} var - Doc description.
 */

/**
 * @typedef {object} ConsoleProps
 * @property {Line[]} lines - Doc key.
 */

/**
 * Console component, base in C/C++ style.
 *
 * @param {string} name - Doc name.
 * @param {string} description - Doc description.
 * @param {content} content - Doc content.
 * @example
 * import React from 'react'
 * import Console from '/components/Console'
 * 
 * export default function () {
 *   return <Console />
 * }
 * @returns {Doc} Doc
 */
function Console({ lines }) {
  return (
    <main id="content2" className="tab">
      <div className="console">
        { lines.map((value, key) => (
          <div key={value.id}>
            <div className="lines">
              { key === 0 ? (
                <p className="console-prefix CodeMirror-linenumber CodeMirror-gutter-elf arrow">
                  ~ λ
                </p>
              ) : ''}
              {/* <div className="CodeMirror-linenumber CodeMirror-gutter-elf arrow">
                { '\u003E' }
              </div> */}
              <div className="margin-line">
                { value.content ? <p>{ value.content }</p> : '' }
                { value.var ?
                  <p className="var">{ value.var }</p> : ''}
              </div>
            </div>
            <br />
          </div>
        )) }
      </div>
    </main>
  )
}
Console.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default memo(Console)
