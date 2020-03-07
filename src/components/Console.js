import React from 'react'
import PropTypes from 'prop-types'

function Console({ lines }) {
  return (
    <main id="content2" className="tab">
      <div className="console">
        { lines.map((value) => (
          <div key={value.id}>
            <div className="lines">
              <div className="CodeMirror-linenumber CodeMirror-gutter-elf arrow">
                { '\u003E' }
              </div>
              <div className="margin-line">
                { value.content }
                { value.var ?
                  <div className="var">{ value.var }</div> : ''}
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

export default Console
