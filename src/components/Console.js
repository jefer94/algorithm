import React, { memo } from 'react'
import PropTypes from 'prop-types'
import './Console.sass'

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
